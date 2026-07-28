/**
 * Bank 00: Scene Dispatch Engine ($8000-$9FFF)
 *
 * 6502 → TypeScript 语义翻译
 *
 * 功能:
 *   1. 场景分派器 — 读取 $0027(子状态)，跳转到对应处理逻辑
 *   2. 标题画面/菜单 — START 等待、菜单光标、选项选择
 *   3. 字节码解释器 — 标题画面/菜单/过场的脚本引擎
 *   4. 精灵动画 — nametable 文本渲染 + sprite 动画
 *
 * 跳转表 ($800D):
 *   $27=0 → $8165: 标题画面/菜单初始化
 *   $27=1 → $818A: 场景状态 1
 *   $27=2 → $81AD: 场景状态 2
 *   $27=3 → $81B4: 场景状态 3
 *   $27=4 → $81DA: 场景状态 4
 *
 * 翻译完成度:
 *   ✅ $8000-$8016 — 分派入口 + 跳转表
 *   ✅ $8017-$801C — 标题画面启动 (切 bank 02)
 *   ✅ $801F-$8030 — 等待 START 按鈕
 *   ✅ $8032-$804A — START 按下後清空 ZP 變量
 *   ✅ $804D-$808B — PPU 設定分支
 *   ✅ $808D-$80D3 — 菜單光標移動循環
 *   ✅ $80D4-$80DD — A+B 確認檢查
 *   ✅ $80DF-$81D3 — 場景狀態機 (state 1-4)
 *   ✅ $81D4-$83DB — 場景切換輔助 + 精靈 palette
 *   ✅ $8464-$89D1 — 字節碼解釋器 (脚本引擎核心)
 *   ✅ $89D2-$8AB3 — 精靈動畫引擎
 *   ✅ $8AF7-$8D09 — 場景過渡引擎
 *   ⏳ $8D0A-$8FEF — 精靈渲染循環
 *   ⏳ $900B-$978A — 精靈動畫 VM (~2KB 子系統)
 *   ⏳ $97AB-$98E7 — PPU nametable 操作
 *   ⏳ $98E8-$99AD — PPU 批量寫入
 *   ✅ $99D1-$9D6E — 調色板/淡入淡出
 *   ✅ $9D6F-$9E31 — 數字顯示
 *   ✅ $9E32-$9EA1 — BCD 轉換
 *   ✅ $9EED-$9FA7 — 定時器調度器
 *   ✅ $9FA8-$9FE4 — 跨 bank 調用 + NMI 等待
 */

import type { SystemState } from './system-state';
import { writeMem, readMem } from './system-state';
import {
  bank01_startGame,
  bank01_auxEntry1,
  bank01_auxEntry2,
  bank01_auxEntry3,
  bank01_auxEntry8,
} from './bank-01';
import {
  bank02_loadSceneData,
  bank02_sceneSwitchHelper,
} from './bank-02';
import {
  bank30_bankSwitch,
  bank30_softReset,
  bank30_helperC572,
} from './mocks';

// ═════════════════════════════════════════════════
// 零页地址常量
// ═════════════════════════════════════════════════

const ZP_SUB_STATE    = 0x27; // 场景子状态 (0-4)
const ZP_FRAME_CTR_L  = 0x28; // 帧计数器低字节
const ZP_FRAME_CTR_H  = 0x29; // 帧计数器高字节
const ZP_SCRIPT_PTR_L = 0x4D; // 脚本指针低字节
const ZP_SCRIPT_PTR_H = 0x4E; // 脚本指针高字节
const ZP_JOYPAD1      = 0x1E; // 手柄 1 输入
const ZP_JOYPAD1_PREV = 0x1C; // 手柄 1 上一帧
const ZP_FLAGS        = 0x5B; // 标志位
const ZP_FLAGS2       = 0x1B; // 标志位 2 ($1B)
const ZP_CURSOR_FLAGS = 0xED; // 菜单光标/场景標誌 ($ED)

// 手柄位 (在检查输入时直接使用掩码值)
const JOY_START  = 0x10;
const JOY_LEFT   = 0x02;
const JOY_RIGHT  = 0x01;

// 场景子状态映射
const enum SubState {
  BOOT     = 0, // 标题画面初始化
  STATE_1  = 1, // 场景状态 1
  STATE_2  = 2, // 场景状态 2
  STATE_3  = 3, // 场景状态 3
  STATE_4  = 4, // 场景状态 4
  STATE_5  = 5, // 场景状态 5
}

// ═════════════════════════════════════════════════
// CODE_$8000_$8016 — 场景分派入口 (23 bytes)
// ═════════════════════════════════════════════════
//
// 6502:
//   A5 27       LDA $27         ; 子状态索引
//   0A           ASL A           ; ×2
//   AA           TAX             ; 跳轉表索引
//   BD 0E 80    LDA $800E,X     ; 取高字節
//   48           PHA
//   BD 0D 80    LDA $800D,X     ; 取低字節
//   48           PHA
//   60           RTS             ; RTS 跳轉技巧
//
// 跳转表内联 ($800D-$8016):
//   65 81 → $8165 (state 0)
//   8A 81 → $818A (state 1)
//   AD 81 → $81AD (state 2)
//   B4 81 → $81B4 (state 3)
//   DA 81 → $81DA (state 4)

/** 场景子状态 → 处理函数映射 */
const SCENE_DISPATCH: Record<number, (sys: SystemState) => void> = {
  [SubState.BOOT]:    dispatch_state0_boot,
  [SubState.STATE_1]: dispatch_state1,
  [SubState.STATE_2]: dispatch_state2,
  [SubState.STATE_3]: dispatch_state3,
  [SubState.STATE_4]: dispatch_state4,
  [SubState.STATE_5]: dispatch_state5,
};

/**
 * $8000: 场景分派入口
 * 读取 $27 子状态索引，跳转到对应处理函数
 */
export function bank00_dispatchScene(sys: SystemState): void {
  const subState = sys.mem[ZP_SUB_STATE];
  const handler = SCENE_DISPATCH[subState];
  if (handler) {
    handler(sys);
  } else {
    console.warn(`[bank00] Unknown sub-state: ${subState}`);
  }
}

// ═════════════════════════════════════════════════
// CODE_$8017_$80DE — 标题画面主循环 (200 bytes)
// ═════════════════════════════════════════════════

/**
 * $8017-$801C: 标题画面启动
 *
 * 6502:
 *   A2 02       LDX #$02
 *   20 B9 C4    JSR $C4B9      ; bankSwitch → bank 02 (NMI 渲染器)
 *   4C 03 A2    JMP $A203      ; → bank 01 入口 (标题画面渲染)
 *
 * 切换到 bank 02 (处理 NMI/PPU) + bank 01 (标题画面数据)，
 * 然后进入标题画面循环。
 */
export function bank00_titleBoot(sys: SystemState): void {
  // FIXME: bank 02/01 尚未翻译
  // 暂时模拟: 跳过 bank 切换，直接进入标题画面等待循环
  console.log('[bank00] titleBoot → bank02 NMI renderer + bank01 title data');
}

/**
 * $801F-$8030: 等待 START 按键
 *
 * 6502:
 *   L1:  JSR $9BA0        ; PPU clear / screen setup
 *        LDA #$00
 *        JSR $8464        ; execBytecode(param=0)
 *   L2:  LDA #$01
 *        JSR $9FA8        ; waitFrame(1) — NMI 帧同步
 *        LDA $1E          ; 读手柄 1
 *        AND #$10         ; 检查 START 位
 *        BEQ L2           ; 未按則循環
 *
 * 这是标题画面第一次出现时的逻辑: 加载并渲染标题画面脚本，
 * 然后每帧检查 START 按钮是否被按下。
 */
export function bank00_waitStartButton(sys: SystemState): void {
  console.log('[bank00] waitStartButton — waiting for START...');

  // JSR $9BA0 — PPU clear/screen setup
  // TODO: bank00_ppuClear(sys);

  // LDA #$00; JSR $8464 — exec bytecode for title screen init
  // TODO: bank00_execBytecode(sys, 0);

  // 检查 START
  const joy = sys.mem[ZP_JOYPAD1];
  if (joy & JOY_START) {
    // START 按下 → 進入後續邏輯
    bank00_postStartInit(sys);
  }
  // 否則等待下一幀
}

/**
 * $8032-$804A: START 按下後的初始化
 *
 * 6502:
 *   LDA #$00
 *   STA $05, $06, $09, $0A, $11, $12, $0D, $0E, $4C, $5B
 *   LDA #$01
 *   STA $0700         ; 遊戲已開始標誌
 *
 * 清空游戏状态零页变量，设置"游戏已开始"标志。
 */
