// 玩链路集成测试: TITLE→MEETING→STORY→MATCH→RESULT→TITLE
// 验证 boot 场景路由完整流转不抛错
const path = require('path');
const OUT = path.join(__dirname, '_test_out');

const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
const { BootService } = require(path.join(OUT, 'game/boot.js'));
const { DataQueryService } = require(path.join(OUT, 'game/service/bank01_data-query.service.js'));
const { MatchEngineService } = require(path.join(OUT, 'game/service/bank26_match.service.js'));
const { Bank19Service } = require(path.join(OUT, 'game/service/bank19_auxiliary.service.js'));
const { Bank18Service } = require(path.join(OUT, 'game/service/bank18_story.service.js'));
const { Bank20Service } = require(path.join(OUT, 'game/service/bank20_match-aux.service.js'));
const { SceneRoot } = require(path.join(OUT, 'game/data/scene/index.js'));

let pass = 0, fail = 0;
const fails = [];
const A = 1, START = 8; // BUTTON.A = 1<<0, BUTTON.START = 1<<3

function root(store) { return store.read('boot_root'); }

// 构造完整依赖
const store = new DataStore();
const dq = new DataQueryService(store);
const me = new MatchEngineService(store);
const b19 = new Bank19Service(store);
const b18 = new Bank18Service(store, b19);
const b20 = new Bank20Service(store);
const boot = new BootService(store, dq, me, b19, b20, b18);
boot.init();

// 帧驱动辅助: 按住某键 N 帧 (或单帧按下)
function press(btn, frames = 1, betweenFrames = 0) {
  for (let i = 0; i < frames; i++) {
    boot.update(btn, i);
  }
}

let stage = 'init';
// 按键辅助: 按一下键 (含释放帧, 让边沿检测正确触发)
function tap(btn, frame) {
  boot.update(btn, frame);
  boot.update(0, frame + 1); // 释放帧
}
try {
  // 1. BOOT 开场 → 自动进 TITLE (SHOT_DURATION 120 帧)
  stage = 'BOOT→TITLE';
  for (let f = 0; f < 200; f++) boot.update(0, f);
  if (root(store) !== SceneRoot.TITLE) throw new Error('expected TITLE, got ' + root(store));
  pass++;

  // 2. TITLE: KICKOFF 默认光标 → 按 START 进 MEETING (TitleSceneController 仅响应 START)
  stage = 'TITLE→MEETING';
  tap(START, 200);
  if (root(store) !== SceneRoot.MEETING) throw new Error('expected MEETING, got ' + root(store));
  pass++;

  // 3. MEETING: 按 START 进 STORY
  stage = 'MEETING→STORY';
  tap(START, 210);
  if (root(store) !== SceneRoot.STORY) throw new Error('expected STORY, got ' + root(store));
  pass++;

  // 4. STORY: 按 A 跳过 → MATCH
  stage = 'STORY→MATCH';
  tap(A, 220);
  if (root(store) !== SceneRoot.MATCH) throw new Error('expected MATCH, got ' + root(store));
  pass++;

  // 5. MATCH: 驱动足够帧触发帧守卫 → RESULT
  stage = 'MATCH→RESULT';
  let reachedResult = false;
  for (let f = 0; f < 6000; f++) {
    boot.update(0, f);
    if (root(store) === SceneRoot.RESULT) { reachedResult = true; break; }
  }
  if (!reachedResult) throw new Error('MATCH did not reach RESULT within 6000 frames (root=' + root(store) + ')');
  pass++;

  // 6. RESULT: 按 A → TITLE
  stage = 'RESULT→TITLE';
  tap(A, 230);
  if (root(store) !== SceneRoot.TITLE) throw new Error('expected TITLE after RESULT, got ' + root(store));
  pass++;

} catch (e) {
  fail++;
  fails.push('stage[' + stage + ']: ' + e.message);
}

console.log(`\nPASS=${pass} FAIL=${fail}`);
if (fail > 0) { console.log(fails.join('\n')); process.exit(1); }
console.log('PLAYTHROUGH LINK TEST PASSED (TITLE→MEETING→STORY→MATCH→RESULT→TITLE)');
