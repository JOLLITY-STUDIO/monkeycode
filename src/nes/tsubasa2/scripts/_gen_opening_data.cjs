// 生成 src/game/prg/data/scene/opening-data.ts 中的提取数据
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');

// bank7 基址 CPU $A000 = ROM 0xE010
const bank7Base = 0xE010;
const bank8Base = 0x11010; // PRG bank8 ($8AF7 读 pattern 的 bank)

// 1. CHR 指针表 32 项（bank7 $A000）
const ptrTable = [];
for (let i = 0; i < 32; i++) {
  const off = bank7Base + i * 2;
  ptrTable.push(rom[off] | (rom[off + 1] << 8));
}

// 2. CHR 配置 32 项（每项 6 字节）
const configs = [];
for (let i = 0; i < 32; i++) {
  const cpuAddr = ptrTable[i];
  const romOff = bank7Base + (cpuAddr - 0xA000);
  const cfg = [];
  for (let j = 0; j < 6; j++) cfg.push(rom[romOff + j]);
  configs.push(cfg);
}

// 3. 场景 3 tile 数据（$8920 装载，$8AF7 跳过 6B 配置后）
const scene3Width = configs[0x17][3];
const scene3Height = configs[0x17][4];
const scene3TileData = [];
for (let i = 0; i < scene3Width * scene3Height; i++) scene3TileData.push(rom[0xE389 + i]);

// 4. 场景 3 pattern 表（bank8 $A000 + tile*17；opening 用到 tile 0x00-0x21）
const tilePatterns = [];
for (let t = 0; t < 0x22; t++) {
  const off = bank8Base + t * 17;
  tilePatterns.push([...rom.slice(off, off + 17)]);
}

function fmtBytes(a) { return a.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', '); }
function fmtRows(a, n) {
  const lines = [];
  for (let i = 0; i < a.length; i += n) {
    lines.push('  ' + fmtBytes(a.slice(i, i + n)) + (i + n >= a.length ? '' : ','));
  }
  return lines.join('\n');
}

const out = [];
out.push(`/** 开场 CHR 配置（bank7，$8AF7 读取；32 项 × 6 字节） */`);
out.push(`export const OPENING_CHR_CONFIGS: readonly (readonly number[])[] = [`);
for (let i = 0; i < configs.length; i++) {
  out.push(`  /* 0x${i.toString(16).padStart(2, '0')} @$${ptrTable[i].toString(16)} */ [${fmtBytes(configs[i])}],`);
}
out.push(`];`);
out.push('');
out.push(`/** 场景 3 的 tile 数据（${scene3Width} 列 × ${scene3Height} 行 = ${scene3TileData.length} 字节，按行优先） */`);
out.push(`export const OPENING_SCENE3_TILES: readonly number[] = [`);
out.push(fmtRows(scene3TileData, scene3Width));
out.push(`];`);
out.push('');
out.push(`/** 场景 3 的 17 字节 pattern 表（bank8 $A000+tile*17；[0]=attr, [1..16]=4×4 nametable tile 索引） */`);
out.push(`export const OPENING_TILE_PATTERNS: readonly (readonly number[])[] = [`);
for (let t = 0; t < tilePatterns.length; t++) {
  out.push(`  /* 0x${t.toString(16).padStart(2, '0')} */ [${fmtBytes(tilePatterns[t])}],`);
}
out.push(`];`);

fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_opening_data_generated.txt', out.join('\n'), 'utf8');
console.log('generated _opening_data_generated.txt');
