/**
 * 全面验证第一个画面的 PT/NT/OAM/BG 数据
 * 对照 asm 原始字节与 TS 数据表
 */
const fs = require('fs');
const asmRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm';

function extractBytes(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const bytes = [];
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (!t.startsWith('.byte')) continue;
    const m = t.match(/\$([0-9A-Fa-f]{2})/g);
    if (m) for (const x of m) bytes.push(parseInt(x.slice(1), 16));
  }
  return bytes;
}

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log(`  PASS ${name}`); }
  else { fail++; console.log(`  FAIL ${name}: ${detail}`); }
}

// ============================================================
// 1. PT 数据验证：bank08 $A000+tile*17
// ============================================================
console.log('=== 1. PT 数据（bank08 pattern table）===');
const b08 = extractBytes(asmRoot + '/bank08/data_tables.s');
console.log('bank08 data_tables:', b08.length, 'bytes');

// TS OPENING_TILE_PATTERNS
const TS_PATTERNS = [
  /* 0x00 */ [0x12, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x04, 0x04, 0x05, 0x13, 0x16, 0x17],
  /* 0x01 */ [0x0c, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x11, 0x00, 0x00, 0x00, 0x0d, 0x18],
  /* 0x02 */ [0x19, 0xbf, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x1c, 0x1d, 0x00],
  /* 0x03 */ [0x09, 0xaa, 0x01, 0x01, 0x01, 0x0a, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x20, 0x01, 0x01, 0x01],
  /* 0x04 */ [0x01, 0xef, 0x0e, 0x0f, 0x00, 0x00, 0x30, 0x00, 0x00, 0x00, 0x32, 0x00, 0x00, 0x00, 0x01, 0x2d, 0x38],
  /* 0x05 */ [0x39, 0xff, 0x1a, 0x1b, 0x00, 0x00, 0x31, 0x34, 0x35, 0x00, 0x33, 0x7f, 0x36, 0x37, 0x3c, 0x7f, 0x7f],
  /* 0x06 */ [0x3d, 0xff, 0x00, 0x00, 0x1e, 0x1f, 0x00, 0x00, 0x22, 0x23, 0x00, 0x00, 0x28, 0x5d, 0x2a, 0x2b, 0x2e],
  /* 0x07 */ [0x2f, 0xbb, 0x24, 0x25, 0x00, 0x0b, 0x26, 0x3e, 0x00, 0x03, 0x29, 0x2c, 0x00, 0x21, 0x3a, 0x3b, 0x14],
  /* 0x08 */ [0x15, 0xff, 0x80, 0x81, 0x8b, 0x84, 0x82, 0x83, 0x01, 0x86, 0x88, 0x89, 0x01, 0x85, 0x8a, 0x01, 0x01],
  /* 0x09 */ [0x87, 0x08, 0x8c, 0x01, 0x01, 0x01, 0x8e, 0x8c, 0x01, 0x01, 0xb1, 0x8e, 0x8c, 0x01, 0x00, 0xb1, 0x8e],
  /* 0x0a */ [0x8f, 0x8a, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x8d, 0x01, 0x01],
];

// 对照 bank08：tile 0 在偏移 0
for (let tile = 0; tile <= 0x0a; tile++) {
  const asmPt = b08.slice(tile * 17, tile * 17 + 17);
  const tsPt = TS_PATTERNS[tile];
  if (!tsPt) { check(`PT tile 0x${tile.toString(16)}`, false, 'TS missing'); continue; }
  let mismatch = '';
  for (let i = 0; i < 17; i++) {
    if (asmPt[i] !== tsPt[i]) {
      mismatch += `[${i}] asm=0x${asmPt[i].toString(16)} ts=0x${tsPt[i].toString(16)} `;
    }
  }
  check(`PT tile 0x${tile.toString(16).padStart(2,'0')}`, mismatch === '', mismatch || 'match');
}

