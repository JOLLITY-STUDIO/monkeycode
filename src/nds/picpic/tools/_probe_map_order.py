# -*- coding: utf-8 -*-
"""查找 ROM 中 map_d 完整文件列表，搜索 Carp/Rooster 关卡，确认真实顺序"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, _ = rom.fnt_parse()

map_d_idx = None
for i, (files, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if name.lower() == 'map_d':
            map_d_idx = sid
            break
    if map_d_idx is not None:
        break

files, _ = tables[map_d_idx]
base_fid = dirs[map_d_idx]['first_file']

print('=== map_d 完整文件列表（ROM 顺序）===')
for idx, (pos, name) in enumerate(files):
    if not name.endswith('.map'):
        continue
    fid = base_fid + idx
    data = rom.read_file(fid)
    h, w = data[0], data[1]
    # 搜索 carp/rooster
    low = name.lower()
    mark = ''
    if 'carp' in low: mark = ' <-- CARP!'
    elif 'rooster' in low or 'cock' in low: mark = ' <-- ROOSTER!'
    elif 'mama' in low: mark = ' <-- MAMA?'
    elif 'rina' in low: mark = ' <-- RINA?'
    elif 'tu_map' in low: mark = ' <-- TUTORIAL'
    print(f'{idx:3d}: {name:30s} h={h:2d} w={w:2d} size={len(data):4d}B{mark}')
