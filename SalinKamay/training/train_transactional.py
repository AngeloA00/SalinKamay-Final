import os
import json
import numpy as np

try:
    import tensorflow as tf
    from tensorflow.keras import layers, models
    from sklearn.model_selection import train_test_split
except ImportError:
    print("Error: TensorFlow and Scikit-Learn must be installed to run training.")
    exit(1)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
X_PATH = os.path.join(BASE_DIR, "dataset", "processed", "X_transactional_hand30.npy")
Y_PATH = os.path.join(BASE_DIR, "dataset", "processed", "y_transactional.npy")
CLASSES_PATH = os.path.join(BASE_DIR, "dataset", "metadata", "transactional_classes.json")
MODEL_OUT = os.path.join(BASE_DIR, "app", "models", "transactional.keras")

def add_motion_features(X):
    """Add per-frame wrist velocity and offset features."""
    wrist = X[:, :, 0:3]
    wrist_origin = wrist[:, :1, :]
    offsets = wrist - wrist_origin
    velocity = np.diff(wrist, axis=1, prepend=wrist[:, :1, :])
    return np.concatenate([X, offsets, velocity], axis=2).astype(np.float32)

def main():
    if not (os.path.exists(X_PATH) and os.path.exists(Y_PATH)):
        print("Error: Processed transactional data not found. Run extract_transactional.py first.")
        return

    print("Loading extracted transactional dataset...")
    X = np.load(X_PATH)
    y = np.load(Y_PATH)
    X = add_motion_features(X) # (N, 30, 69)

    with open(CLASSES_PATH, "r", encoding="utf-8") as f:
        classes = json.load(f)
    num_classes = len(classes)

    print(f"Loaded {len(X)} samples across {num_classes} classes.")

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = models.Sequential([
        layers.Input(shape=(30, 69)),
        layers.LayerNormalization(),

        layers.Conv1D(64, kernel_size=3, padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.2),

        layers.Bidirectional(layers.GRU(64, return_sequences=True)),
        layers.Dropout(0.3),

        layers.Bidirectional(layers.GRU(32)),
        layers.Dropout(0.3),

        layers.Dense(64, activation='relu'),
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

    print("\nStarting Training for transactional model...")
    model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=80,
        batch_size=32,
        callbacks=[early_stopping, lr_scheduler],
        verbose=1
    )

    os.makedirs(os.path.dirname(MODEL_OUT), exist_ok=True)
    model.save(MODEL_OUT)
    print(f"\nTraining Complete! Model saved to {MODEL_OUT}")

if __name__ == "__main__":
    main()
