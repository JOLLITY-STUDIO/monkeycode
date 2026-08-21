// 最终残留核验: (1) 谁 import 已删的 prg-bank-19/20/21/31; (2) B19_SCENE_STREAM 长度; (3) bank18_story start() 调用
const fs = require('fs');
const path = require('path');

// (1) 扫描 import prg-bank-XX
console.log('=== import prg-bank-XX (全部) ===');
const root = 'src';
function walk(p) {
  for (const f of fs.readdirSync(p)) {
    const fp = path.join(p, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/\.ts$/.test(f)) {
      const c = fs.readFileSync(fp, 'utf8');
      c.split(/\r?\n/).forEach((l, i) => {
        const m = l.match(/import.*prg-bank-(\d+)/);
        if (m) console.log(fp + ':' + (i + 1) + ': bank' + m[1]);
      });
    }
  }
}
walk(root);

// (2) B19_SCENE_STREAM 长度
const fs2 = fs.readFileSync('src/game/prg/data/bank19-scene-stream.ts', 'utf8');
const m = fs2.match(/export const B19_SCENE_STREAM[^=]*= \[([\s\S]*?)\n\];/);
if (m) {
  const nums = m[1].match(/0x[0-9A-Fa-f]+/g) || [];
  console.log('=== B19_SCENE_STREAM len = ' + nums.length + ' ===');
  console.log('tail:', nums.slice(-8).join(' '));
}

// (3) bank18_story start() 调用
console.log('=== bank18_story start() 调用 ===');
const c18 = fs.readFileSync('src/game/prg/code/bank18_story.ts', 'utf8');
c18.split(/\r?\n/).forEach((l, i) => {
  if (/\.start\(/.test(l)) console.log('bank18_story.ts:' + (i + 1) + ': ' + l.trim());
});

// (4) prg-bank-XX 现存文件
console.log('=== data 目录 prg-bank 文件 ===');
const dataDir = 'src/game/prg/data';
for (const f of fs.readdirSync(dataDir)) {
  if (/^prg-bank-/.test(f)) console.log(f);
}
