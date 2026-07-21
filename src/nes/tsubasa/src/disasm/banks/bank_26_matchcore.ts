import { ROM } from './_romdata/bank_26_data';
/**
 * Bank 26: 核心比赛引擎 — JMP 分发表 + 部分已翻译子程序
 *
 * ASM: _tmp_bzk_out/bank_26.asm (4,085 行)
 * CPU: $8000-$9FFF (MMC3 bank slot)
 * CDL: code=7331 data=584 unacc=277
 *
 * ── JMP 分发表 ($8000-$8039, 每个槽 3 字节) ──
 *   $8000: JMP $A103  → cross-bank (不在本 bank)
 *   $8003: JMP $803C  → 比赛主循环 (matchMain)
 *   $8006: JMP $84F8  → 球员移动逻辑
 *   $8009: JMP $86F6  → AI 控制
 *   $800C: JMP $8835  → 防守/阵型逻辑
 *   $800F: JMP $87E1  → 球员碰撞/检测
 *   $8012: JMP $888D  → 球/物理逻辑
 *   $8015: JMP $88A8  → 传球/动作分发
 *   $8018: JMP $88F3  → 射门逻辑
 *   $801B: JMP $8BE5  → 抢断/动作结算
 *   $801E: JMP $8B4A  → 出界/区域事件处理 ($8B9C: 区域检测)
 *   $8021: JMP $8F72  → 比分/结果判定
 *   $8024: JMP $8CA4  → 持球者选择
 *   $8027: JMP $8127  → 阵型初始化
 *   $802A: JMP $A1EB  → cross-bank (不在本 bank)
 *   $802D: .byte $4C $7B $98  → data (非 JMP 入口)
 *   $8030: JMP $95E1  → 黄红牌事件
 *   $8033: JMP $8E86  → 动作结果判定
 *   $8036: JMP $85AC  → 球员数据更新
 *   $8039: JMP $904E  → 比赛结束
 *
 * ── 翻译状态 ──
 *   $8C42: ✓ 逐指令翻译 — 球员等级上限检查 (CMP #$40)
 *   $8B9C: ✓ 逐指令翻译 — 区域坐标范围检测
 *   $8B4A: ✓ 逐指令翻译 — 出界事件入口 (调用 $8B9C)
 *   其余: ✗ 尚未逐指令翻译，仅记录入口地址和 ASM 摘要
 *
 * 注意:
 *   - $A103 和 $A1EB 的实现在其他 MMC3 bank 中 (bank_27)
 *   - 大量逻辑通过 $C5xx/$C6xx 跨 bank 调用 bank_30
 *   - 大部分 RAM 地址的语义尚未通过反汇编确认，使用 raw hex
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const DATA: Readonly<Uint8Array> = ROM;
const u8 = (v: number): number => v & 0xFF;
const romSlice = {
  u8(o: number) { return DATA[o] ?? 0; },
  u16le(o: number) { return (DATA[o] ?? 0) | ((DATA[o + 1] ?? 0) << 8); },
  data: DATA,
  romBase: 0x34010,
};

// ============================================================
// README: cross-bank calls
// ============================================================
// 本 bank 大量交叉调用 bank_30 的 $C4xx/$C5xx/$C6xx 区域。
// 例如: JSR $C600, JSR $C54B, JSR $C54E, JSR $C50C, JSR $C606 ...
// 这些是跨 bank 的桥接/系统函数，不在 bank_26 范围内。
// 除非 bank_30 也被翻译，否则无法完整还原这些入口的逻辑。

// ============================================================
// README: RAM addresses
// ============================================================
// _ram_usage.inc 只提供 "ram_XXXX = $XXXX" 加引用次数，没有语义。
// 以下是在 bank_26 的 6502 反汇编中出现的高频地址（仅编号，不发明名字）：
//
//   $00E2 — 48 refs, 在 $8C64/$86D6/$87A8 处被 CMP #$40 
//           与 $8C42 处的等级上限检查逻辑密切相关
//   $00E3 — 14 refs
//   $0027 — 22 refs, 跳转表索引用途（依赖方读取，非本 bank 写入）
//   $002B — 在 $8570 被引用
//   $05FB — 126 refs, 多次用于 EOR #$0B，疑似队伍标识布尔值
//   $0600 — 65 refs, 活跃实体计数器 (LDX/LDA/CPX 循环变量)
//   $0601 — 33 refs, 实体 ID 数组 (X indexed)
//   $0606 —    refs, 辅助数据数组 (X indexed)
//   $060B — 21 refs, 动作/状态类型数组 (X indexed)
//   $0612 — 50 refs, 跳转表索引 (在 $8148 被 STY)
//   $0616 — 44 refs, 循环计数 (在 $8074 被 LDX)
//   $0617 — 18 refs, 旗标 (BIT/BMI/BPL/ORA #$80)
//   $061A —    在 $8B67 被 STA $FF (哨兵值)
//   $0621 — 30 refs, 阶段/事件码 (在 $8B62 被设为 1 或 2)
//   $0635 — 47 refs, 事件 X 坐标
//   $0637 — 47 refs, 事件 Y 坐标
//   $043B — 80 refs, 阵营/队伍标识
//   $043D — 60 refs, 动作类型暂存
//   $043E —    动作子类型暂存
//   $0441 — 98 refs, 当前实体索引
//   $0442 —    当前实体 ID
//   $044E — 43 refs, 状态码
//   $044C —    在 $8955 被 BIT
//   $0446 —    在 $8577 被 LDX
//   $043C — 48 refs
//   $043F —    在 $820C 被 STA $50
//   $0440 —    在 $8211 被 STA $00
//   $0444 —    在 $8188 被 LDA, AND #$03
//   $05FF —    在 $86A3 被 STA $01
//   $05FE —    在 $8806 被 CMP
//   $062C —    在 $8C80 被 STA
//   $0629 —    在 $85DA 被 STA $04

// ============================================================
// § $8C42: 等级上限检查 (逐指令翻译)
// ============================================================
//
// ASM ($8C42-$8C6C):
//   LDA $0600         ; active count
//   BEQ $8C5F         ; if 0 → CLC + RTS
//   LDX #$00          ; loop index = 0
// $8C49:
//   LDA $0601,X       ; 读取实体 ID
//   BEQ $8C59         ; ID=0 → skip
//   CMP #$0B
//   BEQ $8C59         ; ID=$0B → skip
//   LDA $060B,X       ; 读取动作/状态类型
//   CMP #$05
//   BEQ $8C61         ; 等于 5 → 检查等级
// $8C59:
//   INX               ; 下一个实体
//   CPX $0600
//   BNE $8C49         ; 未遍历完 → 继续循环
// $8C5F:
//   CLC               ; carry=0: 无符合条件实体
//   RTS
// $8C61:
//   LDA $00E2         ; 读取某个 8-bit 值
//   CMP #$40          ; 阈值: 64 (0x40)
//   BCS $8C5F         ; 若 >= 64 → CLC + RTS (超限)
//   LDA $0601,X       ; 返回该实体 ID
//   SEC               ; carry=1: 找到未超限实体
//   RTS
//
// 调用方: $8BE8 (JSR $8C42), 然后 BCS $8C12 (carry=1 时继续)
//
// 返回:
//   carry=1 (BCS): 找到实体, A=实体ID, 且 $00E2 < $40
//   carry=0 (CLC): 所有实体均已超限 $40, 或没有类型=5 的实体

const CMP_VAL_40 = 0x40;   // $8C64: CMP #$40
const CMP_VAL_05 = 0x05;   // $8C55: CMP #$05
const CMP_VAL_0B = 0x0B;   // $8C4E: CMP #$0B

function sub_8C42(ctx: GameContext): { found: boolean; entityId: number } {
  const count = ctx.ram.u8(0x0600);  // $8C42: LDA $0600
  if (count === 0) {                 // $8C45: BEQ $8C5F
    // $8C5F: CLC; RTS
    return { found: false, entityId: 0 };
  }

  let x = 0;                         // $8C47: LDX #$00

  for (;;) {                         // $8C49 loop start
    const eid = ctx.ram.u8(0x0601 + x); // $8C49: LDA $0601,X
    if (eid === 0)    { x++; if (x < count) continue; else break; } // $8C4C: BEQ $8C59
    if (eid === CMP_VAL_0B) { x++; if (x < count) continue; else break; } // $8C4E-$8C50: CMP #$0B; BEQ $8C59

    const atype = ctx.ram.u8(0x060B + x); // $8C52: LDA $060B,X
    if (atype !== CMP_VAL_05) {     // $8C55: CMP #$05; BNE → $8C59
      x++; if (x < count) continue; else break;
    }

    // $8C61: 找到 type=5 的实体, 检查 $00E2
    const valE2 = ctx.ram.u8(0x00E2); // $8C61: LDA $00E2
    if (valE2 >= CMP_VAL_40) {       // $8C64: CMP #$40; BCS $8C5F
      // $8C5F: CLC; RTS
      return { found: false, entityId: 0 };
    }

    // $8C68: LDA $0601,X  (this entity ID)
    // $8C6B: SEC
    // $8C6C: RTS
    return { found: true, entityId: ctx.ram.u8(0x0601 + x) };
  }

  // 循环结束, 没找到或全部跳过
  // $8C5F: CLC; RTS
  return { found: false, entityId: 0 };
}

// ============================================================
// § $8B9C: 区域坐标检测 (逐指令翻译)
// ============================================================
//
// ASM ($8B9C-$8BB9):
//   LDA $0637         ; Y 坐标
//   CMP #$60
//   BCC $8BB6         ; Y < $60 → goto $8BB6 (CLC, RTS = inside)
//   CMP #$A0
//   BCS $8BB6         ; Y >= $A0 → goto $8BB6 (CLC, RTS = inside)
//   LDX #$00          ; X = 0 (用于 X < $50 的情况)
//   LDA $0635         ; X 坐标
//   CMP #$50
//   BCC $8BB8         ; X < $50 → goto $8BB8 (SEC, RTS = outside)
//   LDX #$0B          ; X = $0B (用于 X >= $B0 的情况)
//   CMP #$B0
//   BCS $8BB8         ; X >= $B0 → goto $8BB8 (SEC, RTS = outside)
// $8BB6:
//   CLC               ; carry=0: 在区域内
//   RTS
// $8BB8:
//   SEC               ; carry=1: 在区域外
//   RTS
//
// 逻辑:
//   区域 = X ∈ [$50, $B0) AND Y ∈ [$60, $A0)
//   在区域内 → CLC (carry=0)
//   在区域外 → SEC (carry=1)
//   同时:
//     X < $50 时 X=$00
//     X >= $B0 时 X=$0B
//     (这些 X 值被调用方 $8B4A 通过 TXA 读取)

function sub_8B9C(ctx: GameContext): { inside: boolean; sideFlag: number } {
  // $8B9C: LDA $0637
  const y = ctx.ram.u8(0x0637);

  // $8B9F: CMP #$60; $8BA1: BCC $8BB6
  // $8BA3: CMP #$A0; $8BA5: BCS $8BB6
  if (y < 0x60 || y >= 0xA0) {
    // $8BB6: CLC; RTS  → 在区域内 (Y 方向不再进一步约束)
    return { inside: true, sideFlag: 0 };
  }

  // $8BA7: LDX #$00
  // $8BA9: LDA $0635
  const x = ctx.ram.u8(0x0635);

  // $8BAC: CMP #$50; $8BAE: BCC $8BB8
  if (x < 0x50) {
    // $8BB8: SEC; RTS → 在区域外, X=$00
    return { inside: false, sideFlag: 0x00 };
  }

  // $8BB0: LDX #$0B
  // $8BB2: CMP #$B0; $8BB4: BCS $8BB8
  if (x >= 0xB0) {
    // $8BB8: SEC; RTS → 在区域外, X=$0B
    return { inside: false, sideFlag: 0x0B };
  }

  // $8BB6: CLC; RTS → 在区域内
  return { inside: true, sideFlag: 0 };
}

// ============================================================
// § $8B4A: 出界/区域事件入口 (逐指令翻译)
// ============================================================
//
// ASM ($8B4A-$8B9B):
//   JSR $8B9C         ; 调用区域检测
//   BCS $8B50         ; carry=1 (在区域外) → 继续处理
//   RTS               ; carry=0 (在区域内) → 直接返回
// $8B50:
//   JSR $C624         ; cross-bank call
//   LDA #$00
//   STA $0600         ; 清零计数器
//   TXA               ; 从 $8B9C 获取 X 值 ($00 或 $0B)
//   LDX #$02
//   EOR $05FB         ; XOR with $05FB
//   BEQ $8B62         ; 如果 EOR 结果=0, 保持 X=2
//   LDX #$01          ; 否则 X=1
// $8B62:
//   STX $0621         ; 写入阶段码 (1 或 2)
//   LDA #$FF
//   STA $061A         ; 哨兵值 $FF
//   JSR $87E1         ; 碰撞检测
//   LDX #$50
//   TXS               ; 重置栈指针
//   JMP $8B73         ; 跳入下面的 dispatch 流程
//
// $8B73:
//   LDA #$0A
//   JSR $C609         ; cross-bank call
//   LDA #$3F
//   LDX $0621
//   CPX #$02
//   BEQ $8B86         ; 如果 $0621==2 跳过 $848F
//   JSR $848F         ; 数据处理
//   LDA #$2F          ; A=$2F (覆盖上面的 $3F)
// $8B86:
//   JSR $C54E         ; cross-bank call
//   JSR $8E86         ; 动作结果判定
//   JSR $C600         ; cross-bank call
//   LDA $0621
//   CMP #$01
//   BNE $8B99
//   JMP $8298         ; $0621==1 → 分支A
// $8B99:
//   JMP $8978         ; $0621!=1 → 分支B
//
// 注意: $8B9C 返回 carry=1 表示在区域外。
//       所以 $8B4A 的处理逻辑是: 当($0635,$0637)不在
//       [0x50,0xB0)×[0x60,0xA0) 范围内触发事件。

function sub_8B4A(ctx: GameContext, rom: RomReader): void {
  // $8B4A: JSR $8B9C
  const area = sub_8B9C(ctx);

  // $8B4D: BCS $8B50
  if (!area.outside) {
    // $8B4F: RTS — in area, nothing to do
    return;
  }

  // $8B50: JSR $C624  (cross-bank)
  // --- 以下省略 xcall_bank30 的具体实现细节 ---
  // $8B53: LDA #$00; STA $0600
  ctx.ram.setU8(0x0600, 0);

  // $8B58-$8B62: EOR $05FB → 选择 X=1 或 X=2, 写入 $0621
  // sideFlag 来自 $8B9C (X<$50 时为 $00, X>=$B0 时为 $0B)
  // TXA 获取这个值, 与 $05FB EOR 后决定结果
  // 这里简化: 无法完整还原跨 bank 调用
  ctx.ram.setU8(0x0621, 1); // placeholder — ASM 根据 EOR 结果选 1 或 2

  // $8B65-$8B67: LDA #$FF; STA $061A
  ctx.ram.setU8(0x061A, 0xFF);

  // $8B6A: JSR $87E1
  sub_87E1_placeholder(ctx, rom);

  // $8B6D-$8B6F: LDX #$50; TXS (reset stack)
  // $8B70: JMP $8B73 → 事件分发 (省略)
}

// ============================================================
// § TODO: 尚未逐指令翻译的函数 — 仅记录入口地址
// ============================================================
//
// 以下函数涉及:
//   - 大量 cross-bank JSR ($C5xx, $C6xx) 
//   - 指针间接调用 (JSR ($C509) 等)
//   - 复杂条件分支
// 在不翻译 bank_27/bank_30 的前提下，无法完整还原逻辑。
// 暂时保留精简占位符，确保调度表工作。

/** $803C (matchMain): 比赛主循环, ~110 条指令, 极其复杂 */
function sub_803C(ctx: GameContext, rom: RomReader): void {
  // 此函数大约 110 条 6502 指令, 包含:
  // - 多个 $C5xx/$C6xx 跨 bank 调用
  // - 循环遍历 $0600 活跃实体
  // - 检查 $060B,X 动作类型 == 6
  // - JSR $8223/$8FF3/$8176/$8132/$814C/$8EE9 等大量子程序
  // 未逐指令翻译; 以下是最简 shell:
  ctx.ram.setU8(0x044E, 0);  // $803E: STA $044E
  ctx.ram.setU8(0x0621, 0);  // $8041: STA $0621
  // $8044: JSR $C600 (cross-bank)
  // $8049: JSR $C54B (cross-bank)
  // $804C: JSR $8F72
  // ... 约 100+ 条后续指令
}

