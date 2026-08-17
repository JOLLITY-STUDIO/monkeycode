#!/usr/bin/env python3
"""B1: 分析 0xbe3d00-0xc00000 SOL 区结构 + 渲染前几块"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

S = 0x0BE3D00
E = 0x0C00000
print(f"SOL 区: {S:#x}-{E:#x} = {E-S} 字节")

# 1. 每 256B 块统计值分布
print("\n=== 前 40 块 (256B) 值分布 ===")
for b in range(40):
    blk = data[S+b*256:S+(b+1)*256]
    zeros = sum(1 for x in blk if x == 0)
    low = sum(1 for x in blk if 1 <= x <= 1)
    mid = sum(1 for x in blk if 2 <= x <= 9)
    hi = sum(1 for x in blk if x >= 0x30)
    print(f"  块{b:3d} @ {S+b*256:#x}: zero={zeros:3d} v1={low:3d} v2-9={mid:3d} ascii={hi:3d}")

# 2. 渲染前 8 块（每格1字节，值2-9涂黑）
print("\n=== 渲染前 8 块（16x16）===")
for b in range(8):
    blk = data[S+b*256:S+(b+1)*256]
    print(f"--- 块{b} @ {S+b*256:#x} ---")
    for r in range(16):
        row = blk[r*16:(r+1)*16]
        print("  " + "".join("##" if x in (2,3,4,5,6,7,8,9) else ".." for x in row))
