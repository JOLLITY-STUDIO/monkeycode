const fs = require('fs');
const path = require('path');

// Read the bank02-tables.ts data module
const dataSrc = fs.readFileSync(
  path.join(__dirname, 'src/game/data/prg/bank02-tables.ts'),
  'utf8'
);

// Extract a named array from the data module source
function extractArray(src, name) {
  const re = new RegExp('export const ' + name + '.*?\\[\\s*([\\s\\S]*?)\\];');
  const m = src.match(re);
  if (!m) return null;
  return m[1].split(',').map((s) => parseInt(s.trim(), 16)).filter((v) => !isNaN(v));
}

// Read ASM data_tables.s, collect all .byte hex sequences into one big byte array
function readAsmBytes(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const bytes = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('.byte')) continue;
    const body = t.slice('.byte'.length);
    // match 0xNN / $NN tokens
    const m = body.match(/[$]?[0-9A-Fa-f]{2}/g);
    if (m) for (const tok of m) bytes.push(parseInt(tok.replace('$', ''), 16));
  }
  return bytes;
}

const asmBytes = readAsmBytes(path.join(__dirname, 'asm/bank02/data_tables.s'));
let report = 'ASM data_tables.s byte count: ' + asmBytes.length + '\n\n';

// Define expected sequences from ASM with known offsets.
// SCROLL_DX/DY start at the ".byte $10,$00,$10..." after SCENE_SCRIPT ($AADF).
// FIELD_TILES at $AA47, FIELD_KIND after, SCENE_SCRIPT after FIELD_KIND, PW_OAM_FIX after scroll.
// We'll locate by searching the whole asm byte stream.

function findSub(needle, from) {
  for (let i = from; i + needle.length <= asmBytes.length; i++) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) if (asmBytes[i + j] !== needle[j]) { ok = false; break; }
    if (ok) return i;
  }
  return -1;
}

const tables = ['SCROLL_DX', 'SCROLL_DY', 'PW_OAM_FIX', 'FIELD_TILES', 'FIELD_KIND', 'SCENE_SCRIPT', 'SPRITE_UPLOAD', 'SPRITE_UPLOAD2', 'TINY_TABLE'];
let searchFrom = 0;
let pass = 0, fail = 0;

for (const name of tables) {
  const tsArr = extractArray(dataSrc, name);
  if (!tsArr) { report += name + ': NOT FOUND in data module\n'; fail++; continue; }
  const idx = findSub(tsArr, 0);
  report += name + ' (len=' + tsArr.length + '): ';
  if (idx >= 0) {
    report += 'FOUND in ASM at byte offset ' + idx + '\n';
    pass++;
  } else {
    report += 'NOT FOUND as contiguous ASM sequence!\n';
    fail++;
  }
}

report += '\nRESULT: pass=' + pass + ' fail=' + fail + '\n';
fs.writeFileSync(path.join(__dirname, '_verify_b02_tables.txt'), report, 'utf8');
