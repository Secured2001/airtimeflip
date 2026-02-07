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
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.classList.remove('hidden');
    console.log('Install prompt available');
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      if (installBtn) {
        installBtn.classList.add('hidden');
      }
    } else {
      console.log('Install prompt not available, showing fallback download');
      if (navigator.share) {
        navigator.share({
          title: 'Airtime Flip',
          text: 'Install the Airtime Flip app on your home screen',
          url: window.location.href
        }).catch(err => console.log('Share failed:', err));
      }
    }
  });

  if (!deferredPrompt) {
    installBtn.classList.remove('hidden');
  }
}

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  if (installBtn) {
    installBtn.classList.add('hidden');
  }
});
