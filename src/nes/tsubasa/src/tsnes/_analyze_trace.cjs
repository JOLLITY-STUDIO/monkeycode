const fs = require('fs');
const f = 'D:/studio/github/monkeycode/src/nes/tsubasa/src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan) - 副本开场到reset显示logo.log';
const d = fs.readFileSync(f, 'utf8');
const lines = d.split('\n');
console.log('TOTAL LINES:', lines.length);
console.log('');

// --- 1. Find bank switches (MMC3 writes to $8000/$8001) ---
console.log('=== BANK SWITCHES (MMC3 $8000/$8001) ===');
let lastMode = '', lastPage = 0;
lines.forEach((l, i) => {
  const m = l.match(/\$([0-9A-F]{4}):\s*([0-9A-F]{2})\s+STA\s+\$800[01]/i);
  if (m) {
    const addr = parseInt(m[1], 16);
    const val = parseInt(m[2], 16);
    if (addr === 0x8000) {
      const mode = val & 0x07;
      const type = (val & 0x40) ? 'WRITE' : 'READ';
      lastMode = `mode${mode}_${type}`;
    } else if (addr === 0x8001) {
      console.log(`  line ${i + 1}: ${lastMode} → page ${val}`);
      lastPage = val;
    }
  }
});

// --- 2. Find $0700 writes (game mode changes) ---
console.log('\n=== GAME MODE ($0700) WRITES ===');
lines.forEach((l, i) => {
  const m = l.match(/STA\s+\$0700\s*.*=\s*#\$([0-9A-F]{2})/i);
  if (m) console.log(`  line ${i + 1}: $0700 = 0x${m[1]}`);
});

// --- 3. Find key scene/script addresses ---
console.log('\n=== KEY ADDRESS WRITES ===');
const keys = {
  0x0027: 'SUB_STATE',
  0x0628: 'SCENE_ID?',
  0x0629: 'SCENE_FLAGS?',
  0x04A0: 'CURSOR?',
  0x04A1: 'MENU?',
  0x0040: 'NMISCAN?',
};
lines.forEach((l, i) => {
  for (const [addr, name] of Object.entries(keys)) {
    const hex = parseInt(addr).toString(16).toUpperCase();
    if (l.match(new RegExp(`STA\\s+\\$${hex}\\s*.*=\\s*#\\$`, 'i'))) {
      const m2 = l.match(/#\$([0-9A-F]{2})/);
      if (m2) console.log(`  line ${i + 1}: ${name} ($${hex}) = 0x${m2[1]}`);
    }
  }
});

// --- 4. Find bytecode execution pattern ---
console.log('\n=== BYTECODE EXECUTOR ($9B28 area) CALLS ===');
lines.forEach((l, i) => {
  if (l.includes('JSR $9B28') || l.includes('JSR $9B5E') || l.includes('JMP $9B28')) {
    console.log(`  line ${i + 1}: ${l.trim().substring(0, 100)}`);
  }
});

// --- 5. Show first 200 lines decoded ---
console.log('\n=== FIRST 50 LINES (decoded) ===');
for (let i = 0; i < 50; i++) {
  const l = lines[i];
  // Extract: f10, A:XX, code addr, instruction
  const m = l.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):\s*(.+)$/);
  if (m) {
    const bank = parseInt(m[1], 16);
    const pc = parseInt(m[2], 16);
    const instr = m[3].trim();
    console.log(`  bank=0x${bank.toString(16)} pc=$${pc.toString(16).padStart(4,'0')}  ${instr.substring(0, 60)}`);
  }
}

// --- 6. Show last 20 lines ---
console.log('\n=== LAST 20 LINES ===');
lines.slice(-20).forEach(l => console.log('  ' + l.substring(0, 120)));

// --- 7. Count by bank ---
console.log('\n=== BANK USAGE STATS ===');
const bankCounts = {};
lines.forEach(l => {
  const m = l.match(/^\w+\s+[^$]+\$([0-9A-F]{2}):/);
  if (m) {
    const b = parseInt(m[1], 16);
    bankCounts[b] = (bankCounts[b] || 0) + 1;
  }
});
Object.entries(bankCounts).sort((a,b) => b[1] - a[1]).forEach(([b, c]) => {
  console.log(`  bank 0x${parseInt(b).toString(16).padStart(2, '0')}: ${c} frames`);
});
