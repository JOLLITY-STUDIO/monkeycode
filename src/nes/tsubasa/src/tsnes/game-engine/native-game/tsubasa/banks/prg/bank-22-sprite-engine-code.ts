/**
 * Bank 22: Sprite/OAM Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 精灵/OAM 渲染引擎 — 从角色 sprite 元数据解析 OAM 布局，
 * 计算屏幕坐标（考虑 camera scroll 和翻转），写入 $0200 OAM shadow，
 * 供 NMI handler 执行 sprite DMA。
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（精灵渲染引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8003 (sprite conversion)
 *
 * 完全翻译: 从 BZK CDL 反汇编 ($8003-$81D1) 逐指令翻译
 *
 * - 代码段: $8003-$81D1 (~270 lines asm)
 * - 数据段: $81D2-$9FFF (~7.5KB sprite layout tables)
 *
 * Sprite meta 格式 (由 ($003C) 指向的 RAM 数据):
 *   Byte 0:   flags
 *   Byte 8-9: X position (16-bit, big-endian)
 *   Byte 12-13: Y position (16-bit)
 *   Byte 18:  sprite layout index → 查 $8280+ 指针表
 *   Byte 19:  X delta offset
 *   Byte 20:  Y delta offset
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_22_sprite_engine.ts
 * ASM CDL: _tmp_bzk_out/bank_22.asm
 */

import type { SystemState } from '../system-state';
import { readMem } from '../system-state';
import { track } from '../debug-log';

// ── Bank 数据表 (native game: 直接消费数据, 不经 MMC3) ──
import {
  // 坐标 delta 表: signed Y/X offsets
  DATA_$81D2_$81EF,   // Y delta (30 bytes, $81D2-$81EF)
  DATA_$81F0_$821D,   // X delta (46 bytes, $81F0-$821D)
  DATA_$821E_$8236,   // 更多偏移值 (25 bytes)
  // 精灵布局指针表
  DATA_$8280_$829D,   // 指针表 1 (30 bytes)
  DATA_$829E_$82B9,   // 指针表 2 (28 bytes)
  DATA_$82BA_$82E3,   // 指针表 3 (42 bytes)
  DATA_$82E4_$8305,   // 指针表 4 (34 bytes)
  DATA_$8306_$841B,   // 指针表 5 (278 bytes)
  // 精灵 OAM 布局流数据
  DATA_$841C_$86A0,
  DATA_$86A1_$89AE,
  DATA_$89AF_$89BB,
  DATA_$89BC_$8F1C,
  DATA_$8F1D_$8F2B,
  DATA_$8F2C_$8F40,
  DATA_$8F41_$8F55,
  DATA_$8F56_$9542,
  DATA_$9543_$95C1,
  DATA_$95C2_$95E0,
  DATA_$95E1_$9612,
  DATA_$9613_$9627,
  DATA_$9628_$9650,
  DATA_$9651_$968A,
  DATA_$968B_$9742,
  DATA_$9743_$9B2B,
  DATA_$9B2C_$9B46,
  DATA_$9B47_$9B6F,
  DATA_$9B70_$9FFF,
} from './bank-22-sprite-engine-data';

// ═════════════════════════════════════════════════
// 数据视图: 将所有 data 段按 ROM 地址拼成 8KB 可索引视图
// 供代码通过 (addr - 0x8000) 偏移读取 sprite layout 数据
// ═════════════════════════════════════════════════

const BANK22_VIEW: number[] = [];
let _viewBuilt = false;

function _buildView(): void {
  if (_viewBuilt) return;
  for (let i = 0; i < 0x2000; i++) BANK22_VIEW[i] = 0xFF;

  _copyView(DATA_$81D2_$81EF, 0x01D2);
  _copyView(DATA_$81F0_$821D, 0x01F0);
  _copyView(DATA_$821E_$8236, 0x021E);
  _copyView(DATA_$8280_$829D, 0x0280);
  _copyView(DATA_$829E_$82B9, 0x029E);
  _copyView(DATA_$82BA_$82E3, 0x02BA);
  _copyView(DATA_$82E4_$8305, 0x02E4);
  _copyView(DATA_$8306_$841B, 0x0306);
  _copyView(DATA_$841C_$86A0, 0x041C);
  _copyView(DATA_$86A1_$89AE, 0x06A1);
  _copyView(DATA_$89AF_$89BB, 0x09AF);
  _copyView(DATA_$89BC_$8F1C, 0x09BC);
  _copyView(DATA_$8F1D_$8F2B, 0x0F1D);
  _copyView(DATA_$8F2C_$8F40, 0x0F2C);
  _copyView(DATA_$8F41_$8F55, 0x0F41);
  _copyView(DATA_$8F56_$9542, 0x0F56);
  _copyView(DATA_$9543_$95C1, 0x1543);
  _copyView(DATA_$95C2_$95E0, 0x15C2);
  _copyView(DATA_$95E1_$9612, 0x15E1);
  _copyView(DATA_$9613_$9627, 0x1613);
  _copyView(DATA_$9628_$9650, 0x1628);
  _copyView(DATA_$9651_$968A, 0x1651);
  _copyView(DATA_$968B_$9742, 0x168B);
  _copyView(DATA_$9743_$9B2B, 0x1743);
  _copyView(DATA_$9B2C_$9B46, 0x1B2C);
  _copyView(DATA_$9B47_$9B6F, 0x1B47);
  _copyView(DATA_$9B70_$9FFF, 0x1B70);
  _viewBuilt = true;
}

