#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87h: 解析 SYMB 符号表: 名字 -> FAT 文件 id; 验证 SSEQ DATA 块"""
import struct

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 26363904
sdat = open(ROM, 'rb').read()[BASE:BASE + 5952032]

SYMB = 0x40

# SYMB 头: 'SYMB'(4) size(4) 然后 6 组 {offset u32, count u32}: seq/bank/war/group/player/stream
def parse_symtab(rel_off, count, label):
    """符号表项: u32 nameLen; name 4对齐; u32 id"""
    o = SYMB + rel_off
    print(f'--- {label} count={count} ---')
    out = []
    for i in range(count):
        nl = struct.unpack_from('<I', sdat, o)[0]
        name = sdat[o + 4: o + 4 + nl - 1].decode('ascii', 'replace') if nl > 1 else ''
        o += 4 + ((nl + 3) & ~3)
        fid = struct.unpack_from('<I', sdat, o)[0]
        o += 4
        out.append((name, fid))
        print(f'  [{i:2d}] "{name}" -> file#{fid}')
    return out

seq_off = struct.unpack_from('<I', sdat, SYMB + 0x08)[0]
seq_cnt = struct.unpack_from('<I', sdat, SYMB + 0x0C)[0]
bnk_off = struct.unpack_from('<I', sdat, SYMB + 0x10)[0]
bnk_cnt = struct.unpack_from('<I', sdat, SYMB + 0x14)[0]
war_off = struct.unpack_from('<I', sdat, SYMB + 0x18)[0]
war_cnt = struct.unpack_from('<I', sdat, SYMB + 0x1C)[0]
grp_off = struct.unpack_from('<I', sdat, SYMB + 0x20)[0]
grp_cnt = struct.unpack_from('<I', sdat, SYMB + 0x24)[0]
print(f'SEQ  off=0x{seq_off:x} cnt={seq_cnt}')
print(f'BANK off=0x{bnk_off:x} cnt={bnk_cnt}')
print(f'WAR  off=0x{war_off:x} cnt={war_cnt}')
print(f'GROUP off=0x{grp_off:x} cnt={grp_cnt}')

seqs = parse_symtab(seq_off, seq_cnt, 'SEQ') if seq_cnt < 200 else None
if seqs is None:
    # 尝试: 偏移就是绝对位置
    parse_symtab(seq_off, 27, 'SEQ(abs)')
