/**
 * 测试: BGM / SE / BGM+SE 混合 — 生成三个 WAV 文件
 * Usage: npx tsx test-bgmse.ts
 */
import { writeFileSync } from 'fs';
import { Tsubasa2AudioPlayer } from './Tsubasa2AudioPlayer';
import {
  BGM00_RAW,
  BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
} from './BGM00';

const SAMPLE_RATE = 48000;
const MAX_FRAMES = 1800;

// ── 工具函数 ──

/** 写单声道 16-bit WAV */
function writeWav(path: string, pcm: Float32Array): void {
  const numCh = 1;
  const bps = 16;
  const byteRate = SAMPLE_RATE * numCh * (bps / 8);
  const blockAlign = numCh * (bps / 8);
  const dataSize = pcm.length * blockAlign;
  const fileSize = 44 + dataSize;

  const buf = Buffer.alloc(fileSize);
  let pos = 0;
  buf.write('RIFF', pos); pos += 4;
  buf.writeUInt32LE(fileSize - 8, pos); pos += 4;
  buf.write('WAVE', pos); pos += 4;
  buf.write('fmt ', pos); pos += 4;
  buf.writeUInt32LE(16, pos); pos += 4;
  buf.writeUInt16LE(1, pos); pos += 2;     // PCM
  buf.writeUInt16LE(numCh, pos); pos += 2;
  buf.writeUInt32LE(SAMPLE_RATE, pos); pos += 4;
  buf.writeUInt32LE(byteRate, pos); pos += 4;
  buf.writeUInt16LE(blockAlign, pos); pos += 2;
  buf.writeUInt16LE(bps, pos); pos += 2;
  buf.write('data', pos); pos += 4;
  buf.writeUInt32LE(dataSize, pos); pos += 4;

  for (let i = 0; i < pcm.length; i++) {
    let s = Math.max(-1, Math.min(1, pcm[i]));
    s = Math.floor(s * 32767);
    buf.writeInt16LE(s, pos);
    pos += 2;
  }
  writeFileSync(path, buf);
  console.log(`  → ${path} (${pcm.length} samples, ${(pcm.length / SAMPLE_RATE).toFixed(1)}s)`);
}

/** 渲染一个 Player 到 PCM */
function renderPlayer(
  sq1: readonly number[], sq2: readonly number[],
  tri: readonly number[], noise: readonly number[],
  shared?: readonly number[], nesBase?: number,
  oneShot = false,
): Float32Array {
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
  const samples: number[] = [];
  player.setSampleCallback((l: number, r: number) => {
    samples.push((l + r) * 0.5);
  });
  if (oneShot) player.setOneShot(true);
  player.load(sq1, sq2, tri, noise, shared, nesBase);
  player.start();

  let f = 0;
  for (; f < MAX_FRAMES; f++) {
    player.tick();
    if (!player.progress.playing) break;
  }
  console.log(`    渲染 ${f} 帧, ${samples.length} 采样`);
  return new Float32Array(samples);
}

// ── 主流程 ──

const outDir = __dirname;

console.log('═══════════════════════════════════════');
console.log('  BGM / SE / BGM+SE 混合 WAV 测试');
console.log('═══════════════════════════════════════\n');

// 1. BGM only
console.log('[1/3] BGM only...');
const bgmPcm = renderPlayer(
  BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
  BGM00_RAW, 0xB7AD,
);
writeWav(outDir + '/bgm-only.wav', bgmPcm);

// 简单 SE 测试音效: dur=2, 升调 7 个音 → $FF 结束
const TEST_SE_SQ2: readonly number[] = [0x82, 0x00, 0x02, 0x04, 0x06, 0x08, 0x0A, 0x0C, 0x0E, 0xFF];
// SE noise: dur=2, 几个 noise 音 → $FF 结束
const TEST_SE_NOISE: readonly number[] = [0x82, 0x10, 0x11, 0x12, 0x13, 0x14, 0x0F, 0x0E, 0x0D, 0xFF];

// 2. SE only (one-shot 模式: SQ2 升调 → $FF 停止)
console.log('[2/3] SE only...');
const sePcm = renderPlayer(
  [], TEST_SE_SQ2, [], TEST_SE_NOISE,
  undefined, undefined, true,
);
writeWav(outDir + '/se-only.wav', sePcm);

// 3. BGM + SE 混合（两个独立实例）
console.log('[3/3] BGM + SE 混合（双实例）...');

const bgmSamples: number[] = [];
const seSamples: number[] = [];

const bgmPlayer = new Tsubasa2AudioPlayer(SAMPLE_RATE);
bgmPlayer.setSampleCallback((l: number, r: number) => {
  bgmSamples.push((l + r) * 0.5);
});
bgmPlayer.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
bgmPlayer.start();

const sePlayer = new Tsubasa2AudioPlayer(SAMPLE_RATE);
sePlayer.setOneShot(true);
sePlayer.setSampleCallback((l: number, r: number) => {
  seSamples.push((l + r) * 0.5);
});
sePlayer.load([], TEST_SE_SQ2, [], TEST_SE_NOISE);
sePlayer.start();

let f = 0;
for (; f < MAX_FRAMES; f++) {
  bgmPlayer.tick();
  sePlayer.tick();
  if (!bgmPlayer.progress.playing && !sePlayer.progress.playing) break;
}
console.log(`    渲染 ${f} 帧 | BGM ${bgmSamples.length} + SE ${seSamples.length} 采样`);

// 逐采样加法混合
const maxLen = Math.max(bgmSamples.length, seSamples.length);
const mixed = new Float32Array(maxLen);
for (let i = 0; i < maxLen; i++) {
  const a = bgmSamples[i] ?? 0;
  const b = seSamples[i] ?? 0;
  mixed[i] = Math.max(-1, Math.min(1, (a + b) * 0.7));
}
writeWav(outDir + '/bgm-se-mixed.wav', mixed);

console.log('\n✅ 完成！生成 3 个 WAV 文件:');
console.log('   bgm-only.wav     — 纯 BGM');
console.log('   se-only.wav      — 纯 SE');
console.log('   bgm-se-mixed.wav — BGM + SE 混合');
