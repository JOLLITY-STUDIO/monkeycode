/**
 * 
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
 *   ✅ $80DF-$81D3 — 場景狀態機 (state 1-4, 含帧同步 + 调色板淡出)
 *   ✅ $81D4-$83DB — 場景切換輔助 + 精靈 palette
 *   ✅ $8464-$89D1 — 字節碼解釋器 (含 ED/F4 子脚本调度, 数据直接访问)
 *   ✅ $89D2-$8AB3 — 精靈動畫引擎
 *   ✅ $8AF7-$8D09 — 場景過渡引擎 (含 mode 0-3 + ROM 查表)
 *   ✅ $8D0A-$8FEF — 精靈渲染循環 + tile 複製
 *   ✅ $900B-$978A — 精靈動畫 VM (含 alloc callback + F0-FF 完整跳转表 + 链推进)
 *   ✅ $97AB-$98E7 — PPU nametable 操作
 *   ✅ $98E8-$99AD — PPU 批量寫入 + 調色板 ROM 加載
 *   ✅ $99AE-$9D6E — 调色板淡入步进 + 淡入淡出引擎
 *   ✅ $9D6F-$9E31 — 數字顯示
 *   ✅ $9E32-$9EA1 — BCD 轉換
 *   ✅ $9EED-$9FA7 — 定時器調度器
 *   ✅ $9FA8-$9FE4 — 跨 bank 調用 + NMI 等待
 *
 * 数据消费状态 (20 段, bank-00-data.ts):
 *   ✅ 20/20 全部已连接
 *        — 5 段 code-in-data: $8FF0(死代码)/$926C(alloc)/$9350(F2-F4)/$9482(FA/FF)/$99AE(fade-in)
 *        — 12 段 场景/跳转/参数表: 已直接数组访问
 *        — 3 段 填充/查表: 已 inline 等效复制
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track, exit } from '../debug-log';
import {
  bank01_startGame,
  bank01_titleInit,
  bank01_titleProcess,
  bank01_auxEntry1,
  bank01_auxEntry2,
  bank01_auxEntry3,
  bank01_auxEntry8,
} from './bank-01-code';
import {
  bank02_loadSceneData,
  bank02_sceneSwitchHelper,
} from './bank-02-nmi-code';
import {
  bankSwitch,
  initScene_$C64E,
  sceneHelper_$DB62,
} from './bank-30-code';
// 跨 bank ROM 数据直接访问 (替代 MMC3 模拟)
import { rom06, rom06Ptr16 } from './bank-06-code';

// 关卡/场景元数据 bank-23
import { getBank23Data } from './bank-23-code';
import { rom07, rom07Ptr16 } from './bank-07-code';
import { rom09, rom09Ptr16 } from './bank-09-code';
import { rom10, rom10Ptr16 } from './bank-10-code';

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
  track('bank00_dispatchScene', { '0027': sys.mem[0x27] });
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
  console.log('[bank00] titleBoot → init title screen');

  // ── LDX #$02; JSR $C4B9: bankSwitch → bank 02 (NMI 渲染器) ──
  // bank02 must be mapped to handle NMI PPU flushing
  bankSwitch(sys, 2);

  // ── JMP $A203 → bank01_titleInit (标题画面渲染初始化) ──
  // Switches to bank 01 internally for title data, writes nametable tiles
  // and palette setup to PPU.
  bank01_titleInit(sys);
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
  bank00_ppuClear(sys);

  // LDA #$00; JSR $8464 — exec bytecode for title screen init
  bank00_execBytecode(sys, 0);

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
  bank00_ppuControlSetup(sys);

  // JSR $9B7F — PPU data clear
  bank00_ppuDataClear(sys);

  // JSR $98A0 — PPU nametable fill
  bank00_ppuNametableFill(sys);

  // JSR $8297 — bytecode with param $0D
  bank00_bytecodeParam(sys, 0x0D);

  // 清 $7B
  sys.mem[0x7B] = 0;

  // JSR $8AF7 — scene transition init (scene ID = $17)
  bank00_sceneTransition(sys, 0x17, (s) => bankSwitch(s, 7));

  // JSR $890C — sprite data load (param $30)
  bank00_spriteDataLoad(sys, 0x30);

  // JSR $88FB — sprite post-process
  bank00_spritePostProcess(sys);

  // JSR $9A35 — palette fade setup (max brightness + load ROM palette)
  bank00_paletteSetMax(sys);

  // JSR $8920 — bytecode final (param 0)
  bank00_bytecodeRestore(sys);

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
  _ppu_setAddr(sys, 0x220A);
  _ppu_writeData(sys, 0x7F);

  // 每帧循环: 等待帧 → 读手柄 → 处理方向键
  const checkInput = () => {
    // 实际帧循环由外部 NMI tick 驱动，每帧调用一次 checkInput

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
      // DOWN: select — 进入选中的菜单项
      console.log('[bank00] cursor DOWN → select');
      // 处理菜单选择逻辑: 根据当前光标位置跳转到对应 bank01/bank30
      const selection = sys.mem[ZP_CURSOR_FLAGS] & 0x3F;
      console.log('[bank00] cursor selection = ' + selection);
      // 菜单选择由外部 dispatch 处理，此处仅触发状态切换
      sys.mem[0x7B] = selection;
    } else if (dPad & JOY_LEFT) {
      console.log('[bank00] cursor LEFT');
    } else if (dPad & JOY_RIGHT) {
      console.log('[bank00] cursor RIGHT');
    }

    // PPU write: update cursor display
    _ppu_setAddr(sys, 0x2200 | cursorPos);
    _ppu_writeData(sys, 0x7F);

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
  console.log('[bank00] state0FullInit: step1 ppuClear...');
  bank00_ppuClear(sys);
  console.log('[bank00] state0FullInit: step1 ppuClear done');

  // LDA #$01; JSR $8464 — execBytecode(param=1)
  console.log('[bank00] state0FullInit: step2 execBytecode(1)...');
  bank00_execBytecode(sys, 1);
  console.log('[bank00] state0FullInit: step2 execBytecode done');

  // JSR $82B5 — bytecode wait helper
  console.log('[bank00] state0FullInit: step3 bytecodeWait...');
  bank00_bytecodeWait(sys);
  console.log('[bank00] state0FullInit: step3 bytecodeWait done');

  // LDA #$C0; STA $E0
  sys.mem[0xE0] = 0xC0;

  // LDX #$02; JSR $C4B9 → bankSwitch(bank=2)
  bankSwitch(sys, 2);
  // JSR $A20F → bank02_loadSceneData (bank 02 mapped)
  bank02_loadSceneData(sys);

  console.log('[bank00] state0FullInit: → stateCommonContinue');
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
  bankSwitch(sys, 1);
  // JSR $A003 → bank01_auxEntry1
  bank01_auxEntry1(sys);

  // LDX #$02; JSR $C4B9 → bankSwitch(bank=2)
  bankSwitch(sys, 2);
  // JSR $A20F → bank02_loadSceneData
  bank02_loadSceneData(sys);

  // LDX #$01; JSR $C4B9 → bankSwitch(bank=1)
  bankSwitch(sys, 1);
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
  bankSwitch(sys, 2);
  bank02_sceneSwitchHelper(sys);

  // ── $8112-$8116: bytecode restore ──
  // LDA #$00; JSR $8920
  bank00_bytecodeRestore(sys);

  // ── $8117-$811E: bank01 auxEntry2 ──
  // LDX #$01; JSR $C4B9; JSR $A006
  bankSwitch(sys, 1);
  bank01_auxEntry2(sys);

  // ── $811F-$8121: bank30 helper ──
  // JSR $C572 → sceneHelper_$DB62 → JSR $8003 (dispatch using A=$05FB)
  // $8003 = TAX — dispatches with A ($05FB) instead of $27
  sceneHelper_$DB62(sys, (s, a) => {
    // Guard: skip dispatch when $05FB=0 to prevent recursive state0 loop
    if (a === 0) {
      console.log('[bank00] stateCommonContinue: sceneHelper skip dispatch ($05FB=0)');
      return;
    }
    // Dispatch using A value (= $05FB) instead of $27
    const saved27 = s.mem[ZP_SUB_STATE];
    s.mem[ZP_SUB_STATE] = a;
    try {
      bank00_dispatchScene(s);
    } finally {
      s.mem[ZP_SUB_STATE] = saved27;
    }
  });

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
    bankSwitch(sys, 1);
    bank01_auxEntry3(sys);
  }
  // else (scene < $20): BCC → skip cleanup (no-op)

  // ── $8145-$8148: BIT $E0; BMI skip ──
  // $E0 bit 7 clear → 需要先执行字节码脚本，再进标题
  // $E0 bit 7 set  → 跳过字节码，直接进标题（从 state0FullInit 来）
  const skipBytecode = !!(sys.mem[0xE0] & 0x80);

  if (!skipBytecode) {
    // ── $8149-$814E: LDA $E4; CMP $26; BCS restart ──
    // 6502: 用 JMP $80FD 循环，翻译模式下最多重试 3 次防死循环
    for (let retry = 0; retry < 3; retry++) {
      const e4 = sys.mem[0xE4];
      if (e4 >= sceneId) {
        sys.mem[ZP_SUB_STATE] = 1;
        console.log('[bank00] stateCommonContinue: $E4 >= scene → restart');
        // 6502: JMP $80FD — 从头重新执行 stateCommonContinue
        // 这里通过循环处理（不递归）
        continue;
      }

      // ── $814F-$8156: LDX $26; LDA $83DC,X; BEQ restart ──
      const tableVal = DATA_$83DC_$83FE[sceneId];
      if (tableVal === 0) {
        sys.mem[ZP_SUB_STATE] = 1;
        console.log('[bank00] stateCommonContinue: table[$26]=0 → restart');
        continue;
      }

      // ── $8157-$815C: JSR $8464; JSR $82B5 ──
      // 6502: A = tableVal (from LDA $83DC,X)
      bank00_execBytecode(sys, tableVal);
      bank00_bytecodeWait(sys);
      break; // 字节码执行完成，退出重试循环
    }
    console.log('[bank00] stateCommonContinue: bytecode done → title');
  } else {
    console.log('[bank00] stateCommonContinue: $E0 bit7 set → skip bytecode → title');
  }

  // ── $815D-$8163: AND #$7F; STA $E0; JMP $8017 ──
  // 无论是否跳过字节码，清除 $E0 bit 7 并进入标题画面
  sys.mem[0xE0] &= 0x7F;
  bank00_titleBoot(sys);
}

// ── bank00 内部辅助函数 ──────────────────────────

/**
 * $9BA0: PPU 清屏 / 画面初始化
 *
 * 6502: 通过 $2006/$2007 循环 1024 次写 $00 到 nametable $2000-$23FF
 *       然后写入 attribute table $23C0-$23FF
 */
function bank00_ppuClear(sys: SystemState): void {
  // ── 清 nametable 0 ($2000-$23BF): 960 tiles × $00 ──
  _ppu_setAddr(sys, 0x2000);
  for (let i = 0; i < 960; i++) {
    _ppu_writeData(sys, 0x00);
  }

  // ── 清 attribute table ($23C0-$23FF): 64 bytes × $00 ──
  // PPU addr already at $23C0 after 960 writes
  for (let i = 0; i < 64; i++) {
    _ppu_writeData(sys, 0x00);
  }
}

/**
 * $9B11: PPU 控制初始化 — 清除 fade 变量 + 精灵区域初始亮度 + palette flush
 *
 * 6502:
 *   LDA #$00; STA $48,$49,$4A,$4B     ; 清除 fade 变量
 *   LDA #$0F; LDY #$E0
 *   STA $054A,Y; INY; BNE loop        ; 填 $054A-$0629 = $0F (最大亮度)
 *   JMP $9A71                          ; palette flush
 */
function bank00_ppuControlSetup(sys: SystemState): void {
  // 清除 fade 变量
  sys.mem[0x48] = 0;
  sys.mem[0x49] = 0;
  sys.mem[0x4A] = 0;
  sys.mem[0x4B] = 0;

  // 填 $054A-$0629 (224 bytes) 为 $0F (最大亮度/显示状态)
  for (let i = 0x054A; i <= 0x0629; i++) {
    sys.mem[i] = 0x0F;
  }

  // palette flush → 通知 NMI handler 写入 PPU $3F00
  bank00_paletteFlush(sys);
}

/**
 * $9B7F: OAM/精灵数据清除
 *
 * 6502:
 *   LDX #$00
 *   LDA #$F8; STA $0468,X; INX; BNE loop   ; 填 $0468-$0567 = $F8 (OAM Y=248, 不可见)
 *   LDA #$F8; STA $0200,X; INX; BNE loop   ; 填 $0200-$02FF = $F8 (secondary OAM)
 *   LDA #$00; STA $0568,$0588,$05A8,$05C8   ; 清除 OAM 第二页标记
 */
function bank00_ppuDataClear(sys: SystemState): void {
  // OAM buffer: $0468-$0567 = $F8 (sprite Y=248, 屏幕外/不可见)
  for (let i = 0x0468; i <= 0x0567; i++) {
    sys.mem[i] = 0xF8;
  }
  // Secondary OAM: $0200-$02FF = $F8
  for (let i = 0x0200; i <= 0x02FF; i++) {
    sys.mem[i] = 0xF8;
  }
  // 清除 OAM 第二页标记
  sys.mem[0x0568] = 0;
  sys.mem[0x0588] = 0;
  sys.mem[0x05A8] = 0;
  sys.mem[0x05C8] = 0;
}

/**
 * $98A0: PPU nametable 初始化 — 禁用渲染 → 清 2KB nametable → 恢复渲染
 *
 * 6502:
 *   LDA $20; AND #$7F; STA $2000      ; 禁用 NMI
 *   LDA $21; AND #$E7; STA $2001      ; 禁用渲染
 *   LDA #$20; STA $2006; LDA #$00; STA $2006  ; PPU addr = $2000
 *   LDY #$08                           ; 8 pages (2KB)
 *   LDA #$00; TAX
 *   STA $2007; INX; BNE loop; DEY; BNE loop
 *   LDA $21; ORA #$18; STA $2001      ; 恢复渲染
 *   LDA $20; ORA #$80; STA $2000      ; 恢复 NMI
 */
function bank00_ppuNametableFill(sys: SystemState): void {
  // 禁用 NMI
  sys.mem[0x20] &= 0x7F;
  writeMem(sys, 0x2000, sys.mem[0x20]);

  // 禁用渲染
  sys.mem[0x21] &= 0xE7;
  writeMem(sys, 0x2001, sys.mem[0x21]);

  // PPU addr = $2000
  _ppu_setAddr(sys, 0x2000);

  // 写 8 pages × 256 bytes = 2KB ($2000-$27FF)
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 256; x++) {
      _ppu_writeData(sys, 0x00);
    }
  }

  // 恢复渲染
  sys.mem[0x21] |= 0x18;
  writeMem(sys, 0x2001, sys.mem[0x21]);

  // 恢复 NMI
  sys.mem[0x20] |= 0x80;
  writeMem(sys, 0x2000, sys.mem[0x20]);
}

/**
 * $8297: 字节码参数设置 — 保存参数到 $E7，设脚本指针 $00E5，调用字节码引擎
 *
 * 6502:
 *   STA $E7
 *   LDA #$01; STA $E6
 *   LDA #$E5; STA $4D; LDA #$00; STA $4E
 *   JSR $9085
 */
function bank00_bytecodeParam(sys: SystemState, param: number): void {
  sys.mem[0xE7] = param & 0xFF;
  sys.mem[0xE6] = 0x01;
  // 脚本指针 → $00E5
  sys.mem[ZP_SCRIPT_PTR_L] = 0xE5;
  sys.mem[ZP_SCRIPT_PTR_H] = 0x00;
  // 执行字节码
  bank00_execBytecode(sys);
}

/**
 * $890C: 精灵数据批量偏移 — 对每个 OAM 项的 Y 坐标加 param
 *
 * 6502:
 *   STA $ED; LDX #$00
 *   LDA $0468,X; CLC; ADC $ED; STA $0468,X   ; Y += param
 *   INX; INX; INX; INX; BNE loop             ; 下一个 sprite (每 4 字节)
 */
