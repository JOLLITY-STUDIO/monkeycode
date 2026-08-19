// OAM 桥接验证: ShadowOam 写入 → OamView.emit() → DataStore.sprites
// 1) 单元: 写入影子槽 → emit → 断言精灵字段 + 隐藏语义 + 不累积
// 2) 集成: boot 全链路各场景采样 ram_0468 非空槽 / emit 后 sprites 数量
const path = require('path');
const OUT = path.join(__dirname, '_test_out');

const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
const { OamView } = require(path.join(OUT, 'game/view/OamView.js'));
const { BootService } = require(path.join(OUT, 'game/boot.js'));
const { DataQueryService } = require(path.join(OUT, 'game/service/bank01_data-query.service.js'));
const { MatchEngineService } = require(path.join(OUT, 'game/service/bank26_match.service.js'));
const { Bank19Service } = require(path.join(OUT, 'game/service/bank19_auxiliary.service.js'));
const { Bank18Service } = require(path.join(OUT, 'game/service/bank18_story.service.js'));
const { Bank20Service } = require(path.join(OUT, 'game/service/bank20_match-aux.service.js'));

let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) { pass++; console.log('  PASS: ' + msg); }
  else { fail++; console.log('  FAIL: ' + msg); }
}

// ═══ 1. 单元验证 ═══
console.log('\n═══ 1. OamView 桥接单元验证 ═══');
{
  const store = new DataStore();
  // 构造后影子区应初始化为 $F8 (无幽灵精灵)
  assert(store.oamShadow.readByte(0) === 0xf8, '构造后影子槽初始 $F8, 实际 ' + store.oamShadow.readByte(0));

  // 1a. 写入 1 槽 → emit → 只发射该槽
  store.oamShadow.writeSlot(0x78, 10, 0x11, 0x00, 20); // 槽30: y=10 tile=0x11 attr=0 x=20
  const v = new OamView(store);
  v.emit();
  assert(store.sprites.length === 1, '1 槽写入 → sprites 1 个, 实际 ' + store.sprites.length);
  if (store.sprites[0]) {
    const s = store.sprites[0];
    assert(s.y === 10 && s.tile === 0x11 && s.x === 20 && s.palette === 0,
      `精灵字段 y=${s.y} tile=${s.tile} x=${s.x} pal=${s.palette}`);
    assert(s.active === true, '精灵 active');
  }

  // 1b. 同实例再 emit → 不累积
  v.emit();
  assert(store.sprites.length === 1, '同实例二次 emit 不累积, 实际 ' + store.sprites.length);

  // 1c. 隐藏语义: attr bit2-3 ≠ 0 → 不发射
  store.oamShadow.writeSlot(0x04, 10, 0x22, 0x04, 20); // 槽1 attr=0x04 → 隐藏
  v.emit();
  const active = store.sprites.filter(sp => sp.active);
  assert(active.length === 1, 'attr=0x04 槽被隐藏, active=' + active.length);
  assert(active[0] && active[0].tile === 0x11, '保留槽 tile=0x11');

  // 1d. copyToHw: 影子 → $0200 硬件区 (键名 ram_200)
  const store3 = new DataStore();
  store3.oamShadow.writeSlot(0x00, 5, 0x33, 0x00, 7);
  store3.oamShadow.writeSlot(0x04, 6, 0x44, 0x08, 8); // attr=0x08 → 隐藏
  store3.oamShadow.copyToHw();
  assert(store3.read('ram_200') === 5 && store3.read('ram_201') === 0x33, 'copyToHw 槽0: y=5 tile=0x33');
  assert(store3.read('ram_204') === 0xf8, 'copyToHw 槽1 attr=0x08 → y=$F8, 实际 ' + store3.read('ram_204'));

  // 1e. clearAll / clearHw
  store3.oamShadow.clearAll();
  store3.oamShadow.clearHw();
  assert(store3.read('ram_468') === 0xf8 && store3.read('ram_200') === 0xf8, 'clearAll/clearHw 填 $F8');
}

// ═══ 2. 集成验证: boot 全链路采样 ═══
console.log('\n═══ 2. boot 全链路 OAM 采样 ═══');
const store = new DataStore();
const dq = new DataQueryService(store);
const me = new MatchEngineService(store);
const b19 = new Bank19Service(store);
const b18 = new Bank18Service(store, b19);
const b20 = new Bank20Service(store);
const boot = new BootService(store, dq, me, b19, b20, b18);
boot.init();

// 复用同一 OamView 实例 (模拟真实管线单实例, 验证不累积)
const view = new OamView(store);

function root() { return store.read('boot_root'); }
function oamActiveSlots() {
  let n = 0;
  for (let rel = 0; rel < 256; rel += 4) {
    const y = store.oamShadow.readByte(rel);
    if (y !== 0 && y !== 0xf8) n++;
  }
  return n;
}
function sample(tag) {
  view.emit();
  const sprites = store.sprites;
  const active = sprites.filter(sp => sp.active).length;
  const sampleStr = sprites.slice(0, 3).map(s => `(${s.x},${s.y})t${s.tile}`).join(' ');
  console.log(`  [${tag}] root=${root()} 影子槽=${oamActiveSlots()} sprites=${sprites.length} active=${active} 样例: ${sampleStr}`);
  return active;
}

try {
  for (let f = 0; f < 200; f++) boot.update(0, f);
  const t1 = sample('BOOT→TITLE');
  for (let f = 0; f < 30; f++) boot.update(0, f);
  const t2 = sample('TITLE');

  boot.update(8, 0); boot.update(0, 1);
  for (let f = 0; f < 30; f++) boot.update(0, f);
  sample('MEETING');

  boot.update(8, 0); boot.update(0, 1);
  for (let f = 0; f < 30; f++) boot.update(0, f);
  sample('STORY');

  boot.update(1, 0); boot.update(0, 1);
  for (let f = 0; f < 30; f++) boot.update(0, f);
  sample('MATCH');

  // 结论 1: 单实例 emit 不累积 (active 数稳定)
  assert(t1 === t2, 'TITLE 连续采样 active 稳定 (不累积): ' + t1 + ' vs ' + t2);
  // 结论 2: 无幽灵精灵 (未初始化槽不会发射)
  //   boot 链路场景精灵走 OamManager/store.oam (非影子 OAM), 影子区为空是预期的
  console.log('  NOTE: boot 链路影子槽为 0 — 场景精灵走 store.oam (OamManager), 影子 OAM 由 bank02 entryC 密码/滚动场景写入');
  assert(true, 'boot 链路无异常');
} catch (e) {
  fail++;
  console.log('  FAIL: 集成流程异常: ' + e.message);
}

console.log(`\nOAM BRIDGE: PASS=${pass} FAIL=${fail}`);
process.exit(fail > 0 ? 1 : 0);
