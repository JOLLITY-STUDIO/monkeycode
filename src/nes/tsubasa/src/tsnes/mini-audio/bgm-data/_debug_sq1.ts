/**
 * 精准跟踪 BGM00Player SQ1 帧级执行
 */
import { BGM00Player } from './BGM00Player';
import { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from './BGM00';
import * as fs from 'fs';

const SAMPLE_RATE = 48000;
const MAX_FRAMES = 30;

const out: string[] = [];

function log(s: string) { out.push(s); }

// Create player with hook
const player = new BGM00Player(SAMPLE_RATE);

// Track APU writes
const writes: Array<{ f: number; addr: number; val: string; ch: string }> = [];
const papu = (player as any).papu;
const origWr = papu.writeReg.bind(papu);
papu.writeReg = function (addr: number, val: number) {
  if (addr >= 0x4000 && addr <= 0x4017) {
    let ch = '';
    if (addr < 0x4004) ch = 'SQ1';
    else if (addr < 0x4008) ch = 'SQ2';
    else if (addr < 0x400C) ch = 'TRI';
    else if (addr < 0x4010) ch = 'NOISE';
    else if (addr < 0x4014) ch = 'DMC';
    else if (addr === 0x4015) ch = 'STAT';
    if (ch) writes.push({ f: player.progress.frame, addr, val: val.toString(16).padStart(2,'0'), ch });
  }
  return origWr(addr, val);
};

// Override _sequencerTick to log
const w = (player as any).w;
const blocks = (player as any).blocks;
const tracks = (player as any).tracks;

player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE);
player.start();

log('=== SQ1 Track Data (first 50 bytes) ===');
const sq1 = BGM00_TRACK_SQ1;
let hex = '';
for (let i = 0; i < 50; i++) {
  hex += sq1[i].toString(16).padStart(2, '0') + ' ';
  if ((i + 1) % 16 === 0) { log('  ' + hex); hex = ''; }
}
if (hex) log('  ' + hex);
log(`  Total: ${sq1.length} bytes`);

log('\n=== Frame-by-frame SQ1 state ===');

for (let f = 0; f < MAX_FRAMES && player.progress.playing; f++) {
  const blk = blocks[4];
  const dl = w.durLo[4];
  const dh = w.durHi[4];
  const pos = blk.trackLo | (blk.trackHi << 8);
  
  const seqTick = (dl === 1); // will decrement to 0
  log(`\nF${f}: pos=${pos} durLo=${dl} durHi=${dh} ${seqTick ? 'SEQ_TICK!' : ''}`);
  
  if (seqTick && pos < sq1.length) {
    // Show what's at the current position
    let preview = '';
    for (let i = 0; i < 10 && pos + i < sq1.length; i++) {
      preview += sq1[pos + i].toString(16).padStart(2, '0') + ' ';
    }
    log(`  Track[${pos}..${Math.min(pos+9,sq1.length-1)}]: ${preview}`);
  }
  
  // Special: check what byte gets processed when sequencer ticks
  if (seqTick) {
    let p = pos;
    let b = sq1[p];
    log(`  Byte at pos ${p}: 0x${b.toString(16).padStart(2,'0')}`);
    if (b >= 0xE0) {
      log(`    → Command: 0x${b.toString(16)} (idx=${b & 0x1F})`);
      if (p + 1 < sq1.length) {
        let i = 1;
        const cmdIdx = b & 0x1F;
        // Check known command param counts
        const paramCounts: Record<number, number> = {
          0x00: 1, 0x02: 1, 0x03: 1, 0x04: 1, 0x05: 1, 0x08: 2, 0x09: 2, 0x0B: 1, 0x0D: 1, 0x1A: 1,
        };
        const n = paramCounts[cmdIdx] || 0;
        while (i <= n && p + i < sq1.length) {
          log(`    Param[${i-1}]: 0x${sq1[p + i].toString(16).padStart(2,'0')}`);
          i++;
        }
        // Show byte past params
        if (p + i < sq1.length) {
          const next = sq1[p + i];
          if (next >= 0xE0) log(`    Next byte: 0x${next.toString(16)} → command`);
          else if (next >= 0x80) log(`    Next byte: 0x${next.toString(16)} → duration prefix (idx=${next & 0x3F})`);
          else log(`    Next byte: 0x${next.toString(16)} → note (octave=${next>>4}, semitone=${next & 0x0F})`);
        }
      }
    } else if (b >= 0x80) {
      log(`    → Duration prefix: 0x${b.toString(16)} (idx=${b & 0x3F})`);
      if (p + 1 < sq1.length) {
        const next = sq1[p + 1];
        if (next < 0x80) log(`    Next byte: 0x${next.toString(16)} → note (octave=${next>>4}, semitone=${next&0x0F})`);
        else log(`    Next byte: 0x${next.toString(16)}`);
      }
    } else {
      log(`    → Note byte (octave=${b>>4}, semitone=${b&0x0F})`);
    }
  }
  
  player.tick();
  
  // Show writes for this frame
  const fw = writes.filter(w => w.f === f && w.ch === 'SQ1');
  if (fw.length > 0) {
    const ws = fw.map(w => `$${w.addr.toString(16)}=0x${w.val}`).join(', ');
    log(`  Writes: ${ws}`);
  }
  
  // Show updated state
  log(`  volCtrl=0x${blk.volCtrl.toString(16).padStart(2,'0')} apuVol=0x${blk.apuVol.toString(16).padStart(2,'0')} freqLo=0x${blk.freqLo.toString(16).padStart(2,'0')} freqHi=0x${blk.freqHi.toString(16).padStart(2,'0')} freqDirty=${w.freqDirty[4]}`);
  
  if (pos >= sq1.length) {
    log('  *** SQ1 TRACK ENDED ***');
  }
}

// Stats
log(`\n=== Total SQ1 Writes: ${writes.filter(w => w.ch === 'SQ1').length} ===`);
log(`=== Other channels Active? chMask=0x${w.chMask.toString(16).padStart(2,'0')} ===`);

fs.writeFileSync('mini-audio/bgm-data/_debug_sq1_out.txt', out.join('\n'), 'utf-8');
console.log('Output written to _debug_sq1_out.txt');
