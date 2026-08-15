# -*- coding: utf-8 -*-
"""暴力搜索 .lap 数据的方向位映射"""
import os, itertools, sys

def load(fn):
    with open(fn, 'rb') as f:
        return f.read()

def check_map(fn, bitmap):
    """bitmap: {E:mask, W:mask, S:mask, N:mask}"""
    d = load(fn)
    h, w = d[0], d[1]
    body = d[26:26 + h * w]
    bad = 0
    total = 0
    for y in range(h):
        for x in range(w):
            v = body[y * w + x]
            for dx, dy, dirmask in [(1, 0, bitmap['E']), (-1, 0, bitmap['W']),
                                    (0, 1, bitmap['S']), (0, -1, bitmap['N'])]:
                if v & dirmask:
                    total += 1
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        nv = body[ny * w + nx]
                        # 反向连接必须存在
                        opp = bitmap[{'E': 'W', 'W': 'E', 'S': 'N', 'N': 'S'}[(dx, dy) if (dx, dy) in {('x',): 0} else ('E' if dx == 1 else 'W' if dx == -1 else 'S' if dy == 1 else 'N')]]
                        if not (nv & opp):
                            bad += 1
                    else:
                        bad += 1  # 越界 = 错误
    return total, bad

def brute(fn):
    bits = [0x08, 0x10, 0x20, 0x40]
    best = None
    for perm in itertools.permutations(bits):
        m = {'E': perm[0], 'W': perm[1], 'S': perm[2], 'N': perm[3]}
        t, b = check_map(fn, m)
        if best is None or b < best[1]:
            best = (m, t, b)
    m, t, b = best
    print('  best: E=%02x W=%02x S=%02x N=%02x total=%d bad=%d' % (m['E'], m['W'], m['S'], m['N'], t, b))

if __name__ == '__main__':
    base = os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'lap_d')
    for fn in ['tutorial/tu_lap_00.lap', 'tutorial/tu_lap_03.lap',
               '1_dat/2000203_Coffee maker.lap', '1_dat/2003405_Computer.lap',
               '5_dat/2200116_Ice skating.lap']:
        print(fn)
        brute(os.path.join(base, fn))