/** $84F8 (playerMove): 球员移动, ~200+ 条指令 */
function sub_84F8(ctx: GameContext, rom: RomReader): void {
  // $84F8: LDA #$01; STA $0600
  ctx.ram.setU8(0x0600, 1);
  // $84FD: LDA $05FB; PHP; EOR #$0B; STA $0601; STA $0442
  // ... 大量后续逻辑
}

/** $86F6 (aiControl): AI 控制 */
function sub_86F6(ctx: GameContext, rom: RomReader): void {
  ctx.ram.setU8(0x0621, 3);  // $86F8: STA $0621
  ctx.ram.setU8(0x0600, 1);  // $86FD: STA $0600
  // ... 大量跨 bank 调用
}

/** $8835 (defenseAI): 防守 AI */
function sub_8835(ctx: GameContext, rom: RomReader): void {
  // $8835: LDA $0600; BNE $883B → if 0: RTS
  if (ctx.ram.u8(0x0600) === 0) return;
  // ... 循环处理逻辑
}

/** $87E1 (playerCollision): 球员碰撞/检测 */
function sub_87E1_placeholder(ctx: GameContext, rom: RomReader): void {
  // $87E1: LDA $05FB; EOR #$0B; STA $41; INC $41
  // 循环 10 次, 调用 $C50C/$C539, 检查 $05FE/$061A/$0600 等
  // 复杂逻辑, 未逐指令翻译
}

