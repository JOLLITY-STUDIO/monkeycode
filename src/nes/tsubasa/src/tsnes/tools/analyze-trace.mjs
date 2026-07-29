// analyze-trace.mjs — Extract key info from NES opening trace log
import { readFileSync, writeFileSync } from 'fs';

const LOG = process.argv[2] || 'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log';
const raw = readFileSync(LOG, 'utf8');
const lines = raw.split('\n');
console.log(`Total lines: ${lines.length.toLocaleString()}`);

// ── 1. Extract unique banks executing at $8000-$BFFF ──
const codeBanks = new Set();
const bankTimeline = []; // {frame, bank, addr, instruction}
lines.forEach((l) => {
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})\b/);
  if (!m) return;
  const bank = parseInt(m[1], 16);
  const addr = parseInt(m[2], 16);
  if (addr >= 0x8000 && addr < 0xC000) {
    codeBanks.add(bank);
  }
});

console.log('\n=== Banks executing code in $8000-$BFFF ===');
[...codeBanks].sort((a,b)=>a-b).forEach(b => {
  console.log(`  Bank $${b.toString(16).padStart(2,'0').toUpperCase()} — 0x${b.toString(16)}`);
});

// ── 2. Extract bank switch events (STA $8000 / STA $8001) — actual register writes ──
console.log('\n=== First 100 bank switch events ===');
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 100; i++) {
  const l = lines[i];
  // Match STA $8000 or STA $8001
  if (/STA\s+\$800[01]\b/.test(l)) {
    const bankMatch = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
    const valMatch = l.match(/A:([0-9A-Fa-f]+)/);
    const frameMatch = l.match(/^f(\d+)/);
    const regMatch = l.match(/STA\s+(\$800[01])/);
    if (bankMatch && valMatch && regMatch) {
      cnt++;
      const is8000 = regMatch[1] === '$8000';
      const val = parseInt(valMatch[1], 16);
      // If STA $8000 with bit 7 set (=1xxxxxxx), it's mode select (bits 6,0,1,7...)
      // If bit 7 clear (=0xxxxxxx), it's bank select
      let info = '';
      if (is8000) {
        if (val & 0x80) info = `MODE: PRG=${(val>>6)&1} CHR=${(val)&1} R=${(val>>7)&1}`;
        else info = `BANK_SEL: reg=${val&7}`;
      } else {
        info = `BANK_DATA: val=$${val.toString(16)}`;
      }
      console.log(`  #${i+1} f=${frameMatch?.[1]||'?'} $${bankMatch[1]}:$${bankMatch[2]}  ${regMatch[1]} = $${valMatch[1].padStart(2,'0')}  ← ${info}`);
    }
  }
}

// ── 3. Frame-by-frame bank activity summary ──
console.log('\n=== Frame → Bank activity ($8000-$BFFF) ===');
let lastFrame = -1;
let frameBanks = new Set();
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const m = l.match(/^f(\d+)\s+.*\$\$?([0-9A-Fa-f]+):([0-9A-Fa-f]{4})\b/);
  if (!m) continue;
  const frame = parseInt(m[1], 10);
  const bank = parseInt(m[2], 16);
  const addr = parseInt(m[3], 16);
  if (addr < 0x8000 || addr >= 0xC000) continue;
  
  if (frame !== lastFrame) {
    if (lastFrame >= 0 && frameBanks.size > 0) {
      const banks = [...frameBanks].sort((a,b)=>a-b);
      if (banks.length <= 3) {
        console.log(`  f${lastFrame}: banks [${banks.map(b=>'$'+b.toString(16).padStart(2,'0')).join(', ')}]`);
      }
    }
    lastFrame = frame;
    frameBanks = new Set();
  }
  frameBanks.add(bank);
  if (frame > 3000) break; // only scan first 3000 frames
}
// last frame
if (frameBanks.size > 0) {
  const banks = [...frameBanks].sort((a,b)=>a-b);
  console.log(`  f${lastFrame}: banks [${banks.map(b=>'$'+b.toString(16).padStart(2,'0')).join(', ')}]`);
}

// ── 4. First / last lines of trace ──
console.log('\n=== Trace boundaries ===');
console.log('FIRST:', lines[0]);
console.log('LAST:', lines[lines.length - 1]);

// ── 5. JSR temporal scan: first 50 cross-bank calls ──
console.log('\n=== First 50 JSR from $8000-$BFFF (bank→target) ===');
let jsrCnt = 0;
for (let i = 0; i < lines.length && jsrCnt < 50; i++) {
  const l = lines[i];
  if (!l.includes('JSR')) continue;
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) continue;
  const bank = parseInt(m[1], 16);
  const from = parseInt(m[2], 16);
  if (from < 0x8000 || from >= 0xC000) continue;
  const jam = l.match(/JSR\s+\$([0-9A-Fa-f]+)/);
  if (!jam) continue;
  jsrCnt++;
  console.log(`  #${i+1} bank=$${m[1].padStart(2,'0')}  $${from.toString(16).padStart(4,'0')} → JSR $${jam[1]}  ${l.trim().substring(0,100)}`);
}

// ── 6. NMI / IRQ entries ──
console.log('\n=== First 30 NMI/IRQ/RTI entries ===');
let evCnt = 0;
for (let i = 0; i < lines.length && evCnt < 30; i++) {
  const l = lines[i];
  if (/RTI\b/.test(l)) {
    evCnt++;
    console.log(`  #${i+1} RTI: ${l.trim().substring(0,120)}`);
  }
}

console.log('\n=== DONE ===');
