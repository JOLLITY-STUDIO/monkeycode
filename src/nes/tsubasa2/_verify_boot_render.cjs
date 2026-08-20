// BOOT 渲染验证: 无头跑 BOOT 帧序列, 比对 NT/精灵/渐显调色板 vs cut_0x00_boot 真实数据
// 用法: npx tsc -p tsconfig.play.json && node _verify_boot_render.cjs
const path = require('path');
const OUT = path.join(__dirname, '_test_out');

const { Tsubasa2 } = require(path.join(OUT, 'core/Tsubasa2.js'));
const { NES_PALETTE } = require(path.join(OUT, 'game/data/ppu/pallete/nes-pallete-table.js'));
const {
  BOOT_NT0, BOOT_OAM, BOOT_BG_PALETTE, BOOT_SPR_PALETTE,
  BOOT_BG_CHR_BANK, bootFadeStep, bootFadeByte,
} = require(path.join(OUT, 'game/data/ppu/nametable/cut/cut_0x00_boot.js'));

let pass = 0, fail = 0;
const fails = [];
function ok(cond, msg) {
  if (cond) { pass++; console.log(`  PASS ${msg}`); }
  else { fail++; fails.push(msg); console.log(`  FAIL ${msg}`); }
}
function toColor(idx) {
  const p = idx * 3;
  return { r: NES_PALETTE[p], g: NES_PALETTE[p + 1], b: NES_PALETTE[p + 2], a: 255 };
}
// 复刻 controller._nesPaletteToTable (NES 索引 → RGBA PaletteTable)
function expectedTable(bg, spr) {
  const bg0 = toColor(bg[0] ?? 0x0f);
  const mk = (arr, start) => ({ colors: [bg0, toColor(arr[start + 1]), toColor(arr[start + 2]), toColor(arr[start + 3])] });
  return {
    bgPalettes: [mk(bg, 0), mk(bg, 4), mk(bg, 8), mk(bg, 12)],
    sprPalettes: [mk(spr, 0), mk(spr, 4), mk(spr, 8), mk(spr, 12)],
  };
}
function sameColor(a, b) { return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a; }
function sameTable(actual, exp, tag) {
  const bad = [];
  for (let p = 0; p < 4; p++) {
    for (let c = 0; c < 4; c++) {
      if (!sameColor(actual.bgPalettes[p].colors[c], exp.bgPalettes[p].colors[c])) bad.push(`bg[${p}][${c}]`);
      if (!sameColor(actual.sprPalettes[p].colors[c], exp.sprPalettes[p].colors[c])) bad.push(`spr[${p}][${c}]`);
    }
  }
  if (bad.length > 0) console.log(`    [${tag}] 不一致: ${bad.slice(0, 8).join(', ')} (共 ${bad.length})`);
  return bad.length === 0;
}

const game = new Tsubasa2(null, {});
game.prepare();

// ── 帧 5: 全黑 (fade step 0) ──
for (let f = 0; f < 5; f++) game.stepFrame();
{
  const exp = expectedTable(
    BOOT_BG_PALETTE.map(c => bootFadeByte(c, bootFadeStep(5))),
    BOOT_SPR_PALETTE.map(c => bootFadeByte(c, bootFadeStep(5))),
  );
  ok(sameTable(game.store.paletteTable, exp, 'frame5'), '帧 5 调色板全黑 (fade step 0)');
}

// ── 帧 12: 渐显 step 1 ──
for (let f = 5; f < 12; f++) game.stepFrame();
{
  const exp = expectedTable(
    BOOT_BG_PALETTE.map(c => bootFadeByte(c, bootFadeStep(12))),
    BOOT_SPR_PALETTE.map(c => bootFadeByte(c, bootFadeStep(12))),
  );
  ok(sameTable(game.store.paletteTable, exp, 'frame12'), '帧 12 渐显 step 1 (0F 06 00 00)');
}

