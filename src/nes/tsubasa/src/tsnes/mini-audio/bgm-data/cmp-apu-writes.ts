/**
 * APU 写入对比：emu 路径 vs BGM00Player 路径
 * 用法: npx tsx mini-audio/bgm-data/cmp-apu-writes.ts [对比起始帧=281]
 */
import { NesAudio } from '../emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';
import { BGM00Player } from './BGM00Player';
import { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW } from './BGM00';

const SAMPLE_RATE = 48000;
const TOTAL_FRAMES = 1800;
const EMU_BGM_START = parseInt(process.argv[2]) || 281;

type ApuWrite = { f: number; addr: number; val: number; ch: string };

function chName(addr: number): string {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
}

// ═══ 从 emu 提取 APU 写入 ═══
function emuApuWrites(maxFrames: number): ApuWrite[] {
  const writes: ApuWrite[] = [];
  const prgArr = new Uint8Array(NES_PRG_ROM as number[]);
  const chrArr = new Uint8Array(NES_CHR_ROM as number[]);
  const nes = new NesAudio();
  nes.loadROMArrays(prgArr, chrArr);

  // Hook APU write
  const papu = nes.papu as any;
  const origWr = papu.writeReg.bind(papu);
  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) {
        writes.push({ f: nes.frameCount, addr, val, ch });
      }
    }
    return origWr(addr, val);
  };

  console.log(`Running emu for ${maxFrames} frames...`);
  const t0 = Date.now();
  for (let f = 0; f < maxFrames; f++) {
    nes.frame();
    if (f % 300 === 299) console.log(`  ${f + 1}/${maxFrames}`);
  }
  console.log(`Emu done in ${((Date.now() - t0) / 1000).toFixed(1)}s, ${writes.length} total APU writes`);
  return writes;
}

// ═══ 从 BGM00Player 提取 APU 写入 ═══
function playerApuWrites(maxFrames: number): ApuWrite[] {
  const writes: ApuWrite[] = [];
  const player = new BGM00Player(SAMPLE_RATE);
  const papu = player.papu as any;
  const origWr = papu.writeReg.bind(papu);
  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) {
        writes.push({ f: player.progress.frame, addr, val, ch });
      }
    }
    return origWr(addr, val);
  };

  // Pass full BGM00_RAW for CALL/JUMP NES address resolution
  // Base address 0xB7AD = BGM00_RAW[13] → NES $B7BA minus 13
  player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
  player.start();

  console.log(`Running BGM00Player for ${maxFrames} frames...`);
  const t0 = Date.now();
  for (let f = 0; f < maxFrames && player.progress.playing; f++) {
    player.tick();
  }
  console.log(`Player done in ${((Date.now() - t0) / 1000).toFixed(1)}s, ${writes.length} APU writes, stopped at F${player.progress.frame}`);
  return writes;
}

