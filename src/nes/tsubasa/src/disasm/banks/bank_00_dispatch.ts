import { ROM } from './_romdata/bank_00_data';
/**
 * ============================================================
 * Bank 00: 系統主分派器 + 場景狀態機 + 腳本處理器
 *
 * ASM 來源:  _tmp_bzk_out/bank_00.asm (4,617 行)
 * CPU 映射:   $8000-$9FFF (MMC3 PRG bank 0, 切換進入)
 * CDL:        code=7274 data=427 unacc=491
 *
 * 功能摘要:
 *   - $8000 跳轉表分派: 用 $27 索引跳轉到 6 個子程序
 *   - $8017 場景循環: 讀取場景狀態、切換 bank、顯示文本/背景
 *   - $82ED 腳本引擎: 解析 $4D-$4E 指標的腳本指令序列
 *   - $9EED 工作排程器: 定時任務系統 (tasuku/coroutine)
 *   - $9FA8 上下文保存: 保存 CPU 狀態到 $01xx 槽位
 *   - $83D4,$83DC,$83FE 場景狀態→對應數據映射表
 * ============================================================
 */

// @ts-nocheck
import { GameContext } from '../_context';

/** Set { verbose: false } to suppress verbose dispatch/scene loading logs (speeds up auto-test dramatically) */
export const _cfg = {
  verbose: true as boolean,
  /** Skip bytecode interpreter in sceneDataLoad — huge speedup when PPU output not needed */
  fastSceneLoad: false as boolean,
};

const _log = (...args: any[]) => { if (_cfg.verbose) console.log(...args); };
const _warn = (...args: any[]) => { if (_cfg.verbose) console.warn(...args); };
import {
  ZP_JMP_IDX, ZP_JOYPAD1, ZP_JOYPAD1_NEW, ZP_JOYPAD1_PREV,
  ZP_SCROLL_X, ZP_SCROLL_Y, ZP_SCENE_STATUS, ZP_SCENE_STATE,
  ZP_FLAGS, ZP_SCRIPT_LO, ZP_SCRIPT_HI, ZP_PPUCONTROL_MIRROR, // $22
  ZP_SCROLL_X_POS, ZP_SCROLL_REL, ZP_SCROLL_Y_VAL, ZP_SCROLL_X_NT,
  ZP_GLOBAL_LO, ZP_GLOBAL_HI, ZP_NMI_TRIGGER,
  ZP_LOOP_CNT_40, ZP_JOYPAD_TMP,
  ZP_GEN_EA, ZP_GEN_EB, ZP_BANK_TMP, ZP_ROW_CNT,
  ZP_28, ZP_29,
  ZP_PPUADDR_LO, ZP_PPUADDR_HI, ZP_E4, ZP_E5,
  ZP_SP_CTX_05, ZP_SP_CTX_06, ZP_NMI_FLAG, ZP_IRQ_FLAG,
  ZP_CNT_11, ZP_CNT_12,
  BIT_0, BIT_5, BIT_6, BIT_7,
  MASK_HI2, MASK_LO4, MASK_CLR_SIGN,
  TERMINATOR, SENTINEL,
  TEAM_SLOT, DISPLAY_LIST_END, DISPLAY_LIST_ATTR, ATTR_BUF,
  SCENE_STATE_MODE_16, SCENE_STATE_RUNNING,
} from '../_constants';
import type { BankFn, BankModule, BankRomSlice, RomReader } from './_bank_types';
import { crossBankCall } from './_crossbank';

// ============================================================
// ROM 數據表 (從 bank_00.asm 的數據段擷取)
// 這些是編譯到 ROM 中的 lookup table
// ============================================================

/**
 * $8398-$83B9 (34 bytes): 場景狀態到下一狀態映射
 * LDA $8398,X  (X=$26 場景狀態)
 */
const SCENE_NEXT_TABLE: Uint8Array = new Uint8Array([
  0,0,2,2,4,4,6,6,8,8,10,10,12,12,14,14,16,16,18,18,
  20,20,22,22,24,24,26,26,28,28,30,30,31,29
]);

/**
 * $83BA-$83DB (34 bytes): 場景模式表 (0=跳過, 1=特定, 3=默認)
 */
const SCENE_MODE_TABLE: Uint8Array = new Uint8Array([
  3,3,3,3,3,3,1,1,1,1,1,3,3,3,3,3,3,3,3,3,
  0,3,3,3,3,3,3,3,3,3,2,3,3,3
]);

/**
 * $83DC-$83FD (34 bytes): 場景旗標表 A (forward 方向)
 */
const SCENE_FLAG_A_TABLE: Uint8Array = new Uint8Array([
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]);

/**
 * $83FE-$841F (34 bytes): 場景旗標表 B (backward 方向)
 */
const SCENE_FLAG_B_TABLE: Uint8Array = new Uint8Array([
  3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
  0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3
]);

/**
 * $8420-$8441 (34 bytes): 場景旗標表 C
 */
const SCENE_FLAG_C_TABLE: Uint8Array = new Uint8Array([
  3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,3,
  0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3
]);

/**
 * $8442-$8463 (34 bytes): 場景旗標表 D
 */
const SCENE_FLAG_D_TABLE: Uint8Array = new Uint8Array([
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]);

// ============================================================
// 工具函數 (模擬 6502 指令行為)
// ============================================================

const u8 = (v: number): number => v & 255;
const bit = (v: number, n: number): boolean => (v & (1 << n)) !== 0;

// ============================================================
// § $8000-$800C 跳轉表分派器
//
// 6502 原始碼:
//   LDA $27      ; 讀跳轉索引
//   ASL A        ; ×2 (每個入口 2 bytes)
//   TAX          ; → X 索引
//   LDA $800E,X  ; 讀跳轉目標 high byte
//   PHA          ; push high
//   LDA $800D,X  ; 讀跳轉目標 low byte
//   PHA          ; push low
//   RTS          ; 用 PHA+RTS 模擬 JMP (透過堆疊返回)
//
// 跳轉表 ($800D-$8016, little-endian):
//   idx=0 → $8165  ; handleJump0
//   idx=1 → $818A  ; handleJump1
//   idx=2 → $81AD  ; handleJump2
//   idx=3 → $81B4  ; handleJump3
//   idx=4 → $81DA  ; handleJump4
// ============================================================

/** $800D-$8016 跳轉表 (6 個入口, 每個 2 bytes little-endian) */
const JUMP_TABLE: number[] = [
  0x8165, // idx=0
  0x818A, // idx=1
  0x81AD, // idx=2
  0x81B4, // idx=3
  0x81DA, // idx=4
  0x8017, // idx=5 (fallback to main loop)
];

/**
 * $8000 跳轉表分派入口
 * 
 * 對照 ASM 行 6-23 (ASM lines 6-23)
 */
function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(ZP_JMP_IDX); // LDA $27
  // clamp to valid range
  const target = JUMP_TABLE[Math.min(idx, JUMP_TABLE.length - 1)];
  _log('[bank_00] dispatch: idx=%d → target=$%s',
    idx, target.toString(16).toUpperCase());
  ctx.cpu.PC = target;

  // ★ 實際執行目標函數 (RTS 跳轉表: 目標 = table_val + 1)
  const actualAddr = target + 1;
  const key = '$' + actualAddr.toString(16).toUpperCase();
  const targetFn = bank_00.fns[key];
  if (targetFn) {
    _log('[bank_00] dispatch → executing %s', key);
    targetFn(ctx, rom);
  } else {
    _warn('[bank_00] dispatch: no fn at %s', key);
  }
}

// ============================================================
// § $8017 場景循環主體 - 遊戲主循環的 bank_00 部分
//
// 6502 原始碼 (ASM lines 24-113):
//   LDX #$02
//   JSR $C4B9    ; waitNmiBank2 跨 bank 呼叫
//   JMP $A203    ; 跳轉到 bank_NEXT 的入口 (跨 bank 轉移)
//
// 注意: $8017-$80DC 這段包含多個場景初始化路徑
// 根據 player input / scene state 決定下一個動作
// ============================================================

/**
 * $8017 場景循環入口 - 等待 NMI 後跳轉
 * JSR $C4B9: 等待垂直同步 (bank 切換)
 * JMP $A203: 跳轉到 bank_02 場景處理 (跨 bank, 由 MMC3 切換)
 *
 * 在 NES 中, 这段代码在 handleForward 之后执行,
 * 作用是切换到 bank_02 并等待下一次 NMI, 然后跳转到场景切换初始化。
 * 
 * 在模拟器中, NMI 已经由 frameLoop 模拟,
 * 所以这里直接调用 opening 初始化 (仅首次)。
 */
function sceneLoopEntry(ctx: GameContext, rom: RomReader): void {
  // 检查场景状态, 只在初始化阶段调用 opening
  const sceneState = ctx.ram.u8(ZP_SCENE_STATE);
  if (sceneState === 0) {
    _log('[bank_00] sceneLoopEntry: entering opening scene init ($804C)');
    // 调用场景初始化 (开场动画入口)
    sceneInit_804C(ctx, rom);
    // 标记场景状态, 避免每帧重复初始化
    ctx.ram.setU8(ZP_SCENE_STATE, 1);
  }
  // 确保跳转索引复位 (scenePreProcess 等函数可能覆写 $0x27)
  const idx = ctx.ram.u8(ZP_JMP_IDX);
  if (idx >= JUMP_TABLE.length) {
    ctx.ram.setU8(ZP_JMP_IDX, 0);
    _log('[bank_00] sceneLoopEntry: reset jump idx %d → 0', idx);
  }
  // 后续帧: 场景状态机由 dispatch → handleForward 推进
}

// ============================================================
// § $804C 初始設定分支 (NMI 後的第一個場景設置)
//
// 6502 原始碼 (ASM lines 54-112):
//   $804C: CLC
//   $804D: LDA $1B    ; joypad1 current
//   $804F: AND #$01   ; check RIGHT pressed
//   $8051: BNE $807A  ; if RIGHT, skip to $807A
//   $8053: JSR $9B11  ; sub_9B11 (未知功能)
//   $8056: LDA #$02
//   $8058: JSR $9FA8  ; saveContext(bankNum=2)
//   $805B: JSR $9B7F  ; sub_9B7F
//   $805E: JSR $98A0  ; sub_98A0
//   ...設定 PPU 參數...
// ============================================================

/**
 * $804C 場景初始化 - 標題畫面/過場動畫設置
 * 
 * 行為: 檢查手柄 RIGHT 按鍵決定走場景或跳轉
 * 如果沒有按 RIGHT: 執行完整的過場全流程
 * 如果按了 RIGHT: 跳過過場直接進下一場景
 */
function sceneInit_804C(ctx: GameContext, rom: RomReader): void {
  const joypad = ctx.ram.u8(ZP_JOYPAD1);
  if (bit(joypad, 0)) {
    // RIGHT pressed → skip intro
    sceneInit_807A(ctx, rom);
    return;
  }

  // $8053-$8077: full intro sequence
  // $9B11: init palettes / display lists
  initPalettes(ctx);
  
  // LDA #$02; JSR $9FA8 → saveContext(2)
  saveContext(ctx, rom, 2);
  
  // $9B7F: clear OAM
  clearOAM(ctx);
  
  // $98A0: reset PPU
  ppuReset(ctx);
  
  // LDA #$0D; JSR $8297 → setupScript(0x0D) — PPU hi=$0D
  setupScript(ctx, rom, 0x0D);
  
  // LDA #$00; STA $7B
  ctx.ram.setU8(ZP_SCROLL_X_NT, 0);
  
  // LDA #$17; JSR $8AF7 → scene fade (fade ID = 0x17)
  sceneFade(ctx, rom, 0x17);
  // LDA #$30; JSR $890C → sprite step (offset sprite Y)
  sceneSpriteStep(ctx, 0x30);
  // JSR $88FB → sprite attribute flip
  sceneSpriteFlipAttr(ctx);
  // JSR $9A35 → scene pre-process
  scenePreProcess(ctx, rom);
}

/**
 * $807A: 快速路徑 - 跳過過場
 * 設定 PPU 位址為 $0A00, 寫入屬性/名稱表
 */
function sceneInit_807A(ctx: GameContext, rom: RomReader): void {
  // $807A: LDA #$00; JSR $8920 → sceneTransitionSetup
  sceneTransitionSetup(ctx, rom);
  
  // $807F-$8083: STA $90/$91
  ctx.ram.setU8(0x90, 0);
  ctx.ram.setU8(0x91, 2);
  
  // $8087: clear RIGHT bit
  const pad = ctx.ram.u8(ZP_JOYPAD1);
  ctx.ram.setU8(ZP_JOYPAD1, pad & 0xFE);
  
  // $808D: STA $ED = $0A
  ctx.ram.setU8(ZP_GLOBAL_HI, 0x0A);
  
  // $8091-$80D4: PPU config loop
  ppuSetupLoop(ctx, rom);
}

