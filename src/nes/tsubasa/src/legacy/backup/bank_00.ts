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
  ctx.cpu.PC = target;
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
 * JMP $A203: 跳轉到 bank_?? 場景處理 (跨 bank, 由 MMC3 切換)
 */
function sceneLoopEntry(ctx: GameContext, rom: RomReader): void {
  // ASM: LDX #$02; JSR $C4B9 → 跨 bank 呼叫, 等待 VBlank
  // Pseudo: waitVBlank(ctx, rom, bank2);
  // JMP $A203 → 跨 bank 跳轉
  // 標記: 需要 bank_30 / bank_A? 的 $C4B9 實現
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
  
  // LDA #$17; JSR $8AF7 → scene fade (internal)
  // LDA #$30; JSR $890C → (internal)  
  // JSR $88FB → (internal)
  // JSR $9A35 → scene pre-process (internal)
  scenePreProcess(ctx);
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
  initDisplay(ctx);
  // $80EB: JSR $8464 → 場景數據載入 (internal, 待完整反編譯)
  // $80EE: JSR $82B5 → resetScrollAndWait
  resetScrollAndWait(ctx, rom);

  // $80F1: LDA #$C0; STA $E0
  ctx.ram.setU8(ZP_NMI_TRIGGER, 0xC0);
  
  // $80F5-$80FA: wait NMI + cross-bank
  xcall(ctx, rom, '$C4B9');
  xcall(ctx, rom, '$A20F');

  // $80FD-$8105: ZP clear
  ctx.ram.setU8(ZP_28, 0);
  ctx.ram.setU8(ZP_29, 0);
  ctx.ram.setU8(ZP_JMP_IDX, 0);
  ctx.ram.setU8(TEAM_SLOT, 1);

  // $810A-$810F: wait NMI
  xcall(ctx, rom, '$C4B9');
  xcall(ctx, rom, '$A20C');
  
  // $8112-$811F: scene setup
  sceneTransitionSetup(ctx, rom);
  xcall(ctx, rom, '$C4B9');
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
  xcall(ctx, rom, '$C4B9');
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
  xcall(ctx, rom, '$C4B9');
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
  initDisplay(ctx);
  
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
  xcall(ctx, rom, '$C4B9');
  xcall(ctx, rom, '$A215');
  xcall(ctx, rom, '$C4B9');
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
 *
 * 注: $99F0 目前未完整反編譯，暫標記
 */
function initDisplay(ctx: GameContext): void {
  // $99F0 — 內部函數, 待翻譯
  // JSR $98A0
  ppuReset(ctx);
  // JMP $9B7F
  clearOAM(ctx);
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
 * ASM 對照 (lines 1290-1308):
 *   LDX #$13; JSR $9DEE     ; 查表獲取場景指針
 *   LDA $EC; ADC #$00; STA $EC  ; $EC += 0 (carry)
 *   LDA $ED; ADC #$BF; STA $ED  ; $ED += $BF00 (調整指針到 bank 區域)
 *   LDA $25; STA $EA             ; 保存 bank 號
 *   LDX #$06; JSR $C4B9         ; 等待 NMI (bank 6) ★跨 bank
 *   ; wait: LDA $78; BNE wait   ; 等待 $78 == 0
 *   LDY #$00; LDA ($EC),Y; STA $79  ; 讀第一個字節
 *   (後續 setup...)
 */
function sceneTransitionSetup(ctx: GameContext, rom: RomReader): void {
  // LDX #$13; JSR $9DEE — 查表獲得指針 (內部函數)
  // $9DEE 是 bank_00 內部, 但尚未翻譯, 暫留 xcall 標記
  
  // LDA $EC; ADC #$00 → 帶進位加法
  const ec = ctx.ram.u8(ZP_GEN_EA);
  ctx.ram.setU8(ZP_GEN_EA, ec); // unchanged (ADC #$00)

  // LDA $ED; ADC #$BF → $ED += $BF (即指針偏移 $BF00)
  const ed = ctx.ram.u8(ZP_GEN_EB);
  const newEd = u8(ed + 0xBF);
  ctx.ram.setU8(ZP_GEN_EB, newEd);

  // LDA $25; STA $EA → bank#
  ctx.ram.setU8(ZP_BANK_TMP, ctx.ram.u8(0x25));

  // LDX #$06; JSR $C4B9 → ★跨 bank 30 waitNMI
  xcall(ctx, rom, '$C4B9');

  // wait loop: LDA $78; BNE wait
  // (模擬: $78 應該由 bank_30 的 NMI handler 清除)
  // 簡化為標記等待

  // LDY #$00; LDA ($EC),Y; STA $79
  // $79 = 第一個場景參數字節
}

/**
 * $9A35 sub_9A35: 場景腳本前置處理
 *
 * ASM: JSR $9B07  (內部函數)
 *       (後續處理...)
 * 待完整反編譯
 */
function scenePreProcess(ctx: GameContext): void {
  // JSR $9B07 — 內部函數, 需進一步翻譯
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
  // This is called during simulation to jump to other bank modules
  // The actual dispatch happens via the cross-bank call registry
  const { crossBankCall: dispatch } = require('./_crossbank') as typeof import('./_crossbank');
  const bank8 = _ctx.ram.u8(0x24);   // current MMC3 $8000 bank
  const bankA = _ctx.ram.u8(0x25);   // current MMC3 $A000 bank
  dispatch(_ctx, addr, bank8, bankA);
}

// ============================================================
// Module 導出
// ============================================================

export const bank_00: BankModule = {
  rom: null!, // 由系統在初始化時設定
  dispatch,
  fns: {
    '$8000': dispatch,
    '$8017': sceneLoopEntry,
    '$804C': sceneInit_804C,
    '$807A': sceneInit_807A,
    '$80DF': sceneStateMachine,
    '$80E6': sceneStateNormal,
    '$8166': handleForward,
    '$826A': handleVPressed,
    '$8285': setupTextDisplay,
    '$8297': setupScript,
    '$82A9': waitForScriptDone,
    '$82B5': resetScrollAndWait,
    '$82ED': scriptEngine,
    '$838A': waitNmi,
    '$9EED': taskScheduler,
    '$9F0F': restoreTaskContext,
    '$9FA8': saveContext,
    '$9F7E': clearTaskSlot,
    '$9F89': checkAndActivateTask,
    '$9F96': forceClearTask,
  },
};
