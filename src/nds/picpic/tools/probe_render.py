# -*- coding: utf-8 -*-
"""渲染 m001 完成图：NCGR tiles + NCLR 调色板 + NSCR 排列，ASCII 验证"""
import sys, os, struct
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

# --- NCGR tiles
fid, data = rom.find_path('map_comp/m001_LZ.bin')
out_len = data[1] | (data[2] << 8) | (data[3] << 16)
ncgr = lz77_decompress(data, out_len)
TILE_OFF = 0x40
tile_data = ncgr[TILE_OFF:]
ntiles = len(tile_data) // 32
print('tiles:', ntiles)

# --- NCLR 调色板
fid, pal = rom.find_path('map_comp/m001_pc.NCLR')
pal_colors = struct.unpack_from('<16H', pal, 0x28)
def bgr555(c):
    r = (c & 0x1F) * 255 // 31
    g = ((c >> 5) & 0x1F) * 255 // 31
    b = ((c >> 10) & 0x1F) * 255 // 31
    return (r, g, b)
print('palette:')
for i, c in enumerate(pal_colors):
    print('  %2d: #%04X %s' % (i, c, bgr555(c)))

# --- NSCR
fid, nscr = rom.find_path('map_comp/m001.NSCR')
print('NSCR size:', len(nscr), 'head:', nscr[:0x30].hex(' '))
# screen 数据：猜测从 0x28 起，32x16 条目（每 u16）
SCR_OFF = 0x28
entries = (len(nscr) - SCR_OFF) // 2
print('screen entries:', entries)
scr = struct.unpack_from('<%dH' % entries, nscr, SCR_OFF)
print('first entries:', scr[:16])

# --- 渲染：32 宽 x 16 高 tiles → 256x128 px，ASCII 缩小为每 tile 一字符
def tile_ascii(ti):
    base = ti * 32
    t = tile_data[base:base + 32]
    # 统计 tile 内主要颜色（忽略 0 透明/背景）
    counts = {}
    for y in range(8):
        row = t[y * 4:(y + 1) * 4]
        v = int.from_bytes(row, 'big')
        for x in range(8):
            c = (v >> (4 * (7 - x))) & 0xF
            counts[c] = counts.get(c, 0) + 1
    # 主色（排除 0）
    main = 0
    mc = -1
    for c, n in counts.items():
        if c != 0 and n > mc:
            main, mc = c, n
    return '0123456789ABCDEF'[main]

W = 32
print('--- 32x16 tiles 主色图 ---')
for ty in range(16):
    row = ''.join(tile_ascii(ty * W + tx) for tx in range(W))
    print(row)
