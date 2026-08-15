#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""分析 .map 迷宫网格的数值分布。"""
import collections

for name in ['4000101_Cat & mouse.map', '4000103_Frog.map', '4000115_Cowboy.map']:
    d = open(r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\map_d' + '\\' + name, 'rb').read()
    h, w = d[0], d[1]
    body = d[6:]
    vals = [(body[i >> 1] >> 4 if i & 1 else body[i >> 1] & 0x0F) for i in range(h * w)]
    print(name, 'h=%d w=%d' % (h, w), 'dist=', dict(sorted(collections.Counter(vals).items())))
