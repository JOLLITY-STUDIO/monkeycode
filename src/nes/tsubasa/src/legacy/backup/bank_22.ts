/**
 * ============================================================
 * Bank 22: 精灵/OAM 处理 (453 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=453 data=7388 unacc=351
 * 分发表: 1 个 JMP 入口 ($8000→$8003)
 * 功能: 精灵元数据解码, OAM buffer 写入 ($0200)
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';
import { ROM_DATA } from './_romdata';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM_DATA[22];
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x2C010 };

/** spriteHandler: 精灵处理器 (写入 OAM buffer at $0200) */
function spriteHandler(ctx: GameContext, rom: RomReader): void {
  // 读取精灵元数据
  const numSprites = ctx.ram.u8(0x0538);
  let oamIdx = 0;
  for (let i = 0; i < numSprites && oamIdx < 64; i++) {
    const metaBase = 0x0540 + i * 6; // 每个元精灵 6 bytes
    const screenX = ctx.ram.u8(metaBase);      // screen X
    const screenY = ctx.ram.u8(metaBase + 1);  // screen Y
    const pattern = ctx.ram.u8(metaBase + 2);  // pattern base
    const attr = ctx.ram.u8(metaBase + 3);     // attributes
    const width = ctx.ram.u8(metaBase + 4);    // width in tiles
    const height = ctx.ram.u8(metaBase + 5);   // height in tiles

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (oamIdx * 4 >= 256) break;
        ctx.ram.setU8(0x0200 + oamIdx * 4,     u8(screenY + row * 8));
        ctx.ram.setU8(0x0201 + oamIdx * 4,     u8(pattern + row * width + col));
        ctx.ram.setU8(0x0202 + oamIdx * 4,     attr);
        ctx.ram.setU8(0x0203 + oamIdx * 4,     u8(screenX + col * 8));
        oamIdx++;
      }
    }
  }
  // 清除剩余 OAM entries
  for (let i = oamIdx; i < 64; i++) {
    ctx.ram.setU8(0x0200 + i * 4, 0xF8);
  }
}

const fns: Record<string, BankFn> = {
  '$8000': spriteHandler,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  spriteHandler(ctx, rom);
}

export const bank_22: BankModule = {
  rom: romSlice, dispatch, fns,
  spriteHandler,
};
