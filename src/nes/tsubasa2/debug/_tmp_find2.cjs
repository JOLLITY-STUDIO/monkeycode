// 调查: bank9/10 RAW 数据结构 + rdMemByte 限制 + sub9085 消费逻辑
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';

function walk(d, ext) {
  let files = [];
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    const s = fs.statSync(p);
    if (s.isDirectory()) files = files.concat(walk(p, ext));
    else if (ext.test(f)) files.push(p);
  }
  return files;
}

// 1. bank09-raw.ts / bank10-raw.ts 结构
for (const f of ['src/game/prg/data/scene/bank09-raw.ts', 'src/game/prg/data/scene/bank10-raw.ts']) {
  const c = fs.readFileSync(path.join(root, f), 'utf8');
  const lines = c.split('\n');
  console.log('=== ' + f + ' (' + lines.length + ' lines) ===');
  lines.slice(0, 30).forEach((l, i) => console.log((i + 1) + ': ' + l));
  const m = c.match(/export const \w+/g);
  console.log('exports:', m);
  console.log('---');
}

// 2. 全库谁引用 bank09-raw / bank10-raw / BANK9_SCENE_PTR_TABLE
for (const f of walk('src/game', /\.ts$/)) {
  const c = fs.readFileSync(f, 'utf8');
  for (const key of ['bank09-raw', 'bank10-raw', 'BANK9_SCENE_PTR_TABLE', 'BANK10_SCENE_PTR_TABLE', 'BANK9_RAW', 'BANK10_RAW', 'scene-loader-tables']) {
    if (c.includes(key)) {
      const lines = c.split('\n');
      lines.forEach((l, i) => { if (l.includes(key)) console.log(f + ':' + (i + 1) + ': ' + l.trim()); });
    }
  }
}
console.log('--- DONE ---');
