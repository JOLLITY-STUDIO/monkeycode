#!/usr/bin/env python3
"""B1 分析：file_94 结构探查（临时脚本，分析完成后删除）"""
import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()
print("size:", len(d))

# 1) 头部区域重复性
print("--- head 0..0x200 (每16字节):")
for off in range(0, 0x200, 16):
    print(f"{off:06X}", d[off:off + 16].hex(" "))

# 2) 5x5 / 10x10 / 15x15 维度对分布
print("--- dim pair scan (first 0x50000):")
for w, h in [(5, 5), (10, 10), (15, 15), (5, 10), (10, 5)]:
    pat = struct.pack("<HH", w, h)
    offs = []
    start = 0
    while True:
        i = d.find(pat, start, 0x50000)
        if i < 0:
            break
        offs.append(i)
        start = i + 2
    print(f"  {w}x{h}: {len(offs)} hits, first: {[hex(x) for x in offs[:5]]}")
