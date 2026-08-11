/**
 * BGM00 A/B APU 写入对比 — TS 直接版
 * npx tsx mini-audio/bgm-data/_run_cmp.ts [--quick] [--no-cache]
 */
import * as path from 'path';
import * as fs from 'fs';
import NES from '../../src/nes';
import {
  Tsubasa2AudioPlayer,
  BGM00_RAW, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
} from './index';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';

const SAMPLE_RATE = 48000;
const NES_FRAMES = 4500;
const PLR_MAX_FRAMES = 3000;

// ═══ 辅助 ═══
const chName = (addr: number) => {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
};

const regDesc = (addr: number) => {
  const r = addr & 3, b = addr & 0xFFFC;
  if (b === 0x4000 || b === 0x4004) return ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][r];
  if (b === 0x4008) return ['Linear', '', 'FreqLo', 'FreqHi'][r];
  if (b === 0x400C) return ['Vol', '', 'Period', 'Len'][r];
  return '';
};

const INES_HEADER = new Uint8Array([
  0x4E,0x45,0x53,0x1A, 0x10,0x10,0x40,0x08,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,
]);

interface ApuWrite { f: number; addr: number; val: number; ch: string; }

// ═══ A 侧: NES 模拟器 APU trace ═══
function runNesEmu(frameCount: number): ApuWrite[] {
  const prg = new Uint8Array(NES_PRG_ROM as number[]);
  const chr = new Uint8Array(NES_CHR_ROM as number[]);
  const rom = new Uint8Array(INES_HEADER.length + prg.length + chr.length);
  rom.set(INES_HEADER, 0); rom.set(prg, 16); rom.set(chr, 16 + prg.length);

  const nes = new NES({ emulateSound: true, sampleRate: SAMPLE_RATE }) as any;
  nes.loadROM(rom);

  const writes: ApuWrite[] = [];
  const papu = nes.papu;
  const origWr = papu.writeReg.bind(papu);
  let curFrame = 0;
  papu.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) writes.push({ f: curFrame, addr, val, ch });
    }
    return origWr(addr, val);
  };

  console.log(`[NES] Running ${frameCount} frames...`);
  const t0 = Date.now();
  for (let f = 0; f < frameCount; f++) {
    curFrame = f;
    nes.frame();
    if ((f + 1) % 500 === 0) console.log(`  ${f+1}/${frameCount}`);
  }
  console.log(`[NES] Done in ${((Date.now()-t0)/1000).toFixed(1)}s, ${writes.length} writes`);
  return writes;
}

// ═══ B 侧: TS 引擎 APU trace ═══
function runTsPlayer(maxFrames: number): ApuWrite[] {
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
  const writes: ApuWrite[] = [];

  const papu = (player as any).papu;
  const origWr = papu.writeReg.bind(papu);
  papu.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) writes.push({ f: player.progress.frame, addr, val, ch });
    }
    return origWr(addr, val);
  };

  player.load(
    BGM00_TRACK_SQ1 as number[], BGM00_TRACK_SQ2 as number[],
    BGM00_TRACK_TRI as number[], BGM00_TRACK_NOISE as number[],
    BGM00_RAW as number[], 0xB7AD,
  );
  player.start();

  console.log(`[TS] Running ${maxFrames} frames of BGM00...`);
  const t0 = Date.now();
  for (let f = 0; f < maxFrames; f++) {
    player.tick();
    if (!player.progress.playing) {
      console.log(`  BGM ended at F${player.progress.frame}`);
      break;
    }
  }
  console.log(`[TS] Done in ${((Date.now()-t0)/1000).toFixed(1)}s, ${writes.length} writes, ended F${player.progress.frame}`);
  return writes;
}

