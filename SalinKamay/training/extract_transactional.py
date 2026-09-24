import os
import glob
import json
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_DIR = os.path.join(BASE_DIR, "Transactional Filipino Sign Language Dataset", "recorded_data")
PROCESSED_DIR = os.path.join(BASE_DIR, "dataset", "processed")
METADATA_DIR = os.path.join(BASE_DIR, "dataset", "metadata")

TARGET_FRAMES = 30
NUM_HAND_FEATURES = 63

def resample_sequence(sequence, target_frames=30):
    """Resample sequence along time dimension from original_len to target_frames."""
    orig_len = len(sequence)
    if orig_len == target_frames:
        return sequence.astype(np.float32)
    
    old_indices = np.linspace(0, orig_len - 1, orig_len)
    new_indices = np.linspace(0, orig_len - 1, target_frames)
    num_feats = sequence.shape[1]
    resampled = np.zeros((target_frames, num_feats), dtype=np.float32)
    for f in range(num_feats):
        resampled[:, f] = np.interp(new_indices, old_indices, sequence[:, f])
    return resampled

def main():
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    os.makedirs(METADATA_DIR, exist_ok=True)

    if not os.path.isdir(DATASET_DIR):
        print(f"Error: Dataset directory not found at {DATASET_DIR}")
        return

    classes = sorted([d for d in os.listdir(DATASET_DIR) if os.path.isdir(os.path.join(DATASET_DIR, d))])
    class_to_idx = {c: idx for idx, c in enumerate(classes)}

    print(f"Found {len(classes)} classes in transactional dataset.")

    # Save class list
    classes_path = os.path.join(METADATA_DIR, "transactional_classes.json")
    with open(classes_path, "w", encoding="utf-8") as f:
        json.dump(classes, f, indent=2)
    print(f"Saved class names to {classes_path}")

    X_holistic_list = []
    X_hand30_list = []
    y_list = []
    manifest = []

    for c in classes:
        c_dir = os.path.join(DATASET_DIR, c)
        npy_files = sorted(glob.glob(os.path.join(c_dir, "*.npy")))
        print(f"Loading class '{c}': {len(npy_files)} samples")

        for npy_file in npy_files:
            try:
                arr = np.load(npy_file) # shape: (75, 225)
                if arr.shape != (75, 225):
                    # Handle any unexpected shapes
                    if len(arr.shape) == 2 and arr.shape[1] == 225:
                        arr = resample_sequence(arr, 75)
                    else:
                        print(f"Skipping {npy_file}: unexpected shape {arr.shape}")
                        continue

                X_holistic_list.append(arr.astype(np.float32))
                y_list.append(class_to_idx[c])

                # Extract hand landmarks
                # Left Hand: [99:162], Right Hand: [162:225]
                lh = arr[:, 99:162]
                rh = arr[:, 162:225]

                lh_score = np.sum(np.abs(lh))
                rh_score = np.sum(np.abs(rh))

                if rh_score >= lh_score and rh_score > 0:
                    active_hand = rh
                    hand_used = "right"
                elif lh_score > 0:
                    active_hand = lh
                    hand_used = "left"
                else:
                    # Fallback if both empty in hand landmarks
                    active_hand = np.zeros((75, NUM_HAND_FEATURES), dtype=np.float32)
                    hand_used = "none"

                hand30 = resample_sequence(active_hand, TARGET_FRAMES)
                X_hand30_list.append(hand30)

                manifest.append({
                    "file": os.path.basename(npy_file),
                    "class": c,
                    "class_idx": class_to_idx[c],
                    "hand_used": hand_used,
                    "rel_path": os.path.relpath(npy_file, BASE_DIR).replace("\\", "/")
                })
            except Exception as e:
                print(f"Error reading {npy_file}: {e}")

    X_holistic = np.array(X_holistic_list, dtype=np.float32)
    X_hand30 = np.array(X_hand30_list, dtype=np.float32)
    y = np.array(y_list, dtype=np.int32)

    print(f"\nExtraction complete:")
    print(f"  Holistic dataset shape: {X_holistic.shape}")
    print(f"  Hand30 dataset shape:   {X_hand30.shape}")
    print(f"  Labels shape:           {y.shape}")

    # Save processed arrays
    holistic_out = os.path.join(PROCESSED_DIR, "X_transactional_holistic.npy")
    hand30_out = os.path.join(PROCESSED_DIR, "X_transactional_hand30.npy")
    y_out = os.path.join(PROCESSED_DIR, "y_transactional.npy")
    manifest_out = os.path.join(METADATA_DIR, "transactional_manifest.json")

    np.save(holistic_out, X_holistic)
    np.save(hand30_out, X_hand30)
    np.save(y_out, y)

    with open(manifest_out, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"Saved holistic dataset to {holistic_out}")
    print(f"Saved Hand30 dataset to {hand30_out}")
    print(f"Saved labels to {y_out}")
    print(f"Saved manifest to {manifest_out}")

if __name__ == "__main__":
    main()
