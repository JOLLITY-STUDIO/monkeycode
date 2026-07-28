/**
 * Bank 02: NMI Renderer + Menu Data ($A000-$BFFF 或 $8000-$9FFF)
 *
 * MMC3 可切换 bank。在 bank00 标题初始化时被切到 $8000-$9FFF 窗口。
 * 功能: NMI 中断渲染、PPU 画面更新、菜单数据
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（NMI 渲染） / Service（PPU 更新）
 * ═══════════════════════════════════════
 *   - NMI 发生时: bank30 → JSR $8000 (bank02) → 渲染画面
 *   - 被 bank00 通过 bank 切换调用: 标题画面渲染
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ⏳ CODE_$8000_$8065   (102 bytes) — NMI handler 主入口
 *   ⏳ CODE_$8073_$8106   (148 bytes) — PPU scroll/属性更新
 *   ⏳ CODE_$8107_$8137    (49 bytes) — 手柄输入 + 帧 tick
 *   ⏳ CODE_$8160_$81E3   (132 bytes) — 精灵 DMA 传输
 *   ⏳ CODE_$820C_$821A    (15 bytes) — bank02 跳转表
 *   ⏳ 其余 CODE/DATA 块 — 待翻译
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_02_nmi_renderer.ts
 */

import {
  SystemState,
  writeMem,
  readMem,
  registerBankRom,
} from './system-state';

// ═════════════════════════════════════════════════
// 标志位辅助
// ═════════════════════════════════════════════════

const FLAG_C = 0x01;
const FLAG_Z = 0x02;
const FLAG_N = 0x80;

function setFlag(sys: SystemState, flag: number, cond: boolean): void {
  if (cond) sys.regs.P |= flag;
  else sys.regs.P &= ~flag;
}

function updateNZ(sys: SystemState, val: number): void {
  setFlag(sys, FLAG_N, (val & 0x80) !== 0);
  setFlag(sys, FLAG_Z, (val & 0xFF) === 0);
}

// ═════════════════════════════════════════════════
// NMI Handler — $8000-$8065 (102 bytes)
// ═════════════════════════════════════════════════

/**
 * NMI 中断处理主入口 (bank02 侧)
 *
 * 6502 原始流程:
 *   $8000: LDA #$00; STA $2003          ; OAM addr = 0
 *   $8005: LDA #$02; STA $4014          ; OAM DMA
 *   $800A: LDA $0628; BEQ ...           ; 检查渲染标志
 *   $8010: LDA $0629; BVS ...           ; 检查 PPU 更新标志
 *   $8017: LDA #$00; STA $2001          ; 关显示
 *   $801C: nametable 更新循环
 *   $8043: LDA #$3F; STA $2006          ; 调色板地址
 *   $8048: LDA #$00; STA $2006          ; 调色板 index
 *   $804D: STA $2006                    ; 第二个 reg
 *   $8052: STA $2006
 *   $8057: LDA $21; STA $2001           ; 开显示 + scroll
 *   $805C: LDA $79; BPL ...             ; 声音处理
 */
export function bank02_nmiHandler(sys: SystemState): void {
  // ⏳ 待从 prg_bank_02_nmi_renderer.ts CODE_$8000_$8065 翻译
  // 以下为结构性的最小实现 — 驱动 PPU 帧推进

  // $8000: OAM addr = 0
  writeMem(sys, 0x2003, 0x00);

  // $8005: OAM DMA
  writeMem(sys, 0x4014, 0x02);

  // $800A: 检查 $0628 (渲染标志)
  const renderFlag = sys.mem[0x0628];
  if (renderFlag === 0) {
    // 无更新 → 快速退出
    return;
  }

  // $8010: 检查 $0629 (PPU 更新挂起)
  if ((sys.mem[0x0629] & 0x80) === 0) {
    sys.mem[0x0628] = 0;  // 清除标志
    return;
  }

  // $8017: 关 PPU 显示
  writeMem(sys, 0x2001, 0x00);

  // $801C-$8042: nametable 批量更新
  _nmiUpdateNametable(sys);

  // $8043-$8056: 调色板更新
  _nmiUpdatePalette(sys);

  // $8057: 恢复 PPU 控制
  writeMem(sys, 0x2001, sys.mem[0x0021]);

  // 清理标志
  sys.mem[0x0628] = 0;
}

