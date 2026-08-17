#!/usr/bin/env python3
"""B1: 检查 0x232360-0x232660 区域 + file_30/file_95 结构"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

# 1) 0x232360-0x232660 完整 dump
print("=== 0x232360..0x232660 ===")
for off in range(0x232360, 0x232660, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00"*16:
        print(f"{off:08X} " + chunk.hex(" "))

# 2) 0x232000-0x232360 是否有 03 0c 之外的结构? 统计 u16 值分布
import struct
print("\n=== 0x230000..0x240000 u16 值分布 ===")
from collections import Counter
c = Counter()
for off in range(0x230000, 0x240000, 2):
    c[struct.unpack_from("<H", d, off)[0]] += 1
print("top 30:", c.most_common(30))

# 3) file_30 头部
f30 = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_30.bin", "rb").read()
print("\n=== file_30 head 0x100 ===")
for off in range(0, min(0x100, len(f30)), 16):
    print(f"{off:08X} " + f30[off:off+16].hex(" "))
