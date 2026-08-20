// 临时: 分析 bank31 中 $FF padding 区段分布, 以便清理时合理 .res
const fs = require('fs');
const path = require('path');

const nesPath = path.join(__dirname, 'asm', 'dist', 'tsubasa2.nes');
const buf = fs.readFileSync(nesPath);
const PRG = buf.slice(16);
const B31 = PRG.slice(31 * 8192, 32 * 8192); // 0..8191 → CPU $E000..$FFFF

// 找连续 $FF 区段
let runs = [];
let runStart = -1;
for (let i = 0; i < B31.length; i++) {
    if (B31[i] === 0xFF) {
        if (runStart < 0) runStart = i;
    } else {
        if (runStart >= 0 && i - runStart >= 4) {
            runs.push({ start: runStart, end: i - 1, len: i - runStart });
        }
        runStart = -1;
    }
}
if (runStart >= 0 && B31.length - runStart >= 4) {
    runs.push({ start: runStart, end: B31.length - 1, len: B31.length - runStart });
}

const cpu = (off) => 0xE000 + off;
console.log(`bank31: ${B31.length} bytes, ${runs.length} $FF runs (>=4B):`);
for (const r of runs) {
    console.log(`  $${cpu(r.start).toString(16).toUpperCase()} - $${cpu(r.end).toString(16).toUpperCase()} : ${r.len} bytes`);
}

// 列出真实代码区段 (=非 $FF run 的区段)
console.log('\nReal code/data regions (between $FF runs):');
let prevEnd = -1;
for (const r of runs) {
    if (r.start > prevEnd + 1) {
        const codeStart = prevEnd + 1;
        const codeEnd = r.start - 1;
        const codeLen = codeEnd - codeStart + 1;
        console.log(`  $${cpu(codeStart).toString(16).toUpperCase()} - $${cpu(codeEnd).toString(16).toUpperCase()} : ${codeLen} bytes (code/data)`);
    }
    prevEnd = r.end;
}
// 末尾
if (prevEnd < B31.length - 1) {
    const codeStart = prevEnd + 1;
    const codeEnd = B31.length - 1;
    const codeLen = codeEnd - codeStart + 1;
    console.log(`  $${cpu(codeStart).toString(16).toUpperCase()} - $${cpu(codeEnd).toString(16).toUpperCase()} : ${codeLen} bytes (code/data)`);
}

// 头尾几行
console.log('\nFirst 4 bytes (E000-E003):');
for (let i = 0; i < 4; i++) console.log(`  $E0${i.toString(16).padStart(2,'0').toUpperCase()} = 0x${B31[i].toString(16).padStart(2,'0').toUpperCase()}`);

console.log('\nLast 16 bytes (FFF0-FFFF):');
for (let i = 0; i < 16; i++) {
    const off = B31.length - 16 + i;
    console.log(`  $${cpu(off).toString(16).toUpperCase()} = 0x${B31[off].toString(16).padStart(2,'0').toUpperCase()}`);
}
