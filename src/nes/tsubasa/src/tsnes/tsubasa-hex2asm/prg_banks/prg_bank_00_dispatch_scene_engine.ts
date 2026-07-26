/**
 * PRG-ROM MMC3 bank 00 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 *
 * 功能: 系統主分派器 + 場景狀態機 + 腳本處理器 + 任務調度器
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */

import { asm } from '../_6502asm';
// import type { CpuCtx } from '../_cpu_ctx';

export { _PRG_BANK_00 as default };

console.log('[prg_00_dispatch_scene_engine] loaded');

// ════════ $800D-$8016: 跳转向量表 (5个子程序地址, 小端字节序) ═══════=
/** 原始 hex 版本 */
function buildjumpVectors(): readonly number[] {
  return asm`
    .dw $8165, $818A, $81AD, $81B4, $81DA
  `;
}

/** 跳转向量表 — 纯数据版本 (供 TS handler 直接用) */
const JUMP_VECTORS: readonly number[] = [0x8165, 0x818A, 0x81AD, 0x81B4, 0x81DA];

// ════════ $8166-$818A: 场景入口 0 — CPU 控球 ═══════=
/** 设置 $27=1, 检查 $26 vs $E4, 必要时调用 8464/82B5 */
function buildsceneEntry0(): readonly number[] {
  return asm`
    .org $8166
    LDA #$01
    STA $27
    JSR $C56C
    JSR $8285
    LDA $26
    CMP $E4
    BEQ @ret
    BCC @ret
    STA $E4
    LDX $0026
    LDA $83FE,X
    BEQ @ret
    JSR $8464
    JSR $82B5
  @ret:
    JMP $8017
  `;
}

// ════════ $818B-$81AD: 场景入口 1 — 上半场检查 ═══════=
/** 比较 $28/$29, 查表 $83BA, 设 $27=2 或跳 $81E6/$81D4/$8206 */
function buildsceneEntry1(): readonly number[] {
  return asm`
    .org $818B
    LDA $28
    CMP $29
    BEQ @check
    BCS $8206
    JMP $81E6
  @check:
    LDX $26
    LDA $83BA,X
    BEQ $81E6
    CMP #$01
    BEQ $81D4
    LDA #$02
    STA $27
    JSR $C56C
    JSR $8285
    JMP $8017
  `;
}

// ════════ $81AE-$81B4: 场景入口 2 — 下半场 ═══════=
/** 直接设 $27=3, 跳回主循环 */
function buildsceneEntry2(): readonly number[] {
  return asm`
    .org $81AE
    LDA #$03
    STA $27
    JMP $8017
  `;
}

// ════════ $81B5-$81DA: 场景入口 3 — 加时赛/点球判定 ═══════=
/** 比较 $28/$29, 查表 $83BA, 可能设 $27=4 或回到 $80FD */
function buildsceneEntry3(): readonly number[] {
  return asm`
    .org $81B5
    LDA $28
    CMP $29
    BEQ @check
    BCS $8206
    JMP $81E6
  @check:
    LDX $26
    LDA $83BA,X
    CMP #$03
    BEQ @set4
    LDA $26
    CMP #$20
    BNE @done
    INC $26
  @done:
    JMP $80FD
  @set4:
    LDA #$04
    STA $27
    JMP $8017
  `;
}

// ════════ $81DB-$81E5: 场景入口 4 — 通用处理 ═══════=
/** 比较 $28/$29, 跳入共享处理 $81E6 或 $8206 */
function buildsceneEntry4(): readonly number[] {
  return asm`
    .org $81DB
    LDA $28
    CMP $29
    BEQ $81E6
    BCS $8206
    JMP $81E6
  `;
}

// ════════ $8000-$800C: 跳转表分派 (按$27索引跳转到子程序) ═══════=
/** 原始 hex 版本 — 6502 CPU 执行 */
function builddispatch(): readonly number[] {
  return asm`
    LDA $27
    ASL A
    TAX
    LDA $800E,X
    PHA
    LDA $800D,X
    PHA
    RTS
  `;
}

/**
 * TS 版本 — 直接消化 6502 指令
 * 等效 6502: LDA $27 → ASL → TAX → 查跳转表 → PHA;PHA → RTS
 * 直接 setPC(addr) 效果完全等于那 7 条指令执行完。
 */
/**
 * 根据内存地址 0x27 中存储的索引值，从跳转向量表中查找对应的目标地址，并将程序计数器设置为该地址以实现场景调度分发
 * @param {CpuCtx} ctx - CPU 上下文对象，提供内存读取和程序计数器设置接口
 * @returns {void}
 * @throws 当索引值超出 JUMP_VECTORS 范围时，addr 将为 0，可能导致程序计数器被设置为无效地址
 */
// export function tsDispatch(ctx: CpuCtx): void {
//   const idx = ctx.load(0x27);
//   const addr = JUMP_VECTORS[idx] ?? 0;
//   ctx.setPC(addr);
// }

// ════════ $8017-$82EC: 场景状态机主循环 ═══════=
function buildsceneLoop(): readonly number[] {
  return [
    ...entry1(),
    ...buildsceneEntry0(),
    ...buildsceneEntry1(),
    ...buildsceneEntry2(),
    ...buildsceneEntry3(),
    ...buildsceneEntry4(),
    ...outentry()
  ];
}

function entry1() : readonly number[]{
 return asm`
    .org $8017
    ; ---- main loop entry ----
  @main:
    LDX #$02
    JSR $C4B9
    JMP $A203
    JSR $9BA0
    LDA #$00
    JSR $8464
    ; ---- wait for PPU vblank ----
  @wait_ppu:
    LDA #$01
    JSR $9FA8
    LDA $1E
    AND #$10
    BEQ @wait_ppu
    LDA #$00
    STA $05
    STA $06
    STA $09
    STA $0A
    STA $11
    STA $12
    STA $0D
    STA $0E
    STA $4C
    STA $5B
    LDA #$01
    STA $0700
    LDA $1B
    AND #$01
    BNE @after_init
    JSR $9B11
    LDA #$02
    JSR $9FA8
    JSR $9B7F
    JSR $98A0
    LDA #$0D
    JSR $8297
    LDA #$00
    STA $7B
    LDA #$17
    JSR $8AF7
    LDA #$30
    JSR $890C
    JSR $88FB
    JSR $9A35
    ; ---- after init / new game check ----
  @after_init:
    LDA #$00
    JSR $8920
    LDA #$00
    STA $90
    LDA #$02
    STA $91
    LDA $1B
    AND #$FE
    STA $1B
    LDA #$0A
    STA $ED
    ; ---- per-frame main tick ----
  @main_tick:
    LDA $ED
    STA $E6
    LDA #$22
    STA $E7
    LDY #$01
    LDX #$01
    LDA #$7F
    JSR $98EA
    ; ---- wait for controller input ----
  @input_wait:
    LDA #$01
    JSR $9FA8
    LDA $1E
    AND #$3C
    BEQ @input_wait
    ASL A
    ASL A
    BMI @press_up
    ASL A
    BMI @press_confirm
    ASL A
    AND #$40
    ORA #$0A
    JMP @apply_input
    ; ---- up pressed ----
  @press_up:
    LDA $ED
    EOR #$40
    ; ---- apply input to menu ----
  @apply_input:
    STA $ED
    LDA #$0A
    STA $E6
    LDA #$22
    STA $E7
    LDY #$03
    LDX #$01
    JSR $98E8
    JMP @main_tick
    ; ---- confirm/right pressed ----
  @press_confirm:
    LDA $1C
    AND #$C0
    CMP #$C0
    BNE @check_flag
    JMP $A209
    ; ---- check $E0 flag ----
  @check_flag:
    BIT $ED
    BVC @do_tick
    JMP $826A
    ; ---- scene tick: call 8464/82B5 ----
  @do_tick:
    JSR $9BA0
    LDA #$01
    JSR $8464
    JSR $82B5
    LDA #$C0
    STA $E0
    LDX #$02
    JSR $C4B9
    JSR $A20F
    ; ---- reset scene vars ($27=0 etc) ----
  @reset_scene:
    LDA #$00
    STA $28
    STA $29
    STA $27
    LDA #$01
    STA $0700
    LDX #$02
    JSR $C4B9
    JSR $A20C
    LDA #$00
    JSR $8920
    LDX #$01
    JSR $C4B9
    JSR $A006
    JSR $C572
    LDX #$55
    LDA $26
    CMP #$20
    BCC @set_music
    LDX #$4C
    ; ---- set BGM track ----
  @set_music:
    STX $0700
    LDA #$00
    STA $0450
    STA $0451
    STA $0452
    STA $0453
    LDX #$01
    JSR $C4B9
    JSR $A009
    BIT $E0
    BMI @check_event
    LDA $E4
    CMP $26
    BCS @loop_back
    ; ---- check event/BGM flags ----
  @check_event:
    LDX $0026
    LDA $83DC,X
    BEQ @loop_back
    JSR $8464
    JSR $82B5
    LDA $E0
    AND #$7F
    STA $E0
    ; ---- back to main loop ----
  @loop_back:
    JMP @main
  `;
}


function buildscriptEngine(): readonly number[] {
  
  return [
    0x20, 0x8A, 0x83, 0xA5, 0x4C, 0x10, 0xF9, 0x0A, 0xAA, 0xBD, 0x00, 0xB8, 0x85, 0xEC, 0xBD, 0x01,
    0xB8, 0x85, 0xED, 0xA0, 0x00, 0xB1, 0xEC, 0x30, 0x4F, 0x85, 0xE9, 0xA9, 0x01, 0x85, 0xEB, 0xA4,
    0xEB, 0xB1, 0xEC, 0xC9, 0xFE, 0xF0, 0xF4, 0xC9, 0xFF, 0xF0, 0x6B, 0x85, 0xEA, 0xA6, 0xE9, 0xA9,
    0x03, 0x85, 0xEB, 0xC8, 0xE8, 0xB1, 0xEC, 0xF0, 0x03, 0x9D, 0x2A, 0x06, 0xC6, 0xEB, 0xD0, 0xF3,
    0xC8, 0x84, 0xEB, 0xA9, 0x20, 0x18, 0x6D, 0x28, 0x06, 0xC9, 0x3D, 0x90, 0x0A, 0x20, 0x8A, 0x83,
    0xA5, 0x4C, 0x30, 0xEF, 0x4C, 0x83, 0x83, 0x20, 0x43, 0x9A, 0x20, 0x8A, 0x83, 0xA5, 0x4C, 0x10,
    0x35, 0xC6, 0xEA, 0xD0, 0xF5, 0x4C, 0x0C, 0x83, 0x29, 0x01, 0x85, 0xE9, 0xA9, 0x01, 0x85, 0xEB,
    0xA4, 0xEB, 0xB1, 0xEC, 0xC9, 0xFE, 0xF0, 0xF4, 0xC9, 0xFF, 0xF0, 0x1A, 0xA6, 0xE9, 0x95, 0x8E,
    0xC8, 0xB1, 0xEC, 0x85, 0xEA, 0xC8, 0x84, 0xEB, 0x20, 0x8A, 0x83, 0xA5, 0x4C, 0x10, 0x07, 0xC6,
    0xEA, 0xD0, 0xF5, 0x4C, 0x5D, 0x83, 0xA9, 0x00, 0x85, 0x4C, 0x4C, 0xED, 0x82, 0xA2, 0x02, 0x20,
    0xB9, 0xC4, 0x20, 0x15, 0xA2, 0xA2, 0x06, 0x20, 0xB9, 0xC4, 0x60,
  ];
}

 
function builddataTables(): readonly number[] {
  return [
    0x00, 0x00, 0x02, 0x02, 0x04, 0x04, 0x06, 0x06, 0x08, 0x08, 0x0A, 0x0A, 0x0C, 0x0C, 0x0E, 0x0E,
    0x10, 0x10, 0x12, 0x12, 0x14, 0x14, 0x16, 0x17, 0x17, 0x19, 0x19, 0x1B, 0x1B, 0x1D, 0x1D, 0x1F,
    0x1F, 0x1F, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x03, 0x03, 0x03,
    0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x00, 0x03, 0x03, 0x03,
  ];
} 

