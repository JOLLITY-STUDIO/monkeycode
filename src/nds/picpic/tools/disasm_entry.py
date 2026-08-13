# -*- coding: utf-8 -*-
"""从日本版 ARM9 入口全新反汇编：入口 → main → 主循环"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)

def disasm(addr, count=80, label=''):
    rel = addr - h['arm9_ram']
    print('\n=== %s @ 0x%08X (rel 0x%X) ===' % (label, addr, rel))
    code = arm9[rel:rel + count*4]
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

def find_calls(addr, count=400):
    """列出函数内所有 BL/BLX 目标"""
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
    entry = h['arm9_entry']
    print('ARM9 entry = 0x%08X' % entry)
    disasm(entry, 100, 'ENTRY')

    # 入口处通过 ldr pc 或 bl 找到 main
    rel = entry - h['arm9_ram']
    # 找入口函数结尾的跳转
    code = arm9[rel:rel + 0x100]
    for ins in md.disasm(code, entry):
        if ins.mnemonic in ('b', 'bx'):
            print('  --> branch @0x%08X to %s' % (ins.address, ins.op_str))
