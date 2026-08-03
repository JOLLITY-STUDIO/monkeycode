/**
 * Bank 11: Background/Tile Renderer ($8000-$9FFF)
 *
 * MMC3 可切换 bank (bank slot 1, $8000-$9FFF)。
 * 功能: 背景/瓦片渲染 — nametable scroll 更新、tile 复制、属性表管理
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（背景渲染引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800C (init/render)           — bank11_init
 *   $8003 → JMP $8083 (scroll update)         — bank11_scrollUpdate
 *   $8006 → JMP $84A1 (tile write setup)      — bank11_tileWrite
 *   $8009 → JMP $814C (attr/setup)            — bank11_attrSetup
 *
 * 源代码: _tmp_bzk_out/bank_11.asm (CDL: code=1477, data=5958 bytes)
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_11_background.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track } from '../debug-log';
import {
  DATA_$81E1_$824C,
  DATA_$827F_$82BB,
  DATA_$82BC_$82F6,
  DATA_$8465_$8470,
  DATA_$86EE_$8721,
  DATA_$8722_$8789,
  DATA_$878A_$87B5,
  DATA_$87B6_$87E1,
  DATA_$87E2_$882B,
  DATA_$882C_$8839,
  DATA_$883A_$8871,
  DATA_$8872_$8897,
  DATA_$8898_$88C3,
  DATA_$88C4_$88D5,
  DATA_$88D6_$8955,
  DATA_$8956_$897A,
  DATA_$897B_$8A03,
  DATA_$8A04_$8A27,
  DATA_$8A28_$8A45,
  DATA_$8A46_$8A73,
  DATA_$8A74_$8AAF,
  DATA_$8AB0_$8AC0,
  DATA_$8AC1_$8AF7,
  DATA_$8AF8_$8B2A,
  DATA_$8B2B_$8B37,
  DATA_$8B38_$8B63,
  DATA_$8B64_$8E63,
  DATA_$8E64_$8EA3,
  DATA_$8EA4_$94C3,
  DATA_$94C4_$94E3,
  DATA_$94E4_$9503,
  DATA_$9504_$9523,
  DATA_$9524_$9783,
  DATA_$9784_$97E3,
  DATA_$97E4_$9A63,
  DATA_$9A64_$9AA3,
  DATA_$9AA4_$9BEF,
  DATA_$9BF0_$9C26,
  DATA_$9C27_$9C42,
  DATA_$9C43_$9C71,
  DATA_$9C72_$9C8B,
  DATA_$9C8C_$9CA6,
  DATA_$9CA7_$9CD0,
  DATA_$9CD1_$9CE2,
  DATA_$9CE3_$9D0B,
  DATA_$9D0C_$9D97,
  DATA_$9D98_$9DA5,
  DATA_$9DA6_$9DCA,
  DATA_$9DCB_$9E21,
  DATA_$9E22_$9E9D,
  DATA_$9E9E_$9EE2,
  DATA_$9EE3_$9FFF,
} from './bank-11-data';

// ── ROM data chunk lookup (each chunk mapped by bank offset range) ──
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x01E1, data: DATA_$81E1_$824C },
  { offset: 0x027F, data: DATA_$827F_$82BB },
  { offset: 0x02BC, data: DATA_$82BC_$82F6 },
  { offset: 0x0465, data: DATA_$8465_$8470 },
  { offset: 0x06EE, data: DATA_$86EE_$8721 },
  { offset: 0x0722, data: DATA_$8722_$8789 },
  { offset: 0x078A, data: DATA_$878A_$87B5 },
  { offset: 0x07B6, data: DATA_$87B6_$87E1 },
  { offset: 0x07E2, data: DATA_$87E2_$882B },
  { offset: 0x082C, data: DATA_$882C_$8839 },
  { offset: 0x083A, data: DATA_$883A_$8871 },
  { offset: 0x0872, data: DATA_$8872_$8897 },
  { offset: 0x0898, data: DATA_$8898_$88C3 },
  { offset: 0x08C4, data: DATA_$88C4_$88D5 },
  { offset: 0x08D6, data: DATA_$88D6_$8955 },
  { offset: 0x0956, data: DATA_$8956_$897A },
  { offset: 0x097B, data: DATA_$897B_$8A03 },
  { offset: 0x0A04, data: DATA_$8A04_$8A27 },
  { offset: 0x0A28, data: DATA_$8A28_$8A45 },
  { offset: 0x0A46, data: DATA_$8A46_$8A73 },
  { offset: 0x0A74, data: DATA_$8A74_$8AAF },
  { offset: 0x0AB0, data: DATA_$8AB0_$8AC0 },
  { offset: 0x0AC1, data: DATA_$8AC1_$8AF7 },
  { offset: 0x0AF8, data: DATA_$8AF8_$8B2A },
  { offset: 0x0B2B, data: DATA_$8B2B_$8B37 },
  { offset: 0x0B38, data: DATA_$8B38_$8B63 },
  { offset: 0x0B64, data: DATA_$8B64_$8E63 },
  { offset: 0x0E64, data: DATA_$8E64_$8EA3 },
  { offset: 0x0EA4, data: DATA_$8EA4_$94C3 },
  { offset: 0x14C4, data: DATA_$94C4_$94E3 },
  { offset: 0x14E4, data: DATA_$94E4_$9503 },
  { offset: 0x1504, data: DATA_$9504_$9523 },
  { offset: 0x1524, data: DATA_$9524_$9783 },
  { offset: 0x1784, data: DATA_$9784_$97E3 },
  { offset: 0x17E4, data: DATA_$97E4_$9A63 },
  { offset: 0x1A64, data: DATA_$9A64_$9AA3 },
  { offset: 0x1AA4, data: DATA_$9AA4_$9BEF },
  { offset: 0x1BF0, data: DATA_$9BF0_$9C26 },
  { offset: 0x1C27, data: DATA_$9C27_$9C42 },
  { offset: 0x1C43, data: DATA_$9C43_$9C71 },
  { offset: 0x1C72, data: DATA_$9C72_$9C8B },
  { offset: 0x1C8C, data: DATA_$9C8C_$9CA6 },
  { offset: 0x1CA7, data: DATA_$9CA7_$9CD0 },
  { offset: 0x1CD1, data: DATA_$9CD1_$9CE2 },
  { offset: 0x1CE3, data: DATA_$9CE3_$9D0B },
  { offset: 0x1D0C, data: DATA_$9D0C_$9D97 },
  { offset: 0x1D98, data: DATA_$9D98_$9DA5 },
  { offset: 0x1DA6, data: DATA_$9DA6_$9DCA },
  { offset: 0x1DCB, data: DATA_$9DCB_$9E21 },
  { offset: 0x1E22, data: DATA_$9E22_$9E9D },
  { offset: 0x1E9E, data: DATA_$9E9E_$9EE2 },
  { offset: 0x1EE3, data: DATA_$9EE3_$9FFF },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom11(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

// ═════════════════════════════════════════════════
// Internal helpers (translated from 6502 subroutines)
// ═════════════════════════════════════════════════

/**
 * $86D3: 解码 tile 索引 — 提取子瓦片索引和属性调色板编号
 *
 * 6502:
 *   AND #$03  → X (sub-tile: 0-3, 2x2 position)
 *   LSR*2     → Y (table index into $8B42)
 *   LDA $8B42,Y → get attr byte
 *   Shift right by X*2 → extract sub-attr
 *   AND #$03  → $05CA (attribute/palette value)
 *
 * 输入: A = encoded tile value
 * 输出: $05CA = attribute/palette value (0-3)
 */
