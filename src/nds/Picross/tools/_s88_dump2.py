#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88g: 转储指定 SSEQ 轨道表 + 各表偏移 ±0x20，确认真实布局"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'

def dump_file(fname, tag):
    data = open(f'{D}/{fname}', 'rb').read()
    hsize = struct.unpack_from('<H', data, 0x0C)[0]
    payload = data[hsize + 8:]
    print(f'\n{"="*72}\n{fname} ({tag}) size={len(data)} payload=0x{len(payload):X}\n{"="*72}')
    # 轨道表
    first93 = next(j for j in range(min(len(payload) - 5, 0x200)) if payload[j] == 0x93 and payload[j + 4] == 0x00)
    tracks = []
    j = first93
    while j < len(payload) - 5 and payload[j] == 0x93 and payload[j + 4] == 0x00:
        tracks.append((payload[j + 1], struct.unpack_from('<H', payload, j + 2)[0]))
        j += 5
    main_off = first93 + len(tracks) * 5
    print(f'轨道表@{first93:#x} 主轨@{main_off:#x} 条目: ' + ' '.join(f't{t[0]}@{t[1]:04x}' for t in tracks))
    # 每个表偏移 ±0x18
    for tno, off in tracks:
        a = max(0, off - 0x18)
        print(f'\n  t{tno} 偏移0x{off:04X} 周边 0x{a:04X}-0x{off+0x18:04X}:')
        for base in range(a, min(off + 0x18, len(payload)), 16):
            print(f'    +0x{base:04X}: {" ".join(f"{v:02X}" for v in payload[base:base+16])}')

dump_file('file_002.bin', 'stage_waltz')
dump_file('file_003.bin', 'stage_bossanova')
