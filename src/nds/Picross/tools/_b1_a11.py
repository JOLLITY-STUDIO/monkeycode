#!/usr/bin/env python3
"""B1: 分析 0xada000 拼图记录区与 0x16212ac 区域"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

print("=== 0xada000..0xadab00 ===")
for off in range(0xada000, 0xadab00, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00"*16:
        print(f"{off:08X} " + chunk.hex(" "))

print("\n=== 0x1621200..0x1621400 ===")
for off in range(0x1621200, 0x1621400, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00"*16:
        print(f"{off:08X} " + chunk.hex(" "))