// ═══ 对比 ═══
function compare(emuWrites: ApuWrite[], playerWrites: ApuWrite[], emuOffset: number) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Emu BGM starts at F${emuOffset}. Aligning emu: F${emuOffset} ↔ Player F0`);
  console.log(`${'='.repeat(70)}`);

  // Filter emu writes to only BGM range
  const emuBgm = emuWrites.filter(w => w.f >= emuOffset);
  // Rebase emu frame numbers to start at 0
  const emuNormalized = emuBgm.map(w => ({ ...w, f: w.f - emuOffset }));

  // Stats by channel
  function chStats(writes: ApuWrite[], label: string) {
    const chs: Record<string, { total: number; freqs: number; dutyVol: number; sweep: number }> = {};
    for (const w of writes) {
      if (!chs[w.ch]) chs[w.ch] = { total: 0, freqs: 0, dutyVol: 0, sweep: 0 };
      chs[w.ch].total++;
      const r = w.addr & 3;
      if (r === 0) chs[w.ch].dutyVol++;
      else if (r === 1) chs[w.ch].sweep++;
      else if (r === 2) chs[w.ch].freqs++;
    }
    console.log(`\n${label} (${writes.length} writes):`);
    for (const [ch, s] of Object.entries(chs)) {
      if (s.total === 0) continue;
      console.log(`  ${ch.padEnd(5)}: total=${String(s.total).padStart(4)}  vol/duty=${String(s.dutyVol).padStart(4)}  sweep=${String(s.sweep).padStart(4)}  freq=${String(s.freqs).padStart(4)}`);
    }
  }
  chStats(emuNormalized, 'Emu (rebase)');
  chStats(playerWrites, 'BGM00Player');

  // Frame-by-frame diff
  const maxF = Math.max(
    emuNormalized.length > 0 ? emuNormalized[emuNormalized.length - 1].f : 0,
    playerWrites.length > 0 ? playerWrites[playerWrites.length - 1].f : 0,
  );

  // Per-frame set of (addr,val)
  function frameMap(writes: ApuWrite[]): Map<number, Array<[number, number]>> {
    const m = new Map<number, Array<[number, number]>>();
    for (const w of writes) {
      if (!m.has(w.f)) m.set(w.f, []);
      m.get(w.f)!.push([w.addr, w.val]);
    }
    return m;
  }

  const emuMap = frameMap(emuNormalized);
  const playerMap = frameMap(playerWrites);

  let matchFrames = 0;
  let diffFrames = 0;
  const diffs: string[] = [];

  for (let f = 0; f <= maxF; f++) {
    const ev = emuMap.get(f) || [];
    const pv = playerMap.get(f) || [];
    const eSet = new Set(ev.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));
    const pSet = new Set(pv.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));

    if (eSet.size === 0 && pSet.size === 0) continue;

    if (eSet.size === pSet.size && [...eSet].every(x => pSet.has(x))) {
      matchFrames++;
    } else {
      diffFrames++;
      if (diffFrames <= 60) {
        diffs.push(`\nF${f} DIFF:`);
        diffs.push(`  Emu   (${eSet.size}): ${[...eSet].sort().join(', ')}`);
        diffs.push(`  Player(${pSet.size}): ${[...pSet].sort().join(', ')}`);
        // Show per-channel diffs
        const emuCh = new Set(ev.map(a => `${chName(a[0])} ${a[0].toString(16)}`));
        const playerCh = new Set(pv.map(a => `${chName(a[0])} ${a[0].toString(16)}`));
        diffs.push(`  Emu chs:   ${[...emuCh].sort().join(', ')}`);
        diffs.push(`  Player chs: ${[...playerCh].sort().join(', ')}`);
      }
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`Frame match: ${diffFrames} 帧差异  /  ${matchFrames + diffFrames} 总帧`);
  for (const d of diffs) console.log(d);

  // Show first 20 player writes
  console.log(`\n${'='.repeat(70)}`);
  console.log(`First 20 BGM00Player writes:`);
  for (const w of playerWrites.slice(0, 20)) {
    console.log(`  F${String(w.f).padStart(4)} $${w.addr.toString(16).padStart(4,'0')}=0x${w.val.toString(16).padStart(2,'0')} ${w.ch}`);
  }
  console.log(`\nFirst 20 Emu BGM writes (rebase):`);
  for (const w of emuNormalized.slice(0, 20)) {
    console.log(`  F${String(w.f).padStart(4)} $${w.addr.toString(16).padStart(4,'0')}=0x${w.val.toString(16).padStart(2,'0')} ${w.ch}`);
  }
}

// ═══ MAIN ═══
import * as fs from 'fs';
import * as path from 'path';

const emuWrites = emuApuWrites(TOTAL_FRAMES + EMU_BGM_START);
const playerWrites = playerApuWrites(TOTAL_FRAMES);

// Redirect console output to file + stdout
const logLines: string[] = [];
const origLog = console.log;
console.log = (...args: any[]) => {
  logLines.push(args.map(String).join(' '));
  origLog(...args);
};

compare(emuWrites, playerWrites, EMU_BGM_START);

const outPath = path.join(__dirname, '_cmp_apu_result.txt');
fs.writeFileSync(outPath, logLines.join('\n'), 'utf-8');
origLog(`\n[SAVED] ${outPath}`);
