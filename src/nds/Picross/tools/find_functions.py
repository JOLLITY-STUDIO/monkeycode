#!/usr/bin/env python3
"""在解压输出中查找完整函数（prologue...bx lr / pop {...,pc}），验证是否真代码。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

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
END = 0x20db058

# 找到所有 push {..lr} 序言，然后在其后 0x400 字节内找 bx lr / pop {..pc}
print("== 完整函数候选 (prologue + bx lr/pop pc 在 0x400 内) ==")
fns = []
for o in range(0, END - start - 4, 4):
    va = start + o
    w = int.from_bytes(buf[va-VA0:va+4-VA0], "little")
    if (w & 0xFFFF0000) == 0xE92D0000 and (w & 0x0000F000) in (0x4000, 0x5000):
        # 在后续 0x400 内找 bx lr (0xE12FFF1E) 或 pop {..pc} (e8bd 8xxx)
        for o2 in range(4, 0x400, 4):
            w2 = int.from_bytes(buf[va+o2-VA0:va+o2+4-VA0], "little")
            if w2 == 0xE12FFF1E or ((w2 & 0xFFFF0000) == 0xE8BD0000 and (w2 & 0x8000)):
                fns.append((va, o2, w2))
                print(f"  fn@{va:#x}  len={o2:#x}  epilogue={w2:08x}")
                break

print(f"\n共 {len(fns)} 个完整函数")
# 检查 BL 目标附近是否有完整函数
BLT = [0x2024240, 0x2026884, 0x2026b24, 0x201f974, 0x2024c04, 0x20116bc, 0x2011800, 0x2025374, 0x2026844, 0x2026b60]
print("\n== BL 目标与完整函数匹配 ==")
for tgt in BLT:
    near = [va for va, ln, ep in fns if abs(va - tgt) < 0x800]
    if near:
        print(f"  {tgt:#x} → 附近函数: {[hex(x) for x in near]}")
    else:
        print(f"  {tgt:#x} → 无")
