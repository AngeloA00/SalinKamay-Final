# SalinKamay - Deployment and User Guide

This document outlines the architecture, setup requirements, and usage manual for the **SalinKamay Filipino Sign Language Translation and Learning System**.

---

## 1. System Requirements

- **Operating System**: Windows (tested on Windows 10/11)
- **Runtime Environment**: Python 3.12 (with pip package manager)
- **Browser Compatibility**: Google Chrome (v90+ recommended for native WebCam and webSpeech API support)
- **Hardware Profile**: Integrated Webcam or USB camera, 4GB RAM minimum (8GB recommended for AI inference)

---

## 2. Project Architecture

SalinKamay utilizes a **Landmark-Based Client-Server Architecture** to perform translation:

```
[Webcam Stream]
      │
      ▼
[Client-side MediaPipe Hands (CDN)] ───► Extract 21 Coordinates (x, y, z)
      │
      ▼
[FastAPI Backend /predict Endpoint] ───► Run Keras Models (alphabet.keras / phrase.keras)
      │
      ▼
[JSON Result & Confidence badge]    ───► Display prediction in HTML view
```

- **Database System**: Client-side **IndexedDB** for offline caching of settings, lessons list, recently viewed sign metadata, and assets.
- **Offline PWA Capabilities**: Managed via `/service-worker.js` caching HTML/CSS/JS code locally.

---

## 3. Setup and Installation

### Step 3.1: Python Virtual Environment Setup
Ensure you are in the project root directory, then initialize and activate the virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Step 3.2: Reconstruct Datasets and Train AI Models
Run the training sequence from the root workspace to compile the Keras models locally:

```powershell
# 1. Generate/collect raw landmark datasets
python training/collect.py

# 2. Run normalization preprocessing
python training/preprocess.py

# 3. Train alphabet dense neural network model
python training/train_alphabet.py

# 4. Train phrase sequence LSTM neural network model
python training/train_phrase.py

# 5. Evaluate models and output precision reports
python training/evaluate.py
```

---

## 4. Running the Web Application

To run the web app in developer mode:

```powershell
# Activate venv if not already active
.\.venv\Scripts\Activate.ps1

# Run the FastAPI server
python -m uvicorn app.main:app --app-dir .\SalinKamay --port 8000 --host 127.0.0.1 --reload
```

Open Google Chrome and navigate to: **`http://127.0.0.1:8000`**

---

## 5. Offline Capabilities & PWA Installation

### PWA Installation
1. Open Chrome and head to the app URL (`http://127.0.0.1:8000`).
2. Click the **Install Icon** on the right side of the address bar (looks like a monitor with a down arrow).
3. The app is now installed on your desktop/start menu and runs inside a standalone frame.

### Offline Testing
1. In Chrome Developer Tools (`F12`), go to the **Application** tab.
2. Select **Service Workers** and click the **Offline** checkbox.
3. Reload the page (`F5`). All navigation panels, HTML layouts, styles, and curriculums remain functional, running from local Service Worker cache and IndexedDB.
