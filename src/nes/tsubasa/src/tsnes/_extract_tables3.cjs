// Extract bank00 action-list executor + dispatcher; bank02 tables
const fs = require('fs');
const asm = fs.readFileSync('_tmp_bzk_out/bank_00.asm', 'utf8').split(/\r?\n/);
const addrMap = new Map();
for (const line of asm) {
  const m = line.match(/0x[0-9A-F]{6} 00:([0-9A-F]{4}):\s+((?:[0-9A-F]{2} )+)\s+(.*)/);
  if (!m) continue;
  addrMap.set(m[1], { bytes: m[2].trim().split(' '), mne: m[3] });
}
function extract(startAddr, limit = 300) {
  let out = [];
  let addr = startAddr.toUpperCase();
  let guard = 0;
  while (addrMap.has(addr) && guard < limit) {
    const e = addrMap.get(addr);
    out.push('$' + addr + ': ' + e.bytes.join(' ').padEnd(12) + e.mne);
    const op = e.mne.split(/\s+/)[0];
    if (op === 'RTS' || op === 'RTI') break;
    const len = e.bytes.length;
    addr = (parseInt(addr, 16) + len).toString(16).toUpperCase().padStart(4, '0');
    guard++;
  }
  return out.join('\n');
}
let full = '';
for (const [addr, name] of [['9F0F','action exec 1'],['9F52','action exec 2'],['84C1','bank02 dispatcher'],['8017','frame loop'],['801F','scene init entry']]) {
  full += '### ' + addr + ' — ' + name + '\n' + extract(addr) + '\n\n';
}
// $9EA2 table (64 bytes) from bank00
const t9EA2 = [];
for (let i = 0; i < 64; i++) {
  const a = (0x9EA2 + i).toString(16).toUpperCase().padStart(4, '0');
  if (addrMap.has(a)) t9EA2.push('0x' + addrMap.get(a).bytes[0]);
}
full += '### 9EA2 palette addr table (64B)\n' + t9EA2.join(',') + '\n\n';
fs.writeFileSync('_tmp_bzk_out/_sec00_more3.txt', full, 'utf8');
console.log('written _sec00_more3.txt');

// bank02 tables from prg-bank-02.ts
const b2 = fs.readFileSync('rom-data/prg-bank-02.ts', 'utf8');
const m2 = b2.match(/\[\s*([\s\S]*?)\s*\]/);
const vals = m2[1].split(',').map(s => parseInt(s.trim(), 16));
const get = (cpuAddr, n) => vals.slice(cpuAddr - 0xA000, cpuAddr - 0xA000 + n);
const tables = {
  A677_sprites_256B: get(0xA677, 256),
  A67B_tail_4B: get(0xA67B, 4),
  A472_unknown_18B: get(0xA472, 18),
  A49E_: get(0xA49E, 8),
};
let out2 = '';
for (const [k, v] of Object.entries(tables)) out2 += '### ' + k + '\n' + v.map(x=>'0x'+x.toString(16).padStart(2,'0')).join(',') + '\n\n';
fs.writeFileSync('_tmp_bzk_out/_bank02_tables.txt', out2, 'utf8');
console.log('written _bank02_tables.txt');
