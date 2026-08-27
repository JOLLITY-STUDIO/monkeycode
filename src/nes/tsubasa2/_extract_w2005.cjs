// 从 _trace_curtain3.log 提取每帧 vblank 期间 $2005 写入(细滚动)序列
const fs = require('fs');
const lines = fs.readFileSync('_trace_curtain3.log', 'utf8').split('\n');
const fw = {};
for (const l of lines) {
  const m = l.match(/^W2005 f=(\d+) scan=\d+ dot=\d+ val=\$(\w+) .* first=1/);
  if (m) {
    const f = +m[1];
    if (!fw[f]) fw[f] = [];
    fw[f].push(m[2]);
  }
}
for (let f = 3725; f <= 3790; f++) {
  if (fw[f]) console.log('f' + f, 'w2005=', fw[f].join(','));
}
