#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87l: SBNK/SWAR DATA 块全解析: 前0x20保留 + 表结构"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'

def parse_bnk(fn):
    data = open(f'{D}/{fn}', 'rb').read()
    doff = 0x10
    d = data[doff + 8:]
    print(f'=== {fn} DATA len={len(d)} ===')
    for i in range(0, 0x60, 16):
        chunk = d[i:i + 16]
        print(f'  +0x{i:03X}: {chunk.hex(" ")}')
    # 尝试: +0x20 = 乐器数, +0x24 = 偏移表
    cnt = struct.unpack_from('<I', d, 0x20)[0]
    print(f'  +0x20 count={cnt}')
    if 0 < cnt < 300:
        offs = [struct.unpack_from('<I', d, 0x24 + i * 4)[0] for i in range(min(cnt, 30))]
        print(f'  偏移表: {[hex(x) for x in offs]}')

def parse_war(fn):
    data = open(f'{D}/{fn}', 'rb').read()
    doff = 0x10
    d = data[doff + 8:]
    print(f'=== {fn} DATA len={len(d)} ===')
    for i in range(0, 0x40, 16):
        chunk = d[i:i + 16]
        print(f'  +0x{i:03X}: {chunk.hex(" ")}')
    cnt = struct.unpack_from('<I', d, 0x20)[0]
    print(f'  +0x20 count={cnt}')
    if 0 < cnt < 300:
        offs = [struct.unpack_from('<I', d, 0x24 + i * 4)[0] for i in range(min(cnt, 10))]
        print(f'  偏移表: {[hex(x) for x in offs]}')
        # 解第一个波形 (SWAV 内嵌)
        a = offs[0]
        print(f'  波形[0] @0x{a:x}: {d[a:a+16].hex(" ")} magic={d[a:a+4]}')
        if d[a:a+4] == b'SWAV':
            wsize = struct.unpack_from('<I', d, a + 8)[0]
            print(f'    SWAV size=0x{wsize:x}')
            # SWAV DATA: [u16 loop][u16 rate][u16 loopstart][u8 type][u8 pcm][u32 datasize][data]
            wd = a + 0x10 + 8  # SWAV header 0x10 + DATA hdr 8
            wdata = d[wd:]
            print(f'    波形数据 @0x{wd:x}: {wdata[:24].hex(" ")}')

parse_bnk('file_081.bin')
print()
parse_war('file_106.bin')
