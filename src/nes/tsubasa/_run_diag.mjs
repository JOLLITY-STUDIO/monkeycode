// run 30 seconds, minimal logging
import { updateFrame, load, store, HEAPU8, getMemorySize } from './pages/tsubasaFromCore/core_engine.js';
import fs from 'fs';

// 1. find NES base
store(0x0000, 0xA5); store(0x0001, 0x5A);
store(0x7FFF, 0xFF); store(0x8000, 0x80);
let nesBase = -1;
for (let i = 0; i < HEAPU8.length - 2; i++) {
  if (HEAPU8[i]===0xA5 && HEAPU8[i+1]===0x5A && HEAPU8[i+0x7FFF]===0xFF && HEAPU8[i+0x8000]===0x80) {
    nesBase = i; break;
  }
}
store(0x0000,0); store(0x0001,0); store(0x7FFF,0); store(0x8000,0);
console.log('NES base:', nesBase, `(0x${nesBase.toString(16)})`);

// 2. inject ROM
const merged = fs.readFileSync('tools/6502-to-js-test/_prg_output/_merged_all.c', 'utf8');
const setmems = merged.matchAll(/SetMem\(0x([0-9a-f]+),\s*0x([0-9a-f]+)\)/gi);
let inj = 0;
for (const m of setmems) { store(parseInt(m[1],16), parseInt(m[2],16)); inj++; }
console.log('Injected:', inj, 'bytes');

// verify
let nzROM = 0;
for (let i = 0x8000; i <= 0xFFFF; i++) if (load(i)!==0) nzROM++;
console.log('ROM non-zero:', nzROM, '/32768');

const resetVec = load(0xFFFC) | (load(0xFFFD)<<8);
console.log('RESET vec:', `$${resetVec.toString(16).padStart(4,'0')}`);

// sample first opcodes
console.log(`\n--- ROM samples ---`);
for (const a of [0x8000, 0xA000, 0xC000, 0xE000, resetVec & 0xFFFF]) {
  const s = []; for (let i=0;i<16;i++) s.push(load(a+i));
  console.log(`$${a.toString(16)}: ${s.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
}

// 3. capture initial state
function rd(s, n) { const r=[]; for(let i=0;i<n;i++) r.push(load(s+i)); return r; }
const initZP = rd(0x0000, 0x30);
const initStack = rd(0x01F0, 0x10);

// 4. run 30 seconds
console.log('\n--- running 30s ---');
const t0 = Date.now();
let frames = 0;
let errors = 0;
let lastSec = 0;

try {
  while ((Date.now() - t0) < 30000) {
    updateFrame();
    frames++;
    
    const sec = Math.floor((Date.now() - t0) / 1000);
    if (sec !== lastSec) {
      const z0 = rd(0x0000, 0x10);
      const nz = z0.filter(b=>b!==0).length;
      const zStr = z0.map(b=>b.toString(16).padStart(2,'0')).join(' ');
      console.log(`s${sec} f${frames} z0:[${zStr}] nz=${nz} err=${errors}`);
      lastSec = sec;
    }
  }
} catch(e) {
  errors++;
  console.log(`FATAL at frame ${frames}: ${e.message}`);
}

const elapsed = (Date.now()-t0)/1000;
console.log(`\nFrames: ${frames}, Time: ${elapsed.toFixed(1)}s, FPS: ${(frames/elapsed).toFixed(0)}, Errors: ${errors}`);

// 5. final state
const finZP = rd(0x0000, 0x100);
let zpChanged = 0;
for (let i=0; i<0x30; i++) if (finZP[i] !== initZP[i]) zpChanged++;

const finStack = rd(0x01F0, 0x10);
console.log(`\nZero-page bytes changed: ${zpChanged}`);
console.log(`Stack top ($01F0-$01FF): ${finStack.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);

// dump non-zero zero page
let nzZP = [];
for (let i=0; i<0x100; i++) { let b=load(i); if(b) nzZP.push(`$${i.toString(16)}=$${b.toString(16)}`); }
if (nzZP.length) console.log('Non-zero zero page:', nzZP.join(', '));
else console.log('Zero page: ALL ZERO');

// check work RAM for any activity
let nzWRAM = 0;
for (let i=0x0200; i<0x0800; i++) if (load(i)!==0) nzWRAM++;
console.log(`WRAM $0200-$07FF non-zero: ${nzWRAM}/1536`);

if (nzWRAM) {
  for (let i=0x0200; i<0x0800; i+=16) {
    const row = [];
    for (let j=0;j<16;j++) row.push(load(i+j));
    if (row.some(b=>b!==0))
      console.log(`$${i.toString(16)}: ${row.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
  }
}
