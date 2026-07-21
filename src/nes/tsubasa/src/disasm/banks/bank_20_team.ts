import { ROM } from './_romdata/bank_20_data';
/**
 * ============================================================
 * Bank 20: 队伍/球员选择界面 (2,002 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=2002 data=6070 unacc=120
 * 分发表: 5 个 JMP 入口
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM;
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x28010 };

/** $800F teamSelectMenu: 队伍选择菜单主循环 */
function teamSelectMenu(ctx: GameContext, rom: RomReader): void {
  const state = ctx.ram.u8(0x053A);
  if (state === 0) return;
  if (state & 0x80) {
    // 初始化菜单
    ctx.ram.setU8(0x053A, 1);
    ctx.ram.setU8(0x053B, 1);
    ctx.ram.setU8(0x053D, 0);
    ctx.ram.setU8(0x0540, 0);
    const dataPtr = (0x89 << 8) | 0x68; // ROM pointer for menu data
    const selIdx = ctx.ram.u8(0x053C) << 1;
    const lo = romSlice.u8(dataPtr - 0x8000 + selIdx);
    const hi = romSlice.u8(dataPtr - 0x8000 + selIdx + 1);
    ctx.ram.setU8(0x4C, lo); ctx.ram.setU8(0x4D, hi);
    // 清除菜单项 buffer
    for (let i = 0; i < 6; i++) {
      ctx.ram.setU8(0x0547 + i * 0x15, 0);
    }
  }
}

/** $84DC teamDataLoad: 队伍数据加载 */
function teamDataLoad(ctx: GameContext, rom: RomReader): void {
  const teamId = ctx.ram.u8(0x053C);
  for (let i = 0; i < 16; i++) {
    ctx.ram.setU8(0x0510 + i, romSlice.u8(0x84DC - 0x8000 + teamId * 16 + i));
  }
  for (let i = 0; i < 5; i++) {
    ctx.ram.setU8(0x0493 + i, romSlice.u8(0x84DC - 0x8000 + 0x100 + teamId * 5 + i));
  }
}

/** $83D9 cursorUpdate: 光标更新 */
function cursorUpdate(ctx: GameContext, rom: RomReader): void {
  const joypad = ctx.ram.u8(0x001B);
  let cursor = ctx.ram.u8(0x053E);
  if (joypad & 0x08) cursor = cursor > 0 ? cursor - 1 : 0; // UP
  if (joypad & 0x04) cursor = cursor < 4 ? cursor + 1 : 4; // DOWN
  ctx.ram.setU8(0x053E, cursor);
  // 更新光标 VRAM 位置
  ctx.ram.setU8(0x053F, cursor * 3 + 5);
}

/** $8624 playerSelect: 球员选择处理 */
function playerSelect(ctx: GameContext, rom: RomReader): void {
  const teamId = ctx.ram.u8(0x0700);
  const cursor = ctx.ram.u8(0x053E);
  const playerBase = 0x0660 + teamId * 10 + cursor;
  ctx.ram.setU8(0x053C, ctx.ram.u8(playerBase)); // 选中球员
  // 确认选择
  if (ctx.ram.u8(0x001B) & 0x10) { // A button
    ctx.ram.setU8(0x053A, 0x80); // 退出选择, 返回
  }
}

/** $8796 menuRender: 菜单渲染 (VRAM 写入) */
function menuRender(ctx: GameContext, rom: RomReader): void {
  const ppuHi = ctx.ram.u8(0x00E7);
  const ppuLo = ctx.ram.u8(0x00E6);
  const cursor = ctx.ram.u8(0x053E);
  // 设置 VRAM 地址为菜单区域 + 光标偏移
  ctx.ram.setU8(0x00E6, u8(ppuLo + cursor * 0x40));
  ctx.ram.setU8(0x00E7, u8(ppuHi));
  // 写入光标精灵数据
  ctx.ram.setU8(0x0200 + cursor * 4, 128); // OAM Y
  ctx.ram.setU8(0x0201 + cursor * 4, 0x20); // OAM tile
  ctx.ram.setU8(0x0202 + cursor * 4, 0);    // OAM attr
  ctx.ram.setU8(0x0203 + cursor * 4, 80);    // OAM X
}

const fns: Record<string, BankFn> = {
  '$8000': teamSelectMenu,
  '$8003': teamDataLoad,
  '$8006': cursorUpdate,
  '$8009': playerSelect,
  '$800C': menuRender,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x27);
  const keys = ['$8000','$8003','$8006','$8009','$800C'];
  if (idx < keys.length) fns[keys[idx]](ctx, rom);
}

export const bank_20: BankModule = {
  rom: romSlice, dispatch, fns,
  teamSelectMenu, teamDataLoad, cursorUpdate, playerSelect, menuRender,
};
