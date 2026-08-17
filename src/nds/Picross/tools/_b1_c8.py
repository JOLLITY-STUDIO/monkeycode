#!/usr/bin/env python3
"""B1: 全文件扫描 256B 块, 分类: SOL(值2-9且含0), PAL(值1-15无0), DIGIT, ZERO, OTHER"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

BS = 256
N = len(data) - BS

def classify(off):
    blk = data[off:off+BS]
    c2_9 = sum(1 for b in blk if 2 <= b <= 9)
    c0 = sum(1 for b in blk if b == 0)
    c1_15 = sum(1 for b in blk if 1 <= b <= 15)
    cdig = sum(1 for b in blk if 0x30 <= b <= 0x3f)
    if cdig > 180:
        return "DIGIT"
    if c0 >= 250:
        return "ZERO"
    # SOL: 值2-9占多数且含0 (空格)
    if c2_9 >= 120 and c0 >= 20 and c0 <= 180:
        return "SOL"
    # PAL: 值1-15密集无0
    if c1_15 >= 200 and c0 <= 10:
        return "PAL"
    if c0 >= 220:
        return "ZERO2"
    return "OTHER"

runs = []
cur = None
cur_start = 0
for off in range(0, N, BS):
    t = classify(off)
    if t != cur:
        if cur is not None:
            runs.append((cur_start, off, cur))
        cur = t
        cur_start = off
if cur is not None:
    runs.append((cur_start, off + BS, cur))

# 汇总各类型
from collections import Counter
tc = Counter(r[2] for r in runs)
print(f"运行段数: {len(runs)}, 类型分布: {dict(tc)}")

# 打印 SOL 与 PAL 段
for s, e, t in runs:
    if t in ("SOL", "PAL"):
        print(f"  {t} {s:#x}-{e:#x} ({e-s}字节 = {(e-s)//BS}块)")
