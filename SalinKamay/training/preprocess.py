import numpy as np
import os

def normalize_landmarks_vector(landmarks_flat):
    """
    Normalize a flat vector of 63 coordinates (21 landmarks * 3 coordinates).
    1. Reshape to (21, 3).
    2. Subtract wrist coordinate (index 0) from all points to center at origin.
    3. Calculate rigid scale factor: Distance from wrist (0) to middle finger knuckle (9).
    4. Divide all coordinates by this scale factor to ensure scale consistency.
    5. Flatten back to 63 features.
    """
    landmarks = landmarks_flat.reshape(21, 3)
    
    # 1. Translate (center at wrist)
    wrist = landmarks[0]
    centered_landmarks = landmarks - wrist
    
    # 2. Scale (using rigid distance from wrist to joint 9)
    scale_factor = np.linalg.norm(centered_landmarks[9])
    
    # Fallback to max distance if joint 9 overlaps wrist
    if scale_factor < 1e-4:
        distances = np.linalg.norm(centered_landmarks, axis=1)
        scale_factor = np.max(distances)
        
    if scale_factor > 0:
        normalized_landmarks = centered_landmarks / scale_factor
    else:
        normalized_landmarks = centered_landmarks
        
    return normalized_landmarks.flatten()

def preprocess_alphabet():
    """Load, normalize, and save alphabet dataset."""
    print("Preprocessing alphabet dataset...")
    if not os.path.exists("dataset/raw/alphabet_landmarks.npy"):
        raise FileNotFoundError("Raw alphabet landmarks not found. Please run collect.py first.")
        
    X_raw = np.load("dataset/raw/alphabet_landmarks.npy")
    y = np.load("dataset/raw/alphabet_labels.npy")
    
    X_processed = np.zeros_like(X_raw)
    
    for i in range(len(X_raw)):
        X_processed[i] = normalize_landmarks_vector(X_raw[i])
        
    os.makedirs("dataset/processed", exist_ok=True)
    np.save("dataset/processed/alphabet_X.npy", X_processed)
    np.save("dataset/processed/alphabet_y.npy", y)
    print(f"Preprocessed alphabet dataset saved. Shape: {X_processed.shape}")

def preprocess_phrases():
    """Load, normalize, and save sequential phrase dataset."""
    print("Preprocessing phrase sequence dataset...")
    if not os.path.exists("dataset/raw/phrase_landmarks.npy") or not os.path.exists("dataset/raw/phrase_labels.npy"):
        raise FileNotFoundError("Raw phrase landmarks not found. Please run collect.py first.")
        
    X_raw = np.load("dataset/raw/phrase_landmarks.npy") # Shape: (samples, frames, 63)
    y = np.load("dataset/raw/phrase_labels.npy")
    
    # Import our new normalize_sequence from preprocessing
    import sys
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
    from app.ai.preprocessing import normalize_sequence
    
    X_processed = []
    for seq_idx in range(X_raw.shape[0]):
        sequence_list = [frame.tolist() for frame in X_raw[seq_idx]]
        # Normalize the sequence, preserving relative translation!
        normalized_seq = normalize_sequence(sequence_list)
        X_processed.append(normalized_seq)
        
    X_processed = np.array(X_processed, dtype=np.float32)
    
    os.makedirs("dataset/processed", exist_ok=True)
    np.save("dataset/processed/phrase_X.npy", X_processed)
    np.save("dataset/processed/phrase_y.npy", y)
    print(f"Preprocessed phrase dataset saved. Shape: {X_processed.shape}")

if __name__ == "__main__":
    preprocess_alphabet()
    preprocess_phrases()
