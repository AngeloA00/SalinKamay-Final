import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split

X = np.load("dataset/processed/phrase_X.npy")
y = np.load("dataset/processed/phrase_y.npy")

X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Try a simpler, cleaner GRU model
model = models.Sequential([
    layers.Input(shape=(30, 63)),
    layers.GRU(64, return_sequences=True),
    layers.Dropout(0.1),
    layers.GRU(32),
    layers.Dropout(0.1),
    layers.Dense(32, activation='relu'),
    layers.Dense(6, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=30,
    batch_size=16,
    verbose=1
)
