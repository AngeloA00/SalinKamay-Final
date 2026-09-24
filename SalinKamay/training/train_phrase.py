import numpy as np
import os
import json
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split


PHRASE_CLASSES = ["Pasensya na", "Mahal Kita", "Salamat", "Tulungan mo ako", "Kumusta ka", "Paalam na"]


def add_motion_features(X):
    """
    Add per-frame wrist velocity and wrist offset features.
    The target phrases differ strongly by X/Y/Z trajectory, so these features
    make the sequence model focus on performed movement, not only hand shape.
    """
    wrist = X[:, :, 0:3]
    wrist_origin = wrist[:, :1, :]
    offsets = wrist - wrist_origin
    velocity = np.diff(wrist, axis=1, prepend=wrist[:, :1, :])
    return np.concatenate([X, offsets, velocity], axis=2).astype(np.float32)

def train_phrase_model():
    print("Training FSL Phrase Model with Bidirectional LSTM...")
    tf.keras.utils.set_random_seed(42)
    
    # 1. Load preprocessed sequence data
    X_path = "dataset/processed/phrase_X.npy"
    y_path = "dataset/processed/phrase_y.npy"
    
    if not (os.path.exists(X_path) and os.path.exists(y_path)):
        raise FileNotFoundError("Processed phrase datasets not found. Please run collect.py and preprocess.py.")
        
    X = np.load(X_path)  # Shape: (N, 30, 63)
    y = np.load(y_path)
    X = add_motion_features(X)  # Shape: (N, 30, 69)
    
    # 2. Train-test split
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"Training set: X_train={X_train.shape}, y_train={y_train.shape}")
    print(f"Validation set: X_val={X_val.shape}, y_val={y_val.shape}")
    
    # 3. Build temporal model
    model = models.Sequential([
        layers.Input(shape=(30, 69)),  # 63 landmarks + wrist offset/velocity
        layers.LayerNormalization(),
        
        layers.Conv1D(96, kernel_size=3, padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.15),
        
        layers.Bidirectional(layers.GRU(96, return_sequences=True)),
        layers.Dropout(0.25),
        
        layers.Bidirectional(layers.GRU(48)),
        layers.Dropout(0.25),
        
        layers.Dense(64, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.20),
        
        layers.Dense(len(PHRASE_CLASSES), activation='softmax')
    ])
    
    # 4. Compile model
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    model.summary()
    
    # 5. Callbacks for optimal convergence
    early_stopping = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=20,
        restore_best_weights=True,
        verbose=1
    )
    
    lr_scheduler = tf.keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=6,
        min_lr=1e-5,
        verbose=1
    )
    
    # 6. Train model
    epochs = 120
    batch_size = 32
    
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=epochs,
        batch_size=batch_size,
        callbacks=[early_stopping, lr_scheduler],
        verbose=1
    )
    
    # 7. Save model and training history
    os.makedirs("app/models", exist_ok=True)
    model.save("app/models/phrase.keras")
    print("Phrase model trained and saved to app/models/phrase.keras")

    os.makedirs("dataset/metadata", exist_ok=True)
    with open("dataset/metadata/phrase_training_history.json", "w", encoding="utf-8") as f:
        json.dump({k: [float(v) for v in values] for k, values in history.history.items()}, f, indent=2)
    with open("dataset/metadata/phrase_classes.json", "w", encoding="utf-8") as f:
        json.dump(PHRASE_CLASSES, f, indent=2)

if __name__ == "__main__":
    train_phrase_model()
