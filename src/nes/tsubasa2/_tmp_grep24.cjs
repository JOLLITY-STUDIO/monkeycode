const fs = require('fs');
const src = fs.readFileSync('src/game/service/bank24_hud.service.ts', 'utf8').split('\n');
const pats = [
  '_fixedC52D', '_fixedC530', '_fixedC54E', 'palWriteAll', 'KEY_046F',
  'KEY_0472', 'KEY_0408', 'KEY_046C', '_fixedC533', '_fixedC515', '_fixedC50C',
  'KEY_0516', 'KEY_0518', 'KEY_05FB', 'KEY_05D2', 'KEY_0557', 'KEY_056C',
  'KEY_0490', 'KEY_0491', 'KEY_0087', 'KEY_008A', 'KEY_008B', 'KEY_063F',
  'KEY_0441', 'KEY_0442', 'KEY_046B', 'KEY_004A', 'KEY_004B', 'KEY_0517',
  'KEY_053A', 'KEY_053C', 'KEY_0541', 'KEY_0547', 'KEY_054F', 'KEY_0553',
  'KEY_0559', 'KEY_0558', 'KEY_0020', 'KEY_002A', 'KEY_002B',
];
const lines = [];
for (let i = 0; i < src.length; i++) {
  if (pats.some(p => src[i].includes(p))) {
    lines.push(`${i + 1}|${src[i].trim()}`);
  }
}
fs.writeFileSync('_tmp_grep24_out.txt', lines.join('\n'));
console.log('done', lines.length);
