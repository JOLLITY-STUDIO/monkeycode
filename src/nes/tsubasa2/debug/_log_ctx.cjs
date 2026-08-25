// _log_ctx.cjs — 查看 log 指定行上下文 + frame 范围 + $99F0 各次出现
const fs = require('fs');
const l = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8').split('\n');
console.log('--- context around line 70617 ---');
for (let i = 70610; i < 70625 && i < l.length; i++) console.log(String(i) + ': ' + JSON.stringify(l[i]));

console.log('--- first/last frame ---');
let firstF = null, lastF = null;
for (let i = 0; i < l.length; i++) {
  const m = /^f(\d+)/.exec(l[i]);
  if (m) {
    const f = +m[1];
    if (firstF === null) firstF = f;
    lastF = f;
  }
}
console.log('first frame:', firstF, 'last frame:', lastF);

console.log('--- all JSR $99F0 occurrences ---');
let cnt = 0;
for (let i = 0; i < l.length; i++) {
  if (l[i].includes('20 F0 99')) {
    let f = null;
    for (let k = i; k > i - 8 && k >= 0; k--) {
      const m = /^f(\d+)/.exec(l[k]);
      if (m) { f = +m[1]; break; }
    }
    let addr = null;
    for (let k = i - 1; k > i - 8 && k >= 0; k--) {
      const m = /\$0([0-9A-F]):([0-9A-F]{4}):/.exec(l[k]);
      if (m) { addr = '$0' + m[1] + ':' + m[2]; break; }
    }
    console.log('line', i, 'frame', f, 'addr', addr);
    cnt++;
    if (cnt > 12) break;
  }
}
