// Convert GBK HTML docs to UTF-8, then extract Japanese strings and search ROM
import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';

const DOCS_DIR = 'src/langrisser2/docs';
const ROM_PATH = 'src/langrisser2/20260713/Langrisser II (Japan).md';
const OUTPUT_DIR = 'src/langrisser2/20260713/output';

const rom = fs.readFileSync(ROM_PATH);

// Step 1: Convert all GBK HTML to UTF-8
const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.html') || f.endsWith('.htm'));
console.log(`Found ${files.length} HTML files`);

let allJapanese = new Set(); // collect all unique Japanese strings

for (const f of files) {
  const filePath = path.join(DOCS_DIR, f);
  const raw = fs.readFileSync(filePath);
  
  // Detect if it's GBK
  const head = raw.slice(0, 500).toString('binary');
  const isGBK = head.includes('charset=GBK') || head.includes('charset=gbk') || head.includes('charset=gb2312');
  
  if (isGBK) {
    // Convert GBK -> UTF-8
    const utf8Content = iconv.decode(raw, 'gbk');
    const outPath = path.join(DOCS_DIR, f);
    fs.writeFileSync(outPath, utf8Content, 'utf8');
    console.log(`  Converted: ${f} (GBK -> UTF-8)`);
    
    // Extract Japanese characters from content (katakana, hiragana, kanji ranges)
    // Katakana: U+30A0-U+30FF, Hiragana: U+3040-U+309F, CJK Unified: U+4E00-U+9FFF
    // Also common full-width punct
    const jpRanges = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u3000-\u303F]+/g;
    let match;
    while ((match = jpRanges.exec(utf8Content)) !== null) {
      if (match[0].length >= 2) { // at least 2 chars
        allJapanese.add(match[0]);
      }
    }
  } else {
    console.log(`  Skipped: ${f} (not GBK)`);
  }
}

// Also add known character names from the docs
const knownNames = [
  'エルウィン', 'ヘル', 'レディン', 'リアナ', 'ラーナ', 'シェルファニール',
  'ジェシカ', 'レオン', 'ベルンハルト', 'イメルダ', 'エグベルト',
  'バルガス', 'キース', 'レスター', 'スコット', 'アーロン', 'ロウガ',
  'ソニア', 'オスト', 'ファイター', 'クレリック', 'ウォーロック',
  'グラディエーター', 'ソードマスター', 'ナイト', 'ロード', 'ハイロード',
  'セイント', 'プリースト', 'ハイプリースト', 'マジックナイト',
  'メイジ', 'アークメイジ', 'シーフ', 'アサシン', 'バーサーカー',
  'ランサー', 'ドラゴンナイト', 'ドラゴンロード', 'ドラゴンマスター',
  'ネクロマンサー', 'サモナー', 'ヴァンパイア',
  'なまえ', 'スタート', 'ロード', 'コンティニュー',
];
for (const name of knownNames) {
  allJapanese.add(name);
}

console.log(`\nExtracted ${allJapanese.size} unique Japanese strings`);

// Step 2: Search ROM for these Japanese strings
// MD ROMs typically use Shift-JIS encoding
// But many MD games use custom encoding or just ASCII with katakana in custom mapping
// Let's try Shift-JIS first, then also try raw byte search

console.log('\n=== Searching ROM for Japanese strings ===');

// Convert strings to Shift-JIS bytes
const searchStrings = Array.from(allJapanese).sort((a, b) => b.length - a.length); // longest first

let found = 0;
const romBuffer = Buffer.from(rom);

for (const str of searchStrings) {
  if (str.length < 2) continue;
  
  // Try Shift-JIS encoding
  try {
    const sjisBytes = iconv.encode(str, 'shift_jis');
    // Search for this byte sequence in ROM
    let pos = -1;
    let occurrences = 0;
    while ((pos = romBuffer.indexOf(sjisBytes, pos + 1)) !== -1 && occurrences < 3) {
      const romOffset = pos;
      const context = romBuffer.slice(Math.max(0, pos - 4), pos + sjisBytes.length + 20);
      const hexStr = Array.from(context).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
      const asciiStr = Array.from(context).map(b => b >= 0x20 && b < 0x7F ? String.fromCharCode(b) : '.').join('');
      console.log(`  "${str}" @ ROM $${romOffset.toString(16).padStart(6, '0')}: ${hexStr} | ${asciiStr}`);
      found++;
      occurrences++;
    }
  } catch (e) {
    // SKIP encodable chars
  }
}

if (found === 0) {
  console.log('  No Shift-JIS strings found in ROM.\n');
  
  // Fallback: search for common patterns - maybe the game uses ASCII-based katakana
  // or custom encoding
  console.log('=== Trying ASCII/raw search for character names (as ROM ASCII bytes) ===');
  // Some MD games store Japanese as raw ASCII (e.g., "Elwin") and use sprite fonts
  for (const str of searchStrings) {
    if (str.length < 3) continue;
    // Try as raw bytes
    const buf = Buffer.from(str, 'utf8');
    let pos = romBuffer.indexOf(buf);
    if (pos >= 0) {
      console.log(`  "${str}" as raw UTF-8 @ ROM $${pos.toString(16).padStart(6, '0')}`);
      found++;
    }
  }
}

console.log(`\nTotal matches: ${found}`);
console.log('\nDone! All HTML files converted to UTF-8.');
console.log(`Japanese strings saved for reference.`);
