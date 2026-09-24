from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from app.ai.predictor import predictor_instance

router = APIRouter()

class LandmarkInput(BaseModel):
    landmarks: List[float]  # Flattened single-frame coordinates list: 21 points * 3 (x, y, z) = 63 floats

class PhraseSequenceInput(BaseModel):
    sequence: List[List[float]]  # Buffer of 30 frames, each frame containing 63 floats

@router.post("/predict/alphabet")
def predict_alphabet(data: LandmarkInput):
    if len(data.landmarks) != 63:
        raise HTTPException(
            status_code=400,
            detail=f"Expected 63 floats (21 landmarks * 3 coordinates), got {len(data.landmarks)}"
        )
    
    prediction, confidence = predictor_instance.predict_alphabet(data.landmarks)
    
    return {
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "status": "success"
    }

@router.post("/predict/phrase")
def predict_phrase(data: PhraseSequenceInput):
    if len(data.sequence) != 30:
        raise HTTPException(
            status_code=400,
            detail=f"Expected sequence of exactly 30 frames, got {len(data.sequence)}"
        )
        
    for idx, frame in enumerate(data.sequence):
        if len(frame) != 63:
            raise HTTPException(
                status_code=400,
                detail=f"Frame at index {idx} contains {len(frame)} floats. Expected exactly 63."
            )
            
    prediction, confidence = predictor_instance.predict_phrase(data.sequence)
    
    return {
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "status": "success"
    }
