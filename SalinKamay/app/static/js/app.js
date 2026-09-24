// Capture the native PWA install event as early as possible
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Landing Page Controller
document.addEventListener("DOMContentLoaded", () => {
    const translateBtn = document.getElementById("translateBtn");
    const learnBtn = document.getElementById("learnBtn");

    if (translateBtn) {
        translateBtn.addEventListener("click", () => {
            window.location.href = "/translate";
        });
    }

    if (learnBtn) {
        learnBtn.addEventListener("click", () => {
            window.location.href = "/learning";
        });
    }

    // PWA Install Prompt Logic
    const installModal = document.getElementById('pwaInstallModal');
    const confirmInstallBtn = document.getElementById('confirmInstallBtn');
    const cancelInstallBtn = document.getElementById('cancelInstallBtn');

    // 2. Force the banner to show when the page opens (if not already running inside the installed app window)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (!isStandalone && installModal) {
        // Show after 1.5 seconds for a smooth effect
        setTimeout(() => {
            installModal.style.display = 'flex';
        }, 1500);
    }

    // 3. Handle button clicks
    if (confirmInstallBtn) {
        confirmInstallBtn.addEventListener('click', async () => {
            if (installModal) installModal.style.display = 'none';
            
            if (deferredPrompt) {
                // Trigger the native browser install prompt
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
            } else {
                // For Capstone Presentation: Fallback alert if they click it but it's already installed or blocked
                alert("The App is already installed or the browser blocked the prompt! You can open it from your Apps, or manually install via the icon in the URL bar.");
            }
        });
    }

    if (cancelInstallBtn) {
        cancelInstallBtn.addEventListener('click', () => {
            if (installModal) installModal.style.display = 'none';
        });
    }
});
