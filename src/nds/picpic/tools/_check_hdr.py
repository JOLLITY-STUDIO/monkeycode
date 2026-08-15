# -*- coding: utf-8 -*-
"""系统验证 map_d 头部 offset3-4 是否起点/终点，以及迷宫入口出口在哪里"""
import glob, os
from collections import Counter

def load(fn):
    d = open(fn, 'rb').read()
    h, w = d[0], d[1]
    body = d[6:]
    cells = []
    for i in range(h * w):
        b = body[i >> 1]
        cells.append((b >> 4) if (i & 1) else (b & 0x0F))
    return h, w, cells, d

def is_road(v):
    return v < 8

print('=== 1) offset3-4 指向的格子是路还是墙 ===')
road_cnt, wall_cnt, oob = 0, 0, 0
for fn in sorted(glob.glob('roms/extracted/map_d/*.map')):
    h, w, cells, d = load(fn)
    a, b = d[3], d[4]
    ok = False
    for (x, y) in [(a, b), (b, a)]:
        if 0 <= x < w and 0 <= y < h:
            v = cells[y * w + x]
            if is_road(v):
                road_cnt += 1
            else:
                wall_cnt += 1
            ok = True
            break
    if not ok:
        oob += 1
print('任一顺序指向路:', road_cnt, ' 指向墙:', wall_cnt, ' 越界:', oob)

print()
print('=== 2) House 迷宫 + 头部坐标标记 ===')
h, w, cells, d = load('roms/extracted/map_d/4000201_House.map')
print('head:', list(d[:6]))
for y in range(h):
    row = []
    for x in range(w):
        v = cells[y * w + x]
        ch = '.' if is_road(v) else '#'
        if (x, y) == (d[3], d[4]):
            ch = 'S'
        elif (x, y) == (d[4], d[3]):
            ch = 'T'
        row.append(ch)
    print('  ' + ''.join(row))

print()
print('=== 3) 边界缺口：哪些边界格子是路（可能入口/出口） ===')
for fn in ['4000201_House.map', 'tu_map_00.map', '4000101_Cat & mouse.map', '4000202_Cat.map']:
    h, w, cells, d = load('roms/extracted/map_d/' + fn)
    gaps = {'top': [], 'bottom': [], 'left': [], 'right': []}
    for x in range(w):
        if is_road(cells[0 * w + x]):
            gaps['top'].append(x)
        if is_road(cells[(h - 1) * w + x]):
            gaps['bottom'].append(x)
    for y in range(h):
        if is_road(cells[y * w + 0]):
            gaps['left'].append(y)
        if is_road(cells[y * w + w - 1]):
            gaps['right'].append(y)
    print(fn, 'h,w=%d,%d head=%s' % (h, w, list(d[:6])))
    for k, v in gaps.items():
        print('   %-7s 路格数=%d %s' % (k, len(v), v[:20]))

print()
print('=== 4) offset5 分布（全地图） ===')
vals = []
for fn in sorted(glob.glob('roms/extracted/map_d/*.map')):
    h, w, cells, d = load(fn)
    vals.append(d[5])
print('offset5 值分布:', dict(sorted(Counter(vals).items())))