// ═══ 自动同步 ═══
function findSyncOffset(emuTrace: ApuWrite[], playerTrace: ApuWrite[]) {
  if (playerTrace.length < 10 || emuTrace.length < 20) return { offset: 0, score: 'too_short' };

  const SYNC_SAMPLE = 50;
  const sample = playerTrace.slice(0, SYNC_SAMPLE);
  const firstBF = sample[0].f;

  const emuByFrame = new Map<number, ApuWrite[]>();
  for (const w of emuTrace) {
    if (!emuByFrame.has(w.f)) emuByFrame.set(w.f, []);
    emuByFrame.get(w.f)!.push(w);
  }

  const maxEmuF = emuTrace[emuTrace.length - 1].f;
  const searchEnd = maxEmuF - (sample[sample.length - 1].f - firstBF) - 1;
  let bestOffset = 0, bestScore = -Infinity;

  for (let offsetF = 0; offsetF < searchEnd; offsetF++) {
    let score = 0, matched = 0, checked = 0;
    for (const sw of sample) {
      const emuF = sw.f - firstBF + offsetF;
      const ew = emuByFrame.get(emuF);
      checked++;
      if (ew) {
        for (const e of ew) {
          if (e.addr === sw.addr && e.val === sw.val) { matched++; break; }
        }
      }
    }
    score = matched * 10 - (matched < checked / 3 ? 200 : 0);
    if (score > bestScore) { bestScore = score; bestOffset = offsetF; }
    if (matched >= sample.length * 0.85) break;
  }

  return { offset: bestOffset, score: (bestScore / sample.length).toFixed(2) };
}

// ═══ 对比 ═══
interface AlignedWrite { f: number; addr: number; val: number; ch: string; }

function compare(emuTrace: ApuWrite[], playerTrace: ApuWrite[], syncOffset: number) {
  const lines: string[] = [];
  lines.push('='.repeat(70));
  lines.push('BGM00 A/B APU 写入逐帧对比');
  lines.push('='.repeat(70));
  lines.push(`同步偏移: F${syncOffset} (NES该帧 = TS F0)`);
  lines.push(`NES:${emuTrace.length}w PLR:${playerTrace.length}w`);
  lines.push('');

  const firstBF = playerTrace[0].f;
  const emuAligned: AlignedWrite[] = emuTrace
    .filter(w => w.f >= syncOffset)
    .map(w => ({ f: w.f - syncOffset, addr: w.addr, val: w.val, ch: w.ch }));
  const plrAligned: AlignedWrite[] = playerTrace.map(w => ({ f: w.f - firstBF, addr: w.addr, val: w.val, ch: w.ch }));

  function frameSet(writes: AlignedWrite[]) {
    const m = new Map<number, [number, number][]>();
    for (const w of writes) {
      if (!m.has(w.f)) m.set(w.f, []);
      m.get(w.f)!.push([w.addr, w.val]);
    }
    return m;
  }

  const emuMap = frameSet(emuAligned);
  const plrMap = frameSet(plrAligned);
  const maxF = Math.max(
    emuAligned.length > 0 ? emuAligned[emuAligned.length - 1].f : 0,
    plrAligned.length > 0 ? plrAligned[plrAligned.length - 1].f : 0,
  );

  let match = 0, diff = 0;
  let emuOnly = 0, plrOnly = 0;
  const diffFrames: string[] = [];

  for (let f = 0; f <= maxF; f++) {
    const ev = emuMap.get(f) || [];
    const pv = plrMap.get(f) || [];
    if (ev.length === 0 && pv.length === 0) continue;

    const eStrs = new Set(ev.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));
    const pStrs = new Set(pv.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));

    if (eStrs.size === pStrs.size && [...eStrs].every(x => pStrs.has(x))) {
      match++;
    } else {
      diff++;
      if (ev.length === 0) plrOnly++;
      if (pv.length === 0) emuOnly++;
      if (diffFrames.length < 40) {
        const rows = [`\nF${f} DIFF:`];
        const emuCh = ev.map(a => `$${a[0].toString(16).padStart(4,'0')}=0x${a[1].toString(16).padStart(2,'0')} ${chName(a[0])}`);
        const plrCh = pv.map(a => `$${a[0].toString(16).padStart(4,'0')}=0x${a[1].toString(16).padStart(2,'0')} ${chName(a[0])}`);
        if (emuCh.length) rows.push(`  EMU: ${emuCh.join(', ')}`);
        else rows.push(`  EMU: (none)`);
        if (plrCh.length) rows.push(`  PLR: ${plrCh.join(', ')}`);
        else rows.push(`  PLR: (none)`);
        diffFrames.push(rows.join('\n'));
      }
    }
  }

  // F0-F14 detail
  lines.push('--- F0-F14 逐帧对比 ---');
  for (let f = 0; f <= 14; f++) {
    const ev = emuMap.get(f) || [];
    const pv = plrMap.get(f) || [];
    const allMatch = ev.length === pv.length && ev.every((e, i) => e[0] === (pv[i]?.[0]) && e[1] === (pv[i]?.[1]));
    lines.push(`F${f} ${allMatch ? '✓' : '✗'} EMU(${ev.length}) PLR(${pv.length})`);
    for (const [a, v] of ev) {
      const pm = pv.find(p => p[0] === a);
      const marker = pm ? (pm[1] === v ? '==' : `≠ PLR=0x${pm[1].toString(16)}`) : 'EMU-ONLY';
      lines.push(`  $${a.toString(16).padStart(4,'0')}:0x${v.toString(16).padStart(2,'0')} ${chName(a).padEnd(5)} ${regDesc(a).padEnd(8)} ${marker}`);
    }
    for (const [a, v] of pv) {
      if (!ev.find(e => e[0] === a)) {
        lines.push(`  $${a.toString(16).padStart(4,'0')}: PLR-ONLY 0x${v.toString(16).padStart(2,'0')} ${chName(a).padEnd(5)} ${regDesc(a)}`);
      }
    }
  }

  // Channel stats
  function chStats(writes: AlignedWrite[], label: string) {
    const chs: Record<string, { total: number; vol: number; sw: number; fl: number; fh: number }> = {};
    for (const w of writes) {
      if (!chs[w.ch]) chs[w.ch] = { total: 0, vol: 0, sw: 0, fl: 0, fh: 0 };
      chs[w.ch].total++;
      const r = w.addr & 3;
      if (r === 0) chs[w.ch].vol++;
      else if (r === 1) chs[w.ch].sw++;
      else if (r === 2) chs[w.ch].fl++;
      else chs[w.ch].fh++;
    }
    lines.push(`\n${label}:`);
    for (const [ch, s] of Object.entries(chs)) {
      lines.push(`  ${ch.padEnd(5)}: T=${s.total.toString().padStart(4)} V=${s.vol.toString().padStart(3)} Sw=${s.sw.toString().padStart(3)} FL=${s.fl.toString().padStart(3)} FH=${s.fh.toString().padStart(3)}`);
    }
  }
  chStats(emuAligned, 'EMU (aligned)');
  chStats(plrAligned, 'PLR (aligned)');

  lines.push(`\n--- 结果 ---`);
  lines.push(`匹配: ${match} | 差异: ${diff} (EMU-ONLY:${emuOnly} PLR-ONLY:${plrOnly})`);
  lines.push(`匹配率: ${(match/Math.max(match+diff,1)*100).toFixed(1)}%`);

  if (diffFrames.length > 0) {
    lines.push(`\n--- 差异详情 (前${diffFrames.length}帧) ---`);
    lines.push(...diffFrames);
  }
  lines.push('');

  return { lines, match, diff, emuOnly, plrOnly };
}

