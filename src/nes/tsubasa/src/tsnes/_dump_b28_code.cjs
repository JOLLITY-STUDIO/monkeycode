// 抽取 bank28 asm 全部指令行（含地址+字节+助记符+操作数），便于翻译
const fs = require('fs');
const args = process.argv.slice(2);
const file = args[0] || 'bank_28.asm';
const lines = fs.readFileSync('_tmp_bzk_out/' + file, 'utf8').split(/\r?\n/);
const out = [];
for (const l of lines) {
  // 格式: C - - - - - 0x038012 0E:8002: 4C 2D 80  JMP $802D
  const m = l.match(/([0-9A-F]{2}):([0-9A-F]{4}):\s+((?:[0-9A-F]{2} )+)\s+([A-Z]{3})\s+(\S.*)?$/);
  if (m && m[4] !== 'byte' && m[4] !== 'word') {
    const bytes = m[3].trim().split(' ');
    out.push({ addr: parseInt(m[2], 16), op: m[4], ops: m[5] || '', bytes });
  } else if (m && (m[4] === 'byte' || m[4] === 'word')) {
    // 数据
    out.push({ addr: parseInt(m[2], 16), data: true, bytes: m[3].trim().split(' ') });
  }
}
if (args[1] === 'json') {
  console.log(JSON.stringify(out));
} else {
  console.log('总条数: ' + out.length);
  for (const e of out) {
    if (e.data) console.log('$' + e.addr.toString(16).toUpperCase() + ' .byte ' + e.bytes.join(' '));
    else console.log('$' + e.addr.toString(16).toUpperCase() + ' ' + e.op + ' ' + (e.ops || ''));
  }
}
