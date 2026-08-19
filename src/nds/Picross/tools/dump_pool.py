#!/usr/bin/env python3
"""dump 拷贝源池 [0x020da9c0, 0x020db058) 并 ARM 反汇编。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
packed = int.from_bytes(CODE[R0 - 8 - VA0:R0 - 4 - VA0], "little")
decomp = int.from_bytes(CODE[R0 - 4 - VA0:R0 - VA0], "little")
do = packed >> 24
cs = packed & 0xFFFFFF
src = R0 - do
dst = R0 + decomp
buf = bytearray(dst - VA0 + 0x4000)
d = dst - 1
bits = 0
ctrl = 0
while src > R0 - cs:
    if bits == 0:
        ctrl = CODE[src - 1 - VA0]; src -= 1
        bits = 8
    bits -= 1
    if (ctrl >> bits) & 1 == 0:
        buf[d - VA0] = CODE[src - 1 - VA0]; src -= 1
        d -= 1
    else:
        hi = CODE[src - 1 - VA0]; src -= 1
        lo = CODE[src - 1 - VA0]; src -= 1
        off = (((hi << 8) | lo) & 0xFFF) + 2
        ln = hi + 0x20
        while ln >= 0:
            buf[d - VA0] = buf[d + off - VA0]
            d -= 1
            ln -= 0x10

print("=== pool [0x020da9c0, 0x020db058) hex ===")
for va in range(0x020da9c0, 0x020db058, 16):
    chunk = bytes(buf[va - VA0:va + 16 - VA0])
    print(f"{va:08x} " + " ".join(f"{b:02x}" for b in chunk))

md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
print("\n=== pool ARM disasm ===")
insns = list(md.disasm(bytes(buf[0x020da9c0 - VA0:0x020db058 - VA0]), 0x020da9c0))
for i in insns:
    print(f"{i.address:08x}  {i.mnemonic:8s} {i.op_str}")
