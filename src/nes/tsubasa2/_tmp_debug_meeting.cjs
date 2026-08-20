// 调试2: MEETING 主菜单 DOWN 光标轨迹
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
const A = 1, START = 8, SELECT = 4;

function root(store) { return store.read('boot_root'); }
function tap(boot, btn, frame) {
  boot.update(btn, frame);
  boot.update(0, frame + 1);
  for (let i = 0; i < 118; i++) boot.update(0, frame + 2 + i);
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

for (let f = 0; f < 280; f++) boot.update(0, f);
tap(boot, START, 290);   // → TITLE
tap(boot, START, 200);   // → STORY
tap(boot, SELECT, 210);  // → MEETING
console.log('after SELECT: root=' + root(store) + ' active=' + (dq.getTeamDataDisplayState ? dq.getTeamDataDisplayState().menuLevel : '?') + ' cursor=' + dq.getMeetingCursor());

// 空跑一帧
boot.update(0, 218);
console.log('after frame218: cursor=' + dq.getMeetingCursor() + ' menuIndex=' + dq.getMenuIndex());

// 第一次 DOWN
boot.update(0x20, 219);
console.log('after DOWN#1: cursor=' + dq.getMeetingCursor() + ' ram_1C=' + store.read('ram_001C'));
boot.update(0, 220);
// 第二次 DOWN
boot.update(0x20, 230);
console.log('after DOWN#2: cursor=' + dq.getMeetingCursor());

// 打印 meeting 协程内部状态
console.log('teamDataState=', JSON.stringify(dq.getTeamDataDisplayState()));
