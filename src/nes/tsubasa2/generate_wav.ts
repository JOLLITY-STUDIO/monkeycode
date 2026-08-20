/**
 * generate_wav.ts — 用 bank12 引擎 + PAPU 生成 WAV
 * 用法: npx tsx generate_wav.ts [bgmIdHex] [frames] [output.wav]
 * 默认: BGM 0x36, 3600帧(60秒), output.wav
 */
import fs from 'fs';
import path from 'path';
import PAPU from './src/core/papu/index';
import { Bank12AudioEngine } from './src/game/service/bank12_audio_engine';
import * as bgmMod from './src/game/data/prg/audio/bgm/BGM_0x36';

function writeWav(filename: string, samplesL: number[], samplesR: number[], sampleRate: number) {
  const n = samplesL.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22); buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  let off = 44;
  for (let i = 0; i < n; i++) {
    const l = Math.max(-1, Math.min(1, samplesL[i]));
    const r = Math.max(-1, Math.min(1, samplesR[i]));
    buf.writeInt16LE((l * 32767) | 0, off); off += 2;
    buf.writeInt16LE((r * 32767) | 0, off); off += 2;
  }
  fs.writeFileSync(filename, buf);
  console.log(`WAV: ${filename} (${n} samples, ${(n/sampleRate).toFixed(1)}s)`);
}

async function main() {
  const bgmId = 0x36; // 默认 BGM 0x36
  const frames = parseInt(process.argv[3] || '3600');
  const outFile = process.argv[4] || 'output.wav';
  const sampleRate = 44100;

  console.log(`Generating WAV: BGM=0x${bgmId.toString(16)}, frames=${frames}`);

  const papu = new PAPU(sampleRate);
  const engine = new Bank12AudioEngine(papu as any);

  // 用 BGM_0x36.ts 的数据
  const sq1 = (bgmMod as any).BGM_36_TRACK_SQ1;
  const sq2 = (bgmMod as any).BGM_36_TRACK_SQ2;
  const tri = (bgmMod as any).BGM_36_TRACK_TRI;
  const noise = (bgmMod as any).BGM_36_TRACK_NOISE;
  const raw = (bgmMod as any).BGM_36_RAW;
  const base = (bgmMod as any).BGM_36_NES_BASE;
  const hdrOff = (bgmMod as any).BGM_36_HEADER_OFFSET || 0;
  console.log(`BGM 0x36: sq1=${sq1?.length} sq2=${sq2?.length} tri=${tri?.length} noise=${noise?.length} raw=${raw?.length} base=0x${(base||0).toString(16)} hdrOff=${hdrOff}`);

  if (!sq1) { console.error('BGM data not found'); process.exit(1); }

  const samplesL: number[] = [];
  const samplesR: number[] = [];
  (papu as any).setSampleCallback((l: number, r: number) => { samplesL.push(l); samplesR.push(r); });

  engine.load(sq1, sq2, tri, noise, raw, base, hdrOff);
  engine.start();

  for (let f = 0; f < frames; f++) {
    engine.tick();
    if (f % 600 === 0) console.log(`  frame ${f}/${frames} samples=${samplesL.length}`);
    if (!(engine as any).progress || !(engine as any).progress.playing) {
      console.log(`  Engine stopped at frame ${f}`);
      break;
    }
  }

  if (samplesL.length === 0) { console.error('ERROR: No samples generated!'); process.exit(1); }
  writeWav(outFile, samplesL, samplesR, sampleRate);
  console.log('Done.');
}

main().catch(e => { console.error(e); process.exit(1); });
