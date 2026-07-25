/**
 * tsubasa-ts 开场渲染 — 串联 boot → SceneManager → TecmoScene → render-soft → PNG
 *
 * 执行: npx tsx scripts/_run_opening.ts
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync, crc32 } from 'node:zlib';
import { createNesSystem, attachPeripherals } from '../src/tsnes/tsubasa-ts/core/def/nes';
import { createPpuState, writeCtrl, writeMask } from '../src/tsnes/tsubasa-ts/core/engine/ppu';
import { createMmc3State } from '../src/tsnes/tsubasa-ts/core/engine/mapper-mmc3';
import { createEngineState, startLoop, gameTick } from '../src/tsnes/tsubasa-ts/core/engine/engine';
import { createBus } from '../src/tsnes/tsubasa-ts/core/engine/bus';
import { bootSequence, BootPhase } from '../src/tsnes/tsubasa-ts/boot';
import { renderFrame } from '../src/tsnes/tsubasa-ts/core/engine/render-soft';
import { SceneManager } from '../src/tsnes/tsubasa-ts/game/scene/scene';
import { TecmoScene } from '../src/tsnes/tsubasa-ts/game/scene/tecmo';
import {
  TECMO_NAMETABLE,
  TECMO_ATTRIBUTES,
} from '../src/tsnes/tsubasa-ts/game/data/opening/nametable';
import { PAL_BG, PAL_SPR, NES_MASTER_PALETTE, BRIGHTNESS_RAMP } from '../src/tsnes/tsubasa-ts/game/data/opening/palette';

const CWD = process.cwd();

// ═══════════════════════ PNG encoder ═══════════════════════
function uint32be(v: number): Buffer {
  const b = Buffer.allocUnsafe(4);
  b.writeUInt32BE(v);
  return b;
}
function makeChunk(type: string, data: Buffer): Buffer {
  const tb = Buffer.from(type, 'ascii');
  return Buffer.concat([uint32be(data.length), tb, data, uint32be(crc32(Buffer.concat([tb, data])) >>> 0)]);
}
function encodePNG(buf: Uint32Array, w: number, h: number): Buffer {
  // render-soft 输出 ARGB (0xAARRGGBB), 这里显式拆出 RGB
  const sl = 1 + w * 3;
  const raw = Buffer.allocUnsafe(h * sl);
  for (let y = 0; y < h; y++) {
    const ro = y * w, oo = y * sl;
    raw[oo] = 0;
    for (let x = 0; x < w; x++) {
      const a = buf[ro + x];
      const p = oo + 1 + x * 3;
      raw[p]     = (a >>> 16) & 0xFF;  // R
      raw[p + 1] = (a >>>  8) & 0xFF;  // G
      raw[p + 2] =  a         & 0xFF;  // B
    }
  }
  const comp = deflateSync(raw);
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', comp),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ═══════════════════════ 1. 讀 ROM ═══════════════════════
console.log('1. Reading ROM...');
const romBuf = readFileSync(join(CWD, 'rom.nes'));
const prgOff = 16;
const prgBanks: { index: number; data: number[] }[] = [];
for (let i = 0; i < 32; i++) {
  prgBanks.push({ index: i, data: Array.from(romBuf.slice(prgOff + i * 8192, prgOff + (i + 1) * 8192)) });
}
const chrOff = prgOff + 262144;
const chrBanks: { index: number; data: number[] }[] = [];
for (let i = 0; i < 32; i++) {
  chrBanks.push({ index: i, data: Array.from(romBuf.slice(chrOff + i * 4096, chrOff + (i + 1) * 4096)) });
}
console.log(`   PRG: ${prgBanks.length} × 8KB, CHR: ${chrBanks.length} × 4KB`);

// Flat CHR data for render-soft
const flatCHR = new Uint8Array(32 * 4096);
for (let i = 0; i < 32; i++) {
  for (let j = 0; j < 4096; j++) flatCHR[i * 4096 + j] = chrBanks[i].data[j];
}

// ═══════════════════════ 2. 建 NES 系統 ═══════════════════════
console.log('2. Creating NES system...');
const nes: any = createNesSystem(prgBanks, chrBanks, null);
const ppu: any = createPpuState();
const mapper: any = createMmc3State();
const engine: any = createEngineState();
const bus: any = createBus();

attachPeripherals(nes, ppu, mapper, engine, bus, null);

// ═══════════════════════ 3. Boot ═══════════════════════
console.log('3. Running boot...');
let bootFrames = 0;
while (nes.boot.phase !== BootPhase.MAIN_LOOP && bootFrames < 20) {
  bootSequence(nes);
  bootFrames++;
}
startLoop(nes);
console.log(`   boot done in ${bootFrames} frames, phase=${nes.boot.phase}`);

// ═══════════════════════ 4. 載入開場數據到 PPU ═══════════════════════
console.log('4. Loading opening data into PPU...');

// 4a. Nametable + Attributes → VRAM NT0 ($2000)
const vram = ppu.vram;
// NT0 tiles: 960 bytes at VRAM[0..959]
for (let i = 0; i < TECMO_NAMETABLE.length; i++) {
  vram[i] = TECMO_NAMETABLE[i];
}
// NT0 attributes: 64 bytes at VRAM[960..1023]
for (let i = 0; i < TECMO_ATTRIBUTES.length; i++) {
  vram[960 + i] = TECMO_ATTRIBUTES[i];
}
// Mirror NT0 → NT1 (horizontal mirroring)
for (let i = 0; i < 1024; i++) {
  vram[1024 + i] = vram[i];
}

// 4b. Palette
for (let i = 0; i < 16; i++) {
  ppu.palette[i] = PAL_BG[i];
  ppu.palette[16 + i] = PAL_SPR[i];
}
// Mirror transparent to each palette entry
ppu.palette[0]  = PAL_BG[0];
ppu.palette[4]  = PAL_BG[0];
ppu.palette[8]  = PAL_BG[0];
ppu.palette[12] = PAL_BG[0];
ppu.palette[16] = PAL_SPR[0];
ppu.palette[20] = PAL_SPR[0];
ppu.palette[24] = PAL_SPR[0];
ppu.palette[28] = PAL_SPR[0];

// 4c. MMC3 CHR banks: pattern table 0 → CHR VROM bank 31
// Mode 0: R0 = 2KB $0000-$07FF, R1 = 2KB $0800-$0FFF
// trace: NMI writes R0=$7C R1=$7E from RAM $8E/$8F → mapChrAddrSimple → VROM bank 31
mapper.regs.r0 = 0x7C; // 2KB bank → (124>>1>>1)=31 → VROM bank 31
mapper.regs.r1 = 0x7E; // 2KB bank → (126>>1>>1)=31 → VROM bank 31

// 4d. PPU ctrl/mask: enable BG, NT0, ptbl 0
ppu.ctrl.nametable = 0;
ppu.ctrl.bgTbl = 0;
ppu.mask.bgShow = true;
ppu.mask.sprShow = false;

// 4e. Clear scroll
ppu.scrollX = 0; ppu.scrollY = 0; ppu.fineX = 0;

console.log('   PPU ready: NT loaded, palette set, CHR mapped');

// ═══════════════════════ 5. SceneManager + TecmoScene ═══════════════════════
console.log('5. Setting up SceneManager...');
const sm = new SceneManager();
const tecmo = new TecmoScene();
sm.register(tecmo);
nes.sceneManager = sm;
sm.switchImmediate(tecmo.id);
console.log(`   scene: ${sm.currentName} state=${tecmo.state}`);

// ═══════════════════════ 6. 逐幀渲染 ═══════════════════════
const OUT_DIR = join(CWD, 'test_output', 'tsubasa_opening');
mkdirSync(OUT_DIR, { recursive: true });

console.log('\n6. Rendering frames...');

// Track scene changes
let lastSceneName = '';
let frameNum = 0;
const MAX_FRAMES = 380; // 15 fade-in + 350 display + 15 fade-out

for (let f = 0; f < MAX_FRAMES; f++) {
  // Tick engine
  gameTick(nes, {});

  // Apply brightness from TecmoScene
  updateBrightness(tecmo, ppu);

  // Render
  const pixelBuf = renderFrame(ppu, flatCHR, mapper);
  const png = encodePNG(pixelBuf, 256, 240);
  const fname = `frame_${String(frameNum).padStart(3, '0')}.png`;
  writeFileSync(join(OUT_DIR, fname), png);

  // Log scene changes
  if (sm.currentName !== lastSceneName) {
    console.log(`  ${fname}  scene=${sm.currentName}  phase=${tecmo.phaseName} br=${tecmo.brightness}`);
    lastSceneName = sm.currentName;
  }
  frameNum++;

  // Exit if scene changed
  if (tecmo.state === 3) { // EXITING state
    const ns = tecmo.nextSceneId;
    console.log(`  Tecmo → scene ${ns}, stopping render`);
    break;
  }
}

console.log(`\nDone! ${frameNum} frames saved to ${OUT_DIR}`);
console.log(`Final scene: ${sm.currentName}`);

// ═══════════════════════ helpers ═══════════════════════

/** 根據 TecmoScene 亮度更新 PPU palette */
function updateBrightness(tecmo: any, _ppu: any): void {
  const ramp = BRIGHTNESS_RAMP[tecmo.brightness] ?? BRIGHTNESS_RAMP[15];
  for (let i = 0; i < 16; i++) {
    _ppu.palette[i] = ramp[i] & 63;
  }
  // Mirror transparent entries
  _ppu.palette[4]  = _ppu.palette[0];
  _ppu.palette[8]  = _ppu.palette[0];
  _ppu.palette[12] = _ppu.palette[0];
}
