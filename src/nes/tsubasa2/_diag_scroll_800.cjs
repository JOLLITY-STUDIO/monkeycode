// H5 nes=800 的滚动计数器 vs emu f800 state.json
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

for (let h5 = 0; h5 <= 790; h5++) game.frame(runtime);

const ppu = runtime.ppu;
const out = [];
out.push('=== H5 nes=800 PPU 滚动/渲染状态 ===');
out.push('cntFV=' + ppu.cntFV + ' cntV=' + ppu.cntV + ' cntH=' + ppu.cntH + ' cntVT=' + ppu.cntVT + ' cntHT=' + ppu.cntHT);
out.push('regFV=' + ppu.regFV + ' regV=' + ppu.regV + ' regH=' + ppu.regH + ' regVT=' + ppu.regVT + ' regHT=' + ppu.regHT + ' regS=' + ppu.regS);
out.push('f_bgPatternTable=' + ppu.f_bgPatternTable + ' f_spPatternTable=' + ppu.f_spPatternTable);
out.push('scanline=' + ppu.scanline);
out.push('renderStartOverride=' + JSON.stringify(ppu.renderStartOverride));
out.push('chrSlots(runtime)=' + JSON.stringify(runtime.chrSlots));

out.push('');
out.push('=== emu frame-0800 state.json ===');
const emu = JSON.parse(fs.readFileSync('output/emu-full/frame-0800/state.json', 'utf8'));
out.push('scroll: ' + JSON.stringify(emu.scroll));
out.push('chrBanks: ' + JSON.stringify(emu.chrBanks));
out.push('bgTable=' + emu.bgTable + ' spTable=' + emu.spTable + ' nTblAddress=' + emu.nTblAddress);

// H5 调色板 vs emu
out.push('');
out.push('=== H5 palette ===');
out.push('bg: ' + JSON.stringify(Array.from(ppu.imgPalette.slice(0, 16))));
out.push('spr: ' + JSON.stringify(Array.from(ppu.imgPalette.slice(16, 32))));
out.push('=== emu palette.json ===');
const emuPal = JSON.parse(fs.readFileSync('output/emu-full/frame-0800/palette.json', 'utf8'));
out.push('bg: ' + JSON.stringify(emuPal.bg));
out.push('spr: ' + JSON.stringify(emuPal.sp || emuPal.spr));

fs.writeFileSync('_diag_scroll_800_out.txt', out.join('\n'), 'utf8');
console.log('done');
