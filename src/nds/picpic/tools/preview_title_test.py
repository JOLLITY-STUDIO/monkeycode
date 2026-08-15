# -*- coding: utf-8 -*-
"""title 背景解码预览：测试不同 tile 解析方式"""
import struct, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from convert_title import lz10, nclr_palettes, nscr_map, ncgr_tiles

BASE = os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'title')
OUT = os.path.join(os.path.dirname(__file__), 'previews')
os.makedirs(OUT, exist_ok=True)

def render_variant(lz_name, nscr_name, nclr_name, png_name, W=256, H=192, pal_group=0, backdrop=(255, 0, 128), variant='std'):
    _, tiles = ncgr_tiles(lz_name)
    entries = nscr_map(nscr_name)
    groups = nclr_palettes(nclr_name)
    pal = groups[pal_group]
    img = [[backdrop] * W for _ in range(H)]
    tw = W // 8
    th = H // 8
    for i, e in enumerate(entries):
        if variant == 'col_major':
            x = (i // th) * 8
            y = (i % th) * 8
        else:
            x = (i % tw) * 8
            y = (i // tw) * 8
        if x >= W or y >= H:
            continue
        tid = e & 0x3FF
        pg = (e >> 10) & 3
        hf = (e >> 12) & 1
        vf = (e >> 13) & 1
        pal2 = groups[pg] if pg < len(groups) else pal
        t = tiles[tid * 32:(tid + 1) * 32]
        if len(t) < 32:
            continue
        for ty in range(8):
            for tx in range(8):
                if variant == 'nibble_swap':
                    b = t[ty * 4 + (tx // 2)]
                    nib = (b & 0xF) if (tx & 1) else (b >> 4)
                elif variant == 'tile_flip':
                    b = t[(7 - ty) * 4 + (tx // 2)]
                    nib = (b >> 4) if (tx & 1) else (b & 0xF)
                else:
                    b = t[ty * 4 + (tx // 2)]
                    nib = (b >> 4) if (tx & 1) else (b & 0xF)
                c = pal2[nib] if nib < len(pal2) else (0, 0, 0)
                if nib == 0:
                    continue
                sx = x + (7 - tx if hf else tx)
                sy = y + (7 - ty if vf else ty)
                if 0 <= sx < W and 0 <= sy < H:
                    img[sy][sx] = tuple(c)
    import zlib
    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF)
    ihdr = struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0)
    rows = b''
    for row in img:
        rows += b'\x00' + b''.join(bytes(px) for px in row)
    png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', zlib.compress(rows)) + chunk(b'IEND', b'')
    with open(os.path.join(OUT, png_name), 'wb') as f:
        f.write(png)
    print('wrote', png_name, 'variant', variant)

for v in ['std', 'col_major', 'nibble_swap', 'tile_flip']:
    render_variant('succes_LZ.bin', 'succes.NSCR', 'success.NCLR', 'succes_%s.png' % v, variant=v)
