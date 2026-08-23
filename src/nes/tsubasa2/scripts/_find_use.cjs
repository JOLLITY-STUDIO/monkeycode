const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src');
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk(root, files);
const pats = /sceneStreamNext|buildSprite|rowAdvance|sceneCmd9459|sceneCmdLoop|loadSceneStream|readShift16|writeShift16|addSigned16|sceneSpriteLoop|calcAttrAddress|attrWrite|renderTile|clearNt0|clearNt1/;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  lines.forEach((ln, i) => {
    if (pats.test(ln) && !f.endsWith('TileRenderService.ts')) {
      console.log(f.replace(root + path.sep, '') + ':' + (i + 1) + ': ' + ln.trim());
    }
  });
}
