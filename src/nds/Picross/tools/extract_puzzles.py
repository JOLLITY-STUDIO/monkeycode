#!/usr/bin/env python3
"""
从 file_94 拼图数据库提取拼图 → 生成 src/data/puzzles.ts

状态: v0.4 —— B1 真实数据管线完成（解法数据定案）。

已确认结构（tools/_b1_c*.py / _b1_d1.py 结论）:
  - 解法区: 0x10c0000 起 256B/块（16x16，每格1字节），空=0/1/2、填充=3-9，
    256 块 = 256 个拼图解法（已渲染验证为清晰像素画）。
  - 提示记录区: 0xb2fd00 起 90 条 0x2000B 记录，含 ASCII 提示数字段
    （0x30-0x3F 每字节=值0-15，'0'-'9'=0-9，':'=10...'?'=15，00 分隔，单记录约801 list）。
  - _b1_d1 验证: 记录区提示与解法区【不顺序对应】（匹配率 3/32），映射未确认。

设计:
  - 拼图数据只取解法区 256 块（真实解法）。
  - 提示数字不依赖 ROM（引擎从解法自动推导，见 src/core/hints.ts），正确性自动保证。
  - 不再导出 puzzles-hints.ts（记录区提示与解法映射未确认，避免误导）。
"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
OUT_TS = os.path.join(ROOT, "src", "data", "puzzles.ts")
OUT_HINTS = os.path.join(ROOT, "src", "data", "puzzles-hints.ts")

SOL_START = 0x10C0000   # 解法区起点
SOL_BLOCK = 256         # 解法块大小(16x16)
SOL_COUNT = 256         # 解法块总数


def sol_to_hex(sol: bytes) -> str:
    """256B 解法(空=0/1/2, 填充=3-9) → 1bpp 行主序 MSB hex"""
    bits = []
    for b in sol:
        bits.append("1" if b >= 3 else "0")
    out = []
    for r in range(16):
        row = bits[r * 16:(r + 1) * 16]
        for i in range(0, 16, 8):
            out.append(f"{int(''.join(row[i:i + 8]), 2):02X}")
    return "".join(out)


def difficulty_of(sol: bytes) -> int:
    ratio = sum(1 for b in sol if b >= 3) / 256.0
    if ratio < 0.25:
        return 0
    if ratio < 0.45:
        return 1
    return 2


def main():
    if not os.path.exists(P94):
        print(f"[fatal] {P94} 不存在")
        sys.exit(1)
    data = open(P94, "rb").read()
    print(f"file_94 size: {len(data)} bytes")

    puzzles = []
    for i in range(SOL_COUNT):
        sol = data[SOL_START + i * SOL_BLOCK: SOL_START + (i + 1) * SOL_BLOCK]
        if len(sol) < SOL_BLOCK:
            break
        puzzles.append({
            "id": i,
            "name": f"Picross {i + 1}",
            "w": 16, "h": 16,
            "diff": difficulty_of(sol),
            "hex": sol_to_hex(sol),
        })

    # 自检: 前 3 块解法 ASCII art
    for i in range(3):
        sol = data[SOL_START + i * SOL_BLOCK: SOL_START + (i + 1) * SOL_BLOCK]
        print(f"--- solution block {i} (16x16, #=filled) ---")
        for r in range(16):
            print("".join("#" if b >= 3 else "." for b in sol[r * 16:(r + 1) * 16]))
    print(f"total puzzles: {len(puzzles)}")

    os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
    with open(OUT_TS, "w", encoding="utf-8") as f:
        f.write(
            """/**
 * 拼图数据 —— 由 tools/extract_puzzles.py 生成（v0.4 B1 真实数据）
 * 来源: extracted/unnamed/file_94.bin 解法区 0x10c0000 起 256 块（16x16 每格1字节，
 *       空=0/1/2、填充=3-9）。
 * 提示数字由引擎从解法自动推导（src/core/hints.ts），不依赖 ROM 提示数据。
 * 格式: solutionHex 为 1bpp 行主序位图（hex 字符串），1=填充，MSB 优先。
 */
export interface PuzzleData {
  id: number;
  name: string;
  width: number;
  height: number;
  difficulty: number;
  unlocked: boolean;
  solutionHex: string;
}

export const PUZZLES: PuzzleData[] = [
"""
        )
        for p in puzzles:
            f.write(
                f"""  {{
    id: {p['id']},
    name: "{p['name']}",
    width: {p['w']},
    height: {p['h']},
    difficulty: {p['diff']},
    unlocked: true,
    solutionHex: "{p['hex']}",
  }},
"""
            )
        f.write("];\n")
    print(f"generated {len(puzzles)} puzzles -> src/data/puzzles.ts")

    # 清理旧的 hints 文件（映射未确认，避免误导）
    if os.path.exists(OUT_HINTS):
        os.remove(OUT_HINTS)
        print(f"removed {OUT_HINTS}")


if __name__ == "__main__":
    main()
