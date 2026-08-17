#!/usr/bin/env python3
"""B1 分析：file_94 记录边界与尺寸模式扫描"""
import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()
print("size:", len(d))

# 1) 单字节尺寸对 05 05 / 0a 0a / 0f 0f 扫描
print("--- byte-size pairs scan (first 0x200000):")
for w in [5, 10, 15]:
    pat = bytes([w, w])
    offs = []
    start = 0
    while True:
        i = d.find(pat, start, 0x200000)
        if i < 0:
            break
        offs.append(i)
        start = i + 1
    print(f"  {w}x{w} byte pair: {len(offs)} hits, first: {[hex(x) for x in offs[:6]]}")

# 2) 8字节零模式统计
print("--- 8-byte-zero runs (len>=8) count in first 0x40000:", sum(1 for i in range(0, 0x40000 - 8) if d[i:i+8] == b"\x00" * 8))

# 3) 文件尾部结构
print("--- tail 0x17B1000..:")
for off in range(0x17B1000, len(d), 16):
    print(f"  {off:08X} {d[off:off+16].hex(' ')}")
    if off > 0x17B1020:
        break

# 4) 统计不同 u16 值的出现（前 0x100000）
import collections
c = collections.Counter()
for i in range(0, 0x100000, 2):
    c[struct.unpack_from("<H", d, i)[0]] += 1
print("--- top u16 values (first 0x100000):", c.most_common(20))
