#!/usr/bin/env python3
"""B1: 全文件 256B 块分类扫描，结果写入日志文件"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_c10.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()
N = len(data)
BS = 256
log(f"size={N}")

def classify(blk):
    c2_9 = 0
    c0 = 0
    c1_15 = 0
    cdig = 0
    for b in blk:
        if 2 <= b <= 9:
            c2_9 += 1
        elif b == 0:
            c0 += 1
        if 1 <= b <= 15:
            c1_15 += 1
        if 0x30 <= b <= 0x3f:
            cdig += 1
    if cdig > 180:
        return "DIGIT"
    if c2_9 >= 120 and 20 <= c0 <= 180:
        return "SOL"
    if c1_15 >= 200 and c0 <= 10:
        return "PAL"
    if c0 >= 250:
        return "ZERO"
    return "OTHER"

runs = []
cur = None
cur_start = 0
for off in range(0, N - BS, BS):
    t = classify(data[off:off+BS])
    if t != cur:
        if cur is not None:
            runs.append((cur_start, off, cur))
        cur = t
        cur_start = off
if cur is not None:
    runs.append((cur_start, N - BS + BS, cur))

from collections import Counter
tc = Counter(r[2] for r in runs)
log(f"运行段数: {len(runs)}, 类型: {dict(tc)}")

for s, e, t in runs:
    if t in ("SOL", "PAL"):
        log(f"  {t} {s:#x}-{e:#x} ({(e-s)//BS}块)")

out.close()
print("done")
