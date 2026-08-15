# -*- coding: utf-8 -*-
"""验证 .map 数据解析：检查 nibble 方向是否反了，用 ASCII 输出图案"""
import sys, os, struct, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

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

# 取前3个文件验证
PALETTE = ' .:-=+*#%@'  # 10 levels of ASCII density

def render_ascii(name, h, w, grid, label):
    print(f'\n=== {label}: {name} ({w}x{h}) ===')
    for y in range(h):
        line = ''
        for x in range(w):
            c = grid[y * w + x]
            line += PALETTE[c % 10] if c != 0 else ' '
        print(line)

for idx, (pos, name) in enumerate(files[:5]):
    if not name.endswith('.map'):
        continue
    fid = base_fid + idx
    data = rom.read_file(fid)
    h, w = data[0], data[1]
    body = data[6:]
    expect = math.ceil(h * w / 2)
    if len(body) < expect:
        continue

    # 当前解析：偶数=低4位，奇数=高4位
    grid_a = []
    for y in range(h):
        for x in range(w):
            i = y * w + x
            b = body[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            grid_a.append(n)

    # 反向：偶数=高4位，奇数=低4位
    grid_b = []
    for y in range(h):
        for x in range(w):
            i = y * w + x
            b = body[i >> 1]
            n = (b & 0x0F) if (i & 1) else (b >> 4)
            grid_b.append(n)

    render_ascii(name, h, w, grid_a, 'A: even=low, odd=high')
    render_ascii(name, h, w, grid_b, 'B: even=high, odd=low')
