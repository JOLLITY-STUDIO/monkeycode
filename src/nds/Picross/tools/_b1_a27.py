#!/usr/bin/env python3
"""B1: 精确解码 0x232000 教程区全部记录，识别 rec[15] 字段语义"""
import struct

F = "d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin"
with open(F, "rb") as f:
    data = f.read()

print(f"file_94 size: {len(data):#x}")

# ---- 扫描教程区 0x232000..0x232B00 内的 64 字节记录 ----
start, end = 0x232000, 0x232B00
# 先找 8 零字节前缀
prefix = bytes(8)
recs = []
off = start
while off < end - 64:
    if data[off:off+8] == prefix:
        body = data[off+8:off+8+54]  # 27 u16
        vals = struct.unpack("<27H", body)
        tail = data[off+62:off+64]
        recs.append((off, vals, tail.hex()))
    off += 1

print(f"\n=== 8零前缀记录: {len(recs)} ===")
for off, vals, tail in recs:
    nonzero = [v for v in vals if v != 0]
    flag = " <== 特殊" if len(nonzero) > 5 else ""
    print(f"off={off:#08x} tail={tail} nz={len(nonzero):2d} {vals}{flag}")

# ---- 打印特殊记录前后原始字节 ----
for off, vals, tail in recs:
    if len([v for v in vals if v != 0]) > 5:
        print(f"\n=== 特殊记录 @ {off:#08x} 原始字节 (96B) ===")
        base = off - 32
        for i in range(0, 96, 16):
            chunk = data[base+i:base+i+16]
            hexs = " ".join(f"{b:02x}" for b in chunk)
            asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
            print(f"  {base+i:08x}  {hexs}  |{asc}|")
        break
