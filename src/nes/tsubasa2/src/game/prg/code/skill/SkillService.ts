/**
 * SkillService — 技能/必杀技判定（原 bank16）
 *
 * 行为翻译（去 CPU 化）：
 * - bank16 $8000 入口：根据 ram_0518 选择技能指针 → 加载动作序列
 * - $8677：动作序列执行器（读取 ram_0444 → 查表 → 调用动作）
 * - $86A6/$86C8/$86E3：技能匹配表（触发值/动作ID映射）
 * - $8138/$8150：动作分发（调用对应子程）
 *
 * bank 切换语义 = import SkillService + 直接调用方法，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import {
  SKILL_TABLE, SKILL_POINTER_TABLE, SKILL_MOVE_ID_TABLE, SKILL_TRIGGER_TABLE,
  findSkillByMoveId, findSkillsByPlayer,
} from '../../data/tables/skill-table';

/** 技能触发请求（对应 ram_0518/0516 系列输入） */
export interface SkillTriggerRequest {
  /** 当前球员索引（ram_0616） */
  readonly playerIdx: number;
  /** 技能选择值（ram_0518） */
  readonly selector: number;
  /** 技能状态标志（ram_0516 位域） */
  readonly flags: number;
}

/** 技能动作执行结果 */
export interface SkillActionResult {
  /** 动作类型（原 ram_0523） */
  readonly actionType: number;
  /** 目标 X（原 ram_0524） */
  readonly targetX: number;
  /** 目标 Y（原 ram_0528） */
  readonly targetY: number;
  /** 附加参数（原 ram_0529） */
  readonly param: number;
}

export class SkillService {
  constructor(readonly store: DataStore) {}

  /**
   * 加载技能动作序列（原 bank16 $8008-$8020）
   *
   * 逐指令对照：
   *   $8007: .byte $A2,$89         ; LDX #$89（X 初始=$89，指针表高字节基址）
   *   $8008: LDA $0518             ; A = selector（技能选择值）
   *   $800B: ASL                   ; A <<= 1（C = bit7）
   *   $800C: TAY                  ; Y = A<<1
   *   $800D: BCC $8010            ; if C=0 (selector bit7=0) skip INX
   *   $800F: INX                  ; X++ ($89 → $8A，高字节+1）
   *   $8010: LDA #$BF             ; A = $BF（指针表基址低字节）
   *   $8012: STA $005D            ; ram_005D = $BF
   *   $8014: STX $005E            ; ram_005E = X ($89/$8A)
   *   $8016: LDA ($005D),Y        ; A = [ram_005D+Y]（指针表项 lo）
   *   $8018: TAX                  ; X = lo
   *   $8019: INY                  ; Y++
   *   $801A: LDA ($005D),Y        ; A = [ram_005D+Y]（指针表项 hi）
   *   $801C: STA $005E            ; ram_005E = hi
   *   $801E: STX $005D            ; ram_005D = lo
   *   $8020: RTS                  ; 返回（ram_005D/005E = 动作序列地址）
   *
   * 注意：此方法只设置 ram_005D/005E（指针），ram_052A 在 $8021 之后才设置。
   * ram_0516 &= #$FB 在 $802A（parseSkillSegment 内部）。
   *
   * 行为：selector 查 SKILL_POINTER_TABLE → 返回 16 位动作序列地址。
   */
  loadSkillSequence(selector: number): number {
    // 原 $8008-$8020：LDX #$89; LDA $0518; ASL; TAY; BCC; INX; 查指针表
    const idx = (selector << 1) & 0xFE; // ASL; TAY → Y = selector << 1
    const hiBit = (selector >> 7) & 1;   // BCC 判 bit7
    const entry = SKILL_POINTER_TABLE[idx >>> 1];
    if (!entry) return 0;
    // 指针表项：lo, hi → 16 位地址（原 ram_005D=lo, ram_005E=hi）
    const base = (entry.hi << 8) | entry.lo;
    // 只设置 ram_005D/005E（指针），不设置 ram_052A（在 $8021 后）
    this.store.write('ram_005D', entry.lo);
    this.store.write('ram_005E', entry.hi);
    return base;
  }