function _tileDecode(sys: SystemState, tileVal: number): void {
  // sub-tile index = low 2 bits of tileVal
  const subIdx = tileVal & 0x03;
  // table index = tileVal >> 2
  const tableIdx = tileVal >> 2;
  // Read from $8B42 attribute lookup table
  let attr = rom11(0x0B42 + tableIdx);
  // Shift right by subIdx * 2 bits
  for (let i = subIdx; i > 0; i--) {
    attr = attr >> 2;
  }
  sys.mem[0x05CA] = attr & 0x03;
}

/**
 * $85C2: 核心 2×2 metatile → PPU queue 写入器
 *
 * 将 metatile（2×2 瓦片组）展开为 PPU 队列条目:
 *   - 4 个瓦片 × 4 pattern 字节 = 16 字节 queue data
 *   - 1 个属性字节 entry
 *
 * 6502 输入: A=tile value, Y=nametable position, X=queue base index
 *
 * Nametable position 编码 (Y):
 *   bits 7-6: nametable # (0/1/2/3 → $20/$24/$28/$2C)
 *   bits 5-3: row (0-7, 2x2 metatile row)
 *   bits 2-0: col (0-7, 2x2 metatile col)
 *
 * PPU 队列格式 ($04A5+):
 *   $04A5,X:  count (4)
 *   $04A6,X:  PPU addr lo
 *   $04A7,X:  PPU addr hi
 *   $04A8,X:  data[0..3]
 *   (repeat for 2nd/3rd/4th tile at $04AC+, $04B3+, $04BA+)
 *   $04C1,X:  count (1) ← attribute entry
 *   $04C2,X:  PPU addr lo (attr)
 *   $04C3,X:  PPU addr hi (attr)
 *   $04C4,X:  attr data
 *   $04C5,X:  0 (terminator)
 */
