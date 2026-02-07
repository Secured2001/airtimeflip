function showUnavailablePopup() {
  const popup = document.getElementById('popup-overlay');
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePopup() {
  const popup = document.getElementById('popup-overlay');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.classList.remove('hidden');
    console.log('Install prompt available');
  }
});

const installBtn = document.getElementById('install-btn');
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    deferredPrompt = null;
    if (installBtn) {
      installBtn.classList.add('hidden');
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.classList.add('hidden');
  }
});