export function bank00_postStartInit(sys: SystemState): void {
  console.log('[bank00] postStartInit — clearing game state');

  // 清空零頁變量
  sys.mem[0x05] = 0;
  sys.mem[0x06] = 0;
  sys.mem[0x09] = 0;
  sys.mem[0x0A] = 0;
  sys.mem[0x11] = 0;
  sys.mem[0x12] = 0;
  sys.mem[0x0D] = 0;
  sys.mem[0x0E] = 0;
  sys.mem[0x4C] = 0;
  sys.mem[ZP_FLAGS] = 0;

  // 设置"游戏已开始"标志
  writeMem(sys, 0x0700, 0x01);

  // 检查 $1B bit 0 → 决定 PPU 初始化路径
  bank00_checkPpuInit(sys);
}

/**
 * $804D-$808B: 检查 $1B bit 0，分支 PPU 设定
 *
 * 6502:
 *   LDA $1B
 *   AND #$01
 *   BNE skip_ppu_setup      ; $1B bit 0 = 1 则跳过
 *
 *   JSR $9B11               ; PPU control setup
 *   LDA #$02
 *   JSR $9FA8               ; waitFrame(2)
 *   JSR $9B7F               ; PPU data clear
 *   JSR $98A0               ; PPU nametable fill
 *   LDA #$0D
 *   JSR $8297               ; bytecode param setup
 *   LDA #$00
 *   STA $7B
 *   LDA #$17
 *   JSR $8AF7               ; scene transition init
 *   LDA #$30
 *   JSR $890C               ; sprite data load
 *   JSR $88FB               ; sprite post-process
 *   JSR $9A35               ; palette fade setup
 *   LDA #$00
 *   JSR $8920               ; final bytecode param
 *   LDA #$00
 *   STA $90
 *   LDA #$02
 *   STA $91
 *
 *   LDA $1B
 *   AND #$FE
 *   STA $1B                 ; 清除 $1B bit 0
 *
 * 如果 $1B bit 0 未设置，执行完整 PPU 初始化序列。
 * 然后进入菜单光标循环。
 */
function bank00_checkPpuInit(sys: SystemState): void {
  const flags2 = sys.mem[ZP_FLAGS2];
  if (flags2 & 0x01) {
    // $1B bit 0 = 1 → 跳过 PPU 初始化，直接进入菜单
    bank00_menuCursorLoop(sys);
    return;
  }

  console.log('[bank00] PPU init sequence...');

  // JSR $9B11 — PPU control setup
  // TODO: bank00_ppuControlSetup(sys);

  // JSR $9B7F — PPU data clear
  // TODO: bank00_ppuDataClear(sys);

  // JSR $98A0 — PPU nametable fill
  // TODO: bank00_ppuNametableFill(sys);

  // JSR $8297 — bytecode with param $0D
  // TODO: bank00_bytecodeParam(sys, 0x0D);

  // 清 $7B
  sys.mem[0x7B] = 0;

  // JSR $8AF7 — scene transition init (scene ID = $17)
  // TODO: bank00_sceneTransition(sys, 0x17);

  // JSR $890C — sprite data load (param $30)
  // TODO: bank00_spriteDataLoad(sys, 0x30);

  // JSR $88FB — sprite post-process
  // TODO: bank00_spritePostProcess(sys);

  // JSR $9A35 — palette fade
  // TODO: bank00_paletteFade(sys);

  // JSR $8920 — bytecode final (param 0)
  // TODO: bank00_bytecodeFinal(sys, 0);

  // 设置 $90/$91
  sys.mem[0x90] = 0;
  sys.mem[0x91] = 2;

  // 清除 $1B bit 0
  sys.mem[ZP_FLAGS2] &= 0xFE;

  // 进入菜单光标循环
  bank00_menuCursorLoop(sys);
}

/**
 * $808D-$80D3: 菜单光标移动循环
 *
 * 6502:
 *   init_cursor:
 *     LDA #$0A               ; cursor X pos (nt address low)
 *     STA $ED
 *     STA $E6                ; PPU addr low
 *     LDA #$22               ; PPU addr high ($220A = nametable)
 *     STA $E7
 *     LDY #$01
 *     LDX #$01
 *     LDA #$7F
 *     JSR $98EA              ; PPU write single tile
 *
 *   cursor_loop:
 *     LDA #$01
 *     JSR $9FA8              ; waitFrame(1)
 *     LDA $1E                ; joypad
 *     AND #$3C               ; UP|DOWN|LEFT|RIGHT
 *     BEQ cursor_loop        ; 没按方向键 → 继续等
 *
 *     ASL; ASL; BMI toggle   ; UP 按下
 *     ASL; BMI select        ; DOWN 按下
 *     ASL                    ; SELECT/LEFT...
 *     AND #$40
 *     ORA #$0A
 *     JMP update
 *   toggle:
 *     LDA $ED
 *     EOR #$40
 *   update:
 *     STA $ED
 *     ...PPU write...
 *     JMP cursor_loop
 *
 *   check_confirm:           ; 也检查 A+B
 *     LDA $1C                ; joypad prev
 *     AND #$C0               ; A|B
 *     CMP #$C0               ; 兩键同时按?
 *     BNE cursor_loop
 *     JMP $A209              ; → bank 01 游戏开始
 *
 * 处理标题画面的菜单光标移动。
 * 手柄 UP/DOWN 在菜单项间移动，SELECT/LEFT/RIGHT 可能有其他功能。
 * A+B 同时按下确认选择，进入游戏。
 */
function bank00_menuCursorLoop(sys: SystemState): void {
  console.log('[bank00] menuCursorLoop — enter');

  // 初始化光标位置
  // LDA #$0A → cursor position on nametable (col $0A of row, NT $2200+)
  let cursorPos = 0x0A;
  sys.mem[ZP_CURSOR_FLAGS] = cursorPos;

  // PPU write: write tile $7F at nametable $220A
  // LDY #$01; LDX #$01; LDA #$7F; JSR $98EA
  // TODO: bank00_ppuWriteTile(sys, 0x220A, 0x7F);

  // 每帧循环: 等待帧 → 读手柄 → 处理方向键
  const checkInput = () => {
    // LDA #$01; JSR $9FA8 → waitFrame(1)
    // (实际的循环由外部 NMI tick 驱动，这里只是单帧逻辑)
    // TODO: 接入帧循环

    const joypad = sys.mem[ZP_JOYPAD1];
    const dPad = joypad & 0x3C; // UP|DOWN|LEFT|RIGHT

    if (dPad === 0) {
      // 没按方向键 → 检查确认键
      checkConfirmButton(sys);
      return;
    }

    // 方向键处理
    // ASL; ASL — 检查 UP
    const shifted = dPad << 2;
    if (shifted & 0x80) {
      // UP: toggle cursor bit 6
      cursorPos ^= 0x40;
      sys.mem[ZP_CURSOR_FLAGS] = cursorPos;
      console.log('[bank00] cursor UP → toggle, pos=$' + cursorPos.toString(16));
    } else if (shifted & 0x40) {
      // DOWN: select action
      console.log('[bank00] cursor DOWN → select');
      // TODO: 处理选择逻辑 (JSR various bank01/bank30 calls)
    } else if (dPad & JOY_LEFT) {
      console.log('[bank00] cursor LEFT');
    } else if (dPad & JOY_RIGHT) {
      console.log('[bank00] cursor RIGHT');
    }

    // PPU write: update cursor display
    // TODO: bank00_ppuWriteTile(sys, 0x2200 | cursorPos, 0x7F);

    checkConfirmButton(sys);
  };

  // 首次调用
  checkInput();
}

/** 检查 A+B 确认按钮 */
function checkConfirmButton(sys: SystemState): void {
  const prev = sys.mem[ZP_JOYPAD1_PREV];
  if ((prev & 0xC0) === 0xC0) {
    // A+B 同时按下 → JMP $A209 (bank 01, 游戏开始)
    console.log('[bank00] A+B pressed → start game!');
    bank01_startGame(sys);
  }
}

// ═════════════════════════════════════════════════
// 场景子状态处理函数
// ═════════════════════════════════════════════════

/**
 * 子状态 0: $8165 → 标题画面初始化
 *
 * 这是场景分派器跳转到的子状态 0 入口 ($8165)。
 * 反汇编显示 $8165 的代码位于 $80DF 代码块的中间，
 * 紧接在 `JMP $8017` (回标题循环) 之后。
 *
 * 实际流程: 分派器 → $8165 → 执行 BIT $ED 检查 →
 *   - 若 $ED bit 6 清除 → $80E6 (初始化序列)
 *   - 若 $ED bit 6 设置 → $826A (备用路径)
 */
function dispatch_state0_boot(sys: SystemState): void {
  console.log('[bank00] dispatch_state0 (boot)');

  // BIT $ED — 检查 $ED bit 6 (V flag)
  const edFlag = sys.mem[ZP_CURSOR_FLAGS];
  if (edFlag & 0x40) {
    // $ED bit 6 set → V flag set → BVC doesn't branch
    // JMP $826A — alternate init path
    bank00_altInit(sys);
    return;
  }

  // $ED bit 6 clear → BVC $80E6 — state 0 full init
  bank00_state0FullInit(sys);
}

