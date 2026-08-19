#!/usr/bin/env python3
"""反汇编解压后的游戏镜像。用法: dump_img.py <VA> <size> [thumb|arm]"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = open(os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin"), "rb").read()
IMG_BASE = 0x2011B27   # 解压镜像起始 VA (修正自 0x2011AA8)
IMG_END = 0x20DB058

def main():
    va = int(sys.argv[1], 16)
    size = int(sys.argv[2], 16)
    thumb = len(sys.argv) < 4 or sys.argv[3] != "arm"
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB if thumb else CS_MODE_ARM)
    off = va - IMG_BASE
    data = IMG[off:off+size]
    for insn in md.disasm(data, va):
        print(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

if __name__ == "__main__":
    main()