  /**
   * 解析动作序列段（原 bank16 $8021-$80A5）
   *
   * 逐指令对照：
   *   $8021: JMP $8023（跳过 .byte $AD,$17,$05 的 LDA $0517）
   *   $8024: STA $052A            ; ram_052A = ram_0517（序列基址从 0517 取）
   *   $8027: LDA $0516; AND #$FB; STA $0516  ; ram_0516 &= ~0x04
   *   $802F: LDA #$00; STA $052B; STA $052D; STA $052C; STA $0530; STA $003A
   *         ; 清零 ram_052B/052D/052C/0530/003A
   *   $803F: LDY $003A; INC $003A  ; Y=cursor; cursor++
   *   $8043: LDA ($005D),Y         ; A = [ram_005D+Y]（序列字节）
   *   $8045: CMP #$F0; BCC $804F   ; if A < $F0 → 正常值
   *   $8049: JSR $80A9; JMP $803F  ; 扩展标记 → 调用 $80A9 → 继续循环
   *   $804F: STA $0523             ; ram_0523 = A（actionType）
   *   $8052: LDA $0516; ORA #$40; AND #$EF; STA $0516  ; ram_0516 = (ram_0516|0x40)&~0x10
   *   $805C: LDY $003A; INC $003A; LDA ($005D),Y; CMP #$F0; BCC $8069
   *         ; 读 targetX（ram_0524），$F0+ → JSR $8991
   *   $8069: STA $0524             ; ram_0524 = targetX
   *   $806C: LDY $003A; INC $003A; LDA ($005D),Y; CMP #$F0; BCC $8079
   *         ; 读 targetY（ram_0528），$F0+ → JSR $899C
   *   $8079: STA $0528             ; ram_0528 = targetY
   *   $807C: LDY $003A; INC $003A; LDA ($005D),Y; CMP #$F0; BCC $8089
   *         ; 读 param（ram_0529），$F0+ → JSR $89A7
   *   $8089: STA $0529             ; ram_0529 = param
   *   $808C: LDA $003A; CLC; ADC $005D; STA $005D; BCC; INC $005E
   *         ; ram_005D += cursor（推进指针）
   */
  parseSkillSegment(): SkillActionResult | null {
    const store = this.store;
    // $8024: ram_052A = ram_0517
    store.write('ram_052A', store.read('ram_0517'));
    // $8027: ram_0516 &= ~0x04
    store.write('ram_0516', store.read('ram_0516') & ~0x04);
    // $802F: 清零
    store.write('ram_052B', 0);
    store.write('ram_052D', 0);
    store.write('ram_052C', 0);
    store.write('ram_0530', 0);
    store.write('ram_003A', 0);
    // $803F: 循环读取序列
    let cursor = store.read('ram_003A');
    const readSeqByte = (): number => {
      store.write('ram_003A', cursor + 1);
      cursor++;
      // 原 LDA ($005D),Y → H5 通过指针读取（ram_005D = 序列基址 lo）
      const ptrLo = store.read('ram_005D');
      return store.read(`ram_seq_${ptrLo + cursor - 1}`);
    };
    // $8043: actionType
    const actionType = readSeqByte();
    if (actionType >= 0xF0) {
      // $8049: JSR $80A9（扩展标记处理）→ JMP $803F（继续循环）
      return null;
    }
    store.write('ram_0523', actionType);
    // $8052: ram_0516 = (ram_0516 | 0x40) & ~0x10
    store.write('ram_0516', (store.read('ram_0516') | 0x40) & ~0x10);
    // $805C: targetX
    const targetX = readSeqByte();
    if (targetX >= 0xF0) return null; // JSR $8991
    store.write('ram_0524', targetX);
    // $806C: targetY
    const targetY = readSeqByte();
    if (targetY >= 0xF0) return null; // JSR $899C
    store.write('ram_0528', targetY);
    // $807C: param
    const param = readSeqByte();
    if (param >= 0xF0) return null; // JSR $89A7
    store.write('ram_0529', param);
    // $808C: 推进指针 ram_005D += cursor
    const ptrLo = store.read('ram_005D');
    const newPtr = (ptrLo + cursor) & 0xFF;
    store.write('ram_005D', newPtr);
    if (ptrLo + cursor > 0xFF) {
      store.write('ram_005E', (store.read('ram_005E') + 1) & 0xFF);
    }
    return { actionType, targetX, targetY, param };
  }

  /**
   * 查找球员可用的必杀技（原 bank16 $86E3 表查询）
   */
  findPlayerSkills(playerId: number): number[] {
    return findSkillsByPlayer(playerId);
  }

  /**
   * 检查必杀技触发（原 bank16 $86B8-$86C7）
   *
   * 逐指令对照：
   *   $86B8: LDA $043C; AND #$7F   ; A = moveId & 0x7F
   *   $86BD: CMP $86C8,X          ; A vs SKILL_TRIGGER_TABLE[X]
   *   $86C0: BEQ $86C7            ; 相等 → RTS（触发）
   *   $86C2: INX                  ; X++
   *   $86C3: CPX #$04             ; X < 4?
   *   $86C5: BNE $86BD            ; 继续
   *   $86C7: RTS
   */
  checkSkillTrigger(moveId: number): boolean {
    const masked = moveId & 0x7F;
    // 原 CPX #$04：只遍历 4 项
    for (let i = 0; i < 4 && i < SKILL_TRIGGER_TABLE.length; i++) {
      if (SKILL_TRIGGER_TABLE[i] === masked) return true;
    }
    return false;
  }

  /**
   * 查找必杀技动作 ID（原 bank16 $86A6 表 + $86E3 映射）
   *
   * 行为：遍历 7 项匹配表，命中则加载对应动作。
   */
  findSkillActionId(actionValue: number): number | null {
    // 原 $8690-$86A5：CMP $86A6,Y; BEQ; INY×2; CPY #$0E
    for (let i = 0; i < SKILL_MOVE_ID_TABLE.length; i++) {
      if (SKILL_MOVE_ID_TABLE[i] === actionValue) {
        return SKILL_MOVE_ID_TABLE[i + 1] ?? 0;
      }
    }
    return null;
  }

  /**
   * 查询技能（byMoveId 契约保留）
   */
  byMoveId(moveId: number): number[] {
    const skill = findSkillByMoveId(moveId);
    return skill ? [skill.moveId] : [];
  }

  /** 导出表供外部访问 */
  get table() { return SKILL_TABLE; }
  get pointers() { return SKILL_POINTER_TABLE; }
}
