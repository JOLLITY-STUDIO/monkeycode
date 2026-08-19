#!/usr/bin/env python3
"""解析引导代码 literal pool + LZ 解压器/拷贝例程的输入输出寄存器。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def dis(va_start, va_end):
    md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
    data = CODE[va_start-VA0:va_end-VA0]
    for insn in md.disasm(data, va_start):
        print(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

print("=== 引导代码 literal pool [0x2000918,0x200093c) ===")
for off in range(0x918, 0x93c, 4):
    w = int.from_bytes(CODE[off:off+4], "little")
    print(f"  [{VA0+off:#x}] = {w:#010x}")

print("\n=== LZ 解压器 [0x2000950,0x20009fc) ===")
dis(0x2000950, 0x20009fc)
