const fs = require('fs');

const src = fs.readFileSync('src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts','utf8');

const rom = fs.readFileSync('rom.nes');
const expected = Array.from(rom.slice(16, 16 + 8192));

const funcs = ['buildjumpVectors','buildsceneEntry0','buildsceneEntry1','buildsceneEntry2','buildsceneEntry3','buildsceneEntry4',
  'builddispatch','buildsceneLoop','buildscriptEngine','builddataTables','buildsceneTables',
  'buildbytecodeHandlers','buildscheduler','buildcontextSave','buildpadding'];

function getFuncByteRange(fname) {
  const search = 'function ' + fname + '(';
  let idx = src.indexOf(search);
  if (idx === -1) return null;
  let braceIdx = src.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = src.slice(braceIdx + 1, endIdx);
  const byteMatches = body.match(/0x([0-9a-fA-F]{2})/g) || [];
  const bytes = byteMatches.map(m => parseInt(m.slice(2), 16));
  const startLine = src.slice(0, idx).split('\n').length;
  return { fname, bytes, startLine, endLine: src.slice(0, endIdx).split('\n').length };
}

const addrMap = {};

for (const fname of funcs) {
  const info = getFuncByteRange(fname);
  if (!info || info.bytes.length < 4) continue;
  
  // Find the start of this byte sequence in ROM
  const search = info.bytes.slice(0, 8);
  let found = false;
  for (let i = 0; i < expected.length - search.length; i++) {
    let match = true;
    for (let j = 0; j < search.length; j++) {
      if (expected[i + j] !== search[j]) { match = false; break; }
    }
    if (match) {
      const romAddr = 0x8000 + i;
      console.log(fname + ': ROM offset $' + i.toString(16) + ' (addr $' + romAddr.toString(16) + ') - ' + info.bytes.length + ' bytes');
      addrMap[fname] = romAddr;
      
      // Verify full match
      const end = i + info.bytes.length;
      if (end <= expected.length) {
        let mismatch = -1;
        for (let k = 0; k < info.bytes.length; k++) {
          if (expected[i + k] !== info.bytes[k]) { mismatch = k; break; }
        }
        if (mismatch >= 0) {
          console.log('  MISMATCH at byte ' + mismatch + ': TS=0x' + info.bytes[mismatch].toString(16) + ' ROM=0x' + expected[i+mismatch].toString(16));
        } else {
          console.log('  -> FULL match');
        }
      }
      found = true;
      break;
    }
  }
  if (!found) console.log(fname + ': NOT FOUND in ROM');
}

console.log('\n--- ADDR_MAP fix ---');
for (const [fname, addr] of Object.entries(addrMap)) {
  const hex = addr.toString(16).toUpperCase();
  console.log("'" + fname + "': 0x" + hex + ',');
}