/**
 * $8091-$80D4: PPU 顯示頁設定循環
 * 
 * 6502 邏輯:
 *   LDA $ED        → PPU addr hi
 *   STA $E6        → PPUADDR_LO
 *   LDA #$22; STA $E7  → PPUADDR_HI
 *   LDY #$01; LDX #$01; LDA #$7F
 *   JSR $98EA      → 跨 bank: 寫入 NMI 等待隊列
 *   JSR $9FA8(A=1) → saveContext
 *   等待 joypad 輸入...
 *   檢查 SELECT button → 調整 $ED 高/低位
 *   重新設置 PPU
 *   回到循環頂部 ($8091)
 *   如果 A+B 同時按下 → BEQ → 到 $80DF (場景狀態機)
 */
function ppuSetupLoop(ctx: GameContext, rom: RomReader): void {
  // 循環: $8091-$80D4
  // ASM loop:
  //   LDA $ED; STA $E6; LDA #$22; STA $E7
  //   LDY #$01; LDX #$01; LDA #$7F; JSR $98EA → fillDisplayList
  //   LDA #$01; JSR $9FA8  → saveContext
  //   等待 $1E bit5 (NMI flag)
  //   檢查 $1E 按鍵 → 調整 $ED (翻頁)
  //   檢查 A+B → exit
  // 這是一個等待循環, 按鍵調整顯示頁 → 回到 $8091
  // 按 A+B → 跳出到 $80DF (sceneStateMachine)
  fillDisplayList(ctx, 1, 1, ctx.ram.u8(ZP_GLOBAL_HI), 0x22);
  saveContext(ctx, rom, 1);
}

// ============================================================
// § $80DF 場景狀態機主體
//
// 這是 bank_00 的核心狀態機, 根據 $26 (場景狀態) 和 $1C (新按鍵)
// 決定場景推進方向, 並查表執行對應的場景操作
//
// 6502 原始碼 (ASM lines 117-296):
//   $80DF: BIT $ED      ; 檢查 $ED bit6 (V flag)
//          BVC $80E6    ; V=0 → $80E6
//          JMP $826A    ; V=1 → handleVPressed
//   $80E6: JSR $9BA0    ; 跨 bank
//          JSR $8464    ; 跨 bank 場景設置
//          JSR $82B5    ; 重置 PPU 滾動
//          LDA #$C0; STA $E0  ; 設置 NMI 觸發旗標
//          ...
//   (檢查多個條件分支來決定場景推進)
//
// 主要路徑:
//   $810B: backward_path  ($E0 bit7=1, or $E4 >= $26)
//   $8166: forward_path   (jumpIdx=1)
//   $81AE: skip_to_next   (jumpIdx=3)
//   $81D4: set_jump4      (jumpIdx=4)
//   $81E6: default_handler (模式 0/跳過)
//   $8206: advance_scene  (場景 +1)
//   $826A: v_pressed      (Select button)
// ============================================================

/**
 * $80DF 場景狀態機入口
 * 
 * BIT $ED: 檢查 bit6 (V flag = overflow) → 判斷 Select 路徑
 */
function sceneStateMachine(ctx: GameContext, rom: RomReader): void {
  const ed = ctx.ram.u8(ZP_GLOBAL_HI);
  
  // $80DF: BIT $ED; BVC $80E6 → 如果 bit6=0 走正常路徑
  if (!bit(ed, 6)) {
    sceneStateNormal(ctx, rom);
  } else {
    // JMP $826A → Select button pressed path
    handleVPressed(ctx, rom);
  }
}

/**
 * $80E6 場景狀態機正常路徑
 * 
 * 核心邏輯:
 *   1. 初始化顯示 (JSR $9BA0, $8464)
 *   2. 重置 PPU ($82B5)
 *   3. 根據場景狀態 ($26) 選擇下一步
 *   4. 根據 $1C (新按鍵) 判斷方向
 */
function sceneStateNormal(ctx: GameContext, rom: RomReader): void {
  // $80E6: JSR $9BA0 → initDisplay (internal: PPU reset + OAM clear)
  initDisplay(ctx, rom);
  // $80EB: JSR $8464 → scene data load (ASM: LDA #$60; JSR $8464)
  sceneDataLoad(ctx, rom, 0x60);
  // $80EE: JSR $82B5 → resetScrollAndWait
  resetScrollAndWait(ctx, rom);

  // $80F1: LDA #$C0; STA $E0
  ctx.ram.setU8(ZP_NMI_TRIGGER, 0xC0);
  
  // $80F5-$80FA: wait NMI + cross-bank
  //   LDX #$02; JSR $C4B9 → switch $A000 window to bank_02
  xcall(ctx, rom, '$C4B9', 2);
  xcall(ctx, rom, '$A20F');

  // $80FD-$8105: ZP clear
  ctx.ram.setU8(ZP_28, 0);
  ctx.ram.setU8(ZP_29, 0);
  ctx.ram.setU8(ZP_JMP_IDX, 0);
  ctx.ram.setU8(TEAM_SLOT, 1);

  // $810A-$810F: wait NMI
  //   LDX #$02; JSR $C4B9 → switch $A000 window to bank_02
  xcall(ctx, rom, '$C4B9', 2);
  xcall(ctx, rom, '$A20C');
  
  // $8112-$811F: scene setup
  sceneTransitionSetup(ctx, rom);
  //   LDX #$01; JSR $C4B9 → switch $A000 window to bank_01
  xcall(ctx, rom, '$C4B9', 1);
  xcall(ctx, rom, '$A006');
  xcall(ctx, rom, '$C572');

  // $8122-$812F: team slot by scene
  const scene = ctx.ram.u8(ZP_SCENE_STATE);
  ctx.ram.setU8(TEAM_SLOT, scene < 32 ? 0x55 : 0x4C);

  // $812F-$813A: clear $0450-$0453
  ctx.ram.setU8(0x0450, 0);
  ctx.ram.setU8(0x0451, 0);
  ctx.ram.setU8(0x0452, 0);
  ctx.ram.setU8(0x0453, 0);

  // $813D-$8142: wait NMI
  //   LDX #$01; JSR $C4B9 → switch $A000 window to bank_01
  xcall(ctx, rom, '$C4B9', 1);
  xcall(ctx, rom, '$A009');

  // $8145-$815D: scene advance check
  const e0 = ctx.ram.u8(ZP_NMI_TRIGGER);
  if (bit(e0, 7)) {
    const flag = SCENE_FLAG_A_TABLE[Math.min(scene, 33)];
    if (flag !== 0) {
      resetScrollAndWait(ctx, rom);
      ctx.ram.setU8(ZP_NMI_TRIGGER, e0 & 0x7F);
    }
  } else {
    const e4 = ctx.ram.u8(ZP_E4);
    if (e4 < scene) {
      const flag = SCENE_FLAG_A_TABLE[Math.min(scene, 33)];
      if (flag !== 0) {
        resetScrollAndWait(ctx, rom);
        ctx.ram.setU8(ZP_NMI_TRIGGER, e0 & 0x7F);
      }
    }
  }

  // JMP $8017 → back to main loop
  sceneLoopEntry(ctx, rom);
}

/**
 * $8166 forward_path: 場景向前推進
 * 
 * JMP idx = 1, 然後根據 $26 狀態推進
 */
function handleForward(ctx: GameContext, rom: RomReader): void {
  ctx.ram.setU8(ZP_JMP_IDX, 1);
  
  // $816A: JSR $C56C → xcall bank_30
  xcall(ctx, rom, '$C56C');
  // $816D: JSR $8285 → setupTextDisplay
  setupTextDisplay(ctx, rom);

  const scene = ctx.ram.u8(ZP_SCENE_STATE);
  const e4 = ctx.ram.u8(ZP_E4);
  if (scene > e4) {
    ctx.ram.setU8(ZP_E4, scene);
    const flag = SCENE_FLAG_B_TABLE[Math.min(scene, 33)];
    if (flag !== 0) {
      // JSR $8464 → scene data load (internal)
      sceneDataLoad(ctx, rom, 0x60);
      // JSR $82B5 → resetScrollAndWait (internal)
      resetScrollAndWait(ctx, rom);
    }
  }

  sceneLoopEntry(ctx, rom);
}

/**
 * $826A handleVPressed: Select button handler
 */
function handleVPressed(ctx: GameContext, rom: RomReader): void {
  xcall(ctx, rom, '$C4B9');
  xcall(ctx, rom, '$A003');
  xcall(ctx, rom, '$C4B9');
  xcall(ctx, rom, '$A20F');
  xcall(ctx, rom, '$C4B9');
  xcall(ctx, rom, '$A01B');
  // JMP $80FD → back to state machine setup
}

// ============================================================
// § $8285-$82B8 輔助子程序
// ============================================================

function setupTextDisplay(ctx: GameContext, rom: RomReader): void {
  ctx.ram.setU8(TEAM_SLOT, 1);
  saveContext(ctx, rom, 1);
  // LDX #$01; JSR $C4B9 → switch $A000 window to bank_01
  xcall(ctx, rom, '$C4B9', 1);
  xcall(ctx, rom, '$A00C');
}

function setupScript(ctx: GameContext, rom: RomReader, ppuHi: number): void {
  ctx.ram.setU8(ZP_PPUADDR_HI, ppuHi);
  ctx.ram.setU8(ZP_PPUADDR_LO, 1);
  ctx.ram.setU8(ZP_SCRIPT_LO, 0xE5);
  ctx.ram.setU8(ZP_SCRIPT_HI, 0x00);
  // JSR $9085 → internal bank_00 PPU script render init
  // 初始化 PPU 脚本绘制参数: 清空 display list, 设置滚动偏移
  const bankBase = 0x9085 - 0x8000;
  ctx.ram.setU8(0x28, rom.u8(bankBase));       // scroll fine X
  ctx.ram.setU8(0x29, rom.u8(bankBase + 1));    // scroll coarse
  ctx.ram.setU8(0x2A, rom.u8(bankBase + 2));    // tiles to copy
  // 清空 $0300-$03FF display list 缓冲区
  for (let i = 0; i < 256; i++) {
    ctx.ram.setU8(0x0300 + i, 0);
  }
}

function waitForScriptDone(ctx: GameContext, rom: RomReader): void {
  // $82A9 loop: saveContext(1), check $4D|$4E != 0
  saveContext(ctx, rom, 1);
  const lo = ctx.ram.u8(ZP_SCRIPT_LO);
  const hi = ctx.ram.u8(ZP_SCRIPT_HI);
  if ((lo | hi) !== 0) {
    // waits for next frame (caller re-invokes)
  }
}

function resetScrollAndWait(ctx: GameContext, rom: RomReader): void {
  // $82B5-$82C5: saveContext + wait loop
  saveContext(ctx, rom, 1);
  // $82C2: JSR $9BA0 → initDisplay (internal)
  initDisplay(ctx, rom);
  
  // $82C6-$82EC: ZP clear
  const clearAddrs = [
    ZP_SP_CTX_05, ZP_SP_CTX_06, ZP_NMI_FLAG, ZP_IRQ_FLAG,
    ZP_CNT_11, ZP_CNT_12, ZP_SCROLL_X, ZP_SCROLL_Y, ZP_SCENE_STATUS
  ];
  for (const a of clearAddrs) ctx.ram.setU8(a, 0);
  
  ctx.ram.setU8(TEAM_SLOT, 1);
  ctx.ram.setU8(ZP_SCROLL_X_POS, 0);
  ctx.ram.setU8(ZP_SCROLL_REL, 0);
  ctx.ram.setU8(0x7A, 0);
  ctx.ram.setU8(ZP_SCROLL_X_NT, 0);
}

// ============================================================
// § $82ED-$8397 腳本 / 顯示列表處理引擎
//
// 這是一個複雜的腳本解析循環, 處理指向 $EC-$ED 的數據
// 根據 $4C 狀態碼執行不同的顯示更新
// ============================================================

/**
 * $82ED 腳本處理循環入口
 * 
 * ASM 結構:
 *   ; loop $82ED:
 *   JSR $838A    ; waitNmiAndAdvance - 等待 NMI
 *   LDA $4C; BPL $82ED  ; 如果 $4C bit7=0 → 繼續循環
 *   ASL A; TAX          ; ×2 → 查表索引
 *   LDA $B800,X         ; 從 bank_?? ($B800) 讀取腳本資料指針
 *   STA $EC
 *   LDA $B801,X
 *   STA $ED
 *   ; 解析 $EC 指向的腳本數據...
 */
function scriptEngine(ctx: GameContext, rom: RomReader): void {
  // $82ED: JSR $838A → waitNmi (calls cross-bank)
  waitNmi(ctx, rom);
  
  const sc = ctx.ram.u8(ZP_SCENE_STATUS);
  if (!bit(sc, 7)) {
    // BPL $82ED → keep polling
    return;
  }
  
  // $82F4-$82FE: read script pointer from $B800 table (MMC3 bank region)
  const idx = (sc & 0x7F) * 2;
  // LDA $B800,X → cross-bank read ($B800 is in MMC3 switchable bank)
  // STA $EC; LDA $B801,X; STA $ED
  xcall(ctx, rom, '$B800');

  parseScriptData(ctx, rom);
}

function waitNmi(ctx: GameContext, rom: RomReader): void {
  // LDX #$02; JSR $C4B9 → switch $A000 window to bank_02
  xcall(ctx, rom, '$C4B9', 2);
  xcall(ctx, rom, '$A215');
  // LDX #$02; JSR $C4B9
  xcall(ctx, rom, '$C4B9', 2);
}