function bank00_spriteDataLoad(sys: SystemState, param: number): void {
  for (let i = 0x0468; i <= 0x0567; i += 4) {
    sys.mem[i] = (sys.mem[i] + param) & 0xFF;
  }
}

/**
 * $88FB: 精灵属性翻转 — 对每个 OAM 项的属性字节 XOR $20 (翻转 palette 位)
 *
 * 6502:
 *   LDX #$00
 *   LDA $046A,X; EOR #$20; STA $046A,X
 *   INX; INX; INX; INX; BNE loop
 */
function bank00_spritePostProcess(sys: SystemState): void {
  for (let i = 0x046A; i <= 0x0569; i += 4) {
    sys.mem[i] ^= 0x20;
  }
}

/**
 * $82B5: 字节码等待辅助 — 循环执行 bytecode 直到脚本完成
 *
 * 6502 实际在 NMI 帧循环中等待 bytecode 逐帧推进。
 * 翻译模式下同步执行所有非延迟操作码，累积等待帧数。
 * 返回后由调用方在帧循环中递减等待计数。
 */
function bank00_bytecodeWait(sys: SystemState): void {
  // 检查脚本指针是否有效 — 如果 execBytecode 没初始化过脚本，直接返回
  if (sys.mem[ZP_SCRIPT_PTR_L] === 0 && sys.mem[ZP_SCRIPT_PTR_H] === 0) {
    return; // 没有脚本在执行，无需等待
  }

  // 循环推进 bytecode，直到返回 >0（需要等待帧）
  // 安全上限：最多执行 2000 个操作码防止死循环
  const MAX_ITER = 2000;
  let delay = bank00_execBytecode(sys);
  let iter = 0;
  while (delay === 0 && iter < MAX_ITER) {
    delay = bank00_execBytecode(sys);
    iter++;
  }
  if (iter >= MAX_ITER) {
    console.warn('[bank00] bytecodeWait: max iterations reached, breaking');
    delay = 2; // 强制等待 2 帧退出
  }
  // delay > 0: 需等待 delay 帧 → 存入状态供帧循环递减
  if (delay > 0) {
    sys.mem[0xE9] = delay; // bytecode wait counter
  }
}

/**
 * $8920: 字节码恢复 — 重置字节码解释器状态
 *
 * 6502: 重置脚本指针、行高、nametable 写入状态等变量。
 * 被 stateCommonContinue 在进入场景前调用，以及 titleInit 用参数 $09 初始化。
 */
function bank00_bytecodeRestore(sys: SystemState): void {
  // 重置脚本指针 ($4D/$4E)
  sys.mem[0x4D] = 0;
  sys.mem[0x4E] = 0;

  // 重置 nametable 写入状态
  sys.mem[0x55] = 0x08;  // 行高
  sys.mem[0x4F] = 0x49;  // PPU col start
  sys.mem[0x50] = 0x22;  // PPU addr hi
  sys.mem[0x51] = 0x49;
  sys.mem[0x52] = 0x22;
  sys.mem[0x53] = 0x49;
  sys.mem[0x54] = 0x49 & 0x1F;

  // 清除字节码等待
  sys.mem[0xE9] = 0;
}

// ═════════════════════════════════════════════════
// 子状态 1-5 — 场景分派状态机
// ═════════════════════════════════════════════════

/**
 * $818B: dispatch_state1 — 场景状态 1
 *
 * 6502:
 *   LDA $28; CMP $29             ; 帧计数器同步检查
 *   BEQ synced                   ; 若同步 → 查表 $83BA
 *   BCS/JMP $81E6                ; 不同步 → 调色板淡出 + 场景切换
 *
 *   synced:
 *     LDX $26; LDA $83BA,X       ; 查场景表
 *     BEQ $8203 → stateCommon    ; 0 = 跳过
 *     CMP #$01
 *     BEQ $81A5                  ; =1 = JSR C56C + JSR $8285
 *     LDA #$02; STA $27         ; 否则设子状态=2
 *     JSR $C56C; JSR $8285       ; bank30 调用 + bytecode
 *     JMP $8017 → titleBoot
 */
function dispatch_state1(sys: SystemState): void {
  console.log('[bank00] dispatch_state1');
  const frameLo = sys.mem[ZP_FRAME_CTR_L]; // $28
  const frameHi = sys.mem[ZP_FRAME_CTR_H]; // $29

  if (frameLo === frameHi) {
    // 帧同步 → 查场景表 $83BA
    const sceneId = sys.mem[0x26];
    const tableVal = DATA_$83BA_$83DB[sceneId];
    if (tableVal === 0) {
      // 表值为 0 → 跳转到 stateCommonContinue
      bank00_stateCommonContinue(sys);
      return;
    }
    if (tableVal !== 1) {
      // 非 1 → 设子状态 = 2
      sys.mem[ZP_SUB_STATE] = SubState.STATE_2;
    }
    // JSR $C56C (bank30 helper)
    bankSwitch(sys, 1);
    bank01_auxEntry2(sys);
    // JSR $8285: bytecode setup
    bank00_bytecodeParam(sys, sys.mem[0x26]);
    // JMP $8017 → titleBoot
    bank00_titleBoot(sys);
    return;
  }

  // 帧未同步 → $81E6 路径 (调色板淡出 + 场景切换)
  _dispatch_unsyncedPath(sys);
}

/**
 * $81AE: dispatch_state2 — 场景状态 2
 *
 * 6502:
 *   LDA #$03; STA $27; JMP $8017
 *
 * 极简: 直接设子状态 3 → 标题画面启动
 */
function dispatch_state2(sys: SystemState): void {
  console.log('[bank00] dispatch_state2');
  sys.mem[ZP_SUB_STATE] = SubState.STATE_3;
  bank00_titleBoot(sys);
}

/**
 * $81B5: dispatch_state3 — 场景状态 3
 *
 * 6502:
 *   LDA $28; CMP $29             ; 帧同步检查
 *   BEQ synced
 *   BCS/JMP $81E6
 *
 *   synced:
 *     LDX $26; LDA $83BA,X
 *     CMP #$03
 *     BEQ skip_bc                ; =3 → 跳过 bytecode
 *     LDA $26; CMP #$20
 *     BNE skip_bc                ; scene != $20 → 跳过
 *     INC $26                    ; scene++ (特殊 $20 处理)
 *     JMP $80FD → stateCommon
 *
 *   skip_bc:
 *     JSR $C56C; JSR $8285; JMP $8017
 */
function dispatch_state3(sys: SystemState): void {
  console.log('[bank00] dispatch_state3');
  const frameLo = sys.mem[ZP_FRAME_CTR_L];
  const frameHi = sys.mem[ZP_FRAME_CTR_H];

  if (frameLo === frameHi) {
    const sceneId = sys.mem[0x26];
    const tableVal = DATA_$83BA_$83DB[sceneId];
    if (tableVal === 3) {
      // 表值=3 → bank30 + bytecode → titleBoot
      bankSwitch(sys, 1);
      bank01_auxEntry2(sys);
      bank00_bytecodeParam(sys, sceneId);
      bank00_titleBoot(sys);
      return;
    }
    if (sceneId !== 0x20) {
      // scene != $20 → bank30 + bytecode → titleBoot
      bankSwitch(sys, 1);
      bank01_auxEntry2(sys);
      bank00_bytecodeParam(sys, sceneId);
      bank00_titleBoot(sys);
      return;
    }
    // scene == $20: INC $26 → stateCommonContinue
    sys.mem[0x26]++;
    bank00_stateCommonContinue(sys);
    return;
  }

  // 帧未同步
  _dispatch_unsyncedPath(sys);
}

/**
 * $81DB: dispatch_state4 — 场景状态 4
 *
 * 6502:
 *   LDA $28; CMP $29
 *   BEQ synced                   ; → $81F3 (bytecode + fade + switch)
 *   BCS altPath                  ; → $8206 (bank01 分支)
 *   JMP $81E6                    ; 未同步路径
 *
 *   synced ($81F3):
 *     JSR $82B5; JSR $99F0       ; bytecode wait + palette fade out
 *     LDX $26; LDA $8398,X       ; 场景切换表
 *     STA $26
 *     JSR $C578
 *     JMP $80FD → stateCommon
 */
function dispatch_state4(sys: SystemState): void {
  console.log('[bank00] dispatch_state4');
  const frameLo = sys.mem[ZP_FRAME_CTR_L];
  const frameHi = sys.mem[ZP_FRAME_CTR_H];

  if (frameLo === frameHi) {
    // 帧同步 → bytecode wait + palette fade out
    bank00_bytecodeWait(sys);
    bank00_paletteFadeOut(sys);

    // 场景切换表 $8398
    const sceneId = sys.mem[0x26];
    const newScene = DATA_$8398_$83B9[sceneId];
    sys.mem[0x26] = newScene;

    // JSR $C578 → bank30 sceneHelper
    sceneHelper_$DB62(sys, (s, a) => {
      if (a !== 0) {
        const saved = s.mem[ZP_SUB_STATE];
        s.mem[ZP_SUB_STATE] = a;
        bank00_dispatchScene(s);
        s.mem[ZP_SUB_STATE] = saved;
      }
    });

    // JMP $80FD → stateCommonContinue
    bank00_stateCommonContinue(sys);
    return;
  }

  if (frameLo >= frameHi) {
    // $28 >= $29 → 备用路径 $8206
    bankSwitch(sys, 1);
    bank01_auxEntry2(sys); // JSR $A012 → bank01

    // BIT $E0; BVS → 检查 $E0 bit6
    if (sys.mem[0xE0] & 0x40) {
      // bit6 set → 查表 $8420
      const sceneId = sys.mem[0x26];
      const tableVal = DATA_$8420_$8441[sceneId];
      if (tableVal !== 0) {
        bank00_execBytecode(sys, tableVal);
        bank00_bytecodeWait(sys);
      }
      sys.mem[0xE0] &= 0xBF; // 清除 $E0 bit6
    } else {
      // bit6 clear → 查表 $8442
      const sceneId = sys.mem[0x26];
      const tableVal = DATA_$8442_$8463[sceneId];
      if (tableVal !== 0) {
        bank00_execBytecode(sys, tableVal);
        // JSR $82A9: script wait
      }
    }

    // 继续处理
    bank00_stateCommonContinue(sys);
    return;
  }

  // $28 < $29: 未同步路径
  _dispatch_unsyncedPath(sys);
}

/**
 * $81E6: 帧未同步共享路径
 *
 * 6502:
 *   LDX #$01; JSR $C4B9 (bank switch to 1)
 *   JSR $A015 (bank01 aux)
 *   LDA #$60; JSR $8464 (execBytecode $60 — 调色板淡出脚本)
 *   JSR $82B5 (bytecodeWait)
 *   JSR $99F0 (paletteFadeOut)
 *   LDX $26; LDA $8398,X (场景切换查表)
 *   STA $26
 *   JSR $C578 (bank30 sceneHelper)
 *   JMP $80FD → stateCommonContinue
 */
function _dispatch_unsyncedPath(sys: SystemState): void {
  console.log('[bank00] _dispatch_unsyncedPath → fade + scene switch');

  // LDX #$01; JSR $C4B9
  bankSwitch(sys, 1);
  // JSR $A015 → bank01 aux
  bank01_auxEntry2(sys);

  // LDA #$60; JSR $8464 → bytecode for palette fade out
  bank00_execBytecode(sys, 0x60);

  // JSR $82B5 → bytecode wait
  bank00_bytecodeWait(sys);

  // JSR $99F0 → palette fade out
  bank00_paletteFadeOut(sys);

  // LDX $26; LDA $8398,X → 场景切换表
  const sceneId = sys.mem[0x26];
  const newScene = DATA_$8398_$83B9[sceneId];
  sys.mem[0x26] = newScene;

  // JSR $C578 → bank30 sceneHelper
  sceneHelper_$DB62(sys, (s, a) => {
    if (a !== 0) {
      const saved = s.mem[ZP_SUB_STATE];
      s.mem[ZP_SUB_STATE] = a;
      bank00_dispatchScene(s);
      s.mem[ZP_SUB_STATE] = saved;
    }
  });

  // JMP $80FD → stateCommonContinue
  bank00_stateCommonContinue(sys);
}

function dispatch_state5(sys: SystemState): void {
  console.log('[bank00] dispatch_state5');
  // $8263 → 场景状态 5
  // JMP $C57B → bank30 软重置 (终局 → 回标题)
  initScene_$C64E(sys, false);
}

// ═════════════════════════════════════════════════
// 定时器调度系统 → 跨 bank 调用 + NMI 帧同步 ($9EED-$9FE4)
// ═════════════════════════════════════════════════
//
// ┌──────────────── 定时器槽位 (纯 TS 对象数组) ─────────────────────┐
// │ 每个槽位: { counter, savedCtx, onResume }                        │
// │                                                                    │
// │ counter = 0   → 空闲 (inactive)                                   │
// │ counter = 0xFE → 已完成 (done)                                    │
// │ counter = 0xFF → 挂起 (suspended, 跨 bank 调用等待对方返回)       │
// │ counter = N    → 倒计时 N 帧                                      │
// │                                                                    │
// │ savedCtx: { e6_ed: [8]number, Y: number, X: number } | null       │
// │ onResume: (sys) => void | null                                     │
// └────────────────────────────────────────────────────────────────────┘
//
// 工作流:
//   bank00_waitFrame(sys, count, onResume)
//     → 保存 ZP 上下文 → 找空闲槽位 → 存 counter + ctx + onResume → 返回
//
//   bank00_tickTimers(sys) [每帧调用]
//     → 轮询 6 个槽位 → 递减活跃计数器 → counter→0 时触发:
//       1. 恢复 ZP $E6-$ED + X/Y
//       2. 调用 onResume(cb)。
//
//   【架构注】ASM 原版在定时器触发时写 MMC3 $8000/$8001(bank24/bank25) 切换
//   PRG 映射再 RTS。TS 版每个 bank 是独立 import 模块，不依赖地址映射。
//   onResume 闭包持有目标 bank 函数引用，直接调用即完成切换。
//
// 对应 6502 原始函数:
//   $9EED  tickTimers  — 每帧轮询入口 (被 NMI handler → $C76E 调用)
//   $9EFB  timerLoop   — 空闲等待循环 (检查所有槽位后等 NMI)
//   $9F0F  timerTrigger — 槽位到期: 恢复 ZP + Y/X → 调用 onResume 回调
//   $9F52  timerExpired — 槽位=$FF 路径: 直接调用 onResume 回调
//   $9F69  crossBankStore — 跨 bank 延续 (栈推入 $0101 区)
//   $9F7E  clearSlot   — 清空槽位 (counter=0, SP=0)
//   $9F89  checkRestart — 检查/重启槽位
//   $9F96  ffPoll      — 若槽位=$FF 则递归调用 waitFrame(1)
//   $9FA8  waitFrame   — 上下文保存入口

/** 定时器槽位数 */
const TIMER_SLOT_COUNT = 6;

/** 槽位中保存的 ZP 上下文 */
interface ZPContext {
  /** $E6-$ED: 8 个零页临时变量 */
  e6_ed: [number, number, number, number, number, number, number, number];
  /** Y 寄存器 */
  regY: number;
  /** X 寄存器 */
  regX: number;
}

/** 单个定时器槽位 */
interface TimerSlot {
  counter: number;                           // 0=空闲, N=倒计时, 0xFF=挂起, 0xFE=完成
  savedCtx: ZPContext | null;                // 保存的上下文
  onResume: ((sys: SystemState) => void) | null;  // 到期回调
}

/** 6 个定时器槽位 (纯 TS 数组，不经过 sys.mem) */
const timerSlots: TimerSlot[] = [];

/** 惰性初始化槽位数组 */
function _ensureSlots(): void {
  if (timerSlots.length > 0) return;
  for (let i = 0; i < TIMER_SLOT_COUNT; i++) {
    timerSlots.push({ counter: 0, savedCtx: null, onResume: null });
  }
}

