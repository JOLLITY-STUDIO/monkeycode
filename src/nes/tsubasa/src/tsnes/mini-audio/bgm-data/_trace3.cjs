/**
 * Simple: capture Player APU writes frame-by-frame for first 5 frames
 */
const { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW } = require('./BGM00');
const { BGM00Player } = require('./BGM00Player');

function fmt(a, v) { return a.toString(16).padStart(4,'0') + ':' + v.toString(16).padStart(2,'0'); }

const player = new BGM00Player();
const papu = player.papu;
const origWrite = papu.writeReg;

// Capture frame-by-frame
const captures = [];
let cur = [];
papu.writeReg = function(addr, val) {
  cur.push([addr, val]);
  origWrite.call(papu, addr, val);
};

player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
player.start();

for (let f = 0; f < 5; f++) {
  cur = [];
  player.tick();
  captures.push([...cur]);
}

// Print
for (let f = 0; f < 5; f++) {
  console.log(`\nF${f} (${captures[f].length} writes):`);
  const byCh = { SQ1:[], SQ2:[], TRI:[], NOISE:[], STAT:[] };
  for (const [a, v] of captures[f]) {
    const ch = a === 0x4015 ? 'STAT' : a >= 0x400C ? 'NOISE' : a >= 0x4008 ? 'TRI' : a >= 0x4004 ? 'SQ2' : 'SQ1';
    byCh[ch].push(fmt(a, v));
  }
  for (const [ch, writes] of Object.entries(byCh)) {
    if (writes.length > 0) console.log(`  ${ch}: ${writes.join(' ')}`);
  }
}

// Also dump SQ1 track data interpretation
console.log('\n\n=== SQ1 Track first 16 bytes interpretation ===');
const sq1 = BGM00_TRACK_SQ1;
let idx = 0;
function next() { return sq1[idx++]; }

console.log('Byte  0: E0 22  -> SET_TIMING_TABLE_PTR idx=34');
idx += 2;
console.log('Byte  2: E2 00  -> SET_VOLUME_ENV vol=0');
idx += 2;
console.log('Byte  4: E3 08  -> OR_VOLUME_CTRL OR=0x08');
idx += 2;
console.log('Byte  6: 87     -> DURATION DUR_TABLE[7]=7 frames');
idx++;
console.log(`Byte  7: ${next().toString(16).padStart(2,'0')}     -> NOTE semitone/octave`);
console.log(`Byte  8: ${next().toString(16).padStart(2,'0')}`); idx++;
console.log(`Byte  9: ${next().toString(16).padStart(2,'0')}`); idx++;

// Dump SQ2
console.log('\n=== SQ2 Track first 16 bytes interpretation ===');
const sq2 = BGM00_TRACK_SQ2;
let j = 0;
console.log(`Byte  0: ${sq2[j].toString(16).padStart(2,'0')} (${sq2[j] < 0x80 ? 'NOTE! semitone='+(sq2[j]&0xF)+' octave='+(sq2[j]>>4) : sq2[j] >= 0xE0 ? 'CMD E'+((sq2[j]-0xE0)^0x10).toString(16).toUpperCase() : 'DUR prefix'})`);
j++;
console.log(`Byte  1: ${sq2[j].toString(16).padStart(2,'0')} (${sq2[j] < 0x80 ? 'NOTE! semitone='+(sq2[j]&0xF)+' octave='+(sq2[j]>>4) : sq2[j] >= 0xE0 ? 'CMD E'+((sq2[j]-0xE0)^0x10).toString(16).toUpperCase() : 'DUR prefix'})`);
j++;
for (let k = 2; k < 16; k++) {
  const b = sq2[k];
  console.log(`Byte ${k.toString().padStart(2,' ')}: ${b.toString(16).padStart(2,'0')} (${b < 0x80 ? 'NOTE' : b >= 0xE0 ? 'CMD E'+((b-0xE0)).toString(16).toUpperCase().padStart(2,'0') : 'DUR'})`);
}

// TRACK lengths
console.log('\n=== Track lengths ===');
console.log('SQ1:', BGM00_TRACK_SQ1.length);
console.log('SQ2:', BGM00_TRACK_SQ2.length);
console.log('TRI:', BGM00_TRACK_TRI.length);
console.log('NOISE:', BGM00_TRACK_NOISE.length);
console.log('RAW:', BGM00_RAW.length);
