const fs = require('fs');
const txt = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/debug/_tsc_v01.txt', 'utf8');
const lines = txt.split('\n');
const game = lines.filter((l) => l.includes('src/game'));
const core = lines.filter((l) => l.includes('src/core'));
const other = lines.filter((l) => l && !l.includes('src/game') && !l.includes('src/core'));
console.log('TOTAL_ERRORS=' + (lines.length - 1));
console.log('GAME_ERRORS=' + game.length);
console.log('CORE_ERRORS=' + core.length);
console.log('OTHER_ERRORS=' + other.length);
if (game.length) console.log(game.slice(0, 30).join('\n'));
if (other.length) console.log(other.slice(0, 30).join('\n'));
// 汇总 core 报错文件
const files = {};
for (const l of core) {
  const m = /^([^(\s]+)/.exec(l);
  if (m) files[m[1]] = (files[m[1]] || 0) + 1;
}
console.log('CORE_FILES:', JSON.stringify(files, null, 0));
