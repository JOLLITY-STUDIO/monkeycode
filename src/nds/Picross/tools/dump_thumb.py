#!/usr/bin/env python3
"""Dump Thumb disassembly region with high density. Args: start_va size"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def main():
    start = int(sys.argv[1], 16)
    size = int(sys.argv[2], 16)
    thumb = len(sys.argv) < 4 or sys.argv[3] != "arm"
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB if thumb else CS_MODE_ARM)
    data = CODE[start-VA0:start-VA0+size]
    for insn in md.disasm(data, start):
        print(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

if __name__ == "__main__":
    main()
