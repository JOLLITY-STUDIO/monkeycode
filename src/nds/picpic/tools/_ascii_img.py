# -*- coding: utf-8 -*-
"""把截图转为 ASCII，查看内容"""
import sys
from PIL import Image

def main(path, w=100):
    img = Image.open(path).convert('L')
    ow, oh = img.size
    h = int(oh * w / ow * 0.5)
    img = img.resize((w, h))
    px = img.load()
    chars = ' .:-=+*#%@'
    out = []
    for y in range(h):
        row = ''
        for x in range(w):
            v = px[x, y]
            row += chars[v * len(chars) // 256]
        out.append(row)
    print('\n'.join(out))
    print('size', ow, oh)

if __name__ == '__main__':
    main(sys.argv[1])
