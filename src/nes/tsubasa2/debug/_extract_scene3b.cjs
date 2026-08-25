// 提取 Scene3 动画数据 (v6) - 修正 Y 步长 2 的 $8464 模拟
const fs = require('fs');
const path = require('path');
const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM_PATH);
const PRG_BASE = 16;
// MMC3 8KB bank B → ROM offset B*0x2000
function p8(b, off) { return rom[PRG_BASE + b * 0x2000 + (off & 0x1fff)]; }
// bank0 16KB（CPU $8000-$9FFF）= ROM offset 0x0000 起的 16KB
function p0(addr) { return rom[PRG_BASE + (addr - 0x8000)]; }
function hex(n, w = 2) { return n.toString(16).toUpperCase().padStart(w, '0'); }

// ---- $8AEC / $8AED / $8AEE 三个表（CPU 地址，bank0）----
console.log('=== $8AEC/$8AED/$8AEE 场景表 (Y 步长 2) ===');
for (let y = 2; y < 0x40; y += 2) {
  const base = p0(0x8AEC + y);
  const bnk = p0(0x8AED + y);
  const bnd = p0(0x8AEE + y);
  if (base === 0 && bnk === 0 && bnd === 0) break;
  console.log(`  Y=${y}: base=$${hex(base)} bank=${bnk} bound=$${hex(bnd)}`);
}

// ---- 模拟 $8464 ----
function sim(scene) {
  let y = 0;
  y += 2;
  while (scene >= p0(0x8AEE + y)) y += 2;
  const base = p0(0x8AEC + y);
  const bnk = p0(0x8AED + y);
  let sc = (scene - base) & 0xff;
  const doubled = (sc << 1) & 0x1ff;
  const lo = doubled & 0xff;
  const hi = (0xa0 + ((doubled >> 8) & 1)) & 0xff;
  const cpuAddr = (hi << 8) | lo;
  return { y, base, bnk, sc, lo, hi, cpuAddr };
}

console.log('\n=== $8464 模拟 (scene 0..8) ===');
for (let s = 0; s <= 8; s++) {
  const r = sim(s);
  const pLo = p8(r.bnk, r.cpuAddr);
  const pHi = p8(r.bnk, r.cpuAddr + 1);
  const ptr = (pHi << 8) | pLo;
  console.log(`  scene ${s}: Y=${r.y} base=$${hex(r.base)} bank=${r.bnk} sc'=$${hex(r.sc)} ptr@$${hex(r.cpuAddr,4)} → $${hex(ptr,4)}`);
  if (s === 3) {
    // 打印指针后的流前 64 字节
    const off = ptr & 0x1fff;
    const bytes = [];
    for (let k = 0; k < 64; k++) bytes.push(hex(p8(r.bnk, off + k)));
    console.log(`    stream: ${bytes.join(' ')}`);
  }
}
