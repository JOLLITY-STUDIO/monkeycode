#!/usr/bin/env python3
"""
从 file_94 拼图数据库提取拼图 → 生成 src/data/puzzles.ts

状态: v0.2 —— 格式未完全确认，输出带 TODO(B1) 的 stub 数据。
行为:
  1. 扫描 file_94 中的维度标记（05 00 05 00 / 0A 00 0A 00 / 0F 00 0F 00 等）
     并打印上下文 hex（供后续 ARM9 代码确认记录格式）。
  2. 生成 puzzles.ts（当前为手工确认的 5x5 教程 stub）。
  3. 格式确认后，将 STUB_PUZZLES 替换为真实解析逻辑即可。

已知（来自 hex 分析 0x232A00 附近）:
  - 存在 8 字节零前缀 + cnt:u16 + nhints:u16 + 提示序列 的结构（疑似教程区）
  - 解法位图位置 / 记录头字段顺序待确认
"""
import struct, os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
OUT_TS = os.path.join(ROOT, "src", "data", "puzzles.ts")

# TODO(B1): file_94 记录格式确认后替换为真实解析结果
STUB_PUZZLES = [
    {"id": 0, "name": "Tutorial 1", "w": 5, "h": 5, "diff": 0, "hex": "ffffff80"},
    {"id": 1, "name": "Tutorial 2", "w": 5, "h": 5, "diff": 0, "hex": "fc631f80"},
    {"id": 2, "name": "Tutorial 3", "w": 5, "h": 5, "diff": 0, "hex": "fc6b1f80"},
]

DIM_PATTERNS = [(5, 5), (10, 10), (15, 15), (5, 10), (10, 5)]


def scan_dims(data: bytes, limit=6):
    """扫描维度标记并返回 (offset, w, h, context_hex)"""
    hits = []
    for w, h in DIM_PATTERNS:
        pat = struct.pack("<HH", w, h)
        start = 0
        while True:
            i = data.find(pat, start)
            if i < 0:
                break
            hits.append((i, w, h))
            start = i + 1
    hits.sort()
    for off, w, h in hits[:limit]:
        chunk = data[off - 16 : off + 32]
        ctx = " ".join(f"{b:02X}" for b in chunk)
        print(f"  dim {w}x{h} @ {off:#x}  ctx[-16..+32]: {ctx}")


def main():
    if not os.path.exists(P94):
        print(f"[warn] {P94} 不存在，直接输出 stub")
    else:
        data = open(P94, "rb").read()
        print(f"file_94 size: {len(data)} bytes")
        print("维度标记扫描（前若干条，用于格式确认）:")
        scan_dims(data)
        print()

    os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
    with open(OUT_TS, "w", encoding="utf-8") as f:
        f.write(
            """/**
 * 拼图数据 —— 由 tools/extract_puzzles.py 生成
 *
 * TODO(B1): file_94 记录格式确认后，将 STUB 替换为真实解析数据。
 * 当前为 3 个 5x5 教程拼图（打通渲染/交互链路用）。
 * 格式：solution 为 1bpp 行主序位图（hex 字符串），1=填充，MSB 优先。
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
        for p in STUB_PUZZLES:
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
    print(f"generated {len(STUB_PUZZLES)} puzzles (stub) -> src/data/puzzles.ts")


if __name__ == "__main__":
    main()
