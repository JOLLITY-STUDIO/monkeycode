#!/usr/bin/env python3
"""反汇编主程序入口 0x2003000 起（明文区），跟踪跳转链。"""
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

BIN = open(r"extracted/arm9.bin", "rb").read()
VA0 = 0x2000000

md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
# 0x2003000 起 0x1400 字节（至 0x2004400）
data = BIN[0x3000:0x4400]
for insn in md.disasm(data, 0x2003000):
    print(f"  {insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")
