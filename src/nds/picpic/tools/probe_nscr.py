# -*- coding: utf-8 -*-
"""完整 dump NSCR 结构"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
for path in ['map_comp/m001.NSCR', 'fap_comp/f001.NSCR', 'lap/LAP_COMP/l001.NSCR']:
    fid, data = rom.find_path(path)
    if not data:
        print('NOT FOUND', path)
        continue
    print('=' * 50, path, 'size=%d' % len(data))
    for i in range(0, min(len(data), 0x60), 16):
        chunk = data[i:i + 16]
        print('%04X  %s' % (i, chunk.hex(' ')))
