const fs = require('fs');
const path = require('path');

function parseBytes(file) {
  const text = fs.readFileSync(file, 'utf8');
  const bytes = [];
  const re = /\$([0-9A-Fa-f]{2})/g;
  let m;
  while ((m = re.exec(text)) !== null) bytes.push(parseInt(m[1], 16));
  return bytes;
}

const tables = parseBytes('asm/bank19/data_tables.s'); // 1504
const tail = parseBytes('asm/bank19/data_tail.s');     // 1490
console.log('tables len', tables.length, 'tail len', tail.length);

// stream = data_tables[25..] + data_tail[0..]
const STREAM_START = 25; // data at $944E; scene stream starts $9467 = +25
const stream = tables.slice(STREAM_START).concat(tail);
console.log('stream len', stream.length, '(expected 2969 = 0xB99)');
console.log('first bytes', stream.slice(0, 8).map(b=>'0x'+b.toString(16).toUpperCase().padStart(2,'0')).join(','));
console.log('last bytes', stream.slice(-8).map(b=>'0x'+b.toString(16).toUpperCase().padStart(2,'0')).join(','));

// Build TS file content
const ROWS = [];
for (let i = 0; i < stream.length; i += 16) {
  const row = stream.slice(i, i + 16).map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');
  ROWS.push('  ' + row + ',');
}
const content = `/**
 * Bank 19 场景数据流 — data_tables.s ($9467 起) + data_tail.s
 *
 * 对应 asm/bank19/data_tables.s ($944E 起的数据块, 场景数据流自 $9467 偏移 +25 开始)
 * 与 data_tail.s ($FF padding 至 bank 末尾)。
 *
 * 编码: 字节 < $E0 = 精灵渲染; 字节 >= $E0 = 控制码 (减 $E0 分派, 见 Bank19Service)。
 * 由 bank19_auxiliary.ts 消费 (替代 PRG_BANK_19 原始字节查表)。
 */
export const B19_SCENE_STREAM: ReadonlyArray<number> = [
${ROWS.join('\n')}
];
`;
fs.writeFileSync(path.resolve('src/game/prg/data/bank19-scene-stream.ts'), content);
console.log('wrote bank19-scene-stream.ts');
