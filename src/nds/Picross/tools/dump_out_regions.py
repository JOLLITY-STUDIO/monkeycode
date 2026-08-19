#!/usr/bin/env python3
"""解压（忠实汇编语义）后 dump 关键区域：表区/池区/输出起点/终点"""
import os

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
            r7b = CODE[r3 - 1 - VA0]; r3 -= 1
            off = ((ip << 8 | r7b) & 0xFFF) + 2
            ln = ip + 0x20
            while ln >= 0:
                r2 -= 1
                idx = r2 - BUF_BASE
                BUF[idx] = BUF[idx + off]
                ln -= 0x10
        else:
            v = CODE[r3 - 1 - VA0]; r3 -= 1
            r2 -= 1
            BUF[r2 - BUF_BASE] = v
        r5 = (r5 << 1) & 0xFF
        if not (r3 > r1):
            break

print(f"packed={packed:#x} dest_off={dest_off:#x} comp_size={comp_size:#x} decomp_size={decomp_size:#x}")
print(f"输入=[{r1:#x},{R0 - dest_off:#x}) 输出=[{r2 + 0:#x},{DST_END:#x}) 总写入={DST_END - r2:#x}")

def dump(va, n, label):
    print(f"\n=== {label} [{va:#x}, {va+n:#x}) ===")
    for off in range(0, n, 16):
        row = BUF[va - BUF_BASE + off:va - BUF_BASE + off + 16]
        hexs = " ".join(f"{b:02x}" for b in row)
        asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in row)
        print(f"  {va+off:#010x}: {hexs:<47} |{asc}|")

dump(0x020db040, 24, "描述符表")
dump(0x020da9c0, 0x80, "池区起点(输出内)")
dump(0x020db058 - 0x80, 0x80, "输出区终点前")
dump(0x02004000, 0x40, "输出区起点(与输入重叠)")
