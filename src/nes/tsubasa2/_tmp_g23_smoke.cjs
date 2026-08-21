// G23 smoke: dispatch 场景路由 (STORY/PASSWORD/RESULT) 可运行性
// 编译 _test_out 后运行
const { Tsubasa2 } = require('./_test_out/game/Tsubasa2.js');
const { BUTTON } = require('./_test_out/core/types.js');

const t = new Tsubasa2(null, {});
t.prepare();

// 1. 初始场景应为 BOOT
console.log('1) 初始 currentScene =', t._dispatch.currentScene, '(期望 BOOT=0)');
if (t._dispatch.currentScene !== 0) throw new Error('初始场景非 BOOT');

// 2. 切到 PASSWORD → dispatch 应触发 handler.init (entryF(0))
t._dispatch.dispatch(2); // TaskIndex.PASSWORD
console.log('2) 切 PASSWORD → currentScene =', t._dispatch.currentScene, ', bank02 entryF(0) 已执行');
if (t._dispatch.currentScene !== 2) throw new Error('PASSWORD 切换失败');

// 3. PASSWORD 帧更新 (无按键 → 留在本场景)
const r3 = t._dispatch.update(0, 0);
console.log('3) PASSWORD update(0) → stateChanged =', r3, '(期望 false, 留在本场景)');
if (r3 !== false) throw new Error('PASSWORD 无按键不应切场景');

// 4. 切到 STORY → handler.init → bank18.enterChapter(0)
t._dispatch.dispatch(4); // TaskIndex.STORY
console.log('4) 切 STORY → currentScene =', t._dispatch.currentScene, ', bank18 chapter =', t._bank18.chapter);
if (t._dispatch.currentScene !== 4) throw new Error('STORY 切换失败');

// 5. 切到 RESULT
t._dispatch.dispatch(6); // TaskIndex.RESULT
console.log('5) 切 RESULT → currentScene =', t._dispatch.currentScene);
if (t._dispatch.currentScene !== 6) throw new Error('RESULT 切换失败');

// 6. RESULT A 确认 → 返回 BOOT
const r6 = t._dispatch.update(BUTTON.A, 0);
console.log('6) RESULT A 确认 → stateChanged =', r6, ', currentScene =', t._dispatch.currentScene, '(期望 true, 回 BOOT=0)');
if (r6 !== true || t._dispatch.currentScene !== 0) throw new Error('RESULT A 确认未回 BOOT');

console.log('\nG23 SMOKE PASS: dispatch 场景路由 STORY/PASSWORD/RESULT 全部可运行');
