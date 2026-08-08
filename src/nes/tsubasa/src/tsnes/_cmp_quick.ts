/**
 * 快速 SID 0x3B 验证：50帧输出
 * npx tsx _cmp_quick.ts
 */
import { SidPlayer } from './pages/mini-audio-page/sid-player';

const player = new SidPlayer(48000, undefined);
player.load(0x3B);

// Trace APU writes
const papu = (player as any).papu;
const origWrite = papu.writeReg.bind(papu);
const allWrites: { tick: number; ch: string; addr: number; val: number; period?: number }[] = [];

papu.writeReg = function (a: number, v: number) {
  const c = a >= 0x4000 && a <= 0x4003 ? 'SQ1' : a >= 0x4004 && a <= 0x4007 ? 'SQ2' :
    a >= 0x4008 && a <= 0x400B ? 'TRI' : a >= 0x400C && a <= 0x400F ? 'NOISE' : '';
  if (c) allWrites.push({ tick: 0, ch: c, addr: a, val: v });
  return origWrite(a, v);
};

player.start();

// Run 80 ticks — enough to hear a few musical phrases
for (let t = 0; t < 80; t++) {
  (allWrites as any)._tick = t;
  // tag new writes
  const before = allWrites.length;
  player.tick();
  for (let i = before; i < allWrites.length; i++) allWrites[i].tick = t;
}

// Extract frequency changes
interface FreqEvent { tick: number; ch: string; period: number; freqHz: number; vol: number; }
const freqEvents: FreqEvent[] = [];
const lastLo: Record<string, number> = {};
const lastVol: Record<string, number> = {};

for (const w of allWrites) {
  const off = w.addr & 3;
  if (off === 0) lastVol[w.ch] = w.val;
  if (off === 2) lastLo[w.ch] = w.val;
  if (off === 3 && lastLo[w.ch] !== undefined) {
    const period = lastLo[w.ch] | ((w.val & 7) << 8);
    freqEvents.push({
      tick: w.tick, ch: w.ch, period,
      freqHz: 1789772.5 / (16 * (period + 1)),
      vol: lastVol[w.ch] || 0,
    });
    delete lastLo[w.ch];
  }
}

console.log('═══════════════════════════════════════════════');
console.log('SID 0x3B - 频率事件 (前80帧)');
console.log('═══════════════════════════════════════════════');

// Print per channel
for (const ch of ['SQ1', 'SQ2', 'TRI', 'NOISE']) {
  const evts = freqEvents.filter(e => e.ch === ch);
  if (!evts.length) { console.log(`\n${ch}: 无输出`); continue; }
  console.log(`\n${ch} (${evts.length} 个音符):`);
  for (const e of evts) {
    const noteName = periodToNoteName(e.period);
    console.log(`  t=${String(e.tick).padStart(3)}: period=0x${e.period.toString(16).padStart(4)} (${String(e.period).padStart(5)}) → ${e.freqHz.toFixed(1)} Hz  [${noteName}] vol=${e.vol.toString(16)}`);
  }
}

// Check if there's any musical pattern
console.log('\n═══════════════════════════════════════════════');
console.log('活跃通道: ' + ['SQ1','SQ2','TRI','NOISE'].filter((_,i) => player['activeMask'] & (1<<i)).join(', '));

// Helper: approximate note name from NES period
function periodToNoteName(p: number): string {
  if (p < 2) return '---';
  const midiNote = Math.round(69 + 12 * Math.log2(1789772.5 / (16 * (p + 1)) / 440));
  const names = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  return names[midiNote % 12] + Math.floor(midiNote / 12 - 1);
}
