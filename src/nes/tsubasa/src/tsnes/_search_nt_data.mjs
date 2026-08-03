import fs from 'fs';
import path from 'path';

const searchDir = 'game-engine/native-game/tsubasa/banks/prg';
const patterns = ['0x28', '0x29', '0x2C', '0x2D', '0x38', '0x37', '0x39', '0x3C', '0x3D'];

function walk(d, results) {
  const items = fs.readdirSync(d);
  for (const item of items) {
    const p = path.join(d, item);
    if (item.startsWith('.') || item === 'node_modules') continue;
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p, results);
    else if (stat.isFile() && p.endsWith('.ts')) results.push(p);
  }
}

const allFiles = [];
walk(searchDir, allFiles);

for (const f of allFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let hit = false;
  for (let i = 0; i < lines.length; i++) {
    let matchCount = 0;
    for (const p of patterns) {
      if (lines[i].includes(p)) matchCount++;
    }
    if (matchCount >= 3) {
      hit = true;
      console.log(`\n${f}:${i+1}`);
      console.log(`  ${lines[i].trim().substring(0, 200)}`);
    }
  }
  if (!hit) {
    // check if any single pattern matches
    for (let i = 0; i < lines.length; i++) {
      for (const p of patterns) {
        if (lines[i].includes(p)) {
          console.log(`\nSINGLE ${f}:${i+1} [${p}]`);
          console.log(`  ${lines[i].trim().substring(0, 200)}`);
          break;
        }
      }
    }
  }
}
