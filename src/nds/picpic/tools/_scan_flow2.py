# -*- coding: utf-8 -*-
"""扫描 ARM9 字符串：map_d / lap_d / 存档 / 场景切换"""
import sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)

strings = []
cur = None
for i, b in enumerate(arm9):
    if 32 <= b < 127:
        if cur is None:
            cur = i
    else:
        if cur is not None:
            ln = i - cur
            if 3 <= ln <= 64:
                strings.append((cur, ln, arm9[cur:i].decode('ascii')))
            cur = None
if cur is not None:
    strings.append((cur, len(arm9) - cur, arm9[cur:].decode('ascii')))

# map_d / lap_d 路径（只取不重复，前缀）
seen = set()
print('=== map_d 路径 ===')
for o, ln, s in strings:
    if 'map_d' in s and s not in seen:
        seen.add(s)
        print('0x%06X  %s' % (o, s))

print()
print('=== lap_d / 1_dat..5_dat 路径 ===')
seen = set()
for o, ln, s in strings:
    if ('lap_d' in s or 'dat' in s.lower() and ('_dat' in s or 'dat/' in s)) and s not in seen:
        seen.add(s)
        print('0x%06X  %s' % (o, s))
