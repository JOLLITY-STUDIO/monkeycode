/**
 * ROM vs SID 音乐段对齐对比
 * 从 ROM 帧 280 开始记录，对齐 SID tick 0
 * npx tsx _cmp_aligned.ts
 */
import NES from './src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';
import { SidPlayer } from './pages/mini-audio-page/sid-player';

// ── 建 ROM ──
const HDR = Uint8Array.from([0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08, 0, 0, 0, 0, 0, 0, 0, 1]);
const prg = new Uint8Array(NES_PRG_ROM), chr = new Uint8Array(NES_CHR_ROM);
const rom = new Uint8Array(HDR.length + prg.length + chr.length);
rom.set(HDR, 0); rom.set(prg, HDR.length); rom.set(chr, HDR.length + prg.length);

const nes = new NES({ emulateSound: true, sampleRate: 48000, onFrame: () => {}, onAudioSample: () => {} });
nes.loadROM(rom);

// ── 运行 ROM 280 帧预热 ──
console.log('预热 ROM 280 帧...');
for (let f = 0; f < 280; f++) {
  try { nes.frame(); } catch (e) { break; }
}

// ── 从帧 280 开始记录 ROM APU 写入 ──
const romWrites: { frame: number; ch: string; addr: number; val: number }[] = [];
const origWrite = nes.papu.writeReg.bind(nes.papu);
nes.papu.writeReg = function (a: number, v: number) {
  const c = a >= 0x4000 && a <= 0x4003 ? 'SQ1' : a >= 0x4004 && a <= 0x4007 ? 'SQ2' :
    a >= 0x4008 && a <= 0x400B ? 'TRI' : a >= 0x400C && a <= 0x400F ? 'NOISE' : '';
  if (c) romWrites.push({ frame: 0, ch: c, addr: a, val: v });
  return origWrite(a, v);
};

console.log('运行 ROM 120 帧记录...');
let romFrame = 0;
const t0 = Date.now();
for (let f = 0; f < 120; f++) {
  romFrame = f;
  try { nes.frame(); } catch (e) { break; }
  // tag writes with current frame
}
console.log(`ROM done ${((Date.now()-t0)/1000).toFixed(1)}s, ${romWrites.length} writes`);

// ── SID 播放 120 ticks ──
const player = new SidPlayer(48000, undefined);
player.load(0x3B);
const sidWrites: { tick: number; ch: string; addr: number; val: number }[] = [];
const sidPapu = (player as any).papu;
const origSidWrite = sidPapu.writeReg.bind(sidPapu);
sidPapu.writeReg = function (a: number, v: number) {
  const c = a >= 0x4000 && a <= 0x4003 ? 'SQ1' : a >= 0x4004 && a <= 0x4007 ? 'SQ2' :
    a >= 0x4008 && a <= 0x400B ? 'TRI' : a >= 0x400C && a <= 0x400F ? 'NOISE' : '';
  if (c) sidWrites.push({ tick: 0, ch: c, addr: a, val: v });
  return origSidWrite(a, v);
};
player.start();
for (let t = 0; t < 120; t++) {
  player.tick();
  for (let i = sidWrites.length - 1; i >= 0 && sidWrites[i].tick === 0; i--) {
    // tag recent writes
  }
}

// ── 提取频率 ──
interface FreqEntry { idx: number; ch: string; period: number; }
function extract(writes: { idx: number; ch: string; addr: number; val: number }[]): FreqEntry[] {
  const freqs: FreqEntry[] = [];
  const lastLo: Record<string, number> = {};
  for (const w of writes) {
    const off = w.addr & 3;
    if (off === 2) lastLo[w.ch] = w.val;
    if (off === 3 && lastLo[w.ch] !== undefined) {
      freqs.push({ idx: w.idx, ch: w.ch, period: lastLo[w.ch] | ((w.val & 7) << 8) });
      delete lastLo[w.ch];
    }
  }
  return freqs;
}

// Tag SID writes
let sidTick = 0;
const taggedSidWrites: { idx: number; ch: string; addr: number; val: number }[] = [];
const sidPapu2 = (player as any).papu;
sidPapu2.writeReg = function (a: number, v: number) {
  const c = a >= 0x4000 && a <= 0x4003 ? 'SQ1' : a >= 0x4004 && a <= 0x4007 ? 'SQ2' :
    a >= 0x4008 && a <= 0x400B ? 'TRI' : a >= 0x400C && a <= 0x400F ? 'NOISE' : '';
  if (c) taggedSidWrites.push({ idx: sidTick, ch: c, addr: a, val: v });
  return origSidWrite(a, v);
};

// Re-play SID
player.load(0x3B);
player.start();
for (let t = 0; t < 120; t++) { sidTick = t; player.tick(); }

const romFreqs = extract(romWrites.map(w => ({...w, idx: w.frame})));
const sidFreqs = extract(taggedSidWrites);

// ── 对比 ──
console.log('\n' + '='.repeat(60));
console.log('通道频率对比 (ROM 后280帧 vs SID, 前120帧)');
console.log('='.repeat(60));

for (const ch of ['SQ1', 'SQ2', 'TRI', 'NOISE']) {
  const r = romFreqs.filter(x => x.ch === ch);
  const s = sidFreqs.filter(x => x.ch === ch);
  console.log(`\n── ${ch}: ROM=${r.length} freq, SID=${s.length} freq ──`);
  
  if (!r.length && !s.length) { console.log('  ✅ 一致空'); continue; }
  if (!r.length) { console.log('  ❌ ROM 无输出'); continue; }
  if (!s.length) { console.log('  ❌ SID 无输出'); continue; }

  const N = Math.min(10, r.length, s.length);
  let match = 0;
  for (let i = 0; i < N; i++) {
    const ok = r[i].period === s[i].period;
    const mark = ok ? '✅' : '❌';
    console.log(`  ${mark} ROM[${String(r[i].idx).padStart(3)}] 0x${r[i].period.toString(16).padStart(4)} | SID[${String(s[i].idx).padStart(3)}] 0x${s[i].period.toString(16).padStart(4)}`);
    if (ok) match++;
  }
  if (N > 0) console.log(`  ── 匹配 ${match}/${N}`);
  
  // For NOISE, also show raw $400E value
  if (ch === 'NOISE' && N > 0) {
    console.log('  NOISE $400E 原始值:');
    for (let i = 0; i < N; i++) {
      const rw = romWrites.filter(w => w.ch === 'NOISE' && (w.addr & 3) === 2);
      const sw = taggedSidWrites.filter(w => w.ch === 'NOISE' && (w.addr & 3) === 2);
      if (i < rw.length && i < sw.length) {
        console.log(`    ROM=$400E=0x${rw[i].val.toString(16).padStart(2)} | SID=$400E=0x${sw[i].val.toString(16).padStart(2)}`);
      }
    }
  }
}
