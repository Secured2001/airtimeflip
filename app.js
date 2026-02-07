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
        console.log('✅ Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

let deferredPrompt;
let installBtn;

window.addEventListener('DOMContentLoaded', () => {
  installBtn = document.getElementById('install-btn');

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    console.log('✅ App is already installed');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
    return;
  }

  if (installBtn) {
    installBtn.classList.remove('hidden');
    console.log('📱 Install button is ready');
  }
});

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('🎯 beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) {
    installBtn.classList.remove('hidden');
    installBtn.style.display = 'flex';
    console.log('✅ Install prompt available - button shown');
  }
});

if (document.getElementById('install-btn')) {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#install-btn')) {
      handleInstallClick();
    }
  });
}

async function handleInstallClick() {
  console.log('🖱️ Install button clicked');

  if (deferredPrompt) {
    console.log('📲 Showing install prompt...');
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`👤 User response: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('✅ User accepted the install prompt');
    } else {
      console.log('❌ User dismissed the install prompt');
    }

    deferredPrompt = null;
  } else {
    console.log('ℹ️ Install prompt not available');
    alert('To install this app:\n\n1. Open Chrome menu (⋮)\n2. Select "Install App" or "Add to Home Screen"\n3. Follow the prompts\n\nYour logo will appear as the app icon!');
  }
}

window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA was installed successfully!');
  if (installBtn) {
    installBtn.classList.add('hidden');
    installBtn.style.display = 'none';
  }
  deferredPrompt = null;
});
