// 提取 bank00 $98EA 完整函数（处理折行格式）
const fs = require('fs');
const path = require('path');
const asm = fs.readFileSync(path.join(__dirname, '_tmp_bzk_out', 'bank_00.asm'), 'utf8');

const re = /00:([0-9A-F]{4}):\s+((?:[0-9A-F]{2}\s+)+)/g;
const addrBytes = new Map();
let m;
while ((m = re.exec(asm)) !== null) {
  const addr = parseInt(m[1], 16);
  const bytes = m[2].trim().split(/\s+/).map(b => parseInt(b, 16));
  addrBytes.set(addr, bytes);
}

// 行文本
const lineMap = new Map();
for (const l of asm.split(/\r?\n/)) {
  const lm = l.match(/00:([0-9A-F]{4}):\s+(.{0,70})/);
  if (lm) lineMap.set(parseInt(lm[1], 16), l.trim());
}

let start = 0x98EA;
for (let pass = 0; pass < 2; pass++) {
  const out = [];
  let addr = start;
  for (let i = 0; i < 120; i++) {
    const bytes = addrBytes.get(addr);
    if (!bytes) break;
    const l = lineMap.get(addr) || `$${addr.toString(16)}: ${bytes.map(b => b.toString(16).padStart(2, '0')).join(' ')}`;
    out.push(l);
    addr += bytes.length;
  }
  console.log(out.join('\n'));
  console.log('--- end at $' + addr.toString(16) + ' ---');
  start = addr;
}