/**
 * $801C-$8042: NMI 期间 nametable/PPU 数据批量传输
 *
 * 6502: 遍历 $05E8-$0607 (数据队列)，每条:
 *       → 设置 PPU 地址 (A→$2006)
 *       → 连续写入数据 (→$2007)
 */
function _nmiUpdateNametable(sys: SystemState): void {
  // $05E8: queue start, $05E9: length in entries
  // 每个 entry: [PPU addr hi, PPU addr lo, data bytes...]
  let idx = 0x05E8;
  const entry = sys.mem[idx];

  if (entry === 0) return;

  while (sys.mem[idx] !== 0) {
    // $801C: LDX #$00; LDY #$80 或 #$84
    const ppuCmd = sys.mem[idx];
    const isPalette = (ppuCmd & 0x40) ? 0x84 : 0x80;

    // 设置 PPU 地址
    writeMem(sys, 0x2000, isPalette);
    writeMem(sys, 0x2006, sys.mem[idx + 1]);  // PPU addr hi
    writeMem(sys, 0x2006, sys.mem[idx + 2]);  // PPU addr lo

    // 写入数据
    let count = ppuCmd & 0x0F;
    for (let i = 0; i < count; i++) {
      writeMem(sys, 0x2007, sys.mem[idx + 3 + i]);
    }

    idx += 3 + count;  // advance
  }
}

/**
 * $8043-$8056: NMI 期间调色板更新
 */
function _nmiUpdatePalette(sys: SystemState): void {
  // 设置 PPU vram 地址 → $3F00
  writeMem(sys, 0x2006, 0x3F);
  writeMem(sys, 0x2006, 0x00);

  // 从 $05E8 后面的 palette 数据拷贝
  // (调色板区域单独处理)
}

// ═════════════════════════════════════════════════
// PPU Scroll & 属性更新 — $8073-$8106 (148 bytes)
// ═════════════════════════════════════════════════

/**
 * $8073: PPU 滚动位置 + MMC3 CHR 切换
 *
 * 6502 流程:
 *   - 读 scroll 变量 ($44, $45, $7A, $7B)
 *   - 设置 PPUSCROLL
 *   - 更新 MMC3 CHR bank 寄存器
 *   - 手柄轮询
 *   - 帧计数递增
 */
export function bank02_ppuScrollUpdate(sys: SystemState): void {
  // ⏳ 待翻译
  console.log('[bank02] ppuScrollUpdate — 待翻译');
}

// ═════════════════════════════════════════════════
// 公开 API — bank00 调用入口
// ═════════════════════════════════════════════════

/**
 * $A003 (bank02): 备用入口 1 — 场景数据初始化
 */
export function bank02_auxEntry1(sys: SystemState): void {
  console.log('[bank02] auxEntry1 — 待翻译');
}

/**
 * $A006 (bank02): 备用入口 2 — PPU 地址计算
 */
export function bank02_auxEntry2(sys: SystemState): void {
  console.log('[bank02] auxEntry2 — 待翻译');
}

/**
 * $A01B (bank02): 备用入口 8 — VRAM 缓冲区设置
 */
export function bank02_auxEntry8(sys: SystemState): void {
  console.log('[bank02] auxEntry8 — 待翻译');
}

/**
 * $A20C (bank02): 场景切换辅助 — 在 bank switch 后调用
 *
 * 6502 原始: 初始化新场景所需的 PPU/nametable 数据
 */
export function bank02_sceneSwitchHelper(sys: SystemState): void {
  console.log('[bank02] sceneSwitchHelper ($A20C) — 待翻译');
}

/**
 * $A20F (bank02): 场景数据加载 — 在 bank switch 后调用
 *
 * 6502 原始: 从 ROM 加载场景布局数据到 PPU 传输队列
 */
export function bank02_loadSceneData(sys: SystemState): void {
  console.log('[bank02] loadSceneData ($A20F) — 待翻译');
}

// ═════════════════════════════════════════════════
// ROM 数据注册
// ═════════════════════════════════════════════════

import _PRG_BANK_02_RAW from '../../tsubasa-hex2asm/prg_banks/prg_bank_02_nmi_renderer';

const BANK_02_ROM: Uint8Array =
  _PRG_BANK_02_RAW instanceof Uint8Array
    ? _PRG_BANK_02_RAW
    : new Uint8Array(_PRG_BANK_02_RAW as unknown as number[]);

registerBankRom(2, BANK_02_ROM);

console.log('[bank02] ✅ 已加载 — nmiHandler|ppuScroll|sceneHelper|loadData|aux(3)');
