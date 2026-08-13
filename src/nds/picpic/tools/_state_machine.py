# -*- coding: utf-8 -*-
"""反汇编状态机调度器核心 + 状态读取函数"""
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

def u32_at(addr):
    return struct.unpack_from('<I', arm9, addr - RAM)[0]

# 1. 状态读取函数（返回当前状态 0..10）
disasm(0x2053be4, 40, 'STATE GETTER')

# 2. 完整状态机调度器（0x205113c 到下一个函数边界）
disasm(0x205113c, 220, 'STATE MACHINE DISPATCHER')
