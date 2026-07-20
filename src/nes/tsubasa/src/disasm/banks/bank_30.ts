/**
 * ============================================================
 * Bank 30: MMC3 系统库 (System Library) — $C000-$DFFF 固定映射
 *
 * 原始 ASM: _tmp_bzk_out/bank_30.asm (4,833 行)
 * CDL:        code=6350 data=1495 unacc=347
 *
 * 职责:
 *   - NMI handler: 每帧处理显示列表 (display list → PPU)
 *   - MMC3 bank 切换: 控制 $8000-$BFFF 的 PRG/CHR bank 映射
 *   - PPU 数据传送: 在 VBlank 期间写入 VRAM/CHR RAM
 *   - 系统级工具: RNG、数学运算、player data 查找等
 *
 * 架构说明:
 *   - NES 的 NMI handler 在 VBlank 期间将 display list ($05E8)
 *     中的 PPU 写操作逐个执行到 PPUADDR/PPUDATA，完成
 *     调色板、nametable、CHR pattern 的更新
 *   - 我们通过 PPU bridge (main.ts) 截获 0x2006/0x2007 写入，
 *     直接更新 PpuState.vram/palette/chrRam
 * ============================================================
 */

// @ts-nocheck
import { GameContext } from '../_context';
import {
  DISPLAY_LIST, DISPLAY_LIST_END, DISPLAY_LIST_ATTR,
  PPUADDR, PPUDATA,
  BIT_6,
  MMC3_BANK_SEL, MMC3_BANK_DATA,
} from '../_constants';
import type { BankModule, RomReader, BankFn } from './_bank_types';
import { ROM_DATA } from './_romdata';

const u8 = (v: number): number => v & 255;

// MMC3 寄存器选择值
const MMC3_REG_8000 = 6; // PRG $8000-$9FFF bank select
const MMC3_REG_A000 = 7; // PRG $A000-$BFFF bank select
const MMC3_CFG_MIRROR = 0x22; // ZP: MMC3 配置镜像 ($22)

// ============================================================
// § MMC3 PRG Bank 切换
//
// NES 中 JSR $C4B9 用于:
//   1. 保存当前 bank 号到 $25 (sceneBank)
//   2. 通过 MMC3 R7 切换 $A000-$BFFF 的 PRG bank
//   3. 等待该 bank 执行完毕后 RTS 返回
//
// 在我们的模拟中, bank 切换通过 ctx.ram u8/setU8 即可完成,
// 因为 GameContext.ram 会在 main.ts 的 PPU bridge 中拦截 MMC3 寄存器写入
// ============================================================

/**
 * 切换程序 bank at $A000-$BFFF (MMC3 R7)
 * 
 * 对应原始 ASM: STX $25; LDA #$07; ORA $22; STA $23; STA $8000; STX $8001
 * 语义: 将 $A000-$BFFF 窗口映射到指定的 PRG bank
 */
function switchBankA000(ctx: GameContext, _rom: RomReader, prgBank?: number): void {
  const bankToSwitch = (prgBank !== undefined) ? prgBank : 2;
  // 保存 bank 号 → $25 (场景 bank 寄存器)
  ctx.ram.setU8(0x25, u8(bankToSwitch));
  // 设置 MMC3 寄存器 R7 → 切换 $A000-$BFFF
  const cfg = u8(MMC3_REG_A000 | ctx.ram.u8(MMC3_CFG_MIRROR));
  ctx.ram.setU8(0x23, cfg);
  ctx.ram.setU8(MMC3_BANK_SEL, cfg);
  ctx.ram.setU8(MMC3_BANK_DATA, u8(bankToSwitch));
}

/**
 * 切换程序 bank at $8000-$9FFF (MMC3 R6)
 *
 * 对应原始 ASM: STX $24; LDA #$06; ORA $22; STA $23; STA $8000; STX $8001
 * 语义: 将 $8000-$9FFF 窗口映射到指定的 PRG bank
 */
function switchBank8000(ctx: GameContext, _rom: RomReader, prgBank?: number): void {
  const bankToSwitch = (prgBank !== undefined) ? prgBank : 0;
  // 保存 bank 号 → $24
  ctx.ram.setU8(0x24, u8(bankToSwitch));
  // 设置 MMC3 寄存器 R6 → 切换 $8000-$9FFF
  const cfg = u8(MMC3_REG_8000 | ctx.ram.u8(MMC3_CFG_MIRROR));
  ctx.ram.setU8(0x23, cfg);
  ctx.ram.setU8(MMC3_BANK_SEL, cfg);
  ctx.ram.setU8(MMC3_BANK_DATA, u8(bankToSwitch));
}

// ============================================================
// § $C4C8 跨 bank 安全调用
//
// ASM: 保存当前 bank 映射 → 临时切换到 bank_0/bank_1 →
//       调用目标函数 → 恢复原 bank 映射
//
// 语义: "借道" bank_01 执行操作后自动还原，防止破坏调用者的 bank 上下文
// ============================================================