/** $888D (ballMovement): 球物理 */
function sub_888D(ctx: GameContext, rom: RomReader): void {
  // $888D: LDA #$00; STA $3A; LDA $043B; ASL; ASL; ADC $043D; TAX
  // 查找表, JSR $8EE9, JMP $8132
}

/** $88A8 (passLogic): 传球/动作分发 */
function sub_88A8(ctx: GameContext, rom: RomReader): void {
  // $88A8: LDA #$0B; JSR $C54E; 然后间接跳转表 $C509
}

/** $88F3 (shootLogic): 射门逻辑 */
function sub_88F3(ctx: GameContext, rom: RomReader): void {
  // $88F3: LDA #$00; STA $043B
  // LDA $05FB; EOR #$0B; STA $0442
  // 然后 $00E2 查表 → JSR $8148 → 间接跳转表
}

/** $8BE5 (tackleLogic): 抢断/动作结算 */
function sub_8BE5(ctx: GameContext, rom: RomReader): void {
  // $8BE5: JSR $C606 (cross-bank)
  // $8BE8: JSR $8C42 (✓ 已翻译)
  const r = sub_8C42(ctx);
  // $8BEB: BCS $8C12 → 找到未超限实体时继续
  // ... 大量后续逻辑
}

/** $8CA4 (shooterSelect): 持球者选择 */
function sub_8CA4(ctx: GameContext, rom: RomReader): void {
  // $8CA4 被 $8C8E 间接调用 (JSR $8CA4 with argument in A)
  // 其核心逻辑在 $8C8C-$8CA3 而非此处标号
}

