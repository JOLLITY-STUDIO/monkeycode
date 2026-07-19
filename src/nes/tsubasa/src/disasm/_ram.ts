/**
 * 足球小将 II (Captain Tsubasa II) NES RAM 布局
 * 基于 _tmp_bzk_out/_ram_usage.inc 交叉引用分析
 *
 * 每个地址后的数字表示该地址在反汇编中被引用的总次数
 */

// ============ Zero Page ($0000-$00FF) ============

/** 通用临时变量 (refs: 37) */
export const ZP_00 = 0x00;
export const ZP_01 = 0x01;
export const ZP_02 = 0x02;
export const ZP_03 = 0x03;

/** 堆栈指针上下文区域 ($05-$06, refs: 4/3) */
export const ZP_05 = 0x05;
export const ZP_06 = 0x06;

/** NM/IRQ 标志 (refs: 5/4) */
export const ZP_09 = 0x09;
export const ZP_0A = 0x0A;

/** PPU 滚动/地址暂存 (refs: 14/12) */
export const ZP_0D = 0x0D;
export const ZP_0E = 0x0E;

/** 通用计数器 (refs: 11/11) */
export const ZP_11 = 0x11;
export const ZP_12 = 0x12;

/** 手柄输入 ($1E=87, $1B=23, $1C=20) */
export const ZP_1B = 0x1B;
export const ZP_1C = 0x1C;
export const ZP_1E = 0x1E;  // 高频: 87

/** PPU 控制寄存器镜像 ($20=54, $21=24) */
export const PPUCTRL_MIRROR  = 0x20;  // $2000 mirror
export const PPUMASK_MIRROR  = 0x21;  // $2001 mirror

/** PPU 滚动坐标 ($22=70, $23=11) */
export const PPUSCROLL_X = 0x22;
export const PPUSCROLL_Y = 0x23;

/** 帧计数器 / 通用 (refs: 68/75/42) */
export const ZP_24 = 0x24;
export const ZP_25 = 0x25;  // 场景 bank 暂存
export const ZP_26 = 0x26;

/** 跳转表索引 (refs: 22) */
export const ZP_27 = 0x27;

/** 通用暂存 ($28=11, $29=7, $2A=23, $2B=18, $2C=15) */
export const ZP_28 = 0x28;
export const ZP_29 = 0x29;
export const ZP_2A = 0x2A;
export const ZP_2B = 0x2B;
export const ZP_2C = 0x2C;

/** 音频/PPU 状态 (refs: 14) */
export const ZP_30 = 0x30;

/** 高引用暂存区 ($32=80, $33=65, $34=231) */
export const ZP_32 = 0x32;
export const ZP_33 = 0x33;
export const ZP_34 = 0x34;  // 最高频: 231

/** 指针 / 运算暂存 ($36=12) */
export const ZP_36 = 0x36;

/** 极度高频区 */
export const ZP_3A = 0x3A;  // 251 refs - 核心循环计数器
export const ZP_3B = 0x3B;  // 119 refs
export const ZP_3C = 0x3C;  // 148 refs
export const ZP_3D = 0x3D;  // 60 refs
export const ZP_3E = 0x3E;  // 87 refs
export const ZP_3F = 0x3F;  // 42 refs

/** 运算区域 ($40-$4C) */
export const ZP_40 = 0x40;
export const ZP_44 = 0x44;
export const ZP_45 = 0x45;
export const ZP_46 = 0x46;
export const ZP_47 = 0x47;
/** 数字百位值 (refs: 40) */
export const ZP_48 = 0x48;
/** 数字十位值 (refs: 32) */
export const ZP_49 = 0x49;
/** 显示属性计数 (refs: 21) */
export const ZP_4A = 0x4A;
/** 显示属性计数 (refs: 25) */
export const ZP_4B = 0x4B;
/** 场景状态 (refs: 43) */
export const ZP_4C = 0x4C;

/** 脚本指针低字节 (refs: 51) */
export const ZP_4D = 0x4D;
/** 脚本指针高字节 (refs: 22) */
export const ZP_4E = 0x4E;
/** 脚本行位置 (refs: 6) */
export const ZP_4F = 0x4F;
/** 脚本行列 (refs: 20) */
export const ZP_50 = 0x50;
/** 当前光栅行 (refs: 6) */
export const ZP_51 = 0x51;
/** 屏幕列 (refs: 27) */
export const ZP_52 = 0x52;
/** 屏幕行 (refs: 9) */
export const ZP_53 = 0x53;
/** 行限制 (refs: 15) */
export const ZP_54 = 0x54;
/** 文本行数 (refs: 6) */
export const ZP_55 = 0x55;
/** 当前 bank 号 (refs: 17) */
export const ZP_56 = 0x56;

/** 脚本保存/恢复区 */
export const ZP_58 = 0x58;  // 保存 $4D+3
export const ZP_59 = 0x59;  // 保存 $4E
export const ZP_5A = 0x5A;  // 保存 $56

/** 旗标 (refs: 18) */
export const ZP_5B = 0x5B;

/** 属性/调色板 ($5C=34, $5D=58, $5E=28, $5F=33) */
export const ZP_5C = 0x5C;
export const ZP_5D = 0x5D;
export const ZP_5E = 0x5E;
export const ZP_5F = 0x5F;