function buildsceneTables(): readonly number[] {
  
  return [
    0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x02, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0x00,
    0x00, 0x00, 0x0C, 0x0E, 0x00, 0x00, 0x10, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x18, 0x00, 0x00, 0x00, 0x00, 0x1E, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x00, 0x03, 0x04, 0x05, 0x00,
    0x06, 0x00, 0x00, 0x00, 0x00, 0x0B, 0x0D, 0x00, 0x00, 0x00, 0x11, 0x00, 0x00, 0x14, 0x00, 0x00,
    0x00, 0x00, 0x16, 0x00, 0x17, 0x00, 0x00, 0x1A, 0x1B, 0x1C, 0x1D, 0x1F, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0x00, 0x13, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x15, 0x00, 0x00, 0x00, 0x00, 0x19, 0x00, 0x00, 0x00, 0x00, 0x00, 0x22, 0x22,
    0xA0, 0x00, 0xC8, 0xC8, 0xD9, 0xEE, 0x8A, 0xB0, 0xF9, 0x38, 0xF9, 0xEC, 0x8A, 0xBE, 0xED, 0x8A,
    0x0A, 0x69, 0x00, 0x85, 0x4D, 0xA9, 0x00, 0x69, 0xA0, 0x85, 0x4E, 0x86, 0x56, 0xA5, 0x25, 0x85,
    0xED, 0x20, 0xB9, 0xC4, 0xA0, 0x00, 0xB1, 0x4D, 0xAA, 0xC8, 0xB1, 0x4D, 0x85, 0x4E, 0x86, 0x4D,
    0xA2, 0x05, 0xA9, 0xC5, 0x95, 0x00, 0xA9, 0x84, 0x95, 0x01, 0xA0, 0x50, 0xA9, 0x00, 0x20, 0x69,
    0x9F, 0xA9, 0x00, 0x85, 0x0D, 0x85, 0x0E, 0xA9, 0x00, 0x8D, 0x52, 0x06, 0xA9, 0xE0, 0x85, 0xE6,
    0xA9, 0x23, 0x85, 0xE7, 0xA0, 0x01, 0xA2, 0x20, 0xA9, 0x55, 0x20, 0xEA, 0x98, 0xA6, 0xED, 0x4C,
    0xB9, 0xC4, 0xA6, 0x56, 0x20, 0xB9, 0xC4, 0xA9, 0x08, 0x85, 0x55, 0xA9, 0x49, 0x85, 0x4F, 0xA9,
    0x22, 0x85, 0x50, 0xA5, 0x4F, 0x85, 0x51, 0x29, 0x1F, 0x85, 0x54, 0xA5, 0x50, 0x85, 0x52, 0xA5,
    0x51, 0x85, 0x53, 0xA0, 0x00, 0xB1, 0x4D, 0xC9, 0xD8, 0xB0, 0x15, 0xA6, 0x52, 0xA4, 0x53, 0x20,
    0xCA, 0x88, 0xE6, 0x53, 0xA5, 0x55, 0xF0, 0x03, 0x20, 0x5D, 0x89, 0xA9, 0x01, 0x4C, 0x79, 0x88,
    0xC9, 0xE0, 0xB0, 0x14, 0x38, 0xE9, 0xD8, 0xAA, 0xBD, 0xE6, 0x8A, 0x48, 0x20, 0x9A, 0x89, 0x68,
    0x20, 0xA8, 0x9F, 0xA9, 0x01, 0x4C, 0x79, 0x88, 0xC9, 0xE8, 0xB0, 0x17, 0x38, 0xE9, 0xE1, 0x49,
    0xFF, 0x18, 0x65, 0x53, 0x85, 0x53, 0x29, 0x1F, 0xC5, 0x54, 0xB0, 0x02, 0x85, 0x54, 0xA9, 0x01,
    0x4C, 0x79, 0x88, 0x38, 0xE9, 0xE8, 0x0A, 0xAA, 0xBD, 0x46, 0x85, 0x48, 0xBD, 0x45, 0x85, 0x48,
    0x60, 0x74, 0x85, 0x7F, 0x85, 0x8C, 0x85, 0xC3, 0x85, 0xD1, 0x85, 0xEB, 0x85, 0x03, 0x86, 0x17,
    0x86, 0x2B, 0x86, 0x49, 0x86, 0x77, 0x86, 0x81, 0x86, 0xB7, 0x86, 0xB7, 0x87, 0xCA, 0x87, 0xD8,
    0x87, 0xF7, 0x87, 0x13, 0x88, 0x1A, 0x88, 0x30, 0x88, 0x36, 0x88, 0x54, 0x88, 0x61, 0x88, 0x6F,
    0x88, 0xC8, 0xB1, 0x4D, 0x20, 0x20, 0x89, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0xA9, 0x02, 0x20, 0xA8,
    0x9F, 0x20, 0x7E, 0x99, 0xA9, 0x01, 0x4C, 0x79, 0x88, 0x20, 0xF0, 0x99, 0x20, 0x7F, 0x9B, 0xA9,
    0x00, 0x85, 0xE6, 0xA9, 0x20, 0x85, 0xE7, 0xA0, 0x10, 0xA2, 0x20, 0x20, 0xE8, 0x98, 0xA9, 0x00,
    0x85, 0xE6, 0xA9, 0x24, 0x85, 0xE7, 0xA0, 0x20, 0xA2, 0x20, 0x20, 0xE8, 0x98, 0xA9, 0x00, 0x85,
    0x4C, 0x85, 0x7B, 0x85, 0x4C, 0xA9, 0x00, 0x85, 0x0D, 0x85, 0x0E, 0xA9, 0x01, 0x4C, 0x79, 0x88,
    0x20, 0x9A, 0x89, 0x20, 0xA3, 0x89, 0x20, 0xB1, 0x88, 0xA9, 0x01, 0x4C, 0x87, 0x88, 0xA0, 0x01,
    0xB1, 0x4D, 0xC9, 0xFF, 0xF0, 0x08, 0x20, 0xD2, 0x89, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0xA9, 0x00,
    0x8D, 0x52, 0x06, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0xA2, 0x00, 0xBD, 0x00, 0x07, 0xF0, 0x05, 0xE8,
    0xE0, 0x05, 0xD0, 0xF6, 0xA0, 0x01, 0xB1, 0x4D, 0x9D, 0x00, 0x07, 0xA9, 0x02, 0x4C, 0x79, 0x88,
    0xA9, 0x21, 0x85, 0xE6, 0xA9, 0x22, 0x85, 0xE7, 0xA0, 0x0B, 0xA2, 0x1E, 0x20, 0xE8, 0x98, 0xA9,
    0x01, 0x4C, 0x79, 0x88, 0xA9, 0x02, 0x20, 0xA8, 0x9F, 0xA5, 0x99, 0x29, 0x80, 0x49, 0x80, 0x09,
    0x40, 0x85, 0x99, 0xA9, 0x01, 0x4C, 0x79, 0x88, 0xC8, 0xB1, 0x4D, 0x85, 0x4F, 0x85, 0x51, 0xC8,
    0xB1, 0x4D, 0x85, 0x50, 0x85, 0x52, 0xA5, 0x4D, 0x18, 0x69, 0x03, 0x85, 0x4D, 0xA5, 0x4E, 0x69,
    0x00, 0x85, 0x4E, 0x4C, 0xE3, 0x84, 0xA9, 0x21, 0x85, 0xE6, 0xA9, 0x22, 0x85, 0xE7, 0xA0, 0x0B,
    0xA2, 0x1E, 0x20, 0xE8, 0x98, 0xA0, 0x01, 0xB1, 0x4D, 0x0A, 0xA8, 0xA2, 0x06, 0x20, 0xB9, 0xC4,
    0xBE, 0x41, 0xBB, 0xB9, 0x40, 0xBB, 0xA8, 0x20, 0xB6, 0x97, 0xA6, 0x56, 0x20, 0xB9, 0xC4, 0xA9,
    0x02, 0x4C, 0x79, 0x88, 0xC8, 0xB1, 0x4D, 0x85, 0x55, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0xC8, 0xB1,
    0x4D, 0xD0, 0x08, 0x20, 0x35, 0x9A, 0xA0, 0x02, 0x4C, 0xB4, 0x86, 0xC9, 0xFF, 0xF0, 0x14, 0x30,
    0x08, 0x20, 0x4C, 0x9A, 0xA0, 0x02, 0x4C, 0xB4, 0x86, 0x29, 0x7F, 0x20, 0x60, 0x9A, 0xA0, 0x02,
    0x4C, 0xB4, 0x86, 0xA0, 0x03, 0xB1, 0x4D, 0xAA, 0x88, 0xB1, 0x4D, 0x20, 0x31, 0x9A, 0xA0, 0x04,
    0x98, 0x4C, 0x79, 0x88, 0xC8, 0xB1, 0x4D, 0x0A, 0xAA, 0xBD, 0xC7, 0x86, 0x48, 0xBD, 0xC6, 0x86,
    0x48, 0x60, 0xD5, 0x86, 0xDD, 0x86, 0xE5, 0x86, 0xED, 0x86, 0xF5, 0x86, 0x12, 0x87, 0x33, 0x87,
    0x9E, 0x87, 0x20, 0xB0, 0x99, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0x20, 0xD1, 0x99, 0xA9, 0x02, 0x4C,
    0x79, 0x88, 0x20, 0x0D, 0x9A, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0x20, 0x1F, 0x9A, 0xA9, 0x02, 0x4C,
    0x79, 0x88, 0xA9, 0x04, 0x85, 0xED, 0xA6, 0xED, 0xBD, 0xB3, 0x87, 0x8D, 0x31, 0x06, 0x20, 0x71,
    0x9A, 0xA9, 0x04, 0x20, 0xA8, 0x9F, 0xC6, 0xED, 0xD0, 0xEC, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0xA9,
    0x00, 0x85, 0xED, 0xA6, 0xED, 0xBD, 0xB4, 0x87, 0x8D, 0x31, 0x06, 0x20, 0x71, 0x9A, 0xA9, 0x04,
    0x20, 0xA8, 0x9F, 0xE6, 0xED, 0xA5, 0xED, 0xC9, 0x04, 0x90, 0xE8, 0xA9, 0x02, 0x4C, 0x79, 0x88,
    0xA0, 0xFC, 0xB9, 0xD2, 0x88, 0x99, 0x68, 0x04, 0xC8, 0xD0, 0xF7, 0xA2, 0xF8, 0xA0, 0x00, 0xA9,
    0x01, 0x20, 0xA8, 0x9F, 0x24, 0x1E, 0x30, 0x17, 0xA5, 0x1C, 0x29, 0x44, 0xC9, 0x44, 0xF0, 0x1A,
    0xC8, 0xC0, 0x14, 0xF0, 0xDB, 0xC0, 0x0C, 0xD0, 0xE6, 0x8E, 0x64, 0x05, 0x4C, 0x43, 0x87, 0x8E,
    0x64, 0x05, 0x20, 0xB1, 0x88, 0xA9, 0x03, 0x4C, 0x87, 0x88, 0x8E, 0x64, 0x05, 0x20, 0xB1, 0x88,
    0xA5, 0x4D, 0x18, 0x69, 0x03, 0x85, 0x58, 0xA5, 0x4E, 0x69, 0x00, 0x85, 0x59, 0xA5, 0x56, 0x85,
    0x5A, 0xA0, 0x02, 0xB1, 0x4D, 0x0A, 0xA8, 0xA2, 0x06, 0x86, 0x56, 0x20, 0xB9, 0xC4, 0xB9, 0x00,
    0xA0, 0x85, 0x4D, 0xB9, 0x01, 0xA0, 0x85, 0x4E, 0x4C, 0xD7, 0x84, 0x20, 0xB1, 0x88, 0xA5, 0x58,
    0x85, 0x4D, 0xA5, 0x59, 0x85, 0x4E, 0xA6, 0x5A, 0x86, 0x56, 0x20, 0xB9, 0xC4, 0x4C, 0xD7, 0x84,
    0x30, 0x20, 0x10, 0x0F, 0xC8, 0xA2, 0x00, 0xB1, 0x4D, 0xC9, 0xFF, 0xF0, 0x03, 0x09, 0x80, 0xAA,
    0x86, 0x4C, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0x20, 0x9A, 0x89, 0xC8, 0xB1, 0x4D, 0x20, 0xA8, 0x9F,
    0xA9, 0x02, 0x4C, 0x79, 0x88, 0xA5, 0x09, 0xF0, 0x08, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0x4C, 0xD9,
    0x87, 0xA5, 0x7B, 0x49, 0x01, 0x85, 0x7B, 0xA9, 0x00, 0x85, 0x7A, 0x85, 0x44, 0x85, 0x45, 0xA9,
    0x01, 0x4C, 0x79, 0x88, 0xC8, 0xB1, 0x4D, 0x85, 0xED, 0xC8, 0xB1, 0x4D, 0x85, 0xEC, 0xA2, 0x02,
    0x20, 0xB9, 0xC4, 0x20, 0x12, 0xA2, 0xA8, 0xA6, 0x56, 0x20, 0xB9, 0xC4, 0x98, 0x4C, 0x79, 0x88,
    0xA5, 0x5B, 0x29, 0xFB, 0x4C, 0x1F, 0x88, 0xA5, 0x5B, 0x09, 0x04, 0x85, 0x5B, 0xC8, 0xB1, 0x4D,
    0x20, 0xF7, 0x8A, 0xA6, 0x56, 0x20, 0xB9, 0xC4, 0xA9, 0x02, 0x4C, 0x79, 0x88, 0x20, 0x85, 0x90,
    0x4C, 0xE7, 0x84, 0x20, 0x9A, 0x89, 0xA9, 0x04, 0x20, 0xA8, 0x9F, 0xA5,
  ];
}

 function outentry(): readonly number[] { return asm`
  ; ── $819A: 场景入口 5 ──
  @entry5:
    LDX #$01
    JSR $C4B9
    JSR $A015
    LDA #$60
    JSR $8464
    JSR $82B5
    JSR $99F0
    LDX $26
    LDA $8398,X
    STA $26
    JSR $C578
    JMP $80FD

  ; ── $81BA: 场景入口 1 ──
  @entry1:
    LDX #$01
    JSR $C4B9
    JSR $A012
    BIT $E0
    BVS @chk_refresh
    LDA $26
    CMP $E5
    BEQ @test_tbl42
    BCC @test_tbl42
    STA $E5
  @chk_refresh:
    LDX $26
    LDA $8420,X
    BEQ @test_tbl42
    JSR $8464
    JSR $82B5
    LDA $E0
    AND #$BF
    STA $E0
  @test_tbl42:
    LDX $0026
    LDA $8442,X
    BEQ @next_scene
    JSR $8464
    JSR $82A9
    LDA $26
    CMP #$20
    BCS @set_27
  @next_scene:
    LDA #$01
    STA $0700
    JSR $C578
    INC $26
    LDX #$01
    JSR $C4B9
    JSR $A018
    LDA $26
    CMP #$03
    BCC @back
    LDX #$05
    STX $0446
  @back:
    JMP $80FD
  @set_27:
    LDA #$05
    STA $27
    JMP $C57B

  ; ── $821E: 场景入口 2 ──
  @entry2:
    LDX #$01
    JSR $C4B9
    JSR $A003
    LDX #$02
    JSR $C4B9
    JSR $A20F
    LDX #$01
    JSR $C4B9
    JSR $A01B
    JMP $80FD

  ; ── $8239: 场景入口 3 ──
  @entry3:
    LDA #$01
    STA $0700
    LDA #$01
    JSR $9FA8
    LDX #$01
    JSR $C4B9
    JMP $A00C

  ; ── $824B: call_824B (子程序) ──
  @sub_824B:
    STA $E7
    LDA #$01
    STA $E6
    LDA #$E5
    STA $4D
    LDA #$00
    STA $4E
    JSR $9085
    RTS

  ; ── $825D: call_825D (等待 4D/4E 非零) ──
  @sub_825D:
    LDA #$01
    JSR $9FA8
    LDA $4D
    ORA $4E
    BNE @sub_825D
    RTS

  ; ── $8269: call_8269 (场景入口 0？等待 4D/4E 为零) ──
  @sub_8269:
    LDA #$01
    JSR $9FA8
    LDA $4D
    ORA $4E
    BEQ @init_vars
    LDA $1E
    AND #$20
    BEQ @sub_8269
  @init_vars:
    LDA #$00
    STA $05
    STA $06
    STA $09
    STA $0A
    STA $11
    STA $12
    STA $0D
    STA $0E
    STA $4C
    LDA #$01
    STA $0700
    JSR $9BA0
    LDA #$00
    STA $44
    STA $45
    STA $7A
    STA $7B
    RTS
`
;
 }
