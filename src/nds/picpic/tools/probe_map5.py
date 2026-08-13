# -*- coding: utf-8 -*-
"""可视化 fap_d 数据，验证编码"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()

def vis(data, h, w, start):
    lines = []
    for y in range(h):
        row = []
        for x in range(w):
            idx = start + y * w + x
            byte = data[idx >> 1]
            nib = (byte >> 4) if (idx & 1) else (byte & 0x0F)
            row.append('0123456789ABCDEF'[nib])
        lines.append(''.join(row))
    return lines

for path in ['fap_d/3000110_Japanese.fap', 'fap_d/3000204_shakespeare.fap',
             'fap_d/3000301_ninja.fap', 'fap_d/3000211_crab.fap']:
    fid, data = rom.find_path(path)
    h, w = data[0], data[1]
    print('=' * 40, path, h, 'x', w)
    # 尝试数据起点 2（nibble 从字节 bit0 开始）
    for start in (0, 1):
        lines = vis(data, h, w, start)
        # 只打印非全同行的版本
        uniq = len(set(''.join(lines)))
        print('--- 数据起点 start=%d 唯一行=%d ---' % (start, uniq))
        for l in lines:
            print('  ' + l)
