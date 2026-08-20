const fs = require('fs');
const path = require('path');

const dataSrc = fs.readFileSync(path.join(__dirname, 'src/game/data/prg/bank02-tables.ts'), 'utf8');
function extractArray(src, name) {
  const re = new RegExp('export const ' + name + '.*?\\[\\s*([\\s\\S]*?)\\];');
  const m = src.match(re);
  if (!m) return null;
  return m[1].split(',').map((s) => parseInt(s.trim(), 16)).filter((v) => !isNaN(v));
}
function readAsmBytes(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const bytes = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('.byte')) continue;
    const m = t.slice('.byte'.length).match(/[$]?[0-9A-Fa-f]{2}/g);
    if (m) for (const tok of m) bytes.push(parseInt(tok.replace('$', ''), 16));
  }
  return bytes;
}
function findSub(bytes, needle, from) {
  for (let i = from; i + needle.length <= bytes.length; i++) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) if (bytes[i + j] !== needle[j]) { ok = false; break; }
    if (ok) return i;
  }
  return -1;
}

const asmFiles = ['code_main.s','code_sub.s','code_data.s','data_tables.s'];
const allBytes = [];
for (const f of asmFiles) {
  allBytes.push({ name: f, bytes: readAsmBytes(path.join(__dirname, 'asm/bank02', f)) });
}

let report = '';
for (const name of ['SPRITE_UPLOAD', 'SPRITE_UPLOAD2', 'TINY_TABLE']) {
  const arr = extractArray(dataSrc, name);
  if (!arr) { report += name + ': NOT in data module\n'; continue; }
  report += name + ' (len=' + arr.length + '):\n';
  for (const f of allBytes) {
    const idx = findSub(f.bytes, arr, 0);
    if (idx >= 0) report += '  FOUND in ' + f.name + ' at offset ' + idx + '\n';
    else report += '  not in ' + f.name + '\n';
  }
}
fs.writeFileSync(path.join(__dirname, '_verify_b02_code.txt'), report, 'utf8');
