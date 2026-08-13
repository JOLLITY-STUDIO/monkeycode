# -*- coding: utf-8 -*-
"""验证 grid nibble 值 → NCLR 调色板索引 的对应关系（M001 vs 4000101）"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
OUT = os.path.join(os.path.dirname(__file__), '_verify')
os.makedirs(OUT, exist_ok=True)
try:
    from PIL import Image
except ImportError:
    print('need pillow'); sys.exit(1)

def lz77(src, out_len):
    out = bytearray(); i = 4
    while len(out) < out_len and i < len(src):
        flags = src[i]; i += 1
        for bit in range(8):
            if len(out) >= out_len or i >= len(src):
                break
            if flags & (0x80 >> bit):
                b1, b2 = src[i], src[i + 1]; i += 2
                length = ((b1 >> 4) & 0x0F) + 3
                disp = (((b1 & 0x0F) << 8) | b2) + 1
                for _ in range(length):
                    out.append(out[-disp])
            else:
                out.append(src[i]); i += 1
    return bytes(out)

def bgr555(c):
    r = (c & 0x1F) * 255 // 31
    g = ((c >> 5) & 0x1F) * 255 // 31
    b = ((c >> 10) & 0x1F) * 255 // 31
    return (r, g, b)

idx = 1
fid, data = rom.find_path('map_comp/m%03d_LZ.bin' % idx)
out_len = data[1] | (data[2] << 8) | (data[3] << 16)
ncgr = lz77(data, out_len)
tiles = ncgr[0x40:]
fid, pal = rom.find_path('map_comp/m%03d_pc.NCLR' % idx)
colors = struct.unpack_from('<16H', pal, 0x28)
fid, nscr = rom.find_path('map_comp/m001.NSCR')
scr = struct.unpack_from('<256H', nscr, 0x24)

comp = Image.new('RGB', (128, 128), (255, 255, 255))
px = comp.load()
for ti in range(256):
    t = tiles[ti * 32:(ti + 1) * 32]
    tx, ty = ti % 16, ti // 16
    for y in range(8):
        v = int.from_bytes(t[y * 4:(y + 1) * 4], 'big')
        for x in range(8):
            c = (v >> (4 * (7 - x))) & 0xF
            px[tx * 8 + x, ty * 8 + y] = bgr555(colors[c]) if c < 16 else (0, 0, 0)

# map 渲染（直接 nibble→调色板）
fid, mdata = rom.find_path('map_d/4000101_Cat & mouse.map')
h, w = mdata[0], mdata[1]
body = mdata[6:]
mp = Image.new('RGB', (w * 3, h * 3), (255, 255, 255))
mpx = mp.load()
for y in range(h):
    for x in range(w):
        i = y * w + x
        b = body[i >> 1]
        n = (b >> 4) if (i & 1) else (b & 0x0F)
        c = bgr555(colors[n])
        for dy in range(3):
            for dx in range(3):
                mpx[x * 3 + dx, y * 3 + dy] = c

canvas = Image.new('RGB', (400, 160), (255, 255, 255))
canvas.paste(comp, (10, 10))
canvas.paste(mp, (150, 10))
path = os.path.join(OUT, 'm001_color_vs_4000101.png')
canvas.save(path)
print('saved', path)
