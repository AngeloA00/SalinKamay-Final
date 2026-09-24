import numpy as np
import os
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split

def train_alphabet_model():
    print("Training FSL Alphabet Model...")
    
    # 1. Load preprocessed data
    X_path = "dataset/processed/alphabet_X.npy"
    y_path = "dataset/processed/alphabet_y.npy"
    
    if not (os.path.exists(X_path) and os.path.exists(y_path)):
        raise FileNotFoundError("Processed alphabet datasets not found. Please run collect.py/extract_fsl_alphabet.py and preprocess.py.")
        
    X = np.load(X_path)
    y = np.load(y_path)
    
    # 2. Train-test split
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.15, random_state=42, stratify=y
    )
    
    print(f"Training set: X_train={X_train.shape}, y_train={y_train.shape}")
    print(f"Validation set: X_val={X_val.shape}, y_val={y_val.shape}")
    
    # 3. Build Multi-Layer Perceptron (MLP) model with robust capacity
    model = models.Sequential([
        layers.Input(shape=(63,)),
        
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.2),
        
        layers.Dense(128, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.2),
        
        layers.Dense(64, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.1),
        
        layers.Dense(26, activation='softmax') # 26 alphabet classes (A-Z)
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
        patience=10,
        restore_best_weights=True,
        verbose=1
    )
    
    lr_scheduler = tf.keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=4,
        verbose=1
    )
    
    # 6. Train model
    epochs = 50
    batch_size = 64
    
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=epochs,
        batch_size=batch_size,
        callbacks=[early_stopping, lr_scheduler],
        verbose=1
    )
    
    # 7. Save model
    os.makedirs("app/models", exist_ok=True)
    model.save("app/models/alphabet.keras")
    print("Alphabet model trained and saved to app/models/alphabet.keras")
    
    # Evaluate on validation data
    val_loss, val_acc = model.evaluate(X_val, y_val, verbose=0)
    print(f"Final Validation Accuracy: {val_acc:.4f}")

if __name__ == "__main__":
    train_alphabet_model()
