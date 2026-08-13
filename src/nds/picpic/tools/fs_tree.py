# -*- coding: utf-8 -*-
"""最终版 NDS FNT 解析：
1. 目录表区域截止到 FAT 偏移（避免读到 FAT 数据）
2. 文件 ID = 目录 first_file_id + 目录内文件序号
3. 子目录 ID 编码实验：sub<count -> count-1-sub；否则 -> sub-count
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
d = rom.data
fnt_off = h['fnt_off']
fat_off = h['fat_off']
fat = rom.fat(h['fat_off'], h['fat_size'])
OUT = os.path.join(os.path.dirname(__file__), 'fs_tree.txt')

count = struct.unpack_from('<I', d, fnt_off)[0]
main_entries = []
for i in range(count):
    fid, pid = struct.unpack_from('<HH', d, fnt_off + 4 + i * 8)
    main_entries.append((fid, pid))

# 顺序解析目录表偏移，截止到 FAT
table_offsets = []
cur = fnt_off + 4 + count * 8
end_limit = fat_off
valid_dirs = 0
for did in range(count):
    if cur >= end_limit:
        break
    table_offsets.append(cur)
    valid_dirs += 1
    while cur < end_limit:
        c = d[cur]
        if c == 0:
            cur += 1
            break
        nlen = c & 0x7F
        cur += 3 + nlen
        if cur >= end_limit:
            break
print('有效目录表数: %d (截止 FAT 0x%X)' % (valid_dirs, fat_off))

def parse_table(off, first_file_id):
    files, subdirs = [], []
    cur = off
    fid_counter = first_file_id
    while True:
        c = d[cur]
        if c == 0:
            break
        sub = struct.unpack_from('<H', d, cur + 1)[0]
        nlen = c & 0x7F
        name = d[cur + 3:cur + 3 + nlen].decode('ascii', 'replace')
        if c & 0x80:
            subdirs.append((sub, name))
        else:
            files.append((fid_counter, name))
            fid_counter += 1
        cur += 3 + nlen
    return files, subdirs

# 子目录解码
def decode_sub(sub):
    if sub == 0xFFFF:
        return None
    if sub < count:
        return count - 1 - sub
    return sub - count

# 目录名字（通过父引用）
dir_names = {0: 'ROOT'}

def collect_names(did, depth=0):
    if did >= len(table_offsets):
        return
    files, subdirs = parse_table(table_offsets[did], main_entries[did][0])
    for sub, name in subdirs:
        cid = decode_sub(sub)
        if cid is not None and cid < len(table_offsets):
            dir_names[cid] = name
            collect_names(cid, depth + 1)

collect_names(0)

lines = []
seen = set()
def walk(did, prefix):
    if did in seen:
        lines.append('%s<cycle>%s' % (prefix, dir_names.get(did, '?')))
        return
    seen.add(did)
    files, subdirs = parse_table(table_offsets[did], main_entries[did][0])
    for sub, name in sorted(subdirs, key=lambda x: x[1]):
        cid = decode_sub(sub)
        if cid is None or cid >= len(table_offsets):
            lines.append('%s%s/  [invalid sub=%d]' % (prefix, name, sub))
            continue
        lines.append('%s%s/' % (prefix, name))
        walk(cid, prefix + '  ')
    for fid, name in sorted(files, key=lambda x: x[0]):
        if fid < len(fat):
            s, e = fat[fid]
            lines.append('%s%s  [id=%d] off=0x%08X size=0x%X (%d B)' % (prefix, name, fid, s, e - s, e - s))
        else:
            lines.append('%s%s  [id=%d OUT]' % (prefix, name, fid))

walk(0, '')
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
    f.write('\n\nTOTAL dirs=%d files=%d' % (len(table_offsets), len(fat)))
print('written', OUT, os.path.getsize(OUT), 'bytes')
