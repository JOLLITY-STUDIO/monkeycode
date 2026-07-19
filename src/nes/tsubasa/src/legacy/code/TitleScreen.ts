/**
 * 标题画面数据 - 从 ROM 提取或硬编码的标题画面资源
 *
 * 数据来源: 原版 ROM 的 CHR/PRG 数据
 * 当前为验证渲染管线的工作版本，之后用 ROM 真实数据替换
 */

import { GameState, PpuState, NesRom } from '../types';
import { NesMemory } from './Memory';

// ========================================================================
// 标题画面调色板 - 第 $0D 组
// 从 ROM Bank $00 和 Bank $09/$0A 的调色板数据表提取
// ========================================================================
const TITLE_PALETTE: number[] = [
  // BG palette 0 - 天空/背景
  0x0F, 0x21, 0x11, 0x01,  // 黑, 蓝, 浅蓝, 深海蓝
  // BG palette 1 - UI/文字
  0x0F, 0x30, 0x10, 0x00,  // 黑, 白, 灰, 深灰
  // BG palette 2 - 高亮/选中
  0x0F, 0x28, 0x18, 0x08,  // 黑, 黄, 暗黄, 橙
  // BG palette 3 - 辅助色
  0x0F, 0x16, 0x27, 0x17,  // 黑, 红, 橙红, 深红
  // SPR palette 0 - 角色精灵色1
  0x0F, 0x30, 0x21, 0x11,  // 黑, 白, 蓝, 浅蓝
  // SPR palette 1 - 角色精灵色2
  0x0F, 0x27, 0x28, 0x18,  // 黑, 橙红, 黄, 暗黄
  // SPR palette 2 - 高亮精灵
  0x0F, 0x30, 0x27, 0x16,  // 黑, 白, 橙红, 红
  // SPR palette 3 - 暗色精灵
  0x0F, 0x12, 0x22, 0x02,  // 黑, 深蓝, 淡蓝, 极深蓝
];

/** PPU 调色板地址 (写到 $3F00-$3F1F) */
const PPU_PALETTE_ADDR = 0x3F00;

// ========================================================================
// 标题画面 nametable 布局
// 先用测试模式：显示 CHR 中的 tile 索引 0x00-0xFF 作为验证网格
// 之后替换为真实标题画面 nametable
// ========================================================================

/**
 * 写入测试 nametable - 显示 CHR 前 256 个 tile 的验证网格
 * 这可以验证 CHR ROM 数据是否被正确渲染
 */
function writeTestNametable(ppu: PpuState): void {
  // 写入 tile 索引: 32×8 = 256 tiles, 每个 8×8 显示一个 tile
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 32; col++) {
      const tileIdx = row * 32 + col;
      ppu.vram[row * 32 + col] = tileIdx & 0xFF;
    }
  }
  // 清空剩余行 (rows 8-29)
  for (let i = 256; i < 960; i++) {
    ppu.vram[i] = 0x00;
  }

  // 写入 attribute table (每个 attribute byte 控制 4 个 tile 的调色板)
  // 使用调色板 0-3 轮换显示
  for (let attrY = 0; attrY < 8; attrY++) {
    for (let attrX = 0; attrX < 8; attrX++) {
      const palIdx = (attrX + attrY) & 0x03;
      // 每个 attribute byte 覆盖 4 个 quadrant, 每个 2 bits
      const attrVal = palIdx | (palIdx << 2) | (palIdx << 4) | (palIdx << 6);
      ppu.vram[0x03C0 + attrY * 8 + attrX] = attrVal;
    }
  }
}

/**
 * 写入标题画面 nametable - 显示 "ANGEL WINGS" 风格文字
 * 使用 CHR ROM 中的英文字体 tile (通常从 tile $00 开始是字体)
 */
