/**
 * Langrisser II - 完整精灵系统深度提取
 * 
 * 提取内容:
 *   1. ROM 0x080CBC 精灵表 (0xC0字节/条目 = 6 tiles 裸数据, 小图标/肖像)
 *   2. ROM 0x080328 / 0x080674 场景脚本 → 战斗精灵tile组成
 *   3. 所有 Type 2/3 资源 → 精灵图集
 *   4. 精灵拼凑逻辑分析
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// ============================================================
// 工具函数
// ============================================================
let rom;
const rd = (a) => rom[a & 0xFFFFF] & 0xFF;
const rw = (a) => (rd(a) << 8) | rd(a + 1);
const rl = (a) => (rd(a) << 24) | (rd(a + 1) << 16) | (rd(a + 2) << 8) | rd(a + 3);

function hex(a,n){return '0x'+a.toString(16).padStart(n||6,'0');}

function decodeTile(data, offset) {
  const p = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rb = offset + y * 4;
    const p0 = data[rb], p1 = data[rb+1], p2 = data[rb+2], p3 = data[rb+3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      p[y*8+x] = ((p0>>bit)&1) | ((p1>>bit)&1)<<1 | ((p2>>bit)&1)<<2 | ((p3>>bit)&1)<<3;
    }
  }
  return p;
}

function renderTiles(tiles, palette, bgColor) {
  const n = tiles.length;
  if (n === 0) return null;
  const cols = Math.min(n, 16);
  const rows = Math.ceil(n / cols);
  const canvas = createCanvas(cols * 8, rows * 8);
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(cols * 8, rows * 8);
  for (let ti = 0; ti < n; ti++) {
    const tx = ti % cols, ty = Math.floor(ti / cols);
    const tile = tiles[ti];
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const ci = tile[py * 8 + px];
        const ix = ((ty * 8 + py) * (cols * 8) + (tx * 8 + px)) * 4;
        if (ci === 0) { img.data[ix+3] = 0; continue; }
        const c = palette[ci] || [255,0,255];
        img.data[ix]=c[0]; img.data[ix+1]=c[1]; img.data[ix+2]=c[2]; img.data[ix+3]=255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

// Genesis CRAM to RGB palette
function parsePalette(cramData, numColors) {
  const pal = [];
  for (let i = 0; i < Math.min(numColors || 16, cramData.length / 2); i++) {
    const w = cramData[i*2] | (cramData[i*2+1] << 8);
    pal.push([((w>>1)&0xF)*17, ((w>>5)&0xF)*17, ((w>>9)&0xF)*17]);
  }
  return pal;
}

// 从标题画面 CRAM 文件加载
function loadTitleCRAM() {
  const p = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
  if (fs.existsSync(p)) {
    const d = fs.readFileSync(p);
    return parsePalette(d, 64);
  }
  return null;
}

// ============================================================
// LZSS 解压
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

// Type 2 位平面解压
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
    lut[i*2] = (b>>4)&0xF; lut[i*2+1] = b&0xF;
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
          pix = (pix << 4) | lut[(b3<<3)|(b1<<2)|(b2<<1)|b0];
          for (let p = 0; p < np; p++) ps[p] = (ps[p] << 1) & 0xFFFF;
        }
        to[ow*2] = (pix>>8)&0xFF; to[ow*2+1] = pix&0xFF; ow++;
      }
    }
    out.set(to, t * 32);
  }
  return out;
}

// ============================================================
// 资源表
// ============================================================
const RES_TABLE = 0x0B0000;

function resPtr(id, origD0) {
  const sc = (origD0 & 0xFFFF) % 64;
  const idx = (id & 0x7FFF) >> sc;
  return rl(RES_TABLE + idx * 4);
}

function loadRes(resId) {
  const addr = resPtr(resId, resId | 0x8000);
  const tp = rd(addr);
  try {
    if (tp === 1) return null; // NibbleRLE not used for tiles
    if (tp === 2) return decompressType2(addr);
    if (tp === 3) return decompressLZSS(addr);
  } catch(e) { return null; }
  return null;
}

// ============================================================
// 分类资源表 (来自 resources-classified.json)
// ============================================================
const RESOURCE_INDEX = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'resources-classified.json'), 'utf8')
);

// ============================================================
// 主程序
// ============================================================
async function main() {
  const romPath = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md');
  rom = fs.readFileSync(romPath);
  console.log(`ROM: ${rom.length} bytes`);

  const outDir = path.join(__dirname, '..', '20260713', 'output', 'sprites');
  const jsonDir = path.join(outDir, 'json');
  if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });

  const titleCRAM = loadTitleCRAM();
  console.log(`Title CRAM loaded: ${titleCRAM ? titleCRAM.length + ' colors' : 'NOT FOUND'}`);

  // 使用标题画面第2调色板作为精灵默认调色板
  const sprPal = titleCRAM ? titleCRAM.slice(32, 48) : [
    [0,0,0],[36,36,36],[73,73,73],[109,109,109],[36,0,0],[146,0,0],[219,0,0],[255,0,0],
    [0,146,0],[0,109,0],[0,36,0],[255,182,255],[182,146,182],[219,219,219],[255,255,255],[109,0,0]
  ];

  // ============================================================
  // PART 1: 小精灵表 (ROM 0x080CBC)
  // ============================================================
  console.log('\n=== PART 1: 0x080CBC 小精灵表 ===');
  const SPRITE_SMALL = 0x080CBC;
  const SPRITE_SMALL_SIZE = 0xC0; // 192 bytes = 6 tiles

  // 直接当raw tile数据解析
  const smallDir = path.join(outDir, 'small_sprites');
  if (!fs.existsSync(smallDir)) fs.mkdirSync(smallDir, { recursive: true });

  console.log('Extracting small sprites (192 bytes = 6 tiles each):');
  for (let i = 0; i < 100; i++) {
    const addr = SPRITE_SMALL + i * SPRITE_SMALL_SIZE;
    // 检查是否有数据
    let hasData = false;
    for (let j = 0; j < 6; j++) {
      if (rd(addr + j) !== 0) { hasData = true; break; }
    }
    if (!hasData) continue;

    const tiles = [];
    for (let j = 0; j < 6; j++) {
      tiles.push(decodeTile(rom, addr + j * 32));
    }

    const canvas = renderTiles(tiles, sprPal);
    if (canvas) {
      const fn = path.join(smallDir, `sprite_${String(i).padStart(2,'0')}.png`);
      fs.writeFileSync(fn, canvas.toBuffer('image/png'));
    }
  }
  console.log(`  100 small sprites extracted to ${smallDir}`);

  // ============================================================
  // PART 2: 所有资源提取 (200 resources)
  // ============================================================
  console.log('\n=== PART 2: 所有资源提取 ===');
  const allDir = path.join(outDir, 'all_resources');
  if (!fs.existsSync(allDir)) fs.mkdirSync(allDir, { recursive: true });

  const resourceStats = [];
  let totalTiles = 0;

  for (let idx = 0; idx < 200; idx++) {
    const resId = 32768 + idx * 2;
    const data = loadRes(resId);
    if (!data || data.length === 0) continue;

    const tileCount = Math.floor(data.length / 32);
    if (tileCount === 0) continue;
    totalTiles += tileCount;

    const tiles = [];
    for (let j = 0; j < tileCount; j++) {
      tiles.push(decodeTile(data, j * 32));
    }

    // 使用不同调色板渲染
    const canvas = renderTiles(tiles, sprPal);
    if (canvas) {
      const fn = path.join(allDir, `res_${String(idx).padStart(3,'0')}_${hex(resId,4)}.png`);
      fs.writeFileSync(fn, canvas.toBuffer('image/png'));
      
      // 同时用 palette 0 渲染一个用于对比
      if (titleCRAM) {
        const c2 = renderTiles(tiles, titleCRAM.slice(0, 16));
        if (c2) {
          const fn2 = path.join(allDir, `res_${String(idx).padStart(3,'0')}_${hex(resId,4)}_pal0.png`);
          fs.writeFileSync(fn2, c2.toBuffer('image/png'));
        }
      }
    }

    resourceStats.push({
      index: idx,
      resourceId: resId,
      hexId: hex(resId, 4),
      type: rd(resPtr(resId, resId | 0x8000)),
      size: data.length,
      tileCount,
      cols: Math.min(tileCount, 16),
      rows: Math.ceil(tileCount / 16),
      pixelWidth: Math.min(tileCount, 16) * 8,
      pixelHeight: Math.ceil(tileCount / 16) * 8,
    });

    if (idx % 20 === 19) console.log(`  Processed ${idx + 1}/200 resources...`);
  }

  console.log(`Total: ${resourceStats.length} resources, ${totalTiles} tiles`);

  // ============================================================
  // PART 3: 场景脚本精灵组成分析
  // ============================================================
  console.log('\n=== PART 3: 场景脚本分析 ===');

  // ROM 0x080328 - 场景脚本指针表1 (type=0)
  console.log('\n场景脚本 0x080328 (type=0):');
  const scriptBase1 = 0x080328;
  // 读取前几个指针
  for (let i = 0; i < 8; i++) {
    const ptr = rl(scriptBase1 + i * 4);
    console.log(`  [${i}] -> ${hex(ptr)}`);
    if (ptr > 0 && ptr < 0x100000) {
      // 读取精灵条目
      let ei = 0, addr = ptr;
      while (addr < 0x100000 && ei < 50) {
        const spriteId = rw(addr);
        if (spriteId === 0xFFFF || spriteId === 0) break;
        // 每个条目: spriteId(2B) + tile data(32B) = 34B
        const vramTarget = (0 * 0x100 + spriteId) * 0x20 + 0x2000;
        ei++;
        addr += 34;
        if (ei <= 5) {
          console.log(`    entry ${ei}: spriteId=0x${spriteId.toString(16)} VRAM=0x${vramTarget.toString(16)}`);
        }
      }
      console.log(`    -> ${ei} sprite entries`);
    }
  }

  // ROM 0x080674 - 场景脚本指针表2 (type=1)
  console.log('\n场景脚本 0x080674 (type=1):');
  const scriptBase2 = 0x080674;
  for (let i = 0; i < 8; i++) {
    const ptr = rl(scriptBase2 + i * 4);
    console.log(`  [${i}] -> ${hex(ptr)}`);
    if (ptr > 0 && ptr < 0x100000) {
      let ei = 0, addr = ptr;
      while (addr < 0x100000 && ei < 50) {
        const spriteId = rw(addr);
        if (spriteId === 0xFFFF || spriteId === 0) break;
        const vramTarget = (1 * 0x100 + spriteId) * 0x20 + 0x2000;
        ei++;
        addr += 34;
        if (ei <= 5) {
          console.log(`    entry ${ei}: spriteId=0x${spriteId.toString(16)} VRAM=0x${vramTarget.toString(16)}`);
        }
      }
      console.log(`    -> ${ei} sprite entries`);
    }
  }

  // ============================================================
  // PART 4: 导出综合 JSON 索引
  // ============================================================
  console.log('\n=== PART 4: 导出 JSON ===');

  // 完整资源索引
  fs.writeFileSync(
    path.join(jsonDir, 'all_resources.json'),
    JSON.stringify(resourceStats, null, 2)
  );

  // 摘要
  const summary = {
    smallSprites: { table: '0x080CBC', entrySize: '0xC0 (192 bytes, 6 tiles)', count: 100 },
    resources: {
      total: resourceStats.length,
      totalTiles,
      type2Count: resourceStats.filter(r => r.type === 2).length,
      type3Count: resourceStats.filter(r => r.type === 3).length,
      stats: resourceStats,
    },
    sceneScripts: {
      type0: '0x080328',
      type1: '0x080674',
    },
    palettes: titleCRAM ? {
      palette0: titleCRAM.slice(0, 16),
      palette1: titleCRAM.slice(16, 32),
      palette2: titleCRAM.slice(32, 48),
      palette3: titleCRAM.slice(48, 64),
    } : null,
  };
  fs.writeFileSync(
    path.join(outDir, 'sprite_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`\nAll done! See: ${outDir}`);
  console.log(`  - small_sprites/ : 100 small sprite PNGs`);
  console.log(`  - all_resources/ : ${resourceStats.length} resource tile sheets`);
  console.log(`  - json/          : full resource index`);
  console.log(`  - sprite_summary.json : complete summary`);
}

main().catch(e => { console.error(e); process.exit(1); });