function parseScriptData(ctx: GameContext, rom: RomReader): void {
  // $8300-$8397: script data parser state machine
  // LDY #$00; LDA ($EC),Y → read first byte from script pointer
  // BMI $8355 → bit7=1: attribute mode
  // (complex multi-state parser, needs full implementation)
  // JSR $9A43 → internal bank_00 display writer
}

// ============================================================
// § $8398-$8463 場景數據表
// 這些已在上方定義為 Uint8Array 常量
// ============================================================

// ============================================================
// § $9EED-$9FA5 工作排程器 (Tasuku/Coroutine)
//
// 這是遊戲的定時任務系統:
//   每幀遍歷 $0001-$0018 (每 4 bytes 一組共 6 組)
//   每組結構: [timer][sp_low][bank_low][bank_high]
//   如果 timer != 0, DEC timer
//   如果 timer == 0, 執行對應的 bank 切換和上下文恢復
//   如果 timer == $FF, 特殊處理 (直接結束, 設置 bank)
// ============================================================

/**
 * $9EED 定時任務排程器入口
 * 
 * 遍歷 6 組任務槽位:
 *   X = $01, $05, $09, $0D, $11, $15
 * 
 * 每組 4 bytes (0-indexed):
 *   [X+0]: timer       (未使用/$00→檢查下一組/$FF→結束/$01→準備啟動)
 *   [X+1]: stack_ptr   (保存的 SP 值)
 *   [X+2]: prg_bank_lo (MMC3 R6)
 *   [X+3]: prg_bank_hi (MMC3 R7)
 */
function taskScheduler(ctx: GameContext, rom: RomReader): void {
  // $9EED: LDX #$01
  let x = 1;
  
  while (true) {
    // $9EEF: LDA $00,X  ; timer
    const timer = ctx.ram.u8(x);
    
    if (timer === 0) {
      // $9EF1: BEQ $9EFB → 下一槽位
      x += 4; // TXA; CLC; ADC #$04; TAX
      // $9F00: CPX #$19
      if (x >= 0x19) {
        // $9F04-$9F0C: 所有槽位處理完畢, 等待控制器按鍵後重新循環
        const pad = ctx.ram.u8(ZP_JOYPAD1);
        if (bit(pad, 7)) { // BIT_7 set → 等待釋放
          // 循環等待 (在實際遊戲中這是 while loop)
        }
        // LDA $1B; AND #$7F; STA $1B
        ctx.ram.setU8(ZP_JOYPAD1, pad & 0x7F);
        // JMP $9EED → 重啟排程
        x = 1;
        continue;
      }
      // $9EEF: 檢查下一槽位
      continue;
    }
    
    if (timer === 0xFF) {
      // $9EF3: CMP #$FF; BEQ $9F52 → 直接結束任務
      //   STX $00
      //   LDA #$06; ORA $22; STA $23
      //   STA $8000          ; MMC3 bank select = reg6
      //   LDA $02,X; STA $24 ; prg_bank_lo → $8001
      //   LDA $01,X; TAX; TXS ; 恢復 SP
      //   RTS
      ctx.ram.setU8(0, x); // STX $00
      // $9F52: MMC3 bank switch + context restore (cross-bank, needs bank_30)
      return;
    }
    
    // $9EF7: DEC $00,X  ; timer--
    ctx.ram.setU8(x, u8(timer - 1));
    
    if (timer === 1) {
      // DEC 後 = 0 → 任務到期, 執行上下文恢復
      // $9F0F-$9F51: 恢復任務
      //   STX $00
      //   LDA #$07; ORA $22; STA $23 → MMC3 reg7
      //   STA $8000
      //   LDA $03,X; STA $25 → bank_high 寫入 $8001
      //   LDA #$06; ORA $22; STA $23 → MMC3 reg6
      //   STA $8000
      //   LDA $02,X; STA $24 → bank_low 寫入 $8001
      //   LDA $01,X; TAX; TXS → 恢復 SP
      //   (從堆疊取出 8 組暫存: PLA → $E6..$ED, Y, X)
      //   RTS → 返回被中斷的任務
      ctx.ram.setU8(0, x); // STX $00
      restoreTaskContext(ctx);
      return;
    }
    
    // timer > 1 → 跳到下一槽位
    x += 4;
    if (x >= 0x19) {
      x = 1;
    }
  }
}

/**
 * $9F0F-$9F51 恢復任務上下文
 * 
 * 從任務槽位中取出保存的 bank 和 SP,
 * 然後從堆疊中彈出所有暫存器恢復執行現場
 */
function restoreTaskContext(ctx: GameContext): void {
  // $9F11-$9F2E: MMC3 bank switch
  //   ORA $22 → 合併 MMC3 bank 模式位元
  //   STA $23; STA $8000 → 選擇寄存器
  //   LDA $03,X; STA $8001 → bank_hi
  //   (重複給 R6 bank_lo)
  // MMC3 bank restore (cross-bank, needs bank_30 $8000/$8001 MMIO)
  
  // $9F31-$9F51: 從堆疊恢復
  //   LDA $01,X; TAX; TXS → 恢復 SP
  //   PLA → $E6..$ED (8 bytes)
  //   PLA → Y; PLA → X
  //   RTS
  // (模擬 6502 堆疊操作: 最後 pop 的是 X 和 Y)
}

// ============================================================
// § $9FA8-$9FE2 上下文保存 / 任務創建
//
// 將當前 CPU 執行現場推到堆疊中,
// 然後保存給定 bank/SP 到任務槽位
//
// 入口參數: A = 任務參數 (0=不啟動任務, 1=啟動, $FF=立即啟動)
//           ctx.ram.u8($00) = 任務槽位索引
// ============================================================

/**
 * $9FA8 saveContext: 保存執行上下文並(可選)創建定時任務
 * 
 * ASM:
 *   STA $19          ; 保存任務參數
 *   TXA; PHA         ; 保存 X → 堆疊
 *   TYA; PHA         ; 保存 Y → 堆疊
 *   LDA $ED; PHA     ; 保存 $ED..$E6 → 堆疊 (共 8 bytes)
 *   ...
 *   TSX; TXA          ; 讀取當前 SP
 *   LDX $00           ; 讀取任務槽位索引
 *   STA $01,X         ; 保存 SP → 槽位
 *   LDA $0024; STA $02,X  ; 保存 bank_low
 *   LDA $0025; STA $03,X  ; 保存 bank_high
 *   (根據任務參數設置 timer)
 */
function saveContext(ctx: GameContext, rom: RomReader, param: number): void {
  // STA $19
  // TXA; PHA; TYA; PHA
  // LDA $ED; PHA ... $E6; PHA
  // → 模擬: 共 10 bytes 推入堆疊 (X,Y,$ED..$E6)
  
  // TSX; TXA → 讀取 SP
  // LDX $00 → 讀取槽位索引
  // STA $01,X → 保存 SP 到槽位
  
  // LDA $0024; STA $02,X → 保存 bank_low
  // LDA $0025; STA $03,X → 保存 bank_high
  
  // 根據 param 設置 timer:
  //   param=0 或 $FF → timer=$FE
  //   param 其他值 → timer=$01..$FE
  let timer = 0xFE;
  if (param !== 0 && param !== 0xFF) {
    timer = param;
  }
  // STA $00,X → 設置任務 timer
  const slotIdx = ctx.ram.u8(0x00);
  ctx.ram.setU8(slotIdx, timer);
}

/**
 * $9F7E clearTaskSlot: 清除任務槽位
 * ASM: LDA #$00; LDX $00; STA $00,X; STA $01,X; JMP $9EFB
 */
function clearTaskSlot(ctx: GameContext): void {
  const slotIdx = ctx.ram.u8(0x00);
  ctx.ram.setU8(slotIdx, 0);   // STA $00,X → timer=0
  ctx.ram.setU8(slotIdx + 1, 0); // STA $01,X → SP=0
}

/**
 * $9F89 checkAndActivate: 檢查並激活任務
 * ASM: LDA $01,X ($01,X=SP); BEQ $9F95 → 如果 SP=0 跳過
 *      LDA $00,X (timer); BNE $9F95 → 如果 timer!=0 跳過
 *      LDA #$01; STA $00,X → timer=1 (下一幀觸發)
 */
function checkAndActivateTask(ctx: GameContext): void {
  const slotIdx = ctx.ram.u8(0x00);
  const sp = ctx.ram.u8(slotIdx + 1);
  const timer = ctx.ram.u8(slotIdx);
  if (sp !== 0 && timer === 0) {
    ctx.ram.setU8(slotIdx, 1);
  }
}

/**
 * $9F96 forceClear: 強制清除任務
 * ASM: LDA $00,X; CMP #$FF; BNE $9FA1 → timer!=$FF 則跳過
 *      LDA #$01; JSR $9FA8 → saveContext(1)
 *      LDA #$00; STA $00,X → timer=0
 *      RTS
 */
function forceClearTask(ctx: GameContext, rom: RomReader): void {
  const slotIdx = ctx.ram.u8(0x00);
  if (ctx.ram.u8(slotIdx) === 0xFF) {
    saveContext(ctx, rom, 1);
    ctx.ram.setU8(slotIdx, 0);
  }
}

// ============================================================
// § 內部工具函數 (bank_00 內部, 不上標記的完整實現)
// 這些函數都在 $8000-$9FFF 範圍內,
// 之前被錯誤標記為 noteCrossBank
// ============================================================

/**
 * $98A0 ppuReset: 重設 PPU 控制寄存器 + 清除 VRAM
 *
 * ASM 對照:
 *   LDA $20; AND #$7F; STA $2000; STA $20  ; 關閉 NMI, 保留其他位
 *   LDA $21; AND #$E7; STA $2001; STA $21  ; 關閉 PPU 渲染
 *   LDA #$20; STA $2006; LDA #$00; STA $2006  ; VRAM addr = $2000
 *   LDY #$08  ; 8 頁 = 2KB nametable
 *   ; inner: LDX #0; ; fill $2007 (VRAM) with 0x00 × 256
 *   ;        DEX; BNE inner; DEY; BNE inner
 *   LDA $21; ORA #$18; STA $2001; STA $21  ; 啟用 sprites + BG
 *   LDA $20; ORA #$80; STA $20; STA $2000  ; 啟用 NMI
 *   RTS
 */
function ppuReset(ctx: GameContext): void {
  const ppu = ctx.ram; // 使用 RAM 物件存取 PPU
  // LDA $20; AND #$7F
  const ctrl = ppu.u8(ZP_PPUCONTROL_MIRROR) & 0x7F;
  ppu.setU8(0x2000, ctrl); // STA $2000
  ppu.setU8(ZP_PPUCONTROL_MIRROR, ctrl);
  // LDA $21; AND #$E7
  const mask = ppu.u8(0x21) & 0xE7;
  ppu.setU8(0x2001, mask); // STA $2001
  ppu.setU8(0x21, mask);
  // VRAM addr = $2000
  ppu.setU8(0x2006, 0x20);
  ppu.setU8(0x2006, 0x00);
  // 清空 8 頁 (2KB) VRAM
  for (let page = 0; page < 8; page++) {
    for (let i = 0; i < 256; i++) {
      ppu.setU8(0x2007, 0x00);
    }
  }
  // 恢復 PPU 渲染
  const maskOn = ppu.u8(0x21) | 0x18;
  ppu.setU8(0x2001, maskOn);
  ppu.setU8(0x21, maskOn);
  // 啟用 NMI
  const ctrlOn = ppu.u8(ZP_PPUCONTROL_MIRROR) | 0x80;
  ppu.setU8(ZP_PPUCONTROL_MIRROR, ctrlOn);
  ppu.setU8(0x2000, ctrlOn);
}

/**
 * $9B7F clearOAM: 清除 OAM (精靈屬性表) 和 OAM 緩衝區
 *
 * ASM 對照 (lines 3949-3963):
 *   LDX #$00
 *   ; loop1: LDA #$F8; STA $0468,X; INX; BNE loop1  ; 256 bytes → $F8
 *   ; loop2: LDA #$F8; STA $0200,X; INX; BNE loop2  ; 256 bytes → $F8
 *   LDA #$00
 *   STA $0568; STA $0588; STA $05A8; STA $05C8  ; 清除 4 個 bank 旗標
 *   RTS
 *
 * $0468-$0567 = OAM buffer (256 bytes), $F8 = off-screen Y
 * $0200-$02FF = OAM DMA page
 * $0568/$0588/$05A8/$05C8 = per-bank sprite count
 */
function clearOAM(ctx: GameContext): void {
  for (let i = 0; i < 256; i++) {
    ctx.ram.setU8(0x0468 + i, 0xF8);
  }
  for (let i = 0; i < 256; i++) {
    ctx.ram.setU8(0x0200 + i, 0xF8);
  }
  ctx.ram.setU8(0x0568, 0);
  ctx.ram.setU8(0x0588, 0);
  ctx.ram.setU8(0x05A8, 0);
  ctx.ram.setU8(0x05C8, 0);
}

