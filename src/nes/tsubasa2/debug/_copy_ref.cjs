const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const dst = path.join(root, 'output/h5-vs-ref');
fs.mkdirSync(dst, { recursive: true });
// 把 reference 的 screen.png 拷贝过来并改名
for (const f of [60, 120, 180]) {
  const src = path.join(root, `output/emu-reference/frame-${String(f).padStart(3,'0')}/screen.png`);
  const dstn = path.join(dst, `ref-f${String(f).padStart(3,'0')}.png`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dstn);
    console.log('copied', src, '→', dstn);
  }
}
// 同时把 oam/nt/palette json 拷一份
for (const f of [60, 120, 180]) {
  const dir = path.join(root, `output/emu-reference/frame-${String(f).padStart(3,'0')}`);
  const tgt = path.join(dst, `ref-data-f${String(f).padStart(3,'0')}`);
  fs.mkdirSync(tgt, { recursive: true });
  for (const name of ['palette.json', 'nt.json', 'state.json', 'oam.json']) {
    const sp = path.join(dir, name);
    if (fs.existsSync(sp)) {
      fs.copyFileSync(sp, path.join(tgt, name));
      console.log('copied', name);
    }
  }
}
console.log('done.');
console.log(fs.readdirSync(dst).join('\n'));
