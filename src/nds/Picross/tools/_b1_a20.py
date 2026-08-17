#!/usr/bin/env python3
"""B1: dump file_94 0x400000-0x900000 候选提示数字区 + rec[15] 完整字节"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

# rec[15] 完整字节
print("=== rec[15] 0x232a20..0x232a60 ===")
for off in range(0x232a20, 0x232a60, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 0x400000..0x401000 采样
print("\n=== 0x400000..0x401000 ===")
for off in range(0x400000, 0x401000, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00"*16:
        print(f"{off:08X} " + chunk.hex(" "))

# 0x900000 采样
print("\n=== 0x900000..0x901000 ===")
for off in range(0x900000, 0x901000, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00"*16:
        print(f"{off:08X} " + chunk.hex(" "))
