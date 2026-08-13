# -*- coding: utf-8 -*-
"""PIL 渲染 M001 完成图 vs 4000101_Cat & mouse.map，验证对应关系
输出 tools/_verify/ 临时预览（仅分析验证用）"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
OUT = os.path.join(os.path.dirname(__file__), '_verify')
os.makedirs(OUT, exist_ok=True)

def lz77_decompress(src, out_len):
    out = bytearray()
    i, n = 4, out_len
    while len(out) < n and i < len(src):
        flags = src[i]; i += 1
        for bit in range(8):
            if len(out) >= n or i >= len(src):
                break
            if flags & (0x80 >> bit):
                b1, b2 = src[i], src[i + 1]; i += 2
                length = ((b1 >> 4) & 0x0F) + 3
                disp = ((b1 & 0x0F) << 8) | b2
                disp += 1
                for _ in range(length):
                    out.append(out[-disp])
            else:
                out.append(src[i]); i += 1
    return bytes(out)

try:
    from PIL import Image
except ImportError:
    print('需要 Pillow: pip install pillow')
    sys.exit(1)

def bgr555(c):
    r = (c & 0x1F) * 255 // 31
    g = ((c >> 5) & 0x1F) * 255 // 31
    b = ((c >> 10) & 0x1F) * 255 // 31
    return (r, g, b)

def render_m(idx):
    fid, data = rom.find_path('map_comp/m%03d_LZ.bin' % idx)
    if not data:
        return None
    out_len = data[1] | (data[2] << 8) | (data[3] << 16)
    ncgr = lz77_decompress(data, out_len)
    tiles = ncgr[0x40:]
    fid, pal = rom.find_path('map_comp/m%03d_pc.NCLR' % idx)
    colors = struct.unpack_from('<16H', pal, 0x28)
    fid, nscr = rom.find_path('map_comp/m001.NSCR')
    scr = struct.unpack_from('<256H', nscr, 0x24)
    # 256 tiles 铺 16x16
    img = Image.new('RGB', (128, 128), (255, 255, 255))
    px = img.load()
    for ti in range(256):
        t = tiles[ti * 32:(ti + 1) * 32]
        tx, ty = ti % 16, ti // 16
        for y in range(8):
            v = int.from_bytes(t[y * 4:(y + 1) * 4], 'big')
            for x in range(8):
                c = (v >> (4 * (7 - x))) & 0xF
                px[tx * 8 + x, ty * 8 + y] = bgr555(colors[c]) if c < 16 else (0, 0, 0)
    return img

def render_map(name, scale=4):
    fid, data = rom.find_path('map_d/%s' % name)
    if not data:
        return None
    h, w = data[0], data[1]
    body = data[6:]
    img = Image.new('RGB', (w * scale, h * scale), (255, 255, 255))
    p = img.load()
    # 用灰度区分 nibble
    grays = [0, 40, 70, 90, 110, 130, 150, 170, 190, 210, 225, 240, 250, 255, 255, 255]
    for y in range(h):
        for x in range(w):
            idx = y * w + x
            b = body[idx >> 1]
            n = (b >> 4) if (idx & 1) else (b & 0x0F)
            c = grays[n]
            for dy in range(scale):
                for dx in range(scale):
                    p[x * scale + dx, y * scale + dy] = (c, c, c)
    return img

m1 = render_m(1)
cm = render_map('4000101_Cat & mouse.map')
if m1 and cm:
    canvas = Image.new('RGB', (128 + 160 + 20, max(128, 160) + 30), (255, 255, 255))
    canvas.paste(m1, (10, 20))
    canvas.paste(cm, (150, 10))
    path = os.path.join(OUT, 'm001_vs_4000101.png')
    canvas.save(path)
    print('saved', path)
else:
    print('渲染失败')
