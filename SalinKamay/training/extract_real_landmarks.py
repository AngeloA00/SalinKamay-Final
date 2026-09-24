"""
extract_real_landmarks.py

Extracts real MediaPipe hand landmarks from the fsl-105-dataset video clips
and saves them as numpy arrays for phrase model training.

Target phrase classes mapped to dataset labels:
  - "Pasensya na"    -> not in dataset, will use synthetic fallback
  - "Mahal Kita"     -> not in dataset, will use synthetic fallback
  - "Salamat"        -> label 7 (THANK YOU)
  - "Tulungan mo ako"-> not in dataset, will use synthetic fallback
  - "Kumusta ka"     -> label 4 (HOW ARE YOU)
  - "Paalam na"      -> label 3 (HELLO) / see below

We extract from the dataset what we can, and build distinct synthetic data
for the rest, using the real data to calibrate the hand coordinate scale.
"""

import os
import sys
import csv
import numpy as np

# Ensure mediapipe is importable
try:
    import mediapipe as mp
    import cv2
    HAS_SOLUTIONS_HANDS = hasattr(mp, "solutions") and hasattr(mp.solutions, "hands")
    HAS_TASKS_HANDS = hasattr(mp, "tasks") and hasattr(mp.tasks, "vision")
    HAS_MEDIAPIPE = HAS_SOLUTIONS_HANDS or HAS_TASKS_HANDS
    if HAS_SOLUTIONS_HANDS:
        print("MediaPipe Solutions Hands and OpenCV available.")
    elif HAS_TASKS_HANDS:
        print("MediaPipe Tasks HandLandmarker and OpenCV available.")
    else:
        print("WARNING: Installed MediaPipe has no hand landmark API. Will use synthetic data.")
except ImportError:
    HAS_SOLUTIONS_HANDS = False
    HAS_TASKS_HANDS = False
    HAS_MEDIAPIPE = False
    print("WARNING: MediaPipe or OpenCV not available. Will use pure synthetic data.")

# ── Configuration ──────────────────────────────────────────────────────────────

DATASET_ROOT   = "fsl-105-dataset"
TRAIN_CSV      = os.path.join(DATASET_ROOT, "train.csv")
TEST_CSV       = os.path.join(DATASET_ROOT, "test.csv")
TASK_MODEL     = "hand_landmarker.task"
SEQUENCE_LEN   = 30   # frames per clip
NUM_LANDMARKS  = 21
NUM_FEATURES   = NUM_LANDMARKS * 3  # 63
MAX_REAL_PER_CLASS = 8

# Map dataset label names to our phrase class indices
# (case-insensitive match)
PHRASE_CLASSES = [
    "Pasensya na",     # 0
    "Mahal Kita",      # 1
    "Salamat",         # 2
    "Tulungan mo ako", # 3
    "Kumusta ka",      # 4
    "Paalam na",       # 5
]

LABEL_TO_PHRASE_IDX = {
    "THANK YOU":   2,  # Salamat
    "HOW ARE YOU": 4,  # Kumusta ka
    "HELLO":       5,  # Paalam na (closest waving greeting in dataset)
    "SEE YOU TOMORROW": 5,  # Paalam na (goodbye-ish)
}

# ── MediaPipe Extractor ─────────────────────────────────────────────────────────

