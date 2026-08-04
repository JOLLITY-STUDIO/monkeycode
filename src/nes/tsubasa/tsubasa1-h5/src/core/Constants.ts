/**
 * 全局常量定义 - 天使之翼 H5
 */

import { SCREEN_WIDTH, SCREEN_HEIGHT } from './types';

/** 内存区域大小 */
export const ZP_SIZE = 0x100;      // 零页: $0000-$00FF
export const STACK_SIZE = 0x100;   // 栈: $0100-$01FF
export const RAM_SIZE = 0x800;     // RAM: $0000-$07FF
export const OAM_SIZE = 0x100;     // OAM: 256字节 (64精灵×4字节)
export const VRAM_SIZE = 0x4000;   // VRAM: 16KB
export const PPU_QUEUE_SIZE = 256; // PPU更新队列最大条目

/** 屏幕设置 */
export const SCREEN_W = SCREEN_WIDTH;
export const SCREEN_H = SCREEN_HEIGHT;

/** PPU 名称表地址 */
export const NT_BASE_0 = 0x2000;
export const NT_BASE_1 = 0x2400;
export const NT_BASE_2 = 0x2800;
export const NT_BASE_3 = 0x2C00;
export const ATTR_BASE_0 = 0x23C0;
export const ATTR_BASE_1 = 0x27C0;
export const ATTR_BASE_2 = 0x2BC0;
export const ATTR_BASE_3 = 0x2FC0;
export const PALETTE_BASE = 0x3F00;

/** PPU 寄存器地址 */
export const PPU_CTRL   = 0x2000;
export const PPU_MASK   = 0x2001;
export const PPU_STATUS = 0x2002;
export const OAM_ADDR   = 0x2003;
export const OAM_DATA   = 0x2004;
export const PPU_SCROLL = 0x2005;
export const PPU_ADDR   = 0x2006;
export const PPU_DATA   = 0x2007;

/** MMC1 寄存器地址范围 */
export const MMC1_CTRL    = 0x8000; // $8000-$9FFF
export const MMC1_CHR0    = 0xA000; // $A000-$BFFF
export const MMC1_CHR1    = 0xC000; // $C000-$DFFF
export const MMC1_PRG     = 0xE000; // $E000-$FFFF

/** 手柄寄存器 (单人游戏，仅 P1) */
export const JOYPAD1 = 0x4016;

/** OAM DMA 寄存器 */
export const OAM_DMA = 0x4014;

/** 帧率 */
export const FPS = 60;
export const FRAME_TIME_MS = 1000 / FPS;

/** NES 原始颜色 - 用于调色板初始化 */
export const DEFAULT_BG_COLOR = 0x0F; // 黑色
