#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87h2: 符号表在 SYMB+rel_off; dump 验证条目格式"""
import struct

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 26363904
sdat = open(ROM, 'rb').read()[BASE:BASE + 5952032]

SYMB = 0x40

# 查看 seq 符号表起始 (SYMB+0x40 = 0x80)
print('=== SYMB+0x40 = 0x80 (seq 表起始) ===')
for i in range(0, 0x60, 16):
    chunk = sdat[0x80 + i: 0x80 + i + 16]
    hx = ' '.join(f'{b:02X}' for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print(f'  +0x{i:02X}: {hx:<48} {asc}')

# 尝试解析: 条目 = [u32 nameLen][name 4对齐][u32 id]
def parse(rel):
    o = SYMB + rel
    print(f'\n=== 解析 @ SYMB+0x{rel:X} = 0x{o:X} ===')
    for i in range(30):
        nl = struct.unpack_from('<I', sdat, o)[0]
        if nl > 0x40 or nl == 0:
            print(f'  [{i}] 中止: nameLen=0x{nl:X}')
            break
        name = sdat[o + 4: o + 4 + nl - 1].decode('ascii', 'replace')
        o2 = o + 4 + ((nl + 3) & ~3)
        fid = struct.unpack_from('<I', sdat, o2)[0]
        print(f'  [{i:2d}] len={nl} "{name}" -> id={fid}')
        o = o2 + 4

parse(0x40)  # seq
