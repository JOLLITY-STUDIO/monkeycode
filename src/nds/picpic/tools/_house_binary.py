# -*- coding: utf-8 -*-
"""二值化 House.map：0-3=路(.)，8-11=墙(#)，看迷宫连通性"""
d = open('roms/extracted/map_d/4000201_House.map', 'rb').read()
h, w = d[0], d[1]
body = d[6:]
for y in range(h):
    row = []
    for x in range(w):
        i = y * w + x
        b = body[i >> 1]
        n = (b >> 4) if (i & 1) else (b & 0x0F)
        row.append('.' if n < 8 else '#')
    print(''.join(row))
