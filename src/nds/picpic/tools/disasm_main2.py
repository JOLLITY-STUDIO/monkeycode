# -*- coding: utf-8 -*-
"""
disasm_main2.py — 反汇编真实 main(0x02000BA4) + 标注主循环调用目标
输出 tools/main-disasm.txt
"""
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
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'main-disasm.txt')

lines = []
def emit(s):
    lines.append(s)
    print(s)

# main 从 0x2000BA4 开始，反汇编到第一个返回后的函数边界（约 0x2000E00）
emit('; Pic Pic REAL MAIN @ 0x02000BA4 (ram 0x%08X)' % RAM)
emit('; 入口链: CRT0(0x2000800) -> main(0x2000BA4)')
emit('')

START = 0x02000BA4
END = 0x02000E20  # 之后是其他函数
rel = START - RAM
code = arm9[rel:rel + (END - START)]
for ins in md.disasm(code, START):
    if ins.address >= END:
        break
    tag = ''
    if ins.mnemonic in ('bl', 'blx') and ins.op_str.startswith('#'):
        t = int(ins.op_str[1:], 16)
        if t in (0x202e92c, 0x2027778, 0x2025810, 0x2026c38, 0x200cd38,
                 0x2004e30, 0x20048b8, 0x200ceec, 0x2027f40, 0x2020088,
                 0x2023b90, 0x2051040, 0x2028030, 0x2023430, 0x2027f74,
                 0x2025790, 0x20200b4, 0x203ba08, 0x2023650, 0x205113c,
                 0x200619c, 0x20518a4, 0x20257d8, 0x203dac0, 0x2025ea4,
                 0x20259b8, 0x2027e98, 0x20277f4, 0x200bb7c, 0x200bc8c):
            tag = '  <<< CORE'
    emit('0x%08X  %-8s %-24s %s' % (ins.address, ins.mnemonic, ins.op_str, tag))

open(OUT, 'w', encoding='utf-8').write('\n'.join(lines))
print('\nwritten', OUT)
