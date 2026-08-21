/**
 * CharMap — 字符编码映射 (双 tile 表)
 * @bank 00 ($88CA 字符处理, $8A14 双 tile 表)
 *
 * 职责: ROM 字符编码 → 双 tile 图案映射, 用于文本渲染。
 *
 * 命名规范: 旧名 char-map → 新名 CharMap。
 *
 * TODO: 从 asm 提取 $8A14 双 tile 表
 */
export const CHAR_MAP_DOUBLE: Record<number, readonly number[]> = {
  // TODO: 从 asm/bank00 提取双 tile 表
};

export function decodeChar(code: number): readonly number[] | undefined {
  // TODO: 字符解码
  return CHAR_MAP_DOUBLE[code];
}

export default CHAR_MAP_DOUBLE;
