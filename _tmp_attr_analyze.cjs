const fs = require('fs');

const ROM_PATH = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes';
const DATA_PATH = 'src/nes/tsubasa/data/_player_data.json';

const rom = fs.readFileSync(ROM_PATH);
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

const HEADER = 16;
const BANK = 16384;
const ADDR_OFF = 0x8000;

function romAt(bank, addr) {
  return HEADER + bank * BANK + (addr - ADDR_OFF);
}

// ====== 1. Verify Tsubasa's (ptrIndex 60) attr block in ROM ======
console.log('=== Tsubasa (ptrIndex 60) data locations ===');
const ptr60 = data.pointerTable[60];
const attrAddr = ptr60.addr;
const romOff = romAt(0x0C, attrAddr);
console.log(`pointerTable[60]: lo=${ptr60.lo} hi=${ptr60.hi} addr=0x${attrAddr.toString(16).toUpperCase()}`);
console.log(`ROM offset: 0x${romOff.toString(16).toUpperCase()} = ${romOff}`);

// Read attr block (header 3 + body up to 0x00, max 32)
const header = Array.from(rom.slice(romOff, romOff + 3));
let body = [];
for (let i = 0; i < 32; i++) {
  const b = rom[romOff + 3 + i];
  if (b === 0) break;
  body.push(b);
}
console.log(`Header: [${header.join(', ')}] (0x${header.map(b=>b.toString(16).padStart(2,'0')).join(' ')})`);
console.log(`Body (${body.length}B): [${body.join(', ')}]`);
console.log(`Body hex: ${body.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);

// ====== 2. Dump ALL players' attr blocks with context ======
console.log('\n=== All 80 ptrIndex: ptr addr + attr block dump ===');
const players = [];

// Map roster matches to find which players are in which matches
const ptrIndexToMatches = {};
for (let mi = 0; mi < data.rosterMatches.length; mi++) {
  const m = data.rosterMatches[mi];
  for (const pid of [...m.teamA, ...m.teamB]) {
    if (!ptrIndexToMatches[pid]) ptrIndexToMatches[pid] = [];
    if (!ptrIndexToMatches[pid].includes(mi + 1)) ptrIndexToMatches[pid].push(mi + 1);
  }
}

for (let i = 0; i < 80; i++) {
  const p = data.pointerTable[i];
  if (!p || p.addr < 0x8000 || p.addr >= 0xC000) continue;
  
  // For Bank 0C attrs
  const ro = romAt(0x0C, p.addr);
  const hdr = Array.from(rom.slice(ro, ro + 3));
  let bd = [];
  for (let j = 0; j < 32; j++) {
    const bb = rom[ro + 3 + j];
    if (bb === 0) break;
    bd.push(bb);
  }
  
  // Get statBlock05 record
  const s5 = data.statBlock05?.records?.[i] || [];
  const s3 = data.statBlock03?.records?.[i] || [];
  const cls = data.classTypeTable?.[i] || -1;
  const matches = ptrIndexToMatches[i] || [];
  
  const entry = {
    ptrIndex: i,
    attrAddr: p.addr,
    header,
    body: bd,
    statBlock05: s5,
    statBlock03: s3,
    classType: cls,
    matches,
  };
  players.push(entry);
}

// Print all
for (const p of players) {
  const hhex = p.header.map(b => b.toString(16).padStart(2,'0')).join(' ');
  const bhex = p.body.map(b => b.toString(16).padStart(2,'0')).join(' ');
  console.log(`ptr[${String(p.ptrIndex).padStart(2)}] addr=0x${p.attrAddr.toString(16).padStart(4,'0')} cls=${String(p.classType).padStart(3)} hdr=[${hhex}] body(${p.body.length}B): ${bhex || '(empty)'} | s5=[${p.statBlock05.join(',')}] | s3=[${p.statBlock03.join(',')}] | matches: [${p.matches.join(',')}]`);
}

// ====== 3. Group by header pattern ======
console.log('\n=== Grouped by header pattern ===');
const groups = {};
for (const p of players) {
  const key = p.header.join(',');
  if (!groups[key]) groups[key] = { header: p.header, hex: p.header.map(b => b.toString(16).padStart(2,'0')).join(' '), ptrIndices: [], bodies: [], s5s: [], s3s: [] };
  groups[key].ptrIndices.push(p.ptrIndex);
  groups[key].bodies.push(p.body);
  groups[key].s5s.push(p.statBlock05);
  groups[key].s3s.push(p.statBlock03);
}

for (const [key, g] of Object.entries(groups)) {
  console.log(`\nHeader ${g.hex}: ${g.ptrIndices.length} players (ptrIndices: [${g.ptrIndices.join(',')}])`);
  // Show unique bodies
  const uniqueBodies = [];
  const bmap = new Map();
  for (let i = 0; i < g.bodies.length; i++) {
    const bkey = g.bodies[i].join(',');
    if (!bmap.has(bkey)) {
      bmap.set(bkey, g.bodies[i]);
      uniqueBodies.push({ body: g.bodies[i], ptrIndex: g.ptrIndices[i] });
    }
  }
  for (const ub of uniqueBodies) {
    const bhex = ub.body.map(b => b.toString(16).padStart(2,'0')).join(' ');
    console.log(`  ptr[${ub.ptrIndex}]: body(${ub.body.length}B): ${bhex || '(empty)'}`);
    const p = players.find(x => x.ptrIndex === ub.ptrIndex);
    if (p) console.log(`    s5=[${p.statBlock05.join(',')}] s3=[${p.statBlock03.join(',')}] cls=${p.classType} matches=${p.matches.join(',')}`);
  }
}

// ====== 4. On-screen stat analysis: compare body bytes against known displayed values ======
console.log('\n=== Body byte value distribution (all attr blocks) ===');
const bodyBytes = [];
for (const p of players) {
  for (const b of p.body) bodyBytes.push(b);
}
const freq = {};
for (const b of bodyBytes) { freq[b] = (freq[b] || 0) + 1; }
const sorted = Object.entries(freq)
  .sort((a, b) => Number(a[0]) - Number(b[0]))
  .filter(([k]) => Number(k) >= 0x80);
console.log('Bytes >= 0x80 (command bytes?):');
for (const [k, v] of sorted) {
  console.log(`  0x${Number(k).toString(16).padStart(2,'0')} (${k}): ${v}x`);
}

// Below 0x80
console.log('\nBytes < 0x80 (parameter bytes?):');
const sorted2 = Object.entries(freq)
  .sort((a, b) => Number(a[0]) - Number(b[0]))
  .filter(([k]) => Number(k) < 0x80);
for (const [k, v] of sorted2) {
  console.log(`  0x${Number(k).toString(16).padStart(2,'0')} (${k}): ${v}x`);
}
