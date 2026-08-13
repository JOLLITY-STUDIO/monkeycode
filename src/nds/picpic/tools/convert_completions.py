# -*- coding: utf-8 -*-
"""将 map_comp 完成图数据转换为 TS 模块（优化：存储 palette 索引 + 调色板，而非 RGB 像素）"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
OUT = os.path.join(os.path.dirname(__file__), '..', 'miniprogram', 'engine', 'data', 'completions')
os.makedirs(OUT, exist_ok=True)

def lz77_decompress(src, out_len):
    out = bytearray()
    i, n = 4, out_len
    while len(out) < n and i < len(src):
        flags = src[i]; i += 1
        for bit in range(8):
            if len(out) >= n or i >= len(src):
                break
            if flags & (0x80 >> bit):
                b1, b2 = src[i], src[i + 1]; i += 2
                length = ((b1 >> 4) & 0x0F) + 3
                disp = ((b1 & 0x0F) << 8) | b2
                disp += 1
                for _ in range(length):
                    out.append(out[-disp])
            else:
                out.append(src[i]); i += 1
    return bytes(out)

def bgr555(c):
    r = (c & 0x1F) * 255 // 31
    g = ((c >> 5) & 0x1F) * 255 // 31
    b = ((c >> 10) & 0x1F) * 255 // 31
    return (r, g, b)

# 获取 map_comp 目录
_, tables, _ = rom.fnt_parse()
dirs, _, _ = rom.fnt_parse()

map_comp_idx = None
for i, (files, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if name.lower() == 'map_comp':
            map_comp_idx = sid
            break
    if map_comp_idx is not None:
        break

files, _ = tables[map_comp_idx]
base_fid = dirs[map_comp_idx]['first_file']

# 读取共享的 NSCR
nscr_fid = None
for j, (p2, n2) in enumerate(files):
    if n2 == 'm001.NSCR':
        nscr_fid = base_fid + j
        break

nscr_data = rom.read_file(nscr_fid)
scr = struct.unpack_from('<257H', nscr_data, 0x22)

# 收集所有 LZ.bin 和 pc.NCLR
lz_files = {}
pal_files = {}
for j, (p2, n2) in enumerate(files):
    if n2.endswith('_LZ.bin') and n2.startswith('m') and n2[1:4].isdigit():
        mid = n2[1:4]
        lz_files[mid] = base_fid + j
    elif n2.endswith('_pc.NCLR') and n2.startswith('m') and n2[1:4].isdigit():
        mid = n2[1:4]
        pal_files[mid] = base_fid + j

print('LZ files:', len(lz_files), 'PAL files:', len(pal_files))

completions = []
for mid in sorted(lz_files.keys()):
    if mid not in pal_files:
        continue
    lz_data = rom.read_file(lz_files[mid])
    out_len = lz_data[1] | (lz_data[2] << 8) | (lz_data[3] << 16)
    ncgr = lz77_decompress(lz_data, out_len)
    tiles = ncgr[0x40:]
    
    pal_data = rom.read_file(pal_files[mid])
    colors = struct.unpack_from('<16H', pal_data, 0x28)
    rgb = [bgr555(c) for c in colors]
    
    # 渲染 16x16 tiles = 128x128 px，存储 palette 索引（每像素 4bit）
    W, H = 16 * 8, 16 * 8
    indices = []
    for ty in range(16):
        for tx in range(16):
            ti = scr[ty * 16 + tx + 1] & 0x3FF  # +1 跳过首项 0
            t = tiles[ti * 32:(ti + 1) * 32]
            for y in range(8):
                v = int.from_bytes(t[y * 4:(y + 1) * 4], 'big')
                for x in range(8):
                    c = (v >> (4 * (7 - x))) & 0xF
                    indices.append(c)
    
    # 压缩为 nibble 数组
    nibble_bytes = []
    for i in range(0, len(indices), 2):
        lo = indices[i]
        hi = indices[i + 1] if i + 1 < len(indices) else 0
        nibble_bytes.append((hi << 4) | lo)
    
    completions.append({
        'id': mid,
        'w': W,
        'h': H,
        'palette': rgb,
        'pixels': nibble_bytes,
    })
    if int(mid) % 50 == 0:
        print('M%s done' % mid)

print('共 %d 个完成图' % len(completions))

# 输出为 TS 模块（每 50 个一批）
BATCH = 50
for b in range(0, len(completions), BATCH):
    chunk = completions[b:b + BATCH]
    lines = ['// Pic Pic (Japan) - Completion Images Batch %d' % (b // BATCH + 1)]
    for c in chunk:
        lines.append("export const C%s = { w: %d, h: %d, palette: [" % (c['id'], c['w'], c['h']))
        for r, g, b in c['palette']:
            lines.append('  %d,%d,%d,' % (r, g, b))
        lines.append('], pixels: new Uint8Array([')
        arr = c['pixels']
        for i in range(0, len(arr), 30):
            lines.append('  ' + ','.join(str(v) for v in arr[i:i + 30]) + ',')
        lines.append('])};')
    fname = os.path.join(OUT, 'comp_batch_%d.ts' % (b // BATCH + 1))
    with open(fname, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('written', fname, os.path.getsize(fname))

# 索引
index = ['// Completion Index']
for c in completions:
    index.append("import { C%s } from './comp_batch_%d';" % (
        c['id'], (completions.index(c) // BATCH) + 1))
index.append('')
index.append('export const COMPLETIONS: Record<string, { w: number; h: number; palette: number[]; pixels: Uint8Array }> = {')
for c in completions:
    index.append('  "%s": C%s,' % (c['id'], c['id']))
index.append('};')
with open(os.path.join(OUT, 'index.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(index))
print('written index.ts')
