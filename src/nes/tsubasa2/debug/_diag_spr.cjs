// 诊断 sprite 渲染: H5 chrSlots vs emu chrBanks, 及 PPU sprite 渲染关键状态
const fs = require('fs');
const st = JSON.parse(fs.readFileSync('output/ppu-trace/frame-013/state.json', 'utf8'));
console.log('H5 state:', JSON.stringify(st));
const emu = require('./_emu_frames.json');
const f13 = Object.values(emu).find(f => f.frame === 13);
if (f13) console.log('emu f13 chrBanks:', JSON.stringify(f13.chrBanks), 'prgBankMap:', JSON.stringify(f13.prgBankMap));
// ppu oam unpack 状态
const oam = JSON.parse(fs.readFileSync('output/ppu-trace/frame-013/oam.json', 'utf8'));
console.log('oam[0..3]:', JSON.stringify(oam.slice(0, 4)));
// sprite palette
const pal = JSON.parse(fs.readFileSync('output/ppu-trace/frame-013/palette.json', 'utf8'));
console.log('palBg:', JSON.stringify(pal.bg));
console.log('palSp:', JSON.stringify(pal.spr));
// chr png 是否存在
const dirs = ['output/ppu-trace/frame-013'];
for (const d of dirs) {
  console.log(d, fs.existsSync(d) ? fs.readdirSync(d) : 'NO DIR');
}
