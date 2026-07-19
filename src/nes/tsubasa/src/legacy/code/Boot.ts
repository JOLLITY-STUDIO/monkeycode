/**
 * 天使之翼2 - 游戏启动/初始化
 * 从 Bank $00 6502 汇编逐函数翻译
 *
 * 游戏启动流程 (对应原版 RESET handler):
 *   $00:8017 → JSR $C4B9(MMC3 bank切) → JMP $A203(主循环)
 *   $00:801F → 标题画面初始化序列
 *   $00:80xx → 比赛初始化序列
 */

import { GameState } from '../types';
import { NesMemory } from './Memory';
import {
  screenOff, screenOn, screenInit, clearVram,
  waitVBlank, restoreVBlank, switchMmc3Bank,
  setPpuAddr, delayFlicker, delayLong,
  readInput, waitScreenReady,
  switchBankAndInit,
} from './CoreUtils';
import { loadTitlePalette, loadTitleNametable, runTitleLoop } from './TitleScreen';

// ========================================================================
// bootReset - 对应 NES RESET handler
// 入口: $00:C000 (Bank $00 映射到 $8000 后)
// ========================================================================
export function bootReset(state: GameState, mem: NesMemory): void {

  // ── 1. NES 上电初始化 ──
  // SEI / CLD
  state.cpu.flags |= 0x04;   // I=1 禁中断
  state.cpu.flags &= ~0x08;  // D=0 十进制关
  state.cpu.stack = 0xFF;    // SP=$FF

  // ── 2. 初始化 MMC3 bank ──
  initMmc3Default(state);

  // ── 3. 清空 CPU RAM $0000-$07FF ──
  for (let i = 0; i < 0x0800; i++) {
    mem.ram[i] = 0;
  }

  // ── 4. PPU 初始化 (对应原版预热等待) ──
  const ppu = state.ppu;
  ppu.ctrl = 0x00;
  ppu.mask = 0x00;
  ppu.status = 0x00;
  ppu.vram.fill(0);
  ppu.oam.fill(0);
  // 调色板全黑
  ppu.palette.fill(0x0F);

  // ── 5. 跳转到标题画面初始化 ($00:801F 或 $00:C03C) ──
  // 实际游戏: $00:C03C 把 $1B bit0=0 后执行标题画面序列
  initTitleScreen(state, mem);

  console.log('[tsubasa] Boot → Title screen initialized');
}

// ========================================================================
// initTitleScreen  标题画面初始化
// 对应 $00:C03C ~ $00:C0EF 区间的代码
//   JSR $9B11(screenInit) → JSR $9FA8(VBlank) → JSR $9B7F(screenOn)
//   → JSR $98A0(clearVram) → LDA #$0D / JSR $8297(调色板)
//   → JSR $88FB(delay) → JSR $9A35(读输入)
//   → LDA #$00 / JSR $8920(setNametable) ...
// ========================================================================
function initTitleScreen(state: GameState, mem: NesMemory): void {
  const ram = state.cpu.ram;

  // ── $00:C03C: 清空 ZP 变量 ──
  ram[0x05] = 0;  // 循环计数器
  ram[0x06] = 0;  // 循环计数器2
  ram[0x09] = 0;  // 临时
  ram[0x0A] = 0;
  ram[0x11] = 0;  // 画面状态
  ram[0x12] = 0;  // 画面状态2
  ram[0x0D] = 0;
  ram[0x0E] = 0;
  ram[0x4C] = 0;  // 精灵Y暂存
  ram[0x5B] = 0;  // 画面切换标志
  // $0700 = $01
  mem.ram[0x0700] = 0x01;

  // ── $00:C04D: 检查 $1B bit0 ──
  // if ($1B & 1) → skip init (already initialized)
  if ((ram[0x1B] & 0x01) === 0) {

    // $00:C053: 画面初始化序列
    screenInit(state, mem);           // JSR $9B11
    waitVBlank(state, mem, 2);        // LDA #2 / JSR $9FA8
    restoreVBlank(state);
    screenOn(state, mem);             // JSR $9B7F

    // 清空 VRAM (对应原版 $98A0)
    clearVram(state, mem);            // JSR $98A0

    // 加载调色板 #$0D → 直接写 PPU palette RAM
    loadTitlePalette(state);          // 替代原版 JSR $8297

    delayFlicker(state, mem);          // JSR $88FB
    readInput(state, mem);             // JSR $9A35
  }

  // ── 加载标题画面 nametable 数据到 VRAM ──
  loadTitleNametable(state);

  // ── $00:C07A: 设置 nametable ──
  setPpuAddr(state, 0, 0);           // LDA #0 / JSR $8920

  ram[0x90] = 0;
  ram[0x91] = 2;

  // $1B &= ~1
  ram[0x1B] = ram[0x1B] & 0xFE;

  // ── 标题画面光标初始化 ──
  ram[0xED] = 0x0A;
  ram[0xE6] = ram[0xED];
  ram[0xE7] = 0x22;

  // 设置 state.scene = 'title' 让主循环进入标题画面逻辑
  state.scene = 'title';
  console.log('[tsubasa] Title screen initialized');
}