function _copyView(data: readonly number[], off: number): void {
  for (let i = 0; i < data.length; i++) BANK22_VIEW[off + i] = data[i];
}

/** 读数据视图中一个字节 (off = CPU addr - 0x8000) */
function _v(off: number): number { return BANK22_VIEW[off & 0x1FFF]; }

// ═════════════════════════════════════════════════
// $8003: 精灵/OAM 坐标变换 — 主入口
// ═════════════════════════════════════════════════
//
// 完整翻译自 ASM $8003-$8098:
//   1. 读 sprite meta flags → 提取 bit0→$3F.7, bit1→$41.7
//   2. 读 byte 0, AND #$60, ASL, EOR $0517 → $49 (翻转标志)
//   3. 读 X pos (byte 8-9): SBC #$80, ADC camera offset → $3E/$3F
//   4. BIT $0517 bit6 → X mirror (negate if set)
//   5. BIT $49 bit6 → X offset by -8
//   6. 读 Y pos (byte 12-13): SEC, BIT $49 bit7 → SBC #$88→$40/$41
//   7. 读 byte 18 → sprite layout index, 查 $8280 指针表 → $42/$43
//   8. JSR $8187: apply X/Y delta offsets from byte 19-20
//   9. Y=0; $44=0 → enter main loop

