#!/usr/bin/env python3
"""B1 分析：file_94 字符串与结构探查"""
import re

d = open("extracted/unnamed/file_94.bin", "rb").read()
print("size:", len(d))

# 1) ASCII 字符串扫描
print("--- ascii strings (len>=5):")
for m in re.finditer(rb"[\x20-\x7e]{5,}", d[:0x40000]):
    s = m.group().decode("ascii")
    if any(c.isalpha() for c in s):
        print(f"  {m.start():#x}: {s!r}")

# 2) 头部 u32 序列（0x3C 前与后）
print("--- u32 at 0x00..0x100:")
for off in range(0, 0x100, 4):
    v = int.from_bytes(d[off:off + 4], "little")
    if v != 0:
        print(f"  {off:#06x}: {v:#010x} ({v})")

# 3) 0x58 附近模式
print("--- 0x54..0x100 hex:")
for off in range(0x54, 0x100, 16):
    print(f"  {off:#06x}: {d[off:off+16].hex(' ')}")

# 4) 检查是否全文件有某种周期性（前 0x4000 按 4 字节统计）
import collections
c = collections.Counter()
for i in range(0, 0x4000, 4):
    c[d[i:i+4]] += 1
print("--- top u32 (first 0x4000):", c.most_common(12))
