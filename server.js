const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = 3443;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/transactions.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'transactions.html'));
});

app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'sw.js'));
});

const startServer = () => {
  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`\n✅ Server running successfully!`);
    console.log(`\n🌐 Open your browser and visit:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`\n📱 To test PWA installation:`);
    console.log(`   1. Open Chrome browser`);
    console.log(`   2. Visit http://localhost:${PORT}`);
    console.log(`   3. Click the floating "Install App" button`);
    console.log(`   4. Or use Chrome menu > Install App`);
    console.log(`\n✨ The app icon will appear during installation!`);
    console.log(`\n⚠️  For production, deploy to a platform with HTTPS (Vercel, Netlify, etc.)`);
    console.log(`\n🛑 Press Ctrl+C to stop the server\n`);
  });

  try {
    const certPath = path.join(__dirname, 'localhost.pem');
    const keyPath = path.join(__dirname, 'localhost-key.pem');

    if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
      const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };

      const httpsServer = https.createServer(httpsOptions, app);
      httpsServer.listen(HTTPS_PORT, () => {
        console.log(`🔒 HTTPS server also running on https://localhost:${HTTPS_PORT}\n`);
      });
    }
  } catch (err) {
    console.log('ℹ️  HTTPS certificates not found. Running HTTP only (PWA will still work in production with HTTPS).\n');
  }
};

startServer();
