const fs = require('fs');

// emu f860 state/scroll/palette/chr
const st = JSON.parse(fs.readFileSync('output/emu-full/frame-0860/state.json', 'utf8'));
const pal = JSON.parse(fs.readFileSync('output/emu-full/frame-0860/palette.json', 'utf8'));
const chrSw = JSON.parse(fs.readFileSync('output/emu-full/frame-0860/chr-switches.json', 'utf8'));
console.log('=== emu f860 ===');
console.log('scroll:', JSON.stringify(st.scroll));
console.log('scrollEnd:', JSON.stringify(st.scrollEnd));
console.log('palette:', JSON.stringify(pal));
console.log('chrBanks:', JSON.stringify(st.chrBanks));
console.log('chrSwitches scanlines:', JSON.stringify(chrSw.bankMapByScanline.slice(0, 5)));

// GT f860
const lines = fs.readFileSync('src/game/prg/data/scene/opening/opening-subtitle-1.ts', 'utf8').split('\n');
const ln = lines.find(l => l.includes('{f:860,'));
if (ln) {
  console.log('\n=== GT f860 raw ===');
  console.log(ln.slice(0, 2000));
}
