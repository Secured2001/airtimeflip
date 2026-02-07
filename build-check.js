const fs = require('fs');
const path = require('path');

console.log('🔨 Building and verifying Airtime Flip PWA...\n');

const requiredFiles = [
  'server.js',
  'index.html',
  'transactions.html',
  'app.js',
  'app.css',
  'public/manifest.json',
  'public/sw.js',
  'img/logo.jpg'
];

let allFilesExist = true;
let errors = [];

console.log('📋 Checking required files:');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allFilesExist = false;
    errors.push(`Missing file: ${file}`);
  }
});

console.log('\n📦 Checking dependencies:');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('  ✅ node_modules exists');

  const expressPath = path.join(nodeModulesPath, 'express');
  if (fs.existsSync(expressPath)) {
    console.log('  ✅ Express.js installed');
  } else {
    console.log('  ❌ Express.js missing');
    allFilesExist = false;
    errors.push('Express.js not installed. Run: npm install');
  }
} else {
  console.log('  ❌ node_modules missing');
  allFilesExist = false;
  errors.push('Dependencies not installed. Run: npm install');
}

console.log('\n🔍 Validating PWA configuration:');
try {
  const manifestPath = path.join(__dirname, 'public/manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);

  if (manifest.name) {
    console.log(`  ✅ App name: ${manifest.name}`);
  } else {
    console.log('  ❌ Missing app name in manifest');
    errors.push('Manifest missing name field');
  }

  if (manifest.icons && manifest.icons.length > 0) {
    console.log(`  ✅ Icons configured: ${manifest.icons.length} sizes`);
  } else {
    console.log('  ❌ No icons in manifest');
    errors.push('Manifest missing icons');
  }

  if (manifest.start_url) {
    console.log(`  ✅ Start URL: ${manifest.start_url}`);
  } else {
    console.log('  ⚠️  Warning: No start_url in manifest');
  }

  if (manifest.display) {
    console.log(`  ✅ Display mode: ${manifest.display}`);
  }

} catch (err) {
  console.log('  ❌ Error parsing manifest.json');
  errors.push('Invalid manifest.json: ' + err.message);
  allFilesExist = false;
}

console.log('\n🔧 Validating server configuration:');
try {
  const serverContent = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
  if (serverContent.includes('express')) {
    console.log('  ✅ Express server configured');
  }
  if (serverContent.includes('app.listen') || serverContent.includes('httpServer.listen')) {
    console.log('  ✅ Server listen configured');
  }
} catch (err) {
  console.log('  ❌ Error reading server.js');
  errors.push('Cannot read server.js: ' + err.message);
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));

if (allFilesExist && errors.length === 0) {
  console.log('\n✅ BUILD SUCCESSFUL!\n');
  console.log('🎉 Your PWA is ready to run!\n');
  console.log('📝 Next steps:');
  console.log('   1. Run: npm start');
  console.log('   2. Visit: http://localhost:3000');
  console.log('   3. Click "Install App" button');
  console.log('   4. Your logo will be the app icon!\n');
  process.exit(0);
} else {
  console.log('\n❌ BUILD FAILED!\n');
  console.log('Errors found:');
  errors.forEach(err => console.log(`  - ${err}`));
  console.log('\nPlease fix the errors above and try again.\n');
  process.exit(1);
}
