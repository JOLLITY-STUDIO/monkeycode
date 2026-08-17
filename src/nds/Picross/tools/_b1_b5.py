#!/usr/bin/env python3
"""B1: dump 提示记录（0xb2fd00 起，每条 0x2000）头部与结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def hexdump(off, n, label=""):
    print(f"\n=== {label} @ {off:#x} ===")
    for i in range(0, n, 16):
        chunk = data[off+i:off+i+16]
        hexs = " ".join(f"{b:02x}" for b in chunk)
        asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
        print(f"  {off+i:08x}  {hexs:<47} |{asc}|")

# 记录1: 0xb2fd00-0xb31700
hexdump(0x0B2FD00, 0x200, "提示记录1 头部 0xb2fd00")
hexdump(0x0B2FF00, 0x100, "记录1 0xb2ff00")
hexdump(0x0B31000, 0x100, "记录1 0xb31000")
hexdump(0x0B31600, 0x100, "记录1 尾部 0xb31600")

# 记录2
hexdump(0x0B31D00, 0x100, "记录2 头部 0xb31d00")

# 记录边界 OTHER 区
hexdump(0x0B31700, 0x100, "记录1 OTHER 区 0xb31700")
