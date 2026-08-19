#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87f: 定位各 block 真实偏移: dump 0x40 / 0x1230 / 0x1a38 / 0x2454 头部"""
import struct

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 26363904
sdat = open(ROM, 'rb').read()[BASE:BASE + 5952032]

for off in (0x40, 0x1230, 0x1a38, 0x2454):
    print(f'=== 0x{off:04X} ===')
    for i in range(0, 0x30, 16):
        chunk = sdat[off + i: off + i + 16]
        hx = ' '.join(f'{b:02X}' for b in chunk)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print(f'  +0x{i:04X}: {hx:<48} {asc}')
    print()
