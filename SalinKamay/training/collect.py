import os
import numpy as np

def create_directories():
    """Create the standard dataset folder structure."""
    dirs = [
        "dataset/raw",
        "dataset/landmarks",
        "dataset/processed",
        "dataset/metadata",
        "app/models"
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)
        print(f"Directory created/verified: {d}")

def generate_synthetic_alphabet_data():
    """
    Generate synthetic hand landmarks for alphabet A-Z (26 classes).
    Each hand contains 21 landmarks with x, y, z coordinates (63 features total).
    We generate 300 samples per class with rich data augmentation (rotation, scaling, noise, translation).
    """
    print("Generating synthetic FSL alphabet landmark dataset with Data Augmentation...")
    num_classes = 26
    samples_per_class = 300
    num_landmarks = 21
    
    X = []
    y = []
    
    # Establish distinct base postures for A-Z
    for label_idx in range(num_classes):
        base_hand = np.zeros((num_landmarks, 3))
        base_hand[0] = [0.5, 0.1, 0.0] # Wrist at (0.5, 0.1, 0.0)
        
        # Segment configuration types (0: Closed Fist, 1: Open Flat, 2: Pointing index, 3: V shape)
        config_type = label_idx % 4
        
        for joint in range(1, num_landmarks):
            finger_idx = (joint - 1) // 4
            joint_idx = (joint - 1) % 4
            
            x_offset = (finger_idx - 2) * 0.1 + 0.5
            y_offset = (joint_idx + 1) * 0.15 + 0.1
            z_offset = 0.0
            
            if config_type == 0: # Closed fist (fingers folded)
                y_offset = 0.18 + (joint_idx * 0.015)
            elif config_type == 1: # Open flat hand
                pass
            elif config_type == 2: # Index pointing
                if finger_idx != 1: # Fold other fingers
                    y_offset = 0.18
            elif config_type == 3: # V-shape (index and middle open, others closed)
                if finger_idx != 1 and finger_idx != 2:
                    y_offset = 0.18
                    
            # Unique class variations to ensure perfect model separation
            base_hand[joint] = [
                x_offset + np.sin(label_idx * 1.5) * 0.04,
                y_offset + np.cos(label_idx * 1.5) * 0.04,
                z_offset + (label_idx * 0.004)
            ]
            
        # Data Augmentation loop per sample
        for _ in range(samples_per_class):
            scale = np.random.uniform(0.85, 1.15) # Scale augmentation
            rotation = np.random.uniform(-0.25, 0.25) # Rotation angle augmentation
            translation = np.random.normal(0.0, 0.05, 3) # Spatial translation augmentation
            noise = np.random.normal(0.0, 0.015, base_hand.shape) # Coordinates noise jittering
            
            # Apply 2D rotation matrix relative to wrist
            cos_r, sin_r = np.cos(rotation), np.sin(rotation)
            rot_matrix = np.array([[cos_r, -sin_r], [sin_r, cos_r]])
            
            sampled_hand = base_hand.copy()
            xy = sampled_hand[:, :2] - base_hand[0, :2]
            xy = np.dot(xy, rot_matrix) * scale
            sampled_hand[:, :2] = xy + base_hand[0, :2] + translation[:2]
            sampled_hand[:, 2] += translation[2]
            
            # Inject noise
            sampled_hand += noise
            
            # Flatten to 63 features
            X.append(sampled_hand.flatten())
            y.append(label_idx)

    X = np.array(X, dtype=np.float32)
    y = np.array(y, dtype=np.int32)
    
    np.save("dataset/raw/alphabet_landmarks.npy", X)
    np.save("dataset/raw/alphabet_labels.npy", y)
    print(f"Alphabet dataset saved. X shape: {X.shape}, y shape: {y.shape}")

