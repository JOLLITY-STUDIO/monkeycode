const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const skip = new Set(['node_modules', '.git', '.codebuddy', 'output', 'docs']);
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|js)$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk(root, files);
const pats = /sceneStreamNext|buildSprite|rowAdvance|sceneCmd9459|sceneCmdLoop|loadSceneStream|sceneSpriteLoop|TileRenderService/;
for (const f of files) {
  if (f.includes('\\src\\game\\prg\\code\\system\\TileRenderService.ts')) continue;
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  lines.forEach((ln, i) => {
    if (pats.test(ln)) {
      console.log(f.replace(root + path.sep, '') + ':' + (i + 1) + ': ' + ln.trim());
    }
  });
}
