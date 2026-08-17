#!/usr/bin/env python3
"""B1: 教程区记录精确分析 — dump 所有记录 + 前置区域"""
import struct

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

# 1) 找 03 0c 和 01 04 标记 in 0x230000..0x235000
print("=== markers in 0x230000..0x235000 ===")
for pat, name in [(b"\x03\x0c", "03 0c"), (b"\x01\x04", "01 04")]:
    pos = 0x230000
    hits = []
    while True:
        i = d.find(pat, pos)
        if i < 0 or i > 0x235000:
            break
        hits.append(i)
        pos = i + 1
    print(f"{name}: {len(hits)} hits: " + " ".join(f"{h:#x}" for h in hits[:40]))

# 2) 完整 dump 0x232000..0x232680（教程区开头，看是否有索引/记录）
print("\n=== dump 0x232000..0x232680 ===")
for off in range(0x232000, 0x232680, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 3) 从 0x232660 开始，按 64 字节间距 dump 记录 0..16 的字节
print("\n=== records (64-byte pitch from 0x232660) ===")
for j in range(0, 17):
    s = 0x232660 + j * 0x40
    rec = d[s:s + 0x40]
    print(f"\nrec[{j}] {s:#x}..{s + 0x40:#x}")
    for off in range(0, 0x40, 16):
        print(f"  +{off:02X} " + rec[off:off + 16].hex(" "))