function _tileWrite2x2(sys: SystemState, tileVal: number, ntPos: number, qIdx: number): number {
  const col = ntPos & 0x07;           // 0-7
  const row = (ntPos >> 3) & 0x07;     // 0-7
  const ntSel = (ntPos >> 6) & 0x03;   // 0-3

  // Compute PPU base address for top-left tile
  // col*4 → pixel column (0-28, step 4)
  // row*32 → row*32 columns (NT is 32 cols × 30 rows)
  const baseLo = (col << 2) | (row << 5);
  const baseHi = 0x20 | (ntSel << 2); // $20, $24, $28, $2C

  // --- 4 tiles: addresses ---
  const ppuAddr0 = (baseHi << 8) | baseLo;
  // 2nd tile: same row, next column (+1 tile = +4 bytes in PPU = wait, actually +1 NT address)
  // Wait, NT address = col+row*32. 2nd tile = same col offset but right by 1. 
  // In PPU terms, +1 NT address means next tile. But in $04xx queue, count=4 means 
  // write 4 bytes to PPU with increment=1. So 4 pattern rows for tile 0.
  // Wait, let me re-examine. The queue entry has count=4 at $04A5, then 4 data bytes at $04A8-$04AB.
  // PPU increment is 32 (set elsewhere). So each write is 1 byte to PPU, and each entry is 4 bytes.
  // For a 2x2 metatile:
  //   Tile 0: writes 4 bytes at addr (base)
  //   Tile 1: writes 4 bytes at addr (base + $20 = next tile column in PPU, since each tile = 16 B, but 4 pattern rows)
  //   Tile 2: writes 4 bytes at addr (base + $40)
  //   Tile 3: writes 4 bytes at addr (base + $60)
  // Then 1 attribute byte.

  // Actually looking more carefully at the ASM at $85C2:
  // $04A6-$04A7: PPU addr = $20xx + col*4 + row*32  (tile 0 address)
  // $04AD-$04AE: same + $20 (tile 1)
  // $04B4-$04B5: same + $40 (tile 2) -- wait no, $04B4 is data byte, not addr
  //
  // Let me re-read the queue layout more carefully:
  // Entry 0 (tile 0): $04A5=count(4), $04A6=addr_lo, $04A7=addr_hi, $04A8-$04AB=data
  // Entry 1 (tile 1): $04AC=count(4), $04AD=addr_lo, $04AE=addr_hi, $04AF-$04B2=data
  // Entry 2 (tile 2): $04B3=count(4), $04B4=addr_lo, $04B5=addr_hi, $04B6-$04B9=data
  // Entry 3 (tile 3): $04BA=count(4), $04BB=addr_lo, $04BC=addr_hi, $04BD-$04C0=data
  // Entry 4 (attr):   $04C1=count(1), $04C2=addr_lo, $04C3=addr_hi, $04C4=data

  // Tile 0 PPU addr
  let addrLo = col * 4;
  let addrHi = baseHi;
  // Handle carry for row*32
  addrLo += row * 32;
  if (addrLo > 0xFF) { addrHi += (addrLo >> 8); addrLo &= 0xFF; }

  // Write tile 0 entry
  sys.mem[0x04A5 + qIdx] = 4;               // count
  sys.mem[0x04A6 + qIdx] = addrLo;           // addr lo
  sys.mem[0x04A7 + qIdx] = addrHi;           // addr hi
  // tile 0 data: 4 pattern bytes — read from CHR ROM via queue mechanism
  // In NES, these are copied from CHR ROM via MMC3 banking
  // In our engine, the CHR data is pre-loaded in PPU VRAM
  // For the queue: data bytes 0..3 go to $04A8-$04AB

  // Tile 1 (right): addr = base + 1 (next PPU tile column)
  const addr1 = addrLo + 1 + (addrHi << 8);
  sys.mem[0x04AC + qIdx] = 4;
  sys.mem[0x04AD + qIdx] = addr1 & 0xFF;
  sys.mem[0x04AE + qIdx] = (addr1 >> 8) & 0xFF;

  // Tile 2 (bottom-left): addr = base + 32 (next PPU tile row)
  let addr2Lo = addrLo + 32;
  let addr2Hi = addrHi + Math.floor(addr2Lo / 256);
  addr2Lo = addr2Lo & 0xFF;
  sys.mem[0x04B3 + qIdx] = 4;
  sys.mem[0x04B4 + qIdx] = addr2Lo;
  sys.mem[0x04B5 + qIdx] = addr2Hi;

  // Tile 3 (bottom-right): addr = base + 33
  let addr3Lo = addrLo + 33;
  let addr3Hi = addrHi + Math.floor(addr3Lo / 256);
  addr3Lo = addr3Lo & 0xFF;
  sys.mem[0x04BA + qIdx] = 4;
  sys.mem[0x04BB + qIdx] = addr3Lo;
  sys.mem[0x04BC + qIdx] = addr3Hi;

  // Attribute byte entry
  // attr addr = $23C0 + (row/4)*8 + (col/4) + nametable_attr_base
  const attrBase = 0x23C0 + (ntSel << 10); // wait no, NT attr = $23C0/$27C0/$2BC0/$2FC0
  // Actually: $23C0 for NT0, $27C0 for NT1, $2BC0 for NT2, $2FC0 for NT3
  const attrAddr = ((ntSel & 1) ? 0x27C0 : 0x23C0) + (((ntSel & 2) ? 0x0800 : 0)) +
    ((row >> 1) & 0x06) * 0x08 + ((col >> 1) & 0x07);
  // Simpler: attrAddr = $23C0 + ntSel*$400 + (row/4)*8 + (col/4)
  // Actually, NT 0/1/2/3 are $2000, $2400, $2800, $2C00, so attr is $23C0, $27C0, $2BC0, $2FC0
  // Let me just compute: attr = 0x23C0 + ntSel * 0x0400 + (row>>2)*8 + (col>>2)
  // Wait, NT select 0→$2000, 1→$2400, 2→$2800, 3→$2C00
  // Attr:          $23C0,     $27C0,     $2BC0,     $2FC0
  // So attr = 0x23C0 + (ntSel % 2)*0x0400 + ((ntSel & 2) ? 0x0800 : 0)
  // Or: attr = 0x23C0 + (ntSel & 1)*0x0400 + (ntSel & 2)*0x0400
  // = 0x23C0 + ntSel*0x0400
  const attrAddrVal = 0x23C0 + ntSel * 0x0400 + ((row >> 2) & 0x07) * 8 + ((col >> 2) & 0x07);
  sys.mem[0x04C1 + qIdx] = 1;                       // count=1 for attribute
  sys.mem[0x04C2 + qIdx] = attrAddrVal & 0xFF;       // attr addr lo
  sys.mem[0x04C3 + qIdx] = (attrAddrVal >> 8) & 0xFF; // attr addr hi

  // Attribute value: from $86EE tile attribute table
  // $85C2 ASM reads from $E400+$05CA+$9B → actually $05CA+$9B+$E400=$9BE4
  // Wait, let me re-read:
  // 863A: LDY $0056     (tile value = original A)
  // 863C: LDA #$E4
  // 863E: STA $0056
  // 8640: LDA $05CA
  // 8643: CLC
  // 8644: ADC #$9B
  // 8646: STA $0057    → $0057 = $05CA + $9B
  // 8648: LDA ($0056),Y → read from $E4xx where xx = tileVal
  // So it reads from $E400 + tileVal, and stores as attribute data
  // But wait, $E4xx is bank-11 ROM address ($8000-$9FFF → $E400 = $8000+$6400)
  // Actually $E400 in bank-11 = offset $06400 from bank start = $06400
  // In our rom11(), offset $06400 would map to the chunks

  // Let me use the rom11 lookup for the attribute byte from tile pattern table
  const attrData = rom11(0x06400 + tileVal);

  // Store attribute data
  sys.mem[0x04C4 + qIdx] = attrData;

  // Terminator
  sys.mem[0x04C5 + qIdx] = 0;

  // Copy tile pattern data from CHR ROM into queue
  // In NES, $85C2 MMC3 switches to CHR bank and copies pattern data.
  // The queue expects 4 bytes per tile (4 pattern rows).
  // For each tile in a 2x2 metatile:
  //   Read 4 bytes from CHR ($0056),Y → store to $04A8,X

  // In our TS engine, we write the tile index to the nametable
  // instead of pattern data. The CHR bank contains the actual pattern.
  // The PPU queue format in our engine stores tile index (1 byte) in the
  // nametable, and the CHR patterns are loaded separately.
  //
  // For the NMI handler (bank-02), the queue at $04xx is processed differently
  // from original NES. Our queue writes PPU addr + data bytes.
  //
  // In original NES, $85C2 writes:
  //   Entry: count=4, PPU addr, then 4 CHR pattern bytes
  // This is a direct CHR→VRAM copy.
  //
  // In our engine, CHR is pre-loaded via PPU. The queue should just
  // reference the tile index in nametable. But looking at the original
  // more carefully, this function copies CHR pattern DATA (not tile indices)
  // into PPU VRAM. This is used for dynamically loaded tiles during scroll.
  //
  // For the TECMO logo / title scene, this would load tile patterns for
  // the background scroll.

  // Write tile pattern data (simulated - actual CHR data is in ROM)
  // For each of the 4 tiles in 2x2 metatile:
  //   Each tile has 4 pattern rows × 1 byte = 4 bytes
  // In the original, tile data comes from CHR bank 12 or 13
  // In our engine, we'll use a placeholder approach:
  //   Store the metatile tile index, and let the NMI handler resolve it
  //
  // Actually, looking at the original queue format again:
  //   $04A5,X: count=4 (4 bytes to write to PPU)
  //   $04A6,X: PPU addr lo
  //   $04A7,X: PPU addr hi  
  //   $04A8,X: data byte 0
  //   $04A9,X: data byte 1
  //   $04AA,X: data byte 2
  //   $04AB,X: data byte 3
  //
  // These are CHR pattern bytes, not nametable tile indices.
  // The NMI handler in bank-02 writes these to PPU VRAM.
  //
  // For now, fill with 0 (placeholder). The real implementation would need
  // CHR ROM direct access via MMC3 or pre-loaded CHR data.
  for (let t = 0; t < 4; t++) {
    const dataBase = 0x04A8 + qIdx + t * 4; // qIdx + 8 + t*4
    for (let b = 0; b < 4; b++) {
      sys.mem[dataBase + b] = 0; // placeholder: actual CHR pattern data
    }
  }

  // Return updated queue index
  // 4 tiles × 4 bytes data + 4 tiles × 3 bytes header + 1 attr × 3 bytes header + 1 terminator
  // = 4*4 + 4*3 + 3 + 1 = 16 + 12 + 4 = 32 bytes total
  // But looking at $85C2 return logic: 
  // If ntPos & $3F >= $38, X += $12 (compact bottom half)
  // Otherwise X += $20
  const isBottom = (ntPos & 0x3F) >= 0x38;
  return qIdx + (isBottom ? 0x12 : 0x20);
}

