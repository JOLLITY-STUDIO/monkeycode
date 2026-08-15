# -*- coding: utf-8 -*-
"""把 map 图案按值渲染为灰度 PNG，方便查看"""
import os, sys
from PIL import Image

SRC = os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'map_d')

def load(fname):
    b = open(os.path.join(SRC, fname), 'rb').read()
    h, w = b[0], b[1]
    body = b[6:]
    grid = []
    for y in range(h):
        row = []
        for x in range(w):
            i = y * w + x
            bb = body[i >> 1]
            row.append((bb >> 4) if (i & 1) else (bb & 0x0F))
        grid.append(row)
    return w, h, grid

def render(w, h, grid, scale=16, out='_map_view.png'):
    img = Image.new('L', (w * scale, h * scale), 0)
    px = img.load()
    # 值 -> 灰度
    lut = {0: 0, 1: 200, 2: 255, 3: 120, 8: 90, 9: 160, 10: 230, 11: 60}
    for y in range(h):
        for x in range(w):
            v = grid[y][x]
            c = lut.get(v, 128)
            for dy in range(scale):
                for dx in range(scale):
                    px[x * scale + dx, y * scale + dy] = c
    img.save(out)
    print('saved', out, img.size)

# 渲染几个示例
files = [f for f in os.listdir(SRC) if f.endswith('.map')]
for f in files[:6]:
    w, h, grid = load(f)
    render(w, h, grid, 14, '_map_%s.png' % f[:7])
print('files:', len(files))
