const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts');
const src = fs.readFileSync(srcPath, 'utf8');
const funcs = ['buildbytecodeHandlers', 'buildscheduler', 'buildpadding'];
let totalIssues = 0;

for (const fname of funcs) {
  const search = 'function ' + fname + '(';
  let idx = src.indexOf(search);
  let braceIdx = src.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = src.slice(braceIdx + 1, endIdx);
  const m = body.match(/return asm\`([\s\S]*?)\`\s*;?\s*$/);
  if (!m) { console.log(fname + ': no asm template'); continue; }

  const asmContent = m[1];
  const lines = asmContent.split('\n');
  console.log('\n--- ' + fname + ' (' + lines.length + ' lines) ---');

  const labelsDef = new Set();
  const labelsRef = new Set();
  let instCount = 0, byteCount = 0;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('.')) { byteCount++; continue; }

    // Labels defined
    const lm = t.match(/^@(\w+):/);
    if (lm) labelsDef.add(lm[1]);

    // Labels referenced
    const refs = t.match(/@(\w+)/g);
    if (refs) for (const r of refs) {
      const name = r.slice(1);
      if (!name.endsWith(':')) labelsRef.add(name);
    }

    if (t.match(/^[A-Z]{3}\b|@\w+:.*[A-Z]{3}\b/)) instCount++;
  }

  console.log('  instructions=' + instCount + ' data=' + byteCount + 
    ' defined=' + labelsDef.size + ' refs=' + labelsRef.size);

  // Check undefined
  for (const r of labelsRef) {
    if (!labelsDef.has(r)) {
      console.log('  UNDEFINED: @' + r);
      totalIssues++;
    }
  }
  // Check unused  
  for (const d of labelsDef) {
    if (!labelsRef.has(d)) {
      console.log('  UNUSED: @' + d);
    }
  }

  // Show sample
  console.log('  Samples:');
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const t = lines[i].trim();
    if (t) console.log('    ' + t);
  }
}

console.log('\nTotal issues: ' + totalIssues);
console.log(totalIssues === 0 ? 'ALL LABELS OK!' : 'THERE ARE ISSUES!');