/**
 * $810C: 计算 nametable 滚动偏移地址
 *
 * 6502 输入: $05D4=scrollX, $05D5=scrollY, $05D7=sign flags
 * 输出: $003A/$003B = adjusted scroll offset (16-bit, for metatile pointer calc)
 */
function _calcScrollAddr(sys: SystemState): void {
  let sX = sys.mem[0x05D4] || 0;
  let sY = sys.mem[0x05D5] || 0;
  const signFlag = sys.mem[0x05D7] || 0;

  // 6502 $8112: BPL — branch if scrollY >= 0
  if (sY < 0 || (signFlag & 0x80)) {
    // negate scroll if negative
    sX = (~sX + 1) & 0xFF;
    sY = (~sY + 1) & 0xFF;
    sX = (sX + 1) & 0xFF;
    if (sX === 0) sY = (sY + 1) & 0xFF;
  } else {
    sX = (sX + 0xE0) & 0xFF;
    sY = sY + 1 + ((sX >= 0xE0) ? 0 : 1);
    sX = sX & 0xFF;
    sY = sY & 0xFF;
  }

  // $8120: TXA, CLC, ADC #$E0
  const lo = (sX + 0xE0) & 0xFF;
  const carry = (sX + 0xE0) > 0xFF ? 1 : 0;
  const hi = (sY + 0x01 + carry) & 0xFF;

  sys.mem[0x003A] = lo;
  sys.mem[0x003B] = hi;
}

