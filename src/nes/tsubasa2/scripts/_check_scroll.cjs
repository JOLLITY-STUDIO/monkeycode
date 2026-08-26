const fs = require('fs');
for (const f of ['output/emu-full/frame-0001/state.json', 'output/emu-full/frame-0500/state.json', 'output/emu-full/frame-4100/state.json']) {
  try {
    const st = fs.statSync(f);
    const s = JSON.parse(fs.readFileSync(f, 'utf8'));
    console.log(f, 'mtime=' + st.mtime.toISOString(), 'scroll=' + (s.scroll ? 'YES' : 'NO'));
  } catch (e) {
    console.log(f, 'ERR', e.message);
  }
}
