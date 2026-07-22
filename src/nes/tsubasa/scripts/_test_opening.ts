/**
 * Opening 场景逻辑测试 — Node.js 端
 * 跳过 Canvas 渲染，仅验证 bank_00 状态机 + opening 函数调用链是否跑通
 *
 * 用法: npx tsx src/nes/tsubasa/_test_opening.ts
 */

import fs from 'node:fs';
import { GameContext } from './src/disasm/_context';
import { allBanks } from './src/disasm/banks/index';
import type { RomReader, BankRomSlice } from './src/disasm/banks/_bank_types';
import { ROM_DATA } from './src/disasm/banks/_romdata';

const outFile = 'src/nes/tsubasa/_test_output.txt';
let outBuf = '';
function log(...args: unknown[]) {
  const line = args.map(String).join(' ');
  log(line);
  outBuf += line + '\n';
}

const PRG_BANK_SIZE = 0x2000;
const TOTAL_BANKS = ROM_DATA.length;

// ─── Build RomReader (same as runner.ts) ──────────────────────────

function bankSlice(bankNum: number): BankRomSlice {
  const base = bankNum * PRG_BANK_SIZE;
  const data = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) {
    data[i] = ROM_DATA[bankNum]?.[i] ?? 0;
  }
  return {
    u8(offset: number) { return data[offset] ?? 0; },
    u16le(offset: number) { return (this.u8(offset)) | (this.u8(offset + 1) << 8); },
    data,
    romBase: base,
  };
}

const prgFull = new Uint8Array(TOTAL_BANKS * PRG_BANK_SIZE);
for (let i = 0; i < TOTAL_BANKS; i++) {
  if (ROM_DATA[i]) prgFull.set(ROM_DATA[i], i * PRG_BANK_SIZE);
}

// MMC3 bank mapping (dynamic)
let bank8000 = 0;
let bankA000 = 1;

export const romReader: RomReader = {
  bank(addr: number): BankRomSlice {
    const cpuAddr = addr & 0xFFFF;
    let bn: number;
    if (cpuAddr >= 0xE000) bn = TOTAL_BANKS - 1;
    else if (cpuAddr >= 0xC000) bn = TOTAL_BANKS - 2;
    else if (cpuAddr >= 0xA000) bn = bankA000;
    else bn = bank8000;
    return bankSlice(bn);
  },
  u8(addr: number): number {
    return this.bank(addr).u8(addr & 0x1FFF);
  },
  u16le(addr: number): number {
    const slice = this.bank(addr);
    return slice.u16le(addr & 0x1FFF);
  },
};

// ─── Setup ────────────────────────────────────────────────────────

const ctx = new GameContext();

// Install PPU write interceptor to track MMC3 banks
const origSetU8 = ctx.ram.setU8.bind(ctx.ram);
ctx.ram.setU8 = (addr: number, val: number) => {
  origSetU8(addr, val);
  if (addr === 0x8000 || addr === 0x8001) {
    // track MMC3 banks (simplified)
    if (addr === 0x8001) {
      const sel = ctx.ram.u8(0x8000) & 0x07;
      if (sel === 6) bank8000 = val;
      if (sel === 7) bankA000 = val;
    }
  }
};

ctx.ram.setU8(0x24, 0); // bank8000
ctx.ram.setU8(0x25, 1); // bankA000

// ─── Helpers ──────────────────────────────────────────────────────

const hex8 = (v: number) => (v & 0xFF).toString(16).padStart(2, '0').toUpperCase();
const hex16 = (v: number) => (v & 0xFFFF).toString(16).padStart(4, '0').toUpperCase();

function snapshot(label: string) {
  const keys = [0x25, 0x26, 0x27, 0x4C, 0x4D, 0x4E, 0x5A, 0x78, 0x79, 0x7A, 0x7B, 0x99, 0xE0, 0xE6, 0xE7, 0xE9];
  const vals = keys.map(a => `${hex8(a)}=$${hex8(ctx.ram.u8(a))}`).join(' ');
  log(`[${label}] bank8=$${hex8(bank8000)} bankA=$${hex8(bankA000)} | ${vals}`);
}

function dumpRange(start: number, len: number, label: string) {
  const bytes: string[] = [];
  for (let i = 0; i < len; i++) {
    bytes.push(hex8(ctx.ram.u8(start + i)));
  }
  log(`[${label}] $${hex16(start)}+${len}: ${bytes.join(' ')}`);
}

// ─── Main ─────────────────────────────────────────────────────────

log('══════ Opening 逻辑测试 ══════');
log(`ROM: ${TOTAL_BANKS} banks × 8KB = ${TOTAL_BANKS * 8}KB PRG`);
log('');

// Step 1: Boot — call bank_31 RESET ($FFF0)
log('── Step 1: RESET via bank_31 ──');
snapshot('pre-reset');
const bank31 = allBanks[31];
if (bank31?.fns?.['$FFF0']) {
  bank31.fns['$FFF0'](ctx, romReader);
} else {
  bank31?.dispatch(ctx, romReader);
}
snapshot('post-reset');
log('');

// Step 2: Run bank_00 dispatch for 30 frames (simulate opening loop)
log('── Step 2: Frame loop (bank_00 dispatch) ──');

let sameCount = 0;
let lastScene = -1;

for (let frame = 0; frame < 30; frame++) {
  // Simulate VBlank: bank_00 dispatch
  if (bank8000 === 0) {
    ctx.ram.setU8(0x27, 0); // jumpIdx = 0
    try {
      allBanks[0]?.dispatch(ctx, romReader);
    } catch (e) {
      log(`Frame ${frame}: DISPATCH CRASH —`, (e as Error).message);
      break;
    }
  }

  const scene = ctx.ram.u8(0x26);
  const sceneStat = ctx.ram.u8(0x4C);
  const nmiTimer = ctx.ram.u8(0x78);
  const ppuMode = ctx.ram.u8(0x79);

  if (scene !== lastScene) {
    log(`  f${frame.toString().padStart(2)}: scene=$${hex8(scene)} sStat=$${hex8(sceneStat)} nmiTm=$${hex8(nmiTimer)} ppuMd=$${hex8(ppuMode)} bank8=$${hex8(bank8000)} bankA=$${hex8(bankA000)}`);
    lastScene = scene;
    sameCount = 0;
  } else {
    sameCount++;
    if (sameCount === 5) {
      log(`  f${frame.toString().padStart(2)}: (scene $${hex8(scene)} unchanged x${sameCount})`);
    }
  }
}

log('');
snapshot('final');

// Step 3: Check key RAM regions that opening functions touch
log('');
log('── Step 3: RAM snapshots ──');

// OAM sprite buffer ($0468-$046B, first sprite)
dumpRange(0x0468, 16, 'OAM[0-3]');

// Display list region
dumpRange(0x05E8, 16, 'display_list');

// Palette buffer
dumpRange(0x062A, 32, 'palette_buf');

// Scene params ($7B-$8C, 18 bytes from sceneTransitionSetup)
dumpRange(0x79, 22, 'scene_params');

log('');
log('✅ Opening 测试完成。检查上面日志：');
log('  - scene 应该从 $FF 变到有效值 (如 $00)');
log('  - sStat ($4C) 应该有变化 (非 0)');
log('  - OAM、palette_buf 应该有非零数据');

fs.writeFileSync(" + src/nes/tsubasa/_test_output.txt+,outBuf);
