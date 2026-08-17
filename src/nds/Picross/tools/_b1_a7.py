#!/usr/bin/env python3
"""B1: 精确 dump 记录14 与 0x232000 之前的区域，找索引/头部"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

# 1) 记录14 完整 dump
print("=== rec14 0x232A00..0x232A80 ===")
for off in range(0x232A00, 0x232A80, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 2) 0x230000..0x232660 之间是否还有记录（找 03 0c 之前的结构）
print("\n=== 03 0c markers 0x230000..0x233000 ===")
pos = 0x230000
while pos < 0x233000:
    i = d.find(b"\x03\x0c", pos)
    if i < 0:
        break
    print(f"  {i:#x}")
    pos = i + 1

# 3) 0x232000 之前的非零数据（找索引表）
print("\n=== 0x231E00..0x232660 非零行 ===")
for off in range(0x231E00, 0x232660, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00" * 16:
        print(f"{off:08X} " + chunk.hex(" "))
