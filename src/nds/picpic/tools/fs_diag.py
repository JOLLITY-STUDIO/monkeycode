# -*- coding: utf-8 -*-
"""诊断 FNT 子目录 ID 编码"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
d = rom.data
fnt_off = h['fnt_off']

first = struct.unpack_from('<I', d, fnt_off)[0]
print('main table entries (dirs):', first)

# 目录条目区
dir_entries = []
for i in range(first):
    fid, pid = struct.unpack_from('<HH', d, fnt_off + 4 + i * 8)
    dir_entries.append((fid, pid))

# 顺序解析表，打印每个表的前几项和所有 sub 值
base = fnt_off + 4 + first * 8
cur = base
for did in range(first):
    print('\n--- dir %d (first_file=%d parent=%d) ---' % (did, dir_entries[did][0], dir_entries[did][1]))
    while True:
        c = d[cur]
        if c == 0:
            cur += 1
            break
        sub = struct.unpack_from('<H', d, cur + 1)[0]
        nlen = c & 0x7F
        name = d[cur + 3:cur + 3 + nlen].decode('ascii', 'replace')
        kind = 'DIR' if c & 0x80 else 'file'
        extra = ' sub=0x%04X' % sub if c & 0x80 else ' fid=%d' % (c & 0x7F)
        print('   %-6s %-20s %s' % (kind, name, extra))
        cur += 3 + nlen
