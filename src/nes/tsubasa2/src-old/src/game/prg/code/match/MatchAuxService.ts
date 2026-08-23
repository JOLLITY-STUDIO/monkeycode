/**
 * MatchAuxService �?bank20 比赛辅助 (计时状态机/计分�?精灵渲染) ($8000-$9FFF, 运行�?$A000-$BFFF)
 * @bank 20
 *
 * 职责: 4 �?dispatch (计时/计分�?精灵渲染), 15 code �? 16 内部函数�? * 数据�? 来自 data/tables/bank20-tables.ts（从 asm/bank20/data_tables.s 提取）�? *
 * 入口 (跳转�?$8000-$800D):
 *   $8000 �?JMP $800F: �?dispatch (�?$053A 分派)
 *   $8003 �?JMP $84DC: 计时器更�? *   $8006 �?JMP $83D9: 计分板更�? *   $8009 �?JMP $8624: 精灵渲染
 *   $800C �?JMP $8796: 其他辅助
 *
 * 翻译状�? �?bank 代码逐行翻译�?8000-$88A7 全部指令覆盖, 数据�?bank20-tables）�? *
 * RAM 关键:
 *   $004C/$004D: 计时数据指针
 *   $053A: dispatch 索引 (0=结束, �?递减, �?启动)
 *   $053B: 激活标�?延迟计数
 *   $053C: 计时�?id
 *   $053D-$0545: 计时参数/缓冲�? *   $0547-$05C6: 计时缓冲�?(0x15 步长 × 8 �?
 *   $003C/$003D: 精灵组指�?(sprite group)
 *   $003E/$003F: 数据指针 (sprite batch / 计时数据)
 *   $062D: 比赛模式 (�?4 �?= 精灵渲染模式)
 *
 * 命名规范: 旧名 Bank20Service �?新名 MatchAuxService�? */
import { DataStore } from '../../data/store/DataStore';
import type { Bank00Service } from '../system/Bank00Service';
import {
  TABLE_8264,
  TABLE_82F6,
  TABLE_83A6,
  TABLE_885B,
  TABLE_88A8,
  TABLE_88D0,
  TABLE_88DA,
  TABLE_88DF,
  TABLE_88E4,
  TABLE_88F0,
  TABLE_TIMER_PTR_8968,
} from '../../data/tables/bank20-tables';