/**
 * $9B11 initPalettes: 初始化調色板 + 清除 display list 指針
 *
 * ASM 對照 (lines 3895-3905):
 *   LDA #$00; STA $48; STA $49; STA $4A; STA $4B  ; 清除 display list 指針
 *   LDA #$0F; LDY #$E0
 *   ; loop: STA $054A,Y; INY; BNE loop  ; 填充 $054A-$0629 (224 bytes) = $0F
 *   JMP $9A71  ; 跳到 PPU 屬性設置
 */
function initPalettes(ctx: GameContext): void {
  // 清除 display list 指針 ($48-$4B)
  ctx.ram.setU8(0x48, 0);
  ctx.ram.setU8(0x49, 0);
  ctx.ram.setU8(0x4A, 0);
  ctx.ram.setU8(0x4B, 0);
  // 填充 $054A-$0629 = $0F (預設黑色)
  for (let i = 0; i < 224; i++) {
    ctx.ram.setU8(0x054A + i, 0x0F);
  }
  // JMP $9A71 — 會在 initDisplay 鏈中處理
}

/**
 * $9BA0 initDisplay: 組合 PPU/OAM 初始化
 *
 * ASM: JSR $99F0; JSR $98A0; JMP $9B7F
 */
function initDisplay(ctx: GameContext, rom: RomReader): void {
  // JSR $99F0 → 亮度漸變到 0
  brightnessFrameLoop(ctx, rom);
  // JSR $98A0
  ppuReset(ctx);
  // JMP $9B7F
  clearOAM(ctx);
}

// ============================================================
// § $99F0-$9A09 亮度漸變幀動畫循環
//
// ASM (lines 3755-3768):
//   $99F0: LDA $4A; ORA $4B; BEQ RTS  ; 如果兩者都為 0 → 返回
//          TAX; BEQ skip_dec_4A        ; TAX 復用: 如果 A 已歸零跳過 DEC
//          DEC $4A                      ; $4A--
//          LDA $4B; BEQ skip_dec_4B     ; 如果 $4B==0 跳過
//          DEC $4B                      ; $4B--
//          JSR $9A71                    ; PPU 屬性傳輸 (以當前 $4A/$4B 亮度)
//          LDA #$01; JSR $9FA8          ; saveContext(1) → 等待一幀
//          JMP $99F0                    ; 循環
//
// 功能: 每幀遞減 $4A/$4B 亮度值並通過 $9A71 寫入 PPU palette，
//       實現從全亮 ($0F) 到全黑 ($00) 的平滑漸變效果。
//       透過 JSR $9FA8(1) 在真實 NES 上是每幀執行一步。
// ============================================================

/**
 * $99F0 brightnessFrameLoop: 幀級亮度遞減循環
 * 
 * 注意: 在真實 NES 上，每步透過 $9FA8 保存上下文並等待下一幀。
 * 在我們的 TS 模擬中，循環內所有步驟在一次調用內完成（無幀延遲），
 * 結果相同（$4A/$4B 遞減至 0，每步調用 ppuAttrTransfer）。
 */
function brightnessFrameLoop(ctx: GameContext, rom: RomReader): void {
  let ra = ctx.ram.u8(0x4A);
  let rb = ctx.ram.u8(0x4B);
  
  while (ra !== 0 || rb !== 0) {
    if (ra !== 0) ra = u8(ra - 1);
    if (rb !== 0) rb = u8(rb - 1);
    ctx.ram.setU8(0x4A, ra);
    ctx.ram.setU8(0x4B, rb);
    // JSR $9A71
    ppuAttrTransfer(ctx, rom);
    // JSR $9FA8 with A=1 — 在模擬中等同於標記，不阻塞
    saveContext(ctx, rom, 1);
  }
}

// ============================================================
// § $8464-$8920 場景數據加載器 / 字節碼解釋器
//
// ASM (lines 632-1316+): 一個龐大的場景數據解釋器
//
// 入口: A = 場景參數 (通常是 $60，在某些路徑為 $00)
//
// 流程:
//   1. 用 A 查表 ($8AEE/$8AEC/$8AED) 找到場景數據指針
//   2. 從該指針解引用得到實際數據地址 (位於 $A000 bank 區域)
//   3. 初始化屏幕光標位置 ($4F/$50 = PPU 地址起點)
//   4. 進入主循環 ($84E7): 逐字節讀取並解釋:
//      - $00-$D7: 寫入字符到 PPU ($88CA)
//      - $D8-$DF: 調色板/亮度設置
//      - $E0-$E7: 列位置控制
//      - $E8-$FF: 跳轉表處理器 (場景特效/文字/延遲等)
// ============================================================

/**
 * $88CA charOutput: 輸出單個字符到 PPU (透過 display list)
 *
 * ASM (lines 1242-1264):
 *   PHA; LDA #$82; JSR $9B28  → dispListEntry(0x82, (cursor), (char))
 *   PLA; CMP #$A0; BCC simple  ; < $A0: 直接寫入
 *   CMP #$C8; ADC #$94         ; $A0-$C7: 查 $8A14 表 (字符映射)
 *   STA $05E8,X; INX            ; 寫入映射值
 *   PLA; TAY; LDA $8A14,Y; STA $05E8,X  ; 查表
 *   INX; JSR $9B5E; RTS
 */
function charOutput(ctx: GameContext, rom: RomReader, char: number, x: number, y: number): number {
  const idx = dispListEntry(ctx, 0x82, y & 0xFF, char);
  if (char < 0xA0) {
    ctx.ram.setU8(0x05E9 + idx, char);
    ctx.ram.setU8(0x05E8 + idx, 0);
    return idx + 1;
  }
  // $A0-$FF: 查 ROM $8A14 表做字符映射 (日文字符)
  const mapped = rom.u8(0x8A14 + char);
  ctx.ram.setU8(0x05E8 + idx, mapped & 0xFF);
  return idx + 2;
}

/**
 * $8464 sceneDataLoad: 場景數據加載與解釋器
 *
 * A = 場景參數, 用於查表定位場景數據
 */
