// Camera and MediaPipe Hands Controller for SalinKamay
class CameraController {
    constructor(videoElementId, canvasElementId, statusElementId) {
        this.video = document.getElementById(videoElementId);
        this.canvas = document.getElementById(canvasElementId);
        this.status = document.getElementById(statusElementId);
        
        if (this.canvas) {
            this.ctx = this.canvas.getContext("2d");
        }
        
        this.hands = null;
        this.camera = null;
        this.onLandmarksCallback = null;
        this.isRunning = false;
        this.frameRequestId = null;
        
        this.initMediaPipe();
    }

    initMediaPipe() {
        if (typeof Hands === "undefined") {
            console.error("MediaPipe Hands library is not loaded.");
            return;
        }

        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.hands.onResults((results) => this.processResults(results));
    }

    // ============================================================
    // CAMERA PERMISSION MODAL
    // (Lumalabas LANG pag clinick ni user yung "Block" sa native
    //  browser prompt — hindi ito lumalabas bago yun.)
    // ============================================================
    showCameraPermissionModal() {
        let modal = document.getElementById("cameraPermissionModal");

        if (!modal) {
            modal = document.createElement("div");
            modal.id = "cameraPermissionModal";
            modal.className = "camera-permission-modal";
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");
            modal.setAttribute("aria-labelledby", "cameraPermissionTitle");
            modal.innerHTML = `
                <div class="camera-permission-modal__backdrop"></div>
                <section class="camera-permission-modal__dialog">
                    <div class="camera-permission-modal__icon" aria-hidden="true">📷</div>
                    <h2 id="cameraPermissionTitle">Camera access needed</h2>
                    <p>SalinKamay needs camera permission to read FSL signs. Select the camera icon in your browser's address bar, choose <strong>Allow</strong>, then try again.</p>
                    <button type="button" class="btn btn-primary camera-permission-modal__close">Got it</button>
                </section>
            `;
            document.body.appendChild(modal);

            const closeModal = () => modal.classList.remove("is-visible");
            modal.querySelector(".camera-permission-modal__close").addEventListener("click", closeModal);
            modal.querySelector(".camera-permission-modal__backdrop").addEventListener("click", closeModal);
        }

        modal.classList.add("is-visible");
        modal.querySelector(".camera-permission-modal__close").focus();
    }

    // ============================================================
    // CAMERA PRIVACY MODAL (binuksan ng ⓘ sa page)
    // ============================================================
    showPrivacyModal() {
        let privacyModal = document.getElementById("cameraPrivacyModal");

        if (!privacyModal) {
            privacyModal = document.createElement("div");
            privacyModal.id = "cameraPrivacyModal";
            privacyModal.className = "camera-permission-modal camera-privacy-modal";
            privacyModal.setAttribute("role", "dialog");
            privacyModal.setAttribute("aria-modal", "true");
            privacyModal.setAttribute("aria-labelledby", "cameraPrivacyTitle");
            privacyModal.innerHTML = `
                <div class="camera-permission-modal__backdrop"></div>
                <section class="camera-permission-modal__dialog camera-privacy-modal__dialog">

                    <button type="button" class="camera-privacy-modal__close-icon" aria-label="Close">✕</button>

                    <div class="camera-privacy-modal__header">
                        <div class="camera-privacy-modal__shield" aria-hidden="true">🛡️</div>
                        <h2 id="cameraPrivacyTitle">Camera &amp; Privacy</h2>
                    </div>

                    <div class="camera-privacy-modal__section">
                        <h3>Your Privacy Matters</h3>
                        <p>SalinKamay uses your camera to recognize Filipino Sign Language (FSL) signs.</p>
                    </div>

                    <div class="camera-privacy-modal__highlight">
                        <div class="camera-privacy-modal__highlight-icon" aria-hidden="true">🛡️</div>
                        <div>
                            <p class="camera-privacy-modal__highlight-title">
                                Your camera feed and recorded videos are <strong>not collected, stored, or uploaded.</strong>
                            </p>
                            <p class="camera-privacy-modal__highlight-desc">
                                The camera is only used while you are using the translation feature.
                            </p>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary camera-privacy-modal__close">Got it</button>
                </section>
            `;
            document.body.appendChild(privacyModal);

            const closePrivacy = () => privacyModal.classList.remove("is-visible");
            privacyModal.querySelector(".camera-privacy-modal__close").addEventListener("click", closePrivacy);
            privacyModal.querySelector(".camera-privacy-modal__close-icon").addEventListener("click", closePrivacy);
            privacyModal.querySelector(".camera-permission-modal__backdrop").addEventListener("click", closePrivacy);
        }

        privacyModal.classList.add("is-visible");
        privacyModal.querySelector(".camera-privacy-modal__close").focus();
    }

