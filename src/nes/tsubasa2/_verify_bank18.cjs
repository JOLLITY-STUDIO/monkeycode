// Bank18 STORY 路由集成验证 (轻量 smoke test, 非逐指令差分)
// 验证: Bank18.enterChapter → Bank19.start → 多帧 update 不抛错且能结束
const path = require('path');
const fs = require('fs');
const OUT = path.join(__dirname, '_test_out');

const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
const { Bank19Service } = require(path.join(OUT, 'game/service/bank19_auxiliary.service.js'));
const { Bank18Service, StoryChapter } = require(path.join(OUT, 'game/service/bank18_story.service.js'));
const PRG_BANK_19 = require(path.join(OUT, 'game/data/prg-bank-19.js')).default;

let pass = 0, fail = 0;
const fails = [];

// 直接驱动 Bank19 数据流 (不经过 Bank18) 作为基准
function driveBank19(chapter) {
  const store = new DataStore();
  const b19 = new Bank19Service(store);
  const b18 = new Bank18Service(store, b19);
  b18.enterChapter(chapter);
  if (!b18.isActive) { fail++; fails.push('chapter ' + chapter + ': not active after enter'); return; }
  let frames = 0;
  let ended = false;
  while (frames < 200000) {
    const done = b18.update(0);
    frames++;
    if (done) { ended = true; break; }
    // 防止无限 (某些数据流可能不自然结束, 但 Bank19 有 _sceneResetWait 终止)
  }
  if (!ended) { fail++; fails.push('chapter ' + chapter + ': did not end within 200000 frames (frames=' + frames + ')'); return; }
  pass++;
  console.log('  chapter ' + chapter + ': ended after ' + frames + ' frames');
}

// 用 Bank19 内置数据流起点 + 几个偏移测试
[StoryChapter.OPENING, StoryChapter.CHAPTER_1, StoryChapter.CHAPTER_2, StoryChapter.CHAPTER_3, StoryChapter.CONTINUE].forEach(c => {
  try { driveBank19(c); } catch (e) { fail++; fails.push('chapter ' + c + ' threw: ' + e.message); }
});

console.log(`\nPASS=${pass} FAIL=${fail}`);
if (fail > 0) { console.log(fails.slice(0, 10).join('\n')); process.exit(1); }
console.log('BANK18 STORY ROUTE SMOKE TEST PASSED');