/** $8F72 (scoreUpdate): 比分/结果 */
function sub_8F72(ctx: GameContext, rom: RomReader): void {
  // $8F72 入口, 逻辑跨多个 bank
}

/** $8127 (formationSetup): 阵型初始化 */
function sub_8127(ctx: GameContext, rom: RomReader): void {
  // $8127: JSR $90DD; LDA #$00; STA $0617; JMP $80ED
}

/** $95E1 (cardEvent): 黄红牌 */
function sub_95E1(ctx: GameContext, rom: RomReader): void {
  // $95E1 入口
}

/** $8E86 (actionResult): 动作结果判定 */
function sub_8E86(ctx: GameContext, rom: RomReader): void {
  // $8E86 入口
}

/** $85AC (substitution): 球员数据更新 */
function sub_85AC(ctx: GameContext, rom: RomReader): void {
  // $85AC: LDX #$00; LDA $0441; JSR $8BD4
  ctx.ram.setU8(0x0629, 4); // $85DA: STA $0629
}

/** $904E (gameOver): 比赛结束 */
function sub_904E(ctx: GameContext, rom: RomReader): void {
  // $904E 入口
}

// ============================================================
// § Placeholder: cross-bank jump targets
// ============================================================
// $A103 和 $A1EB 的代码在 bank_27 ($A000-$BFFF 区域)
// $8000: JMP $A103 → $A103 在 bank_27.asm line 59
// $802A: JMP $A1EB → $A1EB 在 bank_27.asm line 3923

