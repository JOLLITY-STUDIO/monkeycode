/**
 * 生成 BGM00 WAV 文件，用于实际听觉验证
 * Usage: npx tsx gen-wav.ts
 */
import { writeFileSync } from 'fs';
import { BGM00Player } from './BGM00Player';
import {
  BGM00_RAW,
  BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
} from './BGM00';
import { NES_PRG_ROM } from '../rom-data/index-full';

const SAMPLE_RATE = 48000;
const MAX_FRAMES = 1800; // 30 秒

console.log('Rendering BGM00...');
const player = new BGM00Player(SAMPLE_RATE);
player.setPrgRom(NES_PRG_ROM);
player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
player.start();

const pcm: number[] = [];
player.setSampleCallback((l, r) => { pcm.push((l + r) * 0.5); });

let f = 0;
for (; f < MAX_FRAMES && player.progress.playing; f++) {
  player.tick();
}
console.log(`Rendered ${f} frames, ${pcm.length} samples`);

// Write WAV
const numChannels = 1;
const bitsPerSample = 16;
const byteRate = SAMPLE_RATE * numChannels * (bitsPerSample / 8);
const blockAlign = numChannels * (bitsPerSample / 8);
const dataSize = pcm.length * blockAlign;
const fileSize = 44 + dataSize;

const buf = Buffer.alloc(fileSize);
let pos = 0;

// RIFF header
buf.write('RIFF', pos); pos += 4;
buf.writeUInt32LE(fileSize - 8, pos); pos += 4;
buf.write('WAVE', pos); pos += 4;

// fmt chunk
buf.write('fmt ', pos); pos += 4;
buf.writeUInt32LE(16, pos); pos += 4;           // chunk size
buf.writeUInt16LE(1, pos); pos += 2;            // PCM
buf.writeUInt16LE(numChannels, pos); pos += 2;
buf.writeUInt32LE(SAMPLE_RATE, pos); pos += 4;
buf.writeUInt32LE(byteRate, pos); pos += 4;
buf.writeUInt16LE(blockAlign, pos); pos += 2;
buf.writeUInt16LE(bitsPerSample, pos); pos += 2;

// data chunk
buf.write('data', pos); pos += 4;
buf.writeUInt32LE(dataSize, pos); pos += 4;

// samples
for (let i = 0; i < pcm.length; i++) {
  let s = Math.max(-1, Math.min(1, pcm[i]));
  s = Math.floor(s * 32767);
  buf.writeInt16LE(s, pos);
  pos += 2;
}

const outPath = __dirname + '/bgm00-output.wav';
writeFileSync(outPath, buf);
console.log('Wrote ' + outPath);
