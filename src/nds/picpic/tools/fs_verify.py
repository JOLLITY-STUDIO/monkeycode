# -*- coding: utf-8 -*-
"""标准 NDS FNT 解析（含 16bit file_id 与子目录编码），输出验证"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
d = rom.data
fnt_off = h['fnt_off']
fat = rom.fat(h['fat_off'], h['fat_size'])
OUT = os.path.join(os.path.dirname(__file__), 'fs_verify.txt')

count = struct.unpack_from('<I', d, fnt_off)[0]
main_entries = []  # (first_file_id, parent_id)
for i in range(count):
    fid, pid = struct.unpack_from('<HH', d, fnt_off + 4 + i * 8)
    main_entries.append((fid, pid))

# 顺序解析目录表偏移
table_offsets = []
cur = fnt_off + 4 + count * 8
for did in range(count):
    table_offsets.append(cur)
    while True:
        c = d[cur]
        if c == 0:
            cur += 1
            break
        nlen = c & 0x7F
        cur += 3 + nlen

def parse_table(off):
    """返回 (files[], subdirs[])"""
    files, subdirs = [], []
    cur = off
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
            file_id = (sub << 7) | (c & 0x7F)
            files.append((file_id, name))
        cur += 3 + nlen
    return files, subdirs

with open(OUT, 'w', encoding='utf-8') as f:
    for did in range(min(count, 60)):
        files, subdirs = parse_table(table_offsets[did])
        f.write('\n--- dir %d (first_file=%d parent=%d) ---\n' % (did, main_entries[did][0], main_entries[did][1]))
        for sub, name in subdirs[:8]:
            f.write('   DIR sub=%4d name=%s\n' % (sub, name))
        for fid, name in files[:12]:
            f.write('   file id=%4d name=%s\n' % (fid, name))
        if len(files) > 12:
            f.write('   ... +%d more files\n' % (len(files) - 12))
        if len(subdirs) > 8:
            f.write('   ... +%d more dirs\n' % (len(subdirs) - 8))
print('written', OUT, os.path.getsize(OUT), 'bytes')
