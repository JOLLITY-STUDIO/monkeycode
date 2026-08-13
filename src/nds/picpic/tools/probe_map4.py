# -*- coding: utf-8 -*-
"""完整 dump fap_d 文件，分析 15x15=144 字节的真实编码"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
for path in ['fap_d/3000110_Japanese.fap', 'fap_d/3000204_shakespeare.fap']:
    fid, data = rom.find_path(path)
    print('=' * 60)
    print(path, 'size=%d' % len(data))
    for i in range(0, len(data), 16):
        chunk = data[i:i + 16]
        ascii_part = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print('%04X  %s  %s' % (i, chunk.hex(' '), ascii_part))