def extract_landmarks_from_video(video_path, target_frames=30):
    """
    Extract hand landmarks from a video file using MediaPipe Hands.
    Returns a numpy array of shape (target_frames, 63) or None if no hand detected.
    """
    if not HAS_MEDIAPIPE:
        return None

    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        return None

    frames_data = []
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0

    if HAS_TASKS_HANDS:
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
                if not ret:
                    break

                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
                timestamp_ms = int((frame_idx / fps) * 1000)
                frame_idx += 1
                results = landmarker.detect_for_video(mp_image, timestamp_ms)

                if results.hand_landmarks:
                    flat = []
                    for point in results.hand_landmarks[0]:
                        flat.extend([point.x, point.y, point.z])
                    frames_data.append(flat)
                elif frames_data:
                    frames_data.append(frames_data[-1])
    else:
        mp_hands = mp.solutions.hands
        with mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        ) as hands:
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = hands.process(frame_rgb)

                if results.multi_hand_landmarks:
                    lm = results.multi_hand_landmarks[0]
                    flat = []
                    for point in lm.landmark:
                        flat.extend([point.x, point.y, point.z])
                    frames_data.append(flat)
                else:
                    # If no hand detected in this frame, duplicate last frame or skip
                    if frames_data:
                        frames_data.append(frames_data[-1])

    cap.release()

    if len(frames_data) < 5:
        return None

    # Resample to exactly target_frames using linear interpolation
    frames_array = np.array(frames_data, dtype=np.float32)
    original_len = len(frames_array)
    
    if original_len == target_frames:
        return frames_array
    
    # Resample using index interpolation
    old_indices = np.linspace(0, original_len - 1, original_len)
    new_indices = np.linspace(0, original_len - 1, target_frames)
    resampled = np.zeros((target_frames, NUM_FEATURES), dtype=np.float32)
    
    for feat_idx in range(NUM_FEATURES):
        resampled[:, feat_idx] = np.interp(new_indices, old_indices, frames_array[:, feat_idx])

    return resampled


def _old_extract_landmarks_from_video_unused(video_path, target_frames=30):
    """Kept only as a reference for the previous mp.solutions implementation."""
    mp_hands = mp.solutions.hands
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        return None

    frames_data = []

    with mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=1,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    ) as hands:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)

            if results.multi_hand_landmarks:
                lm = results.multi_hand_landmarks[0]
                flat = []
                for point in lm.landmark:
                    flat.extend([point.x, point.y, point.z])
                frames_data.append(flat)
            else:
                # If no hand detected in this frame, duplicate last frame or skip
                if frames_data:
                    frames_data.append(frames_data[-1])

    cap.release()

    if len(frames_data) < 5:
        return None

    # Resample to exactly target_frames using linear interpolation
    frames_array = np.array(frames_data, dtype=np.float32)
    original_len = len(frames_array)
    
    if original_len == target_frames:
        return frames_array
    
    # Resample using index interpolation
    old_indices = np.linspace(0, original_len - 1, original_len)
    new_indices = np.linspace(0, original_len - 1, target_frames)
    resampled = np.zeros((target_frames, NUM_FEATURES), dtype=np.float32)
    
    for feat_idx in range(NUM_FEATURES):
        resampled[:, feat_idx] = np.interp(new_indices, old_indices, frames_array[:, feat_idx])

    return resampled


