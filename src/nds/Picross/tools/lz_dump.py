#!/usr/bin/env python3
"""修正版解压 → 落盘 extracted/arm9_decomp.bin"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
CODE = open(os.path.join(ROOT, "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def u32(va):
    return int.from_bytes(CODE[va - VA0:va + 4 - VA0], "little")

R0 = 0x02080da8
packed = u32(R0 - 8)
decomp_size = u32(R0 - 4)
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
SRC_LO = R0 - comp_size
DST_END = R0 + decomp_size
BUF_BASE = 0x02000000
BUF = bytearray(DST_END - BUF_BASE + 0x8000)

r3 = R0 - dest_off
r1 = SRC_LO
r2 = DST_END
while r3 > r1:
    r5 = CODE[r3 - 1 - VA0]; r3 -= 1
    r6 = 8
    while True:
        r6 -= 1
        if r6 < 0:
            break
        if r5 & 0x80:
            ip = CODE[r3 - 1 - VA0]; r3 -= 1
            lo = CODE[r3 - 1 - VA0]; r3 -= 1
            off = ((ip << 8 | lo) & 0xFFF) + 2
            ln = ip + 0x20
            while ln >= 0:
                val = BUF[(r2 + off) - BUF_BASE]
                r2 -= 1
                BUF[r2 - BUF_BASE] = val
                ln -= 0x10
        else:
            v = CODE[r3 - 1 - VA0]; r3 -= 1
            r2 -= 1
            BUF[r2 - BUF_BASE] = v
        r5 = (r5 << 1) & 0xFF
        if not (r3 > r1):
            break

out = bytes(BUF[:DST_END - BUF_BASE])
with open(os.path.join(ROOT, "extracted", "arm9_decomp.bin"), "wb") as f:
    f.write(out)
print("written extracted/arm9_decomp.bin", hex(len(out)), "bytes [0x02004000,", hex(DST_END), ")")
