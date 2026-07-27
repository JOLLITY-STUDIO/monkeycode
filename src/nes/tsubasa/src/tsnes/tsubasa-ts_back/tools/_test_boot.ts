/**
 * _test_boot — 最小啟動測試
 * 讀取 rom.nes → 建 NES 系統 → 跑 bootSequence 幾幀
 *
 * 執行: npx tsx src/tsnes/tsubasa-ts/tools/_test_boot.ts
 */

import { createNesSystem, attachPeripherals, printSysState } from '../core/def/nes.ts';
import { createPpuState } from '../core/engine/ppu.ts';
import { createMmc3State } from '../core/engine/mapper-mmc3.ts';
import { createEngineState, startLoop, gameTick } from '../core/engine/engine.ts';
import { createBus } from '../core/engine/bus.ts';
import { createApuState, setSampleCallback } from '../core/engine/papu.ts';
import { bootSequence, BootPhase } from '../boot.ts';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// ═══ 1. 讀取 ROM (從 cwd 專案根) ═══
const romPath = join(process.cwd(), 'rom.nes');
const romBuf = readFileSync(romPath);
console.log(`[boot] read ROM: ${romBuf.length} bytes from ${romPath}`);

// 驗證 header
const hdr = romBuf.slice(0, 16);
const magic = String.fromCharCode(...hdr.slice(0, 4));
console.log(`[boot] magic=${magic} prgPages=${hdr[4]} chrPages=${hdr[5]} mapper=${(hdr[6] >> 4) | (hdr[7] & 240)}`);

// ═══ 2. 拆分 PRG (32 × 8KB) ═══
const prgOff = 16;
const prgBanks = [];
for (let i = 0; i < 32; i++) {
  const start = prgOff + i * 8192;
  prgBanks.push({
    index: i,
    data: Array.from(romBuf.slice(start, start + 8192)),
  });
}
console.log(`[boot] PRG banks: ${prgBanks.length} × 8192 bytes`);

// ═══ 3. 拆分 CHR (32 × 4KB vrom) ═══
const chrOff = prgOff + 262144;
const chrBanks = [];
for (let i = 0; i < 32; i++) {
  const start = chrOff + i * 4096;
  chrBanks.push({
    index: i,
    data: Array.from(romBuf.slice(start, start + 4096)),
  });
}
console.log(`[boot] CHR vrom banks: ${chrBanks.length} × 4096 bytes`);

// ═══ 4. 建 NES 系統 ═══
const nes: any = createNesSystem(prgBanks, chrBanks, null);
console.log(`[boot] nes system created`);

// ═══ 5. 創建外設 ═══
const ppu: any = createPpuState();
const mapper: any = createMmc3State();
const engine: any = createEngineState();
const bus: any = createBus();
const apu: any = createApuState(48000);

// APU sample callback (print 前幾個 sample)
let apuSampleCount = 0;
setSampleCallback(apu, (left: number, right: number) => {
  if (apuSampleCount < 5) {
    console.log(`  [apu] sample L=${left.toFixed(4)} R=${right.toFixed(4)}`);
    apuSampleCount++;
  }
});

attachPeripherals(nes, ppu, mapper, engine, bus, apu);
console.log(`[boot] peripherals attached`);

// ═══ 6. 跑 bootSequence ═══
const maxBootFrames = 10;
let bootFrames = 0;

console.log(`\n[boot] === running bootSequence (max ${maxBootFrames} frames) ===`);
while (nes.boot.phase !== BootPhase.MAIN_LOOP && bootFrames < maxBootFrames) {
  bootSequence(nes);
  bootFrames++;
  console.log(`  frame ${bootFrames}: phase=${nes.boot.phase} initStep=${nes.boot.initStep}`);
}

// ═══ 7. 進入主循環 ═══
console.log(`\n[boot] boot complete: phase=${nes.boot.phase} initComplete=${nes.boot.initComplete}`);
startLoop(nes);

// ═══ 8. 跑 3 幀主循環 ═══
console.log(`\n[boot] === running 3 game frames ===`);
for (let i = 0; i < 3; i++) {
  gameTick(nes, {}); // 空輸入
  console.log(`  game frame ${i + 1}: ${printSysState(nes)}`);
}

// ═══ 9. 最終狀態 ═══
console.log(`\n[boot] === final state ===`);
console.log(printSysState(nes));
console.log(`[boot] DONE`);
