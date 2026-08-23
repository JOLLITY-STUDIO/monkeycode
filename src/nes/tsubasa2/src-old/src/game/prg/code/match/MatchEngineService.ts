/**
 * MatchEngineService �?bank26 比赛核心引擎 ($8000-$9FFF, 运行�?$A000-$BFFF)
 * @bank 26
 *
 * 职责: 比赛主循环、回合状态机、球员移�?传球/射门、比赛时钟�? *   入口 $803E: 比赛主循�?(清状�?�?JSR $C600 �?回合分派 �?球员行动 �?帧推�?�? *   $8000-$803C: 跳转�?(12�?JMP, 各比赛子程入�?�? *   $803E-$8127: 主循�?(回合推进/球员选择/行动分派)�? *   $8127+: 回合结束/比赛结束处理�? *
 * 代码�? code_main 981�?+ code_sub 1065�?+ code_data 1083�?= 3129行指�?(最�?bank)�? * 消费�? bank00 (主循环调�? �?bank26 执行比赛�? *
 * 命名规范: 旧名 Bank26Service �?新名 MatchEngineService�? */
import { DataStore } from '../../data/store/DataStore';
import type { Bank00Service } from '../system/Bank00Service';

/** 4 位大写十六进�?RAM �?*/
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchEngineService {
  protected _store: DataStore;
  protected _system: Bank00Service;

  constructor(store: DataStore, system: Bank00Service) {
    this._store = store;
    this._system = system;
  }

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }
  /** �?16 位指�?(小端 lo + (hi << 8)) */
  protected rdPtr(lo: number, hi: number): number {
    return this.rd(lo) | (this.rd(hi) << 8);
  }

  // ════════════════════════════════════════════════════════════
  // $8000-$803C 跳转�?(12�?JMP, 各比赛子程入�?
  // ════════════════════════════════════════════════════════════

  /** $800C: JMP $8835 �?比赛初始�?*/
  matchInit(): void { this.sub8835(); }
  /** $800F: JMP $87E1 �?回合开�?*/
  turnStart(): void { this.sub87E1(); }
  /** $8012: JMP $888D �?球员选择 */
  playerSelect(): void { this.sub888D(); }
  /** $8015: JMP $88A8 �?行动选择 */
  actionSelect(): void { this.sub88A8(); }
  /** $801E: JMP $8B4A �?比赛续行 */
  matchContinue(): void { this.sub8B4A(); }
  /** $8021: JMP $8F72 �?回合推进 */
  turnAdvance(): void { this.sub8F72(); }
  /** $8024: JMP $8CA4 �?球员移动 */
  playerMove(): void { this.sub8CA4(); }
  /** $8027: JMP $8127 �?回合结束 */
  turnEnd(): void { this.sub8127(); }
  /** $802A: JMP $A1EB �?比赛结束 */
  matchEnd(): void { this.subA1EB(); }
  /** $802D: JMP $987B �?精灵更新 */
  spriteUpdate(): void { this.sub987B(); }
  /** $8030: JMP $95E1 �?传球 */
  passBall(): void { this.sub95E1(); }
  /** $8033: JMP $8E86 �?射门 */
  shoot(): void { this.sub8E86(); }
  /** $8036: JMP $85AC �?盘带 */
  dribble(): void { this.sub85AC(); }
  /** $8039: JMP $904E �?抢断 */
  tackle(): void { this.sub904E(); }

  // ════════════════════════════════════════════════════════════
  // $803E 比赛主循�?  // ════════════════════════════════════════════════════════════

  /**
   * $803E 比赛主循环入口�?   * asm $803E-$8127:
   *   LDA #$00; STA $044E; STA $0621  �?清状�?   *   JSR $C600 (bank30 初始�?
   *   LDA #$02; JSR $C54B (bank30 辅助)
   *   JSR $8F72 (回合推进)
   *   LDA $0600; BNE $805A  �?检查回合数
   *   STA $0617; JMP $8127  �?回合=0 跳结�?   *   $805A: JSR $8223 (回合初始�?
   *   �?ram_0616=0 (当前球员索引)
   *   �?ram_0617 (剩余球员�?
   *   循环: 选球�?�?查行动类�?�?分派(移动/传球/射门/盘带/抢断)
   *   每个球员行动�?INC $0616, 循环到所有球员行动完
   *   JSR $9085 (帧推�?; JSR $C606 (协程让出)
   *   LDA $043B; JSR $C509 (查表) �?跳转表分�?   */
  mainLoop(frame: number): void {
    void frame;
    // $803E: 清状�?    this.wr(0x044E, 0x00);
    this.wr(0x0621, 0x00);
    // $8044: JSR $C600 (bank30 初始�?�?H5 stub)
    // $8047: LDA #$02; JSR $C54B
    this._system.subC54E(0x02);
    // $804C: JSR $8F72 (回合推进)
    this.sub8F72();
    // $804F: LDA $0600 (回合�?
    const turnCount = this.rd(0x0600);
    if (turnCount === 0) {
      // $8054: STA $0617; JMP $8127 (回合=0 �?结束)
      this.wr(0x0617, 0);
      this.sub8127();
      return;
    }
    // $805A: JSR $8223 (回合初始�?
    this.sub8223();
    // $805D: ram_0616=0 (当前球员索引)
    this.wr(0x0616, 0x00);
    // $8062-$8071: �?ram_0617 (剩余球员�?= $00E2 & $07 / $0600)
    const total = this.rd(0x00E2) & 0x07;
    let remain = total;
    if (remain >= turnCount) remain = (remain - turnCount) & 0xFF;
    this.wr(0x0617, remain);
    // $8074-$80DC: 循环选球�?+ 行动分派
    this.playerActionLoop();
    // $80EA: JSR $9085 (帧推�?
    this.sub9085();
    // $80ED: JSR $C606 (协程让出)
    this._system.coroutineYield(1);
    // $80F0: LDA $043B; JSR $C509 (查表 �?跳转表分�? cmd=比赛阶段)
    // 跳转�?$80FE: $8070/$8118/$811E/$8120/$8170 (5路比赛阶段分�?
    const phase = this.rd(0x043B);
    this.phaseDispatch(phase);
  }

  /**
   * $8074-$80DC: 球员行动循环�?   * 遍历所有球�? 查行动类�?($060B,X), 按类型分派�?   */
  private playerActionLoop(): void {
    while (true) {
      // $8074: LDX $0617; BMI $8081 (检查剩�?
      if ((this.rd(0x0617) & 0x80) !== 0) break;
      // $8079: CPX $0616; BNE $8081 (当前球员已行�?)
      if (this.rd(0x0617) === this.rd(0x0616)) {
        // $807E: JSR $8176 (球员行动前处�?
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
      // $808E: STA $043D (存行动类�?; LDY $0606,X; STY $043E (存球员ID)
      this.wr(0x043D, actionType);
      const playerId = this.rd(0x0606 + x);
      this.wr(0x043E, playerId);
      // $8097-$80A8: 特殊检�?(行动=0 �?球员=1 �?$043B�? �?�?$043E)
      if (actionType === 0 && playerId === 1 && this.rd(0x043B) !== 0) {
        this.wr(0x043E, 0);
      }
      // $80AB: LDA $0601,X; STA $0442 (存方�?
      this.wr(0x0442, this.rd(0x0601 + x));
      // $80B1: LDA #$07; JSR $C54B
      this._system.subC54E(0x07);
      // $80B6: JSR $8FF3 (球员行动执行)
      this.sub8FF3();
      // $80B9-$80D3: 设属�?查表
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
   * $80FE 跳转�? 5路比赛阶段分派�?   * $80FE: $8070/$8118/$811E/$8120/$8170
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

  // �?跳转表目�?�?已翻�?
  /**
   * $8835: 比赛初始�?�?遍历球员, 逐个调用球员选择+行动选择
   * asm $8835-$888A
   */
  private sub8835(): void {
    if (this.rd(0x0600) === 0) return;
    this.wr(0x0616, 0x00);
    const TABLE_888B = [0x00, 0x02];
    while (true) {
      this._system.coroutineYield(1);
      const saved044E = this.rd(0x044E);
      this.wr(0x044E, 0x00);
      const x = this.rd(0x0616);
      this.wr(0x0442, this.rd(0x0601 + x));
      const idx611B = this.rd(0x061B);
      this.wr(0x043D, TABLE_888B[idx611B & 0x01] ?? 0);
      this.wr(0x043E, 0x00);
      this._system.subC54E(0x07);
      this.sub888D();
      this.wr(0x044E, saved044E);
      this.sub88A8();
      this.wr(0x0616, (this.rd(0x0616) + 1) & 0xFF);
      if (this.rd(0x0616) === this.rd(0x0600)) break;
    }
    this.wr(0x0600, 0x00);
    this.wr(0x05FF, 0x00);
  }

  /**
   * $87E1: 回合开�?�?球员自动行动检�?(遍历10个球�?
   * asm $87E1-$8834
   */
  private sub87E1(): void {
    this.wr(0x0041, ((this.rd(0x05FB) ^ 0x0B) + 1) & 0xFF);
    let count = 0x0A;
    while (count > 0) {
      this.wr(0x0441, this.rd(0x0041));
      this._system.subC50C();
      const ptr = this.rdPtr(0x0034, 0x0035);
      if (this.readMemByte(ptr + 0x0A) !== 0) {
        this.wr(0x0041, (this.rd(0x0041) + 1) & 0xFF);
        count--;
        continue;
      }
      const playerCount = this.rd(0x0600);
      if (playerCount >= 5) {
        this.wr(0x0041, (this.rd(0x0041) + 1) & 0xFF);
        count--;
        continue;
      }
      if (this.rd(0x05FB) !== 0 && playerCount >= 4) {
        this.wr(0x0041, (this.rd(0x0041) + 1) & 0xFF);
        count--;
        continue;
      }
      const diff = (this.rd(0x00E2) - this.rd(0x00E3)) & 0xFF;
      if (diff >= this.rd(0x061A)) {
        this.wr(0x0041, (this.rd(0x0041) + 1) & 0xFF);
        count--;
        continue;
      }
      this.wr(0x0601 + playerCount, this.rd(0x0041));
      this.wr(0x0600, (playerCount + 1) & 0xFF);
      this.wr(0x0041, (this.rd(0x0041) + 1) & 0xFF);
      count--;
    }
  }

  /** $888D: 球员选择 �?查表+属性计�?行动后处�?*/
  private sub888D(): void {
    this.wr(0x003A, this.rd(0x0442));
    const team = this.rd(0x043B);
    const idx = ((team << 2) + this.rd(0x043D)) & 0xFF;
    this.wr(0x003B, (idx << 1) & 0xFF);
    const TABLE_88EB = [0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00];
    this.wr(0x0442, TABLE_88EB[idx & 0x07] ?? 0);
    this.sub8EE9();
    this.sub8132();
  }

  /** $88A8: 行动选择 �?�?$0612 分派, 读球员速度 */
  private sub88A8(): void {
    this._system.subC54E(0x0B);
    // $88B0: LDA $0612; JSR $C509 (cmd=行动类型, 6 �?
    const table = [0x8169, 0x819C, 0x88BB, 0x88D5, 0x8BC8, 0x8B20];
    const target = table[this.rd(0x0612)] ?? 0x8169;
    switch (target) {
      case 0x8169: this.sub8169(); break;
      case 0x819C: this.sub819C(); break;
      case 0x88BB: this.sub88BB(); break;
      case 0x88D5: this.sub88D5(); break;
      case 0x8BC8: this.sub8BC8(); break;
    }
  }

  /** $88BB: 读球员速度向量�?$0635/$0637 */
  private sub88BB(): void {
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    this.wr(0x0635, this.readMemByte(ptr + 0x06));
    this.wr(0x0637, this.readMemByte(ptr + 0x08));
    this.sub81BC();
  }

  /** $88D5: 速度方向切换 */
  private sub88D5(): void {
    this.sub9095(false);
    this.sub8E6E();
    this._system.coroutineYield(1);
  }

  /** $8B4A: 比赛续行 �?检查比赛状�? 重置回合, 调回合开�?*/
  private sub8B4A(): void {
    this.wr(0x0600, 0x00);
    let x = 0x02;
    if ((x ^ this.rd(0x05FB)) !== 0) x = 0x01;
    this.wr(0x0621, x);
    this.wr(0x061A, 0xFF);
    this.sub87E1();
    this._system.coroutineYield(1);
  }

  /** $8F72: 回合推进 �?计算球员位置 (角度+距离 �?坐标) */
  private sub8F72(): void {
    this._system.subC54E(0x06);
    this.wr(0x003A, 0x00);
    if (this.rd(0x05FB) === 0) {
      if (this.rd(0x043B) === 0x02 && this.rd(0x0600) === 0) {
        this.wr(0x043F, 0x00);
        this.wr(0x0440, 0x00);
      }
    }
    if ((this.rd(0x003A) & 0x80) === 0 && this.rd(0x00E2) < 0x08) {
      this.wr(0x043C, this.rd(0x043C) | 0x80);
    }
    const sum = this.rd(0x00E2) + this.rd(0x00E3);
    let a = ((sum >> 1) | 0x80) & 0xFF;
    const carryFromRor = (sum & 1) !== 0;
    let x = 0;
    if ((this.rd(0x043C) & 0x80) !== 0) {
      x = (x + 1) & 0xFF;
      a = a & 0x7F;
    }
    if (carryFromRor) {
      a = (a + 1) & 0xFF;
      if (a === 0) x = (x + 1) & 0xFF;
    }
    this.wr(0x0067, a);
    this.wr(0x0068, x);
    if ((this.rd(0x003A) & 0x80) !== 0) {
      let lo = this.rd(0x0032);
      let hi = this.rd(0x0033);
      for (let i = 0; i < 4; i++) {
        lo = ((lo >> 1) | ((hi & 1) << 7)) & 0xFF;
        hi = (hi >> 1) & 0xFF;
      }
      this.wr(0x0032, lo);
      this.wr(0x0033, hi);
    }
    this.wr(0x0069, this.rd(0x0032));
    this.wr(0x006A, this.rd(0x0033));
    this.wr(0x061C, this.rd(0x006C));
    this.wr(0x061D, this.rd(0x006D));
  }

  /** $8CA4: 球员移动 �?检查位置边�? 决定移动方向 */
  private sub8CA4(): void {
    const x35 = this.rd(0x0635);
    const inRangeX = (x35 >= 0x30 && x35 < 0xD0);
    const x37 = this.rd(0x0637);
    const inRangeY = (x37 >= 0x50 && x37 < 0xB0);
    if (inRangeX && inRangeY) return;
    this.sub8CEA();
    if (inRangeX && !inRangeY) {
      if (this.rd(0x05FB) !== 0) {
        this.wr(0x0635, 0x80 ^ this.rd(0x0635));
      }
    }
  }

  /** $8127: 回合结束 �?�?$90DD, �?$0617, 回主循环 */
  private sub8127(): void {
    this.sub90DD();
    this.wr(0x0617, 0x00);
    this._system.coroutineYield(1);
  }

  /** $A1EB: 比赛结束 �?asm 地址超出 bank26 范围, 可能�?bank */
  private subA1EB(): void {
    // $A1EB 不在 bank26 ($8000-$9FFF) 范围�?    // 运行�?$A000-$BFFF 窗口映射, 编译�?$81EB
    // TODO: 需检查是否为其他 bank 的固定地址
  }

  /** $987B: 精灵更新 �?初始化精灵缓�? 循环等待输入 */
  private sub987B(): void {
    this._system.subC54E(0x37);
    this.wr(0x0011, 0x00);
    this.wr(0x0012, 0x00);
    this._system.coroutineYield(1);
    this.wr(0x0087, 0x2E);
    this.wr(0x062D, 0x00);
    this.wr(0x0624, 0x04);
    while (true) {
      this._system.coroutineYield(1);
      if ((0x0C & this.rd(0x001E)) !== 0) {
        this.wr(0x0624, this.rd(0x0624) ^ 0x40);
      }
      if ((this.rd(0x001C) & 0x80) !== 0) break;
    }
  }

  /** $95E1: 传球 �?球员选择 + 方向 + 传球动画 */
  private sub95E1(): void {
    this.wr(0x0616, 0x00);
    this.wr(0x038E, 0x00);
    this.wr(0x038B, 0x00);
    this.wr(0x030A, 0x00);
    this.wr(0x0307, 0x00);
    if ((this.rd(0x00E2) & 0x80) !== 0) {
      this.wr(0x05FB, 0x0B);
    }
    this.wr(0x0619, this.rd(0x05FB));
    this._system.subC54E(0x39);
    this._system.coroutineYield(1);
  }

  /** $8E86: 射门 �?检查条�? 设置射门参数, 跳转盘带 */
  private sub8E86(): void {
    if (this.rd(0x0446) !== 0x04 && this.rd(0x0446) !== 0x05) return;
    if (this.rd(0x05FB) !== 0) return;
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    if (this.readMemByte(ptr) === 0x01) return;
    if ((this.readMemByte(ptr + 0x06) & 0x80) === 0) return;
    this.wr(0x05FC, this.rd(0x0441));
    let a = 0x01;
    while (true) {
      this.wr(0x0441, a);
      this._system.subC50C();
      const p = this.rdPtr(0x0034, 0x0035);
      if (this.readMemByte(p) === 0x01) break;
      a = (a + 1) & 0xFF;
    }
    this.wr(0x0441, a);
    this.wr(0x0446, (this.rd(0x0446) + 1) & 0xFF);
    this.wr(0x0615, 0x00);
    this.wr(0x062D, 0x00);
    this._system.subC54E(0x17);
    this.wr(0x043B, 0x00);
    this.wr(0x043C, 0x04);
    this.sub85AC();
  }

  /** $85AC: 盘带 �?球员设置 + 精灵更新 + 清零球员数据 */
  private sub85AC(): void {
    this._system.subC50C();
    this._system.subC54E(0x30);
    this.sub987B();
    this.wr(0x05FB, this.rd(0x05FB) ^ 0x0B);
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    this.writeMemByte(ptr + 0x05, 0x00);
    this.writeMemByte(ptr + 0x07, 0x00);
    this.writeMemByte(ptr + 0x0A, 0x00);
    this.wr(0x0629, 0x04);
    this._system.coroutineYield(1);
  }

  /** $904E: 抢断 �?检�?$044B, 清零球员数据 */
  private sub904E(): void {
    if ((this.rd(0x044B) & 0x80) === 0) return;
    this.wr(0x044B, 0x00);
    this.wr(0x002F, 0x00);
    let a = 0x0C;
    while (true) {
      this.wr(0x0441, a);
      this._system.subC50C();
      const ptr = this.rdPtr(0x0034, 0x0035);
      this.writeMemByte(ptr + 1, 0x00);
      a = (a + 1) & 0xFF;
      if (a === 0x16) break;
    }
  }

  // �?主循环内部子�?�?
  /**
   * $8223: 回合初始化�?   * asm $8223-$8277:
   *   LDX #$00; LDA $0601,X (读球员方�?; JSR $C50C (�?RAM 指针)
   *   LDY #$00; LDA ($0034),Y (读球员数据[0])
   *   CMP #$14; BEQ $823E (=$14 �?
   *   CMP #$49; BEQ $823E (=$49 �?
   *   INX; CPX $0600; BNE $8225 (循环所有球�?
   *   RTS
   *   $823E: LDA $043B; BNE $8277 (非队�?�?
   *   LDA $060B,X; BNE $8277 (行动类型�?�?
   *   LDA $0606,X; CMP #$01; BNE $8277 (球员ID�?�?
   *   $824F-$8274: 交换当前球员与最后球员的方向/行动/ID
   *     (把球�?放到最�? 让其最后行�?
   *   $8277: RTS
   */
  private sub8223(): void {
    for (let x = 0; x < this.rd(0x0600); x++) {
      this.wr(0x0442, this.rd(0x0601 + x));
      this._system.subC50C();
      const ptr = this.rdPtr(0x0034, 0x0035);
      const d = this.readMemByte(ptr);
      if (d === 0x14 || d === 0x49) {
        // 找到目标球员, 检查是否需要交�?        if (this.rd(0x043B) === 0 && this.rd(0x060B + x) === 0 && this.rd(0x0606 + x) === 1) {
          // 交换当前球员与最后球�?          const last = this.rd(0x0600) - 1;
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
   * $8176: 球员行动前处理�?   * asm $8176-$819B:
   *   LDX $043B (队伍索引); CPX #$02; BEQ $819B (队伍2=CPU跳过)
   *   LDA #$00; STA $062D (清标�?
   *   LDA $8278,X (�?$8278 �?; JSR $C54E
   *   LDA $0444; AND #$03; STA $044E (取低2�?
   *   JSR $C624 (bank30 辅助)
   *   LDA $0617; ORA #$80; STA $0617 (�?bit7 = 行动前处理完�?
   *   $819B: RTS
   */
  private sub8176(): void {
    const team = this.rd(0x043B);
    if (team === 0x02) return;  // CPU 队跳�?    this.wr(0x062D, 0);
    this._system.subC54E(this.readMemByte(0x8278 + team));
    this.wr(0x044E, this.rd(0x0444) & 0x03);
    // JSR $C624 �?bank30 辅助 (H5 stub)
    this.wr(0x0617, this.rd(0x0617) | 0x80);
  }
  /**
   * $8FF3: 球员行动执行�?   * asm $8FF3-$904D:
   *   LDA $05FB (比赛阶段); BNE $8FFB (�?�?
   *   STA $003A; RTS (阶段0=直接返回)
   *   $8FFB: LDA #$00; STA $003A
   *   LDY #$00; LDA ($0034),Y (读球员数据[0])
   *   CMP #$20; BNE $902F (�?20 �?
   *   $9007: LDA $05FB; BNE $9018 (阶段�?�?
   *   LDA $043B; BNE $9018 (队伍�?�?
   *   LDA $043C; CMP #$03; BCS $902F (�?�?
   *   $9018: LDA $0440; LSR; TAX (X=$0440>>1)
   *   LDA $043F; ROR; CLC; ADC $043F; STA $043F ($043F = $043F*2+carry)
   *   TXA; ADC $0440; STA $0440 ($0440 = X + $0440 + carry)
   *   $902F: LDY #$01; SEC; LDA ($0034),Y (读[1])
   *   SBC $043F; TAX (X = [1] - $043F)
   *   INY; LDA ($0034),Y (读[2])
   *   SBC $0440; BPL $9047 (�? �?
   *   $9040: LDX #$00; LDA #$00; SEC; ROR $003A (负数清零, $003A 移位)
   *   $9047: STA ($0034),Y (写回[2])
   *   DEY; TXA; STA ($0034),Y (写回[1])
   *   RTS
   *
   * 语义: 球员位置移动�?043F/$0440 是速度向量, 球员数据[1]/[2] 是位置�?   * 阶段0=不移�? 阶段�?=按速度更新位置�?   */
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
   * $8EE9: 属性查�?(球员位置 �?属性�?�?   * asm $8EE9-$8F1E:
   *   JSR $8D06 (球员位置读取)
   *   LDA $0071; LSR; LSR; STA $0619 ($0619 = $0071 >> 2)
   *   LDA $061D; STA $0070
   *   LDA $061C; ASL; ROL $0070 (×2) ×5 (�?×32 = 左移5�?
   *   STA $006F
   *   JSR $C51E (bank30 除法: $006F/$0070 �?A:Y)
   *   LDA $006F; LDY $0070; BEQ $8F1A
   *   LDA #$FF (除数�? �?$FF)
   *   $8F1A: LDX #$00; LDY #$00; RTS
   *
   * 语义: 球员位置 ($061C/$061D) 左移5位后除以 $0071>>2, 得属性索引�?   */
  private sub8EE9(): void {
    this.sub8D06();
    const divisor = this.rd(0x0071) >> 2;
    this.wr(0x0619, divisor);
    this.wr(0x0070, this.rd(0x061D));
    let val = this.rd(0x061C);
    let hi = this.rd(0x0070);
    // 左移5�?(×32)
    for (let i = 0; i < 5; i++) {
      val = (val << 1) & 0xFF;
      hi = ((hi << 1) | (val >> 7)) & 0xFF;
    }
    this.wr(0x006F, val);
    // JSR $C51E 除法 �?H5 版直接算
    if (divisor === 0) {
      this.wr(0x006F, 0xFF);
    } else {
      const dividend = (hi << 8) | val;
      this.wr(0x006F, Math.floor(dividend / divisor) & 0xFF);
    }
    this.wr(0x0070, 0);
  }
  /**
   * $8132: 行动后处理�?   * asm $8132-$814B:
   *   PHA (保存 A)
   *   LDA $043D (行动类型); ASL; ASL; TAX (×4)
   *   PLA (恢复 A)
   *   LDY #$00; CMP $828C,X; BCS $8145 (≥阈值跳)
   *   $813C: INY; INX; BNE $813C (循环查表)
   *   $8145: STY $0612 (存结�?; RTS
   * �? $828C �?4 字节一�? �?A 落在哪组
   */
  private sub8132(): void {
    const actionType = this.rd(0x043D);
    let x = (actionType << 2) & 0xFF;
    let y = 0;
    // CMP $828C,X; BCS $8145 (A �?阈值则�?
    // 这里 A 是调用方传入的�? H5 版从栈恢�?    // stub: 简化为�?4 �?    for (let i = 0; i < 4; i++) {
      const threshold = this.readMemByte(0x828C + x);
      void threshold;
      y++; x++;
    }
    this.wr(0x0612, y & 0xFF);
  }
  /**
   * $814C: 精灵更新检查�?   * asm $814C-$816E:
   *   BIT $0617; BMI $8154 (bit7=1 �?
   *   JSR $8E33 (精灵位置更新)
   *   $8154: LDA #$00; JSR $C54E (bank30 辅助)
   *   LDA $0612; JSR $C509 (查表分派)
   *   跳转�?6 �? $8169/$819C/$81BC/$81D1/$81EA/$8BBA
   *   $816C: SEC; JMP $9095 (�?$9095)
   */
  private sub814C(): void {
    if ((this.rd(0x0617) & 0x80) === 0) {
      this.sub8E33();
    }
    this._system.subC54E(0);
    // $8154 �? LDA $0612; JSR $C509 (cmd=行动类型, 6 �?
    const table = [0x8169, 0x819C, 0x81BC, 0x81D1, 0x81EA, 0x8BBA];
    const target = table[this.rd(0x0612)] ?? 0x8169;
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
   * $9085: 帧推进�?   * asm $9085-$908E:
   *   LDX $043B (队伍索引)
   *   LDA $908E,X (�?$908E �? 8 �? $02,$01,$01,$04,$04,$01,$02,$08)
   *   JMP $C603 (�?bank30 $C603 �?H5 stub)
   */
  private sub9085(): void {
    const team = this.rd(0x043B);
    const TABLE_908E = [0x02, 0x01, 0x01, 0x04, 0x04, 0x01, 0x02, 0x08];
    const a = TABLE_908E[team & 0x07] ?? 0;
    // JMP $C603 �?bank30 辅助 (H5 stub, �?_system 覆盖)
    this._system.coroutineYield(a);
  }
  /**
   * $8170: 阶段4+ (bit7 检�?�?   * asm $8170-$8175:
   *   BIT $0617; BPL $8176 (bit7=0 �?�?$8176 球员行动前处�?
   *   RTS (bit7=1 �?已处�? 直接返回)
   */
  private sub8170(): void {
    if ((this.rd(0x0617) & 0x80) === 0) {
      this.sub8176();
    }
  }

  // �?阶段分派目标 �?
  /** $8070: 阶段0 �?无操�? 继续主循�?*/
  private sub8070(): void {
    // phase=0 时直接继续主循环, 不做额外操作
  }

  /** $8118: 阶段1 �?重置栈指�? �?bank30 $C60F */
  private sub8118(): void {
    this._system.coroutineYield(1);
  }

  /** $811E: 阶段2 �?JSR $8170 后重置栈, �?bank30 $C621 */
  private sub811E(): void {
    this.sub8170();
    this._system.coroutineYield(1);
  }

  /** $8120: 阶段3 �?JSR $90DD 后清 $0617, 回主循环 */
  private sub8120(): void {
    this.sub90DD();
    this.wr(0x0617, 0x00);
    this._system.coroutineYield(1);
  }

  // ════════════════════════════════════════════════════════════
  // $814C 跳转表目�?+ 辅助子程 stub
  // ════════════════════════════════════════════════════════════

  /** $8169: 精灵组分�? �?JSR $8BBA; 位置减法; JMP $9095 */
  private sub8169(): void {
    this.sub8BBA();
    let lo = this.rd(0x061C) - this.rd(0x0619) - 1;
    let hi = this.rd(0x061D) - 0x00;
    if (lo < 0) { lo += 0x100; hi -= 1; }
    lo &= 0xFF; hi &= 0xFF;
    if ((hi & 0x80) !== 0) { lo = 0; hi = 0; }
    this.wr(0x061C, lo);
    this.wr(0x061D, hi);
    this.sub9095(true);
  }

  /** $819C: 精灵组分�? �?JSR $8BC8; CLC; JSR $9095; �?$0600; JMP $8BDF */
  private sub819C(): void {
    this.sub8BC8();
    this.sub9095(false);
    this.wr(0x0600, 0x00);
    this._system.coroutineYield(1);
  }

  /** $81BC: 精灵组分�? �?JSR $8BC8; CLC; JSR $9095; JSR $C606; JSR $81ED; JMP $C60F */
  private sub81BC(): void {
    this.sub8BC8();
    this.sub9095(false);
    this._system.coroutineYield(1);
  }

  /** $81D1: 精灵组分�? �?JMP $9366 */
  private sub81D1(): void {
    // JMP $9366 �?传球/射门相关流程
  }

  /** $81EA: 精灵组分�? �?JMP $9366 */
  private sub81EA(): void {
    // �?$81D1 相同: JMP $9366
  }

  /** $8BBA: 精灵组分�? �?球员选择+查指�?�?$C4C8 */
  private sub8BBA(): void {
    if (this.rd(0x0600) === 0) return;
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    const d = this.readMemByte(ptr);
    this._system.subC54E(d);
  }

  /** $8E33: 精灵位置更新 */
  private sub8E33(): void {
    if (this.rd(0x0600) === 0) return;
    const actionType = this.rd(0x043D);
    const dir = this.rd(0x0442);
    if (dir === 0 || dir === 0x0B) {
      if (actionType === 0x04 || actionType === 0x05 || actionType === 0x06) return;
    } else {
      if (actionType === 0x05 || actionType === 0x06) return;
    }
    if (this.rd(0x0612) !== 0) return;
  }

  /**
   * $9095: 通用辅助 (SEC/CLC 入口)�?   * asm: LDA $043D; ASL; TAX; PLP; BCC; INX; LDA $90F4,X; ...
   */
  private sub9095(setCarry: boolean = false): void {
    const actionType = this.rd(0x043D);
    let x = (actionType << 1) & 0xFF;
    if (setCarry) x = (x + 1) & 0xFF;
    const TABLE_90F4 = [0x02,0x01,0x01,0x01,0x02,0x01,0x01,0x00];
    let a = TABLE_90F4[x & 0x07] ?? 0;
    const dir = this.rd(0x0442);
    if (dir !== 0 && dir !== 0x0B) {
      const carryFromLsr = (x & 1) !== 0;
      if (carryFromLsr) {
        this._system.subC50C();
        const TABLE_9102 = [0x00,0x00,0x00,0x02,0x00,0x00,0x01,0x00];
        const v = TABLE_9102[this.rd(0x043D) & 0x07] ?? 0;
        const ptr = this.rdPtr(0x0034, 0x0035);
        this.writeMemByte(ptr + 0x0A, v);
      } else {
        const pl = this.rd(0x0441);
        if (pl !== 0 && pl !== 0x0B) {
          this._system.subC50C();
          const ptr = this.rdPtr(0x0034, 0x0035);
          this.writeMemByte(ptr + 0x0A, 0x05);
        }
      }
      const TABLE_90E6 = [0x02,0x01,0x01,0x01,0x02,0x01,0x01,0x00];
      a = TABLE_90E6[x & 0x07] ?? 0;
    }
    this._system.coroutineYield(a);
  }

  /** $8D06: 球员位置读取 (�?$0034 指针, �?$061C/$061D) */
  private sub8D06(): void {
    // 简化版: �?$0441 球员索引, 查表算位�?    void this.rd(0x0441);
  }

  /** $8BC8: 精灵组辅�?(LDX #$03; LDA $0442; ...) */
  private sub8BC8(): void {
    let x = 3;
    const dir = this.rd(0x0442);
    if (dir === 0 || dir === 0x0B) {
      // DEX
      x = 2;
    }
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    const d = this.readMemByte(ptr);
    this._system.subC54E(d);
    void x;
  }

  /** $81ED: 球员方向检�?速度设置 */
  private sub81ED(): void {
    if (this.rd(0x043B) === 0 && this.rd(0x043D) === 0 && (this.rd(0x043E) & 0x7F) === 1) {
      this._system.subC50C();
      this.wr(0x043F, 0x50);
      this.wr(0x0440, 0x00);
    }
  }

  /** $8E6E: 方向设置 */
  private sub8E6E(): void {
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    this.wr(0x0442, this.readMemByte(ptr + 0x06));
  }

  /** $90DD: 帧推进辅�?*/
  private sub90DD(): void {
    this._system.coroutineYield(1);
  }

  /** $8CEA: 方向翻转 */
  private sub8CEA(): void {
    this.wr(0x05FB, this.rd(0x05FB) ^ 0x0B);
  }

  // ════════════════════════════════════════════════════════════
  // 内存读写辅助 (RAM 直接读写, ROM �?bank26 数据提供)
  // ════════════════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    // ROM �? bank26 数据 (stub, �?import bank26 数据�?
    return 0;
  }
  private writeMemByte(addr: number, v: number): void {
    if (addr < 0x0800) {
      this.wr(addr, v);
    }
    // ROM �? bank26 数据只读, 忽略
  }
}

export default MatchEngineService;