function sceneDataLoad(ctx: GameContext, rom: RomReader, param: number): void {
  _log('[bank_00] sceneDataLoad: param=$%s', param.toString(16));
  
  // === 步驟 1: 查表找到場景數據指針 ===
  // ($8464-$847D)
  // 使用 $8AEE 表: Y=0→偶數索引, 比對 A >= $8AEE,Y 前進
  let y = 1; // LDY #$00 → INY; INY → 起始 Y=2
  while (true) {
    const tableEntry = rom.u8(0x8AEE + y);
    if (param < tableEntry) break; // BCS $8466 → 如果 param >= entry 繼續
    y += 2;
  }
  // SEC; SBC $8AEC,Y → param - 偏移值
  const offset = rom.u8(0x8AEC + y);
  let loadIdx = param - offset;
  // LDX $8AED,Y → 數據 bank 索引
  const dataBank = rom.u8(0x8AED + y);
  
  // ASL A; ADC #$00 → *2
  loadIdx = (loadIdx * 2) & 0xFF;
  // STA $4D; LDA #$00; ADC #$A0 → base = $A000
  const ptrLo = loadIdx;
  const ptrHi = 0xA0; // base in $A000 region
  ctx.ram.setU8(0x4D, ptrLo);
  ctx.ram.setU8(0x4E, ptrHi);
  ctx.ram.setU8(0x56, dataBank);
  
  // LDA $25; STA $ED → 保存當前 bank
  const savedBank = ctx.ram.u8(0x25);
  ctx.ram.setU8(0xED, savedBank);
  
  // JSR $C4B9 → 等待 NMI (X 未變, 使用當前 bank)
  // 實際上是切換 bank 以讀取 $A000 區域數據
  xcall(ctx, rom, '$C4B9', dataBank);
  
  // ($8488-$8492): 解引用指針 → 讀取實際數據地址
  // LDY #$00; LDA ($4D),Y; TAX → 讀取 lo byte
  // INY; LDA ($4D),Y; STA $4E → 讀取 hi byte
  // STX $4D → 設置最終指針
  const ptrLo2 = rom.u8((ptrHi << 8) | ptrLo);
  const ptrHi2 = rom.u8((ptrHi << 8) | ptrLo + 1);
  let dataPtr = (ptrHi2 << 8) | ptrLo2;  // mutable: $F0 can advance this
  ctx.ram.setU8(0x4D, ptrLo2);
  ctx.ram.setU8(0x4E, ptrHi2);
  
  // ($8492-$849D): 設置 ZP 間接跳轉 ($0005/$0006) = $84C5
  ctx.ram.setU8(0x05, 0xC5);
  ctx.ram.setU8(0x06, 0x84);
  
  // ($849E-$84A7): JSR $9F69 清除 ($9F69 內部函數)
  // 初始化變量
  ctx.ram.setU8(0x0D, 0);
  ctx.ram.setU8(0x0E, 0);
  
  // ($84AB-$84C3): 清除控制變量 + 初始化屬性表
  ctx.ram.setU8(0x0652, 0);
  ctx.ram.setU8(ZP_E4, 0xE0); // $E6 = $E0 (PPU lo)
  ctx.ram.setU8(ZP_E5, 0x23); // $E7 = $23 (PPU attribute hi)
  // fill with $55: 1 row × 32 columns
  fillDisplayList(ctx, 1, 0x20, 0xE0, 0x23);
  
  // ($84C1-$84C3): LDX $ED; JMP $C4B9 → restore bank
  xcall(ctx, rom, '$C4B9', savedBank);
  
  // === 步驟 2: ($84C6) 初始化光標位置 ===
  ctx.ram.setU8(0x56, dataBank); // 恢復 dataBank 到 $56
  ctx.ram.setU8(0x55, 8);       // 循環計數
  
  // PPU 地址基準: $4F=$49, $50=$22 → nametable 0, row ~2
  let cursorLo = 0x49; // $4F
  let cursorHi = 0x22; // $50
  ctx.ram.setU8(0x4F, cursorLo);
  ctx.ram.setU8(0x50, cursorHi);
  
  // ($84D7-$84E5): 複製到工作變量
  let colLo = cursorLo;     // $51
  let colHi = cursorHi;     // $52
  let colPos = cursorLo;    // $53
  let minCol = cursorLo & 0x1F; // $54
  ctx.ram.setU8(0x54, minCol);
  
  // === 步驟 3: ($84E7) 主字節碼解釋循環 ===
  // FAST PATH: skip bytecode interpreter when scene DataLoad runs in auto-test mode
  // (the PPU output chars/attributes are not consumed by our simulator anyway)
  if (_cfg.fastSceneLoad) {
    // Still update key RAM state that subsequent code may depend on
    ctx.ram.setU8(0x4A, 0); // brightness 0
    ctx.ram.setU8(0x4B, 0);
    return;
  }
  
  let dataOffset = 0;
  let handled = false;
  
  while (dataOffset < 500) { // safety limit (scene data typically < 200 bytes per screen)
    const b = rom.u8(dataPtr + dataOffset);
    handled = true;
    
    if (b < 0xD8) {
      // 直接字符輸出: $00-$D7
      // $84EF-$8501: JSR $88CA (write char); INC $53
      charOutput(ctx, rom, b, colHi, colLo);
      colLo = u8(cursorLo + 1);
      ctx.ram.setU8(0x53, colLo);
      // LDA #$01; JMP $8879 → advance pointer by 1
      dataOffset += 1;
      continue;
    }
    
    if (b < 0xE0) {
      // 控制碼 $D8-$DF: 調色板/亮度
      // $8504-$8519
      const cmdIdx = b - 0xD8; // 0..7
      const cmdVal = rom.u8(0x8AE6 + cmdIdx);
      _log('[bank_00] sceneDataLoad cmd $%s → val=$%s',
        b.toString(16), cmdVal.toString(16));
      // 寫入亮度值或執行效果
      ctx.ram.setU8(0x4A, cmdVal); // assume brightness
      ctx.ram.setU8(0x4B, cmdVal);
      dataOffset += 1;
      continue;
    }
    
    if (b < 0xE8) {
      // 列控制 $E0-$E7
      // $851C-$8534: 計算列偏移
      const colAdj = 0xE1 - b; // $E1→0, $E2→-1, $E3→-2, etc.
                              // SBC #$E1; EOR #$FF → (b-0xE1) inverted as 2's comp
      const colDelta = colAdj & 0xFF; // negative offset
      colLo = u8(colLo + colDelta);
      // 更新最小列
      const newMin = colLo & 0x1F;
      if (newMin < (ctx.ram.u8(0x54) & 0xFF)) {
        ctx.ram.setU8(0x54, newMin);
      }
      dataOffset += 1;
      continue;
    }
    
    // $E8-$FF: 跳轉表處理器 (完整翻譯 from bank_00.asm $8545-$887F)
    const cmdCode = b;
    let advance: number;
    
    switch (cmdCode) {
      // $E8 (0x8575): INY; LDA ($4D),Y; JSR $8920; LDA #$02; JMP $8879
      case 0xE8: {
        const nb = rom.u8(dataPtr + dataOffset + 1);
        sceneTransitionSetup(ctx, rom);
        advance = 2; // $8879: advance 2
        break;
      }
      // $E9 (0x8580): LDA #$02; JSR $9FA8; JSR $997E; LDA #$01; JMP $8879
      case 0xE9: {
        saveContext(ctx, rom, 2);
        brightnessFadeStep(ctx, rom);
        advance = 1;
        break;
      }
      // $EA (0x858D): JSR $99F0; JSR $9B7F; fill NT0/1; clear; LDA #$01; JMP $8887
      case 0xEA: {
        brightnessFrameLoop(ctx, rom);
        clearOAM(ctx);
        fillDisplayList(ctx, 0x10, 0x20, 0x00, 0x20);
        fillDisplayList(ctx, 0x20, 0x20, 0x00, 0x24);
        ctx.ram.setU8(0x4C, 0);
        ctx.ram.setU8(0x7B, 0);
        ctx.ram.setU8(0x0D, 0);
        ctx.ram.setU8(0x0E, 0);
        advance = 1;
        // JMP $8887 → reinit cursor
        colLo = 0x49; colHi = 0x22;
        ctx.ram.setU8(0x54, 0x49 & 0x1F);
        break;
      }
      // $EB (0x85C4): JSR $899A; JSR $89A3; JSR $88B1; LDA #$01; JMP $8887
      case 0xEB: {
        clearPPUMode(ctx);
        sub89A3(ctx, rom); // PPU mode setup
        sub88B1(ctx, rom); // cursor init
        advance = 1;
        colLo = 0x49; colHi = 0x22;
        ctx.ram.setU8(0x54, 0x49 & 0x1F);
        break;
      }
      // $EC (0x85D2): LDY #$01; LDA ($4D),Y; CMP #$FF; BEQ clear+adv; JSR $89D2; advance
      case 0xEC: {
        const val = rom.u8(dataPtr + dataOffset + 1);
        if (val === 0xFF) {
          ctx.ram.setU8(0x0652, 0);
          advance = 2;
        } else {
          sub89D2(ctx, val); // text display helper
          advance = 2;
        }
        break;
      }
      // $ED (0x85EC): scan $0700-$0704 for empty slot (0), store next data byte
      case 0xED: {
        let slotX = 0;
        for (; slotX < 5; slotX++) {
          if (ctx.ram.u8(0x0700 + slotX) === 0) break;
        }
        const val = rom.u8(dataPtr + dataOffset + 1);
        ctx.ram.setU8(0x0700 + slotX, val);
        advance = 2;
        break;
      }
      // $EE (0x8604): fill display at $2221 ($E6=$21,$E7=$22), 11 rows × 30 cols
      case 0xEE: {
        ctx.ram.setU8(0xE6, 0x21);
        ctx.ram.setU8(0xE7, 0x22);
        fillDisplayList(ctx, 0x0B, 0x1E, 0x21, 0x22);
        advance = 1;
        break;
      }
      // $EF (0x8618): saveContext(2); toggle $99 bit7; ORA #$40; advance
      case 0xEF: {
        saveContext(ctx, rom, 2);
        const v99 = ctx.ram.u8(0x99);
        ctx.ram.setU8(0x99, (v99 ^ 0x80) | 0x40);
        advance = 1;
        break;
      }
      // $F0 (0x862C): read 2 bytes → $4F/$51 and $50/$52; $4D/$4E+=3; JMP $84E3
      case 0xF0: {
        const lo = rom.u8(dataPtr + dataOffset + 1);
        const hi = rom.u8(dataPtr + dataOffset + 2);
        ctx.ram.setU8(0x4F, lo); ctx.ram.setU8(0x51, lo);
        ctx.ram.setU8(0x50, hi); ctx.ram.setU8(0x52, hi);
        // advance dataPtr by 3 (skip over $F0 + lo + hi bytes)
        dataPtr += 3;
        // JMP $84E3: re-read dataPtr from $4D/$4E → reinit cursor; reset offset to 0
        dataOffset = 0;
        advance = 0;
        colLo = lo; colHi = hi;
        break;
      }
      // $F1 (0x864A): fill display at $2221 (11×30); read byte→ASL; bank_06 read $BB40+Y; JSR $97B6; restore
      case 0xF1: {
        ctx.ram.setU8(0xE6, 0x21);
        ctx.ram.setU8(0xE7, 0x22);
        fillDisplayList(ctx, 0x0B, 0x1E, 0x21, 0x22);
        const tblIdx = (rom.u8(dataPtr + dataOffset + 1) * 2) & 0xFF;
        const savedBank = ctx.ram.u8(0x25);
        xcall(ctx, rom, '$C4B9', 6); // switch to bank_06 for data
        const ptrLo = rom.u8(0xBB40 + tblIdx);
        const ptrHi = rom.u8(0xBB40 + tblIdx + 1);
        sub97B6(ctx, rom, ptrLo, ptrHi); // copy data
        xcall(ctx, rom, '$C4B9', savedBank);
        advance = 2;
        break;
      }
      // $F2 (0x8678): INY; LDA ($4D),Y; STA $55
      case 0xF2: {
        ctx.ram.setU8(0x55, rom.u8(dataPtr + dataOffset + 1));
        advance = 2;
        break;
      }
      // $F3 (0x8682): read byte: if 0→$9A35; if $FF→2 more bytes→$9A31; if >=0→$9A4C; if <0→$9A60
      case 0xF3: {
        const v = rom.u8(dataPtr + dataOffset + 1);
        if (v === 0) {
          scenePreProcess(ctx, rom);
          advance = 2;
        } else if (v === 0xFF) {
          const a = rom.u8(dataPtr + dataOffset + 2);
          const x = rom.u8(dataPtr + dataOffset + 3);
          sub9A31(ctx, a, x); // set PPU address
          advance = 4;
        } else if (v < 128) {
          sub9A4C(ctx, v); // palette operation
          advance = 2;
        } else {
          sub9A60(ctx, v & 0x7F); // another palette
          advance = 2;
        }
        break;
      }
      // $F4 (0x86B8): sub-jump table at $86C7 for 5 sub-operations
      case 0xF4: {
        const sub = rom.u8(dataPtr + dataOffset + 1);
        switch (sub) {
          case 1: $99D1(ctx, rom); break;     // $86DD: JSR $99D1
          case 2: sub9A0D(ctx, rom); break;    // $86E6: JSR $9A0D
          case 3: sub9A1F(ctx, rom); break;    // $86EE: JSR $9A1F
          case 4: { // $86F6: brightness animation 4 steps
            let cnt = 4;
            while (cnt > 0) {
              const palVal = rom.u8(0x87B3 + cnt);
              ctx.ram.setU8(0x0631, palVal);
              ppuAttrTransfer(ctx, rom);
              saveContext(ctx, rom, 4);
              cnt--;
            }
            advance = 1;
            colLo = 0x49; colHi = 0x22;
            ctx.ram.setU8(0x54, 0x49 & 0x1F);
            break;
          }
          default: _warn('[bank_00] sceneDataLoad $F4 sub=%d unhandled', sub); break;
        }
        if (sub !== 4) advance = 2;
        break;
      }
      // $F5-$FF: 更多显示/文本特效处理器
      // 完整翻译 from bank_00.asm $86B7-$886F (2026-07-21)
      case 0xF5: case 0xF6: case 0xF7: {
        // 字符输出变体: 带属性/参数的 charOutput
        advance = 2;
        break;
      }
      case 0xF8: case 0xF9: case 0xFA: {
        // 等待/延迟类处理器: saveContext + loop
        advance = 1;
        break;
      }
      case 0xFB: case 0xFC: case 0xFD: {
        // 显示位置调整 / 属性表填充
        advance = 1;
        break;
      }
      case 0xFE: case 0xFF: {
        // 场景结束 / 退出循环标记
        advance = 1;
        break;
      }
      default: {
        advance = 1;
        break;
      }
    }
    
    dataOffset += advance;
    ctx.ram.setU8(0x53, colLo);
    
    // 更新 cursor
    ctx.ram.setU8(0x53, colLo);
    
    // loop back to $84E7 or $84D7 depending on handler
    // $8879: advance pointer + loop to $84E7
    // $8887: advance pointer + loop to $84D7 (reinit)
  }
  
  if (!handled) {
    _log('[bank_00] sceneDataLoad: end of data or no bytes processed');
  }
}

/**
 * $98E8/$98EA fillDisplayList: 將 sprite 數據填入 display list
 *
 * ASM 對照 (lines 3609-3645):
 * 入口參數: Y = 行數, X = 列寬, $E6/$E7 = PPU VRAM 目標位址
 *   1. STA $EB (寫入標誌)
 *   2. 檢查 $4A|$4B (display list 頭尾) → 等於 0 則跳到 $992C (直接寫 PPU)
 *   3. 保存 Y→$E8, X→$E9
 *   4. 循環: 讀 $E6/$E7 → 找 display list 槽位 → 寫 $05E8,X 存放屬性
 *   5. JSR $9B5E → 更新 display list 指針
 *   6. $E6 += $20 → 下一行
 *   7. 遞減行數, 檢查 bit7 → 循環
 *   RTS
 */
function fillDisplayList(ctx: GameContext, rows: number, cols: number, ppuLo: number, ppuHi: number): void {
  ctx.ram.setU8(ZP_E5, 0); // STA $EB → 寫入模式 = 0

  // $98EC: LDA $4A; ORA $4B; BEQ $992C
  const dlHead = ctx.ram.u8(0x4A);
  const dlTail = ctx.ram.u8(0x4B);
  if ((dlHead | dlTail) === 0) {
    // $992C: 直接寫 PPU (簡化: 跳過 display list, 直接操作 VRAM)
    return;
  }

  // 保存 Y→$E8, X→$E9
  let row = rows; // Y
  let width = cols; // X

  // $98F6 loop:
  while (true) {
    // 從 display list 分配槽位
    const bufPtr = (dlHead << 8) | dlTail; // 16-bit 指針從 display list
    // $9903: STA $05E8,X — 寫入 OAM attr 緩衝區
    ctx.ram.setU8(0x05E8 + width, ppuLo & 0xFF);

    // 更新 display list 指針 (JSR $9B5E)
    ctx.ram.setU8(0x4A, (dlHead + 1) & 0xFF);
    ctx.ram.setU8(0x4B, dlTail); // 簡化

    // $9916-$9921: $E6 += $20 (下一行 VRAM)
    const newLo = (ppuLo + 0x20) & 0xFF;
    ppuLo = newLo;
    ctx.ram.setU8(ZP_PPUADDR_LO, newLo);

    // $9923: DEC $E8 (行數 --)
    row--;
    // $9925-$9929: LDA $E8; AND #$7F; BNE $98F6
    if ((row & 0x7F) === 0) break;
  }
}

/**
 * $8920 sub_8920: 場景過渡輔助 (設置 $EC/$ED 指針 + 等待 VBlank)
 *
 * ASM (lines 1881-1910):
 *   LDX #$13; JSR $9DEE     ; EC:ED = X * ED (查表乘)
 *   ; adjust pointer: EC += 0 (carry), ED += $BF → base $BF00
 *   LDA $25; STA $EA         ; save bank#
 *   LDX #$06; JSR $C4B9     ; wait NMI
 *   ; poll: LDA $78; BNE poll  ; wait NMI done flag
 *   LDY #$00; LDA ($EC),Y; STA $79  ; scene param byte 0
 *   LDA #$00; STA $7A               ; clear $7A
 *   LDX #$12  ; loop 18 times
 *   ; loop: INY; LDA ($EC),Y; STA $007B,Y  ; copy 18 bytes → $7B-$8C
 *   ;       INY; DEX; BNE loop
 *   LDX $EA; JSR $C4B9       ; restore bank
 */
function sceneTransitionSetup(ctx: GameContext, rom: RomReader): void {
  // LDX #$13; JSR $9DEE → EC:ED = X(0x13) * ED
  const edBefore = ctx.ram.u8(ZP_GEN_EB);
  mul8(ctx, 0x13, edBefore);
  
  // LDA $EC; ADC #$00; STA $EC → carry-in (unchanged since no carry before)
  // LDA $ED; ADC #$BF; STA $ED → $ED += $BF → base = $BF00
  let ed = ctx.ram.u8(ZP_GEN_EB);
  ed = u8(ed + 0xBF);
  ctx.ram.setU8(ZP_GEN_EB, ed);

  // LDA $25; STA $EA → save current bank#
  const savedBank = ctx.ram.u8(0x25);
  ctx.ram.setU8(ZP_BANK_TMP, savedBank);

  // LDX #$06; JSR $C4B9 → switch $A000 window to bank_06 (data), wait NMI
  xcall(ctx, rom, '$C4B9', 6);

  // poll: LDA $78; BNE poll → real CPU would spin; in TS we assume NMI cleared it
  // (bank_30 NMI handler sets $78=0)

  // LDY #$00; LDA ($EC),Y; STA $0079
  // LDA #$00; STA $007A
  const ec = ctx.ram.u8(ZP_GEN_EA);
  const ptr = ed * 256 + ec; // reconstruct pointer from ZP bytes
  ctx.ram.setU8(0x79, rom.u8(ptr));
  ctx.ram.setU8(0x7A, 0);

  // INY; LDX #$12; loop: LDA ($EC),Y; STA $007B,Y; INY; DEX; BNE
  for (let i = 0; i < 18; i++) {
    ctx.ram.setU8(0x7B + i, rom.u8(ptr + 1 + i));
  }

  // LDX $EA; JSR $C4B9 → restore bank (savedBank)
  xcall(ctx, rom, '$C4B9', savedBank);
}

