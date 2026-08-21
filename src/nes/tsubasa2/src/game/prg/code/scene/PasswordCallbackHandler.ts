/**
 * PasswordCallbackHandler — 密码界面回调处理器
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 职责: 密码界面渲染 ($84C1-$8559, NMI 回调 idx 0),
 *       密码→数据解码校验 ($82E8-$8335, NMI 回调 idx 23)。
 *
 * 被 BootRouter.resetEntry 在 idx 0/23 时调用, 不独立分发。
 */
import { DataStore } from '../../data/store/DataStore';
import { PASSWORD_POS_INC_TABLE } from '../../data/tables/bank02-tables';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class PasswordCallbackHandler {
  protected _store: DataStore;

  /** 假名网格 CHR tile 集合长度 (100 字节, asm $58-$70) */
  static readonly GRID_TILE_COUNT = 100;

  constructor(store: DataStore) {
    this._store = store;
  }

  // ════════════════════════════════════════════════
  // 零页读/写辅助
  // ════════════════════════════════════════════════

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v & 0xff);
  }

  /**
   * $9FA8 waitCounter — 等待 vblank 帧边界 (bank00 $9FA8)。
   * asm: STA $0019 (存帧数到 ram_0019); 压栈寄存器; 挂起协程 → 帧调度恢复。
   * 翻译版: 帧同步由外部帧循环驱动, 此处写 ram_0019 (帧数, 语义占位)。
   * @param frames 等待帧数 (A 寄存器, asm 传入)
   */
  protected waitCounter(frames?: number): void {
    this.wr(0x0019, frames ?? 1);
  }

  /**
   * $9A35 renderRefresh — 渲染刷新 + 渐隐初始化 (bank00 $9A35)。
   * asm: JSR $9B07 (NT 刷新); JSR $9AB8 (OAM 刷新); JSR $9ADA (调色板刷新);
   *      LDX $00E9; JSR $C4B9 (切 bank); LDA #$0F; STA $004A; STA $004B; JMP $9A71 (渐隐)
   * 翻译版: NT/OAM/调色板刷新由 PpuSync 驱动, 此处设渐隐计数器。
   */
  protected renderRefresh(): void {
    this.wr(0x004A, 0x0F);
    this.wr(0x004B, 0x0F);
  }

  /**
   * $9A0D clearScreen — 清屏 (bank00 $9A0D)。
   * 翻译版: 清 OAM + NT。
   */
  protected clearScreen(): void {
    this._store.clearOAM();
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        this._store.writeNT(0, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
        this._store.writeNT(1, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
      }
    }
  }

  /**
   * $890C spriteBlink — 精灵闪烁 (bank02 $890C)。
   * asm: 切换精灵可见性 (ram_001B bit0 交替)。
   * @param val 闪烁值 (A 寄存器)
   */
  protected spriteBlink(val: number): void {
    // $890C: 精灵闪烁逻辑 (切换 ram_001B bit0)
    this.wr(0x001B, this.rd(0x001B) ^ 0x01);
    void val;
  }

  /**
   * $8920 drawFrame — 画帧 (bank02 $8920)。
   * asm: 两次 ppuFill ($2000/$2400 区) + OAM 清除。
   * @param _frameId 帧编号 (A 寄存器, 未被子程使用)
   */
  protected drawFrame(_frameId: number): void {
    // 第一次 ppuFill: $2000 区, 填 0, 16 行 × 32 列
    this.wr(0x00E6, 0x00);
    this.wr(0x00E7, 0x20);
    this.ppuFill(0x2000, 0x00, 16, 32);
    // 第二次 ppuFill: $2400 区, 填 0, 32 行 × 32 列
    this.wr(0x00E6, 0x00);
    this.wr(0x00E7, 0x24);
    this.ppuFill(0x2400, 0x00, 30, 32);
    // JSR $9B7F (OAM 清除)
    this._store.clearOAM();
  }

  /** ppuFill 辅助: 填 NT 区 rows 行 × cols 列 */
  private ppuFill(baseAddr: number, fill: number, rows: number, cols: number): void {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const addr = baseAddr + y * 32 + x;
        const nt = addr < 0x2400 ? 0 : 1;
        const tx = (addr & 0x3ff) % 32;
        const ty = ((addr & 0x3ff) / 32) | 0;
        if (tx < 32 && ty < 30) {
          this._store.writeNT(nt as 0 | 1, tx, ty, { tile: fill, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
        }
      }
    }
  }

  /**
   * $98EA ppuFillByte — 用指定值填 NT 区 (bank00 $98EA)。
   * @param fill 填充值 (A 寄存器)
   * @param baseAddr NT 基址 (ram_00E6/00E7)
   * @param rows 行数 (Y 寄存器)
   * @param cols 列数 (X 寄存器)
   */
  protected ppuFillByte(fill: number, baseAddr: number, rows: number, cols: number): void {
    this.ppuFill(baseAddr, fill, rows, cols);
  }

  /**
   * $99F0 / $98A0 / $9B7F — 清屏/OAM 清除 (bank00)。
   * 翻译版: 委托给 clearScreen。
   */
  protected clearAll(): void {
    this.clearScreen();
  }

  /**
   * $8AF7 sceneLoad — 场景装载 (bank00 $8AF7)。
   * 翻译版: 写 ram_00ED + 清状态 (跨 service, 此处仅写场景索引)。
   * @param sceneId 场景 ID (A 寄存器)
   */
  protected sceneLoad(sceneId: number): void {
    this.wr(0x00ED, sceneId);
    this.wr(0x0009, 0);
    this.wr(0x000A, 0);
    this.wr(0x000D, 0);
    this.wr(0x000E, 0);
    this.wr(0x005B, this.rd(0x005B) & 0x7f);
  }

  // ════════════════════════════════════════════════════════════════
  // $84C1-$8559 密码界面初始化 (render)
  // ════════════════════════════════════════════════════════════════

  /**
   * 渲染密码界面 (对应原始 $84C1-$8559)。
   *
   * asm 流程:
   *   $84C1: JSR $9A0D (清屏)
   *   $84C4: LDA #$10; JSR $9FA8 (等 16 帧)
   *   $84C9: LDY #$30; 循环 48 次: LDA #$01; JSR $9FA8 (等 1 帧); JSR $890C (精灵闪烁); DEY; BNE
   *   $84D8: 清 ram_005B/007B
   *   $84DE: LDA #$17; JSR $8AF7 (装载密码场景 0x17)
   *   $84E3: ram_0044=0x68; LDA #$03; JSR $8920 (画帧 3)
   *   $84EC: ram_0090=ram_008E; ram_0091=ram_008F
   *   $84F4: LDA #$04; JSR $9FA8 (等 4 帧)
   *   $84F9: JSR $9A35 (渲染刷新); JSR $88FB (OAM 拷贝)
   *   $84FF: 循环: LDA #$01; JSR $9FA8; INC $0079; DEC $007C×2; ram_0044-=2;
   *          CMP #$03; BCS $84FF (ram_0044 >= 3 时循环)
   *   $8515: LDA #$00; JSR $8920 (画帧 0)
   *   $851A: ram_001B |= $01
   *   $8520: LDA #$F0; JSR $9FA8 (等 240 帧)
   *   $8525: LDA #$3C; JSR $9FA8 (等 60 帧)
   *   $852A: ram_001B &= $FE
   *   $8530: ram_0090=0; ram_0091=2
   *   $8538: JSR $99F0; JSR $9B7F; JSR $98A0 (清屏/OAM/NT)
   *   $8541: ram_00E6=$C0; ram_00E7=$23; LDY #$02; LDX #$20; LDA #$55; JSR $98EA (填 $23C0 区 2×32 = $55)
   *   $8552: LDA #$01; JSR $8920 (画帧 1)
   *   $8557: LDA #$02; RTS (返回分支 2)
   */
  render(): number {
    // $84C1: 清屏
    this.clearScreen();
    // $84C4: LDA #$10; JSR $9FA8 (等 16 帧)
    this.waitCounter(0x10);

    // $84C9-$84D6: 48 次循环 (LDA #$01; JSR $9FA8; JSR $890C; DEY; BNE)
    for (let i = 0x30; i > 0; i--) {
      this.waitCounter(0x01);
      this.spriteBlink(1);
    }

    // $84D8: 清 ram_005B/007B
    this.wr(0x005B, 0);
    this.wr(0x007B, 0);

    // $84DE: 装载密码场景 0x17
    this.sceneLoad(0x17);

    // $84E3: ram_0044=0x68; 画帧 3
    this.wr(0x0044, 0x68);
    this.drawFrame(3);

    // $84EC: ram_0090=ram_008E; ram_0091=ram_008F
    this.wr(0x0090, this.rd(0x008E));
    this.wr(0x0091, this.rd(0x008F));

    // $84F4: LDA #$04; JSR $9FA8 (等 4 帧)
    this.waitCounter(0x04);

    // $84F9: JSR $9A35 (渲染刷新); JSR $88FB (OAM 拷贝)
    // $9A35: NT/OAM/调色板刷新 + 渐隐初始化 (bank00)
    this.renderRefresh();
    this.oamCopy();

    // $84FF-$8513: 循环 (ram_0044 >= 3 时)
    // asm 顺序: waitCounter → INC $0079 → DEC $007C×2 → ram_0044-=2 → CMP #$03; BCS 循环
    let r44 = this.rd(0x0044);
    while (r44 >= 3) {
      this.waitCounter(0x01);
      this.wr(0x0079, (this.rd(0x0079) + 1) & 0xff);
      this.wr(0x007C, (this.rd(0x007C) - 2) & 0xff);
      r44 = (this.rd(0x0044) - 2) & 0xff;
      this.wr(0x0044, r44);
    }

    // $8515: 画帧 0
    this.drawFrame(0);

    // $851A: ram_001B |= $01
    this.wr(0x001B, this.rd(0x001B) | 0x01);

    // $8520: LDA #$F0; JSR $9FA8 (等 240 帧)
    this.waitCounter(0xF0);
    // $8525: LDA #$3C; JSR $9FA8 (等 60 帧)
    this.waitCounter(0x3C);

    // $852A: ram_001B &= $FE
    this.wr(0x001B, this.rd(0x001B) & 0xFE);

    // $8530: ram_0090=0; ram_0091=2
    this.wr(0x0090, 0);
    this.wr(0x0091, 2);

    // $8538: 清屏/OAM/NT
    this.clearAll();

    // $8541: 填 $23C0 区 2 行 × 32 列 = $55
    this.wr(0x00E6, 0xC0);
    this.wr(0x00E7, 0x23);
    this.ppuFillByte(0x55, 0x23C0, 2, 32);

    // $8552: 画帧 1
    this.drawFrame(1);

    // $8557: 返回分支 2
    return 2;
  }

  /**
   * $88FB oamCopy — OAM 拷贝 (bank02 $88D0/$88FB)。
   * 把工作精灵表 $0468 拷贝到 OAM $0200。
   */
  protected oamCopy(): void {
    for (let y = 0; y < 256; y += 4) {
      let spriteY = this.rd(0x0468 + y);
      const attr = this.rd(0x046A + y);
      if ((attr & 0x0C) !== 0) {
        spriteY = 0xF8;
      }
      this.wr(0x0200 + y, spriteY);
      this.wr(0x0201 + y, this.rd(0x0469 + y));
      this.wr(0x0202 + y, this.rd(0x046A + y));
      this.wr(0x0203 + y, this.rd(0x046B + y));
    }
  }

  // ════════════════════════════════════════════════════════════════
  // $82E8-$8335 密码→数据解码 (check)
  // ════════════════════════════════════════════════════════════════

  /**
   * 密码→数据解码 (对应原始 $82E8-$8335)。
   *
   * asm 流程:
   *   $82E8: LDA $57; BMI $8338 (bit7=1 跳到密码分支)
   *   $82EC: STA $00ED (存 ram_0057 值到 ram_00ED)
   *   $82EE: LDA #$00; LDY #$FA; 循环 STA $FFEC,Y (清 $05E6-$05EB 区 6 字节)
   *   $82FA: LDA #$01; JSR $9FA8 (等 1 帧)
   *   $82FD: LDY $00ED
   *   $82FF-$8333: 密码解码循环 (5 次, ram_00EC 从 0 步进 3 到 0x0F):
   *     LDA #$00; STA $00EC; TYA; AND #$0F; LSR; TAX
   *     LDA $AADF,Y; CLC; ADC $00E6,X; STA $00E6,X (低字节累加, 增量=tbl[Y])
   *     LDX $00EC; LDA $AAE0,Y; ADC $007A,X; STA $007A,X (高字节累加, 增量=tbl[Y+1], 表重叠 1 字节)
   *     LDA $AAE0,Y; BPL $8322 (bit7=0 跳过符号扩展)
   *     LDA #$FF; BNE $8324 (bit7=1 符号扩展 $FF)
   *     $8322: LDA #$00; ADC $007B,X; STA $007B,X (进位累加)
   *     INY; INY; ram_00EC += 3; CMP #$0F; BNE $8303 (循环 5 次)
   *   $8335: JMP $A2F8 (跳到后续处理)
   *
   * 位置增量表 $AADF (16 字节, 2026-08 已校准):
   *   $10,$00,$10,$00,$40,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
   * Y=0/2/4/6/8 时 LO=tbl[Y]=$10/$10/$40/$00/$00, HI=tbl[Y+1]=$00 (全零, 无符号扩展)。
   *
   * 密码输入通过 OAM 精灵选择假名 (由其他 NMI 回调处理), 不是字符串。
   * 此方法读 ram_0057 (密码种子) 做解码, 不接收字符串参数。
   */
  check(): boolean {
    // $82E8: LDA $0057; BMI $8338
    const r57 = this.rd(0x0057);
    if ((r57 & 0x80) !== 0) {
      // bit7=1: 走密码分支 ($8338), 不做解码
      return false;
    }

    // $82EC: STA $00ED
    this.wr(0x00ED, r57);

    // $82EE-$82F6: 清 $05E6-$05EB 区 (6 字节, LDY #$FA; STA $FFEC,Y; INY; BNE)
    for (let i = 0; i < 6; i++) {
      this.wr(0x05E6 + i, 0);
    }

    // $82FA: LDA #$01; JSR $9FA8 (等 1 帧)
    this.waitCounter(0x01);

    // $82FD: LDY $00ED
    let y = this.rd(0x00ED);

    // $82FF-$8333: 密码解码循环 (ram_00EC 从 0 步进 3 到 0x0F, 共 5 次)
    let ec = 0;
    while (true) {
      this.wr(0x00EC, ec);
      // TYA; AND #$0F; LSR; TAX → X = (Y & 0x0F) >> 1
      const x = (y & 0x0F) >> 1;

      // LDA $AADF,Y; CLC; ADC $00E6,X; STA $00E6,X (低字节累加)
      const loInc = PASSWORD_POS_INC_TABLE[y] ?? 0;
      const e6Old = this.rd(0x00E6 + x);
      const e6Sum = e6Old + loInc;
      this.wr(0x00E6 + x, e6Sum & 0xff);

      // LDX $00EC; LDA $AAE0,Y; ADC $007A,X; STA $007A,X (高字节累加, 带进位)
      // $AAE0 = $AADF+1, 高字节增量 = 同一表的下一个字节
      const hiInc = PASSWORD_POS_INC_TABLE[y + 1] ?? 0;
      const carry1 = e6Sum >> 8;
      const old7A = this.rd(0x007A + ec);
      const sum7A = old7A + hiInc + carry1;
      this.wr(0x007A + ec, sum7A & 0xff);

      // LDA $AAE0,Y; BPL $8322 (bit7=0: LDA #$00; bit7=1: LDA #$FF)
      const signExt = (hiInc & 0x80) !== 0 ? 0xFF : 0x00;
      // ADC $007B,X; STA $007B,X (进位累加到更高字节)
      const carry2 = sum7A >> 8;
      const old7B = this.rd(0x007B + ec);
      this.wr(0x007B + ec, (old7B + signExt + carry2) & 0xff);

      // INY; INY; ram_00EC += 3
      y = (y + 2) & 0xff;
      ec = (ec + 3) & 0xff;
      // CMP #$0F; BNE $8303 (ram_00EC != 0x0F 时继续)
      if (ec === 0x0F) break;
    }

    // $8335: JMP $A2F8 (跳到后续处理)
    // 解码完成, ram_00E6/007A/007B 区已填充密码数据, 后续由场景帧处理消费
    return true;
  }
}

export default PasswordCallbackHandler;
