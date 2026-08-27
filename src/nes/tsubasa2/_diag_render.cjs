// 检查 TECMO 文字实际渲染：buffer 像素 + ptTile 字形 + CHR slots
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);
for (let f = 0; f < 11; f++) r.frame(g);

const ppu = r.ppu;

// 1. ptTile 字形检查 (0x28-0x3d 是 TECMO/THEATER tile)
console.log('--- ptTile glyph check (baseTile=0 regS=' + ppu.regS + ') ---');
let glyphNz = 0;
for (let t = 0x28; t <= 0x3d; t++) {
  const tile = ppu.ptTile[t];
  if (!tile) { console.log('tile ' + t.toString(16) + ': MISSING'); continue; }
  let nz = 0;
  for (let i = 0; i < 64; i++) if (tile.pix[i]) nz++;
  if (nz) glyphNz++;
  if (nz === 0) console.log('tile ' + t.toString(16) + ': EMPTY pix');
}
console.log('glyph non-empty count: ' + glyphNz);

// 2. scroll 状态
console.log('--- scroll state ---');
console.log('regV=' + ppu.regV + ' regH=' + ppu.regH + ' regVT=' + ppu.regVT + ' regHT=' + ppu.regHT + ' regFV=' + ppu.regFV + ' regFH=' + ppu.regFH);
console.log('renderStartOverride=' + JSON.stringify(ppu.renderStartOverride));
console.log('f_bgVisibility=' + ppu.f_bgVisibility + ' f_spVisibility=' + ppu.f_spVisibility);

// 3. buffer 像素：TECMO 文字在 NT0 row12-13 col12-23
//    若 scroll=0: screen row = 12*8=96..111, col = 13*8=104..
//    统计该区域非黑像素
console.log('--- buffer text region scan ---');
for (let y = 96; y <= 111; y++) {
  let line = '';
  for (let x = 100; x <= 190; x += 4) {
    const v = ppu.buffer[y * 256 + x];
    line += (v === 0 ? '..' : (v >>> 16 & 255).toString(16).padStart(2,'0') + (v >>> 8 & 255).toString(16).padStart(2,'0') + (v & 255).toString(16).padStart(2,'0')).slice(-2) + ' ';
  }
  if (/[^\. ]/.test(line)) console.log('y' + y + ': ' + line);
}

// 4. 全 buffer 非零统计（按行）
console.log('--- buffer non-zero rows ---');
let nzRows = [];
for (let y = 0; y < 240; y++) {
  let nz = 0;
  for (let x = 0; x < 256; x++) if (ppu.buffer[y * 256 + x]) nz++;
  if (nz > 20) nzRows.push(y + ':' + nz);
}
console.log(nzRows.join(' '));
