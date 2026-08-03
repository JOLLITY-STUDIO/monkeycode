import fs from 'fs';

const c = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8');

// Find all references to BC6E
const refs = [];
let pos = 0;
while (true) {
  const idx = c.indexOf('BC6E', pos);
  if (idx < 0) break;
  const start = Math.max(0, idx - 100);
  const end = Math.min(c.length, idx + 100);
  refs.push(c.substring(start, end));
  pos = idx + 1;
}

console.log('Total references to BC6E:', refs.length);
for (let i = 0; i < Math.min(refs.length, 20); i++) {
  console.log(`\n[${i}]`);
  console.log(refs[i]);
}

// Now find the data table at BC6E - look for label then .byte lines
// In bank 01, BC6E = offset 0x3C6E
// Look around offset 0x3C6E from start of bank
const labelIdx = c.indexOf('\nBC6E:');
if (labelIdx >= 0) {
  console.log('\n=== Label BC6E found ===');
  console.log(c.substring(labelIdx, labelIdx + 1000));
} else {
  // Try hex address format
  const addrIdx = c.search(/\n[0-9A-F]{2}:BC6E/);
  if (addrIdx >= 0) {
    console.log('\n=== Address BC6E found ===');
    console.log(c.substring(addrIdx, addrIdx + 1000));
  } else {
    // Search for label patterns near the hex address $BC6E
    // In asm: - - - - - - 0x003C6E 01:BC6E: XX
    const hexAddrIdx = c.indexOf('01:BC6E');
    if (hexAddrIdx >= 0) {
      console.log('\n=== 01:BC6E found ===');
      const lineStart = Math.max(0, hexAddrIdx - 200);
      console.log(c.substring(lineStart, hexAddrIdx + 800));
    } else {
      console.log('\n=== No label/addr for BC6E found ===');
      // Try searching for the data near offset 0x3C6E
      // In the asm, each line starts with "- - - - - - 0x003C6E 01:BC6E:"
      const searchFor = '0x003C6E';
      const offsetIdx = c.indexOf(searchFor);
      if (offsetIdx >= 0) {
        console.log('\n=== 0x003C6E found ===');
        console.log(c.substring(Math.max(0, offsetIdx - 50), offsetIdx + 500));
      }
    }
  }
}
