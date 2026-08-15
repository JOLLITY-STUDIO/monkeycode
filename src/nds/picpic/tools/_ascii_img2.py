# -*- coding: utf-8 -*-
"""裁剪区域转 ASCII"""
import sys
from PIL import Image

img = Image.open(sys.argv[1]).convert('RGB')
ox, oy, ow, oh = [int(v) for v in sys.argv[2:6]]
w = int(sys.argv[6]) if len(sys.argv) > 6 else 120
box = (ox, oy, ox + ow, oy + oh)
img = img.crop(box)
h = int(img.height * w / img.width * 0.5)
g = img.resize((w, h)).convert('L')
px = g.load()
chars = ' .:-=+*#%@'
out = []
for y in range(h):
    row = ''
    for x in range(w):
        v = px[x, y]
        row += chars[v * len(chars) // 256]
    out.append(row)
print('\n'.join(out))
