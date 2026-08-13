# -*- coding: utf-8 -*-
"""核心函数反汇编 → 输出文件"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']
OUT = os.path.join(os.path.dirname(__file__), 'core_disasm.txt')

def disasm_text(addr, count, label=''):
    rel = addr - RAM
    if rel < 0 or rel + count*4 > len(arm9):
        return '  [超出 ARM9 范围 rel=%X]' % rel
    code = arm9[rel:rel + count*4]
    lines = ['\n=== %s @ 0x%08X (rel 0x%X) ===' % (label, addr, rel)]
    for ins in md.disasm(code, addr):
        lines.append('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))
    return '\n'.join(lines)

FNS = [
    (0x200619c, 200, 'GAME UPDATE (核心)'),
    (0x200bb7c, 90, 'TOUCH BEGIN/END'),
    (0x200bc8c, 200, 'TOUCH MOVE'),
    (0x200cd38, 150, 'GAME INIT A'),
    (0x200ceec, 150, 'GAME INIT B'),
    (0x2004e30, 100, 'BOOT WAIT A'),
    (0x20048b8, 30, 'BOOT WAIT B (read flag)'),
    (0x200c12c, 100, 'PAINT? (r1,r3)'),
    (0x200c168, 100, 'CLEAR? (r1,0,0)'),
    (0x200ba88, 80, 'TOUCH helper'),
    (0x2006120, 40, 'ENTER CRITICAL'),
    (0x2006134, 40, 'EXIT CRITICAL'),
]

with open(OUT, 'w', encoding='utf-8') as f:
    for addr, count, label in FNS:
        f.write(disasm_text(addr, count, label))
        f.write('\n')
print('written', OUT, os.path.getsize(OUT), 'bytes')