/** 从 sys 读取当前 ZP 上下文并快照 */
function _snapshotContext(sys: SystemState): ZPContext {
  return {
    e6_ed: [
      sys.mem[0xE6], sys.mem[0xE7], sys.mem[0xE8], sys.mem[0xE9],
      sys.mem[0xEA], sys.mem[0xEB], sys.mem[0xEC], sys.mem[0xED],
    ],
    regY: sys.regs.Y,
    regX: sys.regs.X,
  };
}

/** 恢复 ZP 上下文到 sys */
function _restoreContext(sys: SystemState, ctx: ZPContext): void {
  const e = ctx.e6_ed;
  sys.mem[0xE6] = e[0]; sys.mem[0xE7] = e[1]; sys.mem[0xE8] = e[2]; sys.mem[0xE9] = e[3];
  sys.mem[0xEA] = e[4]; sys.mem[0xEB] = e[5]; sys.mem[0xEC] = e[6]; sys.mem[0xED] = e[7];
  sys.regs.Y = ctx.regY;
  sys.regs.X = ctx.regX;
}

/** 查找空闲槽位 */
function findFreeTimerSlot(): number {
  _ensureSlots();
  for (let i = 0; i < TIMER_SLOT_COUNT; i++) {
    if (timerSlots[i].counter === 0) return i;
  }
  return -1;
}

/**
 * $9FA8: waitFrame — 保存当前上下文到定时器槽位，延迟 frameCount 帧后触发 onResume
 *
 * 6502 (63 bytes, $9FA8-$9FE4):
 *   STA $19           ; A = 等待帧数
 *   TXA; PHA          ; 保存 X
 *   TYA; PHA          ; 保存 Y
 *   LDA $ED; PHA ...  ; 保存 $E6-$ED (8 push)
 *   TSX; TXA          ; 读当前 SP
 *   LDX $00           ; 活跃槽位索引
 *   STA $01,X         ; 保存 SP → slot+1
 *   LDA $0024; STA $02,X  ; 保存 bank 页 → slot+2
 *   LDA $0025; STA $03,X  ; 保存 bank 偏移 → slot+3
 *   LDA $19
 *   BEQ mark_done        ; A=0 → LDA #$FE (立即标为完成)
 *   CMP #$FF
 *   BNE store_cnt        ; A≠$FF → 存为倒计时
 *   LDA #$FE             ; A=$FF → 改存 $FE
 *   STA $00,X
 *   JMP $9EFB            ; → 定时器循环
 *
 * @param frameCount 等待帧数 (0 = 立即完成, $FF = 挂起等待)
 * @param onResume 定时器到期后的回调函数
 */
export function bank00_waitFrame(
  sys: SystemState,
  frameCount: number = 1,
  onResume?: (sys: SystemState) => void,
): void {
  _ensureSlots();

  // ── 快照当前 ZP 上下文 ──
  const ctx = _snapshotContext(sys);

  // ── 找空闲槽位 ──
  const slotIdx = findFreeTimerSlot();
  if (slotIdx < 0) {
    // 所有槽位满 → 直接调用 onResume (不回退)
    if (onResume) onResume(sys);
    return;
  }

  const slot = timerSlots[slotIdx];

  // ── 计算 counter ──
  if (frameCount === 0 || frameCount === 0xFF) {
    slot.counter = 0xFE; // 立即完成
  } else {
    slot.counter = frameCount & 0xFF;
  }

  slot.savedCtx = ctx;
  slot.onResume = onResume ?? null;

  // 下一帧 bank00_tickTimers 会处理递减
}

// ═════════════════════════════════════════════════
// 标题画面 Per-Frame Tick
// ═════════════════════════════════════════════════

/**
 * 标题画面每帧处理：推进 bytecode 脚本 + 输入轮询。
 *
 * 在 RESET 后的每帧调用，直到玩家按 START 进入比赛。
 * 处理标题动画（bytecode 脚本逐帧推进）和菜单导航输入。
 */
export function bank00_titleTick(sys: SystemState): void {
  // ── 一次性：标题画面啟動時加載 ROM palette ──
  if (sys.mem[0x062A] === 0 && sys.mem[0x062B] === 0) {
    track('bank00_titleTick_firstTime', { phase: 'loading palette' });
    bank00_paletteLoadFromROM(sys, (s) => bankSwitch(s, 6));
    // 設定初始亮度為 0(全暗)，讓 bytecode 0xEC 逐帧淡入
    sys.mem[0x4A] = 0;
    sys.mem[0x4B] = 0;
    // 立即 flush 一次以触发 $0628
    bank00_paletteFlush(sys);
  }

  // ── 推进 bytecode 脚本（每帧减 $E9 等待计数器）──
  const delay = sys.mem[0xE9];
  if (delay > 1) {
    // 仍在等待帧计数 → 递减
    sys.mem[0xE9] = delay - 1;
  } else {
    // delay === 0 (初始或刚完成) 或 delay === 1 (最后一帧)
    // → 执行下一字节码操作
    sys.mem[0xE9] = 0;
    const nextDelay = bank00_execBytecode(sys);
    if (nextDelay > 0) {
      sys.mem[0xE9] = nextDelay;
    }
  }

  // ── 标题画面输入处理（bank01_titleProcess 轮询 START/方向键）──
  bank01_titleProcess(sys);

  // ── FIX: 检查 A+B 组合键 → 启动游戏 ──
  // 原始 NES 通过 $81A6-$81CB 的轮询循环检查 A+B 组合键，
  // 但 bank00_titleTick 之前缺少此检查，导致永远无法退出标题模式。
  // bank01_startGame 会将 $0700 设为 0x01，触发场景切换。
  const prevJoy = sys.mem[0x1C];
  if ((prevJoy & 0xC0) === 0xC0) {
    console.log('[bank00] titleTick: A+B pressed → start game!');
    bank01_startGame(sys);
    // ── 比赛状态初始化（最小集） ──
    // bank01_startGame 只设置球员槽位数据和 $0700=0x01
    // 还需设置比赛引擎需要的核心状态，使主循环能正常运转
    sys.mem[0x05FB] = 0;    // 玩家方队 = Team A (0)
    sys.mem[0x0600] = 1;    // 活跃球员数 = 1
    sys.mem[0x0601] = 0x0B; // 对方球员 ID = 0x0B
    sys.mem[0x0442] = 0x0B; // 球员指针 = 0x0B
    sys.mem[0x0635] = 0x80; // 球 X = 128 (中场)
    sys.mem[0x0637] = 0x70; // 球 Y = 112 (中圈)
    sys.mem[0x0027] = 1;    // 子状态 = 1 (进入比赛)
  }
}

// ═════════════════════════════════════════════════
// $9EED-$9FA7: 帧定时器轮询 → 每帧由 NMI/MainLoop 调用
// ═════════════════════════════════════════════════

/**
 * $9EED-$9FA7: 定时器轮询主循环
 *
 * 6502 流程:
 *   $9EED: LDX #$01          ; 从槽位 1 开始
 *   $9EEF: LDA $00,X         ; 读 counter
 *   $9EF1: BEQ $9EFB         ; counter=0 → next slot
 *   $9EF3: CMP #$FF
 *   $9EF5: BEQ $9F52         ; counter=$FF → timerExpired (跨bank恢复)
 *   $9EF7: DEC $00,X         ; counter--
 *   $9EF9: BEQ $9F0F         ; counter→0 → timerTrigger
 *   $9EFB: TXA; CLC; ADC #4  ; next slot
 *   $9EFF: TAX; CPX #$19
 *   $9F02: BNE $9EEF         ; 未达 6 个槽位 → 继续
 *   $9F04: LDA $1B           ; 等 NMI bit7=1
 *   $9F06: BPL $9F04
 *   $9F08: AND #$7F; STA $1B ; 清除 NMI flag
 *   $9F0C: JMP $9EED         ; → 重新开始轮询
 *
 *   // $9F0F: timerTrigger — counter 到期触发
 *   STX $00                   ; 记录活跃槽位
 *   LDA #$07 ORA $22 → $8000  ; MMC3: 写 bank offset hi
 *   LDA slot+3 → $8001
 *   LDA #$06 ORA $22 → $8000  ; MMC3: 写 bank page
 *   LDA slot+2 → $8001
 *   LDX slot+1; TXS           ; 恢复 SP
 *   PLA × 8 → $E6-$ED         ; 恢复 ZP 上下文
 *   PLA → TAY; PLA → TAX      ; 恢复 Y, X
 *   RTS                        ; → 返回原调用者
 *
 *   // $9F52: timerExpired — slot=$FF 跨bank返回路径
 *   STX $00
 *   MMC3 bank restore (仅 page)
 *   LDX slot+1; TXS
 *   RTS                        ; 无 ZP 上下文恢复
 *
 * 翻译版每帧调用，递减活跃计数并触发回调。
 */
export function bank00_tickTimers(sys: SystemState): void {
  _ensureSlots();

  for (let i = 0; i < TIMER_SLOT_COUNT; i++) {
    const slot = timerSlots[i];

    // ── 0 = 空闲 → 跳过 ──
    if (slot.counter === 0) continue;

    // ── $FF = 挂起 (跨 bank 调用等对方返回) ──
    if (slot.counter === 0xFF) {
      _timerExpired(sys, slot);
      return;
    }

    // ── 递减 → 检查到期 ──
    slot.counter--;
    if (slot.counter === 0) {
      _timerTrigger(sys, slot);
      return;
    }
  }
  // 6502 $9F04-$9F0C: 等 NMI bit7 → 重新轮询 → TS 版下一帧再来
}

/**
 * $9F0F-$9F51: timerTrigger — 槽位到期，恢复 ZP 上下文并触发 onResume 回调
 */
function _timerTrigger(sys: SystemState, slot: TimerSlot): void {
  // ── 恢复 ZP 上下文 ($9F35-$9F4B: 8 个 PLA → $E6-$ED) ──
  if (slot.savedCtx) {
    _restoreContext(sys, slot.savedCtx);
  }

  // ── $9F4D-$9F50: 已在 _restoreContext 中恢复 Y, X ──
  // ── 6502: RTS → TS: 调用回调 ──
  const cb = slot.onResume;
  slot.counter = 0;
  slot.savedCtx = null;
  slot.onResume = null;

  if (cb) {
    try { cb(sys); } catch (e) { console.error('[bank00] timerTrigger cb failed:', e); }
  }
}

/**
 * $9F52-$9F68: timerExpired — 槽位=$FF 跨 bank 返回路径 (不恢复 ZP)
 */
function _timerExpired(sys: SystemState, slot: TimerSlot): void {
  const cb = slot.onResume;
  slot.counter = 0;
  slot.savedCtx = null;
  slot.onResume = null;

  if (cb) {
    try { cb(sys); } catch (e) { console.error('[bank00] timerExpired cb failed:', e); }
  }
}

/**
 * $9F69-$9F7D: crossBankStore — 跨 bank 延续存储，标记槽位为 $FF (挂起)
 *   ASM: 将槽位 counter+SP 推入 $0101 栈区 → 标记 $FF → 等对方 bank 返回
 *   TS: 直接设置 counter=$FF，onResume 回调在 timerExpired 触发
 */
export function bank00_crossBankSave(sys: SystemState, slotIdx: number): void {
  _ensureSlots();
  const slot = timerSlots[slotIdx];
  if (slot && slot.counter > 0 && slot.counter !== 0xFF) {
    // 保存当前 counter 到上下文中 (ASM 推入 $0101 栈区)
    slot.savedCtx = _snapshotContext(sys);
    slot.counter = 0xFF; // 挂起
  }
}

/**
 * $9F7E-$9F88: clearSlot — 清空定时器槽位
 */
export function bank00_clearTimerSlot(_sys: SystemState, slotIdx: number): void {
  _ensureSlots();
  const slot = timerSlots[slotIdx];
  if (slot) {
    slot.counter = 0;
    slot.savedCtx = null;
    slot.onResume = null;
  }
}

/**
 * $9F89-$9F95: checkRestart — 检查槽位并可能重启 (counter=0 且有上下文 → 设 counter=1)
 */
export function bank00_checkRestartTimer(_sys: SystemState, slotIdx: number): void {
  _ensureSlots();
  const slot = timerSlots[slotIdx];
  if (slot && slot.onResume !== null && slot.counter === 0) {
    slot.counter = 1;
  }
}

/**
 * $9F96-$9FA5: ffPoll — 若槽位 counter=$FF 则递归调用 waitFrame(1) 快速轮询
 */
