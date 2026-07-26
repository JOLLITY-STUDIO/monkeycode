import fs from 'fs';
const s = fs.readFileSync('src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts','utf8');
const lines = s.split('\n');

// Find all functions
const funcs = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^function (build\w+)/);
  if (m) funcs.push({name: m[1], line: i+1});
}
console.log('Functions:');
funcs.forEach(f => console.log(`  ${f.line}: ${f.name}`));

// For each function, count the bytes
for (const func of funcs) {
  const startRe = new RegExp('function ' + func.name + '\\(\\)');
  const idx = s.search(startRe);
  if (idx === -1) continue;
  let braceIdx = s.indexOf('{', idx);
  let depth = 0;
  let endIdx = -1;
  for (let i = braceIdx; i < s.length; i++) {
    if (s[i] === '{') depth++;
    if (s[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = s.slice(braceIdx + 1, endIdx);
  const bytes = [];
  // match 0xXX patterns  
  for (const m of body.matchAll(/0x([0-9a-fA-F]{2})/g)) {
    bytes.push(parseInt(m[1], 16));
  }
  console.log(`  ${func.name}: ${bytes.length} bytes (lines ${s.slice(0, idx).split('\n').length}-${s.slice(0, endIdx).split('\n').length})`);
}
