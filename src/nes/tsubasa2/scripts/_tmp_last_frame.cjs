const fs = require('fs');
const path = require('path');
const dir = 'output/emu-full';
let last = 0;
let lastT = 0;
let errCount = 0;
for (const d of fs.readdirSync(dir)) {
  const m = d.match(/frame-(\d{4})/);
  if (!m) continue;
  const f = parseInt(m[1]);
  const sf = path.join(dir, d, 'state.json');
  try {
    const st = fs.statSync(sf);
    if (st.mtimeMs > lastT) {
      lastT = st.mtimeMs;
      last = f;
    }
  } catch (e) {
    errCount++;
  }
}
console.log('last frame', last, 'mtime', new Date(lastT).toISOString(), 'missing', errCount);
