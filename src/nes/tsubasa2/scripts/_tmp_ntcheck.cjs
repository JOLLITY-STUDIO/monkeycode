// 检查标题屏区间各 nametable 的 tile 活跃度, 确认内容在哪个 NT
const fs = require('fs');
const path = require('path');
const IN = path.join(__dirname, '..', 'output', 'emu-full');
for (const f of [3600, 3700, 3750, 3800, 3850, 3900, 3950, 4000, 4050, 4096]) {
  const dir = path.join(IN, 'frame-' + String(f).padStart(4, '0'));
  const nt = JSON.parse(fs.readFileSync(path.join(dir, 'nt.json'), 'utf8'));
  const st = JSON.parse(fs.readFileSync(path.join(dir, 'state.json'), 'utf8'));
  const counts = nt.map(n => {
    let nz = 0;
    for (let i = 0; i < 960; i++) if (n.tile[i] !== 0) nz++;
    return nz;
  });
  console.log('f' + f, 'nzPerNt=' + counts.join('/'), 'scroll=' + JSON.stringify(st.scroll));
}
