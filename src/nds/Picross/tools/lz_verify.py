#!/usr/bin/env python3
"""修正版解压后：dump 池区/描述符目标区/关键代码区，反汇编验证"""
import os, struct

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
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

def dump(va, n, label, cols=16):
    print(f"\n=== {label} [{va:#x}, {va+n:#x}) ===")
    for off in range(0, n, cols):
        row = BUF[va - BUF_BASE + off:va - BUF_BASE + off + cols]
        hexs = " ".join(f"{b:02x}" for b in row)
        asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in row)
        print(f"  {va+off:#010x}: {hexs:<{(cols*3)-1}} |{asc}|")

def arm_words(va, n):
    return [struct.unpack_from("<I", BUF, va - BUF_BASE + 4*i)[0] for i in range(n)]

print("=== 池区 [0x020da9c0, 0x020db040) = desc0(0x620B) + desc1(0x60B) ===")
dump(0x020da9c0, 0x680, "池区全部", cols=16)
print("\n=== desc1 池数据 [0x020dafe0, 0x020db040) ===")
dump(0x020dafe0, 0x60, "desc1 池数据", cols=16)
print("\n=== 关键代码区 ARM 字 ===")
for va in [0x20116bc, 0x2011800, 0x201f974, 0x2024240, 0x2026884, 0x2026b24]:
    print(f"\n{va:#x}:")
    print("  " + " ".join(f"{w:08x}" for w in arm_words(va, 8)))