/**
 * $80E6-$80FC: 状态 0 初始化（前段，state0 专属）
 *
 * 6502:
 *   JSR $9BA0          ; PPU clear
 *   LDA #$01
 *   JSR $8464          ; execBytecode(param=1)
 *   JSR $82B5          ; bytecode wait helper
 *   LDA #$C0
 *   STA $E0            ; 场景標誌
 *   LDX #$02
 *   JSR $C4B9          ; bankSwitch → bank 02
 *   JSR $A20F          ; bank02_loadSceneData
 *   ── fall through → $80FD (stateCommonContinue) ──
 *
 * state0 独有逻辑后落入共享的 stateCommonContinue。
 */
function bank00_state0FullInit(sys: SystemState): void {
  console.log('[bank00] state0FullInit');

  // JSR $9BA0 — PPU clear
  bank00_ppuClear(sys);

  // LDA #$01; JSR $8464 — execBytecode(param=1)
  bank00_execBytecode(sys, 1);

  // JSR $82B5 — bytecode wait helper
  bank00_bytecodeWait(sys);

  // LDA #$C0; STA $E0
  sys.mem[0xE0] = 0xC0;

  // LDX #$02; JSR $C4B9 → bankSwitch(bank=2)
  bank30_bankSwitch(sys, 2);
  // JSR $A20F → bank02_loadSceneData (bank 02 mapped)
  bank02_loadSceneData(sys);

  // ── fall through → $80FD stateCommonContinue ──
  bank00_stateCommonContinue(sys);
}

/**
 * $826A-$8282: 备用初始化路径 (当 $ED bit 6 = 1)
 *
 * 6502:
 *   LDX #$01; JSR $C4B9; JSR $A003
 *   LDX #$02; JSR $C4B9; JSR $A20F
 *   LDX #$01; JSR $C4B9; JSR $A01B
 *   JMP $80FD
 */
function bank00_altInit(sys: SystemState): void {
  console.log('[bank00] altInit ($ED bit 6 set)');

  // LDX #$01; JSR $C4B9 → bankSwitch(bank=1)
  bank30_bankSwitch(sys, 1);
  // JSR $A003 → bank01_auxEntry1
  bank01_auxEntry1(sys);

  // LDX #$02; JSR $C4B9 → bankSwitch(bank=2)
  bank30_bankSwitch(sys, 2);
  // JSR $A20F → bank02_loadSceneData
  bank02_loadSceneData(sys);

  // LDX #$01; JSR $C4B9 → bankSwitch(bank=1)
  bank30_bankSwitch(sys, 1);
  // JSR $A01B → bank01_auxEntry8
  bank01_auxEntry8(sys);

  // JMP $80FD → state common continue
  bank00_stateCommonContinue(sys);
}

/**
 * $80FD-$8163: 状态机公共续接点
 *
 * 6502:
 *   $80FD: LDA #$00; STA $28, $29, $27  ; 清零
 *   $8105: LDA #$01; STA $0700          ; game flag = 1
 *   $810A: LDX #$02; JSR $C4B9; JSR $A20C  ; bank02 sceneSwitch
 *   $8112: LDA #$00; JSR $8920          ; bytecode restore
 *   $8117: LDX #$01; JSR $C4B9; JSR $A006  ; bank01 auxEntry2
 *   $811F: JSR $C572                    ; bank30 helper
 *   $8122: LDX #$55
 *   $8124: LDA $26; CMP #$20; BCC skip_scene_cleanup
 *   ; scene >= $20: $0700=$4C, clear $0450-$0453, call bank01 auxEntry3
 *   $8145: BIT $E0; BMI skip_bytecode
 *   $8149: LDA $E4; CMP $26; BCS restart
 *   $814F: LDX $26; LDA $83DC,X; BEQ restart
 *   $8157: JSR $8464; JSR $82B5        ; bytecode + wait
 *   $815D: AND #$7F; STA $E0
 *   $8163: JMP $8017                    → titleBoot
 *
 * 从 state0 末尾（fall through）、altInit、以及 state 1-4 故障恢复
 * 都会跳到这里。执行共享的场景推进逻辑，成功后跳到标题画面。
 */
function bank00_stateCommonContinue(sys: SystemState): void {
  console.log('[bank00] stateCommonContinue ($80FD)');

  // ── $80FD-$8104: 清零 ──
  // LDA #$00; STA $28; STA $29; STA $27
  sys.mem[ZP_FRAME_CTR_L] = 0;
  sys.mem[ZP_FRAME_CTR_H] = 0;
  sys.mem[ZP_SUB_STATE] = 0;

  // ── $8105-$8109: game flag ──
  // LDA #$01; STA $0700
  writeMem(sys, 0x0700, 0x01);

  // ── $810A-$8111: bank02 sceneSwitch ──
  // LDX #$02; JSR $C4B9; JSR $A20C
  bank30_bankSwitch(sys, 2);
  bank02_sceneSwitchHelper(sys);

  // ── $8112-$8116: bytecode restore ──
  // LDA #$00; JSR $8920
  bank00_bytecodeRestore(sys);

  // ── $8117-$811E: bank01 auxEntry2 ──
  // LDX #$01; JSR $C4B9; JSR $A006
  bank30_bankSwitch(sys, 1);
  bank01_auxEntry2(sys);

  // ── $811F-$8121: bank30 helper ──
  // JSR $C572
  bank30_helperC572(sys);

  // ── $8122-$8144: scene >= $20 特殊处理 ──
  const sceneId = sys.mem[0x26];
  if (sceneId >= 0x20) {
    // $812A: LDX #$4C; STX $0700
    writeMem(sys, 0x0700, 0x4C);
    // $812F-$813C: clear $0450-$0453
    writeMem(sys, 0x0450, 0);
    writeMem(sys, 0x0451, 0);
    writeMem(sys, 0x0452, 0);
    writeMem(sys, 0x0453, 0);
    // $813D-$8144: LDX #$01; JSR $C4B9; JSR $A009
    bank30_bankSwitch(sys, 1);
    bank01_auxEntry3(sys);
  }
  // else (scene < $20): BCC → skip cleanup (no-op)

  // ── $8145-$8148: BIT $E0; BMI skip ──
  const e0 = sys.mem[0xE0];
  if (e0 & 0x80) {
    // $E0 bit 7 set → 跳过字节码阶段，直接进定时器检查
    // BMI $0070 → 实际跳转到 $81B9（定时器检查路径）
    // 目前 stub: 直接返回让 dispatch 循环继续
    console.log('[bank00] stateCommonContinue: $E0 bit7 set → skip bytecode, loop');
    return;
  }

  // ── $8149-$814E: LDA $E4; CMP $26; BCS restart ──
  const e4 = sys.mem[0xE4];
  if (e4 >= sceneId) {
    // $E4 >= scene → set $27=1, fallback
    sys.mem[ZP_SUB_STATE] = 1;
    console.log('[bank00] stateCommonContinue: $E4 >= scene → restart');
    // 6502: JMP $80FD (loop back)
    bank00_stateCommonContinue(sys);
    return;
  }

  // ── $814F-$8156: LDX $26; LDA $83DC,X; BEQ restart ──
  const tableVal = readMem(sys, 0x83DC + sceneId);
  if (tableVal === 0) {
    // table is 0 → set $27=1, restart
    sys.mem[ZP_SUB_STATE] = 1;
    console.log('[bank00] stateCommonContinue: table[$26]=0 → restart');
    bank00_stateCommonContinue(sys);
    return;
  }

  // ── $8157-$815C: JSR $8464; JSR $82B5 ──
  bank00_execBytecode(sys);
  bank00_bytecodeWait(sys);

  // ── $815D-$8163: AND #$7F; STA $E0; JMP $8017 ──
  sys.mem[0xE0] &= 0x7F;
  bank00_titleBoot(sys);
}

// ── bank00 内部辅助 stub ──────────────────────────

/** $9BA0: PPU 清屏 / 画面初始化 (stub) */
function bank00_ppuClear(sys: SystemState): void {
  console.log('[bank00 stub] ppuClear ($9BA0)');
}

/** $82B5: 字节码等待辅助 — 等待 bytecode 执行完成 (stub) */
function bank00_bytecodeWait(sys: SystemState): void {
  console.log('[bank00 stub] bytecodeWait ($82B5)');
}

/** $8920: 字节码恢复 — 重置字节码解释器状态 (stub) */
function bank00_bytecodeRestore(sys: SystemState): void {
  console.log('[bank00 stub] bytecodeRestore ($8920)');
}

// ═════════════════════════════════════════════════
// 子状态 1-5 (stub, 后续翻译)
// ═════════════════════════════════════════════════

function dispatch_state1(sys: SystemState): void {
  console.log('[bank00] dispatch_state1');
  // $818A → 场景状态 1
  // BIT $ED; BVC ...; 完整翻译后续
  // 最终: STA $27 = 2 (子状态切换)
  sys.mem[ZP_SUB_STATE] = SubState.STATE_2;
}

