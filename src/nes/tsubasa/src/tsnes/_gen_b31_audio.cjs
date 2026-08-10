// 生成音频精简版 bank 31
// 策略：保留 Bank30 的原版 init/NMI 流程 + Bank31 音频数据表
const fs = require('fs');
const path = require('path');

// 读取原始 bank 31
const file = fs.readFileSync(path.join(__dirname, 'mini-audio/rom-data/prg-bank-31.ts'), 'utf-8');
const m = file.match(/=\s*\[([\s\S]*?)\];/);
const arr = m[1].split(',').map(s => parseInt(s.trim(), 16)).filter(x => !isNaN(x));

// 1. $E000-$EFFF: 清为 $FF
for (let i = 0; i < 0x1000; i++) arr[i] = 0xFF;

// 2. $FFF0-$FFF2: JMP $E000 (调试/安全网，正常不会用到)
//    — 但由于 RESET 向量指向 $C503（Bank30），CPU不会来这里
//    — NMI/IRQ 也指向 Bank30

// 保持 Bank30 的原始向量不变，让 Bank30 完整初始化后再调 Bank12
// NMI=$C500(LO) $C5(HI) → $C500 (Bank30 NMI handler, 包含音频引擎调用)
// RESET=$F0(LO) $FF(HI) → $FFF0 → JMP $C503 (Bank30 init)  
// IRQ=$06(LO) $C5(HI) → $C506 (Bank30 IRQ handler)

// 3. $FFF0: JMP $C503 (Bank30 init)
arr[0x1FF0] = 0x4C;
arr[0x1FF1] = 0x03;
arr[0x1FF2] = 0xC5;

// 4. $FFF3-$FFF9: 填充 $00
for (let i = 0x1FF3; i <= 0x1FF9; i++) arr[i] = 0x00;

// 5. Vectors — 全部指向 Bank30
arr[0x1FFA] = 0x00; arr[0x1FFB] = 0xC5; // NMI→$C500
arr[0x1FFC] = 0xF0; arr[0x1FFD] = 0xFF; // RESET→$FFF0→JMP $C503
arr[0x1FFE] = 0x06; arr[0x1FFF] = 0xC5; // IRQ→$C506

// 生成 TS 文件（16 bytes 一行）
const out = [];
out.push('/** PRG-ROM Bank 31 (8KB) — 音频精简版 (Bank30 init+NMI) */');
out.push('const PRG_BANK_31: readonly number[] = [');
for (let i = 0; i < arr.length; i += 16) {
  const row = arr.slice(i, i + 16).map(x => '0x' + x.toString(16).toUpperCase().padStart(2, '0')).join(', ');
  out.push('  ' + row + (i + 16 < arr.length ? ',' : ''));
}
out.push('];');
out.push('');
out.push('export default PRG_BANK_31;');
out.push('export { PRG_BANK_31 };');
out.push('');

const outPath = path.join(__dirname, 'mini-audio/rom-data/prg-bank-31-mini-audio.ts');
fs.writeFileSync(outPath, out.join('\n'));
console.log('写入: ' + outPath);

const nm = (arr[0x1FFA] | (arr[0x1FFB] << 8));
const rst = (arr[0x1FFC] | (arr[0x1FFD] << 8));
const irq = (arr[0x1FFE] | (arr[0x1FFF] << 8));
console.log('NMI=$' + nm.toString(16).toUpperCase() + ' RESET=$' + rst.toString(16).toUpperCase() + ' IRQ=$' + irq.toString(16).toUpperCase());
console.log('$FFF0: JMP $' + ((arr[0x1FF2] << 8) | arr[0x1FF1]).toString(16).toUpperCase());
