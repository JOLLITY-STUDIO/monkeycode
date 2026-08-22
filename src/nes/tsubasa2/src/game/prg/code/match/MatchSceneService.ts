/**
 * MatchSceneService — bank19 比赛场景辅助逻辑 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 19
 *
 * 职责: 比赛场景切换 + 脚本引导 + 精灵属性设置 + 比赛事件分派。
 *   入口 $9000: 设 $0441=9 (场景bank号=bank09), 通过 $0088/$0089 指针 ($B467) 读脚本流。
 *   循环 $902D: 逐字节读脚本, A>=$E0 走高字节事件, A<$E0 走低字节精灵设置。
 *   $9043: 低字节子程 (精灵属性/坐标设置, 清 $04A5 区, 填精灵表)
 *   $915A: 高字节子程 → $B160: SEC; SBC #$E0; JSR $C509 查跳转表 ($116C 起 7+1 项)
 *   $9339: 指针推进 (ram_008A 加到 ram_0088, 归零 ram_008A)
 *   $9349: 比赛初始化 (计分板/精灵/调色板, 清 $046F 区, 填 $0540 区)
 *   $9405: 精灵批量初始化 (清 $04A5 区, 设精灵基址, 循环填表)
 *
 * 事件分派表 (字节已验证, 跳转表在 bank19 off $116C):
 *   $E0 → $B1A6 精灵批初始化 (JSR $C52D) + 参数→$C54E + 清 $0011/$0012/$000D/$000E/$05D2 + 填 $0557/$0558=$FF
 *   $E1 → $B1E0 逐字节帧等待 (读 N, 每非 $01 字节 1 帧, 循环减到 0)
 *   $E2 → $B1F3 3 字节玩家写入 (X/值/阶段号; 阶段<$0B→$002A=X 否则 $002B=X; JSR $C50C; 写 ($0034))
 *   $E3 → $B218 JMP $B349 比赛初始化 (matchInit9349)
 *   $E4 → $B21B 读字节→ram_008B (精灵索引)
 *   $E5 → $B224 读字节 0-3 → JSR $C509 调色板子分派 ($B23E 复制 / $B246 复制+渐显 / $B2A6 渐隐 / $B2DB 渐显)
 *   $E6 → $B235 ram_063F |= $40 (切 $90AF 精灵连续模式)
 *   $FC → $B333 LDA #$80; STA $0515; RTS (等精灵批完成)
 *
 * 消费方: bank26 (比赛核心引擎) 切 bank19 执行。
 * 数据: src/game/prg/data/tables/match-scene-table.ts (脚本流 MATCH_SCENE_SCRIPT)。
 * 协程: $C515 = 让出 (H5 版用帧计数模拟, 每帧推进一步)。
 *
 * 命名规范: 旧名 Bank19Service → 新名 MatchSceneService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
import {
  MATCH_SCENE_SCRIPT_OFFSET,
  getMatchScriptByte,
  MATCH_CTRL_B402,
} from '../../data/tables/match-scene-table';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchSceneService {
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

  /** 读 16 位指针 */
  protected rdPtr(lo: number, hi: number): number {
    return this.rd(lo) | (this.rd(hi) << 8);
  }

  /** 读 16 位指针 ($0088/$0089) + Y 偏移 — 实际 asm: LDA ($0088),Y */
  private readPtrY(ptrLo: number, ptrHi: number, y: number): number {
    // 指针窗口地址 → 脚本流相对索引: 窗口基址 $A000, 脚本流起点窗口 $B467 (offset $1467)
    const base = this.rdPtr(ptrLo, ptrHi);
    const idx = base - 0xA000 - MATCH_SCENE_SCRIPT_OFFSET + y;
    // 越界返回 $FF (与 asm 未映射窗口读 $FF 一致)
    return getMatchScriptByte(idx);
  }

  // ═══════════════════════════════════════════════════════════
  // $9000-$9040 入口: 比赛场景初始化
  // ═══════════════════════════════════════════════════════════

  /**
   * $9000 入口: 比赛场景初始化。
   * 设 RAM + 指针 + 场景bank号, 启动脚本循环。
   */
  matchSceneInit(): void {
    // $9000: ram_0490=0, ram_0491=2, ram_0087=2
    this.wr(0x0490, 0x00);
    this.wr(0x0491, 0x02);
    this.wr(0x0087, 0x02);
    // $900D: 指针 $B467 (bank09 偏移 $1467)
    this.wr(0x0088, 0x67);
    this.wr(0x0089, 0xB4);
    // $9015: ram_05FB=0 (比赛阶段)
    this.wr(0x05FB, 0x00);
    // $901A: ram_0441=9 (场景bank号=bank09)
    this.wr(0x0441, 0x09);
    // $901F: ram_0442=$14
    this.wr(0x0442, 0x14);
    // $9024: ram_063F=$80
    this.wr(0x063F, 0x80);
    // $9029: ram_008A=0 (索引归零)
    this.wr(0x008A, 0x00);
    // $902D: 循环读 bank09 数据分派
    this.matchSceneLoop();
  }

  /**
   * $902D 循环: 从 bank09 逐字节读, 按值分派。
   * 协程让出由 $C515 控制, H5 版每帧推进一步。
   */
  private matchSceneLoop(): void {
    const y = this.rd(0x008A);
    const a = this.readPtrY(0x0088, 0x0089, y);
    if (a >= 0xE0) {
      // $9035: INC $008A; JSR $915A; JMP $902D
      this.wr(0x008A, (y + 1) & 0xFF);
      this.matchAuxHigh(a);
    } else {
      // $903D: JSR $9043; JMP $902D
      this.matchAuxLow(a);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // $9043-$90AE 低字节子程: 精灵属性设置
  // ═══════════════════════════════════════════════════════════

  /**
   * $9043 低字节子程 (A < $E0): 精灵属性/坐标设置。
   * 检查 ram_063F bit6, bit6=1 走 $90AF, bit6=0 走 $904B。
   */
  matchAuxLow(a: number): void {
    // $9043: BIT $063F; BVC $904B
    if ((this.rd(0x063F) & 0x40) !== 0) {
      // $9048: JMP $90AF (bit6=1)
      this.spriteSetup90AF(a);
      return;
    }
    // $904B: JSR $C515 (协程让出); 等 ram_0515=0
    this.yieldAndWait(0x0515);
    // $9055: ram_0515=1
    this.wr(0x0515, 0x01);
    // $905A-$9063: 清 $04A5-$04EC 区 (X=$47→0, STA $04A5,X; DEX; BPL)
    for (let i = 0; i <= 0x47; i++) this.wr(0x04A5 + i, 0);
    // $9064: ram_04A5=$20, ram_04C8=$20
    this.wr(0x04A5, 0x20);
    this.wr(0x04C8, 0x20);
    // $906C: INX → X=0; STX $003A
    let x = 0;
    this.wr(0x003A, x);
    // $906F: ram_008B (精灵索引) 算坐标
    const idx = this.rd(0x008B);
    // $9071: AND #$07; ORA #$88; LSR; ROR $003A; LSR; ROR $003A; STA $04A7/$04CA
    let v = (idx & 0x07) | 0x88;
    let n = this.rd(0x003A);
    n = ((n << 1) | (v & 1)) & 0xFF; v >>= 1;
    n = ((n << 1) | (v & 1)) & 0xFF; v >>= 1;
    this.wr(0x04A7, v);
    this.wr(0x04CA, v);
    this.wr(0x003A, n);
    this.wr(0x04A6, n);
    // $9086: CLC; ADC #$20; STA $04C9
    this.wr(0x04C9, (n + 0x20) & 0xFF);
    // $908C: ram_008B LSR×3 → X
    x = idx >> 3;
    // $9092: 循环读 bank09 填精灵表
    this.fillSpriteTable(x);
    // $90A9: ram_0515=$80; RTS
    this.wr(0x0515, 0x80);
  }

  /**
   * $9092-$90A7: 循环读 bank09 数据填精灵表。
   * LDY $008A; LDA ($0088),Y; CMP #$E0; BCS $90A9 (退出)
   * JSR $C524; STA $04CB,X; TYA; STA $04A8,X; INX; INC $008A; BNE $9092
   */
  private fillSpriteTable(xStart: number): void {
    let x = xStart;
    while (true) {
      const y = this.rd(0x008A);
      const a = this.readPtrY(0x0088, 0x0089, y);
      if (a >= 0xE0) break;  // $9098: BCS $90A9
      // $909A: JSR $C524 (坐标变换, H5 stub)
      const v = this.transformCoord(a);
      this.wr(0x04CB + x, v);
      this.wr(0x04A8 + x, y);
      x = (x + 1) & 0xFF;
      this.wr(0x008A, (y + 1) & 0xFF);
    }
  }

  /**
   * $90AF-$9159: bit6=1 的精灵设置分支。
   * $90AF: LDY $008A; LDA ($0088),Y; CMP #$E0; BCC $90B8; RTS
   * $90B8: INC $008A; PHA; 协程让出; 清 $04AD/$04A5; 算坐标; 填精灵; 循环8次
   */
  private spriteSetup90AF(aInit: number): void {
    // $90AF: 读下一字节
    let a = aInit;
    if (a >= 0xE0) return;  // $90B7: RTS
    // $90B8: INC $008A
    this.wr(0x008A, (this.rd(0x008A) + 1) & 0xFF);
    // $90BA: PHA (保存 a)
    // $90BB: 协程让出; 等 ram_0515=0
    this.yieldAndWait(0x0515);
    // $90C5: ram_0515=1
    this.wr(0x0515, 0x01);
    // $90CA-$90D5: X=0; STX $04AD; STX $003A; INX; STX $04A5; STX $04A9
    let x = 0;
    this.wr(0x04AD, 0);
    this.wr(0x003A, 0);
    x = 1;
    this.wr(0x04A5, x);
    this.wr(0x04A9, x);
    // $90D8: ram_008B 算坐标 (同 $906F 逻辑)
    const idx = this.rd(0x008B);
    let v = (idx & 0x07) | 0x88;
    let n = this.rd(0x003A);
    n = ((n << 1) | (v & 1)) & 0xFF; v >>= 1;
    n = ((n << 1) | (v & 1)) & 0xFF; v >>= 1;
    this.wr(0x04A7, v);
    this.wr(0x04AB, v);
    // $90EA: ram_008B LSR×3; CLC; ADC $003A; STA $04A6; CLC; ADC #$20; STA $04AA
    const base = (idx >> 3) + n;
    this.wr(0x04A6, base & 0xFF);
    this.wr(0x04AA, (base + 0x20) & 0xFF);
    // $90FB: PLA (恢复 a); JSR $C524; STA $04AC; STY $04A8
    const va = this.transformCoord(a);
    this.wr(0x04AC, va);
    this.wr(0x04A8, this.rd(0x008A));
    // $9105: ram_0515=$80
    this.wr(0x0515, 0x80);
    // $910A-$911B: 循环 8 次调 $B127 (JSR $9127 的子程)
    for (let i = 0; i < 8; i++) {
      this.sub9127(i);
      this.yieldAndWait(0x0516);
    }
    // $911D: ram_008B += 8
    this.wr(0x008B, (this.rd(0x008B) + 8) & 0xFF);
    // $9124: JMP $90AF (循环)
  }

  /**
   * $9127-$9159: 精灵位置计算 (设 $02F8-$02FF 区)。
   * LDA $008B; AND #$07; ASL×4; CLC; ADC #$7C; STA $02F8; ADC #$08; STA $02FC
   * LDA $008B; AND #$F8; CLC; ADC $003A; STA $02FB; STA $02FF
   */
  private sub9127(offset: number): void {
    void offset;
    const idx = this.rd(0x008B);
    // $9139: AND #$07; ASL×4; CLC; ADC #$7C
    const lo = ((idx & 0x07) << 4) + 0x7C;
    this.wr(0x02F8, lo & 0xFF);
    this.wr(0x02FC, (lo + 0x08) & 0xFF);
    // $914C: AND #$F8; CLC; ADC $003A
    const hi = (idx & 0xF8) + this.rd(0x003A);
    this.wr(0x02FB, hi & 0xFF);
    this.wr(0x02FF, hi & 0xFF);
    // $9159: RTS (子程 $915A 由调用者继续)
  }

  // ═══════════════════════════════════════════════════════════
  // $915A-$915D 高字节子程: 比赛事件分派
  // ═══════════════════════════════════════════════════════════

  /**
   * $915A 高字节子程 (A >= $E0): 比赛事件分派。
   * $B15A: JSR $B160; JMP $B339 (指针推进)
   * $B160: SEC; SBC #$E0; JSR $C509 → 查跳转表 (off $116C, 7+1 项, 字节已验证)
   * 跳转表: $E0→$B1A6 / $E1→$B1E0 / $E2→$B1F3 / $E3→$B218 / $E4→$B21B /
   *         $E5→$B224 / $E6→$B235 / $FC→$B333
   */
  matchAuxHigh(a: number): void {
    switch (a) {
      case 0xE0: this.event0(); break;       // $B1A6 精灵批初始化 + 参数处理
      case 0xE1: this.event1(); break;       // $B1E0 逐字节帧等待
      case 0xE2: this.event2(); break;       // $B1F3 3字节玩家写入
      case 0xE3: this.matchInit9349(); break; // $B218 JMP $B349 比赛初始化
      case 0xE4: this.event4(); break;       // $B21B 精灵索引
      case 0xE5: this.event5(); break;       // $B224 调色板子分派
      case 0xE6: this.event6(); break;       // $B235 ram_063F |= $40
      case 0xFC: this.eventFC(); break;      // $B333 ram_0515 = $80
      default: break;
    }
    // $B15D: JMP $B339 (指针推进)
    this.advancePointer();
  }

  /**
   * $9339 指针推进: ram_008A 加到 ram_0088/0089, ram_008A 归零。
   * LDA $008A; CLC; ADC $0088; STA $0088; BCC $9344; INC $0089
   * LDA #$00; STA $008A; RTS
   */
  private advancePointer(): void {
    const off = this.rd(0x008A);
    const lo = this.rd(0x0088);
    const sum = lo + off;
    this.wr(0x0088, sum & 0xFF);
    if (sum > 0xFF) this.wr(0x0089, (this.rd(0x0089) + 1) & 0xFF);
    this.wr(0x008A, 0x00);
  }

  // ═══════════════════════════════════════════════════════════
  // $B1A6-$B235: 7+1 路比赛事件处理 (字节已验证)
  // ═══════════════════════════════════════════════════════════

  /**
   * 事件0 $B1A6: JSR $C52D (精灵批初始化); LDY $008A; INC; LDA($0088),Y → JSR $C54E;
   * LDA#$01; JSR $C515; 等 $0516=0; 清 $0011/$0012/$000D/$000E/$05D2;
   * X=0: $0558,X=$FF; $0557,X=$FF; X+=$15 直到 X=$7E。
   */
  private event0(): void {
    // $B1A6: JSR $C52D (精灵批初始化)
    this.subC52D();
    // $B1A9: LDY $008A; INC $008A; LDA ($0088),Y; JSR $C54E
    const y = this.rd(0x008A);
    this.wr(0x008A, (y + 1) & 0xFF);
    const a = this.readPtrY(0x0088, 0x0089, y);
    this.subC54E(a);
    // $B1B2: LDA #$01; JSR $C515; 等 ram_0516=0
    this.yieldAndWait(0x0516);
    // $B1BC: 清 ram_0011/0012/000D/000E/05D2
    this.wr(0x0011, 0);
    this.wr(0x0012, 0);
    this.wr(0x000D, 0);
    this.wr(0x000E, 0);
    this.wr(0x05D2, 0);
    // $B1CD-$B1DF: X=0→$7E (step $15): $0558,X=$FF; $0557,X=$FF
    let x = 0;
    while (x < 0x7E) {
      this.wr(0x0558 + x, 0xFF);
      this.wr(0x0557 + x, 0xFF);
      x = (x + 0x15) & 0xFF;
    }
  }

  /**
   * 事件1 $B1E0: 读字节 N; 循环 {LDA#$01; JSR $C515; SEC; SBC #$01; BNE} → 等 N 帧。
   */
  private event1(): void {
    // $B1E0: LDY $008A; INC $008A; LDA ($0088),Y; PHA
    this.wr(0x008A, (this.rd(0x008A) + 1) & 0xFF);
    const a = this.readPtrY(0x0088, 0x0089, this.rd(0x008A));
    // $B1E7-$B1F0: 循环 让出 1 帧; N-1; BNE
    let n = a;
    while (n !== 0) {
      this.yieldAndWait(0x0515);
      n = (n - 1) & 0xFF;
    }
  }

  /**
   * 事件2 $B1F3: 3 字节 (X/值/阶段号):
   * LDY $008A; LDA→TAX; INY; LDA→PHA(值); INY; LDA(阶段号); INY; STY $008A;
   * CMP #$0B; BCS → $002B=X 否则 $002A=X; JSR $C50C; PLA; LDY #$00; STA ($0034),Y。
   */
  private event2(): void {
    // $B1F3: 读 3 字节
    const y0 = this.rd(0x008A);
    const xVal = this.readPtrY(0x0088, 0x0089, y0);       // TAX
    const val = this.readPtrY(0x0088, 0x0089, y0 + 1);    // PHA (值)
    const phase = this.readPtrY(0x0088, 0x0089, y0 + 2);  // 阶段号
    this.wr(0x008A, (y0 + 3) & 0xFF);                     // STY $008A
    // $B1FE: CMP #$0B; BCS → $002B=X 否则 $002A=X
    if (phase >= 0x0B) {
      this.wr(0x002B, xVal);
    } else {
      this.wr(0x002A, xVal);
    }
    // $B20F: JSR $C50C (查玩家数据指针 → $0034/$0035)
    this.subC50C();
    // $B212: PLA; LDY #$00; STA ($0034),Y — 写值到玩家数据
    this.wr(this.rdPtr(0x0034, 0x0035), val);
  }

  /**
   * 事件4 $B21B: INC $008A; LDA ($0088),Y; STA $008B (精灵索引)。
   */
  private event4(): void {
    // $B21B: LDY $008A; INC $008A; LDA ($0088),Y; STA $008B; RTS
    this.wr(0x008A, (this.rd(0x008A) + 1) & 0xFF);
    const a = this.readPtrY(0x0088, 0x0089, this.rd(0x008A));
    this.wr(0x008B, a);
  }

  /**
   * 事件5 $B224: INC $008A; LDA ($0088),Y; JSR $C509 → 调色板子分派 (内嵌表 4 项):
   *   0 → $B23E: $0472=$0F; JMP $B2F7 (填 $046F 每 4 字节 $0F)
   *   1 → $B246: $0472=$30; $046F→$0408 (0x20B); JSR $B310 整理; 等 $30 帧; 渐显
   *   2 → $B2A6: 渐隐
   *   3 → $B2DB: 渐显
   */
  private event5(): void {
    // $B224: INC $008A; LDA ($0088),Y
    this.wr(0x008A, (this.rd(0x008A) + 1) & 0xFF);
    const a = this.readPtrY(0x0088, 0x0089, this.rd(0x008A));
    // $B22A: JSR $C509 — 去CPU化: 直接按参数分派
    switch (a & 0xff) {
      case 0: this.subB23E(); break;   // $0472=$0F + 填 $0F
      case 1: this.subB246(); break;   // 复制 + 整理 + 渐显
      case 2: this.sub92A8(); break;   // 渐隐 (原 $B2A6)
      case 3: this.sub92DD(); break;   // 渐显 (原 $B2DB)
      default: break;
    }
  }

  /**
   * 事件6 $B235: LDA $063F; ORA #$40; STA $063F (切 $90AF 精灵连续模式)。
   */
  private event6(): void {
    // $B235: ORA #$40; STA $063F; RTS
    this.wr(0x063F, this.rd(0x063F) | 0x40);
  }

  /**
   * $FC 事件 $B333: LDA #$80; STA $0515; RTS (等精灵批完成标志)。
   */
  private eventFC(): void {
    // $B333: ram_0515 = $80
    this.wr(0x0515, 0x80);
  }

  /**
   * $B23E: LDA #$0F; STA $0472; JMP $B2F7 (填 $046F 每 4 字节 $0F, 然后刷新+让出)。
   */
  private subB23E(): void {
    this.wr(0x0472, 0x0F);
    this.sub92F7(0x0F);
  }

  /**
   * $B246: LDA #$30; STA $0472; $046F→$0408 (0x20B); JSR $B310 整理;
   * LDA #$30; JSR $C515 (等 $30 帧); 渐显序列 (step $20→$10→$00, 每步 5 帧)。
   */
  private subB246(): void {
    this.wr(0x0472, 0x30);
    for (let i = 0; i < 0x20; i++) this.wr(0x0408 + i, this.rd(0x046F + i));
    this.sub9310();
    this.yieldCount(0x30);
    // 渐显序列: step = $20, $10, $00 (PHA; 等 5 帧; 逐字节整理 $0408→$046F)
    let step = 0x20;
    while ((step & 0x80) === 0) {
      this.yieldAndWait2();
      this.wr(0x003A, step);
      for (let x = 0; x < 0x20; x++) {
        const v = this.rd(0x0408 + x);
        const hi = v & 0xF0;
        if (hi >= step) continue;
        const lo = v & 0x0F;
        let nv;
        if (lo === 0x0F) {
          nv = (lo | step) === 0x0F ? 0x0F : (lo | step);
        } else {
          nv = lo | step;
        }
        if (nv === 0) nv = 0x0F;
        this.wr(0x046F + x, nv & 0xFF);
      }
      this.subC533();
      step = (step - 0x10) & 0xFF;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // $9240-$930F: 调色板/计分板辅助
  // ═══════════════════════════════════════════════════════════

  /**
   * $92A8-$92DA: 渐隐调色板循环。
   * PHA; LDA #$02; JSR $C515; PLA; STA $003A;
   * 循环 X=0→$1F: AND #$03; 读 $046F,X; 改色; 写回;
   * JSR $C533; SEC; SBC #$10; BPL 循环
   */
  sub92A8(): void {
    let step = 0x30;
    while ((step & 0x80) === 0) {
      this.yieldAndWait2();
      this.wr(0x003A, step);
      for (let x = 0; x < 0x20; x++) {
        if ((x & 0x03) === 0) {
          const v = this.rd(0x046F + x);
          let nv = v & 0x0F;
          nv |= step;
          if (nv === 0) nv = 0x0F;
          this.wr(0x046F + x, nv);
        }
      }
      this.subC533();
      step = (step - 0x10) & 0xFF;
    }
  }

  /**
   * $92DD-$92F6: 渐显调色板循环 (类似 $92A8 但递增)。
   */
  sub92DD(): void {
    let step = 0x10;
    while (step < 0x40) {
      this.yieldAndWait2();
      this.wr(0x0472, step);
      this.subC533();
      step = (step + 0x10) & 0xFF;
    }
  }

  /**
   * $92F7-$930F: 填 $046F 区 (每4字节写 A, 然后协程让出)。
   * LDX #$00; STA $046F,X; INX×4; CPX #$20; BNE; JSR $C533; LDA #$01; JSR $C515; RTS
   */
  private sub92F7(val: number): void {
    let x = 0;
    while (x < 0x20) {
      this.wr(0x046F + x, val);
      x += 4;
    }
    this.subC533();
    this.yieldAndWait(0x0515);
  }

  // ═══════════════════════════════════════════════════════════
  // $9310-$9338: 调色板整理
  // ═══════════════════════════════════════════════════════════

  /**
   * $9310: 整理 $046F 区 (AND #$0F; ORA #$30; CMP #$3F; 改 $30→$30), JSR $C533, 协程让出。
   */
  sub9310(): void {
    for (let x = 0; x < 0x20; x++) {
      let v = this.rd(0x046F + x);
      v = (v & 0x0F) | 0x30;
      if (v === 0x3F) v = 0x30;
      this.wr(0x046F + x, v);
    }
    this.subC533();
    this.yieldAndWait(0x0515);
  }

  /**
   * $9335: ram_0515=$80; RTS (设等待标志)。
   */
  sub9335(): void {
    this.wr(0x0515, 0x80);
  }

  // ═══════════════════════════════════════════════════════════
  // $9349-$93FF: 比赛初始化 (计分板/精灵/调色板)
  // ═══════════════════════════════════════════════════════════

  /**
   * $9349: 比赛初始化。
   * 调 $B2A6 (sub92A8 渐隐), 设 ram_046B=1, 清 ram_004B/0517/053C,
   * 设 ram_053A=$80, ram_004A=$24, 调 $B406 (精灵渲染), 设 PPU CTRL,
   * 调 $C530 (NT 填充), 调 $C533, 设 $0494-$0497, 设 $0490/$0491, 填 $0540 区,
   * 协程让出, 渐显计分板。
   */
  matchInit9349(): void {
    // $9349: JSR $B2A6 (渐隐)
    this.sub92A8();
    // $934C: ram_046B=1
    this.wr(0x046B, 0x01);
    // $9351: 清 ram_004B/0517/053C
    this.wr(0x004B, 0);
    this.wr(0x0517, 0);
    this.wr(0x053C, 0);
    // $935B: ram_053A=$80
    this.wr(0x053A, 0x80);
    // $9360: ram_004A=$24
    this.wr(0x004A, 0x24);
    // $9364: JSR $B406 (A=$20); JSR $B406 (A=$28) — 精灵渲染
    this.subB406(0x20);
    this.subB406(0x28);
    // $936E: ram_0020 AND #$FC
    this.wr(0x0020, this.rd(0x0020) & 0xFC);
    // $9374: LDX #$10; LDA #$15; JSR $C530
    this.subC530(0x10, 0x15);
    // $937B: LDX #$00; LDA #$16; JSR $C530
    this.subC530(0x00, 0x16);
    // $9382: JSR $C533
    this.subC533();
    // $9388: 读 $B402 表 (MATCH_CTRL_B402) → $0494-$0497 (4字节)
    for (let i = 0; i < 4; i++) {
      this.wr(0x0494 + i, MATCH_CTRL_B402[i] ?? 0);
    }
    // $9393: ram_0490=$7C, ram_0491=$7E
    this.wr(0x0490, 0x7C);
    this.wr(0x0491, 0x7E);
    // $939D-$93B9: 填 $0540 区 ($0557/$0558/$0541/$054F/$0553/$0547/$0559)
    this.wr(0x0557, 0xFF);
    this.wr(0x0558, 0xFF);
    this.wr(0x0541, 0xFF);
    this.wr(0x054F, 0xFF);
    this.wr(0x0553, 0xDD);
    this.wr(0x0547, 0x80);
    this.wr(0x0559, 0x31);
    // $93BC: JSR $C533
    this.subC533();
    // $93C2: 协程让出 (A=$60)
    this.yieldCount(0x60);
    // $93C7: ram_008A=0
    this.wr(0x008A, 0);
    // $93CB-$93D7: 循环 ram_008A += $60, 协程让出
    while (true) {
      this.yieldAndWait(0x0515);
      const v = (this.rd(0x008A) + 0x60) & 0xFF;
      this.wr(0x008A, v);
      if (v === 0) break;
    }
    // $93D9: DEC $054F; DEC $004A; BEQ $93FA
    this.wr(0x054F, (this.rd(0x054F) - 1) & 0xFF);
    this.wr(0x004A, (this.rd(0x004A) - 1) & 0xFF);
    if (this.rd(0x004A) === 0) {
      // $93FA: 协程让出; JMP $B3FA
      this.yieldAndWait(0x0515);
      this.subB3FA();
      return;
    }
    // $93E0: 设 ram_0470 (CMP #$14→X=$06, CMP #$08→X=$16)
    const v = this.rd(0x004A);
    let x = 0x06;
    if (v === 0x14) x = 0x06;
    else if (v === 0x08) x = 0x16;
    this.wr(0x0470, x);
    // $93F1: JSR $C533; JMP $B3CB
    this.subC533();
    this.subB3CB();
  }

  // ═══════════════════════════════════════════════════════════
  // $9405-$944D: 精灵批量初始化
  // ═══════════════════════════════════════════════════════════

  /**
   * $9405: 精灵批量初始化。
   * PHA; 清 ram_008B/008A; 协程让出; 清 $04A5 区;
   * 设 $04A5=$20, $04A6=ram_008A, $04A7=ram_008B|A;
   * ram_0515=$80; ram_008A += $20; ram_008B 进位; 循环直到 ram_008B >= 4。
   */
  sub9405(a: number): void {
    // $9406: PHA
    // $9407: 清 ram_008B/008A
    this.wr(0x008B, 0);
    this.wr(0x008A, 0);
    // $940D: 循环
    while (this.rd(0x008B) < 4) {
      this.yieldAndWait(0x0515);
      // $9417: ram_0515=1
      this.wr(0x0515, 0x01);
      // $941C: 清 $04A5-$04C9 (X=$24→0)
      for (let i = 0; i <= 0x24; i++) this.wr(0x04A5 + i, 0);
      // $9426: ram_04A5=$20
      this.wr(0x04A5, 0x20);
      // $942B: ram_04A6=ram_008A
      this.wr(0x04A6, this.rd(0x008A));
      // $9430: PLA; PHA; ORA ram_008B; STA $04A7
      this.wr(0x04A7, a | this.rd(0x008B));
      // $9437: ram_0515=$80
      this.wr(0x0515, 0x80);
      // $943C: ram_008A += $20; ram_008B 进位
      const lo = this.rd(0x008A) + 0x20;
      this.wr(0x008A, lo & 0xFF);
      if (lo > 0xFF) this.wr(0x008B, (this.rd(0x008B) + 1) & 0xFF);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // bank30 辅助函数 stub (H5 版由其他 service 覆盖)
  // ═══════════════════════════════════════════════════════════

  /** $C515 协程让出 (等 ram_0515=0) — 调 GameSystemService.coroutineYield */
  private yieldAndWait(ramAddr: number): void {
    void ramAddr;
    this._system.coroutineYield(1);
  }

  /** $C515 协程让出 (A=#$02) — 2帧等待 */
  private yieldAndWait2(): void {
    this._system.coroutineYield(2);
  }

  /** $C515 协程让出 (A=指定帧数) */
  private yieldCount(frames: number): void {
    this._system.coroutineYield(frames);
  }

  /** $C524 坐标变换 — 调 GameSystemService.subC524 */
  private transformCoord(a: number): number {
    return this._system.subC524(a);
  }

  /** $C54E 子程 — 调 GameSystemService.subC54E ($CBB0: 设精灵批等待标志) */
  private subC54E(a: number): void {
    this._system.subC54E(a);
  }

  /** $C52D 精灵批初始化 — 调 GameSystemService.subC52D ($CC46) */
  private subC52D(): void {
    this._system.subC52D();
  }

  /** $C50C 查表 — 调 GameSystemService.subC50C (比赛阶段→RAM玩家指针) */
  private subC50C(): void {
    this._system.subC50C();
  }

  /** $C533 NT 刷新 — 调 GameSystemService.subC533 */
  private subC533(): void {
    this._system.subC533();
  }

  /** $C530 调色板拷贝 — 调 GameSystemService.subC530 ($CC02: $FBCC+A*12 → $046F+X) */
  private subC530(x: number, a: number): void {
    this._system.subC530(x, a);
  }

  /** $B406 = $9406 精灵批量初始化 (已翻译为 sub9405, 此处别名) */
  private subB406(a: number): void {
    this.sub9405(a);
  }

  /** $B3FA = $93FA: 协程让出后循环 (LDA #$01; JSR $C515; JMP $B3FA) */
  private subB3FA(): void {
    this.yieldAndWait(0x0515);
    // 循环 (H5 版由 update() 每帧推进, 不死循环)
  }

  /** $B3CB = $93CB: 比赛续行 (JMP $B3CB = 循环回比赛初始化) */
  private subB3CB(): void {
    // $93CB-$93D7: 循环 ram_008A += $60, 协程让出
    // 由 matchInit9349 的循环体覆盖, 此处 no-op
  }

  /** 比赛帧推进 (由 bank26 比赛核心引擎调用) */
  update(frame: number): void {
    void frame;
    // 每帧推进 matchSceneLoop 一步
    this.matchSceneLoop();
  }
}

export default MatchSceneService;
