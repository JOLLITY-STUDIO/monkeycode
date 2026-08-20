const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank28_match.service.ts';
const t = fs.readFileSync(p, 'utf8').split(/\r?\n/);
console.log('total lines: ' + t.length);
// 查找残留简化/占位标记
const marks = ['简化', '占位', 'H5 空', 'no-op', '待其他', '写后暂无人读', 'TODO', '死循环', '统一做简化', '默认加 $8199'];
t.forEach((l, i) => {
  for (const m of marks) {
    if (l.includes(m)) {
      console.log('L' + (i + 1) + ' [' + m + ']: ' + l.trim().substring(0, 90));
      break;
    }
  }
});
// 方法列表
console.log('\nmethods:');
t.forEach((l, i) => {
  if (/^\s{2}(entry|dispatch|lookup|get|read|private|public|_)\w*\(/.test(l) || /^\s{2}entry\w*\(/.test(l)) {
    console.log('L' + (i + 1) + ': ' + l.trim().substring(0, 70));
  }
});
