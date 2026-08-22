// dump remaining bank28 tables + bank30 dispatcher
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
let out = '';
function dump(romBase, addr, len, label) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(rom[romBase + (addr - 0x8000) + i].toString(16).padStart(2, '0').toUpperCase());
  out += `${label} [$${addr.toString(16).toUpperCase()}] ${len}B:\n`;
  for (let i = 0; i < arr.length; i += 16) out += '  ' + arr.slice(i, i + 16).join(' ') + '\n';
}
function dump30(addr, len, label) { dump(0x10 + 30 * 0x2000, addr - 0x4000, len, label); }
// bank28 regions
dump(0x10 + 28 * 0x2000, 0x8686, 0x20, 'b28 $8686-$86A5 sub868E head');
dump(0x10 + 28 * 0x2000, 0x86A6, 0x60, 'b28 $86A6-$8705 $86AC table');
dump(0x10 + 28 * 0x2000, 0x8706, 0x60, 'b28 $8706-$8765 $86EE/$8710 tables');
dump(0x10 + 28 * 0x2000, 0x875D, 0x60, 'b28 $875D-$87BC sub875D');
dump(0x10 + 28 * 0x2000, 0x87BD, 0x60, 'b28 $87BD-$881C $87BA/$87C7 tables');
dump(0x10 + 28 * 0x2000, 0x881D, 0x70, 'b28 $881D-$888C $87C7 tail');
dump(0x10 + 28 * 0x2000, 0x888D, 0xA0, 'b28 $888D-$892C $88DF/$88E4');
dump(0x10 + 28 * 0x2000, 0x892D, 0x50, 'b28 $892D-$897C $8927/$8933/$895E');
dump(0x10 + 28 * 0x2000, 0x8C7F, 0x80, 'b28 $8C7F-$8CFE sub8C7F head');
dump(0x10 + 28 * 0x2000, 0x8CFF, 0x60, 'b28 $8CFF-$8D5E $8C84 table+targets');
dump(0x10 + 28 * 0x2000, 0x8DA6, 0x80, 'b28 $8DA6-$8E25 sub8DA6/$8DB6/$8DC9/$8DE2/$8E11');
dump(0x10 + 28 * 0x2000, 0x8A3F, 0x80, 'b28 $8A3F-$8ABE sub8A3F');
dump(0x10 + 28 * 0x2000, 0x8ABF, 0x70, 'b28 $8ABF-$8B2E $8A9D table/$8ADE/$8B0B');
// bank30
dump30(0xCB90, 0x40, 'b30 $CB90-$CBCF dispatcher');
dump30(0xCDE2, 0x50, 'b30 $CDE2 angle calc');
fs.writeFileSync('_tmp_tables_out.txt', out);
console.log('done');
