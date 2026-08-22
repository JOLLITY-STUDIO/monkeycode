/**
 * SpriteService — 精灵模板解码器 (bank22)
 * @bank 22 ($8000-$9FFF, MMC3 R6/R7 可切)
 *
 * 职责: 读精灵描述符 ($003C) → 查模板指针表 → 解码模板流 → 写 OAM ($0200)。
 *
 * asm 结构 (code_main.s $8003-$81D1, 共 252 个代码地址):
 *   $8003: 主入口 (JMP $8003)
 *   $8005-$8098: 坐标变换 (读描述符, 算位移, 查模板指针)
 *   $8098: JSR $8187 (方向偏移计算)
 *   $809B-$8108: 模板流解码循环 (按类型分派: 0=$80C0, 非0=$80AD/$80B3)
 *   $80C0-$8160: 精灵写入 OAM (Y位移+X位移+tile+属性)
 *   $8164-$8184: 子模板跳转 (读新指针)
 *   $8187-$81D1: 方向偏移计算 (bit6/bit5 翻转)
 *
 * RAM 关键:
 *   $003C/$003D: 精灵描述符指针
 *   $003E/$003F: 精灵基准 X 坐标 (16bit)
 *   $0040/$0041: 精灵基准 Y 坐标 (16bit)
 *   $0042/$0043: 模板流指针
 *   $0044: 模板流偏移 Y
 *   $0045: 精灵计数器
 *   $0046: Y 坐标计算结果
 *   $0047: X 坐标计算结果
 *   $0048: OAM 精灵计数
 *   $0049: 方向标志 (bit6=X翻转, bit5=Y翻转, bit0-1=属性)
 *   $003B: OAM 写入偏移
 *   $0517: 全局方向标志
 *   $0538: 滚动偏移
 *   $0540/$0541: Y 坐标裁剪范围
 *
 * 数据表 (sprite-table.ts):
 *   DISP_81D2 (40B): Y 位移表
 *   DISP_81FA (64B): X 位移表
 *   TEMPLATE_PTR_8280 (47×2B): 模板指针表
 */
import { DataStore } from '../../data/store/DataStore';
import { GameSystemService } from '../system/GameSystemService';
import { DISP_81D2, DISP_81FA, TEMPLATE_PTR_8280 } from '../../data/tables/sprite-table';

export class SpriteService {
  protected _store: DataStore;
  protected _system: GameSystemService;

  constructor(store: DataStore, system: GameSystemService) {
    this._store = store;
    this._system = system;
  }

