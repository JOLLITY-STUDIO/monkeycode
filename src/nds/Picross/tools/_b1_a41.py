#!/usr/bin/env python3
"""B1: dump 0xbd1000-0xbd2000 ASCII 记录结构（64B 子记录 + 页）"""
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

# 1. 页结构
hexdump(0x0BD1000, 0x300, "0xbd1000 页中段")
hexdump(0x0BD17A0, 0x100, "0xbd17a0 小零运行")
hexdump(0x0BD1800, 0x80, "0xbd1800 大零运行")

# 2. 记录起始（大零运行后）
hexdump(0x0BD1D33, 0x100, "0xbd1d33 记录起始")
hexdump(0x0BD3822, 0x100, "0xbd3822 大零运行2")

# 3. 64B 子记录结构：找 64B 周期
print("\n=== 0xbd0000-0xbd1800 每64B块头部 ===")
for off in range(0x0BD0000, 0x0BD1800, 0x40):
    chunk = data[off:off+0x20]
    hexs = " ".join(f"{b:02x}" for b in chunk)
    print(f"  {off:#08x}: {hexs}")
