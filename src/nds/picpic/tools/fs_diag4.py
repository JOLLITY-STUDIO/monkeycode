# -*- coding: utf-8 -*-
"""FNT 主表原始字节 + 目录表起始分析"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off, fnt_size = h['fnt_off'], h['fnt_size']

print('=== FNT 起始 0x%X 前 0x60 字节 ===' % fnt_off)
for row in range(6):
    chunk = d[fnt_off + row * 16:fnt_off + row * 16 + 16]
    hexs = ' '.join('%02X' % b for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print('  %05X: %-48s |%s|' % (row * 16, hexs, asc))

print('\n=== 主表条目 (每 8 字节) 前 16 个，两种解释 ===')
for i in range(16):
    off = fnt_off + 4 + i * 8
    b0, b1 = d[off], d[off + 1]
    u16s = struct.unpack_from('<4H', d, off)
    print('  [%d] @%05X: %s  (fid=%d pid=%d a=%d b=%d)' % (i, off,
          ' '.join('%04X' % u for u in u16s), u16s[0], u16s[1], u16s[2], u16s[3]))

print('\n=== 再看根目录表起点假设：也许主表条目是 16 字节? ===')
count16 = struct.unpack_from('<I', d, fnt_off)[0]
for entry_sz in (8, 12, 16):
    root_tbl = fnt_off + 4 + count16 * entry_sz
    b = d[root_tbl]
    print('  entry_sz=%d root_tbl=0x%X first_byte=0x%02X %r' % (entry_sz, root_tbl, b, chr(b) if 32 <= b < 127 else '?'))
