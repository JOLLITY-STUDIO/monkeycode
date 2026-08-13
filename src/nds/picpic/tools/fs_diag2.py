# -*- coding: utf-8 -*-
"""打印所有子目录引用及其编码，推断 ID 规则"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
d = rom.data
fnt_off = h['fnt_off']
first = struct.unpack_from('<I', d, fnt_off)[0]

table_offsets = []
cur = fnt_off + 4 + first * 8
for did in range(first):
    table_offsets.append(cur)
    while True:
        c = d[cur]
        if c == 0:
            cur += 1
            break
        nlen = c & 0x7F
        cur += 3 + nlen

refs = []
for did in range(first):
    cur = table_offsets[did]
    while True:
        c = d[cur]
        if c == 0:
            break
        sub = struct.unpack_from('<H', d, cur + 1)[0]
        nlen = c & 0x7F
        name = d[cur + 3:cur + 3 + nlen].decode('ascii', 'replace')
        if c & 0x80:
            refs.append((did, sub, name))
        cur += 3 + nlen

print('total dirs=%d, subdir refs=%d' % (first, len(refs)))
subs = sorted(set(r[1] for r in refs))
print('unique sub values:', subs)
print('min=%d max=%d' % (min(subs), max(subs)))
print()
print('first 30 refs:')
for did, sub, name in refs[:30]:
    print('  parent=%d sub=0x%04X (%d) name=%s' % (did, sub, sub, name))
