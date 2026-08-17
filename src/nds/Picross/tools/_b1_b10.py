#!/usr/bin/env python3
"""B1: 详细 dump 记录 0xb2fd00 结构 + 段长度分布 + 尾部 256B 内容"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

off = 0x0B2FD00
seg = data[off:off+0x2000]

# 1. dump 0x34-0x200 区域 hex + ascii（间隔标记）
print("=== 0x34-0x300 字节（. = 非数字非零, 0x00 显示为空格）===")
for i in range(0x34, 0x300, 16):
    h = seg[i:i+16]
    hexs = " ".join(f"{b:02x}" for b in h)
    asci = "".join(chr(b) if 0x30 <= b <= 0x39 else " " for b in h)
    print(f"  {i:04x}: {hexs} |{asci}|")

# 2. 数字段长度分布
print("\n=== 数字段长度分布 ===")
lens = {}
i = 0x34
cur = 0
while i < 0x2000:
    b = seg[i]
    if 0x30 <= b <= 0x39:
        cur += 1
    else:
        if cur > 0:
            lens[cur] = lens.get(cur, 0) + 1
            cur = 0
    i += 1
if cur:
    lens[cur] = lens.get(cur, 0) + 1
for L in sorted(lens):
    print(f"  长度{L}: {lens[L]} 个")

# 3. 尾部 0x1A00-0x1B40 区域
print("\n=== 0x19E0-0x1B40 hex ===")
for i in range(0x19E0, 0x1B40, 16):
    h = seg[i:i+16]
    hexs = " ".join(f"{b:02x}" for b in h)
    asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in h)
    print(f"  {i:04x}: {hexs} |{asci}|")

# 4. 看段 [0..59] 的数值（ascii-0x30）
print("\n=== 前 60 段数值 ===")
i = 0x34
idx = 0
while i < 0x2000 and idx < 60:
    b = seg[i]
    if b == 0:
        i += 1
        continue
    if 0x30 <= b <= 0x39:
        # 收集一段
        j = i
        while j < 0x2000 and 0x30 <= seg[j] <= 0x39:
            j += 1
        s = seg[i:j]
        vals = [x - 0x30 for x in s]
        print(f"  [{idx:2d}] \"{s.decode()}\" -> {vals} (sum={sum(vals)}, n={len(vals)})")
        idx += 1
        i = j
    else:
        i += 1