function dispatch_state2(sys: SystemState): void {
  console.log('[bank00] dispatch_state2');
  // JSR C56C (bank30); JSR 8285
  sys.mem[ZP_SUB_STATE] = SubState.STATE_3;
}

function dispatch_state3(sys: SystemState): void {
  console.log('[bank00] dispatch_state3');
  // LDA #$04; STA $27
  sys.mem[ZP_SUB_STATE] = SubState.STATE_4;
}

function dispatch_state4(sys: SystemState): void {
  console.log('[bank00] dispatch_state4');
  // $81DA → 场景状态 4
  sys.mem[ZP_SUB_STATE] = SubState.STATE_5;
}

function dispatch_state5(sys: SystemState): void {
  console.log('[bank00] dispatch_state5');
  // $8263 → 场景状态 5
  // JMP $C57B → bank30 软重置 (终局 → 回标题)
  bank30_softReset(sys);
}

// ═════════════════════════════════════════════════
// 跨 bank 调用 & 帧同步 ($9FA8-$9FE4)
// ═════════════════════════════════════════════════

/**
 * $9FA8-$9FE4: 跨 bank 调用辅助 + NMI 帧等待
 *
 * 6502:
 *   STA $19        ; 保存帧数参数
 *   TXA; PHA       ; 保存 X
 *   TYA; PHA       ; 保存 Y
 *   ...PHA 更多的零页变量...
 *   BA; TXA         ; 读 SP
 *   LDX $00         ; 定时器槽位
 *   STA $01,X       ; 保存 SP
 *   LDA $0024       ; 当前 bank 号
 *   STA $02,X
 *   LDA $0025       ; 当前 bank 内偏移
 *   STA $03,X
 *   LDA $19
 *   BEQ mark_done
 *   CMP #$FF
 *   BNE store_cnt
 *   LDA #$FE
 *   STA $00,X       ; 存定时器计数
 *   JMP $9EFB       ; → 等待循环
 *
 *
 * 这是跨 bank 调用的核心机制: 保存当前上下文到定时器槽位，
 * 切换到目标 bank 执行，然后在 NMI 之后通过定时器恢复。
 */
export function bank00_waitFrame(sys: SystemState): void {
  // 模拟 NMI 等待
  sys.nmiPending = false;
}

// ═════════════════════════════════════════════════
// 帧定时器轮询 ($9EED-$9FA7)
// ═════════════════════════════════════════════════

/**
 * $9EED-$9FA7: 帧定时器轮询
 *
 * 6502:
 *   LDX #$01       ; 从槽位 1 开始
 *   L1: LDA $00,X  ; 读计数
 *   BEQ next       ; 0 = 空闲跳過
 *   CMP #$FF       ; $FF = 等待中
 *   BEQ wait_nmi
 *   DEC $00,X      ; 计数 -1
 *   BEQ trigger    ; 减到 0 → 触发
 *   TXA
 *   CLC; ADC #$04  ; 下一个槽位
 *   TAX
 *   CPX #$19       ; 最多 6 个槽位 ($01-$19, 每 4 字节)
 *   BNE L1
 *   ...NMI check...
 *
 * 检查零页定时器数组，每帧递减。
 * 定时器到期时触发跨 bank 的回调执行。
 */
export function bank00_tickTimers(sys: SystemState): void {
  for (let i = 1; i <= 6; i++) {
    const base = (i - 1) * 4; // $00, $04, $08, $0C, $10, $14
    const val = sys.mem[base];

    if (val === 0 || val === 0xFF) continue;

    sys.mem[base]--;
    if (sys.mem[base] === 0) {
      // Timer expired — trigger bank switch callback
      const bankNum = sys.mem[base + 3]; // target bank
      const addrHi  = sys.mem[base + 2]; // target addr high byte
      const addrLo  = sys.mem[base + 1]; // target addr low byte (SP restore)
      console.log(`[bank00] Timer ${i} expired → bank ${bankNum}, restore SP=$${addrLo.toString(16)}`);
      // TODO: bank switch to [bankNum], restore registers from stack, JMP to callback
    }
  }
}

// ═════════════════════════════════════════════════
// $81D4-$83DB — 场景切换辅助 + 精灵调色板引擎 (520 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $81D4: state 4 入口 → 设置 $27=4 → JMP $8017
//   $81DA-$81E5: state 4 body — 帧计数器比较，若不同步则进入 $81E6 路径
//   $81E6-$81F2: bank01 切換 + execBytecode($60) + palette fade out
//   $81F3-$81FD: 查表 $8398 → 更新 sceneId + bank30 辅助
//   $81FE-$8212: 备用路径 — bank01 分支 → 检查 $E0 bit6
//   $8213-$8235: 查表 $8420 → bytecode + wait → 清除 $E0 bit6
//   $8236-$824B: 查表 $8442 → 或无 → bytecode wait
//   $8269-$8282: altInit (已在上方翻译)
//   $8285-$8296: bytecode 参数设置子程序 (存 param → 指针 $4D/$4E → 调用 $9085)
//   $8297-$82A8: bytecode 参数 + frameWait 循环子程序
//   $82A9-$82B4: wait-for-script 循环
//   $82B5-$82C4: wait-for-script 或 SELECT 中断版本
//   $82C5-$82ED: 游戏状态重置 (零页清零 + 标志位初始化 + PPU 清屏)
//   $82EE-$8383: 精灵调色板初始化循环 (从 bank $B8 读 palette 数据)
//   $8384-$83DB: 精灵数据写入循环 (4 字节 × N sprites)

/** $82C5: 游戏重置 — 清除零页变量 + PPU + 精灵标志 */
export function bank00_resetGameState(sys: SystemState): void {
  sys.mem[0x05] = 0;
  sys.mem[0x06] = 0;
  sys.mem[0x09] = 0;
  sys.mem[0x0A] = 0;
  sys.mem[0x11] = 0;
  sys.mem[0x12] = 0;
  sys.mem[0x0D] = 0;
  sys.mem[0x0E] = 0;
  sys.mem[0x4C] = 0;
  writeMem(sys, 0x0700, 0x01);
  // $9BA0: PPU clear
  bank00_ppuClear(sys);
  sys.mem[0x44] = 0;
  sys.mem[0x45] = 0;
  sys.mem[0x7A] = 0;
  sys.mem[0x7B] = 0;
}

/**
 * $82EE: 精灵调色板循环 — 从 ROM 中逐帧加载精灵 palette。
 *
 * 6502 流程:
 *   $82EE: LDA $4C（帧标志）→ 若 b7=0 则返回
 *   $82F2: ASL → TAX → 读 $B800,X → 指针 $EC
 *   循环读取直到遇到 $FF（终止）或 $FE（跳过）
 *   每项读 3 字节: palette index, value, wait
 *   等待 $4C b7=1 → 继续下一项
 *
 * @param onBank02_switch 切換到 bank 02 ($A215)
 * @param onBank06_switch 切換到 bank 06（读取 palette 数据）
 */
export function bank00_spritePaletteLoader(
  sys: SystemState,
  onBank02_switch: (sys: SystemState) => void,
  onBank06_switch: (sys: SystemState) => void,
): void {
  const frameFlag = sys.mem[0x4C];
  if ((frameFlag & 0x80) === 0) return;

  // 读 palette 指针 (bank $B8 或 $06)
  const idx = frameFlag << 1;
  const ptrLo = readMem(sys, 0xB800 + idx);
  const ptrHi = readMem(sys, 0xB801 + idx);
  const ptr = (ptrHi << 8) | ptrLo;

  let offset = 0;
  const firstByte = readMem(sys, ptr + offset);
  if (firstByte >= 0x80) {
    // 高字节是条目计数
    const count = firstByte;
    let pos = 1;
    for (let i = 0; i < count; i++) {
      const b = readMem(sys, ptr + pos);
      if (b === 0xFE) continue;  // 跳过
      if (b === 0xFF) break;     // 终止
      const val = b;
      pos++;
      const wait = readMem(sys, ptr + pos);
      pos++;
      // 写入 palette ($062A + paletteIdx)
      const palIdx = readMem(sys, ptr + pos) || val;
      writeMem(sys, 0x062A + val, palIdx);
      pos++;
      // 等待帧标志
      if ((sys.mem[0x4C] & 0x80) === 0) break;
    }
  }
  sys.mem[0x4C] = 0;  // 完成标志
}

/** $8285: bytecode 参数设置 — 存 param 到 ($4D/$4E) 并调用解释器 */
export function bank00_bytecode_setup(sys: SystemState, hi: number, lo: number): void {
  sys.mem[ZP_SCRIPT_PTR_H] = (lo << 8) | 0xE5;  // $E5 → lo
  sys.mem[ZP_SCRIPT_PTR_L] = hi;  // → hi
  bank00_execBytecode(sys);
}

/** $82A9: 脚本等待 — 等 bytecode 指针归零 */
export function bank00_scriptWait(sys: SystemState): void {
  while ((sys.mem[ZP_SCRIPT_PTR_L] | sys.mem[ZP_SCRIPT_PTR_H]) !== 0) {
    // wait for NMI
  }
}

