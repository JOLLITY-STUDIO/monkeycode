# -*- coding: utf-8 -*-
"""核心玩法逻辑反汇编 → core_disasm2.txt"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']
OUT = os.path.join(os.path.dirname(__file__), 'core_disasm2.txt')

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
    (0x2004104, 200, 'GAME UPDATE 分发器'),
    (0x200c12c, 160, '涂抹单格/开始'),
    (0x200c168, 160, '清除单格'),
    (0x200c2f8, 200, '涂抹循环(拖动)'),
    (0x200c5bc, 120, '完成判定?'),
    (0x200c060, 120, '模式切换?'),
    (0x200bf74, 80, '完成后处理'),
    (0x200bfb0, 80, '读状态'),
    (0x200befc, 60, '读按键标志'),
    (0x200ba88, 80, '读触摸状态'),
    (0x200ba60, 40, 'TOUCH 辅助'),
]

with open(OUT, 'w', encoding='utf-8') as f:
    for addr, count, label in FNS:
        f.write(disasm_text(addr, count, label))
        f.write('\n')
print('written', OUT, os.path.getsize(OUT), 'bytes')
