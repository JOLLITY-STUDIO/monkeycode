# -*- coding: utf-8 -*-
"""按颜色分类渲染迷宫截图"""
from PIL import Image

img = Image.open('screenshots/org/Pic Pic (Europe)__maze-007.png').convert('RGB')
W, H = img.size
px = img.load()

# 统计主色
from collections import Counter
cnt = Counter()
for y in range(0, H, 4):
    for x in range(0, W, 4):
        cnt[px[x, y]] += 1
print('主色 top8:', cnt.most_common(8))

# 渲染上屏 y 0-190
for y in range(0, 190):
    row = []
    for x in range(W):
        r, g, b = px[x, y]
        # 分类
        mx = max(r, g, b); mn = min(r, g, b)
        if mx < 40:  # 黑
            c = '.'
        elif mx > 200 and mn > 120:  # 白/亮
            c = '#'
        elif r > 150 and g < 150 and b < 150:  # 红
            c = 'R'
        elif g > r and g > b:  # 绿
            c = 'G'
        elif b > r and b > g:  # 蓝
            c = 'B'
        elif mx - mn < 30:  # 灰
            c = 'g' if mx > 100 else 'd'
        else:
            c = '?'
        row.append(c)
    print(''.join(row))
