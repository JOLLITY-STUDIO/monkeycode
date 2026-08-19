#!/usr/bin/env python3
"""追踪解压输出尾部（表区）每个字节的来源：字面量/ref/offset"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def u32(va):
    return int.from_bytes(CODE[va - VA0:va + 4 - VA0], "little")

R0 = 0x02080da8           # 无回写（ARMv5 LDM W=0）
packed = u32(R0 - 8)
decomp_size = u32(R0 - 4)
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
SRC_LO = R0 - comp_size
DST_END = R0 + decomp_size
BUF_BASE = 0x02000000
OUT0 = DST_END - BUF_BASE
BUF = bytearray(DST_END - BUF_BASE + 0x8000)
SRC = bytearray(len(BUF))  # 0=未写,1=字面量,2=ref拷贝
SRCOFF = [0] * len(BUF)    # ref 的 off / 字面量的源地址

r3 = SRC_HI_VA = R0 - dest_off
r1 = SRC_LO
r2 = DST_END
n_tok = 0
while r3 > r1:
    r5 = CODE[r3 - 1 - VA0]; r3 -= 1
    r6 = 8
    while True:
        r6 -= 1
        if r6 < 0:
            break
        n_tok += 1
        if r5 & 0x80:
            ip = CODE[r3 - 1 - VA0]; r3 -= 1
            r7b = CODE[r3 - 1 - VA0]; r3 -= 1
            off = ((ip << 8 | r7b) & 0xFFF) + 2
            ln = ip + 0x20
            while ln >= 0:
                val = BUF[(r2 + off) - BUF_BASE]  # 先读 r2+off（写指针递减前）
                r2 -= 1
                idx = r2 - BUF_BASE
                BUF[idx] = val
                SRC[idx] = 2
                SRCOFF[idx] = off
                ln -= 0x10
        else:
            v = CODE[r3 - 1 - VA0]; r3 -= 1
            r2 -= 1
            idx = r2 - BUF_BASE
            BUF[idx] = v
            SRC[idx] = 1
            SRCOFF[idx] = r3 + 1  # 字面量源地址(VA)
        r5 = (r5 << 1) & 0xFF
        if not (r3 > r1):
            break

print(f"输出=[{r2:#x},{DST_END:#x}) tokens={n_tok}")
print()
print("=== 表区 [0x020db040, 0x020db058) 逐字节来源 ===")
for va in range(0x020db040, DST_END):
    idx = va - BUF_BASE
    typ = "LIT" if SRC[idx] == 1 else "REF" if SRC[idx] == 2 else "???ZERO"
    print(f"  {va:#010x}: {BUF[idx]:02x}  {typ} (src_va={SRCOFF[idx]:#010x})")

print()
print("=== 池结尾 [0x020dafc0, 0x020db058) 逐字节来源 ===")
for va in range(0x020dafc0, DST_END):
    idx = va - BUF_BASE
    typ = "LIT" if SRC[idx] == 1 else "REF" if SRC[idx] == 2 else "ZERO"
    print(f"  {va:#010x}: {BUF[idx]:02x}  {typ} (src={SRCOFF[idx]:#010x})")
