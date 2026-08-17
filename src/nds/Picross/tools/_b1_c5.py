#!/usr/bin/env python3
"""B1: SOL区细分析 + 0x10c0000 解法确认 + 全文件解法块扫描"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

# 1. 0xbe3d00 区块直方图
S = 0x0BE3D00
print("=== 0xbe3d00 区前 60 块: 值分布 ===")
for b in range(60):
    blk = data[S+b*256:S+(b+1)*256]
    from collections import Counter
    c = Counter(blk)
    top = c.most_common(4)
    top_s = ", ".join(f"v{x[0]}:{x[1]}" for x in top)
    print(f"  块{b:3d}: {top_s}")

# 2. 0x10c0000 解法块确认
print("\n=== 0x10c0000 渲染前 4 块（16x16, 2-9=涂色）===")
for b in range(4):
    blk = data[0x10c0000+b*256:0x10c0000+(b+1)*256]
    print(f"--- 块{b} ---")
    for r in range(16):
        row = blk[r*16:(r+1)*16]
        print("  " + "".join("##" if x in (2,3,4,5,6,7,8,9) else ".." for x in row))

# 3. 全文件扫描 256B 解法块候选（值0-9占比高）
print("\n=== 全文件 256B 块: 值0-9占比>=90% 且非全零 ===")
cands = []
for off in range(0, len(data)-256, 256):
    blk = data[off:off+256]
    c09 = sum(1 for x in blk if 0 <= x <= 9)
    if c09 >= 230 and any(x != 0 for x in blk):
        cands.append(off)
# 聚类（间隔 256 连续）
groups = []
for off in cands:
    if groups and off == groups[-1][-1] + 256:
        groups[-1].append(off)
    else:
        groups.append([off])
print(f"候选块: {len(cands)}, 连续组: {len(groups)}")
for g in groups[:40]:
    print(f"  {g[0]:#x} x{len(g)} ({g[0]:#x}-{g[-1]+256:#x})")
if len(groups) > 40:
    print(f"  ... 共 {len(groups)} 组")
