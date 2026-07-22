/**
 * jsNes PPU trace — 抓取开场动画的关键 PPU 状态快照
 * 用法: node _trace_opening_jsnes_ppu.mjs
 * 
 * 输出: test_output/opening_jsnes_ppu.json
 * 用于跟 disasm 的 main.ts PPU 诊断输出对比
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import NES from '../src/jsnes/src/nes.js';

const ROM_PATH = 'rom.nes';
const MAX_FRAMES = 800;  // 覆盖到 $4C→$80 (F377) + 一次场景过渡 (F818)

const ROM = new Uint8Array(readFileSync(ROM_PATH));
console.log(`ROM: ${ROM.length} bytes`);

const nes = new NES({
  onFrame: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadROM(ROM);

const snapshots = [];

// 哪些帧需要 snapshot: 前40帧 + 每60帧 + 关键变化帧
const snapshotFrames = new Set();
for (let f = 0; f <= 40; f++) snapshotFrames.add(f);
for (let f = 60; f <= MAX_FRAMES; f += 60) snapshotFrames.add(f);
// 关键帧: $4C 首次变 $80 (F377 in jsnes)
snapshotFrames.add(377);
snapshotFrames.add(818);
snapshotFrames.add(1062);
snapshotFrames.add(1489);
snapshotFrames.add(1743);
snapshotFrames.add(2134);

/** 提取 PPU 关键状态摘要 */
function snapshotPpu(frame) {
  const ppu = nes.ppu;
  
  // ppu 内存类字段的摘要
  // vram 是 Uint8Array 2048 bytes
  // palette 是 imgPalette + sprPalette
  // nameTable 是数组 4 个 Nametable 对象
  
  // 当前活跃 nametable id
  const ntId = ppu.curNt;
  
  // VRAM nametable first 128 bytes (tile indices)
  const vram = [];
  for (let i = 0; i < 0x400; i++) vram.push(ppu.vramMem[i]);
  
  // Nametable tile arrays (from nameTable objects)
  const ntTiles = [];
  for (let n = 0; n < 4; n++) {
    const tbl = [];
    for (let i = 0; i < 0x3C0; i++) tbl.push(ppu.nameTable[n].tile[i]);
    ntTiles.push(tbl);
  }
  
  // Nametable attribute arrays
  const ntAttribs = [];
  for (let n = 0; n < 4; n++) {
    const tbl = [];
    for (let i = 0; i < 64; i++) tbl.push(ppu.nameTable[n].attrib[i]);
    ntAttribs.push(tbl);
  }
  
  // Palette: bg (imgPalette) + sprite (sprPalette) - 原始 NES 颜色索引
  const imgPal = [...ppu.imgPalette];
  const sprPal = [...ppu.sprPalette];
  
  // PPU 寄存器
  const reg = {
    ctrl:   (ppu.f_nmiOnVblank ? 0x80 : 0) | (ppu.f_spriteSize ? 0x20 : 0) | (ppu.f_bgPatternTable ? 0x10 : 0) | (ppu.f_spPatternTable ? 0x08 : 0) | (ppu.f_addrInc ? 0x04 : 0) | (ppu.f_nTblAddress & 0x03),
    mask:   (ppu.f_color << 5) | (ppu.f_spVisibility << 4) | (ppu.f_bgVisibility << 3) | (ppu.f_spClipping << 2) | (ppu.f_bgClipping << 1) | ppu.f_dispType,
    status: (ppu.hitSpr0 << 6) | (ppu.nmiOutput << 7),
    // VRAM addr, scroll
    vramAddress: ppu.vramAddress,
    regX: ppu.regFH,
  };
  
  // SPR-RAM (sprite OAM) first 16 entries
  const sprites = [...ppu.spriteMem.slice(0, 64)];
  
  // Pattern table: only for key frames (too slow for all frames)
  const keyPatternFrames = [0, 10, 24, 377, 818];
  let ptBytes = [];
  if (keyPatternFrames.includes(frame)) {
    for (let t = 0; t < 8; t++) { // first 8 tiles as sample
      const tile = ppu.ptTile[t];
      if (tile) {
        for (let j = 0; j < 8; j++) ptBytes.push(tile[j] ?? 0);
      } else {
        for (let j = 0; j < 8; j++) ptBytes.push(0);
      }
    }
  }
  
  // CPU ZP keys
  const z26 = nes.cpu.mem[0x26];
  const z27 = nes.cpu.mem[0x27];
  const z4A = nes.cpu.mem[0x4A];
  const z4B = nes.cpu.mem[0x4B];
  const z4C = nes.cpu.mem[0x4C];
  
  // 统计量
  let imgPalNonZero = 0, sprPalNonZero = 0;
  for (let i = 0; i < 16; i++) { 
    if ((imgPal[i] & 0x3F) !== 0x0F) imgPalNonZero++; 
    if ((sprPal[i] & 0x3F) !== 0x0F) sprPalNonZero++; 
  }
  let vramNtNz = 0, vramAtNz = 0;
  for (let i = 0; i < 0x3C0; i++) { if (vram[i] !== 0) vramNtNz++; }
  for (let i = 0x3C0; i < 0x400; i++) { if (vram[i] !== 0) vramAtNz++; }
  let spritesUsed = 0;
  for (let i = 0; i < 64; i += 4) { if (sprites[i] !== 0xFF) spritesUsed++; }
  
  return {
    frame,
    cpu: { z26, z27, z4A, z4B, z4C },
    ppu: {
      reg,
      ntId,
      vram_nz: vramNtNz,
      at_nz: vramAtNz,
      imgPalette: imgPal,
      sprPalette: sprPal,
      imgPalNonZero,
      sprPalNonZero,
      spritesUsed,
      // 只存摘要, 不存全部 VRAM/nameTable (太大)
      vram_tile_sample: vram.slice(0, 64),       // first 64 tile indices
      vram_attr_sample: vram.slice(0x3C0, 0x3C0+16), // first 16 attribute bytes
      nametable_tiles_nt0: ntTiles[0].slice(0, 64),
      nametable_attrib_nt0: ntAttribs[0].slice(0, 16),
      pattern_sample: ptBytes,
    },
  };
}

