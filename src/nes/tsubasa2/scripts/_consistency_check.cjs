/**
 * _consistency_check.cjs — H5 vs TS-NES 一致性全量比对
 *
 * 输出:
 *   1. 行为一致性: state.json 字段比对 (pc / chrBanks / prgBankMap / bgTable / spTable)
 *   2. 数据一致性: PT / NT / OAM / Palette / Screen / CHR-by-scanline
 *
 * 容错: H5 端 palette 用 {bg,spr} 二段式; NT 分 nt0/1/2/3.json; emu 单 nt.json + {0,1,2,3}
 *
 * 用法: node scripts/_consistency_check.cjs
 * 输出: output/emu-reference/consistency-report.txt
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EMU  = path.join(ROOT, 'output', 'emu-reference');
const H5   = path.join(ROOT, 'output', 'ppu-trace');

const FRAMES = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];

// ── PNG 解码 (8-bit RGBA) ──
function decodePng(buf) {
  if (buf[0] !== 0x89 || buf[1] !== 0x50) throw new Error('not a PNG');
  let off = 8, width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idatChunks = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off); off += 4;
    const type = buf.slice(off, off + 4).toString('ascii'); off += 4;
    const data = buf.slice(off, off + len); off += len + 4;
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === 'IDAT') idatChunks.push(data);
    else if (type === 'IEND') break;
  }
  if (bitDepth !== 8 || colorType !== 6) throw new Error(`unsupported PNG ${bitDepth}/${colorType}`);
  const zlib = require('zlib');
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const rowSize = width * 4;
  const out = Buffer.alloc(rowSize * height);
  let prev = Buffer.alloc(rowSize);
  let rp = 0, wp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    const line = Buffer.alloc(rowSize);
    raw.copy(line, 0, rp, rp + rowSize);
    rp += rowSize;
    if (filter === 0) line.copy(out, wp);
    else if (filter === 1) for (let x = 0; x < rowSize; x++) { const left = x >= 4 ? out[wp + x - 4] : 0; out[wp + x] = (line[x] + left) & 0xff; }
    else if (filter === 2) for (let x = 0; x < rowSize; x++) out[wp + x] = (line[x] + prev[x]) & 0xff;
    else if (filter === 3) for (let x = 0; x < rowSize; x++) { const left = x >= 4 ? out[wp + x - 4] : 0; out[wp + x] = (line[x] + ((left + prev[x]) >>> 1)) & 0xff; }
    else if (filter === 4) {
      for (let x = 0; x < rowSize; x++) {
        const a = x >= 4 ? out[wp + x - 4] : 0;
        const b = prev[x];
        const c = x >= 4 ? prev[x - 4] : 0;
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        const paeth = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        out[wp + x] = (line[x] + paeth) & 0xff;
      }
    }
    prev = out.slice(wp, wp + rowSize);
    wp += rowSize;
  }
  return { width, height, data: out };
}
function decodePngOrNull(p) { try { return decodePng(fs.readFileSync(p)); } catch (_) { return null; } }
function compareRgba(a, b) {
  const px = Math.min(a.data.length, b.data.length) / 4 | 0;
  let same = 0;
  for (let i = 0; i < px; i++) if (a.data[i*4]===b.data[i*4] && a.data[i*4+1]===b.data[i*4+1] && a.data[i*4+2]===b.data[i*4+2] && a.data[i*4+3]===b.data[i*4+3]) same++;
  return { same, total: px, ratio: px ? same/px : 0 };
}

// ── 容错 JSON 读取 ──
function readJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_) { return null; } }

// ── Palette 适配: H5 {bg,spr}, emu {bg,spr} ──
function loadPalette(dir, isH5) {
  const raw = readJson(path.join(dir, 'palette.json'));
  if (!raw) return null;
  let bg = [], sp = [];
  if (isH5) {
    bg = Array.isArray(raw.bg) ? raw.bg : [];
    sp = Array.isArray(raw.spr) ? raw.spr : [];
  } else {
    // emu 可能有两种: {bg,sp} 或 {bg:[],spr:[]}
    bg = Array.isArray(raw.bg) ? raw.bg : (Array.isArray(raw.b) ? raw.b : []);
    sp = Array.isArray(raw.spr) ? raw.spr : (Array.isArray(raw.sp) ? raw.sp : []);
  }
  return { bg, sp };
}

// ── NT 适配: emu 单 nt.json{0,1,2,3:{tile,attr}}, H5 分 nt0/1/2/3.json{tiles,attr} ──
function loadNt(dir, isH5) {
  if (isH5) {
    const out = {};
    for (let i = 0; i < 4; i++) {
      const n = readJson(path.join(dir, `nt${i}.json`));
      if (n) out[i] = { tile: n.tiles || n.tile || [], attr: n.attr || n.attrs || [] };
    }
    return out;
  }
  return readJson(path.join(dir, 'nt.json'));
}

// ── OAM: emu=[64×{y,tile,attr,x}], H5=[64×{idx,y,tile,attr,x}] ──
function loadOam(dir, isH5) {
  const raw = readJson(path.join(dir, 'oam.json'));
  if (!raw) return null;
  if (!isH5) return raw;
  // H5 含 idx → 转 [y,tile,attr,x] 形式
  return raw.map((s) => ({ y: s.y, tile: s.tile, attr: s.attr, x: s.x }));
}

// ── state: emu {frame,pc,nTblAddress,bgTable,spTable,chrBanks,prgBankMap} ──
function loadState(dir, isH5) {
  const raw = readJson(path.join(dir, isH5 ? 'state.json' : 'state.json'));
  return raw;
}

const lines = [];
const L = (s) => { lines.push(s); console.log(s); };

L('═══════════════════════════════════════════════════════════════════');
L('CONSISTENCY CHECK  H5 (output/ppu-trace)  vs  TS-NES (output/emu-reference)');
L('═══════════════════════════════════════════════════════════════════');
L('');

const accum = { behavior: { frames: 0, okBehavior: 0 }, data: { PT: 0, NT: 0, OAM: 0, Pal: 0, Scr: 0 } };

for (const f of FRAMES) {
  const emuDir = path.join(EMU, `frame-${String(f).padStart(3, '0')}`);
  const h5Dir  = path.join(H5,  `frame-${String(f).padStart(3, '0')}`);
  if (!fs.existsSync(emuDir) || !fs.existsSync(h5Dir)) { L(`── frame ${f}  (missing dir, skip)`); continue; }
  L(`── frame ${f}  ──────────────────────────────────────────────────────`);

  // ─── 1. BEHAVIOR (state.json) ───
  const emuState = loadState(emuDir, false);
  const h5State  = loadState(h5Dir, true);
  if (emuState && h5State) {
    accum.behavior.frames++;
    const banksMatch = JSON.stringify(emuState.chrBanks) === JSON.stringify(h5State.chrBanks);
    const prgMatch   = JSON.stringify(emuState.prgBankMap || {}) === JSON.stringify(h5State.prgBankMap || {});
    const pcMatch    = emuState.pc === h5State.pc;
    const tablesMatch = emuState.bgTable === h5State.bgTable && emuState.spTable === h5State.spTable;
    const allOk = banksMatch && prgMatch && tablesMatch;
    L(`  [BEHAVIOR]  chrBanks: ${banksMatch?'✓':'✗'}  prgBankMap: ${prgMatch?'✓':'✗'}  bgTable/spTable: ${tablesMatch?'✓':'✗'}  PC: ${pcMatch?'✓':'✗'}`);
    if (allOk) accum.behavior.okBehavior++;
    if (!banksMatch) L(`    chrBanks diff: emu=${JSON.stringify(emuState.chrBanks)} h5=${JSON.stringify(h5State.chrBanks)}`);
    if (!prgMatch)   L(`    prg diff: emu=${JSON.stringify(emuState.prgBankMap)} h5=${JSON.stringify(h5State.prgBankMap)}`);
  } else {
    L(`  [BEHAVIOR]  emuState=${!!emuState} h5State=${!!h5State}  skip`);
  }

  // ─── 2. DATA: PT ───
  try {
    const emuPt = readJson(path.join(emuDir, 'pt.json'));
    const h5Pt  = readJson(path.join(h5Dir,  'pt.json'));
    let ptSame = 0;
    for (let i = 0; i < 512; i++) {
      const a = emuPt[i], b = h5Pt[i];
      if (!a || !b) continue;
      let ok = true;
      for (let k = 0; k < 8; k++) {
        if (a.plane0[k] !== b.plane0[k] || a.plane1[k] !== b.plane1[k]) { ok = false; break; }
      }
      if (ok) ptSame++;
    }
    accum.data.PT += ptSame;
    L(`  [PT(512)]   same=${ptSame}/512 (${(ptSame/512*100).toFixed(1)}%)`);
  } catch (e) { L(`  [PT]        error: ${e.message}`); }

  // ─── 3. DATA: NT (适配两格式) ───
  try {
    const emuNt = loadNt(emuDir, false);
    const h5Nt  = loadNt(h5Dir, true);
    let ntSame = 0, ntTotal = 0;
    for (let i = 0; i < 4; i++) {
      const e = emuNt && emuNt[i]; const h = h5Nt && h5Nt[i];
      if (!e || !h) continue;
      const n = Math.min(e.tile.length, h.tile.length);
      for (let k = 0; k < n; k++) { if (e.tile[k] === h.tile[k]) ntSame++; ntTotal++; }
    }
    accum.data.NT += ntSame;
    L(`  [NT(4×1024)] same=${ntSame}/${ntTotal} (${(ntTotal?ntSame/ntTotal*100:0).toFixed(1)}%)`);
  } catch (e) { L(`  [NT]        error: ${e.message}`); }

  // ─── 4. DATA: OAM ───
  try {
    const eOam = loadOam(emuDir, false);
    const hOam = loadOam(h5Dir, true);
    let oamSame = 0, oamTotal = Math.min(eOam.length, hOam.length);
    for (let i = 0; i < oamTotal; i++) {
      if (eOam[i].y===hOam[i].y && eOam[i].tile===hOam[i].tile && eOam[i].attr===hOam[i].attr && eOam[i].x===hOam[i].x) oamSame++;
    }
    accum.data.OAM += oamSame;
    L(`  [OAM(64)]   same=${oamSame}/64 (${(oamSame/64*100).toFixed(1)}%)`);
  } catch (e) { L(`  [OAM]       error: ${e.message}`); }

  // ─── 5. DATA: Palette ───
  try {
    const ePal = loadPalette(emuDir, false);
    const hPal = loadPalette(h5Dir, true);
    if (ePal && hPal) {
      const eBg = ePal.bg.slice(0, 16), hBg = hPal.bg.slice(0, 16);
      const eSp = ePal.sp.slice(0, 16), hSp = hPal.sp.slice(0, 16);
      let palSame = 0;
      for (let i = 0; i < 16; i++) { if (eBg[i] === hBg[i]) palSame++; if (eSp[i] === hSp[i]) palSame++; }
      accum.data.Pal += palSame;
      L(`  [Pal(32)]   same=${palSame}/32 (${(palSame/32*100).toFixed(1)}%)`);
    } else L(`  [Pal]       emu=${!!ePal} h5=${!!hPal} skip`);
  } catch (e) { L(`  [Pal]       error: ${e.message}`); }

  // ─── 6. DATA: Screen PNG ───
  try {
    const eScr = decodePng(fs.readFileSync(path.join(emuDir, 'screen.png')));
    const hScr = decodePng(fs.readFileSync(path.join(h5Dir,  'screen.png')));
    const c = compareRgba(eScr, hScr);
    accum.data.Scr += c.same;
    L(`  [Screen(256×240)] same=${c.same}/${c.total} (${(c.ratio*100).toFixed(1)}%)`);
  } catch (e) { L(`  [Screen]    error: ${e.message}`); }

  // ─── 7. CHR-by-scanline 对比 ───
  try {
    const eSw = readJson(path.join(emuDir, 'chr-switches.json'));
    const hSw = readJson(path.join(h5Dir,  'chr-switches.json'));
    if (eSw && hSw) {
      const emuMap = new Map(eSw.bankMapByScanline.map(s => [s.scanline, s.banks]));
      const h5Map  = new Map(hSw.bankMapByScanline.map(s  => [s.scanline, s.banks]));
      const emuScans = Array.from(emuMap.keys()).sort((a,b)=>a-b);
      let match = 0, miss = 0;
      L(`  [CHR-by-scanline] (emu=${emuScans.length} sheets, h5=${h5Map.size} sheets)`);
      for (const sc of emuScans) {
        const eBanks = emuMap.get(sc);
        // 寻找最近 scan
        let h5Scan = sc, bestDist = Infinity;
        if (!h5Map.has(h5Scan)) for (const s of h5Map.keys()) { const d = Math.abs(s-sc); if (d<bestDist) { bestDist=d; h5Scan=s; } }
        const hBanks = h5Map.get(h5Scan) || [];
        const banksSame = eBanks.join(',') === hBanks.join(',');
        const euPng = decodePngOrNull(path.join(emuDir, `pt-sheet-scan${String(sc).padStart(3,'0')}.png`));
        const h5Png = decodePngOrNull(path.join(h5Dir,  `pt-sheet-scan${String(h5Scan).padStart(3,'0')}.png`));
        let pixSame = '-';
        if (euPng && h5Png) { const c = compareRgba(euPng, h5Png); pixSame = (c.ratio*100).toFixed(1)+'%'; if (c.ratio>0.99) match++; else miss++; } else miss++;
        L(`    sc=${String(sc).padStart(3,' ')} emu=[${eBanks.join(',')}]  h5-sc${String(h5Scan).padStart(3,' ')}=[${hBanks.join(',')}]  banks=${banksSame?'✓':'✗'}  pt-pix=${pixSame}`);
      }
      L(`  [CHR-by-scanline] match=${match}, miss=${miss}`);
    }
  } catch (e) { L(`  [CHR-by-scanline] error: ${e.message}`); }

  L('');
}

// ── 汇总 ──
L('═══════════════════════════════════════════════════════════════════');
L('SUMMARY');
L('═══════════════════════════════════════════════════════════════════');
const framesChecked = accum.behavior.frames;
L(`[BEHAVIOR] ok = ${accum.behavior.okBehavior}/${framesChecked} (${(framesChecked?accum.behavior.okBehavior/framesChecked*100:0).toFixed(1)}%)`);
const totals = { PT: framesChecked*512, NT: accum.data.NT /* approx */, OAM: framesChecked*64, Pal: framesChecked*32, Scr: framesChecked*61440 };
L(`[DATA]     PT=${accum.data.PT}/${totals.PT}  OAM=${accum.data.OAM}/${totals.OAM}  Pal=${accum.data.Pal}/${totals.Pal}  Scr=${accum.data.Scr}/${totals.Scr}`);
L('');

const outPath = path.join(EMU, 'consistency-report.txt');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(`\n[consistency-check] report: ${outPath}`);
