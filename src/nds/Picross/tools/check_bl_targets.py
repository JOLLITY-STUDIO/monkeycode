#!/usr/bin/env python3
"""验证解码正确性：检查 BL 目标在解压产物中的字节 + 反汇编"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def u32(va):
    return int.from_bytes(CODE[va - VA0:va + 4 - VA0], "little")

# ---- 无回写几何 ----
R0 = 0x02080da8
packed = u32(R0 - 8)
decomp_size = u32(R0 - 4)
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
SRC_LO = R0 - comp_size
DST_END = R0 + decomp_size
BUF_BASE = 0x02000000
OUT0 = DST_END - BUF_BASE
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
                BUF[r2 - BUF_BASE] = BUF[r2 + off - BUF_BASE]
                ln -= 0x10
        else:
            v = CODE[r3 - 1 - VA0]; r3 -= 1
            r2 -= 1
            BUF[r2 - BUF_BASE] = v
        r5 = (r5 << 1) & 0xFF
        if not (r3 > r1):
            break

print(f"输出=[{r2 + BUF_BASE:#x},{DST_END:#x})")
print()

def show(va, label):
    if not (0x02000000 <= va < DST_END):
        print(f"{label} {va:#x}: 在输出之外")
        return
    idx = va - BUF_BASE
    b = bytes(BUF[idx:idx + 16])
    ws = [int.from_bytes(BUF[idx + i:idx + i + 4], "little") for i in range(0, 16, 4)]
    print(f"{label} {va:#x}: bytes={' '.join(f'{x:02x}' for x in b)}")
    print(f"        words={' '.join(f'{w:08x}' for w in ws)}")

for va in [0x2024240, 0x2026884, 0x2026b24, 0x201f974, 0x20116bc, 0x2011800, 0x2010000]:
    show(va, "BL目标")

print()
print("=== 输出中 0x2010000 处 (函数?) ===")
for va in range(0x2010000, 0x2010080, 16):
    idx = va - BUF_BASE
    b = bytes(BUF[idx:idx + 16])
    print(f"  {va:#010x}: {' '.join(f'{x:02x}' for x in b)}")
