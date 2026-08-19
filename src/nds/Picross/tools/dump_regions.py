#!/usr/bin/env python3
"""对比解压输出各区域 + dump 头前结构"""
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

print(f"输出=[{r2 + BUF_BASE:#x},{DST_END:#x}) size={DST_END - (r2 + BUF_BASE):#x}")
print(f"decomp_size={decomp_size:#x} 期望起点={DST_END - decomp_size:#x}")
print()

def dump(va, n, label):
    b = bytes(BUF[va - BUF_BASE:va + n - BUF_BASE])
    print(f"--- {label} {va:#010x} ({n}B) ---")
    for i in range(0, n, 16):
        chunk = b[i:i + 16]
        print(f"  {va + i:#010x}: " + " ".join(f"{x:02x}" for x in chunk))

dump(0x02004000, 0x80, "输出起点(旧解读)")
dump(0x02082808, 0x80, "期望起点(终点-decomp_size)")
dump(0x020da9c0, 0x80, "池起点")
dump(0x020db040, 0x18, "表区")

print()
print("=== ROM 头前结构 0x02080d70-0x02080da8 ===")
for va in range(0x02080d70, 0x02080da8, 16):
    b = CODE[va - VA0:va + 16 - VA0]
    print(f"  {va:#010x}: " + " ".join(f"{x:02x}" for x in b))

print()
print("=== 解压输出中搜索 bl 0x2024240 / 0x20116bc 编码 ===")
# BL: 0xEBxxxxxx, 偏移 = target - (pc+8)
def find_bl(target, buf, base_va):
    hits = []
    for i in range(0, len(buf) - 3, 4):
        w = int.from_bytes(buf[i:i + 4], "little")
        if w >> 24 == 0xEB:
            off = (w & 0xFFFFFF) << 2
            if off & 0x2000000:
                off -= 0x4000000
            dest = base_va + i + 8 + off
            if dest == target:
                hits.append(base_va + i)
    return hits

for tgt in [0x2024240, 0x20116bc, 0x2011800, 0x2026884, 0x201f974]:
    hits = find_bl(tgt, BUF, 0x02000000)
    print(f"  bl {tgt:#x}: {[hex(h) for h in hits[:10]]}")