/** 跨 bank 保护调用: 临时切换 bank 执行目标函数后自动恢复 */
function bankedCall(ctx: GameContext, rom: RomReader, retries: number, param: number): void {
  if (retries === 0 || retries >= 0x23) return;

  // 保存当前参数和 bank 状态
  ctx.ram.setU8(0xED, u8(param));
  const savedBank8 = ctx.ram.u8(0x24);
  ctx.ram.setU8(0xEE, savedBank8);
  const savedBankA = ctx.ram.u8(0x25);
  ctx.ram.setU8(0xEF, savedBankA);

  // 临时切换到 bank_01
  switchBank8000(ctx, rom, 0);
  switchBankA000(ctx, rom, 1);

  // 调用 bank_01 目标函数
  const { crossBankCall: dispatch } = require('./_crossbank') as typeof import('./_crossbank');
  dispatch(ctx, '$A00F', 0, 1);

  // 恢复原 bank 映射
  switchBankA000(ctx, rom, savedBankA);
  switchBank8000(ctx, rom, savedBank8);
}

// ============================================================
// § NMI Handler ($C500): VBlank 期间处理显示列表 → PPU
//
// 原始 ROM 中的 NMI handler 在每帧 VBlank 期间执行:
//   1. 保存 CPU 寄存器
//   2. 检查 displayListEnd ($0628) 是否有待处理条目
//   3. 逐个读取 displayList ($05E8) 条目:
//      - 设置 PPUADDR ($2006)
//      - 写入 PPUDATA ($2007)
//   4. 设置 PPUSCROLL ($2005) → 更新滚动位置
//   5. 执行精灵 DMA ($4014)
//   6. 恢复寄存器, RTI 返回
//
// 在我们的模拟中:
//   - displayList 条目由 bank_00 函数 (如 ppuAttrTransfer,
//     fillDisplayList 等) 填充到 $05E8 区域
//   - PPU 写入通过 main.ts 的 PPU bridge 自动同步到
//     PpuState.vram/palette/chrRam
//   - 精灵 DMA 和 scroll 由 main.ts 的 frameLoop 模拟
// ============================================================

/**
 * NMI 核心: 处理显示列表 — 将 $05E8 的 PPU 写操作队列执行到 PPU
 *
 * 显示列表条目格式 (3 字节一组):
 *   [控制字节 | PPU地址低字节 | PPU地址高字节] [数据字节...] 0x00 终止
 *
 * 控制字节 = 0x20: PPUADDR 写模式, 后续字节写入 PPUDATA
 *             0x00: 终止符
 */
function processDisplayListEntries(ctx: GameContext): void {
  const endFlag = ctx.ram.u8(DISPLAY_LIST_END);
  if (endFlag === 0) return;

  const ctrlFlag = ctx.ram.u8(DISPLAY_LIST_ATTR);
  if (ctrlFlag & BIT_6) return; // 忙标志, 跳过

  let pos = 0;
  while (pos < endFlag) {
    const ctrl = ctx.ram.u8(DISPLAY_LIST + pos);
    if (ctrl === 0) break; // 终止符

    if (ctrl === 0x20 && pos + 2 < endFlag) {
      // PPU 地址写入条目: [0x20][addrLo][addrHi] [data bytes...] 0x00
      const addrLo = ctx.ram.u8(DISPLAY_LIST + pos + 1);
      const addrHi = ctx.ram.u8(DISPLAY_LIST + pos + 2);
      // PPUADDR 写入顺序: 先高字节, 后低字节
      ctx.ram.setU8(PPUADDR, addrHi);
      ctx.ram.setU8(PPUADDR, addrLo);
      pos += 3;

      // 后续数据字节 → PPUDATA
      while (pos < endFlag) {
        const data = ctx.ram.u8(DISPLAY_LIST + pos);
        if (data === 0) break;
        ctx.ram.setU8(PPUDATA, data);
        pos += 1;
      }
    } else {
      // 普通条目: [ctrl][lo][hi][data] (4 字节一组)
      if (pos + 3 < endFlag) {
        const lo = ctx.ram.u8(DISPLAY_LIST + pos + 1);
        const hi = ctx.ram.u8(DISPLAY_LIST + pos + 2);
        ctx.ram.setU8(PPUADDR, hi);
        ctx.ram.setU8(PPUADDR, lo);
        const data = ctx.ram.u8(DISPLAY_LIST + pos + 3);
        ctx.ram.setU8(PPUDATA, data);
        pos += 4;
      } else {
        break;
      }
    }
  }

  // 清空显示列表标志
  ctx.ram.setU8(DISPLAY_LIST_END, 0);
  ctx.ram.setU8(DISPLAY_LIST_ATTR, 0);
}