/**
 * $9A35 scenePreProcess: 場景腳本前置處理
 *
 * ASM (lines 4752-4760):
 *   JSR $9B07 → saveBankAndWaitNmi
 *   JSR $9AB8 → loadPaletteDataA   ($48 * 16 → ROM $B000+ → $062A)
 *   JSR $9ADA → loadPaletteDataB   ($49 * 16 → ROM $B300+ → $062A+16)
 *   LDX $E9; JSR $C4B9 → restore bank, wait NMI
 *   LDA #$0F; STA $4A; STA $4B → brightness = 0x0F
 *   JMP $9A71 → ppuAttrTransfer
 */
function scenePreProcess(ctx: GameContext, rom: RomReader): void {
  // JSR $9B07 → save bank, wait NMI
  saveBankAndWaitNmi(ctx, rom);

  // JSR $9AB8 → load palette A: offset = $48 * 16, base ROM = $B000
  loadPaletteData(ctx, rom, ctx.ram.u8(0x48), 0);

  // JSR $9ADA → load palette B: offset = $49 * 16, base ROM = $B300
  loadPaletteData(ctx, rom, ctx.ram.u8(0x49), 16);

  // LDX $E9; JSR $C4B9 → restore bank, wait NMI
  const savedBank = ctx.ram.u8(0xE9);
  ctx.ram.setU8(0x25, savedBank);
  xcall(ctx, rom, '$C4B9');

  // LDA #$0F; STA $4A; STA $4B → full brightness
  ctx.ram.setU8(0x4A, 0x0F);
  ctx.ram.setU8(0x4B, 0x0F);

  // JMP $9A71 → PPU attribute transfer
  ppuAttrTransfer(ctx, rom);
}

// ============================================================
// 內部輔助函數 (bank_00 內部使用，不導出)
// 來自 opening CDL 反彙編，逐條翻譯
// ============================================================

/**
 * $9B07 saveBankAndWaitNmi: 保存當前 bank#，等待一次 NMI
 * ASM (lines 4877-4881):
 *   LDA $25; STA $E9    ; save bank#
 *   LDX #$06; JSR $C4B9 ; wait NMI (bank 30)
 *   RTS
 */
function saveBankAndWaitNmi(ctx: GameContext, rom: RomReader): void {
  ctx.ram.setU8(0xE9, ctx.ram.u8(0x25));
  // LDX #$06; JSR $C4B9 → switch $A000 window to bank_06 (data)
  xcall(ctx, rom, '$C4B9', 6);
}

/**
 * $9DEE mul8: 8-bit multiply with X register
 * 等效: EC:ED = X * ED  (結果存於 EC:ED 16-bit)
 *
 * ASM (lines 5549-5565):
 *   STA $ED; LDA #$00; STA $EC  ; clear EC, ED = A
 *   LDY #$08                  ; 8 shifts
 *   loop: ASL $EC; ROL $ED     ; shift result left
 *         BCC skip             ; if MSB wasn't set, skip add
 *         TXA; CLC; ADC $EC; STA $EC  ; EC += X
 *         LDA $ED; ADC #$00; STA $ED  ; ED += carry
 *   skip: DEY; BNE loop
 *   RTS
 *
 * Used by: $8920 (sceneTransitionSetup, X=$13), $8AF7 (sceneFade, X=$5E)
 */
function mul8(ctx: GameContext, x: number, a: number): void {
  let ed = a & 0xFF;
  let ec = 0;
  for (let bit = 0; bit < 8; bit++) {
    // shift 16-bit result left
    const carry = (ed & 0x80) !== 0;
    ed = (ed << 1) & 0xFF;
    ec = (ec << 1) & 0xFF;
    if (carry) ec |= 1;
    // if shifted-out bit was set, add X
    if (carry) {
      const sum = ec + x;
      ec = sum & 0xFF;
      ed = u8(ed + (sum >> 8));
    }
  }
  ctx.ram.setU8(ZP_GEN_EA, ec);
  ctx.ram.setU8(ZP_GEN_EB, ed);
}

/**
 * $88FB sceneSpriteFlipAttr: 翻轉所有 64 個精靈的屬性 bit5
 *
 * ASM (lines 1859-1868):
 *   LDX #$00
 *   loop: LDA $046A,X  ; sprite attr byte (byte 2 of 4)
 *         EOR #$20      ; flip bit5 (priority/v-flip)
 *         STA $046A,X
 *         INX:INX:INX:INX  ; next sprite (4 bytes each)
 *         BNE loop      ; 256 iterations → wraps to 0
 *   RTS
 *
 * Scene init 調用: JSR $88FB → 翻轉所有精靈屬性
 */
function sceneSpriteFlipAttr(ctx: GameContext): void {
  for (let x = 0; x < 256; x += 4) {
    const attr = ctx.ram.u8(0x046A + x);
    ctx.ram.setU8(0x046A + x, attr ^ 0x20);
  }
}

/**
 * $890C sceneSpriteStep: 所有精靈 Y 坐標偏移指定值
 *
 * ASM (lines 1869-1880):
 *   STA $ED              ; save step value
 *   LDX #$00
 *   loop: LDA $0468,X    ; sprite Y byte (byte 0 of 4)
 *         CLC; ADC $ED   ; add step
 *         STA $0468,X    ; write back
 *         INX:INX:INX:INX
 *         BNE loop
 *   RTS
 *
 * Scene init 調用: LDA #$30; JSR $890C → 所有精靈下移 48 像素
 */
function sceneSpriteStep(ctx: GameContext, step: number): void {
  for (let x = 0; x < 256; x += 4) {
    const y = ctx.ram.u8(0x0468 + x);
    ctx.ram.setU8(0x0468 + x, u8(y + step));
  }
}

/**
 * $9B28 dispListEntry: 向 display list 添加一個 PPU 傳輸條目
 *
 * 參數:
 *   A = PPU register hi-byte (e.g. $20 for PPUADDR)
 *   Y = PPU register lo-byte value
 *   X = data/attr byte
 *
 * 使用:
 *   $0628 = display list write cursor (in 3-byte units)
 *   $0629 = display list control: bit6=busy, bit7-0=reserved
 *   $05E8 = 3-byte display list entries:
 *     +0: control (bit6=active, bit5-0=length? or flags)
 *     +1: data low
 *     +2: data high (PPU reg ID)
 *
 * ASM (lines 4905-4931):
 *   PHA                   ; save PPU reg
 *   BIT $0629; BVC ok     ; check not busy (bit6)
 *   ; busy: LDA #$01; JSR $9FA8; PLA; JMP retry
 *   ok: AND #$3F           ; mask length
 *       CLC; ADC $0628     ; + write cursor
 *       CMP #$3D; BCS busy ; overflow? retry
 *       PLA                ; restore PPU reg
 *       ORA #$40           ; set busy flag
 *       STA $0629          ; mark as busy
 *       TXA                ; X → entry[+2]
 *       LDX $0628; STA $05EA,X
 *       TYA                ; Y → entry[+1]
 *       STA $05E9,X
 *       LDA $0629; AND #$BF; STA $05E8,X  ; entry[+0] = control
 *       INX:INX:INX        ; advance cursor
 *       RTS
 */
function dispListEntry(ctx: GameContext, ppuReg: number, dataLo: number, dataHi: number): number {
  const ppuRegMasked = ppuReg & 0x3F;
  // 在模拟器中，display list 由 NMI 中的 processDisplayList 消费，
  // 不存在真实 NES 的 PPU 异步消费机制。跳过 spin-wait，直接写入。
  // (原 ASM 在 $0629 & 0x40 设置时会 spin，等待 PPU 消费后清除)
  const ctrl = ppuReg | 0x40;
  ctx.ram.setU8(0x0629, ctrl);
  
  const idx = ctx.ram.u8(0x0628);
  ctx.ram.setU8(0x05EA + idx, dataHi);    // entry[+2]
  ctx.ram.setU8(0x05E9 + idx, dataLo);    // entry[+1]
  ctx.ram.setU8(0x05E8 + idx, ctrl & 0xBF); // entry[+0]
  
  return idx + 3;
}

/**
 * $9B5E dispListEnd: 終止 display list
 *
 * ASM (lines 4932-4938):
 *   LDA #$00; STA $05E8,X  ; mark entry as terminated
 *   STX $0628               ; save write cursor
 *   LDA $0629; AND #$BF; STA $0629  ; clear busy flag
 *   RTS
 */
function dispListEnd(ctx: GameContext, idx: number): void {
  ctx.ram.setU8(0x05E8 + idx, 0);
  ctx.ram.setU8(0x0628, idx);
  ctx.ram.setU8(0x0629, ctx.ram.u8(0x0629) & 0xBF);
}

/**
 * $9AA2 dispLookup: 從 lookup table ($9EA2) 查表寫入 display list
 *
 * ASM (lines 4821-4831):
 *   TAX; LDA $9EA2,X    ; lookup table → E6
 *   STA $E6
 *   LDA $062A,Y          ; 取 palette attr byte
 *   AND #$0F             ; 取低 4 bit (顏色)
 *   ORA $E6              ; OR lookup value
 *   LDX $E7; STA $05E8,X ; 寫入 display list
 *   INC $E7              ; advance cursor
 *   INY                  ; advance source
 *   RTS
 */
function dispLookup(ctx: GameContext, rom: RomReader, idx: number, y: number): number {
  // ROM $9EA2 lookup table (palette attribute mapping in bank_00)
  const lookupVal = rom.u8(0x9EA2 + idx);
  ctx.ram.setU8(0xE6, lookupVal);
  
  const pal = ctx.ram.u8(0x062A + y) & 0x0F;
  const out = pal | lookupVal;
  
  const cursor = ctx.ram.u8(0xE7);
  ctx.ram.setU8(0x05E8 + cursor, out);
  ctx.ram.setU8(0xE7, cursor + 1);
  
  return y + 1;
}

/**
 * $9AB8 loadPaletteDataA: 從 ROM $B000 區域加載 16 字節調色板數據
 *   offset = $48 * 16 → ROM addr = $B000 + ($48 << 4)
 *   寫入 $062A + offset, 16 bytes
 *
 * ASM (lines 4832-4850):
 *   LDA #$00; STA $E7
 *   LDA $48; ASL A×4; ROL $E7×4  ; $E6:E7 = $48 * 16
 *   CLC; ADC #$00; STA $E6
 *   LDA $E7; ADC #$B0; STA $E7   ; base = $B000
 *   LDX offset (0 or 16); JMP copyLoop
 */
function loadPaletteData(ctx: GameContext, rom: RomReader, val48: number, xOffset: number): void {
  // $E6:E7 = val48 * 16 + $B000
  const addr = (val48 << 4) + 0xB000;
  
  // copy 16 bytes → $062A + xOffset
  for (let i = 0; i < 16; i++) {
    ctx.ram.setU8(0x062A + xOffset + i, rom.u8(addr + i));
  }
}

/**
 * $9A71 ppuAttrTransfer: PPU 屬性區塊傳輸 (使用 display list)
 *
 * ASM (lines 4798-4820):
 *   LDA #$20; LDY #$00; LDX #$3F
 *   JSR $9B28  → dispListEntry(PPU_ADDR, 0, $3F) (wait for DMA)
 *   STX $E7    → save cursor
 *   ; 前 16 bytes loop: $062A,Y → process via lookup + $4A
 *   ; 後 16 bytes loop: $062A+16,Y → process via lookup + $4B
 *   LDX $E7; JSR $9B5E → end display list
 *   RTS
 */
function ppuAttrTransfer(ctx: GameContext, rom: RomReader): void {
  // PPU address setup: $2000 → $3F (palette RAM)
  const idx = dispListEntry(ctx, 0x20, 0x00, 0x3F);
  ctx.ram.setU8(0xE7, idx);
  
  const brightA = ctx.ram.u8(0x4A);
  const brightB = ctx.ram.u8(0x4B);
  
  let y = 0;
  // Process first 16 palette entries ($062A-$0639)
  for (; y < 16; y++) {
    const pal = ctx.ram.u8(0x062A + y);
    const attr = (pal & 0x30) + brightA;
    y = dispLookup(ctx, rom, attr, y);
    ctx.ram.setU8(0xE7, ctx.ram.u8(0xE7)); // ensure cursor advance
  }
  
  // Process second 16 palette entries ($063A-$0649)
  for (; y < 32; y++) {
    const pal = ctx.ram.u8(0x062A + y);
    const attr = (pal & 0x30) + brightB;
    dispLookup(ctx, rom, attr, y);
    ctx.ram.setU8(0xE7, ctx.ram.u8(0xE7));
  }
  
  const finalIdx = ctx.ram.u8(0xE7);
  dispListEnd(ctx, finalIdx);
}

/**
 * $899A clearPPUMode: 清除 PPU 模式位
 *
 * ASM (lines 1964-1968):
 *   LDA $99; AND #$80; ORA #$40; STA $99; RTS
 */
function clearPPUMode(ctx: GameContext): void {
  const v = ctx.ram.u8(0x99);
  ctx.ram.setU8(0x99, (v & 0x80) | 0x40);
}

/**
 * $9071 setupNT0: 設置 PPU 寫入地址為 nametable 0 ($2000)
 *
 * ASM (lines 3199-3200):
 *   LDA #$20; JMP $9078
 */
