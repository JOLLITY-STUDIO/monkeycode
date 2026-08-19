#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s89: 全量 hex dump SBNK 小文件集 + 大 bank，找乐器记录结构"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'

def dump(fn, label, limit=None):
    data = open(f'{D}/{fn}', 'rb').read()
    if limit: data = data[:limit]
    print(f'\n{"="*70}\n{fn} ({label}) size={len(data)}\n{"="*70}')
    for i in range(0, len(data), 16):
        chunk = data[i:i+16]
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print(f'  +0x{i:04X}: {chunk.hex(" "):<48}  {asc}')

# 大 bank 的 DATA 区（0x18 起）
dump('file_081.bin', 'bank_stay DATA(0x18-)', 0x180)
dump('file_083.bin', 'SBNK 小型', None)
dump('file_085.bin', 'SBNK 小型', None)
dump('file_105.bin', 'SBNK 小型', None)
