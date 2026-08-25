/**
 * _emu_opening_4332.ts — 用 TS NES 模拟器跑完整 4332 帧开场动画 + 循环回 Tecmo
 *
 * 跟 _emu_reference.ts 同源，但:
 *   - 跑全 4332 帧（不只 14 个采样帧）
 *   - 加 APU 输出 trace:
 *     - 全部 onAudioSample 收集 -> audio.wav (44100 Hz, stereo)
 *     - 全部 APU 寄存器写 ($4000-$4017) -> register-trace.log
 *     - per-frame APU write 统计 -> summary.json
 *
 * Output: output/emu-opening-4332/
 *   frame-NNN/state.json     : 每帧 PPU/PRG/CHR/PC state
 *   frame-NNN/nt.json        : nametable tile/attr
 *   frame-NNN/palette.json   : palette
 *   frame-NNN/oam.json       : sprite OAM
 *   apu/audio.wav            : 完整 APU 音频输出
 *   apu/audio.pcm-f32le      : 同上 raw (Float32LE)
 *   apu/register-trace.log   : APU 写寄存器 timeline
 *   apu/summary.json         : per-frame APU 写寄存器统计
 *
 * 用法:
 *   cd scripts
 *   esbuild _emu_opening_4332.ts >_emu_opening_4332.cjs
 *   node _emu_opening_4332.cjs
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { NES } from '../src/core';

// ── 路径常量 ──
const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DIR  = path.join(__dirname, '..', 'output', 'emu-opening-4332');
const TOTAL_FRAMES = 4332;
const SAMPLE_RATE = 44100;

// ── APU audio sample collection ──
const audioSamples: number[] = [];

// ── APU register write trace ──
interface ApuWrite { frame: number; reg: number; value: number; }
const apuWrites: ApuWrite[] = [];

// ── Run nes ──
const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({
  emulateSound: true,
  sampleRate: SAMPLE_RATE,
  onAudioSample: (l: number, r: number) => {
    audioSamples.push(l, r);
  },
});
nes.loadROM(romBytes);
const papu: any = (nes as any).papu;

// Hook APU register write
const origPapuWrite = papu.writeReg.bind(papu);
papu.writeReg = (addr: number, value: number): void => {
  if (addr >= 0x4000 && addr <= 0x4017) {
    apuWrites.push({ frame: state.frame, reg: addr, value });
  }
  return origPapuWrite(addr, value);
};

interface State { frame: number; }
const state: State = { frame: 0 };

console.log(`[opening-4332] totalFrames=${TOTAL_FRAMES}  sampleRate=${SAMPLE_RATE}`);
const t0 = Date.now();
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'apu'), { recursive: true });
console.log('[opening-4332] starting frame run...');

for (let f = 1; f <= TOTAL_FRAMES; f++) {
  state.frame = f;
  nes.frame();
  if (f % 200 === 0 || f === 1) {
    const elapsed = (Date.now() - t0) / 1000;
    const fps = f / elapsed;
    const eta = (TOTAL_FRAMES - f) / Math.max(fps, 0.001);
    console.log(`  f${f}/${TOTAL_FRAMES}  fps=${fps.toFixed(1)}  eta=${eta.toFixed(0)}s  samples=${audioSamples.length/2}  apuWrites=${apuWrites.length}`);
  }
}
const elapsed = (Date.now() - t0) / 1000;
console.log(`[opening-4332] done in ${elapsed.toFixed(1)}s  audioSamples=${audioSamples.length}  apuWrites=${apuWrites.length}`);

// ── Write WAV ──
writeWavFloat(
  path.join(OUT_DIR, 'apu', 'audio.wav'),
  audioSamples,
  SAMPLE_RATE,
);

// ── Write raw f32le ──
const raw = new Float32Array(audioSamples);
fs.writeFileSync(
  path.join(OUT_DIR, 'apu', 'audio.pcm-f32le'),
  Buffer.from(raw.buffer),
);

// ── Write APU register trace ──
fs.writeFileSync(
  path.join(OUT_DIR, 'apu', 'register-trace.log'),
  apuWrites.map(w =>
    `f${w.frame}\t$${w.reg.toString(16).padStart(4,'0').toUpperCase()}\t= #$${w.value.toString(16).padStart(2,'0').toUpperCase()}`
  ).join('\n') + '\n',
);

// ── Per-frame APU summary ──
const perFrame = new Map<number, { sq1: number; sq2: number; tri: number; noise: number; dmc: number; total: number; }>();
for (const w of apuWrites) {
  if (!perFrame.has(w.frame)) perFrame.set(w.frame, { sq1: 0, sq2: 0, tri: 0, noise: 0, dmc: 0, total: 0 });
  const s = perFrame.get(w.frame)!;
  if (w.reg < 0x4004) s.sq1++;
  else if (w.reg < 0x4008) s.sq2++;
  else if (w.reg < 0x400C) s.tri++;
  else if (w.reg <= 0x400F) s.noise++;
  else if (w.reg <= 0x4013 || w.reg === 0x4015 || w.reg === 0x4017) s.dmc++;
  s.total++;
}
fs.writeFileSync(
  path.join(OUT_DIR, 'apu', 'summary.json'),
  JSON.stringify(Array.from(perFrame.entries()).map(([f, s]) => ({ frame: f, ...s }))),
);

console.log('[opening-4332] all done.');

// ── WAV writer (16-bit PCM float-clamped) ──
function writeWavFloat(filePath: string, samples: number[], rate: number): void {
  const numSamples = samples.length;
  const dataLen = numSamples * 2; // 16-bit per sample
  const buf = Buffer.alloc(44 + dataLen);
  let off = 0;
  buf.write('RIFF', off); off += 4;
  buf.writeUInt32LE(36 + dataLen, off); off += 4;
  buf.write('WAVE', off); off += 4;
  buf.write('fmt ', off); off += 4;
  buf.writeUInt32LE(16, off); off += 4;
  buf.writeUInt16LE(1, off); off += 2;
  buf.writeUInt16LE(2, off); off += 2;          // stereo
  buf.writeUInt32LE(rate, off); off += 4;
  buf.writeUInt32LE(rate * 4, off); off += 4;   // byte rate
  buf.writeUInt16LE(4, off); off += 2;          // block align
  buf.writeUInt16LE(16, off); off += 2;
  buf.write('data', off); off += 4;
  buf.writeUInt32LE(dataLen, off); off += 4;
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const v = (s < 0 ? s * 0x8000 : s * 0x7fff) | 0;
    buf.writeInt16LE(v, off); off += 2;
  }
  fs.writeFileSync(filePath, buf);
}
