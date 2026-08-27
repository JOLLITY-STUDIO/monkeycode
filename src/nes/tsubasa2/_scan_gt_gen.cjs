const fs = require('fs');
const files = [
  'scripts/_gen_opening_frame_table.cjs',
  'scripts/_gen_opening_data.cjs',
  'scripts/_extract_opening_all.cjs',
  'scripts/_opening_gt.cjs',
];
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('MISSING ' + f); continue; }
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' (' + c.split('\n').length + ' lines) ===');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (/scroll|regVT|regHT|regFV|regFH|regV|regH|cntVT|cntHT|cntV|cntH|s:/i.test(l)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 150));
    }
  });
}
