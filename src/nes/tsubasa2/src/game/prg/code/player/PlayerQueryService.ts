/**
 * PlayerQueryService — 球员/队伍数据查询 + 选项屏幕管理
 * @bank 01 ($A000-$BFFF 窗口)
 *
 * 9 路入口跳板:
 *   entry0 $A01E 球员数据处理 (查能力值/建立阵容)
 *   entry1 $A10D 数据/选项屏幕初始化
 *   entry2 $A4EB PPU 图形数据显示   (TODO)
 *   entry3 $A64C NT 屏幕内容绘制    (TODO)
 *   entry4 $A6D2 PPU 属性块写入     (TODO)
 *   entry5 $AFC2 字符数据解码/显示  (TODO)
 *   entry6 $AF79 VRAM 缓冲区写入 1
 *   entry7 $AF8A VRAM 缓冲区写入 2
 *   entry8 $B050 Bank 切换 + 数据加载
 *   entry9 $A39B 球队数据初始化
 *
 * 数值显示链路: ROM 编码值 → LOOKUP_16BIT 查表 → 真实数值
 * → $8C55 循环除10 (16bit除法) → 余数+0x33=tile_id → 写 ram_04A8 PPU Buffer。
 */
import { DataStore } from '../../data/store/DataStore';
import {
  STAMINA_TABLE_16BIT,
  PLAYER_STAT_TABLE_16BIT,
} from '../../data/tables/player-table';

