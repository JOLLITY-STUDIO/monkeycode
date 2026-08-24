/**
 * _emu_diff.cjs — 对比 H5 转写版本 (output/ppu-trace/) 和 TS 模拟器基线
 *                 (output/emu-reference/) 在同一帧的 PT/NT/OAM/Palette 差异
 *
 * 目标：定位 H5 路径的 CHR 写入/数据源/Mapper 切换等差异，输出 report
 *
 * 差异维度：
 *   1. PT tile byte 完全相同数 / 512
 *   2. NT tile idx 完全相同数 / (4*32*32)
 *   3. OAM y/tile/attr/x 字节完全相同数 / 256
 *   4. Palette idx 完全相同数 / 32
 *   5. screen.png 像素完全相同数 / (256*240)
 *   6. PT plane0/plane1 按 bank 拆开看（非空 tile 数 + 全 0 字节数）
 *
 * 用法：cd scripts && node _emu_diff.cjs
 *   → output/emu-reference/diff-report.txt
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const EMU  = path.join(ROOT, 'output', 'emu-reference');
const H5   = path.join(ROOT, 'output', 'ppu-trace');

const FRAMES = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];

// ── PNG 解码器（只支持 8-bit RGBA）──
function decodePng(buf) {
  if (buf[0] !== 0x89 || buf[1] !== 0x50) throw new Error('not a PNG');
  let off = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idatChunks = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off); off += 4;
    const type = buf.slice(off, off + 4).toString('ascii'); off += 4;
    const data = buf.slice(off, off + len); off += len + 4;
    if (type === 'IHDR') {
      width  = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') break;
  }
  if (bitDepth !== 8 || colorType !== 6) {
    throw new Error(`unsupported PNG bitDepth=${bitDepth} colorType=${colorType}`);
  }
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
    // Apply filter
    if (filter === 0) {
      line.copy(out, wp);
    } else if (filter === 1) {
      for (let x = 0; x < rowSize; x++) {
        const left = x >= 4 ? out[wp + x - 4] : 0;
        out[wp + x] = (line[x] + left) & 0xff;
      }
    } else if (filter === 2) {
      for (let x = 0; x < rowSize; x++) {
        out[wp + x] = (line[x] + prev[x]) & 0xff;
      }
    } else if (filter === 3) {
      for (let x = 0; x < rowSize; x++) {
        const left = x >= 4 ? out[wp + x - 4] : 0;
        out[wp + x] = (line[x] + ((left + prev[x]) >>> 1)) & 0xff;
      }
    } else if (filter === 4) {
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

function compareBytes(a, b, label) {
  const n = Math.min(a.length, b.length);
  let same = 0;
  for (let i = 0; i < n; i++) if (a[i] === b[i]) same++;
  return { label, same, total: n, diff: n - same, ratio: n ? same / n : 0 };
}

function compareRgba(a, b) {
  const px = Math.min(a.data.length, b.data.length) / 4 | 0;
  let same = 0;
  for (let i = 0; i < px; i++) {
    if (a.data[i*4]   === b.data[i*4]   &&
        a.data[i*4+1] === b.data[i*4+1] &&
        a.data[i*4+2] === b.data[i*4+2] &&
        a.data[i*4+3] === b.data[i*4+3]) same++;
  }
  return { same, total: px, diff: px - same, ratio: px ? same / px : 0 };
}

const lines = [];
lines.push('═══════════════════════════════════════════════════════════════════');
lines.push('EMU-DIFF  H5 (output/ppu-trace)  vs  TS-NES (output/emu-reference)');
lines.push('═══════════════════════════════════════════════════════════════════');
lines.push('');

const summary = [];

for (const f of FRAMES) {
  const emuDir = path.join(EMU, `frame-${String(f).padStart(3, '0')}`);
  const h5Dir  = path.join(H5,  `frame-${String(f).padStart(3, '0')}`);
  if (!fs.existsSync(emuDir) || !fs.existsSync(h5Dir)) {
    lines.push(`── frame ${f}  (missing dir, skip)`);
    continue;
  }
  lines.push(`── frame ${f}  ──────────────────────────────────────────────────────`);

  // 1) PT plane0/plane1
  try {
    const emuPt = JSON.parse(fs.readFileSync(path.join(emuDir, 'pt.json'), 'utf8'));
    const h5Pt  = JSON.parse(fs.readFileSync(path.join(h5Dir,  'pt.json'), 'utf8'));
    let ptSame = 0, ptEmpty = 0, ptTotal = 512;
    for (let i = 0; i < 512; i++) {
      const a = emuPt[i], b = h5Pt[i];
      if (!a || !b) continue;
      let tileSame = true;
      let empty = true;
      for (let k = 0; k < 8; k++) {
        if (a.plane0[k] !== b.plane0[k] || a.plane1[k] !== b.plane1[k]) tileSame = false;
        if (a.plane0[k] !== 0 || a.plane1[k] !== 0) empty = false;
      }
      if (tileSame) ptSame++;
      if (empty) ptEmpty++;
    }
    lines.push(`  PT(512 tiles):  same=${ptSame}/${ptTotal}  (${(ptSame/ptTotal*100).toFixed(1)}%)  emu-empty=${ptEmpty}`);
    summary.push({ frame: f, metric: 'PT tile', same: ptSame, total: ptTotal });
  } catch (e) {
    lines.push(`  PT:  error: ${e.message}`);
  }

  // 2) NT tile idx
  try {
    const emuNt = JSON.parse(fs.readFileSync(path.join(emuDir, 'nt.json'), 'utf8'));
    const h5Nt  = JSON.parse(fs.readFileSync(path.join(h5Dir,  'nt.json'), 'utf8'));
    let ntSame = 0, ntTotal = 0;
    for (let i = 0; i < 4; i++) {
      const a = emuNt[i], b = h5Nt[i];
      if (!a || !b) continue;
      const n = Math.min(a.tile.length, b.tile.length);
      for (let k = 0; k < n; k++) {
        if (a.tile[k] === b.tile[k]) ntSame++;
        ntTotal++;
      }
    }
    lines.push(`  NT(4×1024):    same=${ntSame}/${ntTotal}  (${(ntTotal? ntSame/ntTotal*100:0).toFixed(1)}%)`);
    summary.push({ frame: f, metric: 'NT tile idx', same: ntSame, total: ntTotal });
  } catch (e) {
    lines.push(`  NT:  error: ${e.message}`);
  }

  // 3) OAM
  try {
    const emuOam = JSON.parse(fs.readFileSync(path.join(emuDir, 'oam.json'), 'utf8'));
    const h5Oam  = JSON.parse(fs.readFileSync(path.join(h5Dir,  'oam.json'), 'utf8'));
    let oamSame = 0, oamTotal = 0;
    for (let i = 0; i < 64; i++) {
      const a = emuOam[i], b = h5Oam[i];
      if (!a || !b) continue;
      if (a.y === b.y && a.tile === b.tile && a.attr === b.attr && a.x === b.x) oamSame++;
      oamTotal++;
    }
    lines.push(`  OAM(64×4B):    same=${oamSame}/${oamTotal}  (${(oamTotal? oamSame/oamTotal*100:0).toFixed(1)}%)`);
    summary.push({ frame: f, metric: 'OAM sprite', same: oamSame, total: oamTotal });
  } catch (e) {
    lines.push(`  OAM:  error: ${e.message}`);
  }

  // 4) Palette
  try {
    const emuPal = JSON.parse(fs.readFileSync(path.join(emuDir, 'palette.json'), 'utf8'));
    const h5Pal  = JSON.parse(fs.readFileSync(path.join(h5Dir,  'palette.json'), 'utf8'));
    const all = (p) => [...p.bg, ...p.sp];
    const e = all(emuPal), h = all(h5Pal);
    const n = Math.min(e.length, h.length);
    let palSame = 0;
    for (let i = 0; i < n; i++) if (e[i] === h[i]) palSame++;
    lines.push(`  Palette(32):   same=${palSame}/${n}  (${(n? palSame/n*100:0).toFixed(1)}%)`);
    summary.push({ frame: f, metric: 'Palette idx', same: palSame, total: n });
  } catch (e) {
    lines.push(`  Palette:  error: ${e.message}`);
  }

  // 5) Screen PNG
  try {
    const emuScr = decodePng(fs.readFileSync(path.join(emuDir, 'screen.png')));
    const h5Scr  = decodePng(fs.readFileSync(path.join(h5Dir,  'screen.png')));
    const cmp = compareRgba(emuScr, h5Scr);
    lines.push(`  Screen(256×240): same=${cmp.same}/${cmp.total} px  (${(cmp.ratio*100).toFixed(1)}%)`);
    summary.push({ frame: f, metric: 'Screen pixel', same: cmp.same, total: cmp.total });
  } catch (e) {
    lines.push(`  Screen:  error: ${e.message}`);
  }

  lines.push('');
}

const reportPath = path.join(EMU, 'diff-report.txt');
fs.writeFileSync(reportPath, lines.join('\n'));
console.log(`[emu-diff] report: ${reportPath}`);
console.log(lines.join('\n'));
