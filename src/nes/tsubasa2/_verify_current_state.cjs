// _verify_current_state.cjs — 诊断当前 Tsubasa2 启动后实际状态
// 用途: 看现在帧 30 / 100 / 300 / 500 时 NT/palette/OAM 是什么,
//       哪一个精灵在显示, 是不是 Opening 死锁在黑屏
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const OUT = path.join(ROOT, '_test_out');
process.chdir(ROOT);

const TSC = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
console.log('[tsc] compile ...');
execFileSync(process.execPath, [TSC, '-p', 'tsconfig.play.json'], { stdio: 'inherit' });
console.log('[tsc] OK\n');

const { Tsubasa2 } = require(path.join(OUT, 'game/index.js'));
const { NES } = require(path.join(OUT, 'core/nes.js'));

const ts = new Tsubasa2();
const nes = new NES({ emulateSound: false });
ts.boot();

function hex(c) { return c.toString(16).padStart(2, '0'); }
function rgbHex(o) { return '#' + [o.r, o.g, o.b].map(v => v.toString(16).padStart(2, '0')).join(''); }

function dumpFrame(label, frameNum) {
  console.log(`\n========== ${label} (frame ${frameNum}) ==========`);
  const s = ts.store;
  const ppu = nes.ppu;
  console.log('  ram_00ED =', s.read('ram_00ED'));
  console.log('  input_mask =', s.get('input_mask'));

  // NT0 非零 tile 数
  let nt0Tile = 0;
  const sample = [];
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 32; x++) {
      const t = s.nt0[y][x].tile;
      if (t) {
        nt0Tile++;
        if (sample.length < 30) sample.push(`(${x},${y})=${hex(t)}`);
      }
    }
  }
  console.log(`  NT0 非零 tile: ${nt0Tile}/960, 样例: ${sample.join(' ')}`);

  // VRAM 中转
  let vramNT = 0;
  for (let i = 0x2000; i < 0x23c0; i++) if (ppu.vramMem[i]) vramNT++;
  console.log(`  VRAM $2000-$23BF 非零: ${vramNT}`);

  // Palette: DataStore 和 PPU 两边都看
  const pal = s.paletteTable;
  console.log(`  DataStore.paletteTable bg[0][1]=${rgbHex(pal.bgPalettes[0].colors[1])} bg[0][2]=${rgbHex(pal.bgPalettes[0].colors[2])}`);
  console.log(`  DataStore.paletteTable spr[0][1]=${rgbHex(pal.sprPalettes[0].colors[1])} spr[0][2]=${rgbHex(pal.sprPalettes[0].colors[2])}`);

  console.log(`  PPU imgPalette[0..15]: ${Array.from(ppu.imgPalette.slice(0, 16)).map(hex).join(' ')}`);
  console.log(`  PPU sprPalette[0..15]: ${Array.from(ppu.sprPalette.slice(0, 16)).map(hex).join(' ')}`);

  // OAM
  let oamActive = [];
  for (let i = 0; i < 256; i += 4) {
    const y = s.read(0x0200 + i);
    const tile = s.read(0x0201 + i);
    const attr = s.read(0x0202 + i);
    const x = s.read(0x0203 + i);
    if (y < 0xf0) {
      oamActive.push(`#${i/4}: (${x},${y}) tile=${hex(tile)} attr=${hex(attr)}`);
    }
  }
  console.log(`  OAM 可见精灵 (y<0xf0): ${oamActive.length}`);
  oamActive.slice(0, 15).forEach(o => console.log('    ', o));

  // Frame buffer 中线
  if (ppu.buffer) {
    const buf = ppu.buffer;
    const colors = new Set();
    for (let y = 110; y < 130; y++) {
      for (let x = 100; x < 200; x++) {
        colors.add(buf[y * 256 + x]);
      }
    }
    console.log(`  FrameBuf 中部 (y110-130 x100-200) 唯一色: ${[...colors].map(hex).slice(0, 10).join(' ')}`);
  }

  // chrbanks
  console.log('  chrBank2/3/4/5:', s.get('chrBank2'), s.get('chrBank3'), s.get('chrBank4'), s.get('chrBank5'));

  // PPU 控制位
  console.log(`  CTRL1=${hex(ppu.f_2000_2001.ctrl1 || 0)} CTRL2=${hex(ppu.f_2000_2001.ctrl2 || 0)} bgVis=${ppu.f_bgVisibility} spVis=${ppu.f_spVisibility}`);
}

const checkpoints = [10, 30, 100, 200, 300, 400, 500];
for (const f of checkpoints) {
  while (true) {
    const before = ts.opening.frame;
    // run 1 frame
    try { ts.frame(nes); } catch (e) { console.log('frame error', e.message); break; }
    if (ts.opening.frame >= f) break;
  }
  dumpFrame('CHECKPOINT', f);
}
