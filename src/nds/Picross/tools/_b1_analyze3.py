#!/usr/bin/env python3
"""B1 分析：0x232A00 教程区 + 0x330 指针区 + 偏移表验证"""
import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()

# 1) 0x232A00 教程区
print("=== 0x232A00 region ===")
for off in range(0x2329C0, 0x232B40, 16):
    print(f"{off:08X} {d[off:off+16].hex(' ')}")

# 2) 0x330 指针指向处
print("=== 0x330 region ===")
for off in range(0x300, 0x400, 16):
    print(f"{off:08X} {d[off:off+16].hex(' ')}")

# 3) 验证 0x2318 处的 816 是否为指针表
print("=== 0x22F0..0x2340 u32s ===")
for off in range(0x22F0, 0x2340, 4):
    v = struct.unpack_from("<I", d, off)[0]
    if v:
        print(f"  {off:08X}: {v:#010x} ({v})")
