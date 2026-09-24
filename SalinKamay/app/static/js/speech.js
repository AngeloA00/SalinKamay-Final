// Web Speech API - Text-to-Speech helper for SalinKamay
class SpeechSynthesizer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.audioCache = new Map();
        
        if (this.synth) {
            // Load voices dynamically (needed for Chrome/Safari)
            if (this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = () => this.loadVoices();
            }
            this.loadVoices();
        }
    }

    loadVoices() {
        this.voices = this.synth.getVoices();
        const preferredNames = [
            "blessica",
            "angelo",
            "filipino",
            "tagalog"
        ];

        // Prefer modern Filipino voices. Browser voice order is inconsistent,
        // so rank by language and then by the natural Filipino voice names.
        const rankedVoices = this.voices
            .map(voice => {
                const lang = voice.lang.toLowerCase();
                const label = `${voice.name} ${voice.voiceURI}`.toLowerCase();
                const preferredNameIndex = preferredNames.findIndex(name => label.includes(name));
                const isFilipino = lang === "fil-ph" || lang.startsWith("fil-") || lang === "tl-ph";
                const isPhilippineEnglish = lang === "en-ph";

                return {
                    voice,
                    score: isFilipino ? 100 : isPhilippineEnglish ? 40 : 0,
                    preferredNameIndex
                };
            })
            .filter(item => item.score > 0)
            .sort((left, right) => {
                if (left.score !== right.score) {
                    return right.score - left.score;
                }
                return (left.preferredNameIndex === -1 ? 99 : left.preferredNameIndex) -
                    (right.preferredNameIndex === -1 ? 99 : right.preferredNameIndex);
            });

        this.selectedVoice = rankedVoices[0]?.voice || null;
    }

    async fetchAudio(text, voiceProfile) {
        const cacheKey = `${voiceProfile}:${text}`;
        if (!this.audioCache.has(cacheKey)) {
            const audioPromise = fetch(
                `/api/text-to-speech?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voiceProfile)}`
            ).then(async response => {
                if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
                return response.blob();
            }).catch(error => {
                this.audioCache.delete(cacheKey);
                throw error;
            });
            this.audioCache.set(cacheKey, audioPromise);
        }
        return this.audioCache.get(cacheKey);
    }

    prefetch(text, voiceProfile = "filipino") {
        if (!text || text.trim() === "" || text.includes("Align hand") || text.includes("not recognized")) {
            return;
        }
        this.fetchAudio(text, voiceProfile).catch(() => {});
    }

    async speak(text, callbackOnEnd = null, voiceProfile = "filipino") {
        if (!this.synth) {
            console.error("Speech Synthesis not supported in this browser.");
            return;
        }

        // Cancel any ongoing speaking tasks
        this.synth.cancel();

        if (!text || text.trim() === "" || text.includes("Align hand") || text.includes("not recognized")) {
            return;
        }

        try {
            const audio = new Audio(URL.createObjectURL(await this.fetchAudio(text, voiceProfile)));
            audio.onended = () => {
                URL.revokeObjectURL(audio.src);
                callbackOnEnd?.();
            };
            audio.onerror = () => {
                URL.revokeObjectURL(audio.src);
                callbackOnEnd?.();
            };
            await audio.play();
            return;
        } catch (error) {
            console.warn("Online TTS unavailable; using installed browser voice.", error);
        }

        if (!this.selectedVoice && this.voices.length === 0) this.loadVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        const useEnglish = voiceProfile === "english";
        const fallbackVoice = useEnglish
            ? this.voices.find(voice => voice.lang.toLowerCase().startsWith("en-us"))
            : this.selectedVoice;
        utterance.lang = fallbackVoice?.lang || (useEnglish ? "en-US" : "fil-PH");
        if (fallbackVoice) utterance.voice = fallbackVoice;
        utterance.rate = 0.88;
        utterance.pitch = 1.05;
        utterance.volume = 1.0;
        utterance.onend = () => callbackOnEnd?.();
        utterance.onerror = () => callbackOnEnd?.();
        this.synth.speak(utterance);
    }

    cancel() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
}

// Global instance
const speechHelper = new SpeechSynthesizer();