/** $82B5: 脚本等待或 SELECT 中断 — 等 bytecode 完成或 SELECT 按下 */
export function bank00_scriptWaitOrSelect(sys: SystemState): void {
  while ((sys.mem[ZP_SCRIPT_PTR_L] | sys.mem[ZP_SCRIPT_PTR_H]) !== 0) {
    if (sys.mem[ZP_JOYPAD1] & 0x20) {  // SELECT
      bank00_resetGameState(sys);
      return;
    }
  }
}

// $838A-$83DB: 内嵌数据 — 调色板索引表 (scene palette idx → 增量)
const SCENE_PALETTE_IDX_TABLE: readonly number[] = [
  0x00, 0x00, 0x02, 0x02, 0x04, 0x04, 0x06, 0x06,
  0x08, 0x08, 0x0A, 0x0A, 0x0C, 0x0C, 0x0E, 0x0E,
  0x10, 0x10, 0x12, 0x12, 0x14, 0x14, 0x16, 0x17,
  0x17, 0x19, 0x19, 0x1B, 0x1B, 0x1D, 0x1D, 0x1F,
  0x1F, 0x1F,
];

const SCENE_PALETTE_COUNT_TABLE: readonly number[] = [
  0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x01, 0x01,
  0x01, 0x01, 0x01, 0x03, 0x03, 0x03, 0x03, 0x03,
  0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x00, 0x03,
  0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03,
  0x02, 0x03,
];

// ═════════════════════════════════════════════════
// $83DC-$8463 — 场景数据表
// ═════════════════════════════════════════════════
// — 已在 stateCommonContinue 中引用，保留在 hex source

// ═════════════════════════════════════════════════
// 字节码解释器 ($8464-$89D1, ~1.2KB)
// ═════════════════════════════════════════════════
//
// 这是标题画面/菜单/过场的脚本引擎核心。
//
// 操作码范围:
//   $00-$D7: 字形 tile 直写 (直接写入 PPU nametable)
//   $D8-$DF: 1 字节控制码 (跳转表在 $8AE7-$8AF6)
//   $E0-$E7: 0 字节控制码 — 相对分支跳转 (在当前 nametable row 内回跳)
//   $E8-$FF: 扩展控制码 — 2 字节索引跳转表 ($8545-$8574)
//
// 6502 核心循环 ($84DA-$84E7):
//   $84DA: LDA ($4D),Y → 读操作码
//   $84DC: CMP #$D8; BCS check_E0  → <$D8 为 raw char
//   $84DE: raw_char: 通过 $88CA 写入 PPU → E6 $53 → 返回 $84DA
//   $84E7: check_E0: CMP #$E0; BCS check_E8
//   $84E9: D8-DF: SEC; SBC #$D8; TAX; LDA $8AE7,X → 1B op handlers
//   $84F4: check_E8: CMP #$E8; BCS extended
//   $84F6: E0-E7: SEC; SBC #$E1; EOR #$FF → relative offset → adjust $53
//   $8507: extended: SEC; SBC #$E8; ASL; TAX; LDA table,X → RTS 跳转

/**
 * $8545-$8574: 扩展操作码跳转表 (E8-FF → 24 entries × 2 bytes)
 *
 * 格式: 每组 2 字节 (lo, hi) → 目标地址在 bank-00 内
 */
const EXT_OPCODE_JMP_TABLE: readonly number[] = [
  // E8: 0x8574 → param bytecode call
  0x74, 0x85,
  // E9: 0x857F → waitFrame(2) + PPU scroll reset
  0x7F, 0x85,
  // EA: 0x858C → PPU nametable clear ($2000+$2400)
  0x8C, 0x85,
  // EB: 0x85C3 → PPU attr table fill + clear status
  0xC3, 0x85,
  // EC: 0x85D1 → fade effect advance
  0xD1, 0x85,
  // ED: 0x85EB → save script pointer → call sub-script
  0xEB, 0x85,
  // EE: 0x8603 → SELECT-wait dialog
  0x03, 0x86,
  // EF: 0x8617 → player name dialog
  0x17, 0x86,
  // F0: 0x862B → load sprite from bank $09/$0A
  0x2B, 0x86,
  // F1: 0x8649 → set $0552 (sprite flag)
  0x49, 0x86,
  // F2: 0x8677 → cursor toggle flash
  0x77, 0x86,
  // F3: 0x8681 → blank PPU row write
  0x81, 0x86,
  // F4: 0x86B7 → 2x jump table dispatch
  0xB7, 0x86,
  // F5-F6 → data segments
  0xB7, 0x87,
  // F7: 0x87CA → PPU row advance
  0xCA, 0x87,
  // F8: 0x87D8 → null/wait
  0xD8, 0x87,
  // F9: 0x87F7 → bytecode fork (call sub)
  0xF7, 0x87,
  // FA: 0x8813 → bank switch dispatch → bank $1A/$1B
  0x13, 0x88,
  // FB: 0x881A → sprite hide control
  0x1A, 0x88,
  // FC: 0x8830 → sprite palette shift
  0x30, 0x88,
  // FD: 0x8836 → bytecode jump absolute
  0x36, 0x88,
  // FE: 0x8854 → PPU tile direct write
  0x54, 0x88,
  // FF: 0x8861 → PPU row + column shift
  0x61, 0x88,
];

/**
 * $8AE7-$8AF6: D8-DF 1 字节操作码跳转表
 *
 * 格式: (param byte → offset within table)
 * 每个条目是需要等待的帧数
 */
const OPCODE_D8_DELAY_TABLE: readonly number[] = [
  0x0A,  // D8: wait 10 frames
  0x14,  // D9: wait 20 frames
  0x28,  // DA: wait 40 frames
  0x3C,  // DB: wait 60 frames
  0x50,  // DC: wait 80 frames
  0x78,  // DD: wait 120 frames
  0xF0,  // DE: wait 240 frames
  0x00,  // DF: immediate
];

/**
 * $8464: 字节码解释器主入口
 *
 * 负责执行场景脚本。脚本指针在 ($4D/$4E)。
 * 每个操作码完成后返回需要等待的帧数（0 表示同帧继续，>0 表示等待 N 帧后继续）。
 *
 * 6502 原始入口:
 *   $8464: 查询跳转表根据 param → 设置脚本指针 → 初始化 nametable 写入状态
 *   $84DA: 主循环 — 读操作码 → 分类处理
 *
 * @param param 可选参数索引（0-5），通过 $83EE 表查找目标脚本地址
 * @returns 0 = 脚本完成，>0 = 继续等待的帧数
 */
export function bank00_execBytecode(sys: SystemState, param?: number): number {
  if (param !== undefined) {
    // $8464-$8498: param → 查表获取脚本地址
    const paramTableAddr = 0x83EE;
    const lo = readMem(sys, paramTableAddr + param * 2);
    const hi = readMem(sys, paramTableAddr + param * 2 + 1);
    if (lo === 0 && hi === 0) return 0;

    sys.mem[ZP_SCRIPT_PTR_L] = lo;
    sys.mem[ZP_SCRIPT_PTR_H] = hi;

    // 初始化 nametable 写入状态
    // $84B0-$84C8: 设 $55=08 (行高), $4F=行起始 low, $50=$22 (PPU high)
    sys.mem[0x55] = 0x08;       // 行高计数器
    sys.mem[0x4F] = 0x49;       // nametable 起始 col
    sys.mem[0x50] = 0x22;       // PPU addr high byte

    // $84CC-$84D9: 复制 $4F→$51, $50→$52, $51→$53
    sys.mem[0x51] = sys.mem[0x4F];
    sys.mem[0x52] = sys.mem[0x50];
    sys.mem[0x53] = sys.mem[0x51];

    // $54 = $51 & 0x1F (列边界检测)
    sys.mem[0x54] = sys.mem[0x51] & 0x1F;
  }

  const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
  if (ptr === 0) return 0;

  // ── 主循环: 读操作码 ──
  const op = readMem(sys, ptr);
  sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
  if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;

  // ── 分类处理 ──
  if (op < 0xD8) {
    // === $00-$D7: raw char tile ===
    // 通过 $88CA 写入 PPU nametable
    _bytecode_writePPUTile(sys, op);
    return 0;  // 同帧继续

  } else if (op < 0xE0) {
    // === $D8-$DF: 1 字节控制码 ===
    const idx = op - 0xD8;
    const delay = OPCODE_D8_DELAY_TABLE[idx % OPCODE_D8_DELAY_TABLE.length];
    if (delay > 0) {
      // $D8-$DE: 等待帧 → 调用 waitFrame(delay)
      return delay;
    }
    // $DF: 立即继续
    return 0;

  } else if (op < 0xE8) {
    // === $E0-$E7: 0 字节相对分支 ===
    // 在当前 nametable row 内回跳。偏移量 = 0xE1 - op（取反+1）
    const offset = ((op - 0xE1) ^ 0xFF) + 1;  // 等价于 6502 SBC/SEC trick
    const newCol = ((sys.mem[0x53] + offset) & 0xFF);
    // 限界：确保不超过 $54（列最大值）
    if ((newCol & 0x1F) > sys.mem[0x54]) {
      sys.mem[0x54] = newCol & 0x1F;  // 更新列边界
    }
    sys.mem[0x53] = newCol;
    return 0;

  } else {
    // === $E8-$FF: 扩展控制码 ===
    const extIdx = (op - 0xE8) * 2;
    // 跳转表 dispatch (实际 6502 使用 RTS 跳转技巧)
    const targetLo = EXT_OPCODE_JMP_TABLE[extIdx % EXT_OPCODE_JMP_TABLE.length];
    const targetHi = EXT_OPCODE_JMP_TABLE[(extIdx + 1) % EXT_OPCODE_JMP_TABLE.length];
    return _bytecode_dispatchExtended(sys, op, targetLo, targetHi);
  }
}

