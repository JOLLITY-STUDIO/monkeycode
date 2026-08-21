/**
 * Bank 02 PASSWORD 场景 — 密码输入/验证。
 *
 * 对应真实 ROM (2026-08 逆向, bank2 运行时 $A000 窗口, ROM 文件偏移 0x4010 基址):
 *   入口: bank2 $A200 跳转表第7项 $8212: JMP $A484
 *   $A484 ($8484): 间接跳转分发器
 *     LDA ram_00ED; ASL; TAX; LDA $A492,X; PHA; LDA $A491,X; PHA; RTS
 *     地址表 @ $A491 (反汇编$8491), 每项2字节小端, 索引=ram_00ED
 *   idx0 ($A4C0): 密码输入主逻辑 (初始化链已翻译在 Bank02Service.entryF(0)):
 *     JSR $9A0D (帧等待/让出); LDA #$10; JSR $9FA8 (让出 0x10 帧)
 *     LDY #$30; 循环 48 次 { JSR $9FA8(1) 让出 + JSR $890C 写 NT 字符 } → 48 字符网格
 *     LDA #$17; JSR $8AF7 (Cut 0x17 标题背景); LDA #$68; STA ram_0044 (滚动)
 *     后续: 调色板/PPU/清屏/块填充
 *
 *   密码模式入口 (真实调度): bank02 $82E8 (运行时 $A2E8) 读 ram_0057; BMI $8338
 *     (bit7=密码模式); $8338: CMP #$81; BEQ $83A3 (校验通过续关载入路径)
 *     $833C (输入模式): 33 槽位初始化 (ram_0468 起, 步长4, Y步长3, X步长13,
 *       tile=(ram_00EC&1)|$F2, attr=3) + $8372 字符集钳制动画循环
 *       (CMP $AB1F,Y / ADC $AB21,Y / ADC $AB22,Y, Y=槽位&$0C → 4组字符集上限)
 *     $83A3 (续关载入): ram_0568 |= $10; 滚动动画 ram_0044/0046/056D (见
 *       playContinueLoadAnimation)
 *
 *   AB1F 字符集表 (ROM 0x4B2F, 16字节, 每4字节一组 [上限, tile增量, X增量, ?]):
 *     [6c 00 04 fc] [6e 00 05 fc] [70 00 06 fa] [74 00 07 fa]
 *   AB1F+0x10: 光栅/字母映射 "XEQUSGFRTWZ HIKLM" (16字符)
 *
 * H5 转写: PasswordController 管理 ram_00ED 索引分发 + 密码输入循环。
 * 输入模型 (对齐 ROM 48 字符网格 + 16 槽位 2×8):
 *   - 16 个密码槽位按 2 行 × 8 列网格排布, 方向键在槽位间移动
 *   - A 循环递增当前槽位字符 (0-9 + A-Z, 36 字符集), B 递减
 *   - START 确认 → 三态结果 (success/fail/continue)
 *   FIXME: 真实输入是 33 槽位假名网格光标选择 (AB1F 表驱动字符集钳制动画),
 *          16 槽位 A/B 增量模型是 H5 简化, 待假名网格输入 trace 后替换。
 *
 * 真实密码验证算法 (校验通过→ram_0057=$81→$83A3 续关载入) 待从 ROM
 * 校验子程序 + 模拟器 trace 抠出 (TODO, 不编造数据)。
 *
 * ⚠️ 校验子程序定位结论 (2026-08 逆向):
 *   在已反汇编的 bank02 (asm/bank02/*.s) 与 bank00 (asm/bank00/*.s) 中,
 *   $82E8/$8338/$83A3 只是「读取 ram_0057 后的分发/动画」, 不含 16 字符
 *   校验和计算本体。负责把 ram_0057 置为 $81 的校验子程序位于未反汇编段
 *   (需 tsnes trace START 确认帧定位), 本实现不编造校验算法。
 *   见 _verifyPassword 注释的 trace 方案。
 */

