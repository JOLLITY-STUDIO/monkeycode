#!/usr/bin/env python3
"""B1: 扫描 90 条提示记录的开头，分组对比"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

START = 0x0B2FD00
END = 0x0BE3D00
REC = 0x2000

heads = []
for off in range(START, END, REC):
    h = bytes(data[off+0x34:off+0x34+96])
    heads.append((off, h))

# 分组
groups = Counter()
for off, h in heads:
    groups[h] += 1

print(f"记录总数: {len(heads)}, 不同开头: {len(groups)}")
for h, c in groups.most_common(20):
    ascii_h = "".join(chr(b) if 0x30 <= b < 0x7f else "." for b in h)
    print(f"  x{c}: {ascii_h}")

# 打印前 10 条的起始段
print("\n=== 前 6 条记录提示开头（前 200 字节 ascii）===")
for off, h in heads[:6]:
    txt = "".join(chr(b) if 0x30 <= b <= 0x3f else " " for b in h)
    print(f"  {off:#x}: {txt}")

# 找每条的结束位置（最后非零）
print("\n=== 每条记录提示区实际使用长度 ===")
for off, h in heads[:10]:
    seg = data[off:off+0x2000]
    # 找最后非零偏移
    last = 0
    for i in range(len(seg)-1, -1, -1):
        if seg[i] != 0:
            last = i
            break
    print(f"  {off:#x}: 最后非零 @ rel={last:#x} ({last} 字节)")
