#!/usr/bin/env python3
"""B1: 精确 dump 0x0d10000 记录头部 + 0x0b30000 ASCII 区结构"""
import os, struct

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

# 1. 0xd10000 记录（8KB 内找结构）
hexdump(0x0D10000, 0x200, "0xd10000 记录头部")

# 2. 0xd10000 之前的区域
hexdump(0x0D0FE00, 0x200, "0xd0fe00 前导")

# 3. ASCII 区 0xb30000 结构
hexdump(0x0B30000, 0x200, "ASCII 0xb30000")

# 4. ASCII 区更后面（看是否含记录头）
hexdump(0x0B31000, 0x100, "ASCII 0xb31000")
hexdump(0x0B32000, 0x100, "ASCII 0xb32000")

# 5. 0xb3 区块里找非 ASCII 结构
print("\n=== 0xb30000 区块字节值分布 ===")
from collections import Counter
cnt = Counter(data[0x0B30000:0x0B40000])
print(sorted(cnt.items(), key=lambda kv: -kv[1])[:20])
