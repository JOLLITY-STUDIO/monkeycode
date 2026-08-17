#!/usr/bin/env python3
"""B1: 解析提示记录1(0xb2fd34-0xb31800) 全部段 + 记录间相似度"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def segs(off, end):
    """解析 ASCII 数字段（00 分隔）"""
    out = []
    cur = bytearray()
    for i in range(off, end):
        b = data[i]
        if 0x30 <= b <= 0x3f or 0x41 <= b <= 0x5a:
            cur.append(b)
        else:
            if cur:
                out.append((i - len(cur), bytes(cur)))
                cur = bytearray()
    if cur:
        out.append((end - len(cur), bytes(cur)))
    return out

# 记录1: 0xb2fd00-0xb31800（含 OTHER 块），提示从 0x34 起
R1 = 0x0B2FD00
s = segs(R1 + 0x34, R1 + 0x1B00)
print(f"记录1 提示段总数: {len(s)}")
print("\n前 120 段:")
for i, (off, seg) in enumerate(s[:120]):
    print(f"  [{i:3d}] rel={off-R1:#06x} len={len(seg):2d} {seg.decode('ascii','replace')!r}")

# 检查记录1、2、3 开头的相似度
print("\n=== 记录开头 64B 对比 ===")
for rid, base in [(1, 0x0B2FD00), (2, 0x0B31D00), (3, 0x0B33D00), (4, 0x0B35D00)]:
    a = data[base+0x34:base+0x34+64]
    print(f"  记录{rid}: {a.hex(' ')}")
