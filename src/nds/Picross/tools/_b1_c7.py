#!/usr/bin/env python3
"""B1: 渲染记录尾部 256B 彩色缩略图 + 统计 0x00 游程结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

# 1. 渲染记录 0xb2fd00 尾部 0x1A34-0x1B34 (256B)
for off in (0x0B2FD00, 0x0B31D00, 0x0B33D00):
    seg = data[off:off+0x2000]
    print(f"=== 记录 {off:#x} 尾部 256B 渲染（值=byte-0x20, 0=空）===")
    for r in range(16):
        row = seg[0x1A34+r*16:0x1A34+(r+1)*16]
        line = ""
        for x in row:
            v = x - 0x20
            if v <= 0:
                line += " ."
            else:
                line += f"{v:2d}"
        print(f"  {line}")
    # 值范围
    vals = seg[0x1A34:0x1B34]
    print(f"  值范围: {min(vals)}-{max(vals)}, 非0x20字节: {sum(1 for v in vals if v!=0x20)}")

# 2. 统计 0x00 游程
print("\n=== 记录 0xb2fd00 提示区 0x00 游程统计 ===")
seg = data[0x0B2FD00:0x0B2FD00+0x2000]
runs = {}
i = 0x34
while i < 0x2000:
    if seg[i] == 0:
        j = i
        while j < 0x2000 and seg[j] == 0:
            j += 1
        L = j - i
        runs[L] = runs.get(L, 0) + 1
        i = j
    else:
        i += 1
print(f"  0x00 游程长度分布: {dict(sorted(runs.items()))}")
