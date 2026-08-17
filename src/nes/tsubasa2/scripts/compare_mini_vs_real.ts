/**
 * 对比 mini-audio 输出 vs 真实 ROM trace
 * 找差异根源
 */
import * as fs from 'fs';
import * as path from 'path';
import { renderAudio } from '../mini-audio/renderer';

const OUT = path.join(__dirname, '_mini_apu_trace.txt');
const REAL = path.join(__dirname, '_apu_trace_result.txt');

// ── 测试多组 SE ID 和帧数 ──

const TEST_CASES = [
  // { label, seId, frames }
  { label: 'SE 0x30 (短音效)', seId: 0x30, frames: 90 },
  { label: 'SE 0x20', seId: 0x20, frames: 90 },
  { label: 'SE 0x40', seId: 0x40, frames: 90 },
  { label: 'SE 0x60', seId: 0x60, frames: 90 },
  { label: 'SE 0x70', seId: 0x70, frames: 90 },
  { label: 'SE 0x32 (BGM边界)', seId: 0x32, frames: 300 },
  { label: 'SE 0x50', seId: 0x50, frames: 300 },
  { label: 'SE 0x80', seId: 0x80, frames: 300 },
  // BGM IDs - 开场音乐可能的ID
  { label: 'BGM 0x34', seId: 0x34, frames: 600 },
  { label: 'BGM 0x35', seId: 0x35, frames: 600 },
  { label: 'BGM 0x36', seId: 0x36, frames: 600 },
  { label: 'BGM 0x38', seId: 0x38, frames: 600 },
  { label: 'BGM 0x3C', seId: 0x3C, frames: 600 },
  { label: 'BGM 0x3E', seId: 0x3E, frames: 600 },
];

// ── Patch renderAudio 来抓 APU trace ──

const origRenderAudio = renderAudio;
const _unused = origRenderAudio; // keep reference

// ── 真正的做法：直接 import NES 和 patch ──

import NES from '../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';

function chName(addr: number) {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
}

function chDesc(addr: number) {
  const r = addr & 3;
  const b = addr & 0xFFFC;
  if (b === 0x4000 || b === 0x4004) return ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][r];
  if (b === 0x4008) return ['Timer', '', 'FreqLo', 'FreqHi'][r];
  if (b === 0x400C) return ['Vol', '', 'Period', 'Len'][r];
  return '';
}

interface TraceEntry {
  frame: number;
  addr: number;
  val: number;
  ch: string;
  desc: string;
}

function traceReal(frames: number): { entries: TraceEntry[]; chCounts: Record<string, number> } {
  const hdr = new Uint8Array([0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08, 0, 0, 0, 0, 0, 0, 0, 1]);
  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(hdr.length + prg.length + chr.length);
  rom.set(hdr, 0); rom.set(prg, hdr.length); rom.set(chr, hdr.length + prg.length);

  const nes = new NES({ emulateSound: true, sampleRate: 48000 });
  nes.loadROM(rom);

  const papu = (nes as any).papu;
  const orig = papu.writeReg.bind(papu);
  const entries: TraceEntry[] = [];
  const chCounts: Record<string, number> = {};

  papu.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      const desc = chDesc(addr);
      if (ch) chCounts[ch] = (chCounts[ch] || 0) + 1;
      if (['FreqLo', 'FreqHi', 'Duty/Vol', 'Vol', 'Sweep', 'Timer', 'Period', 'STAT'].includes(ch) || desc) {
        entries.push({ frame, addr, val, ch, desc });
      }
    }
    return orig(addr, val);
  };

  let frame = 0;
  for (; frame < frames; frame++) {
    try { nes.frame(); } catch (e: any) { break; }
  }
  return { entries, chCounts };
}

// ── Patch mini-audio renderer ──

// 需要 hack：在调用 renderAudio 之前替换 PAPU 的 writeReg
// 但 renderAudio 内部自己创建了 PAPU，没法直接 patch
// 换个思路：直接读 renderer.ts 并创建我们自己的版本

// 最直接的方法：复制 renderAudio 逻辑，自己注入 trace

