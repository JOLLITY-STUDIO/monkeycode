/**
 * SID vs ROM 频率对比 (300帧)
 * npx tsx _cmp_sid_vs_trace.ts
 */
import NES from './src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';
import { SidPlayer } from './pages/mini-audio-page/sid-player';

// ── 抽取频率的函数 ──
interface FreqEntry { idx: number; ch: string; period: number; }
function extractFreqs(writes: { idx: number; ch: string; addr: number; val: number }[]): FreqEntry[] {
  const freqs: FreqEntry[] = [];
  let lastLo: Record<string, number> = {};
  for (const w of writes) {
    if ((w.addr & 3) === 2) lastLo[w.ch] = w.val;
    if ((w.addr & 3) === 3 && lastLo[w.ch] !== undefined) {
      freqs.push({ idx: w.idx, ch: w.ch, period: lastLo[w.ch] | ((w.val & 7) << 8) });
      delete lastLo[w.ch];
    }
  }
  return freqs;
}

// ── 1. ROM Trace ──
console.log('[1/2] ROM trace 300 frames...');
const HDR = Uint8Array.from([0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08, 0, 0, 0, 0, 0, 0, 0, 1]);
const prg = new Uint8Array(NES_PRG_ROM), chr = new Uint8Array(NES_CHR_ROM);
const rom = new Uint8Array(HDR.length + prg.length + chr.length);
rom.set(HDR, 0); rom.set(prg, HDR.length); rom.set(chr, HDR.length + prg.length);

const nes = new NES({ emulateSound: true, sampleRate: 48000, onFrame: () => {}, onAudioSample: () => {} });
nes.loadROM(rom);

const romWrites: { idx: number; ch: string; addr: number; val: number }[] = [];
const origWrite = nes.papu.writeReg.bind(nes.papu);
nes.papu.writeReg = function (a: number, v: number) {
  const c = a >= 0x4000 && a <= 0x4003 ? 'SQ1' : a >= 0x4004 && a <= 0x4007 ? 'SQ2' :
    a >= 0x4008 && a <= 0x400B ? 'TRI' : a >= 0x400C && a <= 0x400F ? 'NOISE' : '';
  if (c) romWrites.push({ idx: (nes as any)._traceFrame || 0, ch: c, addr: a, val: v });
  return origWrite(a, v);
};

const t0 = Date.now();
for (let f = 0; f < 300; f++) {
  (nes as any)._traceFrame = f;
  try { nes.frame(); } catch (e) { break; }
}
console.log(`  done ${((Date.now() - t0) / 1000).toFixed(1)}s, ${romWrites.length} writes`);
const romFreqs = extractFreqs(romWrites);

// ── 2. SID Trace ──
console.log('[2/2] SID trace 300 ticks...');
const player = new SidPlayer(48000, undefined);
player.load(0x3B);

// Patch internal PAPU's writeReg
const sidWrites: { idx: number; ch: string; addr: number; val: number }[] = [];
const sidPapu = (player as any).papu;
const origSidWrite = sidPapu.writeReg.bind(sidPapu);
let sidTick = 0;
sidPapu.writeReg = function (a: number, v: number) {
  const c = a >= 0x4000 && a <= 0x4003 ? 'SQ1' : a >= 0x4004 && a <= 0x4007 ? 'SQ2' :
    a >= 0x4008 && a <= 0x400B ? 'TRI' : a >= 0x400C && a <= 0x400F ? 'NOISE' : '';
  if (c) sidWrites.push({ idx: sidTick, ch: c, addr: a, val: v });
  return origSidWrite(a, v);
};

player.start();

const t1 = Date.now();
for (let t = 0; t < 300; t++) { sidTick = t; player.tick(); }
console.log(`  done ${((Date.now() - t1) / 1000).toFixed(3)}s, ${sidWrites.length} writes`);
const sidFreqs = extractFreqs(sidWrites);

// ── 3. 对比 ──
console.log('\n' + '='.repeat(70));
console.log('通道频率对比 (逐条对齐)');
console.log('='.repeat(70));

for (const ch of ['SQ1', 'SQ2', 'TRI', 'NOISE']) {
  const r = romFreqs.filter(x => x.ch === ch);
  const s = sidFreqs.filter(x => x.ch === ch);
  console.log(`\n── ${ch}: ROM=${r.length} freq, SID=${s.length} freq ──`);

  if (!r.length && !s.length) { console.log('  ✅ 一致空'); continue; }
  if (!r.length) { console.log('  ❌ ROM 无输出'); continue; }
  if (!s.length) { console.log('  ❌ SID 无输出'); continue; }

  const N = Math.min(15, r.length, s.length);
  let match = 0;
  for (let i = 0; i < N; i++) {
    const ok = r[i].period === s[i].period;
    console.log(`  ${ok ? '✅' : '❌'} ROM[F${String(r[i].idx).padStart(3)}] 0x${r[i].period.toString(16).padStart(4)}  |  SID[t${String(s[i].idx).padStart(3)}] 0x${s[i].period.toString(16).padStart(4)}`);
    if (ok) match++;
  }
  console.log(`  ── 匹配 ${match}/${N}`);
}
