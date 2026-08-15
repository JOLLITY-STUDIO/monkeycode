# -*- coding: utf-8 -*-
"""检查所有 map_d 地图：nibble 值种类、路格值种类、是否只有两个特殊值"""
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

all_vals = Counter()
uniq_sets = Counter()   # 每图 nibble 值集合
road_sets = Counter()   # 每图路格值集合
two_val_maps = []
for fn in sorted(glob.glob('roms/extracted/map_d/*.map')):
    h, w, cells, d = load(fn)
    s = set(cells)
    rs = {v for v in s if v < 8}
    uniq_sets[tuple(sorted(s))] += 1
    road_sets[tuple(sorted(rs))] += 1
    all_vals.update(cells)
    if len(rs) == 2:
        two_val_maps.append(os.path.basename(fn))

print('全数据集 nibble 值分布:', dict(sorted(all_vals.items())))
print()
print('全图 nibble 值集合种类(出现地图数):')
for k, v in sorted(uniq_sets.items(), key=lambda x: -x[1])[:10]:
    print('  ', k, '->', v, '张')
print()
print('路格值集合种类:')
for k, v in sorted(road_sets.items(), key=lambda x: -x[1])[:10]:
    print('  ', k, '->', v, '张')
print()
print('路格只有 2 种值的地图数:', len(two_val_maps))
for f in two_val_maps[:10]:
    print('   ', f)

# 检查是否有特殊值只出现 1 次/2 次（候选起点终点）
print()
print('=== 每张地图中出现次数极少的 nibble 值 ===')
rare = []
for fn in sorted(glob.glob('roms/extracted/map_d/*.map')):
    h, w, cells, d = load(fn)
    c = Counter(cells)
    for v, cnt in c.items():
        if cnt <= 2:
            rare.append((os.path.basename(fn)[:18], v, cnt))
for r in rare[:30]:
    print('  ', r)
print('共', len(rare), '条 (值出现<=2次)')
