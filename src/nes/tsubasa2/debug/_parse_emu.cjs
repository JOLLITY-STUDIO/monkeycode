// 解析 _emu_frames.json，提取 NT0 每行非零 tile 的精确列位置
const frames = require('./_emu_frames.json');
const f13 = frames.find((f) => f.frame === 13);
if (!f13) { console.error('no f13'); process.exit(1); }
console.log('=== f13 NT0 非零行 ===');
for (let row = 0; row < 30; row++) {
  const base = row * 32;
  const cells = [];
  for (let c = 0; c < 32; c++) {
    const v = f13.nt0[base + c];
    if (v !== 0) cells.push(`${c}=${v}(0x${v.toString(16).toUpperCase()})`);
  }
  if (cells.length) console.log(`row ${row}: ${cells.join(' ')}`);
}
console.log('\n=== f13 palBg ===', f13.palBg.join(','));
console.log('=== f13 palSp ===', f13.palSp.join(','));
console.log('=== f13 chrBanks ===', f13.chrBanks.join(','));
// 也输出 f9
const f9 = frames.find((f) => f.frame === 9);
console.log('\n=== f9 NT0 非零行 ===');
for (let row = 0; row < 30; row++) {
  const base = row * 32;
  const cells = [];
  for (let c = 0; c < 32; c++) {
    const v = f9.nt0[base + c];
    if (v !== 0) cells.push(`${c}=${v}(0x${v.toString(16).toUpperCase()})`);
  }
  if (cells.length) console.log(`row ${row}: ${cells.join(' ')}`);
}