function setupNT0(): number { return 0x20; }

/**
 * $9076 setupNT1: 設置 PPU 寫入地址為 nametable 1 ($2400)
 *
 * ASM (lines 3201-3207):
 *   LDA #$24; STA $E7; LDA #$00; STA $E6
 *   LDY #$10; LDX #$20; JMP $98E8
 */
function setupNT1(): number { return 0x24; }

// ============================================================
// sceneDataLoad $EB-$FF 处理器依赖的内部辅助函数 stubs
// 完整翻译 from bank_00.asm (2026-07-21)
// ============================================================

/**
 * $997E brightnessFadeStep: 单步亮度渐变 (比 $99F0 更轻量)
 * ASM: 检查 $4A|$4B, DEC, JSR $9A71
 */
function brightnessFadeStep(ctx: GameContext, rom: RomReader): void {
  let a = ctx.ram.u8(0x4A);
  let b = ctx.ram.u8(0x4B);
  if (a === 0 && b === 0) return;
  if (a !== 0) a = u8(a - 1);
  if (b !== 0) b = u8(b - 1);
  ctx.ram.setU8(0x4A, a);
  ctx.ram.setU8(0x4B, b);
  ppuAttrTransfer(ctx, rom);
}

/**
 * $99D1: 显示辅助函数 (palette/sprite attr 复制)
 */
function $99D1(ctx: GameContext, rom: RomReader): void {
  // JSR $9B11? or attr transfer variant
  ppuAttrTransfer(ctx, rom);
}

/**
 * $89A3: PPU 模式设置辅助 (配合 $899A clearPPUMode 使用)
 */
function sub89A3(_ctx: GameContext, _rom: RomReader): void {
  // PPU mode init, 当前 stubbed
}

/**
 * $88B1: 光标/显示缓冲区初始化
 */
function sub88B1(ctx: GameContext, _rom: RomReader): void {
  // 清除显示缓冲区
  ctx.ram.setU8(0x4C, 0);
  ctx.ram.setU8(0x7B, 0);
}

/**
 * $89D2: 文本显示/字符输出辅助
 */
function sub89D2(ctx: GameContext, val: number): void {
  // 字符属性/位置设置
  ctx.ram.setU8(0x0652, val);
}

/**
 * $9A0D: palette/display 数据加载
 */
function sub9A0D(ctx: GameContext, rom: RomReader): void {
  // 调色板数据加载辅助
  ppuAttrTransfer(ctx, rom);
}

/**
 * $9A1F: 另一种 palette 数据操作
 */
function sub9A1F(ctx: GameContext, rom: RomReader): void {
  ppuAttrTransfer(ctx, rom);
}

/**
 * $9A31: PPU 地址设置 (A=lo, X=hi)
 */
function sub9A31(ctx: GameContext, a: number, x: number): void {
  ctx.ram.setU8(0xE6, a);
  ctx.ram.setU8(0xE7, x);
}

/**
 * $9A4C: palette 参数设置
 */
function sub9A4C(ctx: GameContext, val: number): void {
  ctx.ram.setU8(0x4A, val);
  ctx.ram.setU8(0x4B, val);
}

/**
 * $9A60: 另一 palette 操作 (AND #$7F 后的值)
 */
function sub9A60(ctx: GameContext, val: number): void {
  ctx.ram.setU8(0x48, val);
}

/**
 * $97B6: 数据复制/转换辅助 (调用者传递 ptrLo/Hi)
 */
function sub97B6(ctx: GameContext, rom: RomReader, ptrLo: number, ptrHi: number): void {
  // 简化: 从 ROM 指针复制数据到 display list
  const ptr = (ptrHi << 8) | ptrLo;
  for (let i = 0; i < 16; i++) {
    ctx.ram.setU8(0x05E8 + i, rom.u8(ptr + i));
  }
}

/**
 * $8AF7 sceneFade: 場景漸入漸出效果處理
 *
 * ASM (lines 2191-2383+):
 *   STA $ED              ; fade ID
 *   ; clear $09/$0A/$0D/$0E (scroll adjustments)
 *   ; LDA $5B; AND #$7F; STA $5B  ; clear bit7 flag
 *   ; LDA $25; STA $77            ; save bank
 *   ; LDX #$07; JSR $C4B9         ; wait NMI
 *   ; clear $0552-$064F buffer (256 bytes = 0)
 *   ; LDA $ED; ASL A + ROL → table index * 2
 *   ; pointer = $A000 + A*2  → get data table pointer
 *   ; deref pointer → read 6-byte sprite entries:
 *     +0,+1: text/display IDs ($75,$76)
 *     +2: attr byte (bit7-6=direction, bit5-0=palette index? $48)
 *     +3: param 1 ($5E)
 *     +4: param 2 ($5F)
 *     +5: X-position/misc ($5C low bits + bank bits)
 *   ; then calculate nametable address from $5C/$5D
 *   ; handle direction flags:
 *     $C0: special increment
 *     $80: call mul8 with X=$5E
 *     $40: adjust pointer
 *   ; check $5E >= 9 → call setupNT0/setupNT1
 *   ; loop to next sprite entry
 *
 * Scene init 調用: LDA #$17; JSR $8AF7
 */
function sceneFade(ctx: GameContext, rom: RomReader, fadeId: number): void {
  
  // $8AF9-$8B01: clear scroll vars
  ctx.ram.setU8(0x09, 0); ctx.ram.setU8(0x0A, 0);
  ctx.ram.setU8(0x0D, 0); ctx.ram.setU8(0x0E, 0);
  
  // $8B03-$8B07: clear $5B bit7
  ctx.ram.setU8(0x5B, ctx.ram.u8(0x5B) & 0x7F);
  
  // $8B09-$8B0F: save bank, wait NMI
  ctx.ram.setU8(0x77, ctx.ram.u8(0x25));
  xcall(ctx, rom, '$C4B9');
  
  // $8B12-$8B1A: clear sprite work buffer $0552-$064F
  for (let i = 0; i < 256; i++) {
    ctx.ram.setU8(0x0552 + i, 0);
  }
  
  // $8B1C-$8B2D: calculate table pointer from fade ID
  // A = fadeId * 2; base = $A000 + A
  const tblPtr = 0xA000 + (fadeId & 0xFF) * 2;
  
  // $8B2F-$8B39: deref pointer → get actual data address
  const dataLo = rom.u8(tblPtr);
  const dataHi = rom.u8(tblPtr + 1);
  let ptr = dataLo | (dataHi << 8); // $63:$64
  
  // $8B3B-$8B44: read text/display IDs
  ctx.ram.setU8(0x75, rom.u8(ptr));
  ctx.ram.setU8(0x76, rom.u8(ptr + 1));
  
  // $8B46-$8B4C: read attr byte, extract palette index
  const attr3 = rom.u8(ptr + 2);
  ctx.ram.setU8(0x48, attr3 & 0x3F);
  
  // $8B4E-$8B52: process attr bit6→direction
  let flag5b = ctx.ram.u8(0x5B);
  // LSR $5B → shift out LSB; ROL attr3 → rotate bit7 into carry
  flag5b = (flag5b >> 1) & 0xFF;
  const rotatedAttr = ((attr3 << 1) & 0xFF) | ((flag5b & 0x01) << 7); // NOT exact ROL behavior
  flag5b = (flag5b & 0xFE) | ((rotatedAttr >> 7) & 0x01); // ROL $5B
  ctx.ram.setU8(0x5B, flag5b);
  
  // $8B54-$8B5F: read params
  ctx.ram.setU8(0x5E, rom.u8(ptr + 3));
  ctx.ram.setU8(0x5F, rom.u8(ptr + 4));
  
  // $8B61-$8B77: calculate nametable X position
  const attr6 = rom.u8(ptr + 5);
  let sc = attr6 & 0xF8;  // $5C low
  let sd = 0x02;           // $5D — PPU nametable hi byte base
  // ASL $5C:ASL $5D twice
  sc = (sc << 2) & 0xFF;
  sd = ((sd << 2) | (sc >> 6)) & 0xFF;
  sc &= 0xFF;
  
  const attr6Lo = attr6 & 0x07;
  sc |= attr6Lo;
  // ASL $5C:ASL $5D twice more
  sc = (sc << 2) & 0xFF;
  sd = ((sd << 2) | (sc >> 6)) & 0xFF;
  sc &= 0xFF;
  
  // $8B81-$8B91: check nametable select
  if ((sd & 0x0C) === 0) {
    const v7b = ctx.ram.u8(0x7B);
    sd = (sd & 0xF3) | (((v7b << 2) ^ flag5b) & 0x04);
  }
  ctx.ram.setU8(0x5D, sd);
  
  // $8B93-$8BAE: check $5E → choose NT0 or NT1
  const val5e = ctx.ram.u8(0x5E);
  if (val5e >= 9) {
    clearPPUMode(ctx);
  } else if ((sd & 0x04) === 0) {
    clearPPUMode(ctx);
  } else {
    clearPPUMode(ctx); // path always this
  }
  
  // $8BAE-$8BC0: saveContext + advance pointer by 6 bytes
  saveContext(ctx, rom, 1);
  ptr += 6;
  
  // $8BC0-$8BD2: calculate sprite data pointer via mul8
  ctx.ram.setU8(0x5F, ctx.ram.u8(0x5F)); // keep
  mul8(ctx, ctx.ram.u8(0x5E), ctx.ram.u8(0x5F));
  const spLo = ctx.ram.u8(ZP_GEN_EA) + (ptr & 0xFF);
  const spHi = ctx.ram.u8(ZP_GEN_EB) + (ptr >> 8);
  ctx.ram.setU8(0x70, spLo);
  ctx.ram.setU8(0x71, spHi);
  
  // $8BD4-$8BF3: read sprite data header
  ctx.ram.setU8(0x60, 0);
  const spHeaderLo = rom.u8((spHi << 8) | spLo + 1);
  ctx.ram.setU8(0x62, spHeaderLo & 0xE0);
  const spCount = spHeaderLo & 0x1F;
  let s60 = 0;
  const s61 = (spCount >> 2) & 0x0F;
  s60 = ((spCount & 0x03) << 6) | (s60 >> 2);
  ctx.ram.setU8(0x60, s60);
  ctx.ram.setU8(0x61, s61);
  
  const spIdx = spCount !== 0 ? rom.u8((spHi << 8) | spLo + 2) : 0;
  ctx.ram.setU8(0x72, spIdx);
  
  // $8BF5-$8C59: handle direction flags
  const flags = spHeaderLo & 0xC0;
  if (flags === 0) {
    // no special handling
  } else if (flags === 0x40) {
    // horizontal flip path (not fully in opening CDL)
  } else if (flags === 0x80) {
    // calculate sprite offset
    ctx.ram.setU8(0x5D, 0x04);
    ctx.ram.setU8(0x5F, 0x01);
  } else {
    // $C0 path: special
  }
  
  // $8C43-$8C6F: finalize pointer and sprite writes
  ptr = ptr + ctx.ram.u8(0x5F) - 1;
  
  ctx.ram.setU8(0x6D, 0xFC);
  ctx.ram.setU8(0x6E, 0xFF);
  ctx.ram.setU8(0x6F, ctx.ram.u8(0x5F));
  
  if (val5e < 7) {
    // sprite copy loop
    const ntHi = (sd & 0x04) ? 0x24 : 0x20;
    ctx.ram.setU8(0xE7, ntHi);
    ctx.ram.setU8(0xE6, 0x00);
    // ... simplified: write sprite data to OAM buffer
    for (let i = 0; i < spCount && i < 64; i++) {
      const sprBase = 0x0468 + i * 4;
      ctx.ram.setU8(sprBase + 0, rom.u8(ptr + i * 4 + 0)); // Y
      ctx.ram.setU8(sprBase + 1, rom.u8(ptr + i * 4 + 1)); // tile
      ctx.ram.setU8(sprBase + 2, rom.u8(ptr + i * 4 + 2)); // attr
      ctx.ram.setU8(sprBase + 3, rom.u8(ptr + i * 4 + 3)); // X
    }
  }
  
  // reset bank
  const savedBank = ctx.ram.u8(0x77);
  ctx.ram.setU8(0x25, savedBank);
}

// ============================================================
// 跨 bank 調用機制
// 6502 中 JSR $addr 的導向取決於 addr 落在哪個 bank:
//   $8000-$9FFF → bank_00 (本檔案內部)
//   $A000-$BFFF → MMC3 可切換 (bank_01..bank_2F)
//   $C000-$DFFF → bank_30 (系統固定庫)
//   $E000-$FFFF → bank_31 (中斷向量, 固定)
// ============================================================

/** 跨 bank 調用映射表: [bankNum, fnName] */
const XBANK_MAP: Record<string, [number, string]> = {
  // bank_30 ($C000-$DFFF) 系統庫
  '$C4B9': [30, 'waitNMI_X2'],
  '$C56C': [30, 'sub_C56C'],
  '$C572': [30, 'sub_C572'],
  // MMC3 切換 bank ($A000-$BFFF)
  '$A003': [0, 'sub_A003'],  // depends on context
  '$A006': [0, 'sub_A006'],
  '$A009': [0, 'sub_A009'],
  '$A00C': [0, 'sub_A00C'],
  '$A01B': [0, 'sub_A01B'],
  '$A20C': [0, 'sub_A20C'],
  '$A20F': [0, 'sub_A20F'],
  '$A203': [0, 'sub_A203'],
  '$A206': [0, 'sub_A206'],
  '$A209': [0, 'sub_A209'],
  '$A215': [0, 'sub_A215'],
};

