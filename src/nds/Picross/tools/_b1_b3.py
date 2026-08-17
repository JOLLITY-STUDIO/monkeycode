#!/usr/bin/env python3
"""B1: dump 字母区结构 + 数字区/字母区分界"""
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

# 数字区到字母区分界
hexdump(0x0B5FD00, 0x100, "数字/字母分界区 0xb5fd00")
# 字母区中段
hexdump(0x0B60000, 0x100, "字母区 0xb60000")
# 字母区后段
hexdump(0x0B70000, 0x80, "字母区 0xb70000")
# 区域尾部
hexdump(0x0BDFF00, 0x100, "区域尾部 0xbdff00")
