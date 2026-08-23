/**
 * TileRenderService — bank00 地图/精灵渲染核心（原 code_render.s $8EF0-$968F）
 *
 * @bank 00 ($8EF0-$968F)
 *
 * 对应原始地址（逐指令对照 src/asm/bank00/code_render.s）：
 *   $8EF0: tile 渲染主例程（4×4 元块 → NT 缓冲 + 属性）
 *   $8FD1: 属性写入辅助（NT 属性表 $23C0 区）
 *   $9049: 属性地址计算（NT 地址 → 属性表行列）
 *   $9071/$9076: 清 NT0/NT1
 *   $9085: 场景数据流装载（$004D 指针流 → 布局）
 *   $9143: 流解析主循环（命令分发，$92E6 跳转表）
 *   $94D8: 精灵构建（流数据 → OAM $0468）
 *   $9684: 精灵子命令跳转表（$9693）
 *
 * 原版通过 MMC3 切 bank 读 tile 数据（JSR $C4B9）；H5 用 RomService 按 bank 读 PRG。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { RomService } from '../../data/rom/RomService';

/**
 * $978B: 场景行模板（32 字节，code_sub.s $978B-$97AA）。
 * loadSceneStream 将其复制到 ($0094) 作为 NT 行的初始布局。
 */
export const SCENE_ROW_TEMPLATE: ReadonlyArray<number> = [
  0x80, 0x01, 0x00, 0x00, 0x00, 0x30, 0x00, 0x40,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
];

export class TileRenderService {
  constructor(readonly store: DataStore, readonly rom: RomService) {}

  /**
   * H5 版 $9B28：$05E8 NT 渲染缓冲条目头写入。
   * 原版寄存器约定：A=count(bit7 垂直标记), X=addrHi, Y=addrLo；
   * 写 [$05E8+X]=count, [$05E9+X]=addrLo, [$05EA+X]=addrHi，返回 X+3。
   * @returns 数据区起始位置（原版返回 X）
   */
  private ntEntry(count: number, addrHi: number, addrLo: number): number {
    const store = this.store;
    const pos = store.readByte(0x0628) & 0xff;
    if (pos + 3 + (count & 0x3f) > 0x3d) return pos; // 容量不足（原版等待 NMI）
    store.writeByte(0x05e8 + pos, count & 0xff);
    store.writeByte(0x05e9 + pos, addrLo & 0xff);
    store.writeByte(0x05ea + pos, addrHi & 0xff);
    store.writeByte(0x0629, (count & 0xff) | 0x40); // 忙标志
    return pos + 3;
  }

  /** H5 版 $9B5E：结束 $05E8 条目（0 终止 + 更新 $0628） */
  private ntEnd(pos: number): void {
    const store = this.store;
    store.writeByte(0x05e8 + pos, 0);
    store.writeByte(0x0628, pos & 0xff);
    store.writeByte(0x0629, store.readByte(0x0629) & 0xbf);
  }

  /**
   * $9049: 属性地址计算（逐指令对照 code_render.s $9049-$9070）。
   * 输入 $0067/$0068（NT 地址）；输出：
   *   attrLo（原版 Y）= ((($0068<<4)&$30) + $C0) | $00E6
   *   attrHi（原版 X）= ($0068 & $FC) + $03
   *   中间 $00E6 = (((($0067 & $9C)>>2) & $20)>>2 | (($0067&$9C)>>2)) & $0F
   */
  calcAttrAddress(): { attrLo: number; attrHi: number } {
    const store = this.store;
    // $9049: LDA $0067; AND #$9C; LSR; LSR; STA $00E6
    let a = (store.readByte(0x0067) & 0x9c) >>> 2;
    store.writeByte(0x00e6, a);
    // $9051: AND #$20; LSR; LSR; ORA $00E6; AND #$0F; STA $00E6
    let e6 = (((a & 0x20) >>> 2) | a) & 0x0f;
    store.writeByte(0x00e6, e6);
    // $905B: LDA $0068; ASL×4; AND #$30; CLC; ADC #$C0; ORA $00E6; TAY
    const attrLo = ((((store.readByte(0x0068) << 4) & 0xff) & 0x30) + 0xc0) | e6;
    // $9069: LDA $0068; AND #$FC; ADC #$03; TAX
    const attrHi = (store.readByte(0x0068) & 0xfc) + 0x03;
    return { attrLo: attrLo & 0xff, attrHi: attrHi & 0xff };
  }

