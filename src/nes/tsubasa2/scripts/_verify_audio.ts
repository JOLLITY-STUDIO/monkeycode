/**
 * 快速验证：用真实 NES 模拟器跑 300 帧，检查音频输出
 */
import NES from '../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';

const HDR = new Uint8Array([0x4E,0x45,0x53,0x1A,0x10,0x10,0x40,0x08,0,0,0,0,0,0,0,1]);
const prg = new Uint8Array(NES_PRG_ROM);
const chr = new Uint8Array(NES_CHR_ROM);
const rom = new Uint8Array(HDR.length + prg.length + chr.length);
rom.set(HDR,0); rom.set(prg,HDR.length); rom.set(chr,HDR.length+prg.length);

const samples: number[] = [];
const nes = new NES({ emulateSound: true, sampleRate: 48000 });
nes.loadROM(rom);
(nes as any).opts.onAudioSample = (l: number, r: number) => { samples.push((l+r)*0.5); };

const FRAMES = 300;
const t0 = Date.now();
for (let f = 0; f < FRAMES; f++) { nes.frame(); }
const ms = Date.now() - t0;

console.log(`${FRAMES} 帧: ${samples.length} samples, ${ms}ms, ${(samples.length/48000).toFixed(1)}s 音频`);
console.log(`${samples.length > 0 ? '✅ 有音频' : '❌ 无音频'}`);
const nonZero = samples.filter(s => s !== 0).length;
console.log(`非零采样: ${nonZero}/${samples.length} (${(nonZero/samples.length*100).toFixed(1)}%)`);
process.exit(0);
