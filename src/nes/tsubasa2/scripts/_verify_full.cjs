const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'output', 'emu-full');
// 帧目录数
const dirs = fs.readdirSync(out).filter((d) => /^frame-\d+$/.test(d));
console.log('frame dirs:', dirs.length);
// APU 产物
const apu = path.join(out, 'apu');
if (fs.existsSync(apu)) {
  for (const f of fs.readdirSync(apu)) {
    const st = fs.statSync(path.join(apu, f));
    console.log('apu/', f, (st.size / 1024).toFixed(1) + ' KB');
  }
  // summary.json 抽样
  const sum = JSON.parse(fs.readFileSync(path.join(apu, 'summary.json'), 'utf8'));
  console.log('summary frames:', sum.length, 'first:', JSON.stringify(sum[0]), 'last:', JSON.stringify(sum[sum.length - 1]));
} else {
  console.log('apu dir missing');
}
// 总大小
let total = 0;
const walk = (d) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else total += st.size;
  }
};
walk(out);
console.log('emu-full total size:', (total / 1048576).toFixed(1) + ' MB');
