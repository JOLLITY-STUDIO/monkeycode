# -*- coding: utf-8 -*-
"""分析 fap_d 格式 + map_comp LZ 解压结构"""
import sys, os, struct, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()

print('===== fap_d 样本完整 dump =====')
for path in ['fap_d/3000110_Japanese.fap', 'fap_d/3000204_shakespeare.fap',
             'fap_d/3000301_ninja.fap']:
    fid, data = rom.find_path(path)
    print('---', path, 'fid=%d size=%d' % (fid, len(data)))
    print('   head:', data[:16].hex(' '))
    print('   tail:', data[-16:].hex(' '))
    if len(data) == 144:
        h, w = data[0], data[1]
        print('   h,w =', h, w, ' 数据区期望=', math.ceil(h * w / 2) + 6)

print()
print('===== map_comp LZ 解压验证 =====')
def lz77_decompress(src, out_len):
    """NDS 标准 LZ77 (10xxxxxx 头 3 字节长度)。"""
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

for path in ['map_comp/m001_LZ.bin', 'map_comp/m002_LZ.bin', 'fap_comp/f001_LZ.bin']:
    fid, data = rom.find_path(path)
    if data is None or len(data) == 0:
        print('NOT FOUND', path)
        continue
    out_len = data[1] | (data[2] << 8) | (data[3] << 16)
    print('---', path, 'fid=%d cmp=%d out=%d (0x%X)' % (fid, len(data), out_len, out_len))
    if data[0] != 0x10:
        print('   非标准LZ头!')
        continue
    dec = lz77_decompress(data, out_len)
    print('   解压 %d -> %d  %s' % (len(data), len(dec), dec[:12].hex(' ')))
