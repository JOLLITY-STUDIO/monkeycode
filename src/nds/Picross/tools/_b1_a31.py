#!/usr/bin/env python3
"""B1: 分析 0x0a00000-0x0b30000 ASCII 数字文本区结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def ascii_dump(off, n=0x100):
    chunk = data[off:off+n]
    out = []
    for b in chunk:
        if 0x20 <= b < 0x7f:
            out.append(chr(b))
        else:
            out.append(".")
    return "".join(out)

# 1. 0x0a30000 之前的区域（0x0a10000-0x0a30000）看过渡
print("=== 0x0a10000-0x0a10400 ASCII ===")
print(ascii_dump(0x0A10000))
print("=== 0x0a20000-0x0a20400 ASCII ===")
print(ascii_dump(0x0A20000))

# 2. 0x0a30000-0x0a32000（零率 12% 区）
print("\n=== 0x0a30000-0x0a30400 ASCII ===")
print(ascii_dump(0x0A30000))

# 3. 0x0b30000 起始 ASCII
print("\n=== 0x0b30000-0x0b30800 ASCII ===")
print(ascii_dump(0x0B30000, 0x800))

# 4. 找该区间的边界：扫描 0x0a00000-0x0c00000 找出 ASCII 数字密集区起点
print("\n=== 扫描 ASCII 数字密集区（0x0a00000-0x0c00000） ===")
best = []
for off in range(0x0A00000, 0x0C00000, 0x100):
    chunk = data[off:off+0x100]
    digit = sum(1 for b in chunk if 0x30 <= b <= 0x39)
    nullc = chunk.count(0)
    if digit > 0x40:
        best.append((off, digit, nullc))
print(f"数字密集块（每块 >64 数字）: {len(best)} 个")
for off, d, n in best[:20]:
    print(f"  {off:#x} digits={d} nulls={n}  ascii={ascii_dump(off, 32)!r}")
