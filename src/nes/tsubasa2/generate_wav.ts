/**
 * generate_wav.ts — 用 bank12 引擎 + PAPU 生成所有 BGM 的 WAV
 * 用法: npx tsx generate_wav.ts [frames]
 * 默认: 3600帧(60秒), 输出到 output/bgm_XX_YYYYf.wav
 */
import fs from 'fs';
import path from 'path';
import PAPU from './src/core/papu/index';
import { Bank12AudioEngine } from './src/game/service/bank12_audio_engine';
// DMC 采样数据（bank30 $C000-$C2BF，704 字节），由 bank12 音频引擎的 DMC 通道播放
import { DMC_SAMPLES_BY_ADDR } from './src/game/data/prg/audio/dmc-samples';

// 所有 BGM ID 列表 (0x30-0x5B)
const BGM_IDS = Array.from({ length: 0x5C - 0x30 }, (_, i) => 0x30 + i);

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
}

async function generateOne(bgmId: number, frames: number, outDir: string, sampleRate: number): Promise<boolean> {
  const idHex = bgmId.toString(16).toUpperCase();
  const prefix = 'BGM_' + idHex;
  const bgmPath = path.join(__dirname, 'src/game/data/prg/audio/bgm/BGM_0x' + idHex + '.ts');
  if (!fs.existsSync(bgmPath)) {
    console.log(`BGM 0x${idHex}: 文件不存在，跳过`);
    return false;
  }

  // 动态 import
  const bgmMod = await import('./src/game/data/prg/audio/bgm/BGM_0x' + idHex);
  const sq1 = (bgmMod as any)[prefix + '_TRACK_SQ1'];
  const sq2 = (bgmMod as any)[prefix + '_TRACK_SQ2'];
  const tri = (bgmMod as any)[prefix + '_TRACK_TRI'];
  const noise = (bgmMod as any)[prefix + '_TRACK_NOISE'];
  const raw = (bgmMod as any)[prefix + '_RAW'];
  const base = (bgmMod as any)[prefix + '_NES_BASE'];
  const hdrOff = (bgmMod as any)[prefix + '_HEADER_OFFSET'] || 0;

  if (!sq1 || sq1.length === 0) {
    console.log(`BGM 0x${idHex}: 无数据，跳过`);
    return false;
  }

  const papu = new PAPU(sampleRate);
  const engine = new Bank12AudioEngine(papu as any);
  const samplesL: number[] = [];
  const samplesR: number[] = [];
  (papu as any).setSampleCallback((l: number, r: number) => { samplesL.push(l); samplesR.push(r); });

  // 注入 DMC sample data（bank30 $C000-$C2BF = DMC_SAMPLE_A/B/C）
  (papu as any).dmc.setSampleProvider((addr: number) => DMC_SAMPLES_BY_ADDR[addr - 0xC000] ?? 0);

  engine.load(sq1, sq2, tri, noise, raw, base, hdrOff);
  engine.start();

  for (let f = 0; f < frames; f++) {
    engine.tick();
    if (!engine.progress || !engine.progress.playing) break;
  }

  if (samplesL.length === 0) {
    console.log(`BGM 0x${idHex}: 无采样，跳过`);
    return false;
  }

  const outFile = path.join(outDir, `bgm_${idHex}_${frames}f.wav`);
  writeWav(outFile, samplesL, samplesR, sampleRate);
  console.log(`BGM 0x${idHex}: ${samplesL.length} samples, ${(samplesL.length/sampleRate).toFixed(1)}s → ${outFile}`);
  return true;
}

async function main() {
  const frames = parseInt(process.argv[2] || '3600');
  const sampleRate = 44100;
  const outDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`生成所有 BGM WAV: ${frames}帧, 输出到 ${outDir}`);
  console.log('='.repeat(60));

  let ok = 0, fail = 0;
  for (const id of BGM_IDS) {
    try {
      const success = await generateOne(id, frames, outDir, sampleRate);
      if (success) ok++; else fail++;
    } catch (e: any) {
      console.log(`BGM 0x${id.toString(16).toUpperCase()}: 错误 ${e.message}`);
      fail++;
    }
  }

  console.log('='.repeat(60));
  console.log(`完成: ${ok} 成功, ${fail} 跳过/失败`);
}

main().catch(e => { console.error(e); process.exit(1); });
