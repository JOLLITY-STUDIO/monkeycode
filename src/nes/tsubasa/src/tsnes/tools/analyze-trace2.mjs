// analyze-trace2.mjs — Deeper bank mapping analysis
import { readFileSync } from 'fs';

const LOG = 'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log';
const raw = readFileSync(LOG, 'utf8');
const lines = raw.split('\n');

// ── Track MMC3 register state ──
const regs = [0,0,0,0,0,0,0,0]; // reg 0-7
let prgMode = 0; // 0 or 1

// Map reg→bank for $8000-$BFFF
function getBank8000() {
  // In PRG mode 0: $8000=$reg6, $A000=$reg7, $C000=fix(-2), $E000=fix(-1)
  // In PRG mode 1: $8000=fix(-2), $A000=$reg7, $C000=$reg6, $E000=fix(-1)
  if (prgMode === 0) return { b8000: regs[6], bA000: regs[7] };
  else return { b8000: -2, bA000: regs[7] };
}

// ── Scan all bank switch events ──
const bankHistory = []; // {frame, line, reg, val, from}
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const sta8k = l.match(/STA\s+\$8000\b/);
  const sta8k1 = l.match(/STA\s+\$8001\b/);
  if (!sta8k && !sta8k1) continue;
  
  const fm = l.match(/^f(\d+)/);
  const bm = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  const am = l.match(/A:([0-9A-Fa-f]+)/);
  if (!fm || !bm || !am) continue;
  
  const frame = parseInt(fm[1], 10);
  const val = parseInt(am[1], 16);
  
  if (sta8k) {
    // STA $8000
    if (val & 0x80) {
      // Mode select
      prgMode = (val >> 6) & 1;
    }
    const reg = val & 0x07;
    bankHistory.push({ frame, line: i+1, type: 'SEL', reg, val, from: `${bm[1]}:${bm[2]}` });
  } else {
    // STA $8001 — write to previously selected reg
    if (bankHistory.length > 0) {
      const last = bankHistory[bankHistory.length - 1];
      if (last.type === 'SEL') {
        regs[last.reg] = val;
        bankHistory.push({ frame, line: i+1, type: 'SET', reg: last.reg, val, from: `${bm[1]}:${bm[2]}` });
      }
    }
  }
}

console.log('=== MMC3 Bank Switch Timeline (all events) ===');
console.log('Format: frame  line#  [reg] = bank  ← called from');
console.log('  reg6=$8000 reg7=$A000  (PRG mode 0)');
console.log('');

let lastReg6 = -1, lastReg7 = -1;
bankHistory.forEach(e => {
  if (e.type !== 'SET') return;
  let changed = false;
  if (e.reg === 6 && e.val !== lastReg6) { lastReg6 = e.val; changed = true; }
  if (e.reg === 7 && e.val !== lastReg7) { lastReg7 = e.val; changed = true; }
  if (changed) {
    const hex6 = lastReg6.toString(16).padStart(2,'0').toUpperCase();
    const hex7 = lastReg7.toString(16).padStart(2,'0').toUpperCase();
    console.log(`  f${String(e.frame).padStart(5)}  #${String(e.line).padStart(6)}  reg6=$${hex6}  reg7=$${hex7}  ← $${e.from}`);
  }
});

// ── Summary: which banks get mapped to $8000/$A000 ──
console.log('\n=== Bank summary: banks mapped to $8000-$9FFF (reg6) ===');
const reg6Set = new Set();
const reg7Set = new Set();
bankHistory.filter(e => e.type === 'SET').forEach(e => {
  if (e.reg === 6) reg6Set.add(e.val);
  if (e.reg === 7) reg7Set.add(e.val);
});
console.log('reg6 ($8000):', [...reg6Set].sort((a,b)=>a-b).map(n=>`$${n.toString(16).padStart(2,'0')}(${n})`).join(', '));
console.log('reg7 ($A000):', [...reg7Set].sort((a,b)=>a-b).map(n=>`$${n.toString(16).padStart(2,'0')}(${n})`).join(', '));

// ── Frame range ──
const firstFrame = bankHistory.length > 0 ? bankHistory[0].frame : '?';
const lastFrame = bankHistory.length > 0 ? bankHistory[bankHistory.length - 1].frame : '?';
console.log(`\nFrame range: ${firstFrame} → ${lastFrame}`);

// ── What scene is this? Look for writes to $0027 (scene state) ──
console.log('\n=== First 20 writes to $0027 (scene state variable) ===');
let cnt27 = 0;
for (let i = 0; i < lines.length && cnt27 < 20; i++) {
  const l = lines[i];
  if (/STA\s+\$0027\b/.test(l) || /STA\s+\$27\b/.test(l)) {
    cnt27++;
    const fm = l.match(/^f(\d+)/);
    const am = l.match(/A:([0-9A-Fa-f]+)/);
    const bm = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
    console.log(`  #${i+1} f=${fm?.[1]||'?'} bank=$${bm?.[1]||'?'}:$${bm?.[2]||'?'} A=$${am?.[1]||'?'}  ${l.trim().substring(0,120)}`);
  }
}