    // ============================================================
    // MIC PERMISSION MODAL
    // (Lumalabas LANG pag clinick ni user yung "Block" sa native
    //  browser prompt — hindi ito lumalabas bago yun.)
    // ============================================================
    showMicPermissionModal() {
        let modal = document.getElementById("micPermissionModal");

        if (!modal) {
            modal = document.createElement("div");
            modal.id = "micPermissionModal";
            modal.className = "camera-permission-modal";
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");
            modal.setAttribute("aria-labelledby", "micPermissionTitle");
            modal.innerHTML = `
                <div class="camera-permission-modal__backdrop"></div>
                <section class="camera-permission-modal__dialog">
                    <div class="camera-permission-modal__icon" aria-hidden="true">🎤</div>
                    <h2 id="micPermissionTitle">Microphone access needed</h2>
                    <p>SalinKamay needs microphone permission to hear your voice. Select the microphone icon in your browser's address bar, choose <strong>Allow</strong>, then try again.</p>
                    <button type="button" class="btn btn-primary camera-permission-modal__close">Got it</button>
                </section>
            `;
            document.body.appendChild(modal);

            const closeModal = () => modal.classList.remove("is-visible");
            modal.querySelector(".camera-permission-modal__close").addEventListener("click", closeModal);
            modal.querySelector(".camera-permission-modal__backdrop").addEventListener("click", closeModal);
        }

        modal.classList.add("is-visible");
        modal.querySelector(".camera-permission-modal__close").focus();
    }

    // ============================================================
    // MIC PRIVACY MODAL (binuksan ng ⓘ sa page)
    // ============================================================
    showMicPrivacyModal() {
        let privacyModal = document.getElementById("micPrivacyModal");

        if (!privacyModal) {
            privacyModal = document.createElement("div");
            privacyModal.id = "micPrivacyModal";
            privacyModal.className = "camera-permission-modal camera-privacy-modal";
            privacyModal.setAttribute("role", "dialog");
            privacyModal.setAttribute("aria-modal", "true");
            privacyModal.setAttribute("aria-labelledby", "micPrivacyTitle");
            privacyModal.innerHTML = `
                <div class="camera-permission-modal__backdrop"></div>
                <section class="camera-permission-modal__dialog camera-privacy-modal__dialog">

                    <button type="button" class="camera-privacy-modal__close-icon" aria-label="Close">✕</button>

                    <div class="camera-privacy-modal__header">
                        <div class="camera-privacy-modal__shield" aria-hidden="true">🛡️</div>
                        <h2 id="micPrivacyTitle">Mic &amp; Privacy</h2>
                    </div>

                    <div class="camera-privacy-modal__section">
                        <h3>Your Privacy Matters</h3>
                        <p>SalinKamay uses your microphone to hear and translate your voice into FSL signs.</p>
                    </div>

                    <div class="camera-privacy-modal__highlight">
                        <div class="camera-privacy-modal__highlight-icon" aria-hidden="true">🛡️</div>
                        <div>
                            <p class="camera-privacy-modal__highlight-title">
                                Your voice and audio recordings are <strong>not collected, stored, or uploaded.</strong>
                            </p>
                            <p class="camera-privacy-modal__highlight-desc">
                                The microphone is only used while you are using the voice input feature.
                            </p>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary camera-privacy-modal__close">Got it</button>
                </section>
            `;
            document.body.appendChild(privacyModal);

            const closePrivacy = () => privacyModal.classList.remove("is-visible");
            privacyModal.querySelector(".camera-privacy-modal__close").addEventListener("click", closePrivacy);
            privacyModal.querySelector(".camera-privacy-modal__close-icon").addEventListener("click", closePrivacy);
            privacyModal.querySelector(".camera-permission-modal__backdrop").addEventListener("click", closePrivacy);
        }

        privacyModal.classList.add("is-visible");
        privacyModal.querySelector(".camera-privacy-modal__close").focus();
    }

