# -*- coding: utf-8 -*-
"""找根目录表真实起点：dump 0xBF800..0xBFD00 全部字节并标注 ASCII"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off, fnt_size = h['fnt_off'], h['fnt_size']
start = fnt_off + 0x100
end = fnt_off + 0x500
print('=== FNT+0x100 .. +0x500 (%08X..%08X) ===' % (start, end))
for j in range(start, end, 16):
    chunk = d[j:j + 16]
    hexs = ' '.join('%02X' % b for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print('%05X: %-48s |%s|' % (j - fnt_off, hexs, asc))
