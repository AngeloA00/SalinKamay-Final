import numpy as np

def normalize_landmarks(landmarks_list):
    """
    Normalize a flat list of 63 coordinates (21 landmarks * 3 coordinates).
    1. Reshape list to (21, 3).
    2. Center all landmarks relative to the wrist joint (landmark 0).
    3. Scale landmarks relative to the rigid bone segment between the wrist (0) and 
       the middle finger MCP knuckle (9). This avoids scale fluctuations when fingers open/close.
    4. Flatten back to 63 features and return as a numpy array.
    """
    try:
        landmarks = np.array(landmarks_list, dtype=np.float32).reshape(21, 3)
    except ValueError as e:
        raise ValueError(f"Invalid landmark dimensions. Expected 63 floats, got {len(landmarks_list)}") from e
        
    # Center landmarks at wrist
    wrist = landmarks[0]
    centered_landmarks = landmarks - wrist
    
    # Rigid scale factor: distance from wrist (0) to middle finger knuckle (9)
    scale_factor = np.linalg.norm(centered_landmarks[9])
    
    # Safety fallback to maximum distance if middle finger joint overlaps wrist
    if scale_factor < 1e-4:
        distances = np.linalg.norm(centered_landmarks, axis=1)
        scale_factor = np.max(distances)
        
    if scale_factor > 0:
        normalized_landmarks = centered_landmarks / scale_factor
    else:
        normalized_landmarks = centered_landmarks
        
    return normalized_landmarks.flatten()

def normalize_sequence(sequence_list):
    """
    Normalize a sequence of frames preserving temporal spatial translation.
    1. Reshapes to (num_frames, 21, 3).
    2. Uses the wrist of the FIRST frame as the absolute origin.
    3. Uses the scale factor of the FIRST frame for all frames.
    This preserves the relative movement of the hand over time!
    """
    try:
        seq_array = np.array(sequence_list, dtype=np.float32).reshape(len(sequence_list), 21, 3)
    except ValueError as e:
        raise ValueError(f"Invalid sequence dimensions.") from e
        
    # Get absolute origin from the first frame's wrist
    origin_wrist = seq_array[0, 0]
    
    # Get scale factor from the first frame
    centered_first = seq_array[0] - origin_wrist
    scale_factor = np.linalg.norm(centered_first[9])
    
    if scale_factor < 1e-4:
        distances = np.linalg.norm(centered_first, axis=1)
        scale_factor = np.max(distances)
        if scale_factor == 0:
            scale_factor = 1.0
            
    # Normalize entire sequence using the absolute origin and constant scale
    normalized_seq = (seq_array - origin_wrist) / scale_factor
    
    # Flatten back to list of flat frames
    return [frame.flatten().tolist() for frame in normalized_seq]

