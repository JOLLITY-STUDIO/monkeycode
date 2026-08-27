const fs = require('fs');
const lines = fs.readFileSync('_trace_curtain2.log', 'utf8').split('\n');
const frameStart = {};
for (const line of lines) {
  const m = line.match(/^R f=(\d+) scan=(\d+) cnt=(\d+)\/(\d+)\/(\d+) rv=(\d+)\/(\d+)/);
  if (!m) continue;
  const f = parseInt(m[1], 10);
  const scan = parseInt(m[2], 10);
  if (scan === 0) {
    frameStart[f] = { cntV: +m[3], cntVT: +m[4], cntFV: +m[5], regV: +m[6], regVT: +m[7] };
  }
}
for (let f = 3725; f <= 3785; f++) {
  if (frameStart[f]) {
    const s = frameStart[f];
    console.log(`f${f} start cnt=${s.cntV}/${s.cntVT}/${s.cntFV} reg=${s.regV}/${s.regVT}`);
  }
}
