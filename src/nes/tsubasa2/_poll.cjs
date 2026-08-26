const fs = require('fs');
const start = Date.now();
function poll() {
  const log = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_build_cjs.log';
  const exists = fs.existsSync(log);
  const size = exists ? fs.statSync(log).size : 0;
  console.log(`t=${((Date.now() - start) / 1000).toFixed(0)}s exists=${exists} size=${size}`);
  if (exists && size > 0) {
    console.log(fs.readFileSync(log, 'utf8').slice(0, 1500));
    return;
  }
  if (Date.now() - start > 120000) { console.log('TIMEOUT'); return; }
  setTimeout(poll, 3000);
}
poll();
