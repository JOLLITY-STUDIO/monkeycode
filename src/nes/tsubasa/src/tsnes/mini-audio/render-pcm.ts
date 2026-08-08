/**
 * mini-audio/render-pcm.ts
 * 使用精简版 NES 模拟器渲染 APU 音频采样，输出 PCM Float32 数组。
 * 可作为数据源导入微信小程序页面。
 *
 * 用法: npx tsx mini-audio/render-pcm.ts [帧数,默认800] [输出文件,可选]
 */
import { NesAudio } from './emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';

const FRAMES = parseInt(process.argv[2]) || 800;
const OUT_FILE = process.argv[3] || null;

// ═══════════════════════ PCM 渲染 ═══════════════════════
function renderPcm(frames: number): Float32Array {
  const SAMPLE_RATE = 48000;
  const nes = new NesAudio();

  const prgArr = new Uint8Array(NES_PRG_ROM);
  const chrArr = new Uint8Array(NES_CHR_ROM);
  nes.loadROMArrays(prgArr, chrArr);

  // 收集音频采样
  const samples: number[] = [];
  nes.opts.onAudioSample = (l: number, r: number) => {
    samples.push((l + r) / 2); // 单声道
  };

  // 运行帧
  for (let f = 0; f < frames; f++) {
    nes.frame();
  }

  return new Float32Array(samples);
}

// ═══════════════════════ 导出 ═══════════════════════
const pcm = renderPcm(FRAMES);

// 输出统计
const peak = Math.max(...Array.from(pcm).map(Math.abs));
console.log(`PCM rendered: ${pcm.length} samples, ${(pcm.length / 48000).toFixed(2)}s, peak=${peak.toFixed(4)}`);

// 计算音量
let sumSq = 0;
for (let i = 0; i < pcm.length; i++) sumSq += pcm[i] * pcm[i];
const rms = Math.sqrt(sumSq / pcm.length);
console.log(`RMS: ${(rms * 100).toFixed(1)}%`);

// 可选: 写文件
if (OUT_FILE) {
  const fs = require('fs');
  // 写为原始 Float32 LE 二进制
  const buf = Buffer.alloc(pcm.length * 4);
  for (let i = 0; i < pcm.length; i++) {
    buf.writeFloatLE(pcm[i], i * 4);
  }
  fs.writeFileSync(OUT_FILE, buf);
  console.log(`Written: ${OUT_FILE} (${buf.length} bytes)`);
}

// 输出为 Base64（供小程序直接使用）
const b64 = Buffer.from(pcm.buffer as ArrayBuffer).toString('base64');
console.log(`Base64 length: ${b64.length} chars`);
console.log('Copy the Base64 above for wx mini-program usage.');

process.exit(0);