import CPU from '../mini-audio/cpu';
import PAPU from '../mini-audio/papu/index';
import PRG_BANK_12 from '../rom-data/prg-bank-12';
import PRG_BANK_13 from '../rom-data/prg-bank-13';
import PRG_BANK_14 from '../rom-data/prg-bank-14';
import PRG_BANK_15 from '../rom-data/prg-bank-15';
import PRG_BANK_31 from '../rom-data/prg-bank-31';

const CYCLES_PER_FRAME = 29830;
const SAMPLE_RATE = 48000;

function traceMini(seId: number, maxFrames: number): { entries: TraceEntry[]; chCounts: Record<string, number>; samples: number } {
  const samples: number[] = [];
  let _cpu: any = null;
  let _papu: any = null;

  const entries: TraceEntry[] = [];
  const chCounts: Record<string, number> = {};

  const nes: any = {
    opts: {
      sampleRate: SAMPLE_RATE,
      onAudioSample: (l: number, r: number) => { samples.push((l + r) * 0.5); },
    },
    gameGenie: { enabled: false, applyCodes: (_a: number, v: number) => v },
    fpsFrameCount: 0,
    controllers: [0, 0],
    get cpu() { return _cpu; },
    get papu() { return _papu; },
    get mmap() { return _mmc; },
    get ppu() { return null; },
  };

  _papu = new PAPU(nes);
  
  // ── PATCH PAPU writeReg ──
  const origWriteReg = _papu.writeReg.bind(_papu);
  let frame = 0;
  _papu.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      const desc = chDesc(addr);
      if (ch) chCounts[ch] = (chCounts[ch] || 0) + 1;
      if (['FreqLo', 'FreqHi', 'Duty/Vol', 'Vol', 'Sweep', 'Timer', 'Period'].includes(desc) || ch === 'STAT') {
        entries.push({ frame, addr, val, ch, desc });
      }
    }
    return origWriteReg(addr, val);
  };

  // ── 初始化 RAM ──
  const mem = new Uint8Array(0x800);
  for (let i = 0x0700; i < 0x0800; i++) mem[i] = 0;
  mem[0x0700] = seId;
  mem[0x07FC] = 0;
  for (let g = 0; g < 4; g++) mem[0x07E4 + g] = 0x08;

  // ── MMC3 mapper ──
  let bankSelectReg = 0;
  let regR6 = 12, regR7 = 0;
  
  const AUX_BANKS: Record<number, readonly number[]> = { 0x0D: PRG_BANK_13, 0x0E: PRG_BANK_14, 0x0F: PRG_BANK_15 };
  
  function getBank(addr: number): readonly number[] {
    if (addr < 0xA000) return PRG_BANK_12;
    if (addr < 0xC000) return AUX_BANKS[regR7] || PRG_BANK_12;
    return PRG_BANK_31;
  }

  const _mmc = {
    load(addr: number): number {
      if (addr < 0x2000) return mem[addr & 0x7FF];
      if (addr >= 0x8000) {
        const bank = getBank(addr);
        const baseAddr = addr < 0xA000 ? 0x8000 : addr < 0xC000 ? 0xA000 : addr < 0xE000 ? 0xC000 : 0xE000;
        return bank[(addr - baseAddr) & 0x1FFF];
      }
      return 0;
    },
    write(addr: number, val: number): void {
      if (addr < 0x2000) { mem[addr & 0x7FF] = val & 0xFF; return; }
      if (addr >= 0x4000 && addr <= 0x4017) {
        _papu.writeReg(addr, val);
        return;
      }
      if (addr >= 0x8000) {
        if ((addr & 1) === 0) bankSelectReg = val & 0x07;
        else {
          if (bankSelectReg === 6) regR6 = val & 0x3F;
          if (bankSelectReg === 7) regR7 = val & 0x3F;
        }
      }
    },
  };

  // ── Bootstrap ──
  const code = [
    0xA9, seId,           // LDA #SE_ID
    0x8D, 0x00, 0x07,     // STA $0700
    0xA9, 0x0F,           // LDA #$0F
    0x8D, 0x15, 0x40,     // STA $4015
    0xA2, 0x05,           // LDX #$05
    0x20, 0x02, 0x80,     // JSR $8002
    0x20, 0xBA, 0x80,     // JSR $80BA
    0x4C, 0x0F, 0x02,     // JMP $020F
  ];
  for (let i = 0; i < code.length; i++) mem[0x0200 + i] = code[i];

  // ── CPU ──
  _cpu = new CPU(nes);
  // 把 mem 指向我们的 RAM
  (_cpu as any).mem = mem;
  _cpu.REG_SP = 0xFD;
  _cpu.REG_STATUS = 0x04;
  _cpu.setStatus(0x04);
  _cpu.REG_A = 0;
  _cpu.REG_X = 0;
  _cpu.REG_Y = 0;
  _cpu.REG_PC = 0x01FF;

  // ── 运行 ──
  for (frame = 0; frame < maxFrames; frame++) {
    let frameCycles = 0;
    while (frameCycles < CYCLES_PER_FRAME) {
      try {
        const cyc = _cpu.emulate();
        frameCycles += cyc;
        _papu.clockFrameCounter(cyc);
        const pc = _cpu.REG_PC;
        if (pc < 0x0200 || (pc >= 0x2000 && pc < 0x8000)) break;
      } catch (_e) { break; }
    }
  }

  return { entries, chCounts, samples: samples.length };
}

