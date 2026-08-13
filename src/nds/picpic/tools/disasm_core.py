# -*- coding: utf-8 -*-
"""反汇编核心游戏函数：GAME UPDATE / 触摸处理 / 初始化"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
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
    code = arm9[rel:rel + count*4]
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

def find_calls(addr, count=400):
    rel = addr - RAM
    code = arm9[rel:rel + count*4]
    out = []
    for ins in md.disasm(code, addr):
        if ins.mnemonic in ('bl', 'blx'):
            try:
                out.append((ins.address, int(ins.op_str, 16)))
            except Exception:
                pass
    return out

FNS = [
    (0x200619c, 160, 'GAME UPDATE'),
    (0x200bb7c, 80, 'TOUCH BEGIN/END'),
    (0x200bc8c, 120, 'TOUCH MOVE'),
    (0x200cd38, 100, 'GAME INIT A'),
    (0x200ceec, 100, 'GAME INIT B'),
    (0x2004e30, 60, 'BOOT WAIT A'),
    (0x20048b8, 60, 'BOOT WAIT B'),
]

if __name__ == '__main__':
    for addr, count, label in FNS:
        disasm(addr, count, label)
        print('\n  -- BL targets --')
        for a, t in find_calls(addr, count):
            print('    0x%08X -> 0x%08X' % (a, t))
