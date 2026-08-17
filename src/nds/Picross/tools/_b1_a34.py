#!/usr/bin/env python3
"""B1: 0x0b00000-0x1200000 区域结构分析：子区值分布 + 分隔符扫描"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

# 1. 每 0x4000 (16KB) 一个块的值分布概要
print("=== 值分布（每 16KB 块） ===")
ranges = [(0x0B00000, 0x0BF0000, "ASCII区"),
          (0x0BF0000, 0x0C00000, "02区"),
          (0x0D00000, 0x0E00000, "14区"),
          (0x0F00000, 0x0FD0000, "混合区"),
          (0x10C0000, 0x10D0000, "尾部16x16")]
for a, b, name in ranges:
    print(f"\n== {name} {a:#x}-{b:#x} ==")
    for off in range(a, b, 0x10000):
        chunk = data[off:off+0x10000]
        cnt = Counter(chunk)
        top = cnt.most_common(6)
        uniq = len(cnt)
        z = cnt.get(0, 0)
        print(f"  {off:#08x} uniq={uniq:3d} zero={z*100//0x10000:3d}% top={[(f'{v:02x}',c*100//0x10000) for v,c in top]}")

# 2. 分隔符扫描：连续 >=16 字节的 00 / 02 / FF 运行
print("\n=== 长零/长02/长FF 运行 (>=16B) ===")
for v in (0x00, 0x02, 0xFF):
    run = 0
    runstart = 0
    for off in range(0x0B00000, 0x1200000):
        if data[off] == v:
            if run == 0:
                runstart = off
            run += 1
        else:
            if run >= 16:
                print(f"  0x{v:02x}: {runstart:#x} len={run}")
            run = 0
    if run >= 16:
        print(f"  0x{v:02x}: {runstart:#x} len={run}")

# 3. 尝试找重复记录：连续 0x20 字节块重复率
print("\n=== 每 0x10000 块内 256B 块重复 ===")
for off in range(0x0BF0000, 0x10D0000, 0x10000):
    chunk = data[off:off+0x10000]
    blocks = [chunk[i:i+256] for i in range(0, 0x10000, 256)]
    eq = sum(1 for i in range(1, len(blocks)) if blocks[i] == blocks[i-1])
    print(f"  {off:#08x}: 相邻256B块相同 {eq}/{len(blocks)-1}")
