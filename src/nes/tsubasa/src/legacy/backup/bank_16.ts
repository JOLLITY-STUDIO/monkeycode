/**
 * ============================================================
 * Bank 16: 场景渲染/脚本引擎 (1,860 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=1860 data=4599 unacc=1733
 * 分发表: 2 个 JMP 入口 ($8000→$8006, $8003→$8021)
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';
import { ROM_DATA } from './_romdata';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM_DATA[16];
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x20010 };

/** $8006 renderScene: 场景渲染主函数 */
function renderScene(ctx: GameContext, rom: RomReader): void {
  const sceneId = ctx.ram.u8(0x5D);
  const dataPtr = 0x8006 - 0x8000 + sceneId * 4;
  const lo = romSlice.u8(dataPtr);
  const hi = romSlice.u8(dataPtr + 1);
  const ptr = (hi << 8) | lo;
  // 脚本解释器循环
  let offset = 0;
  while (true) {
    const op = romSlice.u8(ptr - 0x8000 + offset);
    if (op === 0xFF) break; // end of script
    if (op === 0xF0) {
      // 控制指令
      const cmd = romSlice.u8(ptr - 0x8000 + offset + 1);
      ctx.ram.setU8(0x5E, cmd);
      offset += 2;
    } else if (op === 0xFE) {
      // 行结束
      offset++;
    } else {
      // 绘制指令: [count][data...]
      const count = romSlice.u8(ptr - 0x8000 + offset + 1);
      for (let i = 0; i < count; i++) {
        const val = romSlice.u8(ptr - 0x8000 + offset + 2 + i);
        ctx.ram.setU8(0x0516 + i, val);
      }
      offset += 2 + count;
    }
  }
}

/** $8021 updatePPU: PPU 更新 (数据写入 VRAM) */
function updatePPU(ctx: GameContext, rom: RomReader): void {
  const ppuLo = ctx.ram.u8(0x00E6);
  const ppuHi = ctx.ram.u8(0x00E7);
  ctx.ram.setU8(0x2006, ppuHi);
  ctx.ram.setU8(0x2006, ppuLo);
  for (let i = 0; i < 16; i++) {
    ctx.ram.setU8(0x2007, ctx.ram.u8(0x0516 + i));
  }
  ctx.ram.setU8(0x00E6, u8(ppuLo + 16));
}

const fns: Record<string, BankFn> = {
  '$8000': renderScene,
  '$8003': updatePPU,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x27);
  if (idx === 0) renderScene(ctx, rom);
  else updatePPU(ctx, rom);
}

export const bank_16: BankModule = {
  rom: romSlice, dispatch, fns,
  renderScene, updatePPU,
};
