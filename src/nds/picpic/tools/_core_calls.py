# -*- coding: utf-8 -*-
"""解析 main 主循环字面量 + 反汇编每帧核心调用"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']

def u32_rel(rel):
    return struct.unpack_from('<I', arm9, rel)[0]

def disasm(addr, count, label=''):
    rel = addr - RAM
    print('\n=== %s @ 0x%08X (rel 0x%X) ===' % (label, addr, rel))
    code = arm9[rel:rel + count * 4]
    for ins in md.disasm(code, addr):
        print('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

# main 里 ldr 的字面量：0x2000BB8, 0x2000C18, 0x2000C1C, 0x2000C20
print('=== main 字面量 ===')
for ins_addr in (0x2000bb8, 0x2000c18, 0x2000c1c, 0x2000c20):
    # ldr rX, [pc, #imm] 的 imm 在指令里
    rel = ins_addr - RAM
    ins = int.from_bytes(arm9[rel:rel+4], 'little')
    imm = ((ins >> 16) & 0xFFF) + 8
    lit = ins_addr + imm
    v = u32_rel(lit - RAM)
    print('  0x%08X ldr -> lit@0x%08X = 0x%08X %s' % (ins_addr, lit, v, 'CODE' if RAM <= v < RAM+len(arm9) else ''))

# 每帧核心调用
for fn, cnt, label in (
    (0x205113c, 60, 'PER-FRAME A'),
    (0x20518a4, 60, 'PER-FRAME B'),
    (0x2023650, 80, 'PER-FRAME C (input?)'),
    (0x2027f74, 40, 'VSYNC WAIT'),
):
    disasm(fn, cnt, label)
    print('\n  -- BL targets --')
    rel = fn - RAM
    code = arm9[rel:rel + cnt * 4]
    for ins in md.disasm(code, fn):
        if ins.mnemonic in ('bl', 'blx') and ins.op_str.startswith('#'):
            print('    0x%08X -> 0x%08X' % (ins.address, int(ins.op_str[1:], 16)))
