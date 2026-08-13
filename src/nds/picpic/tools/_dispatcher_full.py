# -*- coding: utf-8 -*-
"""反汇编状态机调度器 0x205113c 完整（含第二层跳转表各分支）"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']

def disasm(addr, count, label=''):
    rel = addr - RAM
    print('\n=== %s @ 0x%08X (rel 0x%X) ===' % (label, addr, rel))
    code = arm9[rel:rel + count * 4]
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

# 第二层跳转表各分支
disasm(0x2051284, 40, 'BRANCH 3 (bit 检查)')
disasm(0x20512cc, 60, 'BRANCH 2,5 (队列移动)')
disasm(0x2051374, 60, 'BRANCH 7')
disasm(0x20513a0, 80, 'BRANCH 9')
disasm(0x20513f4, 70, 'BRANCH 15')
disasm(0x205145c, 60, 'BRANCH 16')
disasm(0x2051480, 60, 'BRANCH 17 开头')
