/**
 * Mock 帧測試 — 把 trace 中某一幀的 PPU 寫入注入 bank 翻譯專案，
 * 跑通完整鏈路: bank 代碼執行 → PPU 渲染 → 輸出幀緩存
 *
 * 用法: npx tsx game-engine/test/test-mock-frame.ts
 *
 * 輸出:
 *   - mock-frame/ppu-buffer.bin — 原始 256×240 BGRA Little-Endian
 *   - mock-frame/ppu-state.json  — PPU 內部狀態快照
 *   - 控制台報告 — 每一階段的執行摘要
 */

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');

// ── 動態導入遊戲引擎 (tsx 環境下可用) ──
import NES from '../core/nes';
import { createSystemState } from '../native-game/tsubasa/banks/system-state';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';
import { registerAllBanks } from '../native-game/tsubasa/banks/system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { CHR_ROM_BANKS } from '../data/chr-data';
import { buildRomBuffer } from '../../tsubasa-hex2asm/rom_header';

// ── 翻譯 bank ──
import { translate_BANK31_RESET, tick_BANK31_mainLoop } from '../native-game/tsubasa/banks/bank-31';
import { bank02_nmiHandler, bank02_ppuScrollUpdate } from '../native-game/tsubasa/banks/bank-02';

// ═══════════════════════════════════════════
// BMP 檔案格式 (最簡單的 Windows BMP)
// ═══════════════════════════════════════════

function saveBmp(filePath: string, buffer: Uint32Array, w: number, h: number): void {
  // 每行 padding 到 4-byte 邊界
  const rowBytes = w * 4;
  const padding = (4 - (rowBytes % 4)) % 4;
  const dataSize = (rowBytes + padding) * h;
  const fileSize = 54 + dataSize; // BMP header + data

  const header = Buffer.alloc(54);
  // BMP signature
  header.write('BM', 0);
  header.writeUInt32LE(fileSize, 2);
  header.writeUInt32LE(0, 6); // reserved
  header.writeUInt32LE(54, 10); // data offset
  // DIB header (BITMAPINFOHEADER)
  header.writeUInt32LE(40, 14);
  header.writeInt32LE(w, 18);
  header.writeInt32LE(-h, 22); // negative = top-down
  header.writeUInt16LE(1, 26); // planes
  header.writeUInt16LE(32, 28); // bpp
  header.writeUInt32LE(0, 30); // no compression
  header.writeUInt32LE(dataSize, 34);
  header.writeInt32LE(0, 38); // no hres/vres
  header.writeInt32LE(0, 42);
  header.writeUInt32LE(0, 46); // no palette
  header.writeUInt32LE(0, 50);

  const data = Buffer.alloc(dataSize);
  // PPU buffer = BGR (0x00BBGGRR) → BMP = BGRA (little-endian)
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      const pixel = buffer[row * w + col];
      const offset = row * (rowBytes + padding) + col * 4;
      // BMP is BGRA, pixel already has 00 in top byte
      data.writeUInt32LE(pixel, offset);
    }
  }

  writeFileSync(filePath, Buffer.concat([header, data]));
  console.log(`  ✅ BMP saved: ${filePath} (${fileSize} bytes)`);
}

// ═══════════════════════════════════════════
// PPU 狀態快照 (用於調試)
// ═══════════════════════════════════════════

function dumpPpuState(ppu: any): Record<string, unknown> {
  const p = ppu as any;
  return {
    // PPUCTRL flags ($2000)
    nmienabled: p.f_nmiOnVblank,        // NMI on VBlank
    spriteSize: p.f_spriteSize,          // 0=8x8, 1=8x16
    bgPatternTable: p.f_bgPatternTable,  // 0=$0000, 1=$1000
    spPatternTable: p.f_spPatternTable,  // 0=$0000, 1=$1000
    addrIncrement: p.f_addrInc,          // 0=1, 1=32
    nametable: p.f_nTblAddress,          // 0=$2000, 1=$2400, 2=$2800, 3=$2C00
    // PPUMASK flags ($2001)
    emphasis: p.f_color,                 // color emphasis (bits 5-7)
    showSprites: p.f_spVisibility,       // sprite visibility
    showBg: p.f_bgVisibility,            // background visibility
    spClip: p.f_spClipping,              // sprite left 8-pixel clip
    bgClip: p.f_bgClipping,              // bg left 8-pixel clip
    monochrome: p.f_dispType,
    // Scroll counters
    cntFV: p.cntFV, cntV: p.cntV, cntH: p.cntH,
    cntVT: p.cntVT, cntHT: p.cntHT,
    // Registers
    regFV: p.regFV, regV: p.regV, regH: p.regH, regFH: p.regFH, regS: p.regS,
    // VRAM
    vramAddress: p.vramAddress?.toString(16) ?? 'null',
    vramTmp: p.vramTmpAddress?.toString(16) ?? 'null',
    sramAddress: p.sramAddress,
    firstWrite: p.firstWrite,
    // Scanline
    curX: p.curX,
    scanline: p.scanline,
    frameEnded: p.frameEnded,
    // Misc
    validTileData: p.validTileData,
    hasBuffer: p.buffer instanceof Uint32Array,
    bufferCount: p.buffer?.length ?? 0,
  };
}

