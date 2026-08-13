# -*- coding: utf-8 -*-
"""FNT 原始字节诊断 v3：
1. 打印 FNT/FAT 头字段
2. 打印主表前若干条目
3. 手工逐字节走根目录表（每项打印 length/flag/sub/name 原始值）
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off, fnt_size = h['fnt_off'], h['fnt_size']
fat_off, fat_size = h['fat_off'], h['fat_size']
print('FNT off=0x%X size=0x%X  FAT off=0x%X size=0x%X' % (fnt_off, fnt_size, fat_off, fat_size))
print('FNT end=0x%X (FAT start=0x%X, gap=0x%X)' % (fnt_off + fnt_size, fat_off, fat_off - (fnt_off + fnt_size)))

count = struct.unpack_from('<I', d, fnt_off)[0]
print('main count = %d (0x%X)' % (count, count))

print('\n--- 主表前 8 条目 (first_file_id, parent_id) ---')
for i in range(min(8, count)):
    fid, pid = struct.unpack_from('<HH', d, fnt_off + 4 + i * 8)
    print('  dir[%d] first_file_id=%d parent=%d' % (i, fid, pid))

root_tbl = fnt_off + 4 + count * 8
print('\n--- 根目录表原始字节 @0x%X (前 256 字节) ---' % root_tbl)
for row in range(16):
    chunk = d[root_tbl + row * 16:root_tbl + row * 16 + 16]
    hexs = ' '.join('%02X' % b for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print('  %04X: %-48s |%s|' % (row * 16, hexs, asc))

print('\n--- 手工逐项解析根目录表（前 40 项） ---')
cur = root_tbl
limit = fat_off
for idx in range(40):
    if cur >= limit:
        print('  [hit FAT limit]')
        break
    c = d[cur]
    if c == 0:
        print('  #%d  terminator (00) @0x%X' % (idx, cur))
        cur += 1
        break
    nlen = c & 0x7F
    sub = struct.unpack_from('<H', d, cur + 1)[0]
    name = d[cur + 3:cur + 3 + nlen].decode('ascii', 'replace')
    kind = 'DIR ' if c & 0x80 else 'FILE'
    print('  #%d %s len=%d sub=0x%04X name=%r  @0x%X' % (idx, kind, nlen, sub, name, cur))
    cur += 3 + nlen
