/**
 * Trace each channel individually, comparing Emu ↔ Player writes frame by frame
 * Only trace first 10 frames for clarity
 */
import { NesAudio } from '../emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';
import { Tsubasa2AudioPlayer } from './Tsubasa2AudioPlayer';
import { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW } from './BGM00';

const FRAMES = 10;

// Run emu
type ChWrites = [number, number][];
const emuWrites: Record<string, ChWrites> = { SQ1: [], SQ2: [], TRI: [], NOISE: [] };
let emuFrame = 0;
let emuCapture = false;

const emu = new NesAudio();
emu.init(NES_PRG_ROM, NES_CHR_ROM);
emu.onFrameBefore = () => {
  if (!emuCapture) return;
  if (emuFrame >= FRAMES) {
    emu.stop();
    return;
  }
  emuFrame++;
};

// Capture APU writes per frame
const origWrite = (emu as any).papu.writeReg;
(emu as any).papu.writeReg = function(addr: number, val: number) {
  if (!emuCapture) return;
  const frame = emuFrame - 1;
  if (frame >= 0 && frame < FRAMES) {
    const ch = addr >= 0x400C ? 'NOISE' : addr >= 0x4008 ? 'TRI' : addr >= 0x4004 ? 'SQ2' : 'SQ1';
    if (emuWrites[ch]) emuWrites[ch].push([addr & 3, val]);
  }
  origWrite.call(this, addr, val);
};

emu.run(1); // Run one frame to get past init
emuCapture = true;
emu.loadBGM00(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE);
for (let f = 0; f < FRAMES + 2; f++) {
  emu.tick();
}

// Run Player
type ChWritesKey = [string, number][];
function fmtAddr(addr: number, val: number): string {
  return `${addr.toString(16).padStart(4,'0')}:${val.toString(16).padStart(2,'0')}`;
}

function collectPlayerWrites(chName: string): [number, (addr: number, val: number) => void] {
  const w: ChWritesKey = [];
  const base = chName === 'NOISE' ? 0x0C : chName === 'TRI' ? 0x08 : chName === 'SQ2' ? 0x04 : 0x00;
  return [base, (addr: number, val: number) => {
    w.push([addr.toString(16).padStart(4,'0'), val]);
  }];
}

// Player for each channel
for (const chName of ['SQ1', 'SQ2', 'TRI', 'NOISE']) {
  const player = new Tsubasa2AudioPlayer();
  const papu = (player as any).papu;
  const writes: Record<string, number[]> = {};
  
  const origReg = papu.writeReg;
  papu.writeReg = function(addr: number, val: number) {
    const key = addr.toString(16).padStart(4, '0');
    if (!writes[key]) writes[key] = [];
    writes[key].push(val);
    origReg.call(papu, addr, val);
  };
  
  player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
  player.start();
  
  for (let f = 0; f < FRAMES; f++) {
    // Reset write buffers
    for (const k of Object.keys(writes)) writes[k] = [];
    writes['__frame'] = f as any;
    player.tick();
  }
}

// Write output
const lines: string[] = [];
lines.push('=== Per-frame channel comparison (first 10 frames) ===');
lines.push('');
lines.push('Format: [ch] 400X:player_val(emu_val)');

for (let f = 0; f < FRAMES; f++) {
  lines.push(`\n-- Frame ${f} --`);
  for (const chName of ['SQ1', 'SQ2', 'TRI', 'NOISE']) {
    // TODO
  }
}

// Simpler approach: just compare F0 data
const player2 = new Tsubasa2AudioPlayer();
const pWrites: Record<string, number[]> = {};
const opw = (player2 as any).papu.writeReg;
(player2 as any).papu.writeReg = function(addr: number, val: number) {
  const key = addr.toString(16).padStart(4, '0');
  if (!pWrites[key]) pWrites[key] = [];
  pWrites[key].push(val);
  opw.call((player2 as any).papu, addr, val);
};

player2.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
player2.start();

// Trace first 5 frames
for (let f = 0; f < 5; f++) {
  for (const k of Object.keys(pWrites)) pWrites[k] = [];
  player2.tick();
  
  console.log(`\n--- Player F${f} ---`);
  const emuF = f;
  console.log(`  Emu:  ${emuWrites.SQ1.filter(w => w[0] === 0).length ? emuWrites.SQ1.map(w => fmtAddr(0x4000+w[0], w[1])).join(' ') : '(no data for this frame)'}`);
  
  for (const chName of ['SQ1', 'SQ2', 'TRI', 'NOISE'] as const) {
    const base = chName === 'NOISE' ? 0x400C : chName === 'TRI' ? 0x4008 : chName === 'SQ2' ? 0x4004 : 0x4000;
    const ents: string[] = [];
    for (let off = 0; off <= 3; off++) {
      const addr = base + off;
      const key = addr.toString(16).padStart(4, '0');
      if (pWrites[key] && pWrites[key].length > 0) {
        ents.push(`${key}:${pWrites[key][0].toString(16).padStart(2, '0')}`);
      }
    }
    if (ents.length > 0) {
      console.log(`  ${chName}: ${ents.join(', ')}`);
    }
  }
}

console.log('\n\n=== Emu captured writes (first 5 frames) ===');
for (let f = 0; f < 5; f++) {
  console.log(`\n--- Emu F${f} ---`);
  // Emu writes interleave all channels, collect by channel
  // We captured per-frame but without frame tracking in the old capture
}

// Print per-frame emu frame index info
console.log('\nCaptured emu writes frames:', emuWrites.SQ1.length > 0 ? 'yes' : 'no');