// ========================================================================
// initMatch  比赛初始化
// 对应 $00:80E6 ~ $00:8142
//   JSR $9BA0(screenOff) → LDA #1 / JSR $8464 → JSR $82B5
//   → LDA #$C0 / STA $E0 → LDX #2 / JSR $C4B9 → JSR $A20F
//   → 清 ZP → LDA #1 / STA $0700 → LDX #2 / JSR $C4B9 → JSR $A20C
//   → LDA #0 / JSR $8920 → LDX #1 / JSR $C4B9 → JSR $A006
//   → JSR $C572(音乐) → 选难度 → 清 $0450-$0453
//   → LDX #1 / JSR $C4B9 → JSR $A009
// ========================================================================
export function initMatch(state: GameState, mem: NesMemory): void {
  const ram = state.cpu.ram;

  // $00:80E6: 关闭画面
  screenOff(state, mem);                // JSR $9BA0

  // $00:80E9: bank切换
  switchBankAndInit(state, mem, 1);     // LDA #1 / JSR $8464

  // $00:80EE: 等待处理完成
  waitScreenReady(state, mem);          // JSR $82B5

  // $00:80F1: 设置画面效果
  ram[0xE0] = 0xC0;                     // PPU标志 (最高位=1)

  // $00:80F5: 切换 MMC3 bank
  switchMmc3Bank(state, 6, 2);          // LDX #2 / JSR $C4B9

  // $00:80FA: 比赛引擎初始化
  // JSR $A20F - 比赛引擎入口2 (暂未翻译)

  // $00:80FD: 清 ZP 索引
  ram[0x28] = 0;  // 子索引
  ram[0x29] = 0;  // 子索引2
  ram[0x27] = 0;  // 函数跳转索引

  // $00:8105: 设置 $0700
  mem.ram[0x0700] = 0x01;

  // $00:810A: MMC3 bank 切换
  switchMmc3Bank(state, 6, 2);

  // $00:810F: 比赛引擎
  // JSR $A20C - 比赛引擎入口

  // $00:8112: 设置 nametable
  setPpuAddr(state, 0, 0);

  // $00:8117: bank 切换
  switchMmc3Bank(state, 6, 1);

  // $00:811C: 比赛初始化
  // JSR $A006 - 比赛初始化 (暂未翻译)

  // $00:811F: 播放音乐
  // JSR $C572 - 播放音乐

  // $00:8122: 选择难度
  // LDX #$55, 如果 $26 >= $20 → LDX #$4C
  let diffX = 0x55;
  if (ram[0x26] >= 0x20) {
    diffX = 0x4C;
  }
  mem.ram[0x0700] = diffX;

  // $00:812F: 清 $0450-$0453
  mem.ram[0x0450] = 0;
  mem.ram[0x0451] = 0;
  mem.ram[0x0452] = 0;
  mem.ram[0x0453] = 0;

  // $00:813D: bank 切换
  switchMmc3Bank(state, 6, 1);

  // $00:8142: 比赛初始化2
  // JSR $A009 - 比赛初始化2 (暂未翻译)

  state.scene = 'match';
  console.log('[tsubasa] Match initialized');
}

