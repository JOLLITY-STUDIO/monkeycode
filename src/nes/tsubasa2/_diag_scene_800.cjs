// H5 nes=800 场景状态诊断
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

for (let h5 = 0; h5 <= 790; h5++) game.frame(runtime);

const out = [];
out.push('=== H5 nes=800 场景状态 ===');
// 找 store/sceneId
const store = game.store || null;
if (store) {
  out.push('store keys: ' + Object.keys(store).join(','));
  try { out.push('sceneId: ' + store.sceneId); } catch (e) { out.push('sceneId: <err>'); }
  try { out.push('scene: ' + JSON.stringify(store.scene)); } catch (e) { out.push('scene: <err>'); }
  try { out.push('ram 001B: ' + store.readByte(0x001b)); } catch (e) {}
  try { out.push('ram 0628: ' + store.readByte(0x0628)); } catch (e) {}
  try { out.push('ram 0044: ' + store.readByte(0x0044)); } catch (e) {}
  try { out.push('ram 0009: ' + store.readByte(0x0009)); } catch (e) {}
  try { out.push('ram 0079: ' + store.readByte(0x0079)); } catch (e) {}
  try { out.push('ram 007B-008C: ' + Array.from({length:18},(_,i)=>store.readByte(0x007b+i)).join(',')); } catch (e) {}
} else {
  out.push('no store found');
}
// 从 game 对象找
out.push('game keys: ' + Object.keys(game).join(','));
for (const k of Object.keys(game)) {
  const v = game[k];
  if (v && typeof v === 'object' && v.sceneId !== undefined) {
    out.push(k + '.sceneId = ' + v.sceneId);
  }
}

fs.writeFileSync('_diag_scene_800_out.txt', out.join('\n'), 'utf8');
console.log('done');
