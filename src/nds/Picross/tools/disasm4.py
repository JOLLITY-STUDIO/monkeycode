#!/usr/bin/env python3
"""分析 LZ 解压器 0x2000950-0x2000b40 与加载信息区 0x2000b40-0x2000c00。"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def va_to_off(va):
    return va - VA0

def dump_data(start, end):
    print(f"\n===== data @ {start:#x}-{end:#x} =====")
    for off in range(va_to_off(start), va_to_off(end), 4):
        va = VA0 + off
        w = int.from_bytes(CODE[off:off+4], "little")
        print(f"{va:#10x}: {w:#010x}")

def disasm(start, end, thumb=False):
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB if thumb else CS_MODE_ARM)
    return list(md.disasm(CODE[va_to_off(start):va_to_off(end)], start))

if __name__ == "__main__":
    # LZ 解压器
    print("===== LZ decompressor 0x2000950 =====")
    for insn in disasm(0x2000950, 0x2000b40):
        print(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")
    dump_data(0x2000b40, 0x2000c00)
