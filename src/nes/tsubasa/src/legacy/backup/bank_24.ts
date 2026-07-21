/**
 * ============================================================
 * Bank 24: 比赛场景/过场控制 (2,774 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=2774 data=4686 unacc=732
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';
import { ROM_DATA } from './_romdata';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM_DATA[24];
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x30010 };

/** $800F sceneScriptEngine: 场景脚本引擎 (检查 $063F bit7) */
function sceneScriptEngine(ctx: GameContext, rom: RomReader): void {
  const flag = ctx.ram.u8(0x063F);
  if (flag & 0x80) {
    ctx.ram.setU8(0x063F, u8(flag & 0x7F));
    return;
  }
  // 设置脚本指针
  ctx.ram.setU8(0x5F, 0x20); ctx.ram.setU8(0x60, 0x92);
  const ea = ctx.ram.u8(0x05EA) << 1;
  if (ea & 0x100) ctx.ram.setU8(0x60, u8(ctx.ram.u8(0x60) + 1));
  // 间接寻址读脚本数据
  const ptr = (ctx.ram.u8(0x60) << 8) | ctx.ram.u8(0x5F);
  const dataLo = romSlice.u8(ptr - 0x8000 + (ea & 0xFF));
  const dataHi = romSlice.u8(ptr - 0x8000 + (ea & 0xFF) + 1);
  ctx.ram.setU8(0x5F, dataLo); ctx.ram.setU8(0x60, dataHi);
  // 清除状态 flags
  const clears = [0x05E9,0x05E5,0x05E4,0x05F4];
  for (const a of clears) ctx.ram.setU8(a, 0);
  ctx.ram.setU8(0x05E3, 1);
  // 执行场景脚本循环
  ctx.ram.setU8(0x05E3, 1);
}

/** $86F8 cutscenePlayer: 过场动画处理器 */
function cutscenePlayer(ctx: GameContext, rom: RomReader): void {
  const frame = ctx.ram.u8(0x05E3);
  if (frame === 0) return;
  const data = romSlice.u8(0x86F8 - 0x8000 + frame);
  ctx.ram.setU8(0x05E4, data);
  ctx.ram.setU8(0x05E3, u8(frame + 1));
  if (data === 0xFF) ctx.ram.setU8(0x05E3, 0); // end
}

/** $8779 dialogDisplay: 对话显示控制 */
function dialogDisplay(ctx: GameContext, rom: RomReader): void {
  const msgId = ctx.ram.u8(0x26); // scene id as message id
  const msgBase = 0x8779 - 0x8000 + msgId * 8;
  for (let i = 0; i < 8; i++) {
    ctx.ram.setU8(0x0510 + i, romSlice.u8(msgBase + i));
  }
}

/** $87E6 screenTransition: 画面切换效果 */
function screenTransition(ctx: GameContext, rom: RomReader): void {
  const fade = ctx.ram.u8(0x05F4);
  ctx.ram.setU8(0x05F4, u8(fade + 1));
  const ppuMask = ctx.ram.u8(0x0021);
  if (fade < 4) ctx.ram.setU8(0x0021, ppuMask & 0xE7); // darken
  else ctx.ram.setU8(0x0021, ppuMask | 0x18); // restore
}

/** $8851 eventScriptDispatch: 事件脚本分派 */
function eventScriptDispatch(ctx: GameContext, rom: RomReader): void {
  const eventCode = ctx.ram.u8(0x05E9);
  switch (eventCode & 0xF0) {
    case 0xF0: ctx.ram.setU8(0x063F, u8(ctx.ram.u8(0x063F) | 0x80)); break; // 触发特殊事件
    case 0xE0: ctx.ram.setU8(0x05E5, eventCode & 0x0F); break; // 设置过场参数
    case 0xD0: ctx.ram.setU8(0x05E4, eventCode & 0x0F); break; // 设置动画帧
    default: ctx.ram.setU8(0x05E9, 0); // 清除
  }
}

const fns: Record<string, BankFn> = {
  '$8000': sceneScriptEngine,
  '$8003': cutscenePlayer,
  '$8006': dialogDisplay,
  '$8009': screenTransition,
  '$800C': eventScriptDispatch,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x27);
  const keys = ['$8000','$8003','$8006','$8009','$800C'];
  if (idx < keys.length) fns[keys[idx]](ctx, rom);
}

export const bank_24: BankModule = {
  rom: romSlice, dispatch, fns,
  sceneScriptEngine, cutscenePlayer, dialogDisplay, screenTransition,
};