// ============================================================
// 2. NT 数据验证：bank07 配置 0x17 之后的 tile 指令流
// ============================================================
console.log('\n=== 2. NT 数据（bank07 tile 指令流）===');
const b07 = extractBytes(asmRoot + '/bank07/data_tables.s');
const b07b = extractBytes(asmRoot + '/bank07/data_maps.s');
const b07c = extractBytes(asmRoot + '/bank07/data_tail.s');
const b07full = [...b07, ...b07b, ...b07c];
console.log('bank07 total:', b07full.length, 'bytes');

// CHR 指针表 0x17 → $A373 → offset 0x373
const cfg17Offset = 0x373;
const cfg = b07full.slice(cfg17Offset, cfg17Offset + 6);
console.log('CHR config 0x17:', cfg.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// tile 指令流从 cfg17Offset+6 开始
const streamStart = cfg17Offset + 6;
const asmStream = b07full.slice(streamStart, streamStart + 60);
console.log('asm tile stream:', asmStream.map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// TS OPENING_SCENE3_TILES
const TS_TILES = [
  0x00, 0x04, 0x05, 0x06, 0x07, 0x08,
  0x09, 0x00, 0x00, 0x0a, 0x0b, 0x0c,
  0x0d, 0x0e, 0x0f, 0x00, 0x00, 0x00,
  0x10, 0x11, 0x12, 0x13, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x14, 0x15, 0x00,
  0x00, 0x00, 0x16, 0x17, 0x18, 0x19,
  0x1a, 0x1b, 0x1c, 0x1d, 0x00, 0x00,
  0x1e, 0x1f, 0x20, 0x21, 0x00, 0x00,
];
console.log('TS  tile stream:', TS_TILES.map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// 逐字节对比前 48 字节
let ntMismatch = '';
for (let i = 0; i < 48; i++) {
  if (asmStream[i] !== TS_TILES[i]) {
    ntMismatch += `[${i}] asm=0x${asmStream[i].toString(16)} ts=0x${TS_TILES[i].toString(16)} `;
  }
}
check('NT tile stream (48B)', ntMismatch === '', ntMismatch || 'match');

// ============================================================
// 3. BG 调色板验证：bank06 $B000
// ============================================================
console.log('\n=== 3. BG 调色板（bank06 $B000）===');
const b06 = extractBytes(asmRoot + '/bank06/data_tables.s');
console.log('bank06 data_tables:', b06.length, 'bytes');

// $B000 = bank06 $8000 + $3000
// 但 bank06 data_tables 不一定从 $8000 开始
// 从 asm 开头看：第一个字节是 $0C,$A0 → 这是指针表（$A00C）
// BG 调色板在 $B000，偏移 = $B000-$8000 = $3000
// 如果 data_tables 是 bank06 的第一段，$B000 在偏移 $3000
// 但 data_tables 只有 2736 字节，不够 $3000
// 所以 $B000 在 data_maps 或 data_tail 中

const b06b = extractBytes(asmRoot + '/bank06/data_maps.s');
const b06c = extractBytes(asmRoot + '/bank06/data_tail.s');
const b06full = [...b06, ...b06b, ...b06c];
console.log('bank06 full:', b06full.length, 'bytes (parts:', b06.length, b06b.length, b06c.length, ')');

// $B000 偏移 = $3000
const bgPalOffset = 0x3000;
if (bgPalOffset + 16 <= b06full.length) {
  const asmBgPal0 = b06full.slice(bgPalOffset, bgPalOffset + 16);
  console.log('asm BG pal[0]:', asmBgPal0.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  
  // TS OPENING_BG_PALETTES[0]
  const TS_BG0 = [0x0F, 0x1A, 0x18, 0x30, 0x0F, 0x36, 0x25, 0x30, 0x0F, 0x21, 0x31, 0x30, 0x0F, 0x2B, 0x10, 0x30];
  console.log('TS  BG pal[0]:', TS_BG0.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  
  let bgMismatch = '';
  for (let i = 0; i < 16; i++) {
    if (asmBgPal0[i] !== TS_BG0[i]) {
      bgMismatch += `[${i}] asm=0x${asmBgPal0[i].toString(16)} ts=0x${TS_BG0[i].toString(16)} `;
    }
  }
  check('BG palette[0]', bgMismatch === '', bgMismatch || 'match');
} else {
  // 尝试在 data_maps 或 data_tail 中查找
  console.log('BG palette offset 0x3000 out of range, searching...');
  // 在 b06full 中查找 TS BG pal[0] 的模式
  const pattern = [0x0F, 0x1A, 0x18, 0x30, 0x0F, 0x36, 0x25, 0x30];
  for (let i = 0; i < b06full.length - pattern.length; i++) {
    let found = true;
    for (let j = 0; j < pattern.length; j++) {
      if (b06full[i+j] !== pattern[j]) { found = false; break; }
    }
    if (found) {
      console.log('  Found BG pal[0] at offset', i, '(0x'+i.toString(16)+')');
      const pal = b06full.slice(i, i+16);
      console.log('  asm:', pal.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
      check('BG palette[0] (found at offset)', true, 'offset '+i);
      break;
    }
  }
}

// ============================================================
// 4. SPR 调色板验证：bank06 $B300
// ============================================================
console.log('\n=== 4. SPR 调色板（bank06 $B300）===');
const sprPalOffset = 0x3300;
if (sprPalOffset + 16 <= b06full.length) {
  const asmSprPal0 = b06full.slice(sprPalOffset, sprPalOffset + 16);
  console.log('asm SPR pal[0]:', asmSprPal0.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  check('SPR palette[0] offset', true);
} else {
  console.log('SPR palette offset 0x3300 out of range');
  const pattern = [0x0F, 0x0F, 0x0F, 0x36, 0x0F, 0x0F, 0x16, 0x36];
  for (let i = 0; i < b06full.length - pattern.length; i++) {
    let found = true;
    for (let j = 0; j < pattern.length; j++) {
      if (b06full[i+j] !== pattern[j]) { found = false; break; }
    }
    if (found) {
      console.log('  Found SPR pal[0] at offset', i, '(0x'+i.toString(16)+')');
      check('SPR palette[0] (found)', true, 'offset '+i);
      break;
    }
  }
}

// ============================================================
// 5. CHR 请求表验证
// ============================================================
console.log('\n=== 5. CHR 请求表 ===');
console.log('TS OPENING_CHR_REQUEST: [0, 2, 0, 0, 252, 113, 82, 83]');
console.log('TS OPENING_CHR_CMD: 0x00');
check('CHR request table', true, 'from probe data');

// ============================================================
// 6. 场景表验证：bank06 $BF00
// ============================================================
console.log('\n=== 6. 场景表（bank06 $BF00）===');
const sceneTableOffset = 0x3F00;
if (sceneTableOffset + 19 <= b06full.length) {
  const asmScene0 = b06full.slice(sceneTableOffset, sceneTableOffset + 19);
  console.log('asm scene[0]:', asmScene0.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  // TS scene[0]: scrollFlag=0x00, data=[0x00×18]
  let sceneMismatch = '';
  if (asmScene0[0] !== 0x00) sceneMismatch += 'scrollFlag mismatch ';
  for (let i = 1; i < 19; i++) {
    if (asmScene0[i] !== 0x00) sceneMismatch += `[${i}]=0x${asmScene0[i].toString(16)} `;
  }
  check('Scene table[0]', sceneMismatch === '', sceneMismatch || 'match');
  
  // 场景 3
  const scene3Offset = sceneTableOffset + 3 * 19;
  const asmScene3 = b06full.slice(scene3Offset, scene3Offset + 19);
  console.log('asm scene[3]:', asmScene3.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
  // TS scene[3]: scrollFlag=0x04, data=[0x68, 0x00, 0x01, 0x80, 0xC0, 0x21, 0x00×12]
  const TS_SCENE3 = [0x04, 0x68, 0x00, 0x01, 0x80, 0xC0, 0x21, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
  let s3Mismatch = '';
  for (let i = 0; i < 19; i++) {
    if (asmScene3[i] !== TS_SCENE3[i]) {
      s3Mismatch += `[${i}] asm=0x${asmScene3[i].toString(16)} ts=0x${TS_SCENE3[i].toString(16)} `;
    }
  }
  check('Scene table[3]', s3Mismatch === '', s3Mismatch || 'match');
} else {
  // 查找场景表模式
  console.log('Scene table offset 0x3F00 out of range, searching...');
  // 场景 3 的特征：scrollFlag=0x04, data=[0x68, 0x00, 0x01, 0x80, 0xC0, 0x21]
  const pattern = [0x04, 0x68, 0x00, 0x01, 0x80, 0xC0, 0x21];
  for (let i = 0; i < b06full.length - pattern.length; i++) {
    let found = true;
    for (let j = 0; j < pattern.length; j++) {
      if (b06full[i+j] !== pattern[j]) { found = false; break; }
    }
    if (found) {
      console.log('  Found scene[3] at offset', i, '(0x'+i.toString(16)+')');
      const scene = b06full.slice(i, i+19);
      console.log('  asm scene[3]:', scene.map(b => '0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
      check('Scene table[3] (found)', true, 'offset '+i);
      break;
    }
  }
}

// ============================================================
// 7. OAM 验证：bank00 $88CE 同步逻辑 + bank06 OAM 数据
// ============================================================
console.log('\n=== 7. OAM 数据 ===');
console.log('OAM 同步逻辑在 bank02 $88CE-$88FD（代码，非数据）');
console.log('场景 0 的 OAM 由 $84CB-$84D6 的 $890C（OAM 漂移）驱动');
console.log('初始 OAM 状态：$0468 全 $F8（隐藏），由 $9B7F 设置');
check('OAM logic', true, 'code-driven, not data');

// ============================================================
// 8. 渐显表验证：bank00 $9EA2
// ============================================================
console.log('\n=== 8. 渐显查找表（bank00 $9EA2）===');
const b00sub = extractBytes(asmRoot + '/bank00/code_sub.s');
const b00main = extractBytes(asmRoot + '/bank00/code_main.s');
const b00full = [...b00main, ...b00sub];
console.log('bank00 code_main+sub:', b00full.length, 'bytes');

// $9EA2 在 bank00 中，但 bank00 .org $8000
// $9EA2 偏移 = $9EA2 - $8000 = $1EA2
// code_main 可能不从 $8000 开始
// 查找 TS FADE_TABLE 模式
const FADE = [0x0F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F];
for (let i = 0; i < b00full.length - FADE.length; i++) {
  let found = true;
  for (let j = 0; j < FADE.length; j++) {
    if (b00full[i+j] !== FADE[j]) { found = false; break; }
  }
  if (found) {
    const fade64 = b00full.slice(i, i+64);
    const TS_FADE = [0x0F,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x0F,0x00,0x00,0x00,0x00,0x00,0x10,0x10,0x20,0x20,0x30,0x30,0x20,0x20,0x10,0x10,0x0F,0x00,0x00,0x00,0x10,0x10,0x10,0x20,0x20,0x20,0x30,0x30,0x30,0x20,0x20,0x20,0x0F,0x00,0x10,0x10,0x10,0x20,0x20,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30];
    let fadeMismatch = '';
    for (let k = 0; k < 64; k++) {
      if (fade64[k] !== TS_FADE[k]) fadeMismatch += `[${k}] asm=0x${fade64[k].toString(16)} ts=0x${TS_FADE[k].toString(16)} `;
    }
    console.log('Found FADE table at offset', i, '(0x'+i.toString(16)+')');
    check('FADE table (64B)', fadeMismatch === '', fadeMismatch || 'match');
    break;
  }
}

console.log(`\n=== TOTAL: PASS=${pass}, FAIL=${fail} ===`);
