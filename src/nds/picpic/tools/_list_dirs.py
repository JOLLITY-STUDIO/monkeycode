# -*- coding: utf-8 -*-
"""列出 ROM 全部目录及文件数，便于决定提取哪些资源"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()
fat = rom.fat(rom.header(0)['fat_off'], rom.header(0)['fat_size'])
print('total dirs: %d, total files: %d' % (len(dirs), len(fat)))

for i, dd in enumerate(dirs):
    files, subdirs = tables[i]
    nf = dirs[i + 1]['first_file'] if i + 1 < len(dirs) else len(fat)
    name = names.get(i, '?')
    parent = dd['parent']
    print('%2d  parent=%2d  %-18s files=%4d subdirs=%2d' % (i, parent, name, len(files), len(subdirs)))
