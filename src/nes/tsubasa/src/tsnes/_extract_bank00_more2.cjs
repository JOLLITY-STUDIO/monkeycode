// Extract remaining bank00 subroutines (v4)
const fs = require('fs');
const asm = fs.readFileSync('_tmp_bzk_out/bank_00.asm', 'utf8').split(/\r?\n/);

const addrMap = new Map();
for (const line of asm) {
  const m = line.match(/0x[0-9A-F]{6} 00:([0-9A-F]{4}):\s+((?:[0-9A-F]{2} )+)\s+(.*)/);
  if (!m) continue;
  addrMap.set(m[1], { bytes: m[2].trim().split(' '), mne: m[3] });
}

// extract from startAddr, stop at first RTS/RTI or after `limit` instructions
// stopOnJmp: if true stop at JMP too (subroutine tail)
function extract(startAddr, limit = 400, stopOnJmp = true) {
  let out = [];
  let addr = startAddr.toUpperCase();
  let guard = 0;
  while (addrMap.has(addr) && guard < limit) {
    const e = addrMap.get(addr);
    out.push('$' + addr + ': ' + e.bytes.join(' ').padEnd(12) + e.mne);
    const op = e.mne.split(/\s+/)[0];
    if (op === 'RTS' || op === 'RTI') break;
    if (stopOnJmp && op === 'JMP') break;
    const len = e.bytes.length;
    addr = (parseInt(addr, 16) + len).toString(16).toUpperCase().padStart(4, '0');
    guard++;
  }
  return out.join('\n');
}

const targets = [
  ['9B28', 'PPU buffer alloc (full, follows JMP chains)'],
  ['9AA2', 'PPU buffer byte write'],
  ['9EED', 'main loop entry'],
  ['99F0', 'unknown init'],
  ['98A0', 'NT clear'],
  ['9B7F', 'ppu init'],
  ['8297', 'palette init'],
  ['8AF7', 'scene load (full)'],
  ['8A90', 'scene stream step'],
  ['8A91', 'attr write chunk'],
  ['9085', 'palette writer full'],
  ['9A35', 'main loop init2 (tail)'],
];

let full = '';
for (const [addr, name] of targets) {
  full += '### ' + addr + ' — ' + name + '\n' + extract(addr) + '\n\n';
}
// extra: follow-through regions
full += '### 9B37 — ppu alloc tail\n' + extract('9B37', 40, false) + '\n\n';
full += '### 9AA2 — ppu byte write\n' + extract('9AA2', 40, false) + '\n\n';
full += '### 9131 — palette writer tail\n' + extract('9131', 60, false) + '\n\n';
fs.writeFileSync('_tmp_bzk_out/_sec00_more2.txt', full, 'utf8');
console.log('written _sec00_more2.txt');
