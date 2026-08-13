# -*- coding: utf-8 -*-
"""扫描 ARM9 字符串：聚焦流程、模式、存档、场景"""
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

print('total strings:', len(strings))

# 1. 所有包含 map/fap/lap/dat/comp 的路径字符串
pats = re.compile(r'(map_d|fap_d|lap_d|_map|_fap|_lap|\.map|\.fap|\.lap|_comp|_dat|m%|f%|l%|\.sav|\.dat|save|profile|otamesi|taiken|tutorial)', re.I)
hits = [(o, ln, s) for o, ln, s in strings if pats.search(s)]
print('\n=== 数据加载相关 (%d) ===' % len(hits))
for o, ln, s in hits:
    print('0x%06X (%3d)  %s' % (o, ln, s))
