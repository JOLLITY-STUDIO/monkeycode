const fs = require('fs');
const zlib = require('zlib');

const f1 = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).fc1.fcs';
const f2 = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).fc2.fcs';

function loadRam(path) {
  const buf = fs.readFileSync(path);
  const data = zlib.inflateSync(buf.slice(0x10));
  const tag = Buffer.from('RAM');
  const pos = data.indexOf(tag);
  const size = data.readUInt32LE(pos + 4);
  const off = pos + 8;
  return data.slice(off, off + size);
}

const r1 = loadRam(f1);
const r2 = loadRam(f2);

function printRegion(start, end, label) {
  console.log(`\n=== ${label} $${start.toString(16).padStart(4,'0')}-$${end.toString(16).padStart(4,'0')} ===`);
  for (let base = start; base < end; base += 16) {
    const hex1 = [...r1.slice(base, base+16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
    const hex2 = [...r2.slice(base, base+16)].map(b=>b.toString(16).padStart(2,'0')).join(' ');
    const same = hex1 === hex2;
    console.log(`$${base.toString(16).padStart(4,'0')} r1: ${hex1}`);
    console.log(`$${base.toString(16).padStart(4,'0')} r2: ${hex2}${same ? '' : '  <-'}`);
  }
}

// Around candidate addresses
printRegion(0x0050, 0x0080, 'around $005f');
printRegion(0x0340, 0x0370, 'around $0348');
printRegion(0x0760, 0x07a0, 'around $076c');
printRegion(0x07d0, 0x0800, 'around $07e4');
printRegion(0x0130, 0x0160, 'around $0139');
printRegion(0x0190, 0x01c0, 'around $019d');
printRegion(0x0350, 0x0370, 'around $0360');
printRegion(0x0730, 0x0750, 'around $073b');

// Show all addresses with value 8 in r2 and what they were in r1
console.log('\n=== r2 value 8 addresses and r1 values ===');
for (let i = 0; i < 0x800; i++) {
  if (r2[i] === 8) {
    console.log(`  $${i.toString(16).padStart(4,'0')}: r1=${r1[i]} r2=${r2[i]}${r1[i] !== r2[i] ? ' CHANGED' : ''}`);
  }
}

console.log('\n=== r2 value 9 addresses and r1 values ===');
for (let i = 0; i < 0x800; i++) {
  if (r2[i] === 9) {
    console.log(`  $${i.toString(16).padStart(4,'0')}: r1=${r1[i]} r2=${r2[i]}${r1[i] !== r2[i] ? ' CHANGED' : ''}`);
  }
}

console.log('\n=== r2 value 10 addresses and r1 values ===');
for (let i = 0; i < 0x800; i++) {
  if (r2[i] === 10) {
    console.log(`  $${i.toString(16).padStart(4,'0')}: r1=${r1[i]} r2=${r2[i]}${r1[i] !== r2[i] ? ' CHANGED' : ''}`);
  }
}