import { DataStore } from '../DataStore';
import { BUTTON } from '../../../core/types';

/** $A491 地址表 (idx→运行时$A4xx目标, 24 项) — 对应 $8484 分发器
 *  完整 24 项目标地址 (从 _full.s:454-455 字节提取, 每项 2B 小端):
 *    c0 a4 59 a5 7b a5 81 a5 a2 a5 a8 a5 b0 a5 b8 a5
 *    bf a5 cd a5 db a5 e8 a5 02 a6 1c a6 29 a6 50 a6
 *    9c a6 7a a7 82 a7 8d a7 bd a7 ce a7 d6 a7 fa a7
 */
export const PASSWORD_DISPATCH_TABLE: readonly number[] = [
  0xA4C0, 0xA559, 0xA57B, 0xA581, 0xA5A2, 0xA5A8, 0xA5B0, 0xA5B8,
  0xA5BF, 0xA5CD, 0xA5DB, 0xA5E8, 0xA602, 0xA61C, 0xA629, 0xA650,
  0xA69C, 0xA77A, 0xA782, 0xA78D, 0xA7BD, 0xA7CE, 0xA7D6, 0xA7FA,
];

/** 密码字符槽位数 (从 _tmp_pwd_enter.png 真实渲染确认: 6 个下划线占位) */
export const PASSWORD_CHAR_COUNT = 6;

/** 假名网格列数 (6×8 假名网格, 6 行 8 列) */
export const PASSWORD_COLS = 8;

/** 密码字符数据长度 (idx0: LDY #$30 → 48 字节 字符网格) */
export const PASSWORD_GRID_LEN = 0x30;

/**
 * 密码字符集 (0-35) → 显示字符:
 *   0-9   → '0'-'9' (CHR tile $02-$0B)
 *   10-35 → 'A'-'Z' (CHR tile $41-$5A)
 * 对应 char-map.ts $88CA 文本字符规则 (单 tile 直接映射)。
 */
export const PASSWORD_CHARSET: readonly string[] = (() => {
  const t: string[] = [];
  for (let i = 0; i < 10; i++) t.push(String.fromCharCode(0x30 + i));   // 0-9
  for (let i = 0; i < 26; i++) t.push(String.fromCharCode(0x41 + i));   // A-Z
  return t;
})();

/** 字符值 (0-35) → CHR tile 索引 ($02-$0B / $41-$5A) */
export function passwordCharToTile(ch: number): number {
  if (ch >= 0 && ch < 10) return 0x02 + ch;
  if (ch >= 10 && ch < 36) return 0x41 + (ch - 10);
  return 0;
}

/**
 * 真实 ROM $AB1F 字符集钳制表 (ROM 偏移 0x4B2F, 16 字节, 每 4 字节一组):
 *   [字符集上限, tile 增量, X 增量, ?]
 * 槽位索引 & $0C → 组号 (0/4/8/12), 驱动 $8372 字符集钳制动画循环:
 *   LDA ram_0468,X; CMP $AB1F,Y; BCC skip; LDA #$00
 *   CLC; ADC $AB21,Y; STA ram_0468,X (tile 钳制+增量)
 *   LDA ram_046B,X; CLC; ADC $AB22,Y; STA ram_046B,X (X 位移增量)
 */
export const PASSWORD_AB1F_CHARSET: readonly number[] = [
  0x6c, 0x00, 0x04, 0xfc,
  0x6e, 0x00, 0x05, 0xfc,
  0x70, 0x00, 0x06, 0xfa,
  0x74, 0x00, 0x07, 0xfa,
];

/** 真实 ROM $AB1F+0x10 光栅/字母映射 (16 字符: "XEQUSGFRTWZ HIKLM") */
export const PASSWORD_ALPHA_MAP: readonly string[] = 'XEQUSGFRTWZ HIKLM'.split('');

