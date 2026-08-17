#!/usr/bin/env python3
"""Deep-dive file_94 puzzle database format analysis."""
import struct

BASE = "d:/studio/github/monkeycode/src/nds/Picross/extracted"
p = open(f"{BASE}/unnamed/file_94.bin", "rb").read()

# print structured dump 0x0-0x300: offset, hex, ascii
for i in range(0, 0x300, 16):
    row = p[i:i + 16]
    hx = " ".join(f"{b:02x}" for b in row)
    asc = "".join(chr(b) if 32 <= b < 127 else "." for b in row)
    print(f"{i:06x}  {hx:48s}  {asc}")

print()
# search for candidate puzzle headers: (w,h) small u16 pairs around 0x800-0x2000
print("candidate small u16 pairs (w,h <= 40) in first 0x4000:")
for i in range(0, 0x4000, 2):
    w = struct.unpack_from("<H", p, i)[0]
    h = struct.unpack_from("<H", p, i + 2)[0]
    if 1 <= w <= 40 and 1 <= h <= 40 and i > 0:
        # context bytes
        ctx = p[i - 8:i + 8]
        if all(b in (0, 0xFF, 0xAA, 0xBB) for b in ctx):
            print(f"  off {i:#06x}: w={w} h={h} ctx={ctx.hex()}")
