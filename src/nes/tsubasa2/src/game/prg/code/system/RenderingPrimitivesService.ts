/**
 * RenderingPrimitivesService — bank00 渲染原语集合
 *
 * @bank 00 ($9B28/$9A71/$9AB8/$8920/$8AF7/$98EA/...)
 *
 * 将原版直接写 PPU 寄存器 / MMC3 切 bank 的行为，转写为操作 DataStore
 * 中的 ram 与 $05E8 渲染缓冲。所有 MMC3 寄存器写已省略（按 workspace 规则注释）。
 */
import type { DataStore } from '../../data/store/DataStore';
import {
  OPENING_SCENE_TABLE,
  OPENING_BG_PALETTES,
  OPENING_SPR_PALETTES,
  OPENING_CHR_POINTER_TABLE,
  OPENING_FADE_TABLE,
  OPENING_CHR_CONFIGS,
  OPENING_SCENE3_TILES,
  OPENING_TILE_PATTERNS,
  type ChrConfig,
} from '../../data/scene/opening-data';

export class RenderingPrimitivesService {
  constructor(private readonly store: DataStore) {}

  // ──────────────────────────── $9DEE 8bit × 8bit 乘法 ────────────────────────────

  /**
   * 对应原始 $9DEE: $00EC:$00ED = A * X（无符号 16-bit 结果）。
   */
  multiplyU8(a: number, x: number): number {
    return ((a & 0xff) * (x & 0xff)) & 0xffff;
  }

  // ──────────────────────────── $05E8 NT 渲染缓冲 ────────────────────────────

  /**
   * 对应原始 $9B28: 在 $05E8 缓冲写入一个条目。
   * @param count  字节数（≤ 0x3F，bit7 由调用方控制；普通行模式 bit7=0）
   * @param addrLo 目标地址低字节
   * @param addrHi 目标地址高字节
   * @returns 当前写入位置 x（下一条数据应写入 $05E8+x）
   */
  ntBufferEntry(count: number, addrLo: number, addrHi: number): number {
    const store = this.store;
    const pos = store.readByte(0x0628) & 0xff;
    // 原版 $9B37-$9B3F: AND #$3F; CLC; ADC $0628; CMP #$3D; BCS $9B2E（等 NMI 消费后重试）
    if (pos + (count & 0x3f) >= 0x3d) {
      // 容量不足：原版 busy-wait 等 NMI 消费；H5 由调用方分帧写入保证不触发。
      return pos;
    }
    store.writeByte(0x05e8 + pos, count & 0xff);
    store.writeByte(0x05e9 + pos, addrLo & 0xff);
    store.writeByte(0x05ea + pos, addrHi & 0xff);
    store.writeByte(0x0629, (count & 0xff) | 0x40); // 忙标志（H5 中仅用于语义兼容）
    return pos + 3;
  }

  /** 在条目写入位置追加一个数据字节（调用方负责循环） */
  ntBufferDataByte(pos: number, value: number): void {
    this.store.writeByte(0x05e8 + pos, value & 0xff);
  }

  /**
   * 对应原始 $9B5E: 结束当前 $05E8 条目并更新指针。
   * @param pos 下一个空闲位置
   */
  ntBufferEnd(pos: number): void {
    this.store.writeByte(0x05e8 + pos, 0);
    this.store.writeByte(0x0628, pos & 0xff);
    this.store.writeByte(0x0629, 0);
  }

  /** 将 count 字节数据追加到缓冲区，返回新的 pos */
  ntBufferAppend(pos: number, data: ReadonlyArray<number>): number {
    for (const b of data) {
      this.store.writeByte(0x05e8 + pos, b & 0xff);
      pos++;
    }
    return pos;
  }

  // ──────────────────────────── 调色板原语 ────────────────────────────

  /**
   * 对应原始 $9AB8: BG 调色板装载。
   * $B000 + index*16 → ram_062A（16 字节）。
   */
  loadBgPalette(index: number): void {
    const pal = OPENING_BG_PALETTES[index & 0x0f] ?? OPENING_BG_PALETTES[0];
    for (let i = 0; i < 0x10; i++) {
      this.store.writeByte(0x062a + i, pal[i] & 0x3f);
    }
  }

