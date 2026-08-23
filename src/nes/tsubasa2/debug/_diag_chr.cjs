const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
for (let i = 0; i < 30; i++) game.frame(nes);

const ppu = nes.ppu;
const log = [];
// pixrendered > 0xff 数量
let pr = 0;
for (let i = 0; i < ppu.pixrendered.length; i++) if (ppu.pixrendered[i] > 0xff) pr++;
log.push(`pixrendered>0xff: ${pr}`);
let prAny = 0;
for (let i = 0; i < ppu.pixrendered.length; i++) if (ppu.pixrendered[i] !== 65) prAny++;
log.push(`pixrendered!=65: ${prAny}`);
// bgbuffer 非零样本位置
const bg = ppu.bgbuffer;
let sample = [];
for (let i = 0; i < bg.length; i++) {
  if (bg[i] !== 0 && sample.length < 5) sample.push(`[${i}]=0x${bg[i].toString(16)}`);
}
log.push(`bgbuffer samples: ${sample.join(' ')}`);
// 对应 pixrendered 值
for (const s of sample) {
  const idx = parseInt(s.slice(1, s.indexOf(']')), 10);
  log.push(`pix[${idx}]=${ppu.pixrendered[idx]} (0x${ppu.pixrendered[idx].toString(16)})`);
}
// 手动再跑一次 renderFramePartially
ppu.renderFramePartially(0, 240);
let nz = 0;
for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) nz++;
log.push(`after manual renderFramePartially: buffer nonZero=${nz}`);
// cntV / curNt 状态
log.push(`cntV=${ppu.cntV} cntH=${ppu.cntH} curNt=${ppu.curNt} ntable1=${Array.from(ppu.ntable1).join(',')}`);
// nameTable 的 tile 非零分布
for (let nt = 0; nt < 4; nt++) {
  let ntnz = 0;
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) if (ppu.nameTable[nt].tile[y * 32 + x] !== 0) ntnz++;
  log.push(`ppu.nameTable[${nt}] nonZero tiles=${ntnz}`);
}
fs.writeFileSync(path.resolve(__dirname, '_diag_chr_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