/** 指针区域 ($60-$6F) */
export const ZP_63 = 0x63;  // 场景数据指针低
export const ZP_64 = 0x64;  // 场景数据指针高

/** 场景数据字段 ($75=6, $76=3) */
export const ZP_75 = 0x75;
export const ZP_76 = 0x76;
export const ZP_77 = 0x77;  // 保存 $25

/** 动作/动画 ($7A=16, $7B=30) */
export const ZP_7A = 0x7A;
export const ZP_7B = 0x7B;

/** PPU/精灵 DMA 暂存 ($90=6, $91=7, $92=29, $93=13, $94=101) */
export const ZP_90 = 0x90;
export const ZP_91 = 0x91;
export const ZP_92 = 0x92;
export const ZP_93 = 0x93;
export const ZP_94 = 0x94;  // 101 refs

/** 上下文保存 ($9E-$A1) */
export const ZP_9E = 0x9E;
export const ZP_9F = 0x9F;
export const ZP_A0 = 0xA0;
export const ZP_A1 = 0xA1;

// ============ 临时变量区 ($E0-$FF) ============

/** 帧/状态旗标 (refs: 7) */
export const ZP_E0 = 0xE0;
export const ZP_E1 = 0xE1;

/** 高强度暂存 ($E2=48, $E3=14, $E4=5, $E5=2) */
export const ZP_E2 = 0xE2;
export const ZP_E3 = 0xE3;

/**
 * PPU 地址暂存区 ($E6-$E7, refs: 170/129)
 * $E6: PPU 地址低字节
 * $E7: PPU 地址高字节
 */
export const PPUADDR_LO = 0xE6;
export const PPUADDR_HI = 0xE7;

/**
 * 通用高级暂存区 ($E8-$ED)
 * $E8: 行计数/循环暂存 (refs: 77)
 * $E9: bank 号暂存 (refs: 77)
 * $EA-$EB: 各种临时用途 (refs: 67/94)
 * $EC: 全局暂存低 (refs: 144)
 * $ED: 全局暂存高 (refs: 127)
 */
export const ZP_E8 = 0xE8;
export const ZP_E9 = 0xE9;
export const ZP_EA = 0xEA;
export const ZP_EB = 0xEB;
export const ZP_EC = 0xEC;
export const ZP_ED = 0xED;

export const ZP_F0 = 0xF0;
export const ZP_F1 = 0xF1;
export const ZP_F2 = 0xF2;
export const ZP_F3 = 0xF3;
export const ZP_F4 = 0xF4;
export const ZP_F5 = 0xF5;
export const ZP_F6 = 0xF6;
export const ZP_F7 = 0xF7;

// ============ NES MMIO ============

/** PPU 控制寄存器 ($2000) */
export const PPUCTRL   = 0x2000;
/** PPU 掩码寄存器 ($2001) */
export const PPUMASK   = 0x2001;
/** PPU 状态寄存器 ($2002) */
export const PPUSTATUS = 0x2002;
/** OAM 地址 ($2003) */
export const OAMADDR   = 0x2003;
/** OAM 数据 ($2004) */
export const OAMDATA   = 0x2004;
/** PPU 滚动 ($2005) */
export const PPUSCROLL = 0x2005;
/** PPU 地址 ($2006) */
export const PPUADDR   = 0x2006;
/** PPU 数据 ($2007) */
export const PPUDATA   = 0x2007;

/** MMC3: Bank 选择 ($8000) */
export const MMC3_SEL  = 0x8000;
/** MMC3: Bank 数据 ($8001) */
export const MMC3_DATA = 0x8001;

// ============ 关键 RAM 区域 ============

/** OAM 精灵缓冲 ($0200-$02FF, 256 bytes) */
export const OAM_BUF = 0x0200;

/** 显示列表区 ($0468-$0567, 256 bytes)
 *  每4字节一组: [属性][PPU_LO][PPU_HI][tile]
 *  $0468/$0469/$046A/$046B: 组0
 *  $046C/$046D/$046E/$046F: 组1 ...
 */
export const OAM_EX_BUF = 0x0468;

/** 数字显示元数据 ($05E8-$0627, 64 bytes) */
export const DISPLAY_LIST = 0x05E8;

/** 属性表数据暂存 ($062A-$0649, 32 bytes) */
export const ATTR_BUF = 0x062A;

/** 显示列表结束位置 (refs: 38) */
export const DISPLAY_LIST_END = 0x0628;
/** 显示列表当前属性字节 */
export const DISPLAY_LIST_ATTR = 0x0629;

/** 队伍槽位区 ($0700, refs: 23) */
export const TEAM_SLOT = 0x0700;

// ============ NES 类型定义 ============

/** NES 模拟的游戏 RAM (2KB + 零页) */
export interface NesRam {
  // Zero page
  zp: Uint8Array;  // $00-$FF
  // Stack
  stack: Uint8Array;  // $0100-$01FF
  // OAM buffer
  oam: Uint8Array;  // $0200-$02FF
  // General RAM
  ram: Uint8Array;  // $0300-$07FF

  // Typed access helpers
  u8(addr: number): number;
  setU8(addr: number, val: number): void;
  u16(addr: number): number;  // little-endian
  setU16(addr: number, val: number): void;
}
