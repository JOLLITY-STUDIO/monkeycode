#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88d: 打印疑点命令的真实上下文（前8后10字节），确定参数长度"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
d = open(f'{D}/file_000.bin', 'rb').read()
ev = d[0x18:]

tracks = []
for i in range(0x40):
    if ev[i] == 0x93 and ev[i + 4] == 0x00:
        tracks.append((ev[i + 1], struct.unpack_from('<H', ev, i + 2)[0]))
first93 = next(i for i in range(0x40) if ev[i] == 0x93 and ev[i + 4] == 0x00)
main_off = first93 + len(tracks) * 5
regions = [('main', main_off, tracks[0][1])] + [
    (f't{t[0]}', t[1], tracks[i + 1][1] if i + 1 < len(tracks) else len(ev))
    for i, t in enumerate(tracks)]
print('regions:', [(r[0], hex(r[1]), hex(r[2])) for r in regions])

def dump(name, a, b, lo, hi, title):
    print(f'\n=== {title} ({name} 0x{lo:04X}-0x{hi:04X}) ===')
    for base in range(lo, min(hi, lo + (hi - lo)), 16):
        chunk = ev[a + base: a + base + 16]
        print(f'  {name}+0x{base:04X}: {" ".join(f"{v:02X}" for v in chunk)}')

# track2 开头 0x00-0x40
dump('t2', 0x53C, 0x74A, 0, 0x40, 'track#2 开头')
# track4 0x84 位置 0x38-0x60
dump('t4', 0x8BD, 0xB1A, 0x38, 0x60, 'track#4 @0x84 附近')
# track1 0x8C 位置 0x220-0x240
dump('t1', 0x229, 0x53C, 0x220, 0x240, 'track#1 0x8C/94 附近')
# track5 0x82 位置 0x60-0x78
dump('t5', 0xB1A, 0xDC8, 0x60, 0x78, 'track#5 @0x82 附近')
# 各轨道尾部 0x30 字节（看 94 jump / FF）
for name, a, b in regions:
    lo = max(0, b - a - 0x30)
    dump(name, a, b, lo, b - a, f'{name} 尾部')
