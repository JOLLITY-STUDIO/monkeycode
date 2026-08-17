#!/usr/bin/env python3
"""B1: 渲染记录102(0x10b8000) 与其他记录对比"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def render(off, n, w=64, label=""):
    print(f"\n=== {label} @ {off:#x} ({n} bytes, {w} wide) ===")
    rows = n // w
    for r in range(rows):
        row = data[off + r*w : off + (r+1)*w]
        line = []
        for b in row:
            if b in (0x00, 0x02):
                line.append(".")
            elif b == 0x01:
                line.append(" ")
            elif b == 0x0f:
                line.append("F")
            else:
                line.append("o")
        print("".join(line))

# 记录 102 = 0x10b8000, 长度 0xC000 (到 0x10c4000)
# 1. 记录开头
render(0x10B8000, 0x800, 64, "rec102 开头 0x800")

# 2. 解法区附近 (0x10c0000 之前)
render(0x10BFC00, 0x800, 64, "rec102 解法区前")

# 3. 解法区 0x10c0000
render(0x10C0000, 0x800, 64, "rec102 0x10c0000")

# 4. 记录 1 (0xbfc000) 开头对比
render(0x0BFC000, 0x800, 64, "rec1 开头 0x800")
