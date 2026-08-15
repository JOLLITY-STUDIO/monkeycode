# -*- coding: utf-8 -*-
"""渲染 House.map 迷宫（nibble 从 offset 6）"""
def render(fn):
    d = open(fn, 'rb').read()
    h, w = d[0], d[1]
    body = d[6:]
    print('%-40s size=%-4d h,w=%d,%d' % (fn.split('/')[-1], len(d), h, w))
    for y in range(h):
        row = []
        for x in range(w):
            i = y * w + x
            b = body[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            row.append('0123456789ABCDEF'[n])
        print('  ' + ''.join(row))

render('roms/extracted/map_d/4000201_House.map')
