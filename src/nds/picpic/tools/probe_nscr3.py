# -*- coding: utf-8 -*-
"""检查 NSCR 条目数和 tile 排列"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
fid, data = rom.find_path('map_comp/m001.NSCR')
print('size', len(data))
entries = (len(data) - 0x22) // 2
scr = struct.unpack_from('<%dH' % entries, data, 0x22)
print('entries', entries, 'first few:', scr[:20])
# 找非零最大索引
max_ti = max(s & 0x3FF for s in scr)
print('max tile index', max_ti)
# 尝试不同宽高排列
for W in [16, 20, 24, 28, 30, 32]:
    H = entries // W
    if W * H == entries:
        print('  possible: %dx%d' % (W, H))
