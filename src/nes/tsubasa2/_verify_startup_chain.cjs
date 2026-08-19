// 启动链验证: boot → 开场(Opening) → 标题(Title)
// 检查点:
//   1. init 后 root=BOOT, opening 显示状态 shot=LOGO
//   2. BOOT 期间 NT0 有 TECMO 模式块内容 (开场画面)
//   3. START/超时 → root=TITLE, title 显示状态 cursor=KICKOFF
//   4. TITLE 期间 Cut 0x17 标题背景 NT 已写入 (非全 0)
//   5. TITLE 光标移动 (DOWN) + START 确认返回
const path = require('path');
const OUT = path.join(__dirname, '_test_out');

const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
const { BootService } = require(path.join(OUT, 'game/boot.js'));
const { DataQueryService } = require(path.join(OUT, 'game/service/bank01_data-query.service.js'));
const { MatchEngineService } = require(path.join(OUT, 'game/service/bank26_match.service.js'));
const { Bank19Service } = require(path.join(OUT, 'game/service/bank19_auxiliary.service.js'));
const { Bank18Service } = require(path.join(OUT, 'game/service/bank18_story.service.js'));
const { Bank20Service } = require(path.join(OUT, 'game/service/bank20_match-aux.service.js'));
const { Bank00Service } = require(path.join(OUT, 'game/service/bank00/bank00_core.service.js'));
const { Bank02Service } = require(path.join(OUT, 'game/service/bank02_scene.service.js'));
const { SceneRoot, OpeningShot, TitleMenu } = require(path.join(OUT, 'game/data/scene/index.js'));

let pass = 0, fail = 0;
const fails = [];
const A = 1, START = 8, DOWN = 32;

function root(store) { return store.read('boot_root'); }
function shot(store) { return store.read('boot_shot'); }

// 统计 NT0 非零 tile
function ntNonZero(store) {
  let n = 0;
  for (let y = 0; y < store.nt0.length; y++) {
    for (let x = 0; x < 32; x++) {
      const t = store.nt0[y][x];
      if (t && t.tile !== 0) n++;
    }
  }
  return n;
}
function palNonBlack(store) {
  let n = 0;
  const all = [...store.paletteTable.bgPalettes, ...store.paletteTable.sprPalettes];
  for (const e of all) for (const c of e.colors) {
    if (c.r > 0 || c.g > 0 || c.b > 0) n++;
  }
  return n;
}
function check(name, ok, detail) {
  if (ok) { pass++; console.log(`  [PASS] ${name}${detail ? ' — ' + detail : ''}`); }
  else { fail++; fails.push(`${name}: ${detail}`); console.log(`  [FAIL] ${name} — ${detail}`); }
}

const store = new DataStore();
const dq = new DataQueryService(store);
const me = new MatchEngineService(store);
const b19 = new Bank19Service(store);
const b18 = new Bank18Service(store, b19);
const b20 = new Bank20Service(store);
const b00 = new Bank00Service(store);
const b02 = new Bank02Service(store, b00);
const boot = new BootService(store, dq, me, b19, b20, b18, b02);
boot.init();

// ── 1. init 后 root=BOOT ──
check('init 后 root=BOOT', root(store) === SceneRoot.BOOT, `root=${root(store)}`);
const opState0 = boot.getOpeningDisplayState();
check('opening 显示状态可用', opState0 !== null, opState0 ? `shot=${opState0.shot}` : 'null');
check('opening 初始 shot=LOGO', opState0 && opState0.shot === OpeningShot.LOGO, `shot=${opState0?.shot}`);

// ── 2. BOOT 期间驱动若干帧: 开场画面 NT 有内容 ──
for (let f = 0; f < 60; f++) boot.update(0, f);
const opState = boot.getOpeningDisplayState();
check('BOOT 60帧后仍在开场', root(store) === SceneRoot.BOOT, `root=${root(store)}`);
check('BOOT 60帧后 shotFrame>0', opState && opState.shotFrame > 0, `frame=${opState?.shotFrame}`);
const bootNT = ntNonZero(store);
check('BOOT 开场画面 NT0 有内容', bootNT > 0, `nonZero=${bootNT}`);

// ── 3. START 跳过 → TITLE ──
boot.update(START, 61);
boot.update(0, 62);
let rootAfter = root(store);
check('START 后 root=TITLE', rootAfter === SceneRoot.TITLE, `root=${rootAfter}`);
const titleState = boot.getTitleDisplayState();
check('title 显示状态可用', titleState !== null, titleState ? `cursor=${titleState.cursor}` : 'null');
check('title 初始 cursor=KICKOFF', titleState && titleState.cursor === TitleMenu.KICKOFF, `cursor=${titleState?.cursor}`);
const titleNT = ntNonZero(store);
check('TITLE 标题背景 NT0 有内容 (Cut 0x17)', titleNT > 100, `nonZero=${titleNT}`);
const pal = palNonBlack(store);
check('TITLE 调色板有非黑颜色', pal > 0, `colors=${pal}`);

// ── 4. TITLE 光标移动 + 确认 ──
boot.update(DOWN, 70);   // DOWN → CONTINUE
const titleState2 = boot.getTitleDisplayState();
check('DOWN 后 cursor=CONTINUE', titleState2 && titleState2.cursor === TitleMenu.CONTINUE, `cursor=${titleState2?.cursor}`);
boot.update(START, 71);
boot.update(0, 72);
const rootAfterStart = root(store);
check('TITLE 确认 CONTINUE → PASSWORD', rootAfterStart === SceneRoot.PASSWORD, `root=${rootAfterStart}`);

// ── 5. 超时路径: 重新 init 验证 BOOT 300 帧自动切 TITLE ──
const store2 = new DataStore();
const boot2 = new BootService(store2, new DataQueryService(store2), new MatchEngineService(store2),
  new Bank19Service(store2), new Bank20Service(store2), new Bank18Service(store2, new Bank19Service(store2)), new Bank02Service(store2, new Bank00Service(store2)));
boot2.init();
for (let f = 0; f < 320; f++) boot2.update(0, f);
check('BOOT 超时(320帧)自动切 TITLE', root(store2) === SceneRoot.TITLE, `root=${root(store2)}`);

console.log(`\nSTARTUP CHAIN PASS=${pass} FAIL=${fail}`);
if (fail > 0) { console.log(fails.join('\n')); process.exit(1); }
console.log('STARTUP CHAIN TEST PASSED (boot→opening→title)');
