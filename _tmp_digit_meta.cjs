const fs = require('fs');
const buf = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');

// Bank 6 mapped to $A000-$BFFF, ROM offset: 16 + 6*0x2000
const bank6Off = 16 + 6 * 0x2000;

const hundredsBase = bank6Off + 0x1000; // $B000 in bank 6
const tensBase     = bank6Off + 0x1300; // $B300 in bank 6

function hex(b) { return [...b].map(x=>x.toString(16).padStart(2,'0').toUpperCase()).join(' '); }

console.log('=== 百位 (hundreds) meta @ bank6+$1000, 4 bytes per "sprite fragment" ===');
for (let d = 0; d < 10; d++) {
  let off = hundredsBase + d * 16;
  let bytes = [...buf.slice(off, off+16)];
  console.log(`\nDigit ${d}:`);
  console.log(`  Raw: ${hex(bytes)}`);
  for (let g = 0; g < 4; g++) {
    let b0 = bytes[g*4], b1 = bytes[g*4+1], b2 = bytes[g*4+2], b3 = bytes[g*4+3];
    // hypothesis: group of 4: [ctrl] [X] [tile_idx] [attr] ?
    // or: [ctrl] [tile_lo] [tile_hi] [attr] ?
    // or: [row_y] [X_pos] [tile_idx] [pal/attr] ?
    let tile_hex = '$' + b2.toString(16).padStart(2,'0').toUpperCase();
    console.log(`  Group ${g}: [${b0.toString(16).padStart(2,'0')} ${b1.toString(16).padStart(2,'0')} ${tile_hex} ${b3.toString(16).padStart(2,'0')}]`);
  }
}

console.log('\n=== 十位 (tens) meta @ bank6+$1300 ===');
for (let d = 0; d < 10; d++) {
  let off = tensBase + d * 16;
  let bytes = [...buf.slice(off, off+16)];
  console.log(`\nDigit ${d}:`);
  console.log(`  Raw: ${hex(bytes)}`);
  for (let g = 0; g < 4; g++) {
    let b0 = bytes[g*4], b1 = bytes[g*4+1], b2 = bytes[g*4+2], b3 = bytes[g*4+3];
    let tile_hex = '$' + b2.toString(16).padStart(2,'0').toUpperCase();
    console.log(`  Group ${g}: [${b0.toString(16).padStart(2,'0')} ${b1.toString(16).padStart(2,'0')} ${tile_hex} ${b3.toString(16).padStart(2,'0')}]`);
  }
}

// Now check: which CHR bank 0 tiles are used for digits?
// Dump all tiles that appear in the metadata
console.log('\n=== All unique tile IDs in digit metadata (百位) ===');
let tiles100 = new Set();
for (let d = 0; d < 10; d++) {
  let off = hundredsBase + d * 16;
  let bytes = [...buf.slice(off, off+16)];
  for (let g = 0; g < 4; g++) {
    tiles100.add(bytes[g*4+2]);
  }
}
console.log([...tiles100].sort((a,b)=>a-b).map(x=>'$'+x.toString(16).padStart(2,'0')).join(' '));

console.log('\n=== All unique tile IDs in digit metadata (十位) ===');
let tiles10 = new Set();
for (let d = 0; d < 10; d++) {
  let off = tensBase + d * 16;
  let bytes = [...buf.slice(off, off+16)];
  for (let g = 0; g < 4; g++) {
    tiles10.add(bytes[g*4+2]);
  }
}
console.log([...tiles10].sort((a,b)=>a-b).map(x=>'$'+x.toString(16).padStart(2,'0')).join(' '));

// Full union
console.log('\n=== All unique tile IDs across both ===');
let all = new Set([...tiles100, ...tiles10]);
let sorted = [...all].sort((a,b)=>a-b);
console.log(sorted.map(x=>'$'+x.toString(16).padStart(2,'0')).join(' '));

// Dump CHR bank 0 tiles for these tile IDs
console.log('\n=== CHR bank 0 tiles at these IDs ===');
const chrStart = 16 + 16 * 16384; // header + PRG
for (let t of sorted) {
  let chrOff = chrStart + t * 16;
  let tile = [...buf.slice(chrOff, chrOff + 16)];
  console.log(`\nTile $${t.toString(16).padStart(2,'0')} (CHR offset 0x${chrOff.toString(16)}):`);
  for (let i = 0; i < 8; i++) {
    let lo = tile[i], hi = tile[i + 8];
    let line = '';
    for (let b = 0; b < 8; b++) {
      let px = ((hi >> (7-b)) & 1) * 2 + ((lo >> (7-b)) & 1);
      line += [' ','.','+','#'][px];
    }
    console.log('  ' + line);
  }
}
