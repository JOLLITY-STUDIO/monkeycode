import fs from 'fs';

const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const outFile = 'src/langrisser2/20260713/output/rom-strings.txt';

// === ASCII detection ===
function isAscii(b) { return b >= 0x20 && b <= 0x7E; }
// === Shift-JIS lead byte ===
function isSjisLead(b) { return (b >= 0x81 && b <= 0x9F) || (b >= 0xE0 && b <= 0xEF); }
function isSjisTrail(b) { return (b >= 0x40 && b <= 0x7E) || (b >= 0x80 && b <= 0xFC); }

// Detect string type and extract
// Strategy: scan for ASCII sequences >= 3 chars and Shift-JIS sequences >= 2 chars
const strings = [];

let i = 0;
while (i < rom.length) {
  // Check for ASCII sequence
  if (isAscii(rom[i])) {
    let end = i;
    while (end < rom.length && isAscii(rom[end])) end++;
    const len = end - i;
    if (len >= 3) {
      const s = Array.from(rom.subarray(i, end))
        .map(b => String.fromCharCode(b)).join('');
      strings.push({
        type: 'ASCII',
        offset: i,
        len,
        text: s,
      });
    }
    i = end;
    continue;
  }
  
  // Check for Shift-JIS sequence
  if (isSjisLead(rom[i]) && i + 1 < rom.length && isSjisTrail(rom[i + 1])) {
    let j = i;
    while (j < rom.length && isSjisLead(rom[j]) && j + 1 < rom.length && isSjisTrail(rom[j + 1])) {
      j += 2;
    }
    const len = j - i;
    if (len >= 4) { // at least 2 chars = 4 bytes
      // Decode Shift-JIS
      let s = '';
      let valid = true;
      for (let k = i; k < j; k += 2) {
        const hi = rom[k];
        const lo = rom[k + 1];
        if (!isSjisLead(hi) || !isSjisTrail(lo)) { valid = false; break; }
        // Convert to JIS code
        let row, cell;
        if (hi >= 0x81 && hi <= 0x9F) {
          row = (hi - 0x81) * 2;
        } else {
          row = (hi - 0xE0) * 2 + 62;
        }
        if (lo >= 0x80) {
          row++;
          cell = lo - 0x80;
        } else {
          cell = lo - 0x40;
        }
        // Convert JIS to Unicode (basic shift-jis to unicode mapping)
        const jis = (row << 8) | cell;
        // Simple mapping for common Japanese chars
        let c = '□'; // placeholder
        if (jis >= 0x2330 && jis <= 0x237A) c = String.fromCodePoint(0xFF61 + (jis - 0x2330)); // halfwidth katakana-like
        else if (jis >= 0x2421 && jis <= 0x2473) c = String.fromCodePoint(0x3041 + (jis - 0x2421)); // hiragana rough
        else if (jis >= 0x2521 && jis <= 0x2576) c = String.fromCodePoint(0x30A1 + (jis - 0x2521)); // katakana rough
        else if (jis >= 0x3021 && jis <= 0x4F53) {
          // Kanji - just show hex for now
          c = `<${hi.toString(16)}${lo.toString(16)}>`;
        } else {
          c = `<${hi.toString(16)}${lo.toString(16)}>`;
        }
        s += c;
      }
      strings.push({
        type: 'SJIS',
        offset: i,
        len,
        text: s,
        hex: Array.from(rom.subarray(i, j)).map(b => b.toString(16).padStart(2,'0')).join(' '),
      });
    }
    i = j;
    continue;
  }
  
  i++;
}

// Also detect strings terminated by $00 (null-terminated)
console.log('=== Null-terminated ASCII strings ===');
let nullStrings = [];
for (let i = 0; i < rom.length; i++) {
  if (isAscii(rom[i]) && (i === 0 || !isAscii(rom[i - 1]))) {
    let end = i;
    while (end < rom.length && rom[end] !== 0 && isAscii(rom[end])) end++;
    const len = end - i;
    if (len >= 4 && end < rom.length && rom[end] === 0) {
      const s = String.fromCharCode(...Array.from(rom.subarray(i, end)));
      nullStrings.push({ offset: i, text: s });
    }
    i = end;
  }
}
console.log(`Found ${nullStrings.length} null-terminated ASCII strings (>=4 chars)`);

// Generate output
const lines = [];
lines.push('=== All strings found in ROM ===');
lines.push(`ROM size: ${rom.length} bytes (${(rom.length / 1024 / 1024).toFixed(2)} MB)`);
lines.push(`Total strings found: ${strings.length}`);
lines.push('');

// Group by type
for (const type of ['ASCII', 'SJIS']) {
  const ofType = strings.filter(s => s.type === type);
  lines.push(`\n=== ${type} strings (${ofType.length} found) ===`);
  
  // Sort by offset
  ofType.sort((a, b) => a.offset - b.offset);
  
  for (const s of ofType) {
    if (s.type === 'ASCII') {
      lines.push(`  ROM $${s.offset.toString(16).padStart(6, '0')} (len=${s.len}): "${s.text}"`);
    } else {
      lines.push(`  ROM $${s.offset.toString(16).padStart(6, '0')} (len=${s.len}): "${s.text}"  [${s.hex}]`);
    }
  }
}

// Also dump null-terminated strings that aren't in the main list
lines.push(`\n=== NULL-terminated ASCII strings (not in above) ===`);
const mainOffsets = new Set(strings.map(s => s.offset));
const extra = nullStrings.filter(ns => !mainOffsets.has(ns.offset));
extra.sort((a, b) => a.offset - b.offset);
for (const s of extra.slice(0, 100)) {
  lines.push(`  ROM $${s.offset.toString(16).padStart(6, '0')}: "${s.text}"`);
}
if (extra.length > 100) lines.push(`  ... and ${extra.length - 100} more`);

fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
console.log(`\nOutput written to: ${outFile}`);
console.log(`ASCII: ${strings.filter(s=>s.type==='ASCII').length}, SJIS: ${strings.filter(s=>s.type==='SJIS').length}`);
