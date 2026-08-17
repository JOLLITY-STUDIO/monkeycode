#!/usr/bin/env python3
"""B1: dump 第一条 0xC000 记录 0xbf0000-0xbfc000 的结构"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def hexdump(off, n=0x100, label=""):
    print(f"\n=== {label} @ {off:#x} ===")
    for i in range(0, n, 16):
        chunk = data[off+i:off+i+16]
        hexs = " ".join(f"{b:02x}" for b in chunk)
        asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
        print(f"  {off+i:08x}  {hexs:<47} |{asc}|")

REC = 0xBF0000
# 1. 记录头部
hexdump(REC, 0x100, "rec0 头")
# 2. 各 0x1000 边界
for off in (REC+0x1000, REC+0x2000, REC+0x3000, REC+0x5000, REC+0x8000, REC+0xA000, REC+0xB000):
    hexdump(off, 0x40, f"rec0 边界 {off-REC:#x}")
# 3. 记录尾部
hexdump(REC+0xBF00, 0x100, "rec0 尾 0xbf00-0xc000")

# 4. 每 0x40 行块值概要（找网格）
print("\n=== 每 0x400 块 top3 ===")
for off in range(REC, REC+0xC000, 0x400):
    c = Counter(data[off:off+0x400]).most_common(3)
    print(f"  {off:#08x}: " + " ".join(f"{v:02x}({cc})" for v, cc in c))
