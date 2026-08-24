/**
 * CharMap — 字符集映射（ASCII/日文假名/汉字两套表）
 *
 * V0.1 stub：契约签名；数据在 V0.2 从 asm 字符表提取（声明式 Map）。
 */
export class CharMap {
  /** 字符 → tile 号映射（V0.2 从 asm 提取填充） */
  private readonly map: Map<number, number> = new Map();

  /** 注册映射（供数据表注入） */
  register(charCode: number, tile: number): void {
    this.map.set(charCode, tile);
  }

  /** 字符 → tile（未注册返回 0） */
  toTile(charCode: number): number {
    return this.map.get(charCode) ?? 0;
  }

  /** 一段文本 → tile 序列 */
  toTiles(text: ReadonlyArray<number>): number[] {
    return text.map((c) => this.toTile(c));
  }
}