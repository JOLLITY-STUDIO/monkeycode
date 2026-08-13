# -*- coding: utf-8 -*-
"""分析 .fap / .lap 二进制格式"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()

def get_file(dir_id, name_part):
    files, _ = tables[dir_id]
    for idx, (pos, n) in enumerate(files):
        if name_part in n:
            fid = dirs[dir_id]['first_file'] + idx
            return n, rom.read_file(fid)
    return None, None

print('===== FAP sample: 3000110_Japanese.fap =====')
n, d = get_file(5, '3000110_Japanese')
print('size', len(d))
print('head:', list(d[:16]))
h, w = d[0], d[1]
print('h,w =', h, w, 'body[6:] len =', len(d) - 6, 'expect nibble =', math.ceil(h * w / 2))
print('bytes 6..50:', list(d[6:50]))
# 每行
print('first row nibbles:')
for y in range(min(3, h)):
    row = []
    for x in range(min(16, w)):
        i = y * w + x
        b = d[6 + i // 2]
        n_ = (b >> 4) if (i & 1) else (b & 0x0F)
        row.append(n_)
    print('  y=%d:' % y, row)

print()
print('===== LAP sample: 2000101_Baker.lap =====')
n, d = get_file(12, '2000101_Baker')
print('size', len(d))
print('head:', list(d[:16]))
h, w = d[0], d[1]
print('h,w =', h, w, 'body[6:] len =', len(d) - 6, 'expect nibble =', math.ceil(h * w / 2))
print('bytes 6..50:', list(d[6:50]))
print('first row (byte-per-cell?):')
for y in range(min(3, h)):
    row = []
    for x in range(min(16, w)):
        i = y * w + x
        row.append(d[6 + i])
    print('  y=%d:' % y, row)
print('tail 30 bytes:', list(d[-30:]))
