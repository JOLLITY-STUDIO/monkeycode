const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const root = path.join(__dirname, '..', '20260713');
const rom = fs.readFileSync(path.join(root, 'Langrisser II (Japan).md'));
const vram = fs.readFileSync(path.join(root, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'));
const cram = fs.readFileSync(path.join(root, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram'));

const rd = (a) => rom[a & 0xFFFFF] & 0xFF;
const rw = (a) => (rd(a) << 8) | rd(a + 1);
const rl = (a) => (rd(a) << 24) | (rd(a + 1) << 16) | (rd(a + 2) << 8) | rd(a + 3);
function hex(a, n) { return '0x' + a.toString(16).padStart(n || 6, '0'); }

// ============================================================
// 1. 调色板解析 (little-endian CRAM file)
// ============================================================
function parseCRAM(cramData) {
  const palettes = [];
  for (let p = 0; p < 4; p++) {
    const pal = [];
    for (let c = 0; c < 16; c++) {
      const off = p * 32 + c * 2;
      const w = (cramData[off + 1] << 8) | cramData[off];
      const r = ((w >> 1) & 0x7) * 36;
      const g = ((w >> 5) & 0x7) * 36;
      const b = ((w >> 9) & 0x7) * 36;
      pal.push([r, g, b]);
    }
    palettes.push(pal);
  }
  return palettes;
}
const palettes = parseCRAM(cram.slice(0, 128));

// ============================================================
// 2. VRAM 标题 tile 0x40 (copyright) 和 0x41-0x45 (1994 NCS 等)
// ============================================================
const targetTiles = [];
for (const t of [0x080, 0x0c0, 0x0c1, 0x180, 0x1c1, 0x280, 0x2c1, 0x780]) {
  targetTiles.push({ idx: t, bytes: new Uint8Array(vram.slice(t * 32, t * 32 + 32)) });
}
console.log('VRAM tiles to search:', targetTiles.length);

// ============================================================
// 3. 解压函数
// ============================================================
function decompressLZSS(romAddr) {
  const decompSize = rw(romAddr + 1);
  const srcStart = romAddr + 3;
  const win = new Uint8Array(0x1000).fill(0x20);
  let wpos = 0x0FEE, out = new Uint8Array(decompSize), opos = 0;
  let spos = srcStart, remain = decompSize;
  while (remain > 0) {
    const flag = rd(spos++);
    for (let b = 0; b < 8 && remain > 0; b++) {
      if ((flag >> b) & 1) {
        const by = rd(spos++);
        win[wpos] = by; out[opos++] = by;
        wpos = (wpos + 1) & 0xFFF; remain--;
      } else {
        const b1 = rd(spos++), b2 = rd(spos++);
        let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && remain > 0; i++) {
          const by = win[off];
          win[wpos] = by; out[opos++] = by;
          off = (off + 1) & 0xFFF; wpos = (wpos + 1) & 0xFFF; remain--;
        }
      }
    }
  }
  return out;
}

function decompressType2(romAddr) {
  const b1 = rd(romAddr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7F;
  if (!compressed) {
    const sz = rw(romAddr + 2);
    const d = rom.subarray(romAddr + 4, romAddr + 4 + sz * planes * 8);
    return new Uint8Array(d);
  }
  const lut = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = rd(romAddr + 2 + i);
    lut[i * 2] = (b >> 4) & 0xF; lut[i * 2 + 1] = b & 0xF;
  }
  const sz = rw(romAddr + 10);
  let pc = planes;
  if (pc !== 2) pc ^= 5;
  const ctrlStart = romAddr + 12, pixelStart = ctrlStart + sz;
  const outSize = sz * planes * 8;
  const bpt = pc * 8 * planes;
  const tc = Math.floor(sz / pc);
  const out = new Uint8Array(outSize);
  let cp = ctrlStart, pp = pixelStart;
  for (let t = 0; t < tc; t++) {
    const wb = new Uint8Array(bpt);
    let wp = 0;
    for (let pl = 0; pl < pc; pl++) {
      const cb = rd(cp++);
      for (let bt = 7; bt >= 0; bt--) {
        if ((cb >> bt) & 1) {
          for (let p = 0; p < planes; p++) wb[wp++] = rd(pp++);
        } else {
          for (let p = 0; p < planes; p++) wb[wp++] = 0;
        }
      }
    }
    const to = new Uint8Array(32); let ow = 0;
    const np = Math.min(pc, 4);
    for (let outer = 0; outer < 4; outer++) {
      const ps = [];
      for (let p = 0; p < np; p++) {
        const bo = (outer + p * 4) * 2;
        ps.push((wb[bo] << 8) | wb[bo + 1]);
      }
      for (let inner = 0; inner < 4; inner++) {
        let pix = 0;
        for (let px = 0; px < 4; px++) {
          const b0 = np > 0 ? (ps[0] & 0x8000 ? 1 : 0) : 0;
          const b1 = np > 1 ? (ps[1] & 0x8000 ? 1 : 0) : 0;
          const b2 = np > 2 ? (ps[2] & 0x8000 ? 1 : 0) : 0;
          const b3 = np > 3 ? (ps[3] & 0x8000 ? 1 : 0) : 0;
          pix = (pix << 4) | lut[(b3 << 3) | (b1 << 2) | (b2 << 1) | b0];
          for (let p = 0; p < np; p++) ps[p] = (ps[p] << 1) & 0xFFFF;
        }
        to[ow * 2] = (pix >> 8) & 0xFF; to[ow * 2 + 1] = pix & 0xFF; ow++;
      }
    }
    out.set(to, t * 32);
  }
  return out;
}

function loadResDirect(idx) {
  const ptr = rl(0x0B0000 + idx * 4);
  if (ptr < 0x200 || ptr > 0x200000) return null;
  const tp = rd(ptr);
  try {
    if (tp === 2) return { type: tp, data: decompressType2(ptr), ptr };
    if (tp === 3) return { type: tp, data: decompressLZSS(ptr), ptr };
  } catch (e) {
    return null;
  }
  return null;
}

// ============================================================
// 4. 搜索 tile 数据
// ============================================================
function findBytes(data, target) {
  const matches = [];
  if (!data || data.length < target.length) return matches;
  for (let i = 0; i < data.length - target.length; i++) {
    let match = true;
    for (let j = 0; j < target.length; j++) {
      if (data[i + j] !== target[j]) { match = false; break; }
    }
    if (match) matches.push(i);
  }
  return matches;
}

console.log('\n=== Searching direct resource table (0x0B0000) for title tiles ===');
let foundResources = [];
for (let idx = 0; idx < 256; idx++) {
  if (idx % 10 === 0) console.log(`  processing resource ${idx}...`);
  const res = loadResDirect(idx);
  if (!res || !res.data) continue;
  for (const target of targetTiles) {
    const matches = findBytes(res.data, target.bytes);
    if (matches.length > 0) {
      console.log(`FOUND: Resource #${idx} (ptr=${hex(res.ptr)}, type=${res.type}) contains tile 0x${target.idx.toString(16)} at offset ${hex(matches[0], 4)}`);
      foundResources.push({ idx, res, target, offset: matches[0] });
    }
  }
}

console.log(`\nTotal found: ${foundResources.length} resource-tile matches`);

// ============================================================
// 5. 保存找到的资源图集
// ============================================================
const outDir = path.join(__dirname, '..', '20260713', 'output', 'verify');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function decodeTile4BPP(tileBytes) {
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowBase = y * 4;
    const p0 = tileBytes[rowBase];
    const p1 = tileBytes[rowBase + 1];
    const p2 = tileBytes[rowBase + 2];
    const p3 = tileBytes[rowBase + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) |
                          (((p1 >> bit) & 1) << 1) |
                          (((p2 >> bit) & 1) << 2) |
                          (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

function renderTiles(tiles, palette, cols = 16) {
  if (tiles.length === 0) return null;
  const rows = Math.ceil(tiles.length / cols);
  const canvas = createCanvas(cols * 8, rows * 8);
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(cols * 8, rows * 8);
  for (let ti = 0; ti < tiles.length; ti++) {
    const tx = ti % cols, ty = Math.floor(ti / cols);
    const tile = tiles[ti];
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const ci = tile[py * 8 + px];
        const ix = ((ty * 8 + py) * (cols * 8) + (tx * 8 + px)) * 4;
        if (ci === 0) { img.data[ix + 3] = 0; continue; }
        const c = palette[ci] || [255, 0, 255];
        img.data[ix] = c[0]; img.data[ix + 1] = c[1]; img.data[ix + 2] = c[2]; img.data[ix + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

for (const fr of foundResources) {
  const res = fr.res;
  const tileCount = Math.floor(res.data.length / 32);
  const tiles = [];
  for (let i = 0; i < tileCount; i++) tiles.push(decodeTile4BPP(res.data.slice(i * 32, i * 32 + 32)));
  const canvas = renderTiles(tiles, palettes[0]);
  if (canvas) {
    const fn = path.join(outDir, `resource_direct_${fr.idx}_type${res.type}_pal0.png`);
    fs.writeFileSync(fn, canvas.toBuffer('image/png'));
    console.log(`Saved ${fn}`);
  }
}

console.log('\nDone.');
