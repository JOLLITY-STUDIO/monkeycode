# -*- coding: utf-8 -*-
"""验证 map_d ↔ map_comp 对应：渲染 M001 完成图 vs 4000101_Cat & mouse.map 网格"""
import sys, os, struct, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()

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

# --- M001 完成图渲染为 256x128 彩色位图（ASCII 色块） ---
fid, data = rom.find_path('map_comp/m001_LZ.bin')
out_len = data[1] | (data[2] << 8) | (data[3] << 16)
ncgr = lz77_decompress(data, out_len)
tile_data = ncgr[0x40:]
fid, pal = rom.find_path('map_comp/m001_pc.NCLR')
pal_colors = struct.unpack_from('<16H', pal, 0x28)
fid, nscr = rom.find_path('map_comp/m001.NSCR')
scr = struct.unpack_from('<%dH' % ((len(nscr) - 0x28) // 2), nscr, 0x28)

def render_tiles_to_pixels(scr, tile_data, pal_colors, W=32, H=16):
    """渲染 32x16 tiles → 256x128 像素色索引矩阵"""
    px = [[0] * (W * 8) for _ in range(H * 8)]
    for ty in range(H):
        for tx in range(W):
            ti = scr[ty * W + tx] & 0x3FF
            base = ti * 32
            t = tile_data[base:base + 32]
            for y in range(8):
                row = t[y * 4:(y + 1) * 4]
                v = int.from_bytes(row, 'big')
                for x in range(8):
                    c = (v >> (4 * (7 - x))) & 0xF
                    px[ty * 8 + y][tx * 8 + x] = c
    return px

px = render_tiles_to_pixels(scr, tile_data, pal_colors)
print('=== M001 完成图 (256x128, 色号) 每4px采样显示 ===')
# 每 4x4 像素取一个 → 64x32 字符
for y in range(0, 128, 4):
    row = ''
    for x in range(0, 256, 4):
        row += '0123456789ABCDEF'[px[y][x]]
    print(row)

# --- 4000101_Cat & mouse.map 网格 ---
fid, data = rom.find_path('map_d/4000101_Cat & mouse.map')
h, w = data[0], data[1]
body = data[6:]
print()
print('=== 4000101_Cat & mouse.map 网格 %dx%d (nibble) ===' % (h, w))
for y in range(h):
    row = ''
    for x in range(w):
        idx = y * w + x
        byte = body[idx >> 1]
        nib = (byte >> 4) if (idx & 1) else (byte & 0x0F)
        row += '0123456789ABCDEF'[nib]
    print(row)
