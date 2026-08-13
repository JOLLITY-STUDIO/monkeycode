# -*- coding: utf-8 -*-
"""解析状态机关键全局变量基地址"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']

def u32_at(addr):
    return struct.unpack_from('<I', arm9, addr - RAM)[0]

# 0x2051144: ldr r0,[pc,#0x6e8] → pc=0x2051148, +8 → 0x2051150, +0x6e8 → 0x2051838
# 0x2053be8: ldr r0,[pc,#4] → 0x2053bec+... 实际 0x2053be4: ldr r0,[pc,#4] → pc=0x2053be8+8=0x2053bf0, +4 → 0x2053bf4
lits = {
    'dispatcher base (0x2051144,pc+0x6e8+8)': 0x2051838,
    'state getter (0x2053be4,pc+4+8)': 0x2053bf4,
    '0x2053bf4 base (pc+0x9c): 0x2053c04': 0x2053ca8,
}
for name, lit in lits.items():
    v = u32_at(lit)
    print('%s @ 0x%08X = 0x%08X' % (name, lit, v))
    # 若指向数据区，dump 一些字段
    if 0x02000000 <= v <= 0x03000000:
        r = v - RAM
        if 0 <= r < len(arm9) - 0x40:
            print('  [+0x00..0x30]:', ' '.join('%08X' % u32_at(v + i * 4) for i in range(12)))
