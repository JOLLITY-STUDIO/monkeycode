#!/usr/bin/env python3
"""ARM9 主程序入口反汇编（ARM 模式 + Thumb 探测）。"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def va_to_off(va):
    return va - VA0

def disasm(start, size, thumb):
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB if thumb else CS_MODE_ARM)
    return list(md.disasm(CODE[va_to_off(start):va_to_off(start)+size], start))

def dump(tag, start, size, thumb=False):
    print(f"\n===== {tag} @ {start:#x} (thumb={thumb}) =====")
    for insn in disasm(start, size, thumb):
        print(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

if __name__ == "__main__":
    dump("ARM boot tail", 0x2000b40, 0x80, False)
    dump("main entry ARM", 0x20116bc, 0x100, False)
    dump("main entry THUMB", 0x20116bc, 0x100, True)
