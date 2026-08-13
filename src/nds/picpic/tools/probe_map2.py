# -*- coding: utf-8 -*-
"""验证 .map 谜题格式：高/宽 + 4bit 像素数据，可视化还原图形"""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
samples = [
    ('map_d/4000201_House.map', 0),   # 15x15
    ('map_d/4000202_Cat.map', 0),     # 15x15
    ('map_d/4000103_Frog.map', 0),    # 40x40
    ('map_d/4000106_Airplane.map', 0),# 60x40
    ('map_d/4000204_Wooden horse.map', 0),
]

def vis_nibbles(data, h, w):
    """按行优先（每像素 4bit）还原字符图。"""
    lines = []
    for y in range(h):
        row = []
        for x in range(w):
            idx = y * w + x
            byte = data[idx >> 1]
            nib = (byte >> 4) if (idx & 1) else (byte & 0x0F)
            row.append('0123456789ABCDEF'[nib])
        lines.append(''.join(row))
    return lines

for path, _ in samples:
    fid, data = rom.find_path(path)
    if data is None or len(data) == 0:
        print('NOT FOUND', path)
        continue
    h, w = data[0], data[1]
    expect = math.ceil(h * w / 2) + 6
    print('=' * 60)
    print('%s  fid=%d size=%d h=%d w=%d expect(ceil+6)=%d %s' % (
        path, fid, len(data), h, w, expect, 'OK' if expect == len(data) else 'MISMATCH!'))
    print('head:', data[:6].hex(' '))
    # 数据区尝试：偏移 2? 3? 4? 6?
    for head_len in (2, 4, 6):
        body = data[head_len:]
        need = math.ceil(h * w / 2)
        if len(body) == need:
            print('--- head=%d 可视化 ---' % head_len)
            for l in vis_nibbles(body, h, w):
                print('  ' + l)
            break
