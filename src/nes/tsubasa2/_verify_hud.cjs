// HUD 接入冒烟测试: initMatchHud + matchFrameTick 不崩溃 + VRAM→NT 提交
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
const { Bank24HudService } = require(path.join(OUT, 'game/service/bank24_hud.service.js'));

let pass = 0, fail = 0;
const fails = [];
function check(name, cond) {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; fails.push(name); console.log('  FAIL', name); }
}

const store = new DataStore();
const dq = new DataQueryService(store);
const me = new MatchEngineService(store);
const b19 = new Bank19Service(store);
const b18 = new Bank18Service(store, b19);
const b20 = new Bank20Service(store);
const b00 = new Bank00Service(store);
const b02 = new Bank02Service(store, b00);
const hud = new Bank24HudService(store);
const boot = new BootService(store, dq, me, b19, b20, b18, b02, undefined, hud);
boot.init();

console.log('[1] initMatchHud 状态初始化');
store.write('ram_0529', 2);
hud.initMatchHud();
check('ram_05EA == 2', store.read('ram_05EA') === 2);
check('ram_0532 bit7', (store.read('ram_0532') & 0x80) !== 0);
check('ram_0534 bit7', (store.read('ram_0534') & 0x80) !== 0);
check('ram_0536 bit7', (store.read('ram_0536') & 0x80) !== 0);

console.log('[2] matchFrameTick 逐帧驱动 (120帧)');
let threw = false;
try {
  for (let i = 0; i < 120; i++) {
    boot.update(0, i);          // 比赛协程推进 (MATCH 场景)
    hud.matchFrameTick();       // HUD 逐帧驱动
  }
} catch (e) {
  threw = true;
  console.log('  EXC:', e.message);
}
check('120 帧不抛异常', !threw);

console.log('[3] VRAM 缓冲构建 + NT 提交');
try {
  store.oam.beginVramBuild();
  store.oam.writeVramByte(0, 3);            // count=3
  store.oam.writeVramByte(1, 0x70);         // addrLo
  store.oam.writeVramByte(2, 0x22);         // addrHi = $2270 (NT0)
  store.oam.writeVramByte(3, 0x33);         // data: '0'
  store.oam.writeVramByte(4, 0x33);
  store.oam.writeVramByte(5, 0x33);
  store.oam.endVramBuild();
  store.oam.commitVramToNT();
  const e = store.readNT(0, 0x70 % 32, (0x70 / 32) | 0);
  check('NT0 $2270 tile == 0x33', e !== null && e.tile === 0x33);
  const e2 = store.readNT(0, (0x70 + 1) % 32, ((0x70 + 1) / 32) | 0);
  check('NT0 $2271 tile == 0x33', e2 !== null && e2.tile === 0x33);
} catch (e2) {
  fail++; fails.push('VRAM 提交异常');
  console.log('  EXC:', e2.message);
}

console.log('[4] 场景状态机 initMatchHud→matchHudTick 直接路径');
store.oam.reset();
try {
  hud.initMatchHud();
  for (let i = 0; i < 30; i++) hud.matchFrameTick();
  check('matchHudTick 30 帧不抛异常', true);
} catch (e3) {
  fail++; fails.push('matchHudTick 异常: ' + e3.message);
  console.log('  EXC:', e3.message);
}

console.log(`\n结果: PASS=${pass} FAIL=${fail}`);
if (fails.length) console.log('失败项:', fails.join(' | '));
process.exit(fail ? 1 : 0);
