// Translate Page Controller - SalinKamay
document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const backBtn = document.getElementById("backBtn");

    // Tab Selectors
    const fslTab = document.getElementById("fslTab");
    const hearingTab = document.getElementById("hearingTab");
    const fslView = document.getElementById("fslView");
    const hearingView = document.getElementById("hearingView");

    // FSL Mode Controllers
    const modeAlphabet = document.getElementById("modeAlphabet");
    const modePhrase = document.getElementById("modePhrase");
    const outputText = document.getElementById("outputText");
    const confidenceValue = document.getElementById("confidenceValue");
    const speakBtn = document.getElementById("speakBtn");
    const restartBufferBtn = document.getElementById("restartBufferBtn");

    // Hearing User Inputs
    const translateInput = document.getElementById("translateInput");
    const translationSuggestions = document.getElementById("translationSuggestions");
    const textTranslateBtn = document.getElementById("textTranslateBtn");
    const voiceRecBtn = document.getElementById("voiceRecBtn");
    const signAnimationBox = document.getElementById("signAnimationBox");
    const animationVideo = document.getElementById("animationVideo");
    const animationActions = document.getElementById("animationActions");
    const signInfoTitle = document.getElementById("signInfoTitle");
    const signInfoDesc = document.getElementById("signInfoDesc");
    const replayBtn = document.getElementById("replayBtn");

    // Camera & Predictor states
    let cameraController = null;
    let currentMode = "alphabet";
    let isPredicting = false;
    let lastRequestTime = 0;
    let alphabetRequestSeq = 0;
    let alphabetRequestInFlight = false;
    let pendingAlphabetLandmarks = null;
    let lastPhraseFrameTime = 0;
    let phraseCooldownUntil = 0;
    let phraseAwaitingRestart = false;
    let hearingRequestSeq = 0;
    let availableSuggestions = [];

    function resetHearingTranslation() {
        hearingRequestSeq++;
        if (translateInput) translateInput.value = "";
        if (translationSuggestions) {
            translationSuggestions.replaceChildren();
            translationSuggestions.hidden = true;
        }
        if (signAnimationBox) {
            signAnimationBox.innerHTML = `
                <div class="animation-placeholder">
                    <span class="placeholder-icon">🧏</span>
                    <p>FSL Sign Video/Animation will play here</p>
                </div>
            `;
        }
        if (animationActions) animationActions.style.display = "none";
        if (signInfoTitle) signInfoTitle.innerText = "--";
        if (signInfoDesc) signInfoDesc.innerText = "--";
    }

    function normalizeTranslationText(value) {
        return value
            .normalize("NFKC")
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[^\p{L}\p{N}']+/gu, " ")
            .trim()
            .toLocaleLowerCase();
    }

    function formatLessonTitle(lesson) {
        const englishTitle = (lesson.englishTitle || lesson.title || "").trim();
        const tagalogTitle = (lesson.tagalogTitle || lesson.title || "").trim();

        if (!englishTitle && !tagalogTitle) return lesson.title || "";
        if (!englishTitle) return tagalogTitle;
        if (!tagalogTitle) return englishTitle;

        if (englishTitle.toLowerCase() === tagalogTitle.toLowerCase()) {
            return englishTitle;
        }

        return `${englishTitle} <span class="title-tagalog">(${tagalogTitle})</span>`;
    }

    async function loadTranslationSuggestions() {
        if (!translationSuggestions) return;

        const suggestions = new Set([
            "hello", "kamusta", "thank you", "salamat", "help", "tulungan mo ako",
            "sorry", "pasensya na", "mahal kita", "kumusta ka", "paalam na",
            "good morning", "magandang umaga"
        ]);

        try {
            if (typeof getAllLessons === "function") {
                const lessons = await getAllLessons();
                lessons.forEach(lesson => {
                    // ✅ I-exclude yung transactional sa suggestions din
                    if (lesson.categoryId === "transactional") return;
                    [lesson.title, lesson.englishTitle, lesson.tagalogTitle].forEach(value => {
                        if (value && value.trim()) suggestions.add(value.trim());
                    });
                });
            }
        } catch (error) {
            console.warn("Translation suggestions could not be loaded:", error);
        }

        const uniqueSuggestions = new Map();
        suggestions.forEach(value => {
            const normalized = normalizeTranslationText(value);
            if (normalized && !uniqueSuggestions.has(normalized)) {
                uniqueSuggestions.set(normalized, value.trim());
            }
        });
        availableSuggestions = Array.from(uniqueSuggestions.values())
            .sort((left, right) => left.localeCompare(right));
        if (document.activeElement === translateInput) renderTranslationSuggestions();
    }

    function renderTranslationSuggestions() {
        if (!translationSuggestions || !translateInput) return;

        const query = normalizeTranslationText(translateInput.value);
        const filtered = availableSuggestions
            .filter(value => !query || normalizeTranslationText(value).includes(query));

        const matches = query
            ? filtered.sort((a, b) => {
                const aNorm = normalizeTranslationText(a);
                const bNorm = normalizeTranslationText(b);
                const aStarts = aNorm.startsWith(query);
                const bStarts = bNorm.startsWith(query);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return a.localeCompare(b);
            })
            : filtered;

        translationSuggestions.replaceChildren(...matches.map(value => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "translation-suggestion";
            option.setAttribute("role", "option");
            const icon = document.createElement("span");
            icon.className = "translation-suggestion-icon";
            icon.textContent = "⌕";
            const label = document.createElement("span");
            label.className = "translation-suggestion-text";
            label.textContent = value;
            option.append(icon, label);
            option.addEventListener("mousedown", event => event.preventDefault());
            option.addEventListener("click", () => {
                translateInput.value = value;
                translationSuggestions.hidden = true;
                translateInput.focus();
            });
            return option;
        }));
        translationSuggestions.hidden = matches.length === 0;
    }

    translateInput.addEventListener("focus", () => {
        if (availableSuggestions.length <= 13) {
            loadTranslationSuggestions();
        }
        renderTranslationSuggestions();
    });
    translateInput.addEventListener("input", renderTranslationSuggestions);
    document.addEventListener("click", event => {
        if (!translationSuggestions.contains(event.target) && event.target !== translateInput) {
            translationSuggestions.hidden = true;
        }
    });

    loadTranslationSuggestions();

    if (restartBufferBtn) {
        restartBufferBtn.style.display = "none";
    }

    // Initialize Camera Controller
    if (document.getElementById("video")) {
        cameraController = new CameraController("video", "canvas", "cameraStatus");
    }

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            if (cameraController) cameraController.stop();
            window.location.href = "/";
        });
    }

    // --- TAB SWITCH ROUTINES ---
    fslTab.addEventListener("click", () => {
        resetHearingTranslation();
        fslTab.classList.add("active");
        hearingTab.classList.remove("active");
        fslView.classList.add("active");
        hearingView.classList.remove("active");
        startFslTranslation();
    });

    hearingTab.addEventListener("click", () => {
        resetHearingTranslation();
        hearingTab.classList.add("active");
        fslTab.classList.remove("active");
        hearingView.classList.add("active");
        fslView.classList.remove("active");

        if (cameraController) {
            cameraController.stop();
        }
        predictionSmoother.clear();
    });

    // --- RESTART/REFRESH GESTURE BUFFER ---
    function restartGestureBuffer() {
        if (typeof predictionSmoother !== "undefined") {
            predictionSmoother.clear();
        }
        isPredicting = false;
        lastRequestTime = 0;
        lastPhraseFrameTime = 0;
        phraseCooldownUntil = 0;
        phraseAwaitingRestart = false;
        alphabetRequestSeq++;

        if (currentMode === "phrase") {
            outputText.innerText = "Buffering: 0/30 frames...";
            if (restartBufferBtn) restartBufferBtn.style.display = "inline-flex";
        } else {
            outputText.innerText = "Align hand to begin...";
            if (restartBufferBtn) restartBufferBtn.style.display = "none";
        }

        confidenceValue.innerText = "Confidence: --%";
        speakBtn.disabled = true;

        if (restartBufferBtn) {
            restartBufferBtn.classList.add("rotating");
            setTimeout(() => restartBufferBtn.classList.remove("rotating"), 600);
        }
    }

    if (restartBufferBtn) {
        restartBufferBtn.addEventListener("click", restartGestureBuffer);
    }

    // --- FSL MODE CONTROLLERS ---
    modeAlphabet.addEventListener("click", () => {
        modeAlphabet.classList.add("active");
        modePhrase.classList.remove("active");
        currentMode = "alphabet";
        if (restartBufferBtn) restartBufferBtn.style.display = "none";
        restartGestureBuffer();
    });

    modePhrase.addEventListener("click", () => {
        modePhrase.classList.add("active");
        modeAlphabet.classList.remove("active");
        currentMode = "phrase";
        if (restartBufferBtn) restartBufferBtn.style.display = "inline-flex";
        restartGestureBuffer();
    });

    // --- TTS SPEAKER TRIGGER ---
    speakBtn.addEventListener("click", () => {
        const text = outputText.innerText;
        if (text && !text.includes("Align hand") && !text.includes("Gesture not recognized")) {
            speakBtn.classList.add("pulse");
            const voiceProfile = currentMode === "alphabet" ? "english" : "filipino";
            speechHelper.speak(text, () => {
                speakBtn.classList.remove("pulse");
            }, voiceProfile);
        }
    });

    // --- FSL USER CAM INFERENCE ---
    function startFslTranslation() {
        if (!cameraController) return;

        predictionSmoother.clear();
        cameraController.start(async (landmarks) => {
            const now = Date.now();

            if (currentMode === "phrase" && !phraseAwaitingRestart) {
                if (now >= phraseCooldownUntil && now - lastPhraseFrameTime >= 50) {
                    predictionSmoother.addLandmarksToBuffer(landmarks);
                    lastPhraseFrameTime = now;
                }
            }

            if (currentMode === "alphabet") {
                pendingAlphabetLandmarks = landmarks;
                if (!alphabetRequestInFlight && now - lastRequestTime >= 100) {
                    lastRequestTime = now;
                    const nextLandmarks = pendingAlphabetLandmarks;
                    pendingAlphabetLandmarks = null;
                    predictAlphabetAPI(nextLandmarks);
                }
                return;
            }

            if (currentMode === "phrase") {
                if (isPredicting || phraseAwaitingRestart || now < phraseCooldownUntil) {
                    return;
                }

                const seq = predictionSmoother.getLandmarksSequence();
                if (seq) {
                    isPredicting = true;
                    await predictPhraseAPI(seq);
                } else {
                    const framesLoaded = predictionSmoother.landmarkBuffer.length;
                    outputText.innerText = `Buffering: ${framesLoaded}/30 frames...`;
                }
            }
        });
    }

    async function predictAlphabetAPI(landmarks) {
        const myRequestId = ++alphabetRequestSeq;
        alphabetRequestInFlight = true;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch("/api/predict/alphabet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ landmarks }),
                signal: controller.signal
            });

            if (myRequestId !== alphabetRequestSeq) return;

            if (response.ok) {
                const result = await response.json();
                if (myRequestId !== alphabetRequestSeq) return;
                handlePredictionResult(result.prediction, result.confidence);
            } else {
                const detail = await response.text();
                if (myRequestId !== alphabetRequestSeq) return;
                outputText.innerText = "Translation unavailable";
                console.error("Alphabet prediction rejected:", detail);
            }
        } catch (e) {
            if (myRequestId !== alphabetRequestSeq) return;
            console.error("Predict Alphabet connection failed:", e);
            outputText.innerText = e.name === "AbortError" ? "Translation timed out" : "Translation unavailable";
        } finally {
            clearTimeout(timeoutId);
            alphabetRequestInFlight = false;
        }
    }

    async function predictPhraseAPI(sequence) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch("/api/predict/phrase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sequence }),
                signal: controller.signal
            });

            if (response.ok) {
                const result = await response.json();
                handlePredictionResult(result.prediction, result.confidence);
            } else {
                const detail = await response.text();
                outputText.innerText = "Phrase translation unavailable";
                console.error("Phrase prediction rejected:", detail);
            }
        } catch (e) {
            console.error("Predict Phrase connection failed:", e);
            outputText.innerText = e.name === "AbortError" ? "Phrase translation timed out" : "Phrase translation unavailable";
        } finally {
            clearTimeout(timeoutId);
            isPredicting = false;
            predictionSmoother.clear();
            lastPhraseFrameTime = 0;
            phraseCooldownUntil = Date.now() + 500;
            phraseAwaitingRestart = true;
        }
    }

    function handlePredictionResult(prediction, confidence) {
        const smoothed = predictionSmoother.smooth(prediction, confidence);
        outputText.innerText = smoothed;

        if (prediction.includes("not recognized")) {
            confidenceValue.innerText = "Confidence: --%";
            speakBtn.disabled = true;
        } else {
            confidenceValue.innerText = `Confidence: ${(confidence * 100).toFixed(0)}%`;
            speakBtn.disabled = false;
            const voiceProfile = currentMode === "alphabet" ? "english" : "filipino";
            speechHelper.prefetch(smoothed, voiceProfile);
        }
    }

    // --- HEARING USER: TRANSLATE TEXT/SPEECH TO SIGN ---
    textTranslateBtn.addEventListener("click", () => {
        const text = translateInput.value;
        performTextToSign(text);
    });

    translateInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (translationSuggestions) translationSuggestions.hidden = true;
        } else if (e.key === "Enter") {
            if (translationSuggestions) translationSuggestions.hidden = true;
            performTextToSign(translateInput.value);
        }
    });

    async function performTextToSign(text) {
        if (!text || text.trim() === "") return;
        const requestId = ++hearingRequestSeq;

        try {
            signAnimationBox.innerHTML = `
                <div class="loading-spinner"></div>
                <p style="text-align: center; color: var(--text-light)">Searching sign directory...</p>
            `;
            animationActions.style.display = "none";

            const query = normalizeTranslationText(text);

            if (query.length === 1 && query.match(/[a-z]/i)) {
                const letter = query.toUpperCase();
                renderFslAnimation(
                    letter,
                    `The letter '${letter}' in Filipino Sign Language fingerspelling`,
                    `/fsl_alphabet_sign/fsl_alphabet_sign/${letter}.png`,
                    [
                        `Form the shape of the letter '${letter}' with your dominant hand`,
                        "Keep your arm relaxed and hold the hand shape static facing the viewer"
                    ]
                );
                return;
            }

            let matchedLesson = null;
            try {
                if (typeof getAllLessons === "function") {
                    const lessons = await getAllLessons();
                    if (requestId !== hearingRequestSeq) return;
                    // ✅ I-exclude yung transactional category sa search — para
                    //    yung Numbers/Greetings lessons (na may fsl-105-dataset
                    //    videos) yung unang mahanap, hindi yung transactional.
                    matchedLesson = lessons
                        .filter(l => l.categoryId !== "transactional")
                        .find(l =>
                            [l.title, l.englishTitle, l.tagalogTitle]
                                .filter(Boolean)
                                .some(value => normalizeTranslationText(value) === query)
                        );
                }
            } catch (err) {
                console.warn("IndexedDB search failed:", err);
            }

            if (matchedLesson) {
                let animationFile = matchedLesson.animation;
                if (matchedLesson.categoryId === "alphabet") {
                    const letter = matchedLesson.title.toUpperCase();
                    animationFile = `/fsl-alphabet/Collated/${letter}/${letter}_1.jpg`;
                }
                renderFslAnimation(
                    formatLessonTitle(matchedLesson),
                    matchedLesson.description,
                    animationFile,
                    matchedLesson.steps
                );
                return;
            }

            const response = await fetch(`/api/text-to-sign?text=${encodeURIComponent(text)}`);
            if (requestId !== hearingRequestSeq) return;
            const result = await response.json();
            if (requestId !== hearingRequestSeq) return;

            if (result.status === "success" && result.match) {
                const data = result.data;
                renderFslAnimation(formatLessonTitle(data), data.description, data.animation, data.steps);
            } else {
                signAnimationBox.innerHTML = `
                    <div class="animation-placeholder">
                        <span class="placeholder-icon">⚠️</span>
                        <p style="color: var(--danger); font-weight: 600;">Gesture Not Found</p>
                        <p style="font-size: 0.85rem; max-width: 250px; margin-top: 4px;">${result.message || 'FSL description not registered.'}</p>
                    </div>
                `;
            }
        } catch (e) {
            if (requestId !== hearingRequestSeq) return;
            console.error("Text to sign request error:", e);
            signAnimationBox.innerHTML = `<div class="animation-placeholder"><p>Connection failure. Offline mode Active.</p></div>`;
        }
    }

    window.addEventListener("pageshow", () => {
        resetHearingTranslation();
    });

    function renderFslAnimation(title, description, file, steps) {
        signAnimationBox.innerHTML = "";

        const mediaSrc = file.startsWith('/')
            ? encodeURI(file)
            : encodeURI(`/static/animations/${file}`);

        if (mediaSrc.match(/\.(png|jpe?g|gif|webp)$/i)) {
            const img = document.createElement("img");
            img.id = "animationImage";
            img.src = mediaSrc;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
            img.style.borderRadius = "var(--radius-lg)";

            img.onerror = () => {
                img.style.display = "none";
                renderVisualSignSkeletonDemo(title, steps);
            };

            signAnimationBox.appendChild(img);

            replayBtn.onclick = () => {
                renderVisualSignSkeletonDemo(title, steps);
            };
        } else {
            const video = document.createElement("video");
            video.id = "animationVideo";
            video.playsInline = true;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.src = mediaSrc;
            video.style.width = "100%";
            video.style.height = "100%";
            video.style.objectFit = "contain";
            video.style.borderRadius = "var(--radius-lg)";

            video.onerror = () => {
                video.style.display = "none";
                renderVisualSignSkeletonDemo(title, steps);
            };

            signAnimationBox.appendChild(video);

            replayBtn.onclick = () => {
                if (video.style.display !== "none") {
                    video.currentTime = 0;
                    video.play();
                } else {
                    renderVisualSignSkeletonDemo(title, steps);
                }
            };
        }

        signInfoTitle.innerHTML = title;
        signInfoDesc.innerText = description;
        animationActions.style.display = "flex";
    }

    function renderVisualSignSkeletonDemo(title, steps) {
        signAnimationBox.innerHTML = "";
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        signAnimationBox.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let stepIndex = 0;
        let frameCount = 0;
        let animationId;

        function drawFrame() {
            if (!canvas.parentNode) {
                cancelAnimationFrame(animationId);
                return;
            }

            if (canvas.width !== canvas.clientWidth) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 20) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
            }

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            frameCount++;
            const t = (frameCount % 60) / 60;
            const bounce = Math.sin(t * Math.PI * 2) * 20;
            const waveX = Math.cos(t * Math.PI * 2) * 30;

            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.strokeStyle = "#10b981";
            ctx.beginPath();
            ctx.moveTo(centerX - 40, canvas.height);
            ctx.lineTo(centerX - 20, centerY + 80 + bounce / 2);
            ctx.lineTo(centerX + waveX, centerY + 20 + bounce);
            ctx.stroke();

            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(centerX + waveX, centerY + 20 + bounce, 18, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#34d399";
            ctx.lineWidth = 4;
            for (let i = 0; i < 5; i++) {
                const angle = -Math.PI / 2 + (i - 2) * 0.2;
                ctx.beginPath();
                ctx.moveTo(centerX + waveX, centerY + 20 + bounce);
                ctx.lineTo(
                    centerX + waveX + Math.cos(angle) * 35,
                    centerY + bounce + Math.sin(angle) * 35
                );
                ctx.stroke();
            }

            ctx.fillStyle = "var(--text)";
            ctx.font = "bold 14px Outfit";
            ctx.textAlign = "center";
            ctx.fillText(`FSL Vector: [${title.toUpperCase()}]`, centerX, 30);

            ctx.fillStyle = "var(--text-light)";
            ctx.font = "12px Outfit";
            ctx.fillText(steps[Math.floor(frameCount / 80) % steps.length], centerX, canvas.height - 15);

            animationId = requestAnimationFrame(drawFrame);
        }

        drawFrame();
    }

    // ============================================================
    // MICROPHONE SPEECH TRANSCRIPTION
    // ============================================================
    voiceRecBtn.addEventListener("click", () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Local Speech Recognition is not supported by your browser. Attempting backend speech analysis...");
            triggerAudioUploadFallback();
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "fil-PH";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        voiceRecBtn.classList.add("pulse");
        voiceRecBtn.style.backgroundColor = "var(--danger)";
        voiceRecBtn.style.color = "white";
        translateInput.placeholder = "Listening...";

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            translateInput.value = transcript;
            performTextToSign(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            translateInput.placeholder = "Error: Try typing instead...";
            resetVoiceButton();

            if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                if (cameraController && typeof cameraController.showMicPermissionModal === "function") {
                    cameraController.showMicPermissionModal();
                }
            }
        };

        recognition.onend = () => {
            resetVoiceButton();
        };
    });

    function resetVoiceButton() {
        voiceRecBtn.classList.remove("pulse");
        voiceRecBtn.style.backgroundColor = "";
        voiceRecBtn.style.color = "";
        translateInput.placeholder = "Type letters or greetings...";
    }

    function triggerAudioUploadFallback() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "audio/*";

        fileInput.onchange = async () => {
            const file = fileInput.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                translateInput.placeholder = "Uploading and transcribing audio...";
                const response = await fetch("/api/speech-to-text", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                if (result.status === "success") {
                    translateInput.value = result.text;
                    performTextToSign(result.text);
                } else {
                    alert("Transcription failed.");
                }
            } catch (e) {
                console.error("Speech-to-text upload failed:", e);
                alert("Could not connect to backend speech API.");
            } finally {
                translateInput.placeholder = "Type letters or greetings...";
            }
        };

        fileInput.click();
    }

    // ============================================================
    // PAGE INFO BUTTON (upper-right ng page)
    // ============================================================
    const pageInfoBtn = document.getElementById("pageInfoBtn");
    const pageInfoTooltip = document.getElementById("pageInfoTooltip");

    function updateInfoButtonForTab() {
        if (!pageInfoTooltip) return;
        const isFslActive = fslTab && fslTab.classList.contains("active");
        pageInfoTooltip.textContent = isFslActive ? "Camera & Privacy" : "Mic & Privacy";
    }

    if (pageInfoBtn) {
        pageInfoBtn.addEventListener("click", () => {
            const isFslActive = fslTab && fslTab.classList.contains("active");
            if (cameraController) {
                if (isFslActive) {
                    cameraController.showPrivacyModal();
                } else {
                    cameraController.showMicPrivacyModal();
                }
            }
        });
    }

    if (fslTab) {
        fslTab.addEventListener("click", updateInfoButtonForTab);
    }
    if (hearingTab) {
        hearingTab.addEventListener("click", updateInfoButtonForTab);
    }

    updateInfoButtonForTab();

    // ============================================================
    // AUTO-STOP/RESTART CAMERA PAG LUMIPAT NG TAB
    // ============================================================
    document.addEventListener("visibilitychange", () => {
        if (!cameraController) return;

        if (document.hidden) {
            console.log("Tab hidden — stopping camera.");
            cameraController.stop();
        } else {
            if (fslTab && fslTab.classList.contains("active")) {
                console.log("Tab visible — restarting camera.");
                startFslTranslation();
            }
        }
    });

    if (fslTab.classList.contains("active")) {
        startFslTranslation();
    }
});
