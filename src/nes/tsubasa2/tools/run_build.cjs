const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
try {
  const out = execFileSync('python', [path.resolve(__dirname, '../asm/build_nes.py')], {
    encoding: 'utf8',
    cwd: path.resolve(__dirname, '../asm'),
    env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
  });
  fs.writeFileSync(path.resolve(__dirname, '../asm/build_out.txt'), out, 'utf8');
  console.log('BUILD OK');
} catch (e) {
  const msg = (e.stdout || '') + '\n=== STDERR ===\n' + (e.stderr || '') + '\n=== MSG ===\n' + String(e.message);
  fs.writeFileSync(path.resolve(__dirname, '../asm/build_out.txt'), msg, 'utf8');
  console.log('BUILD FAILED (see asm/build_out.txt)');
}
