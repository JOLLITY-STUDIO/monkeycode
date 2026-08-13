# -*- coding: utf-8 -*-
"""分析 map_d / map_comp 谜题文件头部格式"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fat = rom.fat(h['fat_off'], h['fat_size'])

def parse_table(tbl_off):
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
            files.append((cur, name))
            cur += 1 + nlen
    return files, subdirs, cur

fnt_off = h['fnt_off']
main_bytes = struct.unpack_from('<I', d, fnt_off)[0]
ndirs = main_bytes // 8
cur = fnt_off + main_bytes
tables = []
for i in range(ndirs):
    files, subdirs, cur = parse_table(cur)
    tables.append((files, subdirs))
dirs = []
for i in range(ndirs):
    b = struct.unpack_from('<I', d, fnt_off + i * 8 + 4)[0]
    dirs.append({'first_file': b & 0xFFFF})

def show(dir_idx, count):
    files = tables[dir_idx][0]
    print('=== dir idx=%d files=%d ===' % (dir_idx, len(files)))
    for idx, (pos, name) in enumerate(files[:count]):
        fid = dirs[dir_idx]['first_file'] + idx
        s, e = fat[fid]
        data = d[s:e]
        print('  %-26s size=%6d head=%s' % (name[:26], len(data), data[:8].hex(' ')))

show(19, 10)   # map_d
show(18, 10)   # map_comp
show(5, 6)     # fap_d
show(4, 6)     # fap_comp
show(8, 6)     # LAP_COMP
show(7, 6)     # lap
