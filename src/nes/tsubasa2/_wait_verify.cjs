const fs = require('fs');
const start = Date.now();
function poll() {
  const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_verify_opening2.json';
  if (fs.existsSync(p)) {
    const st = fs.statSync(p);
    if (st.size > 100) {
      console.log(`DONE in ${((Date.now() - start) / 1000).toFixed(0)}s size=${st.size}`);
      return;
    }
  }
  if (Date.now() - start > 300000) { console.log('TIMEOUT'); return; }
  setTimeout(poll, 5000);
}
poll();
