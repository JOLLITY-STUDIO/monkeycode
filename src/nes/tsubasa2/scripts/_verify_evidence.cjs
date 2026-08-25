/**
 * _verify_evidence.cjs — 硬验证:抽样比对 emu vs h5 NT/Pal/OAM 的实际字节
 *
 * 不通过抽象层,直接读 JSON 文件对比,看数字是不是真的
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EMU  = path.join(ROOT, 'output', 'emu-reference');
const H5   = path.join(ROOT, 'output', 'ppu-trace');

function loadJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; } }

const FRAMES = [30, 90, 150, 300];

console.log('═══════════════════════════════════════════════════════════════════');
console.log('HARD EVIDENCE CHECK — 直接字节抽样对比');
console.log('═══════════════════════════════════════════════════════════════════\n');

for (const f of FRAMES) {
  console.log(`── frame ${f} ────────────────────────────────────────────`);

  // 1) NT0 tile[0..7] (Row 0 前 8 个 tile)
  console.log('  NT0 Row0 前 8 tile 列:');
  const en = loadJson(path.join(EMU, `frame-${String(f).padStart(3,'0')}`, 'nt.json'));
  const hn = loadJson(path.join(H5,  `frame-${String(f).padStart(3,'0')}`, 'nt0.json'));
  if (en && hn) {
    const eu = en['0'].tile.slice(0, 8);
    const hu = hn.tiles.slice(0, 8);
    let same = 0;
    eu.forEach((v, i) => { const eq = v === hu[i]; if (eq) same++; console.log(`    col=${i}  emu=${v.toString(16).padStart(2,'0')}  h5=${hu[i].toString(16).padStart(2,'0')}  ${eq?'✓':'✗'}`); });
    console.log(`  → same=${same}/8`);
  } else console.log('  → MISSING NT');

  // 2) Palette BG[0..7] (前 8 个 BG 色)
  console.log('  Palette BG[0..7]:');
  const ep = loadJson(path.join(EMU, `frame-${String(f).padStart(3,'0')}`, 'palette.json'));
  const hp = loadJson(path.join(H5,  `frame-${String(f).padStart(3,'0')}`, 'palette.json'));
  if (ep && hp) {
    const ebg = ep.bg.slice(0, 8);
    const hbg = hp.bg.slice(0, 8);
    let same = 0;
    ebg.forEach((v, i) => { const eq = v === hbg[i]; if (eq) same++; console.log(`    i=${i}  emu=$${v.toString(16).padStart(2,'0')}  h5=$${hbg[i].toString(16).padStart(2,'0')}  ${eq?'✓':'✗'}`); });
    console.log(`  → same=${same}/8`);
  } else console.log('  → MISSING Palette');

  // 3) OAM 前 8 sprite (y,tile,attr,x)
  console.log('  OAM[0..7]:');
  const eo = loadJson(path.join(EMU, `frame-${String(f).padStart(3,'0')}`, 'oam.json'));
  const ho = loadJson(path.join(H5,  `frame-${String(f).padStart(3,'0')}`, 'oam.json'));
  if (eo && ho) {
    let allSame = 0, partialSame = 0;
    for (let i = 0; i < 8; i++) {
      const a = eo[i], b = ho[i];
      const f1 = (a.y===b.y&&a.tile===b.tile&&a.attr===b.attr&&a.x===b.x);
      const f2 = (a.tile===b.tile&&a.attr===b.attr);
      if (f1) allSame++;
      if (f2) partialSame++;
      console.log(`    s${i}: emu y=${a.y} t=$${(a.tile||0).toString(16).padStart(2,'0')} a=$${(a.attr||0).toString(16).padStart(2,'0')} x=${a.x} | h5 y=${b.y} t=$${(b.tile||0).toString(16).padStart(2,'0')} a=$${(b.attr||0).toString(16).padStart(2,'0')} x=${b.x}  ${f1?'FULLY':(f2?'tile/attr':'✗')}`);
    }
    console.log(`  → fully=${allSame}/8, tile+attr=${partialSame}/8`);
  } else console.log('  → MISSING OAM');

  // 4) state.json (emu 端应有,H5 端应缺)
  const es = loadJson(path.join(EMU, `frame-${String(f).padStart(3,'0')}`, 'state.json'));
  const hs = loadJson(path.join(H5,  `frame-${String(f).padStart(3,'0')}`, 'state.json'));
  console.log(`  state.json: emu=${es?'✓':'✗'} h5=${hs?'✓':'✗'}`);
  if (es) console.log(`    emu.chrBanks=${JSON.stringify(es.chrBanks)}  pc=$${es.pc.toString(16)}`);

  console.log('');
}
