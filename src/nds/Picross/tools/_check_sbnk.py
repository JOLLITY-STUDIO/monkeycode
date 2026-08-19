#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""检查 SBNK file_081 (title) 原始结构"""
import struct, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross'
D = f'{BASE}/extracted/SDAT/files'
d = open(f'{D}/file_081.bin', 'rb').read()
print(f'file_081 size={len(d)} magic={d[0:4]}')
hsize = struct.unpack_from('<H', d, 0x0C)[0]
print(f'headerSize={hsize}')
doff = hsize
dmg, dsz = struct.unpack_from('<4sI', d, doff)
print(f'DATA @0x{doff:x} magic={dmg} size=0x{dsz:x}')
payload = d[doff+8:doff+8+dsz]
print(f'payload len={len(payload)}')
print('payload 前 0x80 字节:')
for i in range(0, min(0x80, len(payload)), 16):
    chunk = payload[i:i+16]
    hx = ' '.join(f'{b:02X}' for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print(f'  +0x{i:03X}: {hx:<48} {asc}')

# 标准 SBNK DATA: [u16 instCount][u16 pad][u32 offset table...]
# 尝试不同偏移找乐器数
print('\n=== 可能的乐器数位置（u16/u32 扫描） ===')
import re
for off in range(0, 0x40):
    v16 = struct.unpack_from('<H', payload, off)[0]
    if 1 <= v16 <= 200:
        print(f'  +0x{off:02X}: u16={v16}')
print()
# ndspy 如何解析: 找 'sbnk' 源码
import ndspy.soundBank as sb, inspect
src = inspect.getsource(sb)
i = src.find('class SBNK')
print('=== ndspy SBNK 源码片段 ===')
print(src[i:i+3500])
