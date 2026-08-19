#!/usr/bin/env python3
"""反汇编明文状态机 [0x2001400,0x2001c00) + 引导代码 [0x2000800,0x2000a00)。"""
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

if __name__ == "__main__":
    print("=== 引导代码 [0x2000800,0x2000a00) ===")
    dis(0x2000800, 0x2000a00)
    print("\n=== 状态机 [0x2001400,0x2001c00) ===")
    dis(0x2001400, 0x2001c00)
