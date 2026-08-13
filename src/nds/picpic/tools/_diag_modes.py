# -*- coding: utf-8 -*-
"""诊断 3 种模式的谜题数据分布"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()
fat = rom.fat(rom.header(0)['fat_off'], rom.header(0)['fat_size'])

print('FAT entries:', len(fat))
print('idx  dir            first_file  next_ff  count')
for i, dd in enumerate(dirs):
    ff = dd['first_file']
    nf = dirs[i+1]['first_file'] if i+1 < len(dirs) else len(fat)
    files, _ = tables[i]
    print('%2d   %-15s %6d   %6d   %5d  (fnt=%d)' % (i, names.get(i, '?'), ff, nf, nf - ff, len(files)))

# lap_d 目录：检查 first_file 指向的文件是否存在/内容
d9 = dirs[9]
print('\n--- dir 9 lap_d first_file=%d ---' % d9['first_file'])
# 检查 LAP_COMP 的编号与范围
files8, _ = tables[8]
import re
nums = []
for _, n in files8:
    m = re.match(r'^(l\d+)', n)
    if m:
        nums.append(m.group(1))
print('LAP_COMP l-number files:', len(nums), 'unique:', len(set(nums)))
ns = sorted(set(int(n[1:]) for n in nums))
print('range:', ns[0], '..', ns[-1], 'count:', len(ns))
print('list:', ns)
