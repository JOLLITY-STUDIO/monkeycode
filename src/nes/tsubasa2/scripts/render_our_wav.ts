// 用 AudioService + PAPU 渲染 WAV
import * as fs from 'fs';
import * as path from 'path';

// @ts-ignore — PAPU 是 tsnes 移植代码
import PAPU from '../src/core/papu/index';
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioService } from '../src/game/prg/code/audio/AudioService';
import { SONG_REQUEST_IDS, SONG_COUNT } from '../src/game/prg/data/audio/audio-rom';

function writeWav(samples: number[], sampleRate: number, outPath: string): void {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + samples.length * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767)));
    buf.writeInt16LE(v, 44 + i * 2);
  }
  fs.writeFileSync(outPath, buf);
}

function renderSong(songIdx: number, durationSec: number): number[] {
  const sampleRate = 44100;
  const songId = SONG_REQUEST_IDS[songIdx];

  const samples: number[] = [];
  const nes: any = {
    opts: {
      sampleRate,
      onAudioSample: (l: number, r: number) => samples.push((l + r) / 2),
    },
  };
  const papu = new PAPU(nes);

  const store = new DataStore();
  store.reset();
  const audio = new AudioService(store);
  audio.attachPapu(papu as any);

  // 触发 BGM/SE
  if (songId < 0x32) {
    audio.playBgm(songId);
  } else {
    audio.playSe(songId);
  }

  // 跑帧
  const totalFrames = Math.ceil(durationSec * 60);
  for (let f = 0; f < totalFrames; f++) {
    audio.update();
  }

  return samples;
}

// 主函数
const songIdx = parseInt(process.argv[2] || '41') - 1;
const songId = SONG_REQUEST_IDS[songIdx];
const duration = parseInt(process.argv[3] || (songId < 0x32 ? '60' : '5'));
const all = process.argv[4] === 'all';

const outDir = path.join(__dirname, '..', 'output');
fs.mkdirSync(outDir, { recursive: true });

if (all) {
  for (let i = 0; i < SONG_COUNT; i++) {
    const id = SONG_REQUEST_IDS[i];
    const dur = id < 0x32 ? 60 : 5;
    const outFile = path.join(outDir, `our-song-${String(i + 1).padStart(3, '0')}.wav`);
    if (fs.existsSync(outFile)) { console.log(`跳过 ${i + 1}`); continue; }
    console.log(`[${i + 1}/${SONG_COUNT}] ID $${id.toString(16)} ${dur}秒...`);
    try {
      const samples = renderSong(i, dur);
      writeWav(samples, 44100, outFile);
      console.log(`  ${samples.length} 采样`);
    } catch (e) {
      console.error(`  失败: ${(e as Error).message}`);
    }
  }
} else {
  console.log(`渲染第 ${songIdx + 1} 首 (ID $${songId.toString(16)}, ${duration}秒)...`);
  const samples = renderSong(songIdx, duration);
  const outFile = path.join(outDir, `our-song-${String(songIdx + 1).padStart(3, '0')}.wav`);
  writeWav(samples, 44100, outFile);
  console.log(`完成: ${outFile} (${samples.length} 采样, ${(samples.length / 44100).toFixed(1)}秒)`);
}
