# -*- coding: utf-8 -*-
"""FNT 完整解析 v5（最终修正）：
- 主表：从 fnt_off 起 25 条 × 8B，条目 = [u32 X][u32 parent<<16|first_file]
- 根目录表起点 = fnt_off + 200 (0xBF6C8)
- 目录表：文件 [len][name]，目录 [len|0x80][name][u16 sub]，sub 编码 0xF000|dir_id
输出 fs_tree.txt
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off = h['fnt_off']
fat = rom.fat(h['fat_off'], h['fat_size'])
OUT = os.path.join(os.path.dirname(__file__), 'fs_tree.txt')

# 主表条目数：主表字节 = u32[0]；每条目 8 字节
main_bytes = struct.unpack_from('<I', d, fnt_off)[0]
ndirs = main_bytes // 8
root_tbl = fnt_off + main_bytes

dirs = []
for i in range(ndirs):
    a = struct.unpack_from('<I', d, fnt_off + i * 8)[0]
    b = struct.unpack_from('<I', d, fnt_off + i * 8 + 4)[0]
    parent_flag = b >> 16
    first_file = b & 0xFFFF
    dirs.append({'id': i, 'x': a, 'parent_flag': parent_flag,
                 'parent': parent_flag & 0x0FFF, 'first_file': first_file})

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

tables = []
cur = root_tbl
for i in range(ndirs):
    files, subdirs, cur = parse_table(cur)
    tables.append((files, subdirs))

dir_names = {0: 'ROOT'}
for i, (_, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if sid not in dir_names:
            dir_names[sid] = name

print('=== 验证 ===')
all_ok = True
for i, (files, subdirs) in enumerate(tables):
    ff = dirs[i]['first_file']
    next_ff = dirs[i + 1]['first_file'] if i + 1 < ndirs else len(fat)
    span = next_ff - ff
    if span != len(files):
        all_ok = False
        print('  dir[%02d] %-10s first=%4d files=%4d span=%4d !!MISMATCH' % (i, dir_names.get(i, '?'), ff, len(files), span))
    else:
        print('  dir[%02d] %-10s first=%4d files=%4d OK' % (i, dir_names.get(i, '?'), ff, len(files)))
print('全部 OK' if all_ok else '有不匹配!')

lines = []
def walk(did, prefix):
    files, subdirs = tables[did]
    base_fid = dirs[did]['first_file']
    for sid, name in sorted(subdirs, key=lambda x: x[0]):
        lines.append('%s%s/' % (prefix, name))
        if sid < ndirs:
            walk(sid, prefix + '  ')
    for idx, (pos, name) in enumerate(sorted(files, key=lambda x: x[0])):
        fid = base_fid + idx
        s, e = fat[fid]
        lines.append('%s%s  [id=%d] off=0x%08X size=0x%X' % (prefix, name, fid, s, e - s))

walk(0, '')
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
    f.write('\n\n=== 主表 ===\n')
    for dd in dirs:
        f.write('dir[%02d] parent=%d first_file=%d x=%d name=%s\n' % (
            dd['id'], dd['parent'], dd['first_file'], dd['x'], dir_names.get(dd['id'], '?')))
print('written', OUT, os.path.getsize(OUT), 'bytes')
