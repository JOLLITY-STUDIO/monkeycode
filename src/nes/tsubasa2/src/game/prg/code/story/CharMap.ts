/**
 * CharMap — 字符集映射（ASCII/日文假名/汉字两套表）
 *
 * 行为翻译（bank19 数据 + char-rom）：
 * - charByte(charCode) → tile 索引
 * - 多套映射表：A 半角（ASCII+假名）、B 全角（汉字/全角假名）
 * - 字符不在映射中时返回 ' '（空格 tile）
 *
 * 关键数据：
 * - bank19/code_main.s 头部 ~4KB 是字符 tile 索引表（每个 byte = 一个字符对应 tile）
 * - 字幕/对话框文字按字符序列写在 BANK18_DATA_TABLES 中
 *
 * 当前：V0.4 落地。
 *   - 提供 ASCII fallback（Space 32 = tile 0, A-Z = 33-58 等）
 *   - register() 批量注入（剧情脚本 / 字幕表 启动时一次性注入）
 *   - registerTable() 支持 ReadonlyArray<[charCode, tile]>
 */
export class CharMap {
  /** 字符 → tile 号映射 */
  private readonly map: Map<number, number> = new Map();

  constructor() {
    this.initDefault();
  }

  /**
   * 默认初始化：ASCII 32..127 映射到对应 tile 偏移。
   * 真实项目应从 BANK19 字符索引表覆盖。
   */
  private initDefault(): void {
    // 空格 → 0
    this.map.set(0x20, 0);
    // '!'..'/'  (ASCII 33..47) → tile 1..15
    for (let i = 0x21; i <= 0x2f; i++) this.map.set(i, i - 0x20);
    // '0'..'9' (ASCII 48..57) → tile 16..25
    for (let i = 0x30; i <= 0x39; i++) this.map.set(i, 16 + (i - 0x30));
    // ':'..'@'  (ASCII 58..64) → tile 26..32
    for (let i = 0x3a; i <= 0x40; i++) this.map.set(i, 26 + (i - 0x3a));
    // 'A'..'Z'  (ASCII 65..90) → tile 33..58
    for (let i = 0x41; i <= 0x5a; i++) this.map.set(i, 33 + (i - 0x41));
    // '['..'`'  (ASCII 91..96) → tile 59..64
    for (let i = 0x5b; i <= 0x60; i++) this.map.set(i, 59 + (i - 0x5b));
    // 'a'..'z'  (ASCII 97..122) → tile 65..90
    for (let i = 0x61; i <= 0x7a; i++) this.map.set(i, 65 + (i - 0x61));
    // 全角字符 / 日文保留映射槽位（V0.4 后续从 BANK19 字符表填充）
  }

  /** 注册单条映射（供数据表注入） */
  register(charCode: number, tile: number): void {
    this.map.set(charCode & 0xff, tile & 0xff);
  }

  /** 批量注册（剧情脚本 / 字幕表 启动时一次性注入） */
  registerTable(entries: ReadonlyArray<readonly [number, number]>): void {
    for (const [c, t] of entries) this.register(c, t);
  }

  /** 字符 → tile（未注册返回 0 空格 tile） */
  toTile(charCode: number): number {
    return this.map.get(charCode & 0xff) ?? 0;
  }

  /** 一段文本 → tile 序列 */
  toTiles(text: ReadonlyArray<number>): number[] {
    return text.map((c) => this.toTile(c));
  }

  /** 注册数量 */
  get size(): number {
    return this.map.size;
  }
}
