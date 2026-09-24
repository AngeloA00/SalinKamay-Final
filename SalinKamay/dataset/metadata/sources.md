# FSL Dataset Reference & Licensing

This academic dataset configuration is organized for capstone research validation.

## Real-world Dataset References

For training production-ready translation models, research links and references include:

1. **FSL Alphabet Dataset (De La Salle University Research)**
   - Source: DLSU Sign Language datasets
   - Contents: Real images/videos of FSL alphabet fingerspelling.
   - License: Academic Research Use Only.

2. **Kaggle FSL Gesture Dataset**
   - Source: Kaggle datasets (e.g. `filipino-sign-language-alphabet`)
   - Contents: Frame coordinates extracted from local FSL letters.
   - License: Creative Commons Attribution 4.0 International.

3. **Hugging Face Hand Landmark Datasets**
   - Source: Hugging Face dataset hub
   - Contents: Pre-extracted landmarks representing hand shape movements.
   - License: Open Database License (ODbL).

## Technical Pipeline

- Raw capture feeds into MediaPipe Hands to extract 21 key points.
- Coordinates are normalized to center the wrist at (0, 0) and scale hand size to 1.0.
- Augmented with temporal sequences (30 frames) for FSL phrases.
