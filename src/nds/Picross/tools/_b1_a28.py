#!/usr/bin/env python3
"""B1: 精确 dump 0x2329a0..0x232b40，含 rec[15] 特殊记录"""
import struct

F = "d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin"
d = open(F, "rb").read()

s, e = 0x2329A0, 0x232B40
print(f"=== raw bytes {s:#x}..{e:#x} ===")
for off in range(s, e, 16):
    chunk = d[off:off+16]
    hexs = " ".join(f"{b:02x}" for b in chunk)
    asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
    print(f"{off:08X}  {hexs:<47} |{asc}|")

# u16 视图
print(f"\n=== u16 view ===")
for off in range(s, e, 16):
    vals = struct.unpack_from("<8H", d, off)
    print(f"{off:08X}  " + " ".join(f"{v:04x}" for v in vals))
