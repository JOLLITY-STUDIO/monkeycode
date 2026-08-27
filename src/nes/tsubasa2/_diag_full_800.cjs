// 全面比较 emu frame-0800 与 H5 frame 800 的 NT、attr、palette、CHR slot
const fs = require('fs');
const path = require('path');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const EMU_DIR = 'output/emu-full/frame-0800';

function loadJson(f) { return JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')); }

function compareNtAttr(h5Nt, emuNtArr) {
  const diffs = [];
  for (const e of emuNtArr) {
    const ni = e.idx;
    const h = h5Nt[ni];
    if (!h) { diffs.push(`nt${ni} missing in H5`); continue; }
    for (let i = 0; i < 960; i++) {
      if ((e.tile[i] & 0xff) !== (h.tile[i] & 0xff)) diffs.push(`nt${ni}.tile[${i}]=${h.tile[i]} e=${e.tile[i]}`);
    }
    for (let i = 0; i < 64; i++) {
      const ea = e.attrib ? (e.attrib[i] & 0xff) : 0;
      const ha = h.attrib ? (h.attrib[i] & 0xff) : 0;
      if (ea !== ha) diffs.push(`nt${ni}.attr[${i}]=${ha} e=${ea}`);
    }
  }
  return diffs;
}

// build H5 state at h5Frame 790 (NES 800)
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

for (let h5 = 0; h5 <= 790; h5++) game.frame(runtime);

const emuState = loadJson(path.join(EMU_DIR, 'state.json'));
const emuNtArr = loadJson(path.join(EMU_DIR, 'nt.json'));
const emuPal = loadJson(path.join(EMU_DIR, 'palette.json'));
const h5Nt = runtime.ppu.nameTable.map(nt => ({ tile: nt.tile.slice(), attrib: nt.attrib.slice() }));

const out = [];
out.push('=== state ===');
out.push('bgTable=' + emuState.bgTable + ' h5 regS=' + runtime.ppu.regS);
out.push('spTable=' + emuState.spTable + ' h5 regS=' + runtime.ppu.regS);
out.push('nTblAddress=' + emuState.nTblAddress + ' h5 ntable1=' + runtime.ppu.ntable1);

out.push('\n=== CHR slot diff ===');
out.push('h5 chrSlots: ' + JSON.stringify(runtime.chrSlots));
out.push('emu chrBanks: ' + JSON.stringify(emuState.chrBanks));
for (let i = 0; i < 8; i++) {
  if (runtime.chrSlots[i] !== emuState.chrBanks[i]) out.push('slot' + i + ' h=' + runtime.chrSlots[i] + ' e=' + emuState.chrBanks[i]);
}

out.push('\n=== palette diff ===');
const h5Bg = Array.from(runtime.ppu.paletteBg || []).slice(0, 16);
const h5Spr = Array.from(runtime.ppu.paletteSpr || []).slice(0, 16);
const emuBg = Array.from(emuPal.bg || []).slice(0, 16);
const emuSpr = Array.from(emuPal.sp || emuPal.spr || []).slice(0, 16);
out.push('h5 bg: ' + JSON.stringify(h5Bg));
out.push('emu bg: ' + JSON.stringify(emuBg));
out.push('h5 spr: ' + JSON.stringify(h5Spr));
out.push('emu spr: ' + JSON.stringify(emuSpr));
for (let i = 0; i < 16; i++) {
  if (h5Bg[i] !== emuBg[i]) out.push('bg[' + i + '] h=' + h5Bg[i] + ' e=' + emuBg[i]);
  if (h5Spr[i] !== emuSpr[i]) out.push('spr[' + i + '] h=' + h5Spr[i] + ' e=' + emuSpr[i]);
}

out.push('\n=== NT/attr diff ===');
const diffs = compareNtAttr(h5Nt, emuNtArr);
out.push('total diffs: ' + diffs.length);

const rowDiff = new Map();
for (const d of diffs) {
  const m = d.match(/nt(\d)\.(tile|attr)\[(\d+)\]/);
  if (!m) { out.push(d); continue; }
  const key = `${m[1]}_${m[2]}_${Math.floor(parseInt(m[3]) / 32)}`;
  rowDiff.set(key, (rowDiff.get(key) || 0) + 1);
}
const sorted = [...rowDiff.entries()].sort((a, b) => b[1] - a[1]);
out.push('top rows: ' + JSON.stringify(sorted.slice(0, 40)));
out.push(diffs.slice(0, 120).join('\n'));

fs.writeFileSync('_diag_full_800_out.txt', out.join('\n'), 'utf8');
console.log('done, total diffs:', diffs.length);
