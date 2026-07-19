import { readFileSync } from 'fs';

const cdl = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-prg-not-logged-15.13.cdl');
const prg = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-prg-not-logged-15.13_prg.bin');
const BANK_SIZE = 0x4000; // 16KB per bank
const BANKS = cdl.length / BANK_SIZE;

console.log(`CDL ${cdl.length} bytes, PRG ${prg.length} bytes, ${BANKS} banks`);

const totals = { code: 0, data: 0, unvisited: 0 };
for (let i = 0; i < cdl.length; i++) {
  const v = cdl[i];
  if (v === 1) totals.code++;
  else if (v === 2) totals.data++;
  else totals.unvisited++;
}
console.log(`\nOverall: code=${totals.code} (${(totals.code/cdl.length*100).toFixed(1)}%) data=${totals.data} (${(totals.data/cdl.length*100).toFixed(1)}%) unvisited=${totals.unvisited}`);

// Per-bank breakdown
console.log(`\nPer Bank (BANK_SIZE=${BANK_SIZE} 即 16KB):`);
console.log(`Bank  PRG_offs  code_bytes  data_bytes  unvisited`);
for (let b = 0; b < BANKS; b++) {
  const start = b * BANK_SIZE;
  let code = 0, data = 0, unv = 0;
  for (let i = start; i < start + BANK_SIZE; i++) {
    const v = cdl[i];
    if (v === 1) code++;
    else if (v === 2) data++;
    else unv++;
  }
  const codePct = (code / BANK_SIZE * 100).toFixed(1);
  const dataPct = (data / BANK_SIZE * 100).toFixed(1);
  console.log(`  $${b.toString(16).padStart(2,'0')}  $${(start).toString(16).padStart(5,'0')}  ${code.toString().padStart(8)}(${codePct}%) ${data.toString().padStart(8)}(${dataPct}%) ${unv}`);
}

// Find data-only banks (mostly data)
console.log(`\n── Data-dominant banks (>50% data) ──`);
for (let b = 0; b < BANKS; b++) {
  const start = b * BANK_SIZE;
  let code = 0, data = 0;
  for (let i = start; i < start + BANK_SIZE; i++) {
    const v = cdl[i];
    if (v === 1) code++;
    else if (v === 2) data++;
  }
  if (data > BANK_SIZE * 0.5) {
    console.log(`  Bank $${b.toString(16)}: data=${data} (${(data/BANK_SIZE*100).toFixed(1)}%) code=${code}`);
  }
}

// Find large contiguous data blocks
console.log(`\n── Large data blocks (>256 consecutive bytes) ──`);
let inBlock = false;
let blockStart = 0;
let blockType = 0;
let blocks = [];
for (let i = 0; i < cdl.length; i++) {
  const v = cdl[i];
  if (!inBlock && (v === 2)) {
    inBlock = true;
    blockStart = i;
    blockType = v;
  } else if (inBlock && v !== blockType) {
    blocks.push({ start: blockStart, end: i - 1, len: i - blockStart, type: blockType === 1 ? 'code' : 'data' });
    if (v === 1 || v === 2) {
      blockStart = i;
      blockType = v;
      inBlock = true;
    } else {
      inBlock = false;
    }
  }
}
if (inBlock) blocks.push({ start: blockStart, end: cdl.length - 1, len: cdl.length - blockStart, type: blockType === 1 ? 'code' : 'data' });

const largeData = blocks.filter(b => b.type === 'data' && b.len >= 256).sort((a, b) => b.len - a.len);
console.log(`Found ${largeData.length} data blocks >= 256 bytes`);
for (const blk of largeData.slice(0, 20)) {
  const bank = Math.floor(blk.start / BANK_SIZE);
  const offs = blk.start % BANK_SIZE;
  console.log(`  Bank $${bank.toString(16)} +$${offs.toString(16)} len=$${blk.len.toString(16)} (${blk.len} bytes)`);
}

// Heuristic: find blocks that look like nametables (960 bytes)
console.log(`\n── Data blocks matching common sizes ──`);
const targetSizes = [
  { name: 'Nametable', size: 960 },
  { name: 'AttrTable', size: 64 },
  { name: 'Palette', size: 32 },
  { name: 'Palette16', size: 16 },
  { name: 'OAM page', size: 256 },
];
for (const blk of blocks.filter(b => b.type === 'data')) {
  for (const t of targetSizes) {
    if (blk.len === t.size) {
      const bank = Math.floor(blk.start / BANK_SIZE);
      const offs = blk.start % BANK_SIZE;
      console.log(`  ${t.name} -> Bank $${bank.toString(16)} +$${offs.toString(16)}`);
    }
  }
}
