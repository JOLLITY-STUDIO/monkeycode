/**
 * 搜索字体 tile 的 ROM 来源
 * 策略：从 VRAM dump 取出版权文字区的 tile (0x080-0x7c1) 作为"指纹"
 * 对所有 entry 尝试三种解压方式，找匹配
 */
import fs from 'fs';

const base = 'd:/studio/github/monkeycode/src/langrisser2/20260713';
const rom = new Uint8Array(fs.readFileSync(`${base}/Langrisser II (Japan).md`));
const vram = new Uint8Array(fs.readFileSync(`${base}/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram`));

const TABLE = 0x0B0000;
const RL = (o) => ((rom[o] << 24) | (rom[o + 1] << 16) | (rom[o + 2] << 8) | rom[o + 3]) >>> 0;
const RW = (o) => ((rom[o] << 8) | rom[o + 1]);

// ===== LZSS 解压 (Type 3) =====
function decompLZSS(addr) {
  const size = RW(addr + 1);
  const win = new Uint8Array(0x1000).fill(0x20);
  let wp = 0x0fee, rem = size, out = new Uint8Array(size), op = 0, cp = addr + 3;
  while (rem > 0) {
    const flags = rom[cp++];
    for (let b = 0; b < 8 && rem > 0; b++) {
      if ((flags >> b) & 1) {
        const by = rom[cp++];
        win[wp] = by; out[op++] = by;
        wp = (wp + 1) & 0xfff; rem--;
      } else {
        const b1 = rom[cp++], b2 = rom[cp++];
        let mo = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const ml = (b2 & 0x0f) + 2;
        for (let i = 0; i < ml && rem > 0; i++) {
          const by = win[mo];
          win[wp] = by; out[op++] = by;
          mo = (mo + 1) & 0xfff; wp = (wp + 1) & 0xfff; rem--;
        }
      }
    }
  }
  return out;
}

// ===== Nibble RLE (Type 1) =====
function decompNibbleRLE(addr) {
  const size = RW(addr + 1);
  const out = new Uint8Array(size);
  let op = 0, cp = addr + 3;
  while (op < size && cp < rom.length) {
    const cmd = rom[cp++];
    if (cmd & 0x80) {
      const len = (cmd & 0x7f) + 1;
      const lo = rom[cp++], hi = rom[cp++];
      let val = (hi << 8) | lo;
      // nibble RLE: repeat high nibble then low nibble
      const nibbles = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        nibbles[i] = val & 0xff;
        val >>= 8;
      }
      for (let i = len - 1; i >= 0; i--) {
        out[op++] = nibbles[i]; if (op >= size) break;
      }
    } else {
      const len = cmd + 1;
      for (let i = 0; i < len && op < size; i++) {
        out[op++] = rom[cp++];
      }
    }
  }
  return out;
}

// ===== Type 2 解压 (位平面) =====
function decompType2(addr) {
  const b1 = rom[addr + 1];
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  if (!compressed) {
    const sz = RW(addr + 2);
    return rom.slice(addr + 4, addr + 4 + sz * planes * 8);
  }
  const lut = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = rom[addr + 2 + i];
    lut[i * 2] = (b >> 4) & 0xf;
    lut[i * 2 + 1] = b & 0xf;
  }
  const sz = RW(addr + 10);
  let pc = planes; if (pc !== 2) pc ^= 5;
  const ctrl = addr + 12, px = ctrl + sz;
  const out = new Uint8Array(sz * planes * 8);
  let cp = ctrl, pp = px;
  const tc = Math.floor(sz / pc);
  for (let t = 0; t < tc; t++) {
    const wb = new Uint8Array(pc * 8 * planes);
    let wp_t = 0;
    for (let pl = 0; pl < pc; pl++) {
      const cb = rom[cp++];
      for (let bt = 7; bt >= 0; bt--) {
        if ((cb >> bt) & 1)
          for (let p = 0; p < planes; p++) wb[wp_t++] = rom[pp++];
        else
          for (let p = 0; p < planes; p++) wb[wp_t++] = 0;
      }
    }
    const to = new Uint8Array(32);
    let ow = 0, np = Math.min(pc, 4);
    for (let o = 0; o < 4; o++) {
      const ps = [];
      for (let p = 0; p < np; p++) {
        const bo = (o + p * 4) * 2;
        ps.push((wb[bo] << 8) | wb[bo + 1]);
      }
      for (let inn = 0; inn < 4; inn++) {
        let px_val = 0;
        for (let i = 0; i < 4; i++) {
          const b0 = np > 0 ? (ps[0] & 0x8000 ? 1 : 0) : 0;
          const b1 = np > 1 ? (ps[1] & 0x8000 ? 1 : 0) : 0;
          const b2 = np > 2 ? (ps[2] & 0x8000 ? 1 : 0) : 0;
          const b3 = np > 3 ? (ps[3] & 0x8000 ? 1 : 0) : 0;
          px_val = (px_val << 4) | lut[(b3 << 3) | (b1 << 2) | (b2 << 1) | b0];
          for (let p = 0; p < np; p++) ps[p] = (ps[p] << 1) & 0xffff;
        }
        to[ow * 2] = (px_val >> 8) & 0xff;
        to[ow * 2 + 1] = px_val & 0xff;
        ow++;
      }
    }
    out.set(to, t * 32);
  }
  return out;
}