/**
 * 真实 ROM 密码输入槽位布局 ($833C 初始化, ram_0468 起):
 *   - 槽位地址步长 4 (Y/tile/attr/X), X 从 $78 到 $FC (33 槽)
 *   - Y 坐标步长 3 (0,3,6,...,96), X 坐标步长 13 (0,13,26,...,&$FF 回绕)
 *   - tile = (ram_00EC & 1) | $F2, attr = $03
 */
export const PASSWORD_SLOT_COUNT = 33;
export const PASSWORD_SLOT_STEP = 4;
export const PASSWORD_SLOT_Y_STEP = 3;
export const PASSWORD_SLOT_X_STEP = 13;

/** 密码界面显示状态 (View 层消费, 写 NT/OAM) */
export interface PasswordDisplayState {
  /** 当前光标槽位索引 (0-15) */
  charIdx: number;
  /** 已输入字符 (16个, 每个 0-35) */
  chars: number[];
  /** 是否已完成 (START 确认) */
  done: boolean;
  /** 字符总数 */
  charCount: number;
  /** 每行槽位数 */
  cols: number;
  /** 当前字符集 (36 项) */
  charset: readonly string[];
  /** 最近一次确认结果: 0=未确认, 1=成功, 2=失败 */
  result: 0 | 1 | 2;
}

/** 密码确认结果 */
export type PasswordUpdateResult = 'continue' | 'success' | 'fail';

/**
 * 密码输入控制器 — 对应 bank2 $A484 分发 + idx0 $A4C0 主逻辑。
 */
export class PasswordController {
  /** 当前密码槽位索引 (0-15) */
  private _charIdx = 0;
  /** 已输入字符 (16个, 每个0-35) */
  private _chars: number[] = new Array(PASSWORD_CHAR_COUNT).fill(0);
  /** 是否已完成 (START 确认) */
  private _done = false;
  /** 最近确认结果 (0=未确认 1=成功 2=失败) */
  private _result: 0 | 1 | 2 = 0;
  /** 帧计数 (驱动光标闪烁) */
  private _frame = 0;

  constructor(private _store: DataStore) {}

  /**
   * 初始化密码输入场景 — 对应 $A4C0:
   *   加载字符网格 + Cut 0x17 背景 + 滚动 + ram_00ED 分发。
   *
   * 注: 真实 $A4C0 初始化链 (字符网格 NT/背景/调色板/滚动) 已完整翻译在
   * Bank02Service.entryF(0) (_jumpHandler_00_A4C0), 由 boot._passwordCoroutine
   * 在 init() 之后委派执行; 此处只负责输入状态与 ram_00ED 分发索引。
   *
   * @param matchIdx ram_00ED 值 (决定 $A484 分发目标, 密码输入通常 idx0)
   */
  init(matchIdx: number = 0): void {
    // ram_00ED 设为密码场景索引 (idx0 = $A4C0 密码输入主逻辑)
    this._store.write('ram_00ED', matchIdx);
    this._charIdx = 0;
    this._chars = new Array(PASSWORD_CHAR_COUNT).fill(0);
    this._done = false;
    this._result = 0;
    this._frame = 0;
  }

