# -*- coding: utf-8 -*-
"""查看 NCGR tile 数据分布 + NCLR 调色板"""
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

fid, data = rom.find_path('map_comp/m001_LZ.bin')
out_len = data[1] | (data[2] << 8) | (data[3] << 16)
dec = lz77_decompress(data, out_len)
# 统计非零字节分布
nz = [(i, b) for i, b in enumerate(dec) if b != 0]
print('NCGR 总长 %d 非零字节 %d 个' % (len(dec), len(nz)))
if nz:
    print('非零范围: 0x%X .. 0x%X' % (nz[0][0], nz[-1][0]))
    print('前 64 非零:')
    for i, b in nz[:64]:
        print('  0x%04X: 0x%02X' % (i, b))

print()
# NCLR 调色板
fid, data = rom.find_path('map_comp/m001_pc.NCLR')
print('NCLR size=%d hex:' % len(data))
for i in range(0, len(data), 16):
    print('  %04X  %s' % (i, data[i:i + 16].hex(' ')))
# 假设调色板从头 0x18 或文件尾开始，尝试解析 16 色
print()
for base in (0x18, 0x20, 0x24, 0x28):
    if base + 32 <= len(data):
        pals = struct.unpack_from('<16H', data, base)
        print('pal@0x%02X: %s' % (base, ' '.join('%04X' % p for p in pals)))