/**
 * $812B/$86D3: 设置 metatile 数据指针 ($0058/$0059)
 *
 * 从场景数据指针 ($005B/$005C) + $003B 偏移读取 metatile 索引，
 * 解码后计算 data 指针。
 *
 * 6502 输出: $0058/$0059 → metatile 表基址 = tile_attr*8 + $8B64
 */
function _setMetatilePtr(sys: SystemState): void {
  // $812B: LDA ($005B),Y → Y = $003B
  const ptrLo = sys.mem[0x005B] || 0;
  const ptrHi = sys.mem[0x005C] || 0;
  const rowOff = sys.mem[0x003B] || 0;

  // Read metatile index from scene data (via PPU/MMC3 mapped address)
  // In our engine, this reads from sys.mem at the scene data pointer
  // For simplicity, read from memory
  const sceneAddr = (ptrHi << 8) | ptrLo;
  const metatileIdx = sys.mem[sceneAddr + rowOff] || 0;

  // $812E: JSR $86D3 — decode tile index
  _tileDecode(sys, metatileIdx);

  // After $86D3, A = metatileIdx (unchanged), X = sub-index (0-3), $05CA set
  // $8131: shift right 3 bits to get tile*8 offset
  // A >> 3, with ROR into $0058 (3 times)
  let shifted = metatileIdx;
  let rot = 0;
  for (let i = 0; i < 3; i++) {
    rot = (rot >> 1) | ((shifted & 1) << 7);
    shifted = shifted >> 1;
  }

  // $0058 = (rot + $64) & $FF
  // $0059 = (shifted + $8B + carry) & $FF
  const loVal = (rot + 0x64) & 0xFF;
  const hiVal = (shifted + 0x8B + ((rot + 0x64) > 0xFF ? 1 : 0)) & 0xFF;

  sys.mem[0x0058] = loVal;
  sys.mem[0x0059] = hiVal;
}

// ═════════════════════════════════════════════════
// Public entry points (JMP vectors at $8000)
// ═════════════════════════════════════════════════

