# -*- coding: utf-8 -*-
"""搜索 map_comp/fap_comp/LAP_COMP 引用与对应映射"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']

strings = []
cur = None
for i, b in enumerate(arm9):
    if 32 <= b < 127:
        if cur is None:
            cur = i
    else:
        if cur is not None:
            ln = i - cur
            if 4 <= ln <= 90:
                strings.append((cur, ln, arm9[cur:i].decode('ascii')))
            cur = None
if cur is not None:
    ln = len(arm9) - cur
    if 4 <= ln <= 90:
        strings.append((cur, ln, arm9[cur:].decode('ascii')))

print('=== comp 引用（前 30） ===')
cnt = 0
for o, ln, s in strings:
    if re.match(r'^(map_comp|fap_comp|LAP_COMP)/', s):
        print('0x%06X  %s' % (o, s))
        cnt += 1
        if cnt >= 30:
            break

print()
print('=== map_comp/m001 等小写引用 ===')
for o, ln, s in strings:
    if re.match(r'^(map_comp|fap_comp|LAP_COMP)/m?0*[0-9]{1,3}\.', s):
        print('0x%06X  %s' % (o, s))
        break

print()
print('=== map_d 路径数量 ===')
md = [s for o, ln, s in strings if s.startswith('map_d/')]
print('map_d:', len(md))
print('sample:', md[:3])
fd = [s for o, ln, s in strings if s.startswith('fap_d/')]
print('fap_d:', len(fd))
print('sample:', fd[:3])
ld = [s for o, ln, s in strings if 'lap_d/' in s]
print('lap_d:', len(ld))
print('sample:', ld[:3])
