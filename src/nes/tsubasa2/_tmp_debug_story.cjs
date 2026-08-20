// 调试: STORY 阶段按键行为 (SELECT=4 vs A=1)
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
console.log('after BOOT→TITLE: root=' + root(store) + ' (' + SceneRoot[root(store)] + ')');
tap(boot, START, 200);   // TITLE KICKOFF → STORY
console.log('after TITLE→STORY: root=' + root(store) + ' (' + SceneRoot[root(store)] + ')');
// ram_00ED 检查
console.log('ram_00ED=' + store.read('ram_00ED'));

// 方案1: 空跑 240 帧看 bank18 是否自动 done
let changed = false;
for (let i = 0; i < 240; i++) { boot.update(0, 600 + i); if (root(store) !== SceneRoot.STORY) { changed = true; console.log('空跑自动切换 @' + (600 + i) + ' → root=' + root(store) + ' (' + SceneRoot[root(store)] + ')'); break; } }
if (!changed) console.log('空跑240帧仍在 STORY');

// 方案2: SELECT 跳过
tap(boot, SELECT, 900);
console.log('after tap(SELECT): root=' + root(store) + ' (' + SceneRoot[root(store)] + ')');
