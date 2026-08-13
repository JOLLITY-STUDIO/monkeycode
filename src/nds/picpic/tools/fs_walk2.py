# -*- coding: utf-8 -*-
"""FNT 解析 v3（边界修正）：
- 主表 25 条 × 8B，仅用每条第 1 个 u32 = parent<<16 | first_file
- 根目录表起点 = 0xBF6CC
- 文件 [len][name]；目录 [len|0x80][name][u16 sub]
验证文件数与 first_file 区间
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off = h['fnt_off']
fat = rom.fat(h['fat_off'], h['fat_size'])

MAIN_SIZE = 25 * 8
main_start = fnt_off + 4
root_tbl = main_start + MAIN_SIZE  # 0xBF6CC

dirs = []
for i in range(25):
    a = struct.unpack_from('<I', d, main_start + i * 8)[0]
    dirs.append((a >> 16, a & 0xFFFF))
print('根表起点 0x%X' % root_tbl)

def parse_table(tbl_off, limit=None):
    files, subdirs = [], []
    cur = tbl_off
    while True:
        c = d[cur]
        if c == 0:
            cur += 1
            break
        nlen = c & 0x7F
        if c & 0x80:
            name = d[cur + 1:cur + 1 + nlen].decode('ascii', 'replace')
            sub = struct.unpack_from('<H', d, cur + 1 + nlen)[0]
            subdirs.append((sub & 0x0FFF, name))
            cur += 1 + nlen + 2
        else:
            name = d[cur + 1:cur + 1 + nlen].decode('ascii', 'replace')
            files.append(name)
            cur += 1 + nlen
        if limit and cur >= limit:
            break
    return files, subdirs, cur

tables = []
cur = root_tbl
for did in range(25):
    files, subdirs, cur = parse_table(cur)
    tables.append((files, subdirs))

print('=== 25 目录表 ===')
ok = True
for i, (files, subdirs) in enumerate(tables):
    parent, ff = dirs[i]
    next_ff = dirs[i + 1][1] if i + 1 < 25 else len(fat)
    span = next_ff - ff
    match = 'OK' if span == len(files) else '!! %d != %d' % (span, len(files))
    if span != len(files):
        ok = False
    sd = ','.join(name for _, name in subdirs[:6])
    print('dir[%02d] parent=%d first=%d files=%d span=%d %s sub=[%s]' % (
        i, parent & 0x0FFF if parent != 0x19 else -1, ff, len(files), span, match, sd))
    if i < 2 or (i in (9, 10)):
        for f in files[:8]:
            print('    F %s' % f)
        for s, name in subdirs[:6]:
            print('    D 0x%X %s' % (s, name))
        if len(files) > 8:
            print('    ...')

print('\n全部匹配' if ok else '\n存在不匹配!')
