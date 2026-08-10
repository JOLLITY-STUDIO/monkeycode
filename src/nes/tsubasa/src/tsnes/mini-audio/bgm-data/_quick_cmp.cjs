/**
 * Quick player-only APU write stats test
 */
const { BGM00Player } = require('./BGM00Player');
const { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW } = require('./BGM00');

const SAMPLE_RATE = 48000;
const TOTAL_FRAMES = 1800;

const player = new BGM00Player(SAMPLE_RATE);

const writes = [];
const papu = player.papu;
const origWr = papu.writeReg.bind(papu);
papu.writeReg = function(addr, val) {
  if (addr >= 0x4000 && addr <= 0x4017) {
    let ch = '';
    if (addr < 0x4004) ch = 'SQ1';
    else if (addr < 0x4008) ch = 'SQ2';
    else if (addr < 0x400C) ch = 'TRI';
    else if (addr < 0x4010) ch = 'NOISE';
    else if (addr === 0x4015) ch = 'STAT';
    writes.push({ f: player.progress.frame, addr, val, ch });
  }
  return origWr(addr, val);
};

player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
player.start();

const t0 = Date.now();
for (let f = 0; f < TOTAL_FRAMES && player.progress.playing; f++) {
  player.tick();
}
console.log(`Player done in ${((Date.now() - t0) / 1000).toFixed(1)}s, ${writes.length} APU writes, stopped at F${player.progress.frame}`);

// Stats
const chs = {};
for (const w of writes) {
  if (!chs[w.ch]) chs[w.ch] = { total: 0, freqs: 0, dutyVol: 0, sweep: 0 };
  chs[w.ch].total++;
  const r = w.addr & 3;
  if (r === 0) chs[w.ch].dutyVol++;
  else if (r === 1) chs[w.ch].sweep++;
  else if (r === 2) chs[w.ch].freqs++;
}
console.log('\nBGM00Player stats:');
for (const [ch, s] of Object.entries(chs)) {
  if (s.total === 0) continue;
  console.log(`  ${ch.padEnd(5)}: total=${String(s.total).padStart(4)}  vol/duty=${String(s.dutyVol).padStart(4)}  sweep=${String(s.sweep).padStart(4)}  freq=${String(s.freqs).padStart(4)}`);
}

// Target (emu):
console.log('\nEmu target:');
console.log('  SQ1  : total=5418  vol/duty=1800  sweep=1800  freq=1800');
console.log('  SQ2  : total=5428  vol/duty=1800  sweep=1800  freq=1800');
console.log('  TRI  : total=2096  vol/duty=1800  sweep=   0  freq= 148');
console.log('  NOISE: total=7200  vol/duty=1800  sweep=1800  freq=1800');
console.log('  STAT : total= 267  vol/duty=   0  sweep= 267  freq=   0');

// Show frames where NOISE writes freq
let noiseFreqFrames = 0;
let lastNoiseFreq = -1;
for (const w of writes) {
  if (w.ch === 'NOISE' && (w.addr & 3) === 2) {
    noiseFreqFrames++;
    lastNoiseFreq = w.f;
  }
}
console.log(`\nNOISE freq writes: ${noiseFreqFrames}, last at F${lastNoiseFreq}`);
