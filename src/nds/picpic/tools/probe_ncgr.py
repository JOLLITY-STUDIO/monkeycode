# -*- coding: utf-8 -*-
"""分析 map_comp NCGR/NCLR/NSCR 完成图结构"""
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

for path in ['map_comp/m001_LZ.bin', 'map_comp/m002_LZ.bin']:
    fid, data = rom.find_path(path)
    out_len = data[1] | (data[2] << 8) | (data[3] << 16)
    dec = lz77_decompress(data, out_len)
    print('=' * 50, path)
    print('  解压 %dB' % len(dec))
    print('  head:', dec[:0x40].hex(' '))
    # NCGR 头解析
    magic = dec[0:4]
    char_size = struct.unpack_from('<I', dec, 0x08)[0] if magic == b'RGCN' else 0
    print('  magic=%s charsize=0x%X' % (magic, char_size))
    print('  0x04:', hex(struct.unpack_from('<H', dec, 4)[0]),
          '0x06:', hex(struct.unpack_from('<H', dec, 6)[0]))

# NCLR
fid, data = rom.find_path('map_comp/m001_pc.NCLR')
print('=' * 50, 'm001_pc.NCLR size=%d' % len(data))
print('  head:', data[:0x20].hex(' '))
pal_off = struct.unpack_from('<I', data, 8)[0] if data[:4] == b'RLCN' else 0
print('  pal off=0x%X count=%d' % (pal_off, struct.unpack_from('<H', data, 0xC)[0]))

# NSCR
fid, data = rom.find_path('map_comp/m001.NSCR')
print('=' * 50, 'm001.NSCR size=%d' % len(data))
print('  head:', data[:0x20].hex(' '))