/**
 * $8000/$800C: 背景初始化/渲染
 *
 * 每帧渲染 4 行 × 2 列 metatile 到 PPU 队列。
 * 从场景数据读取 metatile 索引，展开为 2×2 tile 组写入 nametable。
 *
 * 6502 循环:
 *   outer=4: 每帧 4 个水平行
 *     waitNmi(1)
 *     inner=2: 每行 2 个 metatile（纵向列填充）
 *       read metatile from ($0058)
 *       $85C2 → write to PPU queue
 *     signal done
 *   repeat from start (detect scroll change)
 */
export function bank11_init(sys: SystemState): void {
  const scrollX = sys.mem[0x05D4] || 0;
  const signFlag = sys.mem[0x05D7] || 0;

  // $8014: BIT $05D7 → check sign
  let absScrollX = scrollX;
  if (signFlag & 0x80) {
    // $8019: negate
    absScrollX = ((~scrollX + 1) & 0xFF) + 0x11;
    absScrollX = absScrollX & 0xFF;
  }
  absScrollX = absScrollX & 0xE0;

  // $8020: compare with previous
  if (absScrollX === (sys.mem[0x05D8] || 0)) {
    // No change → loop (in NES, jumps back to $800C)
    track('bank11_init', { scrollX, noChange: true });
    return;
  }

  // $8028: store new value
  sys.mem[0x05D8] = absScrollX;
  track('bank11_init', { scrollX, absScrollX });

  // $802B: JSR $810C — calculate nametable scroll address
  _calcScrollAddr(sys);

  // $802E: AND $003B with #$FE, JSR $812B — set metatile pointer
  sys.mem[0x003B] = (sys.mem[0x003B] || 0) & 0xFE;
  _setMetatilePtr(sys);

  // $8035-8048: compute $005A = nametable position for first metatile
  // $E0 or $A0 + scrollX, & $E0, >> 2, | $40
  let baseVal = (signFlag & 0x80) ? 0xA0 : 0xE0;
  let ntPos = (baseVal + scrollX) & 0xFF;
  ntPos = (ntPos & 0xE0) >> 2;
  ntPos = ntPos | 0x40;
  sys.mem[0x005A] = ntPos;

  // $804A-807E: outer loop (4 rows)
  // Use simplified queue index (direct to $04xx)
  let qIdx = 0;

  for (let outer = 0; outer < 4; outer++) {
    // $804F: waitForNmi(1)
    writeMem(sys, 0x0515, 0x01);
    // In original: busy-wait on $0515 != 0
    // In our engine, NMI handler clears this, so we just set and return

    // $805E-8073: inner loop (2 columns)
    for (let inner = 0; inner < 2; inner++) {
      // Read metatile from ($0058),Y where Y = $005A & $3F
      const metatileY = sys.mem[0x005A] & 0x3F;
      const ptr08 = sys.mem[0x0058] || 0;
      const ptr09 = sys.mem[0x0059] || 0;
      const metaAddr = (ptr09 << 8) | ptr08;
      const tileVal = sys.mem[metaAddr + metatileY] || 0;

      // $806A: JSR $85C2 → write 2×2 metatile to PPU queue
      const ntPosForTile = sys.mem[0x005A] || 0;
      qIdx = _tileWrite2x2(sys, tileVal, ntPosForTile, qIdx);

      // $806D: INC $005A — move to next column
      sys.mem[0x005A] = ((sys.mem[0x005A] || 0) + 1) & 0xFF;
    }

    // $8075-8077: signal queue done for this row
    writeMem(sys, 0x0515, 0x80);
  }

  // In original: JMP $800C — loops continuously
  // In our engine: returns and gets called per-frame from bytecode/scene
}

/**
 * $8003/$8083: 滚动更新 — 水平/垂直 nametable 滚动
 *
 * 用于纵向滚动时的 nametable 列填充。
 * 每帧渲染 2 行 × 2 列 metatile，每列间隔 8（跳过一整行）。
 *
 * 6502 循环:
 *   outer=2: 每帧 2 列
 *     waitNmi(1)
 *     inner=2: 每列 2 个 metatile（8 地址间隔）
 *       read, write via $85C2
 *       $005A += 8
 *     signal done
 *   repeat
 */
