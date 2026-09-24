import os
import csv
import json
import numpy as np

try:
    import mediapipe as mp
    import cv2
    HAS_MEDIAPIPE = True
except ImportError:
    HAS_MEDIAPIPE = False

# Configuration
DATASET_ROOT = "fsl-105-dataset"
TRAIN_CSV = os.path.join(DATASET_ROOT, "train.csv")
TEST_CSV = os.path.join(DATASET_ROOT, "test.csv")
SEQUENCE_LEN = 30
NUM_FEATURES = 63
AUGMENT_FACTOR = 15  # multiply each real video 15 times to prevent overfitting
TASK_MODEL = "hand_landmarker.task"

def extract_landmarks_from_video(video_path, target_frames=30):
    if not HAS_MEDIAPIPE: return None
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened(): return None
    
    frames_data = []
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0

    BaseOptions = mp.tasks.BaseOptions
    HandLandmarker = mp.tasks.vision.HandLandmarker
    HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = HandLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=TASK_MODEL),
        running_mode=VisionRunningMode.VIDEO,
        num_hands=1,
        min_hand_detection_confidence=0.45,
        min_hand_presence_confidence=0.45,
        min_tracking_confidence=0.45,
    )

    with HandLandmarker.create_from_options(options) as landmarker:
        frame_idx = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret: break

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
            timestamp_ms = int((frame_idx / fps) * 1000)
            frame_idx += 1
            
            try:
                results = landmarker.detect_for_video(mp_image, timestamp_ms)
            except Exception as e:
                break

            if results.hand_landmarks:
                flat = []
                for point in results.hand_landmarks[0]:
                    flat.extend([point.x, point.y, point.z])
                frames_data.append(flat)
            elif frames_data:
                frames_data.append(frames_data[-1])

    cap.release()

    if len(frames_data) < 5: return None

    # Resample to exactly 30 frames
    frames_array = np.array(frames_data, dtype=np.float32)
    original_len = len(frames_array)
    if original_len == target_frames: return frames_array
    
    old_indices = np.linspace(0, original_len - 1, original_len)
    new_indices = np.linspace(0, original_len - 1, target_frames)
    resampled = np.zeros((target_frames, NUM_FEATURES), dtype=np.float32)
    for feat_idx in range(NUM_FEATURES):
        resampled[:, feat_idx] = np.interp(new_indices, old_indices, frames_array[:, feat_idx])
    return resampled

def augment_sequence(sequence):
    """Apply spatial data augmentation (rotation, scale, noise, translation) to a 30-frame sequence."""
    seq = sequence.copy().reshape(-1, 21, 3)
    
    scale = np.random.uniform(0.85, 1.15)
    rotation = np.random.uniform(-0.15, 0.15)
    trans = np.random.normal(0, 0.05, 3)
    noise = np.random.normal(0, 0.005, seq.shape)
    
    cos_r, sin_r = np.cos(rotation), np.sin(rotation)
    rot_matrix = np.array([[cos_r, -sin_r], [sin_r, cos_r]])
    
    for t in range(len(seq)):
        wrist = seq[t, 0].copy()
        xy = seq[t, :, :2] - wrist[:2]
        xy = np.dot(xy, rot_matrix) * scale
        seq[t, :, :2] = xy + wrist[:2] + trans[:2]
        seq[t, :, 2] = (seq[t, :, 2] - wrist[2]) * scale + wrist[2] + trans[2]
        
    seq += noise
    return seq.reshape(-1, 63)

def main():
    if not HAS_MEDIAPIPE:
        print("Error: MediaPipe and OpenCV must be installed to run extraction.")
        return

    if not os.path.exists(TASK_MODEL):
        print(f"Error: {TASK_MODEL} missing. Cannot run tasks API.")
        return

    os.makedirs("dataset/processed", exist_ok=True)
    os.makedirs("dataset/metadata", exist_ok=True)

    # 1. Gather all unique classes
    classes = set()
    for csv_file in [TRAIN_CSV, TEST_CSV]:
        if os.path.exists(csv_file):
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    classes.add(row['label'].strip().upper())
    
    sorted_classes = sorted(list(classes))
    label_to_idx = {name: i for i, name in enumerate(sorted_classes)}
    
    with open("dataset/metadata/fsl105_classes.json", "w", encoding="utf-8") as f:
        json.dump(sorted_classes, f, indent=2)
    print(f"Found {len(sorted_classes)} unique classes. Saved to metadata.")

    # 2. Extract and Augment Data
    X_all = []
    y_all = []
    
    for csv_file in [TRAIN_CSV, TEST_CSV]:
        if not os.path.exists(csv_file): continue
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                label = row['label'].strip().upper()
                vid_path = os.path.join(DATASET_ROOT, row['vid_path'].replace('\\', '/'))
                
                if not os.path.exists(vid_path): continue
                
                print(f"Extracting {i}: {label} ({vid_path})")
                landmarks = extract_landmarks_from_video(vid_path)
                
                if landmarks is not None:
                    # Add original
                    X_all.append(landmarks)
                    y_all.append(label_to_idx[label])
                    
                    # Add augmented variations
                    for _ in range(AUGMENT_FACTOR):
                        aug = augment_sequence(landmarks)
                        X_all.append(aug)
                        y_all.append(label_to_idx[label])

    X_array = np.array(X_all, dtype=np.float32)
    y_array = np.array(y_all, dtype=np.int32)

    # Shuffle dataset
    perm = np.random.permutation(len(X_array))
    X_array = X_array[perm]
    y_array = y_array[perm]

    print(f"\nFinished processing. Final Dataset Shape: X={X_array.shape}, y={y_array.shape}")
    np.save("dataset/processed/X_fsl105.npy", X_array)
    np.save("dataset/processed/y_fsl105.npy", y_array)
    print("Saved to dataset/processed/X_fsl105.npy and y_fsl105.npy")

if __name__ == "__main__":
    main()
