/**
 * Deep diagnostic: trace NOISE channel freqDirty & chType state
 */
import { BGM00Player } from './BGM00Player';
import { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW } from './BGM00';

const SAMPLE_RATE = 48000;
const TOTAL_FRAMES = 200;

const player = new BGM00Player(SAMPLE_RATE);
player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
player.start();

const NOISE_CH = 7;

const w = (player as any).w;
const blocks = (player as any).blocks;
const b = blocks[NOISE_CH];

console.log('=== Initial NOISE state ===');
console.log(`  chType=${w.chType[NOISE_CH]}  freqDirty=0x${w.freqDirty[NOISE_CH].toString(16)}`);
console.log(`  freqLo=0x${b.freqLo.toString(16)}  freqHi=0x${b.freqHi.toString(16)}`);
console.log(`  durLo=${w.durLo[NOISE_CH]}  durHi=${w.durHi[NOISE_CH]}  apuVol=0x${b.apuVol.toString(16)}`);
console.log(`  trackLo=0x${b.trackLo.toString(16)}  trackHi=0x${b.trackHi.toString(16)}`);

// Track state changes
let lastChType = w.chType[NOISE_CH];
let lastFreqDirty = w.freqDirty[NOISE_CH];
let lastFreqHi = b.freqHi;
let noiseFreqWrites = 0;
let noiseNotes = 0;

const t0 = Date.now();
for (let f = 0; f < TOTAL_FRAMES && player.progress.playing; f++) {
  const oldCt = w.chType[NOISE_CH];
  const oldFd = w.freqDirty[NOISE_CH];
  const oldFh = b.freqHi;

  player.tick();

  const newCt = w.chType[NOISE_CH];
  const newFd = w.freqDirty[NOISE_CH];
  const newFh = b.freqHi;

  if (newFd !== 0 && newFd !== oldFd) {
    noiseFreqWrites++;
    if (newFh !== oldFh) noiseNotes++;
  }

  if (newCt !== oldCt && f < 50) {
    console.log(`F${f}: chType ${oldCt}→${newCt}`);
  }
  if (newFd !== oldFd && newFd !== 0 && f < 50) {
    console.log(`F${f}: freqDirty set to 0x${newFd.toString(16)}  freqHi=0x${newFh.toString(16)}`);
  }
  if (f < 5 || f % 50 === 49) {
    console.log(`F${f}: chType=${newCt} fd=0x${newFd.toString(16)} fh=0x${newFh.toString(16)} durLo=${w.durLo[NOISE_CH]} durHi=${w.durHi[NOISE_CH]} track=0x${(b.trackLo|(b.trackHi<<8)).toString(16)}`);
  }
}
console.log(`\nDone. noiseFreqWrites=${noiseFreqWrites} noiseNotes=${noiseNotes}`);
console.log(`Total frames=${player.progress.frame}`);

// Print first 30 bytes of NOISE track data
console.log('\n=== NOISE data at offset 1938 ===');
const raw = BGM00_RAW;
let end = 1938;
for (let i = 1938; i < Math.min(2120, raw.length); i++) {
  const byte = raw[i];
  const ch = byte >= 0x20 && byte <= 0x7E ? String.fromCharCode(byte) : '';
  console.log(`  [${i}] 0x${byte.toString(16).padStart(2,'0')} ${ch}`);
  if (byte === 0xFF && i > 1980) { end = i; break; }
  if (i >= 1938 + 60) { end = i; break; }
}
