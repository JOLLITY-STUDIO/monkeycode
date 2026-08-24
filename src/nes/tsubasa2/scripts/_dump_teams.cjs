const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);

// Player team section (verified correct)
console.log('=== PLAYER TEAMS ===');
console.log('SAOPAULO @ PRG 0x4A47:', [...prg.slice(0x4A47, 0x4A52)].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
console.log('NANKATSU @ PRG 0x4A53:', [...prg.slice(0x4A53, 0x4A5E)].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
console.log('ASIAN    @ PRG 0x4A5F:', [...prg.slice(0x4A5F, 0x4A6A)].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
console.log('ASIAN subs @ PRG 0x4A6A:', [...prg.slice(0x4A6A, 0x4A76)].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '));

console.log('\n=== CPU BLOCKS (12-byte stride) ===');

const blocks = [
  { name: 'Brazil (5)', start: 0x3BB1A, n: 5 },
  { name: 'Japan HS (6)', start: 0x3BB62, n: 6 },
  { name: 'Japan Cup (4)', start: 0x3BBB4, n: 4 },
  { name: 'World Cup (16)', start: 0x3BC0A, n: 16 },
];

for (const b of blocks) {
  console.log('\n' + b.name + ' @ PRG 0x' + b.start.toString(16).toUpperCase() + ':');
  for (let i = 0; i < b.n; i++) {
    const slots = [];
    for (let j = 0; j < 11; j++) slots.push(prg[b.start + i*12 + j]);
    const tactic = prg[b.start + i*12 + 11];
    console.log(`  Team ${i}: [${slots.map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' ')}] tactic=0x${tactic.toString(16).toUpperCase()}`);
  }
}

// Search for subs data after CPU teams - look around 0x3BCEE+ and 0x3BD00+
// Asian subs were 12 bytes @ 0x4A6A-0x4A75 — but that's the player team section
// For CPU teams subs might be at 0x3BCEE onwards or in a different table

console.log('\n=== SEARCH FOR CPU SUBS ===');
// Try common offsets
const probeOffsets = [0x3BCE0, 0x3BCEA, 0x3BCF0, 0x3BD00, 0x3BD10, 0x3BD20, 0x3BD30, 0x3BD40];
for (const off of probeOffsets) {
  const bytes = [...prg.slice(off, off + 16)];
  console.log('PRG 0x' + off.toString(16).toUpperCase() + ': ' + bytes.map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
}

// Maybe subs are part of CPU team bigger stride - try 24 bytes/team
console.log('\n=== CPU BLOCKS (24-byte stride) ===');
for (const off of [0x3BB1A, 0x3BB40, 0x3BB70, 0x3BBA0, 0x3BC00]) {
  console.log('PRG 0x' + off.toString(16).toUpperCase() + ': ' + [...prg.slice(off, off + 32)].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
}