// ════════ $8840-$9EEC: 字节码操作码处理器 (文本/图形/UI) ═══════=
function buildbytecodeHandlers(): readonly number[] {
  return asm`
    EOR ($18),Y
    ADC #$40
    STA $51
    LDA $52
    ADC #$00
    STA $52
    INC $4D
    BNE @E852
    INC $4E
    @E852: JMP $84E3
    JSR $88B1
    LDA #$04
    JSR $9FA8
    LDA #$01
    JMP $8887
    INY
    LDA ($4D),Y
    TAX
    INY
    LDA ($4D),Y
    STA $4E
    STX $4D
    JMP $84E7
    LDA #$00
    STA $4D
    STA $4E
    JMP $9F7E
    CLC
    ADC $4D
    STA $4D
    LDA $4E
    ADC #$00
    STA $4E
    JMP $84E7
    CLC
    ADC $4D
    STA $4D
    LDA $4E
    ADC #$00
    STA $4E
    JMP $84D7
    STA $57
    LDX #$0D
    LDA #$A8
    STA $00,X
    LDA #$88
    STA $01,X
    LDY #$A0
    LDA #$00
    JSR $9F69
    RTS
    LDX #$02
    JSR $C4B9
    JMP $A206
    LDA $54
    EOR #$FF
    CLC
    ADC #$1F
    TAX
    LDY #$08
    LDA $4F
    AND #$E0
    ORA $54
    STA $E6
    LDA $50
    STA $E7
    JMP $98E8
    PHA
    LDA #$82
    JSR $9B28
    PLA
    CMP #$A0
    BCC @E8ED
    PHA
    CMP #$C8
    LDA #$94
    ADC #$00
    STA $05E8,X
    INX
    PLA
    TAY
    LDA $8A14,Y
    STA $05E8,X
    INX
    JSR $9B5E
    RTS
    @E8ED: STA $05E9,X
    LDA #$00
    STA $05E8,X
    INX
    INX
    JSR $9B5E
    RTS
    LDX #$00
    @E8FD: LDA $046A,X
    EOR #$20
    STA $046A,X
    INX
    INX
    INX
    INX
    BNE @E8FD
    RTS
    STA $ED
    LDX #$00
    @E910: LDA $0468,X
    CLC
    ADC $ED
    STA $0468,X
    INX
    INX
    INX
    INX
    BNE @E910
    RTS
    LDX #$13
    JSR $9DEE
    LDA $EC
    CLC
    ADC #$00
    STA $EC
    LDA $ED
    ADC #$BF
    STA $ED
    LDA $25
    STA $EA
    LDX #$06
    JSR $C4B9
    @E93B: LDA $78
    BNE @E93B
    LDY #$00
    LDA ($EC),Y
    STA $0079
    LDA #$00
    STA $007A
    INY
    LDX #$12
    @E94E: LDA ($EC),Y
    STA $007B,Y
    INY
    DEX
    BNE @E94E
    LDX $EA
    JSR $C4B9
    RTS
    TAX
    LDA $99
    BPL @E966
    EOR #$41
    STA $99
    @E966: LDA #$01
    JSR $9FA8
    TXA
    PHA
    JSR $89FF
    PLA
    TAX
    DEX
    BNE @E966
    RTS
    LDA $4D
    STA $EA
    LDA $4E
    STA $EB
    LDA #$02
    STA $E6
    STX $E7
    STY $E8
    LDA #$E5
    STA $4D
    LDA #$00
    STA $4E
    JSR $9085
    LDA $EA
    STA $4D
    LDA $EB
    STA $4E
    RTS
    LDA $99
    AND #$80
    ORA #$40
    STA $99
    RTS
    @E9A3: LDY #$FC
    @E9A5: LDA $88D2,Y
    STA $0468,Y
    INY
    BNE @E9A5
    LDX #$F8
    LDY #$00
    @E9B2: LDA #$01
    JSR $9FA8
    LDA $1E
    BMI @E9CA
    INY
    CPY #$28
    BEQ @E9A3
    CPY #$18
    BNE @E9B2
    STX $0564
    JMP $89B2
    @E9CA: STX $0564
    RTS
    BNE @E9CF
    .byte $03
    @E9CF:
    INX
    TAY
    LDX #$06
    JSR $C4B9
    TYA
    ASL A
    TAX
    LDA $BD00,X
    STA $0654
    LDA $BD01,X
    STA $0655
    LDA #$80
    STA $0652
    LDA #$01
    STA $0653
    LDA #$00
    STA $90
    LDA #$02
    STA $91
    LDX $56
    JSR $C4B9
    RTS
    LDA $0652
    BMI @EA07
    JMP $8A90
    @EA07: DEC $0653
    BEQ @EA0F
    JMP $8A90
    @EA0F: LDX #$06
    JSR $C4B9
    LDA $0654
    STA $E6
    LDA $0655
    STA $E7
    LDA $0652
    INC $0652
    AND #$3F
    CLC
    ADC $E6
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    LDY #$00
    LDA ($E6),Y
    CMP #$FF
    BEQ @EA86
    CMP #$FE
    BEQ @EA7B
    AND #$F8
    STA $E8
    LSR A
    CLC
    ADC $E8
    STA $E8
    LDA #$00
    ADC #$00
    STA $E9
    LDA $E8
    CLC
    ADC #$80
    STA $E8
    LDA $E9
    ADC #$BD
    STA $E9
    LDY #$02
    LDX #$23
    JSR $8A91
    LDY #$03
    LDX #$23
    JSR $8A91
    LDY #$04
    LDX #$23
    JSR $8A91
    LDY #$01
    LDA ($E6),Y
    AND #$07
    STA $0653
    JMP $8A8B
    @EA7B: LDA $0652
    AND #$C0
    STA $0652
    JMP $8A14
    @EA86: LDA #$00
    STA $0652
    LDX $56
    JSR $C4B9
    RTS
    LDA #$84
    JSR $9B28
    LDY #$00
    @EA98: LDA ($E8),Y
    STA $05E8,X
    INX
    INY
    CPY #$04
    BNE @EA98
    JSR $9B5E
    LDA $E8
    CLC
    ADC #$04
    STA $E8
    LDA $E9
    ADC #$00
    STA $E9
    RTS
    ASL $07
    PHP
    ORA #$0A
    .byte $0B, $0C
    ORA $0F0E
    BPL @EAD1
    .byte $12, $13, $14
    NOP
    .byte $1B, $1C
    ORA $461E,X
    .byte $47
    PHA
    EOR #$4A
    .byte $4B
    JMP $4E4D
  @EAD1:
    .byte $4F
    BVC @EB25
    .byte $52, $53, $54
    NOP
    .byte $5B, $5C
    EOR $1A5E,X
    .byte $1B, $1C
    ORA $5A1E,X
    .byte $5B, $5C
    EOR $015E,X
    ASL A
    .byte $14
    PLP
    .byte $3C
    BVC @EB65
    BEQ @EAEF
  @EAEF:
    .byte $03
    BPL @EAF6
    JSR $6005
    ASL $FF
  @EAF6:
    STA $ED
    LDA #$00
    STA $09
    STA $0A
    STA $0D
    STA $0E
    LDA $5B
    AND #$7F
    STA $5B
    LDA $25
    STA $77
    LDX #$07
    JSR $C4B9
    LDA #$00
    LDY #$F8
    @EB16: STA $0552,Y
    INY
    BNE @EB16
    LDA $ED
    ASL A
    TAX
    LDA #$00
    ROL A
    TAY
    TXA
    @EB25: CLC
    ADC #$00
    STA $63
    TYA
    ADC #$A0
    STA $64
    LDY #$00
    LDA ($63),Y
    TAX
    INY
    LDA ($63),Y
    STA $64
    STX $63
    LDY #$00
    LDA ($63),Y
    STA $75
    INY
    LDA ($63),Y
    STA $76
    INY
    LDA ($63),Y
    TAX
    AND #$3F
    STA $48
    TXA
    LSR $5B
    ROL A
    ROL $5B
    INY
    LDA ($63),Y
    STA $5E
    INY
    LDA ($63),Y
    STA $5F
    INY
    LDA ($63),Y
    AND #$F8
    STA $5C
    @EB65: LDA #$02
    STA $5D
    ASL $5C
    ROL $5D
    ASL $5C
    ROL $5D
    LDA ($63),Y
    AND #$07
    ORA $5C
    STA $5C
    ASL $5C
    ROL $5D
    ASL $5C
    ROL $5D
    LDA $5D
    AND #$0C
    BNE @EB93
    LDA $7B
    ASL A
    ASL A
    EOR $5B
    AND #$04
    ORA $5D
    STA $5D
    @EB93: LDA $5E
    CMP #$09
    BCC @EB9F
    JSR $9071
    JMP $8BAB
    @EB9F: LDA $5D
    AND #$04
    BNE @EBAB
    JSR $9071
    JMP $8BAE
    @EBAB: JSR $9076
    LDA #$01
    JSR $9FA8
    LDA $63
    CLC
    ADC #$06
    STA $63
    LDA $64
    ADC #$00
    STA $64
    LDA $5E
    LDX $5F
    JSR $9DEE
    LDA $63
    CLC
    ADC $EC
    STA $70
    LDA $64
    ADC $ED
    STA $71
    LDA #$00
    STA $60
    LDY #$01
    LDA ($70),Y
    AND #$E0
    STA $62
    LDA ($70),Y
    AND #$1F
    TAX
    LSR A
    ROR $60
    LSR A
    ROR $60
    STA $61
    TXA
    BEQ @EBF3
    INY
    LDA ($70),Y
    @EBF3: STA $72
    LDA $62
    AND #$C0
    BEQ @EC43
    CMP #$40
    BEQ @EC15
    CMP #$80
    BEQ @EC0C
    LDA #$04
    LDX #$01
    LDY $5F
    JMP $8C59
    @EC0C: LDA #$04
    LDX #$01
    LDY $5F
    JMP $8C59
    @EC15: LDA $5E
    LDX $5F
    JSR $9DEE
    LDA $EC
    SEC
    SBC #$01
    STA $EC
    LDA $ED
    SBC #$00
    STA $ED
    LDA $63
    CLC
    ADC $EC
    STA $63
    LDA $64
    ADC $ED
    STA $64
    LDA #$00
    SEC
    SBC $5F
    TAY
    LDA #$FC
    LDX #$FF
    JMP $8C59
    @EC43: LDA $5F
    SEC
    SBC #$01
    CLC
    ADC $63
    STA $63
    LDA $64
    ADC #$00
    STA $64
    LDA #$FC
    LDX #$FF
    LDY $5F
    STA $6D
    STX $6E
    STY $6F
    LDA $5E
    CMP #$07
    BCC @EC89
    SEC
    SBC #$07
    STA $5E
    LDY #$07
    LDX $5F
    JSR $8E15
    LDA #$01
    STA $7B
    LDX #$09
    LDA #$B9
    STA $00,X
    LDA #$8C
    STA $01,X
    LDY #$78
    LDA #$00
    JSR $9F69
    JMP $8CA5
    @EC89: LDY $5E
    LDX $5F
    JSR $8E15
    LDA $72
    BEQ @ECA5
    LDX #$09
    LDA #$21
    STA $00,X
    LDA #$8D
    STA $01,X
    LDY #$78
    LDA #$00
    JSR $9F69
    @ECA5: LDA $75
    STA $8E
    LDA $76
    STA $8F
    LDA #$00
    STA $44
    STA $45
    STA $7A
    LDX $77
    JMP $C4B9
    LDX #$07
    JSR $C4B9
    LDA #$00
    STA $69
    STA $6A
    BIT $62
    BMI @ECD6
    LDA #$00
    SEC
    SBC $60
    STA $60
    LDA #$00
    SBC $61
    STA $61
    @ECD6: LDA #$01
    JSR $9FA8
    LDA $60
    CLC
    ADC $69
    STA $69
    LDA #$00
    ADC $61
    TAX
    JSR $9BA9
    TXA
    BPL @ECF2
    EOR #$FF
    CLC
    ADC #$01
    @ECF2: CLC
    ADC $6A
    STA $6A
    SEC
    SBC #$20
    BCC @ECD6
    STA $6A
    LDA $5B
    BPL @ED0A
    LDA #$01
    JSR $9FA8
    JMP $8CFE
    @ED0A: LDX #$0D
    LDA #$FE
    STA $00,X
    LDA #$8D
    STA $01,X
    LDY #$A0
    LDA #$00
    JSR $9F69
    DEC $5E
    BNE @ECD6
    JMP $8D59
    LDX #$07
    JSR $C4B9
    LDX #$02
    LDY #$00
    LDA ($70),Y
    BEQ @ED3A
    ASL A
    BCC @ED3B
    TAX
    LDA #$FE
    JSR $9FA8
    INX
    INX
    @ED3A: TXA
    @ED3B: JSR $9FA8
    LDA #$00
    STA $69
    STA $6A
    BIT $62
    BMI @ED55
    LDA #$00
    SEC
    SBC $60
    STA $60
    LDA #$00
    SBC $61
    STA $61
    @ED55: BIT $62
    BVC @ED88
    @ED59: LDA #$01
    JSR $9FA8
    LDA $60
    CLC
    ADC $69
    STA $69
    LDA #$00
    ADC $61
    TAX
    JSR $9BA9
    TXA
    BPL @ED75
    EOR #$FF
    CLC
    ADC #$01
    @ED75: CLC
    ADC $6A
    STA $6A
    SEC
    SBC #$20
    BCC @ED59
    STA $6A
    DEC $72
    BNE @ED59
    JMP $8DC8
    @ED88: LDA #$01
    JSR $9FA8
    LDA $60
    CLC
    ADC $69
    STA $69
    LDA #$00
    ADC $61
    TAX
    JSR $9BCA
    TXA
    BPL @EDA4
    EOR #$FF
    CLC
    ADC #$01
    @EDA4: CLC
    ADC $6A
    STA $6A
    SEC
    SBC #$20
    BCC @ED88
    STA $6A
    DEC $72
    BNE @ED88
    LDA $7A
    SEC
    SBC $6A
    STA $7A
    LDA $7B
    SBC #$00
    STA $7B
    LDA $47
    SEC
    SBC $6A
    STA $47
    LDA $62
    AND #$20
    BNE @EDFC
    LDA $70
    CLC
    ADC #$03
    STA $70
    LDA $71
    ADC #$00
    STA $71
    LDA #$00
    STA $60
    LDY #$01
    LDA ($70),Y
    AND #$E0
    STA $62
    LDA ($70),Y
    AND #$1F
    TAX
    LSR A
    ROR $60
    LSR A
    ROR $60
    STA $61
    INY
    LDA ($70),Y
    STA $72
    JMP $8D22
    @EDFC: JMP $9F7E
    LDA $5B
    ORA #$80
    STA $5B
    LDY #$01
    LDX $5F
    JSR $8E15
    LDA $5B
    AND #$7F
    STA $5B
    JMP $9F7E
    STY $6C
    STX $6B
    LDA $63
    STA $65
    LDA $64
    STA $66
    LDA $6B
    STA $ED
    LDA $5C
    STA $73
    LDA $5D
    STA $74
    @EE2D: LDY #$00
    LDA ($63),Y
    JSR $8EF0
    LDA $5C
    TAX
    CLC
    ADC $6D
    STA $5C
    TXA
    EOR $5C
    AND #$20
    BEQ @EE58
    LDA $6D
    ASL A
    ASL A
    ASL A
    EOR #$FF
    CLC
    ADC #$01
    CLC
    ADC $5C
    STA $5C
    LDA $5D
    EOR #$04
    STA $5D
    @EE58: LDA $6E
    PHA
    CLC
    ADC $63
    STA $63
    PLA
    BMI @EE6A
    LDA $64
    ADC #$00
    JMP $8E6E
    @EE6A: LDA $64
    SBC #$00
    STA $64
    DEC $ED
    BNE @EE2D
    LDA $6F
    PHA
    CLC
    ADC $65
    STA $63
    PLA
    BMI @EE86
    LDA $66
    ADC #$00
    JMP $8E8A
    @EE86: LDA $66
    SBC #$00
    STA $64
    LDA $62
    AND #$C0
    CMP #$40
    BEQ @EEC2
    LDA $73
    CLC
    ADC #$80
    STA $5C
    TAX
    LDA $74
    ADC #$00
    STA $5D
    TXA
    SEC
    SBC #$40
    BPL @EEE8
    LDA $5D
    SBC #$00
    AND #$03
    CMP #$03
    BNE @EEE8
    LDA $5C
    SEC
    SBC #$C0
    STA $5C
    LDA $5D
    SBC #$03
    STA $5D
    JMP $8EE8
    @EEC2: LDA $73
    SEC
    SBC #$80
    STA $5C
    TAX
    LDA $74
    SBC #$00
    STA $5D
    TXA
    BPL @EEE8
    LDA $5D
    AND #$03
    CMP #$03
    BNE @EEE8
    LDA $5C
    CLC
    ADC #$C0
    STA $5C
    LDA $5D
    ADC #$03
    STA $5D
    @EEE8: DEC $6C
    .byte $F0, $03  ; BEQ $8EEF
    .byte $4C
  `;
}

