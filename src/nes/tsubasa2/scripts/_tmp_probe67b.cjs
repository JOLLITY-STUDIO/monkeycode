// quick verify bank06 offsets
const fs = require('fs');
const p = require('path');
function pA(fp) {
  const text = fs.readFileSync(fp, 'utf8');
  const bytes = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/\.byte\s+(.+)$/i);
    if (!m) continue;
    const parts = m[1].split(',').map(s=>s.trim()).filter(Boolean);
    for (const x of parts) {
      let v;
      if (x.startsWith('$')) v = parseInt(x.slice(1), 16);
      else v = parseInt(x, 16);
      if (!Number.isNaN(v)) bytes.push(v & 0xff);
    }
  }
  return new Uint8Array(bytes);
}
const t = pA(p.join(__dirname,'../src/asm/bank06/data_tables.s'));
const m = pA(p.join(__dirname,'../src/asm/bank06/data_maps.s'));
const tl = pA(p.join(__dirname,'../src/asm/bank06/data_tail.s'));
const b = new Uint8Array(t.length+m.length+tl.length);
b.set(t,0); b.set(m,t.length); b.set(tl,t.length+m.length);
console.log('total='+b.length);

// search for scene table format: 19-byte rows; first row scrollFlag=0x00; pattern observed:
// 0x00,0x00,0x00,0x00..., 0x40,0x80,0x00,0x22,..., 0x0F,0x0F,0x00,0x01,..., 0x04,0x68,0x00,0x01,...
const sigs = [
  [0x40,0x80,0x00,0x22], // scene 1
  [0x0F,0x0F,0x00,0x01], // scene 2
  [0x04,0x68,0x00,0x01], // scene 3
  [0x18,0x00,0x00,0x00], // scene 4 (14, 4)
  [0x18,0x08,0x00,0x00], // scene 5
  [0x10,0x10,0x00,0x00], // scene 6
];
for (const sg of sigs) {
  for (let i = 0; i < b.length - sg.length; i++) {
    let ok = true;
    for (let j = 0; j < sg.length; j++) if (b[i+j] !== sg[j]) { ok = false; break; }
    if (ok) console.log('sig [' + sg.map(x=>'0x'+x.toString(16).padStart(2,'0')).join(',') + '] @'+i.toString(16).padStart(4,'0'));
  }
}

// also find the last 32-byte block ending in long 0xFF run
for (let i = 0x1f00; i < b.length - 16; i++) {
  let allff = true;
  for (let j = 0; j < 16; j++) if (b[i+j] !== 0xff) { allff = false; break; }
  if (allff) { console.log('16xFF @0x'+i.toString(16).padStart(4,'0')); break; }
}

// Display bytes 0x1F00-0x1FFF as 16 rows
console.log('--- bank06 0x1F00-0x1FFF ---');
for (let r = 0; r < 16; r++) {
  const off = 0x1F00 + r * 16;
  const slice = Array.from(b.slice(off, off + 16)).map(x=>x.toString(16).padStart(2,'0')).join(' ');
  console.log('0x'+off.toString(16).padStart(4,'0')+': '+slice);
}

// Show after scene table — find end (19 byte per scene, 16 scenes = 304 bytes)
console.log('--- bytes @0x1F00 + offset hints ---');
console.log('expected scene table end at 0x1F00+0x130 = 0x1F00+304 = 0x' + (0x1F00+304).toString(16));