// ═══ MAIN ═══
async function main() {
  const quick = process.argv.includes('--quick');
  const emuFrames = quick ? 600 : NES_FRAMES;
  const plrFrames = quick ? 600 : PLR_MAX_FRAMES;
  const suffix = quick ? '_quick' : '';
  console.log(`=== BGM00 A/B APU 对比${quick ? ' (QUICK)' : ''} ===\n`);

  // A side
  const emuJsonPath = path.join(__dirname, `_emu_trace${suffix}.json`);
  let emuWrites: ApuWrite[];
  if (process.argv.includes('--no-cache') || !fs.existsSync(emuJsonPath)) {
    emuWrites = runNesEmu(emuFrames);
    fs.writeFileSync(emuJsonPath, JSON.stringify(emuWrites), 'utf-8');
    console.log(`[CACHE] Saved: ${emuJsonPath}`);
  } else {
    console.log(`[CACHE] Loading: ${emuJsonPath}`);
    emuWrites = JSON.parse(fs.readFileSync(emuJsonPath, 'utf-8'));
    console.log(`[CACHE] ${emuWrites.length} writes loaded`);
  }

  // B side
  const playerWrites = runTsPlayer(plrFrames);

  // Sync
  const { offset, score } = findSyncOffset(emuWrites, playerWrites);
  console.log(`\n[SYNC] Offset F${offset}, Score ${score}`);

  // Compare
  const { lines, match, diff } = compare(emuWrites, playerWrites, offset);

  // Output
  const outPath = path.join(__dirname, `_cmp_result${suffix}.txt`);
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`\n[DONE] Result → ${outPath}`);
  console.log(`Match: ${match}/${match+diff}, Diff: ${diff}`);
  console.log('\n' + lines.slice(0, 35).join('\n'));
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
