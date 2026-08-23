// 用旧版 Bank12AudioEngine + PAPU 渲染 WAV
import * as fs from 'fs';
import * as path from 'path';

// @ts-ignore — 旧版代码不严格类型检查
import PAPU from '../src/core/papu/index';
// @ts-ignore
import { Bank12AudioEngine } from '../src/game/prg/prg-old/code/bank12_audio_engine';
// @ts-ignore
import { BGM_SID_LIST as BGM_TRACKS } from '../src/game/prg/prg-old/data/audio/bgm/Index';

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

function renderSong(trackIdx: number, durationSec: number): number[] {
  const sampleRate = 44100;
  const track = BGM_TRACKS[trackIdx];
  if (!track) { console.error('找不到轨道:', trackIdx); return []; }
  if (track.silent) { console.log('  静音轨道'); return []; }

  const samples: number[] = [];

  // 创建 PAPU（模拟 NES 对象）
  const nes: any = {
    opts: {
      sampleRate,
      onAudioSample: (l: number, r: number) => samples.push((l + r) / 2),
    },
  };
  const papu = new PAPU(nes);

  // 创建引擎
  const engine = new Bank12AudioEngine(papu);

  // 加载 BGM
  engine.load(
    track.trackSQ1 || [],
    track.trackSQ2 || [],
    track.trackTRI || [],
    track.trackNOISE || [],
    track.raw,
    track.nesBase,
    track.headerOffset,
  );
  engine.start();

  // 跑帧收集采样
  const totalFrames = Math.ceil(durationSec * 60);

  for (let f = 0; f < totalFrames; f++) {
    engine.tick();
  }

  return samples;
}

// 主函数
const trackIdx = parseInt(process.argv[2] || '0') - 1;  // 默认第一首
const duration = parseInt(process.argv[3] || '60');
const all = process.argv[4] === 'all';

const outDir = path.join(__dirname, '..', 'output');
fs.mkdirSync(outDir, { recursive: true });

if (all) {
  for (let i = 0; i < BGM_TRACKS.length; i++) {
    const outFile = path.join(outDir, `old-song-${String(i + 1).padStart(3, '0')}.wav`);
    if (fs.existsSync(outFile)) { console.log(`跳过 ${i + 1}`); continue; }
    console.log(`[${i + 1}/${BGM_TRACKS.length}] ${BGM_TRACKS[i]?.id || '?'}...`);
    try {
      const samples = renderSong(i, duration);
      if (samples.length > 0) {
        writeWav(samples, 44100, outFile);
        console.log(`  完成: ${samples.length} 采样`);
      } else {
        console.log(`  无采样`);
      }
    } catch (e) {
      console.error(`  失败: ${(e as Error).message}`);
    }
  }
} else {
  console.log(`渲染第 ${trackIdx + 1} 首 (${duration}秒)...`);
  const samples = renderSong(trackIdx, duration);
  const outFile = path.join(outDir, `old-song-${String(trackIdx + 1).padStart(3, '0')}.wav`);
  if (samples.length > 0) {
    writeWav(samples, 44100, outFile);
    console.log(`完成: ${outFile} (${samples.length} 采样)`);
  } else {
    console.log('无采样输出');
  }
}
