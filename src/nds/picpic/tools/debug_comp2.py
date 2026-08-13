# -*- coding: utf-8 -*-
"""调试 map_comp 循环"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
_, tables, _ = rom.fnt_parse()
dirs, _, _ = rom.fnt_parse()

map_comp_idx = None
for i, (files, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if name.lower() == 'map_comp':
            map_comp_idx = sid
            break
    if map_comp_idx is not None:
        break

files, _ = tables[map_comp_idx]
base_fid = dirs[map_comp_idx]['first_file']

print('files count:', len(files))
ncount = 0
for idx, (pos, name) in enumerate(files):
    if name.endswith('.NSCR'):
        ncount += 1
        if ncount <= 5:
            print('NSCR:', name, 'idx', idx)
print('total NSCR:', ncount)
