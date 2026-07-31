const fs = require('fs');
const path = require('path');

function findFiles(dir, exts) {
  const results = [];
  const list = fs.readdirSync(dir);
  for (const name of list) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (!name.startsWith('.') && name !== 'node_modules') {
        results.push(...findFiles(full, exts));
      }
    } else if (exts.some(e => name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

// Get exports from bank-30-data.ts
const df = 'game-engine/native-game/tsubasa/banks/prg/bank-30-data.ts';
const dc = fs.readFileSync(df, 'utf-8');
const regex = /export\s+const\s+([\w$]+)/gm;
const names = [];
let m;
while ((m = regex.exec(dc)) !== null) names.push(m[1]);

// Find all .ts files in game-engine/ and src/
const allFiles = [...findFiles('game-engine', ['.ts']), ...findFiles('src', ['.ts'])];
allFiles.sort();

// Check each name
for (const n of names) {
  const refs = [];
  for (const f of allFiles) {
    if (f.includes('-data.ts')) continue;
    const c = fs.readFileSync(f, 'utf-8');
    if (c.includes(n)) refs.push(f);
  }
  console.log(`${n}: ${refs.length ? refs.join(', ') : 'UNUSED'}`);
}
