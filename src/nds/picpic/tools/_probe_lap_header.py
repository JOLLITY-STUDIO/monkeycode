# -*- coding: utf-8 -*-
"""探针3：lap_comp 文件类型分布 + LAP/FAP 文件头 hex dump 对比。"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()

def find_dir_id(dname):
    for did, n in names.items():
        if n.lower() == dname.lower():
            return did
    return None

# lap_comp 类型分布
did = find_dir_id('lap_comp')
files, _ = tables[did]
types = {}
for _, name in files:
    m = re.match(r'[a-z]\d{3}(.*)', name)
    t = m.group(1) if m else name
    types[t] = types.get(t, 0) + 1
print('lap_comp types:', types)

# 有 NCLR 的编号
nclr_nums = sorted(int(m.group(1)) for _, name in files
                   for m in [re.match(r'l(\d{3})_pc\.NCLR', name)] if m)
print('lap_comp NCLR nums count:', len(nclr_nums))
print('lap_comp NCLR nums:', nclr_nums)

# LAP 文件头 26 字节
fid, data = rom.find_path('lap_d/1_dat/2000203_Coffee maker.lap')
print('\nlap file size:', len(data))
print('lap header[0:26]:', data[:26].hex(' '))
print('lap data[26:60]:', data[26:60].hex(' '))

# FAP 文件头
fid, fdata = rom.find_path('fap_d/3000110_Japanese.fap')
print('\nfap file size:', len(fdata))
print('fap header[0:16]:', fdata[:16].hex(' '))

# fap NCLR 前 16 色
fid, cdata = rom.find_path('fap_comp/f001_pc.NCLR')
print('\nfap_comp/f001_pc.NCLR size:', len(cdata))
print('nclr offset0x28 colors:', [hex(struct) for struct in []] if False else '')
import struct
colors = struct.unpack_from('<16H', cdata, 0x28)
def bgr(c):
    return (c & 0x1F, (c >> 5) & 0x1F, (c >> 10) & 0x1F)
print('f001 colors BGR555:', [bgr(c) for c in colors])

# lap NCLR
fid, cdata2 = rom.find_path('lap_comp/l001_pc.NCLR')
if cdata2:
    print('\nlap_comp/l001_pc.NCLR size:', len(cdata2))
    colors2 = struct.unpack_from('<16H', cdata2, 0x28)
    print('l001 colors BGR555:', [bgr(c) for c in colors2])
else:
    print('\nl001_pc.NCLR NOT FOUND')

# lap NCLR 有哪些（带编号）
fid, cdata3 = rom.find_path('lap_comp/l370_pc.NCLR')
if cdata3:
    print('l370_pc.NCLR size:', len(cdata3))
    colors3 = struct.unpack_from('<16H', cdata3, 0x28)
    print('l370 colors BGR555:', [bgr(c) for c in colors3])
