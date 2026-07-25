/**
 * _render_frame — 渲染第一幀到 PPM 檔案
 *
 * 執行: npx tsx src/tsnes/tsubasa-ts/tools/_render_frame.ts
 * 輸出: test_output/frame_*.ppm (可用圖片檢視器打開)
 */

import { createNesSystem, attachPeripherals, printSysState } from '../core/def/nes.ts';
import { createPpuState, writeCtrl, writeMask, writeVramAddr, writeVramData } from '../core/engine/ppu.ts';
import { createMmc3State } from '../core/engine/mapper-mmc3.ts';
import { createEngineState, startLoop, gameTick } from '../core/engine/engine.ts';
import { createBus } from '../core/engine/bus.ts';
import { bootSequence, BootPhase } from '../boot.ts';
import { renderFrame, toPpm, toAscii } from '../core/engine/render-soft.ts';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CWD = process.cwd();
const OUT_DIR = join(CWD, 'test_output');
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ═══════════════════════════════════════════════════════════
// 1. 載入 ROM
// ═══════════════════════════════════════════════════════════

const romBuf = readFileSync(join(CWD, 'rom.nes'));
console.log(`[render] ROM: ${romBuf.length} bytes`);

// ── PRG banks ──
const prgOff = 16;
const prgBanks: any[] = [];
for (let i = 0; i < 32; i++) {
  prgBanks.push({ index: i, data: Array.from(romBuf.slice(prgOff + i * 8192, prgOff + i * 8192 + 8192)) });
}

// ── CHR banks ──
const chrOff = prgOff + 262144;
const chrBanks: any[] = [];
for (let i = 0; i < 32; i++) {
  chrBanks.push({ index: i, data: Array.from(romBuf.slice(chrOff + i * 4096, chrOff + i * 4096 + 4096)) });
}

// ── 完整 CHR 131072 bytes 連續數組 (給軟體渲染器) ──
const chrFlat = Array.from(romBuf.slice(chrOff, chrOff + 131072));

console.log(`[render] PRG: ${prgBanks.length}×8KB, CHR: ${chrBanks.length}×4KB`);

// ═══════════════════════════════════════════════════════════
// 2. 建系統 + 外設
// ═══════════════════════════════════════════════════════════

const nes: any = createNesSystem(prgBanks, chrBanks, null);
const ppu: any = createPpuState();
const mapper: any = createMmc3State();
const engine: any = createEngineState();
const bus: any = createBus();

attachPeripherals(nes, ppu, mapper, engine, bus, null);

// ═══════════════════════════════════════════════════════════
// 3. Boot
// ═══════════════════════════════════════════════════════════

while (nes.boot.phase !== BootPhase.MAIN_LOOP) {
  bootSequence(nes);
}
console.log(`[render] boot done: phase=${nes.boot.phase}`);

// ═══════════════════════════════════════════════════════════
// 4. 設定初始 PPU/Mapper 狀態
// ═══════════════════════════════════════════════════════════

// MMC3 CHR bank setup (boot 已設定 mode)
mapper.write8000(0); mapper.write8001(0); // R0 = bank 0 ($0000-$03FF)
mapper.write8000(1); mapper.write8001(2); // R1 = bank 2 ($0400-$07FF or $0800-$0BFF)
mapper.write8000(2); mapper.write8001(4); // R2 = bank 4
mapper.write8000(3); mapper.write8001(5); // R3 = bank 5
mapper.write8000(4); mapper.write8001(6); // R4 = bank 6
mapper.write8000(5); mapper.write8001(7); // R5 = bank 7

// PPU 設定
writeCtrl(ppu, 0x88);  // NMI on, BG tbl=$1000, increment=1, NT=0
writeMask(ppu, 0x1E);  // BG on, SPR on, no clip

// ═══════════════════════════════════════════════════════════
// 5. 模擬開場調色板 (從 bank_06 palette_data)
//    ROM 中 bank_06 $A000 開始包含開場調色板
// ═══════════════════════════════════════════════════════════

const bank06 = prgBanks[6]; // palette_data
const paletteBase = 0; // bank_06 offset 0 (mapped to $A000 in some contexts)

console.log(`[render] loading palette from bank_06`);

// 從 _disasm_out.txt: 調色板 A: $B000+$48*16, 調色板 B: $B300+$49*16
// bank_06 在 ROM $A000-$BFFF = bank offset 0-$1FFF
// $B000 = offset $1000, $B300 = offset $1300
const palAOff = 0x1000; // $B000
const palBOff = 0x1300; // $B300

