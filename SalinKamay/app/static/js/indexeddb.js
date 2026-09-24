// IndexedDB Database Manager for SalinKamay
const DB_NAME = "SalinKamayDB";
const DB_VERSION = 12;

let dbInstance = null;
let databaseSeedPromise = null;

/**
 * Initializes and retrieves the database connection.
 */
function getDB() {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            resolve(dbInstance);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Preserve existing curriculum data during schema upgrades. IndexedDB
            // is device-persistent; upgrades may add stores but must not erase
            // categories or lessons already saved by the user.
            if (!db.objectStoreNames.contains("categories")) {
                db.createObjectStore("categories", { keyPath: "id" });
            }
            
            if (!db.objectStoreNames.contains("lessons")) {
                db.createObjectStore("lessons", { keyPath: "id" });
            }
            
            // 3. Recently Viewed Store
            if (!db.objectStoreNames.contains("recently_viewed")) {
                db.createObjectStore("recently_viewed", { keyPath: "storeKey" });
            }
            
            // 4. Settings Store
            if (!db.objectStoreNames.contains("settings")) {
                db.createObjectStore("settings", { keyPath: "key" });
            }
            
            console.log("IndexedDB stores initialized successfully.");
        };

        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            console.log("IndexedDB connected successfully.");

            // Ask the browser to retain this offline curriculum storage where
            // persistent storage is supported. This does not show a prompt.
            if (navigator.storage && navigator.storage.persist) {
                navigator.storage.persist().then(isPersistent => {
                    console.log(`IndexedDB persistent storage: ${isPersistent}`);
                }).catch(() => {
                    // IndexedDB remains available even if the browser declines.
                });
            }
            
            // Check if seeding is required (runs after connection succeeds)
            const tx = dbInstance.transaction("categories", "readonly");
            const store = tx.objectStore("categories");
            const countRequest = store.count();

databaseSeedPromise = new Promise((resolve, reject) => {
    countRequest.onsuccess = () => {
        // ✅ PALAGING mag-seed para ma-update yung lessons (non-destructive: put lang)
        // Kahit may existing data, ire-reput lang yung lessons — hindi binubura.
        if (typeof seedDatabase === "function") {
            console.log(`Database has ${countRequest.result} categories. Running non-destructive seed...`);
            seedDatabase().then(resolve, reject);
            return;
        }

        console.warn("seedDatabase() is not loaded.");
        resolve();
    };
    countRequest.onerror = () => reject(countRequest.error);
}).finally(() => {
    databaseSeedPromise = null;
});

            resolve(dbInstance);
        };

        request.onerror = (event) => {
            console.error("IndexedDB Connection Failure:", event.target.error);
            reject(event.target.error);
        };
    });
}

// --- DB OPERATION WRAPPERS ---

async function saveCategory(category) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("categories", "readwrite");
        const store = tx.objectStore("categories");
        const request = store.put(category);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveLesson(lesson) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("lessons", "readwrite");
        const store = tx.objectStore("lessons");
        const request = store.put(lesson);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getAllCategories() {
    const db = await getDB();
    if (databaseSeedPromise) {
        await databaseSeedPromise;
    }
    return new Promise((resolve, reject) => {
        const tx = db.transaction("categories", "readonly");
        const store = tx.objectStore("categories");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getLessonsByCategory(categoryId) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("lessons", "readonly");
        const store = tx.objectStore("lessons");
        const request = store.getAll();
        request.onsuccess = () => {
            const filtered = request.result.filter(l => l.categoryId === categoryId);
            resolve(filtered);
        };
        request.onerror = () => reject(request.error);
    });
}

async function getLessonById(id) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("lessons", "readonly");
        const store = tx.objectStore("lessons");
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveRecentlyViewed(lesson) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("recently_viewed", "readwrite");
        const store = tx.objectStore("recently_viewed");
        
        // Clear old entry to guarantee singular item cache
        store.clear().onsuccess = () => {
            const record = {
                storeKey: "latest",
                ...lesson,
                viewedAt: Date.now()
            };
            const request = store.put(record);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        };
    });
}

async function getRecentlyViewed() {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("recently_viewed", "readonly");
        const store = tx.objectStore("recently_viewed");
        const request = store.get("latest");
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveSetting(key, value) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("settings", "readwrite");
        const store = tx.objectStore("settings");
        const request = store.put({ key, value });
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getSetting(key) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("settings", "readonly");
        const store = tx.objectStore("settings");
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result ? request.result.value : null);
        request.onerror = () => reject(request.error);
    });
}

async function getAllLessons() {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("lessons", "readonly");
        const store = tx.objectStore("lessons");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Trigger initial connection
getDB().catch(error => console.error("Database pre-load failure:", error));
