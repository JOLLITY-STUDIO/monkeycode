// 调试3: 逐帧追踪 ram_001C 与光标
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
const boot = new BootService(store, dq,
  new MatchEngineService(store),
  new Bank19Service(store),
  new Bank20Service(store),
  new Bank18Service(store, new Bank19Service(store)),
  new Bank02Service(store, new Bank00Service(store)));
boot.init();
for (let f = 0; f < 280; f++) boot.update(0, f);
tap(boot, START, 290);
tap(boot, START, 200);
tap(boot, SELECT, 210);
// 手动逐帧
function frame(btn, tag) {
  const r = boot.update(btn, 0);
  console.log(`${tag}: btn=0x${btn.toString(16)} root=${root(store)} cursor=${dq.getMeetingCursor()} ram_1C=0x${store.read('ram_001C').toString(16)} menuIndex=${dq.getMenuIndex()} active=${JSON.stringify(dq.getTeamDataDisplayState()).length}`);
}
frame(0, 'f218');
frame(0x20, 'f219 DOWN1');
frame(0, 'f220');
frame(0x20, 'f230 DOWN2');
frame(0, 'f231');
frame(0x20, 'f240 DOWN3');
frame(0, 'f241');
