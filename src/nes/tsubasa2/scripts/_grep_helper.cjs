const fs = require('fs');
const out = [];
const files = ['src/game/service/bank00/bank00_core.service.ts', 'src/game/service/bank00/scene_opening.controller.ts'];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8').split('\n');
  out.push('=== ' + f + ' ===');
  s.forEach((l, i) => {
    if (/\b9D27\b|\b9D50\b|\b9DEE\b|\b9D73\b|\b97AB\b|\b97AD\b|\b97B6\b|\b97B8\b|\b98EA\b|\b98E8\b|\b9C3A\b|\b9BE8\b|\b9C28\b|\b997A\b|\b99F0\b|\b9895\b|\b9C3C\b|\b9CD3\b|\b9CC9\b|\b9BE3\b|\b9BA0\b|\b9B7F\b|\b9B6F\b|\b9B74\b|\bAABF\b|\b9FA8\b/.test(l)) {
      out.push((i + 1) + ': ' + l.trim().slice(0, 130));
    }
  });
}
fs.writeFileSync('_grep_helper2.txt', out.join('\n'), 'utf8');
