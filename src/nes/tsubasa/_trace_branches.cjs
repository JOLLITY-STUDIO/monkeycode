const fs = require('fs');
const src = fs.readFileSync('src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts','utf8');

function getFuncBytes(fname) {
  const search = 'function ' + fname + '(';
  let idx = src.indexOf(search);
  if (idx === -1) return [];
  let braceIdx = src.indexOf('{', idx);
  let depth = 0, endIdx = -1;
  for (let i = braceIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  const body = src.slice(braceIdx + 1, endIdx);
  const bytes = [];
  const bm = body.match(/0x([0-9a-fA-F]{2})/g);
  if (bm) bm.forEach(m => bytes.push(parseInt(m.slice(2), 16)));
  return bytes;
}

const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');
const H4 = n => n.toString(16).toUpperCase().padStart(4, '0');

const OPT = {
  "69":[0,5,2],"65":[0,0,2],"75":[0,6,2],"6d":[0,3,3],"7d":[0,8,3],"79":[0,9,3],"61":[0,10,2],"71":[0,11,2],
  "29":[1,5,2],"25":[1,0,2],"35":[1,6,2],"2d":[1,3,3],"3d":[1,8,3],"39":[1,9,3],"21":[1,10,2],"31":[1,11,2],
  "0a":[2,4,1],"06":[2,0,2],"16":[2,6,2],"0e":[2,3,3],"1e":[2,8,3],
  "90":[3,1,2],"b0":[4,1,2],"f0":[5,1,2],"30":[7,1,2],"d0":[8,1,2],"10":[9,1,2],"50":[11,1,2],"70":[12,1,2],
  "24":[6,0,2],"2c":[6,3,3],"00":[10,2,1],
};
const INS = ['ADC','AND','ASL','BCC','BCS','BEQ','BIT','BMI','BNE','BPL','BRK','BVC','BVS'];
const BR = new Set(['BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS']);

const bases = { buildbytecodeHandlers: 0x8840, buildscheduler: 0x8EED, buildpadding: 0x8FF6 };

for (const fname of Object.keys(bases)) {
  const baseAddr = bases[fname];
  const bytes = getFuncBytes(fname);
  if (bytes.length === 0) { console.log(fname + ': no bytes found'); continue; }
  
  console.log('\n=== ' + fname + ' base=$' + H4(baseAddr) + ' ' + bytes.length + ' bytes ===');
  
  let pc = 0;
  let extCount = 0;
  while (pc < bytes.length) {
    const op = H2(bytes[pc]).toLowerCase();
    const rec = OPT[op];
    if (!rec) { pc++; continue; }
    const [insIdx, mode, size] = rec;
    if (pc + size > bytes.length) break;
    const insName = INS[insIdx] || null;
    const lo = size >= 2 ? bytes[pc + 1] : 0;
    if (insName && BR.has(insName) && mode === 1) {
      const target = baseAddr + pc + 2 + (lo < 128 ? lo : lo - 256);
      const inRange = target >= baseAddr && target < baseAddr + bytes.length;
      if (!inRange) {
        const addr = baseAddr + pc;
        console.log('  offset $' + pc.toString(16) + ' (addr $' + H4(addr) + '): ' + insName + ' $' + H4(target) + ' [EXTERNAL]');
        extCount++;
      }
    }
    pc += size;
  }
  console.log('  External branches: ' + extCount);
}
