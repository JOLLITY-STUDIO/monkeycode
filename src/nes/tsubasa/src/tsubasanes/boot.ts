// ============================================================================
// boot.ts — PRG 入口语义翻译
//
// 对应 ROM 启动流程:
//   RESET $FFF0 → JMP $C503 → JMP $C64E → JMP $CEFE → JMP $C400
//   → JSR $8000 (Bank 0 scene dispatch) → JMP $A200 (Bank 1 主循环)
//
// 本文件不模拟任何 CPU/RAM 硬件，仅描述游戏启动的语义状态，
// 并进入场景引擎主循环。
// ============================================================================

import { Engine } from './engine';

// ================================================================
// PRG 入口 — RESET $FFF0
// ================================================================
// $FFF0:  LDA #$00   ; 初始化 MMC3 bank 模式
//         STA $8000  ; MMC3: 设置 bank 选择模式 0
//         JMP $C503  ; → 初始化代码
//
// $C503:  JMP $C64E  ; → 主初始化

// ================================================================
// 主初始化 $C64E (Bank $0F / Bank 31)
// ================================================================
// 这段代码在 6502 上做的事情:
//   1. 等待 PPU 两帧 VBlank 稳定
//   2. SEI / CLD — 禁用中断，十进制模式关
//   3. TXS — 设置栈指针到 $01FF
//   4. 清零全部 ZP + WRAM ($0000-$07FF)
//   5. 设置 PPUCTRL=$08, PPUMASK=$1E
//   6. 初始化音频 (静音)
//   7. 清零 VRAM nametables
//   8. MMC3 bank 初始映射
//   9. CLI — 开中断
//  10. → $CEFE / $C400

/** 初始化引擎并返回启动请求 */
export function boot(): { engine: Engine; entryScene: number } {
  const engine = new Engine({ autoStart: false });

  // ── 对应的语义初始化 ──
  // PPUCTRL mirror = $08: NMI off, BG table $0000, VRAM inc +1
  engine.ppuCtrl(0x08);

  // PPUMASK mirror = $1E: 显示 BG + 精灵，无 color emphasis
  engine.ppuMask(0x1e);

  // Scroll = 0
  engine.ppuScroll(0, 0);

  // 场景引擎从 $26=0 (TECMO_LOGO) / $27=0 开始
  // → Bank 0 $8017 的场景分派表 $27=0 条目 → $8065(?) 初始化入口
  // 这是 engine.reset() 里已经做的事

  engine.reset();

  return {
    engine,
    entryScene: 0, // SCENE_TECMO_LOGO，对应 $26=0
  };
}

// ================================================================
// 启动后主循环 — Bank 0 $8017
// ================================================================
// 对应 ROM 中 Bank 0 ($8000-$9FFF) 的场景引擎入口:
//
//   $800D: LDA $27       ; 读取 dispatch index
//          ASL            ; ×2 (word 表)
//          TAX
//          LDA $800E,X    ; 高址
//          PHA
//          LDA $800D,X    ; 低址
//          PHA
//          RTS            ; JMP via RTS trick
//
// Dispatch table ($800D):
//   $27=0 → 初始化场景 (根据 $26 查表加载)
//   $27=1 → 标题画面状态机
//   $27=2 → 场景过场推进
//   $27=3 → 比赛引擎
//   $27=4 → 赛后结算
//   ... 更多

/** 主循环每一帧的入口 — 等价于 Bank 0 $8017 分派逻辑 */
export function stepScene(engine: Engine, input?: Parameters<Engine['tick']>[0]): void {
  engine.tick(input);
}
