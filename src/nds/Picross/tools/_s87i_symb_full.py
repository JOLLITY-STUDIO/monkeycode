#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87i: 符号表 = [u32 count][u32 off[]] 相对 SYMB 块首; 完整解析四类"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 26363904
sdat = open(ROM, 'rb').read()[BASE:BASE + 5952032]

SYMB = 0x40  # SYMB 块绝对偏移

# SYMB 头: 'SYMB'(4) size(4) seq{off,cnt} bank{off,cnt} war{off,cnt} grp{off,cnt}
# 但观察: +0x08=0x40 +0x0C=0xB0 +0x10=0x3F4 +0x14=0x4C8 +0x18=0x5A8 +0x1C=0x5B4 +0x20=0x5BC +0x24=0x5C0
# 实际: 这些是 [offset, size] 而非 [offset, count]!
# 0x80 处 (SYMB+0x40) = 27 -> 这是 SEQ 符号表 {count, off[]}
def parse(rel):
    base = SYMB + rel
    cnt = struct.unpack_from('<I', sdat, base)[0]
    print(f'  count={cnt} @ SYMB+0x{rel:X}=0x{base:X}')
    offs = [struct.unpack_from('<I', sdat, base + 4 + i * 4)[0] for i in range(cnt)]
    out = []
    for i, o in enumerate(offs):
        p = SYMB + o
        end = sdat.find(b'\x00', p)
        name = sdat[p:end].decode('ascii', 'replace') if end > p else ''
        # 名字后通常跟 u32 id (指向文件)
        fid = struct.unpack_from('<I', sdat, (end + 4) & ~3)[0] if end > p else 0
        out.append((name, fid))
    return out

print('=== SEQ 符号表 (SYMB+0x40) ===')
seq = parse(0x40)
for i, (n, f) in enumerate(seq):
    print(f'  [{i:2d}] "{n}" id={f}')

print('\n=== BANK 符号表 (SYMB+0x3F4) ===')
bnk = parse(0x3F4)
for i, (n, f) in enumerate(bnk):
    print(f'  [{i:2d}] "{n}" id={f}')

print('\n=== WAR 符号表 (SYMB+0x5A8) ===')
war = parse(0x5A8)
for i, (n, f) in enumerate(war):
    print(f'  [{i:2d}] "{n}" id={f}')

print('\n=== GROUP 符号表 (SYMB+0x5BC) ===')
grp = parse(0x5BC)
for i, (n, f) in enumerate(grp):
    print(f'  [{i:2d}] "{n}" id={f}')
