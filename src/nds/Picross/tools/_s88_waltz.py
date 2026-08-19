#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88f: 转储 stage_waltz 轨道表 + 0x696 区域，确认真实轨道布局"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
data = open(f'{D}/file_002.bin', 'rb').read()
hsize = struct.unpack_from('<H', data, 0x0C)[0]
payload = data[hsize + 8:]
print(f'file_002 (stage_waltz) size={len(data)} payload len=0x{len(payload):X}')

print('\n=== 前 0x60B（头+轨道表） ===')
for base in range(0, 0x60, 16):
    print(f'  +0x{base:04X}: {" ".join(f"{v:02X}" for v in payload[base:base+16])}')

# 轨道表条目
tracks = []
j = 0
while j < len(payload) - 5:
    if payload[j] == 0x93 and payload[j + 4] == 0x00:
        tno = payload[j + 1]
        off = struct.unpack_from('<H', payload, j + 2)[0]
        tracks.append((j, tno, off))
        j += 5
    else:
        break
print('\n轨道表:')
for j, tno, off in tracks:
    print(f'  @{j:#x}: t{tno} -> 0x{off:04X}')

print('\n=== 各轨道起点前 8B + 前 32B ===')
for j, tno, off in tracks:
    a = max(0, off - 8)
    pre = payload[a:off]
    start = payload[off:off + 32]
    print(f't{tno} @0x{off:04X}  前8: {" ".join(f"{v:02X}" for v in pre)}')
    print(f'           起32: {" ".join(f"{v:02X}" for v in start)}')

# 主轨
main_off = tracks[0][0] + len(tracks) * 5
print(f'\n=== 主轨 @0x{main_off:04X} 起32B ===')
print(' '.join(f'{v:02X}' for v in payload[main_off:main_off + 32]))

# 0x696 前后 0x40
print('\n=== 0x680-0x6C0 ===')
for base in range(0x680, 0x6C0, 16):
    print(f'  +0x{base:04X}: {" ".join(f"{v:02X}" for v in payload[base:base+16])}')
