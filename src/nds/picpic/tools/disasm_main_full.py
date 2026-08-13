# -*- coding: utf-8 -*-
"""完整反汇编 main (0x2000BA4) 与主循环 (0x2000C30)"""
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

if __name__ == '__main__':
    # main 完整函数（约 0x2000BA4 - 0x2000D00）
    disasm(0x2000ba4, 140, 'MAIN full')
    print('\n\n=== main 内 BL 调用表 ===')
    for a, t in find_calls(0x2000ba4, 140):
        print('  0x%08X -> 0x%08X' % (a, t))