// ════════ $9EED-$9FA7: 任务调度器/协程系统 ═══════=
function buildscheduler(): readonly number[] {
  return asm`
    ORA $608E,Y
    TAX
    LDA $5C
    STA $67
    LDA $5D
    STA $68
    LDA $5B
    AND #$01
    TAY
    STA $EB
    TXA
    STA $EA
    ASL A
    ROL $EB
    ASL A
    ROL $EB
    ASL A
    ROL $EB
    ASL A
    ROL $EB
    CLC
    ADC $EA
    STA $EA
    TYA
    ADC $EB
    STA $EB
    LDA $EA
    CLC
    ADC #$00
    STA $EA
    LDA $EB
    ADC #$A0
    STA $EB
    LDX #$08
    JSR $C4B9
    LDY #$00
    LDA ($EA),Y
    STA $E7
    JSR $8FD1
    INC $EA
    BNE @EF3A
    INC $EB
    @EF3A: LDA #$04
    STA $E8
    @EF3E: LDY $67
    LDX $68
    LDA #$04
    JSR $9B28
    LDY #$00
    @EF49: LDA ($EA),Y
    STA $05E8,X
    INX
    INY
    CPY #$04
    BNE @EF49
    JSR $9B5E
    DEC $E8
    .byte $F0, $70  ; BEQ $8FCB
    LDA $EA
    CLC
    ADC #$04
    STA $EA
    LDA $EB
    ADC #$00
    STA $EB
    LDA $67
    CLC
    ADC #$20
    STA $67
    LDA $68
    ADC #$00
    STA $68
    AND #$03
    CMP #$03
    BNE @EF3E
    LDA $67
    CMP #$C0
    BCC @EF3E
    LDA $67
    SEC
    SBC #$C0
    STA $67
    LDA $68
    SBC #$03
    STA $68
    JSR $9049
    LDA #$01
    JSR $9B28
    LDA $67
    LSR A
    LSR A
    AND #$07
    TAY
    LDA $62
    AND #$C0
    CMP #$40
    .byte $F0, $13  ; BEQ $8FB8
    LDA $E7
    LSR A
  `;
}

