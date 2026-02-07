# Airtime Flip PWA

A Progressive Web App for airtime conversion and transaction management.

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Verify build (optional but recommended):
```bash
npm run build
```

3. Start the server:
```bash
npm start
```
or
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Installing as PWA (Add to Home Screen)

### On Chrome Desktop:
1. Visit `http://localhost:3000`
2. Click the floating "Install App" button, OR
3. Click the install icon in the address bar (⊕), OR
4. Open Chrome menu (⋮) → "Install App"
5. The app icon (logo.jpg) will be displayed during installation!

### On Chrome Mobile:
1. Visit the app URL in Chrome
2. Tap the floating "Install App" button, OR
3. Tap Chrome menu (⋮) → "Add to Home Screen" or "Install App"
4. Your logo will appear as the app icon on your home screen!

## Features

- ✅ Full PWA support with service worker
- ✅ Offline functionality
- ✅ Custom app icon (img/logo.jpg)
- ✅ Installable on all devices
- ✅ Works on HTTP (localhost) and HTTPS
- ✅ Floating install button with smart detection
- ✅ Transaction management
- ✅ Balance tracking
- ✅ Quick services access

## Deployment

For production deployment with HTTPS (required for PWA on production):

### Vercel:
```bash
npm i -g vercel
vercel
```

### Netlify:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Heroku:
```bash
git push heroku main
```

## PWA Requirements

- ✅ manifest.json with app metadata
- ✅ Service worker for offline support
- ✅ HTTPS in production (HTTP works for localhost)
- ✅ Icons in multiple sizes
- ✅ Proper meta tags

## Files Structure

```
/
├── server.js           # Express server
├── index.html          # Home page
├── transactions.html   # Transactions page
├── app.js              # PWA install logic
├── app.css             # Styles
├── public/
│   ├── manifest.json   # PWA manifest
│   └── sw.js           # Service worker
└── img/
    └── logo.jpg        # App icon
```

## Support

The logo.jpg image is used as the app icon. Make sure it's:
- At least 512x512 pixels
- Square format
- Clear and recognizable
- JPEG or PNG format

## Browser Support

- Chrome ✅
- Edge ✅
- Safari ✅ (iOS 11.3+)
- Firefox ✅
- Opera ✅
