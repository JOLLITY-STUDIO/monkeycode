#!/usr/bin/env python3
"""B1: 渲染 0x0bf0000-0x10c0000 解法位图区，识别网格尺寸与记录边界"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def render_grid(off, w, h, label=""):
    """按 w 列渲染，02=空格，其他=填充"""
    out = []
    for r in range(h):
        row = data[off + r*w : off + (r+1)*w]
        if len(row) < w:
            break
        line = "".join("." if b in (0, 2) else "#" for b in row)
        out.append(line)
    print(f"--- {label} @ {off:#x} ({w}x{h}) ---")
    print("\n".join(out))

# 1. 二进制区起点
for off in [0x0BF0000, 0x0BF0100, 0x0C00000, 0x0D10000, 0x0E30000, 0x0FC0000, 0x10B0000]:
    render_grid(off, 16, 16, "16x16 try")

# 2. 尝试 10x10
render_grid(0x0BF0000, 10, 10, "10x10 try")
render_grid(0x0D10000, 10, 10, "10x10 try")
render_grid(0x10B0000, 10, 10, "10x10 try")

# 3. 尝试 15x15
render_grid(0x0BF0000, 15, 15, "15x15 try")
