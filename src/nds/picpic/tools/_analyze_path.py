# -*- coding: utf-8 -*-
"""分析 map_d 路格低 2 位是否携带方向/路径语义：
- 统计每个路格低2位值与其邻居(上下左右)的关系
- 检查是否只有少数路格是死胡同(候选起点/终点)
- 检查整张图的路是否连通成单一树
"""
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
    return h, w, cells

def road(v):
    return v < 8

# 1) 低2位与邻居路数的关系（死胡同=1个邻居）
for fn in ['4000201_House.map', '4000101_Cat & mouse.map']:
    h, w, cells = load('roms/extracted/map_d/' + fn)
    print('=' * 40, fn, h, 'x', w)
    for v in range(8):
        pass
    # 对每个路格统计邻居数
    stat = Counter()
    dead_end = []
    for y in range(h):
        for x in range(w):
            v = cells[y * w + x]
            if not road(v):
                continue
            nb = 0
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and road(cells[ny * w + nx]):
                    nb += 1
            stat[(v, nb)] += 1
            if nb == 1:
                dead_end.append((x, y, v))
    print('(值,邻居数) 统计:', dict(sorted(stat.items())))
    print('死胡同路格(x,y,值):', dead_end)
    # 孤立路区数量（连通分量）
    seen = set()
    comps = 0
    for y in range(h):
        for x in range(w):
            if not road(cells[y * w + x]) or (x, y) in seen:
                continue
            comps += 1
            stack = [(x, y)]
            seen.add((x, y))
            while stack:
                cx, cy = stack.pop()
                for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and road(cells[ny * w + nx]) and (nx, ny) not in seen:
                        seen.add((nx, ny))
                        stack.append((nx, ny))
    print('路连通分量数:', comps)
    # 边界路格(可达外部)
    edge_roads = []
    for x in range(w):
        if road(cells[0 * w + x]): edge_roads.append((x, 0))
        if road(cells[(h-1) * w + x]): edge_roads.append((x, h-1))
    for y in range(h):
        if road(cells[y * w + 0]): edge_roads.append((0, y))
        if road(cells[y * w + w-1]): edge_roads.append((w-1, y))
    print('边界路格数:', len(edge_roads))

# 2) 全部地图：路格的邻居数分布 & 死胡同数
print()
print('=== 全地图统计：路格邻居数分布 ===')
total_stat = Counter()
for fn in sorted(glob.glob('roms/extracted/map_d/*.map')):
    h, w, cells = load(fn)
    for y in range(h):
        for x in range(w):
            if not road(cells[y * w + x]):
                continue
            nb = 0
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and road(cells[ny * w + nx]):
                    nb += 1
            total_stat[nb] += 1
print('邻居数分布(全地图所有路格):', dict(sorted(total_stat.items())))
