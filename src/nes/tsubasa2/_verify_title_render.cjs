// TITLE 渲染验证: 无头跑 BOOT→TITLE, 比对 Cut 0x17 NT/调色板/精灵清空/菜单流转
// 用法: npx tsc -p tsconfig.play.json && node _verify_title_render.cjs
const path = require('path');
const OUT = path.join(__dirname, '_test_out');

const { Tsubasa2 } = require(path.join(OUT, 'core/Tsubasa2.js'));
const { NES_PALETTE } = require(path.join(OUT, 'game/data/ppu/pallete/nes-pallete-table.js'));
const {
  CUT_0x17_NT0, CUT_0x17_ATTR0, CUT_0x17_BG_PALETTE, CUT_0x17_SPR_PALETTE,
} = require(path.join(OUT, 'game/data/ppu/nametable/cut/cut_0x17_nt.js'));
const { SceneRoot, TitleMenu } = require(path.join(OUT, 'game/data/scene/index.js'));

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
function expectedTable(bg, spr) {
  const bg0 = toColor(bg[0] ?? 0x0f);
  const mk = (arr, start) => ({ colors: [bg0, toColor(arr[start + 1]), toColor(arr[start + 2]), toColor(arr[start + 3])] });
  return { bgPalettes: [mk(bg, 0), mk(bg, 4), mk(bg, 8), mk(bg, 12)], sprPalettes: [mk(spr, 0), mk(spr, 4), mk(spr, 8), mk(spr, 12)] };
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

// ── BOOT 播 5 秒 → START 跳过 → TITLE ──
for (let f = 0; f < 280; f++) game.stepFrame();
game.setButtons(8); game.stepFrame(); game.setButtons(0);
for (let f = 0; f < 10; f++) game.stepFrame();

ok(game.store.read('boot_root') === SceneRoot.TITLE, `BOOT→TITLE 流转 (root=${game.store.read('boot_root')})`);
ok(game.store.read('boot_title_cursor') === TitleMenu.KICKOFF, `TITLE 默认光标 = KICKOFF (got ${game.store.read('boot_title_cursor')})`);

{
  // ── NT0: 与 CUT_0x17_NT0 全量匹配 (tile 值 + bank=14) ──
  let ntMatch = true, nonZero = 0, badIdx = -1;
  const nt0 = game.store.nt0;
  for (let i = 0; i < 960; i++) {
    const x = i % 32, y = (i / 32) | 0;
    const e = nt0[y][x];
    const expect = CUT_0x17_NT0[i];
    if (expect !== 0) nonZero++;
    if (e.tile !== expect || (expect !== 0 && e.bank !== 14)) { ntMatch = false; badIdx = i; break; }
  }
  ok(ntMatch, `NT0 tile 值/位置/bank=14 与 CUT_0x17_NT0 全量匹配${ntMatch ? '' : ` (idx=${badIdx})`}`);
  ok(nonZero > 200, `TITLE 背景非零 tile > 200 (实际 ${nonZero})`);

  // 菜单文字抽查: 行 8 x=16-23 应为菜单文本区 (0x44 0x45 0x40 或类似)
  const row8 = [];
  for (let x = 0; x < 32; x++) row8.push(nt0[8][x].tile);
  const menuOk = row8.slice(12, 24).some(v => v >= 0x40 && v <= 0x4b);
  ok(menuOk, `标题菜单文本区存在 (行8 x=12-23: ${row8.slice(12, 24).map(v => v.toString(16)).join(',')})`);

  // ── 调色板: 全量 CUT_0x17 (无渐显) ──
  const exp = expectedTable(CUT_0x17_BG_PALETTE, CUT_0x17_SPR_PALETTE);
  ok(sameTable(game.store.paletteTable, exp, 'title'), 'TITLE 调色板 = CUT_0x17 全量值');

  // ── 精灵: BOOT 40 精灵已清空 (无泄漏) ──
  const active = game.store.sprites.filter(s => s.active).length;
  ok(active === 0, `TITLE 活跃精灵 = 0 (BOOT 无泄漏, 实际 ${active})`);

  // ── 合成帧有实际内容 ──
  const buf = game.captureFrame();
  let nonBlack = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nonBlack++;
  ok(nonBlack > 1000, `合成帧非黑像素 > 1000 (实际 ${nonBlack})`);
}

// ── TITLE: KICKOFF → START → STORY (当前 game 仍在 TITLE) ──
{
  game.setButtons(8); game.stepFrame(); game.setButtons(0); // START 确认 KICKOFF
  for (let f = 0; f < 30; f++) game.stepFrame();
  ok(game.store.read('boot_root') === SceneRoot.STORY, `TITLE KICKOFF→START→STORY (root=${game.store.read('boot_root')})`);
}

// ── 新实例: TITLE DOWN → CONTINUE → START → PASSWORD ──
{
  const g2 = new Tsubasa2(null, {});
  g2.prepare();
  for (let f = 0; f < 280; f++) g2.stepFrame();
  g2.setButtons(8); g2.stepFrame(); g2.setButtons(0);
  for (let f = 0; f < 10; f++) g2.stepFrame();
  ok(g2.store.read('boot_root') === SceneRoot.TITLE, `实例2 BOOT→TITLE (root=${g2.store.read('boot_root')})`);
  g2.setButtons(32); g2.stepFrame(); g2.setButtons(0); // DOWN
  for (let f = 0; f < 5; f++) g2.stepFrame();
  ok(g2.store.read('boot_title_cursor') === TitleMenu.CONTINUE, `TITLE DOWN → CONTINUE (got ${g2.store.read('boot_title_cursor')})`);
  g2.setButtons(8); g2.stepFrame(); g2.setButtons(0);
  for (let f = 0; f < 30; f++) g2.stepFrame();
  ok(g2.store.read('boot_root') === SceneRoot.PASSWORD, `TITLE CONTINUE→START→PASSWORD (root=${g2.store.read('boot_root')})`);
}

console.log(`\n结果: PASS=${pass} FAIL=${fail}`);
if (fails.length) console.log('失败项:', fails.join(' | '));
process.exit(fail > 0 ? 1 : 0);
