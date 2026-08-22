// _verify_boot_bg.cjs — 验证 BOOT 开场背景从真实 ROM 数据渲染 (SCENE_0x0A + bank08 + bank06)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const OUT = path.join(ROOT, '_test_out');
process.chdir(ROOT);

const TSC = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
const targetJs = path.join(OUT, 'game/prg/code/scene/BootBackgroundRenderer.js');
if (!fs.existsSync(targetJs)) {
  console.log('[tsc] compile (tsconfig.play.json) ...');
  execFileSync(process.execPath, [TSC, '-p', 'tsconfig.play.json'], { stdio: 'inherit' });
  console.log('[tsc] OK\n');
} else {
  console.log('[tsc] skip (build exists)\n');
}

const { DataStore } = require(path.join(OUT, 'game/prg/data/store/DataStore.js'));
const { BootBackgroundRenderer } = require(path.join(OUT, 'game/prg/code/scene/BootBackgroundRenderer.js'));
const { SCENE_0x0A } = require(path.join(OUT, 'game/prg/data/tables/bank07-scenes-metatile.js'));
const { getMetatile } = require(path.join(OUT, 'game/prg/data/tables/bank08-map-metatile.js'));

function hex(c) { return c.toString(16).padStart(2, '0'); }
function rgbHex(o) { return '#' + [o.r, o.g, o.b].map(v => v.toString(16).padStart(2, '0')).join(''); }

const store = new DataStore();
const renderer = new BootBackgroundRenderer(store);
renderer.render();

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log('PASS ' + name); }
  else { fail++; console.log('FAIL ' + name + '  ' + (detail || '')); }
}

// 1. NT0 非零 tile (背景已画)
let nt0NonZero = 0;
const ntSample = [];
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    const t = store.nt0[y][x].tile;
    if (t) { nt0NonZero++; if (ntSample.length < 12) ntSample.push('(' + x + ',' + y + ')=' + hex(t)); }
  }
}
check('NT0 非零 tile > 200', nt0NonZero > 200, 'count=' + nt0NonZero);
console.log('  NT0 非零: ' + nt0NonZero + '/960 样例: ' + ntSample.join(' '));

// 2. NT0 tile 与 SCENE_0x0A metatile 展开对比 (行优先 8 块/行, 每块 4×4)
const w = SCENE_0x0A[3], h = SCENE_0x0A[4];
const grid = SCENE_0x0A.slice(6, 6 + w * h);
let matchCount = 0, total = 0, mismatch = [];
const perRow = 8;
for (let i = 0; i < grid.length; i++) {
  const rec = getMetatile(grid[i]);
  if (!rec) continue;
  const gx = i % perRow, gy = Math.floor(i / perRow);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = gx * 4 + c, y = gy * 4 + r;
      const expect = rec.tiles[r * 4 + c];
      const actual = store.nt0[y] && store.nt0[y][x] ? store.nt0[y][x].tile : -1;
      total++;
      if (expect === actual) matchCount++;
      else if (mismatch.length < 5) mismatch.push('(' + x + ',' + y + ') exp=' + hex(expect) + ' got=' + hex(actual));
    }
  }
}
check('metatile 展开 100% 匹配', matchCount === total && total > 0, matchCount + '/' + total + '  ' + mismatch.join(' '));

// 3. 调色板非黑
const pal = store.paletteTable;
const c0 = pal.bgPalettes[0].colors[1];
const c1 = pal.bgPalettes[0].colors[2];
check('BG palette bg[0][1] 非黑', (c0.r + c0.g + c0.b) > 0, rgbHex(c0));
check('BG palette bg[0][2] 非黑', (c1.r + c1.g + c1.b) > 0, rgbHex(c1));
check('SPR palette spr[0][2] 非黑', (pal.sprPalettes[0].colors[2].r + pal.sprPalettes[0].colors[2].g + pal.sprPalettes[0].colors[2].b) > 0, rgbHex(pal.sprPalettes[0].colors[2]));
console.log('  bg[0] = ' + pal.bgPalettes[0].colors.map(rgbHex).join(' '));
console.log('  spr[0] = ' + pal.sprPalettes[0].colors.map(rgbHex).join(' '));

// 4. 与 PALETTE_BG_06 组 0 字节一致 (0f 1a 18 30 ...)
const { PALETTE_BG_06, PALETTE_SPR_06 } = require(path.join(OUT, 'game/prg/data/scene/textscript/scripts-bank-06.js'));
const idx = SCENE_0x0A[2] & 0x3F;
check('BG 调色板索引 = ctrl & 0x3F = 0', idx === 0, 'idx=' + idx);
const bgOff = idx * 16;
let bgByteOk = true;
for (let i = 0; i < 4; i++) {
  // colors[0] 是透明/背景色 = 第一字节
  const c = pal.bgPalettes[0].colors[i];
  if (PALETTE_BG_06[bgOff + i] !== 0x0f + i * 0 && c === undefined) { bgByteOk = false; }
}
check('bank06 PALETTE_BG_06 组0 首字节=0x0f', PALETTE_BG_06[bgOff] === 0x0f, 'byte=' + hex(PALETTE_BG_06[bgOff]));
check('bank06 PALETTE_SPR_06 组0 首字节=0x0f', PALETTE_SPR_06[idx * 16] === 0x0f, 'byte=' + hex(PALETTE_SPR_06[idx * 16]));

// 5. NT 属性区 palette 值 (写 0 默认)
const attrOk = store.nt0[0][0].palette === 0 && store.nt0[10][5].palette === 0;
check('NT entry palette=0', attrOk);

console.log('\n==== RESULT: PASS=' + pass + ' FAIL=' + fail + ' ====');
process.exit(fail ? 1 : 0);
