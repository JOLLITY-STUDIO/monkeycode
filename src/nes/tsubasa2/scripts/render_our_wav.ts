// 用 AudioService + ApuPcmRenderer 渲染 WAV
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioService } from '../src/game/prg/code/audio/AudioService';
import { AudioRom, SONG_COUNT, SONG_REQUEST_IDS } from '../src/game/prg/data/audio/audio-rom';
import { ApuPcmRendererImpl } from '../src/game/prg/code/audio/ApuPcmRenderer';
import * as fs from 'fs';
import * as path from 'path';

function writeWav(samples: number[], sampleRate: number, outPath: string): void {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + samples.length * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);  // PCM
  buf.writeUInt16LE(1, 22);  // mono
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

// 渲染单首
function renderSong(songIdx: number, durationSec: number): number[] {
  const store = new DataStore();
  store.reset();
  const audio = new AudioService(store);
  const renderer = new ApuPcmRendererImpl();
  // AudioService 写 APU 寄存器 → renderer 合成
  audio.attachApu(renderer);

  const songId = SONG_REQUEST_IDS[songIdx];
  console.log(`  曲目 ${songIdx + 1}: 请求 ID $${songId.toString(16)}`);

  // 写请求队列触发 BGM/SE
  if (songId < 0x32) {
    audio.playBgm(songId);
  } else {
    audio.playSe(songId);
  }

  // 跑帧循环
  const totalFrames = Math.ceil(durationSec * 60);
  const samples: number[] = [];
  for (let f = 0; f < totalFrames; f++) {
    audio.update();
    const frameSamples = renderer.renderFrame();
    for (let i = 0; i < frameSamples.length; i++) {
      samples.push(frameSamples[i]);
    }
  }
  return samples;
}

// 主函数
const songIdx = parseInt(process.argv[2] || '41') - 1;  // 默认第 41 首（第一首 BGM）
const songId = SONG_REQUEST_IDS[songIdx];
const duration = parseInt(process.argv[3] || (songId < 0x32 ? '60' : '5'));  // BGM 60秒, SE 5秒
const all = process.argv[4] === 'all';

const outDir = path.join(__dirname, '..', 'output');
fs.mkdirSync(outDir, { recursive: true });

if (all) {
  // 渲染全部 105 首
  for (let i = 0; i < SONG_COUNT; i++) {
    const id = SONG_REQUEST_IDS[i];
    const dur = id < 0x32 ? 60 : 5;  // BGM 60秒, SE 5秒
    const outFile = path.join(outDir, `our-song-${String(i + 1).padStart(3, '0')}.wav`);
    if (fs.existsSync(outFile)) { console.log(`跳过 ${i + 1}`); continue; }
    console.log(`[${i + 1}/${SONG_COUNT}] 渲染中 (ID $${id.toString(16)}, ${dur}秒)...`);
    try {
      const samples = renderSong(i, dur);
      writeWav(samples, 44100, outFile);
      console.log(`  完成: ${samples.length} 采样`);
    } catch (e) {
      console.error(`  失败: ${(e as Error).message}`);
    }
  }
  console.log('全部完成');
} else {
  if (songIdx < 0 || songIdx >= SONG_COUNT) {
    console.error('曲目号超出范围 (1-105)');
    process.exit(1);
  }
  console.log(`渲染第 ${songIdx + 1} 首 (ID $${songId.toString(16)}, ${duration}秒)...`);
  const samples = renderSong(songIdx, duration);
  const outFile = path.join(outDir, `our-song-${String(songIdx + 1).padStart(3, '0')}.wav`);
  writeWav(samples, 44100, outFile);
  console.log(`完成: ${outFile} (${samples.length} 采样, ${(samples.length / 44100).toFixed(1)}秒)`);
}