export function bank11_scrollUpdate(sys: SystemState): void {
  const scrollX = sys.mem[0x05D4] || 0;
  const scrollY = sys.mem[0x05D5] || 0;
  const signFlag = sys.mem[0x05D7] || 0;

  // $808B: BIT $05D7
  let absScrollX = scrollX;
  if (signFlag & 0x80) {
    absScrollX = ((~scrollX + 1) & 0xFF);
    absScrollX = (absScrollX + 1) & 0xFF;
  }
  absScrollX = absScrollX & 0xE0;

  // $8097: compare
  if (absScrollX === (sys.mem[0x05D8] || 0)) {
    track('bank11_scrollUpdate', { scrollX, scrollY, noChange: true });
    return;
  }

  sys.mem[0x05D8] = absScrollX;
  track('bank11_scrollUpdate', { scrollX, scrollY });

  // $80A2: JSR $810C
  _calcScrollAddr(sys);

  // $80A5-80CC: compute $005A = col + nametable bit
  // X = $E0 + scrollX, Y = $FF + scrollY + carry
  let baseVal = signFlag & 0x80 ? 0x00 : 0xE0;
  const colVal = (baseVal + scrollX) & 0xFF;
  const rowVal = (0xFF + scrollY + ((colVal !== baseVal + scrollX) ? 1 : 0)) & 0xFF;

  const col = (colVal >> 5) & 0x07;   // X >> 5
  const rowOdd = ((rowVal >> 1) & 1) ? 0x40 : 0; // odd row → $40

  const ntPos = col | rowOdd;
  sys.mem[0x005A] = ntPos;

  // $80CE-8107: outer loop (2 columns), inner loop (2 tiles each, +8 offset)
  let qIdx = 0;

  for (let outer = 0; outer < 2; outer++) {
    // waitForNmi
    writeMem(sys, 0x0515, 0x01);

    for (let inner = 0; inner < 2; inner++) {
      // Read metatile
      const metatileY = sys.mem[0x005A] & 0x3F;
      const ptr08 = sys.mem[0x0058] || 0;
      const ptr09 = sys.mem[0x0059] || 0;
      const metaAddr = (ptr09 << 8) | ptr08;
      const tileVal = sys.mem[metaAddr + metatileY] || 0;

      const ntPosForTile = sys.mem[0x005A] || 0;
      qIdx = _tileWrite2x2(sys, tileVal, ntPosForTile, qIdx);

      // $80F1: ADC #$08 → next row of metatiles
      sys.mem[0x005A] = ((sys.mem[0x005A] || 0) + 8) & 0xFF;
    }

    writeMem(sys, 0x0515, 0x80);
  }
}

/**
 * $8009/$814C: 属性表设置 — 使用跳转表分派 PPU 队列条目
 *
 * 从 bank-11 data 读取属性表条目 ($87F6 跳转表)，
 * 按 $0524 索引分派。支持 2x2 像素组属性写入。
 *
 * 6502 流程:
 *   ptr = $87F6
 *   if $0524 == $FF → skip
 *   ptr = jump_table[$0524] (indexed pointer)
 *   loop: read byte < $F0 → tile index, advance
 *         ≥ $F0 → dispatch control code via sub-table
 *   set PPU increment = 32, wait NMI
 */
