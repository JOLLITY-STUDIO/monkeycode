# -*- coding: utf-8 -*-
"""批量将 .map 谜题数据转换为 TypeScript 模块（v2：唯一标识符修复）
- 每个文件生成唯一的 TS 安全标识符
- 数字前缀（如 4000101_Cat & mouse）→ P4000101（保持旧格式）
- 其余（tu_map_00 / Joshichan 等）→ 完整文件名清洗后作为 ID（Ptu_map_00 / PJoshichan）
"""
import sys, os, math, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
OUT = os.path.join(os.path.dirname(__file__), '..', 'miniprogram', 'engine', 'data', 'puzzles')
os.makedirs(OUT, exist_ok=True)

dirs, tables, _ = rom.fnt_parse()
files, _ = tables[19]  # map_d
base_fid = dirs[19]['first_file']

def ts_id(name):
    """从文件名生成唯一的 TS 标识符"""
    stem = name[:-4]  # 去掉 .map
    m = re.match(r'^(\d+)', stem)
    if m:
        return 'P' + m.group(1)  # 数字前缀 → P4000101
    safe = re.sub(r'[^0-9A-Za-z]', '_', stem)
    if not safe[0].isalpha() and safe[0] != '_':
        safe = '_' + safe
    return 'P' + safe

puzzles = []
seen = set()
for idx, (pos, name) in enumerate(files):
    if not name.endswith('.map'):
        continue
    fid = base_fid + idx
    data = rom.read_file(fid)
    h, w = data[0], data[1]
    body = data[6:]
    expect = math.ceil(h * w / 2)
    if len(body) != expect:
        print('SKIP', name, 'body=%d expect=%d' % (len(body), expect))
        continue
    grid = []
    for y in range(h):
        row = []
        for x in range(w):
            i = y * w + x
            b = body[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            row.append(n)
        grid.append(row)
    parts = name[:-4].split('_', 1)
    pname = parts[1] if len(parts) > 1 else parts[0]
    pid = ts_id(name)
    if pid in seen:
        print('WARN duplicate id:', pid, name)
        continue
    seen.add(pid)
    puzzles.append({'id': pid, 'name': pname, 'w': w, 'h': h, 'grid': grid})

print('共 %d 个 .map 谜题' % len(puzzles))
assert len(puzzles) == len(set(p['id'] for p in puzzles)), '标识符仍有重复！'

# 每 50 个一个文件
BATCH = 50
for b in range(0, len(puzzles), BATCH):
    chunk = puzzles[b:b + BATCH]
    lines = ['// Pic Pic (Japan) - Map Puzzle Data Batch %d' % (b // BATCH + 1)]
    for p in chunk:
        lines.append("export const %s = { name: '%s', w: %d, h: %d, grid: new Uint8Array([" % (
            p['id'], p['name'].replace("'", "\\'"), p['w'], p['h']))
        for row in p['grid']:
            lines.append('  ' + ','.join(str(c) for c in row) + ',')
        lines.append('])};')
    fname = os.path.join(OUT, 'map_batch_%d.ts' % (b // BATCH + 1))
    with open(fname, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('written', fname, os.path.getsize(fname))

# 索引
index = ['// Puzzle Index']
for i, p in enumerate(puzzles):
    index.append("import { %s } from './map_batch_%d';" % (p['id'], i // BATCH + 1))
index.append('')
index.append('export const PUZZLES = [')
for p in puzzles:
    index.append('  %s,' % p['id'])
index.append('];')
with open(os.path.join(OUT, 'index.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(index))
print('written index.ts')