  /**
   * $8FD1: 属性写入辅助（逐指令对照 code_render.s $8FD1-$9048）。
   * 输入 $00E7（tile 属性字节）、$0067（NT 地址）、$0062（属性分组）；
   * 将属性写入 $05E8 缓冲与属性缓冲 $064A。
   * @returns true 表示跳回了主循环（原版 JMP $8F3E），false 表示正常 RTS
   */
  attrWrite(): boolean {
    const store = this.store;
    // $8FD1: JSR $9049 → Y=attrLo, X=attrHi
    const attr = this.calcAttrAddress();
    // $8FD4: BIT $0067; BVC $903A — 测 $0067 bit6（V 标志）
    if ((store.readByte(0x0067) & 0x40) === 0) {
      // $903A: LDA #$01; JSR $9B28
      let x = this.ntEntry(0x01, attr.attrHi, attr.attrLo);
      // $903F: LDA $00E7; STA $05E8,X; INX; JSR $9B5E; RTS
      store.writeByte(0x05e8 + x, store.readByte(0x00e7));
      this.ntEnd(x + 1);
      return false;
    }
    // $8FD8: STY $00E8; STX $00E9
    store.writeByte(0x00e8, attr.attrLo);
    store.writeByte(0x00e9, attr.attrHi);
    // $8FDC: LDA #$01; JSR $9B28
    let x = this.ntEntry(0x01, attr.attrHi, attr.attrLo);
    // $8FE1: LDA $0067; LSR; LSR; AND #$07; TAY
    const y = (store.readByte(0x0067) >>> 2) & 0x07;
    // $8FE8: LDA $0062; AND #$C0; CMP #$40; BEQ $900B
    if ((store.readByte(0x0062) & 0xc0) !== 0x40) {
      // $8FA5: LDA $00E7; LSR×4; STA $05E8,X; STA $064A,Y; INX; JSR $9B5E; JMP $8F3E
      const v = (store.readByte(0x00e7) >>> 4) & 0x0f;
      store.writeByte(0x05e8 + x, v);
      store.writeByte(0x064a + y, v);
      this.ntEnd(x + 1);
      return true;
    }
    // $900B: LDA $00E7; ASL×4; PHA; STA $05E8,X; INX
    const hi = (store.readByte(0x00e7) << 4) & 0xff;
    store.writeByte(0x05e8 + x, hi);
    x++;
    // $9016: LDA $00E7; LSR×4; ORA $064A,Y; STA $00E6; PLA; STA $064A,Y
    const e6 = (((store.readByte(0x00e7) >>> 4) & 0x0f) | store.readByte(0x064a + y)) & 0xff;
    store.writeByte(0x00e6, e6);
    store.writeByte(0x064a + y, hi);
    // $9025: JSR $9B5E
    this.ntEnd(x);
    // $9028: LDA $00E8; CLC; ADC #$08; TAY; LDX $00E9; LDA #$01; JSR $9B28
    const y2 = (store.readByte(0x00e8) + 0x08) & 0xff;
    const x2 = this.ntEntry(0x01, store.readByte(0x00e9), y2);
    // $9035: LDA $00E6; JMP $9041 → STA $05E8,X; INX; JSR $9B5E; RTS
    store.writeByte(0x05e8 + x2, store.readByte(0x00e6));
    this.ntEnd(x2 + 1);
    return false;
  }

