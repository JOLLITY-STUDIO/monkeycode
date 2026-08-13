// Extract bank00 subroutines referenced by bank02 translation (v3: precise walker)
const fs = require('fs');
const asm = fs.readFileSync('_tmp_bzk_out/bank_00.asm', 'utf8').split(/\r?\n/);

const addrMap = new Map();
for (const line of asm) {
  const m = line.match(/0x[0-9A-F]{6} 00:([0-9A-F]{4}):\s+((?:[0-9A-F]{2} )+)\s+(.*)/);
  if (!m) continue;
  addrMap.set(m[1], { bytes: m[2].trim().split(' '), mne: m[3] });
}

function extract(startAddr) {
  let out = [];
  let addr = startAddr.toUpperCase();
  let guard = 0;
  while (addrMap.has(addr) && guard < 300) {
    const e = addrMap.get(addr);
    out.push('$' + addr + ': ' + e.bytes.join(' ').padEnd(12) + e.mne);
    const op = e.mne.split(/\s+/)[0];
    if (op === 'RTS' || op === 'RTI') break;
    if (op === 'JMP') break;
    const len = e.bytes.length;
    addr = (parseInt(addr, 16) + len).toString(16).toUpperCase().padStart(4, '0');
    guard++;
  }
  return out.join('\n');
}

const targets = [
  ['9A0D', 'PPU buffer flush 1'],
  ['9A1F', 'PPU buffer flush 2'],
  ['9A71', 'PPU buffer write processor'],
  ['9A31', 'main init param'],
  ['9A35', 'main loop init2'],
  ['9A43', 'main loop init1'],
  ['9AB8', 'palette sub'],
  ['9ADA', 'palette sub2'],
  ['9B07', 'main loop chain'],
  ['9B11', 'nt attr clear'],
  ['9B28', 'PPU buffer alloc'],
  ['9B5E', 'PPU buffer end'],
  ['9BA0', 'wait vblank'],
  ['9DEE', 'scene data fetch'],
  ['9F69', 'data write helper'],
  ['9085', 'palette writer'],
  ['890C', 'VRAM setup'],
  ['88FB', 'PPU reg setup'],
];

let full = '';
for (const [addr, name] of targets) {
  full += '### ' + addr + ' — ' + name + '\n' + extract(addr) + '\n\n';
}
fs.writeFileSync('_tmp_bzk_out/_sec00_more.txt', full, 'utf8');
console.log('written _sec00_more.txt');
