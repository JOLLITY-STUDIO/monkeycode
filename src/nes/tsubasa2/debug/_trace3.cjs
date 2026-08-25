// 从 380 逐帧 log 提取 scene3 场景表解析 + 初始指针
const fs = require('fs');
const path = require('path');
const LOG = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo', 'tsubasa-when-show380-逐帧.log');
const txt = fs.readFileSync(LOG, 'utf8');
const lines = txt.split(/\r?\n/);

// 逐行重组: 每指令 3 行 (fNNN c... / iNNN... / A:...)
const insns = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\[?(f\d+)\]?\s+c\d+\s+i\d+\s+(.*)$/);
  if (m) insns.push({ frame: m[1], text: m[2] });
}

function show(pred, label, limit = 80) {
  console.log(`\n===== ${label} =====`);
  let n = 0;
  for (const ins of insns) {
    if (pred(ins)) {
      console.log(`[${ins.frame}] ${ins.text}`);
      if (++n >= limit) break;
    }
  }
  console.log(`(shown ${n})`);
}

show(i => /8464|8AEC|8AED|8AEE/.test(i.text), '$8464 场景表解析', 40);
show(i => /9FAE/.test(i.text) && /ED/.test(i.text), '$9FAE LDA $ED', 20);
show(i => /STA \$4D|STA \$4E|STA \$56/.test(i.text), 'STA $4D/$4E/$56', 40);
show(i => /9085|9145|91BF|9A7E|90E6|90F0/.test(i.text), '动画引擎关键点', 60);
show(i => /STA \$ED/.test(i.text), 'STA $ED', 30);
