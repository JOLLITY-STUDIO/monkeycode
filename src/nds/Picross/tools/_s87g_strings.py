#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87g: 扫描 SDAT 全部可读字符串 + SYMB 符号表解析"""
import struct, re

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 26363904
sdat = open(ROM, 'rb').read()[BASE:BASE + 5952032]

# ---- 全 SDAT ASCII 字符串 ----
print('=== SDAT 内 ASCII 字符串 ===')
strs = re.findall(rb'[\x20-\x7E]{5,}', sdat)
seen = set()
for s in strs:
    d = s.decode('ascii')
    if d not in seen:
        seen.add(d)
        print(f'  "{d}"')

# ---- SYMB 符号表 ----
sym = 0x40
print('\n=== SYMB 头 u32 ===')
for i in range(0, 0x28, 4):
    v = struct.unpack_from('<I', sdat, sym + 8 + i)[0]
    print(f'  +0x{8+i:02X}: 0x{v:08X} ({v})')
