#!/usr/bin/env python3
"""精确追踪 LZ 流前 N 个 token 的输出字节，并与解压器整体输出对比。"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0
v8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")
v4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")
dest_off = v8 >> 24
comp_size = v8 & 0xFFFFFF

src_start = comp_end - comp_size
src = comp_end - dest_off - 1
dst_end_va = VA0 + comp_end + v4
buf = bytearray(dst_end_va - VA0 + 0x10000)
dst = dst_end_va - 1

bits = 0; ctrl = 0
n_tok = 0
while src >= src_start:
    if bits == 0:
        ctrl = CODE[src]; src -= 1
        bits = 8
        ctrl_src = src + 1
    bits -= 1
    bit = (ctrl >> bits) & 1
    if bit == 0:
        b = CODE[src]; src -= 1
        buf[dst - VA0] = b
        if n_tok < 40:
            print(f"tok{n_tok:2d} LIT b={b:02x} → dst={dst:#x}")
        dst -= 1
    else:
        hi = CODE[src]; src -= 1
        lo = CODE[src]; src -= 1
        off = ((hi << 8) | lo) & 0xFFF + 2
        ln = hi + 0x20
        cnt = 0
        while ln >= 0:
            v = buf[dst + off - VA0]
            buf[dst - VA0] = v
            if n_tok < 40:
                print(f"tok{n_tok:2d} REF hi={hi:02x} lo={lo:02x} off={off} 读到[{dst+off:#x}]={v:02x} → dst={dst:#x}")
            dst -= 1
            ln -= 0x10
            cnt += 1
        if n_tok < 40:
            print(f"        (共{cnt}次复制)")
    n_tok += 1
    if n_tok == 40:
        break

print()
print("== 前40个token后，输出区域 [0x20db020, 0x20db058) ==")
for va in range(0x20db020, 0x20db058, 16):
    chunk = bytes(buf[va-VA0:va+16-VA0])
    print(f"  [{va:#x}] " + " ".join(f"{b:02x}" for b in chunk))
