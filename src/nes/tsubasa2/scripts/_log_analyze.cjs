const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/tecmo/13.log','utf8').split('\n').filter(l => l.trim());

const records = lines.map(l => {
  const m = l.match(/f(\d+)\s+c(\d+)\s+i(\d+)/);
  const pcM = l.match(/\s\$([0-9a-fA-F]{2}):([0-9a-fA-F]{4})/);
  return m ? { f: +m[1], c: +m[2], i: +m[3], pc: pcM ? '$'+pcM[1]+':'+pcM[2].toUpperCase() : '?' } : null;
}).filter(Boolean);

const framesInLog = [...new Set(records.map(p => p.f))].sort((a,b)=>a-b);
console.log('Frames in 13.log:', framesInLog);

framesInLog.forEach(f => {
  const fa = records.filter(p => p.f === f);
  console.log(`  frame ${f}: instructions=${fa.length}  cycle ${fa[0].c}-${fa[fa.length-1].c}  first PC=${fa[0].pc}  last PC=${fa[fa.length-1].pc}`);
});

const cnt = {};
records.forEach(p => { cnt[p.pc] = (cnt[p.pc]||0)+1; });
const top = Object.entries(cnt).sort((a,b) => b[1]-a[1]).slice(0, 30);
console.log('\nTop 30 PCs by frequency:');
top.forEach(([pc, n]) => console.log(`  ${pc}: ${n}`));

const uniqueFrames = new Set(records.map(p => p.pc));
console.log('\nUnique PCs hit:', uniqueFrames.size);

// 帧间跳转 (找 frame 6 → frame 9 → 12 → 13 中 PC 的显著变化)
const fpList = framesInLog.map(f => {
  const fa = records.filter(p => p.f === f);
  return { f, startPC: fa[0].pc, endPC: fa[fa.length-1].pc, count: fa.length };
});
console.log('\nFrame PC start/end:');
fpList.forEach(o => console.log(`  frame ${o.f}: start=${o.startPC} end=${o.endPC}  count=${o.count}`));
