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
import { ROM_DATA } from './_romdata';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM_DATA[11];
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
