// 提取 Scene3 数据 (v5) - 验证场景表
const fs = require('fs');
const path = require('path');
const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM_PATH);
function bank(n) { return 16 + n * 16384; }
function rb(b, a) { return rom[bank(b) + a]; }
function hex(n, w = 2) { return n.toString(16).toUpperCase().padStart(w, '0'); }
function dump(b, addr, count, label = '') {
  const out = [];
  for (let i = 0; i < count; i++) {
    if (i % 16 === 0) out.push(`\n  ${label}bank${b} [${hex(addr + i, 4)}]: `);
    out.push(hex(rb(b, addr + i)) + ' ');
  }
  console.log(out.join(''));
}

console.log('=== bank0 $8AC0-$8B20 (场景表原始区) ===');
dump(0, 0x8AC0, 0x60);

// 模拟 $8464: LDY #0; INY; INY; 循环 { CMP $8AEE,Y; BCS loop }; SBC $8AEC,Y; LDX $8AED,Y; ASL; ADC #0; STA $4D; LDA #0; ADC #$A0; STA $4E
function sim(scene) {
  let y = 2;
  while (scene >= rb(0, 0x8AEE + y)) y++;
  const base = rb(0, 0x8AEC + y);
  const bnk = rb(0, 0x8AED + y);
  let sc = (scene - base) & 0xff;
  let a = sc << 1;
  let c = (a > 0xff) ? 1 : 0;
  a &= 0xff;
  a += 0; a &= 0xff;
  const lo = a;
  const hi = (0xa0 + c) & 0xff;
  return { y, base, bnk, sc, lo, hi, cpuAddr: (hi << 8) | lo };
}

console.log('\n=== $8464 模拟 (scene 0..8) ===');
for (let s = 0; s <= 8; s++) {
  const r = sim(s);
  console.log(`  scene ${s}: Y=${r.y} base=$${hex(r.base)} bank=${r.bnk} sc'=$${hex(r.sc)} ptr=$${hex(r.cpuAddr, 4)}`);
}

// 读取 scene 0 的指针 (验证 Tecmo logo)
console.log('\n=== 各 scene 指针 (bank 内) ===');
for (let s = 0; s <= 6; s++) {
  const r = sim(s);
  const pLo = rb(r.bnk, (r.cpuAddr & 0x3fff));
  const pHi = rb(r.bnk, (r.cpuAddr & 0x3fff) + 1);
  console.log(`  scene ${s}: bank${r.bnk} $${hex(r.cpuAddr,4)} → ptr $${hex(pLo | (pHi << 8), 4)}`);
}
