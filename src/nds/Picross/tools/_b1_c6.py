#!/usr/bin/env python3
"""B1: 0x10c0000 解法区详细分析"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

S = 0x10c0000
# 值分布
c = Counter(data[S:S+0x10000])
print("0x10c0000-0x10d0000 值分布:")
print("  " + ", ".join(f"v{k}:{v}" for k, v in sorted(c.items())[:20]))

# 前 16 块 256B 值分布
print("\n=== 前 16 块 256B 值分布 ===")
for b in range(16):
    blk = data[S+b*256:S+(b+1)*256]
    c2 = Counter(blk)
    top = ", ".join(f"v{k}:{v}" for k, v in c2.most_common(5))
    print(f"  块{b:3d}: {top}")

# 渲染块 3（有空格的那块）用不同尺寸
print("\n=== 块3 渲染尝试 ===")
blk = data[S+3*256:S+4*256]
for size in (16, 8, 32):
    print(f"--- {size}x{size} ---")
    for r in range(size):
        row = blk[r*size:(r+1)*size]
        print("  " + "".join("##" if x in (2,3,4,5,6,7,8,9) else ".." for x in row))
