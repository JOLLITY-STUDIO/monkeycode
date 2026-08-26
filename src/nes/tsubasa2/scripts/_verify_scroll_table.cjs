// 临时校验: OpeningFrameTable.ts 的 s{cv,ch,cvt,cht} vs emu-full state.json scroll.cnt*
// 用法: node scripts/_verify_scroll_table.cjs
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// 1. 解析 OpeningFrameTable.ts (每个 entry 是单行大对象, 按行解析)
const src = fs.readFileSync(path.join(ROOT, 'src/game/prg/data/scene/OpeningFrameTable.ts'), 'utf8');
const table = [];
for (const line of src.split('\n')) {
  const m = /^\s*\{f:(\d+),/.exec(line);
  if (!m) continue;
  const f = parseInt(m[1], 10);
  const sRe = /s:\{([^}]*)\}/.exec(line);
  if (!sRe) continue;
  const kv = { f };
  for (const pair of sRe[1].split(',')) {
    const [k, v] = pair.split(':');
    kv[k.trim()] = parseInt(v, 10);
  }
  table.push(kv);
}
console.log('GT frames parsed:', table.length);

// 2. 对比 emu state.json
const emuDir = path.join(ROOT, 'output/emu-full');
let mismatch = 0, checked = 0, missing = 0;
const fields = [['cv', 'cntV'], ['ch', 'cntH'], ['cvt', 'cntVT'], ['cht', 'cntHT']];
const bad = [];
for (const fr of table) {
  const p = path.join(emuDir, 'frame-' + String(fr.f).padStart(4, '0'), 'state.json');
  if (!fs.existsSync(p)) { missing++; continue; }
  const sc = JSON.parse(fs.readFileSync(p, 'utf8')).scroll || {};
  checked++;
  for (const [gtKey, emuKey] of fields) {
    const gtV = fr[gtKey];
    const emuV = sc[emuKey];
    if (emuV === undefined) continue;
    if (gtV !== emuV) {
      mismatch++;
      if (bad.length < 30) bad.push(`f${fr.f} ${gtKey}=${gtV} emu.${emuKey}=${emuV}`);
    }
  }
}
console.log(`checked=${checked} missing=${missing} mismatch=${mismatch}`);
bad.forEach(b => console.log('  MISMATCH', b));
// 3. 标题动画滚动区间抽查 (emu 实测 cntVT 15->29)
for (const f of [3728, 3733, 3735, 3743, 3751, 3759, 3767, 3775, 3783]) {
  const fr = table.find(x => x.f === f);
  const p = path.join(emuDir, 'frame-' + String(f).padStart(4, '0'), 'state.json');
  const sc = fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, 'utf8')).scroll || {}) : null;
  console.log(`f${f} GT.cvt=${fr ? fr.cvt : '-'} GT.cv=${fr ? fr.cv : '-'} | emu.cntVT=${sc ? sc.cntVT : '-'} emu.cntV=${sc ? sc.cntV : '-'}`);
}