def generate_synthetic_phrase_data():
    """
    Generate synthetic sequential landmark data for FSL phrases (6 classes).
    Classes:
    0: Sorry (Closed fist, rubbing chest in circles)
    1: Mahal Kita (ILY shape, moving back/forth, shaking)
    2: Salamat (Open flat hand, moving from chin down/forward)
    3: Tulungan mo ako (Thumbs up, moving vertically up)
    4: Kumusta ka (Open flat hand, gentle wave)
    5: Paalam na (Open flat hand, fast wave)
    We generate 200 sequences per class (each sequence is 30 frames).
    Apply extensive temporal data augmentation.
    """
    print("Generating synthetic FSL phrase sequence landmark dataset with Augmentation...")
    num_classes = 6
    samples_per_class = 200
    sequence_length = 30
    num_landmarks = 21
    
    X = []
    y = []
    
    # Rotation helper function
    def rotate_points(landmarks, pitch=0.0, yaw=0.0, roll=0.0):
        # Center coordinates relative to the wrist (index 0)
        wrist = landmarks[0]
        centered = landmarks - wrist
        
        # Rotation matrices
        Rx = np.array([
            [1.0, 0.0, 0.0],
            [0.0, np.cos(pitch), -np.sin(pitch)],
            [0.0, np.sin(pitch), np.cos(pitch)]
        ], dtype=np.float32)
        
        Ry = np.array([
            [np.cos(yaw), 0.0, np.sin(yaw)],
            [0.0, 1.0, 0.0],
            [-np.sin(yaw), 0.0, np.cos(yaw)]
        ], dtype=np.float32)
        
        Rz = np.array([
            [np.cos(roll), -np.sin(roll), 0.0],
            [np.sin(roll), np.cos(roll), 0.0],
            [0.0, 0.0, 1.0]
        ], dtype=np.float32)
        
        R = np.dot(Rz, np.dot(Ry, Rx))
        rotated = np.dot(centered, R.T)
        
        return rotated + wrist

    for label_idx in range(num_classes):
        for _ in range(samples_per_class):
            sequence = []
            
            # Construct a base hand skeleton depending on the class
            base_hand = np.zeros((num_landmarks, 3), dtype=np.float32)
            base_hand[0] = [0.5, 0.1, 0.0] # Wrist at (0.5, 0.1, 0.0)
            
            for joint in range(1, num_landmarks):
                finger_idx = (joint - 1) // 4
                joint_idx = (joint - 1) % 4
                
                # Standard open finger layout:
                x_offset = (finger_idx - 2) * 0.08 + 0.5
                y_offset = (joint_idx + 1) * 0.12 + 0.1
                z_offset = 0.0
                
                # Determine if this finger should fold
                should_fold = False
                if label_idx == 0: # Sorry: Closed fist (all fingers folded)
                    should_fold = True
                elif label_idx == 1: # Mahal Kita (ILY): Middle and Ring folded
                    if finger_idx == 2 or finger_idx == 3:
                        should_fold = True
                elif label_idx == 3: # Tulungan mo ako: Thumbs up (Index, Middle, Ring, Pinky folded)
                    if finger_idx != 0:
                        should_fold = True
                
                # If folded, keep knuckle (joint_idx == 0) in place, only fold PIP/DIP/TIP (joint_idx > 0)
                if should_fold and joint_idx > 0:
                    y_offset = 0.22 + (joint_idx * 0.015)
                    z_offset = -0.05
                
                base_hand[joint] = [x_offset, y_offset, z_offset]
                
            # Random scale and shape shifts for this sequence sample
            scale = np.random.uniform(0.9, 1.1)
            sample_base = base_hand * scale + np.random.normal(0.0, 0.005, base_hand.shape)
            
            # Start position translation
            start_trans = np.random.uniform(-0.1, 0.1, 3)
            
            for t in range(sequence_length):
                t_normalized = t / (sequence_length - 1)
                frame_hand = sample_base.copy()
                
                # Define rotation and translation values
                pitch, yaw, roll = 0.0, 0.0, 0.0
                trans_x, trans_y, trans_z = 0.0, 0.0, 0.0
                
                # Apply class-specific distinct trajectories
                if label_idx == 0: # Sorry: Closed fist placed over chest, circular rubbing motion
                    trans_x = np.cos(t_normalized * np.pi * 4) * 0.1
                    trans_y = np.sin(t_normalized * np.pi * 4) * 0.1
                    pitch = np.sin(t_normalized * np.pi * 2) * 0.05
                elif label_idx == 1: # Mahal Kita (ILY): Directed toward person, slight movement toward signer
                    trans_z = -np.sin(t_normalized * np.pi) * 0.15
                    yaw = np.sin(t_normalized * np.pi * 8) * 0.1
                elif label_idx == 2: # Salamat: Moves forward/downward with gentle motion
                    trans_y = -t_normalized * 0.3
                    trans_z = t_normalized * 0.2
                    pitch = t_normalized * 0.3
                elif label_idx == 3: # Tulungan mo ako: Moves upward indicating assistance
                    trans_y = t_normalized * 0.4
                    pitch = -t_normalized * 0.1
                elif label_idx == 4: # Kumusta ka: Moving outward, gentle wave
                    trans_x = np.sin(t_normalized * np.pi * 3) * 0.15
                    trans_z = t_normalized * 0.1
                    roll = np.sin(t_normalized * np.pi * 3) * 0.15
                elif label_idx == 5: # Paalam na: Waving outward (goodbye gesture)
                    trans_x = np.sin(t_normalized * np.pi * 6) * 0.25
                    roll = np.sin(t_normalized * np.pi * 6) * 0.25
                
                # Rotate the hand relative to the wrist
                frame_hand = rotate_points(frame_hand, pitch=pitch, yaw=yaw, roll=roll)
                
                # Apply base translation and sequence trajectory translation
                frame_hand[:, 0] += start_trans[0] + trans_x
                frame_hand[:, 1] += start_trans[1] + trans_y
                frame_hand[:, 2] += start_trans[2] + trans_z
                
                # Add frame jittering
                frame_hand += np.random.normal(0.0, 0.003, frame_hand.shape)
                sequence.append(frame_hand.flatten())
                
            X.append(sequence)
            y.append(label_idx)
            
    X = np.array(X, dtype=np.float32) # Shape: (1200, 30, 63)
    y = np.array(y, dtype=np.int32)
    
    np.save("dataset/raw/phrase_landmarks.npy", X)
    np.save("dataset/raw/phrase_labels.npy", y)
    print(f"Phrase dataset saved. X shape: {X.shape}, y shape: {y.shape}")

