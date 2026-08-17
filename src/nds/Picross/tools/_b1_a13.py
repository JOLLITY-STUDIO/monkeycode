#!/usr/bin/env python3
"""B1: 分析 file_95 拼图数据结构"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_95.bin", "rb").read()
print("size:", len(d))

print("\n=== head 0x000..0x200 ===")
for off in range(0, 0x200, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

print("\n=== 0xe40..0xf00 (首个 10x10 附近) ===")
for off in range(0xe40, 0xf00, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

print("\n=== 0x5efe0..0x5f060 (20x15 附近) ===")
for off in range(0x5efe0, 0x5f060, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))