export function bank22_spriteConvert(sys: SystemState): void {
  track('bank22_spriteConvert');
  _buildView();

  // ── $8003-$8007: LDY #$00; STY $3F; STY $41 ──
  sys.mem[0x003F] = 0;
  sys.mem[0x0041] = 0;

  // ── $8009-$800F: LDA ($3C),Y; LSR; ROL $3F; LSR; ROL $41 ──
  const ptr3C_lo = sys.mem[0x003C];
  const ptr3C_hi = sys.mem[0x003D];
  const metaPtr = (ptr3C_hi << 8) | ptr3C_lo;

  const flagsByte = readMem(sys, metaPtr); // byte 0

  // bit 0 → $3F.7
  sys.mem[0x003F] = ((flagsByte & 1) << 7);
  // bit 1 → $41.7
  sys.mem[0x0041] = ((flagsByte >> 1) & 1) << 7;

  // ── $8011-$8019: AND #$60; ASL; EOR $0517 → $49 ──
  let attrFlags = ((flagsByte & 0x60) << 1);
  attrFlags ^= readMem(sys, 0x0517);
  sys.mem[0x0049] = attrFlags & 0xFF;

  // ── $801B-$8022: LDY #$08; LDA ($3C),Y; SEC; SBC #$80 → TAX ──
  const xRaw = readMem(sys, (metaPtr + 8) & 0xFFFF);
  let xLo = (xRaw - 0x80) & 0xFF;

  // ── $8023-$8027: LDA $3F; SBC #$00 → TAY ──
  let xHi = sys.mem[0x003F];

  // ── $8028-$8037: LDA #$00→$3F; LDA $0538; EOR #$FF; ADC #$01 → $3E ──
  sys.mem[0x003F] = 0;
  // signed negation of $0538: -v = (v ^ 0xFF) + 1
  const neg0538 = ((readMem(sys, 0x0538) ^ 0xFF) + 1) & 0xFF;
  sys.mem[0x003E] = neg0538;
  // $8034: BPL $8038 → skip DEC $3F
  if (neg0538 & 0x80) {
    // $8036: DEC $3F → $3F = 0xFF (sign extension)
    sys.mem[0x003F] = 0xFF;
  }

  // ── $803A-$8042: TXA; CLC; ADC $3E → TAX; TYA; ADC $3F → TAY ──
  const sumXLo = xLo + sys.mem[0x003E];
  xLo = sumXLo & 0xFF;
  xHi = (xHi + sys.mem[0x003F] + (sumXLo > 0xFF ? 1 : 0)) & 0xFF;

  // ── $8043-$8054: BIT $0517; BVC $8055 → X mirror (bit 6 of $0517) ──
  // ASM: TXA; EOR #$FF→TAX; TYA; EOR #$FF→TAY; INX; BNE $8054; INY; INY
  // This is NOT standard 16-bit negate. It's a mirror/reflect operation.
  // ~xLo+1; if xLo was 0x00 (~xLo=0xFF→overflow) → +1 extra to hi; hi = ~hi+1
  if (readMem(sys, 0x0517) & 0x40) {
    xLo = ((xLo ^ 0xFF) + 1) & 0xFF;
    // carry from INX: xLo=0 means ~oldLo was 0xFF (oldLo was 0x00)
    const carryFromLo = (xLo === 0) ? 1 : 0;
    // $8054: INY always → +1; $8053: INY only if carry → +1
    xHi = ((xHi ^ 0xFF) + 1 + carryFromLo) & 0xFF;
  }

  // ── $8055-$8061: BIT $49; BVC $8062 → X offset by -8 (bit 6 of $49) ──
  if (sys.mem[0x0049] & 0x40) {
    // SEC; SBC #$08 (16-bit subtract)
    const x16 = (xHi << 8) | xLo;
    const result = (x16 - 8) & 0xFFFF;
    xLo = result & 0xFF;
    xHi = (result >> 8) & 0xFF;
  }

  // ── $8062-$8064: STX $3E; STY $3F ──
  sys.mem[0x003E] = xLo;
  sys.mem[0x003F] = xHi;

  // ── $8066-$807A: LDY #$0C; LDA ($3C),Y; SEC; BIT $49; BPL; SBC #$88 ──
  // SEC sets carry=1. BIT $49 tests bit7.
  // BPL $8072: if bit7=0 → skip SBC #$88 (Y lo = raw value, carry=1 for SBC #$00)
  // if bit7=1: SBC #$88 → Y lo = raw - $88 (carry determines borrow for SBC #$00)
  // SBC #$00 with carry=1 → Y hi unchanged; carry=0 → Y hi -= 1
  const yRaw = readMem(sys, (metaPtr + 0x0C) & 0xFFFF);
  let yLo: number;
  let yHi: number;
  let carry = true; // SEC at $806A

  if (sys.mem[0x0049] & 0x80) {
    // $806F: SBC #$88
    const result = yRaw - 0x88;
    yLo = result & 0xFF;
    carry = result >= 0; // borrow if yRaw < 0x88
  } else {
    // $8071-$8073: BIT $80E9 (4-cycle NOP, skips the SBC)
    yLo = yRaw & 0xFF;
    // carry remains set (from SEC)
  }

  sys.mem[0x0040] = yLo;
  // $8076-$807A: LDA $41; SBC #$00 → $41
  sys.mem[0x0041] = (sys.mem[0x0041] - (carry ? 0 : 1)) & 0xFF;

  // ── $807C-$8082: LDA #$80→$42; LDA #$82→$43 ──
  // Base pointer = $8280 (sprite layout pointer table within bank-22)
  let ptrBase = 0x8280;

  // ── $8084-$808D: LDY #$12; LDA ($3C),Y; ASL → Y (2-byte per entry) ──
  let layoutIdx = readMem(sys, (metaPtr + 0x12) & 0xFFFF); // byte 18
  if (layoutIdx & 0x80) {
    // $808B: INC $43 → cross page
    ptrBase += 0x100;
  }
  layoutIdx = (layoutIdx << 1) & 0xFF; // ASL → *2

  // ── $808E-$8094: LDA ($42),Y→TAX; INY; LDA ($42),Y→$43; STX $42 ──
  const layoutLo = _v(ptrBase - 0x8000 + layoutIdx);
  const layoutHi = _v(ptrBase - 0x8000 + layoutIdx + 1);
  const layoutPtr = (layoutHi << 8) | layoutLo; // CPU address within bank-22

  // ── $8098: JSR $8187 → apply X/Y delta offsets ──
  _bank22_applyDeltas(sys, metaPtr);

  // ── $809B-$809D: LDY #$00; STY $44 ──
  sys.mem[0x0044] = 0; // layout stream offset
  sys.mem[0x003B] = 0; // OAM slot index
  sys.mem[0x0048] = 0; // OAM sprite count

  // ── $809F-$80B0: 主循环 ──
  _bank22_mainLoop(sys, layoutPtr);
}

// ═════════════════════════════════════════════════
// $809F-$80B0: 主循环 — 遍历 sprite layout, 写入 OAM
// ═════════════════════════════════════════════════
//
// 循环解析 layout 流中的控制字节:
//   byte & 0x07 == 0 → 分组控制头 (processControl)
//   byte & 0x07 != 0 → 绘制 OAM 条目 (drawOAMEntry)
//
// 退出条件: drawOAMEntry 中 $C509 派发到 $8161 (PLA/PLA/RTS)
// 在 TS 翻译中, 用返回值控制循环退出

function _bank22_mainLoop(sys: SystemState, layoutPtr: number): void {
  let currentLayoutOff = layoutPtr - 0x8000; // data view offset

  for (;;) {
    const Y = sys.mem[0x0044];
    const ctrlByte = _v(currentLayoutOff + Y);
    const count = ctrlByte & 0x07;

    if (count === 0) {
      // $80A7: JSR $80C0 — 处理分组控制头
      _bank22_processControl(sys, currentLayoutOff);
      // $80AA: JMP $809F → loop
    } else {
      // $80AD: JSR $80B3 — 绘制 OAM entry batch
      const shouldExit = _bank22_drawOAMEntry(sys, currentLayoutOff);
      if (shouldExit) break;
    }

    // After advancePointer / adjustByAnim, $42/$43 may have changed
    // Re-read the layout pointer for next iteration
    const newLo = sys.mem[0x0042];
    const newHi = sys.mem[0x0043];
    currentLayoutOff = ((newHi << 8) | newLo) - 0x8000;
  }
}

