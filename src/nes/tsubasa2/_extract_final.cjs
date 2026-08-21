const fs = require('fs');
const c = fs.readFileSync('asm/bank02/_full.s', 'utf8');
const lines = c.split('\n');

// 构建 addr → byte 映射
// 每行格式: [指令或.byte] ; $XXXX
// 地址注释 $XXXX = 本行首字节地址
// .byte 行: 每个字节占 1 地址
// 指令行: 按下一行地址注释 - 本行地址 = 本行字节数
const mem = new Array(0x10000).fill(null);
let prevAddr = null;
const addrLines = []; // {addr, lineIdx}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const addrMatch = line.match(/;\s*\$([0-9A-Fa-f]{4})/);
  if (!addrMatch) continue;
  const addr = parseInt(addrMatch[1], 16);
  addrLines.push({ addr, lineIdx: i });
}

// 按地址排序, 计算每行字节长度
for (let i = 0; i < addrLines.length; i++) {
  const { addr, lineIdx } = addrLines[i];
  const line = lines[lineIdx].trim();
  const nextAddr = i + 1 < addrLines.length ? addrLines[i + 1].addr : addr + 1;
  const byteLen = nextAddr - addr;

  if (line.startsWith('.byte')) {
    const m = line.match(/\.byte\s+(.+)/);
    if (m) {
      const parts = m[1].split(',').map(s => s.trim()).filter(Boolean);
      for (let j = 0; j < parts.length && addr + j < 0x10000; j++) {
        const bm = parts[j].match(/^\$([0-9A-Fa-f]{2})$/);
        if (bm) mem[addr + j] = parseInt(bm[1], 16);
      }
    }
  }
  // 代码行不提取字节 (我们只要数据表)
}

// 提取目标表
const targets = [
  { name: 'PASSWORD_CONTINUE_TABLE', addr: 0x8A97, maxLen: 48 },
  { name: 'PASSWORD_POS_INC', addr: 0x8ADF, maxLen: 16 },  // $AADF/$AAE0 交错
];

for (const t of targets) {
  console.log('=== ' + t.name + ' ($' + t.addr.toString(16).toUpperCase() + ') ===');
  const bytes = [];
  for (let i = 0; i < t.maxLen; i++) {
    const b = mem[t.addr + i];
    if (b === null) {
      console.log('  空洞 @ offset ' + i + ' (addr $' + (t.addr + i).toString(16).toUpperCase() + ')');
      break;
    }
    bytes.push(b);
  }
  console.log('  ' + bytes.length + 'B: ' + bytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', '));
  console.log();
}
