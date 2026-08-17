#!/usr/bin/env python3
"""B1: 对比整条 0x2000 记录 + 详细解析单条记录提示结构"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

START = 0x0B2FD00
END = 0x0BE3D00
REC = 0x2000

# 1. 整条记录对比
recs = []
for off in range(START, END, REC):
    recs.append((off, bytes(data[off:off+REC])))

groups = Counter()
for off, r in recs:
    groups[r] += 1
print(f"整条记录: {len(recs)}, 不同: {len(groups)}")
for r, c in groups.most_common():
    print(f"  x{c}: 首个偏移 {recs[[i for i,(o,x) in enumerate(recs) if x==r][0]][0]:#x}")

# 2. 详细解析第一条记录
print("\n=== 解析 0xb2fd00 记录 ===")
off = 0x0B2FD00
seg = data[off:off+REC]

# 打印前 0x40 字节 hex + ascii
print("头部 0x40 字节:")
for i in range(0, 0x40, 16):
    h = seg[i:i+16]
    hexs = " ".join(f"{b:02x}" for b in h)
    asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in h)
    print(f"  {i:04x}: {hexs:<48} {asci}")

# 从 0x34 开始扫描提示段：0x00 分隔的 ASCII 数字段
print("\n提示段（00 分隔的数字段）:")
i = 0x34
segments = []
cur = bytearray()
while i < REC:
    b = seg[i]
    if b == 0:
        if cur:
            segments.append(bytes(cur))
            cur = bytearray()
    elif 0x30 <= b <= 0x39:
        cur.append(b)
    else:
        # 非数字非零字节 - 记录一下
        if cur:
            segments.append(bytes(cur))
            cur = bytearray()
    i += 1
if cur:
    segments.append(bytes(cur))

print(f"总段数: {len(segments)}")
for idx, s in enumerate(segments[:40]):
    print(f"  [{idx:3d}] {s.decode()}")
