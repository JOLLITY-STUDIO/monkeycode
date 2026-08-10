/**
 * 精简模拟器 vs Tsubasa2AudioPlayer — APU 寄存器逐帧 dump 对比
 * 两者跑相同帧数，记录每帧写入 $4000-$4015 的 (addr, value)，
 * 找出第一处差异。
 */
import { NesAudio } from '../mini-audio/emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from '../mini-audio/rom-data/index';
import {
  Tsubasa2AudioPlayer,
  BGM00_TRACK_SQ1,
  BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI,
  BGM00_TRACK_NOISE,
} from '../mini-audio/bgm-data/index';

const MAX_FRAMES = 600;
const SAMPLE_RATE = 48000;

// ════════════════════════════════════
// APU Write Tracer
// ════════════════════════════════════

type ApuWrite = { addr: number; value: number };

function hookPap(papu: any, writes: ApuWrite[]): void {
  const orig = papu.writeReg.bind(papu);
  papu.writeReg = (addr: number, val: number) => {
    if (addr >= 0x4000 && addr <= 0x4015) {
      writes.push({ addr, value: val & 0xFF });
    }
    return orig(addr, val);
  };
}

// ════════════════════════════════════
// 精简模拟器
// ════════════════════════════════════

function runEmu(frames: number): { writes: ApuWrite[]; sampleCount: number } {
  const prgArr = new Uint8Array(NES_PRG_ROM);
  const chrArr = new Uint8Array(NES_CHR_ROM);
  const nes = new NesAudio();
  nes.loadROMArrays(prgArr, chrArr);

  const writes: ApuWrite[] = [];
  hookPap(nes.papu, writes);

  let sampleCount = 0;
  nes.opts.onAudioSample = (_l: number, _r: number) => { sampleCount++; };

  for (let f = 0; f < frames; f++) {
    nes.frame();
  }

  nes.opts.onAudioSample = null;
  return { writes, sampleCount };
}

// ════════════════════════════════════
// 纯 TS 音序器
// ════════════════════════════════════

function runSeq(frames: number): { writes: ApuWrite[]; sampleCount: number } {
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
  player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE);
  if (!player.start()) return { writes: [], sampleCount: 0 };

  const writes: ApuWrite[] = [];
  hookPap(player.papu, writes);

  let sampleCount = 0;
  player.onSample = (_l: number, _r: number) => { sampleCount++; };

  for (let f = 0; f < frames && player.progress.playing; f++) {
    player.tick();
  }

  player.onSample = null;
  return { writes, sampleCount };
}

// ════════════════════════════════════
// 对比
// ════════════════════════════════════

function run() {
  console.log(`\n=== 精简模拟器 (${MAX_FRAMES} 帧) ===`);
  console.time('emu');
  const emu = runEmu(MAX_FRAMES);
  console.timeEnd('emu');
  console.log(`APU writes: ${emu.writes.length}, samples: ${emu.sampleCount}`);

  console.log(`\n=== 纯 TS 音序器 (${MAX_FRAMES} 帧) ===`);
  console.time('seq');
  const seq = runSeq(MAX_FRAMES);
  console.timeEnd('seq');
  console.log(`APU writes: ${seq.writes.length}, samples: ${seq.sampleCount}`);

  // 逐条对比
  const minLen = Math.min(emu.writes.length, seq.writes.length);
  let firstDiffAt = -1;
  let diffs = 0;
  const maxDiffs = 40;

  for (let i = 0; i < minLen; i++) {
    const e = emu.writes[i];
    const s = seq.writes[i];
    if (e.addr !== s.addr || e.value !== s.value) {
      if (firstDiffAt < 0) firstDiffAt = i;
      diffs++;
      if (diffs <= maxDiffs) {
        console.log(
          `  [${i}] EMU: $${e.addr.toString(16).padStart(4, '0')}=$${e.value.toString(16).padStart(2, '0')}  ` +
          `SEQ: $${s.addr.toString(16).padStart(4, '0')}=$${s.value.toString(16).padStart(2, '0')}`
        );
      }
    }
  }

  if (emu.writes.length !== seq.writes.length) {
    console.log(`\n长度不同: EMU=${emu.writes.length}, SEQ=${seq.writes.length}`);
  }

  if (firstDiffAt < 0) {
    console.log('\n✅ 前 ${minLen} 条 APU 写入完全一致!');
  } else {
    console.log(`\n❌ 第一处差异在索引 ${firstDiffAt}，共 ${diffs} 处差异`);
  }

  // 按寄存器统计差异
  const emuByAddr = new Map<number, number[]>();
  const seqByAddr = new Map<number, number[]>();
  for (let i = 0; i < minLen; i++) {
    const e = emu.writes[i];
    const s = seq.writes[i];
    if (e.addr === s.addr && e.value !== s.value) {
      if (!emuByAddr.has(e.addr)) emuByAddr.set(e.addr, []);
      if (!seqByAddr.has(e.addr)) seqByAddr.set(e.addr, []);
      emuByAddr.get(e.addr)!.push(e.value);
      seqByAddr.get(e.addr)!.push(s.value);
    }
  }
  if (emuByAddr.size > 0) {
    console.log('\n--- 寄存器值差异汇总 (仅当 addr 相同时) ---');
    for (const [addr, evals] of emuByAddr) {
      const svals = seqByAddr.get(addr) || [];
      console.log(`  $${addr.toString(16).padStart(4, '0')}: EMU head 5: [${evals.slice(0, 5).map(v => '$' + v.toString(16).padStart(2,'0')).join(',')}]  SEQ: [${svals.slice(0, 5).map(v => '$' + v.toString(16).padStart(2,'0')).join(',')}]`);
    }
  }
}

run();