// ── Main ──

const out: string[] = [];
function log(s: string) { out.push(s); console.log(s); }

async function main() {
  log('='.repeat(70));
  log('Mini-Audio vs Real ROM APU Trace 对比');
  log('='.repeat(70));

  // 基准：真实 ROM 前 4500 帧
  log('\n── 真实 ROM (F0-F4500) ──');
  const real = traceReal(4500);
  log(`  SQ1: ${real.chCounts['SQ1'] || 0}   SQ2: ${real.chCounts['SQ2'] || 0}   TRI: ${real.chCounts['TRI'] || 0}   NOISE: ${real.chCounts['NOISE'] || 0}   DMC: ${real.chCounts['DMC'] || 0}   STAT: ${real.chCounts['STAT'] || 0}`);

  // 测试每个 SE ID
  for (const tc of TEST_CASES) {
    log(`\n── ${tc.label} (ID=0x${tc.seId.toString(16)}, ${tc.frames}frames) ──`);
    try {
      const result = traceMini(tc.seId, tc.frames);
      log(`  写入: SQ1=${result.chCounts['SQ1']||0} SQ2=${result.chCounts['SQ2']||0} TRI=${result.chCounts['TRI']||0} NOISE=${result.chCounts['NOISE']||0} DMC=${result.chCounts['DMC']||0} STAT=${result.chCounts['STAT']||0}  samples=${result.samples}`);
      if (result.entries.length > 0) {
        log(`  首5条:`);
        for (let i = 0; i < Math.min(5, result.entries.length); i++) {
          const e = result.entries[i];
          log(`    F${e.frame} $${e.addr.toString(16).toUpperCase()}=0x${e.val.toString(16).padStart(2,'0')} ${e.ch} ${e.desc}`);
        }
      } else {
        log(`  ⚠️ 无 APU 写入！`);
      }
    } catch(e: any) {
      log(`  ❌ 崩溃: ${e.message || e}`);
    }
  }

  // 对比：真实 vs mini-audio 前 10 条频率写入
  log('\n── 开场 BGM 前10条频率写入 对比 ──');
  log('  真实ROM (F281起):');
  const realFreqs = real.entries.filter(e => e.desc === 'FreqLo' || e.desc === 'FreqHi');
  for (let i = 0; i < Math.min(10, realFreqs.length); i++) {
    const e = realFreqs[i];
    log(`    F${e.frame} $${e.addr.toString(16).toUpperCase()}=0x${e.val.toString(16).padStart(2,'0')} ${e.ch}`);
  }

  fs.writeFileSync(OUT, out.join('\n'), 'utf-8');
  log(`\n结果: ${OUT}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
