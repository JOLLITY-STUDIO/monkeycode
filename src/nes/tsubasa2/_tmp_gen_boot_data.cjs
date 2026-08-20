// 从 _tmp_boot_nt.json 生成 cut_0x00_boot.ts 数据文件
const fs = require('fs');
const { oam, bgPal, sprPal } = JSON.parse(fs.readFileSync('_tmp_boot_nt.json', 'utf8'));

// 模拟器加载真实 chrBanks
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
const nes = new NES({ emulateSound: false, sampleRate: 0 });
nes.loadROM(fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
for (let f = 1; f <= 30; f++) nes.frame();
const chrBanks = Array.from(nes.mmap.chrBanks);

function mapChrSlot(chrBanks, tile, patternTable) {
  const slot = (patternTable === 0 ? 0 : 4) + (tile >> 6);
  const c = chrBanks[slot];
  const bank4k = Math.floor(c / 4) % 32;
  const bank = Math.floor(bank4k / 2);
  const h5Tile = ((bank4k % 2) * 128 + (c % 4) * 64 + (tile & 0x3f)) & 0xff;
  return { bank, h5Tile };
}

function fmtArr(arr, perRow = 16) {
  const lines = [];
  for (let i = 0; i < arr.length; i += perRow) {
    lines.push('  ' + arr.slice(i, i + perRow).map(v => '0x' + v.toString(16).padStart(2, '0')).join(', ') + ',');
  }
  return lines.join('\n');
}

// OAM: 有效精灵 (y != 0 且非哨兵), 翻译 bank/tile
const sprites = oam.filter((s, i) => s.y !== 0 && !(i === 63 && s.x === 248) && s.tile !== 0);
const oamLines = sprites.map(s => {
  const { bank, h5Tile } = mapChrSlot(chrBanks, s.tile, 1);
  return `  { x: ${s.x}, y: ${s.y}, tile: 0x${s.tile.toString(16).padStart(2, '0')}, attr: ${s.attr}, bank: ${bank}, h5Tile: 0x${h5Tile.toString(16).padStart(2, '0')} },`;
}).join('\n');

const nt = JSON.parse(fs.readFileSync('_tmp_boot_nt.json', 'utf8')).nt0;
const attr = JSON.parse(fs.readFileSync('_tmp_boot_nt.json', 'utf8')).attr0;

const out = `/**
 * BOOT 开场画面数据 (Cut 0x00 — 真实开场/标题版权画面)
 *
 * 来源: 真实 ROM 经 tsnes 模拟器 30 帧 dump (NT0/ATTR0/OAM/调色板)
 * 基准脚本: _tmp_emu_boot.cjs / _tmp_boot_dump.cjs (根目录)
 *
 * 关键发现 (2026-08-20):
 *   1. BOOT 阶段 NT0 仅 25 个非零 tile (行 12-13: 标题字母, 行 15: 版权文字),
 *      不是模式块 0 (mode 0 是 TECMO 字母, 属于开场动画另一段)。
 *   2. MMC3 chrBanks(1KB slot) = [00,01,02,03,FC,71,52,53] 固定不变。
 *      BG pattern table=0 → H5 8KB CHR bank 0 (tile 原样);
 *      SPR pattern table=1: tile 0x40-0x7F → H5 bank 14 (slot5=0x71);
 *                          tile 0xC0-0xFF → H5 bank 10 (slot7=0x53)。
 *      (已验证: 62/62 tile 字节与 CHR ROM 一致, 见 _tmp_chr_verify.cjs)
 *   3. 调色板帧 12-28 渐显 (fade), 帧 28+ 稳定为 BOOT_BG_PALETTE/BOOT_SPR_PALETTE。
 */

/** MMC3 1KB CHR slot 映射 (参考, H5 不启用硬件模拟) */
export const BOOT_CHR_SLOTS: readonly number[] = [
  0x00, 0x01, 0x02, 0x03, 0xFC, 0x71, 0x52, 0x53,
];

/** NT 背景 tile 所在 H5 8KB CHR bank (BG pattern table=0 → bank 0) */
export const BOOT_BG_CHR_BANK = 0;

/** NT0: 960 字节 (25 个非零 tile) */
export const BOOT_NT0: readonly number[] = [
${fmtArr(nt)}
];

/** ATTR0: 64 字节 (上半屏 palette 0, 下半屏 palette 1; 非零 tile 均在 palette 0) */
export const BOOT_ATTR0: readonly number[] = [
${fmtArr(attr)}
];

/** OAM 精灵 (40 个, 已按 BOOT_CHR_SLOTS 翻译成 H5 bank/h5Tile) */
export interface BootOamEntry {
  x: number;
  y: number;
  tile: number;
  attr: number;
  bank: number;
  h5Tile: number;
}

export const BOOT_OAM: readonly BootOamEntry[] = [
${oamLines}
];

/** BG 调色板 (16B, 帧 28+ 稳定值) */
export const BOOT_BG_PALETTE: readonly number[] = [
${fmtArr(bgPal)}
];

/** SPR 调色板 (16B, 帧 28+ 稳定值) */
export const BOOT_SPR_PALETTE: readonly number[] = [
${fmtArr(sprPal)}
];

/**
 * 渐显 offset 表 (bank0 $9A71 fade 机制, 从实测反推):
 *   fadeByte(c, step) = (c & 0x0F) | FADE_OFFSETS[band][step-1]
 *   band = (c & 0x30) >> 4 (0-3); step 1-9 (step 0 = 全黑 0x0F)
 * 已验证: 与模拟器帧 0x0C-0x1C 全部 32 字节 palette 逐字节一致。
 */
export const BOOT_FADE_OFFSETS: readonly (readonly number[])[] = [
  [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], // band 0 (黑灰)
  [0x00, 0x00, 0x00, 0x10, 0x20, 0x30, 0x20, 0x10, 0x10], // band 1 (0x10)
  [0x00, 0x00, 0x10, 0x20, 0x20, 0x30, 0x20, 0x20, 0x20], // band 2 (0x20)
  [0x00, 0x10, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30], // band 3 (0x30)
];

/** 渐显帧映射: H5 BOOT shotFrame → fade step (step 0=全黑, 9=最终) */
export function bootFadeStep(shotFrame: number): number {
  if (shotFrame < 11) return 0;
  return Math.min(9, Math.floor((shotFrame - 11) / 2) + 1);
}

/** 渐显单字节: step 0 → 全黑; 否则按 band+step 查 offset 表 */
export function bootFadeByte(c: number, step: number): number {
  if (step <= 0) return 0x0F;
  const band = (c & 0x30) >> 4;
  const offsets = BOOT_FADE_OFFSETS[band];
  const off = offsets[Math.min(step, 9) - 1];
  return (c & 0x0F) | off;
}
`;

fs.writeFileSync('src/game/data/ppu/nametable/cut/cut_0x00_boot.ts', out);
console.log(`已生成 cut_0x00_boot.ts (OAM ${sprites.length} 精灵, NT0 非零 ${nt.filter(v => v !== 0).length})`);
