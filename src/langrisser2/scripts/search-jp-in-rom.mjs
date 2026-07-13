import fs from 'fs';
import iconv from 'iconv-lite';

const ROM_PATH = 'src/langrisser2/20260713/Langrisser II (Japan).md';
const rom = fs.readFileSync(ROM_PATH);

const searchStrings = [
  // 名称输入画面相关
  '名前を決めて下さい',
  'エルウィン',
  'エルウィン ',
  '名前を決め',
  '名前を',
  'なまえ',
  // 假名输入面板行
  'アイウエオ',
  'カキクケコ',
  'サシスセソ',
  'タチツテト',
  'ナニヌネノ',
  'ハヒフヘホ',
  'マミムメモ',
  'ヤユヨ',
  'ラリルレロ',
  'ワヲン',
  'ヴァィゥェォ',
  'ガギグゲゴ',
  'ザジズゼゾ',
  'ダヂヅデド',
  'バビブベボ',
  'パピプペポ',
  'スム', 'モル', 'モドル', 'ススム', '終了', 'けってい',
  // 常见操作
  'END',
  'ＥＮＤ',
  'けってい',
  '決定',
  'もどる',
  '戻る',
  '消す',
  'けす',
  'スペース',
];

console.log('=== Search ROM for Japanese name input strings (Shift-JIS) ===\n');
let total = 0;
for (const str of searchStrings) {
  let bytes;
  try {
    bytes = iconv.encode(str, 'shift_jis');
  } catch (e) {
    continue;
  }
  
  let pos = -1;
  let count = 0;
  while ((pos = rom.indexOf(bytes, pos + 1)) !== -1 && count < 3) {
    const context = rom.slice(Math.max(0, pos - 8), pos + bytes.length + 16);
    const hex = Array.from(context).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    const ascii = Array.from(context).map(b => b >= 0x20 && b < 0x7F ? String.fromCharCode(b) : '.').join('');
    console.log(`  "${str}" @ ROM $${pos.toString(16).padStart(6, '0')}  (${hex})`);
    console.log(`    ASCII context: ${ascii}`);
    count++;
    total++;
  }
}

console.log(`\nTotal matches: ${total}`);