// _play_dump.json frame=30: $48=00 $49=00 → 用 idx 0
const palAIdx = 0;
const palBIdx = 0;

for (let i = 0; i < 16; i++) {
  ppu.palette[i] = bank06.data[(palAOff + palAIdx * 16 + i) & 8191] & 0x3F;
}
for (let i = 0; i < 16; i++) {
  ppu.palette[16 + i] = bank06.data[(palBOff + palBIdx * 16 + i) & 8191] & 0x3F;
}

console.log(`[render] palette BG=${ppu.palette.slice(0,16).map((v:number)=>'$'+v.toString(16)).join(' ')}`);
console.log(`[render] palette SP=${ppu.palette.slice(16,32).map((v:number)=>'$'+v.toString(16)).join(' ')}`);

// ═══════════════════════════════════════════════════════════
// 6. 寫入測試 nametable 數據 (模擬開場 tile 寫入)
//    從 bank_03 scene data 讀取開場 nametable tiles
// ═══════════════════════════════════════════════════════════

// bank_03 的數據可能是 nametable tile indices 和 attribute data
// 用 bank_03 offset $0000 開始的一段數據作為 nametable
const bank03 = prgBanks[3];

// 先嘗試: 把一些非零 tile 寫入 nametable，這樣可以看到有東西
// 從 bank_03 複製 960 bytes (一個 nametable) 到 VRAM $2000
if (bank03) {
  console.log(`[render] copying scene tiles from bank_03 to nametable`);
  for (let i = 0; i < 960; i++) {
    ppu.vram[i] = bank03.data[i];
  }
  // attribute table 在 bank_03 offset 960
  for (let i = 0; i < 64; i++) {
    ppu.vram[960 + i] = bank03.data[960 + i];
  }
}

// ═══════════════════════════════════════════════════════════
// 7. 渲染幀
// ═══════════════════════════════════════════════════════════

for (let frameIdx = 0; frameIdx < 3; frameIdx++) {

  // 渲染
  console.log(`\n[render] === rendering frame ${frameIdx} ===`);
  const pixels = renderFrame(ppu, chrFlat, mapper);
  const ppm = toPpm(pixels);

  const ppmPath = join(OUT_DIR, `frame_${String(frameIdx).padStart(3, '0')}.ppm`);
  writeFileSync(ppmPath, ppm);
  console.log(`[render] saved ${ppmPath} (${ppm.length} bytes)`);

  // 統計非零像素
  let nonZero = 0;
  for (let i = 0; i < pixels.length; i++) {
    if ((pixels[i] & 0x00FFFFFF) !== 0) nonZero++;
  }
  console.log(`[render] non-zero pixels: ${nonZero}/${pixels.length}`);

  // 輸出 ASCII 預覽 (縮小版)
  if (frameIdx === 0) {
    const ascii = toAscii(pixels);
    console.log(`[render] ASCII preview:\n${ascii.split('\n').slice(0, 60).join('\n')}`);
  }

  // 推進一幀
  ppu.frame++;
  ppu.status.vblank = true;
}

// ═══════════════════════════════════════════════════════════
// 8. 診斷: VRAM 內容
// ═══════════════════════════════════════════════════════════

console.log(`\n[render] === VRAM diagnostic ===`);
const ntNonZero: number[] = [];
for (let i = 0; i < 960; i++) {
  if (ppu.vram[i] !== 0) ntNonZero.push(i);
}
console.log(`[render] nametable non-zero tiles: ${ntNonZero.length} (first 30: ${ntNonZero.slice(0, 30).join(',')})`);

const ntTiles: number[] = [];
for (let y = 0; y < 30; y++) {
  const row: string[] = [];
  for (let x = 0; x < 32; x++) {
    const tid = ppu.vram[y * 32 + x];
    if (tid !== 0) ntTiles.push(tid);
    row.push(String(tid).padStart(3));
  }
}
console.log(`[render] unique tiles in NT: ${[...new Set(ntTiles)].sort((a,b)=>a-b).join(',')}`);

// 打印前幾行
for (let y = 0; y < 8; y++) {
  const row: string[] = [];
  for (let x = 0; x < 32; x++) {
    const tid = ppu.vram[y * 32 + x];
    row.push(tid === 0 ? '   ' : String(tid).padStart(3));
  }
  console.log(`  row${y}: ${row.join(' ')}`);
}

console.log(`\n[render] DONE`);
