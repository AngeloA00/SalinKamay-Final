// Client-side search filters for SalinKamay Curriculum
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categoriesSection = document.getElementById("categoriesSection");
    const lessonsSection = document.getElementById("lessonsSection");

    if (!searchInput) return;

    // ✅ HELPER: Format lesson title as "English (Tagalog)"
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

    searchInput.addEventListener("input", async (e) => {
        const query = normalizeSearchText(e.target.value);
        
        const categoryGrid = document.getElementById("categoryGrid");
        const lessonGrid = document.getElementById("lessonGrid");
        
        // Return to normal view if query is empty
        if (query === "") {
            // Restore visibility of sections based on active states
            if (lessonsSection.classList.contains("active")) {
                const currentCatTitle = document.getElementById("currentCategoryTitle").innerText;
                // Re-trigger standard category lesson loading
                if (window.activeCategoryId) {
                    window.showLessonsView(window.activeCategoryId, currentCatTitle, false);
                }
            } else {
                window.loadCategories();
            }
            return;
        }

        // --- SEARCH ENGINE INTERFACE ---
        // Fetch all categories and lessons from IndexedDB to perform search
        try {
            const allCats = await getAllCategories();
            
            // Query all lessons in the DB
            const db = await getDB();
            const tx = db.transaction("lessons", "readonly");
            const store = tx.objectStore("lessons");
            const lessonsRequest = store.getAll();
            
            lessonsRequest.onsuccess = () => {
                const allLessons = lessonsRequest.result;
                
                // Filter matches
                const matchedCats = allCats.filter(cat =>
                    normalizeSearchText(cat.name).includes(query)
                );
                const uniqueLessons = new Map();
                allLessons.forEach(les => {
                    // ✅ I-exclude yung transactional category sa search
                    if (les.categoryId === "transactional") return;

                    const matchesQuery =
                        normalizeSearchText(les.title).includes(query) ||
                        normalizeSearchText(les.description).includes(query) ||
                        (les.englishTitle && normalizeSearchText(les.englishTitle).includes(query)) ||
                        (les.tagalogTitle && normalizeSearchText(les.tagalogTitle).includes(query)) ||
                        // ✅ Combined search: "bad masama" or "bad (masama)"
                        normalizeSearchText(`${les.englishTitle || ""} ${les.tagalogTitle || ""}`).includes(query);

                    const lessonKey = normalizeSearchText(les.title);
                    if (matchesQuery && lessonKey && !uniqueLessons.has(lessonKey)) {
                        uniqueLessons.set(lessonKey, les);
                    }
                });
                const matchedLessons = Array.from(uniqueLessons.values());

                // Render Search Results
                renderSearchResults(query, matchedCats, matchedLessons);
            };
        } catch (error) {
            console.error("Search query execution failed:", error);
        }
    });

    function normalizeSearchText(value) {
        return String(value || "")
            .normalize("NFKC")
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[^\p{L}\p{N}']+/gu, " ")
            .trim()
            .toLocaleLowerCase();
    }

    function renderSearchResults(query, matchedCats, matchedLessons) {
        const categoryGrid = document.getElementById("categoryGrid");
        const lessonGrid = document.getElementById("lessonGrid");

        // If we are searching, we display everything in a combined view
        categoriesSection.classList.add("active");
        lessonsSection.classList.remove("active");

        categoryGrid.innerHTML = "";

        // If no results found
        if (matchedCats.length === 0 && matchedLessons.length === 0) {
            categoryGrid.innerHTML = `
                <div style="grid-column: span 2; padding: 40px; text-align: center; color: var(--text-light)">
                    <span style="font-size: 2rem;">🔍</span>
                    <p style="margin-top: 10px; font-weight: 600;">No signs found for "${query}"</p>
                    <p style="font-size: 0.85rem; margin-top: 4px;">Try searching for a category, 'hello', or another sign.</p>
                </div>
            `;
            return;
        }

        // 1. Render Matched Categories First
        matchedCats.forEach(cat => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <span class="card-icon">${cat.icon || "📂"}</span>
                <span class="card-title">${cat.name}</span>
                <span class="card-meta">Category</span>
            `;
            card.onclick = () => {
                searchInput.value = ""; // Clear search
                window.showLessonsView(cat.id, cat.name, true);
            };
            categoryGrid.appendChild(card);
        });

        // 2. Render Matched Individual Sign Lessons
        matchedLessons.forEach(les => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.borderColor = "rgba(245, 158, 11, 0.3)"; // Amber border highlight
            // ✅ Use English (Tagalog) format
            card.innerHTML = `
                <span class="card-icon">🧏</span>
                <span class="card-title">${formatLessonTitle(les)}</span>
                <span class="card-meta">Sign</span>
            `;
            card.onclick = () => {
                searchInput.value = ""; // Clear search
                window.openLesson(les);
            };
            categoryGrid.appendChild(card);
        });
    }
});