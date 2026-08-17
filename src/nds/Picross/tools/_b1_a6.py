#!/usr/bin/env python3
"""B1: 精确分析 0x232000 教程区记录结构"""
import struct

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

# 1) 完整 dump 0x232600..0x232B00
print("=== full dump 0x232600..0x232B00 ===")
for off in range(0x232600, 0x232B00, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 2) 解析 03 0c 标记
print("\n=== 03 0c markers in 0x232000..0x233000 ===")
pos = 0x232000
while pos < 0x233000:
    i = d.find(b"\x03\x0c", pos)
    if i < 0:
        break
    print(f"  {i:#x}")
    pos = i + 1

# 3) 对每个 record（以 03 0c 为结束标记）解码：8零 + 03 00 + 数据
print("\n=== record decode ===")
ends = []
pos = 0x232000
while pos < 0x233000:
    i = d.find(b"\x03\x0c", pos)
    if i < 0:
        break
    ends.append(i)
    pos = i + 1

for j, e in enumerate(ends):
    s = e - 64 + 2 if j > 0 else 0x232000
    rec = d[s:e]
    print(f"\nrec[{j}] {s:#x}..{e:#x} len={len(rec)}")
    # 前 16 字节
    print("  head:", rec[:16].hex(" "))
    # u16 列表
    u16s = struct.unpack_from("<%dH" % (len(rec) // 2), rec)
    print("  u16:", " ".join(f"{v:02x}" for v in u16s))
