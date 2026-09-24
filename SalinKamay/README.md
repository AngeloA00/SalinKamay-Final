# SalinKamay - AI-Powered Filipino Sign Language Translation and Learning System

SalinKamay is a real-time Filipino Sign Language (FSL) translation and interactive curriculum portal designed for both deaf and hearing users.

---

## 🌟 Key Features

### 1. FSL User Mode (Sign-to-Text-to-Speech)
- **Real-time Camera tracking**: Leverages MediaPipe Hands locally in the browser to extract hand skeleton structures.
- **AI Prediction**: Transmits coordinates to the FastAPI backend where TensorFlow dense neural network and LSTM models perform classifications.
- **Confidence Badge**: Displays confidence scores. Shows warning messages when gestures are below a `70%` threshold.
- **Text-to-Speech**: Synthesizes vocal speech via the Web Speech API (`SpeechSynthesis`).

### 2. Hearing User Mode (Text/Speech-to-Sign)
- **Dual Inputs**: Translate typed text or spoken words (using browser SpeechRecognition or backend WAV speech analysis fallback).
- **Interactive Player**: Renders FSL signs using local media resources with a canvas-based animated vector hand skeleton fallback if assets are missing.

### 3. Interactive Curriculum
- **IndexedDB Catalog**: Displays 21 curricular categories (Alphabet, Numbers, Greetings, Colors, Days, Weather, etc.) populated offline.
- **Sign step-by-step description**: Interactive details showing hand coordinates, thumb position, and movement vectors.
- **Recently Viewed**: Dynamically tracks the last viewed sign and displays a quick navigation link.

### 4. Progressive Web App (PWA)
- Fully installable from Chrome.
- Caches main assets and templates for offline operations.

---

## 📂 Project Structure

```
SalinKamay/
├── app/
│   ├── ai/
│   │   ├── preprocessing.py    # Coordinate centering & scale normalization
│   │   └── predictor.py        # Keras models loader & inference handlers
│   ├── models/
│   │   ├── alphabet.keras      # Trained static gesture weights
│   │   └── phrase.keras        # Trained sequential LSTM gesture weights
│   ├── routes/
│   │   ├── learning.py         # Text-to-sign dictionary lookup route
│   │   ├── predict.py          # Real-time AI prediction API routes
│   │   └── speech.py           # Audio transcription uploads endpoint
│   ├── static/
│   │   ├── css/                # Global, landing, learning, translate stylesheets
│   │   ├── js/                 # DB seeding, PWA registers, translation controllers
│   │   ├── manifest.json       # PWA installer configurations
│   │   └── service-worker.js   # Offline resource cacher
│   ├── templates/
│   │   ├── index.html          # Landing portal page
│   │   ├── translate.html      # Translation interface
│   │   ├── learning.html       # Sign curriculum list
│   │   └── lesson.html         # Sign steps and demonstration viewer
│   └── main.py                 # FastAPI core application server
├── dataset/
│   ├── raw/                    # Raw generated coordinate files
│   ├── processed/              # Normalized training datasets
│   └── metadata/               # Academic references & evaluation results
├── training/
│   ├── collect.py              # Data directories setup and raw generators
│   ├── preprocess.py           # Coordinate centering preprocessor
│   ├── train_alphabet.py       # Alphabet dense MLP model training script
│   ├── train_phrase.py         # Phrase sequential LSTM model training script
│   └── evaluate.py             # Validation classifier report compiler
├── scripts/
│   └── start.ps1               # PowerShell uvicorn quick start script
├── documentation/
│   └── installation.md         # Deployment requirements and technical notes
├── requirements.txt            # System python dependencies
└── README.md                   # Project overview (this file)
```

---

## 🚀 Getting Started

### 1. Build and Train Models
Run the setup pipeline from the project root:

```powershell
# Setup virtual environment and dependencies
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Run dataset compilation and model training
python training/collect.py
python training/preprocess.py
python training/train_alphabet.py
python training/train_phrase.py
python training/evaluate.py
```

### 2. Run the Application
Launch the FastAPI development server:

```powershell
python -m uvicorn app.main:app --app-dir .\SalinKamay --port 8000 --host 127.0.0.1 --reload
```

Visit the app in Google Chrome at: **`http://127.0.0.1:8000`**