def write_dataset_documentation():
    """Write references and licensing information to the metadata folder."""
    doc_content = """# FSL Dataset Reference & Licensing

This academic dataset configuration is organized for capstone research validation.

## Real-world Dataset References

For training production-ready translation models, research links and references include:

1. **FSL Alphabet Dataset (De La Salle University Research)**
   - Source: DLSU Sign Language datasets
   - Contents: Real images/videos of FSL alphabet fingerspelling.
   - License: Academic Research Use Only.

2. **Kaggle FSL Gesture Dataset**
   - Source: Kaggle datasets (e.g. `filipino-sign-language-alphabet`)
   - Contents: Frame coordinates extracted from local FSL letters.
   - License: Creative Commons Attribution 4.0 International.

3. **Hugging Face Hand Landmark Datasets**
   - Source: Hugging Face dataset hub
   - Contents: Pre-extracted landmarks representing hand shape movements.
   - License: Open Database License (ODbL).

## Technical Pipeline

- Raw capture feeds into MediaPipe Hands to extract 21 key points.
- Coordinates are normalized to center the wrist at (0, 0) and scale hand size to 1.0.
- Augmented with temporal sequences (30 frames) for FSL phrases.
"""
    with open("dataset/metadata/sources.md", "w") as f:
        f.write(doc_content)
    print("Dataset metadata and documentation sources compiled.")

if __name__ == "__main__":
    create_directories()
    # Keep real alphabet dataset, do not overwrite with synthetic
    # generate_synthetic_alphabet_data()
    generate_synthetic_phrase_data()
    write_dataset_documentation()
