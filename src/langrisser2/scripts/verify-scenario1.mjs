import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin'));

const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const hex = (v, w = 2) => '0x' + v.toString(16).toUpperCase().padStart(w, '0');

const TILE_NAMES = { 0: '平原', 1: '森林', 2: '山', 3: '水', 4: '墙', 5: '房间', 6: '宝箱', 7: '城堡', 8: '桥', 9: '沙漠', 10: '沼泽', 11: '教会', 12: '栅栏', 13: '废墟', 14: '深水', 15: '天空' };

// ==================== MAP ====================
const LEVEL = 0;
console.log('=== MAP (Scenario 1) ===');
const mapPtr = readU32(0x61CB0 + LEVEL * 4);
const w = (rom[mapPtr] << 8) | rom[mapPtr + 1];
const h = (rom[mapPtr + 2] << 8) | rom[mapPtr + 3];
console.log(`Dimensions: ${w}x${h}, ${w * h} tiles`);

// Remap (stride 8, corrected)
const r1p = readU32(0x61E24 + LEVEL * 8);
const r2p = readU32(0x61E28 + LEVEL * 8);
const remap1 = [], remap2 = [];
for (let i = 0; i < 16; i++) { remap1[i] = rom[r1p + i]; remap2[i] = rom[r2p + i]; }
console.log(`Remap1[0..3]: ${remap1.slice(0, 4).map(v => hex(v)).join(' ')}`);
console.log(`Remap2[0..3]: ${remap2.slice(0, 4).map(v => hex(v)).join(' ')}`);

// Tile type distribution (after remap)
const dist = {};
for (let i = 0; i < w * h; i++) {
  const raw = rom[mapPtr + 4 + i];
  const lo = raw & 0x0F, hi = (raw >> 4) & 0x0F;
  const rt = ((remap2[hi] ?? hi) << 4) | (remap1[lo] ?? lo);
  const tn = rt & 0x0F;
  dist[tn] = (dist[tn] || 0) + 1;
}
console.log('Tiles:', Object.entries(dist).sort((a, b) => a[0] - b[0]).map(([k, v]) => `${TILE_NAMES[k] || '?'}:${v}`).join(', '));

// ==================== UNITS ====================
console.log('\n=== UNITS (Scenario 1, stride=0x1E) ===');
const cfgPtr = readU32(0x18005E + LEVEL * 4) & 0xFFFFFF;
const ulPtr = readU32(cfgPtr + 0x0C) & 0xFFFFFF;
console.log(`Config ptr: ${hex(cfgPtr, 6)}, Unit list ptr: ${hex(ulPtr, 6)}`);

const STRIDE = 0x1E;
let off = 0, eu = 0;
while (ulPtr + off + STRIDE <= rom.length) {
  const a = ulPtr + off;
  const cls = rom[a + 0x1B], cmd = rom[a + 0x1A];
  if (cls === 0xFF || cmd === 0xFF) break;
  if (cls === 0 && cmd === 0) break;

  const x = rom[a + 0x18], y = rom[a + 0x19];
  const attr2 = readU32(a + 0x08);
  const isPlayer = (attr2 & 1) !== 0;
  const isNPC = (attr2 & 2) !== 0;
  let fac = 'enemy';
  if (isPlayer) fac = 'player';
  else if (isNPC) fac = 'NPC';

  const attr0 = readU32(a);
  const attr4 = readU32(a + 0x10);
  const hp = (attr4 >> 16) & 0xFF;
  const df = attr4 & 0xFF;

  console.log(`  [${eu}] cls=${hex(cls)} cmd=${hex(cmd)} x=${x} y=${y} fac=${fac} attr2=${hex(attr2, 8)} HP=${hp} DF=${df}`);
  eu++;
  off += STRIDE;
  if (eu > 20) break;
}
console.log(`Total: ${eu} units`);

// ==================== BOSS ====================
console.log('\n=== BOSS CONFIG ===');
const ba = 0x060600 + LEVEL * 8;
for (let i = 0; i < 4; i++) {
  const c = rom[ba + i * 2], l = rom[ba + i * 2 + 1];
  if (c === 0xFF || l === 0xFF) console.log(`  [${i}] (empty)`);
  else console.log(`  [${i}] class=${hex(c)} level=${l}`);
}

// ==================== SCENARIO CONFIG (128B) ====================
console.log('\n=== SCENARIO CONFIG (0x0821BE) ===');
const sPtr = readU32(0x0821BE + LEVEL * 4);
const segs = ['Player', 'AI_Special', 'NPC', 'Enemy'];
for (let s = 0; s < 4; s++) {
  const dwords = [];
  for (let d = 0; d < 8; d++) dwords.push(readU32(sPtr + s * 32 + d * 4));
  console.log(`  ${segs[s]}: [${dwords.map(v => hex(v, 8)).join(' ')}]`);
}

// ==================== TROOP MATRIX ====================
console.log('\n=== TROOP MATRIX (8x8) ===');
const T = ['步兵', '枪兵', '骑兵', '飞兵', '弓兵', '僧侣', '水兵', '魔物'];
const mat = Array.from({ length: 8 }, () => Array(8).fill(0));
let mo = 0;
for (let a = 0; a < 8; a++) {
  for (let d = a + 1; d < 8; d++) {
    if (0x060200 + mo >= rom.length) break;
    const v = rom[0x060200 + mo];
    if (v === 0xFF) { mo++; continue; }
    mat[a][d] = v; mat[d][a] = 5 - v; mo++;
  }
  if (rom[0x060200 + mo] === 0xFF) { mo++; if (rom[0x060200 + mo] === 0xFF) break; }
}
const L = { 1: '克', 2: '+', 3: '-', 4: '被', 0: '·' };
for (let a = 0; a < 8; a++) {
  let row = T[a].padEnd(4) + '|';
  for (let d = 0; d < 8; d++) row += L[mat[a][d]].padStart(3);
  console.log(`  ${row}`);
}

console.log('\nDone.');
