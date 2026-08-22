// Dump bank20 sub8438/sub857A dispatch tables + targets from ROM
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bank = 20;
const base = 0x10 + bank * 0x2000;
function b(addr) { return rom[base + (addr - 0x8000)]; }
let out = '';
function dump(addr, len, label) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(b(addr + i).toString(16).padStart(2, '0').toUpperCase());
  out += label + ' [' + addr.toString(16).toUpperCase() + '] ' + len + 'B:\n';
  for (let i = 0; i < arr.length; i += 16) {
    out += '  ' + arr.slice(i, i + 16).join(' ') + '\n';
  }
}
dump(0x8438, 0xC0, '$8438 sub8438 + $843B table');
dump(0x8450, 0xB0, '$8450-$84FF targets');
dump(0x857A, 0x90, '$857A sub857A + $8580 table');
dump(0x858D, 0x90, '$858D-$861C targets');
fs.writeFileSync('_tmp_verify_out.txt', out);
console.log('done');
