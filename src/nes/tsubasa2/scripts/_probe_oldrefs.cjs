/* 查找旧场景类名引用 */
const fs = require('fs');
const path = require('path');

const names = ['OpeningSceneController', 'TitleSceneController', 'PasswordSceneController', 'ResultSceneController', 'StorySceneController'];

function scan(dir, depth) {
  if (depth > 4) return [];
  const out = [];
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue;
    if (['node_modules', 'output', 'temp_out', 'rom-data', 'asm.rar', 'docs'].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...scan(full, depth + 1));
    else if (/\.(ts|js)$/.test(ent.name)) out.push(full);
  }
  return out;
}

const files = scan('.', 0);
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  for (const n of names) {
    if (content.includes(n)) {
      const lines = content.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(n)) {
          console.log(`${path.relative('', f)}:${i + 1}: ${lines[i].trim().slice(0, 110)}`);
        }
      }
    }
  }
}
console.log('DONE');
