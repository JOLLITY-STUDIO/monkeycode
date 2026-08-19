#!/usr/bin/env python3
"""在忠实解压输出中反汇编所有已知 BL 入口，判断哪个是合法代码。"""
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
print(f"输出 [{start:#x}, 0x20db058) size={0x20db058-start:#x}")
print(f"decomp_size 字段 = {v4:#x} → 输出结束地址 = {R0+v4:#x}")
print()

def dump(va, n, mode, label):
    if not (start <= va < 0x20db058):
        print(f"## {label} 0x{va:x} 不在输出区")
        return
    md = Cs(CS_ARCH_ARM, mode)
    data = bytes(buf[va-VA0:va-VA0+n])
    insns = list(md.disasm(data, va))
    print(f"## {label} 0x{va:x} [{mode} {n//2}字节]")
    for i in insns[:16]:
        print(f"  {i.address:#10x}  {i.mnemonic:8s} {i.op_str}")

# boot 直接调用的入口
dump(0x20116bc, 0x20, CS_MODE_THUMB, "boot bl target")
dump(0x20116bc, 0x20, CS_MODE_ARM, "boot bl target")
dump(0x2011800, 0x40, CS_MODE_THUMB, "main entry")
dump(0x2011800, 0x40, CS_MODE_ARM, "main entry")
print()
# 明文状态机调用的游戏代码目标
for tgt in (0x2024240, 0x2026884, 0x2026b24, 0x201f974, 0x2024c04):
    dump(tgt, 0x20, CS_MODE_THUMB, "BL target")
    dump(tgt, 0x20, CS_MODE_ARM, "BL target")
    print()