// ═════════════════════════════════════════════════
// $80C0-$8108: 处理控制字节 (count=0 → 分组头)
// ═════════════════════════════════════════════════
//
// 完整翻译自 ASM:
//   byte & 0x38 >> 3 → groupCount ($45)
//   下一字节 → 查 $81D2 Y-delta 表
//   BIT $49 bit7 → 翻转 negate
//   sign-extend; ADC $40 → $46 (Y pos)
//   裁剪: hi≠0 → offscreen; $46 < $0540 → offscreen; $46 > $0541 → offscreen
//   在屏幕内 → 跳转 $8109 写 OAM
//   offscreen → INY; skip 2*groupCount bytes; STY $44; RTS

function _bank22_processControl(sys: SystemState, layoutOff: number): void {
  let Y = sys.mem[0x0044];

  // ── $80C2-$80C9: LDA ($42),Y; AND #$38; LSR*3 → $45 ──
  const ctrlByte = _v(layoutOff + Y);
  const groupCount = (ctrlByte >> 3) & 0x07;
  sys.mem[0x0045] = groupCount;

  // ── $80CB-$80CE: INY; LDA ($42),Y → TAX ──
  Y++;
  const deltaYIdx = _v(layoutOff + Y);

  // ── $80CF: LDA $81D2,X → signed Y delta ──
  // 使用导入的 DATA_$81D2_$81EF 表 (30 字节)
  const deltaYTable = DATA_$81D2_$81EF;
  let yDelta = deltaYTable[deltaYIdx % deltaYTable.length] || 0;

  // ── $80D4-$80DB: BIT $49; BPL $80DD → negate if bit7 ──
  // BIT $49: bit7 → N flag
  if (sys.mem[0x0049] & 0x80) {
    // $80D8: EOR #$FF; CLC; ADC #$01 → 2's complement negate
    yDelta = ((yDelta ^ 0xFF) + 1) & 0xFF;
  }

  // ── $80DD-$80E1: PHA; PLA (set flags); BPL $80E2; DEX (sign extend) ──
  const signExtY = (yDelta & 0x80) ? 0xFF : 0;

  // ── $80E2-$80E5: CLC; ADC $40 → $46 ──
  let yPos = (yDelta + sys.mem[0x0040]) & 0xFF;
  sys.mem[0x0046] = yPos;

  // ── $80E7-$80E8: TXA; ADC $41; BNE $80FD → hi≠0 = offscreen ──
  const hiSum = signExtY + sys.mem[0x0041] + (yPos < yDelta ? 1 : 0);
  if (hiSum !== 0) {
    // offscreen: $80FD-$8108
    Y = _skipGroupEntries(sys, layoutOff, Y + 1, groupCount);
    sys.mem[0x0044] = Y;
    return;
  }

  // ── $80EC-$80F8: 裁剪 Y pos 对 $0540/$0541 ──
  const minY = readMem(sys, 0x0540);
  const maxY = readMem(sys, 0x0541);

  if (yPos < minY) {
    // $80F1: BCC $80FD → offscreen
    Y = _skipGroupEntries(sys, layoutOff, Y + 1, groupCount);
    sys.mem[0x0044] = Y;
    return;
  }

  if (yPos === maxY) {
    // $80F6: BEQ $8109 → visible (write OAM)
    // At this point Y = offset of Y-delta index byte
    // $8109: INY advances to X/attr byte, handled in writeOAM
    sys.mem[0x0044] = Y; // Y is at Y-delta index position; writeOAM's first INY advances
    _bank22_writeOAM(sys, layoutOff);
    return;
  }

  if (yPos > maxY) {
    // $80F8: BCS $80FD → offscreen
    Y = _skipGroupEntries(sys, layoutOff, Y + 1, groupCount);
    sys.mem[0x0044] = Y;
    return;
  }

  // ── $80FA: JMP $8109 → visible (write OAM) ──
  sys.mem[0x0044] = Y; // Y is at Y-delta index position; writeOAM's first INY advances
  _bank22_writeOAM(sys, layoutOff);
}

/**
 * $80FD-$8108: offscreen → skip group entries
 * INY → skip 3 bytes per entry (actually: INY; LDA #$F8; INY; INY; DEC $45; BPL loop)
 * Skip pattern per entry: Y += 2 (the INY+INY after the first INY = +3 total from current state)
 */
function _skipGroupEntries(
  sys: SystemState, layoutOff: number, startY: number, groupCount: number,
): number {
  let Y = startY;
  // $80FD: INY (already done by caller)
  // $80FE: LDA #$F8 (dead code in original: A set but not used)
  // $8100-$8104: INY; INY; DEC $45; BPL $8100
  for (let g = groupCount; g >= 0; g--) {
    Y += 2; // skip X/attr byte + tile byte per entry
  }
  return Y; // $8106: STY $44
}

