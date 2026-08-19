#!/usr/bin/env python3
"""扫描解压输出中的 ARM/Thumb 代码痕迹，并检查关键区域的字节统计。"""
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
    decomp_size = v4
    src_start = comp_end - comp_size
    src = comp_end - dest_off - 1
    dst_end_va = VA0 + comp_end + decomp_size
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
out = bytes(buf[start-VA0:0x20db058-VA0])

# 1. ARM 函数序言扫描: e92d 4xxx/5xxx (push {r4..r11,lr}), e12fff1e (bx lr), e1a00000 (nop)
print("== ARM push {...,lr} 序言 (0xE92D4/5xxx) 位置 ==")
n = 0
for o in range(0, len(out)-3, 2):
    w = int.from_bytes(out[o:o+4], "little")
    if (w & 0xFFFF0000) == 0xE92D0000 and (w & 0x0000F000) in (0x4000, 0x5000):
        va = start + o
        print(f"  {va:#x}")
        n += 1
        if n > 40: break
print(f"  (共{n}处, 扫描{len(out)}字节)")

# 2. Thumb 函数序言: push {r4-r7,lr} = b5xx/b4xx; pop {...,pc} = bdxx/bcxx
print("\n== Thumb push/pop 序言 (b5/bd) 位置 ==")
n = 0
for o in range(0, len(out)-1, 2):
    w = int.from_bytes(out[o:o+2], "little")
    if (w & 0xFF00) in (0xB500, 0xB400, 0xBD00, 0xBC00):
        va = start + o
        print(f"  {va:#x} ({w:04x})")
        n += 1
        if n > 40: break
print(f"  (共{n}处)")

# 3. 字节分布（判断是否为代码区）
from collections import Counter
for lo, hi, name in ((0x00000,0x08000,"0x2004000-0x2008000"), (0x80000,0x90000,"0x2008000-0x2009000"),
                     (0xd0000,0xd7058,"0x20db000-0x20db058"), (0xc0000,0xd0000,"0x20d0000-0x20dc000")):
    if hi <= len(out):
        seg = out[lo:hi]
        c = Counter(seg)
        top = c.most_common(5)
        print(f"\n{name}: 常见字节 {top} 熵≈{sum(1 for b,_ in top)}")
