# -*- coding: utf-8 -*-
"""调试 map_comp 文件匹配"""
import sys, os, struct
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

# 列出所有 m001 相关文件
for idx, (pos, name) in enumerate(files):
    if 'm001' in name:
        print('fid=%d name=%s' % (base_fid + idx, name))

# 测试匹配
for idx, (pos, name) in enumerate(files):
    if not name.startswith('m') or not name[1:4].isdigit():
        continue
    mid = name[1:4]
    lz_name = 'm%s_LZ.bin' % mid
    pal_name = 'm%s_pc.NCLR' % mid
    nscr_name = 'm%s.NSCR' % mid
    
    lz_fid = None
    pal_fid = None
    nscr_fid = None
    for j, (p2, n2) in enumerate(files):
        if n2 == lz_name:
            lz_fid = base_fid + j
        elif n2 == pal_name:
            pal_fid = base_fid + j
        elif n2 == nscr_name:
            nscr_fid = base_fid + j
    
    print('mid=%s name=%s lz=%s pal=%s nscr=%s' % (mid, name, lz_fid, pal_fid, nscr_fid))
    if mid == '001':
        break
