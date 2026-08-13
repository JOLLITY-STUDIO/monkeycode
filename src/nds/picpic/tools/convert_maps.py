# -*- coding: utf-8 -*-
"""批量将 .map 谜题数据转换为 TypeScript 模块
输出: miniprogram/engine/data/puzzles/ 目录
格式: export const P<id> = { name, w, h, grid: Uint8Array }
"""
import sys, os, struct, json, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
OUT = os.path.join(os.path.dirname(__file__), '..', 'miniprogram', 'engine', 'data', 'puzzles')
os.makedirs(OUT, exist_ok=True)

# 获取 map_d 目录下所有 .map 文件
_, tables, _ = rom.fnt_parse()
dirs, _, _ = rom.fnt_parse()
# 找到 map_d 目录 id
map_d_idx = None
for i, (files, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if name.lower() == 'map_d':
            map_d_idx = sid
            break
    if map_d_idx is not None:
        break

if map_d_idx is None:
    print('未找到 map_d 目录')
    sys.exit(1)

# map_d 文件列表
files, _ = tables[map_d_idx]
base_fid = dirs[map_d_idx]['first_file']

puzzles = []
for idx, (pos, name) in enumerate(files):
    if not name.endswith('.map'):
        continue
    fid = base_fid + idx
    data = rom.read_file(fid)
    h, w = data[0], data[1]
    body = data[6:]
    expect = math.ceil(h * w / 2)
    if len(body) != expect:
        print('SKIP %s: body=%d expect=%d' % (name, len(body), expect))
        continue
    # 解析 nibble 网格
    grid = []
    for y in range(h):
        row = []
        for x in range(w):
            i = y * w + x
            b = body[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            row.append(n)
        grid.append(row)
    # 提取 ID 和名称
    # 名称格式: 4000101_Cat & mouse.map
    parts = name[:-4].split('_', 1)
    pid = parts[0]
    pname = parts[1] if len(parts) > 1 else ''
    puzzles.append({'id': pid, 'name': pname, 'w': w, 'h': h, 'grid': grid})

print('共 %d 个 .map 谜题' % len(puzzles))

# 按 ID 分组输出（每 50 个一个文件，避免过大）
BATCH = 50
for b in range(0, len(puzzles), BATCH):
    chunk = puzzles[b:b + BATCH]
    lines = ['// Pic Pic (Japan) - Map Puzzle Data Batch %d' % (b // BATCH + 1)]
    for p in chunk:
        lines.append("export const P%s = { name: '%s', w: %d, h: %d, grid: new Uint8Array([" % (
            p['id'], p['name'].replace("'", "\\'"), p['w'], p['h']))
        for row in p['grid']:
            lines.append('  ' + ','.join(str(c) for c in row) + ',')
        lines.append('])};')
    fname = os.path.join(OUT, 'map_batch_%d.ts' % (b // BATCH + 1))
    with open(fname, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('written', fname, os.path.getsize(fname))

# 索引文件
index = ['// Puzzle Index']
for p in puzzles:
    index.append("import { P%s } from './map_batch_%d';" % (
        p['id'], (puzzles.index(p) // BATCH) + 1))
index.append('')
index.append('export const PUZZLES = [')
for p in puzzles:
    index.append('  P%s,' % p['id'])
index.append('];')
with open(os.path.join(OUT, 'index.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(index))
print('written index.ts')