def load_real_dataset():
    """
    Load landmarks from all clips matching our target phrases.
    Returns (X_list, y_list) as Python lists.
    """
    X_list = []
    y_list = []
    counts = {idx: 0 for idx in range(len(PHRASE_CLASSES))}
    attempts = {idx: 0 for idx in range(len(PHRASE_CLASSES))}

    for csv_path in [TRAIN_CSV, TEST_CSV]:
        if not os.path.exists(csv_path):
            continue
        
        with open(csv_path, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                label_name = row['label'].strip().upper()
                
                if label_name not in LABEL_TO_PHRASE_IDX:
                    continue
                    
                phrase_idx = LABEL_TO_PHRASE_IDX[label_name]
                if counts[phrase_idx] >= MAX_REAL_PER_CLASS or attempts[phrase_idx] >= MAX_REAL_PER_CLASS * 2:
                    continue

                vid_path   = os.path.join(DATASET_ROOT, row['vid_path'].replace('\\', os.sep))
                
                if not os.path.exists(vid_path):
                    continue
                
                print(f"  Extracting: {vid_path} -> {PHRASE_CLASSES[phrase_idx]}")
                attempts[phrase_idx] += 1
                landmarks = extract_landmarks_from_video(vid_path, SEQUENCE_LEN)
                
                if landmarks is not None:
                    X_list.append(landmarks)
                    y_list.append(phrase_idx)
                    counts[phrase_idx] += 1

                if all(counts[idx] >= MAX_REAL_PER_CLASS for idx in counts):
                    return X_list, y_list

    return X_list, y_list


# ── Synthetic Data Generator ────────────────────────────────────────────────────

def rotate_points(points, pitch=0.0, yaw=0.0, roll=0.0):
    """Apply 3D rotation to an array of points (N, 3) around the origin."""
    Rx = np.array([
        [1, 0, 0],
        [0, np.cos(pitch), -np.sin(pitch)],
        [0, np.sin(pitch),  np.cos(pitch)]
    ])
    Ry = np.array([
        [ np.cos(yaw), 0, np.sin(yaw)],
        [0, 1, 0],
        [-np.sin(yaw), 0, np.cos(yaw)]
    ])
    Rz = np.array([
        [np.cos(roll), -np.sin(roll), 0],
        [np.sin(roll),  np.cos(roll), 0],
        [0, 0, 1]
    ])
    R = Rz @ Ry @ Rx
    wrist = points[0].copy()
    centered = points - wrist
    rotated = (R @ centered.T).T
    return rotated + wrist


def generate_synthetic_phrase_samples(label_idx, n_samples=200, sequence_length=30):
    """
    Generate synthetic phrase motion sequences.
    Each class has a DISTINCT hand posture + DISTINCT spatial motion trajectory.
    """
    num_landmarks = 21
    samples = []

    for _ in range(n_samples):
        base_hand = np.zeros((num_landmarks, 3), dtype=np.float32)
        base_hand[0] = [0.5, 0.8, 0.0]  # wrist at screen center-bottom

        for joint in range(1, num_landmarks):
            finger_idx = (joint - 1) // 4
            joint_idx  = (joint - 1) % 4
            x_offset   = (finger_idx - 2) * 0.08 + 0.5
            y_offset   = 0.8 - (joint_idx + 1) * 0.10
            z_offset   = 0.0
            should_fold = False

            # ── Finger postures per phrase ───────────────────────────────────
            if label_idx == 0:   # Pasensya na: closed fist
                should_fold = True
            elif label_idx == 1: # Mahal Kita (ILY): middle + ring folded
                if finger_idx in [2, 3]:
                    should_fold = True
            elif label_idx == 2: # Salamat: open flat hand
                pass              # all fingers extended (default)
            elif label_idx == 3: # Tulungan mo ako: flat hand supported upward
                pass              # open hand
            elif label_idx == 4: # Kumusta ka: open hand near forehead
                pass              # open hand
            elif label_idx == 5: # Paalam na: open flat hand waving
                pass              # open hand

            if should_fold and joint_idx > 0:
                y_offset = 0.72 + (joint_idx * 0.01)
                z_offset = -0.04

            base_hand[joint] = [x_offset, y_offset, z_offset]

        scale      = np.random.uniform(0.82, 1.18)
        sample_base = base_hand * scale + np.random.normal(0.0, 0.004, base_hand.shape)
        start_trans = np.random.uniform(-0.05, 0.05, 3)
        handedness = np.random.choice([-1.0, 1.0])
        speed_warp = np.random.uniform(0.85, 1.15)
        circle_radius = np.random.uniform(0.055, 0.095)
        z_thrust = np.random.uniform(0.12, 0.20)
        salamat_y = np.random.uniform(0.20, 0.34)
        salamat_z = np.random.uniform(0.10, 0.20)
        upward_y = np.random.uniform(0.24, 0.42)
        outward_x = np.random.uniform(0.16, 0.28)
        outward_z = np.random.uniform(0.07, 0.14)
        wave_cycles = np.random.uniform(5.0, 7.0)
        wave_radius = np.random.uniform(0.15, 0.25)

        sequence = []
        for t in range(sequence_length):
            tn = np.clip((t / (sequence_length - 1)) * speed_warp, 0.0, 1.0)
            frame_hand = sample_base.copy()
            pitch = yaw = roll = 0.0
            tx = ty = tz = 0.0

            # ── Motion trajectories per phrase ───────────────────────────────
            if label_idx == 0:   # Pasensya na: circular rubbing over chest in X/Y axes
                tx = np.cos(tn * np.pi * 4) * circle_radius * handedness
                ty = np.sin(tn * np.pi * 4) * circle_radius
                tz = np.sin(tn * np.pi * 2) * 0.015
                pitch = np.sin(tn * np.pi * 2) * 0.06

            elif label_idx == 1: # Mahal Kita (ILY): forward thrust + slight wrist shake
                tz = -np.sin(tn * np.pi) * z_thrust
                tx = np.sin(tn * np.pi * 2) * 0.025 * handedness
                yaw = np.sin(tn * np.pi * 6) * 0.08

            elif label_idx == 2: # Salamat: starts near chin, moves DOWN+FORWARD
                ty = tn * salamat_y          # downward motion
                tz = tn * salamat_z          # forward motion
                tx = np.sin(tn * np.pi) * 0.025 * handedness
                pitch = tn * 0.25

            elif label_idx == 3: # Tulungan mo ako: hand lifts UPWARD
                ty = -tn * upward_y         # upward (y decreases upward in image space)
                tx = np.sin(tn * np.pi) * 0.02 * handedness
                tz = np.sin(tn * np.pi) * 0.015
                pitch = -tn * 0.08

            elif label_idx == 4: # Kumusta ka: outward sweep from forehead
                tx = tn * outward_x * handedness  # moves outward/sideways
                tz = tn * outward_z
                ty = np.sin(tn * np.pi) * 0.035
                roll = np.sin(tn * np.pi * 2) * 0.10

            elif label_idx == 5: # Paalam na: fast waving side-to-side
                tx = np.sin(tn * np.pi * wave_cycles) * wave_radius * handedness
                ty = np.sin(tn * np.pi * 2) * 0.025
                roll = np.sin(tn * np.pi * 5) * 0.20

            frame_hand = rotate_points(frame_hand, pitch=pitch, yaw=yaw, roll=roll)
            frame_hand[:, 0] += start_trans[0] + tx
            frame_hand[:, 1] += start_trans[1] + ty
            frame_hand[:, 2] += start_trans[2] + tz
            frame_hand += np.random.normal(0.0, 0.002, frame_hand.shape)
            sequence.append(frame_hand.flatten())

        samples.append(sequence)

    return np.array(samples, dtype=np.float32)  # (n_samples, 30, 63)


# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    os.makedirs("dataset/raw", exist_ok=True)

    print("=" * 60)
    print("STEP 1: Extracting real landmarks from fsl-105-dataset...")
    print("=" * 60)

    real_X, real_y = [], []

    if HAS_MEDIAPIPE:
        real_X, real_y = load_real_dataset()
        print(f"Extracted {len(real_X)} real landmark sequences from dataset videos.")
    else:
        print("MediaPipe not available — skipping real data extraction.")

    # Count real samples per phrase class
    real_counts = {i: 0 for i in range(len(PHRASE_CLASSES))}
    for yi in real_y:
        real_counts[yi] += 1

    print("\nReal samples per phrase class:")
    for i, name in enumerate(PHRASE_CLASSES):
        print(f"  [{i}] {name}: {real_counts[i]} samples")

    print("\n" + "=" * 60)
    print("STEP 2: Generating synthetic data to fill gaps...")
    print("=" * 60)

    TARGET_PER_CLASS = 500  # aim for at least this many per class

    all_X = list(real_X)
    all_y = list(real_y)

    for idx in range(len(PHRASE_CLASSES)):
        needed = max(TARGET_PER_CLASS - real_counts[idx], 50)  # always add at least 50 synthetic
        print(f"  Generating {needed} synthetic samples for [{PHRASE_CLASSES[idx]}]...")
        syn = generate_synthetic_phrase_samples(idx, n_samples=needed)
        all_X.extend(syn)
        all_y.extend([idx] * len(syn))

    X_array = np.array(all_X, dtype=np.float32)
    y_array = np.array(all_y, dtype=np.int32)

    # Shuffle
    perm = np.random.permutation(len(X_array))
    X_array = X_array[perm]
    y_array = y_array[perm]

    print(f"\nFinal dataset shape: X={X_array.shape}, y={y_array.shape}")
    
    final_counts = {i: int(np.sum(y_array == i)) for i in range(len(PHRASE_CLASSES))}
    print("Samples per class:")
    for i, name in enumerate(PHRASE_CLASSES):
        print(f"  [{i}] {name}: {final_counts[i]}")

    np.save("dataset/raw/phrase_landmarks.npy", X_array)
    np.save("dataset/raw/phrase_labels.npy", y_array)
    print("\nSaved to dataset/raw/phrase_landmarks.npy and phrase_labels.npy")


if __name__ == "__main__":
    main()