// ═══════════════════════════════════════════
// 主測試流程
// ═══════════════════════════════════════════

function ppuStepFullFrame(ppu: any): void {
  ppu.startFrame();
  let safety = 0;
  while (!ppu.frameEnded && safety < 1000) {
    ppu.advanceDots(341);
    safety++;
  }
  ppu.frameEnded = false;
  if (safety >= 1000) {
    console.warn('  ⚠️ PPU frame loop hit safety limit!');
  }
}

async function main(): Promise<void> {
  const outputDir = resolve(ROOT, 'mock-frame');
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  console.log('╔════════════════════════════════════════╗');
  console.log('║   Mock 幀測試 — Bank 翻譯引擎鏈路驗證  ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');

  // ═══════════════════════════════════════
  // Phase 1: 初始化
  // ═══════════════════════════════════════
  console.log('【Phase 1】初始化 NES 硬體 + ROM');
  registerAllBanks(PRG_ROM_BANKS);
  console.log(`  ✅ 已註冊 ${PRG_ROM_BANKS.length} 個 PRG-ROM bank`);

  const nesForPpu = new NES({ emulateSound: false });
  const romBuffer = buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS);
  nesForPpu.loadROM(romBuffer);
  console.log('  ✅ NES 實例建立 (CPU 模擬器路徑 OK)');

  const ppu = nesForPpu.ppu;
  const sys = createSystemState(ppu, nesForPpu.papu);
  console.log('  ✅ SystemState 建立');

  // ═══════════════════════════════════════
  // Phase 2: Bank 翻譯啟動 (RESET)
  // ═══════════════════════════════════════
  console.log('');
  console.log('【Phase 2】Bank 翻譯引擎啟動 (translate_BANK31_RESET)');
  try {
    translate_BANK31_RESET(sys);
    console.log('  ✅ RESET 完成 (initScene + nmiInit + dispatchScene)');
  } catch (e: any) {
    console.error(`  ❌ RESET 失敗: ${e.message}`);
    console.error(e.stack);
    // 仍然繼續，試後續步驟
  }

  // RESET 後 PPU 快照
  console.log('  📊 PPU 狀態 (RESET 後):');
  const ppu0 = dumpPpuState(ppu);
  for (const [k, v] of Object.entries(ppu0)) {
    console.log(`      ${k}: ${v}`);
  }

  // ═══════════════════════════════════════
  // Phase 3: 跑第一幀 (Game Logic + NMI + PPU)
  // ═══════════════════════════════════════
  console.log('');
  console.log('【Phase 3】執行一幀完整循環 (MainLoop → NMI → PPU → Render)');

  try {
    // Step 3a: Game logic tick
    console.log('  3a. tick_BANK31_mainLoop...');
    tick_BANK31_mainLoop(sys);
    console.log('      ✅ mainLoop 執行完成');
  } catch (e: any) {
    console.error(`      ❌ mainLoop 失敗: ${e.message}`);
  }

  try {
    // Step 3b: NMI handler
    console.log('  3b. bank02_nmiHandler...');
    bank02_nmiHandler(sys);
    console.log('      ✅ NMI handler 執行完成');
  } catch (e: any) {
    console.error(`      ❌ NMI 失敗: ${e.message}`);
  }

  try {
    // Step 3c: Scroll + input + frame tick
    console.log('  3c. bank02_ppuScrollUpdate...');
    bank02_ppuScrollUpdate(sys);
    console.log('      ✅ Scroll update 執行完成');
  } catch (e: any) {
    console.error(`      ❌ Scroll 失敗: ${e.message}`);
  }

  try {
    // Step 3d: PPU 渲染一幀
    console.log('  3d. ppuStepFullFrame...');
    ppuStepFullFrame(ppu);
    console.log('      ✅ PPU 幀渲染完成');
  } catch (e: any) {
    console.error(`      ❌ PPU 渲染失敗: ${e.message}`);
  }

  // PPU 幀緩存輸出
  const ppuBuffer = ppu.buffer as Uint32Array;
  let nonZero = 0;
  const total = Math.min(ppuBuffer.length, 256 * 240);
  for (let i = 0; i < total; i++) {
    if ((ppuBuffer[i] & 0x00FFFFFF) !== 0) nonZero++;
  }
  console.log(`  📊 PPU buffer: ${total} 像素, ${nonZero} 個非零 (${(nonZero / total * 100).toFixed(1)}%)`);

  // ═══════════════════════════════════════
  // Phase 4: 保存輸出
  // ═══════════════════════════════════════
  console.log('');
  console.log('【Phase 4】保存輸出');

  // 4a: BMP 文件
  const bmpPath = resolve(outputDir, 'ppu-frame.bmp');
  saveBmp(bmpPath, ppuBuffer, 256, 240);

  // 4b: PPU 狀態 JSON
  const statePath = resolve(outputDir, 'ppu-state.json');
  const ppuState = dumpPpuState(ppu);
  writeFileSync(statePath, JSON.stringify(ppuState, null, 2));
  console.log(`  ✅ PPU state saved: ${statePath}`);

  // 4c: 內存關鍵變量
  const memPath = resolve(outputDir, 'mem-state.json');
  const memKeys: Record<string, number> = {};
  const interestingAddrs = [
    0x0700, 0x0628, 0x062A, 0x062B, 0x0629, 0x062D,
    0x003A, 0x004A, 0x004B, 0x0079,
    0x0020, 0x0021, 0x0022, 0x0024, 0x0025,
  ];
  for (const addr of interestingAddrs) {
    memKeys[`$${addr.toString(16).padStart(4, '0')}`] = sys.mem[addr];
  }
  writeFileSync(memPath, JSON.stringify(memKeys, null, 2));
  console.log(`  ✅ Memory state saved: ${memPath}`);

  // ═══════════════════════════════════════
  // Phase 5: 連續跑 100 幀 — 完整畫面構建需要 ~60 幀
  // (bytecode 腳本: palette + delay + fade-in + nameTable 逐 row 寫入)
  // ═══════════════════════════════════════
  const TOTAL_FRAMES = 100;
  console.log('');
  console.log(`【Phase 5】連續跑 ${TOTAL_FRAMES} 幀 (完整畫面驗證)`);
  console.log(`   $0628 = 0 表示 NMI 無數據寫入 (bytecode 等待期)`);
  let lastFileIdx = 0;
  for (let frame = 1; frame <= TOTAL_FRAMES; frame++) {
    try {
      tick_BANK31_mainLoop(sys);
      bank02_nmiHandler(sys);
      bank02_ppuScrollUpdate(sys);
      ppuStepFullFrame(ppu);
      nonZero = 0;
      for (let i = 0; i < total; i++) {
        if ((ppuBuffer[i] & 0x00FFFFFF) !== 0) nonZero++;
      }
      // 每 5 幀保存 BMP + 狀態
      const queueSize = sys.mem[0x0628];
      const queueBusy = sys.mem[0x0629] & 0x40;
      const hasData = queueSize !== 0 && queueBusy === 0;
      const marker = hasData ? ` [NMI DATA ${queueSize}B]` : ` [NMI idle]`;
      console.log(`  幀#${frame}: ${nonZero} 非零像素 (${(nonZero / total * 100).toFixed(1)}%)${marker}`);
      
      if (frame % 5 === 0) {
        lastFileIdx = frame;
        saveBmp(resolve(outputDir, `ppu-frame-${frame}.bmp`), ppuBuffer, 256, 240);
      }
    } catch (e: any) {
      console.error(`  幀#${frame} 失敗: ${e.message}`);
    }
  }

  // 保存最後一幀 (方便對比)
  const finalBmpPath = resolve(outputDir, 'ppu-frame-5.bmp');
  saveBmp(finalBmpPath, ppuBuffer, 256, 240);

  // ═══════════════════════════════════════
  // 總結
  // ═══════════════════════════════════════
  console.log('');
  console.log('══════════════════════════════════════');
  console.log('測試完成！');
  console.log(`輸出目錄: ${outputDir}`);
  console.log('查看方式:');
  console.log('  1. 打開 mock-frame/ppu-frame.bmp 圖片');
  console.log('  2. 或運行 viewer: 瀏覽器打開 mock-frame/index.html');
  console.log('══════════════════════════════════════');
}

main().catch((e) => {
  console.error('FATAL:', e.message);
  console.error(e.stack);
  process.exit(1);
});
