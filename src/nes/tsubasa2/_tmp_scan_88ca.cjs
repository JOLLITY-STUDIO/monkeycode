// 临时: 查看 bank10 idx 0x20 (0xA52A) 数据流
const fs = require('fs');
const s = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/bank10-raw.ts', 'utf8');
const m = s.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.log('NO ARRAY FOUND'); process.exit(0); }
const nums = m[1].split(',').map(x => parseInt(x.trim().replace(/^0x/i, ''), x.trim().toLowerCase().startsWith('0x') ? 16 : 10)).filter(x => !isNaN(x));
console.log('total len:', nums.length);
const off = 0x52a;
console.log('data @0x52A (120B):');
console.log(Array.from({ length: 120 }, (_, i) => nums[off + i] ?? -1).map((v, i) => `${(off + i).toString(16)}:${v.toString(16).padStart(2, '0')}`).join(' '));
