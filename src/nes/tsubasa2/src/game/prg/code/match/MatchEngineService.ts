/**
 * MatchEngineService — bank26 比赛核心引擎 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 26
 *
 * 职责: 比赛主循环、回合状态机、球员移动/传球/射门、比赛时钟。
 *   入口 $803E: 比赛主循环 (清状态 → JSR $C600 → 回合分派 → 球员行动 → 帧推进)。
 *   $8000-$803C: 跳转表 (12项 JMP, 各比赛子程入口)。
 *   $803E-$8127: 主循环 (回合推进/球员选择/行动分派)。
 *   $8127+: 回合结束/比赛结束处理。
 *
 * 代码量: code_main 981行 + code_sub 1065行 + code_data 1083行 = 3129行指令 (最大 bank)。
 * 消费方: bank00 (主循环调度) 切 bank26 执行比赛。
 *
 * 命名规范: 旧名 Bank26Service → 新名 MatchEngineService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchEngineService {
  protected _store: DataStore;
  protected _system: GameSystemService;

  constructor(store: DataStore, system: GameSystemService) {
    this._store = store;
    this._system = system;
  }

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }

  // ════════════════════════════════════════════════════════════
  // $8000-$803C 跳转表 (12项 JMP, 各比赛子程入口)
  // ════════════════════════════════════════════════════════════

  /** $800C: JMP $8835 — 比赛初始化 */
  matchInit(): void { this.sub8835(); }
  /** $800F: JMP $87E1 — 回合开始 */
  turnStart(): void { this.sub87E1(); }
  /** $8012: JMP $888D — 球员选择 */
  playerSelect(): void { this.sub888D(); }
  /** $8015: JMP $88A8 — 行动选择 */
  actionSelect(): void { this.sub88A8(); }
  /** $801E: JMP $8B4A — 比赛续行 */
  matchContinue(): void { this.sub8B4A(); }
  /** $8021: JMP $8F72 — 回合推进 */
  turnAdvance(): void { this.sub8F72(); }
  /** $8024: JMP $8CA4 — 球员移动 */
  playerMove(): void { this.sub8CA4(); }
  /** $8027: JMP $8127 — 回合结束 */
  turnEnd(): void { this.sub8127(); }
  /** $802A: JMP $A1EB — 比赛结束 */
  matchEnd(): void { this.subA1EB(); }
  /** $802D: JMP $987B — 精灵更新 */
  spriteUpdate(): void { this.sub987B(); }
  /** $8030: JMP $95E1 — 传球 */
  passBall(): void { this.sub95E1(); }
  /** $8033: JMP $8E86 — 射门 */
  shoot(): void { this.sub8E86(); }
  /** $8036: JMP $85AC — 盘带 */
  dribble(): void { this.sub85AC(); }
  /** $8039: JMP $904E — 抢断 */
  tackle(): void { this.sub904E(); }

  // ════════════════════════════════════════════════════════════
  // $803E 比赛主循环
  // ════════════════════════════════════════════════════════════

  /**
   * $803E 比赛主循环入口。
   * asm $803E-$8127:
   *   LDA #$00; STA $044E; STA $0621  ← 清状态
   *   JSR $C600 (bank30 初始化)
   *   LDA #$02; JSR $C54B (bank30 辅助)
   *   JSR $8F72 (回合推进)
   *   LDA $0600; BNE $805A  ← 检查回合数
   *   STA $0617; JMP $8127  ← 回合=0 跳结束
   *   $805A: JSR $8223 (回合初始化)
   *   设 ram_0616=0 (当前球员索引)
   *   算 ram_0617 (剩余球员数)
   *   循环: 选球员 → 查行动类型 → 分派(移动/传球/射门/盘带/抢断)
   *   每个球员行动后 INC $0616, 循环到所有球员行动完
   *   JSR $9085 (帧推进); JSR $C606 (协程让出)
   *   LDA $043B; JSR $C509 (查表) → 跳转表分派
   */
  mainLoop(frame: number): void {
    void frame;
    // $803E: 清状态
    this.wr(0x044E, 0x00);
    this.wr(0x0621, 0x00);
    // $8044: JSR $C600 (bank30 初始化 — H5 stub)
    // $8047: LDA #$02; JSR $C54B
    this._system.subC54E(0x02);
    // $804C: JSR $8F72 (回合推进)
    this.sub8F72();
    // $804F: LDA $0600 (回合数)
    const turnCount = this.rd(0x0600);
    if (turnCount === 0) {
      // $8054: STA $0617; JMP $8127 (回合=0 → 结束)
      this.wr(0x0617, 0);
      this.sub8127();
      return;
    }
    // $805A: JSR $8223 (回合初始化)
    this.sub8223();
    // $805D: ram_0616=0 (当前球员索引)
    this.wr(0x0616, 0x00);
    // $8062-$8071: 算 ram_0617 (剩余球员数 = $00E2 & $07 / $0600)
    const total = this.rd(0x00E2) & 0x07;
    let remain = total;
    if (remain >= turnCount) remain = (remain - turnCount) & 0xFF;
    this.wr(0x0617, remain);
    // $8074-$80DC: 循环选球员 + 行动分派
    this.playerActionLoop();
    // $80EA: JSR $9085 (帧推进)
    this.sub9085();
    // $80ED: JSR $C606 (协程让出)
    this._system.coroutineYield(1);
    // $80F0: LDA $043B; JSR $C509 (查表 → 跳转表分派)
    const phase = this.rd(0x043B);
    this._system.subC509(phase);
    // 跳转表 $80FE: $8070/$8118/$811E/$8120/$8170 (5路比赛阶段分派)
    this.phaseDispatch(phase);
  }

  /**
   * $8074-$80DC: 球员行动循环。
   * 遍历所有球员, 查行动类型 ($060B,X), 按类型分派。
   */
  private playerActionLoop(): void {
    while (true) {
      // $8074: LDX $0617; BMI $8081 (检查剩余)
      if ((this.rd(0x0617) & 0x80) !== 0) break;
      // $8079: CPX $0616; BNE $8081 (当前球员已行动?)
      if (this.rd(0x0617) === this.rd(0x0616)) {
        // $807E: JSR $8176 (球员行动前处理)
        this.sub8176();
      }
      // $8081: LDX $0616; LDA $060B,X (行动类型)
      const x = this.rd(0x0616);
      const actionType = this.rd(0x060B + x);
      // $8087: CMP #$06; BNE $808E
      if (actionType === 0x06) {
        // $808B: JMP $80DC (特殊行动)
        this.wr(0x0616, (this.rd(0x0616) + 1) & 0xFF);
        break;
      }
      // $808E: STA $043D (存行动类型); LDY $0606,X; STY $043E (存球员ID)
      this.wr(0x043D, actionType);
      const playerId = this.rd(0x0606 + x);
      this.wr(0x043E, playerId);
      // $8097-$80A8: 特殊检查 (行动=0 且 球员=1 且 $043B≠0 → 清 $043E)
      if (actionType === 0 && playerId === 1 && this.rd(0x043B) !== 0) {
        this.wr(0x043E, 0);
      }
      // $80AB: LDA $0601,X; STA $0442 (存方向)
      this.wr(0x0442, this.rd(0x0601 + x));
      // $80B1: LDA #$07; JSR $C54B
      this._system.subC54E(0x07);
      // $80B6: JSR $8FF3 (球员行动执行)
      this.sub8FF3();
      // $80B9-$80D3: 设属性/查表
      this.wr(0x043E, this.rd(0x0606 + x));
      const team = this.rd(0x043B);
      const idx = ((team << 2) + this.rd(0x043D)) & 0xFF;
      this.wr(0x003B, (idx << 1) & 0xFF);
      // $80D0: LDY $827C,X; JSR $8EE9; JSR $8132; JSR $814C
      // $80DC: INC $0616
      this.wr(0x0616, (this.rd(0x0616) + 1) & 0xFF);
      // $80DF: LDA $0616; CMP $0600; BEQ $80EA (所有球员行动完?)
      if (this.rd(0x0616) === this.rd(0x0600)) break;
      // $80E7: JMP $8074 (循环)
    }
  }

  /**
   * $80FE 跳转表: 5路比赛阶段分派。
   * $80FE: $8070/$8118/$811E/$8120/$8170
   */
  private phaseDispatch(phase: number): void {
    switch (phase) {
      case 0: this.sub8070(); break;  // 阶段0
      case 1: this.sub8118(); break;  // 阶段1
      case 2: this.sub811E(); break;  // 阶段2
      case 3: this.sub8120(); break;  // 阶段3
      default: this.sub8170(); break; // 阶段4+
    }
  }

  // ════════════════════════════════════════════════════════════
  // bank26 内部子程 stub (逐个覆盖)
  // ════════════════════════════════════════════════════════════

  // — 跳转表目标 —

  /** $8835: 比赛初始化 */
  private sub8835(): void { /* TODO: 翻译 $8835 */ }
  /** $87E1: 回合开始 */
  private sub87E1(): void { /* TODO: 翻译 $87E1 */ }
  /** $888D: 球员选择 */
  private sub888D(): void { /* TODO: 翻译 $888D */ }
  /** $88A8: 行动选择 */
  private sub88A8(): void { /* TODO: 翻译 $88A8 */ }
  /** $8B4A: 比赛续行 */
  private sub8B4A(): void { /* TODO: 翻译 $8B4A */ }
  /** $8F72: 回合推进 */
  private sub8F72(): void { /* TODO: 翻译 $8F72 */ }
  /** $8CA4: 球员移动 */
  private sub8CA4(): void { /* TODO: 翻译 $8CA4 */ }
  /** $8127: 回合结束 */
  private sub8127(): void { /* TODO: 翻译 $8127 */ }
  /** $A1EB: 比赛结束 */
  private subA1EB(): void { /* TODO: 翻译 $A1EB */ }
  /** $987B: 精灵更新 */
  private sub987B(): void { /* TODO: 翻译 $987B */ }
  /** $95E1: 传球 */
  private sub95E1(): void { /* TODO: 翻译 $95E1 */ }
  /** $8E86: 射门 */
  private sub8E86(): void { /* TODO: 翻译 $8E86 */ }
  /** $85AC: 盘带 */
  private sub85AC(): void { /* TODO: 翻译 $85AC */ }
  /** $904E: 抢断 */
  private sub904E(): void { /* TODO: 翻译 $904E */ }

  // — 主循环内部子程 —

  /** $8223: 回合初始化 */
  private sub8223(): void { /* TODO: 翻译 $8223 */ }
  /** $8176: 球员行动前处理 */
  private sub8176(): void { /* TODO: 翻译 $8176 */ }
  /** $8FF3: 球员行动执行 */
  private sub8FF3(): void { /* TODO: 翻译 $8FF3 */ }
  /** $8EE9: 属性查表 */
  private sub8EE9(): void { /* TODO: 翻译 $8EE9 */ }
  /** $8132: 行动后处理 */
  private sub8132(): void { /* TODO: 翻译 $8132 */ }
  /** $814C: 精灵更新 */
  private sub814C(): void { /* TODO: 翻译 $814C */ }
  /** $9085: 帧推进 */
  private sub9085(): void { /* TODO: 翻译 $9085 */ }
  /** $8170: 阶段4+ */
  private sub8170(): void { /* TODO: 翻译 $8170 */ }

  // — 阶段分派目标 —

  /** $8070: 阶段0 */
  private sub8070(): void { /* TODO: 翻译 $8070 */ }
  /** $8118: 阶段1 */
  private sub8118(): void { /* TODO: 翻译 $8118 */ }
  /** $811E: 阶段2 */
  private sub811E(): void { /* TODO: 翻译 $811E */ }
  /** $8120: 阶段3 */
  private sub8120(): void { /* TODO: 翻译 $8120 */ }
}

export default MatchEngineService;
