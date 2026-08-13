# -*- coding: utf-8 -*-
"""反汇编调度器尾部 0x2051538 - 0x2051828（SUBSTATE=2 分支）"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']

rel = 0x2051538 - RAM
end = 0x2051828 - RAM
code = arm9[rel:end]
for ins in md.disasm(code, 0x2051538):
    print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))
