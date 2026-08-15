# -*- coding: utf-8 -*-
"""验证：路格低 2 位是否表示连通方向（0/1/2/3 = 上下左右之一）"""
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

DIRS = [(0, -1), (1, 0), (0, 1), (-1, 0)]  # 上右下左
DIR_NAMES = ['上', '右', '下', '左']

# 统计：值 v 的路格，其每个方向上是路的比例
print('=== 路格值 v 与其邻居方向的关联（全地图） ===')
stat = {v: Counter() for v in range(4)}   # v -> 该方向上是路的次数
tot = {v: 0 for v in range(4)}
for fn in glob.glob('roms/extracted/map_d/*.map'):
    h, w, cells = load(fn)
    for y in range(h):
        for x in range(w):
            v = cells[y * w + x]
            if v >= 8:
                continue
            low = v & 3
            tot[low] += 1
            for di, (dx, dy) in enumerate(DIRS):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and cells[ny * w + nx] < 8:
                    stat[low][di] += 1

for v in range(4):
    t = tot[v]
    print('路格值 %d (%s) 共 %d 个，邻居为路的比例: %s' % (
        v, bin(v), t, {DIR_NAMES[k]: round(c / t, 3) for k, c in sorted(stat[v].items())}))

# 验证相邻配对：如果 A 指向右(B)，B 是否指向左(A)？
print()
print('=== 相邻路格的方向互补配对检验 ===')
pair_ok = 0
pair_bad = 0
for fn in glob.glob('roms/extracted/map_d/*.map'):
    h, w, cells = load(fn)
    for y in range(h):
        for x in range(w):
            v = cells[y * w + x]
            if v >= 8:
                continue
            low = v & 3
            # 该格声称连向右(1)时，右邻居应存在且连向左(3)
            for di, (dx, dy) in enumerate(DIRS):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and cells[ny * w + nx] < 8:
                    # 邻居存在，检查值是否互补
                    nlow = cells[ny * w + nx] & 3
                    if (low == di) and (nlow == (di + 2) % 4):
                        pair_ok += 1
                    elif (low == di) and (nlow != (di + 2) % 4):
                        pair_bad += 1
                elif 0 <= nx < w and 0 <= ny < h and cells[ny * w + nx] >= 8:
                    if low == di:
                        pair_bad += 1  # 声称连右但右边是墙
                else:
                    if low == di:
                        pair_bad += 1  # 声称连右但越界
print('配对一致(声称连X且X邻居声称连反方向):', pair_ok)
print('不一致:', pair_bad)

# 简化：某格声明方向 di 时，统计该方向邻居是否为路
print()
print('=== 声明方向 vs 该方向实际邻居 ===')
decl_ok = Counter()
decl_bad = Counter()
for fn in glob.glob('roms/extracted/map_d/*.map'):
    h, w, cells = load(fn)
    for y in range(h):
        for x in range(w):
            v = cells[y * w + x]
            if v >= 8:
                continue
            low = v & 3
            dx, dy = DIRS[low]
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and cells[ny * w + nx] < 8:
                decl_ok[low] += 1
            else:
                decl_bad[low] += 1
for v in range(4):
    print('值 %d 声明方向=%s: 邻居是路 %d 次, 邻居是墙/越界 %d 次' % (
        v, DIR_NAMES[v], decl_ok[v], decl_bad[v]))
