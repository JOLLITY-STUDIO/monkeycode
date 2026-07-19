/**
 * ============================================================
 * Bank 12: 音频/音效引擎 (1,674 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=1674 data=6088 unacc=430
 * 无标准 dispatch table, 直接操作 APU registers ($4000-$4015)
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';
import { ROM_DATA } from './_romdata';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM_DATA[12];
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x18010 };

// APU registers
const APU = {
  SQ1_VOL: 0x4000, SQ1_SWEEP: 0x4001, SQ1_LO: 0x4002, SQ1_HI: 0x4003,
  SQ2_VOL: 0x4004, SQ2_SWEEP: 0x4005, SQ2_LO: 0x4006, SQ2_HI: 0x4007,
  TRI_LINEAR: 0x4008, TRI_LO: 0x400A, TRI_HI: 0x400B,
  NOISE_VOL: 0x400C, NOISE_LO: 0x400E, NOISE_HI: 0x400F,
  DMC_FREQ: 0x4010, DMC_RAW: 0x4011, DMC_START: 0x4012, DMC_LEN: 0x4013,
  STATUS: 0x4015,
};

/** initAudio: 初始化音频引擎 */
function initAudio(ctx: GameContext, rom: RomReader): void {
  // 静音所有通道
  for (const addr of [APU.SQ1_VOL, APU.SQ2_VOL, APU.TRI_LINEAR, APU.NOISE_VOL]) {
    ctx.ram.setU8(addr, 0);
  }
  ctx.ram.setU8(APU.STATUS, 0x0F); // 启用 SQ1, SQ2, TRI, NOISE
  ctx.ram.setU8(0x07FC, 12); // MMC3 bank for audio data
  ctx.ram.setU8(0x0700, 0); // audio track index
}

/** playSoundEffect: 播放音效 */
function playSoundEffect(ctx: GameContext, rom: RomReader): void {
  const sfxId = ctx.ram.u8(0x0701);
  if (sfxId === 0) return;
  const sfxBase = 0x8000 - 0x8000 + sfxId * 8;
  // 加载音效参数到 APU
  ctx.ram.setU8(APU.SQ1_VOL, romSlice.u8(sfxBase));
  ctx.ram.setU8(APU.SQ1_LO, romSlice.u8(sfxBase + 1));
  ctx.ram.setU8(APU.SQ1_HI, romSlice.u8(sfxBase + 2));
  ctx.ram.setU8(APU.SQ2_VOL, romSlice.u8(sfxBase + 4));
  ctx.ram.setU8(APU.SQ2_LO, romSlice.u8(sfxBase + 5));
  ctx.ram.setU8(APU.SQ2_HI, romSlice.u8(sfxBase + 6));
  ctx.ram.setU8(0x0701, 0);
}

/** updateMusicTrack: 更新音乐轨道 */
function updateMusicTrack(ctx: GameContext, rom: RomReader): void {
  const trackIdx = ctx.ram.u8(0x0700);
  const notePtr = ctx.ram.u16le(0x0702);
  const nextNote = romSlice.u8(notePtr - 0x8000);
  if (nextNote === 0xFF) {
    // 循环
    ctx.ram.setU8(0x0702, u8(0x8000 & 0xFF));
    ctx.ram.setU8(0x0703, u8(0x8000 >> 8));
    return;
  }
  // 播放音符
  ctx.ram.setU8(APU.SQ1_LO, nextNote);
  ctx.ram.setU8(APU.SQ1_HI, romSlice.u8(notePtr - 0x8000 + 1));
  ctx.ram.setU8(0x0702, u8(notePtr + 2));
  ctx.ram.setU8(0x0703, u8(notePtr + 2 > 0xFF ? ctx.ram.u8(0x0703) + 1 : ctx.ram.u8(0x0703)));
}

/** writeAPURegister: 写入 APU 寄存器 */
function writeAPURegister(ctx: GameContext, reg: number, val: number): void {
  ctx.ram.setU8(reg, u8(val));
}

const fns: Record<string, BankFn> = {
  '$8000': initAudio,
  '$8003': playSoundEffect,
  '$8006': updateMusicTrack,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x27);
  const keys = ['$8000','$8003','$8006'];
  if (idx < keys.length) fns[keys[idx]](ctx, rom);
}

export const bank_12: BankModule = {
  rom: romSlice, dispatch, fns,
  initAudio, playSoundEffect, updateMusicTrack,
};
