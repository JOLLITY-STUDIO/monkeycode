#!/usr/bin/env python3
"""B1: 将 0xbf0000-0xbfc000 记录渲染为 ASCII 图像（64 宽）"""
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
            if b == 0x00 or b == 0x02:
                line.append(".")
            elif b == 0x01:
                line.append(" ")
            elif b == 0x0f:
                line.append("F")
            elif b == 0xff:
                line.append("#")
            elif 0x20 <= b < 0x7f:
                line.append(chr(b))
            else:
                line.append("o")
        print("".join(line))

# 整条记录 64 宽渲染
render(0x0BF0000, 0xC000, 64, "rec0 64宽")
