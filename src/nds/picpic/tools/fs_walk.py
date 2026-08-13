# -*- coding: utf-8 -*-
"""FNT 完整解析 v2：
- 主表：25 条目 × 8 字节 (u32 parent<<16|first_file, u32 ??)
- 目录表：文件 [len][name]，目录 [len|0x80][name][u16 sub]
- 目录表按 dir id 顺序依次存放
验证文件数与 first_file_id 递增关系
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off = h['fnt_off']
fat = rom.fat(h['fat_off'], h['fat_size'])

# --- 1. 主表 ---
first = struct.unpack_from('<I', d, fnt_off)[0]
print('FNT first u32 = %d (0x%X)' % (first, first))

dirs = []
off = fnt_off + 4
n = 0
while True:
    a = struct.unpack_from('<I', d, off)[0]
    b = struct.unpack_from('<I', d, off + 4)[0]
    parent_flag = a >> 16
    first_file = a & 0xFFFF
    dirs.append((n, parent_flag, first_file, b))
    n += 1
    off += 8
    # 检测下一个目录表起点：字节应像 len 前缀（0x01..0x7F 且后跟可打印）
    c = d[off]
    if 1 <= (c & 0x7F) <= 0x7F and 32 <= d[off + 3] < 127:
        break
    if off > fnt_off + 0x2000:
        break

print('主表条目数: %d' % len(dirs))
for did, pf, ff, b in dirs:
    print('  dir[%02d] parent_flag=0x%04X first_file=%d next?=%d' % (did, pf, ff, b))

# --- 2. 目录表按序解析 ---
tbl = off  # 第一个目录表起点
print('\n目录表起点 = 0x%X' % tbl)

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
            subdirs.append((sub, name))
            cur += 1 + nlen + 2
        else:
            name = d[cur + 1:cur + 1 + nlen].decode('ascii', 'replace')
            files.append(name)
            cur += 1 + nlen
        if limit and cur >= limit:
            break
    return files, subdirs, cur

tables = []
cur = tbl
for did in range(len(dirs)):
    files, subdirs, cur = parse_table(cur)
    tables.append((files, subdirs))
    if did < 3:
        print('\n--- dir[%d] (%d files, %d subdirs) @0x%X ---' % (did, len(files), len(subdirs), cur - (1 if did > 0 else 0)))
        for f in files[:12]:
            print('    F %s' % f)
        for s, name in subdirs[:8]:
            print('    D 0x%04X %s' % (s, name))
        if len(files) > 12:
            print('    ... (%d more)' % (len(files) - 12))

# --- 3. 验证: 文件 id 范围 ---
print('\n=== 文件数验证 ===')
for i, (files, subdirs) in enumerate(tables):
    ff = dirs[i][2]
    next_ff = dirs[i + 1][2] if i + 1 < len(dirs) else len(fat)
    span = next_ff - ff
    print('  dir[%02d] first_file=%d 实际文件数=%d 期望区间=%d %s' % (
        i, ff, len(files), span, 'OK' if span >= len(files) else '!!SPAN<COUNT!!'))

print('\n总目录表数: %d (vs 主表 %d)' % (len(tables), len(dirs)))
