#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const projectDir = 'c:\\dev\\PlaywrightMCP';

console.log('🚀 Installing dependencies...\n');
try {
  execSync('npm install', { 
    cwd: projectDir,
    stdio: 'inherit',
    shell: 'cmd.exe'
  });
} catch (error) {
  console.error('npm install failed:', error.message);
  process.exit(1);
}

console.log('\n\n🧪 Running Playwright API Tests...\n');
try {
  execSync('npx playwright test tests\\api-fakestore.spec.js --reporter=list', { 
    cwd: projectDir,
    stdio: 'inherit',
    shell: 'cmd.exe'
  });
} catch (error) {
  console.error('\nTest execution completed with errors');
  process.exit(1);
}
