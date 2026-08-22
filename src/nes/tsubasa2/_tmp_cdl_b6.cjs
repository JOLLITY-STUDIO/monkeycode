const fs = require('fs');
const p = 'docs/Captain Tsubasa II - Super Striker (Japan)202060822.cdl';
const buf = fs.readFileSync(p);
console.log('CDL SIZE:', buf.length, '(0x' + buf.length.toString(16) + ')');
// PRG bank6 at offset 6*0x2000 = 0xC000, length 0x2000
function bankStats(bankNo) {
  const off = bankNo * 0x2000;
  let code = 0, data = 0, neither = 0;
  for (let i = 0; i < 0x2000; i++) {
    const b = buf[off + i];
    if (b & 1) code++;
    if (b & 2) data++;
    if (!(b & 3)) neither++;
  }
  return { code, data, neither };
}
console.log('=== CDL code/data per bank ===');
for (let b = 0; b < 32; b++) {
  const s = bankStats(b);
  console.log('bank' + b.toString().padStart(2, '0') + ': code=' + s.code + ' data=' + s.data + ' none=' + s.neither);
}
// detailed: bank6 code ranges
console.log('\n=== BANK6 code ranges ===');
{
  const off = 6 * 0x2000;
  const ranges = [];
  let s = null, e = null;
  for (let i = 0; i < 0x2000; i++) {
    if (buf[off + i] & 1) {
      if (s === null) s = e = i;
      else e = i;
    } else {
      if (s !== null) { ranges.push('$' + s.toString(16).toUpperCase() + '-$' + e.toString(16).toUpperCase()); s = null; }
    }
  }
  if (s !== null) ranges.push('$' + s.toString(16).toUpperCase() + '-$' + e.toString(16).toUpperCase());
  console.log(ranges.join(' '));
}
// bytes at bank6 offset 0x0131 region from ROM? we don't have raw ROM bytes here, but check data ranges near 0x0131
console.log('\n=== BANK6 offset 0x0110-0x0140 marks ===');
{
  const off = 6 * 0x2000;
  for (let i = 0x0110; i < 0x0140; i += 4) {
    const marks = [];
    for (let j = 0; j < 4; j++) {
      const b = buf[off + i + j];
      marks.push(b & 1 ? 'C' : (b & 2 ? 'D' : '.'));
    }
    console.log('$' + i.toString(16).toUpperCase() + ': ' + marks.join(''));
  }
}
