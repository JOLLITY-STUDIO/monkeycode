/**
 * 验证 PT 数据：bank08 $A000+tile*17
 */
const fs = require('fs');
const asmRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm';

function extractBytes(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const bytes = [];
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('.byte')) continue;
    const matches = trimmed.match(/\$([0-9A-Fa-f]{2})/g);
    if (matches) for (const m of matches) bytes.push(parseInt(m.slice(1), 16));
  }
  return bytes;
}

// bank08 data_tables 是 PT 数据（$A000+tile*17）
const b08 = extractBytes(asmRoot + '/bank08/data_tables.s');
const b08b = extractBytes(asmRoot + '/bank08/data_maps.s');
const b08c = extractBytes(asmRoot + '/bank08/data_tail.s');
const full08 = [...b08, ...b08b, ...b08c];
console.log('bank08 total:', full08.length, 'bytes');

// tile 0x04 的 PT 数据在 $A000+0x04*17 = $A044，偏移 0x44=68
// 但 bank08 .org $8000，$A000 偏移 = $A000-$8000 = $2000
// 所以 PT 数据从 bank08 偏移 0x2000 开始
// 但 data_tables 可能不从 $8000 开始
// bank08 的 _full.s 包含 code_main + code_sub + code_data + data_tables
// 需要知道 data_tables 在 bank08 中的偏移

console.log('\nbank08 data_tables first 34 bytes (tile 0):');
console.log(b08.slice(0, 17).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
console.log(b08.slice(17, 34).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// TS OPENING_TILE_PATTERNS[0x00]
console.log('\nTS OPENING_TILE_PATTERNS[0x00]:');
console.log([0x12, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x04, 0x04, 0x05, 0x13, 0x16, 0x17].map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// tile 0x04 的 PT 数据
console.log('\nbank08 data_tables at tile 0x04 offset (4*17=68):');
console.log(b08.slice(68, 68+17).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// TS OPENING_TILE_PATTERNS[0x04]
console.log('\nTS OPENING_TILE_PATTERNS[0x04]:');
console.log([0x01, 0xef, 0x0e, 0x0f, 0x00, 0x00, 0x30, 0x00, 0x00, 0x00, 0x32, 0x00, 0x00, 0x00, 0x01, 0x2d, 0x38].map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// 对比开场 tile 流中的 tile 值
console.log('\n=== 开场 tile 流中的 tile 索引（去重）===');
const tileStream = [0x00, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x00, 0x00, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x00, 0x00, 0x00, 0x10, 0x11, 0x12, 0x13, 0x00, 0x00, 0x00, 0x00, 0x00, 0x14, 0x15, 0x00, 0x00, 0x00, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x00, 0x00, 0x1E, 0x1F, 0x20, 0x21, 0x00, 0x00, 0x00, 0xA0];
const unique = [...new Set(tileStream)].sort((a,b)=>a-b);
console.log('tiles:', unique.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// 验证这些 tile 的 PT 数据在 bank08 中的位置
console.log('\n=== 验证 tile PT 数据 ===');
for (const tile of unique) {
  if (tile === 0xA0) continue;
  const offset = tile * 17;
  if (offset + 17 <= b08.length) {
    const pt = b08.slice(offset, offset+17);
    console.log(`tile 0x${tile.toString(16).padStart(2,'0').toUpperCase()}: ${pt.map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ')}`);
  } else {
    console.log(`tile 0x${tile.toString(16).padStart(2,'0').toUpperCase()}: OUT OF RANGE (offset ${offset})`);
  }
}
