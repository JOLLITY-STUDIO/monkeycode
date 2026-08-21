const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'core', 'nes-ram.ts');
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// 找 ShadowOam 与 OamManager 类
for (const cls of ['export class ShadowOam', 'export class OamManager']) {
  const idx = lines.findIndex((l) => l.includes(cls));
  if (idx >= 0) {
    console.log('=== ' + cls + ' @ line ' + (idx + 1) + ' ===');
    for (let i = idx; i < Math.min(idx + 90, lines.length); i++) {
      console.log(lines[i]);
    }
    console.log('...\n');
  }
}
