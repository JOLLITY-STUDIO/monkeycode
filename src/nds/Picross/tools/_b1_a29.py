#!/usr/bin/env python3
"""B1: dump 0x0b30000-0x0c00000 疑似主拼图数据区"""
import struct, os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

# 1. 0x0b30000-0x0b34000（重复模式区起点）
print("=== 0x0b30000-0x0b32000（重复模式区） ===")
for off in range(0x0B30000, 0x0B32000, 0x40):
    chunk = data[off : off + 0x40]
    hexs = " ".join(f"{b:02X}" for b in chunk[:24])
    print(f"  {off:#08x}: {hexs}")

# 2. 0x0be0000-0x0be2000（过渡区）
print("\n=== 0x0be0000-0x0be2000（过渡区） ===")
for off in range(0x0BE0000, 0x0BE2000, 0x40):
    chunk = data[off : off + 0x40]
    hexs = " ".join(f"{b:02X}" for b in chunk[:24])
    print(f"  {off:#08x}: {hexs}")

# 3. 0x0bf0000-0x0bf1000（02 02 区）
print("\n=== 0x0bf0000-0x0bf1000（02 02 区） ===")
for off in range(0x0BF0000, 0x0BF1000, 0x40):
    chunk = data[off : off + 0x40]
    hexs = " ".join(f"{b:02X}" for b in chunk[:24])
    print(f"  {off:#08x}: {hexs}")

# 4. 0x0d10000-0x0d11000
print("\n=== 0x0d10000-0x0d11000 ===")
for off in range(0x0D10000, 0x0D11000, 0x40):
    chunk = data[off : off + 0x40]
    hexs = " ".join(f"{b:02X}" for b in chunk[:24])
    print(f"  {off:#08x}: {hexs}")
