/**
 * 定位 CHR 配置 0x17（$A373）及其 tile 指令流
 * bank07 .org $8000，$A373 偏移 = $A373-$8000 = $2373
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

const b07 = extractBytes(asmRoot + '/bank07/data_tables.s');
const b07b = extractBytes(asmRoot + '/bank07/data_maps.s');
const b07c = extractBytes(asmRoot + '/bank07/data_tail.s');
const full = [...b07, ...b07b, ...b07c];
console.log('bank07 total:', full.length, 'bytes');
console.log('bank07 parts:', b07.length, b07b.length, b07c.length);

// $A000 = bank07 $8000 起始
// CHR 指针表在 $A000（偏移 0）
console.log('\n=== CHR 指针表 ($A000) ===');
for (let i = 0; i < 32; i++) {
  const lo = full[i*2];
  const hi = full[i*2+1];
  const addr = (hi << 8) | lo;
  console.log(`  [${i.toString(16).padStart(2,'0')}] $${addr.toString(16).toUpperCase()} (offset ${addr-0xA000})`);
}

// 配置 0x17 = 第 24 项，地址 $A373，偏移 $373
const cfg17Offset = 0x373;
console.log('\n=== CHR 配置 0x17 ($A373, offset 0x373) ===');
console.log('  6 bytes:', full.slice(cfg17Offset, cfg17Offset+6).map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
const cfg = full.slice(cfg17Offset, cfg17Offset+6);
console.log('  [0,1]=param:', '0x'+cfg[0].toString(16), '0x'+cfg[1].toString(16));
console.log('  [2]=bgPal+flag:', '0x'+cfg[2].toString(16), '→ bgPal='+(cfg[2]&0x3f)+' flip='+((cfg[2]>>6)&1));
console.log('  [3,4]=宽,高:', cfg[3], cfg[4]);
console.log('  [5]=NT基址编码:', '0x'+cfg[5].toString(16));

// tile 指令流从 cfg17Offset+6 开始
console.log('\n=== Tile 指令流（配置 0x17 之后）===');
const streamStart = cfg17Offset + 6;
console.log('  stream offset:', streamStart, '(0x'+streamStart.toString(16)+')');
console.log('  stream first 50:', full.slice(streamStart, streamStart+50).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// 验证 TS 的 OPENING_CHR_CONFIGS[0x17]
console.log('\n=== TS OPENING_CHR_CONFIGS[0x17] ===');
console.log('  TS: [0x7c, 0x7e, 0x81, 0x06, 0x08, 0x08]');
console.log('  asm:', cfg.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(', '));

// 场景 3 的数据在哪里？
// $8920 场景装载：$00EC = $BF00 + 场景号*19
// bank06 场景表 $BF00
const b06 = extractBytes(asmRoot + '/bank06/data_tables.s');
console.log('\n=== bank06 场景表 ===');
console.log('bank06 total:', b06.length, 'bytes');
// $BF00 = bank06 $8000 + $3F00
// 但 bank06 data_tables 可能不是从 $8000 开始
// 先看前 100 字节
console.log('bank06 first 100:', b06.slice(0, 100).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
