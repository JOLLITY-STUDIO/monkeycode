# -*- coding: utf-8 -*-
"""检查 map_comp NSCR 结构"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
_, tables, _ = rom.fnt_parse()
dirs, _, _ = rom.fnt_parse()

# 找 map_comp 目录
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

for idx, (pos, name) in enumerate(files[:10]):
    if name.endswith('.NSCR'):
        fid = base_fid + idx
        data = rom.read_file(fid)
        print('%s size=%d head=%s' % (name, len(data), data[:0x30].hex(' ')))
        # 找数据区起点
        for off in range(0x20, 0x30, 2):
            if len(data) > off + 2:
                first = struct.unpack_from('<H', data, off)[0]
                if first == 0:
                    print('  data starts @ 0x%X, entries=%d' % (off, (len(data) - off) // 2))
                    break