// ===== Tile hash =====
function tileHash(tile, offset) {
  let h = 0;
  for (let i = 0; i < 32; i++) {
    h = ((h << 5) - h) + tile[offset + i];
    h |= 0;
  }
  return h;
}

// ===== VRAM tile 截取 =====
function getVramTile(idx) {
  return vram.slice(idx * 32, idx * 32 + 32);
}

// ===== 目标 tile: 版权文字用的 tile =====
console.log('=== 版权文字 VRAM tile 指纹 ===\n');
const targetIdxs = [];
// 从 nametable 确认版权文字用的 tile
// Row 23: 4080 3180 3980 3980 3480 0080 0080 4e80 4380 5380 0080 4380 4f80 5280 5080 2e80
// 解码: tile=(word & 0x7FF)
const copyrightCodes = [0x4080, 0x3180, 0x3980, 0x3980, 0x3480, 0x0080, 0x4e80, 0x4380, 0x5380, 0x4380, 0x4f80, 0x5280, 0x5080, 0x2e80];
const copyrightTiles = copyrightCodes.map(w => w & 0x7FF);

// 去重
const uniqueTargets = [...new Set(copyrightTiles)].filter(t => t !== 0);
// 跳过空白 tile
const dataFree = uniqueTargets.filter(idx => {
  const t = getVramTile(idx);
  return t.some(b => b !== 0);
});

console.log('Unique non-empty tiles used in copyright text:');
const targetHashes = new Map();
for (const idx of dataFree) {
  const h = tileHash(getVramTile(idx), 0);
  targetHashes.set(idx, h);
  console.log(`  VRAM tile 0x${idx.toString(16).padStart(3, '0')}: hash=${(h>>>0).toString(16)}`);
}
console.log();

// ===== 搜所有 entry =====
console.log('=== 搜索所有 entry 中的匹配 ===\n');

const decommaps = new Map(); // type -> entry -> { offset, vramTileIdx }

for (let entry = 0; entry < 256; entry++) {
  const ptr = RL(TABLE + entry * 4);
  if (ptr < 0x0B0000 || ptr >= rom.length - 3) continue;
  
  const type = rom[ptr];
  
  let data = null;
  try {
    if (type === 3) data = decompLZSS(ptr);
    else if (type === 2) data = decompType2(ptr);
    else if (type === 1) data = decompNibbleRLE(ptr);
  } catch(e) {}

  if (!data || data.length < 32) continue;

  // 遍历 decompressed data 中每个 tile
  const tileCount = Math.floor(data.length / 32);
  for (let t = 0; t < tileCount; t++) {
    const h = tileHash(data, t * 32);
    for (const [vIdx, vHash] of targetHashes) {
      if (h === vHash) {
        const key = `${type}_${entry}`;
        if (!decommaps.has(key)) decommaps.set(key, []);
        decommaps.get(key).push({ vramTile: vIdx, dataTile: t, offset: t * 32 });
      }
    }
  }
}

if (decommaps.size === 0) {
  console.log('NO MATCHES FOUND with standard decompression.');
  console.log('\n可能字体 tile 的 VRAM 格式和解压格式不同。');
  console.log('字体有可能是通过 DMA 描述符队列 (Path B) 直接从 ROM copy 到 VRAM 的，未经解压转换。');

  // 直接搜索 raw ROM (不解压，原始字节对比)
  console.log('\n=== 直接从 ROM 搜索原始 tile 数据 (不解压) ===');
  const rawHits = new Map();
  for (let off = 0; off < rom.length - 32; off++) {
    for (const [vIdx, vHash] of targetHashes) {
      if (tileHash(rom, off) === vHash) {
        if (!rawHits.has(vIdx)) rawHits.set(vIdx, []);
        rawHits.get(vIdx).push(off);
      }
    }
  }
  
  if (rawHits.size > 0) {
    console.log('找到原始 ROM 匹配:');
    for (const [vIdx, offsets] of rawHits) {
      console.log(`  VRAM 0x${vIdx.toString(16).padStart(3,'0')}: ROM offsets ${offsets.map(o => '0x' + o.toString(16)).join(', ')} (${offsets.length} matches)`);
      
      // 反查这些 ROM offset 属于哪个 entry
      for (const off of offsets) {
        for (let e = 0; e < 256; e++) {
          const p = RL(TABLE + e * 4);
          if (p < 0x0B0000) continue;
          const t = rom[p];
          let size = 0;
          if (t === 3) size = RW(p + 1);
          else if (t === 2) size = RW(p + 1) * (rom[p + 1] & 0x7f) * 8;
          else size = RW(p + 1);
          if (off >= p && off < p + size + 10) {
            console.log(`    → 在 entry ${e} 范围内 (type=${t}, 起始=0x${p.toString(16)}, 数据区 ${off.toString(16)})`);
          }
        }
      }
    }
  } else {
    console.log('NO MATCHES in raw ROM either.');
    console.log('\n字体 tile 可能是在运行时程序生成的（如合成、旋转）或从其他地方 DMA 的。');
  }
} else {
  console.log('FOUND MATCHES:');
  for (const [key, matches] of decommaps) {
    const [type, entry] = key.split('_').map(Number);
    console.log(`\n  Type ${type}, Entry ${entry}:`);
    for (const m of matches) {
      console.log(`    VRAM tile 0x${m.vramTile.toString(16).padStart(3,'0')} ← data tile ${m.dataTile} (offset ${m.offset})`);
    }
  }
}
