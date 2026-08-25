// 提取 tsubasa1045.log 中 274-285 帧指令流，关注 PPU 写/场景切换
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa1045.log'), 'utf8').split('\n');

// 打印 270-285 每帧行数
const perFrame = new Map();
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  if (!m) continue;
  const f = parseInt(m[1]);
  if (f >= 270 && f <= 285) perFrame.set(f, (perFrame.get(f) || 0) + 1);
}
console.log('frame line counts 270-285:', [...perFrame.keys()].sort((a, b) => a - b).map(f => `${f}:${perFrame.get(f)}`).join(' '));

// 提取 f274-f276 全部行
let capturing = false;
let buf = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  const f = m ? parseInt(m[1]) : (capturing ? 275 : -1); // 无帧号延续
  if (m && f >= 274 && f <= 278) { capturing = true; }
  else if (m && f > 278) { capturing = false; }
  if (capturing) buf.push(l);
}
console.log('\n==== f274-f278 lines:', buf.length, '====');
// 过滤：只看 PPU 寄存器写、NT写、bank切换写
const filter = /STA \$200[0-7]|STA \$4014|LDA \$2002|STA \$8000|STA \$8001|STA \$800[0-7]|RTI|JMP|JSR/;
const hits = buf.filter(l => filter.test(l));
console.log('PPU/bank/jump hits:', hits.length);
console.log(hits.slice(0, 200).join('\n'));
