const s = require('fs').readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const lines = s.split('\n');
console.log('LINES:', lines.length);
// 找入口定义结构
const entryIdx = lines.findIndex(l => l.includes('OpeningFrameEntry') && l.includes('s:'));
console.log('entry interface line:', lines[entryIdx]);
// 找几个关键帧
for (const fr of [10, 282, 3110, 3733, 3783, 4200]) {
  const i = lines.findIndex(l => new RegExp(`f\\s*[:=]\\s*${fr}\\b`).test(l));
  if (i >= 0) {
    // 打印 s: { ... } 部分
    const seg = lines.slice(i, i + 14).join(' ');
    const m = seg.match(/s:\s*\{[^}]*\}/);
    console.log(`f${fr} @line${i}:`, m ? m[0] : 'NO s field', '| raw:', lines[i].trim().slice(0, 120));
  } else {
    console.log(`f${fr}: NOT FOUND`);
  }
}
