#!/usr/bin/env python3
"""B1: 全文件定位提示记录块（快速版）"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

N = len(data)
# 快速预筛：0x34 处是数字，0x00-0x33 全零
cands = []
for off in range(0, N - 0x2000, 4):
    if not (0x30 <= data[off+0x34] <= 0x39):
        continue
    if data[off:off+0x34] != b"\x00" * 0x34:
        continue
    cands.append(off)

print(f"预筛候选: {len(cands)}")
# 用数字占比过滤
recs = []
for off in cands:
    digit = sum(1 for b in data[off+0x34:off+0x1A00] if 0x30 <= b <= 0x39)
    if digit >= 500:
        recs.append(off)

print(f"有效记录块: {len(recs)}")
# 聚类
groups = []
for off in recs:
    placed = False
    for g in groups:
        d = off - g[0]
        if d >= 0 and d % 0x2000 == 0:
            g.append(off)
            placed = True
            break
    if not placed:
        groups.append([off])

print(f"组数: {len(groups)}")
for g in groups:
    print(f"  {g[0]:#x} x{len(g)}")