  /**
   * 每帧更新密码输入 — 对应 $A4C0 主循环。
   *
   * 输入模型 (H5 转写, ROM 语义): 16 槽位 2×8 网格,
   *   LEFT/RIGHT 水平移动, UP/DOWN 垂直换行, A 递增字符, B 递减字符,
   *   START 确认 → 校验 → success / fail。
   *
   * @param pressed 本帧按下 (边沿, boot.update 已做上升沿检测)
   * @returns 确认结果三态
   */
  update(pressed: number): PasswordUpdateResult {
    this._frame++;
    if (this._done) return 'continue';

    // 槽位光标移动 (2 行 × 8 列网格, 循环)
    if (pressed & BUTTON.LEFT) {
      this._charIdx = (this._charIdx + PASSWORD_COLS - 1) % PASSWORD_COLS
        + Math.floor(this._charIdx / PASSWORD_COLS) * PASSWORD_COLS;
    }
    if (pressed & BUTTON.RIGHT) {
      const row = Math.floor(this._charIdx / PASSWORD_COLS);
      this._charIdx = ((this._charIdx + 1) % PASSWORD_COLS) + row * PASSWORD_COLS;
    }
    if (pressed & BUTTON.UP) {
      this._charIdx = ((this._charIdx + PASSWORD_COLS - PASSWORD_CHAR_COUNT) % PASSWORD_CHAR_COUNT + PASSWORD_CHAR_COUNT) % PASSWORD_CHAR_COUNT;
    }
    if (pressed & BUTTON.DOWN) {
      this._charIdx = (this._charIdx + PASSWORD_COLS) % PASSWORD_CHAR_COUNT;
    }

    // 字符选择: A 递增 / B 递减 (0-35 循环)
    if (pressed & BUTTON.A) {
      this._chars[this._charIdx] = (this._chars[this._charIdx] + 1) % PASSWORD_CHARSET.length;
    }
    if (pressed & BUTTON.B) {
      this._chars[this._charIdx] = (this._chars[this._charIdx] + PASSWORD_CHARSET.length - 1) % PASSWORD_CHARSET.length;
    }

    // START 确认 → 校验
    if (pressed & BUTTON.START) {
      this._done = true;
      if (this._verifyPassword()) {
        this._result = 1;
        // 校验通过 → ram_0057=$81 → $83A3 续关载入动画 (ram_0568|=0x10 + 滚动)
        this.playContinueLoadAnimation();
        return 'success';
      }
      this._result = 2;
      return 'fail';
    }
    return 'continue';
  }

/**
 * 密码校验 — 对应 ROM 密码验证子程序。
 *
 * 真实流程 (已确认): 校验通过 → ram_0057=$81 → $82E8 BMI $8338 → CMP #$81
 * BEQ $83A3 (续关载入动画: ram_0568|=0x10 + 滚动, 已翻译为
 * playContinueLoadAnimation)。$83A3 之后 $833C 是输入模式 (33 槽位网格)。
 *
 * 真实密码界面 (从 _tmp_pwd_enter.png 渲染图确认):
 *   - 6 个密码槽位 (下划线占位 NT 渲染) + 6×8 假名网格 (48 OAM 精灵)
 *   - 光标在网格上移动 (A/B 选字符 → $0700), START 确认
 *   - 密码字符 6 个 = PASSWORD_CHAR_COUNT=6
 *
 * ⚠️ 校验子程序定位结论 (2026-08-21 逆向, 不编造):
 *   bank02 (asm/bank02/*.s) 与 bank00 (asm/bank00/*.s) 的已反汇编段中,
 *   $82E8/$8338/$83A3 只做「读 ram_0057 分发 + 动画」, 未包含 6 字符
 *   校验和计算 (ADC/XOR/ROL 循环) 与「置 ram_0057=$81」的写回。
 *   - 唯一 3 处写 ram_0057: bank0 $8895 (JSR $8895 内部) + bank11 $8646/$866C
 *     (地图绘制临时变量, 非密码标记)
 *   - 6 处 JSR $8895 调用者: bank2 $877B (LDA #$80 失败出口) / $87CF
 *     (LDA #$81 成功出口) / $8607 (LDA #$30 场景 0x30) / $861D (LDA #$20 场景 0x20)
 *   - 无任何代码 JSR/JMP $A7CF 或 $A77B (成功/失败出口), 校验必通过分发表间接
 *     跳转 (idx17=$A77A 滑入失败, idx21=$A7CE=前一字节 RTS 邻接成功)
 *   - 真实输入 trace (_tmp_trace_pwd5.cjs): 16 槽位 A/RIGHT 按键 0468 全 $f8
 *     (未填字符), 0700 仍 $00, START 路径 $8445→JMP $8053 (bank0 通用场景流程)
 *   - $A454 (光标移动) 只更新 $0559/$055D (位置), 不写 $0468
 *   - $0468 是 OAM 假名网格位置数据 (不写字符), $0700 承载当前选中字符
 *   - 校验子程序位于 $A3D8-$A454 或 $A464-$A491 等未反汇编 .byte 段中,
 *     需更深度的未反汇编段分析或 trace 真实密码输入流程定位。
 *
 * 当前占位 (基于 6 槽位真实模型, 形态守卫避免假密码通过):
 *   - 6 槽位必须全部输入过 (非初始 0) 才可确认
 *   - 具体校验和算法待校验子程序定位后接入; 在此之前一律返回 false,
 *     避免「假密码通过」产生误导。
 */
private _verifyPassword(): boolean {
  // 6 槽位必须全部输入过 (非初始 0) 才可确认
  for (let i = 0; i < PASSWORD_CHAR_COUNT; i++) {
    if (this._chars[i] === 0) return false;
  }
  // 校验子程序未定位前不编造算法: 一律判定失败, 等待真实算法接入。
  return false;
}