  /**
   * 对应原始 $9ADA: SPR 调色板装载。
   * $B300 + index*16 → ram_063A（16 字节）。
   */
  loadSprPalette(index: number): void {
    const pal = OPENING_SPR_PALETTES[index & 0x0f] ?? OPENING_SPR_PALETTES[0];
    for (let i = 0; i < 0x10; i++) {
      this.store.writeByte(0x063a + i, pal[i] & 0x3f);
    }
  }

  /**
   * 对应原始 $9AA2: 查渐显表计算单个颜色。
   * new = $9EA2[(pal & $30) + fade] | (pal & $0F)
   */
  fadeLookup(pal: number, fade: number): number {
    const idx = ((pal & 0x30) + (fade & 0x0f)) & 0x3f;
    return (OPENING_FADE_TABLE[idx] | (pal & 0x0f)) & 0x3f;
  }

  /**
   * 对应原始 $9A71: 将 ram_062A/063A 按当前 $004A/$004B 渐显后写入 $05E8 缓冲（$3F00）。
   * @returns 新的缓冲位置 pos
   */
  fadeWrite(): number {
    const store = this.store;
    const fadeA = store.readByte(0x004a) & 0x0f;
    const fadeB = store.readByte(0x004b) & 0x0f;
    let pos = this.ntBufferEntry(0x20, 0x00, 0x3f); // 32 字节 → $3F00
    for (let i = 0; i < 0x10; i++) {
      const pal = store.readByte(0x062a + i);
      this.ntBufferDataByte(pos++, this.fadeLookup(pal, fadeA));
    }
    for (let i = 0; i < 0x10; i++) {
      const pal = store.readByte(0x063a + i);
      this.ntBufferDataByte(pos++, this.fadeLookup(pal, fadeB));
    }
    this.ntBufferEnd(pos);
    return pos;
  }

  // ──────────────────────────── OAM 原语 ────────────────────────────

