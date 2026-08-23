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
      let cmdPtr = store.readU16(ntPtr + 2);
      if ((store.readByte(ntPtr) & 2) !== 0) {
        // $9221: JMP $9459（bit1 置位分支；返回 advance=false 时 cmdPtr 已更新需继续 $9224）
        const r = this.sceneCmd9459(bank, cmdPtr);
        if (r.advance) {
          if (this.rowAdvance(rows)) return;
          rows--;
          continue;
        }
        cmdPtr = r.cmdPtr;
      }
      // $9224 命令循环（返回 true = 已行推进/帧结束）
      if (this.sceneCmdLoop(bank, cmdPtr)) {
        if (this.rowAdvance(rows)) return;
        rows--;
      }
    }
  }

  /**
   * $94D8: 精灵构建（逐指令对照 code_render.s $94D8-$9684 + code_sub.s $9684-$9734）。
   * 精灵数据流（$00E6 指向，当前场景 bank）→ OAM $0468（X/图案/属性/Y）：
   *   4 字节头 [计数|$80, 起始 OAM, 基 X, 基 Y] → $009E/$009F/$00A0/$00A1；$00E6 += 4
   *   $0098 = [($0094)+$10]（当前 OAM 指针，行位 bit3 未置位时先写 $0097 基线）
   *   主循环命令（$9515）：
   *     <$80 绝对 OAM 写入（命令字节=属性，bits2-5=X 偏移）
   *     $80-$9F 相对增量（$00EA/$00EB X 累加器 += $009A/$009B，$00E6 += 1）
   *     $A0-$BF 绝对增量（$00E8/$00E9 Y 累加器 += $009C/$009D，$00E6 += 1）
   *     $C0-$CF 相对 Y 命令（写 OAM Y/X/属性/图案，$00E6 += 3）
   *     $D0+ 子命令（$9684：SEC SBC #$F8; ASL; TAX → $9693 跳转表，RTS+1）
   *       $F8/$F9/$FA/$FC 精灵槽推入（$96A4，压入 $00E6+3 指针，落穿 $96C7 指针重载）
   *       $FB 指针重载（$96C7：$00E6 = ($00E6)+1 处 16 位）
   *       $FD 精灵槽弹出（$96D6）
   *       $FE/$FF OAM 清屏/基线调整（$96F2，同时是 buildSprite 出口：RTS $9734）
   * @param bank 当前场景 PRG bank（9 或 10）
   */
  buildSprite(bank: number): void {
    const store = this.store;
    const rom = this.rom;
    // $94D8-$94EE: 4 字节头 → $009E/$009F/$00A0/$00A1
    let ptr = store.readU16(0x00e6);
    store.writeByte(0x009e, rom.readByte(bank, ptr) | 0x80);
    store.writeByte(0x009f, rom.readByte(bank, (ptr + 1) & 0xffff));
    store.writeByte(0x00a0, rom.readByte(bank, (ptr + 2) & 0xffff));
    store.writeByte(0x00a1, rom.readByte(bank, (ptr + 3) & 0xffff));
    // $94F0-$94FB: $00E6 += 4
    ptr = (ptr + 4) & 0xffff;
    store.writeU16(0x00e6, ptr);
    // $94FD-$950D: [$0094] bit3 未置位 → [$0094+$10] = $0097；$0098 = [$0094+$10]
    const ntPtr = store.readU16(0x0094);
    if ((store.readByte(ntPtr) & 0x08) === 0) {
      store.writeByte(ntPtr + 0x10, store.readByte(0x0097));
    }
    store.writeByte(0x0098, store.readByte(ntPtr + 0x10));
    // $950F-$9513: $00E8/$00E9 = 0（Y 累加器清零）
    store.writeByte(0x00e8, 0);
    store.writeByte(0x00e9, 0);
    // 主循环 $9515
    for (;;) {
      const sp = store.readU16(0x00e6);
      const cmd = rom.readByte(bank, sp);
      if ((cmd & 0x80) === 0) {
        // 绝对 OAM 写入（$951B-$9586）
        const ox = store.readByte(0x0098);
        const v = (cmd & 0x3c) << 2; // $951D: AND #$3C; ASL; ASL
        let hi: number;
        let xl: number;
        let carry: number;
        if ((v & 0x80) === 0) {
          // $9523: LSR; CLC; ADC $009A → X 坐标低字节
          const lo = (v >> 1) + store.readByte(0x009a);
          carry = lo > 0xff ? 1 : 0;
          xl = lo & 0xff;
          store.writeByte(0x0468 + ox, xl);
          store.writeByte(0x00ea, xl);
          // $952C: LDA #$00; ADC $009B
          hi = (store.readByte(0x009b) + carry) & 0xff;
        } else {
          // $9533: SEC; ROR; CLC; ADC $009A
          const a = ((v >> 1) | 0x80) & 0xff;
          const lo = a + store.readByte(0x009a);
          carry = lo > 0xff ? 1 : 0;
          xl = lo & 0xff;
          store.writeByte(0x0468 + ox, xl);
          store.writeByte(0x00ea, xl);
          // $953D: LDA #$00; SBC $009B（借位 = 1-carry）
          hi = (0x00 - store.readByte(0x009b) - (1 - carry)) & 0xff;
        }
        // $9541: AND #$01; STA $00EB
        let ec = (hi & 1) << 1; // $9545: ASL; $9546: STA $00EC
        // $9548: OAM Y = $00E8
        store.writeByte(0x046b + ox, store.readByte(0x00e8));
        // $954D-$9555: $00EC = (($00E9 & 1) | $00EC) << 2
        ec = (((store.readByte(0x00e9) & 1) | ec) << 2) & 0xff;
        // $9557-$9569: 属性 = $00EC | (attr^行位)&$40 | attr&3
        const attr = rom.readByte(bank, sp);
        ec |= (attr ^ store.readByte(ntPtr)) & 0x40;
        ec |= attr & 0x03;
        store.writeByte(0x046a + ox, ec & 0xff);
        // $956C-$956F: 图案 = ($00E6)+1
        store.writeByte(0x0469 + ox, rom.readByte(bank, (sp + 1) & 0xffff));
        // $9572: $0098 += 4；$9579: $00E6 += 2
        store.writeByte(0x0098, (ox + 4) & 0xff);
        store.writeU16(0x00e6, (sp + 2) & 0xffff);
        continue;
      }
      if (cmd < 0xa0) {
        // 相对 X 增量（$9589-$95AC）：$00EA/$00EB += $009A/$009B，$00E6 += 1
        const d = (cmd << 3) & 0xff;
        const xh = (d & 0x80) !== 0 ? 0xff : 0x00; // $9594 BPL / DEX
        const lo = store.readByte(0x009a) + d;
        const c = lo > 0xff ? 1 : 0;
        store.writeByte(0x00ea, lo & 0xff);
        store.writeByte(0x00eb, (store.readByte(0x009b) + xh + c) & 0xff);
        store.writeU16(0x00e6, (sp + 1) & 0xffff);
        continue;
      }
      if (cmd < 0xc0) {
        // 绝对 Y 增量（$95AF-$95E2）：行位 bit7 置位则取反；$00E8/$00E9 += $009C/$009D
        const neg = (store.readByte(ntPtr) & 0x80) !== 0;
        const xv = neg ? (0x00 - cmd) & 0xff : cmd;
        const d = (xv << 3) & 0xff;
        const yh = (d & 0x80) !== 0 ? 0xff : 0x00;
        const lo = store.readByte(0x009c) + d;
        const c = lo > 0xff ? 1 : 0;
        store.writeByte(0x00e8, lo & 0xff);
        store.writeByte(0x00e9, (store.readByte(0x009d) + yh + c) & 0xff);
        store.writeU16(0x00e6, (sp + 1) & 0xffff);
        continue;
      }
      if (cmd < 0xd0) {
        // 相对 Y 命令（$95EC-$9681）：写 OAM Y/X/属性/图案
        const ox = store.readByte(0x0098);
        let xv = cmd;
        if ((store.readByte(ntPtr) & 0x80) !== 0) {
          xv = (0x00 - cmd) & 0xff; // $95F4: EOR #$FF; CLC; ADC #$01
        }
        let dLow: number;
        let yHigh: number;
        if ((xv & 0x08) !== 0) {
          dLow = (xv | 0xf0) & 0xff; // $9608-$960B
          yHigh = 0xff;
        } else {
          dLow = xv & 0x07; // $9600-$9603
          yHigh = 0x00;
        }
        // $960D-$9612: OAM Y = $00E8 + dLow
        const ypos = dLow + store.readByte(0x00e8);
        const cy = ypos > 0xff ? 1 : 0;
        store.writeByte(0x046b + ox, ypos & 0xff);
        // $9615-$961A: $00EC = ($00E9 + yHigh + cy) & 1
        let ec = (store.readByte(0x00e9) + yHigh + cy) & 1;
        // $961C-$9624: 图案属性 bits2-5 → X 偏移
        const attr = rom.readByte(bank, (sp + 1) & 0xffff);
        const t = (attr & 0x3c) >> 2;
        let xHi: number;
        if ((t & 0x08) !== 0) {
          // $9637-$963E: X = $00EA + t + $F0（负向）
          const lo = (t + 0xf0) & 0xff;
          const lo2 = lo + store.readByte(0x00ea);
          const c = lo2 > 0xff ? 1 : 0;
          store.writeByte(0x0468 + ox, lo2 & 0xff);
          // $9641-$9643: LDA $00EB; SBC #$00 → $00EB - 1 + c
          xHi = (store.readByte(0x00eb) - 1 + c) & 0xff;
        } else {
          // $9629-$962D: X = $00EA + t（正向）
          const lo2 = t + store.readByte(0x00ea);
          const c = lo2 > 0xff ? 1 : 0;
          store.writeByte(0x0468 + ox, lo2 & 0xff);
          // $9630: LDA $00EB; ADC #$00
          xHi = (store.readByte(0x00eb) + c) & 0xff;
        }
        // $9645-$964C: $00EC = ((xHi&1)<<1 | $00EC) << 2
        ec = ((((xHi & 1) << 1) | ec) << 2) & 0xff;
        // $964E-$9664: 属性合并
        ec |= (attr ^ store.readByte(ntPtr)) & 0x40;
        ec |= attr & 0x03;
        store.writeByte(0x046a + ox, ec & 0xff);
        // $9667-$966A: 图案 = ($00E6)+2
        store.writeByte(0x0469 + ox, rom.readByte(bank, (sp + 2) & 0xffff));
        // $966D: $0098 += 4；$9674: $00E6 += 3
        store.writeByte(0x0098, (ox + 4) & 0xff);
        store.writeU16(0x00e6, (sp + 3) & 0xffff);
        continue;
      }
      // 子命令（$95E9: JMP $9684）——$D0-$FF
      const k = (cmd - 0xf8) & 0xff;
      if (k <= 7) {
        switch (k) {
          case 0:
          case 1:
          case 2:
          case 4:
          case 5:
            // $F8/$F9/$FA/$FC → 精灵槽推入（$96A4，$FA 经 RTS+1 落 $96A5 同为 LDY #$13）
            this.spriteSlotPush(bank);
            break;
          case 3:
            // $FB → 指针重载（$96C7）
            this.spritePtrReload(bank);
            break;
          case 6:
            // $FD → 精灵槽弹出（$96D6）
            this.spriteSlotPop();
            break;
          default:
            // $FE/$FF → OAM 清屏/基线（$96F2），同时退出 buildSprite
            this.spriteOamClear();
            return;
        }
      }
      // 越界 k>7（$D0-$F7）：原版 RTS 跳入 ROM 代码区（未定义行为），H5 跳过命令字节
      store.writeU16(0x00e6, (sp + 1) & 0xffff);
    }
  }

  /**
   * $96A4: 精灵槽推入（code_sub.s $96A4-$96C6）。
   * [$0094]+$13 槽计数（≥4 原版自循环死锁）；指针 $00E6+3 存入 [$0094]+$18+2*count；
   * 完成后落穿 $96C7 指针重载（原版无跳转，顺序执行）。
   */
  private spriteSlotPush(bank: number): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    const count = store.readByte(ptr + 0x13);
    if (count >= 4) return; // 原版 BCS 自循环；游戏数据不会触发
    store.writeByte(ptr + 0x13, (count + 1) & 0xff);
    const p = store.readU16(0x00e6);
    const saved = (p + 3) & 0xffff;
    store.writeByte(ptr + 0x18 + count * 2, saved & 0xff);
    store.writeByte(ptr + 0x18 + count * 2 + 1, (saved >> 8) & 0xff);
    // 落穿 $96C7
    this.spritePtrReload(bank);
  }

  /**
   * $96C7: 精灵指针重载（code_sub.s $96C7-$96D3）。
   * $00E6 = ($00E6)+1 处 16 位指针（跳过当前命令字节），JMP $9515。
   */
  private spritePtrReload(bank: number): void {
    const store = this.store;
    const p = store.readU16(0x00e6);
    store.writeByte(0x00e6, this.rom.readByte(bank, (p + 1) & 0xffff));
    store.writeByte(0x00e7, this.rom.readByte(bank, (p + 2) & 0xffff));
  }

  /**
   * $96D6: 精灵槽弹出（code_sub.s $96D6-$96EF）。
   * 槽计数递减，[$0094]+$18+2*(count-1) 恢复 $00E6/$00E7，JMP $9515。
   */
  private spriteSlotPop(): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    const count = store.readByte(ptr + 0x13);
    if (count === 0) return; // 原版 BEQ 自循环；游戏数据不会触发
    const nc = (count - 1) & 0xff;
    store.writeByte(ptr + 0x13, nc);
    store.writeByte(0x00e6, store.readByte(ptr + 0x18 + nc * 2));
    store.writeByte(0x00e7, store.readByte(ptr + 0x18 + nc * 2 + 1));
  }

  /**
   * $96F2: OAM 清屏/基线调整（code_sub.s $96F2-$9734）。
   * 行位 bit3 未置位 → 置位 + $9727 基线；已置位 → 按 $0098 与 [$0094+$10]+[$0094+$11]
   * 的差值用 Y=$F8 隐藏精灵或更新基线。$9734 RTS = buildSprite 出口。
   */
  private spriteOamClear(): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    if ((store.readByte(ptr) & 0x08) === 0) {
      store.writeByte(ptr, store.readByte(ptr) | 0x08); // $96FA-$96FE
      this.spriteOamBaseline(); // $9700: JMP $9727
      return;
    }
    // $9703-$970D: sum = [$0094+$10] + [$0094+$11]; diff = sum - $0098
    const sum = (store.readByte(ptr + 0x10) + store.readByte(ptr + 0x11)) & 0xff;
    const cur = store.readByte(0x0098);
    const diff = (sum - cur) & 0xff;
    if (diff === 0) return; // $970E: BEQ $9734
    if (sum < cur) {
      // $9710: BCC $9727
      this.spriteOamBaseline();
      return;
    }
    // $9712-$9722: 用 Y=$F8 隐藏 (diff>>2) 个精灵
    let n = diff >> 2;
    let x = cur;
    while (n > 0) {
      store.writeByte(0x0468 + x, 0xf8);
      x = (x + 4) & 0xff;
      n--;
    }
    // $9724: JMP $9734 → RTS
  }

  /**
   * $9727: OAM 基线调整（code_sub.s $9727-$9734）。
   * [$0094+$11] = $0098 - [$0094+$10]；$0097 = $0098；RTS。
   */
  private spriteOamBaseline(): void {
    const store = this.store;
    const ptr = store.readU16(0x0094);
    const cur = store.readByte(0x0098);
    store.writeByte(ptr + 0x11, (cur - store.readByte(ptr + 0x10)) & 0xff);
    store.writeByte(0x0097, cur);
  }

  /**
   * $9459: 场景命令 bit1 分支（逐指令对照 code_render.s $9459-$948C）。
   * $0099 bit6 置位（V 标志）→ 精灵构建：$00E6/$00E7 = cmdPtr[Y..Y+1]（Y = (($0099&1)<<1)|1，即 1 或 3）；
   *   buildSprite 后若 $0099 == $FE → [$0094] &= ~$02，cmdPtr += 5，回 $9224 主循环（advance=false）；
   *   否则 $0099 &= ~$40（V 清除）。
   * 最后 [$0094+1] = 1，JMP $94C1 行推进（advance=true）。
   * @returns advance=true 行推进；false 表示 cmdPtr 已更新需继续 $9224 主循环
   */
  private sceneCmd9459(bank: number, cmdPtr: number): { advance: boolean; cmdPtr: number } {
    const store = this.store;
    const ntPtr = store.readU16(0x0094);
    // $9459: BIT $0099; BVC $947A
    if ((store.readByte(0x0099) & 0x40) !== 0) {
      // $945D-$946B: Y = (($0099&1)<<1)|1; $00E6/$00E7 = cmdPtr[Y..Y+1]
      const y = ((store.readByte(0x0099) & 1) << 1) | 1;
      store.writeByte(0x00e6, this.rom.readByte(bank, (cmdPtr + y) & 0xffff));
      store.writeByte(0x00e7, this.rom.readByte(bank, (cmdPtr + y + 1) & 0xffff));
      // $946D: JSR $94D8
      this.buildSprite(bank);
      // $9470-$9474: CMP #$FE; BEQ $9482
      if (store.readByte(0x0099) === 0xfe) {
        // $9482-$9488: [$0094] &= ~$02
        store.writeByte(ntPtr, store.readByte(ntPtr) & 0xfd);
        // $948A: LDA #$05; JMP $94AE → cmdPtr += 5; JMP $9224
        return { advance: false, cmdPtr: (cmdPtr + 5) & 0xffff };
      }
      // $9476-$9478: $0099 &= ~$40
      store.writeByte(0x0099, store.readByte(0x0099) & 0xbf);
    }
    // $947A-$947D: [$0094+1] = 1
    store.writeByte(ntPtr + 1, 1);
    // $947F: JMP $94C1（行推进）
    return { advance: true, cmdPtr };
  }

  /**
   * $93A7: 精灵增量配置（$F7 命令，逐指令对照 code_render.s $93A7-$9427）。
   * v1 = cmdPtr[1]：
   *   [$0094+9] = v1>>5（bit2 置位 → |= $F8 符号扩展为负）
   *   [$0094+8] = bit2 置位 ? $80 : (v1>>4 & 1)<<7（ROR 进位来自第 5 次 LSR）
   *   [$0094+$0A] = bit2 置位 ? -cmdPtr[2] : cmdPtr[2]
   *   [$0094+$0D] = (v1&$0F)>>1（bit2 置位 → |= $F8）
   *   [$0094+$0C] = bit2 置位 ? $80 : (v1&1)<<7（ROR 进位来自末次 LSR）
   *   [$0094+$0E] = bit2 置位 ? -cmdPtr[3] : cmdPtr[3]
   *   [$0094+$0B] = 0; [$0094+$0F] = 0; [$0094] |= $20
   */
  private sceneVelConfig(bank: number, cmdPtr: number): void {
    const store = this.store;
    const ntPtr = store.readU16(0x0094);
    const v1 = this.rom.readByte(bank, (cmdPtr + 1) & 0xffff);
    // X 增量高位/低位（$93A7-$93DC）
    const x5 = (v1 >> 5) & 0x07;
    store.writeByte(ntPtr + 9, x5); // $93B0-$93B2
    if ((x5 & 4) !== 0) {
      store.writeByte(ntPtr + 9, x5 | 0xf8); // $93C7-$93CB
      store.writeByte(ntPtr + 8, 0x80); // $93CD-$93D1（ROR C=1）
      store.writeByte(ntPtr + 0x0a, (0x00 - this.rom.readByte(bank, (cmdPtr + 2) & 0xffff)) & 0xff); // $93D3-$93DC
    } else {
      store.writeByte(ntPtr + 8, ((v1 >> 4) & 1) << 7); // $93B8-$93BA（ROR C = v1 bit4）
      store.writeByte(ntPtr + 0x0a, this.rom.readByte(bank, (cmdPtr + 2) & 0xffff)); // $93BC-$93C2
    }
    // Y 增量高位/低位（$93DE-$9411）
    const y5 = ((v1 & 0x0f) >> 1) & 0x07;
    store.writeByte(ntPtr + 0x0d, y5); // $93E5-$93E7
    if ((y5 & 4) !== 0) {
      store.writeByte(ntPtr + 0x0d, y5 | 0xf8); // $93FC-$9400
      store.writeByte(ntPtr + 0x0c, 0x80); // $9402-$9406（ROR C=1）
      store.writeByte(ntPtr + 0x0e, (0x00 - this.rom.readByte(bank, (cmdPtr + 3) & 0xffff)) & 0xff); // $9408-$9411
    } else {
      store.writeByte(ntPtr + 0x0c, (v1 & 1) << 7); // $93ED-$93EF（ROR C = v1 bit0）
      store.writeByte(ntPtr + 0x0e, this.rom.readByte(bank, (cmdPtr + 3) & 0xffff)); // $93F1-$93F7
    }
    // $9413-$9423: [$0094+$0B] = 0; [$0094+$0F] = 0; [$0094] |= $20
    store.writeByte(ntPtr + 0x0b, 0);
    store.writeByte(ntPtr + 0x0f, 0);
    store.writeByte(ntPtr, store.readByte(ntPtr) | 0x20);
  }

  /**
   * $9224: 场景命令循环（逐指令对照 code_render.s $9224-$94BB，含 $92E5 跳转表）。
   * 命令流（$0092/$0093 指向当前 bank 数据）循环处理：
   *   <$80: [$0094+1] = cmd<<1; [$0094+2/+3] = cmdPtr+1; 行推进
   *   $80-$9F: buildSprite（流指针 = ((cmd+$20)<<8)|[cmdPtr+1]）; cmdPtr += 2
   *   $A0-$BF: cmdPtr = (cmd<<8)|[cmdPtr+1]
   *   $C0-$DF: 槽推入（$9268）：保存 cmdPtr+2 到 [$0094+$18+2*count]，cmdPtr = ((cmd-$20)<<8)|[cmdPtr+1]
   *   $E0-$EF: 循环槽推入（$92A0）：[$0094+$14+count] = cmd-$E0，保存 cmdPtr+1，cmdPtr += 1
   *   $F0-$FF: $92E5 跳转表（RTS+1 语义，目标 = 表项+1）：
   *     $F0 循环回跳（$9305）：递减 [$0094+count+$13]，未耗尽 → cmdPtr = [$0094+$16+2*count]；
   *        耗尽 → 槽计数-1，cmdPtr += 1
   *     $F1 X 增量 = [cmdPtr+1], Y 增量 = [cmdPtr+2]; cmdPtr += 3
   *     $F2 X 增量 = 常量 $4F; cmdPtr += 2
   *     $F3 Y 增量 = [cmdPtr+1]; cmdPtr += 2
   *     $F4 [$0094+1] = [cmdPtr+1]; cmdPtr += 2; [$0094+2/+3] = cmdPtr; 行推进
   *     $F5 [$0094] |= $40; cmdPtr += 1
   *     $F6 [$0094] &= ~$40; cmdPtr += 1
   *     $F7 精灵增量配置（$93A7）; cmdPtr += 4
   *     $F8 $0049 = [cmdPtr+1]; cmdPtr += 2
   *     $F9 [$0094] |= $10; cmdPtr += 1
   *     $FA [$0094] |= $02; $0099 = $C0; [$0094+2/+3] = cmdPtr; 落穿 $9459
   *     $FB/$FC/$FD 原版 JMP $948F 自循环死锁（游戏数据不使用）；H5 直接停止
   *     $FE 槽弹出（$9492）：槽计数-1，cmdPtr = [$0094+$18+2*(count-1)]
   *     $FF [$0094] = 0; 行推进
   * @returns true 表示已行推进（$94C1）
   */
  private sceneCmdLoop(bank: number, cmdPtr: number): boolean {
    const store = this.store;
    const rom = this.rom;
    for (;;) {
      const ntPtr = store.readU16(0x0094);
      const cmd = rom.readByte(bank, cmdPtr);
      if ((cmd & 0x80) === 0) {
        // $922A-$923E: [$0094+1] = cmd<<1; [$0094+2/+3] = cmdPtr+1; JMP $94C1
        store.writeByte(ntPtr + 1, (cmd << 1) & 0xff);
        const p = (cmdPtr + 1) & 0xffff;
        store.writeByte(ntPtr + 2, p & 0xff);
        store.writeByte(ntPtr + 3, (p >> 8) & 0xff);
        return true;
      }
      if (cmd < 0xa0) {
        // $9241-$9255: buildSprite（$00E7 = cmd+$20, $00E6 = [cmdPtr+1]）; cmdPtr += 2
        store.writeByte(0x00e7, (cmd + 0x20) & 0xff);
        store.writeByte(0x00e6, rom.readByte(bank, (cmdPtr + 1) & 0xffff));
        this.buildSprite(bank);
        cmdPtr = (cmdPtr + 2) & 0xffff;
        continue;
      }
      if (cmd < 0xc0) {
        // $9258-$9265: cmdPtr = (cmd<<8)|[cmdPtr+1]
        cmdPtr = ((cmd << 8) | rom.readByte(bank, (cmdPtr + 1) & 0xffff)) & 0xffff;
        continue;
      }
      if (cmd < 0xe0) {
        // $9268-$929C: 槽推入（原版 CMP #$03 BCS 自循环）
        const count = store.readByte(ntPtr + 0x13);
        if (count >= 3) return true;
        store.writeByte(ntPtr + 0x13, (count + 1) & 0xff);
        const saved = (cmdPtr + 2) & 0xffff;
        store.writeByte(ntPtr + 0x18 + count * 2, saved & 0xff);
        store.writeByte(ntPtr + 0x18 + count * 2 + 1, (saved >> 8) & 0xff);
        cmdPtr = (((cmd - 0x20) << 8) | rom.readByte(bank, (cmdPtr + 1) & 0xffff)) & 0xffff;
        continue;
      }
      if (cmd < 0xf0) {
        // $92A0-$92D4: 循环槽推入（原版 CMP #$04 BCS 自循环）
        const count = store.readByte(ntPtr + 0x13);
        if (count >= 4) return true;
        store.writeByte(ntPtr + 0x13, (count + 1) & 0xff);
        store.writeByte(ntPtr + 0x14 + count, cmd - 0xe0); // [$0094+$13+count+1] = cmd-$E0
        store.writeByte(ntPtr + 0x18 + count * 2, (cmdPtr + 1) & 0xff);
        store.writeByte(ntPtr + 0x18 + count * 2 + 1, ((cmdPtr + 1) >> 8) & 0xff);
        cmdPtr = (cmdPtr + 1) & 0xffff;
        continue;
      }
      // $F0-$FF: $92D7 跳转表分发（目标 = 表项+1）
      switch (cmd - 0xf0) {
        case 0: {
          // $F0 → $9305 循环回跳（原版 BEQ $9309 自循环）
          const count = store.readByte(ntPtr + 0x13);
          if (count === 0) return true;
          const idx = ntPtr + 0x13 + count;
          const val = (store.readByte(idx) - 1) & 0xff;
          store.writeByte(idx, val);
          if (val !== 0) {
            // $9319-$9326: cmdPtr = [$0094+$16+2*count]
            cmdPtr = store.readByte(ntPtr + 0x16 + count * 2) |
              (store.readByte(ntPtr + 0x16 + count * 2 + 1) << 8);
            continue;
          }
          // $932B-$9336: 槽计数-1; cmdPtr += 1
          store.writeByte(ntPtr + 0x13, (count - 1) & 0xff);
          cmdPtr = (cmdPtr + 1) & 0xffff;
          continue;
        }
        case 1:
          // $F1 → $9339: X 增量 = [cmdPtr+1], Y 增量 = [cmdPtr+2]; cmdPtr += 3
          this.writeShift16(4, rom.readByte(bank, (cmdPtr + 1) & 0xffff));
          this.writeShift16(6, rom.readByte(bank, (cmdPtr + 2) & 0xffff));
          cmdPtr = (cmdPtr + 3) & 0xffff;
          continue;
        case 2:
          // $F2 → $9350: X 增量 = 常量 $4F（跳转表低字节复用）；cmdPtr += 2
          this.writeShift16(4, 0x4f);
          cmdPtr = (cmdPtr + 2) & 0xffff;
          continue;
        case 3:
          // $F3 → $935E: Y 增量 = [cmdPtr+1]; cmdPtr += 2
          this.writeShift16(6, rom.readByte(bank, (cmdPtr + 1) & 0xffff));
          cmdPtr = (cmdPtr + 2) & 0xffff;
          continue;
        case 4:
          // $F4 → $936C: [$0094+1] = [cmdPtr+1]; cmdPtr += 2; [$0094+2/+3] = cmdPtr; 行推进
          store.writeByte(ntPtr + 1, rom.readByte(bank, (cmdPtr + 1) & 0xffff));
          cmdPtr = (cmdPtr + 2) & 0xffff;
          store.writeByte(ntPtr + 2, cmdPtr & 0xff);
          store.writeByte(ntPtr + 3, (cmdPtr >> 8) & 0xff);
          return true;
        case 5:
          // $F5 → $938D: [$0094] |= $40; cmdPtr += 1
          store.writeByte(ntPtr, store.readByte(ntPtr) | 0x40);
          cmdPtr = (cmdPtr + 1) & 0xffff;
          continue;
        case 6:
          // $F6 → $939A: [$0094] &= ~$40; cmdPtr += 1
          store.writeByte(ntPtr, store.readByte(ntPtr) & 0xbf);
          cmdPtr = (cmdPtr + 1) & 0xffff;
          continue;
        case 7:
          // $F7 → $93A7: 精灵增量配置; cmdPtr += 4
          this.sceneVelConfig(bank, cmdPtr);
          cmdPtr = (cmdPtr + 4) & 0xffff;
          continue;
        case 8:
          // $F8 → $942A: $0049 = [cmdPtr+1]; cmdPtr += 2
          store.writeByte(0x0049, rom.readByte(bank, (cmdPtr + 1) & 0xffff));
          cmdPtr = (cmdPtr + 2) & 0xffff;
          continue;
        case 9:
          // $F9 → $9435: [$0094] |= $10; cmdPtr += 1
          store.writeByte(ntPtr, store.readByte(ntPtr) | 0x10);
          cmdPtr = (cmdPtr + 1) & 0xffff;
          continue;
        case 10: {
          // $FA → $9442: [$0094] |= $02; $0099 = $C0; [$0094+2/+3] = cmdPtr; 落穿 $9459
          store.writeByte(ntPtr, store.readByte(ntPtr) | 0x02);
          store.writeByte(0x0099, 0xc0);
          store.writeByte(ntPtr + 2, cmdPtr & 0xff);
          store.writeByte(ntPtr + 3, (cmdPtr >> 8) & 0xff);
          const r = this.sceneCmd9459(bank, cmdPtr);
          if (r.advance) return true;
          cmdPtr = r.cmdPtr;
          continue;
        }
        case 11:
        case 12:
        case 13:
          // $FB/$FC/$FD → 原版 JMP $948F 自循环死锁；H5 直接停止
          return true;
        case 14: {
          // $FE → $9492 槽弹出（原版 BEQ 自循环）: 计数-1，cmdPtr = [$0094+$18+2*(count-1)]
          const count = store.readByte(ntPtr + 0x13);
          if (count === 0) return true;
          const nc = (count - 1) & 0xff;
          store.writeByte(ntPtr + 0x13, nc);
          cmdPtr = store.readByte(ntPtr + 0x18 + nc * 2) |
            (store.readByte(ntPtr + 0x18 + nc * 2 + 1) << 8);
          continue;
        }
        default:
          // $FF → $94BC: [$0094] = 0; 落穿 $94C1 行推进
          store.writeByte(ntPtr, 0);
          return true;
      }
    }
  }
}
