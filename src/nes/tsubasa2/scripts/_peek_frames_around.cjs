const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
function extractFrame(f) {
  const marker = `{f:${f},`;
  const start = arr.indexOf(marker);
  if (start < 0) return null;
  let depth = 0;
  let end = start;
  for (let i = start; i < arr.length; i++) {
    if (arr[i] === '{') depth++;
    else if (arr[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  return arr.slice(start, end + 1);
}
for (let f = 3100; f <= 3110; f++) {
  const txt = extractFrame(f);
  if (!txt) { console.log('f', f, 'not found'); continue; }
  const nIdx = txt.indexOf(',n:');
  const aIdx = txt.indexOf(',a:');
  console.log(`=== f${f} n ===`);
  console.log(txt.slice(nIdx + 3, aIdx));
}
