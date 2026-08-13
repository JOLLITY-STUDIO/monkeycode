# -*- coding: utf-8 -*-
"""dump 完成判定/工具执行相关函数：0x2006178, 0x2008200, 0x200C284, 0x200BEEC, 0x200C1D0"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)

def dump(addr, count):
    rel = addr - RAM
    code = arm9[rel:rel + count]
    print('=== 0x%08X ===' % addr)
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))
    print()

for a, c in [(0x02006178, 0x80), (0x02008200, 0x100), (0x0200C284, 0xA0),
             (0x0200BEEC, 0x60), (0x0200C1D0, 0x80)]:
    dump(a, c)