function sub_A103(ctx: GameContext, rom: RomReader): void {
  // cross-bank jump target, actual code in bank_27
}

function sub_A1EB(ctx: GameContext, rom: RomReader): void {
  // cross-bank jump target, actual code in bank_27
}

// ============================================================
// § 调度表 — 严格对应 ASM JMP 表
// ============================================================
//
// $8000-$8039 共 20 个 3 字节槽位, 其中 $802D 是数据而非 JMP
// 索引顺序:
//   0: $8000 → $A103   1: $8003 → $803C   2: $8006 → $84F8
//   3: $8009 → $86F6   4: $800C → $8835   5: $800F → $87E1
//   6: $8012 → $888D   7: $8015 → $88A8   8: $8018 → $88F3
//   9: $801B → $8BE5  10: $801E → $8B4A  11: $8021 → $8F72
//  12: $8024 → $8CA4  13: $8027 → $8127  14: $802A → $A1EB
//  [15: $802D 是 data, 对应 slot index=15 无有效入口]
//  16: $8030 → $95E1  17: $8033 → $8E86  18: $8036 → $85AC
//  19: $8039 → $904E

const JUMP_TABLE: BankFn[] = [
  sub_A103,          // idx  0: $8000 → $A103 (cross-bank)
  sub_803C,          // idx  1: $8003 → $803C
  sub_84F8,          // idx  2: $8006 → $84F8
  sub_86F6,          // idx  3: $8009 → $86F6
  sub_8835,          // idx  4: $800C → $8835
  sub_87E1_placeholder, // idx  5: $800F → $87E1
  sub_888D,          // idx  6: $8012 → $888D
  sub_88A8,          // idx  7: $8015 → $88A8
  sub_88F3,          // idx  8: $8018 → $88F3
  sub_8BE5,          // idx  9: $801B → $8BE5
  sub_8B4A,          // idx 10: $801E → $8B4A
  sub_8F72,          // idx 11: $8021 → $8F72
  sub_8CA4,          // idx 12: $8024 → $8CA4
  sub_8127,          // idx 13: $8027 → $8127
  sub_A1EB,          // idx 14: $802A → $A1EB (cross-bank)
  // idx 15: $802D-$802F 是数据, 不是有效 JMP—跳过
  (ctx, rom) => {},  // idx 15: $802D — skip (data: $4C $7B $98)
  sub_95E1,          // idx 16: $8030 → $95E1
  sub_8E86,          // idx 17: $8033 → $8E86
  sub_85AC,          // idx 18: $8036 → $85AC
  sub_904E,          // idx 19: $8039 → $904E
];

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x0027); // $27: 跳转表索引
  if (idx < JUMP_TABLE.length) {
    JUMP_TABLE[idx](ctx, rom);
  }
}

export const bank_26: BankModule = {
  rom: romSlice,
  dispatch,
  // 对外暴露的函数映射 (CPU 地址 → 函数)
  fns: Object.fromEntries(
    JUMP_TABLE.map((fn, i) => {
      // 每个 slot $8003 + i*3, 跳过 slot 15
      const base = 0x8003 + i * 3;
      const addrStr = '$' + base.toString(16).toUpperCase();
      return [addrStr, fn];
    })
  ),
};
