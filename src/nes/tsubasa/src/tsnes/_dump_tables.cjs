const fs = require('fs');

function load(path) {
  const map = new Map();
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^- D .* 0x[0-9A-F]{6} \d\d:([0-9A-F]{4}): ([0-9A-F]{2})(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?(?: ([0-9A-F]{2}))?/);
    if (m) {
      const addr = parseInt(m[1], 16);
      for (let i = 0; i < 8; i++) {
        const b = m[2 + i];
        if (b) map.set(addr + i, parseInt(b, 16));
      }
    }
  }
  return map;
}

let out = '';
function dump(map, label, start, end) {
  const bytes = [];
  for (let a = start; a <= end; a++) {
    const v = map.get(a);
    bytes.push(v === undefined ? 0xFF : v);
  }
  out += `\n/* ${label} $${start.toString(16).toUpperCase()}-$${end.toString(16).toUpperCase()} (${bytes.length} B) */\n`;
  let line = '';
  for (let i = 0; i < bytes.length; i++) {
    line += '0x' + bytes[i].toString(16).padStart(2, '0') + ', ';
    if ((i + 1) % 16 === 0) { out += '  ' + line.trimEnd() + '\n'; line = ''; }
  }
  if (line) out += '  ' + line.trimEnd() + '\n';
}

const b11 = load('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_11.asm');
out += '===== BANK 11 =====\n';
dump(b11, 'B11_MENU_ITEM_TABLE', 0x81D5, 0x8222);
dump(b11, 'B11_FIELD_TABLE', 0x827F, 0x82F6);
dump(b11, 'B11_TILE_TABLE', 0x86EE, 0x871D);
dump(b11, 'B11_MENU_SUB_PTR_TABLE', 0x87F6, 0x8829);
dump(b11, 'B11_PALETTE_TABLE', 0x8B42, 0x8B62);

const b16 = load('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_16.asm');
out += '\n===== BANK 16 =====\n';
dump(b16, 'B16_T8291', 0x8291, 0x8296);
dump(b16, 'B16_T8308', 0x8308, 0x832C);
dump(b16, 'B16_T83AF', 0x83AF, 0x83B3);
dump(b16, 'B16_T83BB', 0x83BB, 0x83C1);
dump(b16, 'B16_T857A', 0x857A, 0x857F);
dump(b16, 'B16_T8622', 0x8622, 0x8626);
dump(b16, 'B16_T8635', 0x8635, 0x863A);
dump(b16, 'B16_T8645', 0x8645, 0x864A);
dump(b16, 'B16_T86A6_86A7', 0x86A6, 0x86B5);
dump(b16, 'B16_T86C8', 0x86C8, 0x86CC);
dump(b16, 'B16_T86E3', 0x86E3, 0x86F4);
dump(b16, 'B16_T86F4', 0x86F4, 0x876A);
dump(b16, 'B16_T876A', 0x876A, 0x87E0);
dump(b16, 'B16_SKILL_PTR_TABLE', 0x89BF, 0x8BFF);

fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tables_dump.txt', out, 'utf8');
console.log('written', out.length, 'chars');
