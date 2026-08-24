const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/audio-rom.ts', 'utf8');
const m7 = c.match(/export const BANK7_BYTES: Readonly<Uint8Array> = new Uint8Array\(\[([\s\S]*?)\]\);/);
const b7 = m7[1].split(',').map((s) => parseInt(s.trim(), 16));
const m12 = c.match(/export const BANK12_BYTES: Readonly<Uint8Array> = new Uint8Array\(\[([\s\S]*?)\]\);/);
const b12 = m12[1].split(',').map((s) => parseInt(s.trim(), 16));

function dumpBgm(addr, label) {
  console.log('--- BGM @ $' + addr.toString(16) + ' (' + label + ') ---');
  let off = addr - 0x8000;
  const head = [];
  for (let i = 0; i < 12; i++) head.push('0x' + (b7[off + i] ?? -1).toString(16));
  console.log('head: ' + head.join(', '));
  // 解析头部 [chNum, trackLo, trackHi]×N
  let i = 0;
  while (i < 24) {
    const ch = b7[off + i];
    if (ch >= 0x80) { console.log('header end at offset ' + i); break; }
    const t = b7[off + i + 1] | (b7[off + i + 2] << 8);
    console.log('  ch=' + ch + ' track=$' + t.toString(16));
    i += 3;
  }
}

dumpBgm(0x8892, 'ptr index 0');
dumpBgm(0x889c, 'ptr index 1');
dumpBgm(0x88a8, 'ptr index 2');
dumpBgm(0x88b4, 'ptr index 3');
dumpBgm(0x88c4, 'ptr index 4');
dumpBgm(0x88dc, 'ptr index 5');
dumpBgm(0x8bd6, 'ptr index -2 (req 0x01 via req-3)');
dumpBgm(0x8b34, 'ptr index -1 (req 0x02 via req-3)');
