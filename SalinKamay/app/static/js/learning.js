// Learning Curriculum Page Controller - SalinKamay
document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const backBtn = document.getElementById("backBtn");
    const categoriesSection = document.getElementById("categoriesSection");
    const lessonsSection = document.getElementById("lessonsSection");
    const backToCategoriesBtn = document.getElementById("backToCategoriesBtn");
    const searchInput = document.getElementById("searchInput");

    // Global variables exposed for search integration
    window.activeCategoryId = null;

    if (backBtn) {
        backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
                window.history.back();
            } else {
                window.location.href = "/";
            }
        });
    }

    if (backToCategoriesBtn) {
        backToCategoriesBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showCategoriesView(true);
        });
    }

    // --- BROWSER HISTORY MANAGEMENT ---
    window.addEventListener("popstate", (e) => {
        handleUrlState();
    });

    function handleUrlState() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category');
        const categoryName = urlParams.get('name') || "Signs";

        if (categoryId) {
            showLessonsView(categoryId, categoryName, false);
        } else {
            showCategoriesView(false);
        }
    }

    function showCategoriesView(pushState = true) {
        if (lessonsSection) lessonsSection.classList.remove("active");
        if (categoriesSection) categoriesSection.classList.add("active");
        window.activeCategoryId = null;
        if (searchInput) searchInput.value = "";
        
        if (pushState) {
            history.pushState({ view: 'categories' }, "", "/learning");
            loadCategories();
        }
    }

    // ✅ HELPER: Format lesson title as "English (Tagalog)"
    function formatLessonTitle(lesson) {
        const englishTitle = (lesson.englishTitle || lesson.title || "").trim();
        const tagalogTitle = (lesson.tagalogTitle || lesson.title || "").trim();

        // Kung walang english o pareho lang sila, i-return yung isa lang
        if (!englishTitle && !tagalogTitle) return lesson.title || "";
        if (!englishTitle) return tagalogTitle;
        if (!tagalogTitle) return englishTitle;

        // Kung pareho, i-return yung isa lang (walang duplicate)
        if (englishTitle.toLowerCase() === tagalogTitle.toLowerCase()) {
            return englishTitle;
        }

        return `${englishTitle} <span class="title-tagalog">(${tagalogTitle})</span>`;
    }

    // --- CURRICULUM LOADERS ---
    
    window.loadCategories = async function() {
        const grid = document.getElementById("categoryGrid");
        if (!grid) return;

        grid.innerHTML = `<div class="loading-spinner"></div>`;

        try {
            const categories = await getAllCategories();
            grid.innerHTML = "";

            if (categories.length === 0) {
                if (typeof seedDatabase === "function") {
                    await seedDatabase();
                }
                setTimeout(loadCategories, 300);
                return;
            }

            const hasAlphabet = categories.some(cat => cat.id === "alphabet");
            const hasTagalogCats = categories.some(cat => cat.name === "Pagbati" || cat.name === "Kaligtasan");
            const additionalSLCategoryIds = ["adjective", "bible", "places", "prepositions", "verb"];
            const hasAdditionalSLCategories = additionalSLCategoryIds.every(categoryId =>
                categories.some(cat => cat.id === categoryId)
            );
            const needsEnglishMigration = !localStorage.getItem("migrated_to_english_cats_v6");
            const needsAdditionalSLMigration = !localStorage.getItem("migrated_additional_sl_v4");
            let hasCompleteAdditionalSL = false;
            
            let needsFilipinoLessonsMigration = false;
            try {
                const sampleLessons = await getLessonsByCategory("greetings");
                if (sampleLessons && sampleLessons.some(l => l.title === "Good Morning")) {
                    needsFilipinoLessonsMigration = true;
                }
            } catch (err) {
                console.warn("Check lessons error:", err);
            }

            try {
                const additionalSLLessons = await Promise.all(
                    additionalSLCategoryIds.map(categoryId => getLessonsByCategory(categoryId))
                );
                hasCompleteAdditionalSL = hasAdditionalSLCategories &&
                    additionalSLLessons.flat().length >= 25;
            } catch (err) {
                console.warn("Check Additional SL lessons error:", err);
            }

            // Removed Transactional requirement check
            if ((!hasAlphabet || hasTagalogCats || needsFilipinoLessonsMigration || !hasCompleteAdditionalSL || needsEnglishMigration || needsAdditionalSLMigration) && typeof seedDatabase === "function") {
                console.log("Curriculum update required. Adding missing English and Additional SL lessons...");
                await seedDatabase();
                localStorage.setItem("migrated_to_english_cats_v6", "true");
                localStorage.setItem("migrated_additional_sl_v4", "true");
                setTimeout(loadCategories, 200);
                return;
            }

            categories.forEach(cat => {
                // Ignore transactional category completely
                if (cat.id === "transactional") return;
                
                const card = document.createElement("div");
                card.className = "card animate-slide-up";
                card.innerHTML = `
                    <span class="card-icon">${cat.icon || "📂"}</span>
                    <span class="card-title">${cat.name}</span>
                `;
                card.onclick = () => {
                    showLessonsView(cat.id, cat.name, true);
                };
                grid.appendChild(card);
            });
            
            // Check URL state after categories load in case user loaded /learning?category=...
            handleUrlState();
            
        } catch (error) {
            console.error("Failed to query FSL categories:", error);
            grid.innerHTML = `<p style="text-align: center; color: var(--danger);">Failed to load categories. Please reload.</p>`;
        }
    };

    window.showLessonsView = async function(categoryId, categoryName, pushState = true) {
        window.activeCategoryId = categoryId;
        const grid = document.getElementById("lessonGrid");
        const title = document.getElementById("currentCategoryTitle");
        
        if (!grid || !title) return;

        grid.innerHTML = `<div class="loading-spinner"></div>`;
        
        if (categoriesSection) categoriesSection.classList.remove("active");
        if (lessonsSection) lessonsSection.classList.add("active");
        title.innerText = categoryName;

        if (pushState) {
            history.pushState({ view: 'lessons', categoryId }, "", `/learning?category=${categoryId}&name=${encodeURIComponent(categoryName)}`);
        }

        try {
            const lessons = await getLessonsByCategory(categoryId);
            grid.innerHTML = "";

             if (lessons.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: span 2; padding: 40px; text-align: center; color: var(--text-light)">
                        <p>No signs registered in this category.</p>
                    </div>
                `;
                return;
            }

            const uniqueLessons = new Map();
            lessons.forEach(lesson => {
                const lessonKey = normalizeLessonText(lesson.title);
                if (lessonKey && !uniqueLessons.has(lessonKey)) {
                    uniqueLessons.set(lessonKey, lesson);
                }
            });

            uniqueLessons.forEach(lesson => {
                const card = document.createElement("div");
                card.className = "card animate-slide-up";
                // ✅ Use English (Tagalog) format
                card.innerHTML = `
                    <span class="card-icon">🧏</span>
                    <span class="card-title">${formatLessonTitle(lesson)}</span>
                    <span class="card-meta">View sign</span>
                `;
                card.onclick = () => openLesson(lesson);
                grid.appendChild(card);
            });
        } catch (error) {
            console.error("Failed to query lessons for category:", categoryId, error);
            grid.innerHTML = `<p style="color: var(--danger);">Failed to load signs for this category.</p>`;
        }
    };

    function normalizeLessonText(value) {
        return String(value || "")
            .normalize("NFKC")
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[^\p{L}\p{N}']+/gu, " ")
            .trim()
            .toLocaleLowerCase();
    }

    window.openLesson = async function(lesson) {
        try {
            await saveRecentlyViewed(lesson);
            localStorage.setItem("selectedLesson", JSON.stringify(lesson));
            window.location.href = "/lesson";
        } catch (error) {
            localStorage.setItem("selectedLesson", JSON.stringify(lesson));
            window.location.href = "/lesson";
        }
    };

    // Replace default initial load logic. It will load categories, then handleUrlState triggers view switch if needed.
    history.replaceState({ view: 'categories' }, "", window.location.pathname + window.location.search);
    loadCategories();
});
