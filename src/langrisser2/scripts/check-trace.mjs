import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/docs/execution-trace.md', 'utf8');
const terms = ['名前', 'エルウィン', 'C914', 'D49E', '名称入力', 'name input', 'CA00', 'CC30', '名前を決め'];
let found = 0;
for (const term of terms) {
  const idx = t.indexOf(term);
  if (idx >= 0) {
    console.log(`Found '${term}' at doc offset ${idx}`);
    console.log(t.substring(Math.max(0, idx - 80), idx + 140));
    console.log('---');
    found++;
  }
}
if (!found) console.log('No existing entries for name input screen found.');
