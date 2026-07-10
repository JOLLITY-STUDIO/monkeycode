/**
 * Mega Drive / Genesis ROM 解析器 v2
 * 4bpp tile解码 + 调色板 + ROM 数据扫描
 */

export function decodeMDTile(data, offset) {
  const pixels = new Uint8Array(64);
  for (let row = 0; row < 8; row++) {
    const base = offset + row * 4;
    const b0 = data[base], b1 = data[base + 1], b2 = data[base + 2], b3 = data[base + 3];
    for (let col = 0; col < 8; col++) {
      const bit = 1 << (7 - col);
      const ci = ((b3 & bit) ? 8 : 0) | ((b2 & bit) ? 4 : 0) | ((b1 & bit) ? 2 : 0) | ((b0 & bit) ? 1 : 0);
      pixels[row * 8 + col] = ci;
    }
  }
  return pixels;
}

export function decodeMDTileLinear(data, offset) {
  const pixels = new Uint8Array(64);
  for (let i = 0; i < 32; i++) {
    const b = data[offset + i];
    pixels[i * 2] = (b >> 4) & 0x0F;
    pixels[i * 2 + 1] = b & 0x0F;
  }
  return pixels;
}

export function mdColorToRGBA(word) {
  const r = ((word >> 1) & 0x0E) * 18;
  const g = ((word >> 5) & 0x0E) * 18;
  const b = ((word >> 9) & 0x0E) * 18;
  return (r << 16) | (g << 8) | b;
}

export function parseROM(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

  const systemType = new TextDecoder().decode(data.slice(0x100, 0x110)).replace(/\0/g, '').trim();
  const title = new TextDecoder().decode(data.slice(0x120, 0x150)).replace(/\0/g, '').trim();

  let romEnd = data.length;
  for (let addr = 0x1A4; addr < 0x1A8; addr += 2) {
    const v = view.getUint16(addr, false);
    if (v !== 0xFFFF && v > 0) {
      romEnd = Math.min((v + 1) * 0x80000, data.length);
    }
  }

  return { systemType, title, romEnd };
}

/**
 * 扫描 ROM 中可能包含 tile 数据的区域
 * 检查 32 字节对齐块的熵特征：
 * - 大量 0x00 的稀疏块 → 可能是空白 tile
 * - 重复字节模式 → 可能是数据表不是 tile
 * - 有规律的变化 → 可能是 tile 数据
 *
 * 返回候选地址列表：{ addr, score }  score 越高越像 tile 数据
 */
export function scanTileRegions(data, step = 0x1000) {
  const candidates = [];

  for (let addr = 0; addr < data.length - 256; addr += step) {
    let zeroCount = 0;
    let byteVals = new Set();

    for (let i = addr; i < Math.min(addr + 256, data.length); i++) {
      if (data[i] === 0) zeroCount++;
      byteVals.add(data[i]);
    }

    // 跳过全0区域
    if (zeroCount > 240) continue;

    // 检查是否为线性/规律性数据（tile 特征）
    const variety = byteVals.size;
    let score = 0;

    // tile 数据通常有适中的字节种类（不会太单一，也不会太随机）
    if (variety >= 8 && variety <= 200) score += 2;

    // 检查 4 字节行模式（planar tile 格式特征）
    let planarScore = 0;
    for (let row = 0; row < 8 && addr + row * 4 + 32 <= data.length; row++) {
      const base = addr + row * 4;
      const b0 = data[base], b1 = data[base + 1], b2 = data[base + 2], b3 = data[base + 3];
      const sum = b0 + b1 + b2 + b3;
      if (sum > 0) planarScore++;
    }
    score += planarScore;

    // 连续的 tile 数据区域特征
    if (score >= 5) {
      candidates.push({ addr, score });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, 30);
}

/**
 * 扫描可能的调色板位置
 */
export function scanPalettes(data) {
  const candidates = [];
  for (let addr = 0; addr < data.length - 128; addr += 2) {
    let valid = 0;
    let maxChannel = 0;
    for (let i = 0; i < 64 && addr + i * 2 + 1 < data.length; i++) {
      const w = (data[addr + i * 2] << 8) | data[addr + i * 2 + 1];
      const r = (w >> 1) & 0xE;
      const g = (w >> 5) & 0xE;
      const b = (w >> 9) & 0xE;
      maxChannel = Math.max(maxChannel, r, g, b);
      if ((w & 0xE000) === 0 && (r + g + b > 0 || valid > 0)) valid++;
    }
    if (valid >= 48) {
      candidates.push({ addr, valid, maxChannel });
    }
    if (candidates.length >= 20) break;
  }
  candidates.sort((a, b) => b.valid - a.valid);
  return candidates;
}

export function loadPalette(data, addr, count) {
  const pal = new Uint32Array(count);
  for (let i = 0; i < count && addr + i * 2 + 1 < data.length; i++) {
    const w = (data[addr + i * 2] << 8) | data[addr + i * 2 + 1];
    pal[i] = mdColorToRGBA(w);
  }
  return pal;
}

export function hexDump(data, addr, lines = 16) {
  let out = '';
  for (let l = 0; l < lines && addr + l * 16 < data.length; l++) {
    out += addr.toString(16).padStart(6, '0').toUpperCase() + ': ';
    for (let i = 0; i < 16 && addr + l * 16 + i < data.length; i++) {
      out += data[addr + l * 16 + i].toString(16).padStart(2, '0').toUpperCase() + ' ';
    }
    out += '\n';
  }
  return out;
}

export const L2_CLASSES = [
  { id: 0x00, name: '战士' },{ id: 0x01, name: '领主' },{ id: 0x02, name: '剑士统帅' },
  { id: 0x03, name: '骑士' },{ id: 0x04, name: '骑士统帅' },{ id: 0x05, name: '圣骑士' },
  { id: 0x06, name: '魔法师' },{ id: 0x07, name: '大魔法师' },{ id: 0x08, name: '召唤师' },
  { id: 0x09, name: '僧侣' },{ id: 0x0A, name: '主教' },{ id: 0x0B, name: '圣者' },
  { id: 0x0C, name: '盗贼' },{ id: 0x0D, name: '刺客' },{ id: 0x0E, name: '忍者' },
  { id: 0x0F, name: '弓兵' },{ id: 0x10, name: '狙击手' },{ id: 0x11, name: '龙骑士' },
  { id: 0x12, name: '龙骑统帅' },{ id: 0x13, name: '飞龙骑士' },{ id: 0x14, name: '飞龙统帅' },
  { id: 0x15, name: '水兵' },{ id: 0x16, name: '水兵统帅' },{ id: 0x17, name: '天使' },
  { id: 0x18, name: '大天使' },{ id: 0x19, name: '恶魔' },{ id: 0x1A, name: '大恶魔' },
  { id: 0x1B, name: '幽灵' },{ id: 0x1C, name: '吸血鬼' },{ id: 0x1D, name: '骷髅' },
  { id: 0x1E, name: '石像鬼' },
];
