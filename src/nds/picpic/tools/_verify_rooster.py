# -*- coding: utf-8 -*-
"""用 PIL 生成两种 nibble 方向的 Rooster 图像，验证哪个正确"""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

try:
    from PIL import Image
except ImportError:
    print('PIL not available, using ASCII')
    Image = None

rom = NdsRom()
dirs, tables, _ = rom.fnt_parse()
map_d_idx = None
for i, (files, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if name.lower() == 'map_d':
            map_d_idx = sid
            break
    if map_d_idx is not None:
        break

files, _ = tables[map_d_idx]
base_fid = dirs[map_d_idx]['first_file']

# 找 Rooster (4000504) 和 Cat & mouse (4000101)
targets = ['Rooster', 'Cat & mouse']
for idx, (pos, name) in enumerate(files):
    if not any(t in name for t in targets):
        continue
    fid = base_fid + idx
    data = rom.read_file(fid)
    h, w = data[0], data[1]
    body = data[6:]
    expect = math.ceil(h * w / 2)
    if len(body) < expect:
        continue
    
    # 两种方向 + 两种调色板方案
    for dir_label, nibble_fn in [
        ('A_evenLow', lambda b,i: (b >> 4) if (i & 1) else (b & 0x0F)),
        ('B_evenHigh', lambda b,i: (b & 0x0F) if (i & 1) else (b >> 4)),
    ]:
        grid = []
        for y in range(h):
            for x in range(w):
                i = y * w + x
                b = body[i >> 1]
                grid.append(nibble_fn(b, i))
        
        if Image:
            # 16色灰度图（0=黑，15=白）
            img = Image.new('RGB', (w, h))
            for y in range(h):
                for x in range(w):
                    c = grid[y * w + x]
                    v = 255 - c * 15 if c < 16 else 128
                    img.putpixel((x, y), (v, v, v))
            out = f'd:/studio/github/monkeycode/src/nds/picpic/screenshots/verify_{name[:-4]}_{dir_label}.png'
            img.save(out)
            print(f'Saved {out}')
        else:
            # ASCII 输出（Rooster 20x20 可以看清）
            if h <= 25:
                print(f'\n=== {name} {dir_label} ({w}x{h}) ===')
                chars = ' .:-=+*#%@'
                for y in range(h):
                    line = ''
                    for x in range(w):
                        c = grid[y * w + x]
                        line += chars[c % 10] if c != 0 else ' '
                    print(line)

print('Done')
