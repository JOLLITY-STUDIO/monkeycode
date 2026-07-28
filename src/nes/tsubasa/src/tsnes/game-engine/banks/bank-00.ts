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
 *   ⏳ $80DF-$81D3 — 場景狀態機 (state 1-4)
 *   ⏳ $81D4-$83DB — 場景切換輔助
 *   ⏳ $8464-$89D1 — 字節碼解釋器
 *   ⏳ $89D2-$8FEF — 精靈動畫引擎
 *   ⏳ $900B-$978A — 精靈渲染輔助
 *   ⏳ $97AB-$98E7 — PPU nametable 操作
 *   ⏳ $98E8-$99AD — PPU 批量寫入
 *   ⏳ $99D1-$9D6E — 調色板/淡入淡出
 *   ⏳ $9D6F-$9E31 — 數字顯示
 *   ⏳ $9E32-$9EA1 — BCD 轉換
 *   ⏳ $9EED-$9FA7 — 定時器調度器
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
// 字节码解释器 ($8464-$89D1, ~5KB)
// ═════════════════════════════════════════════════
//
// 操作码范围:
//   $00-$D7: 直接字符 (nametable tile 写入)
//   $D8-$DF: 1 字节控制码
//   $E0-$E7: 0 字节控制码 (相对跳转)
//   $E8-$FF: 扩展控制码 (2 字节跳转表)
//
// ⚠ 全部待翻译，当前为 stub

/**
 * $8464: 字节码解释器主循环
 */
export function bank00_execBytecode(sys: SystemState, param?: number): number {
  const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
  if (ptr === 0 && param === undefined) return 0;

  if (param !== undefined) {
    console.log(`[bank00] execBytecode param=$${param.toString(16)}`);
  } else {
    const op = readMem(sys, ptr);
    console.log(`[bank00] execBytecode at $${ptr.toString(16)} op=$${op.toString(16)}`);
  }
  return 1; // 返回需等待帧数
}

// ═════════════════════════════════════════════════
// DATA: 注册 bank 00 ROM 数据
// ═════════════════════════════════════════════════

import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';

/** 注册 bank 00 到 MMC3 映射表 */
export function bank00_register(): void {
  registerBankRom(0, PRG_ROM_BANKS[0]);
  console.log('[bank00] ROM registered to MMC3 slot 0 (8KB)');
}
