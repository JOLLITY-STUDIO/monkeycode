// 临时: 验证 bank31 编译输出
const fs = require('fs');
const path = require('path');

const nesPath = path.join(__dirname, 'asm', 'dist', 'tsubasa2.nes');
const symPath = path.join(__dirname, 'asm', 'dist', 'tsubasa2.sym');

// 1. 符号表里 bank31 的符号
const sym = fs.readFileSync(symPath, 'utf8');
const lines = sym.split(/\r?\n/);
const b31Syms = lines.filter(l => /^\$(E|F)[0-9A-F]{3}/i.test(l));
console.log(`bank31 symbols (${b31Syms.length}):`);
for (const l of b31Syms) console.log('  ' + l);

// 2. 检查编译产物的 bank31 末尾向量
const buf = fs.readFileSync(nesPath);
const PRG = buf.slice(16);
const B31 = PRG.slice(31 * 8192, 32 * 8192);

console.log('\nbank31 tail 16B (FFF0-FFFF) of NEW build:');
for (let i = 0; i < 16; i++) {
    const off = B31.length - 16 + i;
    console.log(`  $${(0xFFF0 + i).toString(16).toUpperCase()} = 0x${B31[off].toString(16).padStart(2,'0').toUpperCase()}`);
}

// 3. 读取原始 dist 之前的备份 (如果有) 比对
// 这里只看新构建的向量
const irq = (B31[0x1FFB] << 8) | B31[0x1FFA];
const rst = (B31[0x1FFD] << 8) | B31[0x1FFC];
const nmi = (B31[0x1FFF] << 8) | B31[0x1FFE];
console.log(`\nVectors in new build:`);
console.log(`  IRQ  = $${irq.toString(16).toUpperCase()}`);
console.log(`  RST  = $${rst.toString(16).toUpperCase()}`);
console.log(`  NMI  = $${nmi.toString(16).toUpperCase()}`);
