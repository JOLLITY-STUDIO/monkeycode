/**
 * ============================================================
 * 天使之翼2 — CHR 资源提取工具
 * 
 * 从 chrBanks.json 提取 CHR pattern table 数据:
 *   1. CHR 瓦片 → 灰度 PNG 精灵表 (用于静态预览/参考)
 *   2. NES 调色板 → 颜色参考 PNG
 * 
 * 注意: 灰度 PNG 仅用于开发调试，运行时使用 CHR RAM +
 *      动态调色板渲染 (Renderer.ts + TileCache.ts)。
 * 用法: node tools/export_chr_assets.cjs
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_CHR = path.join(ROOT, 'src', 'assets', 'chr');
const ASSETS_PAL = path.join(ROOT, 'src', 'assets', 'palette');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const ROMDATA_DIR = path.join(ROOT, 'src', 'disasm', 'banks', '_romdata');

// ============================================================
// NES 调色板 (NTSC) — 与 src/types.ts 的 NES_PALETTE 一致
// ============================================================
const NES_PALETTE_ARGB = [
  0xFF7C7C7C, 0xFF0000FC, 0xFF0000BC, 0xFF4428BC, 0xFF940084, 0xFFA80020, 0xFFA81000,
  0xFF881400, 0xFF503000, 0xFF007800, 0xFF006800, 0xFF005800, 0xFF004058, 0xFF000000,
  0xFF000000, 0xFF000000, 0xFFBCBCBC, 0xFF0078F8, 0xFF0058F8, 0xFF6844FC, 0xFFD800CC,
  0xFFE40058, 0xFFF83800, 0xFFE45C10, 0xFFAC7C00, 0xFF00B800, 0xFF00A800, 0xFF00A844,
  0xFF008888, 0xFF000000, 0xFF000000, 0xFF000000, 0xFFF8F8F8, 0xFF3CBCFC, 0xFF6888FC,
  0xFF9878F8, 0xFFF878F8, 0xFFF85898, 0xFFF87858, 0xFFFEA044, 0xFFF8B800, 0xFFB8F818,
  0xFF58D854, 0xFF58F898, 0xFF00E8D8, 0xFF787878, 0xFF000000, 0xFF000000, 0xFFFCFCFC,
  0xFFA4E4FC, 0xFFB8B8F8, 0xFFD8B8F8, 0xFFF8B8F8, 0xFFF8A4C0, 0xFFF0D0B0, 0xFFFCE0A8,
  0xFFF8D878, 0xFFD8F878, 0xFFB8F8B8, 0xFFB8F8D8, 0xFF00FCFC, 0xFFF8D8F8, 0xFF000000,
  0xFF000000,
];

// ARGB → RGB bytes
function argbToRgb(argb) {
  return [(argb >> 16) & 0xFF, (argb >> 8) & 0xFF, argb & 0xFF];
}

// ============================================================
// 加载 CHR 数据
// ============================================================

function loadChrFromJson(jsonPath) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const banks = [];
  for (let b = 0; b < 16; b++) {
    const key = `bank_${b.toString(16).padStart(2, '0')}`;
    if (data[key]) {
      const arr = data[key];
      if (Array.isArray(arr)) {
        banks.push(Uint8Array.from(arr));
      } else if (arr && typeof arr === 'object' && Array.isArray(arr.data)) {
        banks.push(Uint8Array.from(arr.data));
      }
    }
  }
  return banks;
}

// ============================================================
// PNG 写入 (纯 Node.js, 无外部依赖)
// ============================================================

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const tb = Buffer.from(type, 'ascii');
  const cb = Buffer.concat([tb, data]);
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(cb), 0);
  return Buffer.concat([len, cb, crc]);
}

function writePNG(fp, w, h, px) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const rows = [];
  const fb = Buffer.from([0]);
  for (let y = 0; y < h; y++) {
    rows.push(fb);
    rows.push(Buffer.from(px.subarray(y * w * 3, (y + 1) * w * 3)));
  }
  const raw = Buffer.concat(rows);
  const idat = zlib.deflateSync(raw, { level: 9 });
  fs.writeFileSync(fp, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

// ============================================================
// 渲染: CHR tile → 灰度 PNG
// ============================================================

function renderChrBankGrayscale(chrData, scale = 2) {
  const tilesX = 16, tilesY = 16;
  const tilePx = 8, gap = 1;
  const tw = tilePx * scale, th = tilePx * scale;
  const w = tilesX * (tw + gap) + gap;
  const h = tilesY * (th + gap) + gap;

  const px = new Uint8Array(w * h * 3);
  px.fill(0x10);

  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const tid = ty * 16 + tx;
      const baseX = tx * (tw + gap) + gap;
      const baseY = ty * (th + gap) + gap;

      if (tid * 16 + 16 > chrData.length) continue;

      for (let py = 0; py < 8; py++) {
        const lo = chrData[tid * 16 + py];
        const hi = chrData[tid * 16 + py + 8];

        for (let px2 = 0; px2 < 8; px2++) {
          const bit = 7 - px2;
          const ci = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
          const gs = [0x00, 0x50, 0xA0, 0xF0][ci];
          const rgb = ci === 0 ? [0x15, 0x18, 0x20] : [gs, gs, gs];

          for (let dy = 0; dy < scale; dy++) {
            for (let dx = 0; dx < scale; dx++) {
              const ix = baseX + px2 * scale + dx;
              const iy = baseY + py * scale + dy;
              const off = (iy * w + ix) * 3;
              px[off] = rgb[0];
              px[off + 1] = rgb[1];
              px[off + 2] = rgb[2];
            }
          }
        }
      }
    }
  }

  return { width: w, height: h, data: px };
}

// ============================================================
// 调色板参考 PNG
// ============================================================

function renderPaletteRef() {
  const cols = 16, rows = 4;
  const cell = 32, gap = 2;
  const w = cols * (cell + gap) + gap;
  const h = rows * (cell + gap) + gap;

  const px = new Uint8Array(w * h * 3);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * 16 + c;
      if (idx >= 64) continue;
      const [red, grn, blu] = argbToRgb(NES_PALETTE_ARGB[idx]);
      const bx = c * (cell + gap) + gap;
      const by = r * (cell + gap) + gap;

      for (let dy = 0; dy < cell; dy++) {
        for (let dx = 0; dx < cell; dx++) {
          const off = ((by + dy) * w + (bx + dx)) * 3;
          px[off] = red;
          px[off + 1] = grn;
          px[off + 2] = blu;
        }
      }
    }
  }

  return { width: w, height: h, data: px };
}

// ============================================================
// 主流程
// ============================================================

console.log('=== 天使之翼2 — CHR 资源提取 ===\n');

fs.mkdirSync(ASSETS_CHR, { recursive: true });
fs.mkdirSync(ASSETS_PAL, { recursive: true });

// 1. 加载 CHR 数据
const jsonPath = path.join(DATA_DIR, 'chrBanks.json');
if (!fs.existsSync(jsonPath)) {
  console.error('未找到 chrBanks.json!');
  process.exit(1);
}
const chrBanks = loadChrFromJson(jsonPath);
console.log(`从 chrBanks.json 加载: ${chrBanks.length} 个 CHR bank`);

// 2. 导出灰度精灵表 (仅供静态预览)
console.log('\n--- CHR Tilesets (Grayscale) ---');
for (let b = 0; b < chrBanks.length; b++) {
  const result = renderChrBankGrayscale(chrBanks[b], 2);
  const fp = path.join(ASSETS_CHR, `chr_bank_${b}_grayscale.png`);
  writePNG(fp, result.width, result.height, result.data);
  console.log(`  → chr_bank_${b}_grayscale.png (${result.width}×${result.height})`);
}

// 3. 导出调色板参考 (与 types.ts NES_PALETTE 完全一致)
console.log('\n--- Palette Reference ---');
const palRef = renderPaletteRef();
writePNG(path.join(ASSETS_PAL, 'nes_palette.png'), palRef.width, palRef.height, palRef.data);
console.log(`  → nes_palette.png (${palRef.width}×${palRef.height}) — 与 types.ts 一致`);

// 4. 导出调色板 JSON
const paletteJson = {
  _source: 'types.ts NES_PALETTE',
  palette: NES_PALETTE_ARGB.map(argb => {
    const r = ((argb >> 16) & 0xFF).toString(16).padStart(2, '0');
    const g = ((argb >> 8) & 0xFF).toString(16).padStart(2, '0');
    const b = (argb & 0xFF).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }),
};
fs.writeFileSync(path.join(ASSETS_PAL, 'palette.json'), JSON.stringify(paletteJson, null, 2));
console.log(`  → palette.json`);

// 5. 生成资产索引
const assetsIndex = {
  chrBanks: chrBanks.length,
  eachBank: '8KB = 256 tiles × 16 bytes',
  tileSize: '8×8 px',
  pngScale: '2× (每 tile 16×16 px)',
  usage: {
    grayscale: 'chr_bank_{N}_grayscale.png — 静态预览/调试用',
    runtime: '渲染时使用 TileCache 动态解码 CHR RAM + 应用当前调色板',
  },
  palettes: {
    reference: 'palette/nes_palette.png',
    json: 'palette/palette.json',
    source: '与 src/types.ts NES_PALETTE 完全一致',
  },
};
fs.writeFileSync(path.join(ROOT, 'src', 'assets', '_index.json'), JSON.stringify(assetsIndex, null, 2));

console.log('\n✓ 资源提取完成! 输出: src/assets/');
console.log('  灰度 CHR: 运行时渲染参阅 Renderer.ts + TileCache.ts');