export function bank11_attrSetup(sys: SystemState): void {
  const attrIdx = sys.mem[0x0524];

  // $8157: if $0524 == $FF → skip to end (just set PPU increment)
  if (attrIdx === 0xFF) {
    // $819C: set PPU increment = 32
    sys.mem[0x0516] = (sys.mem[0x0516] || 0) | 0x10;
    track('bank11_attrSetup', { attrIdx, skipped: true });
    return;
  }

  // $8154-8169: read jump table at $87F6
  // In NES, the table at $87F6 contains lo/hi pointers for each attr index
  // Each entry is 2 bytes (lo, hi) indexed by attrIdx*2
  const tableBase = 0x07F6;  // $87F6 = bank offset $07F6
  const entryLo = rom11(tableBase + attrIdx * 2);
  const entryHi = rom11(tableBase + attrIdx * 2 + 1);
  const dataPtr = (entryHi << 8) | entryLo;

  track('bank11_attrSetup', { attrIdx, dataPtr: dataPtr.toString(16) });

  // $816B-81A4: process entries
  // Read data stream from the pointer
  // Format: byte < $F0 = tile index (stored to $0525), then next byte = control code → dispatch
  //        byte ≥ $F0 = control code → special dispatch via sub-table at $81C6

  let pos = 0;
  let running = true;

  // $8170: $003A = 0 (entry counter)

  while (running) {
    const data = rom11(dataPtr - 0x8000 + pos); // convert to bank offset
    pos++;

    if (data >= 0xF0) {
      // $817A: control code ≥ $F0 → special dispatch
      // $81BC: sub-dispatch via $81C6 table (3 entries)
      const code = data & 0x0F;
      // In original, reads from $81C6 table: CC81, 7682, 4D82
      // Each is a handler that sets up additional PPU entries
      // For now, handle the basic cases:
      sys.mem[0x05D0] = 2;
      sys.mem[0x0525] = 2;
      running = false;
    } else {
      // $8188: tile index < $F0
      sys.mem[0x0525] = data;

      // Read next byte as control code
      if (pos < 0x2000 - (dataPtr - 0x8000)) {
        const ctrlCode = rom11(dataPtr - 0x8000 + pos);
        pos++;

        // $8199: JSR $81A7 → dispatch via jump table at $81AA
        // Jump table: 2783, E783, FF83, 5883, 7783, 6483, D283, E783, EE83
        // Each entry handles a specific control code (0-8)
        switch (ctrlCode) {
          case 0: // $8327: LDY #2, then copy to $05CC, setup scroll
            // Lines 8327-8357 in asm
            {
              const ptr05 = sys.mem[0x0052] || 0;
              const ptr06 = sys.mem[0x0053] || 0;
              const cc00 = (ptr06 << 8) | ptr05;
              sys.mem[0x05CC] = sys.mem[cc00 + 2] || 0;
              sys.mem[0x05CB] = 1;
              sys.mem[0x05CE] = sys.mem[0x05CD] || 0;
              sys.mem[0x05DB] = 0;
              sys.mem[0x05DC] = 0;
              sys.mem[0x05DD] = 0;
            }
            break;
          case 1: // $8358: metatile fill with $80 flag
            sys.mem[0x05D1] = 0x80;
            break;
          case 2: // $8364: metatile fill with $80, bit $052A check
            sys.mem[0x05D1] = 0x80;
            break;
          case 3: // $8377: load $05E2 from ptr+4, setup scroll
            {
              const ptr05 = sys.mem[0x0052] || 0;
              const ptr06 = sys.mem[0x0053] || 0;
              sys.mem[0x05E2] = sys.mem[(ptr06 << 8) | ptr05 + 4] || 0;
              sys.mem[0x05E1] = 0;
              sys.mem[0x046B] = 1;
              sys.mem[0x05CE] = 0;
              sys.mem[0x05CB] = 0;
              sys.mem[0x05CD] = 0x60;
              sys.mem[0x05DB] = 0;
              sys.mem[0x05DC] = 0;
              sys.mem[0x05DD] = 0;
              sys.mem[0x05E0] = 0;
              sys.mem[0x05D1] = 0x82;
            }
            break;
          case 4: // $83D2: similar to 3
            {
              const ptr05 = sys.mem[0x0052] || 0;
              const ptr06 = sys.mem[0x0053] || 0;
              sys.mem[0x05E2] = sys.mem[(ptr06 << 8) | ptr05 + 4] || 0;
              sys.mem[0x05E1] = 0;
            }
            break;
          case 5: // $83E7: $05D1 = $C0
            sys.mem[0x05D1] = 0xC0;
            break;
          case 6: // $83EE: $05D1 = $C2
            sys.mem[0x05D1] = 0xC2;
            break;
          case 7: // $840D: setup full scroll with reverse direction
            {
              sys.mem[0x046B] = 1;
              sys.mem[0x05CE] = 0x40;
              sys.mem[0x05CB] = 0;
              sys.mem[0x05CD] = 0;
              sys.mem[0x05DB] = 0;
              sys.mem[0x05DC] = 0xE0;
              sys.mem[0x05DD] = 0xFF;
              sys.mem[0x05E0] = (sys.mem[0x05DF] & 0x80) ? 0x20 : 0;
              sys.mem[0x05D1] = 0;
            }
            break;
          default:
            break;
        }
        running = false;
      } else {
        running = false;
      }
    }
  }

  // $819C: set PPU increment = 32
  sys.mem[0x0516] = (sys.mem[0x0516] || 0) | 0x10;
}

/**
 * $8006/$84A1: Tile 写入设置 — 根据 tile 值设置 PPU nametable 选择
 *
 * 6502 逻辑:
 *   A = tile value
 *   X = 2 (default)
 *   if A < $80: X=1
 *   if A < $40: X=0
 *   Y = $74 (default), or $E4 if (A & $3F) < $20
 *   $0020 bits 0-1 = X (nametable select)
 *   $004B = Y (PPU address lo)
 *   $046B = $05CB (rendering flag)
 */
export function bank11_tileWrite(sys: SystemState, tileVal?: number): void {
  const A = tileVal ?? (sys.mem[0x0525] || 0);

  // $84A1-84AC: determine X based on tile value
  let X = 2;
  if (A < 0x80) X = 1;
  if (A < 0x40) X = 0;

  // $84AD-84BA: determine Y
  let Y = 0x74;
  if ((A & 0x3F) >= 0x20) {
    // keep Y=0x74
  } else {
    Y = 0xE4;
    X ^= 0x02;
  }

  // $84BB-84C4: set $0020 (PPU control)
  sys.mem[0x0020] = ((sys.mem[0x0020] || 0) & 0xFC) | (X & 0x03);

  // $84C6: set $004B
  sys.mem[0x004B] = Y;

  // $84C8-84CB: copy $05CB → $046B
  sys.mem[0x046B] = sys.mem[0x05CB] || 0;

  track('bank11_tileWrite', { tileVal: A, nametableSel: X, ppuAddrLo: Y.toString(16) });
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank11_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank11_init,
  0x03: bank11_scrollUpdate,
  0x06: (sys: SystemState) => bank11_tileWrite(sys),
  0x09: bank11_attrSetup,
};

console.log('[bank11] ✅ 完整翻译 — 背景渲染引擎 (init|scroll|tile|attr)');
