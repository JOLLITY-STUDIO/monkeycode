#!/usr/bin/env python3
"""B1: 分析 0x0d10000-0x0d12000 是否拼图记录"""
import struct, os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

# 找 0x0d10000 前后的连续边界：分析从 0x0d10000 开始 u16 值流
off = 0x0D10000
print("=== 0x0d10000 u16 值流（前 64 个） ===")
u16 = struct.unpack_from("<64H", data, off)
print(u16)
# 每个 u16 对应偏移
for i, v in enumerate(u16):
    print(f"  +{i*2:04x} ({off+i*2:08x}): {v}")

# 分析这一区域是否呈现拼图记录的重复结构（比如每行 15 个值）
# 尝试统计连续相同值段
print("\n=== 0x0d10000 起 0x400 范围内值分布 ===")
chunk = data[off:off+0x400]
from collections import Counter
cnt = Counter(chunk)
for v, c in sorted(cnt.items()):
    if c > 5:
        print(f"  0x{v:02x}: {c} 次")
