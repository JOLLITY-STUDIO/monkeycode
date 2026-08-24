// probe: find stale AudioRom method references in audio-test.ts
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.ts$/.test(e.name)) yield p;
  }
}
const methods = ['readBgmPointer','readSePointer','readNoteDuration','readSongRequestId','readBgmData','readBank12Byte'];
for (const p of walk(ROOT)) {
  const text = fs.readFileSync(p, 'utf8');
  for (const m of methods) {
    if (text.includes(m)) {
      console.log(p + ' uses ' + m);
    }
  }
}
