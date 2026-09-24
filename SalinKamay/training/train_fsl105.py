import numpy as np
import os
import json

try:
    import tensorflow as tf
    from tensorflow.keras import layers, models
    from sklearn.model_selection import train_test_split
except ImportError:
    print("Error: TensorFlow and Scikit-Learn must be installed to run training.")
    exit(1)

def add_motion_features(X):
    """Add per-frame wrist velocity and wrist offset features."""
    wrist = X[:, :, 0:3]
    wrist_origin = wrist[:, :1, :]
    offsets = wrist - wrist_origin
    velocity = np.diff(wrist, axis=1, prepend=wrist[:, :1, :])
    return np.concatenate([X, offsets, velocity], axis=2).astype(np.float32)

def main():
    print("Loading extracted FSL-105 dataset...")
    X_path = "dataset/processed/X_fsl105.npy"
    y_path = "dataset/processed/y_fsl105.npy"
    classes_path = "dataset/metadata/fsl105_classes.json"
    
    if not (os.path.exists(X_path) and os.path.exists(y_path)):
        print("Error: Extracted data not found. Run extract_fsl105.py first.")
        return
        
    X = np.load(X_path)
    y = np.load(y_path)
    X = add_motion_features(X)  # Shape becomes (N, 30, 69)
    
    with open(classes_path, "r", encoding="utf-8") as f:
        classes = json.load(f)
    num_classes = len(classes)
    
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"Training on {num_classes} classes.")
    print(f"Train Shape: {X_train.shape}, Val Shape: {X_val.shape}")
    
    # 105 classes require a deeper/wider architecture
    model = models.Sequential([
        layers.Input(shape=(30, 69)),
        layers.LayerNormalization(),
        
        layers.Conv1D(128, kernel_size=3, padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.2),
        
        layers.Bidirectional(layers.GRU(128, return_sequences=True)),
        layers.Dropout(0.3),
        
        layers.Bidirectional(layers.GRU(64)),
        layers.Dropout(0.3),
        
        layers.Dense(128, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    early_stopping = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss', patience=15, restore_best_weights=True, verbose=1
    )
    lr_scheduler = tf.keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss', factor=0.5, patience=5, min_lr=1e-5, verbose=1
    )
    
    print("\nStarting Training...")
    model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=100,
        batch_size=64,
        callbacks=[early_stopping, lr_scheduler],
        verbose=1
    )
    
    os.makedirs("app/models", exist_ok=True)
    model.save("app/models/fsl105.keras")
    print("\nTraining Complete! Model saved to app/models/fsl105.keras")

if __name__ == "__main__":
    main()