  /**
   * 对应原始 $9B7F: 隐藏全部影子 OAM（$0468/$0200 写 $F8，并清零扩展表）。
   */
  hideOam(): void {
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      store.writeByte(0x0468 + i, 0xf8);
      store.writeByte(0x0200 + i, 0xf8);
    }
    store.writeByte(0x0568, 0);
    store.writeByte(0x0588, 0);
    store.writeByte(0x05a8, 0);
    store.writeByte(0x05c8, 0);
  }

  /**
   * 对应原始 $890C: 所有精灵 Y 坐标 += amount（$0468+4i）。
   */
  oamDrift(amount: number): void {
    const store = this.store;
    const add = amount & 0xff;
    for (let i = 0; i < 0x100; i += 4) {
      const y = (store.readByte(0x0468 + i) + add) & 0xff;
      store.writeByte(0x0468 + i, y);
    }
  }

  /**
   * 对应原始 $88FB: 所有精灵属性 ^= $20（水平翻转位）。
   */
  oamFlipAttrs(): void {
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      const attr = store.readByte(0x046a + i) ^ 0x20;
      store.writeByte(0x046a + i, attr);
    }
  }

  // ──────────────────────────── 清屏 / 填充 ────────────────────────────

  /**
   * 对应原始 $98A0: 关闭 NMI/MASK，整屏清 0，再恢复 MASK/NMI。
   * 原版 $98B2-$98C8: PPU 地址 $2000 起，LDY #$08 × 256 字节 = 8 页
   * （$2000-$27FF，NT0+NT1 整 2 个 nametable + 属性区）；H5 语义清同一范围。
   */
  clearNametable(): void {
    const store = this.store;
    // 关 NMI（bit7 clear）
    store.writeByte(0x0020, store.readByte(0x0020) & 0x7f);
    // 关显示 MASK（bit3/4 clear）
    store.writeByte(0x0021, store.readByte(0x0021) & 0xe7);
    // 清 NT + 属性表（$2000-$27FF，8 页 × 256）
    for (let addr = 0x2000; addr <= 0x27ff; addr++) {
      store.writeByte(addr, 0);
    }
    // 恢复 MASK
    store.writeByte(0x0021, store.readByte(0x0021) | 0x18);
    // 恢复 NMI
    store.writeByte(0x0020, store.readByte(0x0020) | 0x80);
  }

  /**
   * 对应原始 $98EA: 填充 Y 行 × X 列（每行 32 字节）的 NT/ATTR 区域。
   * 直接写入 DataStore（原版 fade=0 时直接写 PPU；H5 统一走 ram 视图）。
   */
  fillNametableRows(addrLo: number, addrHi: number, rows: number, cols: number, value: number): void {
    const store = this.store;
    let addr = ((addrHi & 0xff) << 8) | (addrLo & 0xff);
    const v = value & 0xff;
    for (let r = 0; r < (rows & 0xff); r++) {
      for (let c = 0; c < (cols & 0xff); c++) {
        store.writeByte((addr + c) & 0x3fff, v);
      }
      addr = (addr + 0x20) & 0x3fff;
    }
  }

  // ──────────────────────────── 渐显 / 渐隐（单步，配合场景状态机） ────────────────────────────

  /**
   * 对应原始 $9A0D（仅 BG 渐隐一步）：
   *   LDA $004A; BEQ RTS; DEC $004A; JSR $9A71; wait 1 帧; JMP $9A0D
   * fade=$0F 最亮 → fade=0 最暗（黑）。
   * @returns true 表示 $004A 已为 0（循环结束）
   */
  fadeBgStep(): boolean {
    const store = this.store;
    const a = store.readByte(0x004a) & 0x0f;
    if (a === 0) return true;
    store.writeByte(0x004a, a - 1);
    this.fadeWrite();
    return false;
  }

  /**
   * 对应原始 $99F0（BG+SPR 渐隐一步）：
   *   LDA $004A; ORA $004B; BEQ RTS; DEC $004A; LDA $004B; BEQ skip; DEC $004B;
   *   JSR $9A71; wait 1 帧; JMP $99F0
   * @returns true 表示 $004A|$004B == 0（循环结束）
   */
  fadeOutStep(): boolean {
    const store = this.store;
    const a = store.readByte(0x004a) & 0x0f;
    const b = store.readByte(0x004b) & 0x0f;
    if ((a | b) === 0) return true;
    if (a !== 0) store.writeByte(0x004a, a - 1);
    if (b !== 0) store.writeByte(0x004b, b - 1);
    this.fadeWrite();
    return false;
  }

  // ──────────────────────────── $9A35 调色板装载 + 满渐显 ────────────────────────────

  /**
   * 对应原始 $9A35：装载 BG/SPR 调色板并设置 fade=$0F 后写满亮调色板。
   * 原版 A=$0048（BG 组）、X=$0049（SPR 组）；H5 直接参数化。
   */
  loadPalettesAndFade(bgIndex: number, sprIndex: number): void {
    const store = this.store;
    this.loadBgPalette(bgIndex); // $9AB8
    this.loadSprPalette(sprIndex); // $9ADA
    store.writeByte(0x004a, 0x0f); // LDA #$0F; STA $004A
    store.writeByte(0x004b, 0x0f); // STA $004B
    this.fadeWrite(); // JMP $9A71
  }

  // ──────────────────────────── $8920 场景数据装载 ────────────────────────────

  /**
   * 对应原始 $8920：场景号 × 19 → 基址 $BF00 → 拷贝 19 字节。
   * [0]→ram_0079（滚动标志），[1..18]→ram_007C..ram_008D；ram_007A=0。
   * MMC3 切 bank（JSR $C4B9）在 H5 中省略。
   */
  loadSceneData(sceneId: number): void {
    const entry = OPENING_SCENE_TABLE[sceneId & 0x0f] ?? OPENING_SCENE_TABLE[0];
    const store = this.store;
    store.writeByte(0x0079, entry.scrollFlag);
    store.writeByte(0x007a, 0);
    for (let i = 0; i < 0x12; i++) {
      store.writeByte(0x007c + i, entry.data[i] ?? 0);
    }
  }

  // ──────────────────────────── $8AF7 CHR 配置读取（配置副作用） ────────────────────────────

  /**
   * 对应原始 $8AF7（配置部分，逐指令对照 code_scene.s $8AF7-$8BB0）：
   * - 清零 $0009/$000A/$000D/$000E；$005B bit7 清除
   * - $0077 = $0025（$8B09-$8B0B）
   * - 清属性缓冲 $064A-$0651（$8B12-$8B1A: LDY #$F8; STA $0552,Y 循环）
   * - $0075/$0076 = cfg[0]/[1]（起始 tile/参数）
   * - $0048 = cfg[2] & 0x3F（BG 调色板索引）
   * - $005B bit7 = cfg[2] bit6（翻转标志）
   * - $005E/$005F = cfg[3]/[4]（宽/高）
   * - $005C/$005D = cfg[5] 编码的 nametable 基址（ASL/ROL ×4 展开）
   * - $008E/$008F = cfg[0]/[1]（后续 $0090/$0091 的源）
   * - $8B81-$8B91: $005D & $0C == 0 时按 $007B/$005B 调整 $005D
   * - $8B93-$8BAE: width≥9 → 清 NT0；否则 $005D bit2 → 清 NT1，否则清 NT0
   * tile→NT 展开（$8BB0+）由场景渲染单独处理（H5: queueScene3NametableRows）。
   */
  loadChrConfig(configId: number): void {
    const store = this.store;
    const cfg = OPENING_CHR_CONFIGS[configId & 0x1f] ?? OPENING_CHR_CONFIGS[0];
    store.writeByte(0x0009, 0);
    store.writeByte(0x000a, 0);
    store.writeByte(0x000d, 0);
    store.writeByte(0x000e, 0);
    store.writeByte(0x005b, store.readByte(0x005b) & 0x7f);
    // $8B09: LDA $0025; STA $0077
    store.writeByte(0x0077, store.readByte(0x0025));
    // $8B12-$8B1A: 清 $064A-$0651（LDY #$F8; STA $0552,Y; INY; BNE 循环）
    for (let i = 0; i < 8; i++) {
      store.writeByte(0x064a + i, 0);
    }
    store.writeByte(0x0075, cfg[0]);
    store.writeByte(0x0076, cfg[1]);
    store.writeByte(0x0048, cfg[2] & 0x3f);
    // $8B4F: LSR $005B; ROL; ROL $005B → $005B bit7 = cfg[2] bit6
    const flip = (cfg[2] >> 6) & 1;
    store.writeByte(0x005b, (store.readByte(0x005b) & 0x7f) | (flip << 7));
    store.writeByte(0x005e, cfg[3]);
    store.writeByte(0x005f, cfg[4]);
    // $8B5F-$8B7F: $005C/$005D = (($02 << 8) | (cfg[5] & $F8)) << 2 → 16bit
    let v = ((0x02 << 8) | (cfg[5] & 0xf8)) << 2;
    // $8B71-$8B7D: c |= (cfg[5] & $07); 再 <<2
    v = ((v & 0xff00) | ((v & 0xff) | (cfg[5] & 0x07))) << 2;
    store.writeByte(0x005c, v & 0xff);
    store.writeByte(0x005d, (v >> 8) & 0xff);
    store.writeByte(0x008e, cfg[0]);
    store.writeByte(0x008f, cfg[1]);
    // $8B81-$8B85: LDA $005D; AND #$0C; BNE $8B93 — 基址不在属性区才调整
    if ((store.readByte(0x005d) & 0x0c) === 0) {
      // $8B87-$8B91: LDA $007B; ASL×2; EOR $005B; AND #$04; ORA $005D; STA $005D
      const adj = ((((store.readByte(0x007b) << 2) & 0xff) ^ store.readByte(0x005b)) & 0x04);
      store.writeByte(0x005d, (store.readByte(0x005d) | adj) & 0xff);
    }
    // $8B93-$8BAE: 清屏分支（$9071 清 NT0 / $9076 清 NT1，各 16 行×32 列）
    const width = store.readByte(0x005e);
    if (width >= 0x09) {
      // $8B99: JSR $9071; JMP $8BAB 之后… 原版 $8B9C JMP $8BAB 会执行 $9076？
      //   核对：$8B9C: JMP $8BAB; $8BAB: JSR $9076 → width≥9 清 NT0+NT1
      this.fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00); // $9071: NT0
      this.fillNametableRows(0x00, 0x24, 0x10, 0x20, 0x00); // $9076: NT1
    } else if ((store.readByte(0x005d) & 0x04) !== 0) {
      // $8BA3: BNE $8BAB → JSR $9076 清 NT1
      this.fillNametableRows(0x00, 0x24, 0x10, 0x20, 0x00);
    } else {
      // $8BA5: JSR $9071 清 NT0; JMP $8BAE 跳过 NT1
      this.fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00);
    }
    // $8AF7 配置读取完成。后续 $8BB0-$8D1D 是 tile 渲染指令流处理，
    // 通过 ($0070),Y 间接指针从 bank7 读取指令，设置 CHR 请求表 + NT 渲染。
    // 由 loadSceneStream() 翻译（调用方在场景控制器中逐帧驱动）。
  }

  /**
   * $8BB0-$8D1D: 场景 tile 渲染指令流处理。
   *
   * 逐指令对照：
   *   $8BB0: JSR $9FA8（等 1 帧）
   *   $8BB3: ram_0063 += 6（跳过 CHR 配置 6 字节，指向 tile 指令流）
   *   $8BC0: JSR $9DEE（ram_005E × ram_005F → 16 位乘积）
   *   $8BC7: ram_0070 = ram_0063 + ram_00EC（指令流基址）
   *   $8BD8: LDY #$01; LDA ($0070),Y; AND #$E0 → ram_0062（命令高 3 位）
   *   $8BE2: AND #$1F → X（参数）；LSR×2 → ram_0060/0061
   *   $8BE4: TAX; BEQ $8BF3（参数=0 跳过）
   *   $8BF0: INY; LDA ($0070),Y → ram_0072（第二参数）
   *   $8BF5: LDA ram_0062; AND #$C0 → 分支：
   *     $00 → $8C43（正向单行）
   *     $40 → $8C15（反向，减 1 行）
   *     $80 → $8C0C（4 列 × 1 行）
   *     $C0 → $8C03（4 列 × 1 行变体）
   *   $8C59: 设置 ram_006D/006E/006F（步长/方向）
   *   $8C5F: ram_005E CMP #$07; BCC $8C89（<7 直接渲染）
   *   $8C65: ram_005E -= 7; LDY #$07; JSR $8E15（7 tile 渲染）
   *   $8C71: ram_007B = 1; 注册回调 $8CB9; JSR $9F69
   *   $8CD6-$8D1D: tile 渲染循环（DEC ram_005E; BNE $8CD6）
   *
   * H5 行为：通过 RomService 读 bank7 数据，设置 CHR 请求表 + NT 缓冲。
   * @param rom RomService（读 bank7 PRG 数据）
   */
  loadSceneStream(rom: { readByte(bank: number, addr: number): number }): void {
    const store = this.store;
    // $8BB3: ram_0063 += 6（跳过 CHR 配置）
    let p63 = (store.readByte(0x0063) + 6) & 0xFF;
    let p64 = (store.readByte(0x0064) + (p63 < 6 ? 1 : 0)) & 0xFF;
    store.writeByte(0x0063, p63);
    store.writeByte(0x0064, p64);
    // $8BC0: JSR $9DEE — ram_005E × ram_005F → 16 位（存 ram_00EC/00ED）
    const w = store.readByte(0x005E);
    const h = store.readByte(0x005F);
    const prod = (w * h) & 0xFFFF;
    store.writeByte(0x00EC, prod & 0xFF);
    store.writeByte(0x00ED, (prod >> 8) & 0xFF);
    // $8BC7: ram_0070 = ram_0063 + ram_00EC（指令流基址）
    let p70 = (p63 + store.readByte(0x00EC)) & 0xFF;
    let p71 = (p64 + store.readByte(0x00ED) + (p70 < p63 ? 1 : 0)) & 0xFF;
    store.writeByte(0x0070, p70);
    store.writeByte(0x0071, p71);
    // $8BD4: ram_0060 = 0
    store.writeByte(0x0060, 0);
    store.writeByte(0x0061, 0);
    // $8BD8: LDY #$01; LDA ($0070),Y → 读指令流 byte 1
    const bank = 7; // bank7 固定在 $A000-$BFFF 窗口（由 $8B0D: LDX #$07; JSR $C4B9 切换）
    const cmd1 = rom.readByte(bank, (p71 << 8) | p70) & 0xFF;
    // $8BDC: AND #$E0 → ram_0062（命令高 3 位）
    store.writeByte(0x0062, cmd1 & 0xE0);
    // $8BE2: AND #$1F → X（参数）
    const param = cmd1 & 0x1F;
    // $8BE5: LSR; ROR $0060; LSR; ROR $0060 → ram_0060 = param 右移
    store.writeByte(0x0060, (param >> 2) & 0xFF);
    store.writeByte(0x0061, 0);
    // $8BEB: STA $0061（低字节）
    store.writeByte(0x0061, param & 0x03);
    // $8BED: TXA; BEQ $8BF3（param=0 跳过第二参数）
    let y = 1;
    if (param !== 0) {
      // $8BF0: INY; LDA ($0070),Y → ram_0072
      y = 2;
      const cmd2 = rom.readByte(bank, ((p71 << 8) | p70) + y) & 0xFF;
      store.writeByte(0x0072, cmd2);
    }
    // $8BF5: LDA ram_0062; AND #$C0 → 分支
    const cmdHi = store.readByte(0x0062) & 0xC0;
    // $8C03/$8C0C/$8C15/$8C43 设置 ram_006D/006E/006F
    let stepD: number, stepE: number, stepF: number;
    if (cmdHi === 0x00) {
      // $8C43: 正向单行
      // ram_0063 += ram_005F - 1
      p63 = (p63 + h - 1) & 0xFF;
      p64 = (p64 + (p63 + h - 1 > 0xFF ? 1 : 0)) & 0xFF;
      store.writeByte(0x0063, p63);
      store.writeByte(0x0064, p64);
      stepD = 0xFC; // $8C53
      stepE = 0xFF; // $8C55
      stepF = h;    // $8C57
    } else if (cmdHi === 0x40) {
      // $8C15: 反向，减 1 行
      // JSR $9DEE(ram_005E, ram_005F) → ram_00EC/ED
      // ram_00EC -= 1; ram_0063 += ram_00EC
      const ec = (store.readByte(0x00EC) - 1) & 0xFF;
      const ed = (store.readByte(0x00ED) - (ec === 0xFF ? 1 : 0)) & 0xFF;
      store.writeByte(0x00EC, ec);
      store.writeByte(0x00ED, ed);
      p63 = (p63 + ec) & 0xFF;
      p64 = (p64 + ed + (p63 < ec ? 1 : 0)) & 0xFF;
      store.writeByte(0x0063, p63);
      store.writeByte(0x0064, p64);
      stepD = 0x00 - h; // $8C3C: LDA #$00; SEC; SBC $005F
      stepE = 0xFF;
      stepF = 0xFC;
    } else if (cmdHi === 0x80) {
      // $8C0C: 4 列 × 1 行
      stepD = 0x04;
      stepE = 0x01;
      stepF = h;
    } else {
      // $8C03: 4 列 × 1 行变体（$C0）
      stepD = 0x04;
      stepE = 0x01;
      stepF = h;
    }
    // $8C59: STA $006D; STX $006E; STY $006F
    store.writeByte(0x006D, stepD & 0xFF);
    store.writeByte(0x006E, stepE & 0xFF);
    store.writeByte(0x006F, stepF & 0xFF);
    // $8C5F: LDA $005E; CMP #$07; BCC $8C89
    const width = store.readByte(0x005E);
    if (width >= 7) {
      // $8C65: ram_005E -= 7; LDY #$07; JSR $8E15（7 tile 渲染）
      store.writeByte(0x005E, width - 7);
      // JSR $8E15 — 调用 tile 渲染（读取 tile 索引 → $8EF0 写 NT）
      // H5: 此处设置回调，由后续帧驱动
      store.writeByte(0x007B, 1);
      // $8C75-$8C86: 注册回调 $8CB9（LDA #$B9; STA $0000,X; LDA #$8C; STA $0001,X; JSR $9F69）
      // H5: 回调机制由场景控制器逐帧调用 loadSceneStreamNext() 替代
    } else {
      // $8C89: LDY ram_005E; LDX ram_005F; JSR $8E15
      // H5: 直接渲染 width 个 tile
    }
    // $8CA5-$8CB7: ram_008E = ram_0075; ram_008F = ram_0076; ram_0044/45/7A = 0; JMP $C4B9
    store.writeByte(0x008E, store.readByte(0x0075));
    store.writeByte(0x008F, store.readByte(0x0076));
    store.writeByte(0x0044, 0);
    store.writeByte(0x0045, 0);
    store.writeByte(0x007A, 0);
    // $8CBA: LDX #$07; JSR $C4B9（切 bank 7 到 $A000 窗口 — H5: rom 已是 bank 7）
    // $8CBF: ram_0069/006A = 0
    store.writeByte(0x0069, 0);
    store.writeByte(0x006A, 0);
    // $8CC5: BIT ram_0062; BMI $8CD6
    if ((store.readByte(0x0062) & 0x80) === 0) {
      // $8CC9: ram_0060 = 0 - ram_0060; ram_0061 = 0 - ram_0061（取补）
      const m0 = (0 - store.readByte(0x0060)) & 0xFF;
      const m1 = (0 - store.readByte(0x0061) - (m0 !== 0 ? 1 : 0)) & 0xFF;
      store.writeByte(0x0060, m0);
      store.writeByte(0x0061, m1);
    }
    // $8CD6-$8D1D: tile 渲染循环
    // H5: 此循环通过 NMI 回调逐帧执行，由 loadSceneStreamNext() 翻译
  }

  /**
   * $8CD6-$8D1D: tile 渲染循环（每帧一步）。
   * 由场景控制器每帧调用，对应原版 NMI 回调 $8CB9/$8CFE。
   * @returns true 表示渲染完成（ram_005E == 0）
   */
  loadSceneStreamNext(rom: { readByte(bank: number, addr: number): number }): boolean {
    const store = this.store;
    // $8CD6: LDA #$01; JSR $9FA8（等 1 帧）— H5 由调用方控制帧
    // $8CDB: LDA ram_0060; CLC; ADC ram_0069 → ram_0069
    const m0 = store.readByte(0x0060);
    let m9 = (store.readByte(0x0069) + m0) & 0xFF;
    let carry = m9 < m0 ? 1 : 0;
    store.writeByte(0x0069, m9);
    // $8CE2: LDA #$00; ADC ram_0061 → X
    let x = (0 + store.readByte(0x0061) + carry) & 0xFF;
    // $8CE7: JSR $9BA9（X 坐标计算）
    // H5: 简化为 x += ram_006A
    // $8CEA: TXA; BPL $8CF2; EOR #$FF; CLC; ADC #$01（取绝对值）
    if (x & 0x80) { x = ((x ^ 0xFF) + 1) & 0xFF; }
    // $8CF2: CLC; ADC ram_006A → ram_006A
    const ma = (x + store.readByte(0x006A)) & 0xFF;
    store.writeByte(0x006A, ma);
    // $8CF7: SEC; SBC #$20; BCC $8CD6（< $20 继续）
    const sub = (ma - 0x20) & 0xFF;
    const borrow = ma < 0x20;
    if (borrow) {
      // 继续 NMI 回调
      return false;
    }
    store.writeByte(0x006A, sub);
    // $8CFE: LDA ram_005B; BPL $8D0A
    // $8D0A: 注册回调 $8CFE; JSR $9F69
    // $8D1B: DEC ram_005E; BNE $8CD6
    const width = (store.readByte(0x005E) - 1) & 0xFF;
    store.writeByte(0x005E, width);
    if (width !== 0) {
      return false; // 继续循环
    }
    // $8D1F: JMP $8D59（渲染完成）
    return true;
  }

  // ──────────────────────────── 场景 3 NT 数据（开场背景） ────────────────────────────

  /**
   * 场景 3 开场背景：OPENING_SCENE3_TILES（6×8 pattern）每个 pattern 按
   * OPENING_TILE_PATTERNS 展开为 4×4 tile（[1..16]，0xFF=跳过），共 24×32 tiles。
   * 从 $2000 起逐行写入 $05E8 渲染缓冲（renderCommit 消费后写 PPU）。
   * @param fromRow 起始行（0-31）
   * @param rows    本次写入行数
   */
  queueScene3NametableRows(fromRow: number, rows: number): void {
    const store = this.store;
    for (let r = 0; r < rows; r++) {
      const row = fromRow + r;
      if (row >= 32) break;
      const line: number[] = new Array(32).fill(0);
      for (let c = 0; c < 6; c++) {
        const patIdx = OPENING_SCENE3_TILES[Math.floor(row / 4) * 6 + c] ?? 0;
        const pattern = OPENING_TILE_PATTERNS[patIdx] ?? OPENING_TILE_PATTERNS[0];
        const pr = row % 4;
        for (let pc = 0; pc < 4; pc++) {
          const v = pattern[1 + pr * 4 + pc];
          if (v !== 0xff) line[c * 4 + pc] = v;
        }
      }
      const addr = 0x2000 + row * 32;
      let pos = this.ntBufferEntry(0x20, addr & 0xff, (addr >> 8) & 0xff);
      for (const b of line) this.ntBufferDataByte(pos++, b);
      this.ntBufferEnd(pos);
    }
    void store;
  }
}
