import { ROM } from './_romdata/bank_11_data';
/**
 * ============================================================
 * Bank 11: 背景/瓦片渲染 (1,477 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=1477 data=5958 unacc=757
 * 分发表: 4 个 JMP 入口
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

// ============================================================
// ROM 数据常量 (ASM 验证通过 — 对照 _tmp_bzk_out_openning/bank_11.asm)
// ============================================================

/**
 * $8000-$800B (12 bytes): 分发跳转表 — 4 条 JMP 指令
 *
 * ASM 原文 (bank_11.asm lines 6-17):
 *   $8000: .byte $4C $0C $80  → JMP $800C (loadNametable)
 *   $8003: .byte $4C $83 $80  → JMP $8083 (loadAttributes)
 *   $8006: .byte $4C $A1 $84  → JMP $84A1 (updateScrollBuffer)
 *   $8009: .byte $4C $4C $81  → JMP $814C (tileRender)
 */
const DISPATCH_TABLE = new Uint8Array([
  0x4C, 0x0C, 0x80,  // JMP $800C
  0x4C, 0x83, 0x80,  // JMP $8083
  0x4C, 0xA1, 0x84,  // JMP $84A1
  0x4C, 0x4C, 0x81,  // JMP $814C
]);

/**
 * $81AD-$81BB (7 entries × 2 bytes, little-endian): 分支目标表
 *
 * ASM 原文 (bank_11.asm lines 434-448):
 *   代码段末尾 JSR $C509 后用此表做条件跳转分发。
 *   每 2 bytes = 目标地址 lo/hi (全部落在 $83xx 范围)。
 *
 *   入口: LDA $27,X  →  查表偏移 = A × 2
 *   ┌──────┬─────────┐
 *   │ 索引 │ 目标    │
 *   ├──────┼─────────┤
 *   │  0   │ $8327   │
 *   │  1   │ $83E7   │
 *   │  2   │ $83FF   │
 *   │  3   │ $8358   │
 *   │  4   │ $8377   │
 *   │  5   │ $8364   │
 *   │  6   │ $83D2   │
 *   │  7   │ $83EE   │
 *   └──────┴─────────┘
 */
const BRANCH_TARGETS: Uint8Array = new Uint8Array([
  0x27, 0x83,  // → $8327
  0xE7, 0x83,  // → $83E7
  0xFF, 0x83,  // → $83FF
  0x58, 0x83,  // → $8358
  0x77, 0x83,  // → $8377
  0x64, 0x83,  // → $8364
  0xD2, 0x83,  // → $83D2
  0xEE, 0x83,  // → $83EE
]);

// ⚠️ 以下数据段尚待 CDL 验证偏移，暂走 romSlice 运行时读取:
//   - $800C+ nametable 数据 (loadNametable 引用)
//   - $8083+ attribute 表   (loadAttributes 引用)
//   - $84A1+ 滚动查表       (updateScrollBuffer 引用)

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM;
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x16010 };

/** $800C loadNametable: 加载 nametable 数据 */
function loadNametable(ctx: GameContext, rom: RomReader): void {
  const ntBank = ctx.ram.u8(0x5A);
  const srcBase = 0x800C - 0x8000 + ntBank * 0x100;
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 32; col++) {
      const tile = romSlice.u8(srcBase + row * 32 + col);
      ctx.ram.setU8(0x2007, tile);
    }
  }
}

/** $8083 loadAttributes: 加载属性表 */
function loadAttributes(ctx: GameContext, rom: RomReader): void {
  const attrBase = 0x8083 - 0x8000;
  for (let i = 0; i < 64; i++) {
    ctx.ram.setU8(0x2007, romSlice.u8(attrBase + i));
  }
}

/** $84A1 updateScrollBuffer: 更新滚动缓冲区 ($05D4 坐标系) */
function updateScrollBuffer(ctx: GameContext, rom: RomReader): void {
  const scrollX = ctx.ram.u8(0x05D4);
  const scrollY = ctx.ram.u8(0x05D5);
  const tileCol = scrollX >> 3;
  const tileRow = scrollY >> 3;
  const src = 0x84A1 - 0x8000 + tileRow * 64 + tileCol;
  for (let i = 0; i < 4; i++) {
    ctx.ram.setU8(0x0515 + i, romSlice.u8(src + i));
  }
}

/** $814C tileRender: 瓦片渲染到 PPU */
function tileRender(ctx: GameContext, rom: RomReader): void {
  const ppuAddr = ctx.ram.u16le(0x00E6);
  const dest = 0x2006;
  ctx.ram.setU8(dest, ppuAddr >> 8);
  ctx.ram.setU8(dest, ppuAddr & 0xFF);
  for (let i = 0; i < 4; i++) {
    ctx.ram.setU8(0x2007, ctx.ram.u8(0x0515 + i));
  }
}

const fns: Record<string, BankFn> = {
  '$8000': loadNametable,
  '$8003': loadAttributes,
  '$8006': updateScrollBuffer,
  '$8009': tileRender,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x27);
  const keys = ['$8000','$8003','$8006','$8009'];
  if (idx < keys.length) fns[keys[idx]](ctx, rom);
}

export const bank_11: BankModule = {
  rom: romSlice, dispatch, fns,
  loadNametable, loadAttributes, updateScrollBuffer, tileRender,
};