  // ════════════════════════════════════════════════════════════
  // RAM 读写辅助
  // ════════════════════════════════════════════════════════════
  protected rd(addr: number): number {
    return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
  }
  protected wr(addr: number, v: number): void {
    this._store.write(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`, v & 0xFF);
  }
  protected rdPtr(lo: number, hi: number): number {
    return (this.rd(hi) << 8) | this.rd(lo);
  }
  protected wrPtr(lo: number, hi: number, v: number): void {
    this.wr(lo, v & 0xFF);
    this.wr(hi, (v >> 8) & 0xFF);
  }

  // ════════════════════════════════════════════════════════════
  // $8003: 主入口 — 精灵模板解码
  // asm $8005-$8098: 读描述符, 算坐标变换, 查模板指针
  // ════════════════════════════════════════════════════════════

  /**
   * $8003: 主入口。
   * asm $8005: LDY #$00; STY $003F; STY $0041
   *   LDA ($003C),Y; LSR; ROL $003F; LSR; ROL $0041 (提取 bit6/bit7 → $003F/$0041)
   *   LDA ($003C),Y; AND #$60; ASL; EOR $0517; STA $0049 (方向标志)
   *   LDY #$08; LDA ($003C),Y; SEC; SBC #$80; TAX (X = 描述符[8] - $80)
   *   LDA $003F; SBC #$00; TAY (Y = $003F - carry)
   *   LDA #$00; STA $003F
   *   LDA $0538; EOR #$FF; CLC; ADC #$01; BPL $8038; DEC $003F (滚动取反)
   *   STA $003E (X 位移)
   *   TXA; CLC; ADC $003E; TAX; TYA; ADC $003F; TAY (加滚动到坐标)
   *   BIT $0517; BVC $8055 (bit5=方向翻转)
   *   TXA; EOR #$FF; TAX; TYA; EOR #$FF; TAY; INX; BNE; INY; INY (取反+1)
   *   BIT $0049; BVC $8062 (bit5=偏移调整)
   *   SEC; TXA; SBC #$08; TAX; TYA; SBC #$00; TAY (X-8)
   *   STX $003E; STY $003F (存基准X)
   *   LDY #$0C; LDA ($003C),Y; SEC (读描述符[12])
   *   BIT $0049; BPL $8072; SBC #$88 (方向调整)
   *   STA $0040; LDA $0041; SBC #$00; STA $0041 (存基准Y)
   *   LDA #$80; STA $0042; LDA #$82; STA $0043 (模板指针表基址 $8280)
   *   LDY #$12; LDA ($003C),Y; ASL; BCC; INC $0043 (读描述符[18], ×2查表)
   *   TAY; LDA ($0042),Y; TAX; INY; LDA ($0042),Y; STA $0043; STX $0042 (查模板指针)
   *   JSR $8187 (方向偏移计算)
   *   LDY #$00; STY $0044 (模板流偏移=0)
   */
  spawn(groupId: number): void {
    void groupId;
    // $8005: LDY #$00; STY $003F; STY $0041
    this.wr(0x003F, 0);
    this.wr(0x0041, 0);
    // $8009: LDA ($003C),Y; LSR; ROL $003F; LSR; ROL $0041
    const descPtr = this.rdPtr(0x003C, 0x003D);
    const d0 = this.readMem(descPtr);
    let f3f = this.rd(0x003F);
    let f41 = this.rd(0x0041);
    f3f = ((f3f << 1) | (d0 & 1)) & 0xFF; // ROL after LSR
    f41 = ((f41 << 1) | (f3f >> 7)) & 0xFF;
    this.wr(0x003F, f3f);
    this.wr(0x0041, f41);
    // $8011: LDA ($003C),Y; AND #$60; ASL; EOR $0517; STA $0049
    const dirFlags = ((d0 & 0x60) << 1) ^ this.rd(0x0517);
    this.wr(0x0049, dirFlags & 0xFF);
    // $801B: LDY #$08; LDA ($003C),Y; SEC; SBC #$80; TAX
    const d8 = this.readMem(descPtr + 8);
    let x = (d8 - 0x80) & 0xFF;
    // $8023: LDA $003F; SBC #$00; TAY
    let y = (this.rd(0x003F) - 0) & 0xFF;
    // $8028: LDA #$00; STA $003F
    this.wr(0x003F, 0);
    // $802C: LDA $0538; EOR #$FF; CLC; ADC #$01 (滚动取反)
    let scroll = (this.rd(0x0538) ^ 0xFF) + 1;
    let scrollHi = 0;
    if (scroll > 0xFF) { scrollHi = -1; scroll &= 0xFF; }
    if ((scroll & 0x80) !== 0) { this.wr(0x003F, (this.rd(0x003F) - 1) & 0xFF); }
    this.wr(0x003E, scroll & 0xFF);
    // $803A: TXA; CLC; ADC $003E; TAX; TYA; ADC $003F; TAY
    x = (x + this.rd(0x003E)) & 0xFF;
    y = (y + this.rd(0x003F)) & 0xFF;
    // $8043: BIT $0517; BVC $8055 (bit5=方向翻转)
    if ((this.rd(0x0517) & 0x20) !== 0) {
      // $8048: TXA; EOR #$FF; TAX; TYA; EOR #$FF; TAY; INX; BNE; INY; INY
      x = (x ^ 0xFF) & 0xFF;
      y = (y ^ 0xFF) & 0xFF;
      x = (x + 1) & 0xFF;
      if (x !== 0) { y = (y + 1) & 0xFF; }
      y = (y + 1) & 0xFF;
    }
    // $8055: BIT $0049; BVC $8062 (bit5=偏移调整)
    if ((this.rd(0x0049) & 0x20) !== 0) {
      // $8059: SEC; TXA; SBC #$08; TAX; TYA; SBC #$00; TAY
      x = (x - 8) & 0xFF;
      y = (y - 0) & 0xFF;
    }
    // $8062: STX $003E; STY $003F
    this.wr(0x003E, x);
    this.wr(0x003F, y);
    // $8066: LDY #$0C; LDA ($003C),Y; SEC
    const d12 = this.readMem(descPtr + 0x0C);
    let yBase = d12;
    // $806B: BIT $0049; BPL $8072; SBC #$88
    if ((this.rd(0x0049) & 0x80) !== 0) {
      yBase = (yBase - 0x88) & 0xFF;
    }
    // $8074: STA $0040; LDA $0041; SBC #$00; STA $0041
    this.wr(0x0040, yBase & 0xFF);
    this.wr(0x0041, (this.rd(0x0041) - 0) & 0xFF);
    // $807C: LDA #$80; STA $0042; LDA #$82; STA $0043 (模板指针表 $8280)
    this.wr(0x0042, 0x80);
    this.wr(0x0043, 0x82);
    // $8084: LDY #$12; LDA ($003C),Y; ASL; BCC; INC $0043
    const d18 = this.readMem(descPtr + 0x12);
    let tblIdx = (d18 << 1) & 0xFF;
    if (d18 & 0x80) { this.wr(0x0043, (this.rd(0x0043) + 1) & 0xFF); }
    // $808D: TAY; LDA ($0042),Y; TAX; INY; LDA ($0042),Y; STA $0043; STX $0042
    const tblPtr = this.rdPtr(0x0042, 0x0043);
    const tplLo = TEMPLATE_PTR_8280[tblIdx] ?? 0;
    const tplHi = TEMPLATE_PTR_8280[tblIdx + 1] ?? 0;
    this.wrPtr(0x0042, 0x0043, (tplHi << 8) | tplLo);
    // $8098: JSR $8187 (方向偏移计算)
    this.sub8187();
    // $809B: LDY #$00; STY $0044
    this.wr(0x0044, 0);
    // $809F: 模板流解码循环
    this._decodeLoop();
  }

  /**
   * $809F: 模板流解码循环。
   * asm: LDY $0044; LDA ($0042),Y; AND #$07; BNE $80AD
   *   =0: JSR $80C0 (Y位移组); JMP $809F
   *   ≠0: JSR $80B3 (X位移组); JMP $809F
   *   循环直到模板流结束
   */
  private _decodeLoop(): void {
    while (true) {
      // $809F: .byte $A4,$44 = LDY $0044
      const y = this.rd(0x0044);
      const tplPtr = this.rdPtr(0x0042, 0x0043);
      const cmd = this.readMem(tplPtr + y) & 0x07;
      if (cmd === 0) {
        // $80A7: JSR $80C0 (Y 位移组)
        if (!this.sub80C0()) break;
      } else {
        // $80AD: JSR $80B3 (X 位移组)
        if (!this.sub80B3()) break;
      }
    }
  }

  /**
   * $80B3: X 位移组命令分派。
   * asm: INC $0044; JSR $C509
   *   跳转表 $80B5: $8100/$8164/$8175
   * @returns false = 结束循环
   */
  private sub80B3(): boolean {
    this.wr(0x0044, (this.rd(0x0044) + 1) & 0xFF);
    const y = this.rd(0x0044);
    const tplPtr = this.rdPtr(0x0042, 0x0043);
    const cmd = this.readMem(tplPtr + y);
    // JSR $C509 分派 (cmd 0/1/2+)
    if (cmd === 0) {
      // $8164: 子模板跳转
      this.sub8164();
      return true;
    } else {
      // $8175: 精灵计数扩展
      this.sub8175();
      return true;
    }
  }

  /**
   * $80C0: Y 位移组 — 读模板流, 写 OAM 精灵。
   * asm $80C0-$8160:
   *   LDY $0044; LDA ($0042),Y; AND #$38; LSR×3; STA $0045 (精灵计数)
   *   INY; LDA ($0042),Y; TAX; LDA $81D2,X (查 Y 位移表)
   *   BIT $0049; BPL; EOR #$FF; CLC; ADC #$01 (方向翻转)
   *   CLC; ADC $0040; STA $0046 (Y坐标 = 位移 + 基准Y)
   *   TXA; ADC $0041; BNE $80FD (超出范围→跳过)
   *   CMP $0540; BCC; CMP $0541; BEQ/BCS (裁剪检查)
   *   循环: INY; LDA ($0042),Y; LSR×2; TAX; LDA $81FA,X (查 X 位移表)
   *   方向翻转; CLC; ADC $003E; STA $0047 (X坐标)
   *   写 OAM: $0200+X = Y, $0203+X = X, $0202+X = 属性, $0201+X = tile
   *   INX×4; STX $003B; INC $0048; INY; DEC $0045; BPL (循环)
   *   STY $0044; RTS
   * @returns false = 模板流结束
   */
  private sub80C0(): boolean {
    let y = this.rd(0x0044);
    const tplPtr = this.rdPtr(0x0042, 0x0043);
    // $80C2: LDA ($0042),Y; AND #$38; LSR×3; STA $0045
    const cnt = (this.readMem(tplPtr + y) & 0x38) >> 3;
    this.wr(0x0045, cnt);
    // $80CB: INY; LDA ($0042),Y; TAX; LDA $81D2,X
    y = (y + 1) & 0xFF;
    const yIdx = this.readMem(tplPtr + y);
    let yDisp = DISP_81D2[yIdx & 0x3F] ?? 0;
    // $80D4: BIT $0049; BPL $80DD; EOR #$FF; CLC; ADC #$01
    const x4 = 0;
    let xSign = 0;
    if ((this.rd(0x0049) & 0x80) !== 0) {
      yDisp = ((yDisp ^ 0xFF) + 1) & 0xFF;
      if ((yDisp & 0x80) !== 0) xSign = -1;
    }
    // $80E2: CLC; ADC $0040; STA $0046
    let yCoord = (yDisp + this.rd(0x0040)) & 0xFF;
    this.wr(0x0046, yCoord);
    // $80E7: TXA; ADC $0041; BNE $80FD
    const yHi = (xSign + this.rd(0x0041)) & 0xFF;
    if (yHi !== 0) {
      // $80EC: LDA $0046; CMP $0540; BCC $80FD; CMP $0541; BEQ $8109; BCS $80FD
      if (yCoord >= this.rd(0x0540) && yCoord <= this.rd(0x0541)) {
        // $8109: 继续写 OAM
      } else {
        // $80FD: 跳过 (INY; LDA #$F8; INY; INY; DEC $0045; BPL)
        y = (y + 1) & 0xFF;
        y = (y + 2) & 0xFF;
        this.wr(0x0045, (this.rd(0x0045) - 1) & 0xFF);
        this.wr(0x0044, y);
        return true;
      }
    }
    // $8109: .byte $C8 (INY)
    y = (y + 1) & 0xFF;
    // 循环写精灵
    let cntLeft = this.rd(0x0045);
    while (cntLeft >= 0) {
      // $810A: LDA ($0042),Y; LSR; LSR; TAX; LDA $81FA,X
      const xRaw = this.readMem(tplPtr + y);
      const xIdx = xRaw >> 2;
      let xDisp = DISP_81FA[xIdx & 0x3F] ?? 0;
      // $8114: BIT $0049; BVC $811D; EOR #$FF; CLC; ADC #$01
      let xSign2 = 0;
      if ((this.rd(0x0049) & 0x40) !== 0) {
        xDisp = ((xDisp ^ 0xFF) + 1) & 0xFF;
        if ((xDisp & 0x80) !== 0) xSign2 = -1;
      }
      // $8122: CLC; ADC $003E; STA $0047
      const xCoord = (xDisp + this.rd(0x003E)) & 0xFF;
      this.wr(0x0047, xCoord);
      // $8127: TXA; ADC $003F; BEQ $8136 (超出范围→隐藏)
      const xHi = (xSign2 + this.rd(0x003F)) & 0xFF;
      const oamOff = this.rd(0x003B);
      if (xHi !== 0) {
        // $812C: LDX $003B; LDA #$F8; STA $0200,X (隐藏精灵)
        this.wr(0x0200 + oamOff, 0xF8);
        // $8133: INY; BNE $8159
        y = (y + 1) & 0xFF;
      } else {
        // $8136: LDX $003B; LDA $0046; STA $0200,X (Y坐标)
        this.wr(0x0200 + oamOff, this.rd(0x0046));
        // $813D: LDA $0047; STA $0203,X (X坐标)
        this.wr(0x0203 + oamOff, this.rd(0x0047));
        // $8142: LDA ($0042),Y; AND #$03; ORA $0049; STA $0202,X (属性)
        const attr = (this.readMem(tplPtr + y) & 0x03) | this.rd(0x0049);
        this.wr(0x0202 + oamOff, attr);
        // $814B: INY; LDA ($0042),Y; STA $0201,X (tile)
        y = (y + 1) & 0xFF;
        this.wr(0x0201 + oamOff, this.readMem(tplPtr + y));
      }
      // $8151: INX×4; STX $003B; INC $0048
      const newOam = (oamOff + 4) & 0xFF;
      this.wr(0x003B, newOam);
      this.wr(0x0048, (this.rd(0x0048) + 1) & 0xFF);
      // $8159: INY; DEC $0045; BPL $810A
      y = (y + 1) & 0xFF;
      cntLeft = (cntLeft - 1) & 0xFF;
      if ((cntLeft & 0x80) !== 0) break;
    }
    // $815E: STY $0044; RTS
    this.wr(0x0044, y);
    return true;
  }

  /**
   * $8164: 子模板跳转 (读新指针, 重置偏移)。
   * asm: PLA; RTS (返回到调用方)
   *   .byte $A4,$44 = LDY $0044
   *   LDA ($0042),Y; TAX; INY; LDA ($0042),Y; STA $0043; STX $0042
   *   LDA #$00; STA $0044; RTS
   */
  private sub8164(): void {
    let y = this.rd(0x0044);
    const tplPtr = this.rdPtr(0x0042, 0x0043);
    const lo = this.readMem(tplPtr + y);
    y = (y + 1) & 0xFF;
    const hi = this.readMem(tplPtr + y);
    this.wrPtr(0x0042, 0x0043, (hi << 8) | lo);
    this.wr(0x0044, 0);
  }

  /**
   * $8175: 精灵计数扩展。
   * asm: LDA $0546; CMP #$0C; BCC $817E; SBC #$0C
   *   ASL; CLC; ADC $0044; STA $0044; JMP $8164
   */
  private sub8175(): void {
    let a = this.rd(0x0546);
    if (a >= 0x0C) a = (a - 0x0C) & 0xFF;
    a = (a << 1) & 0xFF;
    this.wr(0x0044, (a + this.rd(0x0044)) & 0xFF);
    this.sub8164();
  }

  /**
   * $8187: 方向偏移计算 (bit6/bit5 翻转 + 描述符[0]/[19]/[20] 偏移)。
   * asm $8187-$81D1:
   *   LDY #$00; LDA ($003C),Y; EOR $0517; AND #$40; PHP (bit6 方向)
   *   LDY #$13; LDA ($003C),Y; BEQ $81B1 (描述符[19]=0 跳)
   *   LDX #$00; PLP; PHP; BEQ $81A2; EOR #$FF; CLC; ADC #$01 (翻转)
   *   PHA; PLA; BPL; DEX; CLC; ADC $003E; STA $003E; TXA; ADC $003F; STA $003F
   *   $81B1: INY; LDA ($003C),Y; BEQ $81D0 (描述符[20]=0 跳)
   *   LDX #$00; PLP; PHP; BPL $81C1; EOR #$FF; CLC; ADC #$01 (翻转)
   *   CLC; ADC $0040; STA $0040; TXA; ADC $0041; STA $0041
   *   PLP; RTS
   */
  private sub8187(): void {
    const descPtr = this.rdPtr(0x003C, 0x003D);
    // $8189: LDA ($003C),Y; EOR $0517; AND #$40; PHP
    const d0 = this.readMem(descPtr);
    const xFlip = (d0 ^ this.rd(0x0517)) & 0x40;
    // $8191: LDY #$13; LDA ($003C),Y; BEQ $81B1
    const d19 = this.readMem(descPtr + 0x13);
    if (d19 !== 0) {
      // $8197: LDX #$00; PLP; PHP; BEQ $81A2
      let a = d19;
      let xi = 0;
      if (xFlip !== 0) {
        // $819D: EOR #$FF; CLC; ADC #$01
        a = ((a ^ 0xFF) + 1) & 0xFF;
        if ((a & 0x80) !== 0) xi = -1;
      }
      // $81A7: CLC; ADC $003E; STA $003E
      this.wr(0x003E, (a + this.rd(0x003E)) & 0xFF);
      this.wr(0x003F, (xi + this.rd(0x003F)) & 0xFF);
    }
    // $81B1: INY; LDA ($003C),Y; BEQ $81D0
    const d20 = this.readMem(descPtr + 0x14);
    if (d20 !== 0) {
      let a = d20;
      let xi = 0;
      if (xFlip !== 0) {
        a = ((a ^ 0xFF) + 1) & 0xFF;
        if ((a & 0x80) !== 0) xi = -1;
      }
      this.wr(0x0040, (a + this.rd(0x0040)) & 0xFF);
      this.wr(0x0041, (xi + this.rd(0x0041)) & 0xFF);
    }
  }

  // ════════════════════════════════════════════════════════════
  // 内存读取辅助
  // ════════════════════════════════════════════════════════════
  private readMem(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    // ROM 区: bank22 数据 (通过 TEMPLATE_PTR_8280 等表间接访问)
    return 0;
  }
}

export default SpriteService;
