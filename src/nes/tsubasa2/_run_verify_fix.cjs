const { execSync } = require('child_process');
const fs = require('fs');
try {
  const out = execSync('node _verify_fix.cjs', { encoding: 'utf8', timeout: 120000 });
  fs.writeFileSync('_verify_fix_result.txt', out);
} catch (e) {
  fs.writeFileSync('_verify_fix_result.txt', 'ERROR\n' + (e.stdout || '') + '\n' + (e.stderr || '') + '\n' + e.message);
}
