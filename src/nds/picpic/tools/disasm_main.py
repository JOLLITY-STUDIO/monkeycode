# -*- coding: utf-8 -*-
"""反汇编 main（0x2000b64 候选）并追踪初始化链"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)

def u32_rel(rel):
    return int.from_bytes(arm9[rel:rel+4], 'little')

def disasm(addr, count=120, label=''):
    rel = addr - h['arm9_ram']
    print('\n=== %s @ 0x%08X (rel 0x%X) ===' % (label, addr, rel))
    code = arm9[rel:rel + count*4]
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

def find_calls(addr, count=400):
    rel = addr - h['arm9_ram']
    code = arm9[rel:rel + count*4]
    targets = []
    for ins in md.disasm(code, addr):
        if ins.mnemonic in ('bl', 'blx'):
            try:
                t = int(ins.op_str, 16)
                targets.append((ins.address, t))
            except Exception:
                pass
    return targets

if __name__ == '__main__':
    # 1. 入口字面量池解析（0x918 - 0x938）
    print('=== 入口字面量池 (rel 0x918-0x938) ===')
    for rel in range(0x918, 0x93C, 4):
        print('  rel 0x%X : 0x%08X' % (rel, u32_rel(rel)))

    # 2. main 候选反汇编
    for cand in (0x2000b64, 0x2000ba4):
        disasm(cand, 90, 'MAIN CANDIDATE')

    # 3. 关键初始化函数
    for fn in (0x200093c, 0x20009fc, 0x201f7d8, 0x201f7dc, 0x2000a78):
        disasm(fn, 40, 'INIT 0x%08X' % fn)
