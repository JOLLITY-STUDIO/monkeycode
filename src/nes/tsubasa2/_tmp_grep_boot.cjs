// 临时: 查看 match-scripts-bank-09/10 的结构 + SCRIPT_0x0d 内容
const fs = require('fs');
const p9 = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/match-scripts-bank-09.ts';
const p10 = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/match-scripts-bank-10.ts';

const t9 = fs.readFileSync(p9, 'utf8');
// 找到 SCRIPT_0x0d 声明行
const m = t9.match(/SCRIPT_0x0d: readonly \(readonly number\[\]\)\[\] = \[([\s\S]*?)\n\];/);
if (m) {
  console.log('=== SCRIPT_0x0d (bank09) ===');
  console.log(m[1].slice(0, 2000));
} else {
  console.log('no SCRIPT_0x0d in bank09, searching SCRIPT_0x0D ...');
  const m2 = t9.match(/SCRIPT_0x0D: readonly \(readonly number\[\]\)\[\] = \[([\s\S]*?)\n\];/);
  if (m2) console.log(m2[1].slice(0, 2000));
}
// 统计 bank09 导出数量
const exports9 = [...t9.matchAll(/export const SCRIPT_0x([0-9a-fA-F]+)_SCENE_/g)].map(x => x[1]);
console.log('\nbank09 scene segment count:', exports9.length, 'unique scripts:', new Set(exports9).size);
console.log('bank09 scripts:', [...new Set(exports9)].join(','));

const t10 = fs.readFileSync(p10, 'utf8');
const exports10 = [...t10.matchAll(/export const SCRIPT_0x([0-9a-fA-F]+)_SCENE_/g)].map(x => x[1]);
console.log('\nbank10 scene segment count:', exports10.length, 'unique scripts:', new Set(exports10).size);
console.log('bank10 scripts:', [...new Set(exports10)].join(','));
