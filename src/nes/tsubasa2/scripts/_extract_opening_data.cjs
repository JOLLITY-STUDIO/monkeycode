// 提取 Opening 所需数据 → 生成 src/game/prg/data/scene/opening-data.ts
// 数据源：docs/roms/Captain Tsubasa II - Super Striker (Japan).nes（与 asm 逐字节一致）
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const outPath = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'scene', 'opening-data.ts');
const buf = fs.readFileSync(romPath);

function hex(v) { return '0x' + v.toString(16).toUpperCase().padStart(2, '0'); }
function bytes(off, len) {
  const a = [];
  for (let i = 0; i < len; i++) a.push(buf[off + i]);
  return a;
}

// ── bank00 $9EA2 渐显查找表（64 字节）→ ROM 0x1EB2 ──
const fade = bytes(0x1eb2, 64);

// ── bank06 BG 调色板表 CPU $B000（16 × 16 字节）→ ROM 0xD010 ──
const bgPal = [];
for (let p = 0; p < 16; p++) bgPal.push(bytes(0xd010 + p * 16, 16));
// ── bank06 SPR 调色板表 CPU $B300（16 × 16 字节）→ ROM 0xD310 ──
const sprPal = [];
for (let p = 0; p < 16; p++) sprPal.push(bytes(0xd310 + p * 16, 16));
// ── bank06 场景表 CPU $BF00（16 × 19 字节）→ ROM 0xDF10 ──
const scene = [];
for (let s = 0; s < 16; s++) scene.push(bytes(0xdf10 + s * 19, 19));
// ── bank07 CHR 指针表 CPU $A000（前 32 项 16-bit 指针）→ ROM 0xE010 ──
const chrPtr = [];
for (let i = 0; i < 32; i++) chrPtr.push(buf[0xe010 + i * 2] | (buf[0xe010 + i * 2 + 1] << 8));

const lines = [];
lines.push('/**');
lines.push(' * Opening 开场数据表（声明式，来源：bank06/bank07/bank00 的 .byte 数据区）');
lines.push(' *');
lines.push(' * 地址对照：');
lines.push(' *   bank06 场景表  CPU $BF00（$8920 场景装载，19 字节/项 × 16 项）');
lines.push(' *   bank06 BG 调色板 CPU $B000（$9AB8 读取，16 组 × 16 字节）');
lines.push(' *   bank06 SPR 调色板 CPU $B300（$9ADA 读取，16 组 × 16 字节）');
lines.push(' *   bank07 CHR 指针表 CPU $A000（$8AF7 读取，16-bit 指针 × 32 项）');
lines.push(' *   bank00 渐显查找表 CPU $9EA2（$9AA2 读取，64 字节）');
lines.push(' */');
lines.push('');
lines.push('/** 场景数据项：$0079=文本滚动标志；$007C..$008D=滚动计数器等（$8920 拷贝目标） */');
lines.push('export interface OpeningSceneEntry {');
lines.push('  /** 场景号 0-15 */');
lines.push('  readonly id: number;');
lines.push('  /** $0079 文本滚动标志/位置 */');
lines.push('  readonly scrollFlag: number;');
lines.push('  /** 18 字节 → ram_007C..ram_008D */');
lines.push('  readonly data: readonly number[];');
lines.push('}');
lines.push('');
lines.push('/**');
lines.push(' * bank06 场景表（CPU $BF00）。');
lines.push(' * 原版 $8920：$00EC = $BF00 + 场景号*19；[0]→ram_0079，[1..18]→ram_007C..ram_008D。');
lines.push(' */');
lines.push('export const OPENING_SCENE_TABLE: readonly OpeningSceneEntry[] = [');
scene.forEach((s, id) => {
  const d = s.slice(1).map(hex).join(', ');
  lines.push(`  { id: ${id}, scrollFlag: ${hex(s[0])}, data: [${d}] },`);
});
lines.push('];');
lines.push('');
lines.push('/**');
lines.push(' * bank06 BG 调色板表（CPU $B000，16 组 × 16 字节）。');
lines.push(' * 原版 $9AB8：BG = $B000 + $0048*16 → ram_062A（16 字节）。');
lines.push(' * 索引 0x0F=透明，0x30=黑；为 NES 原始 6-bit 色值。');
lines.push(' */');
lines.push('export const OPENING_BG_PALETTES: readonly (readonly number[])[] = [');
bgPal.forEach((p, i) => { lines.push(`  [${p.map(hex).join(', ')}], // ${i}`); });
lines.push('];');
lines.push('');
lines.push('/**');
lines.push(' * bank06 SPR 调色板表（CPU $B300，16 组 × 16 字节）。');
lines.push(' * 原版 $9ADA：SPR = $B300 + $0049*16 → ram_063A（16 字节）。');
lines.push(' */');
lines.push('export const OPENING_SPR_PALETTES: readonly (readonly number[])[] = [');
sprPal.forEach((p, i) => { lines.push(`  [${p.map(hex).join(', ')}], // ${i}`); });
lines.push('];');
lines.push('');
lines.push('/**');
lines.push(' * bank07 CHR 指针表（CPU $A000，32 项 16-bit 指针）。');
lines.push(' * 原版 $8AF7：ptr = [$A000 + 集合号*2]；ptr 指向该集合的 6 字节 CHR 配置。');
lines.push(' * 开场使用集合 0x17（第 24 项）。');
lines.push(' */');
lines.push('export const OPENING_CHR_POINTER_TABLE: readonly number[] = [');
for (let i = 0; i < 32; i++) lines.push(`  ${hex(chrPtr[i])}, // ${i.toString(16)}`);
lines.push('];');
lines.push('');
lines.push('/**');
lines.push(' * bank00 渐显查找表（CPU $9EA2，64 字节）。');
lines.push(' * 原版 $9A71/$9AA2：new = $9EA2[(pal & 0x30) + fade] | (pal & 0x0F)。');
lines.push(' * fade=15 满渐显 → 高半字节回原色；fade=0 → 0x0F（黑）。');
lines.push(' */');
lines.push('export const OPENING_FADE_TABLE: readonly number[] = [');
for (let i = 0; i < 64; i += 8) lines.push('  ' + fade.slice(i, i + 8).map(hex).join(', ') + ',');
lines.push('];');
lines.push('');
fs.writeFileSync(outPath, lines.join('\n'));
console.log('written: ' + outPath);
console.log('fade table: ' + fade.map(hex).join(' '));
console.log('scene3: ' + scene[3].map(hex).join(' '));
console.log('chrPtr[0x17]: ' + hex(chrPtr[0x17]));
