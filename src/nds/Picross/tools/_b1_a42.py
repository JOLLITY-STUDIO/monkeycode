#!/usr/bin/env python3
"""B1: 解析 0x0b30000-0x0be0000 ASCII 数字串结构"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

A, B = 0x0B30000, 0x0BE0000
chunk = data[A:B]

# 用 00 分割，统计每段长度分布
segs = []
cur = bytearray()
for b in chunk:
    if b == 0:
        if cur:
            segs.append(bytes(cur))
            cur = bytearray()
    elif 0x30 <= b < 0x40:  # 数字/符号
        cur.append(b)
    else:
        if cur:
            segs.append(bytes(cur))
            cur = bytearray()
if cur:
    segs.append(bytes(cur))

print(f"总段数: {len(segs)}")
lens = Counter(len(s) for s in segs)
print(f"\n段长分布: {sorted(lens.items())[:20]}")

# 段内容分布
vals = Counter(segs)
print(f"\n最常用段:")
for v, c in vals.most_common(25):
    print(f"  {v.decode('ascii')!r}: {c}")

# 打印前 80 个段
print(f"\n前 100 段:")
for i, s in enumerate(segs[:100]):
    print(f"  [{i:3d}] len={len(s):2d} {s.decode('ascii')!r}")