// ════════ $9FA8-$9FF5: 上下文保存/恢复 ═══════=
function buildcontextSave(): readonly number[] {
  return asm`
    .org $9FA8
    LSR A
    LSR A
    LSR A
    STA $05E8,X
    STA $064A,Y
    INX
    JSR $9B5E
    JMP $8F3E

    LDA $E7
    LSR A
    LSR A
    LSR A
    LSR A
    ORA $064A,Y
    STA $05E8,X
    INX
    JSR $9B5E
    JMP $8F3E

    LDX #$07
    JSR $C4B9
    RTS

    JSR $9049
    BIT $67
    BVC $A03A
    STY $E8
    STX $E9
    LDA #$01
    JSR $9B28
    LDA $67
    LSR A
    LSR A
    AND #$07
    TAY
    LDA $62
    AND #$C0
    CMP #$40
    BEQ $A00B
    LDA $E7
    ASL A
    ASL A
    ASL A
    ASL A
  `;
}

// ════════ $9FF6-$9FFF: 填充 (0xFF) ═══════=
function buildpadding(): readonly number[] {
  return asm`
    ORA $064A,Y
    STA $05E8,X
    INX
    LDA $E7
    LSR A
    LSR A
    LSR A
    LSR A
    STA $064A,Y
    STA $E6
    JMP $9025
    LDA $E7
    ASL A
    ASL A
    ASL A
    ASL A
    PHA
    STA $05E8,X
    INX
    LDA $E7
    LSR A
    LSR A
    LSR A
    LSR A
    ORA $064A,Y
    STA $E6
    PLA
    STA $064A,Y
    JSR $9B5E
    LDA $E8
    CLC
    ADC #$08
    TAY
    LDX $E9
    LDA #$01
    JSR $9B28
    LDA $E6
    JMP $9041
    LDA #$01
    JSR $9B28
    LDA $E7
    STA $05E8,X
    INX
    JSR $9B5E
    RTS
    LDA $67
    AND #$9C
    LSR A
    LSR A
    STA $E6
    AND #$20
    LSR A
    LSR A
    ORA $E6
    AND #$0F
    STA $E6
    LDA $68
    ASL A
    ASL A
    ASL A
    ASL A
    AND #$30
    CLC
    ADC #$C0
    ORA $E6
    TAY
    LDA $68
    AND #$FC
    ADC #$03
    TAX
    RTS
    LDA #$20
    JMP $9078
    LDA #$24
    STA $E7
    LDA #$00
    STA $E6
    LDY #$10
    LDX #$20
    JMP $98E8
    LDA #$00
    LDY #$01
    @E089: STA $0467,Y
    INY
    BNE @E089
    LDA #$00
    STA $97
    LDY #$01
    LDA ($4D),Y
    STA $EC
    LDA $4D
    CLC
    ADC #$02
    STA $4D
    LDA $4E
    ADC #$00
    STA $4E
    LDA #$68
    STA $94
    LDA #$05
    STA $95
    LDX $25
    STX $ED
    LDY #$00
    LDA ($4D),Y
    TAY
    LDX #$09
    CMP #$6D
    BCC @E0C2
    SEC
    SBC #$6D
    TAY
    INX
    @E0C2: JSR $C4B9
    TYA
    ASL A
    TAY
    LDA #$00
    ADC #$00
    TAX
    TYA
    CLC
    ADC #$00
    STA $92
    TXA
    ADC #$A0
    STA $93
    LDY #$00
    LDA ($92),Y
    TAX
    INY
    LDA ($92),Y
    STA $93
    STX $92
    LDY #$00
    @E0E6: LDA $978B,Y
    STA ($94),Y
    INY
    CPY #$20
    BNE @E0E6
    LDA $25
    SEC
    SBC #$09
    LDY #$00
    ORA ($94),Y
    STA ($94),Y
    LDY #$00
    LDA ($92),Y
    STA $49
    INC $92
    BNE @E107
    INC $93
    @E107: LDY #$02
    LDA $92
    STA ($94),Y
    INY
    LDA $93
    STA ($94),Y
    LDX $ED
    JSR $C4B9
    INC $4D
    BNE @E11D
    INC $4E
    @E11D: LDA $94
    CLC
    ADC #$20
    STA $94
    LDA $95
    ADC #$00
    STA $95
    DEC $EC
    BEQ @E131
    JMP $90AE
    @E131: LDX #$11
    LDA #$47
    STA $00,X
    LDA #$91
    STA $01,X
    LDY #$C8
    LDA #$00
    JSR $9F69
    RTS
    LDA #$01
    JSR $9FA8
    LDA #$68
    STA $94
    LDA #$05
    STA $95
    LDA #$04
    STA $96
    LDY #$00
    LDA ($94),Y
    BMI @E15D
    JMP $94C1
    @E15D: TAX
    LDY #$04
    JSR $974A
    LDY #$06
    JSR $974A
    TXA
    AND #$10
    BNE @E1A6
    TXA
    AND #$20
    BNE @E175
    JMP $91F3
    @E175: LDX #$04
    LDY #$0A
    JSR $975B
    LDA $9A
    STA $E6
    LDY #$04
    JSR $974A
    LDA $9A
    SEC
    SBC $E6
    STA $E6
    LDX #$06
    LDY #$0E
    JSR $975B
    LDA $9C
    STA $E8
    LDY #$06
    JSR $974A
    LDA $9C
    SEC
    SBC $E8
    STA $E8
    JMP $91B4
    @E1A6: LDA #$00
    SEC
    SBC $46
    STA $E6
    LDA #$00
    SEC
    SBC $47
    STA $E8
    LDY #$10
    LDA ($94),Y
    TAX
    INY
    LDA ($94),Y
    LSR A
    LSR A
    TAY
    @E1BF: LDA $E6
    CLC
    ADC $0468,X
    STA $0468,X
    ROR A
    EOR $E6
    BPL @E1D5
    LDA $046A,X
    EOR #$08
    STA $046A,X
    @E1D5: LDA $E8
    CLC
    ADC $046B,X
    STA $046B,X
    ROR A
    EOR $E8
    BPL @E1EB
    LDA $046A,X
    EOR #$04
    STA $046A,X
    @E1EB: TXA
    CLC
    ADC #$04
    TAX
    DEY
    BNE @E1BF
    LDY #$01
    LDA ($94),Y
    SEC
    SBC #$01
    STA ($94),Y
    BEQ @E201
    JMP $94C1
    @E201: LDY #$00
    LDA ($94),Y
    AND #$01
    CLC
    ADC #$09
    TAX
    JSR $C4B9
    LDY #$02
    LDA ($94),Y
    STA $92
    INY
    LDA ($94),Y
    STA $93
    LDY #$00
    LDA ($94),Y
    AND #$02
    BEQ @E224
    JMP $9459
    @E224: LDY #$00
    LDA ($92),Y
    BMI @E241
    INY
    ASL A
    STA ($94),Y
    LDY #$02
    LDA $92
    CLC
    ADC #$01
    STA ($94),Y
    INY
    LDA $93
    ADC #$00
    STA ($94),Y
    JMP $94C1
    @E241: CMP #$A0
    BCS @E258
    CLC
    ADC #$20
    STA $E7
    LDY #$01
    LDA ($92),Y
    STA $E6
    JSR $94D8
    LDA #$02
    JMP $94AE
    @E258: CMP #$C0
    BCS @E268
    TAX
    LDY #$01
    LDA ($92),Y
    STA $92
    STX $93
    JMP $9224
    @E268: CMP #$E0
    BCS @E2A0
    STA $E7
    LDY #$13
    LDA ($94),Y
    CMP #$03
    @E274: BCS @E274
    TAX
    CLC
    ADC #$01
    STA ($94),Y
    TXA
    ASL A
    CLC
    ADC #$18
    TAY
    LDA $92
    CLC
    ADC #$02
    STA ($94),Y
    INY
    LDA $93
    ADC #$00
    STA ($94),Y
    LDY #$01
    LDA ($92),Y
    STA $92
    LDA $E7
    SEC
    SBC #$20
    STA $93
    JMP $9224
    @E2A0: CMP #$F0
    BCS @E2D7
    TAX
    LDY #$13
    LDA ($94),Y
    CMP #$04
    @E2AB: BCS @E2AB
    CLC
    ADC #$01
    STA ($94),Y
    CLC
    ADC #$13
    TAY
    TXA
    SEC
    SBC #$E0
    STA ($94),Y
    TYA
    ASL A
    SEC
    SBC #$10
    TAY
    LDA $92
    CLC
    ADC #$01
    STA $92
    STA ($94),Y
    INY
    LDA $93
    ADC #$00
    STA $93
    STA ($94),Y
    JMP $9224
    @E2D7: SEC
    SBC #$F0
    ASL A
    TAX
    LDA $92E6,X
    PHA
    LDA $92E5,X
    PHA
    RTS
    .byte $04, $93
    SEC
    .byte $93, $4F, $93
    EOR $6B93,X
    .byte $93
    STY $9993
    .byte $93
    LDX $93
    AND #$94
    .byte $34
    STY $41,X
    STY $8E,X
    STY $8E,X
    STY $8E,X
    STY $91,X
    STY $BB,X
    STY $A0,X
    .byte $13
    LDA ($94),Y
    @E309: BEQ @E309
    TAX
    CLC
    ADC #$13
    TAY
    LDA ($94),Y
    SEC
    SBC #$01
    STA ($94),Y
    BEQ @E32B
    TXA
    ASL A
    CLC
    ADC #$16
    TAY
    LDA ($94),Y
    STA $92
    INY
    LDA ($94),Y
    STA $93
    JMP $9224
    @E32B: LDY #$13
    LDA ($94),Y
    SEC
    SBC #$01
    STA ($94),Y
    LDA #$01
    JMP $94AE
    LDY #$01
    LDA ($92),Y
    LDY #$04
    JSR $9735
    LDY #$02
    LDA ($92),Y
    LDY #$06
    JSR $9735
    LDA #$03
    JMP $94AE
    LDY #$01
    LDA ($92),Y
    LDY #$04
    JSR $9735
    LDA #$02
    JMP $94AE
    LDY #$01
    LDA ($92),Y
    LDY #$06
    JSR $9735
    LDA #$02
    JMP $94AE
    LDY #$01
    LDA ($92),Y
    STA ($94),Y
    LDA $92
    CLC
    ADC #$02
    STA $92
    LDA $93
    ADC #$00
    STA $93
    LDY #$02
    LDA $92
    STA ($94),Y
    INY
    LDA $93
    STA ($94),Y
    JMP $94C1
    LDY #$00
    LDA ($94),Y
    ORA #$40
    STA ($94),Y
    LDA #$01
    JMP $94AE
    LDY #$00
    LDA ($94),Y
    AND #$BF
    STA ($94),Y
    LDA #$01
    JMP $94AE
    LDY #$01
    LDA ($92),Y
    LSR A
    LSR A
    LSR A
    LSR A
    LSR A
    LDY #$09
    STA ($94),Y
    AND #$04
    BNE @E3C7
    ROR A
    DEY
    STA ($94),Y
    LDY #$02
    LDA ($92),Y
    LDY #$0A
    STA ($94),Y
    JMP $93DE
    @E3C7: LDA ($94),Y
    ORA #$F8
    STA ($94),Y
    LDA #$00
    ROR A
    DEY
    STA ($94),Y
    LDY #$02
    LDA #$00
    SEC
    SBC ($92),Y
    LDY #$0A
    STA ($94),Y
    LDY #$01
    LDA ($92),Y
    AND #$0F
    LSR A
    LDY #$0D
    STA ($94),Y
    AND #$04
    BNE @E3FC
    ROR A
    DEY
    STA ($94),Y
    LDY #$03
    LDA ($92),Y
    LDY #$0E
    STA ($94),Y
    JMP $9413
    @E3FC: LDA ($94),Y
    ORA #$F8
    STA ($94),Y
    LDA #$00
    ROR A
    DEY
    STA ($94),Y
    LDY #$03
    LDA #$00
    SEC
    SBC ($92),Y
    LDY #$0E
    STA ($94),Y
    LDA #$00
    LDY #$0B
    STA ($94),Y
    LDY #$0F
    STA ($94),Y
    LDY #$00
    LDA ($94),Y
    ORA #$20
    STA ($94),Y
    LDA #$04
    JMP $94AE
    LDY #$01
    LDA ($92),Y
    STA $49
    LDA #$02
    JSR $94AE
    LDY #$00
    LDA ($94),Y
    ORA #$10
    STA ($94),Y
    LDA #$01
    JMP $94AE
    LDY #$00
    LDA ($94),Y
    ORA #$02
    STA ($94),Y
    LDA #$C0
    STA $99
    LDY #$02
    LDA $92
    STA ($94),Y
    INY
    LDA $93
    STA ($94),Y
    BIT $99
    BVC @E47A
    LDA $99
    AND #$01
    SEC
    ROL A
    TAY
    LDA ($92),Y
    STA $E6
    INY
    LDA ($92),Y
    STA $E7
    JSR $94D8
    LDA $99
    CMP #$FE
    BEQ @E482
    AND #$BF
    STA $99
    @E47A: LDA #$01
    TAY
    STA ($94),Y
    JMP $94C1
    @E482: LDY #$00
    LDA ($94),Y
    AND #$FD
    STA ($94),Y
    LDA #$05
    JMP $94AE
    JMP $948F
    LDY #$13
    LDA ($94),Y
    @E496: BEQ @E496
    SEC
    SBC #$01
    STA ($94),Y
    ASL A
    CLC
    ADC #$18
    TAY
    LDA ($94),Y
    STA $92
    INY
    LDA ($94),Y
    STA $93
    JMP $9224
    CLC
    ADC $92
    STA $92
    LDA $93
    ADC #$00
    STA $93
    JMP $9224
    LDA #$00
    TAY
    STA ($94),Y
    LDA $94
    CLC
    ADC #$20
    STA $94
    LDA $95
    ADC #$00
    STA $95
    DEC $96
    BEQ @E4D5
    JMP $9154
    @E4D5: JMP $9143
    LDY #$00
    LDA ($E6),Y
    ORA #$80
    STA $9E
    INY
    LDA ($E6),Y
    STA $9F
    LDY #$02
    LDA ($E6),Y
    STA $A0
    INY
    LDA ($E6),Y
    STA $A1
    LDA $E6
    CLC
    ADC #$04
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    LDY #$00
    LDA ($94),Y
    LDY #$10
    AND #$08
    BNE @E50B
    LDA $97
    STA ($94),Y
    @E50B: LDA ($94),Y
    STA $98
    LDA #$00
    STA $E8
    STA $E9
    LDY #$00
    LDA ($E6),Y
    BMI @E589
    LDX $98
    AND #$3C
    ASL A
    ASL A
    BMI @E533
    LSR A
    CLC
    ADC $9A
    STA $0468,X
    STA $EA
    LDA #$00
    ADC $9B
    JMP $9541
    @E533: SEC
    ROR A
    CLC
    ADC $9A
    STA $0468,X
    STA $EA
    LDA #$00
    SBC $9B
    AND #$01
    STA $EB
    ASL A
    STA $EC
    LDA $E8
    STA $046B,X
    LDA $E9
    AND #$01
    ORA $EC
    ASL A
    ASL A
    STA $EC
    LDY #$00
    LDA ($E6),Y
    EOR ($94),Y
    AND #$40
    ORA $EC
    STA $EC
    LDA ($E6),Y
    AND #$03
    ORA $EC
    STA $046A,X
    INY
    LDA ($E6),Y
    STA $0469,X
    LDA $98
    CLC
    ADC #$04
    STA $98
    LDA $E6
    CLC
    ADC #$02
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    JMP $9515
    @E589: CMP #$A0
    BCS @E5AF
    LDX #$00
    ASL A
    ASL A
    ASL A
    STA $EA
    BPL @E597
    DEX
    @E597: STX $EB
    LDA $9A
    CLC
    ADC $EA
    STA $EA
    LDA $9B
    ADC $EB
    STA $EB
    INC $E6
    BNE @E5AC
    INC $E7
    @E5AC: JMP $9515
    @E5AF: CMP #$C0
    BCS @E5E5
    TAX
    LDY #$00
    LDA ($94),Y
    ASL A
    BPL @E5C2
    TXA
    EOR #$FF
    CLC
    ADC #$01
    TAX
    @E5C2: TXA
    LDX #$00
    ASL A
    ASL A
    ASL A
    STA $E8
    BPL @E5CD
    DEX
    @E5CD: STX $E9
    LDA $9C
    CLC
    ADC $E8
    STA $E8
    LDA $9D
    ADC $E9
    STA $E9
    INC $E6
    BNE @E5E2
    INC $E7
    @E5E2: JMP $9515
    @E5E5: CMP #$D0
    BCC @E5EC
    JMP $9684
    @E5EC: TAX
    LDY #$00
    LDA ($94),Y
    ASL A
    BPL @E5FB
    TXA
    EOR #$FF
    CLC
    ADC #$01
    TAX
    @E5FB: TXA
    AND #$08
    BNE @E608
    TXA
    AND #$07
    LDY #$00
    JMP $960D
    @E608: TXA
    ORA #$F0
    LDY #$FF
    CLC
    ADC $E8
    LDX $98
    STA $046B,X
    TYA
    ADC $E9
    AND #$01
    STA $EC
    LDY #$01
    LDA ($E6),Y
    AND #$3C
    LSR A
    LSR A
    TAY
    AND #$08
    BNE @E637
    TYA
    CLC
    ADC $EA
    STA $0468,X
    LDA $EB
    ADC #$00
    JMP $9645
    @E637: TYA
    CLC
    ADC #$F0
    CLC
    ADC $EA
    STA $0468,X
    LDA $EB
    SBC #$00
    AND #$01
    ASL A
    ORA $EC
    ASL A
    ASL A
    STA $EC
    LDY #$01
    LDA ($E6),Y
    LDY #$00
    EOR ($94),Y
    AND #$40
    ORA $EC
    STA $EC
    LDY #$01
    LDA ($E6),Y
    AND #$03
    ORA $EC
    STA $046A,X
    INY
    LDA ($E6),Y
    STA $0469,X
    LDA $98
    CLC
    ADC #$04
    STA $98
    LDA $E6
    CLC
    ADC #$03
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    JMP $9515
    SEC
    SBC #$F8
    ASL A
    TAX
    LDA $9693,X
    PHA
    LDA $9692,X
    PHA
    RTS
    LDA ($96,X)
    LDA ($96,X)
    LDY $96
    DEC $96
    LDA ($96,X)
    LDA ($96,X)
    CMP $96,X
    SBC ($96),Y
    JMP $96A2
    LDY #$13
    LDA ($94),Y
    CMP #$04
    @E6AB: BCS @E6AB
    TAX
    CLC
    ADC #$01
    STA ($94),Y
    TXA
    ASL A
    CLC
    ADC #$18
    TAY
    LDA $E6
    CLC
    ADC #$03
    STA ($94),Y
    LDA $E7
    ADC #$00
    INY
    STA ($94),Y
    LDY #$01
    LDA ($E6),Y
    TAX
    INY
    LDA ($E6),Y
    STA $E7
    STX $E6
    JMP $9515
    LDY #$13
    LDA ($94),Y
    @E6DA: BEQ @E6DA
    SEC
    SBC #$01
    STA ($94),Y
    ASL A
    CLC
    ADC #$18
    TAY
    LDA ($94),Y
    STA $E6
    INY
    LDA ($94),Y
    STA $E7
    JMP $9515
    LDY #$00
    LDA ($94),Y
    AND #$08
    BNE @E703
    LDA ($94),Y
    ORA #$08
    STA ($94),Y
    JMP $9727
    @E703: LDY #$10
    LDA ($94),Y
    INY
    CLC
    ADC ($94),Y
    SEC
    SBC $98
    BEQ @E734
    BCC @E727
    LSR A
    LSR A
    TAY
    LDX $98
    @E717: LDA #$F8
    STA $0468,X
    TXA
    CLC
    ADC #$04
    TAX
    DEY
    BNE @E717
    JMP $9734
    @E727: LDA $98
    TAX
    LDY #$10
    SEC
    SBC ($94),Y
    INY
    STA ($94),Y
    STX $97
    @E734: RTS
    TAX
    LDA #$00
    STA ($94),Y
    INY
    TXA
    STA ($94),Y
    ASL A
    STA $0095,Y
    LDA #$00
    ADC #$00
    STA $0096,Y
    RTS
    LDA ($94),Y
    ASL A
    INY
    LDA ($94),Y
    ROL A
    STA $0095,Y
    LDA #$00
    ROL A
    STA $0096,Y
    RTS
    STX $ED
    LDA ($94),Y
    ROL A
    ROL A
    AND #$01
    EOR #$FF
    CLC
    ADC #$01
    TAX
    LDA ($94),Y
    DEY
    DEY
    CLC
    ADC ($94),Y
    STA ($94),Y
    STA $EC
    INY
    TXA
    ADC ($94),Y
    STA ($94),Y
    TAX
    LDY $ED
    LDA $EC
    CLC
    ADC ($94),Y
    STA ($94),Y
    TXA
    INY
    ADC ($94),Y
    STA ($94),Y
    RTS
    .byte $80
    ORA ($00,X)
    BRK
    BRK
    BMI @E792
    @E792: RTI
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    LDA #$00
    STA $E9
    LDA #$01
    STA $EB
    JMP $97C4
    LDA #$00
    STA $E9
    LDA $4A
    ORA $4B
    BEQ @E819
    LDA #$00
    STA $EB
    STY $E6
    STX $E7
    @E7C8: LDY #$01
    LDA ($E6),Y
    CLC
    ADC $E9
    STA $E8
    INY
    LDA #$00
    BIT $E9
    BPL @E7DA
    LDA #$FF
    @E7DA: ADC ($E6),Y
    TAX
    LDY #$00
    LDA ($E6),Y
    LDY $E8
    STA $E8
    AND #$BF
    JSR $9B28
    LDA $E8
    AND #$3F
    LDY #$03
    @E7F0: PHA
    LDA ($E6),Y
    STA $05E8,X
    INY
    INX
    PLA
    SEC
    SBC #$01
    BNE @E7F0
    TYA
    CLC
    ADC $E6
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    JSR $9B5E
    LDA $EB
    BEQ @E814
    JSR $9FA8
    @E814: BIT $E8
    BVC @E7C8
    RTS
    @E819: LDA $20
    AND #$7F
    STA $2000
    STA $20
    LDA $21
    AND #$E7
    STA $2001
    STA $21
    STY $E6
    STX $E7
    LDY #$01
    LDA ($E6),Y
    CLC
    ADC $E9
    TAX
    INY
    LDA #$00
    BIT $E9
    BPL @E840
    LDA #$FF
    @E840: ADC ($E6),Y
    STA $2006
    STX $2006
    LDX #$00
    LDY #$00
    LDA ($E6),Y
    BPL @E852
    LDX #$04
    @E852: STX $2000
    PHA
    AND #$3F
    TAX
    LDY #$03
    @E85B: LDA ($E6),Y
    STA $2007
    INY
    DEX
    BNE @E85B
    PLA
    ASL A
    BMI @E877
    TYA
    CLC
    ADC $E6
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    JMP $982F
    @E877: LDA $21
    ORA #$18
    STA $2001
    STA $21
    LDA $20
    ORA #$80
    STA $20
    STA $2000
    RTS
    STY $E6
    STX $E7
    LDY $E9
    LDX #$01
    JMP $98EA
    STY $E6
    STX $E7
    LDX $E9
    LDY #$01
    JMP $98EA
    LDA $20
    AND #$7F
    STA $2000
    STA $20
    LDA $21
    AND #$E7
    STA $2001
    STA $21
    LDA #$20
    STA $2006
    LDA #$00
    STA $2006
    LDY #$08
    LDA #$00
    TAX
    @E8C1: STA $2007
    INX
    BNE @E8C1
    DEY
    BNE @E8C1
    LDA $21
    ORA #$18
    STA $2001
    STA $21
    LDA $20
    ORA #$80
    STA $20
    STA $2000
    RTS
    LDA #$00
    STA $EB
    TYA
    ORA #$80
    TAY
    JMP $98F2
    LDA #$00
    STA $EB
    LDA $4A
    ORA $4B
    BEQ @E92C
    STY $E8
    STX $E9
    @E8F6: LDA $E9
    LDY $E6
    LDX $E7
    JSR $9B28
    LDY $E9
    LDA $EB
    @E903: STA $05E8,X
    INX
    DEY
    BNE @E903
    JSR $9B5E
    LDA $E8
    BPL @E916
    LDA #$01
    JSR $9FA8
    @E916: LDA $E6
    CLC
    ADC #$20
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    DEC $E8
    LDA $E8
    AND #$7F
    BNE @E8F6
    RTS
    @E92C: LDA $20
    AND #$7F
    STA $2000
    STA $20
    LDA $21
    AND #$E7
    STA $2001
    STA $21
    STX $E9
    STY $E8
    @E942: LDY $E9
    LDA $E7
    STA $2006
    LDA $E6
    STA $2006
    LDA $EB
    @E950: STA $2007
    DEY
    BNE @E950
    LDA $E6
    CLC
    ADC #$20
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    DEC $E8
    BNE @E942
    LDA $21
    ORA #$18
    STA $2001
    STA $21
    LDA $20
    ORA #$80
    STA $20
    STA $2000
    RTS
    STA $48
    STX $49
    JSR $9B07
    JSR $9AB8
    JSR $9ADA
    LDX $E9
    JSR $C4B9
    @E98C: LDA $4A
    CMP #$0F
    BCS @E994
    INC $4A
    @E994: LDA $4B
    CMP #$0F
    BCS @E99C
    INC $4B
    @E99C: JSR $9A71
    LDA #$01
    JSR $9FA8
    LDA $4A
    CLC
    ADC $4B
    CMP #$1E
    BCC @E98C
    RTS
    STA $48
    JSR $9B07
    JSR $9AB8
    LDX $E9
    JSR $C4B9
    LDA $4A
    CMP #$0F
    BCS @E9CE
    INC $4A
    JSR $9A71
    LDA #$01
    JSR $9FA8
    JMP $99BB
    @E9CE: RTS
    STX $49
    JSR $9B07
    JSR $9ADA
    LDX $E9
    JSR $C4B9
    LDA $4B
    CMP #$0F
    BCS @E9EF
    INC $4B
    JSR $9A71
    LDA #$01
    JSR $9FA8
    JMP $99DC
    @E9EF: RTS
    LDA $4A
    ORA $4B
    BEQ @EA0C
    TAX
    BEQ @E9FB
    DEC $4A
    @E9FB: LDA $4B
    BEQ @EA01
    DEC $4B
    @EA01: JSR $9A71
    LDA #$01
    JSR $9FA8
    JMP $99F0
    @EA0C: RTS
    LDA $4A
    BEQ @EA1E
    DEC $4A
    JSR $9A71
    LDA #$01
    JSR $9FA8
    JMP $9A0D
    @EA1E: RTS
    LDA $4B
    BEQ @EA30
    DEC $4B
    JSR $9A71
    LDA #$01
    JSR $9FA8
    JMP $9A1F
    @EA30: RTS
    STA $48
    STX $49
    JSR $9B07
    JSR $9AB8
    JSR $9ADA
    LDX $E9
    JSR $C4B9
    LDA #$0F
    STA $4A
    STA $4B
    JMP $9A71
    STA $48
    JSR $9B07
    JSR $9AB8
    LDX $E9
    JSR $C4B9
    LDA #$0F
    STA $4A
    JMP $9A71
    STA $49
    JSR $9B07
    JSR $9ADA
    LDX $E9
    JSR $C4B9
    LDA #$0F
    STA $4B
    LDA #$20
    LDY #$00
    LDX #$3F
    JSR $9B28
    STX $E7
    LDY #$00
    @EA7E: LDA $062A,Y
    AND #$30
    CLC
    ADC $4A
    JSR $9AA2
    CPY #$10
    BNE @EA7E
    @EA8D: LDA $062A,Y
    AND #$30
    CLC
    ADC $4B
    JSR $9AA2
    CPY #$20
    BNE @EA8D
    LDX $E7
    JSR $9B5E
    RTS
    TAX
    LDA $9EA2,X
    STA $E6
    LDA $062A,Y
    AND #$0F
    ORA $E6
    LDX $E7
    STA $05E8,X
    INC $E7
    INY
    RTS
    LDA #$00
    STA $E7
    LDA $48
    ASL A
    ROL $E7
    ASL A
    ROL $E7
    ASL A
    ROL $E7
    ASL A
    ROL $E7
    CLC
    ADC #$00
    STA $E6
    LDA $E7
    ADC #$B0
    STA $E7
    LDX #$00
    JMP $9AF9
    LDA #$00
    STA $E7
    LDA $49
    ASL A
    ROL $E7
    ASL A
    ROL $E7
    ASL A
    ROL $E7
    ASL A
    ROL $E7
    CLC
    ADC #$00
    STA $E6
    LDA $E7
    ADC #$B3
    STA $E7
    LDX #$10
    LDY #$00
    @EAFB: LDA ($E6),Y
    STA $062A,X
    INX
    INY
    CPY #$10
    BNE @EAFB
    RTS
    LDA $25
    STA $E9
    LDX #$06
    JSR $C4B9
    RTS
    LDA #$00
    STA $48
    STA $49
    STA $4A
    STA $4B
    LDA #$0F
    LDY #$E0
    @EB1F: STA $054A,Y
    INY
    BNE @EB1F
    JMP $9A71
    PHA
    BIT $0629
    BVC @EB37
    @EB2E: LDA #$01
    JSR $9FA8
    PLA
    JMP $9B28
    @EB37: AND #$3F
    CLC
    ADC $0628
    CMP #$3D
    BCS @EB2E
    PLA
    ORA #$40
    STA $0629
    TXA
    LDX $0628
    STA $05EA,X
    TYA
    STA $05E9,X
    LDA $0629
    AND #$BF
    STA $05E8,X
    INX
    INX
    INX
    RTS
    LDA #$00
    STA $05E8,X
    STX $0628
    LDA $0629
    AND #$BF
    STA $0629
    RTS
    STX $9E
    STY $9F
    RTS
    STX $A0
    STY $A1
    LDA $9E
    ORA #$80
    STA $9E
    RTS
    LDX #$00
    LDA #$F8
    @EB83: STA $0468,X
    INX
    BNE @EB83
    LDA #$F8
    @EB8B: STA $0200,X
    INX
    BNE @EB8B
    LDA #$00
    STA $0568
    STA $0588
    STA $05A8
    STA $05C8
    RTS
    JSR $99F0
    JSR $98A0
    JMP $9B7F
    STA $46
    TAY
    BMI @EBBC
    CLC
    ADC $44
    CMP #$F0
    BCC @EBB9
    ADC #$0F
    INC $45
    @EBB9: STA $44
    RTS
    @EBBC: CLC
    ADC $44
    CMP #$F0
    BCC @EBC7
    SBC #$10
    DEC $45
    @EBC7: STA $44
    RTS
    STA $47
    PHA
    CLC
    ADC $7A
    STA $7A
    PLA
    BMI @EBDC
    LDA $7B
    ADC #$00
    JMP $9BE0
    @EBDC: LDA $7B
    SBC #$00
    STA $7B
    RTS
    STX $E7
    STY $E6
    TAY
    @EBE8: LDA #$01
    JSR $9FA8
    LDA $1E
    JSR $9CE7
    LDA $1E
    AND #$90
    BPL @EBE8
    @EBF8: LDA $0468,Y
    TAX
    SEC
    SBC $E7
    LSR A
    LSR A
    LSR A
    STA $E7
    LDA #$F8
    STA $0468,Y
    LDA $E7
    CLC
    RTS
    @EC0D: LDA #$01
    JSR $9FA8
    LDA $1E
    JSR $9CE7
    LDA $1E
    AND #$90
    BNE @EBF8
    BIT $1E
    BVC @EC0D
    LDA #$F8
    STA $0468,Y
    SEC
    RTS
    STY $E6
    STX $E7
    TAY
    LDA ($E6),Y
    TAX
    INY
    LDA ($E6),Y
    STA $E7
    STX $E6
    JMP ($00E6)
    LDA #$00
    STA $E9
    STY $E6
    STX $E7
    LDY #$00
    LDA ($E6),Y
    TAX
    INY
    LDA ($E6),Y
    STA $E8
    CMP $E9
    BNE @EC53
    CLC
    ADC #$10
    @EC53: STA $0468,X
    INX
    INY
    @EC58: LDA ($E6),Y
    STA $0468,X
    INX
    INY
    CPY #$05
    BNE @EC58
    LDA ($E6),Y
    STA $E6
    TXA
    SEC
    SBC #$04
    TAY
    LDA $E8
    STA $E7
    RTS
    LDA #$10
    STA $E8
    @EC75: LDA $1C
    JSR $9CE7
    BCC @ECC8
    LDX $E9
    CPX #$FF
    BEQ @EC89
    CMP $E9
    BEQ @EC75
    JMP $9CB3
    @EC89: CMP $EB
    BEQ @EC75
    LDA $055C
    CMP #$B8
    BCC @EC97
    SEC
    SBC #$10
    @EC97: TAY
    LDX $055F
    JSR $9D08
    LDY #$00
    LDA ($34),Y
    LDY #$F4
    CMP $0451
    BEQ @EC75
    CMP $0452
    BEQ @EC75
    CMP $0453
    BEQ @EC75
    @ECB3: LDA #$01
    JSR $9FA8
    LDX $1C
    LDA $9EE2,X
    BEQ @ECC8
    DEC $E8
    BNE @ECB3
    LDA #$08
    JMP $9C73
    @ECC8: RTS
    LDA #$00
    JSR $9CD3
    JSR $9C71
    LDA #$02
    LDX $046B,Y
    BMI @ECE6
    PHA
    LDA $0468,Y
    SEC
    SBC $E7
    LSR A
    LSR A
    TAX
    PLA
    STA $046A,X
    @ECE6: RTS
    AND #$0F
    TAX
    LDA $9EE2,X
    BEQ @ED06
    CLC
    ADC $0468,Y
    CMP $E7
    BCS @ECF9
    LDA $E6
    @ECF9: CMP $E6
    BEQ @ED01
    BCC @ED01
    LDA $E7
    @ED01: STA $0468,Y
    SEC
    RTS
    @ED06: CLC
    RTS
    TXA
    BMI @ED1A
    TYA
    EOR #$FF
    SEC
    SBC #$28
    LSR A
    LSR A
    LSR A
    LSR A
    STA $ED
    JMP $C50C
    @ED1A: TYA
    LSR A
    LSR A
    LSR A
    LSR A
    CLC
    ADC #$14
    STA $ED
    JMP $C50C
    STY $E6
    STX $E7
    @ED2B: LDY #$00
    LDA ($E6),Y
    STA $E8
    INY
    LDA ($E6),Y
    STA $E9
    STY $EB
    JSR $9D58
    TAX
    INC $EB
    LDA $EB
    CLC
    ADC $E6
    STA $E6
    LDA $E7
    ADC #$00
    STA $E7
    CPX #$FF
    BNE @ED2B
    RTS
    STY $E6
    STX $E7
    LDA #$FF
    STA $EB
    INC $EB
    LDY $EB
    LDA ($E6),Y
    CMP #$FC
    BCS @ED72
    LDY $E8
    LDX $E9
    JSR $88CA
    INC $E8
    BNE @ED6F
    INC $E9
    @ED6F: JMP $9D58
    @ED72: RTS
    STA $E8
    JSR $9B28
    LDA $E8
    AND #$3F
    STA $E8
    LDY #$00
    @ED80: LDA ($E6),Y
    STA $05E8,X
    INY
    INX
    DEC $E8
    BNE @ED80
    JMP $9B5E
    STA $EC
    LDA #$02
    JSR $9B28
    LDA $EC
    LSR A
    LSR A
    LSR A
    LSR A
    BNE @ED9F
    LDA #$CD
    @ED9F: CLC
    ADC #$33
    STA $05E8,X
    INX
    LDA $EC
    AND #$0F
    CLC
    ADC #$33
    STA $05E8,X
    INX
    JSR $9B5E
    RTS
    LDA #$04
    JSR $9B28
    LDA #$00
    STA $E7
    LDA $ED
    JSR $9DDA
    LDA $ED
    JSR $9DDE
    LDA $EC
    JSR $9DDA
    LDA #$33
    STA $E7
    LDA $EC
    JSR $9DDE
    JSR $9B5E
    RTS
    LSR A
    LSR A
    LSR A
    LSR A
    AND #$0F
    BEQ @EDE6
    LDY #$33
    STY $E7
    @EDE6: CLC
    ADC $E7
    STA $05E8,X
    INX
    RTS
    STA $ED
    LDA #$00
    STA $EC
    LDY #$08
    @EDF6: ASL $EC
    ROL $ED
    BCC @EE08
    TXA
    CLC
    ADC $EC
    STA $EC
    LDA $ED
    ADC #$00
    STA $ED
    @EE08: DEY
    BNE @EDF6
    RTS
    LDA #$00
    STA $E8
    STA $E9
    LDX #$10
    @EE14: ASL $EC
    ROL $ED
    ROL $E8
    ROL $E9
    LDA $E8
    SEC
    SBC $EA
    TAY
    LDA $E9
    SBC $EB
    BCC @EE32
    STA $E9
    STY $E8
    INC $EC
    BNE @EE32
    INC $ED
    @EE32: DEX
    BNE @EE14
    RTS
    LDA #$00
    STA $EA
    LDX #$08
    @EE3C: ASL $ED
    ROL $EA
    LDA $EA
    SEC
    SBC $EC
    BCC @EE4B
    STA $EA
    INC $ED
    @EE4B: DEX
    BNE @EE3C
    RTS
    LDA #$0A
    STA $EA
    LDA #$00
    STA $EB
    LDA #$03
    STA $E6
    @EE5B: JSR $9E0C
    LDA $E8
    STA $E7
    JSR $9E0C
    LDA $E8
    ASL A
    ASL A
    ASL A
    ASL A
    ORA $E7
    PHA
    DEC $E6
    BNE @EE5B
    PLA
    STA $EA
    PLA
    STA $E9
    PLA
    STA $E8
    RTS
    STA $ED
    LDA #$0A
    STA $EC
    JSR $9E36
    LDA $EA
    STA $EB
    JSR $9E36
    LDA $EA
    ASL A
    ASL A
    ASL A
    ASL A
    ORA $EB
    STA $EB
    JSR $9E36
    LDA $EA
    STA $ED
    LDA $EB
    STA $EC
    RTS
    .byte $0F
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    BRK
    .byte $0F
    BRK
    BRK
    BRK
    BRK
    BRK
    BPL @EECA
    JSR $3020
    BMI @EEDF
    JSR $1010
    .byte $0F
    BRK
    BRK
    BRK
    BPL @EED8
    BPL @EEEA
    @EECA: JSR $3020
    BMI @EEFF
    JSR $2020
    .byte $0F
    BRK
    BPL @EEE6
    BPL @EEF8
    @EED8: JSR $3030
    BMI @EF0D
    BMI @EF0F
    @EEDF: BMI @EF11
    BMI @EEE3
    @EEE3: BRK
    BRK
    BRK
    @EEE6: BPL @EEE8
    @EEE8: BRK
    BRK
    @EEEA: BEQ @EEEC
    @EEEC: BRK
    LDX #$01
    @EEEF: LDA $00,X
    BEQ @EEFB
    CMP #$FF
    BEQ @EF52
    .byte $D6
  @EEF8: .byte $00
    BEQ @EF0F
    @EEFB: TXA
    CLC
    ADC #$04
    @EEFF: TAX
    CPX #$19
    BNE @EEEF
    @EF04: LDA $1B
    BPL @EF04
    AND #$7F
    STA $1B
  @EF0D: JMP $9EED
    @EF0F: STX $00
    @EF11: LDA #$07
    ORA $22
    STA $23
    STA $8000
    LDA $03,X
    STA $25
    STA $8001
    LDA #$06
    ORA $22
    STA $23
    STA $8000
    LDA $02,X
    STA $24
    STA $8001
    LDA $01,X
    TAX
    TXS
    PLA
    STA $E6
    PLA
    STA $E7
    PLA
    STA $E8
    PLA
    STA $E9
    PLA
    STA $EA
    PLA
    STA $EB
    PLA
    STA $EC
    PLA
    STA $ED
    PLA
    TAY
    PLA
    TAX
    RTS
    @EF52: STX $00
    LDA #$06
    ORA $22
    STA $23
    STA $8000
    LDA $02,X
    STA $24
    STA $8001
    LDA $01,X
    TAX
    TXS
    RTS
    STA $02,X
    DEY
    DEY
    LDA $00,X
    STA $0101,Y
    LDA $01,X
    STA $0102,Y
    STY $01,X
    LDA #$FF
    STA $00,X
    RTS
    LDA #$00
    LDX $00
    STA $00,X
    STA $01,X
    JMP $9EFB
    LDA $01,X
    BEQ @EF95
    LDA $00,X
    BNE @EF95
    LDA #$01
    STA $00,X
    @EF95: RTS
    LDA $00,X
    CMP #$FF
    BNE @EFA1
    LDA #$01
    JSR $9FA8
    @EFA1: LDA #$00
    STA $00,X
    RTS
    LDA #$00
    STA $19
    TXA
    PHA
    TYA
    PHA
    LDA $ED
    PHA
    LDA $EC
    PHA
    LDA $EB
    PHA
    LDA $EA
    PHA
    LDA $E9
    PHA
    LDA $E8
    PHA
    LDA $E7
    PHA
    LDA $E6
    PHA
    TSX
    TXA
    LDX $00
    STA $01,X
    LDA $0024
    STA $02,X
    LDA $0025
    STA $03,X
    LDA $19
    BEQ @EFDE
    CMP #$FF
    BNE @EFE0
    @EFDE: LDA #$FE
    @EFE0: STA $00,X
    JMP $9EFB
    .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_00: readonly number[] = [
  ...builddispatch(),
  ...buildjumpVectors(),
  ...buildsceneLoop(),
  ...buildscriptEngine(),
  ...builddataTables(),
  ...buildsceneTables(),
  ...buildbytecodeHandlers(),
  ...buildscheduler(),
  ...buildcontextSave(),
  ...buildpadding(),
];
