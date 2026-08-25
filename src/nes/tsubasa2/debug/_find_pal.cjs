// 在 opening-data.ts 中找 OPENING_BG_PALETTES / OPENING_SPR_PALETTES 定义
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/opening-data.ts', 'utf8').split(/\r?\n/);
let started = null;
for (let i = 0; i < t.length; i++) {
  if (/OPENING_(BG|SPR)_PALETTES/.test(t[i])) {
    console.log((i + 1) + ': ' + t[i].trim());
    started = started || { name: t[i].match(/OPENING_(BG|SPR)_PALETTES/)[0], line: i + 1 };
  } else if (started && i < started.line + 20) {
    console.log((i + 1) + ': ' + t[i].trim());
  }
}