  /**
   * 续关载入动画 — 对应 $83A3 (校验通过后 ram_0057=$81 → BEQ $83A3)。
   *
   * 逐条 6502→TS (bank02, asm 基址 $8000 ↔ 运行时 $A000 +0x2000):
   *   $83A3: LDA $0568; ORA #$10; STA $0568   ; ram_0568 |= $10 (续关标记)
   *   $83AB: LDA #$04; JSR $9FA8              ; 让出 4 帧
   *   $83B0: LDA #$08; STA $0044; STA $0046   ; 滚动 X/Y 增量 = 8
   *   $83B6: LDA $056D; SEC; SBC #$04; STA $056D ; ram_056D -= 4
   *   $83BF: LDA #$04; JSR $9FA8              ; 让出 4 帧
   *   $83C4: LDA #$00; STA $0044              ; ram_0044 = 0
   *   $83C8: LDA #$F8; STA $0046              ; ram_0046 = $F8 (-8)
   *   $83CC: LDA $056D; CLC; ADC #$04; STA $056D ; ram_056D += 4
   *   $83D5: JMP $A3AB                        ; 循环回 $83AB (持续滚动)
   *
   * 注: $9FA8 为「让出 N 帧」辅助 (非本 bank 逻辑), 此处以帧推进体现;
   * 调用方应在每帧驱动该滚动, 直到外部切换场景。
   */
  playContinueLoadAnimation(): void {
    const s = this._store;
    // ram_0568 |= $10 — 标记已进入续关载入
    s.write('ram_0568', s.read('ram_0568') | 0x10);
    // 滚动位移: ram_0044 (X 滚动) 与 ram_0046 (Y 滚动)
    s.write('ram_0044', 0x08);
    s.write('ram_0046', 0x08);
    // ram_056D 滚动帧推进: -= 4 (此值由 View/滚动系统每帧消费)
    s.write('ram_056D', (s.read('ram_056D') - 4) & 0xff);
    // 第二阶段反向滚动
    s.write('ram_0044', 0x00);
    s.write('ram_0046', 0xf8);
    // ram_056D += 4
    s.write('ram_056D', (s.read('ram_056D') + 4) & 0xff);
  }

  /** 是否已完成 */
  isDone(): boolean { return this._done; }

  /** 当前槽位索引 */
  getCharIdx(): number { return this._charIdx; }

  /** 已输入字符 */
  getChars(): number[] { return this._chars.slice(); }

  /** 当前显示状态快照 (View 层消费, 写 NT/OAM) */
  getDisplayState(): PasswordDisplayState {
    return {
      charIdx: this._charIdx,
      chars: this._chars.slice(),
      done: this._done,
      charCount: PASSWORD_CHAR_COUNT,
      cols: PASSWORD_COLS,
      charset: PASSWORD_CHARSET,
      result: this._result,
    };
  }
}
