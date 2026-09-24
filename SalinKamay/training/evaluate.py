import numpy as np
import os
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix


def add_phrase_motion_features(X):
    wrist = X[:, :, 0:3]
    offsets = wrist - wrist[:, :1, :]
    velocity = np.diff(wrist, axis=1, prepend=wrist[:, :1, :])
    return np.concatenate([X, offsets, velocity], axis=2).astype(np.float32)

def evaluate_models():
    print("Evaluating FSL models...")
    
    evaluation_text = "# FSL Models Evaluation Summary\n\n"
    
    # 1. Evaluate Alphabet Model
    alphabet_model_path = "app/models/alphabet.keras"
    alphabet_x_path = "dataset/processed/alphabet_X.npy"
    alphabet_y_path = "dataset/processed/alphabet_y.npy"
    
    if os.path.exists(alphabet_model_path) and os.path.exists(alphabet_x_path):
        print("\n--- Alphabet Model Evaluation ---")
        model = tf.keras.models.load_model(alphabet_model_path)
        X = np.load(alphabet_x_path)
        y = np.load(alphabet_y_path)
        
        # Make predictions
        y_pred_probs = model.predict(X)
        y_pred = np.argmax(y_pred_probs, axis=1)
        
        target_names = [f"Letter {chr(65 + i)}" for i in range(26)]
        report = classification_report(y, y_pred, target_names=target_names, zero_division=0)
        print(report)
        
        evaluation_text += "## Alphabet Model\n\n"
        evaluation_text += "### Classification Report\n\n```\n" + report + "\n```\n\n"
    else:
        print("Alphabet model or datasets missing. Skipping evaluation.")
        
    # 2. Evaluate Phrase Model
    phrase_model_path = "app/models/phrase.keras"
    phrase_x_path = "dataset/processed/phrase_X.npy"
    phrase_y_path = "dataset/processed/phrase_y.npy"
    
    if os.path.exists(phrase_model_path) and os.path.exists(phrase_x_path):
        print("\n--- Phrase Model Evaluation ---")
        model = tf.keras.models.load_model(phrase_model_path)
        X = np.load(phrase_x_path)
        y = np.load(phrase_y_path)
        if model.input_shape[-1] == 69:
            X = add_phrase_motion_features(X)
        
        # Make predictions
        y_pred_probs = model.predict(X)
        y_pred = np.argmax(y_pred_probs, axis=1)
        
        target_names = ["Pasensya na", "Mahal Kita", "Salamat", "Tulungan mo ako", "Kumusta ka", "Paalam na"]
        report = classification_report(y, y_pred, target_names=target_names, zero_division=0)
        print(report)
        
        evaluation_text += "## Phrase Model\n\n"
        evaluation_text += "### Classification Report\n\n```\n" + report + "\n```\n"
    else:
        print("Phrase model or datasets missing. Skipping evaluation.")
        
    # Save statistics
    os.makedirs("dataset/metadata", exist_ok=True)
    with open("dataset/metadata/evaluation_results.md", "w") as f:
        f.write(evaluation_text)
    print("Evaluation summary saved to dataset/metadata/evaluation_results.md")

if __name__ == "__main__":
    evaluate_models()
