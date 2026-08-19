#!/usr/bin/env python3
"""检查解压输出：拷贝源 0x020da9c0 区域 + 尾部描述符区 + 各 BL 目标处的指令密度。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0
v8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")
v4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")

def decompress(ge0=True):
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
            while (ln >= 0) if ge0 else (ln > 0):
                buf[dst - VA0] = buf[dst + off - VA0]
                dst -= 1
                ln -= 0x10
    return buf, dst + 1

buf, start = decompress(True)
print(f"输出 [{start:#x}, 0x20db058) size={0x20db058-start:#x}")

def hexdump(va, n):
    print(f"\n== 0x{va:x} ==")
    for o in range(0, n, 16):
        chunk = bytes(buf[va+o-VA0:va+o+16-VA0])
        print(f"  [{va+o:#x}] " + " ".join(f"{b:02x}" for b in chunk))

def dis(va, n, mode):
    md = Cs(CS_ARCH_ARM, mode)
    data = bytes(buf[va-VA0:va-VA0+n])
    insns = list(md.disasm(data, va))
    print(f"\n-- 0x{va:x} {n:#x}字节 {mode} ({len(insns)} insn) --")
    for i in insns[:10]:
        print(f"  {i.address:#10x}  {i.mnemonic:8s} {i.op_str}")

hexdump(0x020da9c0, 0x40)      # 拷贝源
dis(0x020da9c0, 0x20, CS_MODE_THUMB)
dis(0x020da9c0, 0x20, CS_MODE_ARM)
hexdump(0x020db000, 0x58)      # 尾部
# 检查 0x20043e4 (BL 目标，在 LZ 区内) 在解压输出中的对应位置
for tgt in (0x20043e4, 0x2004c70, 0x2008204, 0x200a544, 0x2010f7c, 0x20116d0, 0x20117b0):
    if start <= tgt < 0x20db058:
        dis(tgt, 0x10, CS_MODE_THUMB)
    else:
        print(f"\n0x{tgt:x} 不在输出区")
