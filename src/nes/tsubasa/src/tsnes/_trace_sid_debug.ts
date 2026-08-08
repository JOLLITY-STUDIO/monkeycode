/**
 * 详细跟踪 SID player 的 sequencer 读取过程
 * npx tsx _cmp_sid_vs_trace.ts
 */
import { SidPlayer } from './pages/mini-audio-page/sid-player';

const player = new SidPlayer(48000, undefined);
// Patch _peek to log reads
const origPeek = (player as any)._peek.bind(player);
let tick = 0;
(player as any)._peek = function(pos: number) {
  const val = origPeek(pos);
  if (tick < 10) console.log(`  [t${tick} peek $${pos.toString(16).toUpperCase()}] = 0x${val.toString(16).padStart(2,'0')}`);
  return val;
};

const writes: string[] = [];
const papu = (player as any).papu;
const origWrite = papu.writeReg.bind(papu);
papu.writeReg = function(a: number, v: number) {
  if (a >= 0x4000 && a <= 0x4003) writes.push(`  t${tick} $${a.toString(16).toUpperCase()}=0x${v.toString(16)} SQ1`);
  return origWrite(a, v);
};

player.load(0x3B);
console.log('=== SID 0x3B loaded. trackMap:', [...(player as any).trackMap.entries()].map(([k,v]:[number,number]) => `$${k.toString(16).toUpperCase()}:${v}`));
console.log('trackBuf[0..10]:', Array.from((player as any).trackBuf.slice(0, 10)).map((b: number) => '0x' + b.toString(16).padStart(2, '0')));
console.log();

player.start();
console.log('=== First 5 ticks ===');
for (let t = 0; t < 5; t++) {
  tick = t;
  console.log(`-- tick ${t} --`);
  player.tick();
}
console.log('\nAPU writes:');
writes.forEach(w => console.log(w));
