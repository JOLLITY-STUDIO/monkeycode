#!/usr/bin/env python3
"""扫描解压输出，寻找合法描述符表 (dest, len, fill) 序列。"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0

# 用解读 A 解压（r1=[r0-8] packed, r2=[r0-4] decomp_size）
v_8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")
v_4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")

def decompress(r1val, r2val):
    dest_off = r1val >> 24
    comp_size = r1val & 0xFFFFFF
    decomp_size = r2val
    src_start = comp_end - comp_size
    src = comp_end - dest_off - 1
    dst_end_va = VA0 + comp_end + decomp_size
    buf = bytearray(dst_end_va - VA0 + 0x1000)
    buf_base = VA0
    dst = dst_end_va - 1
    bits = 0; ctrl = 0
    while src >= src_start:
        if bits == 0:
            ctrl = CODE[src]; src -= 1
            bits = 8
        bits -= 1
        if (ctrl >> bits) & 1 == 0:
            buf[dst - buf_base] = CODE[src]; src -= 1
            dst -= 1
        else:
            hi = CODE[src]; src -= 1
            lo = CODE[src]; src -= 1
            offset = ((hi << 8) | lo) & 0xFFF
            offset += 2
            ln = hi + 0x20
            while ln >= 0:
                buf[dst - buf_base] = buf[dst + offset - buf_base]
                dst -= 1
                ln -= 0x10
    out_start = dst + 1
    return buf, out_start, dst_end_va

buf, out_start, out_end = decompress(v_8, v_4)
print(f"解压输出: [{out_start:#x}, {out_end:#x}) size={out_end-out_start:#x}")

def rd_u32(va):
    return int.from_bytes(bytes(buf[va-VA0:va-VA0+4]), "little")

def is_ram(a):
    return 0x02000000 <= a < 0x02400000

# 扫描整个输出，找 (dest,len,fill) 模式，要求 >=3 个连续且 dest 是 RAM 地址
print("\n== 扫描合法描述符序列 ==")
found = []
for va in range(out_start, out_end - 12, 4):
    d, l, f = rd_u32(va), rd_u32(va+4), rd_u32(va+8)
    if is_ram(d) and 0 < l < 0x100000 and f < 0x10000:
        # 检查后续是否还有 1-2 个合法描述符
        d2, l2, f2 = rd_u32(va+12), rd_u32(va+16), rd_u32(va+20)
        if is_ram(d2) and 0 < l2 < 0x100000 and f2 < 0x10000:
            found.append((va, d, l, f, d2, l2, f2))
            if len(found) <= 20:
                print(f"  @{va:#x}: ({d:#x},{l:#x},{f:#x}) ({d2:#x},{l2:#x},{f2:#x})")

print(f"\n共找到 {len(found)} 处双描述符序列")

# 检查指定位置
print("\n== 0x020db040 处原始 u32 ==")
for i in range(0, 0x18, 4):
    print(f"  [0x{0x020db040+i:#x}] = {rd_u32(0x020db040+i):#010x}")
