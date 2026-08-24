/**
 * gen_bank67.js — 把 bank06/bank07 的 .byte 数据拆解到 data/scene/bank{6,7}/
 *
 * 命名风格沿袭 audio/bgm/bgm-NN.ts：声明式常量，每项一个命名文件。
 *
 * bank06 数据布局（CPU）：
 *   $A000-$A00B  6 项脚本指针
 *   $A00C-$A5E7  6 段脚本流（变长）
 *   $A5E8-$AFFF  0xFF 填充
 *   $B000-$B0FF  BG 调色板（16 组 × 16）
 *   $B300-$B3FF  SPR 调色板（16 组 × 16）
 *   $B800-$BB40  二级指针表 + NT/tile 数据（扩展用，按段分区）
 *   $BB40-$BFFF  同上
 *   $BF00-$BFFF  场景表（10 项 × 19 实际 + 6 项 0xFF 哨兵 = 16 项 × 19）
 *
 * bank07 数据布局（CPU）：
 *   $A000-$A0D3  106 项 CHR 指针表（212 字节）
 *   $A0D4-$BFFF  106 个 CHR config（每个 6 字节 header + tile stream）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_SCENE = path.join(ROOT, 'src/game/prg/data/scene');
const BANK6_DIR = path.join(OUT_SCENE, 'bank6');
const BANK6_SCRIPTS = path.join(BANK6_DIR, 'scripts');
const BANK7_DIR = path.join(OUT_SCENE, 'bank7');
const BANK7_CFGS = path.join(BANK7_DIR, 'configs');

// ---------- helpers ----------
function parseAsmBytes(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const bytes = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/\.byte\s+(.+)$/i);
    if (!m) continue;
    const parts = m[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const p of parts) {
      let v;
      if (p.startsWith('$')) v = parseInt(p.slice(1), 16);
      else if (/^0x/i.test(p)) v = parseInt(p.slice(2), 16);
      else v = parseInt(p, 16);
      if (!Number.isNaN(v)) bytes.push(v & 0xff);
    }
  }
  return new Uint8Array(bytes);
}

function concat(...arrs) {
  const total = arrs.reduce((s, a) => s + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrs) { out.set(a, off); off += a.length; }
  return out;
}
function readU16LE(buf, off) { return buf[off] | (buf[off + 1] << 8); }
function fmtHex(b) { return '0x' + b.toString(16).toUpperCase().padStart(2, '0'); }
function fmtHex2(w) { return '0x' + w.toString(16).toUpperCase().padStart(4, '0'); }
function fmtHexList(arr, line = 12) {
  if (!arr || arr.length === 0) return '';
  const lines = [];
  for (let i = 0; i < arr.length; i += line) {
    const slice = arr.slice(i, i + line);
    lines.push('  ' + slice.map(fmtHex).join(', ') + (i + line < arr.length ? ',' : ''));
  }
  return lines.join('\n');
}
function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

// ---------- load banks ----------
const bank06 = concat(
  parseAsmBytes(path.join(ROOT, 'src/asm/bank06/data_tables.s')),
  parseAsmBytes(path.join(ROOT, 'src/asm/bank06/data_maps.s')),
  parseAsmBytes(path.join(ROOT, 'src/asm/bank06/data_tail.s'))
);
const bank07 = concat(
  parseAsmBytes(path.join(ROOT, 'src/asm/bank07/data_tables.s')),
  parseAsmBytes(path.join(ROOT, 'src/asm/bank07/data_maps.s')),
  parseAsmBytes(path.join(ROOT, 'src/asm/bank07/data_tail.s'))
);
if (bank06.length !== 8192) throw new Error('bank06 size != 8192: ' + bank06.length);
if (bank07.length !== 8192) throw new Error('bank07 size != 8192: ' + bank07.length);
console.log('bank06=' + bank06.length + ' bank07=' + bank07.length);

// =====================================================================
// bank06
// =====================================================================
ensureDir(BANK6_DIR);
ensureDir(BANK6_SCRIPTS);

// --- 6 script header pointers at offset 0..11 ---
const scriptPtrs = [];
for (let i = 0; i < 12; i += 2) scriptPtrs.push(readU16LE(bank06, i));

// --- 6 scripts bounds (bank06 offset; CPU base $A000) ---
const BANK06_BASE = 0xA000;
const BANK06_SCRIPT_BOUNDS = [
  { from: 0x0C, to: 0x1B },
  { from: 0x1B, to: 0x28 },
  { from: 0x28, to: 0xE0 },
  { from: 0xE0, to: 0x1A8 },
  { from: 0x1A8, to: 0x2F2 },
  { from: 0x2F2, to: 0x1000 }, // ends where BG palette begins
];
for (let i = 0; i < 6; i++) {
  const exp = BANK06_SCRIPT_BOUNDS[i].from + BANK06_BASE;
  if (exp !== scriptPtrs[i]) throw new Error(`script[${i}] expected $${exp.toString(16)}, got $${scriptPtrs[i].toString(16)}`);
}

for (let i = 0; i < 6; i++) {
  const { from, to } = BANK06_SCRIPT_BOUNDS[i];
  const len = to - from;
  const bytes = bank06.slice(from, to);
  const cpuStart = BANK06_BASE + from;
  const cpuEnd = BANK06_BASE + to - 1;
  const idx = i.toString(16).padStart(2, '0').toUpperCase();
  const body = `/**\n` +
    ` * script-${idx} — bank06 脚本段 ${i}\n` +
    ` *\n` +
    ` * 数据源：bank06 偏移 0x${from.toString(16).toUpperCase().padStart(4,'0')}-0x${(to-1).toString(16).toUpperCase().padStart(4,'0')} (${len} 字节)\n` +
    ` *         CPU $${cpuStart.toString(16).toUpperCase().padStart(4,'0')}-$${cpuEnd.toString(16).toUpperCase().padStart(4,'0')}\n` +
    ` * 消费方：bank18 ScriptEngine（VM 调度）\n` +
    ` */\n` +
    `export const BANK6_SCRIPT_${idx}: ReadonlyArray<number> = [\n` +
    fmtHexList(Array.from(bytes), 12) + `\n` +
    `];\n`;
  fs.writeFileSync(path.join(BANK6_SCRIPTS, `script-${idx}.ts`), body);
}

const scriptImports = [];
const scriptArr = [];
for (let i = 0; i < 6; i++) {
  const idx = i.toString(16).padStart(2, '0').toUpperCase();
  scriptImports.push(`import { BANK6_SCRIPT_${idx} } from './script-${idx}';`);
  scriptArr.push(`BANK6_SCRIPT_${idx},`);
}
fs.writeFileSync(path.join(BANK6_SCRIPTS, 'index.ts'),
  '/**\n' +
  ' * bank06/scripts/index.ts — 6 段脚本聚合\n' +
  ' *\n' +
  ' * 每段对应 bank06 header 6 项指针（$A00C/$A01B/$A028/$A0E0/$A1A8/$A2F2）。\n' +
  ' */\n' +
  scriptImports.join('\n') + '\n\n' +
  'export const BANK6_SCRIPTS: ReadonlyArray<ReadonlyArray<number>> = [\n  ' +
  scriptArr.join('\n  ') + '\n' +
  '];\n'
);

// --- BG palette @ offset 0x1000 (CPU $B000) ---
{
  const BG_OFF = 0x1000;
  const BG_COUNT = 16;
  const BG_SIZE = 16;
  const start = BG_OFF;
  const end = BG_OFF + BG_COUNT * BG_SIZE;
  const bytes = bank06.slice(start, end);
  const lines = [];
  for (let i = 0; i < BG_COUNT; i++) {
    const grp = Array.from(bytes.slice(i * BG_SIZE, (i + 1) * BG_SIZE));
    lines.push(`  /* ${i.toString(16).toUpperCase().padStart(2,'0')} */ [` + grp.map(fmtHex).join(', ') + '],');
  }
  fs.writeFileSync(path.join(BANK6_DIR, 'bg-palette.ts'),
    `/**\n` +
    ` * bank06 BG 调色板（CPU $B000，16 组 × 16 字节 = 256 字节）\n` +
    ` *\n` +
    ` * 数据源：bank06 偏移 0x1000-0x10FF\n` +
    ` * 消费方：RenderingPrimitivesService.loadBgPalette\n` +
    ` */\n` +
    `export const BANK6_BG_PALETTES: ReadonlyArray<ReadonlyArray<number>> = [\n` +
    lines.join('\n') + '\n' +
    `];\n`);
}

// --- SPR palette @ offset 0x1300 (CPU $B300) ---
{
  const SPR_OFF = 0x1300;
  const SPR_COUNT = 16;
  const SPR_SIZE = 16;
  const start = SPR_OFF;
  const end = SPR_OFF + SPR_COUNT * SPR_SIZE;
  const bytes = bank06.slice(start, end);
  const lines = [];
  for (let i = 0; i < SPR_COUNT; i++) {
    const grp = Array.from(bytes.slice(i * SPR_SIZE, (i + 1) * SPR_SIZE));
    lines.push(`  /* ${i.toString(16).toUpperCase().padStart(2,'0')} */ [` + grp.map(fmtHex).join(', ') + '],');
  }
  fs.writeFileSync(path.join(BANK6_DIR, 'spr-palette.ts'),
    `/**\n` +
    ` * bank06 SPR 调色板（CPU $B300，16 组 × 16 字节 = 256 字节）\n` +
    ` *\n` +
    ` * 数据源：bank06 偏移 0x1300-0x13FF\n` +
    ` * 消费方：RenderingPrimitivesService.loadSprPalette\n` +
    ` */\n` +
    `export const BANK6_SPR_PALETTES: ReadonlyArray<ReadonlyArray<number>> = [\n` +
    lines.join('\n') + '\n' +
    `];\n`);
}

// --- Secondary data regions (raw byte partitions; structure not fully reverse-engineered) ---
// Region partitions kept as raw byte arrays + offset/label metadata.
const secondaryRegions = [
  { name: 'sec-01-nt-tiles',   off: 0x1800, bytes: 0x83,  label: 'CPU $B800-$B882，NT/tile 数据（一级）' },
  { name: 'sec-02-nt-tiles',   off: 0x1B40, bytes: 0x192, label: 'CPU $BB40-$BCD1，NT/tile 数据（二级）' },
  { name: 'sec-03-ptr-blk',    off: 0x1D00, bytes: 0x66,  label: 'CPU $BD00-$BD65，二级指针块' },
  { name: 'sec-04-tile-blk',   off: 0x1D80, bytes: 0xFC,  label: 'CPU $BD80-$BE7B，tile 数据块' },
];

for (const r of secondaryRegions) {
  const end = r.off + r.bytes;
  const bytes = bank06.slice(r.off, end);
  const body = `/**\n` +
    ` * ${r.name} — bank06 次级数据段\n` +
    ` *\n` +
    ` * ${r.label}\n` +
    ` * 字节范围：bank06 偏移 0x${r.off.toString(16).toUpperCase().padStart(4,'0')}-0x${(end-1).toString(16).toUpperCase().padStart(4,'0')}（${r.bytes} 字节）\n` +
    ` */\n` +
    `export const BANK6_${r.name.replace(/-/g,'_').toUpperCase()}: ReadonlyArray<number> = [\n` +
    fmtHexList(Array.from(bytes), 14) + `\n` +
    `];\n` +
    `export const BANK6_${r.name.replace(/-/g,'_').toUpperCase()}_OFFSET = 0x${r.off.toString(16).toUpperCase().padStart(4,'0')};\n` +
    `export const BANK6_${r.name.replace(/-/g,'_').toUpperCase()}_CPU_BASE = 0x${(BANK06_BASE + r.off).toString(16).toUpperCase().padStart(4,'0')};\n`;
  fs.writeFileSync(path.join(BANK6_DIR, `${r.name}.ts`), body);
}

// --- Scene table @ offset 0x1F00 (CPU $BF00) ---
{
  const SCENE_OFF = 0x1F00;
  const SCENE_SIZE = 19;
  const SCENE_TOTAL = 16;  // always 16 entries per convention
  const realBytes = bank06.slice(SCENE_OFF);
  // emit 16 entries; if realBytes is shorter than expected (bank overflow), pad with 0xFF sentinel
  const lines = [];
  for (let i = 0; i < SCENE_TOTAL; i++) {
    const idx = i.toString(16).padStart(2, '0').toUpperCase();
    const chunk = Array.from(realBytes.slice(i * SCENE_SIZE, (i + 1) * SCENE_SIZE));
    if (chunk.length < SCENE_SIZE) {
      // pad with 0xFF
      while (chunk.length < SCENE_SIZE) chunk.push(0xff);
    }
    lines.push(`  { id: 0x${idx}, scrollFlag: ${fmtHex(chunk[0])}, data: [` + chunk.slice(1).map(fmtHex).join(', ') + `] },`);
  }
  fs.writeFileSync(path.join(BANK6_DIR, 'scene-table.ts'),
    `/**\n` +
    ` * bank06 场景表（CPU $BF00，16 项 × 19 字节 = 304 字节）\n` +
    ` *\n` +
    ` * 数据源：bank06 偏移 0x1F00-0x1FBD（实际 10 项） + 0x1FBE 之后 0xFF 填充（哨兵 6 项）\n` +
    ` * [0]→scrollFlag，[1..18]→场景 18 字节（OPENING_SCENE_TABLE 复用）\n` +
    ` * 消费方：RenderingPrimitivesService.loadSceneData\n` +
    ` */\n` +
    `export interface OpeningSceneEntry {\n` +
    `  /** 场景号 0-15 */\n` +
    `  readonly id: number;\n` +
    `  /** scene.scrollFlag (ram_0079) */\n` +
    `  readonly scrollFlag: number;\n` +
    `  /** 18 字节 (ram_007C..ram_008D) */\n` +
    `  readonly data: ReadonlyArray<number>;\n` +
    `}\n` +
    `\n` +
    `export const BANK6_SCENE_TABLE: ReadonlyArray<OpeningSceneEntry> = [\n` +
    lines.join('\n') + '\n' +
    `];\n`);
}

// bank6 index.ts
{
  const secImports = [];
  for (const r of secondaryRegions) {
    const NAME = r.name.replace(/-/g, '_').toUpperCase();
    secImports.push(`export { BANK6_${NAME} } from './${r.name}';`);
    secImports.push(`export { BANK6_${NAME}_OFFSET, BANK6_${NAME}_CPU_BASE } from './${r.name}';`);
  }
  fs.writeFileSync(path.join(BANK6_DIR, 'index.ts'),
    `/**\n` +
    ` * bank06/index.ts — bank06 数据出口契约\n` +
    ` *\n` +
    ` * 数据布局（CPU 地址）：\n` +
    ` *   $A000-$A00B  6 项脚本 header 指针（隐式）\n` +
    ` *   $A00C-$A5E7  6 段脚本流（BANK6_SCRIPTS）\n` +
    ` *   $B000-$B0FF  BG 调色板 16 × 16（BANK6_BG_PALETTES）\n` +
    ` *   $B300-$B3FF  SPR 调色板 16 × 16（BANK6_SPR_PALETTES）\n` +
    ` *   $B800-$BE7B  次级 NT/tile/pointer 数据段（sec-01..sec-04）\n` +
    ` *   $BF00-$BFFF  场景表 16 × 19（BANK6_SCENE_TABLE）\n` +
    ` */\n` +
    `export { BANK6_SCRIPTS } from './scripts';\n` +
    `export { BANK6_BG_PALETTES } from './bg-palette';\n` +
    `export { BANK6_SPR_PALETTES } from './spr-palette';\n` +
    `export { BANK6_SCENE_TABLE } from './scene-table';\n` +
    `export type { OpeningSceneEntry } from './scene-table';\n` +
    secImports.join('\n') + '\n');
}

// =====================================================================
// bank07
// =====================================================================
ensureDir(BANK7_DIR);
ensureDir(BANK7_CFGS);

const BANK7_BASE = 0xA000;
const chrPtrs = [];
for (let i = 0; i < 212; i += 2) chrPtrs.push(readU16LE(bank07, i));

// pointer-table.ts
{
  const lines = [];
  for (let i = 0; i < chrPtrs.length; i++) {
    lines.push(`  /* 0x${i.toString(16).padStart(2,'0')} */ ${fmtHex2(chrPtrs[i])},`);
  }
  fs.writeFileSync(path.join(BANK7_DIR, 'pointer-table.ts'),
    `/**\n` +
    ` * bank07 CHR 指针表（CPU $A000，106 项 × 16-bit 指针 = 212 字节）\n` +
    ` *\n` +
    ` * 数据源：bank07 偏移 0x0000-0x00D3\n` +
    ` * 消费方：RenderingPrimitivesService.loadChrConfig（取 ptr→读取 6 字节 CHR 配置）\n` +
    ` */\n` +
    `export const BANK7_CHR_POINTERS: ReadonlyArray<number> = [\n` +
    lines.join('\n') + '\n' +
    `];\n`);
}

// 106 per-config files
const HEADER_LEN = 6;
for (let i = 0; i < chrPtrs.length; i++) {
  const cpu = chrPtrs[i];
  const offStart = cpu - BANK7_BASE;
  const offEnd = (i < chrPtrs.length - 1) ? chrPtrs[i + 1] - BANK7_BASE : bank07.length;
  const hdr = Array.from(bank07.slice(offStart, offStart + HEADER_LEN));
  const idx = i.toString(16).padStart(2, '0').toUpperCase();
  const body = `/**\n` +
    ` * chr-cfg-${idx} — bank07 CHR 配置 ${i}\n` +
    ` *\n` +
    ` * 数据源：bank07 CPU $${cpu.toString(16).toUpperCase().padStart(4,'0')} (偏移 0x${offStart.toString(16).toUpperCase().padStart(4,'0')})\n` +
    ` * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码\n` +
    ` * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）\n` +
    ` * 下一配置起始：0x${offEnd.toString(16).toUpperCase().padStart(4,'0')}\n` +
    ` */\n` +
    `export const CHR_CFG_${idx}_HEADER: ReadonlyArray<number> = [\n  ` +
    hdr.map(fmtHex).join(', ') + `\n` +
    `];\n` +
    `export const CHR_CFG_${idx}_CPU_ADDR = ${fmtHex2(cpu)};\n`;
  fs.writeFileSync(path.join(BANK7_CFGS, `chr-cfg-${idx}.ts`), body);
}

// configs/index.ts — aggregate headers
{
  const imports = [];
  const arr = [];
  for (let i = 0; i < chrPtrs.length; i++) {
    const idx = i.toString(16).padStart(2, '0').toUpperCase();
    imports.push(`import { CHR_CFG_${idx}_HEADER } from './chr-cfg-${idx}';`);
    arr.push(`CHR_CFG_${idx}_HEADER`);
  }
  fs.writeFileSync(path.join(BANK7_CFGS, 'index.ts'),
    `/**\n` +
    ` * bank07/configs/index.ts — 106 项 CHR 配置 header 聚合\n` +
    ` *\n` +
    ` * 每个文件 6 字节；CHR 渲染原语按 $8AF7 协议读取。\n` +
    ` */\n` +
    imports.join('\n') + `\n\n` +
    `export const BANK7_CHR_CONFIGS: ReadonlyArray<ReadonlyArray<number>> = [\n  ` +
    arr.join(',\n  ') + `\n];\n`);
}

// streams.ts — aggregate tile streams
{
  const entries = [];
  const arrRefs = [];
  for (let i = 0; i < chrPtrs.length; i++) {
    const cpu = chrPtrs[i];
    const offStart = cpu - BANK7_BASE;
    const offEnd = (i < chrPtrs.length - 1) ? chrPtrs[i + 1] - BANK7_BASE : bank07.length;
    const stream = Array.from(bank07.slice(offStart + HEADER_LEN, offEnd));
    const idx = i.toString(16).padStart(2, '0').toUpperCase();
    entries.push(`export const BANK7_CHR_STREAM_${idx}: ReadonlyArray<number> = [\n` +
      fmtHexList(stream, 14) + `\n` +
      `];`);
    arrRefs.push(`BANK7_CHR_STREAM_${idx}`);
  }
  fs.writeFileSync(path.join(BANK7_DIR, 'streams.ts'),
    `/**\n` +
    ` * bank07 tile streams（每项对应 $8BB0-$8D1D 渲染指令流）\n` +
    ` *\n` +
    ` * 106 项；每项是 6 字节 CHR header 之后的字节流（直到下一 CHR header）。\n` +
    ` * RenderingPrimitivesService.loadChrConfig 读取 cmd/param 时使用本文件。\n` +
    ` * 兼容 OPENING_TILE_STREAMS 别名（沿用旧名以避免改动其他模块）。\n` +
    ` */\n\n` +
    entries.join('\n\n') + `\n\n` +
    `export const BANK7_TILE_STREAMS: ReadonlyArray<ReadonlyArray<number>> = [\n  ` +
    arrRefs.join(',\n  ') + `\n];\n` +
    `/** @deprecated 旧别名，保留以便过渡。新代码请用 BANK7_TILE_STREAMS。 */\n` +
    `export const OPENING_TILE_STREAMS = BANK7_TILE_STREAMS;\n`);
}

// bank7/index.ts
{
  fs.writeFileSync(path.join(BANK7_DIR, 'index.ts'),
    `/**\n` +
    ` * bank07/index.ts — bank07 数据出口契约\n` +
    ` *\n` +
    ` * 数据布局（CPU 地址）：\n` +
    ` *   $A000-$A0D3  CHR 指针表 106 项（BANK7_CHR_POINTERS）\n` +
    ` *   $A0D4-$BFFF  106 个 CHR config + tile streams（configs/*.ts + streams.ts）\n` +
    ` */\n` +
    `export { BANK7_CHR_POINTERS } from './pointer-table';\n` +
    `export { BANK7_CHR_CONFIGS } from './configs';\n` +
    `export {\n` +
    `  BANK7_TILE_STREAMS, OPENING_TILE_STREAMS,\n` +
    `} from './streams';\n`);
}

// bank7-streams.ts — thin re-export to keep existing import working
fs.writeFileSync(path.join(OUT_SCENE, 'bank7-streams.ts'),
  `/**\n` +
  ` * bank7-streams — 兼容旧导入路径的 re-export\n` +
  ` *\n` +
  ` * 实际数据见 ./bank7/streams.ts（BANK7_TILE_STREAMS / OPENING_TILE_STREAMS）。\n` +
  ` */\n` +
  `export { BANK7_TILE_STREAMS, OPENING_TILE_STREAMS } from './bank7/streams';\n`);

console.log('done. wrote:');
console.log('  ' + BANK6_DIR);
console.log('  ' + BANK6_SCRIPTS);
console.log('  ' + BANK7_DIR);
console.log('  ' + BANK7_CFGS);
console.log('files created: ' +
  [
    ...fs.readdirSync(BANK6_DIR),
    ...fs.readdirSync(BANK6_SCRIPTS).map(f => 'scripts/' + f),
    ...fs.readdirSync(BANK7_DIR),
    ...fs.readdirSync(BANK7_CFGS).map(f => 'configs/' + f),
  ].length);
