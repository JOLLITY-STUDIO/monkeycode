#!/usr/bin/env python3
"""B1: dump 0x0b30000-0x10c0000 拼图数据候选区关键位置"""
import os

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

# 1. ASCII 数字区
hexdump(0x0B30000, 0x100, "ASCII区起点")
hexdump(0x0B30100, 0x100, "ASCII区+0x100")
hexdump(0x0B38000, 0x80, "ASCII区中段")

# 2. 过渡区
hexdump(0x0BDF000, 0x100, "ASCII→二进制过渡")
hexdump(0x0BE0000, 0x200, "0xbe0000")

# 3. 二进制密集区
hexdump(0x0BF0000, 0x100, "0xbf0000 (02 02 区)")
hexdump(0x0D10000, 0x100, "0xd10000 (14 14 区)")
hexdump(0x0E30000, 0x100, "0xe30000")
hexdump(0x0FC0000, 0x100, "0xfc0000 (04 04 02 02)")
hexdump(0x10C0000, 0x100, "0x10c0000 (尾部)")
