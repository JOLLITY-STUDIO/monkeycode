# -*- coding: utf-8 -*-
"""探针：确认 lap_d/fap_d 在 ROM FNT 内的顺序，与 lap_comp/fap_comp 编号对齐关系。"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()

def find_dir_id(dname):
    for did, n in names.items():
        if n.lower() == dname.lower():
            return did
    return None

for d in ['lap_d', 'lap_comp', 'fap_d', 'fap_comp']:
    did = find_dir_id(d)
    if did is None:
        print(d, 'NOT FOUND')
        continue
    files, subdirs = tables[did]
    print('=== %s (dir %d) files=%d subdirs=%s' % (d, did, len(files), [s[1] for s in subdirs]))
    if subdirs:
        for sid, sname in subdirs:
            sf, ss = tables[sid]
            print('  sub %s: %d files, first=%s last=%s' % (sname, len(sf), sf[0][1] if sf else '-', sf[-1][1] if sf else '-'))
    else:
        print('  first=%s last=%s' % (files[0][1] if files else '-', files[-1][1] if files else '-'))

# 检查 l001/f001 调色板与第一个关卡
for comp, first in [('lap_comp', 'l001_pc.NCLR'), ('fap_comp', 'f001_pc.NCLR')]:
    fid, data = rom.find_path(comp + '/' + first)
    print(comp + '/' + first, 'fid=', fid, 'size=', len(data) if data else 0)