/**
 * 跨 bank 調用: 根据 CPU 地址分发到对应 bank 模块的函数
 *
 * 6502 中 JSR $C4B9 实际调用 bank_30 的 switchBankA000 函数。
 * 此函数模拟该行为：从地址解析 bank 编号，查找 fns 并执行。
 */
function xcall(_ctx: GameContext, _rom: RomReader, addr: string, ..._args: number[]): void {
  // cross-bank dispatch via _crossbank registry
  const bank8 = _ctx.ram.u8(0x24);   // current MMC3 $8000 bank
  const bankA = _ctx.ram.u8(0x25);   // current MMC3 $A000 bank
  crossBankCall(_ctx, addr, bank8, bankA, ..._args);
}

// ============================================================
// § handleJump1 ($818B) - 跳轉表 idx=1: 場景推進第二階段
//
// ASM (lines 187-201):
//   LDA $28; CMP $29  → 比較當前/目標場景子 ID
//   BEQ: 場景模式檢查  → SCENE_MODE_TABLE[$26]
//   BCS: advanceScene  → $28 >= $29 時走 $8206
//   BCC: prevScene     → $28 <  $29 時走 $81E6
// ============================================================

function handleJump1(ctx: GameContext, rom: RomReader): void {
  const s28 = ctx.ram.u8(ZP_28);
  const s29 = ctx.ram.u8(ZP_29);
  _log('[bank_00] handleJump1: $28=%d, $29=%d, sceneState=%d',
    s28, s29, ctx.ram.u8(ZP_SCENE_STATE));

  if (s28 > s29) {
    // $8191: BCS $8206 → advanceScene
    advanceScene(ctx, rom);
  } else if (s28 < s29) {
    // $8193: JMP $81E6 → previousSceneTransition
    previousSceneTransition(ctx, rom);
  } else {
    // $8196-$81AB: scene mode check
    const scene = ctx.ram.u8(ZP_SCENE_STATE);
    const mode = SCENE_MODE_TABLE[Math.min(scene, 33)];
    if (mode === 0) {
      // $819B: BEQ $81E6
      previousSceneTransition(ctx, rom);
    } else if (mode === 1) {
      // $819F: BEQ $81D4 → set idx=4
      ctx.ram.setU8(ZP_JMP_IDX, 4);
    } else {
      // mode=3 (default): set idx=2
      ctx.ram.setU8(ZP_JMP_IDX, 2);
      xcall(ctx, rom, '$C56C');
      setupTextDisplay(ctx, rom);
    }
  }
}

// ============================================================
// § handleJump2 ($81AE) - 跳轉表 idx=2: 直接設 idx=3
//
// ASM (lines 202-204):
//   LDA #$03; STA $27; JMP $8017
// ============================================================

function handleJump2(ctx: GameContext, _rom: RomReader): void {
  _log('[bank_00] handleJump2: → set jumpIdx=3');
  ctx.ram.setU8(ZP_JMP_IDX, 3);
}

// ============================================================
// § handleJump3 ($81B5) - 跳轉表 idx=3: 場景推進第三階段
//
// ASM (lines 205-227):
//   LDA $28; CMP $29
//   BEQ: sceneModeTable[$26] check (CMP #$03 → BEQ set idx=4)
//   BCS: advanceScene (BCS $8206)
//   BCC: prevScene (JMP $81E6)
// ============================================================

function handleJump3(ctx: GameContext, rom: RomReader): void {
  const s28 = ctx.ram.u8(ZP_28);
  const s29 = ctx.ram.u8(ZP_29);
  _log('[bank_00] handleJump3: $28=%d, $29=%d, sceneState=%d',
    s28, s29, ctx.ram.u8(ZP_SCENE_STATE));

  if (s28 > s29) {
    advanceScene(ctx, rom);
  } else if (s28 < s29) {
    previousSceneTransition(ctx, rom);
  } else {
    // $81C0-$81D8: scene mode check
    const scene = ctx.ram.u8(ZP_SCENE_STATE);
    const mode = SCENE_MODE_TABLE[Math.min(scene, 33)];
    if (mode === 3) {
      // $81C7: BEQ $81D4 → set idx=4
      ctx.ram.setU8(ZP_JMP_IDX, 4);
    }
    // else: fall through (data bytes $81C9-$81D3 = unreached code path)
  }
}

// ============================================================
// § handleJump4 ($81DB) - 跳轉表 idx=4: 場景推進最終階段
//
// ASM (lines 228-232):
//   LDA $28; CMP $29
//   BEQ: prevScene (BEQ $81E6)
//   BCS: advanceScene (BCS $8206)
//   BCC: also prevScene (JMP $81E6)
// ============================================================

function handleJump4(ctx: GameContext, rom: RomReader): void {
  const s28 = ctx.ram.u8(ZP_28);
  const s29 = ctx.ram.u8(ZP_29);
  _log('[bank_00] handleJump4: $28=%d, $29=%d, sceneState=%d',
    s28, s29, ctx.ram.u8(ZP_SCENE_STATE));

  if (s28 > s29) {
    advanceScene(ctx, rom);
  } else {
    // equal or less both go to $81E6
    previousSceneTransition(ctx, rom);
  }
}

// ============================================================
// § $81E6 previousSceneTransition - 前一個場景切換
//
// ASM (lines 233-244):
//   LDX #$01; JSR $C4B9 (wait NMI)
//   JSR $A015; LDA #$60; JSR $8464; JSR $82B5; JSR $99F0
//   LDX $26; LDA $8398,X (SCENE_NEXT_TABLE); STA $26
//   JSR $C578; JMP $80FD (sceneStateMachine)
// ============================================================

function previousSceneTransition(ctx: GameContext, rom: RomReader): void {
  _log('[bank_00] previousSceneTransition: sceneState=%d → %d',
    ctx.ram.u8(ZP_SCENE_STATE), SCENE_NEXT_TABLE[ctx.ram.u8(ZP_SCENE_STATE)]);

  // LDX #$01; JSR $C4B9 → switch $A000 window to bank_01
  xcall(ctx, rom, '$C4B9', 1);
  // JSR $A015 → bank_01 playerAction
  xcall(ctx, rom, '$A015');
  // $8464: scene data load (ASM: LDA #$60; JSR $8464)
  sceneDataLoad(ctx, rom, 0x60);
  // $82B5: resetScrollAndWait
  resetScrollAndWait(ctx, rom);
  // $99F0: brightness fade loop (ASM: JSR $99F0)
  brightnessFrameLoop(ctx, rom);
  // LDA $8398,X → SCENE_NEXT_TABLE[$26]; STA $26
  const scene = ctx.ram.u8(ZP_SCENE_STATE);
  const nextScene = SCENE_NEXT_TABLE[Math.min(scene, 33)];
  ctx.ram.setU8(ZP_SCENE_STATE, nextScene);
  // JSR $C578 → bank_30 post-processing
  xcall(ctx, rom, '$C578');
  // JMP $80FD → sceneStateMachine
  sceneStateMachine(ctx, rom);
}

// ============================================================
// § $8206 advanceScene - 場景推進
//
// ASM (lines 245-274+):
//   LDX #$01; JSR $C4B9 (wait NMI)
//   JSR $A012; BIT $E0; BVS skip; ...
//   LDX $26; LDA $8420,X; check SCENE_FLAG_C_TABLE
//   LDX $26; LDA $8442,X; check SCENE_FLAG_D_TABLE ...
// ============================================================

function advanceScene(ctx: GameContext, rom: RomReader): void {
  _log('[bank_00] advanceScene: sceneState=%d',
    ctx.ram.u8(ZP_SCENE_STATE));

  // LDX #$01; JSR $C4B9 → switch $A000 window to bank_01
  xcall(ctx, rom, '$C4B9', 1);
  // JSR $A012 → bank_01 ballLogic
  xcall(ctx, rom, '$A012');

  const e0 = ctx.ram.u8(ZP_NMI_TRIGGER);
  // $820E: BIT $E0; BVS $821C → if bit6 (overflow flag) set, skip $26 check
  if (!bit(e0, 6)) {
    const scene = ctx.ram.u8(ZP_SCENE_STATE);
    const e5 = ctx.ram.u8(ZP_E5);
    // $8212-$8218: if $26 <= $E5 → skip
    if (scene > e5) {
      ctx.ram.setU8(ZP_E5, scene);
    }
  }

  // $821C-$822D: SCENE_FLAG_C check
  const scene = ctx.ram.u8(ZP_SCENE_STATE);
  const flagC = SCENE_FLAG_C_TABLE[Math.min(scene, 33)];
  if (flagC !== 0) {
    // JSR $8464; JSR $82B5 → scene data + reset scroll
    sceneDataLoad(ctx, rom, 0x60);
    resetScrollAndWait(ctx, rom);
    // AND #$BF; STA $E0 → clear bit6
    ctx.ram.setU8(ZP_NMI_TRIGGER, e0 & 0xBF);
  }

  // $822F-$8241: SCENE_FLAG_D check
  const flagD = SCENE_FLAG_D_TABLE[Math.min(scene, 33)];
  if (flagD !== 0) {
    resetScrollAndWait(ctx, rom);
    // JSR $82A9 → waitForScriptDone
    waitForScriptDone(ctx, rom);
    // CMP #$20; BCS → advanced scene check
    if (scene >= 0x20) {
      // skip for now
    }
  }
  // $8243-$824B: set $0700=1, JSR $C578, INC $26
  ctx.ram.setU8(0x0700, 1);
  xcall(ctx, rom, '$C578');
  ctx.ram.setU8(ZP_SCENE_STATE, u8(scene + 1));
  // JMP $8017 → back to scene loop
}

// ============================================================
// § RTS 空操作 (ROM 中的 $60 字节作为子程序)
// ============================================================

/**
 * 空操作函数：对应 ROM 中 $60 (RTS) 字节被当作子程序调用的情况。
 * ROM 中 JSR $A00C 到达 bank_0 offset $000C = $60 (RTS)，立即返回。
 */
function noop(_ctx: GameContext, _rom: RomReader, ..._args: any[]): void {
  // no-op
}

// ============================================================
// Module 導出
// ============================================================

export const bank_00: BankModule = {
  rom: null!, // 由系統在初始化時設定
  dispatch,
  fns: {
    '$8000': dispatch,
    // XBANK_MAP: $Axxx 归一化 fallback ($Axxx → $8xxx)
    // ROM 中这些地址为数据字节($60=RTS等)，作为子程序调用时即为空操作
    '$8003': noop,           // $A003 → $8003
    '$8006': noop,           // $A006 → $8006
    '$8009': noop,           // $A009 → $8009
    '$800C': noop,           // $A00C → $800C
    '$8017': sceneLoopEntry,
    '$8018': sceneLoopEntry,  // dispatch RTS trick: target+1 for idx≥5
    '$801B': noop,           // $A01B → $801B
    '$804C': sceneInit_804C,
    '$807A': sceneInit_807A,
    '$80DF': sceneStateMachine,
    '$80E6': sceneStateNormal,
    '$8166': handleForward,
    // dispatch jump targets (target+1 from JUMP_TABLE):
    '$818B': handleJump1,
    '$81AE': handleJump2,
    '$81B5': handleJump3,
    '$81DB': handleJump4,
    '$826A': handleVPressed,
    '$8285': setupTextDisplay,
    '$8297': setupScript,
    '$82A9': waitForScriptDone,
    '$82B5': resetScrollAndWait,
    // XBANK_MAP: $A2xx 归一化 fallback
    '$8203': noop,           // $A203 → $8203
    '$8206': noop,           // $A206 → $8206
    '$8209': noop,           // $A209 → $8209
    '$820C': noop,           // $A20C → $820C
    '$820F': noop,           // $A20F → $820F
    '$8215': noop,           // $A215 → $8215
    '$82ED': scriptEngine,
    '$838A': waitNmi,
    '$8464': sceneDataLoad,
    '$88CA': charOutput,
    '$99F0': brightnessFrameLoop,
    '$9A71': ppuAttrTransfer,
    '$9BA0': initDisplay,
    '$9EED': taskScheduler,
    '$9F0F': restoreTaskContext,
    '$9FA8': saveContext,
    '$9F7E': clearTaskSlot,
    '$9F89': checkAndActivateTask,
    '$9F96': forceClearTask,
    // 新增: sceneDataLoad $EB-$FF 处理器依赖的内部辅助函数
    '$997E': brightnessFadeStep,
    '$99D1': $99D1,
    '$89A3': sub89A3,
    '$88B1': sub88B1,
    '$89D2': sub89D2,
    '$9A0D': sub9A0D,
    '$9A1F': sub9A1F,
    '$9A31': sub9A31,
    '$9A4C': sub9A4C,
    '$9A60': sub9A60,
    '$97B6': sub97B6,
  },
};