console.log(`Running ${MAX_FRAMES} frames...\n`);

const t0 = Date.now();
for (let f = 0; f < MAX_FRAMES; f++) {
  nes.frame();
  
  if (snapshotFrames.has(f)) {
    snapshots.push(snapshotPpu(f));
  }
  
  if (f % 300 === 299) {
    console.log(`  F${f+1}/${MAX_FRAMES} (${((Date.now()-t0)/1000).toFixed(1)}s) snapshots: ${snapshots.length}`);
  }
}

const elapsed = (Date.now() - t0) / 1000;

// ============================================================
// 输出
// ============================================================
if (!existsSync('test_output')) mkdirSync('test_output');
const outPath = 'test_output/opening_jsnes_ppu.json';

const output = {
  note: 'jsNes PPU trace — opening animation PPU snapshots',
  maxFrames: MAX_FRAMES,
  snapshots: snapshots.length,
  elapsedSec: elapsed.toFixed(1),
  frames: snapshots,
};

// 压缩输出: 数组转十六进制字符串减少体积
const compactFrames = snapshots.map(s => ({
  ...s,
  ppu: {
    ...s.ppu,
    imgPalette: s.ppu.imgPalette.map(b => b.toString(16).padStart(2,'0')).join(''),
    sprPalette: s.ppu.sprPalette.map(b => b.toString(16).padStart(2,'0')).join(''),
    vram_tile_sample: s.ppu.vram_tile_sample.map(b => b.toString(16).padStart(2,'0')).join(''),
    vram_attr_sample: s.ppu.vram_attr_sample.map(b => b.toString(16).padStart(2,'0')).join(''),
    nametable_tiles_nt0: s.ppu.nametable_tiles_nt0.map(b => b.toString(16).padStart(2,'0')).join(''),
    nametable_attrib_nt0: s.ppu.nametable_attrib_nt0.map(b => b.toString(16).padStart(2,'0')).join(''),
    pattern_sample: s.ppu.pattern_sample.map(b => b.toString(16).padStart(2,'0')).join(''),
  }
}));

const jsonOut = JSON.stringify({ ...output, frames: compactFrames }, null, 2);
writeFileSync(outPath, jsonOut);

// 控制台摘要
console.log(`\n========================================`);
console.log(`PPU TRACE SUMMARY`);
console.log(`========================================`);
console.log(`Frames:        ${MAX_FRAMES}`);
console.log(`Snapshots:     ${snapshots.length}`);
console.log(`Elapsed:       ${elapsed.toFixed(1)}s`);
console.log(`Saved:         ${outPath}`);

// 关键帧快照对比
console.log(`\n--- Key PPU frames ---`);
const keyFrames = [0, 1, 10, 24, 377, 818];
for (const s of snapshots) {
  if (keyFrames.includes(s.frame)) {
    console.log(`\nF${s.frame}: $4C=$${s.cpu.z4C.toString(16).padStart(2,'0')} scene=$${s.cpu.z4B.toString(16).padStart(2,'0')}${s.cpu.z4A.toString(16).padStart(2,'0')}`);
    console.log(`  PPU: mask=$%s ctrl=$%s vramAddr=$%s`, 
      s.ppu.reg.mask.toString(16).padStart(2,'0'),
      s.ppu.reg.ctrl.toString(16).padStart(2,'0'),
      s.ppu.reg.vramAddress.toString(16).padStart(4,'0'));
    console.log(`  VRAM: ntNz=%d atNz=%d`, s.ppu.vram_nz, s.ppu.at_nz);
    console.log(`  Pal: img nz=%d/16 spr nz=%d/16`, s.ppu.imgPalNonZero, s.ppu.sprPalNonZero);
    console.log(`  Sprites: %d`, s.ppu.spritesUsed);
    console.log(`  imgPal: [${s.ppu.imgPalette.slice(0,16).map(v=>'$'+v.toString(16).padStart(2,'0')).join(',')}]`);
  }
}

console.log(`\nDone.`);
