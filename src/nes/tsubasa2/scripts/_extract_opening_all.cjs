// 提取 Opening 全部 CHR 配置（6 字节 × 32 项）与场景 3 tile 数据（48 字节）
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');

// bank7 CHR 指针表在 ROM 0xE010，每项 2 字节小端，共 32 项
const bank7Base = 0xE010;
const ptrTable = [];
for (let i = 0; i < 32; i++) {
  const off = bank7Base + i * 2;
  ptrTable.push(rom[off] | (rom[off + 1] << 8));
}

const configs = [];
for (let i = 0; i < 32; i++) {
  const cpuAddr = ptrTable[i];
  const romOff = bank7Base + (cpuAddr - 0xA000);
  const cfg = [];
  for (let j = 0; j < 6; j++) cfg.push(rom[romOff + j]);
  configs.push({ id: i, cpu: cpuAddr.toString(16), rom: romOff.toString(16), bytes: cfg });
}

console.log('// CHR 指针与配置');
console.log('export const OPENING_CHR_CONFIGS = [');
for (const c of configs) {
  console.log(`  /* 0x${c.id.toString(16).padStart(2, '0')} @$${c.cpu} */ [${c.bytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ')}],`);
}
console.log('];');

// 场景 3 tile 数据：$8920(3) 装载后，$8AF7(0x17) 跳过 6 字节配置，
// tile 数据在 $A379-$A3A8 = ROM 0xE389-0xE3B8（48 字节）
const scene3Tiles = [];
for (let i = 0; i < 48; i++) scene3Tiles.push(rom[0xE389 + i]);
console.log('\nexport const OPENING_SCENE3_TILES = [');
for (let r = 0; r < 8; r++) {
  const row = scene3Tiles.slice(r * 6, r * 6 + 6);
  console.log(`  ${r === 0 ? '[' : ' '}[${row.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ')}]${r === 7 ? ']' : ','}`);
}
console.log(';');
