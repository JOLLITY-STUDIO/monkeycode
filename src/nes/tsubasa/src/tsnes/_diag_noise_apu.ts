/**
 * Diagnostic: Capture Tsubasa2AudioPlayer noise APU writes (period & volume)
 */
import { Tsubasa2AudioPlayer } from './mini-audio/bgm-data/Tsubasa2AudioPlayer';
import { BGM00_RAW, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from './mini-audio/bgm-data/BGM00';

// Hook papu.writeReg to capture noise registers
const noiseLog: { f: number; reg: string; val: number }[] = [];

const player = new Tsubasa2AudioPlayer();
const origWrite = (player as any).papu.writeReg.bind((player as any).papu);
(player as any).papu.writeReg = function (addr: number, val: number) {
  if (addr === 0x400C || addr === 0x400E) {
    noiseLog.push({ f: (player as any).frameCount, reg: addr === 0x400C ? 'VOL' : 'FREQ', val });
  }
  origWrite(addr, val);
};

player.load(
  BGM00_RAW, BGM00_RAW,
  [BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE]
);

// Render 300 frames (5s)
player.renderAll(300);

// Show first 80 unique noise writes
console.log('=== NOISE APU WRITES (first 80) ===');
let lastV = -1, lastF = -1, count = 0;
for (const w of noiseLog) {
  if (w.val !== lastV) {
    if (count >= 80) break;
    console.log(`F${String(w.f).padStart(4)}  ${w.reg} = 0x${w.val.toString(16).padStart(2)}  (bits3-0=${w.val & 0xF}, bit7=${(w.val >> 7) & 1})`);
    count++;
    lastV = w.val;
    lastF = -1; // reset
  }
}

// Count unique period values
const periods = new Set<number>();
for (const w of noiseLog) {
  if (w.reg === 'FREQ') periods.add(w.val & 0xF);
}
console.log('\n=== PERIODS USED ===');
const sorted = [...periods].sort((a,b)=>a-b);
for (const p of sorted) {
  const map = [4,8,16,32,64,96,128,160,202,254,380,508,762,1016,2034,4068];
  console.log(`  period ${p}: ${map[p]} CPU cycles (~${Math.round(1789773/map[p])} Hz LFSR)`);
}
