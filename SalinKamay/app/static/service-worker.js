// SalinKamay Service Worker
const CACHE_NAME = "salinkamay-cache-v18";
const ASSETS_TO_CACHE = [
    "/",
    "/translate",
    "/learning",
    "/lesson",
    "/manifest.json",
    "/static/css/global.css",
    "/static/css/landing.css",
    "/static/css/translate.css",
    "/static/css/learning.css",
    "/static/css/lesson.css",
    "/static/css/responsive.css",
    "/static/js/sw-register.js",
    "/static/js/indexeddb.js",
    "/static/js/seed.js",
    "/static/js/app.js",
    "/static/js/translate.js",
    "/static/js/learning.js",
    "/static/js/lesson.js",
    "/static/js/camera.js",
    "/static/js/predictor.js",
    "/static/js/speech.js",
    "/static/js/search.js"
];

// Installation: Cache Core Application Assets
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Caching core assets...");
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activation: Clean up Old Caches
self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetching: network-first for app files, cached fallback for offline use, bypass APIs
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // API responses must always come from the backend.  If the server is
    // temporarily unavailable, still return a valid Response object so the
    // service worker does not cause a browser-level ERR_FAILED error.
    if (url.pathname.startsWith("/api/")) {
        event.respondWith(
            fetch(event.request).catch(() => new Response(
                JSON.stringify({
                    status: "error",
                    message: "The translation server is unavailable. Please try again shortly."
                }),
                {
                    status: 503,
                    headers: { "Content-Type": "application/json" }
                }
            ))
        );
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                }
                return networkResponse;
            })
            .catch(() => caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                if (event.request.mode === "navigate") return caches.match("/");
                return new Response("Not found", { status: 404, statusText: "Not Found" });
            }))
    );
});
