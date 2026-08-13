# -*- coding: utf-8 -*-
"""追踪真实 main：反汇编入口链上所有关键函数"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
md.detail = True
RAM = h['arm9_ram']

def disasm(addr, count, label=''):
    rel = addr - RAM
    print('\n=== %s @ 0x%08X (rel 0x%X) ===' % (label, addr, rel))
    code = arm9[rel:rel + count * 4]
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

def bl_targets(addr, count):
    rel = addr - RAM
    code = arm9[rel:rel + count * 4]
    out = []
    for ins in md.disasm(code, addr):
        if ins.mnemonic in ('bl', 'blx') and ins.op_str.startswith('#'):
            out.append((ins.address, int(ins.op_str[1:], 16)))
    return out

# 入口链上关键函数
for fn in (0x2000a78, 0x20009fc, 0x201f7d8, 0x201f7dc):
    disasm(fn, 60, 'FUNC 0x%08X' % fn)
    print('\n  -- BL targets --')
    for a, t in bl_targets(fn, 60):
        print('    0x%08X -> 0x%08X' % (a, t))
