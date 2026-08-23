// dump bank12 $8BDA SE 指针表全貌
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgBase = 0x10;
const b12 = rom.slice(prgBase + 12 * 0x2000, prgBase + 13 * 0x2000);
const rel = (a) => a - 0x8000;
console.log('=== $8BDA SE 指针表 (id → ptr) ===');
let id = 1;
for (let off = rel(0x8BDA); off < b12.length; off += 2) {
  const ptr = b12[off] | (b12[off + 1] << 8);
  const tag = ptr === 0xFF00 ? ' <-- SENTINEL' : (ptr >= 0xA000 && ptr < 0xC000) ? ' (A000窗口/BGM)' : '';
  console.log(`  id=${id.toString(16).padStart(2, '0')} → $${ptr.toString(16)}${tag}`);
  id++;
  if (ptr === 0xFF00) break;
}
// 确认 bank13/14/15 头部 (init list 格式)
console.log('\n=== bank13 前 16 字节 ===');
const b13 = rom.slice(prgBase + 13 * 0x2000, prgBase + 14 * 0x2000);
console.log('  ' + Array.from(b13.slice(0, 16)).map(x => x.toString(16).padStart(2, '0')).join(' '));
console.log('\n=== bank14 前 16 字节 ===');
const b14 = rom.slice(prgBase + 14 * 0x2000, prgBase + 15 * 0x2000);
console.log('  ' + Array.from(b14.slice(0, 16)).map(x => x.toString(16).padStart(2, '0')).join(' '));
console.log('\n=== bank15 前 16 字节 ===');
const b15 = rom.slice(prgBase + 15 * 0x2000, prgBase + 16 * 0x2000);
console.log('  ' + Array.from(b15.slice(0, 16)).map(x => x.toString(16).padStart(2, '0')).join(' '));
// 对比 TS 数据文件 bank13/14 是否存在
const fs2 = require('fs');
['bank13-data.ts', 'bank14-data.ts', 'bank15-data.ts'].forEach(f => {
  const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/' + f;
  const exists = fs2.existsSync(p);
  console.log(`  ${f}: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (exists) {
    const first = fs2.readFileSync(p, 'utf8').split(/\r?\n/).find(l => l.includes('0x'));
    console.log('    首行: ' + (first || '').trim().slice(0, 90));
  }
});
