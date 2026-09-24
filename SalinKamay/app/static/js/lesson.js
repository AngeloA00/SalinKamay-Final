// Lesson Page Controller - SalinKamay
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve selected lesson from cache
    const selectedLessonData = localStorage.getItem("selectedLesson");
    if (!selectedLessonData) {
        alert("No sign selected. Returning to curriculum...");
        window.location.href = "/learning";
        return;
    }

    const lesson = JSON.parse(selectedLessonData);

    // ✅ HELPER: Format lesson title as "English (Tagalog)"
    function formatLessonTitle(lessonData) {
        const englishTitle = (lessonData.englishTitle || lessonData.title || "").trim();
        const tagalogTitle = (lessonData.tagalogTitle || lessonData.title || "").trim();

        if (!englishTitle && !tagalogTitle) return lessonData.title || "";
        if (!englishTitle) return tagalogTitle;
        if (!tagalogTitle) return englishTitle;

        if (englishTitle.toLowerCase() === tagalogTitle.toLowerCase()) {
            return englishTitle;
        }

        return `${englishTitle} <span class="title-tagalog">(${tagalogTitle})</span>`;
    }

    // ✅ HELPER: Plain text version (for breadcrumb, recently viewed, etc.)
    function formatLessonTitlePlain(lessonData) {
        const englishTitle = (lessonData.englishTitle || lessonData.title || "").trim();
        const tagalogTitle = (lessonData.tagalogTitle || lessonData.title || "").trim();

        if (!englishTitle && !tagalogTitle) return lessonData.title || "";
        if (!englishTitle) return tagalogTitle;
        if (!tagalogTitle) return englishTitle;

        if (englishTitle.toLowerCase() === tagalogTitle.toLowerCase()) {
            return englishTitle;
        }

        return `${englishTitle} (${tagalogTitle})`;
    }

    // UI Elements
    const backToLearningBtn = document.getElementById("backToLearningBtn");
    const lessonTitle = document.getElementById("lessonTitle");
    const lessonDescription = document.getElementById("lessonDescription");
    const lessonSteps = document.getElementById("lessonSteps");
    const lessonVideo = document.getElementById("lessonVideo");
    const lessonImage = document.getElementById("lessonImage");
    const videoPlaceholder = document.getElementById("videoPlaceholder");
    const replayBtn = document.getElementById("replayBtn");
    
    // Recent navigation elements
    const lastViewedContainer = document.getElementById("lastViewedContainer");
    const recentLessonBtn = document.getElementById("recentLessonBtn");

    // Breadcrumb elements
    const breadcrumbCategory = document.getElementById("breadcrumbCategory");
    const breadcrumbLesson = document.getElementById("breadcrumbLesson");

    // ✅ Populate Page Text Content — may "English (Tagalog)" format
    lessonTitle.innerHTML = formatLessonTitle(lesson);
    lessonDescription.innerText = lesson.description;

    // Populate steps list
    lessonSteps.innerHTML = "";
    lesson.steps.forEach(step => {
        const li = document.createElement("li");
        li.innerText = step;
        lessonSteps.appendChild(li);
    });

    // ✅ POPULATE BREADCRUMB — plain text version
    if (breadcrumbLesson) {
        breadcrumbLesson.innerText = formatLessonTitlePlain(lesson);
    }

    if (breadcrumbCategory && lesson.categoryId) {
        // Set a temporary label while we fetch the real name
        breadcrumbCategory.innerText = "...";

        // Fetch the actual category name from IndexedDB
        (async () => {
            try {
                if (typeof getAllCategories === "function") {
                    const categories = await getAllCategories();
                    const matched = categories.find(c => c.id === lesson.categoryId);
                    const categoryName = matched?.name || lesson.categoryId;

                    breadcrumbCategory.innerText = categoryName;
                    breadcrumbCategory.href = `/learning?category=${encodeURIComponent(lesson.categoryId)}&name=${encodeURIComponent(categoryName)}`;
                } else {
                    // Fallback: use categoryId as name
                    breadcrumbCategory.innerText = lesson.categoryId;
                    breadcrumbCategory.href = `/learning?category=${encodeURIComponent(lesson.categoryId)}`;
                }
            } catch (err) {
                console.warn("Could not load category name for breadcrumb:", err);
                breadcrumbCategory.innerText = lesson.categoryId;
                breadcrumbCategory.href = `/learning?category=${encodeURIComponent(lesson.categoryId)}`;
            }
        })();
    }

    // Hide replay button for alphabet category
    if (replayBtn) {
        if (lesson.categoryId === "alphabet") {
            replayBtn.style.display = "none";
        } else {
            replayBtn.style.display = "";
        }
    }

    // --- VIDEO PLAYBACK OR SKELETON FALLBACK ---
    let vectorInterval = null;

    const fsl105Citation = document.getElementById("fsl105Citation");

    function playSignMedia() {
        // Clear any ongoing vector animation loop
        if (vectorInterval) {
            clearInterval(vectorInterval);
            vectorInterval = null;
        }

        // Apply specific FSL-105 zoom/framing logic
        const isFSL105 = lesson.animation.includes('fsl-105-dataset');
        
        // Show citation on all categories as requested
        if (fsl105Citation) {
            fsl105Citation.style.display = "block";
        }

        if (isFSL105) {
            if (lessonVideo) lessonVideo.classList.add("fsl-105-video");
            if (lessonImage) lessonImage.classList.add("fsl-105-video");
        } else {
            if (lessonVideo) lessonVideo.classList.remove("fsl-105-video");
            if (lessonImage) lessonImage.classList.remove("fsl-105-video");
        }

        const mediaSrc = lesson.animation.startsWith('/') 
            ? encodeURI(lesson.animation) 
            : encodeURI(`/static/animations/${lesson.animation}`);

        if (mediaSrc.match(/\.(png|jpe?g|gif|webp)$/i)) {
            // Handle image media
            if (lessonVideo) lessonVideo.style.display = "none";
            if (lessonImage) {
                lessonImage.src = mediaSrc;
                lessonImage.style.display = "block";
                lessonImage.onerror = () => {
                    lessonImage.style.display = "none";
                    videoPlaceholder.style.display = "flex";
                    renderVectorDemonstration();
                };
            }
            videoPlaceholder.style.display = "none";
        } else {
            // Handle video media
            if (lessonImage) lessonImage.style.display = "none";
            if (lessonVideo) {
                lessonVideo.src = mediaSrc;
                lessonVideo.controls = true;
                lessonVideo.style.display = "block";
                lessonVideo.onerror = () => {
                    lessonVideo.style.display = "none";
                    videoPlaceholder.style.display = "flex";
                    renderVectorDemonstration();
                };
            }
            videoPlaceholder.style.display = "none";
        }
    }

    /**
     * Fallback drawing loop: Renders a premium vector skeletal sign animation inside 
     * the placeholder box when the physical MP4 animation file is missing.
     */
    function renderVectorDemonstration() {
        videoPlaceholder.innerHTML = "";
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        videoPlaceholder.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let frame = 0;

        vectorInterval = setInterval(() => {
            if (!canvas.parentNode) {
                clearInterval(vectorInterval);
                return;
            }

            if (canvas.width !== canvas.clientWidth) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw abstract hand skeleton lines
            frame++;
            const t = (frame % 60) / 60;
            const swing = Math.sin(t * Math.PI * 2) * 20;

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            
            // Wrist
            ctx.strokeStyle = "#10b981";
            ctx.beginPath();
            ctx.moveTo(cx - 30, canvas.height);
            ctx.lineTo(cx, cy + 50 + swing);
            ctx.stroke();

            // Palm
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(cx, cy + 50 + swing, 15, 0, Math.PI * 2);
            ctx.fill();

            // Extended fingers
            ctx.strokeStyle = "#34d399";
            ctx.lineWidth = 4;
            for(let i=0; i<5; i++) {
                const angle = -Math.PI/2 + (i-2)*0.25;
                ctx.beginPath();
                ctx.moveTo(cx, cy + 50 + swing);
                ctx.lineTo(cx + Math.cos(angle) * 35, cy + 50 + swing + Math.sin(angle) * 35);
                ctx.stroke();
            }

            ctx.fillStyle = "var(--text-light)";
            ctx.font = "bold 13px Outfit";
            ctx.textAlign = "center";
            ctx.fillText(`Sign: ${lesson.title}`, cx, 30);
        }, 1000 / 30); // 30 FPS
    }

    // Bind media play
    playSignMedia();

    // Replay Button Action
    replayBtn.addEventListener("click", () => {
        playSignMedia();
    });

    // Back to curriculum page
    if (backToLearningBtn) {
        backToLearningBtn.addEventListener("click", (e) => {
            e.preventDefault();
            try {
                if (typeof vectorInterval !== 'undefined' && vectorInterval !== null) {
                    clearInterval(vectorInterval);
                }
            } catch (err) {
                console.error("Error clearing interval:", err);
            }
            
            if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
                window.history.back();
            } else {
                window.location.assign("/learning");
            }
        });
    }

    // --- RECENTLY VIEWED PREVIOUS LESSON WIDGET ---
    async function loadRecentlyViewedWidget() {
        if (typeof getRecentlyViewed !== "function") return;
        
        try {
            const db = await getDB();
            const tx = db.transaction("recently_viewed", "readonly");
            const store = tx.objectStore("recently_viewed");
            const req = store.getAll();
            
            req.onsuccess = () => {
                const results = req.result;
                if (results && results.length > 0) {
                    // Filter out the current active lesson to avoid linking to oneself
                    const previous = results.find(item => item.id !== lesson.id);
                    if (previous) {
                        // ✅ Plain text format para sa recently viewed button
                        recentLessonBtn.innerText = formatLessonTitlePlain(previous);
                        recentLessonBtn.onclick = () => {
                            // Save current lesson as recently viewed before transitioning
                            saveRecentlyViewed(lesson).then(() => {
                                localStorage.setItem("selectedLesson", JSON.stringify(previous));
                                window.location.reload();
                            });
                        };
                        lastViewedContainer.style.display = "inline-flex";
                    }
                }
            };
        } catch (error) {
            console.warn("Could not load recently viewed cache widget:", error);
        }
    }

    // Delayed load to let DB connection finalize
    setTimeout(loadRecentlyViewedWidget, 500);
});