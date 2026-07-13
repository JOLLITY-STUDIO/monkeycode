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
// 1. 调色板解析 (CRAM 文件是 little-endian)
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
// 2. 从 VRAM 读取标题画面 tile 数据
// ============================================================
const tileIdx = 0x40;
const tileAddr = tileIdx * 32;
const tileBytes = new Uint8Array(vram.slice(tileAddr, tileAddr + 32));

console.log('=== VRAM Title Tile #0x40 ===');
console.log('Raw bytes:', Array.from(tileBytes).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('');

// ============================================================
// 3. 资源解压函数
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

function resPtr(id, origD0) {
  const sc = (origD0 & 0xFFFF) % 64;
  const idx = (id & 0x7FFF) >> sc;
  return rl(0x0B0000 + idx * 4);
}
function loadRes(resId) {
  const addr = resPtr(resId, resId | 0x8000);
  const tp = rd(addr);
  try {
    if (tp === 1) return null; // skip nibbleRLE for now
    if (tp === 2) return decompressType2(addr);
    if (tp === 3) return decompressLZSS(addr);
  } catch (e) { return null; }
  return null;
}

// ============================================================
// 4. 在所有解压后的资源中搜索 tile 0x40 的 32 字节
// ============================================================
function findBytes(data, target) {
  const matches = [];
  for (let i = 0; i < data.length - target.length; i++) {
    let match = true;
    for (let j = 0; j < target.length; j++) {
      if (data[i + j] !== target[j]) { match = false; break; }
    }
    if (match) matches.push(i);
  }
  return matches;
}

console.log('=== Searching all decompressed resources for tile #0x40 bytes ===');
let foundRes = null;
for (let idx = 0; idx < 200; idx++) {
  const resId = 32768 + idx * 2;
  const data = loadRes(resId);
  if (!data || data.length === 0) continue;
  const matches = findBytes(data, tileBytes);
  if (matches.length > 0) {
    console.log(`FOUND! Resource #${idx} (id=${hex(resId, 4)}) type=${rd(resPtr(resId, resId | 0x8000))}, size=${data.length}, matches at offsets:`, matches.map(o => hex(o, 4)).join(', '));
    foundRes = { idx, resId, data, matches };
  }
}

if (!foundRes) {
  console.log('NOT FOUND in any decompressed resource. The tile may be byte-swapped, horizontally flipped, or in a Type-1/NibbleRLE resource.');
  console.log('');
  console.log('Trying Type-1 resources and byte-swapped searches...');
  // Could add more search strategies here
}

// ============================================================
// 5. 在资源数据附近搜索标题画面调色板
// ============================================================
// 标题画面调色板 (palette 0) 作为 16 个 little-endian word
const titlePal0 = new Uint16Array(16);
for (let c = 0; c < 16; c++) {
  titlePal0[c] = (cram[c * 2 + 1] << 8) | cram[c * 2];
}
console.log('\n=== Title Palette 0 words ===');
console.log(Array.from(titlePal0).map(w => hex(w, 4)).join(' '));

// 把 palette 0 作为 big-endian 字节也搜索 (ROM 可能是 big-endian 存储)
const palBytesBE = new Uint8Array(32);
for (let c = 0; c < 16; c++) {
  palBytesBE[c * 2] = (titlePal0[c] >> 8) & 0xFF;
  palBytesBE[c * 2 + 1] = titlePal0[c] & 0xFF;
}
const palBytesLE = new Uint8Array(32);
for (let c = 0; c < 16; c++) {
  palBytesLE[c * 2] = titlePal0[c] & 0xFF;
  palBytesLE[c * 2 + 1] = (titlePal0[c] >> 8) & 0xFF;
}

console.log('\n=== Searching ROM for palette 0 (LE and BE) ===');
const leMatches = findBytes(rom, palBytesLE);
const beMatches = findBytes(rom, palBytesBE);
console.log('Little-endian matches:', leMatches.length, leMatches.slice(0, 10).map(a => hex(a)).join(', '));
console.log('Big-endian matches:', beMatches.length, beMatches.slice(0, 10).map(a => hex(a)).join(', '));

// 也搜索调色板中的子序列 (比如第一个颜色 0x0000, 第二个 0x0400 等)
console.log('\n=== Searching ROM for individual title palette colors ===');
for (let c = 1; c < 16; c++) {
  const w = titlePal0[c];
  const bytesLE = [w & 0xFF, (w >> 8) & 0xFF];
  const bytesBE = [(w >> 8) & 0xFF, w & 0xFF];
  const le = findBytes(rom, bytesLE);
  const be = findBytes(rom, bytesBE);
  if (le.length < 100 || be.length < 100) {
    console.log(`Color ${c}=0x${w.toString(16).padStart(4,'0')}: LE matches=${le.length}, BE matches=${be.length}`);
  }
}

// ============================================================
// 6. 在资源表中查看资源 #0 和 #1 (标题画面相关)
// ============================================================
console.log('\n=== Resource table entries #0-20 ===');
for (let idx = 0; idx < 20; idx++) {
  const resId = 32768 + idx * 2;
  const addr = resPtr(resId, resId | 0x8000);
  const type = rd(addr);
  const data = loadRes(resId);
  console.log(`#${idx}: id=${hex(resId, 4)} ptr=${hex(addr)} type=${type} size=${data ? data.length : 0}`);
}

// ============================================================
// 7. 检查资源 #0 的前 256 字节 (可能是标题画面数据)
// ============================================================
const res0 = loadRes(32768);
if (res0) {
  console.log('\n=== Resource #0 first 256 bytes ===');
  for (let i = 0; i < 256; i += 16) {
    const bytes = Array.from(res0.slice(i, i + 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`  ${hex(i, 4)}: ${bytes}`);
  }
}

console.log('\nDone.');
