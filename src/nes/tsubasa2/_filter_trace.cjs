const fs = require('fs');
const lines = fs.readFileSync('_trace_nt_corruption_out.txt', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (/f=372[6-9]|f=373[0-3]/.test(l) && /r21=/.test(l)) console.log(i + ': ' + l);
});
