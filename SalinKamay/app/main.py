from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes import predict, learning

try:
    import multipart  # Provided by the optional python-multipart package.
    from app.routes import speech
except ImportError:
    speech = None

# Get base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI(
    title="SalinKamay API",
    description="AI-Powered Filipino Sign Language Translation and Learning System API",
    version="1.0.0"
)

# CORS configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(predict.router, prefix="/api", tags=["Prediction"])
app.include_router(learning.router, prefix="/api", tags=["Learning"])
if speech is not None:
    app.include_router(speech.router, prefix="/api", tags=["Speech"])
else:
    print("Speech-upload API is unavailable because python-multipart is not installed.")

# Mount static files
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# Mount dataset files
app.mount("/fsl-105-dataset", StaticFiles(directory=os.path.join(BASE_DIR, "..", "fsl-105-dataset")), name="dataset_static")
app.mount("/fsl_alphabet_sign", StaticFiles(directory=os.path.join(BASE_DIR, "..", "fsl_alphabet_sign")), name="alphabet_static")
app.mount("/fsl-alphabet", StaticFiles(directory=os.path.join(BASE_DIR, "..", "fsl-alphabet")), name="alphabet_dataset_static")
app.mount("/custom_fsl", StaticFiles(directory=os.path.join(BASE_DIR, "..", "custom_fsl")), name="custom_fsl_static")
app.mount("/transactional", StaticFiles(directory=os.path.join(BASE_DIR, "..", "Transactional Filipino Sign Language Dataset")), name="transactional_static")
app.mount("/dataset", StaticFiles(directory=os.path.join(BASE_DIR, "..", "dataset")), name="dataset_static")
app.mount("/additional-sl", StaticFiles(directory=os.path.join(BASE_DIR, "..", "additional-sl")), name="additional_sl_static")

# HTML Template Views (Serving static files as views for simplified PWA/frontend architecture)
@app.get("/")
def read_index():
    return FileResponse(os.path.join(BASE_DIR, "templates", "index.html"))

@app.get("/translate")
def read_translate():
    return FileResponse(
        os.path.join(BASE_DIR, "templates", "translate.html"),
        headers={"Cache-Control": "no-store"}
    )

@app.get("/learning")
def read_learning():
    return FileResponse(os.path.join(BASE_DIR, "templates", "learning.html"))

@app.get("/lesson")
def read_lesson():
    return FileResponse(os.path.join(BASE_DIR, "templates", "lesson.html"))

# PWA Scope Root Handlers
@app.get("/manifest.json")
def get_manifest():
    return FileResponse(os.path.join(BASE_DIR, "static", "manifest.json"))

@app.get("/service-worker.js")
def get_service_worker():
    return FileResponse(os.path.join(BASE_DIR, "static", "service-worker.js"), headers={"Service-Worker-Allowed": "/"})
