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

  /**
   * $8223: 回合初始化。
   * asm $8223-$8277:
   *   LDX #$00; LDA $0601,X (读球员方向); JSR $C50C (查 RAM 指针)
   *   LDY #$00; LDA ($0034),Y (读球员数据[0])
   *   CMP #$14; BEQ $823E (=$14 跳)
   *   CMP #$49; BEQ $823E (=$49 跳)
   *   INX; CPX $0600; BNE $8225 (循环所有球员)
   *   RTS
   *   $823E: LDA $043B; BNE $8277 (非队伍0跳)
   *   LDA $060B,X; BNE $8277 (行动类型非0跳)
   *   LDA $0606,X; CMP #$01; BNE $8277 (球员ID非1跳)
   *   $824F-$8274: 交换当前球员与最后球员的方向/行动/ID
   *     (把球员1放到最后, 让其最后行动)
   *   $8277: RTS
   */
  private sub8223(): void {
    for (let x = 0; x < this.rd(0x0600); x++) {
      this.wr(0x0442, this.rd(0x0601 + x));
      this._system.subC50C();
      const ptr = this.rdPtr(0x0034, 0x0035);
      const d = this.readMemByte(ptr);
      if (d === 0x14 || d === 0x49) {
        // 找到目标球员, 检查是否需要交换
        if (this.rd(0x043B) === 0 && this.rd(0x060B + x) === 0 && this.rd(0x0606 + x) === 1) {
          // 交换当前球员与最后球员
          const last = this.rd(0x0600) - 1;
          const tmpDir = this.rd(0x0601 + x);
          this.wr(0x0601 + x, this.rd(0x0601 + last));
          this.wr(0x060B + x, this.rd(0x060B + last));
          this.wr(0x0606 + x, this.rd(0x0606 + last));
          this.wr(0x0606 + last, 1);
          this.wr(0x060B + last, 0);
          this.wr(0x0601 + last, tmpDir);
        }
        return;
      }
    }
  }
  /**
   * $8176: 球员行动前处理。
   * asm $8176-$819B:
   *   LDX $043B (队伍索引); CPX #$02; BEQ $819B (队伍2=CPU跳过)
   *   LDA #$00; STA $062D (清标志)
   *   LDA $8278,X (查 $8278 表); JSR $C54E
   *   LDA $0444; AND #$03; STA $044E (取低2位)
   *   JSR $C624 (bank30 辅助)
   *   LDA $0617; ORA #$80; STA $0617 (设 bit7 = 行动前处理完成)
   *   $819B: RTS
   */
  private sub8176(): void {
    const team = this.rd(0x043B);
    if (team === 0x02) return;  // CPU 队跳过
    this.wr(0x062D, 0);
    this._system.subC54E(this.readMemByte(0x8278 + team));
    this.wr(0x044E, this.rd(0x0444) & 0x03);
    // JSR $C624 — bank30 辅助 (H5 stub)
    this.wr(0x0617, this.rd(0x0617) | 0x80);
  }
  /**
   * $8FF3: 球员行动执行。
   * asm $8FF3-$904D:
   *   LDA $05FB (比赛阶段); BNE $8FFB (非0跳)
   *   STA $003A; RTS (阶段0=直接返回)
   *   $8FFB: LDA #$00; STA $003A
   *   LDY #$00; LDA ($0034),Y (读球员数据[0])
   *   CMP #$20; BNE $902F (≠$20 跳)
   *   $9007: LDA $05FB; BNE $9018 (阶段非0跳)
   *   LDA $043B; BNE $9018 (队伍非0跳)
   *   LDA $043C; CMP #$03; BCS $902F (≥3跳)
   *   $9018: LDA $0440; LSR; TAX (X=$0440>>1)
   *   LDA $043F; ROR; CLC; ADC $043F; STA $043F ($043F = $043F*2+carry)
   *   TXA; ADC $0440; STA $0440 ($0440 = X + $0440 + carry)
   *   $902F: LDY #$01; SEC; LDA ($0034),Y (读[1])
   *   SBC $043F; TAX (X = [1] - $043F)
   *   INY; LDA ($0034),Y (读[2])
   *   SBC $0440; BPL $9047 (≥0 跳)
   *   $9040: LDX #$00; LDA #$00; SEC; ROR $003A (负数清零, $003A 移位)
   *   $9047: STA ($0034),Y (写回[2])
   *   DEY; TXA; STA ($0034),Y (写回[1])
   *   RTS
   *
   * 语义: 球员位置移动。$043F/$0440 是速度向量, 球员数据[1]/[2] 是位置。
   * 阶段0=不移动, 阶段非0=按速度更新位置。
   */
  private sub8FF3(): void {
    const phase = this.rd(0x05FB);
    if (phase === 0) {
      this.wr(0x003A, 0);
      return;
    }
    this.wr(0x003A, 0);
    const ptr = this.rdPtr(0x0034, 0x0035);
    const d0 = this.readMemByte(ptr);
    if (d0 === 0x20) {
      // $9007: 特殊处理
      if (phase === 0 && this.rd(0x043B) === 0 && this.rd(0x043C) < 3) {
        // 速度倍增
        const x = this.rd(0x0440) >> 1;
        const f = this.rd(0x043F);
        const carry = f & 1;
        this.wr(0x043F, ((f >> 1) | (carry << 7)) + f);
        this.wr(0x0440, (x + this.rd(0x0440) + carry) & 0xFF);
      }
    }
    // $902F: 位置更新
    const posLo = this.readMemByte(ptr + 1);
    const posHi = this.readMemByte(ptr + 2);
    let newLo = posLo - this.rd(0x043F);
    let newHi = posHi - this.rd(0x0440);
    if ((newHi & 0x80) !== 0) {
      // 负数清零
      newLo = 0;
      newHi = 0;
      this.wr(0x003A, (this.rd(0x003A) >> 1) | 0x80);
    }
    this.writeMemByte(ptr + 2, newHi & 0xFF);
    this.writeMemByte(ptr + 1, newLo & 0xFF);
  }
  /**
   * $8EE9: 属性查表 (球员位置 → 属性值)。
   * asm $8EE9-$8F1E:
   *   JSR $8D06 (球员位置读取)
   *   LDA $0071; LSR; LSR; STA $0619 ($0619 = $0071 >> 2)
   *   LDA $061D; STA $0070
   *   LDA $061C; ASL; ROL $0070 (×2) ×5 (共 ×32 = 左移5位)
   *   STA $006F
   *   JSR $C51E (bank30 除法: $006F/$0070 → A:Y)
   *   LDA $006F; LDY $0070; BEQ $8F1A
   *   LDA #$FF (除数为0 → $FF)
   *   $8F1A: LDX #$00; LDY #$00; RTS
   *
   * 语义: 球员位置 ($061C/$061D) 左移5位后除以 $0071>>2, 得属性索引。
   */
  private sub8EE9(): void {
    this.sub8D06();
    const divisor = this.rd(0x0071) >> 2;
    this.wr(0x0619, divisor);
    this.wr(0x0070, this.rd(0x061D));
    let val = this.rd(0x061C);
    let hi = this.rd(0x0070);
    // 左移5位 (×32)
    for (let i = 0; i < 5; i++) {
      val = (val << 1) & 0xFF;
      hi = ((hi << 1) | (val >> 7)) & 0xFF;
    }
    this.wr(0x006F, val);
    // JSR $C51E 除法 — H5 版直接算
    if (divisor === 0) {
      this.wr(0x006F, 0xFF);
    } else {
      const dividend = (hi << 8) | val;
      this.wr(0x006F, Math.floor(dividend / divisor) & 0xFF);
    }
    this.wr(0x0070, 0);
  }
  /**
   * $8132: 行动后处理。
   * asm $8132-$814B:
   *   PHA (保存 A)
   *   LDA $043D (行动类型); ASL; ASL; TAX (×4)
   *   PLA (恢复 A)
   *   LDY #$00; CMP $828C,X; BCS $8145 (≥阈值跳)
   *   $813C: INY; INX; BNE $813C (循环查表)
   *   $8145: STY $0612 (存结果); RTS
   * 注: $828C 表 4 字节一组, 查 A 落在哪组
   */
  private sub8132(): void {
    const actionType = this.rd(0x043D);
    let x = (actionType << 2) & 0xFF;
    let y = 0;
    // CMP $828C,X; BCS $8145 (A ≥ 阈值则跳)
    // 这里 A 是调用方传入的值, H5 版从栈恢复
    // stub: 简化为查 4 项
    for (let i = 0; i < 4; i++) {
      const threshold = this.readMemByte(0x828C + x);
      void threshold;
      y++; x++;
    }
    this.wr(0x0612, y & 0xFF);
  }
  /**
   * $814C: 精灵更新检查。
   * asm $814C-$816E:
   *   BIT $0617; BMI $8154 (bit7=1 跳)
   *   JSR $8E33 (精灵位置更新)
   *   $8154: LDA #$00; JSR $C54E (bank30 辅助)
   *   LDA $0612; JSR $C509 (查表分派)
   *   跳转表 6 项: $8169/$819C/$81BC/$81D1/$81EA/$8BBA
   *   $816C: SEC; JMP $9095 (跳 $9095)
   */
  private sub814C(): void {
    if ((this.rd(0x0617) & 0x80) === 0) {
      this.sub8E33();
    }
    this._system.subC54E(0);
    const idx = this._system.subC509(this.rd(0x0612));
    const table = [0x8169, 0x819C, 0x81BC, 0x81D1, 0x81EA, 0x8BBA];
    const target = table[idx & 0xFF] ?? 0x8169;
    switch (target) {
      case 0x8169: this.sub8169(); break;
      case 0x819C: this.sub819C(); break;
      case 0x81BC: this.sub81BC(); break;
      case 0x81D1: this.sub81D1(); break;
      case 0x81EA: this.sub81EA(); break;
      case 0x8BBA: this.sub8BBA(); break;
    }
    // $816C: SEC; JMP $9095
    this.sub9095(true);
  }
  /**
   * $9085: 帧推进。
   * asm $9085-$908E:
   *   LDX $043B (队伍索引)
   *   LDA $908E,X (查 $908E 表, 8 项: $02,$01,$01,$04,$04,$01,$02,$08)
   *   JMP $C603 (跳 bank30 $C603 — H5 stub)
   */
  private sub9085(): void {
    const team = this.rd(0x043B);
    const TABLE_908E = [0x02, 0x01, 0x01, 0x04, 0x04, 0x01, 0x02, 0x08];
    const a = TABLE_908E[team & 0x07] ?? 0;
    // JMP $C603 — bank30 辅助 (H5 stub, 由 _system 覆盖)
    this._system.coroutineYield(a);
  }
  /**
   * $8170: 阶段4+ (bit7 检查)。
   * asm $8170-$8175:
   *   BIT $0617; BPL $8176 (bit7=0 → 跳 $8176 球员行动前处理)
   *   RTS (bit7=1 → 已处理, 直接返回)
   */
  private sub8170(): void {
    if ((this.rd(0x0617) & 0x80) === 0) {
      this.sub8176();
    }
  }

  // — 阶段分派目标 —

  /** $8070: 阶段0 */
  private sub8070(): void { /* TODO: 翻译 $8070 */ }
  /** $8118: 阶段1 */
  private sub8118(): void { /* TODO: 翻译 $8118 */ }
  /** $811E: 阶段2 */
  private sub811E(): void { /* TODO: 翻译 $811E */ }
  /** $8120: 阶段3 */
  private sub8120(): void { /* TODO: 翻译 $8120 */ }

  // ════════════════════════════════════════════════════════════
  // $814C 跳转表目标 + 辅助子程 stub
  // ════════════════════════════════════════════════════════════

  /** $8169: 精灵组分派0 */
  private sub8169(): void { /* TODO: 翻译 $8169 */ }
  /** $819C: 精灵组分派1 */
  private sub819C(): void { /* TODO: 翻译 $819C */ }
  /** $81BC: 精灵组分派2 */
  private sub81BC(): void { /* TODO: 翻译 $81BC */ }
  /** $81D1: 精灵组分派3 */
  private sub81D1(): void { /* TODO: 翻译 $81D1 */ }
  /** $81EA: 精灵组分派4 */
  private sub81EA(): void { /* TODO: 翻译 $81EA */ }
  /** $8BBA: 精灵组分派5 */
  private sub8BBA(): void { /* TODO: 翻译 $8BBA */ }

  /** $8E33: 精灵位置更新 */
  private sub8E33(): void { /* TODO: 翻译 $8E33 精灵位置更新 */ }

  /**
   * $9095: 通用辅助 (SEC/CLC 入口)。
   * asm $9095: 被多处 JMP 调用, 含 LSR; JSR $C54E; ... 逻辑。
   * H5 版 stub。
   */
  private sub9095(setCarry: boolean = false): void {
    void setCarry;
    // TODO: 翻译 $9095
  }

  /** $8D06: 球员位置读取 (读 $0034 指针, 算 $061C/$061D) */
  private sub8D06(): void {
    // TODO: 翻译 $8D06 球员位置读取
  }

  // ════════════════════════════════════════════════════════════
  // 内存读写辅助 (RAM 直接读写, ROM 由 bank26 数据提供)
  // ════════════════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    // ROM 区: bank26 数据 (stub, 待 import bank26 数据表)
    return 0;
  }
  private writeMemByte(addr: number, v: number): void {
    if (addr < 0x0800) {
      this.wr(addr, v);
    }
    // ROM 区: bank26 数据只读, 忽略
  }
}

export default MatchEngineService;
