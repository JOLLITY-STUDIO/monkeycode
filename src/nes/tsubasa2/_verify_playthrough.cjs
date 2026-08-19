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
const { Bank00Service } = require(path.join(OUT, 'game/service/bank00/bank00_core.service.js'));
const { Bank02Service } = require(path.join(OUT, 'game/service/bank02_scene.service.js'));
const { SceneRoot } = require(path.join(OUT, 'game/data/scene/index.js'));
const { OamView } = require(path.join(OUT, 'game/view/OamView.js'));

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
const b00 = new Bank00Service(store);
const b02 = new Bank02Service(store, b00);
const boot = new BootService(store, dq, me, b19, b20, b18, b02);
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
  boot.update(btn, frame);       // 按下
  boot.update(0, frame + 1);     // 释放
  for (let i = 0; i < 118; i++) boot.update(0, frame + 2 + i); // 等 2 秒(120帧)给场景切换
}

// ── OAM 桥接采样 (OamView.emit → store.sprites) ──
// 复用同一 view 实例 (模拟真实管线单实例), 每个场景节点采样:
//   a. 二次 emit 不累积 (active/sprites 总数稳定)
//   b. 统计影子 OAM 活跃槽, 确认 boot 链路无幽灵精灵
const view = new OamView(store);
let oamSamples = 0;
function sampleOam(tag) {
  view.emit();
  const total1 = store.sprites.length;
  const active1 = store.sprites.filter(sp => sp.active).length;
  view.emit();
  const total2 = store.sprites.length;
  const active2 = store.sprites.filter(sp => sp.active).length;
  if (total1 !== total2 || active1 !== active2) {
    throw new Error(`[${tag}] OAM 二次 emit 累积: total ${total1}→${total2}, active ${active1}→${active2}`);
  }
  let shadowActive = 0;
  for (let rel = 0; rel < 256; rel += 4) {
    const y = store.oamShadow.readByte(rel);
    if (y !== 0 && y !== 0xf8) shadowActive++;
  }
  console.log(`  [OAM ${tag}] root=${root(store)} sprites=${total1} active=${active1} 影子槽=${shadowActive}`);
  oamSamples++;
}
try {
  // 1. BOOT 开场 → 等开场播 4-5秒(280帧) → START 跳过进 TITLE (真实 ROM: 开场动画需播放后才能跳)
  stage = 'BOOT→TITLE';
  for (let f = 0; f < 280; f++) boot.update(0, f);  // 等开场播 4-5 秒
  tap(START, 290);                                    // START 跳过开场
  if (root(store) !== SceneRoot.TITLE) throw new Error('expected TITLE after START, got ' + root(store));
  pass++;
  sampleOam('TITLE');

  // 2. TITLE: KICKOFF 默认光标 → 按 START → STORY(赛前剧情) (真实流程: KICKOFF→STORY→MEETING)
  stage = 'TITLE→STORY';
  tap(START, 200);
  if (root(store) !== SceneRoot.STORY) throw new Error('expected STORY, got ' + root(store));
  pass++;
  sampleOam('STORY');

  // 3. STORY → MEETING: A 跳过剧情 → 进赛前会议
  stage = 'STORY→MEETING';
  tap(A, 210);
  if (root(store) !== SceneRoot.MEETING) throw new Error('expected MEETING, got ' + root(store));
  pass++;
  sampleOam('MEETING');

  // 3b. MEETING: 按 START 进 STORY(比赛剧情) (FIXME: 真实会议菜单4分支待补, 当前简化)
  stage = 'MEETING→STORY';
  tap(START, 220); // START 跳会议 → STORY(赛前剧情)
  if (root(store) !== SceneRoot.STORY) throw new Error('expected STORY after MEETING, got ' + root(store));
  pass++;
  sampleOam('MEETING_STORY');

  // 4. STORY: 按 A 跳过 → MATCH
  stage = 'STORY→MATCH';
  tap(A, 230);
  if (root(store) !== SceneRoot.MATCH) throw new Error('expected MATCH, got ' + root(store));
  pass++;
  sampleOam('MATCH');

  // 5. MATCH: 驱动足够帧触发帧守卫 → RESULT
  stage = 'MATCH→RESULT';
  let reachedResult = false;
  for (let f = 0; f < 6000; f++) {
    boot.update(0, f);
    if (root(store) === SceneRoot.RESULT) { reachedResult = true; break; }
  }
  if (!reachedResult) throw new Error('MATCH did not reach RESULT within 6000 frames (root=' + root(store) + ')');
  pass++;
  sampleOam('RESULT');

  // 6. RESULT: 按 A → LEVELUP (每场打完升级, 不是回标题)
  stage = 'RESULT→LEVELUP';
  // 6. RESULT: 按 A → LEVELUP (每场打完升级, 不是回标题)
  stage = 'RESULT→LEVELUP';
  boot.update(0, 229);  // 空跑一帧让 RESULT 协程到 yield
  tap(A, 230);
  if (root(store) !== SceneRoot.LEVELUP) throw new Error('expected LEVELUP after RESULT, got ' + root(store));
  pass++;
  sampleOam('LEVELUP');

  // 6b. LEVELUP: 按 A → STORY (赛前剧情, 赢→下一场, 输→重打本场)
  stage = 'LEVELUP→STORY';
  tap(A, 232);
  if (root(store) !== SceneRoot.STORY) throw new Error('expected STORY after LEVELUP, got ' + root(store));
  pass++;
  sampleOam('LEVELUP_STORY');

  // 7. (独立分支) 重置回 TITLE 测 CONTINUE→PASSWORD 路径
  stage = 'TITLE→PASSWORD';
  boot.init();  // 重置回 BOOT
  // 等开场播完(SHOT_DURATION=300帧), 再空跑几帧让 TITLE gen 到 yield
  for (let f = 0; f < 320; f++) boot.update(0, f);
  if (root(store) !== SceneRoot.TITLE) throw new Error('expected TITLE after reset, got ' + root(store));
  // TITLE: DOWN → CONTINUE → START → PASSWORD
  boot.update(0, 330);  // 空跑让 TITLE gen 到 yield
  tap(32, 340);  // DOWN → CONTINUE
  tap(START, 350);  // START 确认 → 密码输入画面
  if (root(store) !== SceneRoot.PASSWORD) throw new Error('expected PASSWORD, got ' + root(store));
  pass++;
  // PasswordView 渲染: 静态假名网格 (PASSWORD_SPRITES) + 16 输入槽位 OAM 精灵 (2行×8列)
  // 真实 tile 映射 (passwordCharToTile): 数字 0-9 → $02-$0B, A-Z → $41-$5A
  {
    const { PasswordView } = require(path.join(OUT, 'game/view/PasswordView.js'));
    const pwView = new PasswordView(store);
    const pwState = boot.getPasswordDisplayState();
    if (!pwState) throw new Error('PASSWORD display state null');
    pwView.render(pwState);
    // a. 输入槽位精灵 (sprites 末尾 16 个, 对应 state.chars): 全部 tile 必须在真实映射集
    const slotSprites = store.sprites.slice(-pwState.charCount);
    let pwTiles = 0, badTiles = 0;
    for (const sp of slotSprites) {
      if (!sp.active) continue;
      pwTiles++;
      const ok = (sp.tile >= 0x02 && sp.tile <= 0x0b) || (sp.tile >= 0x41 && sp.tile <= 0x5a);
      if (!ok) badTiles++;
    }
    if (pwTiles < 16) throw new Error('PASSWORD 输入槽位精灵不足, tiles=' + pwTiles);
    if (badTiles > 0) throw new Error('PASSWORD 槽位存在占位 tile (非真实映射), bad=' + badTiles);
    // b. 背景写入: Cut 0x17 (bank02 entryF(0) → sceneLoad(0x17) → loadSceneNT) 应写入大量背景 tile
    let bgTiles = 0;
    for (let y = 0; y < store.nt0.length; y++) {
      for (let x = 0; x < 32; x++) {
        const t = store.nt0[y][x];
        if (t && t.tile !== 0) bgTiles++;
      }
    }
    if (bgTiles < 100) throw new Error('PASSWORD 背景 NT 未写入 (entryF 未生效), bgTiles=' + bgTiles);
    // c. 光标高亮: 槽位0 (光标位置, 输入槽精灵第一个) palette=1
    const cursorSprite = slotSprites[0];
    if (!cursorSprite || cursorSprite.palette !== 1) throw new Error('PASSWORD 光标 sprite palette 未高亮');
  }
  pass++;
  sampleOam('PASSWORD');

  // 8. PASSWORD → TITLE: 驱动有效密码 (前15槽=1, 末槽=15=校验和) → START 确认
  //    真实按钮位: A=1, RIGHT=128, DOWN=32, START=8 (BUTTON 枚举)
  stage = 'PASSWORD→TITLE';
  const PW_RIGHT = 128, PW_DOWN = 32;
  let f = 246;
  // 光标从槽0开始: 依次把槽0-14 设为1 (A 一次), 槽7 后 RIGHT 回绕槽0 → DOWN 到槽8
  for (let i = 0; i < 15; i++) {
    tap(A, f); f += 2;      // 当前槽 A → 值1
    if (i === 7) {
      tap(PW_RIGHT, f); f += 2; // 槽7 → 槽0 (列回绕)
      tap(PW_DOWN, f); f += 2;  // 槽0 → 槽8 (第二行)
    } else {
      tap(PW_RIGHT, f); f += 2; // 槽 i → 槽 i+1
    }
  }
  // 槽15: A 一次 → 1, 再 A×14 → 15 (占位校验和 = 前15值和 & 0x3F = 15)
  tap(A, f); f += 2;
  for (let i = 0; i < 14; i++) { tap(A, f); f += 2; }
  tap(START, f);
  // 真实流程: 密码成功 → STORY(续关剧情) → MEETING → MATCH
  if (root(store) !== SceneRoot.STORY) throw new Error('expected STORY after valid PASSWORD, got ' + root(store));
  pass++;
  sampleOam('PW_RETURN_STORY');

} catch (e) {
  fail++;
  fails.push('stage[' + stage + ']: ' + e.message);
}

console.log(`\nPASS=${pass} FAIL=${fail}`);
if (fail > 0) { console.log(fails.join('\n')); process.exit(1); }
if (oamSamples !== 10) { console.log('FAIL: OAM 采样点应为 10, 实际 ' + oamSamples); process.exit(1); }
console.log('PLAYTHROUGH LINK TEST PASSED (TITLE→STORY→MEETING→STORY→MATCH→RESULT→LEVELUP→STORY + TITLE→PASSWORD→STORY, OAM×10)');
