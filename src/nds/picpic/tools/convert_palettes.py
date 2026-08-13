# -*- coding: utf-8 -*-
"""批量将 map_comp 的 400 个 NCLR 调色板转换为 TypeScript 模块。
每个谜题对应一个 m%03d_pc.NCLR（按 map_d 目录顺序，跳过 4000210）。
"""
import sys, os, struct, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
OUT = os.path.join(os.path.dirname(__file__), '..', 'miniprogram', 'engine', 'data', 'palettes')
os.makedirs(OUT, exist_ok=True)

dirs, tables, names = rom.fnt_parse()
files, _ = tables[19]  # map_d
maps = [n for _, n in files if n.endswith('.map')]

def ts_id(name):
    stem = name[:-4]
    m = re.match(r'^(\d+)', stem)
    if m:
        return 'P' + m.group(1)
    safe = re.sub(r'[^0-9A-Za-z]', '_', stem)
    if not safe[0].isalpha() and safe[0] != '_':
        safe = '_' + safe
    return 'P' + safe

def bgr555_to_rgb(c):
    r = (c & 0x1F) * 255 // 31
    g = ((c >> 5) & 0x1F) * 255 // 31
    b = ((c >> 10) & 0x1F) * 255 // 31
    return (r, g, b)

# 按 map_d 顺序遍历，跳过 4000210（已知损坏），m-number = i+1（因为 m001 对应第一个 .map）
BATCH = 50
batch = []
index = ['// Palette Index']
for i, mname in enumerate(maps):
    # m-number = i+1
    mnum = i + 1
    fid, data = rom.find_path('map_comp/m%03d_pc.NCLR' % mnum)
    if not data:
        print('MISS palette', mnum, mname)
        continue
    colors = struct.unpack_from('<16H', data, 0x28)
    rgb = [bgr555_to_rgb(c) for c in colors]
    pid = ts_id(mname)
    batch.append((pid, rgb))
    if len(batch) == BATCH or i == len(maps) - 1:
        bidx = (i // BATCH) + 1
        lines = ['// Pic Pic (Japan) - Palette Batch %d' % bidx]
        for pid, rgb in batch:
            arr = ','.join('[%d,%d,%d]' % c for c in rgb)
            lines.append('export const %s = [%s];' % (pid, arr))
        fname = os.path.join(OUT, 'pal_batch_%d.ts' % bidx)
        with open(fname, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print('written', fname, os.path.getsize(fname))
        batch = []
    index.append("import { %s } from './pal_batch_%d';" % (pid, (i // BATCH) + 1))

index.append('')
index.append('export const PALETTES: Record<string, number[][]> = {')
for mname in maps:
    pid = ts_id(mname)
    index.append('  %s: %s,' % (pid, pid))
index.append('};')
with open(os.path.join(OUT, 'index.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(index))
print('written index.ts')
