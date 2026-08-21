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

  /** 按键轮询 (原 $A1AE 分支) */
  protected _optionScreenPoll(): void {
    // TODO: 翻译 $A1AE-$A3D0 按键状态机 (会议/子菜单/二级/三级)
    void this._store.read('ram_001E');
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

  /** PPU 缓冲分配 (原 $997A 语义) */
  protected _ppuBufAlloc(): void {
    // TODO: 对照 $997A 写 ram_04A8 PPU Buffer
  }

  /** PPU 缓冲结束 (原 $997E 语义) */
  protected _ppuBufEnd(): void {
    // TODO: 对照 $997E
  }

  /** 字符显示 (原 $88CA, 双 tile 字符映射) */
  protected _charDisplay(ch: number, dst: number, bank: number): void {
    void ch;
    void dst;
    void bank;
    // TODO: 复用 bank00/char-map.ts 的 CHAR_MAP_DOUBLE
  }

  /** PPU 块填充 (原 $9895 语义) */
  protected _ppuBlockFill(tile: number, dst: number, count: number): void {
    void tile;
    void dst;
    void count;
    // TODO: 对照 $9895
  }

  /** 读字节 (原 $C527 查表) */
  protected _r8(v: number): number {
    return v & 0xff;
  }

  // ============================================================
  // 剩余入口 stub (entry2-entry9)
  // ============================================================

  /** entry2 PPU 图形数据显示 (原 $A4EB) */
  entry2_PpuGraphics(): void {
    // TODO: 翻译 $A4EB
  }

  /** entry3 NT 屏幕内容绘制 (原 $A64C) */
  entry3_ScreenDraw(): void {
    // TODO: 翻译 $A64C
  }

  /** entry4 PPU 属性块写入 (原 $A6D2) */
  entry4_AttrBlock(): void {
    // TODO: 翻译 $A6D2 (可复用 _ppuBlockFill)
  }

  /** entry5 字符数据解码/显示 (原 $AFC2) */
  entry5_CharDecode(): void {
    // TODO: 翻译 $AFC2 (复用 char-map CHAR_MAP_DOUBLE)
  }

  /** entry6 VRAM 缓冲区写入 1 (原 $AF79) */
  entry6_VramBuf1(): void {
    // TODO: 翻译 $AF79
  }

  /** entry7 VRAM 缓冲区写入 2 (原 $AF8A) */
  entry7_VramBuf2(): void {
    // TODO: 翻译 $AF8A
  }

  /** entry8 Bank 切换 + 数据加载 (原 $B050) */
  entry8_DataLoad(): void {
    // TODO: 翻译 $B050
  }

  /** entry9 球队数据初始化 (原 $A39B) */
  entry9_TeamDataInit(): void {
    // TODO: 翻译 $A39B
  }
}

export default PlayerQueryService;