function writeTitleNametable(ppu: PpuState): void {
  // 先清空主 nametable 区域
  for (let i = 0; i < 960; i++) {
    ppu.vram[i] = 0x00; // tile 0 = blank
  }

  // 写入 attribute table - 全部使用 palette 0
  for (let i = 0; i < 64; i++) {
    ppu.vram[0x03C0 + i] = 0x00;
  }

  // 在屏幕中央上方画文字(假设 tile $01 = 'A', $02 = 'B', etc.)
  // 大多数 NES 游戏中 CHR 的第一个 tile 是空白, 之后是 ASCII 字体
  // 字体通常映射: tileId = ASCII - 0x20 (space=0, A=0x21, etc.)
  // 如果用的是标准 ASCII 布局: space=0x00, 'A'=0x01...'Z'=0x1A
  const row = 5;  // 第 5 行
  const colStart = 6; // 从第 6 列开始
  const text = "CAPTAIN TSUBASA II";

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    let tileId: number;
    if (ch === ' ') {
      tileId = 0x00;
    } else {
      // 假设 tile $01 = 'A', $02 = 'B', ..., $1A = 'Z'
      tileId = ch.charCodeAt(0) - 0x40; // 'A' = 0x41 → 0x01
    }
    ppu.vram[row * 32 + colStart + i] = tileId;
  }

  // 在下方画 "PRESS START"
  const row2 = 15;
  const colStart2 = 9;
  const text2 = "PRESS START";
  for (let i = 0; i < text2.length; i++) {
    const ch = text2[i];
    let tileId: number;
    if (ch === ' ') {
      tileId = 0x00;
    } else {
      tileId = ch.charCodeAt(0) - 0x40;
    }
    ppu.vram[row2 * 32 + colStart2 + i] = tileId;
  }

  // 设置文字区域的 attribute (palette 1 = 白色文字)
  // 文字在第 5 行 (attribute row 1) 和第 15 行 (attribute row 3)
  // attribute table: 每个 byte 覆盖 4×4 tile 区块
  const pal1 = 0x01; // palette 1 for white text
  const textAttr1 = pal1 | (pal1 << 2) | (pal1 << 4) | (pal1 << 6);
  for (let ax = 1; ax < 4; ax++) {
    ppu.vram[0x03C0 + 1 * 8 + ax] = textAttr1; // row 4-7
  }
  for (let ax = 2; ax < 5; ax++) {
    ppu.vram[0x03C0 + 3 * 8 + ax] = textAttr1; // row 12-15
  }
}

// ========================================================================
// 公开 API
// ========================================================================

/** 加载标题画面调色板到 PPU palette RAM */
export function loadTitlePalette(state: GameState): void {
  const ppu = state.ppu;
  for (let i = 0; i < 32 && i < TITLE_PALETTE.length; i++) {
    ppu.palette[i] = TITLE_PALETTE[i];
  }
}

/** 加载标题画面 nametable 到 PPU VRAM (当前使用测试网格) */
export function loadTitleNametable(state: GameState): void {
  // 测试模式: 显示 CHR 前 256 个 tile 验证渲染管线
  // 确认能渲染后，切换到 writeTitleNametable() 显示文字
  writeTestNametable(state.ppu);
}

/** 加载测试网格 nametable (CHR 验证用) */
export function loadTestNametable(state: GameState): void {
  writeTestNametable(state.ppu);
}

/** 运行标题画面每帧逻辑 */
export function runTitleLoop(state: GameState, mem: NesMemory): void {
  const ram = state.cpu.ram;
  const input = ram[0x1E]; // 当前帧按下的键 (上升沿)

  // 光标闪烁：每帧翻转 $ED bit 6
  ram[0xED] ^= 0x40;

  // 检查 START → 进入比赛
  if (input & 0x08) {
    console.log('[tsubasa] Title → Match (START pressed)');
    state.scene = 'match';
    return;
  }

  // 方向键上下移动光标
  if (input & 0x10) { // UP
    // TODO: 移动光标到上一个菜单项
  }
  if (input & 0x20) { // DOWN
    // TODO: 移动光标到下一个菜单项
  }
}