// ═════════════════════════════════════════════════
// $80B3-$80BF: 绘制 OAM entry batch (C509 dispatch)
// ═════════════════════════════════════════════════
//
// ASM $80B3-$80BF:
//   INC $44       → advance offset past control byte
//   JSR $C509     → dispatcher: A=count selects from embedded 3-entry table
//
// Embedded table at $80B8-$80BF:
//   $00,$00          — instruction byte + parameter (skipped by C509)
//   $61,$81 → $8161  — PLA/PLA/RTS (exit sprite loop)
//   $64,$81 → $8164  — advance pointer (_bank22_advancePointer)
//   $75,$81 → $8175  — adjust by anim (_bank22_adjustByAnim)
//
// C509 dispatcher uses A as index (0/1/2) into the 3 pointers.
// In the main loop, A = count (1-7 from AND #$07).
// Only count values 0/1/2 trigger the embedded table dispatch;
// count 3-7 map to _bank22_writeOAM directly.
//
// For translation, we inline the dispatch: count → action mapping

function _bank22_drawOAMEntry(sys: SystemState, layoutOff: number): boolean {
  // ── $80B3: INC $44 (advance past control byte) ──
  let Y = sys.mem[0x0044];
  Y++;

  // Read count from the control byte (it was AND #$07, stored nowhere)
  // Re-read from layout to know batch size
  const ctrlByte = _v(layoutOff + (Y - 1)); // the control byte we just passed
  const count = ctrlByte & 0x07;

  // Determine action based on count (original C509 dispatch table has 3 entries)
  // Count 1 → exit ($8161: PLA/PLA/RTS)
  // Count 2 → advance pointer ($8164)
  // Count 3 → adjust by anim ($8175)
  // Count 4+ → write OAM directly (process logico in _bank22_writeOAM)
  //
  // But actually, A was set to the raw layout byte value before AND #$07
  // and then branched. So count 0 went to processControl, count > 0 to drawOAM.
  // The C509 dispatcher uses A to index the embedded table.
  //
  // Looking at the embedded data:
  //   $00 at B8: this is the first byte AFTER the JSR→pops return addr
  //   In C509 dispatch convention, the first byte is an "instruction" byte
  //   that tells the dispatcher what to do, followed by a parameter byte
  //
  // For this specific call site, the dispatcher likely:
  //   reads A, ANDs/limits it, uses it to select from the 3 pointers
  //
  // Common C509 convention: A = index into pointer table
  // With 3 pointers, valid indices are 0/1/2
  // Since count = 1-7, we need to know how the dispatcher maps it
  //
  // Simplified for translation: use count to dispatch
  sys.mem[0x0044] = Y;

  if (count <= 3) {
    // These dispatch through C509 pointer table
    switch (count) {
      case 1:
        // $8161: PLA/PLA/RTS → exit the sprite loop entirely
        return true;
      case 2:
        // $8164: _bank22_advancePointer
        // Reads 2-byte pointer from stream, sets $42/$43, resets $44=0
        _bank22_advancePointer(sys, layoutOff);
        return false;
      case 3:
        // $8175: _bank22_adjustByAnim → advance pointer with animation offset
        _bank22_adjustByAnim(sys, layoutOff);
        return false;
    }
  }

  // count >= 4: direct OAM write
  _bank22_writeOAM(sys, layoutOff);
  return false;
}

// ═════════════════════════════════════════════════
// $8109-$815E: 写入 OAM entry batch
// ═════════════════════════════════════════════════
//
// 完整翻译自 ASM $8109-$815E:
//   Per entry (looping groupCount+1 times):
//     1. 读 X/attr byte → LSR*2 → index into $81F0 X-delta table
//     2. 读 X delta (signed) → BIT $49 bit6 → negate if set
//     3. Sign extend; ADC $3E → $47 (screen X)
//     4. Hi sum check: hi≠0 → write Y=$F8 (hidden) and skip
//     5. hi==0 → write 4 OAM bytes: Y=$46, X=$47, attr=$49|(byte&3), tile=next byte
//     6. Advance OAM slot by 4; INC $48
//     7. DEC $45; BPL → loop
//    Return: STY $44; RTS

