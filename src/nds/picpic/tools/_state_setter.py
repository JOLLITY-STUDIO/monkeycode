# -*- coding: utf-8 -*-
"""反汇编状态切换函数 0x2051adc 及周边，确认状态编号含义"""
import sys, os, struct
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

# 状态切换器 + 状态读取器周边
for fn, cnt, label in (
    (0x2051adc, 60, 'STATE SETTER (r0=状态)'),
    (0x2051afc, 40, 'STATE SETTER 2'),
    (0x2051b2c, 40, 'STATE SETTER 3'),
    (0x2051b50, 40, 'STATE CHECK A'),
    (0x2051b84, 40, 'STATE CHECK B'),
    (0x2053cb4, 60, 'STATE GETTER 2'),
    (0x2053e3c, 40, 'RANDOM'),
):
    disasm(fn, cnt, label)