  /**
   * $8EF0: tile 渲染主例程（逐指令对照 code_render.s $8EF0-$8FD0）。
   * 输入 A=tile 索引（0-255）：
   *   指针 = $A000 + tile*17 + ($005B&1)*17（PRG bank 8 数据区，每 tile 17 字节）
   *   data[0]=属性 → $8FD1；data[1..16]=4 行×4 字节 → $05E8 缓冲（NT $0067/$0068 起 4 行）
   *   处理 NT 属性边界（$0068&3==3 时属性区跳转 $2000→$2400）。
   */
  renderTile(tileIndex: number): void {
    const store = this.store;
    const tile = tileIndex & 0xff;
    // $8EF1-$8EF7: $0067 = $005C, $0068 = $005D（NT 地址基）
    let ntLo = store.readByte(0x005c);
    let ntHi = store.readByte(0x005d);
    store.writeByte(0x0067, ntLo);
    store.writeByte(0x0068, ntHi);
    // $8EF9-$8EFE: $00EB = $005B & 1（tile 组位）
    const b0 = store.readByte(0x005b) & 1;
    store.writeByte(0x00eb, b0);
    // $8F00: TXA; STA $00EA — A=tile → $00EA
    let a = tile;
    let ea = a;
    let eb = b0;
    // $8F03-$8F0D: ASL×4; ROL $00EB×4
    for (let i = 0; i < 4; i++) {
      const c = (a & 0x80) >>> 7;
      a = (a << 1) & 0xff;
      eb = ((eb << 1) | c) & 0xff;
    }
    // $8F0F-$8F17: CLC; ADC $00EA; STA $00EA; TYA; ADC $00EB; STA $00EB
    let carry = a + ea > 0xff ? 1 : 0;
    a = (a + ea) & 0xff;
    ea = a;
    a = (b0 + eb + carry) & 0xff;
    eb = a;
    // $8F19-$8F24: CLC; ADC #$00; STA $00EA; LDA $00EB; ADC #$A0; STA $00EB
    //   （$00EA+0 无进位；$00EB += $A0）
    eb = (eb + 0xa0) & 0xff;
    let ptr = (eb << 8) | ea; // 16bit 指针（CPU 地址）
    // $8F26-$8F2F: LDX #$08; JSR $C4B9; LDY #$00; LDA ($00EA),Y; STA $00E7
    const attrByte = this.rom.readByte(8, ptr);
    store.writeByte(0x00e7, attrByte);
    // $8F31: JSR $8FD1（属性写入；true=跳回主循环 $8F3E 继续）
    const jumpBack = this.attrWrite();
    void jumpBack;
    // $8F34: INC $00EA; BNE $8F3A; INC $00EB → ptr++（跳过属性字节）
    ptr = (ptr + 1) & 0xffff;
    // $8F3A: LDA #$04; STA $00E8（行计数 = 4）
    let rows = 4;
    // 主循环（$8F3E 起）：每行写 4 字节到 NT
    for (;;) {
      // $8F3E-$8F44: LDY $0067; LDX $0068; LDA #$04; JSR $9B28
      let x = this.ntEntry(0x04, ntHi, ntLo);
      // $8F47-$8F52: LDY #$00; 4×{LDA ($00EA),Y; STA $05E8,X; INX; INY}
      for (let i = 0; i < 4; i++) {
        store.writeByte(0x05e8 + x, this.rom.readByte(8, ptr + i));
        x++;
      }
      // $8F54: JSR $9B5E（结束条目）
      this.ntEnd(x);
      // $8F57: DEC $00E8; BEQ $8FCB
      rows--;
      if (rows === 0) break;
      // $8F5B-$8F66: ptr += 4（下一行数据）
      ptr = (ptr + 4) & 0xffff;
      // $8F68-$8F73: $0067/$0068 += $20（NT 下一行）
      const lo2 = (ntLo + 0x20) & 0xff;
      ntHi = (ntHi + (lo2 < ntLo ? 1 : 0)) & 0xff;
      ntLo = lo2;
      store.writeByte(0x0067, ntLo);
      store.writeByte(0x0068, ntHi);
      // $8F75: LDA $0068; AND #$03; CMP #$03; BNE $8F3E
      if ((ntHi & 3) === 3) {
        // $8F7B: LDA $0067; CMP #$C0; BCC $8F3E
        if (ntLo >= 0xc0) {
          // $8F81-$8F8C: $0067 -= $C0; $0068 -= 3（NT 属性区回绕）
          ntLo = (ntLo - 0xc0) & 0xff;
          ntHi = (ntHi - 3) & 0xff;
          store.writeByte(0x0067, ntLo);
          store.writeByte(0x0068, ntHi);
          // $8F8E: JSR $9049（重算属性地址 → Y=attrLo, X=attrHi）
          const attr = this.calcAttrAddress();
          // $8F91: LDA #$01; JSR $9B28
          let x2 = this.ntEntry(0x01, attr.attrHi, attr.attrLo);
          // $8F96: LDA $0067; LSR; LSR; AND #$07; TAY
          const y2 = (ntLo >>> 2) & 0x07;
          // $8F9D: LDA $0062; AND #$C0; CMP #$40; BEQ $8FB8
          if ((store.readByte(0x0062) & 0xc0) !== 0x40) {
            // $8FA5: LDA $00E7; LSR×4; STA $05E8,X; STA $064A,Y; INX; JSR $9B5E; JMP $8F3E
            const v = (attrByte >>> 4) & 0x0f;
            store.writeByte(0x05e8 + x2, v);
            store.writeByte(0x064a + y2, v);
            this.ntEnd(x2 + 1);
          } else {
            // $8FB8: LDA $00E7; LSR×4; ORA $064A,Y; STA $05E8,X; INX; JSR $9B5E; JMP $8F3E
            const v = (((attrByte >>> 4) & 0x0f) | store.readByte(0x064a + y2)) & 0xff;
            store.writeByte(0x05e8 + x2, v);
            this.ntEnd(x2 + 1);
          }
        }
      }
    }
    // $8FCB: LDX #$07; JSR $C4B9; RTS（恢复 bank 7 — H5 省略）
  }

