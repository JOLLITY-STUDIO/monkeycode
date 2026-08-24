// 临时：对比 $8BDA 主表 vs $8798 表前几条 + 打印 AudioRom.readBgmData 的 bank 映射逻辑
const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/audio-rom.ts';
const t = fs.readFileSync(f, 'utf8');
const grab = (name) => {
  const m = t.match(new RegExp(name + '[^=]*= new Uint8Array\\(\\[([\\s\\S]*?)\\]\\)'));
  return m ? m[1].split(',').map((s) => parseInt(s.trim(), 16)).filter((v) => !isNaN(v)) : null;
};
const b12 = grab('BANK12_BYTES');
const u16 = (arr, cpu) => arr[cpu - 0x8000] | (arr[cpu - 0x8000 + 1] << 8);
console.log('--- $8BDA 主表（dispatch 用，index=request-1）---');
for (let i = 0; i < 6; i++) console.log('  [' + i + '] req=' + (i + 1).toString(16) + ' → $' + u16(b12, 0x8bda + i * 2).toString(16).toUpperCase());
console.log('--- $8798 表（startBgm 现在用，index=req-3）---');
for (let i = 0; i < 6; i++) console.log('  [' + i + '] → $' + u16(b12, 0x8798 + i * 2).toString(16).toUpperCase());
// $8BDA[0] 指向的数据头（在 bank7 $A000-$BFFF? 还是 $8000-$9FFF）
const p0 = u16(b12, 0x8bda);
console.log('\n$8BDA[0] = $' + p0.toString(16).toUpperCase());
// 打印 readBgmData 实现
const lines = t.split('\n');
const i0 = lines.findIndex((l) => /static readBgmData/.test(l));
for (let i = i0; i < i0 + 14 && i < lines.length; i++) console.log(lines[i]);
// switchBank / currentBank 相关
const i1 = lines.findIndex((l) => /static switchBank/.test(l));
for (let i = i1; i < i1 + 6 && i < lines.length; i++) console.log(lines[i]);
