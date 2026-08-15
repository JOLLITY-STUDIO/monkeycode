#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""提取迷宫函数 0x02059388 的完整字面池与槽位表。"""
import struct

ARM9 = r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\_system\arm9.bin'
LOAD = 0x02000000
data = open(ARM9, 'rb').read()


def va_to_off(va):
    return va - LOAD


def word(va):
    return struct.unpack_from('<I', data, va_to_off(va))[0]


def dump(va, n, label):
    raw = data[va_to_off(va):va_to_off(va) + n]
    print(f'{label} @ 0x{va:08X}: {raw.hex(" ")}')


print('== literal pool 0x0205A2FC..0x0205A340 (17 words) ==')
for i in range(17):
    va = 0x0205A2FC + i * 4
    print(f'  0x{va:08X}: 0x{word(va):08X}')

print()
print('== slot table @ 0x0206ED38 (5x(x,y)) ==')
dump(0x0206ED38, 10, 'slots')

print()
print('== array base @ 0x0206ED80 (0x18-byte entries) ==')
dump(0x0206ED80, 0x18 * 5, 'entries')