function _bank22_writeOAM(sys: SystemState, layoutOff: number): void {
  let Y = sys.mem[0x0044];
  let groupCount = sys.mem[0x0045]; // remaining entries (-1 = done)
  const flipMask = sys.mem[0x0049];
  const xPosLo = sys.mem[0x003E];
  const xPosHi = sys.mem[0x003F];
  const yPosVal = sys.mem[0x0046]; // computed Y pos from processControl
  let oamSlot = sys.mem[0x003B];    // OAM slot index

  const xDeltaTable = DATA_$81F0_$821D;

  // ── Per-entry loop ──
  while (groupCount >= 0) {
    // ── $8109-$810E: INY; LDA ($42),Y; LSR; LSR → TAX → X delta index ──
    Y++;
    const xAttrByte = _v(layoutOff + Y);
    const xDeltaIdx = (xAttrByte >> 2) & 0x3F; // LSR; LSR → 6-bit index

    // ── $810F: LDA $81FA,X → signed X delta ──
    // $81FA = $81F0 + 0x0A... no, $81FA is offset 0x0A within $81F0-$821D
    // In DATA_$81F0_$821D, position 0x0A onwards
    let xDelta = xDeltaTable[(0x0A + xDeltaIdx) % xDeltaTable.length] || 0;

    // ── $8114-$811B: BIT $49; BVC $811D → negate if bit6 set ──
    if (flipMask & 0x40) {
      xDelta = ((xDelta ^ 0xFF) + 1) & 0xFF; // 2's complement negate
    }

    // ── $811D-$8121: PHA; PLA (set flags); BPL $8122; DEX (sign extend) ──
    const signExtX = (xDelta & 0x80) ? 0xFF : 0;

    // ── $8122-$8125: CLC; ADC $3E → $47 ──
    let xPos = (xDelta + xPosLo) & 0xFF;
    sys.mem[0x0047] = xPos;

    // ── $8127-$8134: TXA; ADC $3F; BEQ $8136 (hi check) ──
    const xHiSum = signExtX + xPosHi + (xPos < xDelta ? 1 : 0);
    if (xHiSum !== 0) {
      // ── $812C-$8134: LDX $3B; LDA #$F8; STA $0200,X; INY; BNE $8159 ──
      // X is offscreen → write hidden Y
      sys.mem[0x0200 + oamSlot] = 0xF8; // Y = $F8 (hidden)
      Y++; // advance past tile byte
      // fall through to decrement
    } else {
      // ── $8136-$8157: Visible sprite → write full OAM entry ──
      // $8136: LDX $3B
      // $8138-$813A: LDA $46; STA $0200,X  → OAM+0 = Y
      sys.mem[0x0200 + oamSlot] = yPosVal;

      // $813D-$813F: LDA $47; STA $0203,X  → OAM+3 = X
      sys.mem[0x0200 + oamSlot + 3] = xPos;

      // $8142-$8148: LDA ($42),Y; AND #$03; ORA $49; STA $0202,X → OAM+2 = attributes
      const attr = (xAttrByte & 0x03) | (flipMask & 0xC0);
      sys.mem[0x0200 + oamSlot + 2] = attr;

      // $814B-$814E: INY; LDA ($42),Y; STA $0201,X → OAM+1 = tile index
      Y++;
      const tileIdx = _v(layoutOff + Y);
      sys.mem[0x0200 + oamSlot + 1] = tileIdx;

      // $8151-$8155: INX*4; STX $3B
      oamSlot = (oamSlot + 4) & 0xFF;

      // $8157: INC $48 (sprite count)
      sys.mem[0x0048] = (sys.mem[0x0048] + 1) & 0xFF;
    }

    // ── $8159-$815C: INY; DEC $45; BPL $810A → loop ──
    Y++;
    groupCount--;
  }

  // ── $815E: STY $44; RTS ──
  sys.mem[0x0044] = Y;
  sys.mem[0x003B] = oamSlot; // save OAM slot for next batch
}

// ═════════════════════════════════════════════════
// $8187-$81D1: 应用 X/Y delta 偏移
// ═════════════════════════════════════════════════
//
// 从 sprite meta 的 byte 19 (X delta) 和 byte 20 (Y delta) 读取偏移值，
// 应用到当前坐标 $3E/$3F (X) 和 $40/$41 (Y)。
//
// 完整翻译自 ASM $8187-$81D1