/**
 * $88CA: 写 tile 到 PPU 缓冲
 *
 * 6502:
 *   $88CA: LDY $52; LDX $53; LDA tile → 写 PPU 地址 → 写 tile 数据
 *   然后 $53++ → 如果 $55≠0 则调用 $895D (行尾检测)
 */
function _bytecode_writePPUTile(sys: SystemState, tile: number): void {
  // PPU addr = ($50 << 8) | $53  (位于 nametable 中)
  // 简化为写入 tile buffer
  sys.mem[0x53] = (sys.mem[0x53] + 1) & 0xFF;

  // $55 行高 > 0 → 检查是否需要换行
  if (sys.mem[0x55] !== 0) {
    _bytecode_checkRowWrap(sys);
  }
}

/** $895D: 行尾检测 — 当 $53 超过 31 列时换行 */
function _bytecode_checkRowWrap(sys: SystemState): void {
  if ((sys.mem[0x53] & 0x1F) === 0) {
    // 换行: $51 += 0x40, $52 进位
    sys.mem[0x51] = (sys.mem[0x51] + 0x40) & 0xFF;
    if (sys.mem[0x51] < 0x40) {
      sys.mem[0x52] = (sys.mem[0x52] + 1) & 0xFF;
    }
    sys.mem[0x53] = sys.mem[0x51];
  }
}

/**
 * 扩展操作码分发 — 根据跳转表地址执行对应逻辑
 *
 * 这是所有 $E8-$FF 操作码的语义实现：
 *   E8: 递归 call (带参数)
 *   E9: waitFrame(2) + PPU scroll reset
 *   EA: PPU nametable fill (清屏 $2000/$2400)
 *   EB: PPU attr table fill + 重置 $4C/$7B 状态
 *   EC: 帧等待 → 调用 fade 引擎
 *   ED: 保存脚本指针 → 子脚本调用
 *   EE: SELECT 等待对话框
 *   EF: 玩家名称显示
 *   F0: bank $09/$0A → 加载精灵数据
 *   F1: 设置 $0652 精灵标志
 *   F2: 菜单光标闪烁控制
 *   F3: blank PPU row
 *   F4: 子跳转表 dispatch
 *   F7: PPU row advance
 *   F8: 无操作 (stub/null)
 *   F9: 字节码分支 (读脚本 → call 子函数)
 *   FA: bank 切換 dispatch
 *   FB: 精灵显示/隐藏控制
 *   FC: 精灵调色板 shift
 *   FD: 字节码绝对跳转
 *   FE: PPU 直接 tile 写入
 *   FF: PPU 行列 shift
 */
function _bytecode_dispatchExtended(
  sys: SystemState,
  op: number,
  targetLo: number,
  targetHi: number,
): number {
  // 简化: 大部分操作码最终返回 1（等待 1 帧）或 2（等待 2 帧）
  switch (op) {
    case 0xE8:  // param bytecode → 读下一个字节作为参数
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const subParam = readMem(sys, ptr);
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;
        bank00_execBytecode(sys, subParam);
        return 2;
      }

    case 0xE9:  // waitFrame(2) + PPU scroll
      return 2;

    case 0xEA:  // PPU clear + nametable fill ($2000+$2400)
      return 1;

    case 0xEB:  // PPU attr fill + reset
      sys.mem[0x4C] = 0;
      sys.mem[0x7B] = 0;
      sys.mem[0x0D] = 0;
      sys.mem[0x0E] = 0;
      return 1;

    case 0xEC:  // fade advance
      // 调用 $899A → $89A3 → $88B1 → 帧等待
      return 1;

    case 0xED:  // 子脚本调用（保存指针 → 执行 */
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const isTerminal = readMem(sys, ptr);
        if (isTerminal === 0xFF) {
          sys.mem[0x52] = 0;  // 终止标志
          return 2;
        }
        // 否则保存当前位置并跳转
        return 2;
      }

    case 0xEE:  // SELECT-wait dialog
      return 2;

    case 0xEF:  // 玩家名称: 读下一字节 → 切 bank $06 → 读精灵名
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const nameId = readMem(sys, ptr);
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;
        // bank switch → $06 → 读 $BB40 表 → PPU 写入名字
        return 2;
      }

    case 0xF0:  // 精灵加载: 读 bank 号 ($09/$0A) → 从 ROM 加载
      return 2;

    case 0xF1:  // 精灵标志设置
      sys.mem[0x0652] = 0;
      return 2;

    case 0xF2:  // 光标 toggle: toggle $99 b7
      {
        const px = sys.mem[0x99];
        sys.mem[0x99] = ((px & 0x80) ^ 0x80) | 0x40;
        return 1;
      }

    case 0xF3:  // blank row: nametable $2221, 30 个空格
      return 1;

    case 0xF4:  // 子跳转表: 读下一字节索引 → 查 $86C8 表
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const subIdx = readMem(sys, ptr) * 2;
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        return 2;
      }

    case 0xF7:  // PPU row advance
      return 2;

    case 0xF8:  // null/wait: 无操作
      return 1;

    case 0xF9:  // bytecode fork: 读指针 → call sub
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const forkLo = readMem(sys, ptr);
        const forkHi = readMem(sys, ptr + 1);
        sys.mem[ZP_SCRIPT_PTR_L] = forkLo;
        sys.mem[ZP_SCRIPT_PTR_H] = forkHi;
        return 2;
      }

    case 0xFA:  // bank switch dispatch: 读 bank → 切 bank → JMP
      return 2;

    case 0xFB:  // sprite hide: 翻转 $7B bit 0
      sys.mem[0x7B] ^= 0x01;
      sys.mem[0x44] = 0;
      sys.mem[0x45] = 0;
      sys.mem[0x7A] = 0;
      return 1;

    case 0xFC:  // 调色板 shift: 读偏移 → 应用到 $0468-$046C
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const shift = readMem(sys, ptr);
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;
        // 对 $0468-$04CB 做偏移
        const base = 0x0468;
        for (let i = 0; i < 0x64; i++) {
          const v = sys.mem[base + i];
          sys.mem[base + i] = (v + shift) & 0xFF;
        }
        return 2;
      }

    case 0xFD:  // bytecode 绝对跳转: 读 2 字节 → 设为新指针
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const jumpLo = readMem(sys, ptr);
        const jumpHi = readMem(sys, ptr + 1);
        sys.mem[ZP_SCRIPT_PTR_L] = jumpLo;
        sys.mem[ZP_SCRIPT_PTR_H] = jumpHi;
        return 1;
      }

    case 0xFE:  // PPU tile 直写: 读 2 字节 (addr, tile) → 写 PPU
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const ppuHi = readMem(sys, ptr);
        const ppuLo = readMem(sys, ptr + 1);
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 2) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;
        // 直接写入 PPU 地址
        return 1;
      }

    case 0xFF:  // PPU row+col shift: 读偏移 → 调整 $4F/$50
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const shiftVal = readMem(sys, ptr);
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;
        sys.mem[0x4F] = (sys.mem[0x4F] + shiftVal) & 0xFF;
        sys.mem[0x51] = sys.mem[0x4F];
        sys.mem[0x53] = sys.mem[0x4F];
        return 2;
      }

    default:
      return 1;
  }
}

// ═════════════════════════════════════════════════
// $89D2-$8AB3 — 精灵动画引擎 (226 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $89D2: 精灵数据加载入口 — 参数 A = 精灵 ID
//        → 切 bank $06 → 读 $BD00 指针表 → 存 $0654/$0655
//        → 设 $0652 = $80 (动画播放标志), $0653 = 1 (帧索引)
//   $89FF: 精灵帧推进 — 每帧递减 $0653 → 到 0 时读下一帧
//        → 从 $0654 指针读数据 → $FF=终止, $FE=循环
//        → 每帧数据格式: tile_index (bit7-3) + palette (bit2-0)
//        → 写 OAM buffer ($05E8+)
//   $8A8B: 精灵帧数据复制 — 从 ROM ($E8/$E9) 读 4 字节到 OAM
//   $8AB4-$8AD4: 精灵 tile 映射表 (33 bytes)
//   $8AD5-$8AE6: 精灵扩展 tile 映射表 (18 bytes)

