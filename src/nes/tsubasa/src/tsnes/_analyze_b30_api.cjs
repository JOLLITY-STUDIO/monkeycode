// 提取 bank_30 中 Bank24 调用的 API 实现
const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
const targets = [0xCB99, 0xCD7C, 0xCB0F, 0xCBC2, 0xCE08, 0xCC46, 0xCCD2, 0xF30F, 0xCF72, 0xCAF7, 0xCD3C, 0xCB02, 0xCC02, 0xCDC9, 0xCDE2];
const out = [];

function getLine(addr) {
  return lines.findIndex(l => {
    const m = l.match(/([0-9A-F]{2}):([0-9A-F]{4}):\s+/);
    return m && parseInt(m[2], 16) === addr;
  });
}

for (const t of targets) {
  const idx = getLine(t);
  if (idx < 0) { out.push('\n=== $' + t.toString(16).toUpperCase() + ': NOT FOUND ==='); continue; }
  out.push('\n=== $' + t.toString(16).toUpperCase() + ' ===');
  let count = 0;
  for (let i = idx; i < lines.length && count < 20; i++) {
    const m = lines[i].match(/([0-9A-F]{2}):([0-9A-F]{4}):\s+(.*)$/);
    if (!m) continue;
    out.push(lines[i]);
    count++;
    if (/^\s*RTS|^\s*JMP/.test(m[3])) break;
  }
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_b30_api_impl.txt', out.join('\n'));
console.log('done');