// ── 帧 30: 全量调色板 + NT 25 非零 + 40 精灵 ──
for (let f = 12; f < 30; f++) game.stepFrame();
{
  // NT0 非零 tile 数 = 25
  let nonZero = 0;
  const nt0 = game.store.nt0;
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 32; x++) {
      if (nt0[y][x].tile !== 0) nonZero++;
    }
  }
  ok(nonZero === 25, `NT0 非零 tile = 25 (实际 ${nonZero})`);

  // NT0 tile 值 + bank 全量匹配
  let ntMatch = true;
  for (let i = 0; i < 960; i++) {
    const x = i % 32, y = (i / 32) | 0;
    const e = nt0[y][x];
    const expect = BOOT_NT0[i];
    if (e.tile !== expect || (expect !== 0 && e.bank !== BOOT_BG_CHR_BANK)) { ntMatch = false; break; }
  }
  ok(ntMatch, 'NT0 tile 值/位置/bank=0 与 BOOT_NT0 全量匹配');

  // 标题字母具体值抽查 (行 12 x=13-21: 28 29 2C 2D 38 37 39 3C 3D; 行 13 x=13-21: 2A 2B 2E 2F 3A 2A 3B 3E 3F)
  const r12 = [], r13 = [];
  for (let x = 0; x < 32; x++) { r12.push(nt0[12][x].tile); r13.push(nt0[13][x].tile); }
  const e12 = [0x28, 0x29, 0x2C, 0x2D, 0x38, 0x37, 0x39, 0x3C, 0x3D];
  const e13 = [0x2A, 0x2B, 0x2E, 0x2F, 0x3A, 0x2A, 0x3B, 0x3E, 0x3F];
  const titleOk = e12.every((v, i) => r12[13 + i] === v) && e13.every((v, i) => r13[13 + i] === v);
  ok(titleOk, `标题字母 tile 匹配 (行12=${r12.slice(13, 22).map(v => v.toString(16)).join(',')} 行13=${r13.slice(13, 22).map(v => v.toString(16)).join(',')})`);

  // 40 个活跃精灵
  const sprites = game.store.sprites.filter(s => s.active);
  ok(sprites.length === 40, `活跃精灵 = 40 (实际 ${sprites.length})`);

  // 精灵数据全量匹配 (x/y+1/tile/bank)
  let sprMatch = true;
  for (let i = 0; i < Math.min(sprites.length, BOOT_OAM.length); i++) {
    const a = sprites[i], e = BOOT_OAM[i];
    if (a.x !== e.x || a.y !== e.y + 1 || a.tile !== e.h5Tile || a.bank !== e.bank) {
      sprMatch = false;
      console.log(`    spr[${i}] H5=${JSON.stringify({ x: a.x, y: a.y, t: a.tile, b: a.bank })} exp=${JSON.stringify({ x: e.x, y: e.y + 1, t: e.h5Tile, b: e.bank })}`);
      break;
    }
  }
  ok(sprMatch, '40 精灵 (x/y+1/h5Tile/bank) 与 BOOT_OAM 全量一致');

  // 帧 30 调色板 = 全量稳定值
  const exp = expectedTable(BOOT_BG_PALETTE, BOOT_SPR_PALETTE);
  ok(sameTable(game.store.paletteTable, exp, 'frame30'), '帧 30 调色板 = 全量稳定值');
}

// ── 合成帧有实际内容 (非黑像素 > 100, 证明 NT/精灵渲染链路通) ──
{
  const buf = game.captureFrame();
  let nonBlack = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nonBlack++;
  ok(nonBlack > 100, `合成帧非黑像素 > 100 (实际 ${nonBlack})`);
}

// ── START 跳过 → TITLE ──
for (let f = 30; f < 280; f++) game.stepFrame();
game.setButtons(8); game.stepFrame(); game.setButtons(0);
for (let f = 0; f < 10; f++) game.stepFrame();
const root = game.store.read('boot_root');
ok(root === 1, `BOOT→TITLE 流转 (root=${root})`);

console.log(`\n结果: PASS=${pass} FAIL=${fail}`);
if (fails.length) console.log('失败项:', fails.join(' | '));
process.exit(fail > 0 ? 1 : 0);
