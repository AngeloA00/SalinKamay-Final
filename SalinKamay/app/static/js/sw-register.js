// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SalinKamay ServiceWorker registered successfully with scope:', registration.scope);
            })
            .catch(error => {
                console.error('SalinKamay ServiceWorker registration failed:', error);
            });
    });
}
