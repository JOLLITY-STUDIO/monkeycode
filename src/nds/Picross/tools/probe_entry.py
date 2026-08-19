#!/usr/bin/env python3
"""检查 BL 目标与最近 ARM 序言的关系，反汇编大范围代码验证连贯性。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0
v8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")
v4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")

def decompress():
    dest_off = v8 >> 24
    comp_size = v8 & 0xFFFFFF
    src_start = comp_end - comp_size
    src = comp_end - dest_off - 1
    dst_end_va = VA0 + comp_end + v4
    buf = bytearray(dst_end_va - VA0 + 0x10000)
    dst = dst_end_va - 1
    bits = 0; ctrl = 0
    while src >= src_start:
        if bits == 0:
            ctrl = CODE[src]; src -= 1
            bits = 8
        bits -= 1
        if (ctrl >> bits) & 1 == 0:
            buf[dst - VA0] = CODE[src]; src -= 1
            dst -= 1
        else:
            hi = CODE[src]; src -= 1
            lo = CODE[src]; src -= 1
            off = ((hi << 8) | lo) & 0xFFF
            off += 2
            ln = hi + 0x20
            while ln >= 0:
                buf[dst - VA0] = buf[dst + off - VA0]
                dst -= 1
                ln -= 0x10
    return buf, dst + 1

buf, start = decompress()

def hexdump(va, n):
    print(f"== 0x{va:x} ==")
    for o in range(0, n, 16):
        chunk = bytes(buf[va+o-VA0:va+o+16-VA0])
        print(f"  [{va+o:#x}] " + " ".join(f"{b:02x}" for b in chunk))

def dis(va, n, mode, label):
    md = Cs(CS_ARCH_ARM, mode)
    data = bytes(buf[va-VA0:va-VA0+n])
    print(f"## {label} 0x{va:x} n={n:#x} mode={mode}")
    for i in md.disasm(data, va):
        print(f"  {i.address:#10x}  {i.mnemonic:8s} {i.op_str}")

print(f"输出 [{start:#x}, 0x20db058)")
hexdump(0x2024240, 0x30)
print()
dis(0x2023a8c, 0x80, CS_MODE_ARM, "序言0x2023a8c向前")
print()
dis(0x2024240, 0x60, CS_MODE_ARM, "BL目标0x2024240")
print()
dis(0x2023a8c, 0x40, CS_MODE_THUMB, "序言0x2023a8c thumb")