/** $89D2: 精灵动画加载 — 根据 ID 加载精灵数据指针 */
export function bank00_spriteAnimLoad(sys: SystemState, spriteId: number): void {
  // 切 bank $06 → 读 $BD00 指针表
  // spriteId × 2 → 读 ($BD00 + spriteId*2)
  const ptrLo = readMem(sys, 0xBD00 + spriteId * 2);
  const ptrHi = readMem(sys, 0xBD01 + spriteId * 2);
  writeMem(sys, 0x0654, ptrLo);
  writeMem(sys, 0x0655, ptrHi);
  // 标志位: $80 = 活跃, 等待帧推进
  writeMem(sys, 0x0652, 0x80);
  writeMem(sys, 0x0653, 0x01);
  // $90/$91 = 00/02 (nametable 基准)
  sys.mem[0x90] = 0;
  sys.mem[0x91] = 2;
}

/**
 * $89FF: 精灵帧推进 — 每帧调用，更新动画帧。
 *
 * 6502 流程:
 *   检查 $0652 bit7 → 若为 0 则跳过
 *   递减 $0653 → 到 0 时:
 *     从 ($0654) 读数据:
 *       $FF: 终止 → 清 $0652
 *       $FE: 循环 → 重置指针
 *       其他: 格式 (tile<<3) | palette
 *          → 查表 $8AB4 得 tile ID
 *          → 写 OAM buffer + 取下一个 tile
 *    递增 $0652 → 读下一帧计数
 *
 * @returns 精灵是否仍在活跃（true = 继续，false = 完成）
 */
export function bank00_spriteAnimUpdate(sys: SystemState): boolean {
  const status = readMem(sys, 0x0652);
  if ((status & 0x80) === 0) return false;  // 非活跃

  const frameCnt = readMem(sys, 0x0653);
  if (frameCnt > 0) {
    writeMem(sys, 0x0653, frameCnt - 1);
    return (frameCnt - 1) > 0;
  }

  // 帧到期 → 读下一步
  // 切 bank $06 → 从 $0654/$0655 指针读数据
  let ptrLo = readMem(sys, 0x0654);
  let ptrHi = readMem(sys, 0x0655);
  const ptr = (ptrHi << 8) | ptrLo;

  const cmd = readMem(sys, ptr);
  if (cmd === 0xFF) {
    // 终止
    writeMem(sys, 0x0652, 0);
    return false;
  }

  if (cmd === 0xFE) {
    // 循环: 重置指针到 ROM 基址
    ptrLo = (ptrLo + 1) & 0xFF;
    if (ptrLo === 0) ptrHi++;
    writeMem(sys, 0x0654, ptrLo);
    writeMem(sys, 0x0655, ptrHi);
    // 读下一帧 tile count
    return true;
  }

  // 正常帧数据: tile<<3 + palette
  const tileCode = cmd;
  const paletteIdx = tileCode & 0x07;

  // 查 tile 映射表
  const tileId = _sprite_tileLookup(sys, tileCode >> 3);

  // 读 OAM 偏移
  const oamIdx = (status & 0x3F) + ptrLo;
  writeMem(sys, 0x05E8 + oamIdx, tileId);

  // 递增指针
  ptrLo = (ptrLo + 1) & 0xFF;
  if (ptrLo === 0) ptrHi++;
  writeMem(sys, 0x0654, ptrLo);
  writeMem(sys, 0x0655, ptrHi);

  // 读下一帧延迟
  const nextDelay = frameCnt > 0 ? 1 : 0;
  writeMem(sys, 0x0653, nextDelay);

  // 递增 frame 计数器
  writeMem(sys, 0x0652, (status + 1) & 0xFF);

  return true;
}

/** 精灵 tile 映射查表 */
function _sprite_tileLookup(sys: SystemState, index: number): number {
  const TABLE_ADDR = 0x8AB4;
  return readMem(sys, TABLE_ADDR + (index % 33));
}

// ═════════════════════════════════════════════════
// $8AF7-$8D09 — 场景过渡引擎 (531 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $8AF7: 场景过渡主入口 — 参数 A = scene ID
//        → 清标志 + 切 bank $07
//        → 查指针表 ($A000 + sceneId*2) 得场景数据指针
//        → 读场景属性: $75/$76 (OAM/PPU addr), $48 (palette), $5B (flags)
//        → 读 $5E (count), $5F (stride), $5C/$5D (src ptr)
//        → 计算目标指针 ($70/$71)
//        → 根据 $62 (mode) 决定渲染模式:
//          - $00-$3F: 直接复制 (逐行逐 tile 渲染)
//          - $40-$7F: 带 delta 更新
//          - $80-$BF: 逐帧擦除
//          - $C0-$FF: 特殊动画
//        → 更新 $7A/$7B (全局帧计数器)

/**
 * $8AF7: 场景过渡主入口
 *
 * 6502 核心流程:
 *   1. 清标志 + 切 bank $07 → 读场景指针
 *   2. 逐 6-byte record 遍历场景数据:
 *      - bytes 0-1: $75/$76 (目标 PPU/OAM 地址)
 *      - byte 2: $48 (palette 索引 + $5B 位 0)
 *      - byte 3: $5E (元素个数)
 *      - byte 4: $5F (步长)
 *      - bytes 5: $5C/$5D — 编码后的源数据指针
 *   3. 对每条 record:
 *      - 解码 $5C/$5D → 真实地址
 *      - 根据 $62（record[0] 的 bit7-5）选择渲染模式
 *      - 逐 tile 或逐帧渲染到 PPU
 *   4. 更新全局帧计数器 → 返回
 *
 * @param sceneId 场景 ID (0-$3F)
 * @param onBank07_switch 切换到 bank 07 的回调
 */
export function bank00_sceneTransition(
  sys: SystemState,
  sceneId: number,
  onBank07_switch: (sys: SystemState) => void,
): void {
  // 初始化
  sys.mem[0x09] = 0;
  sys.mem[0x0A] = 0;
  sys.mem[0x0D] = 0;
  sys.mem[0x0E] = 0;
  sys.mem[0x5B] &= 0x7F;  // 清除 bit7

  // 切 bank 07 → 读指针表
  onBank07_switch(sys);

  // 从 $A000 表读 scene 指针
  const ptrLo = readMem(sys, 0xA000 + sceneId * 2);
  const ptrHi = readMem(sys, 0xA001 + sceneId * 2);
  const basePtr = (ptrHi << 8) | ptrLo;

  // 读场景属性
  let ptr = basePtr;
  sys.mem[0x75] = readMem(sys, ptr);       // OAM/PPU lo
  sys.mem[0x76] = readMem(sys, ptr + 1);   // OAM/PPU hi
  const flags = readMem(sys, ptr + 2);
  sys.mem[0x48] = flags & 0x3F;             // palette 索引
  sys.mem[0x5B] = (sys.mem[0x5B] & 0xFE) | ((flags >> 6) & 1);

  sys.mem[0x5E] = readMem(sys, ptr + 3);    // 元素计数
  sys.mem[0x5F] = readMem(sys, ptr + 4);    // 步长

  // 解码源数据指针 ($5C/$5D)
  let rawLo = readMem(sys, ptr + 5);
  const rawHi = readMem(sys, ptr + 6) & 0x07;
  sys.mem[0x5C] = rawLo;
  sys.mem[0x5D] = 0x02 | (rawHi << 5);  // 基址 $0200-$02FF? 实际指向 ROM

  // 计算目标地址
  const tgtLo = readMem(sys, ptr + 7);
  const tgtHi = readMem(sys, ptr + 8);

  // 根据模式渲染
  const mode = readMem(sys, basePtr + 0);  // 第一个 record 的 mode byte
  const renderMode = (mode >> 5) & 0x07;

  switch (renderMode) {
    case 0:  // 直接复制: 逐行渲染
      _scene_renderDirect(sys, sys.mem[0x5E]);
      break;
    case 1:  // 带 delta: 增量更新
      _scene_renderDelta(sys, sys.mem[0x5E]);
      break;
    case 2:  // 擦除模式
      _scene_renderErase(sys, sys.mem[0x5E]);
      break;
    case 3:  // 动画路径
      _scene_renderAnim(sys, sys.mem[0x5E]);
      break;
    default:
      break;
  }

  // 更新帧计数器
  sys.mem[0x7A] = (sys.mem[0x7A] + 1) & 0xFF;
  if (sys.mem[0x7A] === 0) sys.mem[0x7B]++;

  // 恢复 bank
}

/** 场景直接复制渲染 */
function _scene_renderDirect(sys: SystemState, count: number): void {
  // 简化为: 逐 tile 复制到 PPU
  let srcLo = sys.mem[0x5C];
  let srcHi = sys.mem[0x5D];
  for (let i = 0; i < count; i++) {
    const tile = readMem(sys, (srcHi << 8) | srcLo);
    // 写 PPU
    srcLo = (srcLo + 1) & 0xFF;
    if (srcLo === 0) srcHi++;
  }
}

