const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/OpeningFrameTable.ts';
const s = fs.readFileSync(p, 'utf8');
// 简单解析：找到 OPENING_FRAMES 数组
const start = s.indexOf('export const OPENING_FRAMES');
const arrText = s.slice(start);
// 用 eval 不安全，这里只匹配 n:[...] 中包含 ni:1 的帧
const frames = [];
const frameRegex = /\{f:(\d+),c:\[[^\]]*\],p:[^,]*,o:\[[^\]]*\],n:\[([^\]]*)\]/g;
let m;
while ((m = frameRegex.exec(arrText)) !== null) {
  const f = parseInt(m[1]);
  const nText = m[2];
  if (nText.includes("ni:1")) {
    // 提取 ni:1 的行
    const rows = nText.match(/\{ni:1,r:\d+,d:\[[^\]]*\]\}/g) || [];
    const nonZero = rows.some(r => /d:\[[^\]]*[1-9a-fA-F][^\]]*\]/.test(r) && !/d:\[0(,0)*\]/.test(r));
    if (nonZero) frames.push(f);
  }
}
console.log('frames with non-zero NT1 data:', frames.slice(0, 30));
console.log('total:', frames.length);
