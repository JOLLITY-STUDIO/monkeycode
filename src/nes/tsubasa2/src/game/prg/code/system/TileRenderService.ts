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
    void jumpBack; // 原版属性写入后直接继续主循环
  }
  // $8FCB: LDX #$07; JSR $C4B9; RTS（恢复 bank 7 — H5 省略）
}

  /**
   * $9071: 清 NT0（$2000 起 $0400）。
   * TODO: 逐指令覆盖实现。
   */
  clearNt0(): void {
    void this.store;
  }

  /**
   * $9076: 清 NT1（$2400 起 $0400）。
   * TODO: 逐指令覆盖实现。
   */
  clearNt1(): void {
    void this.store;
  }

  /**
   * $9085: 场景数据流装载。
   * 读 $004D/$004E 指针流（行数据），逐行填充 NT 到 $0094/$0095。
   * TODO: 逐指令覆盖实现（$978B 常量行模板 + $0025 调色板合并）。
   */
  loadSceneStream(): void {
    void this.store;
  }

  /**
   * $9143: 流解析主循环。
   * 逐命令处理场景流（$92E6 跳转表 12 项：tile/属性/跳转/精灵等）。
   * TODO: 逐指令覆盖实现（命令分发 VM）。
   */
  sceneStreamNext(): void {
    void this.store;
  }

  /**
   * $94D8: 精灵构建。
   * 精灵数据流 → OAM $0468（Y/X/属性/图案），含翻转与相对坐标。
   * TODO: 逐指令覆盖实现（$95E5 跳转表）。
   */
  buildSprite(): void {
    void this.store;
  }
}
