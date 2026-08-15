# -*- coding: utf-8 -*-
"""彻底确认 map_d 数据是否是迷宫数据：
- 打印多个 map 文件的所有字节
- 尝试多种解析（nibble / byte / offset）
- 渲染 ASCII 迷宫
"""
import os, glob
from collections import Counter

def nib_rows(data, h, w, start):
    out = []
    for y in range(h):
        row = []
        for x in range(w):
            i = start + y * w + x
            b = data[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            row.append(n)
        out.append(row)
    return out

files = [
    'roms/extracted/map_d/400201_House.map',
    'roms/extracted/map_d/400101_Cat & mouse.map',
    'roms/extracted/map_d/4000101_Cat & mouse.map',
]
for fn in files:
    if not os.path.exists(fn):
        print('MISSING', fn)
        continue
    d = open(fn, 'rb').read()
    print('=' * 50)
    print(fn, 'size', len(d))
    print('first 32 bytes:', list(d[:32]))
    if len(d) < 2:
        continue
    h, w = d[0], d[1]
    print('h,w =', h, w, '(guess d[0],d[1])')
    # nibble 从 offset 0 或 6 解析
    for start, label in [(0, 'nib@0'), (6, 'nib@6'), (2, 'nib@2')]:
        need = (h * w + 1) // 2
        if len(d) >= start + need:
            rows = nib_rows(d, h, w, start)
            cnt = Counter(v for r in rows for v in r)
            print('--- %s (len ok) value counts: %s' % (label, dict(sorted(cnt.items()))))
            # 渲染：0='.' 1='#' 其它=数字
            print('    ' + ' | '.join('%02d' % (start,))) if False else None
            for r in rows:
                line = ''.join('.' if v == 0 else '#' if v == 1 else str(v) for v in r)
                print('   ', line)
    # 整个文件 hex dump（小文件）
    if len(d) <= 256:
        print('full hex:', d.hex(' '))