export class PlayerQueryService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  // ============================================================
  // entry0 球员数据处理 (原 $A01E)
  // ============================================================

  /**
   * 球员数据查询 (entry0 $A01E)。按 playerId 在阵容区查能力值/建立阵容数据。
   *
   * 对应原始 $A01E: 读取 $0448/$0026/$0446/$044D/$00E1 组合出队形,
   * 遍历 10 名球员建立 $0656 区阵容, 计算球员实际能力 ($0454 经验区)。
   *
   * 参数: playerId = 球员索引; field = 能力字段 (0=体力/其余查能力表)。
   * 返回: 该字段查表后的真实数值。
   */
  queryPlayer(playerId: number, field: number): number {
    // $A01E: LDA $0448; LSR; LDA $0026; ROL ... 队形标记组合
    // 这里按字段类型走查表链路。
    const enc = this._readPlayerStat(playerId, field);
    // 体力字段 (16bit) 用 STAMINA_TABLE_16BIT; 其他字段用能力表。
    if (field === 0) {
      return this._lookupValue16(enc);
    }
    return enc;
  }

  /** 读阵容区 $0656+ 球员原始编码 (与原 $A438 段语义对应, 见 code_main.s) */
  protected _readPlayerStat(playerId: number, field: number): number {
    // 阵容数据区 $0656 起, 每名球员 2 字节编码 (参照 $A438 读取逻辑)。
    const base = 0x0656 + playerId * 2;
    const v = this._store.read(`ram_${base.toString(16).toUpperCase().padStart(4, '0')}`);
    switch (field & 0x03) {
      case 0: // 高位能力 (A 类)
        return (v >> 6) & 0x03;
      case 1: // 体力/组合值
        return (v >> 4) & 0x0f;
      case 2: // 中位
        return (v >> 2) & 0x0f;
      default: // 低位
        return v & 0x03;
    }
  }

  // ============================================================
  // entry1 数据/选项屏幕初始化 (原 $A10D)
  // ============================================================

  /**
   * 选项屏幕初始化 (entry1 $A10D)。
   *
   * 对应原始 $A10D: 清空 $0566-$0656 区, 建立阵容显示指针,
   * 循环调用 $88CA 字符显示写标题, 载入队伍数据, 进入选项菜单状态机。
   */
  initOptionScreen(): void {
    // $A10D: JSR $9BA0 (清屏, 跨 bank)
    // $8110: 清空 $0566-$0656
    for (let i = 0x0566; i < 0x0656; i++) {
      this._store.write(`ram_${i.toString(16).toUpperCase().padStart(4, '0')}`, 0);
    }
    // $811A: 设置滚动/显存控制 (原 $9B6F/$9B74)
    // $812A: 初始化文本光标 $008E/$008F
    this._store.write('ram_008E', 0);
    this._store.write('ram_008F', 0x2e);
    // $8136: JSR $8920 初始化 PPU 缓冲
    this._ppuBufAlloc();
    // $813B-$817D: 标题字符循环 (写 ram_04A8 PPU Buffer)
    this._drawTitleChars();
    // $817D: 拷贝 $B205 起始数据到 $0460 (跨 bank 数据载入)
    // $818F: JSR $997A 清背景
    // $8196: 设置 PPU 写入控制 $004C / 状态 $0700
    this._store.write('ram_004C', 0x8a);
    this._store.write('ram_0700', 0x33);
    // $81A1: 进入选项菜单更新状态机
    this._optionScreenUpdate();
  }

  /** 标题字符循环 (原 $813B-$817B, 5 行 × 13 字符) */
  protected _drawTitleChars(): void {
    const e6 = 0x6ebc; // 字符源指针 (原 $00E6/$00E7 = $BC6E)
    let col = 0; // $00EC
    let row = 5; // $00EB
    let dst = 0x21c4; // $00E8/$00E9 = $21C4
    while (row > 0) {
      let n = 0x0d; // $00ED 每行字符数
      while (n > 0) {
        const ch = this._store.read(`ram_${(e6 + col).toString(16).toUpperCase().padStart(4, '0')}`);
        this._charDisplay(ch, dst & 0xffff, 0x22);
        dst += 2;
        col++;
        n--;
      }
      dst = ((dst + 0x26) & 0xffff) | (dst & 0xffff0000);
      row--;
    }
  }

  // ============================================================
  // 选项菜单状态机 (entry1 内, 原 $A1A6 起)
  // ============================================================

  /** 选项菜单更新 (原 $A1A6 起的循环) */
  protected _optionScreenUpdate(): void {
    // $A1A6: LDA #$01; JSR $9FA8 (等待帧); JSR $A3D0 (光标)
    // $A1AE: BIT $001E 检查按键...
    // 状态机整体尚未完成翻译, 此处保留入口供后续逐段覆盖。
    this._optionScreenPoll();
  }

  /**
   * 按键轮询 (原 $A1AE-$A3D0 按键状态机)。
   * asm $81AE: BIT $001E; BPL→JMP $A260; BVC→JMP $A231;
   *   AND #$20; BEQ; JMP $A252; AND #$10; BEQ; JMP $A26C;
   *   AND #$0F; BEQ $81A6 (无按键→回循环);
   *   LDY #$14; STY $00EA; LDX $00EC; LDA $B1E8,X; JSR $A4D8;
   *   读 $001C AND #$0F → TAX; LDA $B2ED,X; 按方向调整光标;
   *   JMP $A201 (光标更新)
   */
  protected _optionScreenPoll(): void {
    const input = this._store.read('ram_001E');
    const input1C = this._store.read('ram_001C');
    // $81AE: BIT $001E; BPL $81B5 (bit7=A键)
    if ((input & 0x80) !== 0) {
      // JMP $A260 — A键确认
      this._confirmSelection();
      return;
    }
    // $81B2: BVC $81BA (bit6=B键)
    if ((input & 0x40) === 0) {
      // JMP $A231 — B键取消
      this._cancelSelection();
      return;
    }
    // $81BA: AND #$20 (Select)
    if ((input & 0x20) !== 0) {
      // JMP $A252 — Select
      this._selectPressed();
      return;
    }
    // $81C3: AND #$10 (Start)
    if ((input & 0x10) !== 0) {
      // JMP $A26C — Start
      this._startPressed();
      return;
    }
    // $81CC: AND #$0F; BEQ $81A6 (方向键无→回循环)
    const dir = input1C & 0x0F;
    if (dir === 0) return;
    // $81D0: LDY #$14; STY $00EA; LDX $00EC; LDA $B1E8,X; JSR $A4D8
    this._store.write('ram_00EA', 0x14);
    // $81DD: LDA $001C; AND #$0F; TAX; LDA $B2ED,X
    // 方向键调整光标位置
    this._moveCursor(dir);
  }

  /** $A260: A键确认 */
  protected _confirmSelection(): void {
    this._store.write('ram_0700', 0x33);
  }

  /** $A231: B键取消 */
  protected _cancelSelection(): void {
    this._store.write('ram_0700', 0x33);
  }

  /** $A252: Select键 */
  protected _selectPressed(): void {
    void 0;
  }

  /** $A26C: Start键 */
  protected _startPressed(): void {
    void 0;
  }

  /** $A201: 方向键移动光标 */
  protected _moveCursor(dir: number): void {
    const ec = this._store.read('ram_00EC');
    // LDA $B2ED,X — 方向偏移表
    let offset = 0; // ROM stub
    let newPos = (ec + offset) & 0xFF;
    if (newPos >= 0x41) newPos = (newPos - 0x41) & 0xFF;
    this._store.write('ram_00EC', newPos);
    void dir;
  }

  // ============================================================
  // 数值显示链路: LOOKUP_16BIT 查表 (原 $B045/$B02E)
  // ============================================================

  /**
   * 查 LOOKUP_16BIT 表取数值 (原 $B045):
   *   ASL; TAX; LDA $BA90,X; TAY; LDA $BA91,X → 16bit(lo/hi)。
   * 表以 16bit 小端存, 字节偏移 = index*2, 故数组按 index 直接取。
   */
  protected _lookupValue16(index: number): number {
    const i = index & 0xff;
    if (i < STAMINA_TABLE_16BIT.length) {
      return STAMINA_TABLE_16BIT[i];
    }
    return 0;
  }

  /**
   * 从表尾向前查表求索引 (原 $B02E):
   *   LDX #$80 起步, DEX×2 每次递减 2 (字节偏移), 比对 16bit,
   *   找到第一个 <= 目标值的位置, 返回 idx = X>>1。
   */
  protected _lookupIndex16(value: number): number {
    let x = 0x80;
    do {
      x -= 2;
      const i = x >> 1;
      if (i < STAMINA_TABLE_16BIT.length && value <= STAMINA_TABLE_16BIT[i]) {
        return i;
      }
    } while (x > 0);
    return 0;
  }

  /**
   * 读 $0454 经验值区 16bit (原 $B016):
   *   LDA $0026 → 查表后索引; 读 $0454+X 16bit; 返回 Y=lo/X=hi。
   */
  protected _query16(idx: number): number {
    const x = (idx & 0x0f) * 2;
    return this._store.read16(`ram_${(0x0454 + x).toString(16).toUpperCase().padStart(4, '0')}`);
  }

  /** 提取能力字段 (原 $8464, 阵容 16bit 编码拆位) */
  protected _extractStatField(v: number): number {
    return v & 0x3f;
  }

  // ============================================================
  // PPU 缓冲 / 字符显示辅助 (原 $997A/$8920/$88CA 等)
  // ============================================================

  /**
   * PPU 缓冲分配 (原 $997A, bank00 跨 bank 调用)。
   * asm $997A: 设 ram_04A8 PPU Buffer 区, 分配写入槽。
   * 复用 GameSystemService.ppuBufAlloc 语义。
   */
  protected _ppuBufAlloc(): void {
    // bank00 $997A = PPU buffer 分配, H5 版由 GameSystemService 管理
    // 此处为 bank01 侧入口, 实际由外部帧合成器消费
  }

  /**
   * PPU 缓冲结束 (原 $997E, bank00 跨 bank 调用)。
   * asm $997E: 写终止符到 PPU Buffer。
   */
  protected _ppuBufEnd(): void {
    // bank00 $997E = PPU buffer 结束标记
  }

  /**
   * 字符显示 (原 $88CA, 双 tile 字符映射)。
   * asm $88CA: 查 CHAR_MAP_DOUBLE 表, 写 2 个 tile 到 PPU buffer。
   * 每个 8×16 字符 = 2 个 8×8 tile (上/下)。
   */
  protected _charDisplay(ch: number, dst: number, bank: number): void {
    // bank00 $88CA: 查字符映射表, 写双 tile 到 ram_04A8
    // H5 版: 由 GameSystemService.writeNTByte 写 NT
    // 简化: 直接写 tile 值到 NT
    void bank;
    const tileBase = ch & 0x3F;
    this._store.write('ram_04A8', tileBase);
    void dst;
  }

  /**
   * PPU 块填充 (原 $9895, bank00 跨 bank 调用)。
   * asm $9895: 用 tile 填充 NT 区域 (dst, count)。
   */
  protected _ppuBlockFill(tile: number, dst: number, count: number): void {
    // bank00 $9895 = NT 块填充
    // H5 版: 简化为写 NT 区
    for (let i = 0; i < count; i++) {
      void (dst + i);
      void tile;
    }
  }

  /** 读字节 (原 $C527 查表) */
  protected _r8(v: number): number {
    return v & 0xff;
  }

  // ============================================================
  // 剩余入口 stub (entry2-entry9)
  // ============================================================

  /**
   * entry2 PPU 图形数据显示 (原 $A4EB = $84EB)。
   * asm $84EB: LDX #$6A; LDY #$6B; JSR $9B6F (设滚动);
   *   LDX #$7A; LDY #$7B; JSR $9B74; JSR $9B7F (清精灵);
   *   LDY #$05; LDX #$B3; JSR $B0C0 (设CHR bank);
   *   清 $0044/$0045; 拷贝 $B271+Y → $039C+Y (Y=$CC-$FF);
   *   查 $BCD1 表 (队伍→阵型), 算 $BCF3/$BD64 指针;
   *   JSR $9D27 (写队名); JSR $9D50 (写阵型名);
   *   JSR $A63C (写数字到 NT); 设 $00E8/$00E9 PPU 地址;
   *   循环写球员数据到屏幕
   */
  entry2_PpuGraphics(): void {
    // $84EB: LDX #$6A; LDY #$6B; JSR $9B6F (设滚动, bank00)
    this._store.write('ram_006A', 0);
    this._store.write('ram_006B', 0);
    // $84F9: JSR $9B7F (清精灵, bank00)
    // $84FC: LDY #$05; LDX #$B3; JSR $B0C0 (CHR bank 切换)
    this._store.write('ram_0044', 0);
    this._store.write('ram_0045', 0);
    // $8509: 拷贝 $B271+Y → $039C+Y (Y=$CC起, 循环到 Y=0)
    for (let y = 0xCC; y <= 0xFF; y++) {
      this._store.write(`ram_${(0x039C + y).toString(16).toUpperCase().padStart(4, '0')}`, 0);
    }
    // $8514: LDX $0026; LDA $BCD1,X (查队伍表)
    const teamId = this._store.read('ram_0026');
    // AND #$F0; LSR×3 → 高4位÷8
    const hi = (teamId & 0xF0) >> 3;
    // $851F: LDY $BCF3,X; LDA $BCF4,X; TAX; JSR $9D27
    // $8529: LDX $0026; LDA $BCD1,X; AND #$0F; ASL; TAX
    const lo = (teamId & 0x0F) << 1;
    // $8532: LDY $BD64,X; LDA $BD65,X; TAX (查阵型指针)
    // $8539: LDA #$07; STA $00E8; LDA #$22; STA $00E9 (PPU 地址 $2207)
    this._store.write('ram_00E8', 0x07);
    this._store.write('ram_00E9', 0x22);
    // $8541: JSR $9D50 (写阵型名到 NT)
    // $8544: LDA $002A; LDY #$D0; LDX #$21; JSR $A63C (写数字)
    void hi; void lo;
  }

  /**
   * entry3 NT 屏幕内容绘制 (原 $A64C = $864C)。
   * asm $864C: JSR $98A0 (清NT); JSR $9B7F (清精灵);
   *   LDX $0026; LDA $B393,X; JSR $8464; JSR $82A9;
   *   LDA #$01; JSR $8920 (PPU buffer);
   *   LDY #$D0; LDX #$AD; JSR $9C3A; JSR $9BE8;
   *   LDY #$73; LDX #$A6; JMP $9C28
   */
  entry3_ScreenDraw(): void {
    // $864C: JSR $98A0 (清NT, bank00)
    // $864F: JSR $9B7F (清精灵, bank00)
    // $8652: LDX $0026; LDA $B393,X (查队伍标题)
    const teamId = this._store.read('ram_0026');
    void teamId;
    // $8657: JSR $8464; JSR $82A9 (设文本指针)
    // $865D: LDA #$01; JSR $8920 (PPU buffer 分配)
    // $8662: LDY #$D0; LDX #$AD; JSR $9C3A; JSR $9BE8
    // $866C: LDY #$73; LDX #$A6; JMP $9C28
  }

  /**
   * entry4 PPU 属性块写入 (原 $A6D2 = $86D2)。
   * asm $86D2: LDA #$55; STA $0700; JSR $98A0 (清NT);
   *   JSR $9B7F (清精灵); LDX $0026; LDA $B3B5,X; JSR $8464;
   *   JMP $A6F9 (后续绘制)
   */
  entry4_AttrBlock(): void {
    // $86D2: LDA #$55; STA $0700
    this._store.write('ram_0700', 0x55);
    // $86D7: JSR $98A0 (清NT, bank00)
    // $86DA: JSR $9B7F (清精灵, bank00)
    // $86DD: LDX $0026; LDA $B3B5,X; JSR $8464 (设文本)
    const teamId = this._store.read('ram_0026');
    void teamId;
    // $86E5: JMP $A6F9 (后续绘制流程)
  }

  /**
   * entry5 字符数据解码/显示 (原 $AFC2 = $8FC2)。
   * asm $8FC2: STX $00EC; JSR $B023; STA $00EB;
   *   AND #$F0; LSR; CLC; ADC $00EC; TAX;
   *   LDA $BA1C,X; TAX (查表);
   *   LDA $0026; ASL; TAY; LDA $BA4D,Y; STA $00ED;
   *   LDA $BA4C,Y; ROR $00ED; LSR; ROR $00ED (16→10位变换);
   *   循环写球员数据
   */
  entry5_CharDecode(): void {
    // $8FC2: STX $00EC (存索引)
    const ec = this._store.read('ram_00EC');
    // $8FC4: JSR $B023 (查表, 返回 A)
    // $8FC7: STA $00EB; AND #$F0; LSR; CLC; ADC $00EC; TAX
    const eb = 0; // stub: $B023 返回值
    this._store.write('ram_00EB', eb);
    const x = ((eb & 0xF0) >> 1) + ec;
    // $8FD0: LDA $BA1C,X; TAX (查字符表)
    // $8FD4: LDA $0026; ASL; TAY (队伍×2)
    const teamId = this._store.read('ram_0026');
    const y = (teamId << 1) & 0xFF;
    // $8FD8: LDA $BA4D,Y; STA $00ED; LDA $BA4C,Y; ROR $00ED; LSR; ROR $00ED
    void x; void y;
  }

  /**
   * entry6 VRAM 缓冲区写入 1 (原 $AF79 = $8F79)。
   * asm $8F79: LDA $0026; ASL; TAX; LDA $BA4C,X; STA $00E6;
   *   LDA $BA4D,X; STA $00E7; JMP $AF9E (跳到 entry5 内部)
   */
  entry6_VramBuf1(): void {
    // $8F79: LDA $0026; ASL; TAX
    const teamId = this._store.read('ram_0026');
    const x = (teamId << 1) & 0xFF;
    // $8F7D: LDA $BA4C,X; STA $00E6; LDA $BA4D,X; STA $00E7
    // (查 $BA4C 表设数据指针 $00E6/$00E7)
    void x;
    // $8F87: JMP $AF9E (跳到 entry5 内部继续)
  }

  /**
   * entry7 VRAM 缓冲区写入 2 (原 $AF8A = $8F8A)。
   * asm $8F8A: LDA $0026; ASL; TAX; LDA $BA4C,X; STA $00E6;
   *   LDA $BA4D,X; LSR; ROR $00E6; LSR; ROR $00E6; STA $00E7;
   *   (16位指针右移2位 = ÷4)
   *   LDX #$00; 循环: LDA $0454,X; CLC; ADC $00E6; STA $0454,X;
   *   LDA $0455,X; ADC $00E7; STA $0455,X; INX×2; CPX #$08; BNE
   */
  entry7_VramBuf2(): void {
    // $8F8A: LDA $0026; ASL; TAX
    const teamId = this._store.read('ram_0026');
    const x = (teamId << 1) & 0xFF;
    // $8F8E: LDA $BA4C,X; STA $00E6; LDA $BA4D,X; LSR; ROR $00E6; LSR; ROR $00E6; STA $00E7
    // (16位指针 ÷4 → $00E6/$00E7)
    void x;
    // $8FA0: LDX #$00; 循环 8 次: 读 $0454+X, 加 $00E6, 写回
    for (let i = 0; i < 4; i++) {
      const addr = 0x0454 + i * 2;
      const lo = this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
      const hi = this._store.read(`ram_${(addr + 1).toString(16).toUpperCase().padStart(4, '0')}`);
      // CLC; ADC $00E6 → 加偏移 (stub: 偏移=0)
      this._store.write(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`, lo);
      void hi;
    }
  }

  /**
   * entry8 Bank 切换 + 数据加载 (原 $B050 = $9050)。
   * asm $9050: LDA $0026; CMP #$10; BEQ $906C;
   *   CMP #$0C; BEQ $9065; CMP #$06; BNE $90A0;
   *   LDY #$10; LDX #$BB; JMP $B070 (team=6 → $BB10);
   *   LDY #$1A; LDX #$BB; JMP $B070 (team=12 → $BB1A);
   *   LDY #$24; LDX #$BB; JMP $B070 (team=16 → $BB24);
   *   $90A0: 其他队伍处理
   *   $B070: STY $00E6; STX $00E7 (设数据指针);
   *   循环: LDY #$EC; LDA $0368,Y; STA $056A,Y; INY; CPY #$F4; BNE
   *   (拷贝 $0368-$03F3 → $056A-$05F5)
   */
  entry8_DataLoad(): void {
    // $9050: LDA $0026; CMP #$10; BEQ $906C
    const teamId = this._store.read('ram_0026');
    let dataOff: number;
    if (teamId === 0x10) {
      dataOff = 0x24; // LDY #$24; LDX #$BB → $BB24
    } else if (teamId === 0x0C) {
      dataOff = 0x1A; // LDY #$1A; LDX #$BB → $BB1A
    } else if (teamId === 0x06) {
      dataOff = 0x10; // LDY #$10; LDX #$BB → $BB10
    } else {
      // $90A0: 其他队伍
      dataOff = 0;
    }
    // $9070: STY $00E6; STX $00E7 (设数据指针)
    this._store.write('ram_00E6', dataOff);
    this._store.write('ram_00E7', 0xBB);
    // $9074: LDY #$EC; 循环拷贝 $0368,Y → $056A,Y
    for (let y = 0xEC; y <= 0xF3; y++) {
      const src = 0x0368 + (y - 0xEC);
      const dst = 0x056A + (y - 0xEC);
      const v = this._store.read(`ram_${src.toString(16).toUpperCase().padStart(4, '0')}`);
      this._store.write(`ram_${dst.toString(16).toUpperCase().padStart(4, '0')}`, v);
    }
  }

  /** entry9 球队数据初始化 (原 $A39B) */
  entry9_TeamDataInit(): void {
    // $839B: LDA #$00; STA $00EA; LDA #$0B; JSR $A3B4
    this._store.write('ram_00EA', 0x00);
    // $83A1: LDA $0026; CMP #$10; BCC $83B3
    const teamId = this._store.read('ram_0026');
    if (teamId >= 0x10) {
      // $83A8: LDA #$16; STA $00EA; LDA #$0A; JSR $A3B4
      this._store.write('ram_00EA', 0x16);
      this._subA3B4(0x0A);
    } else {
      // $83B3: STA $00EB
      this._store.write('ram_00EB', teamId);
      this._subA3B4(0x0B);
    }
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $81E0-$8466 段 — 按键状态机主体 + 球员数据循环
  // ════════════════════════════════════════════════════════════

  /**
   * $81E0: 方向键移动光标主体。
   * asm $81E0-$8216:
   *   LDA $001C; AND #$0F; TAX; LDA $B2ED,X (查方向偏移表)
   *   BMI $81F7 (负值跳)
   *   CLC; ADC $00EC (加光标位置); CMP #$41; BCC $8201 (<$41 ok)
   *   SEC; SBC #$41 (≥$41 则减 $41, 环绕); JMP $A201
   *   $81F7: 负值路径: CLC; ADC $00EC; CMP #$41; BCC $8201
   *          CLC; ADC #$41 (≥$41 加 $41); $8201: STA $00EC
   *   $8203: TAX; LDA $B1E8,X (查菜单项); AND #$C0; ASL; ROL; ROL; TAY
   *   LDA $B229,Y; TAY; LDA $B1E8,X; JSR $A4D8; LDA #$01; JSR $9FA8
   *   JSR $A3D0 (精灵设置); LDA $001C; AND #$0F; BNE $8228
   *   JMP $A1A6 (无按键回循环)
   *   $8228: DEC $00EA; BNE $8217 (循环等待释放); LDY #$08; JMP $A1D4
   */
  protected sub81E0(): void {
    const dir = this._store.read('ram_001C') & 0x0F;
    const offset = 0; // ROM $B2ED 表 stub
    const ec = this._store.read('ram_00EC');
    let newPos: number;
    if ((offset & 0x80) !== 0) {
      // 负值路径
      newPos = ec + offset;
      if (newPos >= 0x41) newPos = newPos + 0x41;
    } else {
      // 正值路径
      newPos = ec + offset;
      if (newPos >= 0x41) newPos = newPos - 0x41;
    }
    this._store.write('ram_00EC', newPos & 0xFF);
    // $8203: 查菜单项表 $B1E8
    // JSR $A4D8 (菜单项显示); JSR $9FA8 (等待); JSR $A3D0 (精灵设置)
    this.subA3D0();
    // 循环等待按键释放
    let ea = 0x01;
    while (ea > 0) {
      if ((this._store.read('ram_001C') & 0x0F) === 0) break;
      ea = (ea - 1) & 0xFF;
    }
  }

  /**
   * $8231: A键确认 (二级菜单选择)。
   * asm $8231-$826C:
   *   LDX $00EC; LDA $B255,X; CMP #$FF; BEQ $826C (=FF跳)
   *   TXA; LDY $00ED; STA $0664,Y (存选择到 $0664)
   *   LDA $BC6E,X; LDX $00ED; LDY $B241,X; LDX #$21; JSR $88CA (显示)
   *   LDA #$12; STA $0701; LDX $00ED; INX; CPX #$12; BCC $825B
   *   LDX #$00; STX $00ED; JMP $A1A6
   */
  protected sub8231(): void {
    const ec = this._store.read('ram_00EC');
    const v: number = 0; // ROM $B255 表 stub
    if (v === 0xFF) {
      this.sub826C();
      return;
    }
    const ed = this._store.read('ram_00ED');
    this._store.write(`ram_0664`, ec);
    void ed;
    // JSR $88CA 显示; LDA #$12; STA $0701
    this._store.write('ram_0701', 0x12);
    let newEd = (ed + 1) & 0xFF;
    if (newEd >= 0x12) newEd = 0;
    this._store.write('ram_00ED', newEd);
  }

  /**
   * $826C: 三级菜单 (球员选择确认)。
   * asm $826C-$82B0:
   *   LDX $00EC; LDA $B1E8,X; LDY #$00; JSR $A4D8
   *   LDX $0673; LDA $B255,X; AND #$30; STA $00EB
   *   LDX $0675; LDA $B255,X; AND #$0F; ORA $00EB; STA $00EB
   *   LDX #$00; 循环: LDA $0664,X; CPX #$0F; BCS $829C
   *     INC $00EB; SEC; SBC $00EB; AND #$3F
   *   $829C: TAY; LDA $B255,Y; JSR $A474; INX; CPX #$12; BNE $828E
   *   JSR $A402; LDA $0662; CMP $00EC; BNE $82BB
   *   LDA $0661; AND #$0F; CMP $00ED; BEQ $82DD
   */
  protected sub826C(): void {
    const ec = this._store.read('ram_00EC');
    // JSR $A4D8 (菜单显示)
    // 查 $B255 表组合 $00EB
    let eb = 0;
    for (let x = 0; x < 0x12; x++) {
      const v = this._store.read('ram_0664');
      let y = v;
      if (x < 0x0F) {
        eb = (eb + 1) & 0xFF;
        y = (v - eb) & 0x3F;
      }
      // LDA $B255,Y; JSR $A474
      void y;
    }
    // JSR $A402
    const teamCur = this._store.read('ram_0662');
    if (teamCur !== ec) {
      this.sub82BB();
    } else {
      const sub = this._store.read('ram_0661') & 0x0F;
      if (sub === this._store.read('ram_00ED')) {
        this.sub82DD();
      } else {
        this.sub82BB();
      }
    }
  }

  /**
   * $82BB: 确认选择 (非匹配路径)。
   * asm: LDA #$F8; STA $0558; STA $055C; LDA #$43; STA $0700;
   *   LDA #$01; STA $007E; LDA #$78; JSR $9FA8; LDA #$00; STA $007E;
   *   LDA #$33; STA $0700; JMP $A19F
   */
  protected sub82BB(): void {
    this._store.write('ram_0558', 0xF8);
    this._store.write('ram_055C', 0xF8);
    this._store.write('ram_0700', 0x43);
    this._store.write('ram_007E', 0x01);
    // LDA #$78; JSR $9FA8 (等待 120 帧)
    this._store.write('ram_007E', 0x00);
    this._store.write('ram_0700', 0x33);
  }

  /**
   * $82DD: 球员经验值/等级计算。
   * asm $82DD-$836B:
   *   LDA #$00; STA $00E6; TAX
   *   循环: LDA $0656,X; LSR×2; STA $00E7; JSR $B045; STY $00EC; STX $00ED
   *   LDA $00E7; CMP #$3F; BCS $8352; CLC; ADC #$01; JSR $B045
   *   TYA; SEC; SBC $00EC; STA $00EA; TXA; SBC $00ED; STA $00EB
   *   LSR $00EB; ROR $00EA; LSR $00EB; ROR $00EA (÷4)
   *   LDX $00E6; LDA $0656,X; LDY $00EA; LDX $00EB; AND #$03
   *   BEQ $8338 (余0); ASL $00EA; ROL $00EB; CMP #$02; BEQ $832D
   *   BCC $8338; ASL $00EA; ROL $00EB; JMP $A338
   *   $832D: TYA; CLC; ADC $00EA; STA $00EA; TXA; ADC $00EB; STA $00EB
   *   $8338: LDA $00EC; CLC; ADC $00EA; STA $00EC
   *   LDA $00ED; ADC $00EB; STA $00ED
   *   SEC; SBC #$01; STA $00ED (减1)
   *   $8352: LDA $00E6; ASL; TAX; LDA $00EC; STA $0454,X; LDA $00ED; STA $0455,X
   *   INC $00E6; CMP #$0A; BEQ $836B; JMP $A2DF
   *   $836B: LDA $0660; LSR×2; STA $0026; LDA $0660; AND #$03; LSR; STA $0448
   *   LDA #$00; BCC $8381; LDA #$05; STA $0446
   *   LDA $0661; ROL; LDA #$00; ROL; STA $044D
   *   LDA #$00; STA $004C; LDA #$01; STA $0700; JSR $9BA0; RTS
   */
  protected sub82DD(): void {
    this._store.write('ram_00E6', 0x00);
    let e6 = 0;
    // 外循环 10 次 (经验值/等级数组)
    while (e6 < 0x0A) {
      const v656 = 0; // ROM $0656,X stub
      const e7 = v656 >> 2;
      this._store.write('ram_00E7', e7);
      // JSR $B045 → STY $00EC; STX $00ED
      let ec = 0, ed = 0;
      if (e7 < 0x3F) {
        // CLC; ADC #$01; JSR $B045
        // TYA; SEC; SBC $00EC; STA $00EA
        let ea = (0 - ec) & 0xFF; // stub
        let eb = (0 - ed) & 0xFF;
        // ÷4
        for (let i = 0; i < 2; i++) {
          eb = ((eb >> 1) | ((ea & 1) << 7)) & 0xFF;
          ea = ea >> 1;
        }
        // LDA $0656,X; AND #$03
        const rem = v656 & 0x03;
        if (rem !== 0) {
          // ASL $00EA; ROL $00EB
          for (let i = 1; i < rem; i++) {
            eb = ((eb << 1) | (ea >> 7)) & 0xFF;
            ea = (ea << 1) & 0xFF;
          }
        }
        // $8338: 加偏移
        ec = (ec + ea) & 0xFF;
        ed = (ed + eb) & 0xFF;
        ed = (ed - 1) & 0xFF;
      }
      // $8352: 写 $0454/$0455
      this._store.write(`ram_0454`, ec);
      this._store.write(`ram_0455`, ed);
      e6 = (e6 + 1) & 0xFF;
    }
    // $836B: 队伍/阵型设置
    const v660 = this._store.read('ram_0660');
    this._store.write('ram_0026', v660 >> 2);
    this._store.write('ram_0448', (v660 & 0x03) >> 1);
    const v661 = this._store.read('ram_0661');
    this._store.write('ram_044D', ((v661 & 0x80) >> 7) & 0xFF);
    this._store.write('ram_004C', 0x00);
    this._store.write('ram_0700', 0x01);
    // JSR $9BA0 (清屏)
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $83D0-$8466 段 — 精灵设置 + 球员位置计算
  // ════════════════════════════════════════════════════════════

  /**
   * $A3D0: 精灵设置 (光标 Y 坐标)。
   * asm $83D0-$8401:
   *   LDA $003A; AND #$04; BEQ $83F9 (bit2=0 跳)
   *   LDX $00ED; LDA $B22D,X; AND #$80; LSR; SEC; ROR; LSR; STA $0558
   *   CLC; ADC #$08; STA $055C
   *   LDA $B22D,X; AND #$7F; CLC; ADC #$50; STA $055B; STA $055F; RTS
   *   $83F9: LDA #$F8; STA $0558; STA $055C; RTS (隐藏精灵)
   */
  protected subA3D0(): void {
    const flag = this._store.read('ram_003A');
    if ((flag & 0x04) === 0) {
      // 隐藏精灵
      this._store.write('ram_0558', 0xF8);
      this._store.write('ram_055C', 0xF8);
      return;
    }
    const ed = this._store.read('ram_00ED');
    const v = 0; // ROM $B22D,X stub
    let a = (v & 0x80) >> 1; // LSR
    a = 0x80 | (a >> 1); // SEC; ROR; LSR
    this._store.write('ram_0558', a & 0xFF);
    this._store.write('ram_055C', (a + 0x08) & 0xFF);
    const y = (v & 0x7F) + 0x50;
    this._store.write('ram_055B', y & 0xFF);
    this._store.write('ram_055F', y & 0xFF);
  }

  /**
   * $8402: 球员位置计算 (遍历 11 球员, 累加位置偏移)。
   * asm $8402-$8466:
   *   LDA $0661; AND #$F0; CLC; ADC $0663; STA $00EC; LDA #$00; ADC #$00; STA $00ED
   *   LDX #$00; 循环 11 次: LDA $0656,X; CLC; ADC $00EC; STA $00EC; LDA $00ED; ADC #$00; STA $00ED; INX
   *   CPX #$0B; BNE $8415
   *   LDA $00EC; CLC; ADC #...; 算后续地址
   */
  protected sub8402(): void {
    const v661 = this._store.read('ram_0661');
    const v663 = this._store.read('ram_0663');
    let ec = ((v661 & 0xF0) + v663) & 0xFF;
    let ed = 0;
    for (let x = 0; x < 0x0B; x++) {
      const v656 = 0; // ROM $0656,X stub
      ec = (ec + v656) & 0xFF;
    }
    this._store.write('ram_00EC', ec);
    this._store.write('ram_00ED', ed);
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $8467-$86EA 段 — 数值显示 + entry2 后半段
  // ════════════════════════════════════════════════════════════

  /**
   * $8464: 读球员数据 (按索引+偏移查 $0656/$0657 表, 返回 A)。
   * asm $8464-$8473: LDY $AD8A,X; TXA; AND #$03; BEQ $846E
   *   =3: LDA $0656,Y; AND #$3F; RTS
   *   =2: LDA $0657,Y; ASL; STA $00EC; LDA $0656,Y; AND #$0F; ROL; ASL $00EC; ROL; RTS
   *   =1: LDA $0656,Y; LSR; STA $00EC; LDA $0657,Y; ROR; LSR $00EC; ROR; LSR; LSR; RTS
   *   =0: LDA $0656,Y; LSR; LSR; RTS
   */
  protected sub8464(x: number): number {
    const y = 0; // ROM $AD8A,X stub
    const sel = x & 0x03;
    const v656 = 0; // ROM $0656,Y stub
    const v657 = 0; // ROM $0657,Y stub
    switch (sel) {
      case 0: return v656 >> 2;
      case 1: {
        let ec = v656 >> 1;
        let a = v657;
        ec = ((ec >> 1) | ((a & 1) << 7)) & 0xFF;
        a = (a >> 1) & 0xFF;
        return (a >> 2) & 0xFF;
      }
      case 2: {
        let ec = (v657 << 1) & 0xFF;
        let a = v656 & 0x0F;
        const carry = a & 1;
        ec = ((ec << 1) | carry) & 0xFF;
        return ec;
      }
      case 3: return v656 & 0x3F;
    }
    return 0;
  }

  /**
   * $8474: 写球员数据 (与 $8464 对应的写入版本)。
   * asm $8474-$84D7: AND #$3F; STA $00EC; LDY $AD8A,X; TXA; AND #$03; 分支
   */
  protected sub8474(x: number, value: number): void {
    const y = 0; // ROM $AD8A,X stub
    const sel = x & 0x03;
    let ec = value & 0x3F;
    // 各分支写 $0656/$0657 (stub: RAM 数据)
    void sel; void ec;
  }

  /**
   * $84D8: PPU 地址设置 + 调 $9895 块填充。
   * asm $84D8-$84E8: STY $00E8; AND #$3F; CLC; ADC #$D8; TAY;
   *   LDX #$23; LDA #$01; STA $00E9; LDA $00E8; JMP $9895
   */
  protected sub84D8(a: number, y: number): void {
    this._store.write('ram_00E8', y & 0xFF);
    const newA = (a & 0x3F) + 0xD8;
    this._store.write('ram_00E9', 0x01);
    // LDX #$23; JMP $9895 (bank00 块填充)
    void newA;
  }

  /**
   * $8509-$8610: entry2 后半段 (球员数据写入 NT)。
   * asm: 拷贝 $B271+Y → $039C+Y (Y=$CC-$FF);
   *   查 $BCD1 表 (队伍→阵型), 算 $BCF3/$BD64 指针;
   *   JSR $9D27 (写队名); JSR $9D50 (写阵型名);
   *   LDA $002A; JSR $A63C (写数字到 NT);
   *   LDA #$04; LDX #$37; JSR $997A (PPU buffer);
   *   循环等待按键释放;
   *   JSR $99F0; JSR $98A0 (清屏);
   *   LDA #$0B; JSR $A611 (球员数据循环);
   *   队伍≥$10: LDA #$16; JSR $A611;
   *   球员数据循环: LDX $00ED; LDA $0656,X; JSR $C53C;
   *   查 $BC58 表设 PPU 地址; JSR $9D50 (写阵型名);
   *   INC $00EA; INC $00ED; DEC $00EC; BEQ $860A;
   *   CPX #$0B; BNE $85C6; JSR $89A3; JSR $98E8; JMP $A5C6
   */
  protected sub8509_PlayerDataLoop(): void {
    // $8509: 拷贝 $B271+Y → $039C+Y (Y=$CC-$FF)
    for (let y = 0xCC; y <= 0xFF; y++) {
      // ROM $B271+Y → ram_039C+Y
      void y;
    }
    // $8514: LDX $0026; LDA $BCD1,X; AND #$F0; LSR×3; TAX
    const teamId = this._store.read('ram_0026');
    const hi = (teamId & 0xF0) >> 3;
    void hi;
    // JSR $9D27 (写队名)
    // $8529: LDX $0026; AND #$0F; ASL; TAX; LDY $BD64,X; LDA $BD65,X; TAX
    const lo = (teamId & 0x0F) << 1;
    void lo;
    // $8539: LDA #$07; STA $00E8; LDA #$22; STA $00E9 (PPU 地址 $2207)
    this._store.write('ram_00E8', 0x07);
    this._store.write('ram_00E9', 0x22);
    // JSR $9D50 (写阵型名)
    // $8544: LDA $002A; LDY #$D0; LDX #$21; JSR $A63C (写数字)
    const v02A = this._store.read('ram_002A');
    void v02A;
    // $855C: LDA #$00; STA $007B; STA $008E; LDA #$2E; STA $008F
    this._store.write('ram_007B', 0x00);
    this._store.write('ram_008E', 0x00);
    this._store.write('ram_008F', 0x2E);
    // LDA #$04; LDX #$37; JSR $997A (PPU buffer)
    // 循环等待按键释放 (DEX; BNE $8571)
    let x = 0xF0;
    while (x !== 0) {
      if ((this._store.read('ram_001E') & 0x80) !== 0) break;
      x = (x - 1) & 0xFF;
    }
    // JSR $99F0; JSR $98A0 (清屏)
    this._store.write('ram_00ED', 0x00);
    this._store.write('ram_00EC', 0x00);
    // LDA #$0B; JSR $A611 (球员数据循环 11 次)
    this.subA611(0x0B);
    // 队伍≥$10: LDA #$16; JSR $A611
    if (teamId >= 0x10) {
      this._store.write('ram_00ED', 0x16);
      this.subA611(0x0A);
    }
    // $859D: LDA $00E4; CMP $0026; BCS $85B1
    const e4 = this._store.read('ram_00E4');
    if (e4 >= teamId) {
      // $85B1: LDA $00EC; BEQ $8610
      if (this._store.read('ram_00EC') === 0) return;
      // LDX $0026; LDA $B3F9,X; JSR $8464; JSR $82A9
      // $85C0: LDA #$00; STA $00ED; STA $00EA
      this._store.write('ram_00ED', 0x00);
      this._store.write('ram_00EA', 0x00);
      // 球员数据循环
      this._playerDataWriteLoop();
    } else {
      // 队伍 6/12/16: JMP $8610
      if (teamId === 0x06 || teamId === 0x0C || teamId === 0x10) return;
      if (this._store.read('ram_00EC') === 0) return;
      this._store.write('ram_00ED', 0x00);
      this._store.write('ram_00EA', 0x00);
      this._playerDataWriteLoop();
    }
  }

  /** $85C6-$85F1: 球员数据写入循环 */
  protected _playerDataWriteLoop(): void {
    let ea = this._store.read('ram_00EA');
    let ed = this._store.read('ram_00ED');
    let ec = this._store.read('ram_00EC');
    while (ec !== 0) {
      // LDX $00ED; LDA $0656,X; JSR $C53C
      // LDA $00EA; ASL; TAX; LDA $BC58,X; STA $00E8; LDA $BC59,X; STA $00E9
      this._store.write('ram_00E8', 0);
      this._store.write('ram_00E9', 0);
      // LDY $0030; LDX $0031; JSR $9D50
      ea = (ea + 1) & 0xFF;
      ed = (ed + 1) & 0xFF;
      ec = (ec - 1) & 0xFF;
      if (ec === 0) break;
      if (ed !== 0x0B) continue;
      // JSR $89A3
      break;
    }
    this._store.write('ram_00EA', ea);
    this._store.write('ram_00ED', ed);
    this._store.write('ram_00EC', ec);
  }

  /**
   * $A611: 球员数据初始化循环。
   * asm $8611-$863B: STA $00EB; LDA $00ED; JSR $C50C;
   *   LDY #$00; LDA ($0034),Y; JSR $B013; JSR $B02E;
   *   LDY #$03; CMP ($0034),Y; BEQ $8635; STA ($0034),Y;
   *   LDY #$00; LDA ($0034),Y; LDX $00EC; STA $0656,X; INC $00EC;
   *   $8635: INC $00ED; DEC $00EB; BNE $8613; RTS
   */
  protected subA611(count: number): void {
    let eb = count;
    let ed = this._store.read('ram_00ED');
    let ec = this._store.read('ram_00EC');
    while (eb !== 0) {
      // LDA $00ED; JSR $C50C; LDY #$00; LDA ($0034),Y; JSR $B013; JSR $B02E
      // LDY #$03; CMP ($0034),Y; BEQ $8635; STA ($0034),Y
      // LDY #$00; LDA ($0034),Y; LDX $00EC; STA $0656,X; INC $00EC
      ec = (ec + 1) & 0xFF;
      ed = (ed + 1) & 0xFF;
      eb = (eb - 1) & 0xFF;
    }
    this._store.write('ram_00ED', ed);
    this._store.write('ram_00EC', ec);
  }

  /**
   * $A63C: 数字写入 NT (查 $BDA8 表)。
   * asm $863C-$8649: STY $00E8; STX $00E9; ASL; TAX;
   *   LDY $BDA8,X; LDA $BDA9,X; TAX; JMP $9D50
   */
  protected subA63C(a: number, y: number, x: number): void {
    this._store.write('ram_00E8', y & 0xFF);
    this._store.write('ram_00E9', x & 0xFF);
    const idx = (a << 1) & 0xFF;
    void idx;
    // LDY $BDA8,X; LDA $BDA9,X; TAX; JMP $9D50
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $86EB-$8921 段 — entry3/entry4 子程 + 属性块绘制
  // ════════════════════════════════════════════════════════════

  /**
   * $A6E8: entry3 后续 (清屏 + 查队伍表 + 写文本)。
   * asm $86E8-$870D: JSR $98A0; JSR $9B7F; LDX $0026; LDA $B3B5,X;
   *   CLC; ADC #$01; JSR $8464; JSR $82A9;
   *   LDY #$D6; LDX #$AD; JSR $9C3A; JSR $9BE8;
   *   CMP #$02; BEQ $8710; JSR $A721; JMP $A6E8
   *   $8710: LDA #$31; STA $0700; JSR $9BA0; RTS
   */
  protected subA6E8(): void {
    // JSR $98A0 (清屏); JSR $9B7F (清精灵)
    const teamId = this._store.read('ram_0026');
    void teamId;
    // LDA $B3B5,X; CLC; ADC #$01; JSR $8464; JSR $82A9
    // LDY #$D6; LDX #$AD; JSR $9C3A; JSR $9BE8
    // CMP #$02; BEQ $8710 (阵型=2 → LDA #$31; STA $0700; RTS)
    // JSR $A721; JMP $A6E8 (循环)
  }

  /**
   * $A721: 子菜单绘制。
   * asm $8721-$8723: JSR $9BA0; RTS (实际代码在 $8724 起)
   * $8724: LDX #$1F; LDY #$2E; JSR $9B6F (设滚动);
   *   LDA #$00; STA $007B; JSR $8920 (PPU buffer);
   *   LDA #$00; STA $008E; LDA #$2E; STA $008F;
   *   LDA $002A; CMP #$02; BNE $8743; JMP $A84E
   *   $8743: LDY #$3D; LDX #$B4; JSR $B0C0 (CHR bank);
   *   LDA #$00; JSR $ADE9; LDA #$88; STA $00E6; LDA #$20; STA $00E7;
   *   JSR $AEAC; LDA #$00; JSR $AE01;
   *   LDY #$FC; 循环: LDA $ACA2,Y; STA $0468,Y; INY; BNE
   *   LDA #$03; LDX #$39; JSR $997A
   */
  protected subA721(): void {
    // LDX #$1F; LDY #$2E; JSR $9B6F (设滚动)
    this._store.write('ram_007B', 0x00);
    // JSR $8920 (PPU buffer 分配)
    this._store.write('ram_008E', 0x00);
    this._store.write('ram_008F', 0x2E);
    const v02A = this._store.read('ram_002A');
    if (v02A === 0x02) {
      // JMP $A84E
      return;
    }
    // LDY #$3D; LDX #$B4; JSR $B0C0 (CHR bank)
    // LDA #$00; JSR $ADE9; LDA #$88; STA $00E6; LDA #$20; STA $00E7
    this._store.write('ram_00E6', 0x88);
    this._store.write('ram_00E7', 0x20);
    // JSR $AEAC; LDA #$00; JSR $AE01
    // LDY #$FC; 循环拷贝 $ACA2,Y → $0468,Y
    for (let y = 0xFC; y <= 0xFF; y++) {
      void y;
    }
    // LDA #$03; LDX #$39; JSR $997A
  }

  /**
   * $A779: 子菜单精灵设置。
   * asm $8779-$878D: LDX #$B6; LDY #$AA; JSR $97AB; ... (省略详细)
   */
  protected subA779(): void {
    // LDX #$B6; LDY #$AA; JSR $97AB (精灵设置)
  }

  /**
   * $8920: PPU buffer 分配 (bank01 侧入口)。
   * asm $8920-$8953: 读 ram_008E (buffer 状态); 设 ram_04A8 区;
   *   写 ram_00E8/$00E9 PPU 地址; 设 ram_008F;
   *   循环填充 ram_04A8 (Y 计数)
   */
  protected sub8920(): void {
    const bufState = this._store.read('ram_008E');
    if (bufState !== 0) return;
    // 设 PPU buffer 区
    this._store.write('ram_008E', 0x2E);
    // 循环填充 ram_04A8 (stub)
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $8922-$8C56 段 — 子菜单绘制 + 精灵设置 + 按键处理
  // ════════════════════════════════════════════════════════════

  /**
   * $A7CE: 子菜单绘制 (含按键循环)。
   * asm $87C5-$884B:
   *   LDA #$58; STA $0564; LDA #$94; STA $004C
   *   LDX #$AD; JSR $9C3A; LDA #$01; JSR $9FA8 (等待1帧)
   *   JSR $9CC9 (按键检测); BIT $001E; BVS $883C (B键取消)
   *   BPL $87D5 (A键确认); LDA #$01; STA $0562; JSR $9CD3
   *   LDY #$AE; LDX #$AD; LDA $0560; JSR $9C3C; LDA #$01; JSR $9FA8
   *   JSR $9CC9; BIT $001E; BVS $883C; BPL $87F5
   *   LDY $0560; LDX #$00; JSR $9D08; LDA $0034; STA $00E6; LDA $0035; STA $00E7
   *   LDY $055C; LDX #$00; JSR $9D08; JSR $AF67
   *   LDA #$88; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC
   *   LDA #$F8; STA $055C; STA $0560; LDA #$00; STA $0562; JSR $AE01
   *   JMP $A7CE
   *   $883C: LDA #$00; STA $004C; JSR $AE01; LDA #$F8; STA $055C; STA $0560; JMP $A771
   */
  protected subA7CE(): void {
    this._store.write('ram_0564', 0x58);
    this._store.write('ram_004C', 0x94);
    // LDX #$AD; JSR $9C3A (写文本)
    // 循环等待 A/B 键
    let pressed = false;
    while (!pressed) {
      // LDA #$01; JSR $9FA8 (等待1帧)
      // JSR $9CC9 (按键检测)
      const input = this._store.read('ram_001E');
      if ((input & 0x40) !== 0) {
        // B键取消 → $883C
        this._store.write('ram_004C', 0x00);
        // JSR $AE01
        this._store.write('ram_055C', 0xF8);
        this._store.write('ram_0560', 0xF8);
        return;
      }
      if ((input & 0x80) !== 0) {
        // A键确认
        pressed = true;
      }
    }
    // LDA #$01; STA $0562; JSR $9CD3
    this._store.write('ram_0562', 0x01);
    // LDY $0560; LDX #$00; JSR $9D08; LDA $0034; STA $00E6; LDA $0035; STA $00E7
    // LDY $055C; LDX #$00; JSR $9D08; JSR $AF67
    this._store.write('ram_00E6', 0x88);
    this._store.write('ram_00E7', 0x20);
    // JSR $AEAC
    this._store.write('ram_055C', 0xF8);
    this._store.write('ram_0560', 0xF8);
    this._store.write('ram_0562', 0x00);
    // JSR $AE01; JMP $A7CE (循环)
  }

  /**
   * $A84E: 子菜单 (阵型=2 路径)。
   * asm $884E-$889A: LDY #$51; LDX #$B4; JSR $B0C0;
   *   LDA #$FC; JSR $ADE9; LDA #$85; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC;
   *   LDA #$99; STA $00E6; LDA #$20; STA $00E7; JSR $AEBE;
   *   LDA #$D8; JSR $AE01; JSR $B0A1; JSR $AA7F;
   *   LDY #$FC; 循环: LDA $ACB8,Y; STA $0468,Y; INY; BNE;
   *   LDA #$03; LDX #$39; JSR $997A;
   *   LDA #$FC; LDX #$38; LDY #$78; JSR $9BE3;
   *   LDY #$9D; LDX #$A8; JMP $9C28
   */
  protected subA84E(): void {
    // LDY #$51; LDX #$B4; JSR $B0C0 (CHR bank)
    // LDA #$FC; JSR $ADE9
    this._store.write('ram_00E6', 0x85);
    this._store.write('ram_00E7', 0x20);
    // JSR $AEAC
    this._store.write('ram_00E6', 0x99);
    this._store.write('ram_00E7', 0x20);
    // JSR $AEBE; LDA #$D8; JSR $AE01; JSR $B0A1; JSR $AA7F
    // LDY #$FC; 循环拷贝 $ACB8,Y → $0468,Y
    for (let y = 0xFC; y <= 0xFF; y++) {
      void y;
    }
    // LDA #$03; LDX #$39; JSR $997A
    // LDA #$FC; LDX #$38; LDY #$78; JSR $9BE3
    // LDY #$9D; LDX #$A8; JMP $9C28
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $8C55-$8F90 段 — 数值显示链路核心 + 字符显示
  // ════════════════════════════════════════════════════════════

  /**
   * $8C55: 数据流解析 (查 $BB2E 表, 设 $005C/$005D 指针, 循环读数据)。
   * asm $8C2E-$8C5E:
   *   JSR $997E (PPU buffer 结束); LDA #$01; JSR $9FA8 (等待1帧)
   *   BIT $001E; BVC $8C3D (B键跳); JMP $AAE5
   *   $8C3D: BPL $8C31 (A键确认); LDY #$00; LDA ($0034),Y
   *   LDX #$27; DEX×3; BPL $8C4D; JMP $AAE5
   *   $8C4D: CMP $BB2E,X; BNE $8C45 (查表)
   *   LDA $BB2F,X; STA $005C; LDA $BB30,X; STA $005D; LDA #$00; STA $005E
   *   $8C5E: LDY #$00; LDA ($005C),Y (读数据流)
   *     BPL $8C83 (正数跳); CMP #$FF; BNE $8C6D; JMP $AD23 (FF=结束)
   *     $8C6D: CMP #$FE; BNE $8C7B; LDA $0446; CMP #$05; BEQ $8C8C; JMP $AD13
   *     $8C7B: LDA $0448; LSR; BCS $8C8C; LDA #$1E; CMP $0026; BCC $8C8C; BEQ $8C8C; JMP $AD13
   *   $8C8C: INY; LDA ($005C),Y; JSR $C53C (查表)
   *     LDA $005E; ASL; TAX; LDA $BC48,X; STA $00E8; LDA $BC49,X; STA $00E9
   *     LDY #$00; LDA ($0030),Y; CMP #$FC; BCS $8CBE
   *     LDY $00E8; LDX $00E9; JSR $88CA (字符显示)
   *     INC $0030; BNE $8CB5; INC $0031
   *     $8CB5: INC $00E8; BNE $8CBB; INC $00E9
   *     $8CBB: JMP $ACA0
   *   $8CBE: LDA #$00; STA $044E; LDY #$02; LDA ($005C),Y; STA $043B; STA $043D;
   *     INY; LDA ($005C),Y; STA $043C; STA $043E;
   *     LDA $005F; STA $0441; STA $0442; INY; LDA ($005C),Y; JSR $C54B
   *     LDA $043F; STA $00EC; LDA $0440; STA $00ED; JSR $9E4F
   */
  protected sub8C55(): void {
    // JSR $997E (PPU buffer 结束)
    // 循环等待 A/B 键
    let confirmed = false;
    while (!confirmed) {
      // LDA #$01; JSR $9FA8 (等待1帧)
      const input = this._store.read('ram_001E');
      if ((input & 0x40) !== 0) {
        // B键 → $8C3D
        if ((input & 0x80) !== 0) confirmed = true;
      } else {
        // JMP $AAE5
        return;
      }
    }
    // LDY #$00; LDA ($0034),Y (读球员数据[0])
    // LDX #$27; DEX×3 = $24; BPL $8C4D
    // 查 $BB2E 表 (X 从 $24 递减)
    let x = 0x24;
    const playerId = 0; // stub
    while (x >= 0) {
      // CMP $BB2E,X; BNE $8C45
      const tblVal = 0; // ROM $BB2E,X stub
      if (tblVal === playerId) break;
      x--;
    }
    if (x < 0) return; // JMP $AAE5
    // LDA $BB2F,X; STA $005C; LDA $BB30,X; STA $005D
    this._store.write('ram_005C', 0); // stub
    this._store.write('ram_005D', 0);
    this._store.write('ram_005E', 0);
    // $8C5E: 读数据流
    let y = 0;
    while (true) {
      const data: number = 0; // ROM ($005C),Y stub
      if ((data & 0x80) === 0) {
        // 正数 → $8C83
        if (data === 0x1E) {
          if (this._store.read('ram_0026') < 0x1E) {
            // JMP $AD13
            break;
          }
        }
        break;
      }
      if (data === 0xFF) {
        // JMP $AD23 (结束)
        break;
      }
      if (data === 0xFE) {
        if (this._store.read('ram_0446') === 0x05) {
          // $8C8C
          y++;
          // LDA ($005C),Y; JSR $C53C
          const e5e = this._store.read('ram_005E');
          const idx = (e5e << 1) & 0xFF;
          this._store.write('ram_00E8', 0); // ROM $BC48,X stub
          this._store.write('ram_00E9', 0);
          // 字符显示循环
          break;
        }
        // JMP $AD13
        break;
      }
      break;
    }
  }

  /**
   * $88CA: 字符显示 (双 tile 映射)。
   * asm $88CA-$891F: 查 CHAR_MAP_DOUBLE 表, 写 2 个 tile 到 PPU buffer。
   *   LDA $B8A8,Y (查字符表); STA $00E6; INY; LDA $B8A9,Y; STA $00E7
   *   LDY #$00; LDA ($00E6),Y (读 tile 高字节); STA $003A; INY
   *   LDA ($00E6),Y (读 tile 低字节); STA $003B
   *   写 PPU buffer (ram_04A8 区)
   */
  protected sub88CA(): void {
    // 查 CHAR_MAP_DOUBLE 表 (bank01 ROM $B8A8)
    // 设 $00E6/$00E7 指针
    // 读 2 个 tile 写 ram_04A8
    // H5 版: 简化, 由 _charDisplay 处理
  }

  // ════════════════════════════════════════════════════════════
  // bank01 $8F91-$91E7 段 — entry5/6/7/8 后半段
  // ════════════════════════════════════════════════════════════

  /**
   * $8F91: entry7 VRAM 缓冲写入 2 后半段 (16位指针÷4 + 经验值循环加偏移)。
   * asm $8F91-$8FC1:
   *   STA $00E6; LDA $BA4D,X; LSR; ROR $00E6; LSR; ROR $00E6; STA $00E7 (÷4)
   *   LDX #$00; 循环: LDA $0454,X; CLC; ADC $00E6; STA $0454,X;
   *     LDA $0455,X; ADC $00E7; STA $0455,X; BCC $8FBB;
   *     LDA #$FF; STA $0454,X; STA $0455,X (溢出设 $FF)
   *   $8FBB: INX; INX; CPX #$16; BCC $8FA0; RTS
   */
  protected sub8F91(): void {
    let e6 = this._store.read('ram_00E6');
    // LDA $BA4D,X; LSR; ROR $00E6; LSR; ROR $00E6; STA $00E7 (16位÷4)
    const hi = 0; // ROM stub
    for (let i = 0; i < 2; i++) {
      e6 = ((e6 >> 1) | ((hi & 1) << 7)) & 0xFF;
    }
    this._store.write('ram_00E6', e6);
    this._store.write('ram_00E7', hi);
    // 循环 11 次 (X=0,2,4,...,$14)
    for (let x = 0; x < 0x16; x += 2) {
      const lo = this._store.read(`ram_0454`); // stub: 实际按 X 索引
      const sum = lo + e6;
      if (sum > 0xFF) {
        this._store.write(`ram_0454`, 0xFF);
        this._store.write(`ram_0455`, 0xFF);
      } else {
        this._store.write(`ram_0454`, sum & 0xFF);
      }
    }
  }

  /**
   * $8FC2: entry5 字符解码后半段 (查 $BA1C 表 + 经验值加偏移)。
   * asm $8FC2-$9012:
   *   STX $00EC; JSR $B023; STA $00EB; AND #$F0; LSR; CLC; ADC $00EC; TAX
   *   LDA $BA1C,X; TAX
   *   LDA $0026; ASL; TAY; LDA $BA4D,Y; STA $00ED;
   *   LDA $BA4C,Y; ROR $00ED; LSR; ROR $00ED; LSR (16位÷4)
   *   JSR $9DEE
   *   ASL $00EC; ROL $00ED; ASL $00EC; ROL $00ED (×4)
   *   LDA $00EB; AND #$0F; ASL; TAX
   *   LDA $0454,X; CLC; ADC $00ED; STA $0454,X
   *   LDA $0455,X; ADC #$00; STA $0455,X; BCC $9012
   *   LDA #$FF; STA $0454,X; STA $0455,X; RTS
   */
  protected sub8FC2(): void {
    const ec = this._store.read('ram_00EC');
    // JSR $B023 (查表)
    const eb = 0; // stub
    this._store.write('ram_00EB', eb);
    const x = ((eb & 0xF0) >> 1) + ec;
    // LDA $BA1C,X; TAX (查字符表)
    const teamId = this._store.read('ram_0026');
    const y = (teamId << 1) & 0xFF;
    // LDA $BA4D,Y; STA $00ED; LDA $BA4C,Y; ROR $00ED; LSR; ROR $00ED; LSR (÷4)
    let ed = 0; // stub
    // JSR $9DEE
    // ASL $00EC; ROL $00ED ×2 (×4)
    for (let i = 0; i < 2; i++) {
      ed = ((ed << 1) | (ec >> 7)) & 0xFF;
    }
    // LDA $00EB; AND #$0F; ASL; TAX; LDA $0454,X; CLC; ADC $00ED; STA $0454,X
    const idx = (eb & 0x0F) << 1;
    void idx; void x; void y;
  }

  /**
   * $9013: 查经验值表 (返回 Y:X = 16位经验值)。
   * asm $9013-$9022:
   *   JSR $B023; AND #$0F; ASL; TAX; LDA $0454,X; TAY; LDA $0455,X; TAX; RTS
   */
  protected sub9013(): { lo: number; hi: number } {
    // JSR $B023; AND #$0F; ASL; TAX
    const x = 0; // stub
    return { lo: 0, hi: 0 }; // $0454,X / $0455,X
  }

  /**
   * $9023: 查队伍偏移表 (返回 A = $B9D6,X)。
   * asm $9023-$902D:
   *   LDX $002A; CLC; ADC $B9D3,X; TAX; LDA $B9D6,X; RTS
   */
  protected sub9023(a: number): number {
    const x = this._store.read('ram_002A');
    // CLC; ADC $B9D3,X; TAX; LDA $B9D6,X
    void x; void a;
    return 0; // stub
  }

  /**
   * $902E: 二分查找 (查 $BA90 16位表)。
   * asm $902E-$9044:
   *   STY $00E6; STX $00E7; LDX #$80; DEX; DEX
   *   $9034: LDA $00E6; CMP $BA90,X; LDA $00E7; SBC $BA91,X; BCC $9034
   *   TXA; LSR; RTS
   */
  protected sub902E(y: number, x: number): number {
    this._store.write('ram_00E6', y & 0xFF);
    this._store.write('ram_00E7', x & 0xFF);
    let xi = 0x80;
    xi -= 2;
    while (xi >= 0) {
      // CMP $BA90,X; SBC $BA91,X
      // stub: 直接返回
      break;
    }
    return (xi >> 1) & 0xFF;
  }

  /**
   * $9045: 查 $BA90 表 (反向, 返回 Y:X)。
   * asm $9045-$904F:
   *   ASL; TAX; LDA $BA90,X; TAY; LDA $BA91,X; TAX; RTS
   */
  protected sub9045(a: number): { lo: number; hi: number } {
    const x = (a << 1) & 0xFF;
    void x;
    return { lo: 0, hi: 0 }; // stub
  }

  /**
   * $90A0: entry8 其他队伍处理。
   * asm $90A0-$90BF:
   *   LDX $0027; BEQ $90BF (队伍2=0 跳)
   *   LDY #$C8; LDX #$B9; JSR $97B6 (精灵设置)
   *   LDY #$52; LDX #$22; LDA #$01; STA $00E9
   *   LDA $0450; EOR #$FF; CLC; ADC #$37; JSR $9895 (块填充)
   *   $90BF: RTS
   */
  protected sub90A0(): void {
    const team2 = this._store.read('ram_0027');
    if (team2 === 0) return;
    // LDY #$C8; LDX #$B9; JSR $97B6 (精灵设置)
    this._store.write('ram_00E9', 0x01);
    // LDA $0450; EOR #$FF; CLC; ADC #$37; JSR $9895
    const v = this._store.read('ram_0450');
    const fill = ((v ^ 0xFF) + 0x37) & 0xFF;
    void fill;
  }

  /**
   * $90C0: 脚本分派器 (查 $B0D7 跳转表)。
   * asm $90C0-$90D4:
   *   STY $00EC; STX $00ED; LDY #$00; LDA ($00EC),Y; ASL; TAX
   *   LDA $B0D7,X; STA $00E6; LDA $B0D8,X; STA $00E7; JMP ($00E6)
   */
  protected sub90C0(y: number, x: number): void {
    this._store.write('ram_00EC', y & 0xFF);
    this._store.write('ram_00ED', x & 0xFF);
    // LDY #$00; LDA ($00EC),Y; ASL; TAX
    // LDA $B0D7,X; STA $00E6; LDA $B0D8,X; STA $00E7; JMP ($00E6)
    // stub: 脚本分派
  }

  /**
   * $A3B4: 循环设球员数据 (JSR $C50C; 读球员数据; JSR $B013; JSR $B02E; 写回)
   */
  protected _subA3B4(count: number): void {
    let ea = this._store.read('ram_00EA');
    let eb = count;
    while (eb > 0) {
      // $83B6: LDA $00EA; JSR $C50C (查RAM指针)
      void ea;
      // $83BD: JSR $B013; JSR $B02E (查表)
      // $83C5: STA ($0034),Y (写回球员数据)
      ea = (ea + 1) & 0xFF;
      eb = (eb - 1) & 0xFF;
    }
    this._store.write('ram_00EA', ea);
  }
}

export default PlayerQueryService;
