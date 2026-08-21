const { execSync } = require('child_process');
const fs = require('fs');
try {
  const out = execSync('npx tsc -p tsconfig.json --noEmit', { cwd: process.cwd(), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  console.log('TSC OK (no errors)');
} catch (e) {
  const s = e.stdout || e.message;
  const lines = String(s).split(/\r?\n/);
  const errors = lines.filter(l => /error TS/.test(l));
  console.log('errors:', errors.length);
  errors.slice(0, 100).forEach(l => console.log(l));
}