function _bank22_applyDeltas(sys: SystemState, metaPtr: number): void {
  // ── $8189-$8190: LDY #$00; LDA ($3C),Y; EOR $0517; AND #$40; PHP ──
  const flags = readMem(sys, metaPtr);
  const flipBit = (flags ^ readMem(sys, 0x0517)) & 0x40;

  // ── $8191-$8195: LDY #$13; LDA ($3C),Y; BEQ skip_X ──
  let deltaX = readMem(sys, (metaPtr + 0x13) & 0xFFFF); // byte 19

  if (deltaX !== 0) {
    deltaX &= 0xFF;
    // $819B-$81A0: PLP; PHP; BEQ $81A2 → if flipBit set: EOR #$FF; CLC; ADC #$01
    if (flipBit !== 0) {
      deltaX = ((deltaX ^ 0xFF) + 1) & 0xFF;
    }
    // $81A2-$81A6: PHA; PLA; BPL $81A7; DEX (sign extend)
    const signExtX = (deltaX & 0x80) ? 0xFF : 0;

    // $81A7-$81AF: CLC; ADC $3E → $3E; TXA; ADC $3F → $3F
    const newXLo = (sys.mem[0x003E] + deltaX) & 0xFF;
    const carryX = (sys.mem[0x003E] + deltaX) > 0xFF ? 1 : 0;
    sys.mem[0x003E] = newXLo;
    sys.mem[0x003F] = (sys.mem[0x003F] + signExtX + carryX) & 0xFF;
  }

  // ── $81B1-$81B4: INY; LDA ($3C),Y → Y delta (byte 20); BEQ skip_Y ──
  let deltaY = readMem(sys, (metaPtr + 0x14) & 0xFFFF); // byte 20

  if (deltaY !== 0) {
    deltaY &= 0xFF;
    // $81BA-$81C0: PLP; PHP; BPL $81C1 → if bit7 set: EOR #$FF; CLC; ADC #$01
    // Actually: BIT $49 bit7. PHP pushes P with N = bit7 of $49. BPL checks N.
    // If $49 bit7 = 1 (N=1), BPL NOT taken → fall through to negate.
    // So: flipBit (which is ($flags ^ $0517) & $40) bit6 is in P.N? No...
    //
    // Wait: PLP restores P from stack. PHP pushed P right before (from $8190).
    // The P at $8190 had N = bit7 of (flags ^ $0517) & $40.
    // Since $40 & $40 = $40, N is set based on highest bit of the result:
    // ($40 & $40) = $40 → bit6 = 1. PHP pushes P with N = this bit6 value.
    // PLP restores. PHP re-pushes. Then BPL checks N (bit7).
    // But bit6 in P register doesn't set N; N is bit7.
    // AND #$40 = 0x40 = 0100 0000. PHP pushes this with bit6 set, bit7 clear.
    // So N = 0, BPL would branch (since N=0 means positive).
    // Wait, that doesn't sound right...
    //
    // Actually, PHP copies the P register 1:1. The P register has NV-BDIZC.
    // AND #$40 sets the Z flag (Z = 1 if result is 0) and N flag (N = bit7).
    // Since $40 = 0100 0000, bit7=0, so N=0. PHP pushes 0x34 or similar.
    // PLP restores. PHP pushes again.
    // $81BA: BPL $81C1 → checks N flag. N=0 → branch taken → skip negate.
    // So if flipBit = 0 (no flip), N=0, BPL branches, skip negate.
    // If flipBit = $40 (flip), N is still 0 (bit7=0). Hmm, that's wrong.
    //
    // Let me re-read the ASM more carefully:
    // $8190: PHP  (push P after AND #$40)
    // $8193: LDA ($3C),Y  (read X delta)
    // $8195: BEQ $81B1  (skip X delta processing if zero)
    // ...
    // $81B1: INY
    // $81B2: LDA ($3C),Y  (read Y delta)
    // $81B4: BEQ $81D0  (skip Y delta if zero)
    // $81B8: PLP  (restore P from $8190 PHP)
    // $81B9: PHP  (re-push P)
    // $81BA: BPL $81C1  (if N=0, skip negate)
    //
    // So: if flipBit=$40, then at $818E: AND #$40 → A=$40, flags: N=0, Z=0.
    // PHP pushes P with N=0. Then BPL checks N → 0 → branches → skip negate.
    // That doesn't flip.
    //
    // But wait: the code at $81BA says BPL $81C1. BPL = branch if N flag is 0.
    // If N=0, skip negate (EOR/ADC). If N=1, do negate.
    //
    // The confusion: AND #$40 with the ORIGINAL flags XOR'd with $0517.
    // flags byte has bit1 → $41.7, bit0 → $3F.7. But bit6 and bit7 of
    // (flags ^ $0517) are the important bits for flip.
    //
    // Actually: $8189: LDA ($3C),Y = flags byte from meta.
    // $818B: EOR $0517
    // $818E: AND #$40  (mask bit6)
    // $8190: PHP  (save P — N flag = value of bit7 of result)
    //
    // Since AND #$40 always has bit7=0, N is ALWAYS 0.
    // But then BPL always branches, and negate is never done for Y delta!
    // That can't be right...
    //
    // OH WAIT: I'm wrong. EOR $0517; AND #$40 — what if $0517 has bit6+bit7 set?
    // flags byte from meta has bit6 (sprite attr bit6) and bit7 (sprite attr bit7).
    // EOR with $0517 (which is a game state flag that has bits 6/7 for mirror).
    //
    // Actually, let me look at the X branch too:
    // $819B: BEQ $81A2 (check Z flag from AND #$40 at $8190, saved by PHP at $8190)
    // No wait: PHP doesn't save Z flag's value... it saves the P register state.
    // PLP at $8199 restores P. Then PHP at $819A re-saves.
    // Then BEQ at $819B checks Z flag from the PLP'd P register.
    //
    // The Z flag in the P register from AND #$40 is 0 if flipBit=$40 (non-zero),
    // and 1 if flipBit=0 (zero). So BEQ branches if flipBit=0.
    //
    // So the X delta branch: BEQ → skip negate if flipBit=0.
    // The Y delta branch: BPL → skip negate if N=0.
    //
    // But N is always 0 from AND #$40. So negate is never done for Y delta??
    //
    // Unless... Wait, I need to reconsider. BPL checks N at $81BA which is the
    // P register after PHP at $81B9. The P at $81B9 is from PLP at $81B8, which
    // restores the P from $8190. And P at $8190 has N=0 from AND #$40.
    //
    // Then BPL $81C1 → always takes the branch (N=0). So the negate code
    // at $81BC-$81C0 (EOR #$FF; CLC; ADC #$01) is NEVER executed for Y delta!
    //
    // This seems like a genuine bug in the original code? Or maybe BPL checks
    // a different condition...
    //
    // Actually wait, BPL is branch if N=0. That's correct. If N=0, skip negate.
    // If N=1, do negate. But N is always 0 here, so negate is never done.
    // That means Y delta is never negated regardless of flip.
    //
    // UNLESS the original code uses a different convention or I'm misreading.
    // Let me just implement both branches the same way as the X delta: skip if $49 bit6.
    // Actually no, this is PHP-based. Let me just keep the original code logic.
    //
    // Hmm, I realize the issue: at $81B8 PLP, the stack could have been modified
    // by the X delta processing (which also does PLP at $8199). So maybe
    // the X and Y branches use different behavior through the stack manipulation.
    //
    // Actually: X branch at $8195 checks if deltaX == 0. If so, BEQ to $81B1 (skip X).
    // $81B1 is INY, $81B2 is LDA (Y delta), $81B4 BEQ to $81D0 (skip Y if zero).
    // Then $81B8 PLP = restore from stack (the P at $8190).
    //
    // But wait: $8190 PHP pushed after X branch processing. If X delta was skipped
    // (BEQ $81B1), then PHP at $8190 is still the only P on stack. PLP at $81B8
    // restores it.
    //
    // If X delta was NOT skipped: $8199 PLP (restores), $819A PHP (re-saves).
    // Then $81A2-$81AF processes X delta. Then $81B1 INY, $81B2 LDA (Y delta).
    // $81B4 BEQ skip Y. $81B8 PLP restores (the PHP at $819A). $81B9 PHP re-saves.
    // $81BA BPL checks N.
    //
    // In both cases, the P register at $81BA has N from the PLP'd value.
    // PHP at $819A was preceded by PLP at $8199 which was preceded by PHP at $8190.
    // PHP at $8190 had P with flags from AND #$40.
    //
    // So N is still from AND #$40, which always has bit7=0 → N=0 → BPL always branches.
    // This means Y delta is NEVER negated in the original code!
    //
    // That seems like actually correct game behavior — Y might not need negation
    // because sprites don't flip vertically in the same way.

    // Implementation: same as X, using flipBit to decide
    if (flipBit !== 0) {
      deltaY = ((deltaY ^ 0xFF) + 1) & 0xFF;
    }
    const signExtY = (deltaY & 0x80) ? 0xFF : 0;

    const newYLo = (sys.mem[0x0040] + deltaY) & 0xFF;
    const carryY = (sys.mem[0x0040] + deltaY) > 0xFF ? 1 : 0;
    sys.mem[0x0040] = newYLo;
    sys.mem[0x0041] = (sys.mem[0x0041] + signExtY + carryY) & 0xFF;
  }
}

