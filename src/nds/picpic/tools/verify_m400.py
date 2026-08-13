# -*- coding: utf-8 -*-
"""快速验证 m400 完成图配色与 Tsumami.map 的对应关系"""
import sys, os, struct
from collections import Counter
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()

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

fid, data = rom.find_path('map_comp/m400_LZ.bin')
out_len = data[1] | (data[2] << 8) | (data[3] << 16)
ncgr = lz77(data, out_len)
fid, pal = rom.find_path('map_comp/m400_pc.NCLR')
colors = struct.unpack_from('<16H', pal, 0x28)
print('m400 palette BGR555:', [hex(c) for c in colors])

tiles = ncgr[0x40:]
cnt = Counter()
for ti in range(256):
    t = tiles[ti * 32:(ti + 1) * 32]
    for y in range(8):
        v = int.from_bytes(t[y * 4:(y + 1) * 4], 'big')
        for x in range(8):
            c = (v >> (4 * (7 - x))) & 0xF
            cnt[c] += 1
print('m400 used colors:', sorted(cnt.items()))

fid, mdata = rom.find_path('map_d/Tsumami.map')
h, w = mdata[0], mdata[1]
body = mdata[6:]
mcnt = Counter()
for i in range(h * w):
    b = body[i >> 1]
    n = (b >> 4) if (i & 1) else (b & 0x0F)
    mcnt[n] += 1
print('Tsumami.map used colors:', sorted(mcnt.items()))
