// 临时: 读取 dist/tsubasa2.nes 的 bank31 头尾字节
const fs = require('fs');
const path = require('path');

const nesPath = path.join(__dirname, 'asm', 'dist', 'tsubasa2.nes');
const buf = fs.readFileSync(nesPath);

// iNES header 16B, PRG 每 bank 8KB
const PRG = buf.slice(16);
const B31 = PRG.slice(31 * 8192, 32 * 8192); // bank31 8KB
console.log(`bank31 size: ${B31.length} bytes`);

// 头 16 字节 (CPU $E000-$E00F)
console.log('\nbank31 head 16B (CPU $E000-$E00F):');
for (let i = 0; i < 16; i++) {
    console.log(`  $E0${i.toString(16).padStart(2,'0').toUpperCase()} = 0x${B31[i].toString(16).padStart(2,'0').toUpperCase()}`);
}

// 尾 16 字节 (CPU $FFF0-$FFFF)
console.log('\nbank31 tail 16B (CPU $FFF0-$FFFF):');
const tail = B31.slice(8192 - 16);
for (let i = 0; i < 16; i++) {
    const addr = 0xFFF0 + i;
    console.log(`  $${addr.toString(16).toUpperCase()} = 0x${tail[i].toString(16).padStart(2,'0').toUpperCase()}`);
}

// 中断向量
const lo = (off) => B31[off];
const hi = (off) => B31[off+1];
const vec = (addr, off) => {
    const v = (B31[off+1] << 8) | B31[off];
    console.log(`  $${addr.toString(16).toUpperCase()} vector = $${v.toString(16).toUpperCase()} (lo=0x${B31[off].toString(16).toUpperCase()}, hi=0x${B31[off+1].toString(16).toUpperCase()})`);
};
console.log('\nVectors:');
vec(0xFFFA, 0x1FFA); // IRQ/BRK
vec(0xFFFC, 0x1FFC); // RESET
vec(0xFFFE, 0x1FFE); // NMI
