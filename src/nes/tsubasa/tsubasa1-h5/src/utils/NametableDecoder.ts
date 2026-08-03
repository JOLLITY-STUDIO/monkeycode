/**
 * Nametable RLE 解码器
 * 对应 Bank 1 中的 $C2C2 解码逻辑
 *
 * 数据格式 (从 $C2C2 函数分析):
 *   1. 字节 < $80 或 = $FF: 直接写入 PPU (单个 tile)
 *   2. 字节 >= $80 且 != $FF: 
 *      - bit0-4 = count (重复次数)
 *      - 下一字节 = 要重复的 tile 值
 *      - 将下一个 byte 重复 count 次
 *   3. 每 0x10 字节作为一批, 写入 VRAM
 *   4. 起始 VRAM 地址: $20A8 (nametable 0, 偏移 0xA8)
 *   5. 共 0x0E 行 (每行 32 tiles, 但每批 16 tiles)
 *   6. 然后 0x04 行写入属性表 ($23C0)
 *
 * 调用关系:
 *   Bank 1 $C070: LDA $7A → JSR $C2C2
 *   $C2C2: JSR $C3BA (设置指针), JSR $8011 (初始化 $033B/$033C)
 *   → 从 $D0F3 表读取数据指针
 *   → 解码数据到 $033D 缓冲区
 *   → JSR $802F (写入 PPU)
 */

export interface NametableData {
  /** 960 字节名称表 (32×30 tiles) */
  tiles: Uint8Array;
  /** 64 字节属性表 */
  attrs: Uint8Array;
  /** 调色板数据 (32 字节) */
  palettes?: Uint8Array;
}

/**
 * RLE 解码 Nametable 数据
 * 
 * @param data 压缩的原始数据
 * @param ntBaseAddr VRAM 起始地址 (默认 $20A8)
 * @returns 解码后的名称表数据
 */
export function decodeNametableRLE(
  data: Uint8Array, 
  ntBaseAddr: number = 0x20A8
): NametableData {
  const tiles = new Uint8Array(960);
  const attrs = new Uint8Array(64);
  
  let srcIdx = 0;
  let batch: number[] = [];
  let ntOffset = ntBaseAddr & 0x3FF; // 名称表内偏移
  let row = 0;
  const maxRows = 0x0E; // 14 行
  
  while (srcIdx < data.length && row < maxRows) {
    const b = data[srcIdx++];
    
    if (b < 0x80 || b === 0xFF) {
      // 直接写入
      batch.push(b);
    } else {
      // RLE: bit0-4 = count
      const count = b & 0x1F;
      if (srcIdx < data.length) {
        const val = data[srcIdx++];
        for (let i = 0; i < count; i++) {
          batch.push(val);
        }
      }
    }
    
    // 每 16 字节一批写入 VRAM
    while (batch.length >= 16) {
      for (let i = 0; i < 16; i++) {
        const tgt = ntOffset + i;
        if (tgt < 960) {
          tiles[tgt] = batch[i];
        }
      }
      batch = batch.slice(16);
      
      ntOffset += 16;
      if (ntOffset >= 960) {
        ntOffset -= 960;
        row++;
        if (row >= maxRows) break;
      }
    }
  }
  
  // 属性表解码 (剩余数据, 4 批, 每批 4 字节)
  let attrIdx = 0;
  // 属性表从 VRAM $23C0 开始, 每 8 字节对应一行
  // 格式待完全验证，先用直接填充
  while (srcIdx + 4 <= data.length && attrIdx < 64) {
    for (let i = 0; i < 4 && srcIdx < data.length; i++, srcIdx++) {
      if (attrIdx < 64) {
        attrs[attrIdx++] = data[srcIdx];
      }
    }
    // 每行属性表 8 字节
    attrIdx = ((attrIdx + 7) & ~7);
  }
  
  return { tiles, attrs };
}

/**
 * 解码 OAM/Sprite 数据 ($C259 解码器)
 * 
 * 格式:
 *   第一字节低4位 = sprite数量
 *   每个 sprite 4字节: Y, tile#, attribute, X
 * 
 * @param data 原始 sprite 数据
 * @returns sprite 数组 [{y, tile, attr, x}, ...]
 */
export function decodeSpriteData(data: Uint8Array): Array<{y: number; tile: number; attr: number; x: number}> {
  const sprites: Array<{y: number; tile: number; attr: number; x: number}> = [];
  let idx = 0;
  
  while (idx < data.length) {
    const count = data[idx] & 0x0F;
    if (count === 0) {
      idx++;
      continue;
    }
    idx++;
    
    for (let i = 0; i < count && idx + 3 < data.length; i++) {
      sprites.push({
        y: data[idx],
        tile: data[idx + 1],
        attr: data[idx + 2],
        x: data[idx + 3] + 8, // 调整 X 偏移
      });
      idx += 4;
    }
  }
  
  return sprites;
}

/**
 * 解码 PPU 缓冲区数据
 * 对应 $C3CE 解码器和 $C259 写入器
 * 
 * 格式 (从 $C259 分析):
 *   读取指针指向的数据:
 *     - byte 0: count (低4位 = 条目数)
 *     - 每个条目:
 *       - byte 0: X 坐标偏移
 *       - byte 1: tile 索引
 *       - byte 2: 属性 (bit7-6=调色板, bit5=优先级, bit3-2=翻转)
 *   写入到 OAM 区域 ($0200)
 */
export interface PpuTransferCommand {
  address: number;   // VRAM 地址
  data: Uint8Array;  // 数据
  isVertical: boolean;
}

export function decodePpuCommands(
  data: Uint8Array, 
  srcPtr: number = 0
): PpuTransferCommand[] {
  const commands: PpuTransferCommand[] = [];
  let idx = srcPtr;
  
  while (idx < data.length) {
    // 读取 PPU 地址 (2字节, 大端)
    if (idx + 2 >= data.length) break;
    const addrHi = data[idx++];
    const addrLo = data[idx++];
    const addr = (addrHi << 8) | addrLo;
    
    // 读取长度
    if (idx >= data.length) break;
    const length = data[idx++];
    
    if (length === 0) break;
    
    // 读取数据
    const cmdData = data.slice(idx, idx + length);
    idx += length;
    
    const isVertical = (addr & 0x2000) !== 0;
    
    commands.push({
      address: addr,
      data: new Uint8Array(cmdData),
      isVertical,
    });
  }
  
  return commands;
}

/**
 * 生成测试的 tile 图案填充 (用于验证渲染管道)
 */
export function generateTestPattern(): NametableData {
  const tiles = new Uint8Array(960);
  const attrs = new Uint8Array(64);
  
  for (let i = 0; i < 960; i++) {
    tiles[i] = i & 0xFF;
  }
  for (let i = 0; i < 64; i++) {
    attrs[i] = (i & 3);
  }
  
  return { tiles, attrs };
}
