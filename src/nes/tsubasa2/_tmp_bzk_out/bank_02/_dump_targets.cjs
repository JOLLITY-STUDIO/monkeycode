// 从所有 part 文件中提取指定本地地址的代码段
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const parts = fs.readdirSync(dir).filter(f => /^bank_02_part\d+\.asm$/.test(f)).sort();

const targets = [
  '8A06', '8A1F', '8976', '88FB', '890C', '8AF7', '8A2F', '882F',
  '9A0D', '98EA', '9F96', '9F89', '9B91', '9B28', '9B5E', '9A35',
  '99F0', '9B7F', '98A0', '9A43', '9F69', '9EED', '9FA8', '8A36', '8A42',
];

// 建立 本地地址 -> {file, line, raw} 的索引
const index = new Map();
for (const f of parts) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((raw, i) => {
    const m = raw.match(/01:([0-9A-F]{4}):\s+([0-9A-F]{2})\s+(.*)$/);
    if (m) index.set(m[1], { file: f, line: i + 1, addr: m[1], bytes: m[2], asm: m[3] });
  });
}

for (const t of targets) {
  const entry = index.get(t);
  if (!entry) { console.log(`\n=== ${t} NOT FOUND ===`); continue; }
  console.log(`\n=== ${t} @ ${entry.file}:${entry.line} ===`);
  // 打印从该地址开始的连续代码行 (最多 60 行，遇到 RTS/未定义连续10字节停止)
  let cur = t;
  let count = 0;
  let emptyRun = 0;
  while (count < 60) {
    const e = index.get(cur);
    if (!e) break;
    const isData = /\.byte/.test(e.asm);
    const tag = e.asm.trim();
    console.log(`${e.addr}: ${e.bytes.padEnd(12)} ${tag}`);
    count++;
    if (e.bytes === '60' && !isData) break;              // RTS 结束
    if (isData) { emptyRun++; } else { emptyRun = 0; }
    if (emptyRun >= 4) break;
    // 下一地址 = cur + 指令长度 (依据字节数估算)
    const hex = e.bytes;
    const len = hex.length / 2;
    cur = (parseInt(cur, 16) + len).toString(16).toUpperCase().padStart(4, '0');
  }
}
