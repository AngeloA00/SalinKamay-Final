import os
import urllib.request
import numpy as np
import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from preprocess import normalize_landmarks_vector
def extract_alphabet_landmarks():
    model_path = "hand_landmarker.task"
    
    # Programmatically download the model file if not exists
    if not os.path.exists(model_path):
        print("Downloading hand_landmarker.task model...")
        url = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
        try:
            urllib.request.urlretrieve(url, model_path)
            print("Model downloaded successfully!")
        except Exception as e:
            print(f"Error downloading model: {e}")
            return
    print("Initializing MediaPipe HandLandmarker Tasks API...")
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.HandLandmarkerOptions(
        base_options=base_options,
        num_hands=1,
        min_hand_detection_confidence=0.5
    )
    
    detector = vision.HandLandmarker.create_from_options(options)
    
    dataset_dir = "fsl-alphabet/Collated"
    classes = [chr(65 + i) for i in range(26)] # A-Z
    
    X = []
    y = []
    
    print("Starting landmark extraction from fsl-alphabet dataset...")
    
    total_processed = 0
    total_detected = 0
    
    for label_idx, class_name in enumerate(classes):
        class_dir = os.path.join(dataset_dir, class_name)
        if not os.path.isdir(class_dir):
            print(f"Warning: Directory {class_dir} not found. Skipping.")
            continue
            
        print(f"Processing letter {class_name}...")
        filenames = [f for f in os.listdir(class_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        detected_in_class = 0
        for filename in filenames:
            img_path = os.path.join(class_dir, filename)
            
            try:
                # Load image with MediaPipe Image format
                mp_image = mp.Image.create_from_file(img_path)
                total_processed += 1
                
                # Detect landmarks
                detection_result = detector.detect(mp_image)
                
                if detection_result.hand_landmarks:
                    # Get first hand's landmarks
                    landmarks = detection_result.hand_landmarks[0]
                    coords = []
                    for lm in landmarks:
                        coords.extend([lm.x, lm.y, lm.z])
                    
                    if len(coords) == 63:
                        X.append(coords)
                        y.append(label_idx)
                        detected_in_class += 1
                        total_detected += 1
            except Exception as e:
                # Skip any corrupt or unreadable image
                continue
                
        print(f"Letter {class_name}: Hand detected in {detected_in_class}/{len(filenames)} images.")
        
    detector.close()
    
    if len(X) == 0:
        print("Error: No hand landmarks detected from the images. Check dataset directory or image quality.")
        return
    X = np.array(X, dtype=np.float32)
    y = np.array(y, dtype=np.int32)
    
    print(f"Extraction complete! Total processed images: {total_processed}, Hand detected: {total_detected}")
    
    # Save raw extracted landmarks
    os.makedirs("dataset/raw", exist_ok=True)
    np.save("dataset/raw/alphabet_landmarks.npy", X)
    np.save("dataset/raw/alphabet_labels.npy", y)
    print("Raw landmarks saved to dataset/raw/alphabet_landmarks.npy")
    
    # Preprocess (normalize) and save processed data
    print("Normalizing landmarks...")
    X_processed = np.zeros_like(X)
    for i in range(len(X)):
        X_processed[i] = normalize_landmarks_vector(X[i])
        
    os.makedirs("dataset/processed", exist_ok=True)
    np.save("dataset/processed/alphabet_X.npy", X_processed)
    np.save("dataset/processed/alphabet_y.npy", y)
    print("Normalized landmarks saved to dataset/processed/alphabet_X.npy")
if __name__ == "__main__":
    extract_alphabet_landmarks()
