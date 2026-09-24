import os
import glob
import json
import numpy as np

try:
    import cv2
    import mediapipe as mp
    HAS_MEDIAPIPE = True
except ImportError:
    HAS_MEDIAPIPE = False

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CUSTOM_DIR = os.path.join(BASE_DIR, "custom_fsl")
PROCESSED_DIR = os.path.join(BASE_DIR, "dataset", "processed")
METADATA_DIR = os.path.join(BASE_DIR, "dataset", "metadata")
TASK_MODEL = os.path.join(BASE_DIR, "hand_landmarker.task")

TARGET_FRAMES = 30
NUM_FEATURES = 63
AUGMENT_FACTOR = 5

def resample_sequence(frames_data, target_frames=30):
    if len(frames_data) == 0:
        return np.zeros((target_frames, NUM_FEATURES), dtype=np.float32)
    frames_arr = np.array(frames_data, dtype=np.float32)
    orig_len = len(frames_arr)
    if orig_len == target_frames:
        return frames_arr

    old_indices = np.linspace(0, orig_len - 1, orig_len)
    new_indices = np.linspace(0, orig_len - 1, target_frames)
    resampled = np.zeros((target_frames, NUM_FEATURES), dtype=np.float32)
    for feat in range(NUM_FEATURES):
        resampled[:, feat] = np.interp(new_indices, old_indices, frames_arr[:, feat])
    return resampled

def augment_sequence(sequence):
    seq = sequence.copy().reshape(-1, 21, 3)
    scale = np.random.uniform(0.9, 1.1)
    rotation = np.random.uniform(-0.1, 0.1)
    trans = np.random.normal(0, 0.03, 3)
    noise = np.random.normal(0, 0.003, seq.shape)

    cos_r, sin_r = np.cos(rotation), np.sin(rotation)
    rot_matrix = np.array([[cos_r, -sin_r], [sin_r, cos_r]])

    for t in range(len(seq)):
        wrist = seq[t, 0].copy()
        xy = seq[t, :, :2] - wrist[:2]
        xy = np.dot(xy, rot_matrix) * scale
        seq[t, :, :2] = xy + wrist[:2] + trans[:2]
        seq[t, :, 2] = (seq[t, :, 2] - wrist[2]) * scale + wrist[2] + trans[2]

    seq += noise
    return seq.reshape(-1, NUM_FEATURES).astype(np.float32)

def extract_video_landmarks(landmarker, video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return None

    frames_data = []
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    frame_idx = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
        timestamp_ms = int((frame_idx / fps) * 1000)
        frame_idx += 1

        try:
            result = landmarker.detect_for_video(mp_image, timestamp_ms)
        except Exception:
            break

        if result.hand_landmarks:
            flat = []
            for pt in result.hand_landmarks[0]:
                flat.extend([pt.x, pt.y, pt.z])
            frames_data.append(flat)
        elif frames_data:
            # Forward-fill last seen hand landmarks
            frames_data.append(frames_data[-1])
        else:
            frames_data.append([0.0] * NUM_FEATURES)

    cap.release()

    if len(frames_data) < 5:
        return None

    return resample_sequence(frames_data, TARGET_FRAMES)

def main():
    if not HAS_MEDIAPIPE:
        print("Error: mediapipe and opencv-python must be installed.")
        return

    if not os.path.exists(TASK_MODEL):
        print(f"Error: {TASK_MODEL} not found.")
        return

    os.makedirs(PROCESSED_DIR, exist_ok=True)
    os.makedirs(METADATA_DIR, exist_ok=True)

    # Gather categories and classes
    categories = sorted([d for d in os.listdir(CUSTOM_DIR) if os.path.isdir(os.path.join(CUSTOM_DIR, d))])
    all_classes = []
    class_manifest = []

    for cat in categories:
        cat_dir = os.path.join(CUSTOM_DIR, cat)
        signs = sorted([s for s in os.listdir(cat_dir) if os.path.isdir(os.path.join(cat_dir, s))])
        for sign in signs:
            # Standard uppercase label for classifier
            label = sign.upper()
            if label not in all_classes:
                all_classes.append(label)

    all_classes.sort()
    class_to_idx = {c: i for i, c in enumerate(all_classes)}

    classes_out = os.path.join(METADATA_DIR, "custom_fsl_classes.json")
    with open(classes_out, "w", encoding="utf-8") as f:
        json.dump(all_classes, f, indent=2)
    print(f"Registered {len(all_classes)} classes in {classes_out}")

    # Initialize HandLandmarker
    BaseOptions = mp.tasks.BaseOptions
    HandLandmarker = mp.tasks.vision.HandLandmarker
    HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = HandLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=TASK_MODEL),
        running_mode=VisionRunningMode.VIDEO,
        num_hands=1,
        min_hand_detection_confidence=0.35,
        min_hand_presence_confidence=0.35,
        min_tracking_confidence=0.35,
    )

    X_all = []
    y_all = []
    manifest_records = []

    video_count = 0
    for cat in categories:
        cat_dir = os.path.join(CUSTOM_DIR, cat)
        signs = sorted([s for s in os.listdir(cat_dir) if os.path.isdir(os.path.join(cat_dir, s))])

        for sign in signs:
            sign_dir = os.path.join(cat_dir, sign)
            vids = sorted([f for f in os.listdir(sign_dir) if f.lower().endswith(('.mp4', '.mov', '.avi'))])
            label = sign.upper()
            cls_idx = class_to_idx[label]

            for v in vids:
                v_path = os.path.join(sign_dir, v)
                video_count += 1
                print(f"[{video_count}] Extracting {cat}/{sign}/{v}...")

                with HandLandmarker.create_from_options(options) as landmarker:
                    landmarks = extract_video_landmarks(landmarker, v_path)

                if landmarks is not None:
                    X_all.append(landmarks)
                    y_all.append(cls_idx)

                    # Add augmentations
                    for _ in range(AUGMENT_FACTOR):
                        aug = augment_sequence(landmarks)
                        X_all.append(aug)
                        y_all.append(cls_idx)

                    manifest_records.append({
                        "category": cat,
                        "sign": sign,
                        "label": label,
                        "class_idx": cls_idx,
                        "video": v,
                        "rel_path": os.path.relpath(v_path, BASE_DIR).replace("\\", "/")
                    })

    X_arr = np.array(X_all, dtype=np.float32)
    y_arr = np.array(y_all, dtype=np.int32)

    # Shuffle
    perm = np.random.permutation(len(X_arr))
    X_arr = X_arr[perm]
    y_arr = y_arr[perm]

    x_path = os.path.join(PROCESSED_DIR, "X_custom_fsl.npy")
    y_path = os.path.join(PROCESSED_DIR, "y_custom_fsl.npy")
    manifest_path = os.path.join(METADATA_DIR, "custom_fsl_manifest.json")

    np.save(x_path, X_arr)
    np.save(y_path, y_arr)
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_records, f, indent=2)

    print(f"\nCompleted custom_fsl extraction:")
    print(f"  Processed {video_count} videos.")
    print(f"  Final X shape (with {AUGMENT_FACTOR}x aug): {X_arr.shape}")
    print(f"  Final y shape: {y_arr.shape}")
    print(f"  Saved to {x_path} and {y_path}")
    print(f"  Manifest saved to {manifest_path}")

if __name__ == "__main__":
    main()
