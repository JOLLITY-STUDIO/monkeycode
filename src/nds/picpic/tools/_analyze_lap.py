# -*- coding: utf-8 -*-
"""分析 .lap 迷宫数据格式"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def load(fn):
    with open(fn, 'rb') as f:
        return f.read()

def analyze(fn):
    d = load(fn)
    h, w = d[0], d[1]
    print('=====', os.path.basename(fn), 'h,w=', h, w, 'size', len(d))
    print('  mid20B(6..26):', [hex(v) for v in d[6:26]])
    body = d[26:26 + h * w]
    print('  body len', len(body), 'expect', h * w)
    vals = sorted(set(body))
    print('  unique vals:', [hex(v) for v in vals])
    for y in range(min(5, h)):
        print('  y=%d' % y, [hex(v) for v in body[y * w:(y + 1) * w]])

def check_directions(fn):
    d = load(fn)
    h, w = d[0], d[1]
    body = d[26:26 + h * w]
    bits = {3: 0x08, 4: 0x10, 5: 0x20, 6: 0x40}
    for name, mask in bits.items():
        for dx, dy, dname in [(1, 0, 'E->W'), (0, 1, 'S->N'), (-1, 0, 'W->E'), (0, -1, 'N->S')]:
            tot, bad = 0, 0
            for y in range(h):
                for x in range(w):
                    v = body[y * w + x]
                    if v & mask:
                        tot += 1
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h:
                            nv = body[ny * w + nx]
                            if not (nv & mask):
                                bad += 1
            if tot:
                print('  bit%s %s: pairs=%d mismatch=%d' % (name, dname, tot, bad))

if __name__ == '__main__':
    base = os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'lap_d')
    analyze(os.path.join(base, 'tutorial', 'tu_lap_00.lap'))
    analyze(os.path.join(base, 'tutorial', 'tu_lap_03.lap'))
    analyze(os.path.join(base, '1_dat', '2000203_Coffee maker.lap'))
    check_directions(os.path.join(base, '1_dat', '2000203_Coffee maker.lap'))
    check_directions(os.path.join(base, 'tutorial', 'tu_lap_03.lap'))
