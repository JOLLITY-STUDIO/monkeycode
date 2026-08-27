const fs = require('fs');
const lines = fs.readFileSync('_trace_curtain3.log', 'utf8').split('\n');
for (const l of lines) {
  const m = l.match(/^W200[567] f=(\d+)/);
  if (m) {
    const f = parseInt(m[1]);
    if (f >= 3725 && f <= 3740) console.log(l);
  }
}