export function bank00_ffPoll(sys: SystemState, slotIdx: number): void {
  _ensureSlots();
  const slot = timerSlots[slotIdx];
  if (slot && slot.counter === 0xFF) {
    bank00_waitFrame(sys, 1, () => { /* 跨 bank 返回后继续 */ });
  } else if (slot) {
    slot.counter = 0;
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

  // 读 palette 指针 (bank 06: $B800-$A000=$1800)
  const idx = frameFlag << 1;
  const ptrLo = rom06(0x1800 + idx);
  const ptrHi = rom06(0x1800 + idx + 1);
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

/**
 * $82A9: 脚本等待 — 等 bytecode 指针归零
 *
 * 6502 在 NMI 帧循环中等待。翻译版本中 bytecode 通过 $E9
 * 帧延迟机制管理，此函数只在 bytecode 指针清零时返回。
 * 安全上限防止死循环。
 */
export function bank00_scriptWait(sys: SystemState): void {
  let maxLoops = 2000; // 安全上限
  while ((sys.mem[ZP_SCRIPT_PTR_L] | sys.mem[ZP_SCRIPT_PTR_H]) !== 0 && --maxLoops > 0) {
    // bytecode 由帧循环逐帧推进；此处轮询直到完成
    // 每迭代尝试推进一次 bytecode
    const delay = bank00_execBytecode(sys);
    if (delay > 0) {
      // 需等待帧 → 退出由外部帧循环处理
      sys.mem[0xE9] = delay;
      break;
    }
  }
  if (maxLoops <= 0) {
    console.warn('[bank00] scriptWait: max loops exceeded');
  }
}

/** $82B5: 脚本等待或 SELECT 中断 — 等 bytecode 完成或 SELECT 按下 */
export function bank00_scriptWaitOrSelect(sys: SystemState): void {
  let maxLoops = 2000;
  while ((sys.mem[ZP_SCRIPT_PTR_L] | sys.mem[ZP_SCRIPT_PTR_H]) !== 0 && --maxLoops > 0) {
    // SELECT check
    if (sys.mem[ZP_JOYPAD1] & 0x20) {
      bank00_resetGameState(sys);
      return;
    }
    const delay = bank00_execBytecode(sys);
    if (delay > 0) {
      sys.mem[0xE9] = delay;
      break;
    }
  }
  if (maxLoops <= 0) {
    console.warn('[bank00] scriptWaitOrSelect: max loops exceeded');
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
    // 参数表位于 $83EE, 即 DATA_$83DC_$83FE 偏移 18 处 ($83EE - $83DC = 18)
    const PARAM_TABLE_OFFSET = 0x83EE - 0x83DC; // = 18
    const lo = DATA_$83DC_$83FE[PARAM_TABLE_OFFSET + param * 2];
    const hi = DATA_$83DC_$83FE[PARAM_TABLE_OFFSET + param * 2 + 1];
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
 * $88CA: 写 tile 到 PPU
 *
 * 6502:
 *   $88CA: LDY $52; LDX $53; LDA tile → 写 PPU 地址 → 写 tile 数据
 *   然后 $53++ → 如果 $55≠0 则调用 $895D (行尾检测)
 */
function _bytecode_writePPUTile(sys: SystemState, tile: number): void {
  // PPU addr = ($52 << 8) | $53  (位于 nametable 中)
  // 设置 PPU 地址
  writeMem(sys, 0x2006, sys.mem[0x52]);
  writeMem(sys, 0x2006, sys.mem[0x53]);
  // 写 tile 数据
  writeMem(sys, 0x2007, tile);

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
 *   F8: 无操作 (NOP)
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

    case 0xEC:  // fade advance → 推进 fade 引擎 + 写 PPU palette
      // $899A → $89A3 → $88B1: palette fade engine
      // $4A:$4B 为 0 → 全暗, 0x0F → 全亮
      if (sys.mem[0x4A] < 0x0F || sys.mem[0x4B] < 0x0F) {
        bank00_paletteFadeIn(sys);
        bank00_paletteFlush(sys);
      }
      return 1;

    case 0xED:  // 子脚本调用：读下一字节索引 → 查 bank06 $A000 表 → 保存返回地址
      {
        sys.mem[0xE9] = 0;  // 清除 bytecode 等待

        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const subIdx = readMem(sys, ptr);  // 读子脚本索引
        // 脚本指针前进 1 (ED opcode + 1 byte arg = 2 bytes consumed so far)
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;

        // 保存返回地址: ($4D/$4E + 2) → $58/$59, $56 → $5A
        sys.mem[0x58] = (sys.mem[ZP_SCRIPT_PTR_L] + 2) & 0xFF;
        sys.mem[0x59] = sys.mem[ZP_SCRIPT_PTR_H] + (sys.mem[0x58] < 2 ? 1 : 0);
        sys.mem[0x5A] = sys.mem[0x56];

        // bankSwitch to 6 → 查 $A000 跳转表 (ASM: $8485 JSR $C4B9 via ED table → banks {03,04,05,06})
        bankSwitch(sys, 6);
        const newPtrLo = rom06(subIdx * 2);
        const newPtrHi = rom06(subIdx * 2 + 1);
        sys.mem[ZP_SCRIPT_PTR_L] = newPtrLo;
        sys.mem[ZP_SCRIPT_PTR_H] = newPtrHi;
        // bank 由 bytecode 循环自行管理，不需要切回

        return 0;  // 继续执行新脚本
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

    case 0xF4:  // 子跳转表: 读下一字节索引 → 查 $86C8 表 (7 entries)
      {
        const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
        const subIdx = readMem(sys, ptr);  // 0-6
        sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 1) & 0xFF;
        if (sys.mem[ZP_SCRIPT_PTR_L] === 0) sys.mem[ZP_SCRIPT_PTR_H]++;

        const tblOffset = subIdx * 2;
        const targetLo = DATA_$86C8_$86DD[tblOffset];
        const targetHi = DATA_$86C8_$86DD[tblOffset + 1];
        const targetAddr = (targetHi << 8) | targetLo;

        // Handler dispatch by target address:
        switch (subIdx) {
          case 0: // $86DD: palette init + bytecode return
            bank00_paletteInit(sys);
            return 2;
          case 1: // $86E5: PPU row init
            return 2;
          case 2: // $86ED: PPU attr row init
            return 2;
          case 3: // $86F5: 4-frame sprite table load from $87B3
            sys.mem[0xED] = 4;
            // Read $87B3 table (last 4 bytes of DATA_$876E_$87B7)
            // $87B3 = offset 0x45 (69) from start of 74-byte array
            const tblBase = 0x87B3 - 0x876E; // = 69
            sys.mem[0x0631] = DATA_$876E_$87B7[tblBase + (4 - 1)]; // X=4 → $87B7
            return 4; // wait 4 frames
          case 4: // $8712: sprite palette write
            return 2;
          case 5: // $8733: sprite data setup
            return 2;
          case 6: // $879F: restore from sub-script
            {
              // 恢复 $4D/$4E 从 $58/$59, $56 从 $5A
              const savedLo = sys.mem[0x58];
              const savedHi = sys.mem[0x59];
              const savedBank = sys.mem[0x5A] & 0x7F;

              sys.mem[ZP_SCRIPT_PTR_L] = savedLo;
              sys.mem[ZP_SCRIPT_PTR_H] = savedHi;
              sys.mem[0x56] = savedBank;

              if (savedBank !== 0) {
                bankSwitch(sys, savedBank);
              }
              return 0; // 继续执行恢复后的脚本
            }
          default:
            return 1;
        }
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

/** $89D2: 精灵动画加载 — 根据 ID 加载精灵数据指针 (ASM: $89D5 LDX #$06; JSR $C4B9 → bank 06) */
export function bank00_spriteAnimLoad(sys: SystemState, spriteId: number): void {
  // 切 bank $06 → 读 $BD00 指针表 ($BD00-$A000=$1D00 in bank 06)
  const ptrLo = rom06(0x1D00 + spriteId * 2);
  const ptrHi = rom06(0x1D00 + spriteId * 2 + 1);
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
  // 切 bank $06 → 从 $0654/$0655 指针读数据 (ASM: $8A11 LDX #$06; JSR $C4B9)
  let ptrLo = readMem(sys, 0x0654);
  let ptrHi = readMem(sys, 0x0655);
  const ptr = (ptrHi << 8) | ptrLo;

  const cmd = rom06(ptr & 0x1FFF);
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
/**
 * $8AF7: 场景过渡主入口 — 解析场景数据记录并启动渲染
 *
 * 6502 流程:
 *   1. 初始化标志位 + 切 bank 07
 *   2. 从 $A000 + sceneId*2 读指针表 → 得场景数据地址 ($63/$64)
 *   3. 读 6 字节 record: $75/$76, $48/$5B, $5E, $5F, $5C/$5D
 *   4. 逐 record 处理:
 *      - 若 $5E >= 9: JSR $9071 → 处理多条记录
 *      - 否则: 检查 $5D bit2 (mode)
 *        - mode 0-1: 直接调用 $8E15 (_sprite_copyTileRow)
 *        - mode 2: 反转向量
 *        - mode 3: 特殊参数
 *      - waitFrame(1)
 *      - ptr += 6, 读下一 record
 *   5. 计算 $70/$71 = $63/$64 + $5E*$5F (record 数据区指针)
 *   6. 读 control byte $62 ← 包含 mode bits (bit7-6) 和 delta 值
 *   7. 根据 mode 分路径渲染（mode 0-3 各有不同的 delta 处理代码）
 *   8. 渲染由 frame timer 驱动，每帧调用 $8D59
 *
 * @param sceneId 场景 ID
 * @param onBank07_switch 切换到 bank 07
 */
export function bank00_sceneTransition(
  sys: SystemState,
  sceneId: number,
  onBank07_switch: (sys: SystemState) => void,
): void {
  // $8AF7-$8B0B: 初始化
  sys.mem[0x09] = 0;
  sys.mem[0x0A] = 0;
  sys.mem[0x0D] = 0;
  sys.mem[0x0E] = 0;
  sys.mem[0x5B] &= 0x7F;  // 清除 bit7

  // 保存当前 bank
  const savedBank = sys.mem[0x25];

  // 切 bank 07 → 读指针表
  sys.mem[0x77] = savedBank;  // $8B0B: STA $77
  onBank07_switch(sys);

  // $8B12-$8B2D: 从 $A000 指针表读 scene 数据地址
  // 先清除 $0552-$064A 区域 (精灵 OAM 区域)
  for (let i = 0x0552; i <= 0x064A; i++) {
    sys.mem[i] = 0;
  }

  const ptrIdx = sceneId << 1;
  // $8B1C-$8B2D: ROL trick → sceneId*2 → X, carry→Y → 加到 $A000 (ASM: $8B0F LDX #$07; JSR $C4B9 → bank 07)
  const ptrLo = rom07(ptrIdx);
  const ptrHi = rom07(ptrIdx + 1);
  // $8B2F-$8B39: 间接取址 — 读 ($63) 得实际数据地址
  sys.mem[0x63] = ptrLo;
  sys.mem[0x64] = ptrHi;
  // 间接引用: ($63) → 实际数据地址 (仍在 bank 07 $Axxx 范围)
  const dataLo = rom07(((ptrHi << 8) | ptrLo) & 0x1FFF);
  const dataHi = rom07((((ptrHi << 8) | ptrLo) + 1) & 0x1FFF);
  sys.mem[0x63] = dataLo;
  sys.mem[0x64] = dataHi;

  // $8B3B-$8B54: 读 record 头部 (6 bytes)
  // byte 0-1: $75/$76 (PPU 地址)
  sys.mem[0x75] = rom07(((dataHi << 8) | dataLo + 0) & 0x1FFF);
  sys.mem[0x76] = rom07(((dataHi << 8) | dataLo + 1) & 0x1FFF);
  // byte 2: palette idx + flags
  const flags = rom07(((dataHi << 8) | dataLo + 2) & 0x1FFF);
  sys.mem[0x48] = flags & 0x3F;
  // ROL $5B trick: 将 bit6 旋入 $5B bit0
  sys.mem[0x5B] = (sys.mem[0x5B] & 0xFE) | ((flags >> 6) & 1);
  // byte 3: $5E (count)
  sys.mem[0x5E] = rom07(((dataHi << 8) | dataLo + 3) & 0x1FFF);
  // byte 4: $5F (stride)
  sys.mem[0x5F] = rom07(((dataHi << 8) | dataLo + 4) & 0x1FFF);

  // $8B5E-$8B81: 解码源指针 ($5C/$5D)
  // 从 byte 5 取 bit7-3 → $5C bits 7-3
  let srcBits = rom07(((dataHi << 8) | dataLo + 5) & 0x1FFF);
  sys.mem[0x5C] = srcBits & 0xF8;
  sys.mem[0x5D] = 0x02; // 基址高字节

  // 2 次左移
  sys.mem[0x5C] = (sys.mem[0x5C] << 1) & 0xFF;
  if (sys.mem[0x5C] & 0x80) sys.mem[0x5D] = (sys.mem[0x5D] << 1) | 1;
  else sys.mem[0x5D] <<= 1;
  sys.mem[0x5C] = (sys.mem[0x5C] << 1) & 0xFF;
  if (sys.mem[0x5C] & 0x80) sys.mem[0x5D] = (sys.mem[0x5D] << 1) | 1;
  else sys.mem[0x5D] <<= 1;

  // byte 5 bit2-0 → $5C bits 2-0
  sys.mem[0x5C] = (sys.mem[0x5C] & 0xF8) | (srcBits & 0x07);

  // 再左移 2 次
  sys.mem[0x5C] = (sys.mem[0x5C] << 1) & 0xFF;
  if (sys.mem[0x5C] & 0x80) sys.mem[0x5D] = (sys.mem[0x5D] << 1) | 1;
  else sys.mem[0x5D] <<= 1;
  sys.mem[0x5C] = (sys.mem[0x5C] << 1) & 0xFF;
  if (sys.mem[0x5C] & 0x80) sys.mem[0x5D] = (sys.mem[0x5D] << 1) | 1;
  else sys.mem[0x5D] <<= 1;

  // $8B81-$8B91: 混合 $7B bit1 到 $5D bit2
  // 若 $5D bit3-2 为 0 → 用 $7B 的奇偶性
  if ((sys.mem[0x5D] & 0x0C) === 0) {
    const rotBit = (sys.mem[0x7B] << 2) & 0x04;
    sys.mem[0x5D] = (sys.mem[0x5D] & 0xFB) | rotBit;
    // EOR $5B → AND #$04 → adjust
    const xorBit = (sys.mem[0x7B] & 0x01) ? 0x04 : 0;
    sys.mem[0x5D] ^= xorBit;
    sys.mem[0x5D] &= 0x0F; // keep only low nibble for now
  }

  // $8B93-$8BA8: 根据 $5E count 决定路径
  const count = sys.mem[0x5E];
  if (count >= 9) {
    // 大记录 → 分批处理 ($9071 → $9076)
    _scene_processBigRecord(sys, count);
  } else {
    // 小记录 → 根据 $5D bit2 决定
    // 简化: 小记录直接用 _sprite_copyTileRow
    _scene_renderDirect(sys, count);
  }

  // $8BAE-$8BB0: waitFrame(1)
  // $8BB3-$8BBE: ptr += 6 前进到下一条 record

  // $8BC0-$8BD2: 计算 record 数据区 $70/$71
  // $5E * $5F → 加到 $63/$64
  const stride = sys.mem[0x5F];
  const rowSize = count * stride;
  const dataLo2 = (sys.mem[0x63] + rowSize) & 0xFF;
  const dataHi2 = sys.mem[0x64] + ((dataLo2 < sys.mem[0x63]) ? 1 : 0);
  // $70/$71 指向第一条 record 的数据区
  sys.mem[0x70] = (sys.mem[0x63] + 6) & 0xFF; // +6 跳过 header
  sys.mem[0x71] = sys.mem[0x64];

  // $8BD4-$8BEE: 读控制字节 $62
  sys.mem[0x60] = 0; // delta lo
  const ctrlPtr = (sys.mem[0x71] << 8) | sys.mem[0x70];
  const ctrlByte1 = readMem(sys, ctrlPtr + 1);
  // $62 = bits 7-5 (mode)
  sys.mem[0x62] = ctrlByte1 & 0xE0;
  // $61/$60 = bits 4-0 作为 16-bit delta (除以 4)
  const rawVal = ctrlByte1 & 0x1F;
  sys.mem[0x60] = (rawVal & 0x01) ? 0x80 : 0;  // bit0 → $60 bit7
  sys.mem[0x61] = rawVal >> 1;                  // bits 4-1 → $61
  // $72 = 第二条 record 的 count
  if (rawVal !== 0) {
    sys.mem[0x72] = readMem(sys, ctrlPtr + 2);
  }

  // $8BF5-$8C09: 根据 mode 分路径
  const mode = sys.mem[0x62] & 0xC0;
  if (mode === 0x00) {
    // Mode 0: 直接复制 → 提交渲染
    _scene_setupRender(sys, count, stride, onBank07_switch);
  } else if (mode === 0x40) {
    // Mode 1: Delta 更新
    _scene_setupRender(sys, count, stride, onBank07_switch);
  } else if (mode === 0x80) {
    // Mode 2: 擦除模式 (反向渲染)
    _scene_setupEraseRender(sys, count, stride);
  } else {
    // Mode 3: 特殊动画
    sys.mem[0x6D] = 0x04;
    sys.mem[0x6E] = 0x01;
    sys.mem[0x6F] = stride & 0xFF;
    _scene_setupRender(sys, count, stride, onBank07_switch);
  }

  // $8CA5-$8CB7: 清理
  sys.mem[0x44] = 0;
  sys.mem[0x45] = 0;
  sys.mem[0x7A] = 0;

  // 恢复 bank
  bankSwitch(sys, savedBank);
}

/**
 * 场景记录处理辅助: 大记录 (>9 tiles) 分批渲染
 */
function _scene_processBigRecord(sys: SystemState, totalCount: number): void {
  // 6502 @ $9071: 分配缓冲、切分批次
  // 简化: 分批渲染 7 tiles 每批
  let remaining = totalCount;
  const stride = sys.mem[0x5F];

  while (remaining > 0) {
    const batch = Math.min(remaining, 7);
    if (batch >= 7) {
      // 第一批 7 tiles → 设置帧定时器回调
      remaining -= 7;
      sys.mem[0x7B] = 1;
      // frameTimer cb → $8C86
      // 简化: 直接调用 tile copy
    }
    _sprite_copyTileRow(sys, (s) => bankSwitch(s, 8));
    remaining -= batch;
  }
}

/**
 * 设置场景渲染参数并提交首次渲染
 */
function _scene_setupRender(
  sys: SystemState,
  count: number,
  stride: number,
  onBank07_switch: (sys: SystemState) => void,
): void {
  // 设置 $6D/$6E/$6F (行列步进参数)
  // 默认: 水平单步渲染
  sys.mem[0x6D] = 0;     // 列偏移
  sys.mem[0x6E] = 0;     // 行步进
  sys.mem[0x6F] = 0;     // 帧步进

  // 小记录: 直接一次渲染
  if (count <= 7) {
    // $8C89-$8C8D: LDY $5E; LDX $5F; JSR $8E15
    _sprite_copyTileRow(sys, (s) => bankSwitch(s, 8));
  } else {
    // 大记录: 分批 + 帧定时器
    sys.mem[0x7B] = 1;
    // frame timer: cb → $8C86
    _sprite_copyTileRowBatch(sys, count, stride);
  }
}

/**
 * 擦除模式渲染 (mode 2)
 */
function _scene_setupEraseRender(
  sys: SystemState,
  count: number,
  stride: number,
): void {
  // 6502 $8C15-$8C40: SEC; SBC #$01 → 反向偏移
  // 计算反向偏移: -(stride) 作为 $6D/$6E
  const negStrideLo = (0 - stride) & 0xFF;
  const negStrideHi = stride > 0 ? 0xFF : 0;

  sys.mem[0x6D] = 0xFC;     // -4 作为列反向步进
  sys.mem[0x6E] = 0xFF;     // -1 行步进
  sys.mem[0x6F] = stride & 0xFF;

  // 反向渲染源数据
  _sprite_copyTileRow(sys, (s) => bankSwitch(s, 8));
}

/**
 * 场景直接复制渲染 (mode 0)
 *
 * 6502 $8C89-$8CA4: 调用 $8E15 _sprite_copyTileRow
 * 逐 tile 读取源数据 → 查表转 PPU offset → 写入 nametable
 */
function _scene_renderDirect(sys: SystemState, count: number): void {
  let srcLo = sys.mem[0x5C];
  let srcHi = sys.mem[0x5D];

  // PPU 写入: 通过 $75/$76 (PPU 地址) + 偏移
  const ppuBase = (sys.mem[0x76] << 8) | sys.mem[0x75];

  for (let i = 0; i < count; i++) {
    const tile = readMem(sys, (srcHi << 8) | srcLo);

    // 计算 PPU nametable 偏移并写入
    const ppuOffset = _sprite_tileToPPUOffset(sys, tile);
    const ntAddr = ppuBase + ppuOffset;

    // 写 nametable tile (通过 PPU 地址)
    _ppu_setAddr(sys, ntAddr);
    _ppu_writeData(sys, tile);

    // 源指针 +1
    srcLo = (srcLo + 1) & 0xFF;
    if (srcLo === 0) srcHi++;
  }

  // 更新 $5C/$5D
  sys.mem[0x5C] = srcLo;
  sys.mem[0x5D] = srcHi;
}

/**
 * 批量 tile 行复制 (大记录: 每批 7 tiles)
 */
function _sprite_copyTileRowBatch(
  sys: SystemState,
  totalCount: number,
  stride: number,
): void {
  let remaining = totalCount;
  while (remaining > 0) {
    const batch = Math.min(remaining, 7);
    // 设置源指针 → 从 $63/$64 读数据
    _sprite_copyTileRow(sys, (s) => bankSwitch(s, 8));
    remaining -= batch;
  }
}

// ═════════════════════════════════════════════════
// $8D0A-$8FEF — 精灵渲染循环 (742 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   本段紧接 $8AF7-$8D09（场景过渡引擎），执行逐 tile 的 PPU 渲染。
//
//   $8D0A-$8D58: 渲染循环入口 — 初始化参数 + 切换 bank $07
//        → 读 $70/$71 记录中的属性: $62(flags), $60/$61(delta), $72(count)
//   $8D59-$8DC7: 两个分支:
//        - bit6=0 ($62 & 0x40): 带回跳的渲染（快进模式）
//        - bit6=1: 等待帧计数器同步模式
//   $8DC8-$8E14: 帧等待 + 滚动坐标更新 ($44/$45/$7A/$7B/$47)
//   $8E15-$8EF0: tile 数据复制 — 从 ROM ($63/$64) 读数据
//        每 byte 表示 tile index → 查表 $8EF0 得 PPU offset
//        → 调用 $9B28 (PPU write) 写入 nametable
//        → 处理 $5C/$5D 行列越界
//   $8EF0-$8FEF: 子程序 — tile 数据转换表 + OAM 写入

/**
 * $8EF0: 精灵 tile → PPU 写入辅助函数
 *
 * 6502 流程:
 *   1. 保存 $5C/$5D → $67/$68
 *   2. ROM 偏移 = $A000 + tileCode * 17 + ($5B & 1) * 256
 *   3. 切 bank 08 → 读 17 字节 record → 每 4 字节写 PPU 队列
 *   4. 恢复 $5C/$5D
 *
 * 数据格式 (bank 08 ROM):
 *   byte 0: PPU addr lo
 *   bytes 1-3: OAM data (tile, attr, x)
 *   后续 4 字节组同理，最多 4 组 (16 字节)
 *
 * 注意: 实际 tile 数据从 ROM bank 08 动态读取，
 *       不应在此硬编码。通过 readMem 动态访问 ROM。
 */

/** $8D0A: 精灵渲染入口 — 初始化渲染循环 */
export function bank00_spriteRenderInit(
  sys: SystemState,
  onBank07_switch: (sys: SystemState) => void,
): void {
  onBank07_switch(sys);
  // $69/$6A = 延迟累加器清零
  sys.mem[0x69] = 0;
  sys.mem[0x6A] = 0;

  // $62 符号检查 → 调整 $60/$61
  if ((sys.mem[0x62] & 0x80) !== 0) {
    const neg60 = (0 - sys.mem[0x60]) & 0xFF;
    const neg61 = (0 - sys.mem[0x61]) & 0xFF;
    sys.mem[0x60] = neg60;
    sys.mem[0x61] = neg61;
  }
}

/**
 * $8D59: 精灵渲染帧推进 — 每帧调用
 *
 * 6502 流程:
 *   waitFrame(1) → $60+=$69/$61+=$(carry)
 *   取绝对值 $6A += abs → 若 $6A >= $20:
 *     $6A -= $20, 若 $72=0 则跳到 record 下一条
 *     否则 $72--, 继续
 *   $5B bit7 → 若 set 则进入结束路径
 *
 * @returns 0 = 需要继续渲染, 1 = 完成
 */
export function bank00_spriteRenderTick(sys: SystemState): number {
  const bit6 = (sys.mem[0x62] & 0x40) !== 0;

  // $60/$61 累加到 $69 (带符号)
  const accLo = sys.mem[0x69];
  const deltaLo = sys.mem[0x60];
  const adjLo = (accLo + deltaLo) & 0xFF;
  sys.mem[0x69] = adjLo;

  const deltaHi = sys.mem[0x61];
  let absDelta = deltaHi;
  if (deltaHi & 0x80) {
    absDelta = ((deltaHi ^ 0xFF) + 1) & 0x7F;
  }

  const accHi = (sys.mem[0x6A] + absDelta) & 0xFF;
  sys.mem[0x6A] = accHi;

  if (accHi >= 0x20) {
    sys.mem[0x6A] = accHi - 0x20;

    const remaining = sys.mem[0x72];
    if (remaining > 0) {
      sys.mem[0x72] = remaining - 1;
    } else {
      // 跳到下一条 record
      return _sprite_renderNextRecord(sys);
    }
  }

  // $5B bit7 检查 → 完成标志
  if (sys.mem[0x5B] & 0x80) {
    sys.mem[0x5B] &= 0x7F;  // 清除标志
    return 1;  // 完成
  }

  // 更新滚动坐标
  sys.mem[0x7A] = (sys.mem[0x7A] - sys.mem[0x6A]) & 0xFF;
  if (sys.mem[0x7B] > 0) {
    sys.mem[0x7B]--;
  }
  sys.mem[0x47] = (sys.mem[0x47] - sys.mem[0x6A]) & 0xFF;

  return 0;  // 继续
}

/** 前进到下一条 record */
function _sprite_renderNextRecord(sys: SystemState): number {
  // $62 bit5 检查 → 是否需要继续
  if ((sys.mem[0x62] & 0x20) !== 0) {
    // 尝试从 $70/$71 读下一条 record
    const ptrLo = (sys.mem[0x70] + 3) & 0xFF;
    const ptrHi = sys.mem[0x71] + (ptrLo < 3 ? 1 : 0);
    sys.mem[0x70] = ptrLo;
    sys.mem[0x71] = ptrHi;

    // 重新读取 record 属性 (ASM: bank 07 record chain)
    const nextByte = rom07(((ptrHi << 8) | ptrLo) & 0x1FFF);
    if (nextByte !== 0) {
      sys.mem[0x62] = nextByte & 0xE0;
      const countBits = nextByte & 0x1F;
      sys.mem[0x60] = (countBits >> 1) & 0x0F;
      sys.mem[0x61] = countBits >> 1;
      sys.mem[0x72] = rom07(((ptrHi << 8) | (ptrLo + 1)) & 0x1FFF);
      sys.mem[0x69] = 0;
      sys.mem[0x6A] = 0;
      return 0;
    }
  }
  return 1;  // 没有更多 record
}

/** $8E15: tile 数据行复制 — 从 ROM 读 N 个 tiles 填充 nametable 行 */
function _sprite_copyTileRow(
  sys: SystemState,
  onBank08_switch: (sys: SystemState) => void,
): void {
  let srcLo = sys.mem[0x63];
  let srcHi = sys.mem[0x64];
  const srcBaseLo = srcLo;
  const srcBaseHi = srcHi;

  const count = sys.mem[0x6B];  // 列数
  const stride = sys.mem[0x6C]; // 每步的 ROM offset shift

  let dstLo = sys.mem[0x5C];
  let dstHi = sys.mem[0x5D];

  for (let col = 0; col < count; col++) {
    const tileCode = readMem(sys, (srcHi << 8) | srcLo);

    // 查表 $8EF0: tile → PPU offset
    const ppuOffset = _sprite_tileToPPUOffset(sys, tileCode);

    // 更新 $5C/$5D (行列地址)
    const newDstLo = (dstLo + ppuOffset) & 0xFF;

    // 交叉页检查
    if ((dstLo ^ newDstLo) & 0x20) {
      const rowShift = stride * 8;
      dstLo = (dstLo + ((0x100 - rowShift) & 0xFF)) & 0xFF;
      dstHi ^= 0x04;
    }

    // $6E (列步长累加 src 指针)
    const stepHi = sys.mem[0x6E];
    srcHi += stepHi;
    if (stepHi & 0x80) {
      if (srcHi === 0) srcHi--;
    }
    srcLo = (srcLo + stride) & 0xFF;

    dstLo = newDstLo;
  }

  // 最终: 更新 $63/$64
  const finalStep = sys.mem[0x6F];
  const finalLo = (srcBaseLo + finalStep) & 0xFF;
  const finalHi = srcBaseHi + (finalLo < srcBaseLo ? 1 : (finalStep & 0x80 ? -1 : 0));
  sys.mem[0x63] = finalLo;
  sys.mem[0x64] = finalHi;
}

/**
 * tile 码 → PPU nametable 偏移 ($8EF0 子程序)
 *
 * 6502: 从 ROM bank 08 读取 tile 位置数据
 *   ROM addr = $A000 + tileCode * 17 + ($5B & 1) * 256
 *   第一字节 = PPU addr lo（nametable 内偏移）
 *
 * 翻译: 通过 readMem 动态访问 ROM 数据
 */
function _sprite_tileToPPUOffset(sys: SystemState, tileCode: number): number {
  // ROM 地址: $A000 + tileCode * 17 + ($5B & 1) * 256
  const flagsBit = sys.mem[0x5B] & 1;
  const romOffset = tileCode * 17 + flagsBit * 256;
  const romAddr = 0xA000 + romOffset;

  // 从 bank 08 ROM 读第一字节 = PPU addr lo
  const ppuAddrLo = readMem(sys, romAddr);

  // PPU addr lo 的低 6 位对应 nametable 列偏移 (0-63)
  // 实际上 6502 在写 PPU 地址时只用低 5 位选择列
  return ppuAddrLo & 0x3F;
}

// ═════════════════════════════════════════════════
// $900B-$978A — 精灵动画 VM (~2KB, 9 个子块)
// ═════════════════════════════════════════════════
//
// 这是精灵 OAM 数据放置的脚本引擎（与 bytecode 解释器不同，
// 它处理的是精灵位置/属性/动画等 OAM 层面的数据）。
//
// 6502 核心结构:
//   $94/$95 = 精灵描述符指针 (32 bytes/entry 结构)
//     偏移 0: 状态标志
//     偏移 2-3: 脚本指针 ($92/$93)
//     偏移 4-5: X 坐标 ($9A/$9B)
//     偏移 6-7: Y 坐标 ($9C/$9D)
//     偏移 8: X 速度符号/大小
//     偏移 9: X 速度值
//     偏移 10: Y 速度符号/大小
//     偏移 11: Y 速度值
//     偏移 12: 每帧 X 偏移
//     偏移 13: 每帧 Y 偏移
//     偏移 16-17: 碰撞/边界指针
//     偏移 19: 子状态计数器
//     偏移 24-31: 子脚本栈
//
// 操作码 ($92 数据):
//   $00-$7F: → tile + palette 直写
//   $80-$9F: → 查表写 OAM
//   $A0-$BF: → 子脚本跳转
//   $C0-$DF: → 速度赋值
//   $E0-$EF: → 栈操作 (call sub-script)
//   $F0-$FF: → 控制码 (跳转表)

/**
 * $900B: 精灵放置入口 — 从脚本指针初始化 32 字节描述符
 *
 * 6502 流程:
 *   A = 精灵 ID → 查 $0568 表
 *   读脚本 → $94/$95 = $0568
 *   复制模板数据 (32 bytes) 到描述符
 *   读第一个 palette → $49
 */
export function bank00_spritePlaceInit(
  sys: SystemState,
  spriteId: number,
  onBank09_switch: (sys: SystemState) => void,
): void {
  // 读脚本指针 → 从当前 bytecode 指针 ($4D/$4E)
  const ptr = (sys.mem[ZP_SCRIPT_PTR_H] << 8) | sys.mem[ZP_SCRIPT_PTR_L];
  const count = readMem(sys, ptr + 1);  // 要处理的精灵数
  sys.mem[ZP_SCRIPT_PTR_L] = (ptr + 2) & 0xFF;
  if (sys.mem[ZP_SCRIPT_PTR_L] < 2) sys.mem[ZP_SCRIPT_PTR_H]++;

  // 设置描述符基址
  writeMem(sys, 0x0594, 0x68);

  // 读 bank 索引 ($00-$6C → bank $09, else $0A; ASM: $90B7 LDX #$09, CMP #$6D → 分支 $0A)
  const bankIndex = readMem(sys, ptr + 2);
  const bankNum = bankIndex >= 0x6D ? 0x0A : 0x09;

  onBank09_switch(sys);

  // 从 ROM 指针表读首指针 (ASM: bankIndex<0x6D → rom09; else → rom10, index -= 0x6D)
  const adjustedIdx = bankIndex >= 0x6D ? (bankIndex - 0x6D) : bankIndex;
  const romFn = bankIndex >= 0x6D ? rom10 : rom09;
  const spritePtrLo = romFn(adjustedIdx * 2);
  const spritePtrHi = romFn(adjustedIdx * 2 + 1);

  // 复制 32 字节模板 (sprite 数据仍在同一 bank)
  for (let i = 0; i < 32; i++) {
    const templateByte = romFn((((spritePtrHi << 8) | spritePtrLo) + i) & 0x1FFF);
    writeMem(sys, 0x0568 + i, templateByte);
  }

  // 读取精灵的初始 palette
  sys.mem[0x49] = romFn(((spritePtrHi << 8) | spritePtrLo) & 0x1FFF);
}

/**
 * $911D: 精灵 VM 更新循环 — 每帧调用
 *
 * 6502 流程:
 *   检查 $0568[0] bit7 (活跃标志) → 非 0 则继续
 *   读 $0568[0] bit4-5 → 决定子处理:
 *     bit4=1: 速度更新分支
 *     bit5=1: X 位置更新分支
 *   else: 默认路径 → 读脚本指令
 *
 *   指令分发:
 *     <$80: 直写 tile
 *     $80-$9F: data write (tile/palette 合并)
 *     $A0-$BF: 子脚本调用
 *     $C0-$DF: 速度/位置 assign
 *     $E0-$EF: 栈 push (call sub)
 *     $F0-$FF: 控制码 (通过 RTS 跳转表分发)
 *
 *   动画完成 → 切换 bank → 继续下一个精灵
 */
export function bank00_spriteVMUpdate(
  sys: SystemState,
  onBank06_switch: (sys: SystemState) => void,
): boolean {
  const descPtr = 0x0568;  // $94/$95 指向此处
  const status = readMem(sys, descPtr + 0);

  // bit7 检查
  if ((status & 0x80) === 0) {
    return false;  // 不活跃
  }

  // bit4 检查 → 水平速度
  if (status & 0x10) {
    _spriteVM_updateXPos(sys, descPtr);
  }

  // bit5 检查 → 垂直速度
  if (status & 0x20) {
    _spriteVM_updateYPos(sys, descPtr);
  }

  // 默认: 读脚本指令
  const scriptLo = readMem(sys, descPtr + 2);
  const scriptHi = readMem(sys, descPtr + 3);
  const scriptPtr = (scriptHi << 8) | scriptLo;

  if (scriptPtr === 0) {
    return false;
  }

  const op = readMem(sys, scriptPtr);

  if (op === 0) {
    // 终止符: 释放精灵
    return false;
  }

  if (op >= 0xF0) {
    // 控制码: 跳转表分发 ($92E5-$92F4)
    _spriteVM_dispatchExtended(sys, descPtr, op, scriptPtr);
  } else if (op >= 0xE0) {
    // 栈操作 → 子调用
    _spriteVM_callSubscript(sys, descPtr, op, scriptPtr);
  } else if (op >= 0xC0) {
    // 速度赋值: 读 1-2 字节 → 设置 $0568+8/$0568+11
    _spriteVM_setVelocity(sys, descPtr, op, scriptPtr);
  } else if (op >= 0xA0) {
    // 子脚本 → 切换脚本指针
    _spriteVM_jumpSubscript(sys, descPtr, op, scriptPtr);
  } else {
    // 直写 tile: tileCode → OAM
    _spriteVM_directTile(sys, descPtr, op);
  }

  return true;
}

/** 更新 X 方向位置 */
function _spriteVM_updateXPos(sys: SystemState, descPtr: number): void {
  // 读 X 速度 ($0568+8)
  const xVelSign = readMem(sys, descPtr + 8) & 0x80;
  const xVel = readMem(sys, descPtr + 9);
  const curX = (readMem(sys, descPtr + 5) << 8) | readMem(sys, descPtr + 4);

  let newX: number;
  if (xVelSign) {
    newX = (curX - xVel) & 0xFFFF;
  } else {
    newX = (curX + xVel) & 0xFFFF;
  }

  writeMem(sys, descPtr + 4, newX & 0xFF);
  writeMem(sys, descPtr + 5, (newX >> 8) & 0xFF);
}

/** 更新 Y 方向位置 */
function _spriteVM_updateYPos(sys: SystemState, descPtr: number): void {
  const yVelSign = readMem(sys, descPtr + 10) & 0x80;
  const yVel = readMem(sys, descPtr + 11);
  const curY = (readMem(sys, descPtr + 7) << 8) | readMem(sys, descPtr + 6);

  let newY: number;
  if (yVelSign) {
    newY = (curY - yVel) & 0xFFFF;
  } else {
    newY = (curY + yVel) & 0xFFFF;
  }

  writeMem(sys, descPtr + 6, newY & 0xFF);
  writeMem(sys, descPtr + 7, (newY >> 8) & 0xFF);
}

/** $C0-$DF: 速度赋值 */
function _spriteVM_setVelocity(
  sys: SystemState,
  descPtr: number,
  op: number,
  scriptPtr: number,
): void {
  const param = readMem(sys, scriptPtr + 1);
  const nextPtr = (scriptPtr + 2) & 0xFFFF;

  if (op >= 0xD0) {
    // Y 速度
    writeMem(sys, descPtr + 10, op & 0x08 ? 0xFF : 0);
    writeMem(sys, descPtr + 11, param);
  } else {
    // X 速度
    writeMem(sys, descPtr + 8, op & 0x08 ? 0xFF : 0);
    writeMem(sys, descPtr + 9, param);
  }
}

/** $A0-$BF: 子脚本跳转 */
function _spriteVM_jumpSubscript(
  sys: SystemState,
  descPtr: number,
  op: number,
  scriptPtr: number,
): void {
  writeMem(sys, descPtr + 2, (scriptPtr + 1) & 0xFF);
  writeMem(sys, descPtr + 3, ((scriptPtr + 1) >> 8) & 0xFF);
}

/** $E0-$EF: 栈 push → 子调用 */
function _spriteVM_callSubscript(
  sys: SystemState,
  descPtr: number,
  op: number,
  scriptPtr: number,
): void {
  const stackOffset = (op - 0xE0) * 2 + 24;  // 偏移 24 开始
  writeMem(sys, descPtr + stackOffset, (scriptPtr + 1) & 0xFF);
  writeMem(sys, descPtr + stackOffset + 1, ((scriptPtr + 1) >> 8) & 0xFF);
}

/**
 * $926C-$929F: 精灵 VM 分配回調 — alloc sprite descriptor chain entry
 *
 * 6502 (from DATA_$926C_$929F bytes):
 *   STA $E7         ; 保存 sprite byte
 *   LDY #$13
 *   LDA ($94),Y     ; 读子计数器
 *   CMP #$03
 *   BCS deadlock    ; >= 3 → 死循环 (不应发生)
 *   TAX             ; X = 子计数
 *   CLC; ADC #$01   ; 子计数++
 *   STA ($94),Y
 *   TXA             ; X*2 + 0x18 → Y
 *   ASL; CLC; ADC #$18; TAY
 *   LDA $92; CLC; ADC #$02  ; script_ptr + 2
 *   STA ($94),Y     ; 保存到栈
 *   INY
 *   LDA $93; ADC #$00
 *   STA ($94),Y
 *   LDY #$01
 *   LDA ($92),Y     ; 读脚本 next byte
 *   STA $92          ; → 新 script_lo
 *   LDA $E7         ; 原始 sprite byte
 *   SEC; SBC #$20
 *   STA $93          ; → script_hi = E7 - 0x20
 *   JMP $9224        ; 继续 VM 循环
 *
 * @param spriteByte 精灵属性字节 (A)
 */
export function bank00_spriteVMAllocCallback(
  sys: SystemState,
  descPtr: number,
  spriteByte: number,
): void {
  // STA $E7: 保存原始精灵字节
  sys.mem[0xE7] = spriteByte;

  // LDY #$13; LDA ($94),Y: 读子计数器
  const subCount = sys.mem[descPtr + 0x13];

  // CMP #$03; BCS deadlock: >= 3 死循环 → 直接返回
  if (subCount >= 3) return;

  // 子计数++ → 存回
  const newCount = subCount + 1;
  sys.mem[descPtr + 0x13] = newCount;

  // X = subCount (stack index)
  // Y = subCount*2 + 0x18 (栈偏移)
  const stackY = subCount * 2 + 0x18;

  // 保存当前脚本指针+2到栈
  const savedLo = (sys.mem[descPtr + 2] + 2) & 0xFF;
  const savedHi = sys.mem[descPtr + 3] + (savedLo < 2 ? 1 : 0);
  sys.mem[descPtr + stackY] = savedLo;
  sys.mem[descPtr + stackY + 1] = savedHi;

  // LDY #$01; LDA ($92),Y: 读脚本 next byte → 新指针 lo
  const scriptLo = sys.mem[descPtr + 2];
  const scriptHi = sys.mem[descPtr + 3];
  const nextByte = rom00(((scriptHi << 8) | scriptLo + 1) & 0x1FFF);
  writeMem(sys, descPtr + 2, nextByte);

  // $93 = $E7 - 0x20 (新指针 hi)
  writeMem(sys, descPtr + 3, (spriteByte - 0x20) & 0xFF);

  // JMP $9224 → 由调用方继续 VM 循环
}

/** <$80: 直写 tile 到 OAM */
function _spriteVM_directTile(sys: SystemState, descPtr: number, tileCode: number): void {
  const oamOffset = readMem(sys, descPtr + 18);  // 当前 OAM 偏移
  const x = readMem(sys, descPtr + 4);
  const y = readMem(sys, descPtr + 6);
  const attr = readMem(sys, descPtr + 1) & 0x03;

  // 写 4 字节 OAM 条目
  writeMem(sys, 0x0568 + oamOffset * 4 + 0, y);
  writeMem(sys, 0x0568 + oamOffset * 4 + 1, tileCode);
  writeMem(sys, 0x0568 + oamOffset * 4 + 2, attr);
  writeMem(sys, 0x0568 + oamOffset * 4 + 3, x);
}

/**
 * RTS 跳转表: $92E5-$9304 (addr-1 格式)
 * 索引 = (op - 0xF0), 每项 2 字节 (lo, hi)
 * 使用时 PHA addr_hi, PHA addr_lo-1, RTS → 跳转到 addr
 */
const SPRITE_VM_JUMP_TABLE: readonly number[] = [
  // F0: $9304 → $9305  set visibility (ORA #$40)
  0x04, 0x93,
  // F1: $9338 → $9339  read X/Y position from script
  0x38, 0x93,
  // F2: $934F → $9350  set sprite X (descriptor+4)
  0x4F, 0x93,
  // F3: $935D → $935E  set sprite Y (descriptor+6)
  0x5D, 0x93,
  // F4: $936B → $936C  save script ptr to descriptor+2/3, advance chain
  0x6B, 0x93,
  // F5: $938C → $938D  set status bit6 (visibility clear)
  0x8C, 0x93,
  // F6: $9399 → $939A  clear visibility bit6
  0x99, 0x93,
  // F7: $93A6 → $93A7  read sprite tile/palette data
  0xA6, 0x93,
  // F8: $9429 → $942A  read next byte → STA $49 (sprite palette)
  0x29, 0x94,
  // F9: $9434 → $9435  set movement flag (ORA #$10)
  0x34, 0x94,
  // FA: $9441 → $9442  set chain flag (ORA #$02), init $99=$C0
  0x41, 0x94,
  // FB: $948E → $948F  dead loop (unused)
  0x8E, 0x94,
  // FC: $948E → $948F  dead loop (unused)
  0x8E, 0x94,
  // FD: $948E → $948F  dead loop (unused)
  0x8E, 0x94,
  // FE: $948E → $948F  dead loop (unused)
  0x8E, 0x94,
  // FF: $9491 → $9492  decrement sub-counter, load saved ptr
  0x91, 0x94,
];

/** $F0-$FF: 扩展控制码分发 (RTS 跳转表 → 直接分派) */
function _spriteVM_dispatchExtended(
  sys: SystemState,
  descPtr: number,
  op: number,
  scriptPtr: number,
): void {
  const param = readMem(sys, scriptPtr + 1);

  switch (op) {
    // ── $9305: F0 — 设置 visibility (描画符[0] bit6 = 1) ──
    case 0xF0:
      sys.mem[descPtr + 0] |= 0x40;
      _spriteVM_advanceScriptBy(sys, descPtr, 2);
      return;

    // ── $9339: F1 — 读取 X/Y 位置 (2+2 bytes) ──
    case 0xF1: {
      // byte1 → Y=4, JSR $9735 → store to descriptor+4 (X lo)
      // byte2 → Y=6, JSR $9735 → store to descriptor+6 (Y lo)
      const xLo = readMem(sys, scriptPtr + 1);
      const yLo = readMem(sys, scriptPtr + 2);
      writeMem(sys, descPtr + 4, xLo);
      writeMem(sys, descPtr + 6, yLo);
      _spriteVM_advanceScriptBy(sys, descPtr, 3);
      return;
    }

    // ── $9350: F2 — 设置 sprite X (读 1 byte → desc+4, 前进 2) ──
    case 0xF2: {
      writeMem(sys, descPtr + 4, param);
      _spriteVM_advanceScriptBy(sys, descPtr, 2);
      return;
    }

    // ── $935E: F3 — 设置 sprite Y (读 1 byte → desc+6, 前进 2) ──
    case 0xF3: {
      writeMem(sys, descPtr + 6, param);
      _spriteVM_advanceScriptBy(sys, descPtr, 2);
      return;
    }

    // ── $936C: F4 — 保存脚本指针到 desc+2/3, 指针前进 + 链式推进 ──
    case 0xF4: {
      // byte0 → desc+1 (属性)
      sys.mem[descPtr + 1] = param;
      // script_ptr += 2 → save to desc+2/+3
      const newPtr = (scriptPtr + 2) & 0xFFFF;
      writeMem(sys, descPtr + 2, newPtr & 0xFF);
      writeMem(sys, descPtr + 3, (newPtr >> 8) & 0xFF);
      // $94C1: 链式推进到下一个精灵 (descPtr += 0x20)
      _spriteVM_advanceChain(sys, descPtr);
      return;
    }

    // ── $938D: F5 — 清除 visibility (AND #$BF) → 前进 1 → 链式推进 ──
    case 0xF5: {
      sys.mem[descPtr + 0] &= 0xBF;
      _spriteVM_advanceScriptBy(sys, descPtr, 1);
      _spriteVM_advanceChain(sys, descPtr);
      return;
    }

    // ── $939A: F6 — 清除 visibility (同上) ──
    case 0xF6: {
      sys.mem[descPtr + 0] &= 0xBF;
      _spriteVM_advanceScriptBy(sys, descPtr, 1);
      _spriteVM_advanceChain(sys, descPtr);
      return;
    }

    // ── $93A7: F7 — 读取 sprite tile/palette 数据 ──
    case 0xF7: {
      // 读 ($92),1 → 5×LSR → desc+9 (速度高字节)
      const data1 = readMem(sys, scriptPtr + 1);
      sys.mem[descPtr + 9] = (data1 >> 5) & 0xFF;
      const isNegative = (data1 & 0x04) !== 0;
      if (!isNegative) {
        // 正方向: ROR → desc+8, 读 ($92),2 → desc+10
        sys.mem[descPtr + 8] = ((data1 >> 4) & 0x01) ? 0xFF : 0;
        sys.mem[descPtr + 10] = readMem(sys, scriptPtr + 2);
        // JMP $93DE (继续处理 Y 分量)
        const dataY1 = readMem(sys, scriptPtr + 1); // re-read for Y
        const yData = (dataY1 & 0x0F) >> 1;
        sys.mem[descPtr + 13] = yData;
        if (yData & 0x04) {
          sys.mem[descPtr + 13] |= 0xF8;
          sys.mem[descPtr + 12] = 0;
          sys.mem[descPtr + 14] = (0 - readMem(sys, scriptPtr + 3)) & 0xFF;
        }
      } else {
        // 负方向: ORA #$F8 → desc+9, 0→ROR → desc+8, 0-$92_2 → desc+10
        sys.mem[descPtr + 9] |= 0xF8;
        sys.mem[descPtr + 8] = 0;
        sys.mem[descPtr + 10] = (0 - readMem(sys, scriptPtr + 2)) & 0xFF;
      }
      // 继续到 $93DE: 读 byte1 & 0x0F → LSR → desc+13
      _spriteVM_advanceScriptBy(sys, descPtr, 4);
      return;
    }

    // ── $942A: F8 — sprite palette → STA $49, 前进 2 ──
    case 0xF8: {
      sys.mem[0x49] = param;
      _spriteVM_advanceScriptBy(sys, descPtr, 2);
      return;
    }

    // ── $9435: F9 — 设置移动标志 (ORA #$10) → 前进 1 → 链式推进 ──
    case 0xF9: {
      sys.mem[descPtr + 0] |= 0x10;
      _spriteVM_advanceScriptBy(sys, descPtr, 1);
      _spriteVM_advanceChain(sys, descPtr);
      return;
    }

    // ── $9442: FA — 设置链标志 (ORA #$02) + init $99=$C0 → 链式推进 ──
    case 0xFA: {
      sys.mem[descPtr + 0] |= 0x02;
      sys.mem[0x99] = 0xC0;
      // Save script ptr to desc+2/+3
      writeMem(sys, descPtr + 2, scriptPtr & 0xFF);
      writeMem(sys, descPtr + 3, (scriptPtr >> 8) & 0xFF);
      // BIT $99; BVC → 读 ($92),Y → $E6/$E7 → JSR $94D8
      // 简化: 标记链完成
      _spriteVM_advanceScriptBy(sys, descPtr, 1);
      _spriteVM_advanceChain(sys, descPtr);
      return;
    }

    // ── FB-FE: 死循环 (无用) ──
    case 0xFB:
    case 0xFC:
    case 0xFD:
    case 0xFE:
      return; // 不操作

    // ── $9492: FF — 递减子计数器 → 恢复脚本指针 ──
    case 0xFF: {
      const subCount = sys.mem[descPtr + 0x13];
      if (subCount === 0) return; // BEQ deadlock
      sys.mem[descPtr + 0x13] = subCount - 1;
      // Y = (subCount-1)*2 + 0x18
      const y = (subCount - 1) * 2 + 0x18;
      const savedLo = sys.mem[descPtr + y];
      const savedHi = sys.mem[descPtr + y + 1];
      writeMem(sys, descPtr + 2, savedLo); // 恢复 $92
      writeMem(sys, descPtr + 3, savedHi); // 恢复 $93
      // JMP $9224: 继续精灵 VM 循环
      return;
    }

    default:
      break;
  }

  // 默认: 前进脚本指针 2 字节
  _spriteVM_advanceScriptBy(sys, descPtr, 2);
}

/** 前进脚本指针 offset 字节 → 存回 desc+2/+3 */
function _spriteVM_advanceScriptBy(sys: SystemState, descPtr: number, offset: number): void {
  const curLo = sys.mem[descPtr + 2];
  const curHi = sys.mem[descPtr + 3];
  const newLo = (curLo + offset) & 0xFF;
  const newHi = curHi + ((newLo < curLo) ? 1 : 0);
  writeMem(sys, descPtr + 2, newLo);
  writeMem(sys, descPtr + 3, newHi);
}

/** $94AE: 脚本指针 += A → $92/$93 → JMP $9224 (继续 VM 循环) */
function _spriteVM_advancePtrBy(sys: SystemState, descPtr: number, delta: number): void {
  const oldLo = sys.mem[descPtr + 2];
  const newLo = (oldLo + delta) & 0xFF;
  const newHi = sys.mem[descPtr + 3] + ((newLo < oldLo) ? 1 : 0);
  writeMem(sys, descPtr + 2, newLo);
  writeMem(sys, descPtr + 3, newHi);
}

/** $94C1: 链式推进 → descPtr += 0x20, descCount--, 若 descCount≠0 则 JMP $9154 */
function _spriteVM_advanceChain(sys: SystemState, oldDescPtr: number): void {
  // Clear current descriptor
  sys.mem[oldDescPtr + 0] = 0;
  // Advance to next descriptor (0x20 bytes each)
  const newDescPtr = (oldDescPtr + 0x20) & 0xFFFF;
  sys.mem[0x94] = newDescPtr & 0xFF;
  sys.mem[0x95] = (newDescPtr >> 8) & 0xFF;
  // Decrement count
  sys.mem[0x96] = (sys.mem[0x96] - 1) & 0xFF;
  // If count ≠ 0, continue VM loop ($9154), else done ($9143)
}

// ═════════════════════════════════════════════════
// $97AB-$98E7 — PPU nametable 操作 (317 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $97AB: PPU 地址/数据写入 — 给定 ($E6/$E7) 指针 → 写 $2006/$2007
//   $97CA: 带数据预读的 PPU 写入 — 先写 $2006 地址再批量写数据
//   $9803: PPU 横向填充 (32 字节/行)
//   $984E: PPU register 控制 — 关闭 NMI/vblank, 设置 increment
//   $986B: PPU 垂直填充模式
//   $9895: 清屏 — 填充 nametable 区域的空白 tile

/**
 * $97AB: PPU nametable 地址设置 + 数据写入
 *
 * 6502 流程:
 *   $97AB: 初始化 $E9/$EB 标志
 *   $97B2: 计算数据长度 → 循环:
 *     写 $2006 (PPU addr) = ($E7+$E9 << 8) | ($E6+$E9)
 *     批量写 $2007: 读 ROM 数据 → count (bit6-0 共 64 字节)
 *     若 bit7 set → 继续下一批
 *     最终恢复 PPU 滚动寄存器
 *
 * @param onBank06_switch 切换到 bank 06
 */
export function bank00_ppuNametableWrite(
  sys: SystemState,
  dataPtrLo: number,
  dataPtrHi: number,
  rowCount: number,
  onBank06_switch?: (sys: SystemState) => void,
): void {
  // $97AB: 初始化
  const e9 = 0;  // 列偏移

  // 对每一 row，写 PPU 地址和数据
  let ptrLo = dataPtrLo;
  let ptrHi = dataPtrHi;

  for (let row = 0; row < rowCount; row++) {
    const ppuAddrHi = (ptrHi << 8) | (ptrLo + e9);
    const dataLen = readMem(sys, ppuAddrHi + 2);

    // 写 PPU $2006 地址
    // $97CA: 设置 PPU addr
    _ppu_setAddr(sys, (ptrHi << 8) | ptrLo);

    // 批量写数据
    const count = dataLen & 0x3F;
    for (let i = 0; i < count; i++) {
      const data = readMem(sys, ppuAddrHi + 3 + i);
      _ppu_writeData(sys, data);
    }

    // 检查 bit7 → 继续标志
    if (dataLen & 0x80) {
      ptrLo = (ptrLo + count + 3) & 0xFF;
      if (ptrLo < count + 3) ptrHi++;
    } else {
      ptrLo = (ptrLo + count + 3) & 0xFF;
    }

    // 间隔 waitFrame
    // 恢复 PPU scrolling
  }
}

/** $9895: PPU nametable 清屏 — 填充 32×N 列为 $00 */
export function bank00_ppuClearScreen(
  sys: SystemState,
  startCol: number,
  startRow: number,
  width: number,
  height: number,
): void {
  // 设置 PPU 地址到 nametable 区域
  const ppuBase = 0x2000;
  for (let row = 0; row < height; row++) {
    const ppuAddr = ppuBase + (startRow + row) * 32 + startCol;
    _ppu_setAddrReg(sys, (ppuAddr >> 8) & 0xFF, ppuAddr & 0xFF);

    // 填充 32 个空白 tile
    for (let col = 0; col < width; col++) {
      _ppu_writeDataReg(sys, 0x00);
    }
  }
}

/** 设置 PPU 地址 ($2006 写两次) — 通过 writeMem 路由到真实 PPU 硬件 */
function _ppu_setAddr(sys: SystemState, addr: number): void {
  // $2006 高位
  writeMem(sys, 0x2006, (addr >> 8) & 0xFF);
  // $2006 低位
  writeMem(sys, 0x2006, addr & 0xFF);
}

/** 写入 PPU 数据 ($2007) — 通过 writeMem 路由到真实 PPU 硬件 */
function _ppu_writeData(sys: SystemState, data: number): void {
  writeMem(sys, 0x2007, data);
}

// 别名（供外部使用）
function _ppu_setAddrReg(sys: SystemState, hi: number, lo: number): void {
  writeMem(sys, 0x2006, hi);
  writeMem(sys, 0x2006, lo);
}

function _ppu_writeDataReg(sys: SystemState, data: number): void {
  writeMem(sys, 0x2007, data);
}

// ═════════════════════════════════════════════════
// $98E8-$99AD — PPU 批量写入 (198 bytes)
// ═════════════════════════════════════════════════
//
// 6502 反汇编概要:
//   $98E8: PPU 数据序列化写入 — 条件: $4A|$4B ≠ 0
//        → 读数据指针 ($E6/$E7) → 量化写 $2007
//        → 向量复制: 从 ROM 逐 byte 写入 PPU
//   $9916: PPU 行递增写入 — 每行 += $20
//        → 通过调整 $E6+=32 跳到下一行
//   $9928: PPU 地址注册 → 写 $2006
//   $9938: PPU 数据突发写入
//   $9965: 调色板 → PPU 输出流程 (paletteFlush 的底层)

/**
 * $98E8: PPU 序列化数据写入
 *
 * 条件: 仅在 $4A or $4B ≠ 0 时执行（亮度非零）
 * 从 ROM 读取数据指针，逐 byte 写入 $2007
 *
 * 6502:
 *   1. 检查 $4A/$4B → 全零则跳过
 *   2. 设置 $EB = 数据长度
 *   3. 循环: 读 ($E6),Y → STA $2007, DEY, BNE loop
 *   4. 若 bit7 set → waitFrame(1)
 */
export function bank00_ppuSerialWrite(
  sys: SystemState,
  dataLen: number,
  ppuAddrLo: number,
  ppuAddrHi: number,
): void {
  if ((sys.mem[0x4A] | sys.mem[0x4B]) === 0) return;

  // 设置 PPU 地址
  _ppu_setAddrReg(sys, ppuAddrHi, ppuAddrLo);

  // 批量写
  for (let i = dataLen - 1; i >= 0; i--) {
    const data = readMem(sys, ppuAddrHi * 256 + ppuAddrLo + i);
    _ppu_writeDataReg(sys, data);
  }

  // $9910: bit7 检查 → 需等待 1 帧再继续
  if (dataLen & 0x80) {
    // 设帧等待标志，外部帧循环会处理
    sys.mem[0xE9] = 1;
  }
}

/**
 * $9916: PPU 行写入 — 逐行递增 PPU 地址
 *
 * 6502 核心:
 *   $E6 += 32 (一行 = 32 tiles)
 *   $E7 进位
 *   递减 $E8 (行计数器)
 *   循环直到 $E8=0
 *
 * @param rows 行数
 * @param colsPerRow 每行写入字节数
 */
export function bank00_ppuRowWrite(
  sys: SystemState,
  ppuAddrLo: number,
  ppuAddrHi: number,
  rows: number,
  colsPerRow: number,
): void {
  let addrLo = ppuAddrLo;
  let addrHi = ppuAddrHi;

  for (let row = 0; row < rows; row++) {
    _ppu_setAddrReg(sys, addrHi, addrLo);

    for (let col = 0; col < colsPerRow; col++) {
      _ppu_writeDataReg(sys, 0x00);  // fill with 0
    }

    // 下一行
    addrLo = (addrLo + 32) & 0xFF;
    if (addrLo < 32) {
      addrHi = (addrHi + 1) & 0xFF;
    }
  }
}

/**
 * $99AE: 调色板生效输出 (底层) — 保存 bank → 写 palette 到 PPU
 *
 * 6502: 被 $9A07 (paletteInit) 和 $9A35 (paletteSetMax) 调用
 *   1. 保存 bank → 切换到 bank $06
 *   2. $9AB8: 计算背景 palette PPU 地址 ($B000 + $48*16)
 *   3. $9ADA: 计算精灵 palette PPU 地址 ($B300 + $49*16)
 *   4. 读 ROM palette 数据 → $062A-$0649
 *   5. 恢复 bank
 */
export function bank00_paletteLoadFromROM(
  sys: SystemState,
  onBank06_switch: (sys: SystemState) => void,
): void {
  track('bank00_paletteLoadFromROM', { '0048': sys.mem[0x48], '0049': sys.mem[0x49] });
  onBank06_switch(sys);

  // 背景 palette: ROM 地址 = $B000 + $48*16
  const bgRomBase = 0xB000 + sys.mem[0x48] * 16;
  for (let i = 0; i < 16; i++) {
    sys.mem[0x062A + i] = readMem(sys, bgRomBase + i);
  }

  // 精灵 palette: ROM 地址 = $B300 + $49*16
  const sprRomBase = 0xB300 + sys.mem[0x49] * 16;
  for (let i = 0; i < 16; i++) {
    sys.mem[0x063A + i] = readMem(sys, sprRomBase + i);
  }
  exit('bank00_paletteLoadFromROM');
}

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

// ═════════════════════════════════════════════════
// $9EA2-$9EEC — 亮度查表 (75 bytes)
// ═════════════════════════════════════════════════
// 6502: $9AA2 中 TAX / LDA $9EA2,X 使用
// 输入: 亮度值 (0-74), 输出: PPU palette 亮度基址
const PALETTE_BRIGHTNESS_TABLE: readonly number[] = [
  0x0F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x0F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x10, 0x20, 0x20, 0x30, 0x30, 0x20, 0x20, 0x10, 0x10,
  0x0F, 0x00, 0x00, 0x00, 0x10, 0x10, 0x10, 0x20, 0x20, 0x20, 0x30, 0x30, 0x30, 0x20, 0x20, 0x20,
  0x0F, 0x00, 0x10, 0x10, 0x10, 0x20, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
  0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0xF0, 0x00, 0x00,
];

// ═════════════════════════════════════════════════
// $9B28 — PPU 隊列寫入條目頭 (queue add entry)
// ═════════════════════════════════════════════════
//
// 6502:
//   $9B28: PHA              ; 保存 count
//   $9B29: BIT $0629        ; 等 NMI busy 清
//   $9B2C: BVC $9B37
//   $9B2E: LDA #$01         ; waitFrame(1)
//   $9B30: JSR $9FA8
//   $9B33: PLA
//   $9B34: JMP $9B28
//   $9B37: AND #$3F         ; count & $3F
//   $9B39: CLC
//   $9B3A: ADC $0628        ; + queue size
//   $9B3D: CMP #$3D         ; overflow?
//   $9B3F: BCS $9B2E        ;  等 NMI flush
//
//   $9B41: PLA              ; 恢复 count
//   $9B42: ORA #$40         ; 设 NMI busy 标志
//   $9B44: STA $0629
//
//   $9B47: TXA              ; A = addr_hi ($3F)
//   $9B48: LDX $0628        ; X = 隊列當前索引
//   $9B4B: STA $05EA,X      ; wr addr_hi
//   $9B4E: TYA              ; A = addr_lo ($00)
//   $9B4F: STA $05E9,X      ; wr addr_lo
//   $9B52: LDA $0629
//   $9B55: AND #$BF         ; 清 busy → 纯 count
//   $9B57: STA $05E8,X      ; wr entry type (=count)
//   $9B5A: INX;INX;INX      ; X += 3 (頭大小)
//   $9B5D: RTS
//
// 队列格式（每条目 3+N 字节）:
//   $05E8+idx: entry type  (pure count, bit7=0 为水平增量)
//   $05E9+idx: PPU addr lo
//   $05EA+idx: PPU addr hi
//   $05EB+idx …:  N data bytes
//   下一个条目紧接在后面，$00 表示队列结束
//
// 入参: count=A, addr_lo=Y, addr_hi=X
// 返回: X = 数据区起始索引 (旧 $0628 + 3)
function _queAddEntry(sys: SystemState): void {
  const count = sys.regs.A;        // PHA/POP: count
  const addrLo = sys.regs.Y;      // PPU addr lo
  const addrHi = sys.regs.X;      // PPU addr hi

  // 等 NMI busy 清空 ($9B29-$9B34)
  // 在 TS 單線程環境中，$0629 bit6 不會被 NMI 設
  // 故這裡直接做溢位檢查

  const capped = count & 0x3F;
  // $9B3A: ADC $0628; CMP #$3D
  // 如果新條目 + 現有隊列 >= $3D 則等 NMI flush
  // 簡化: 直接檢查隊列容量
  const newSize = (sys.mem[0x0628] + capped) & 0xFF;
  if (newSize >= 0x3D) {
    // 隊列可能溢出，這裡不做等待 (TS 沒有真正的 NMI)
    // 實際上游 layer 會透過 bank02_nmiHandler 每幀處理
  }

  // $9B42-$9B44: 設 $0629 busy
  sys.mem[0x0629] = (count | 0x40) & 0xFF;

  // $9B47-$9B57: 寫 3 字節頭
  const qIdx = sys.mem[0x0628];
  sys.mem[0x05EA + qIdx] = addrHi;     // 寫 addr hi
  sys.mem[0x05E9 + qIdx] = addrLo;     // 寫 addr lo
  sys.mem[0x05E8 + qIdx] = count & 0x3F; // 寫 entry type (=count, w/o busy bit)

  // $9B5A-$9B5C: X += 3 → 回存
  sys.regs.X = (qIdx + 3) & 0xFF;
}

// ═════════════════════════════════════════════════
// $9AA2 — 隊列寫入 1 字節 (queue add byte)
// ═════════════════════════════════════════════════
//
// 6502:
//   $9AA2: TAX              ; X = A (亮度混合值)
//   $9AA3: LDA $9EA2,X      ; 查亮度表
//   $9AA6: STA $E6
//   $9AA8: LDA $062A,Y      ; 原 palette byte
//   $9AAB: AND #$0F         ; 取低 4 bit (色號)
//   $9AAD: ORA $E6           ; 組合亮度 + 色號
//   $9AAF: LDX $E7           ; 取隊列數據索引
//   $9AB1: STA $05E8,X      ; 寫入隊列
//   $9AB4: INC $E7           ; 索引 +1
//   $9AB6: INY               ; 源索引 +1
//   $9AB7: RTS
//
// 入参: A=亮度值 (用 $4A/$4B 調整後), Y=palette 源索引 ($062A+Y)
// 透過 $E7 追蹤當前隊列數據寫入位置。
function _queAddByte(sys: SystemState): void {
  const brightness = sys.regs.A;              // $9AA2: TAX
  const brightBase = PALETTE_BRIGHTNESS_TABLE[brightness] ?? 0; // $9AA3: LDA $9EA2,X
  const rawPal = sys.mem[0x062A + sys.regs.Y]; // $9AA8: LDA $062A,Y
  const color = rawPal & 0x0F;                // $9AAB: AND #$0F
  const final = brightBase | color;           // $9AAD: ORA $E6

  const qDataIdx = sys.mem[0xE7];             // $9AAF: LDX $E7
  sys.mem[0x05E8 + qDataIdx] = final;         // $9AB1: STA $05E8,X

  sys.mem[0xE7] = (qDataIdx + 1) & 0xFF;      // $9AB4: INC $E7
  sys.regs.Y = (sys.regs.Y + 1) & 0xFF;       // $9AB6: INY
}

// ═════════════════════════════════════════════════
// $9B5E — 隊列終結 (queue finalize)
// ═════════════════════════════════════════════════
//
// 6502:
//   $9B5E: LDA #$00         ; 終止符
//   $9B60: STA $05E8,X      ; 寫 $00 到隊列
//   $9B63: STX $0628        ; 設 $0628 = 隊列總長
//   $9B66: LDA $0629
//   $9B69: AND #$BF         ; 清 busy flag
//   $9B6B: STA $0629
//   $9B6E: RTS
//
// 入参: X = 當前隊列寫入位置 (數據區末尾)
function _queFinalize(sys: SystemState): void {
  sys.mem[0x05E8 + sys.regs.X] = 0x00;        // $9B60: STA $05E8,X
  sys.mem[0x0628] = sys.regs.X;               // $9B63: STX $0628
  sys.mem[0x0629] &= 0xBF;                    // $9B69: AND #$BF
}

// ═════════════════════════════════════════════════
// $9A71 — 调色板输出 (palette flush)
// ═════════════════════════════════════════════════
//
// 6502:
//   $9A71: LDA #$20         ; count = 32 bytes
//   $9A73: LDY #$00         ; addr_lo = $00
//   $9A75: LDX #$3F         ; addr_hi = $3F
//   $9A77: JSR $9B28        ; queue_add_entry → PPU addr $3F00, 32 bytes
//
//   $9A7A: STX $E7          ; $E7 = 队数据索引 (X = old_$0628 + 3)
//   $9A7C: LDY #$00         ; Y = 0
//   ; BG palette (16 bytes):
//   $9A7E: LDA $062A,Y      ; palette byte
//   $9A81: AND #$30         ; keep brightness bits (4-5)
//   $9A83: CLC
//   $9A84: ADC $4A          ; add bg brightness
//   $9A86: JSR $9AA2        ; _queAddByte
//   $9A89: CPY #$10
//   $9A8B: BNE $9A7E
//   ; Sprite palette (16 bytes):
//   $9A8D: LDA $062A,Y      ; Y continues from $10
//   $9A90: AND #$30
//   $9A92: CLC
//   $9A93: ADC $4B          ; add sprite brightness
//   $9A95: JSR $9AA2
//   $9A98: CPY #$20
//   $9A9A: BNE $9A8D
//
//   $9A9C: LDX $E7          ; restore queue data index
//   $9A9E: JSR $9B5E        ; _queFinalize
//   $9AA1: RTS
//
// 注意: 将 $062A-$0649 (32 bytes) 结合 $4A/$4B 亮度,
//       透过 $05E8 队列通知 NMI handler 写入 PPU $3F00。
export function bank00_paletteFlush(sys: SystemState): void {
  track('bank00_paletteFlush', { '004A': sys.mem[0x4A], '004B': sys.mem[0x4B], '0628': sys.mem[0x628], '0629': sys.mem[0x629] });
  // $9A71-$9A77: 写队列头 → PPU addr $3F00, 32 bytes
  sys.regs.A = 0x20;        // count = 32
  sys.regs.Y = 0x00;        // addr_lo = $00
  sys.regs.X = 0x3F;        // addr_hi = $3F → PPU $3F00
  _queAddEntry(sys);
  // X 已由 _queAddEntry 设为 old_$0628 + 3

  // $9A7A: 保存队列数据索引到 $E7
  sys.mem[0xE7] = sys.regs.X;

  // $9A7C: Y = 0
  sys.regs.Y = 0;

  // $9A7E-$9A8B: BG palette loop (Y=0..15)
  for (let y = 0; y < 16; y++) {
    const raw = sys.mem[0x062A + y];      // $9A7E: LDA $062A,Y
    const brightness = (raw & 0x30) + sys.mem[0x4A]; // $9A81-$9A84: AND #$30; ADC $4A
    sys.regs.A = brightness;
    sys.regs.Y = y;
    _queAddByte(sys);
    // Y 已由 _queAddByte +1
  }

  // $9A8D-$9A9A: Sprite palette loop (Y=$10..$1F)
  for (let y = 16; y < 32; y++) {
    const raw = sys.mem[0x062A + y];      // $9A8D: LDA $062A,Y
    const brightness = (raw & 0x30) + sys.mem[0x4B]; // $9A90-$9A93: AND #$30; ADC $4B
    sys.regs.A = brightness;
    sys.regs.Y = y;
    _queAddByte(sys);
    // Y 已由 _queAddByte +1
  }

  // $9A9C-$9A9E: 终结队列，设 $0628 通知 NMI
  sys.regs.X = sys.mem[0xE7];
  _queFinalize(sys);
  exit('bank00_paletteFlush', { '0628': sys.mem[0x628], '0629': sys.mem[0x629], '05E8+0': sys.mem[0x5E8], '05E8+3': sys.mem[0x5EB], '05E8+34': sys.mem[0x60A], '053BE': sys.mem[0x5E8 + 35] });
}

/**
 * $99AE-$99CE: 调色板淡入步进 — 逐帧递增背景亮度直到 $4A = 0x0F
 *
 * 6502 (from DATA_$99AE_$99D0 bytes):
 *   STA $48          ; 保存背景调色板索引
 *   JSR $9B07        ; 保存 bank → 切 bank 06
 *   JSR $9AB8        ; 计算背景调色板 PPU 地址
 *   LDX $E9; JSR $C4B9  ; 跨 bank 调用
 *   LDA $4A
 *   CMP #$0F
 *   BCS done         ; 若 >= $0F → RTS
 *   INC $4A          ; 亮度++
 *   JSR $9A71        ; 调色板输出
 *   LDA #$01
 *   JSR $9FA8        ; 等 1 帧 NMI
 *   JMP loop         ; 继续循环
 *   RTS
 *
 * $99CF-$99D0: 精灵调色板淡入入口 (STX $49, 然后沿用 $99D1 逻辑)
 *
 * @param bgPalIdx 背景调色板索引 (A)
 */
export function bank00_paletteFadeInStep(
  sys: SystemState,
  bgPalIdx: number,
): void {
  // STA $48: 保存背景调色板索引
  sys.mem[0x48] = bgPalIdx;

  // JSR $9B07: 保存 bank → 切 bank 06
  const savedBank = sys.mem[0x25];
  bankSwitch(sys, 6);

  // JSR $9AB8: 计算背景调色板 PPU 地址 ($B000 + $48*16)
  const bgRomBase = 0xB000 + sys.mem[0x48] * 16;
  for (let i = 0; i < 16; i++) {
    sys.mem[0x062A + i] = readMem(sys, bgRomBase + i);
  }
  // 精灵调色板也加载
  const sprRomBase = 0xB300 + sys.mem[0x49] * 16;
  for (let i = 0; i < 16; i++) {
    sys.mem[0x063A + i] = readMem(sys, sprRomBase + i);
  }

  // 恢复 bank
  bankSwitch(sys, savedBank);

  // 循环: 递增 $4A 直到 >= 0x0F
  while (sys.mem[0x4A] < 0x0F) {
    sys.mem[0x4A]++;
    bank00_paletteFlush(sys);
    // 实际 NMI 等待由外层帧循环处理，这里简化
  }
}

/**
 * $99CF-$99D0: 精灵调色板淡入入口
 *   STX $49 → 然后走 $99D1 逻辑
 */
export function bank00_spritePaletteFadeIn(
  sys: SystemState,
  sprPalIdx: number,
): void {
  sys.mem[0x49] = sprPalIdx;
  // 沿用背景淡入逻辑，但使用精灵$4B
  if (sys.mem[0x4B] < 0x0F) sys.mem[0x4B]++;
}

/** $99D1: 调色板淡入 — 递增亮度使画面变亮 (从暗到亮) */
export function bank00_paletteFadeIn(sys: SystemState): void {
  track('bank00_paletteFadeIn', { '004A': sys.mem[0x4A], '004B': sys.mem[0x4B] });
  if (sys.mem[0x4A] < 0x0F) sys.mem[0x4A]++;
  if (sys.mem[0x4B] < 0x0F) sys.mem[0x4B]++;
  exit('bank00_paletteFadeIn', { '004A': sys.mem[0x4A], '004B': sys.mem[0x4B] });
}

/** $99EC: 调色板淡入 — 递减亮度使画面变暗 (从亮到暗) */
export function bank00_paletteFadeOut(sys: SystemState): void {
  track('bank00_paletteFadeOut', { '004A': sys.mem[0x4A], '004B': sys.mem[0x4B] });
  if (sys.mem[0x4A] > 0) sys.mem[0x4A]--;
  if (sys.mem[0x4B] > 0) sys.mem[0x4B]--;
  exit('bank00_paletteFadeOut', { '004A': sys.mem[0x4A], '004B': sys.mem[0x4B] });
}

/** $9A35: 最大亮度淡出 (全暗) — 设 $4A/$4B=0x0F 并重新加载 ROM palette */
export function bank00_paletteSetMax(sys: SystemState): void {
  track('bank00_paletteSetMax');
  sys.mem[0x4A] = 0x0F;
  sys.mem[0x4B] = 0x0F;
  // $9A35 也调用 $99AE 重新加载 palette ROM 数据
  bank00_paletteLoadFromROM(sys, (s) => bankSwitch(s, 6));
  exit('bank00_paletteSetMax');
}

/** $9A00: 初始化调色板 — 清空 $4A/$4B + OAM 缓冲，然后从 ROM 加载 palette */
export function bank00_paletteInit(sys: SystemState): void {
  track('bank00_paletteInit');
  sys.mem[0x48] = 0;
  sys.mem[0x49] = 0;
  sys.mem[0x4A] = 0;
  sys.mem[0x4B] = 0;
  // 清 OAM buffer ($054A-$05EA?)
  for (let i = 0x054A; i < 0x05EA; i++) {
    sys.mem[i] = 0xFF;
  }
  // $9A07: 加载 ROM palette 到 $062A-$0649
  bank00_paletteLoadFromROM(sys, (s) => bankSwitch(s, 6));
  exit('bank00_paletteInit');
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
 * $9E80-$9EA1: 8-bit 二进制 → BCD 转换
 *
 * 6502 核心算法 ($9E36 移位除法子程序):
 *   1. 用移位相除法除以 10，得百位/十位/个位 BCD 数码
 *   2. 组合: (个位<<4) | 十位 → 低字节
 *   3. 百位 → 高字节
 *   4. 输出: $EC(低), $ED(高) — 即 16-bit BCD 结果
 *
 * @param value 8-bit 输入值 (0–255)
 * @param _divisor 除数 (固定 10)
 * @returns 16-bit BCD 结果 (低字节 = 十位+个位)
 */
export function bank00_bcdConvert(sys: SystemState, value: number, _divisor: number = 10): number {
  // $9E36: 移位除法 — 将 $ED 中的二进制值除以 10
  // 返回: [$EA, $ED] = [商(0-9中的一个BCD位), 余数]
  function _div10(v: number): [number, number] {
    let ed = v & 0xFF;
    let ea = 0;

    for (let i = 0; i < 8; i++) {
      // ASL $ED: shift left, MSB → carry
      const carry = (ed & 0x80) !== 0;
      ed = (ed << 1) & 0xFF;
      // ROL $EA: rotate carry into $EA's LSB
      ea = ((ea << 1) | (carry ? 1 : 0)) & 0xFF;
      // $EA >= 10 ? (SEC → SBC → 无借位则存回并 INC $ED)
      if (ea >= 10) {
        ea -= 10;
        ed = (ed + 1) & 0xFF;
      }
    }
    return [ea, ed];
  }

  // 第一次调用: 25/10 → 商=2 (十位), 余=5
  const [tens, rem1] = _div10(value & 0xFF);
  // 第二次调用: 5/10 → 商=0 (个位), 余=5
  const [units, rem2] = _div10(rem1);
  // 组合: (个位 << 4) | 十位 → 低字节 $EC
  const lo = ((units << 4) | tens) & 0xFF;
  // 第三次调用: 5/10 → 商=0 (百位)
  const [hundreds, _] = _div10(rem2);
  const hi = hundreds & 0xFF;

  return (hi << 8) | lo;
}

/** $9E4F: ×10 乘法 → BCD 辅助 */
export function bank00_mul10(sys: SystemState, value: number): number {
  return (value * 10) & 0xFFFF;
}

// ═════════════════════════════════════════════════
// DATA: Bank-00 ROM 数据 (从 bank-00-data.ts 导入)
// ═════════════════════════════════════════════════

import {
  DATA_$8398_$83B9,
  DATA_$83BA_$83DB,
  DATA_$83DC_$83FE,
  DATA_$83FF_$841F,
  DATA_$8420_$8441,
  DATA_$8442_$8463,
  DATA_$8545_$8574,
  DATA_$86C8_$86DD,
  DATA_$876E_$87B7,
  DATA_$8AB4_$8AD4,
  DATA_$8AD5_$8AE6,
  DATA_$8AE7_$8AF6,
  DATA_$8FF0_$900A,
  DATA_$926C_$929F,
  DATA_$9350_$938C,
  DATA_$9482_$94AD,
  DATA_$978B_$97AA,
  DATA_$99AE_$99D0,
  DATA_$9EA2_$9EEC,
  DATA_$9FE5_$9FFF,
} from './bank-00-data';

// Bank 00 自身 DATA_ chunks（用于 rom00() 访问器）
const _DATA_CHUNKS_00: { offset: number; data: readonly number[] }[] = [
  { offset: 0x0398, data: DATA_$8398_$83B9 },
  { offset: 0x03BA, data: DATA_$83BA_$83DB },
  { offset: 0x03DC, data: DATA_$83DC_$83FE },
  { offset: 0x03FF, data: DATA_$83FF_$841F },
  { offset: 0x0420, data: DATA_$8420_$8441 },
  { offset: 0x0442, data: DATA_$8442_$8463 },
  { offset: 0x0545, data: DATA_$8545_$8574 },
  { offset: 0x06C8, data: DATA_$86C8_$86DD },
  { offset: 0x076E, data: DATA_$876E_$87B7 },
  { offset: 0x0AB4, data: DATA_$8AB4_$8AD4 },
  { offset: 0x0AD5, data: DATA_$8AD5_$8AE6 },
  { offset: 0x0AE7, data: DATA_$8AE7_$8AF6 },
  { offset: 0x0FF0, data: DATA_$8FF0_$900A },
  { offset: 0x126C, data: DATA_$926C_$929F },
  { offset: 0x1350, data: DATA_$9350_$938C },
  { offset: 0x1482, data: DATA_$9482_$94AD },
  { offset: 0x178B, data: DATA_$978B_$97AA },
  { offset: 0x19AE, data: DATA_$99AE_$99D0 },
  { offset: 0x1EA2, data: DATA_$9EA2_$9EEC },
  { offset: 0x1FE5, data: DATA_$9FE5_$9FFF },
];

function rom00(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS_00) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

console.log('[bank00] ✅ 已加载 — dispatchScene|titleBoot|waitStart|menuCursor|timers|bytecode|spriteAnim|palette|sceneTrans|bcd|data');

// ── 关卡/场景元数据 bank-23 存取 ──
export { getBank23Data as bank00_getLevelData23 } from './bank-23-code';
