const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/textscript/scripts-bank-03.ts';
const src = fs.readFileSync(p, 'utf8');
const lines = src.split('\n');
const idx = lines.findIndex(l => l.includes('SCRIPT_0x00'));
if (idx < 0) { console.log('SCRIPT_0x00 not found'); process.exit(0); }
// 打印从 SCRIPT_0x00 起到下一个 export const 前的所有行
let out = [];
let depth = 0;
let started = false;
for (let i = idx; i < lines.length; i++) {
  const l = lines[i];
  out.push(`${i + 1}|${l}`);
  if (i > idx && /^export const SCRIPT_0x0[1-9]/.test(l)) break;
  if (out.length > 90) break;
}
console.log(out.join('\n'));
