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
      void dst + i;
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

  /** $A3B4: 循环设球员数据 (JSR $C50C; 读球员数据; JSR $B013; JSR $B02E; 写回) */
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