    // ============================================================
    // PROCESS RESULTS (MediaPipe landmarks)
    // ============================================================
    processResults(results) {
        if (!this.isRunning || !this.ctx) return;

        if (this.video.videoWidth > 0 && (this.canvas.width !== this.video.videoWidth || this.canvas.height !== this.video.videoHeight)) {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
        }

        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(results.image, 0, 0, this.canvas.width, this.canvas.height);

        let handDetected = false;

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            handDetected = true;
            const landmarks = results.multiHandLandmarks[0];

            if (this.onLandmarksCallback) {
                const flattened = [];
                for (const lm of landmarks) {
                    flattened.push(Number(lm.x), Number(lm.y), Number(lm.z));
                }

                if (flattened.length === 63 && flattened.every(Number.isFinite)) {
                    this.onLandmarksCallback(flattened);
                }
            }

            for (const handLandmarks of results.multiHandLandmarks) {
                if (typeof drawConnectors !== "undefined" && typeof HAND_CONNECTIONS !== "undefined") {
                    drawConnectors(this.ctx, handLandmarks, HAND_CONNECTIONS, {
                        color: "#10b981",
                        lineWidth: 4
                    });
                }
                if (typeof drawLandmarks !== "undefined") {
                    drawLandmarks(this.ctx, handLandmarks, {
                        color: "#f59e0b",
                        lineWidth: 2,
                        radius: 4
                    });
                }
            }
        }

        if (this.status) {
            if (handDetected) {
                this.status.style.display = "none";
            } else {
                this.status.style.display = "block";
                this.status.innerHTML = `<span class="status-dot pulse" style="background-color: var(--accent);"></span> Waiting for Hand...`;
            }
        }

        this.ctx.restore();
    }

    // ============================================================
    // START CAMERA
    //
    // ✅ FLOW:
    // 1. Dere-derecho sa getUserMedia() — walang pre-check.
    // 2. Browser native prompt lalabas (Allow / Block).
    // 3. Pag Allow → camera gumagana.
    // 4. Pag Block → NotAllowedError → saka lang lalabas yung
    //    custom camera permission modal.
    // ============================================================
    async start(onLandmarksCallback) {
        if (this.isRunning) return;
        this.onLandmarksCallback = onLandmarksCallback;

        if (this.status) {
            this.status.style.display = "block";
            this.status.innerHTML = `<span class="status-dot pulse"></span> Initializing Camera...`;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Browser camera access is not available.");
            if (this.status) this.status.innerHTML = `<span class="status-dot" style="background-color: var(--danger);"></span> Camera is not supported by this browser.`;
            return;
        }
        
        if (!this.hands) {
            console.error("MediaPipe Hands model was not initialized.");
            if (this.status) this.status.innerHTML = `<span class="status-dot" style="background-color: var(--danger);"></span> AI Model Missing (Check Connection).`;
            return;
        }

        try {
            // ✅ Native browser prompt lalabas dito (Allow / Block)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
                audio: false
            });
            this.video.srcObject = stream;
            await this.video.play();

            this.camera = {
                stop: () => stream.getTracks().forEach(track => track.stop())
            };
            this.isRunning = true;
            const processFrame = async () => {
                if (!this.isRunning || !this.hands) return;
                try {
                    await this.hands.send({ image: this.video });
                } catch (err) {
                    console.warn("Hands prediction dropped frame:", err);
                }
                if (this.isRunning) {
                    this.frameRequestId = requestAnimationFrame(processFrame);
                }
            };
            this.frameRequestId = requestAnimationFrame(processFrame);
            console.log("Webcam and MediaPipe pipeline started.");
            
            if (this.status && this.status.innerHTML.includes("Initializing")) {
                this.status.innerHTML = `<span class="status-dot pulse" style="background-color: var(--accent);"></span> Waiting for Hand...`;
            }
        } catch (error) {
            console.error("Camera start failed:", error);
            if (this.status) {
                this.status.innerHTML = `<span class="status-dot" style="background-color: var(--danger);"></span> Camera Access Blocked.`;
            }

            // ✅ Custom modal LANG pag na-deny ni user yung native prompt
            if (error && error.name === "NotAllowedError") {
                this.showCameraPermissionModal();
            }
        }
    }

    // ============================================================
    // STOP CAMERA
    // ============================================================
    stop() {
        this.isRunning = false;
        if (this.frameRequestId !== null) {
            cancelAnimationFrame(this.frameRequestId);
            this.frameRequestId = null;
        }
        if (this.camera) {
            try {
                this.camera.stop();
            } catch (e) {
                console.warn("Camera stop error:", e);
            }
            this.camera = null;
        }
        
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        if (this.status) {
            this.status.style.display = "none";
        }
        
        console.log("Camera pipeline stopped.");
    }
}