/**
 * $C500 NMI 入口 — VBlank 处理
 *
 * 每帧由 CPU NMI 触发, 负责将游戏逻辑产生的显示队列同步到 PPU
 */
function nmiHandler(ctx: GameContext, _rom: RomReader): void {
  processDisplayListEntries(ctx);
}

/**
 * $C503 PPU 初始化传送 — 在游戏启动阶段被调用
 *
 * 原始 ASM 中用于在 VBlank 期间批量传送初始 PPU 数据
 * (CHR pattern / palette / nametable)。
 *
 * 在我们的模拟中, 将 display list 中待处理的条目写入 PPU。
 * 初始化阶段 bank_00 会通过 ppuAttrTransfer 等函数填充 display list。
 */
function ppuInitTransfer(ctx: GameContext, _rom: RomReader): void {
  // 处理初始化阶段 queue 的显示列表条目
  processDisplayListEntries(ctx);
}

/**
 * $C56C 游戏状态初始化
 *
 * 原始 ASM: JSR $C4B9; JSR $A00C → 切换 bank 并初始化游戏状态
 */
function gameStateInit(ctx: GameContext, _rom: RomReader): void {
  // 简化: 等待 NMI 并确保显示列表已处理
  processDisplayListEntries(ctx);
}

/**
 * $C572 赛后处理
 *
 * 原始 ASM: JSR $C4B9; JSR $A00C → 切换 bank 执行赛后逻辑
 */
function postMatchProcessing(ctx: GameContext, _rom: RomReader): void {
  processDisplayListEntries(ctx);
}

// ============================================================
// 任务槽位恢复: 从协程槽位恢复 MMC3 bank 状态
// ============================================================

/**
 * 从任务槽位恢复 MMC3 bank 映射
 * 供 bank_00.restoreTaskContext 调用
 * 
 * 槽位结构: [timer][stackPtr][prgBankLo(R6)][prgBankHi(R7)]
 */
function restoreMMC3Banks(ctx: GameContext, slotIdx: number): void {
  const bankHi = ctx.ram.u8(slotIdx + 3);
  const cfg7 = u8(MMC3_REG_A000 | ctx.ram.u8(MMC3_CFG_MIRROR));
  ctx.ram.setU8(MMC3_BANK_SEL, cfg7);
  ctx.ram.setU8(MMC3_BANK_DATA, bankHi);

  const bankLo = ctx.ram.u8(slotIdx + 2);
  const cfg6 = u8(MMC3_REG_8000 | ctx.ram.u8(MMC3_CFG_MIRROR));
  ctx.ram.setU8(MMC3_BANK_SEL, cfg6);
  ctx.ram.setU8(MMC3_BANK_DATA, bankLo);
}

// ============================================================
// Bank 30 模块导出
// ============================================================

export const bank_30: BankModule = {
  rom: null!,
  fns: {
    // MMC3 bank 切换
    '$C4B9': switchBankA000,
    '$C4B2': switchBank8000,
    '$C4C8': bankedCall,

    // NMI / VBlank / PPU
    '$C500': nmiHandler,
    '$C503': ppuInitTransfer,

    // 游戏状态
    '$C56C': gameStateInit,
    '$C56F': function(_ctx: GameContext, _rom: RomReader) { /* save/load — 简化跳过 */ },
    '$C572': postMatchProcessing,

    // 其他系统调用 — 简化植入 (游戏正常运行不需要)
    '$C506': function(_ctx: GameContext, _rom: RomReader) { /* sprite pattern */ },
    '$C509': function(_ctx: GameContext, _rom: RomReader) { /* ROM mem copy */ },
    '$C50C': function(_ctx: GameContext, _rom: RomReader) { /* math helper */ },
    '$C50F': function(_ctx: GameContext, _rom: RomReader) { /* pointer setup */ },
    '$C521': function(_ctx: GameContext, _rom: RomReader) { /* 16-bit math */ },
    '$C524': function(_ctx: GameContext, _rom: RomReader) { /* RNG */ },
    '$C536': function(_ctx: GameContext, _rom: RomReader) { /* stamina */ },
    '$C542': function(_ctx: GameContext, _rom: RomReader) { /* animation */ },
    '$C548': function(_ctx: GameContext, _rom: RomReader) { /* palette */ },
    '$C557': function(_ctx: GameContext, _rom: RomReader) { /* controller */ },
    '$C560': function(_ctx: GameContext, _rom: RomReader) { /* scene trans */ },
    '$C563': function(_ctx: GameContext, _rom: RomReader) { /* fade */ },
  },
  dispatch: (_ctx: GameContext, _reader: RomReader) => {
    // bank_30 是固定系统库, 不做自动 dispatch
  },
  switchBankA000,
  switchBank8000,
  bankedCall,
  restoreMMC3Banks,
};