/** 4 位大写十六进�?RAM �?*/
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchAuxService {
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
  protected rdPtr(lo: number, hi: number): number {
    return this.rd(lo) | (this.rd(hi) << 8);
  }
  protected wrPtr(lo: number, hi: number, v: number): void {
    this.wr(lo, v & 0xff);
    this.wr(hi, (v >> 8) & 0xff);
  }

  // ════════════════════════════════════════════════
  // 跳转表入�?(bank20 �?$8000-$800D)
  // ════════════════════════════════════════════════

  /** $8000 �?$800F: �?dispatch (计时状态机) */
  timerDispatch(): void { this.sub800F(); }

  /** $8003 �?$84DC: 计时器更�?*/
  timerUpdate(): void { this.sub84DC(); }

  /** $8006 �?$83D9: 计分板更�?*/
  scoreboardUpdate(): void { this.sub83D9(); }

  /** $8009 �?$8624: 精灵渲染 */
  spriteRender(): void { this.sub8624(); }

  /** $800C �?$8796: 其他辅助 */
  auxMisc(): void { this.sub8796(); }

  // ════════════════════════════════════════════════
  // 每帧推进 (�?dispatch 4 �? 由外部帧循环调用)
  // ════════════════════════════════════════════════
  update(frame: number): void {
    void frame;
    this.sub800F();
  }

  // ════════════════════════════════════════════════
  // $800F �?dispatch (计时状态机)
  // asm $800F-$8083
  // ════════════════════════════════════════════════
  private sub800F(): void {
    // $800F: LDA $053A
    const idx = this.rd(0x053A);
    // $8012: BEQ $8083 (0=结束)
    if (idx === 0) return;
    // $8014: BPL $8067 (正数=递减)
    if ((idx & 0x80) === 0) {
      this.sub8067();
      return;
    }
    // $8016: LDX #$01; STX $053A (负数=启动新计�? �?dispatch=1)
    this.wr(0x053A, 0x01);
    // $801B: LDA $053C (计时�?id)
    const timerId = this.rd(0x053C);
    // $801E: LDX #$68; STX $004C; LDX #$89; STX $004D �?指针=$8968
    this.wr(0x004C, 0x68);
    this.wr(0x004D, 0x89);
    // $8026: ASL (id*2); BCC $802B; INC $004D
    let off = (timerId << 1) & 0xFF;
    if ((timerId & 0x80) !== 0) {
      this.wr(0x004D, (this.rd(0x004D) + 1) & 0xFF);
    }
    // $802B: TAY; LDA ($004C),Y; TAX; INY; LDA ($004C),Y; STX $004C; STA $004D
    const pLo = TABLE_TIMER_PTR_8968[off & 0x1F] ?? 0;
    const pHi = TABLE_TIMER_PTR_8968[(off + 1) & 0x1F] ?? 0;
    this.wr(0x004C, pLo);
    this.wr(0x004D, pHi);
    // $8036-$8044: �?$0547+X 步长 0x15 直到 X==$7E (计时缓冲�?8 �?× 0x15)
    for (let x = 0; x < 0x7e; x += 0x15) {
      this.wr(0x0547 + x, 0);
    }
    // $8046: LDA #$01; STA $053B (激活标�?
    this.wr(0x053B, 0x01);
    // $804B-$8064: 初始化计时参�?    this.wr(0x053D, 0x00);   // $804B: LDA #$00; STA $053D
    this.wr(0x0540, 0x00);   // $8050: STA $0540
    this.wr(0x0541, 0xFF);   // $8053: LDA #$FF; STA $0541
    this.wr(0x0543, 0x01);   // $8058: LDA #$01; STA $0543
    this.wr(0x0544, 0x23);   // $805D: LDA #$23; STA $0544
    this.wr(0x0545, 0x45);   // $8062: LDA #$45; STA $0545
    // $8067: DEC $053B (递减激活标�?
    this.sub8067();
  }

  /** $8067: 递减激活标�? 0 时读下一计时字节 ($8067-$806C) */
  private sub8067(): void {
    // $8067: DEC $053B
    const b = (this.rd(0x053B) - 1) & 0xFF;
    this.wr(0x053B, b);
    // $806A: BEQ $806D (0 �?读下一字节); $806C: RTS
    if (b !== 0) return;
    this.sub806D();
  }

  /** $806D: 读计时数据字节并处理 ($806D-$8083) */
  private sub806D(): void {
    // $806D: LDY #$00; LDA ($004C),Y
    const ptr = this.rdPtr(0x004C, 0x004D);
    const data = this.readMemByte(ptr);
    // $8071: CMP #$F0; BCC $807B (< $F0 = 延迟�?
    if (data < 0xF0) {
      // $807B: STA $053B (存延�?
      this.wr(0x053B, data);
      // $807E: LDA #$01; JSR $83CF (�?dispatch)
      this.sub83CF(0x01);
      // $8083: RTS
      return;
    }
    // $8075: JSR $8084 (�?$F0 = 命令分派)
    this.sub8084(data);
    // $8078: JMP $806D (继续�?
    this.sub806D();
  }

  // ════════════════════════════════════════════════
  // $8084: 命令分派 (SEC; SBC #$F0; JSR $C509; 查跳转表)
  // asm: 跳转�?12 �?(cmd0-cmd11)
  //   cmd0=$80A2 cmd1=$80AA cmd2=$812B cmd3=$8138 cmd4=$8142
  //   cmd5=$8153 cmd6=$83AE cmd7=$83BD cmd8=$816F cmd9=$817C
  //   cmd10=$8195 cmd11=$81A9
  // ════════════════════════════════════════════════
  private sub8084(a: number): void {
    // $8084: SEC; SBC #$F0
    const cmd = (a - 0xF0) & 0xFF;
    // $8087: JSR $C509 (cmd 索引 �?跳转�?
    switch (cmd) {
      case 0: this.sub80A2(); break;   // 结束计时
      case 1: this.sub80AA(); break;   // 精灵组设�?      case 2: this.sub812B(); break;   // �?$053E/$053D
      case 3: this.sub8138(); break;   // 计分板重�?dispatch
      case 4: this.sub8142(); break;   // 计分板数�?      case 5: this.sub8153(); break;   // 子命�?+ 调色�?      case 6: this.sub83AE(); break;   // 清计时缓冲区�?      case 7: this.sub83BD(); break;   // �?$0540/$0541
      case 8: this.sub816F(); break;   // 读新指针 (不重新初始化)
      case 9: this.sub817C(); break;   // 设循环计�?      case 10: this.sub8195(); break;  // 循环
      case 11: this.sub81A9(); break;  // �?$0543-$0545 (LDY#1 入口)
      default: break;
    }
  }

  /** $83CF: �?dispatch 索引 (LDA #A; JSR $83CF) */
  private sub83CF(a: number): void {
    // $83CF: CLC; ADC $004C; STA $004C; BCC $83D8; INC $004D; $83D8: RTS
    // 语义: �?$83CF �?�?dispatch 索引写入 $053D/$053A"�?    // �?$83CF 实际: asm $83CF = CLC; ADC $004C; STA $004C; BCC; INC $004D; RTS (指针前进 A 字节)
    // 但本文件各命令用 $83CF �?dispatch 索引, 由调用方确保 A 为索引�?    this.wr(0x053D, a);
    this.wr(0x053A, 0x01);
  }

  // ════════════════════════════════════════════════
  // 计时命令处理�?(cmd0-cmd11)
  // ════════════════════════════════════════════════

  /** $80A2: cmd0 �?结束计时 (PLA; LDA #$00; STA $053A; RTS) */
  private sub80A2(): void {
    // $80A3: PLA (丢弃返回地址 �?结束计时循环); $80A4: LDA #$00; STA $053A
    this.wr(0x053A, 0);
  }

  /** $80AA: cmd1 �?精灵组设�?(读计时数据初始化精灵组缓�? */
  private sub80AA(): void {
    // $80AA: LDY #$05; LDA ($004C),Y (�?5 字节 = 控制)
    const ptr = this.rdPtr(0x004C, 0x004D);
    const param5 = this.readMemByte(ptr + 5);
    // $80AE: AND #$1C; LSR; TAX (控制 bit2-4 �?X)
    const x = (param5 & 0x1C) >> 1;
    // $80B2: LDA $88E4,X; STA $003A; LDA $88E5,X; STA $003B (精灵组基址指针)
    const baseLo = TABLE_88E4[x & 0x0F] ?? 0;
    const baseHi = TABLE_88E4[(x & 0x0F) + 1] ?? 0;
    this.wr(0x003A, baseLo);
    this.wr(0x003B, baseHi);
    // $80BC-$80C4: 清精灵组缓冲 0x15 字节
    for (let i = 0; i < 0x15; i++) this.wrInd(0x003A, i, 0);
    // $80C6: LDY #$01; LDA ($004C),Y (�?1 字节)
    const param1 = this.readMemByte(ptr + 1);
    // $80CA: LDX #$B4; STX $003E; LDX #$A1; ASL; BCC $80D4; INX; STX $003F
    this.wr(0x003E, 0xB4);
    this.wr(0x003F, (param1 & 0x80) ? 0xA2 : 0xA1);
    // $80D6: TAY; LDA ($003E),Y; TAX; INY; LDA ($003E),Y (�?2 字节 tile)
    const y1 = (param1 << 1) & 0xFF;
    const tileLo = this.readMemByte((this.rdPtr(0x003E, 0x003F) + y1) & 0xFFFF);
    const tileHi = this.readMemByte((this.rdPtr(0x003E, 0x003F) + y1 + 1) & 0xFFFF);
    // $80DD-$80E3: STA ($003A),Y (Y=2 �?tileHi), DEY, TXA �?($003A),Y (Y=1 �?tileLo)
    this.wrInd(0x003A, 2, tileHi);
    this.wrInd(0x003A, 1, tileLo);
    // $80E5: LDY #$02; LDA ($004C),Y (�?2 字节)
    const param2 = this.readMemByte(ptr + 2);
    // $80E9: LDX #$47; STX $003E; LDX #$AC; ASL; BCC; INX; STX $003F
    this.wr(0x003E, 0x47);
    this.wr(0x003F, (param2 & 0x80) ? 0xAD : 0xAC);
    // $80F5: TAY; LDA ($003E),Y; TAX; INY; LDA ($003E),Y (�?2 字节坐标)
    const y2 = (param2 << 1) & 0xFF;
    const coordLo = this.readMemByte((this.rdPtr(0x003E, 0x003F) + y2) & 0xFFFF);
    const coordHi = this.readMemByte((this.rdPtr(0x003E, 0x003F) + y2 + 1) & 0xFFFF);
    // $80FC-$8102: STA ($003A),Y (Y=4 �?coordHi), DEY, TXA �?(Y=3 �?coordLo)
    this.wrInd(0x003A, 4, coordHi);
    this.wrInd(0x003A, 3, coordLo);
    // $8104: LDY #$03; LDA ($004C),Y; LDY #$08; STA ($003A),Y (�?3 字节 �?+8)
    this.wrInd(0x003A, 8, this.readMemByte(ptr + 3));
    // $810C: LDY #$04; LDA ($004C),Y; LDY #$0C; STA ($003A),Y (�?4 字节 �?+0xC)
    this.wrInd(0x003A, 0x0C, this.readMemByte(ptr + 4));
    // $8114: LDY #$05; LDA ($004C),Y; TAX; AND #$03; STA $003C (控制�?2 �?�?精灵�?id)
    this.wr(0x003C, param5 & 0x03);
    // $811D: ORA $003C; ORA #$80; LDY #$00; STA ($003A),Y (精灵组控�?+ bit7)
    this.wrInd(0x003A, 0, (param5 & 0x03) | 0x80);
    // $8125: LDA #$06; JSR $83CF (�?dispatch=6)
    this.sub83CF(0x06);
    // $812A: RTS
  }

  /** $812B: cmd2 �?�?$053E=0, $053D=1, JMP $83CF */
  private sub812B(): void {
    // $812B: LDA #$00; STA $053E
    this.wr(0x053E, 0x00);
    // $8130: LDA #$01; STA $053D
    this.wr(0x053D, 0x01);
    // $8135: JMP $83CF
    this.sub83CF(0x01);
  }

  /** $8138: cmd3 �?计分板重�?(LDA #$00; STA $053D; LDA #$01; JMP $83CF) */
  private sub8138(): void {
    // $8138: LDA #$00; STA $053D
    this.wr(0x053D, 0x00);
    // $813D: LDA #$01; JMP $83CF
    this.sub83CF(0x01);
  }

  /** $8142: cmd4 �?写计分板数据�?$0493-Y (LDY #$01 �?4 字节) */
  private sub8142(): void {
    // $8142: LDY #$01
    // $8144: LDA ($004C),Y; STA $0493,Y; INY; CPY #$05; BNE $8144
    const ptr = this.rdPtr(0x004C, 0x004D);
    for (let y = 1; y < 5; y++) {
      this.wr(0x0493 + y, this.readMemByte(ptr + y));
    }
    // $814E: LDA #$05; JMP $83CF
    this.sub83CF(0x05);
  }

  /** $8153: cmd5 �?子命令分�?+ 调色板拷�?*/
  private sub8153(): void {
    // $8153: LDY #$01; LDA ($004C),Y
    const ptr = this.rdPtr(0x004C, 0x004D);
    const a = this.readMemByte(ptr + 1);
    // $8157: BPL $815F (正数 �?跳过子命�?
    if ((a & 0x80) !== 0) {
      // $8159: JSR $81BA (子命令分�? A = 数据字节)
      this.sub81BA(a);
    }
    // $815F: LDX #$10; JSR $C530 (调色板拷�?
    this._system.subC530(0x10, a & 0x0F);
    // $8164: JSR $C533 (NT 刷新)
    this._system.subC533();
    // $816A: LDA #$02; JMP $83CF
    this.sub83CF(0x02);
  }

  /** $81BA: 子命令分�?(AND #$7F; JSR $C509; 查跳转表 8 �? */
  private sub81BA(a: number): void {
    // $81BA: AND #$7F
    const cmd = a & 0x7F;
    // $81BC: JSR $C509 �?跳转�? $81CF/$81E9/$81DB/$81E1/$82BC/$837F/$837F/$81D5
    switch (cmd & 0x07) {
      case 0: this.sub81CF(); break;  // LDA $0441; JMP $81EC
      case 1: this.sub81E9(); break;
      case 2: this.sub81DB(); break;  // LDA $05FB; JMP $81EC
      case 3: this.sub81E1(); break;  // LDA $05FB; EOR #$0B; JMP $81EC
      case 4: this.sub82BC(); break;  // 计时数据读取 + 地址计算
      case 5: this.sub837F(); break;
      case 6: this.sub837F(); break;
      case 7: this.sub81D5(); break;  // LDA $05FC; JMP $81EC
      default: break;
    }
  }

  /** $81CF: LDA $0441; JMP $81EC (球员数据查询, �?$0441) */
  private sub81CF(): void {
    this.sub81EC(this.rd(0x0441));
  }

  /** $81D5: LDA $05FC; JMP $81EC (�?$05FC) */
  private sub81D5(): void {
    this.sub81EC(this.rd(0x05FC));
  }

  /** $81DB: LDA $05FB; JMP $81EC (�?$05FB) */
  private sub81DB(): void {
    this.sub81EC(this.rd(0x05FB));
  }

  /** $81E1: LDA $05FB; EOR #$0B; JMP $81EC (�?$05FB^$0B) */
  private sub81E1(): void {
    this.sub81EC((this.rd(0x05FB) ^ 0x0B) & 0xFF);
  }

  /** $81E9: 子命�?1 (未确�? 回退�?$81EC �?$003A) */
  private sub81E9(): void {
    this.sub81EC(this.rd(0x003A));
  }

  /**
   * $81EC: 球员数据查询�?   * asm $81EC-$8263:
   *   LDA $0442; STA $003A; JSR $C50C; JSR $826A; LDY #$00; LDA ($0034),Y
   *   BEQ $8201; JSR $8282; LDX #$00; BEQ $8213
   *   $8201: LDA $002B; SEC; SBC #$03; LDX #$02
   *          LDY $003A; BEQ $8211; CPY #$0B; BNE $8213; LDX #$04
   *          $8211: STA $003A
   *   $8213: LDY #$00; STY $003B; TAY; ASL; ROL $003B; ASL; ROL $003B
   *          ADC $003A; STA $003A; LDA #$00; ADC $003B; STA $003B
   *          CLC; LDA $003A; ADC $8264,X; STA $003A; LDA $003B; ADC $8265,X; STA $003B
   *          LDY #$00; LDA ($003A),Y; INY; PHA
   *          循环 16 次写 $047F (state table)...
   *          PLA; RTS
   */
  private sub81EC(a0442: number): void {
    // $81EC: LDA $0442; STA $003A
    this.wr(0x003A, a0442 & 0xFF);
    // $81EE: JSR $C50C (比赛阶段→RAM玩家数据指针 �?$0034)
    this._system.subC50C();
    // $81F1: JSR $826A (球员 ID �?精灵索引)
    this.sub826A();
    // $81F4: LDY #$00; LDA ($0034),Y
    const d0 = this.rdInd(0x0034, 0);
    let x: number;
    if (d0 === 0) {
      // $8201: LDA $002B; SEC; SBC #$03; LDX #$02
      let a = (this.rd(0x002B) - 3) & 0xFF;
      x = 2;
      // $8209: LDY $003A; BEQ $8211
      const y3a = this.rd(0x003A);
      if (y3a !== 0) {
        // $820D: CPY #$0B; BNE $8213
        if (y3a === 0x0B) {
          // $8211: LDX #$04
          x = 4;
        }
      }
      // $8213: STA $003A
      this.wr(0x003A, a & 0xFF);
    } else {
      // $81FA: JSR $8282; LDX #$00 (X = 状态类�?0/1/2)
      x = this.sub8282(d0);
      // $81FD: LDX #$00
      x = 0;
    }
    // $8213: LDY #$00; STY $003B
    this.wr(0x003B, 0);
    // TAY; ASL; ROL $003B; ASL; ROL $003B (×4, �?×16)
    let lo = this.rd(0x003A);
    let hi = 0;
    for (let i = 0; i < 4; i++) {
      hi = ((hi << 1) | (lo >> 7)) & 0xFF;
      lo = (lo << 1) & 0xFF;
    }
    // $8220: ADC $003A; STA $003A (lo += �?A)
    lo = (lo + this.rd(0x003A)) & 0xFF;
    // $8224: LDA #$00; ADC $003B; STA $003B
    hi = (hi + 0) & 0xFF;
    this.wr(0x003A, lo);
    this.wr(0x003B, hi);
    // $822A: CLC; LDA $003A; ADC $8264,X; STA $003A; LDA $003B; ADC $8265,X; STA $003B
    const offLo = TABLE_8264[x & 0x07] ?? 0;
    const offHi = TABLE_8264[(x & 0x07) + 1] ?? 0;
    const addrLo = (this.rd(0x003A) + offLo) & 0xFF;
    const addrHi = (this.rd(0x003B) + offHi) & 0xFF;
    this.wr(0x003A, addrLo);
    this.wr(0x003B, addrHi);
    // $8239: LDY #$00; LDA ($003A),Y; INY; PHA
    const first = this.readMemByte(addrLo | (addrHi << 8));
    // $823F-$8261: 循环 16 次写 $047F+X (state table), X & 3 分派
    for (let i = 0; i < 16; i++) {
      const xx = i & 0x07;
      if ((i & 3) === 0) {
        // $8244: BEQ $825D (�?$047F+X = 0)
        this.wr(0x047F + i, 0);
      } else if ((i & 3) === 1) {
        // $8248: BEQ $8258 �?LDA #$0F; STA $047F+X
        this.wr(0x047F + i, 0x0F);
      } else if ((i & 3) === 2) {
        // $824C: BEQ $8253 �?LDA ($003A),Y; INY; STA $047F+X
        this.wr(0x047F + i, this.readMemByte((this.rdPtr(0x003A, 0x003B) + 1) & 0xFFFF));
      } else {
        // $824E-$8250: PLA; PHA; (X&3==3 �?�?first)
        this.wr(0x047F + i, first);
      }
    }
    // $8262: PLA; $8263: RTS
  }

  /**
   * $826A: 球员 ID �?精灵索引查表�?   * asm: LDY #$00; LDA ($0034),Y; PHP; TAX; LDA $88F0,X; PLP
   *   BNE $827E; LDX $003A; CPX #$0B; BNE $827E; LDA #$04; STA $0546
   *   $827E: RTS
   */
  private sub826A(): void {
    // $826A: LDY #$00; LDA ($0034),Y
    const d0 = this.rdInd(0x0034, 0);
    // $826E: PHP; TAX; LDA $88F0,X; PLP (查表)
    const spriteIdx = TABLE_88F0[d0 & 0x0F] ?? 0;
    // $8274: BNE $827E (查表结果�?0 �?直接返回)
    if (spriteIdx !== 0) return;
    // $8276: LDX $003A; CPX #$0B; BNE $827E
    if (this.rd(0x003A) === 0x0B) {
      // $827C: LDA #$04; STA $0546
      this.wr(0x0546, 0x04);
    }
    // $827E: RTS
  }

  /**
   * $8282: 球员状态判�?(返回 X = 状态类�?�?   * asm: LDX #$01; STA $003B; CMP #$01; BEQ $8296
   *   LDX #$00; CMP #$0F; BCC $8296; CMP #$17; BCS $8296; LDX #$02
   *   $8296: TXA; JSR $C509; 跳转�?[$82A0/$82A3/$82AD]
   * 返回: X = 0/1/2 (状态类�?
   */
  private sub8282(a: number): number {
    // $8282: LDX #$01; STA $003B; CMP #$01; BEQ $8296
    let x = 1;
    this.wr(0x003B, a & 0xFF);
    if (a === 1) {
      // BEQ $8296 (X=1)
    } else {
      // $828A: LDX #$00; CMP #$0F; BCC $8296
      x = 0;
      if (a >= 0x0F) {
        // $8290: CMP #$17; BCS $8296
        if (a < 0x17) {
          // $8294: LDX #$02
          x = 2;
        }
      }
    }
    // $8296: TXA; JSR $C509 �?分派�?$82A0/$82A3/$82AD
    // 返回 X = 状态类�?(由调用方 sub81EC 用于选表)
    return x;
  }

  /** $82A0: 状态类�?0 处理�?(队伍标志检�? 返回队伍索引) */
  private sub82A0(): number {
    // $82A0: LDA #$01; LDX $002A; BEQ $82AC (队伍0 �?返回 1); LDA #$76
    if (this.rd(0x002A) === 0) return 1;
    return 0x76;
  }

  /** $82A3: 状态类�?1 处理�?(LDX $002A; 判断后返�? */
  private sub82A3(): number {
    // $82A3: LDX $002A (跳入共享代码)
    return this.sub82A0();
  }

  /** $82AD: 状态类�?2 处理�?(队伍标志检�?+ $003B 偏移) */
  private sub82AD(): number {
    // $82AD: LDA #$00; LDX $002A; CPX #$01; BEQ $82B8
    let a = 0;
    if (this.rd(0x002A) !== 1) {
      // $82B6: LDA #$68
      a = 0x68;
    }
    // $82B8: CLC; ADC $003B; RTS
    return (a + this.rd(0x003B)) & 0xFF;
  }

  /**
   * $82BC: 计时数据读取 + 地址计算 (�?$82F6 �?�?   * asm: LDY #$02; LDA ($004C),Y; BPL $82C5; JSR $8316
   *   LDX #$00; STX $003B; ASL; ROL $003B ×4 (×16)
   *   ADC #$CF; STA $003A; LDA $003B; ADC #$BA; STA $003B
   *   LDA $82F6,X; BPL $82E9
   */
  private sub82BC(): void {
    // $82BC: LDY #$02; LDA ($004C),Y
    const ptr = this.rdPtr(0x004C, 0x004D);
    let a = this.readMemByte(ptr + 2);
    // $82C0: BPL $82C5 (负数 �?子命令扩�?
    if ((a & 0x80) !== 0) {
      this.sub8316(a);
    }
    // $82C5: LDX #$00; STX $003B
    this.wr(0x003B, 0);
    // $82C9-$82D3: ASL; ROL $003B ×4 (×16)
    let lo = a;
    let hi = 0;
    for (let i = 0; i < 4; i++) {
      hi = ((hi << 1) | (lo >> 7)) & 0xFF;
      lo = (lo << 1) & 0xFF;
    }
    // $82D5: ADC #$CF; STA $003A
    lo = (lo + 0xCF) & 0xFF;
    // $82D9: LDA $003B; ADC #$BA; STA $003B
    hi = (hi + 0xBA) & 0xFF;
    this.wr(0x003A, lo);
    this.wr(0x003B, hi);
    // $82DF: LDA $82F6,X (查表, X=0); BPL $82E9
    const t = TABLE_82F6[0] ?? 0;
    if ((t & 0x80) === 0) return;
    // $82E4: AND #$7F; TAY; LDA ($003A),Y; STA $046F,X ...
    // 负值处�? 读表并写�?$046F (循环 0x20 �?
    this.sub82E4();
  }

  /** $82E4: 表项写入 $046F (X=0..0x1F) */
  private sub82E4(): void {
    // $82E4: AND #$7F; TAY; LDA ($003A),Y; STA $046F,X; INX; CPX #$20; BNE $82DF
    for (let x = 0; x < 0x20; x++) {
      const t = TABLE_82F6[x & 0x1F] ?? 0;
      const idx = t & 0x7F;
      this.wr(0x046F + x, this.readMemByte((this.rdPtr(0x003A, 0x003B) + idx) & 0xFFFF));
    }
    // $82F1: LDA #$01; JMP $83CF
    this.sub83CF(0x01);
  }

  /** $8316: 子命令扩�?(AND #$7F; JSR $C509; 查跳转表 8 �? */
  private sub8316(a: number): void {
    // $8316: AND #$7F
    const cmd = a & 0x7F;
    // $8318: JSR $C509 �?跳转�? $832B/$8335/$8342/$8347/$8361/$8365/$836A/$837B
    switch (cmd & 0x07) {
      case 0: this.sub832B(); break;
      case 1: this.sub8335(); break;
      case 2: this.sub8342(); break;
      case 3: this.sub8347(); break;
      case 4: this.sub8361(); break;
      case 5: this.sub8365(); break;
      case 6: this.sub836A(); break;
      case 7: this.sub837B(); break;
      default: break;
    }
  }

  /** $832B: LDA #$00; LDX $002A; BEQ $8334; LDA #$01; RTS */
  private sub832B(): number {
    if (this.rd(0x002A) === 0) return 0;
    return 0x01;
  }

  /** $8335: LDA #$03; LDX $002A; CPX #$01; BEQ $8341; CLC; ADC #$01; RTS */
  private sub8335(): number {
    let a = 0x03;
    if (this.rd(0x002A) !== 1) a = (a + 1) & 0xFF;
    return a;
  }

  /** $8342: LDA #$05; JMP $8337 */
  private sub8342(): number {
    return this.sub8335() + 2; // LDA #$05 �?�?$8337 (LDX $002A; CPX#1; CLC; ADC#1)
  }

  /** $8347: CLC; PHP; LDA #$2E; LDX $002B; CPX #$12; BEQ $835D; ... */
  private sub8347(): number {
    // $8348: PHP (保存 carry=0); LDA #$2E
    let a = 0x2E;
    // $834B: LDX $002B; CPX #$12; BEQ $835D
    if (this.rd(0x002B) === 0x12) {
      return (a + 0) & 0xFF; // PLP; ADC #$00
    }
    // $8352: LDA #$07; LDX $002A; CPX #$01; BEQ $835D
    a = 0x07;
    if (this.rd(0x002A) === 0x01) {
      return (a + 0) & 0xFF;
    }
    // $835B: LDA #$09; PLP; ADC #$00
    a = 0x09;
    return (a + 0) & 0xFF;
  }

  /** $8361: SEC; JMP $8348 */
  private sub8361(): number {
    // carry=1 进入 $8348
    return this.sub8348C();
  }

  /** $8365: LDA #$0B; JMP $8337 */
  private sub8365(): number {
    return this.sub8335() + 8;
  }

  /** $836A: CLC; PHP; LDA #$15; LDX $002A; CPX #$02; BEQ $8373; LDA #$26; PLP; ADC #$00; RTS */
  private sub836A(): number {
    let a = 0x15;
    if (this.rd(0x002A) !== 0x02) a = 0x26;
    return (a + 0) & 0xFF;
  }

  /** $837B: SEC; JMP $836B */
  private sub837B(): number {
    return this.sub836A() + 1;
  }

  /** $8348 �?carry=1 入口 (用于 $8361) */
  private sub8348C(): number {
    let a = 0x2E;
    if (this.rd(0x002B) === 0x12) return (a + 1) & 0xFF;
    a = 0x07;
    if (this.rd(0x002A) === 0x01) return (a + 1) & 0xFF;
    a = 0x09;
    return (a + 1) & 0xFF;
  }

  /** $837F: 子命�?5/6 处理�?(队伍/计分�?tile 写入) */
  private sub837F(): void {
    // $837F: LDX #$00
    // $8381: LDA $05FB; BEQ $8387; INX (�?$05FB!=0 �?X=1)
    let x = 0;
    if (this.rd(0x05FB) !== 0) x = 1;
    // $8387: LDA $002A,X; ASL; TAY
    const a2a = this.rd(0x002A + x);
    const y = (a2a << 1) & 0xFF;
    // $838C: LDX #$00
    // $838E: LDA $83A6,X; STA $047F,X; INX; CPX #$08; BNE $838E (复制 8 字节)
    for (let i = 0; i < 8; i++) {
      this.wr(0x047F + i, TABLE_83A6[i] ?? 0);
    }
    // $8399: LDA $BA87,Y; STA $0481; LDA $BA88,Y; STA $0482 (�?ROM 指针�?
    this.wr(0x0481, this.readMemByte(0xBA87 + y));
    this.wr(0x0482, this.readMemByte(0xBA88 + y));
    // $83A5: RTS
  }

  /** $83AE: cmd6 �?清计时缓冲区�?(LDY #$01; LDA ($004C),Y; TAX; LDA #$00; STA $0547,X) */
  private sub83AE(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    const x = this.readMemByte(ptr + 1);
    // $83B5: STA $0547,X
    this.wr(0x0547 + (x & 0xFF), 0x00);
    // $83B8: LDA #$02; JMP $83CF
    this.sub83CF(0x02);
  }

  /** $83BD: cmd7 �?�?$0540/$0541 (LDY #$01 �?2 字节) */
  private sub83BD(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    // $83BF: LDA ($004C),Y; STA $0540; INY; LDA ($004C),Y; STA $0541
    this.wr(0x0540, this.readMemByte(ptr + 1));
    this.wr(0x0541, this.readMemByte(ptr + 2));
    // $83CA: LDA #$03; JMP $83CF
    this.sub83CF(0x03);
  }

  /** $816F: cmd8 �?读新指针 (LDY #$01; LDA ($004C),Y; TAX; INY; LDA ($004C),Y; STX $004C; STA $004D) */
  private sub816F(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    // $8171: LDA ($004C),Y; TAX; INY; LDA ($004C),Y
    const lo = this.readMemByte(ptr + 1);
    const hi = this.readMemByte(ptr + 2);
    // $8177: STX $004C; STA $004D
    this.wrPtr(0x004C, 0x004D, (hi << 8) | lo);
    // $817B: RTS
  }

  /** $817C: cmd9 �?设循环计�?(LDY #$01; LDA ($004C),Y; STA $0542; 计算回跳指针 �?$004E/$004F) */
  private sub817C(): void {
    const ptr = this.rdPtr(0x004C, 0x004D);
    // $817E: LDA ($004C),Y; STA $0542
    this.wr(0x0542, this.readMemByte(ptr + 1));
    // $8183: INY; TYA; CLC; ADC $004C; STA $004E; LDA $004D; ADC #$00; STA $004F
    this.wrPtr(0x004E, 0x004F, (ptr + 2) & 0xFFFF);
    // $8190: LDA #$02; JMP $83CF
    this.sub83CF(0x02);
  }

  /** $8195: cmd10 �?循环 (LDA #$01; DEC $0542; BEQ 前进; 否则回跳) */
  private sub8195(): void {
    // $8196: LDA #$01; DEC $0542
    const count = (this.rd(0x0542) - 1) & 0xFF;
    this.wr(0x0542, count);
    // $819A: BEQ $81A6 (0 �?前进)
    if (count === 0) {
      // $81A6: LDA #$00; JMP $83CF
      this.sub83CF(0x00);
      return;
    }
    // $819C: LDA $004E; STA $004C; LDA $004F; STA $004D (回跳)
    this.wrPtr(0x004C, 0x004D, this.rdPtr(0x004E, 0x004F));
    // $81A4: LDA #$00; JMP $83CF
    this.sub83CF(0x00);
  }

  /** $81A9: cmd11 �?�?$0543-$0545 (LDY #$01 �?3 字节) */
  private sub81A9(): void {
    // $81A9: LDY #$01
    const ptr = this.rdPtr(0x004C, 0x004D);
    // $81AB: LDA ($004C),Y; STA $0542,Y; INY; CPY #$04; BNE $81AB
    for (let y = 1; y < 4; y++) {
      this.wr(0x0542 + y, this.readMemByte(ptr + y));
    }
    // $81B5: LDA #$04; JMP $83CF
    this.sub83CF(0x04);
  }

  // ════════════════════════════════════════════════
  // $84DC: 计时器更�?(code_sub.s)
  // ════════════════════════════════════════════════
  private sub84DC(): void {
    // $84DC: LDY #$11; LDA ($003C),Y (精灵组[$11] 计数�?
    const cnt = this.rdInd(0x003C, 0x11);
    if (cnt === 0) {
      this.sub84EF();
    } else if (cnt === 0xFF) {
      // $84E6: RTS (停止)
      return;
    } else {
      // $84E7: SEC; SBC #$01; STA ($003C),Y
      this.wrInd(0x003C, 0x11, (cnt - 1) & 0xFF);
      // $84EC: JMP $852A (更新精灵位置)
      this.sub852A();
    }
  }

  /** $84EF: 精灵组计数为 0 �?读数据初始化新精灵批 */
  private sub84EF(): void {
    // $84EF: STA $0040 (计数=0)
    this.wr(0x0040, 0);
    // $84F1: LDY #$01; LDA ($003C),Y; STA $003E; INY; LDA ($003C),Y; STA $003F (数据指针)
    this.wr(0x003E, this.rdInd(0x003C, 1));
    this.wr(0x003F, this.rdInd(0x003C, 2));
    // $84FC: LDY #$00; LDA ($003C),Y; AND #$10; BEQ $850F
    const ctrl = this.rdInd(0x003C, 0);
    if (ctrl & 0x10) {
      // $8504: LDA #$04; CLC; ADC $003E; STA $003E; BCC $850F; INC $003F
      let e = this.rd(0x003E) + 4;
      this.wr(0x003E, e & 0xFF);
      if (e > 0xFF) this.wr(0x003F, (this.rd(0x003F) + 1) & 0xFF);
    }
    // $850F: LDY #$00; LDA ($003C),Y; AND #$EF; STA ($003C),Y
    this.wrInd(0x003C, 0, ctrl & 0xEF);
    // $8517: JSR $857A (读数据命�?
    this.sub857A();
    // $851A: LDA $0040; LDY #$01; CLC; ADC $003E; STA ($003C),Y; INY; LDA $003F; ADC #$00; STA ($003C),Y
    const newOff = (this.rd(0x003E) + this.rd(0x0040)) & 0xFF;
    this.wrInd(0x003C, 1, newOff);
    const carry = (this.rd(0x003E) + this.rd(0x0040)) > 0xFF ? 1 : 0;
    this.wrInd(0x003C, 2, (this.rd(0x003F) + carry) & 0xFF);
    // $852A: 更新精灵位置
    this.sub852A();
  }

  /** $852A: 更新精灵位置 */
  private sub852A(): void {
    // $852C: LDA #$00; STA $0042; STA $0043
    this.wr(0x0042, 0);
    this.wr(0x0043, 0);
    // $8530: LDY #$00; LDA ($003C),Y; AND #$FC; STA $0041
    const ctrl = this.rdInd(0x003C, 0);
    this.wr(0x0041, ctrl & 0xFC);
    // $8538: LDA ($003C),Y; LSR; ROL $0042; LSR; ROL $0043
    let a = ctrl;
    let w42 = 0, w43 = 0;
    a >>= 1; if (a & 0x80) w42 = 1;
    a >>= 1; if (a & 0x80) w43 = 1;
    this.wr(0x0042, w42);
    this.wr(0x0043, w43);
    // $8540: LDX #$00; LDY #$05; JSR $85F2 (坐标累加)
    this.sub85F2(0, 5);
    // $8547: LDX #$01; LDY #$09; JSR $85F2
    this.sub85F2(1, 9);
    // $854E: LDA #$00; LSR $0043; ROL; LSR $0042; ROL; ORA $0041; LDY #$00; STA ($003C),Y
    let acc = 0;
    const b43 = this.rd(0x0043);
    acc = ((b43 & 1) << 7) & 0xFF;
    this.wr(0x0043, b43 >> 1);
    const b42 = this.rd(0x0042);
    acc = (acc >> 1) | ((b42 & 1) << 7);
    this.wr(0x0042, b42 >> 1);
    acc = (acc | this.rd(0x0041)) & 0xFF;
    this.wrInd(0x003C, 0, acc);
    // $855C: AND #$10; BEQ $8579 (bit4 未设 �?返回)
    if (acc & 0x10) {
      // $8560: LDY #$01; LDA ($003C),Y; STA $003E; INY; LDA ($003C),Y; STA $003F
      this.wr(0x003E, this.rdInd(0x003C, 1));
      this.wr(0x003F, this.rdInd(0x003C, 2));
      // $856B: LDX #$05; LDY #$01; JSR $860D
      this.sub860D(5, 1);
      // $8572: LDX #$09; LDY #$03; JSR $860D
      this.sub860D(9, 3);
    }
    // $8579: RTS
  }

  /** $857A: 读数据命�?(读数据字节并分派命令) */
  private sub857A(): void {
    // $857A: LDY $0040; INC $0040; LDA ($003E),Y
    const y = this.rd(0x0040);
    this.wr(0x0040, (y + 1) & 0xFF);
    const data = this.rdInd(0x003E, y);
    // $857E: JSR $C509 �?跳转�? $85A0/$85A9/$85D5/$85E1/$858D
    if (data < 0xF0) {
      // $85A0: LDY #$11; STA ($003C),Y (延迟�?
      this.wrInd(0x003C, 0x11, data);
      return;
    }
    const cmd = (data - 0xF0) & 0xFF;
    switch (cmd) {
      case 0: this.sub85A0(); break;
      case 1: this.sub85A9(); break;
      case 2: this.sub85D5(); break;
      case 3: this.sub85E1(); break;
      case 4: this.sub858D(); break;
      default: break;
    }
  }

  /** $858D: 命令 4 �?读新数据指针 */
  private sub858D(): void {
    // $858D: LDY $0040; LDA ($003E),Y; TAX; INY; LDA ($003E),Y; STA $003F; STX $003E; LDA #$00; STA $0040; JMP $857A
    const y = this.rd(0x0040);
    const lo = this.rdInd(0x003E, y);
    const hi = this.rdInd(0x003E, y + 1);
    this.wrPtr(0x003E, 0x003F, (hi << 8) | lo);
    this.wr(0x0040, 0);
    this.sub857A();
  }

  /** $85A0: 命令 0 �?停止精灵�?($003C,$11 = $FF) */
  private sub85A0(): void {
    // $85A0: LDY #$11; LDA #$FF; STA ($003C),Y; PLA; PLA; RTS
    this.wrInd(0x003C, 0x11, 0xFF);
    // 返回两层 (结束当前精灵批处�?
  }

  /** $85A9: 命令 1 �?设精灵组坐标/属�?(JSR $85E7; �?2 组坐�? */
  private sub85A9(): void {
    // $85A9: JSR $85E7 (�?$0040 数据�?$003C,$11)
    this.sub85E7();
    // $85AC: LDY $0040; LDA ($003E),Y; TAX; INY; LDA ($003E),Y; INY; STY $0040
    let y = this.rd(0x0040);
    const v1 = this.rdInd(0x003E, y);
    y++;
    const v2 = this.rdInd(0x003E, y);
    y++;
    this.wr(0x0040, y);
    // $85B7: LDY #$07; STA ($003C),Y; DEY; DEY; TXA; STA ($003C),Y (+5/+7)
    this.wrInd(0x003C, 7, v2);
    this.wrInd(0x003C, 5, v1);
    // $85C0: LDY $0040; LDA ($003E),Y; TAX; INY; LDA ($003E),Y; INY; STY $0040
    y = this.rd(0x0040);
    const v3 = this.rdInd(0x003E, y);
    y++;
    const v4 = this.rdInd(0x003E, y);
    y++;
    this.wr(0x0040, y);
    // $85CB: LDY #$0B; STA ($003C),Y; DEY; DEY; TXA; STA ($003C),Y (+9/+11)
    this.wrInd(0x003C, 0x0B, v4);
    this.wrInd(0x003C, 9, v3);
    // $85D4: RTS
  }

  /** $85D5: 命令 2 �?置精灵组 bit4 (JSR $85E7; LDY #$00; LDA ($003C),Y; ORA #$10; STA ($003C),Y) */
  private sub85D5(): void {
    // $85D5: JSR $85E7
    this.sub85E7();
    // $85D8: LDY #$00; LDA ($003C),Y; ORA #$10; STA ($003C),Y
    const ctrl = this.rdInd(0x003C, 0);
    this.wrInd(0x003C, 0, ctrl | 0x10);
    // $85E0: RTS
  }

  /** $85E1: 命令 3 �?停止并置 bit4 (JSR $85A9; JMP $85D8) */
  private sub85E1(): void {
    // $85E1: JSR $85A9
    this.sub85A9();
    // $85E4: JMP $85D8 (�?bit4)
    const ctrl = this.rdInd(0x003C, 0);
    this.wrInd(0x003C, 0, ctrl | 0x10);
  }

  /** $85E7: �?$0040 数据�?$003C,$11 (LDY $0040; LDA ($003E),Y; LDY #$11; STA ($003C),Y; INC $0040) */
  private sub85E7(): void {
    const y = this.rd(0x0040);
    const v = this.rdInd(0x003E, y);
    this.wrInd(0x003C, 0x11, v);
    this.wr(0x0040, (y + 1) & 0xFF);
  }

  /** $85F2: 坐标累加 (X = 高低字节索引, Y = 数据偏移) */
  private sub85F2(xIdx: number, yOff: number): void {
    // $85F2: CLC; LDA ($003C),Y; INY; ADC ($003C),Y; STA ($003C),Y (低位累加)
    const lo = this.rdInd(0x003C, yOff);
    const addLo = this.rdInd(0x003C, yOff + 1);
    const sumLo = lo + addLo;
    this.wrInd(0x003C, yOff + 1, sumLo & 0xFF);
    let carry = sumLo > 0xFF ? 1 : 0;
    // $85FA: INY; LDA ($003C),Y; BPL $8601; DEC $0042,X (高位符号 �?�?
    let hi = this.rdInd(0x003C, yOff + 2);
    if (hi & 0x80) {
      this.wr(0x0042 + xIdx, (this.rd(0x0042 + xIdx) - 1) & 0xFF);
    }
    // $8601: INY; ADC ($003C),Y; STA ($003C),Y (高位累加)
    const addHi = this.rdInd(0x003C, yOff + 3);
    const sumHi = hi + addHi + carry;
    this.wrInd(0x003C, yOff + 3, sumHi & 0xFF);
    carry = sumHi > 0xFF ? 1 : 0;
    // $8606: LDA $0042,X; ADC #$00; STA $0042,X
    this.wr(0x0042 + xIdx, (this.rd(0x0042 + xIdx) + carry) & 0xFF);
    // $860C: RTS
  }

  /** $860D: 坐标累加 (�?$003E 指针, X = 目标偏移, Y = 源偏�? */
  private sub860D(xOff: number, yOff: number): void {
    // $860D: LDA ($003E),Y; PHA; DEY; LDA ($003E),Y; PHA; TXA; TAY (�?2 字节�? Y = X)
    const hi = this.rdInd(0x003E, yOff);
    const lo = this.rdInd(0x003E, yOff - 1);
    // $8616: PLA; CLC; ADC ($003C),Y; STA ($003C),Y (X 低位累加)
    const sumLo = lo + this.rdInd(0x003C, xOff);
    this.wrInd(0x003C, xOff, sumLo & 0xFF);
    const carry = sumLo > 0xFF ? 1 : 0;
    // $861C: INY; INY; PLA; ADC ($003C),Y; STA ($003C),Y (X+2 高位累加)
    const sumHi = hi + this.rdInd(0x003C, xOff + 2) + carry;
    this.wrInd(0x003C, xOff + 2, sumHi & 0xFF);
    // $8623: RTS
  }

  // ════════════════════════════════════════════════
  // $83D9: 计分板更�?(code_sub.s)
  // ════════════════════════════════════════════════
  private sub83D9(): void {
    // $83D9: LDY #$10; LDA ($003C),Y
    const cnt = this.rdInd(0x003C, 0x10);
    if (cnt === 0) {
      this.sub83E9();
    } else if (cnt === 0xFF) {
      // $83E8: RTS (停止)
      return;
    } else {
      // $83E3: SEC; SBC #$01; STA ($003C),Y (递减计数)
      this.wrInd(0x003C, 0x10, (cnt - 1) & 0xFF);
    }
  }

  /** $83E9: 计分板计数为 0 �?读数�?*/
  private sub83E9(): void {
    // $83E9: LDY #$00; LDA ($003C),Y; AND #$9F; STA ($003C),Y
    const ctrl = this.rdInd(0x003C, 0);
    this.wrInd(0x003C, 0, ctrl & 0x9F);
    // $83F1: LDY #$13; LDA #$00; STA ($003C),Y; INY; STA ($003C),Y (+13/+14 = 0)
    this.wrInd(0x003C, 0x13, 0);
    this.wrInd(0x003C, 0x14, 0);
    // $83FA: LDY #$03; LDA ($003C),Y; STA $003E; INY; LDA ($003C),Y; STA $003F (数据指针)
    this.wr(0x003E, this.rdInd(0x003C, 3));
    this.wr(0x003F, this.rdInd(0x003C, 4));
    // $8405: LDY #$00; STY $0040
    this.wr(0x0040, 0);
    // $8409: 数据循环
    this.sub8409Loop();
  }

  /** $8409: 计分板数据循�?*/
  private sub8409Loop(): void {
    while (true) {
      // $8409: LDY $0040; INC $0040; LDA ($003E),Y
      const y = this.rd(0x0040);
      this.wr(0x0040, (y + 1) & 0xFF);
      const data = this.rdInd(0x003E, y);
      // $840F: CMP #$F0; BCC $8419 (< $F0 = 数据)
      if (data < 0xF0) {
        // $8419: TAX; INY; TYA; PHA; LDA ($003E),Y; LDY #$12; STA ($003C),Y
        const spriteData = this.rdInd(0x003E, y + 1);
        this.wrInd(0x003C, 0x12, spriteData);
        // $8423: TXA; LDY #$10; STA ($003C),Y
        this.wrInd(0x003C, 0x10, data);
        // $8428: PLA; LDY #$03; SEC; ADC $003E; STA ($003C),Y; INY; LDA #$00; ADC $003F; STA ($003C),Y
        const base = this.rd(0x003E) + y + 1;
        this.wrInd(0x003C, 3, base & 0xFF);
        this.wrInd(0x003C, 4, (this.rd(0x003F) + (base > 0xFF ? 1 : 0)) & 0xFF);
        // $8437: RTS
        return;
      }
      // $8413: JSR $8438 (命令分派); JMP $8409
      this.sub8438(data);
    }
  }

  /** $8438: 计分板命令分�?(SEC; SBC #$F0; JSR $C509; 跳转�?9 �? */
  private sub8438(data: number): void {
    // $8438: SEC; SBC #$F0
    const cmd = (data - 0xF0) & 0xFF;
    // $843B: JSR $C509 �?$8450/$8459/$845D/$8466/$8477/$8496/$84B3/$84C7/$84D2
    switch (cmd) {
      case 0: this.sub8450(); break;  // 停止
      case 1: this.sub8459(); break;  // �?bit5
      case 2: this.sub845D(); break;  // �?bit6
      case 3: this.sub8466(); break;  // 读新指针
      case 4: this.sub8477(); break;  // 保存回跳
      case 5: this.sub8496(); break;  // 循环/回跳
      case 6: this.sub84B3(); break;  // �?+13/+14
      case 7: this.sub84C7(); break;  // 停止 (JMP $8450)
      case 8: this.sub84D2(); break;  // �?$0040 数据 �?$0546
      default: break;
    }
  }

  /** $8450: 计分板命�?0 �?停止 (LDY #$10; LDA #$FF; STA ($003C),Y; PLA; PLA; RTS) */
  private sub8450(): void {
    this.wrInd(0x003C, 0x10, 0xFF);
    // 返回两层 (结束计分板处�?
  }

  /** $8459: 计分板命�?1 �?�?bit5 (LDA #$20; BNE $845F) */
  private sub8459(): void {
    this.sub845F(0x20);
  }

  /** $845D: 计分板命�?2 �?�?bit6 (LDA #$40) */
  private sub845D(): void {
    this.sub845F(0x40);
  }

  /** $845F: ORA ($003C),Y; STA ($003C),Y (LDY #$00) */
  private sub845F(mask: number): void {
    const ctrl = this.rdInd(0x003C, 0);
    this.wrInd(0x003C, 0, ctrl | mask);
  }

  /** $8466: 计分板命�?3 �?读新指针 (LDY $0040; LDA ($003E),Y; TAX; INY; LDA ($003E),Y; STA $003F; STX $003E; LDA #$00; STA $0040) */
  private sub8466(): void {
    const y = this.rd(0x0040);
    const lo = this.rdInd(0x003E, y);
    const hi = this.rdInd(0x003E, y + 1);
    this.wrPtr(0x003E, 0x003F, (hi << 8) | lo);
    this.wr(0x0040, 0);
  }

  /** $8477: 计分板命�?4 �?保存回跳指针 (LDY $0040; �?2 字节 �?$003C+13/+14) */
  private sub8477(): void {
    // $8477: LDY $0040; LDA ($003E),Y; PHA; INY; STY $0040; TYA; LDX $003F; CLC; ADC $003E; BCC $8488; INX
    let y = this.rd(0x0040);
    const hi = this.rdInd(0x003E, y);
    y++;
    this.wr(0x0040, y);
    const base = this.rd(0x003E) + y;
    let hiPtr = this.rd(0x003F);
    if (base > 0xFF) hiPtr = (hiPtr + 1) & 0xFF;
    // $8488: LDY #$0E; STA ($003C),Y; TXA; INY; STA ($003C),Y (保存回跳指针 +13/+14)
    this.wrInd(0x003C, 0x0E, base & 0xFF);
    this.wrInd(0x003C, 0x0F, hiPtr);
    // $8490: LDY #$0D; PLA; STA ($003C),Y (保存计数)
    this.wrInd(0x003C, 0x0D, hi);
    // $8495: RTS
  }

  /** $8496: 计分板命�?5 �?循环/回跳 */
  private sub8496(): void {
    // $8496: LDY #$0D; LDA ($003C),Y; SEC; SBC #$01; BNE $84A0; RTS (计数=0 �?返回)
    const cnt = (this.rdInd(0x003C, 0x0D) - 1) & 0xFF;
    if (cnt === 0) return;
    // $84A0: STA ($003C),Y
    this.wrInd(0x003C, 0x0D, cnt);
    // $84A2: LDY #$0E; LDA ($003C),Y; TAX; INY; LDA ($003C),Y; STA $003F; STX $003E; LDA #$00; STA $0040
    this.wr(0x003E, this.rdInd(0x003C, 0x0E));
    this.wr(0x003F, this.rdInd(0x003C, 0x0F));
    this.wr(0x0040, 0);
  }

  /** $84B3: 计分板命�?6 �?�?+13/+14 指针 (LDY $0040; �?2 字节 �?$003C+13/+14) */
  private sub84B3(): void {
    // $84B3: LDY $0040; LDA ($003E),Y; TAX; INY; LDA ($003E),Y; INY; STY $0040
    const y = this.rd(0x0040);
    const lo = this.rdInd(0x003E, y);
    const hi = this.rdInd(0x003E, y + 1);
    this.wr(0x0040, (y + 2) & 0xFF);
    // $84BE: LDY #$14; STA ($003C),Y; DEY; TXA; STA ($003C),Y (+13/+14)
    this.wrInd(0x003C, 0x14, hi);
    this.wrInd(0x003C, 0x13, lo);
  }

  /** $84C7: 计分板命�?7 �?停止 (LDY $0040; LDA ($003E),Y; LDY #$12; STA ($003C),Y; JMP $8450) */
  private sub84C7(): void {
    // $84C9: LDA ($003E),Y; LDY #$12; STA ($003C),Y
    const y = this.rd(0x0040);
    this.wrInd(0x003C, 0x12, this.rdInd(0x003E, y));
    // $84CF: JMP $8450 (停止)
    this.wrInd(0x003C, 0x10, 0xFF);
  }

  /** $84D2: 计分板命�?8 �?�?$0040 数据 �?$0546 */
  private sub84D2(): void {
    // $84D2: LDY $0040; INC $0040; LDA ($003E),Y; STA $0546
    const y = this.rd(0x0040);
    this.wr(0x0040, (y + 1) & 0xFF);
    this.wr(0x0546, this.rdInd(0x003E, y));
    // $84DB: RTS
  }

  // ════════════════════════════════════════════════
  // $8624: 精灵渲染 (code_data.s)
  // ════════════════════════════════════════════════
  private sub8624(): void {
    // $8624: LDA $062D; AND #$0F; CMP #$05; BNE $8630
    const mode = this.rd(0x062D) & 0x0F;
    if (mode === 5) {
      // $862D: JMP $8861 (特殊精灵显示)
      this.sub8861();
      return;
    }
    // $8630: JSR $8753 (渲染模式分派)
    this.sub8753();
    // $8633: LDA #$00; STA $0046
    this.wr(0x0046, 0);
    this.sub8637();
  }

  /** $8637: 精灵渲染主循�?*/
  private sub8637(): void {
    while (true) {
      // $8637: LDA $0046; BNE $863E (�?0 个精�?�?$86CF)
      const sp = this.rd(0x0046);
      if (sp === 0) {
        this.sub86CF();
        return;
      }
      // $863E: CMP #$0B; BNE $8645 (�?$0B �?�?$86CF)
      if (sp === 0x0B) {
        this.sub86CF();
        return;
      }
      // $8645: JSR $86DB (精灵数据查询); BCS $864D
      if (this.sub86DB(sp)) {
        // $864D: 渲染该精�?        this.sub864D();
      } else {
        // $864A: JMP $86CF
        this.sub86CF();
        return;
      }
      // 递增 $0046 并检查结�?      const n = (this.rd(0x0046) + 1) & 0xFF;
      this.wr(0x0046, n);
      if (n === 0x16) {
        // $86DA: RTS
        return;
      }
    }
  }

  /** $864D: 渲染单个精灵 (�?OAM) */
  private sub864D(): void {
    // $864D: LDX $003B (OAM 索引)
    const x = this.rd(0x003B);
    // $864F: LDY #$06; LDA ($0034),Y; CMP #$34; BCS $8659; LDA #$34 (X 下限)
    let sprX = this.rdInd(0x0034, 6);
    if (sprX < 0x34) sprX = 0x34;
    // $8659: CMP #$CC; BCC $865F; LDA #$CC (X 上限)
    if (sprX >= 0xCC) sprX = 0xCC;
    // $865F: PHA; LDA $062D; AND #$0F; TAY; PLA; CLC; ADC $88DA,Y; STA $0203,X
    const offIdx = this.rd(0x062D) & 0x0F;
    this.wr(0x0203 + x, (sprX + (TABLE_88DA[offIdx] ?? 0)) & 0xFF);
    // $866E: LDY #$08; LDA ($0034),Y; CMP #$54; BCS $8678; LDA #$54 (Y 下限)
    let sprY = this.rdInd(0x0034, 8);
    if (sprY < 0x54) sprY = 0x54;
    // $8678: CMP #$AC; BCC $867E; LDA #$AC (Y 上限)
    if (sprY >= 0xAC) sprY = 0xAC;
    // $867E: PHA; LDA $062D; AND #$0F; TAY; PLA; CLC; ADC $88DF,Y; STA $0200,X
    this.wr(0x0200 + x, (sprY + (TABLE_88DF[offIdx] ?? 0)) & 0xFF);
    // $868D: LDA #$03; STA $0202,X (属�?
    this.wr(0x0202 + x, 0x03);
    // $8692: BIT $0615; BPL $86A8
    let tile: number;
    const sp = this.rd(0x0046);
    if ((this.rd(0x0615) & 0x80) !== 0 && this.rd(0x05FB) !== 0 && sp < 0x0B) {
      // $86A2: JSR $86F2 (特殊精灵)
      tile = this.sub86F2(sp);
    } else {
      // $86A8: LDA $0046; CMP $0441; BNE $86B5
      if (sp === this.rd(0x0441)) {
        // $86AF: JSR $881D (当前控制精灵)
        this.sub881D();
        // $86B2: JMP $86C4
        this.wr(0x0201 + x, this.rd(0x0201 + x));
        this.finishSprite(x);
        return;
      }
      // $86B5: CMP #$0B; BCC $86BB; SBC #$01
      tile = sp;
      if (tile >= 0x0B) tile = (tile - 1) & 0xFF;
      // $86BB: CLC; ADC #$11; CMP #$20; BCC $86C4; ADC #$0F (tile 换算)
      tile = (tile + 0x11) & 0xFF;
      if (tile >= 0x20) tile = (tile + 0x0F) & 0xFF;
      // $86C4: STA $0201,X
      this.wr(0x0201 + x, tile);
      this.finishSprite(x);
    }
  }

  /** $86CF: 结束一个精灵的渲染 (INC $0046; 检�?$16) */
  private sub86CF(): void {
    const n = (this.rd(0x0046) + 1) & 0xFF;
    this.wr(0x0046, n);
    if (n === 0x16) {
      // $86DA: RTS
      return;
    }
    // $86D7: JMP $8637
    this.sub8637();
  }

  /** 完成精灵写入 (INX×4; STX $003B; INC $0048) */
  private finishSprite(x: number): void {
    this.wr(0x003B, (x + 4) & 0xFF);
    this.wr(0x0048, (this.rd(0x0048) + 1) & 0xFF);
  }

  /** $86DB: 精灵数据查询 (JSR $C50C; 渲染模式分派; 返回 carry = 是否渲染) */
  private sub86DB(sp: number): boolean {
    // $86DB: JSR $C50C (比赛阶段→玩家数据指�?
    this._system.subC50C();
    // $86DE: LDA $062D; AND #$0F; JSR $C509 �?跳转�?    const mode = this.rd(0x062D) & 0x0F;
    switch (mode & 0x07) {
      case 0:
      case 1:
      case 4: return this.sub871D(sp);       // $871D
      case 2: return this.sub871F(sp);       // $871F
      case 3: return this.sub873B(sp);       // $873B
      default: return false;
    }
  }

  /** $871D: 渲染模式 0/1/4 �?返回 SEC (渲染) */
  private sub871D(sp: number): boolean {
    void sp;
    // $871D: SEC; RTS
    return true;
  }

  /** $871F: 渲染模式 2 �?玩家筛�?*/
  private sub871F(sp: number): boolean {
    // $871F: LDA $0046; CMP #$0B; BCS $8739
    if (sp >= 0x0B) return false; // SEC
    // $8725: CMP $0441; BEQ $8739
    if (sp === this.rd(0x0441)) return false;
    // $872A: LDX $0430; BEQ $8737 (无列�?�?CLC)
    let x = this.rd(0x0430);
    if (x === 0) return true; // CLC
    // $872F: CMP $0430,X; BEQ $8739; DEX; BNE $872F
    while (x !== 0) {
      if (sp === this.rd(0x0430 + x)) return false;
      x = (x - 1) & 0xFF;
    }
    // $8737: CLC
    return true;
  }

  /** $873B: 渲染模式 3 �?玩家筛�?(�?$0600 列表) */
  private sub873B(sp: number): boolean {
    // $873B: LDA $0046; CMP $0441; BEQ $8751
    if (sp === this.rd(0x0441)) return true; // CLC
    // $8742: LDX $0600; BEQ $874F
    let x = this.rd(0x0600);
    if (x === 0) return false; // SEC
    // $8747: CMP $0600,X; BEQ $8751; DEX; BNE $8747
    while (x !== 0) {
      if (sp === this.rd(0x0600 + x)) return true;
      x = (x - 1) & 0xFF;
    }
    // $874F: SEC
    return false;
  }

  /** $8753: 渲染模式分派 (LDA $062D; AND #$0F; JSR $C509) */
  private sub8753(): void {
    const mode = this.rd(0x062D) & 0x0F;
    switch (mode & 0x07) {
      case 0:
      case 4: break;                       // $8767: RTS (�?
      case 1: this.sub8768(); break;       // 读取坐标
      case 2: this.sub8771(); break;
      case 3: this.sub8784(); break;       // 坐标计算
      default: break;
    }
  }

  /** $8768: LDA $0624; JSR $C536; JMP $87E7 */
  private sub8768(): void {
    // $876B: JSR $C536 (精灵坐标换算); JMP $87E7
    this.subC536();
    this.sub87E7();
  }

  /** $8771: LDA $05FC; JSR $C50C; 读取坐标 �?设置精灵 */
  private sub8771(): void {
    // $8774: JSR $C50C
    this._system.subC50C();
    // $8777: LDY #$06; LDA ($0034),Y; TAX; LDY #$08; LDA ($0034),Y; TAY; JMP $87E7
    const sx = this.rdInd(0x0034, 6);
    const sy = this.rdInd(0x0034, 8);
    this.sub87E7(sx, sy);
  }

  /** $8784: LDA $0624; JSR $87A7; PHA; LDA $0624; JSR $87C7; PLA; TAX; JMP $87E7 */
  private sub8784(): void {
    const ax = this.sub87A7(this.rd(0x0624));
    const ay = this.sub87C7(this.rd(0x0624));
    this.sub87E7(ax, ay);
  }

  /** $87A7: 坐标计算循环 (X �? */
  private sub87A7(len: number): number {
    // $87A7: STA $003E (循环计数)
    this.wr(0x003E, len);
    // $87A9: LDA $062C; JSR $C545; STX $003C; STY $003D (读取坐标�?
    const base = this.subC545(this.rd(0x062C));
    this.wr(0x003C, base & 0xFF);
    this.wr(0x003D, (base >> 8) & 0xFF);
    // $87B3: LDX $0639; LDY $0635 (起始坐标)
    let x = this.rd(0x0639);
    let y = this.rd(0x0635);
    let carry = 0;
    let e = len;
    do {
      // $87B9: CLC; TXA; ADC $003C; TAX; TYA; ADC $003D; TAY
      const sumX = x + this.rd(0x003C) + carry;
      x = sumX & 0xFF;
      carry = sumX > 0xFF ? 1 : 0;
      const sumY = y + this.rd(0x003D) + carry;
      y = sumY & 0xFF;
      carry = sumY > 0xFF ? 1 : 0;
      // $87C2: DEC $003E; BPL $87B9
      e = (e - 1) & 0xFF;
    } while ((e & 0x80) === 0);
    return y;
  }

  /** $87C7: 坐标计算循环 (Y �? */
  private sub87C7(len: number): number {
    this.wr(0x003E, len);
    const base = this.subC542(this.rd(0x062C));
    this.wr(0x003C, base & 0xFF);
    this.wr(0x003D, (base >> 8) & 0xFF);
    let x = this.rd(0x063B);
    let y = this.rd(0x0637);
    let carry = 0;
    let e = len;
    do {
      const sumX = x + this.rd(0x003C) + carry;
      x = sumX & 0xFF;
      carry = sumX > 0xFF ? 1 : 0;
      const sumY = y + this.rd(0x003D) + carry;
      y = sumY & 0xFF;
      carry = sumY > 0xFF ? 1 : 0;
      e = (e - 1) & 0xFF;
    } while ((e & 0x80) === 0);
    return y;
  }

  /** $87E7: 设置精灵 (TXA; CLC; ADC #$FD; ...) */
  private sub87E7(xIn?: number, yIn?: number): void {
    // $87E7: TXA (�?X); CLC; ADC #$FD; LDX $003B; STA $0203,X
    const sx = (xIn ?? 0) + 0xFD & 0xFF;
    const xo = this.rd(0x003B);
    this.wr(0x0203 + xo, sx);
    // $87F0: TYA; CLC; ADC #$C7; STA $0200,X
    const sy = (yIn ?? 0) + 0xC7 & 0xFF;
    this.wr(0x0200 + xo, sy);
    // $87F7: LDA #$3C; LDY $062D; CPY #$83; PHP; LDY #$01; PLP; BNE $8808
    let tile = 0x3C;
    let attr = 1;
    if (this.rd(0x062D) === 0x83) {
      // $8804: LDY #$03; LDA #$11
      tile = 0x11;
      attr = 3;
    }
    // $8808: STA $0201,X; TYA; STA $0202,X
    this.wr(0x0201 + xo, tile);
    this.wr(0x0202 + xo, attr);
    // $880F: INX ×4; STX $003B; INC $0048; LDA #$01; STA $0532
    this.wr(0x003B, (xo + 4) & 0xFF);
    this.wr(0x0048, (this.rd(0x0048) + 1) & 0xFF);
    this.wr(0x0532, 0x01);
    // $881C: RTS
  }

  /** $881D: 当前控制精灵渲染 */
  private sub881D(): void {
    // $881D: LDY $0640; BNE $8834 (帧计�?
    const x = this.rd(0x003B);
    let f: number;
    if (this.rd(0x0640) === 0) {
      // $8822: LDY $0641; INY; CPY #$03; BNE $882C; LDY #$00; STY $0641
      f = (this.rd(0x0641) + 1) & 0xFF;
      if (f >= 3) f = 0;
      this.wr(0x0641, f);
      // $882F: LDA #$04; STA $0640
      this.wr(0x0640, 0x04);
    } else {
      f = this.rd(0x0641);
    }
    // $8834: LDA #$00; LDY $05FB; PHP; LDY $0641; PLP; BNE $8847; TYA; CLC; ADC #$03; TAY; LDA #$80
    let y: number;
    let mask = 0x80;
    if (this.rd(0x05FB) === 0) {
      y = (f + 3) & 0xFF;
      mask = 0x80;
    } else {
      y = f;
      mask = 0x80;
    }
    // $8847: BIT $0637; BMI $884E; EOR #$80
    if ((this.rd(0x0637) & 0x80) === 0) {
      mask = (mask ^ 0x80) & 0xFF;
    }
    // $884E: ORA $0202,X; STA $0202,X (合并属�?
    this.wr(0x0202 + x, (this.rd(0x0202 + x) | mask) & 0xFF);
    // $8854: LDA $885B,Y; DEC $0640; RTS (�?tile)
    this.wr(0x0201 + x, TABLE_885B[y & 0x0F] ?? 0);
    this.wr(0x0640, (this.rd(0x0640) - 1) & 0xFF);
  }

  /**
   * $86F2: 特殊精灵 tile 计算 (sp < 0x0B 时调�?
   * TODO: 真实实现 �?asm bank22 $86F2, �?$0201/$0202 数据返回特殊 tile
   */
  private sub86F2(sp: number): number {
    void sp;
    return 0;
  }

  /** $8861: 特殊精灵显示 (LDA $002C; ...) */
  private sub8861(): void {
    // $8861: LDA $002C; ASL; STA $0046; ASL; ASL; ADC $0046; TAX (X = A*10)
    const a2c = this.rd(0x002C);
    const xBase = ((a2c << 3) & 0xFF) + ((a2c << 1) & 0xFF); // A*10
    // $886C: LDA #$00; STA $0046
    let i = 0;
    this.wr(0x0046, 0);
    // $8870: LDY $0046; LDA $88D0,Y; LDY $003B; STA $0201,Y
    const y = this.rd(0x003B);
    while (true) {
      // $8872: LDA $88D0,Y (tile)
      const tile = TABLE_88D0[i & 0x0F] ?? 0;
      this.wr(0x0201 + y, tile);
      // $887A: LDA $88A8,X; PHA; AND #$F0; LSR; CLC; ADC #$A0; STA $0203,Y
      const rec = TABLE_88A8[(xBase + i) & 0x3F] ?? 0;
      const xOff = ((rec & 0xF0) >> 1) + 0xA0;
      this.wr(0x0203 + y, xOff & 0xFF);
      // $8888: PLA; AND #$0F; ASL; ASL; ADC #$A2; STA $0200,Y
      const yOff = ((rec & 0x0F) << 2) + 0xA2;
      this.wr(0x0200 + y, yOff & 0xFF);
      // $8891: LDA #$00; STA $0202,Y
      this.wr(0x0202 + y, 0x00);
      // $8896: INX; INY ×4; STY $003B; INC $0048; INC $0046; CMP #$0A; BNE $8870
      i++;
      const ny = (y + 4) & 0xFF;
      this.wr(0x003B, ny);
      this.wr(0x0048, (this.rd(0x0048) + 1) & 0xFF);
      this.wr(0x0046, i);
      if (i >= 0x0A) break;
      // y 更新到新 OAM 位置
      const y2 = this.rd(0x003B);
      // (循环�?tile 查表�?i, �?$8870 �?$0046 索引 $88D0, 需同步)
      this.wr(0x0046, i);
    }
    // $88A7: RTS
  }

  // ════════════════════════════════════════════════
  // $8796: 其他辅助 (�?$0635/$0637 坐标偏移)
  // ════════════════════════════════════════════════
  private sub8796(): void {
    // $8796: LDA #$10; JSR $87A7; STA $0635
    this.wr(0x0635, this.sub87A7(0x10));
    // $879E: LDA #$10; JSR $87C7; STA $0637
    this.wr(0x0637, this.sub87C7(0x10));
    // $87A6: RTS
  }

  // ════════════════════════════════════════════════
  // bank30 $C536/$C542/$C545 转发 (坐标换算辅助)
  // ════════════════════════════════════════════════

  /** $C545: 读坐�?�?返回 (baseLo | baseHi<<8) */
  private subC545(a: number): number {
    return this._system.subC524(a);
  }

  /** $C542: 读坐�?�?返回 */
  private subC542(a: number): number {
    return this._system.subC524(a);
  }

  /** $C536: 精灵坐标换算 (转发) */
  private subC536(): void {
    // H5 �? 坐标换算由帧合成器处�? no-op
  }

  // ════════════════════════════════════════════════
  // 间接读写辅助
  // ════════════════════════════════════════════════
  protected wrInd(ptrLo: number, offset: number, val: number): void {
    const addr = (this.rdPtr(ptrLo, ptrLo + 1) + offset) & 0xFFFF;
    this.wr(addr, val);
  }
  protected rdInd(ptrLo: number, offset: number): number {
    const addr = (this.rdPtr(ptrLo, ptrLo + 1) + offset) & 0xFFFF;
    return this.rd(addr);
  }

  // ════════════════════════════════════════════════
  // 内存读取辅助 (RAM �?ROM �?
  // ════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    return this.readRomByte(addr);
  }

  /** �?bank20 ROM 数据字节 (通过 DataStore KV 'bank20_rom'; 未注册时回退�? */
  private readRomByte(addr: number): number {
    const rom = this._store.get<Uint8Array | readonly number[]>('bank20_rom');
    if (rom) {
      const off = (addr - 0x8000) & 0xFFFF;
      if (off >= 0 && off < rom.length) return rom[off];
      return 0;
    }
    // 未注�?bank20_rom �? 从本模块表回退
    return this.readTableFallback(addr);
  }

  /** 未注�?ROM �? �?bank20-tables 结构化表回退 */
  private readTableFallback(addr: number): number {
    switch (addr) {
      case 0x8264: case 0x8265: case 0x8266: case 0x8267: case 0x8268: case 0x8269:
        return TABLE_8264[addr - 0x8264] ?? 0;
      case 0x82F6: case 0x82F7: case 0x82F8: case 0x82F9: case 0x82FA: case 0x82FB:
      case 0x82FC: case 0x82FD: case 0x82FE: case 0x82FF: case 0x8300: case 0x8301:
      case 0x8302: case 0x8303: case 0x8304: case 0x8305: case 0x8306: case 0x8307:
      case 0x8308: case 0x8309: case 0x830A: case 0x830B: case 0x830C: case 0x830D:
      case 0x830E: case 0x830F: case 0x8310: case 0x8311: case 0x8312: case 0x8313:
      case 0x8314: case 0x8315:
        return TABLE_82F6[addr - 0x82F6] ?? 0;
      case 0x83A6: case 0x83A7: case 0x83A8: case 0x83A9: case 0x83AA: case 0x83AB:
      case 0x83AC: case 0x83AD:
        return TABLE_83A6[addr - 0x83A6] ?? 0;
      case 0x885B: case 0x885C: case 0x885D: case 0x885E: case 0x885F: case 0x8860:
        return TABLE_885B[addr - 0x885B] ?? 0;
      case 0x88A8: case 0x88A9: case 0x88AA: case 0x88AB: case 0x88AC: case 0x88AD:
      case 0x88AE: case 0x88AF: case 0x88B0: case 0x88B1: case 0x88B2: case 0x88B3:
      case 0x88B4: case 0x88B5: case 0x88B6: case 0x88B7: case 0x88B8: case 0x88B9:
      case 0x88BA: case 0x88BB: case 0x88BC: case 0x88BD: case 0x88BE: case 0x88BF:
      case 0x88C0: case 0x88C1: case 0x88C2: case 0x88C3: case 0x88C4: case 0x88C5:
      case 0x88C6: case 0x88C7: case 0x88C8: case 0x88C9: case 0x88CA: case 0x88CB:
      case 0x88CC: case 0x88CD: case 0x88CE: case 0x88CF:
        return TABLE_88A8[addr - 0x88A8] ?? 0;
      case 0x88D0: case 0x88D1: case 0x88D2: case 0x88D3: case 0x88D4: case 0x88D5:
      case 0x88D6: case 0x88D7: case 0x88D8: case 0x88D9:
        return TABLE_88D0[addr - 0x88D0] ?? 0;
      case 0x88DA: case 0x88DB: case 0x88DC: case 0x88DD: case 0x88DE:
        return TABLE_88DA[addr - 0x88DA] ?? 0;
      case 0x88DF: case 0x88E0: case 0x88E1: case 0x88E2: case 0x88E3:
        return TABLE_88DF[addr - 0x88DF] ?? 0;
      case 0x88E4: case 0x88E5: case 0x88E6: case 0x88E7: case 0x88E8: case 0x88E9:
      case 0x88EA: case 0x88EB: case 0x88EC: case 0x88ED: case 0x88EE: case 0x88EF:
        return TABLE_88E4[addr - 0x88E4] ?? 0;
      case 0x88F0: case 0x88F1: case 0x88F2: case 0x88F3: case 0x88F4: case 0x88F5:
      case 0x88F6: case 0x88F7: case 0x88F8: case 0x88F9: case 0x88FA: case 0x88FB:
      case 0x88FC: case 0x88FD: case 0x88FE: case 0x88FF:
        return TABLE_88F0[addr - 0x88F0] ?? 0;
      case 0x8968: case 0x8969: case 0x896A: case 0x896B: case 0x896C: case 0x896D:
      case 0x896E: case 0x896F: case 0x8970: case 0x8971: case 0x8972: case 0x8973:
      case 0x8974: case 0x8975: case 0x8976: case 0x8977: case 0x8978: case 0x8979:
      case 0x897A: case 0x897B: case 0x897C: case 0x897D: case 0x897E: case 0x897F:
      case 0x8980: case 0x8981: case 0x8982: case 0x8983: case 0x8984: case 0x8985:
      case 0x8986: case 0x8987:
        return TABLE_TIMER_PTR_8968[addr - 0x8968] ?? 0;
      default:
        return 0;
    }
  }
}

export default MatchAuxService;