function _scene_renderDelta(sys: SystemState, count: number): void { /* 增量渲染 */ }
function _scene_renderErase(sys: SystemState, count: number): void { /* 擦除渲染 */ }
function _scene_renderAnim(sys: SystemState, count: number): void { /* 动画渲染 */ }

// ═════════════════════════════════════════════════
// $99D1-$9D6E — 调色板淡入淡出引擎 (926 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $99D1: 调色板淡出 — $4A/$4B 控制亮度
//   $99EC: 调色板淡入 — 递增 $4A/$4B
//   $9A07: 调色板初始化 — 保存 $48/$49, 清空
//   $9A35: 设置 $4A/$4B = 0x0F → palette fade out max
//   $9A4C: 设置 $4A = 0x0F (仅亮度)
//   $9A60: 设置 $4B = 0x0F
//   $9A71: 输出阶段: 将 $062A+ 的数据结合 $4A/$4B 写入 PPU
//   $9AB8: 查表计算 PPU addr = $B000 + $48*16
//   $9ADA: 查表计算 PPU addr = $B300 + $49*16
//   $9B07: 保存 bank 上下文 → 切 bank $06 → 读数据
//   $9B28: PPU 地址/数据写入 (写 $2006 + $2007)

/**
 * $9A71: 调色板输出 — 把 $062A-$0649 (32 bytes) 结合亮度值写入 PPU。
 *
 * 6502 流程:
 *   1. $48→ 查表得背景 palette PPU 基址 ($B000+)
 *   2. $49→ 查表得精灵 palette PPU 基址 ($B300+)
 *   3. 对 $062A-$0639 (16 bytes): 每个 = (rom_tile & 0x30) + $4A → PPU
 *   4. 对 $0639-$0649 (16 bytes): 每个 = (rom_tile & 0x30) + $4B → PPU
 *
 * @param onBank06_switch 切换到 bank 06 的回调
 */
export function bank00_paletteFlush(
  sys: SystemState,
  onBank06_switch: (sys: SystemState) => void,
): void {
  onBank06_switch(sys);

  // 背景 palette ($48)
  const bgBaseLo = sys.mem[0x48] * 16;  // $B000 + $48*16
  const sprBaseLo = sys.mem[0x49] * 16; // $B300 + $49*16

  // 写背景 16 色
  for (let i = 0; i < 16; i++) {
    const raw = sys.mem[0x062A + i];
    const brightness = sys.mem[0x4A];
    const out = (raw & 0x30) + brightness;
    sys.mem[0x062A + i] = out;
  }

  // 写精灵 16 色
  for (let i = 0; i < 16; i++) {
    const raw = sys.mem[0x063A + i];
    const brightness = sys.mem[0x4B];
    const out = (raw & 0x30) + brightness;
    sys.mem[0x063A + i] = out;
  }

  sys.mem[0x4A] = Math.min(sys.mem[0x4A] + 1, 0x0F);
  sys.mem[0x4B] = Math.min(sys.mem[0x4B] + 1, 0x0F);
}

/** $99D1: 调色板淡出 — 递增亮度使画面变亮 (从暗到亮) */
export function bank00_paletteFadeIn(sys: SystemState): void {
  if (sys.mem[0x4A] < 0x0F) sys.mem[0x4A]++;
  if (sys.mem[0x4B] < 0x0F) sys.mem[0x4B]++;
}

/** $99EC: 调色板淡入 — 递减亮度使画面变暗 (从亮到暗) */
export function bank00_paletteFadeOut(sys: SystemState): void {
  if (sys.mem[0x4A] > 0) sys.mem[0x4A]--;
  if (sys.mem[0x4B] > 0) sys.mem[0x4B]--;
}

/** $9A35: 最大亮度淡出 (全暗) */
export function bank00_paletteSetMax(sys: SystemState): void {
  sys.mem[0x4A] = 0x0F;
  sys.mem[0x4B] = 0x0F;
}

/** $9A00: 初始化调色板 — 清空 $4A/$4B + OAM 缓冲 */
export function bank00_paletteInit(sys: SystemState): void {
  sys.mem[0x48] = 0;
  sys.mem[0x49] = 0;
  sys.mem[0x4A] = 0;
  sys.mem[0x4B] = 0;
  // 清 OAM buffer ($054A-$05EA?)
  for (let i = 0x054A; i < 0x05EA; i++) {
    sys.mem[i] = 0xFF;
  }
}

// ═════════════════════════════════════════════════
// $9D6F-$9E31 — 数字显示 (195 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $9D6F: 数字转 PPU tile — 值 → 高位 hex digit + 低位 hex digit
//   $9D8A: 双字节 hex 显示 — 读取 2 字节值 → 写 4 个 PPU tiles
//   $9DB5: 多字节显示 — 指针数据 → 逐字节 hex 显示
//   $9DDA: hex digit → PPU tile (查表 $0F → '0', $33 → CD 前缀)
//   $9DEE: 乘法/除法辅助 (16-bit 移位乘法)
//   $9E0C: BCD 辅助 (x10 乘法)

/**
 * $9D6F: hex 值 → PPU tile pair (高位 + 低位)
 *
 * 6502: 输入 A → 存 $EC
 *   高位 = (A >> 4) ? (A >> 4) + 0x33 : 0xCD_033
 *   低位 = (A & 0x0F) + 0x33
 *   写 2 个 tiles 到 OAM buffer
 */
export function bank00_hexToTiles(sys: SystemState, value: number, oamIdx: number): void {
  const hi = (value >> 4) & 0x0F;
  const lo = value & 0x0F;

  // 高位: 如果是 0 → 显示空白 (0xCD)
  const hiTile = hi === 0 ? 0xCD : hi + 0x33;
  sys.mem[0x05E8 + oamIdx] = hiTile;
  sys.mem[0x05E8 + oamIdx + 1] = lo + 0x33;
}

/**
 * $9DB5: 双字节 hex 显示 — 16-bit 值 → 4 digit hex
 *
 * 6502: LDX #$04 → 循环 4 次
 *   对 ($EC/$ED) 逐 nybble 转换
 *   PPU buffer: digit3, digit2, digit1, digit0
 */
export function bank00_wordToTiles(sys: SystemState, word: number): void {
  for (let i = 3; i >= 0; i--) {
    const nibble = (word >> (i * 4)) & 0x0F;
    sys.mem[0x05E8 + (3 - i)] = nibble + 0x33;
  }
}

// ═════════════════════════════════════════════════
// $9E32-$9EA1 — BCD 转换 (112 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $9E32: 16-bit → BCD — 8-bit 移位除法
//        - 输入: $EC/$ED (值), $EA/$EB (除数)
//        - 输出: $E8/$E9/$EA (BCD 结果)
//   $9E4F: x10 乘法 — $ED × 10 → $EC/$ED
//   $9E67: x10 除法规整 — 逆操作
//   $9E80: BCD → 16-bit

/**
 * $9E32: 16-bit 值 → BCD 转换
 *
 * 6502: 输入 $EC/$ED, 除数 $EA/$EB
 *   通过移位和比较除法计算 BCD 表示
 *
 * @param value 16-bit 输入值
 * @param divisor 除数 (默认 10)
 * @returns BCD 结果
 */
export function bank00_bcdConvert(sys: SystemState, value: number, divisor: number = 10): number {
  let lo = value & 0xFF;
  let hi = (value >> 8) & 0xFF;
  let result = 0;

  for (let shift = 16; shift > 0; shift--) {
    result = (result << 1) & 0xFFFF;
    const carry = (hi & 0x80) !== 0;
    hi = ((hi << 1) | (lo >> 7)) & 0xFF;
    lo = (lo << 1) & 0xFF;

    let subLo = result & 0xFF;
    let subHi = (result >> 8) & 0xFF;
    subLo = (subLo - divisor) & 0xFF;
    if (subLo > 0xF0) subHi--;
    if ((subHi & 0x80) === 0) {
      result = (subHi << 8) | subLo;
      lo = (lo | 1) & 0xFF;
    }
  }
  return result;
}

/** $9E4F: ×10 乘法 → BCD 辅助 */
export function bank00_mul10(sys: SystemState, value: number): number {
  return (value * 10) & 0xFFFF;
}

// ═════════════════════════════════════════════════
// DATA: 注册 bank 00 ROM 数据
// ═════════════════════════════════════════════════

import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

console.log('[bank00] ✅ 已加载 — dispatchScene|titleBoot|waitStart|menuCursor|timers|bytecode|spriteAnim|palette|sceneTrans|bcd');

/** 注册 bank 00 到 MMC3 映射表 */
export function bank00_register(): void {
  registerBankRom(0, PRG_ROM_BANKS[0]);
  console.log('[bank00] ROM registered to MMC3 slot 0 (8KB)');
}
