#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88b: 全量转储 file_000 所有轨道 + 统计 fd/95 等特殊命令上下文"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
d = open(f'{D}/file_000.bin', 'rb').read()
ev = d[0x18:]

# 扫描轨道表 (93 xx u16 00)
tracks = []
for i in range(0, len(ev) - 5):
    if ev[i] == 0x93 and ev[i + 4] == 0x00 and i < 0x40:
        tno = ev[i + 1]
        off = struct.unpack_from('<H', ev, i + 2)[0]
        tracks.append((i, tno, off))
main_off = tracks[-1][0] + 5 if tracks else 0x2A
print(f'tracks: {[(t[1], hex(t[2])) for t in tracks]}  main@0x{main_off:04X}')

# 统计 fd 出现位置与前后文（全部轨道）
print('\n=== 0xFD 出现位置(前2后8字节) ===')
for off in range(0, len(ev)):
    if ev[off] == 0xFD:
        ctx = ev[max(0, off - 2): off + 9]
        print(f'  @0x{off:04X}: {" ".join(f"{b:02X}" for b in ctx)}')

# 统计 95 出现位置
print('\n=== 0x95 出现位置(前2后4字节) ===')
for off in range(0, len(ev)):
    if ev[off] == 0x95:
        ctx = ev[max(0, off - 2): off + 5]
        print(f'  @0x{off:04X}: {" ".join(f"{b:02X}" for b in ctx)}')

# 全量转储轨道1（0x229-0x53C）与轨道2开头
for tno, off in tracks[:2]:
    end = tracks[tracks.index((tno, off)) + 1][2] if tracks.index((tno, off)) + 1 < len(tracks) else len(ev)
    print(f'\n{"=" * 70}\nTRACK {tno} @0x{off:04X} (len 0x{end - off:X})\n{"=" * 70}')
    for base in range(0, min(end - off, 0x320), 16):
        chunk = ev[off + base: off + base + 16]
        print(f'  +0x{base:04X}: {" ".join(f"{b:02X}" for b in chunk)}')
