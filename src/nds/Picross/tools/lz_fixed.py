#!/usr/bin/env python3
"""修正版解压：REF 读源 = 当前 r2+off（写指针递减之前），符合 ldrb r0,[r2,r7]; strb r0,[r2,#-1]! 语义"""
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
                val = BUF[(r2 + off) - BUF_BASE]  # 先读 r2+off（递减前）
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

def dump(va, n, label):
    print(f"\n=== {label} [{va:#x}, {va+n:#x}) ===")
    for off in range(0, n, 16):
        row = BUF[va - BUF_BASE + off:va - BUF_BASE + off + 16]
        hexs = " ".join(f"{b:02x}" for b in row)
        asc = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in row)
        print(f"  {va+off:#010x}: {hexs:<47} |{asc}|")

print(f"packed={packed:#x} dest_off={dest_off:#x} comp_size={comp_size:#x} decomp_size={decomp_size:#x}")
print(f"输入=[{r1:#x},{R0 - dest_off:#x}) 输出=[{r2:#x},{DST_END:#x}) 总写入={DST_END - r2:#x}")

dump(0x020db040, 24, "描述符表")
w0, w1, w2, w3, w4, w5 = struct.unpack_from("<6I", BUF, 0x020db040 - BUF_BASE)
print(f"\ndesc0 = dst={w0:#x} copy={w1:#x}w({w1*4:#x}B) zero={w2:#x}w({w2*4:#x}B)")
print(f"desc1 = dst={w3:#x} copy={w4:#x}w({w4*4:#x}B) zero={w5:#x}w({w5*4:#x}B)")
print(f"池需求 = {(w1+w4)*4:#x}B, 池起点={0x020da9c0:#x}, 终点={0x020da9c0+(w1+w4)*4:#x} (输出终点 {DST_END:#x})")
dump(0x020da9c0, 0x40, "池起点")

# BL 目标检查：解压后各地址的 ARM 指令
def arm(va):
    return struct.unpack_from("<I", BUF, va - BUF_BASE)[0] if va < DST_END else None

print("\n=== 关键地址首指令 ===")
for va in [0x20116bc, 0x2011800, 0x201f974, 0x2024240, 0x2026884, 0x2026b24]:
    print(f"  {va:#x}: {arm(va):08x}")
