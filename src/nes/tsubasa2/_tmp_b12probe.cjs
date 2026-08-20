const fs = require('fs');
const path = require('path');
// 1. prg-bank-30 / bank30-data 是否存在及大小
for (const f of ['src/game/data/prg/prg-bank-30.ts', 'src/game/data/prg/bank30-data.ts', 'src/game/data/prg/audio/dmc-samples.ts']) {
  console.log(f, fs.existsSync(f) ? fs.statSync(f).size + 'B' : 'MISSING');
}
// 2. generate_wav.ts 现状
const g = 'generate_wav.ts';
if (fs.existsSync(g)) {
  const txt = fs.readFileSync(g, 'utf8');
  console.log('\ngenerate_wav.ts lines:', txt.split('\n').length);
  txt.split('\n').forEach((l, i) => {
    if (/DMC|4010|4012|4013|4015|ROM|readFile|PAPU|dmc/i.test(l)) console.log('  ' + (i + 1) + ': ' + l.trim().slice(0, 130));
  });
}
// 3. bank12 audio engine PRG 依赖
const root = 'src/game';
function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (f.endsWith('.ts')) out.push(p);
  }
  return out;
}
console.log('\n=== bank12 相关文件 ===');
walk(root).filter(f => /bank12/.test(f)).forEach(f => console.log(' ' + f));
console.log('\n=== bank12 service 中 PRG_BANK/DMC/采样 引用 ===');
for (const f of walk(root).filter(f => /bank12/.test(f))) {
  const txt = fs.readFileSync(f, 'utf8');
  const hits = txt.split('\n').filter(l => /PRG_BANK|DMC|4010|sampleAddr|_full\.s|rom-data/i.test(l));
  if (hits.length) { console.log(f + ' (' + hits.length + ')'); hits.slice(0, 10).forEach(h => console.log('  ' + h.trim().slice(0, 120))); }
}
// 4. asm/bank12 中 DMC 配置段 $869B-$86F2
const a12 = 'asm/bank12';
if (fs.existsSync(a12)) {
  console.log('\n=== asm/bank12 文件 ===');
  fs.readdirSync(a12).forEach(f => console.log(' ' + f));
}
