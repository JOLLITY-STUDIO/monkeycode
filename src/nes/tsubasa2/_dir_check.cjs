const fs = require('fs');
const path = require('path');
const root = process.cwd();
console.log('cwd:', root);
for (const p of ['mini-audio', 'mini-audio/mini-audio', 'mini-audio/mini-audio/bgm-data', 'mini-audio/mini-audio/rom-data']) {
  const full = path.join(root, p);
  let st = null;
  try { st = fs.statSync(full); } catch (e) { st = 'MISSING: ' + e.code; }
  console.log(p, '->', typeof st === 'string' ? st : (st.isDirectory() ? 'DIR' : 'FILE'));
}
if (fs.existsSync(path.join(root, 'mini-audio'))) {
  console.log('--- mini-audio contents ---');
  console.log(fs.readdirSync(path.join(root, 'mini-audio')).join('\n'));
}
