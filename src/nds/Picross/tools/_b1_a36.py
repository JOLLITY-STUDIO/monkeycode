#!/usr/bin/env python3
"""B1: 0x0bf0000-0x10c0000 全区域子区分析 + 记录边界"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

A, B = 0x0BF0000, 0x10C0000
# 1. 全区域值分布
cnt = Counter(data[A:B])
print("=== 全区域值分布 top20 ===")
for v, c in cnt.most_common(20):
    print(f"  0x{v:02x}: {c:8d}  ({c*100//len(data[A:B]):2d}%)")

# 2. 每 0x1000 块的值集合指纹变化（检测子区边界）
print("\n=== 子区边界检测（值集合突变点） ===")
prev = None
for off in range(A, B, 0x1000):
    chunk = data[off:off+0x1000]
    c = Counter(chunk)
    top = set(v for v, _ in c.most_common(6))
    if prev is not None and top != prev:
        print(f"  {off:#08x}: {prev} -> {top}")
    prev = top

# 3. 每 0x1000 块 top2 值
print("\n=== 每 0x1000 块 top2 ===")
for off in range(A, B, 0x1000):
    chunk = data[off:off+0x1000]
    c = Counter(chunk).most_common(2)
    print(f"  {off:#08x}: " + " ".join(f"{v:02x}({cc*100//0x1000}%)" for v, cc in c))
