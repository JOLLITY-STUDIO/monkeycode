/**
 * scan_seg.cjs — 扫描 CPU 分段日志, 找写 $05E8 buffer 和 $2007 的代码
 * 用法: node debug/scan_seg.cjs <seg文件> [关键词]
 */
const fs = require('fs');
const file = process.argv[2] || 'debug/trace/cpu_seg001.log';
const kw = process.argv[3] || '';

const lines = fs.readFileSync(file, 'utf8').split('\n');
console.log('file:', file, 'lines:', lines.length);

// 单行格式: i\d+ $xxxx:xxxx mnemonic
// 找 STA #$05E8 / STA $05E8 相关 (写 buffer) — 由于反汇编格式未知, 先找含 05E8 的行
let count = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('05E8') || l.includes('05E9') || l.includes('05EA') || l.includes('05EB')) {
    if (kw && !l.includes(kw)) continue;
    // 打印前后 3 行
    for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
      console.log(lines[j].slice(0, 150));
    }
    console.log('---');
    if (++count >= 30) break;
  }
}
console.log('hits:', count);
