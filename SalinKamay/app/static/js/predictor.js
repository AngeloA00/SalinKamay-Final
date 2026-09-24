// Temporal smoothing and landmark buffer for SalinKamay
class PredictionSmoother {
    constructor(windowSize = 10, consensusRatio = 0.7) {
        this.windowSize = windowSize;
        this.consensusRatio = consensusRatio;
        this.predictionWindow = [];
        this.lastStablePrediction = "Align hand to begin...";
        
        // Landmark buffer for phrase recognition. Keep a slightly longer live
        // window, then resample to the 30 frames expected by the model.
        this.landmarkBuffer = [];
        this.modelFrameCount = 30;
        this.maxBufferSize = 45;
    }

    /**
     * Add a prediction to the smoothing window and return the smoothed result.
     */
    smooth(prediction, confidence) {
        if (!prediction) return this.lastStablePrediction;
        if (prediction.includes("not recognized")) {
            this.predictionWindow = [];
            this.lastStablePrediction = prediction;
            return prediction;
        }

        // Feed prediction to sliding window
        this.predictionWindow.push(prediction);
        if (this.predictionWindow.length > this.windowSize) {
            this.predictionWindow.shift();
        }

        // Count occurrences of each prediction in window
        const counts = {};
        let maxCount = 0;
        let mostFrequent = this.lastStablePrediction;

        for (const pred of this.predictionWindow) {
            counts[pred] = (counts[pred] || 0) + 1;
            if (counts[pred] > maxCount) {
                maxCount = counts[pred];
                mostFrequent = pred;
            }
        }

        // Only update stable prediction if we reach consensus ratio
        const ratio = maxCount / this.predictionWindow.length;
        if (ratio >= this.consensusRatio) {
            this.lastStablePrediction = mostFrequent;
        }

        return this.lastStablePrediction;
    }

    /**
     * Store raw landmark frames for phrase sequence classification.
     */
    addLandmarksToBuffer(landmarks) {
        if (landmarks && landmarks.length === 63) {
            this.landmarkBuffer.push(landmarks);
            if (this.landmarkBuffer.length > this.maxBufferSize) {
                this.landmarkBuffer.shift();
            }
        }
    }

    /**
     * Retrieves the current phrase sequence resampled to 30 frames.
     * Returns null if the buffer is not yet full.
     */
    getLandmarksSequence() {
        if (this.landmarkBuffer.length >= this.modelFrameCount) {
            if (this.landmarkBuffer.length === this.modelFrameCount) {
                return this.landmarkBuffer.slice();
            }

            const sequence = [];
            const lastIndex = this.landmarkBuffer.length - 1;
            for (let i = 0; i < this.modelFrameCount; i++) {
                const sourceIndex = Math.round((i * lastIndex) / (this.modelFrameCount - 1));
                sequence.push(this.landmarkBuffer[sourceIndex]);
            }
            return sequence;
        }
        return null;
    }

    clear() {
        this.predictionWindow = [];
        this.landmarkBuffer = [];
        this.lastStablePrediction = "Align hand to begin...";
    }
}

// Global instance
const predictionSmoother = new PredictionSmoother();
