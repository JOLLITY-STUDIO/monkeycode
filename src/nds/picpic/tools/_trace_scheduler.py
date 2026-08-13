# -*- coding: utf-8 -*-
"""追踪场景调度器：GAME UPDATE 内部调用链"""
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

def bl_targets(addr, count):
    rel = addr - RAM
    code = arm9[rel:rel + count * 4]
    out = []
    for ins in md.disasm(code, addr):
        if ins.mnemonic in ('bl', 'blx') and ins.op_str.startswith('#'):
            out.append((ins.address, int(ins.op_str[1:], 16)))
    return out

# GAME UPDATE 0x200619c -> 0x2000270, 0x2004104
for fn, cnt, label in (
    (0x2000270, 60, 'GAME UPDATE CALL1'),
    (0x2004104, 120, 'SCHEDULER?'),
    (0x200cd38, 120, 'GAME INIT A'),
    (0x200ceec, 120, 'GAME INIT B'),
):
    disasm(fn, cnt, label)
    print('\n  -- BL targets --')
    for a, t in bl_targets(fn, cnt):
        print('    0x%08X -> 0x%08X' % (a, t))
