const fs = require('fs');
const s = fs.readFileSync('src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts','utf8');

// For each function, use brace counting
const funcs = ['buildjumpVectors','buildsceneEntry0','buildsceneEntry1','buildsceneEntry2','buildsceneEntry3','buildsceneEntry4',
  'builddispatch','buildsceneLoop','buildscriptEngine','builddataTables','buildsceneTables',
  'buildbytecodeHandlers','buildscheduler','buildcontextSave','buildpadding'];

const results = [];
for (const fname of funcs) {
  const search = 'function ' + fname + '(';
  let idx = s.indexOf(search);
  if (idx === -1) { console.log(fname + ': NOT FOUND'); continue; }
  let braceIdx = s.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < s.length; i++) {
    if (s[i] === '{') depth++;
    if (s[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = s.slice(braceIdx + 1, endIdx);
  const byteMatches = body.match(/0x([0-9a-fA-F]{2})/g) || [];
  const bytes = byteMatches.map(m => parseInt(m.slice(2), 16));
  const startLine = s.slice(0, idx).split('\n').length;
  const endLine = s.slice(0, endIdx).split('\n').length;
  results.push({ name: fname, bytes, startLine, endLine, startIdx: idx, endIdx });
  console.log(fname + ': ' + bytes.length + ' bytes (line ' + startLine + '-' + endLine + ') bodyLen=' + body.length);
  
  // Check if asm or array
  if (body.includes('return asm')) console.log('  -> uses asm template');
  else if (body.includes('return [')) console.log('  -> uses array');
}

// Check for overlap by looking at the first few bytes
console.log('\n--- Byte samples (first 8) ---');
for (const r of results) {
  const hex = r.bytes.slice(0, 8).map(b => b.toString(16).padStart(2,'0')).join(' ');
  console.log(r.name + ': ' + hex);
}
