// 分析 bank_30 固定区 $C500-$C590 的公共 API 实现
const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
const out = [];

for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
  if (!m) continue;
  const addr = parseInt(m[2], 16);
  if (addr >= 0xC500 && addr <= 0xC590 && /^\s*C/.test(lines[i].substring(0, 11))) {
    out.push(lines[i]);
  }
  if (addr > 0xC590) break;
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_b30_c5xx.txt', out.join('\n'));
console.log('lines:', out.length);
