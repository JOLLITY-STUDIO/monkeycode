# -*- coding: utf-8 -*-
"""分析 4000201_House.map：迷宫第一关的数据结构"""
d = open('roms/extracted/map_d/4000201_House.map', 'rb').read()
print('size', len(d))
print('all bytes:', list(d))
print()
print('hex:', d.hex(' '))
