#!/usr/bin/env python3
"""B1: 全文件定位提示记录块（非 0x2000 对齐，按特征聚类）"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

N = len(data)
cands = []
for off in range(0, N - 0x2000):
    if off % 4 != 0:
        continue
    blk = data[off:off+0x2000]
    if not all(b == 0 for b in blk[:0x34]):
        continue
    if not (0x30 <= blk[0x34] <= 0x39):
        continue
    digit = sum(1 for b in blk[0x34:0x1A00] if 0x30 <= b <= 0x39)
    if digit < 500:
        continue
    cands.append(off)

print(f"候选块: {len(cands)}")
# 聚类：间隔为 0x2000 的倍数即同组
groups = []
for off in cands:
    placed = False
    for g in groups:
        base = g[0]
        d = off - base
        if d >= 0 and d % 0x2000 == 0:
            g.append(off)
            placed = True
            break
    if not placed:
        groups.append([off])

print(f"组数: {len(groups)}")
for g in groups:
    print(f"  {g[0]:#x} x{len(g)}")
