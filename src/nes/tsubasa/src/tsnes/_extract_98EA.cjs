// 提取 bank00 $98EA 完整函数（处理折行格式）
const fs = require('fs');
const path = require('path');
const asm = fs.readFileSync(path.join(__dirname, '_tmp_bzk_out', 'bank_00.asm'), 'utf8');

// 每行: "... 00:XXXX: [bytes] mnemonic ..."
// 正则提取所有 (addr, bytes)
const re = /00:([0-9A-F]{4}):\s+((?:[0-9A-F]{2}\s+)+)/g;
const addrBytes = new Map();
let m;
while ((m = re.exec(asm)) !== null) {
  const addr = parseInt(m[1], 16);
  const bytes = m[2].trim().split(/\s+/).map(b => parseInt(b, 16));
  addrBytes.set(addr, bytes[0]);
}

// 同时收集每地址的完整行文本（用于输出）
const lineMap = new Map();
const lines = asm.split(/\r?\n/);
for (const l of lines) {
  const lm = l.match(/00:([0-9A-F]{4}):\s+(.{0,60})/);
  if (lm) lineMap.set(parseInt(lm[1], 16), l.trim());
}

function dump(start, len) {
  const out = [];
  for (let i = 0; i < len; i++) {
    const addr = start + i;
    if (!addrBytes.has(addr)) break;
    const l = lineMap.get(addr) || `$${addr.toString(16)}: ${addrBytes.get(addr).toString(16)}`;
    out.push(l);
  }
  console.log(out.join('\n'));
  console.log('---end---');
}

dump(0x98EA, 100);
