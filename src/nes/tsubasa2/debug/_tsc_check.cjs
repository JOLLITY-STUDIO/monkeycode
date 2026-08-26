const { execSync } = require('child_process');
const fs = require('fs');
try {
  const out = execSync('node node_modules/typescript/bin/tsc -p tsconfig.json --noEmit', { encoding: 'utf8' });
  fs.writeFileSync('debug/_tsc_result.txt', 'EXIT=0\n' + out);
  console.log('EXIT=0');
  if (out.trim()) console.log(out.slice(0, 3000));
} catch (e) {
  fs.writeFileSync('debug/_tsc_result.txt', 'EXIT=' + e.status + '\n' + (e.stdout || ''));
  console.log('EXIT=' + e.status);
  console.log(String(e.stdout || '').slice(0, 5000));
}