// ========================================================================
// initMmc3Default  MMC3 默认 bank 映射
// ========================================================================
function initMmc3Default(state: GameState): void {
  const mmc3 = state.mmc3;
  mmc3.prgBankMode = 0;
  mmc3.chrBankMode = 0;
  mmc3.mirroring = 0; // vertical

  // PRG banks
  mmc3.bankData[6] = 0x00;  // $8000-$9FFF → bank 0
  mmc3.bankData[7] = 0x01;  // $A000-$BFFF → bank 1

  // CHR banks
  for (let i = 0; i < 6; i++) {
    mmc3.bankData[i] = i;
  }
}

// ========================================================================
// loadPalette  加载调色板
// 对应 $00:8297: STA $E7 / LDA #1 / STA $E6 / LDA #$E5 / STA $4D
//              LDA #0 / STA $4E / JSR $9085
// 参数: paletteIdx = 调色板组索引 (0-15)
// ========================================================================
export function loadPalette(state: GameState, mem: NesMemory, paletteIdx: number): void {
  const ram = state.cpu.ram;

  // 设置源地址 = $01E5 (PPU 调色板区域)
  ram[0xE7] = paletteIdx;  // 高字节
  ram[0xE6] = 0x01;        // 低字节

  // 设置 VRAM 写入指针 = $E500 (调色板数据表)
  ram[0x4D] = 0xE5;
  ram[0x4E] = 0x00;

  // JSR $9085 - 实际加载调色板到 PPU
  // 简化: 从 ROM 数据复制 32 字节调色板
  const paletteStart = paletteIdx * 32;
  // palette 数据通常在 $B000 或 $BB00 区域
  // 这里先标记，实际数据表需要从 ROM 提取
  console.log(`[tsubasa] Load palette #${paletteIdx.toString(16)} from ROM`);
}

// ========================================================================
// NMI handler - 每帧调用一次 (对应原版 $00:C500 NMI 入口)
// ========================================================================
export function nmiHandler(state: GameState, mem: NesMemory): void {
  const ppu = state.ppu;

  // 1. OAM DMA: $0200-$02FF → PPU OAM
  for (let i = 0; i < 0x100; i++) {
    ppu.oam[i] = mem.ram[0x0200 + i];
  }

  // 2. 读取控制器
  readInput(state, mem);

  // 3. 根据场景执行游戏逻辑
  runGameLogic(state, mem);
}

// ========================================================================
// 场景分派
// ========================================================================
function runGameLogic(state: GameState, mem: NesMemory): void {
  switch (state.scene) {
    case 'boot':
      // boot 完成 → 自动切 title
      initTitleScreen(state, mem);
      break;
    case 'title':
      runTitleLogic(state, mem);
      break;
    case 'match':
      runMatchLogic(state, mem);
      break;
    default:
      break;
  }
}

// ========================================================================
// 标题画面每帧逻辑
// ========================================================================
function runTitleLogic(state: GameState, mem: NesMemory): void {
  runTitleLoop(state, mem);

  // 检查是否按了 START 进入了比赛
  if (state.scene === 'match') {
    initMatch(state, mem);
  }
}

// ========================================================================
// 比赛画面每帧逻辑
// ========================================================================
function runMatchLogic(_state: GameState, _mem: NesMemory): void {
  // TODO: 翻译 $A203 比赛主循环
}
