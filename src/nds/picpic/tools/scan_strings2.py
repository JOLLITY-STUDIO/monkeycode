# -*- coding: utf-8 -*-
"""扫描 ARM9 字符串：数据目录/玩法/提示相关"""
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
            if 4 <= ln <= 80:
                strings.append((cur, ln, arm9[cur:i].decode('ascii')))
            cur = None
if cur is not None:
    ln = len(arm9) - cur
    if 4 <= ln <= 80:
        strings.append((cur, ln, arm9[cur:].decode('ascii')))

print('=== 数据目录路径 ===')
for o, ln, s in strings:
    if re.match(r'^(map_d|fap_d|lap_d|map_comp|fap_comp|LAP_COMP|main_bg|otamesi)/', s):
        print('0x%06X  %s' % (o, s))

print()
print('=== 玩法/提示/UI 关键词 ===')
pats = re.compile(r'(hint|tutorial|touch|paint|eraser|color|tool|undo|redo|clear|complete|score|time|level|stage|course|number|fill|pen|fude|nuru|kesu|mitasu|kansei|kaitou|mondai)', re.I)
for o, ln, s in strings:
    if pats.search(s) and '/' not in s and '.' not in s:
        print('0x%06X (%d)  %s' % (o, ln, s))