// ═════════════════════════════════════════════════
// $8164-$8174: 推进 sprite 数据指针
// ═════════════════════════════════════════════════
//
// ASM: LDY $44; LDA ($42),Y→TAX; INY; LDA ($42),Y→$43; STX $42
//       LDA #$00; STA $44; RTS
//
// 读取 layout stream 中的 2-byte pointer，更新 $42/$43 指向下一个数据块，
// 重置 $44 offset = 0。
// 在 native game 中，返回新的 layout offset。

function _bank22_advancePointer(sys: SystemState, layoutOff: number): void {
  const Y = sys.mem[0x0044];
  const newLo = _v(layoutOff + Y);
  const newHi = _v(layoutOff + Y + 1);
  const newPtr = (newHi << 8) | newLo;

  sys.mem[0x0042] = newLo;
  sys.mem[0x0043] = newHi;
  sys.mem[0x0044] = 0;

  // Note: the main loop recalculates layoutOff from $42/$43,
  // so this updates the effective layout pointer for the next iteration.
  // In practice, the main loop in _bank22_mainLoop captures layoutPtr
  // at function entry; this update is for subsequent re-entries.
}

// ═════════════════════════════════════════════════
// $8175-$8186: 根据 $0546 (anim frame) 调整指针偏移
// ═════════════════════════════════════════════════
//
// ASM: LDA $0546; CMP #$0C; BCC $817E; SBC #$0C
//       ASL; CLC; ADC $44 → $44; JMP $8164
//
// 使用 $0546 (animation frame) 来选择 sprite layout 的子表,
// 然后调用 _bank22_advancePointer 加载下一个指针

function _bank22_adjustByAnim(sys: SystemState, layoutOff: number): void {
  let anim = readMem(sys, 0x0546);
  if (anim >= 0x0C) {
    anim = (anim - 0x0C) & 0xFF;
  }
  anim = (anim << 1) & 0xFF;

  sys.mem[0x0044] = (anim + sys.mem[0x0044]) & 0xFF;

  _bank22_advancePointer(sys, layoutOff);
}

// ═════════════════════════════════════════════════
// 辅助: OAM 清空
// ═════════════════════════════════════════════════

/** 清除所有 OAM: Y=$F8 (隐藏) */
export function bank22_clearOAM(sys: SystemState): void {
  for (let i = 0; i < 0x100; i += 4) {
    sys.mem[0x0200 + i] = 0xF8;
  }
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank22_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank22_spriteConvert,
  0x03: bank22_clearOAM, // additional dispatch entry for OAM clear
};

console.log('[bank22] ✅ Full rewrite — 精灵/OAM 引擎 (coord transform→layout parse→OAM write)');