  /**
   * $9071/$9076: 清 NT0/NT1（逐指令对照 code_render.s $9071-$9082 → $98E8）。
   *   $9071: LDA #$20; JMP $9078（NT0）
   *   $9076: LDA #$24; $9078: STA $00E7; LDA #$00; STA $00E6; LDY #$10; LDX #$20;
   *   $9082: JMP $98E8（填充 A=0，行=0x10，列=0x20 → 16 行 × 32 列 = $0400）
   */
  clearNt0(): void {
    this.fillArea(0x20);
  }

  /** $9076: 清 NT1（同上，NT 高字节 $24） */
  clearNt1(): void {
    this.fillArea(0x24);
  }

  /** $9078+$98E8: 以 0 填充 NT 页前 16 行 × 32 列 */
  private fillArea(ntHi: number): void {
    const store = this.store;
    let addr = (ntHi & 0xff) << 8; // $2000 / $2400
    for (let r = 0; r < 0x10; r++) {
      for (let c = 0; c < 0x20; c++) {
        store.writeByte((addr + c) & 0x3fff, 0);
      }
      addr = (addr + 0x20) & 0x3fff;
    }
  }

  // ──────────────────────────── 场景流辅助（$9735/$974A/$975B） ────────────────────────────

  /**
   * $9735: 写 16 位到 ($0094),Y（低字节 $00 在前）+ 左移存 $0095+Y+1/$0096+Y+1。
   *   TAX; LDA #$00; STA ($0094),Y; INY; TXA; STA ($0094),Y; ASL;
   *   STA $0095,Y; LDA #$00; ADC #$00; STA $0096,Y; RTS
   * 注意：INY 之后才 STA $0095,Y，故实际写入 $0095+y+1/$0096+y+1。
   * 调用约定 Y=4 → $009A/$009B（X 增量），Y=6 → $009C/$009D（Y 增量）。
   */
  private writeShift16(y: number, value: number): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    store.writeByte(ptr + y, 0);
    store.writeByte(ptr + y + 1, value & 0xff);
    store.writeByte(0x0095 + y + 1, (value << 1) & 0xff);
    store.writeByte(0x0096 + y + 1, ((value << 1) >> 8) & 1);
  }

  /**
   * $974A: 读 ($0094),Y 与 ($0094),Y+1，左移 1 位存入 $0095+Y+1/$0096+Y+1。
   *   LDA ($0094),Y; ASL; INY; LDA ($0094),Y; ROL; STA $0095,Y;
   *   LDA #$00; ROL; STA $0096,Y; RTS
   * 位级：lo=($0094),Y; hi=($0094),Y+1 → outLo = (hi<<1)|(lo>>7)，outHi = hi>>7。
   * 调用约定 Y=4 → $009A/$009B（X 增量），Y=6 → $009C/$009D（Y 增量）。
   */
  private readShift16(y: number): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    const lo = store.readByte(ptr + y);
    const hi = store.readByte(ptr + y + 1);
    store.writeByte(0x0095 + y + 1, ((hi << 1) | (lo >> 7)) & 0xff);
    store.writeByte(0x0096 + y + 1, (hi >> 7) & 0xff);
  }

  /**
   * $975B: 带符号 16 位增量合并（逐指令对照 code_sub.s $975B-$978A）。
   * 以 ($0094),Y 的 bit6 作为符号（$FF/0），将 ($0094),Y±2 的 16 位值
   * 与 (($0094),Y / ($0094),Y+1) 做加法，回写 ($0094),Y-2..Y+1。
   * 入参 X 仅被保存/恢复（STX $00ED / LDY $00ED），不影响运算。
   */
  private addSigned16(y: number): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    // $975B-$9767: LDA ($0094),Y; ROL; ROL; AND #$01; EOR #$FF; CLC; ADC #$01
    const neg = ((store.readByte(ptr + y) >> 6) & 1) === 0 ? 0x00 : 0xff;
    // $9769-$9772: CLC; LDA ($0094),Y; DEY; DEY; ADC ($0094),Y; STA ($0094),Y; STA $00EC
    const a0 = store.readByte(ptr + y);
    const a1 = store.readByte(ptr + y - 2);
    let sum = a0 + a1;
    let c = sum > 0xff ? 1 : 0;
    store.writeByte(ptr + y - 2, sum & 0xff);
    store.writeByte(0x00ec, sum & 0xff);
    // $9774-$977A: INY; TXA; ADC ($0094),Y; STA ($0094),Y; TAX
    sum = store.readByte(ptr + y - 1) + neg + c;
    c = sum > 0xff ? 1 : 0;
    store.writeByte(ptr + y - 1, sum & 0xff);
    const x2 = sum & 0xff;
    // $977B-$9782: LDY $00ED; LDA $00EC; CLC; ADC ($0094),Y; STA ($0094),Y
    sum = store.readByte(ptr + y - 2) + store.readByte(ptr + y);
    c = sum > 0xff ? 1 : 0;
    store.writeByte(ptr + y, sum & 0xff);
    // $9784-$9788: TXA; INY; ADC ($0094),Y; STA ($0094),Y
    sum = x2 + store.readByte(ptr + y + 1) + c;
    store.writeByte(ptr + y + 1, sum & 0xff);
  }

  /**
   * $9085: 场景数据流装载（逐指令对照 code_render.s $9085-$9142）。
   * 读 $004D/$004E 指向的流（行数据）：
   *   - 清 $0467-$04FF；$0097 = 0
   *   - $00EC = [($004D)+1]（行数）；$004D += 2
   *   - $0094/$0095 = $0568（NT 布局目标）
   *   - 每行：流字节 v → bank 9(v<$6D)/10(v≥$6D)，表 $A000+v*2 取 16 位指针 P
   *     → $978B 模板 32 字节 → ($0094)；[($0094)] |= ($0025-$09)
   *     → $0049 = P[0]；($0094)+2/+3 = P+1；$004D += 1；$0094 += $20
   *   - 注册回调 $9147（H5：由场景控制器每帧调用 sceneStreamNext，省略 $9F69）
   */
  loadSceneStream(): void {
    const store = this.store;
    const rom = this.rom;
    // $9085-$908D: LDA #$00; LDY #$01; STA $0467,Y; INY; BNE（清 $0468-$04FF）
    for (let i = 0x0468; i <= 0x04ff; i++) store.writeByte(i, 0);
    // $908F-$9091: STA $0097
    store.writeByte(0x0097, 0);
    // $9093-$90A4: LDY #$01; LDA ($004D),Y → $00EC; $004D += 2
    let ptr = store.readU16(0x004d);
    let rowCount = store.readByte((ptr + 1) & 0xffff);
    ptr = (ptr + 2) & 0xffff;
    store.writeU16(0x004d, ptr);
    // $90A6-$90AC: LDA #$68; STA $0094; LDA #$05; STA $0095
    let ntPtr = 0x0568;
    store.writeU16(0x0094, ntPtr);
    // 主循环（$90AE-$912E）
    for (;;) {
      // $90AE-$90B0: LDX $0025; STX $00ED（保存当前 CHR bank 号）
      const savedBank = store.readByte(0x0025);
      store.writeByte(0x00ed, savedBank);
      // $90B2-$90C1: A = [($004D)]; bank = v < $6D ? 9 : 10; v -= $6D
      const a = store.readByte(ptr & 0xffff);
      const bank = a < 0x6d ? 9 : 10;
      const v = a < 0x6d ? a : a - 0x6d;
      // $90C5-$90D6: $0092 = $A000 + v*2（16 位）
      const tableAddr = 0xa000 + v * 2;
      // $90D8-$90E2: $0092/$0093 = 表项 16 位指针 P
      let dataPtr = rom.readByte(bank, tableAddr) | (rom.readByte(bank, tableAddr + 1) << 8);
      // $90E4-$90EE: LDA $978B,Y; STA ($0094),Y × 32（常量行模板）
      // 原 $978B 为 bank00 常量行模板（32 字节），H5 从 rom 读取 bank 0 偏移 $978B
      for (let i = 0; i < 0x20; i++) store.writeByte(ntPtr + i, this.rom.readByte(0, 0x978B + i));
      // $90F0-$90F9: LDA $0025; SEC; SBC #$09; ORA ($0094),Y; STA ($0094),Y
      store.writeByte(ntPtr, (store.readByte(ntPtr) | ((savedBank - 9) & 0xff)) & 0xff);
      // $90FB-$90FF: LDY #$00; LDA ($0092),Y; STA $0049
      store.writeByte(0x0049, rom.readByte(bank, dataPtr));
      // $9101-$9105: INC $0092（P += 1）
      dataPtr = (dataPtr + 1) & 0xffff;
      // $9107-$9110: LDY #$02; LDA $0092; STA ($0094),Y; INY; LDA $0093; STA ($0094),Y
      store.writeByte(ntPtr + 2, dataPtr & 0xff);
      store.writeByte(ntPtr + 3, (dataPtr >> 8) & 0xff);
      // $9112-$9114: LDX $00ED; JSR $C4B9（切回原 bank — H5 省略）
      // $9117-$911B: INC $004D
      ptr = (ptr + 1) & 0xffff;
      // $911D-$9128: LDA $0094; CLC; ADC #$20; STA $0094; LDA $0095; ADC #$00; STA $0095
      ntPtr = (ntPtr + 0x20) & 0xffff;
      store.writeU16(0x0094, ntPtr);
      // $912A-$912E: DEC $00EC; BEQ $9131; JMP $90AE
      rowCount = (rowCount - 1) & 0xff;
      if (rowCount === 0) break;
    }
    store.writeU16(0x004d, ptr);
    // $9131-$9142: 注册回调（X=$11, 指针 $9147, Y=$C8, A=0 → JSR $9F69）
    //   H5：场景控制器在后续帧每帧调用 sceneStreamNext()，等效原版 NMI 回调 $9147。
    store.writeByte(0x0011, 0xff); // $9F69 尾段 STA #$FF
    store.writeByte(0x0012, 0xc6); // $9F69 STY $0001,X
    store.writeByte(0x0167, 0x47); // $9F69 STA $0101,Y
    store.writeByte(0x0168, 0x91); // $9F69 STA $0102,Y
  }

  /** $94BC-$94D5: 行推进（[$0094]=0，$0094 += $20，行计数递减）。
   *  @returns true 表示 4 行处理完，本帧结束（原版 JMP $9143 等下一 NMI） */
  private rowAdvance(rows: number): boolean {
    const store = this.store;
    const ntPtr = store.readU16(0x0094);
    store.writeByte(ntPtr, 0); // $94BC: LDA #$00; TAY; STA ($0094),Y
    const np = (ntPtr + 0x20) & 0xffff;
    store.writeU16(0x0094, np); // $94C1-$94CC: $0094 += $20
    const r = rows - 1; // $94CE: DEC $0096
    return r === 0; // $94D0: BEQ $94D5（帧结束）; 否则 JMP $9154 继续
  }

  /**
   * $91B4-$91F1: 精灵增量定位循环。
   * 对 [$0094]+$10 个精灵（$0468 起步长 4）累加 $00E6/$00E8 增量，
   * 溢出时翻转属性 bit3（X 向）/bit2（Y 向）。
   */
  private sceneSpriteLoop(): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    // $91B6-$91BE: X = [($0094)+$10]; Y = [($0094)+$11] >> 2
    let x = store.readByte(ptr + 0x10);
    let y = (store.readByte(ptr + 0x11) >>> 2) & 0xff;
    for (;;) {
      // $91BF-$91C5: CLC; LDA $00E6; ADC $0468,X; STA $0468,X
      const e6 = store.readByte(0x00e6);
      const sx = store.readByte(0x0468 + x) + e6;
      const vx = sx & 0xff;
      const cx = sx > 0xff ? 1 : 0;
      store.writeByte(0x0468 + x, vx);
      // $91C8-$91CB: ROR; EOR $00E6; BPL $91D5
      if (((((vx >> 1) | (cx << 7)) & 0xff) ^ e6) & 0x80) {
        // $91CD-$91D2: LDA $046A,X; EOR #$08; STA $046A,X
        store.writeByte(0x046a + x, store.readByte(0x046a + x) ^ 0x08);
      }
      // $91D5-$91DB: CLC; LDA $00E8; ADC $046B,X; STA $046B,X
      const e8 = store.readByte(0x00e8);
      const sy = store.readByte(0x046b + x) + e8;
      const vy = sy & 0xff;
      const cy = sy > 0xff ? 1 : 0;
      store.writeByte(0x046b + x, vy);
      // $91DE-$91E1: ROR; EOR $00E8; BPL $91EB
      if (((((vy >> 1) | (cy << 7)) & 0xff) ^ e8) & 0x80) {
        // $91E3-$91E8: LDA $046A,X; EOR #$04; STA $046A,X
        store.writeByte(0x046a + x, store.readByte(0x046a + x) ^ 0x04);
      }
      // $91EB-$91F1: TXA; CLC; ADC #$04; TAX; DEY; BNE
      x = (x + 4) & 0xff;
      y--;
      if (y === 0) break;
    }
  }

  /**
   * $9143: 流解析主循环（逐指令对照 code_render.s $9143-$94D5）。
   * 每帧处理 4 行（$0096=$04）：行首命令 bit7 置位 → 精灵/命令处理，
   * 否则行推进；命令流经 $9224 循环 + $92E5 跳转表（16 项）分发。
   * 原版入口由 NMI 回调 $9147 驱动；H5 由场景控制器每帧调用本方法。
   */
  sceneStreamNext(): void {
    const store = this.store;
    // $9143-$9145: LDA #$01; JSR $9FA8（等 1 帧）— H5 帧驱动省略
    // $9148-$9152: $0094/$0095 = $0568; $0096 = $04
    store.writeU16(0x0094, 0x0568);
    let rows = 4;
    for (;;) {
      const ntPtr = store.readU16(0x0094);
      // $9154-$915A: LDY #$00; LDA ($0094),Y; BMI $915D; JMP $94C1
      const cmd = store.readByte(ntPtr);
      if ((cmd & 0x80) === 0) {
        if (this.rowAdvance(rows)) return;
        rows--;
        continue;
      }
      // $915D-$9166: TAX; LDY #$04; JSR $974A; LDY #$06; JSR $974A
      this.readShift16(4); // → $0099/$009A
      this.readShift16(6); // → $009B/$009C
      // $9168-$9172: TXA; AND #$10/$20 分支
      if ((cmd & 0x10) !== 0) {
        // $91A6-$91B2: 相对精灵：$00E6 = -$0046, $00E8 = -$0047
        store.writeByte(0x00e6, (0x00 - store.readByte(0x0046)) & 0xff);
        store.writeByte(0x00e8, (0x00 - store.readByte(0x0047)) & 0xff);
      } else if ((cmd & 0x20) !== 0) {
        // $9175-$91A3: 绝对精灵（X=4/$0A 与 X=6/$0E 两组增量合并）
        this.addSigned16(0x0a); // $9175-$917B
        store.writeByte(0x00e6, store.readByte(0x009a)); // $917C-$917E
        this.readShift16(4); // $9180-$9184
        store.writeByte(0x00e6, (store.readByte(0x009a) - store.readByte(0x00e6)) & 0xff); // $9185-$918A
        this.addSigned16(0x0e); // $918C-$9192
        store.writeByte(0x00e8, store.readByte(0x009c)); // $9193-$9195
        this.readShift16(6); // $9197-$919B
        store.writeByte(0x00e8, (store.readByte(0x009c) - store.readByte(0x00e8)) & 0xff); // $919C-$91A1
      }
      // $91B4-$91F1: 精灵增量循环
      this.sceneSpriteLoop();
      // $91F3-$91FE: DEC [($0094)+$01]; BNE $94C1（未到 0 → 行推进）
      const cnt = (store.readByte(ntPtr + 1) - 1) & 0xff;
      store.writeByte(ntPtr + 1, cnt);
      if (cnt !== 0) {
        if (this.rowAdvance(rows)) return;
        rows--;
        continue;
      }
      // $9201-$921F: bank = 9 + ([$0094]&1); $0092 = [($0094)+2]; bit1 → $9459
      const bank = 9 + (store.readByte(ntPtr) & 1);
      const cmdPtr = store.readU16(ntPtr + 2);
      if ((store.readByte(ntPtr) & 2) !== 0) {
        if (this.sceneCmd9459(bank, cmdPtr)) {
          if (this.rowAdvance(rows)) return;
          rows--;
        }
        continue;
      }
      // $9224 命令循环（返回 true = 已行推进/帧结束）
      if (this.sceneCmdLoop(bank, cmdPtr)) {
        if (this.rowAdvance(rows)) return;
        rows--;
      }
    }
  }

  /**
   * $94D8: 精灵构建。
   * 精灵数据流 → OAM $0468（Y/X/属性/图案），含翻转与相对坐标。
   * TODO: 逐指令覆盖实现（$95E5 跳转表）。
   */
  buildSprite(): void {
    void this.store;
  }

  /**
   * $9459: 场景命令处理（bit1 置位分支）。
   * TODO: 逐指令覆盖实现。
   * @returns true 表示已行推进
   */
  private sceneCmd9459(bank: number, cmdPtr: number): boolean {
    void bank;
    void cmdPtr;
    void this.store;
    return false;
  }

  /**
   * $9224: 场景命令循环（跳转表 16 项分发）。
   * TODO: 逐指令覆盖实现。
   * @returns true 表示已行推进/帧结束
   */
  private sceneCmdLoop(bank: number, cmdPtr: number): boolean {
    void bank;
    void cmdPtr;
    void this.store;
    return false;
  }
}
