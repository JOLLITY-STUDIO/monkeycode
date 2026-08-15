# -*- coding: utf-8 -*-
"""检查 ROM 中 map_d 目录的 .map 文件头结构，验证 convert_maps.py 解析是否正确"""
import sys, os, struct, math
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, _ = rom.fnt_parse()

# 找到 map_d 目录
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

files, _ = tables[map_d_idx]
base_fid = dirs[map_d_idx]['first_file']

# 读取前 5 个 .map 文件分析头结构
print('=== map_d 文件头分析 ===')
for idx, (pos, name) in enumerate(files[:8]):
    if not name.endswith('.map'):
        continue
    fid = base_fid + idx
    data = rom.read_file(fid)
    # 尝试多种头解析
    h1, w1 = data[0], data[1]
    h2, w2 = struct.unpack('<HH', data[:4])  # 小端16位
    h3, w3 = struct.unpack('>HH', data[:4])  # 大端16位
    print(f"{name}: size={len(data)} | b0={data[0]:02x} b1={data[1]:02x} b2={data[2]:02x} b3={data[3]:02x} b4={data[4]:02x} b5={data[5]:02x}")
    print(f"  8bit: h={h1} w={w1} | le16: h={h2} w={w2} | be16: h={h3} w={w3}")
    # 检查多种 body 起始位置
    for skip in [2, 4, 6, 8]:
        body = data[skip:]
        body_nibbles = len(body) * 2
        print(f"  skip={skip}: body={len(body)}B => {body_nibbles} nibbles")

# 找特殊文件如 Mama.map, tu_map_00.map
print('\n=== 特殊文件搜索 ===')
for idx, (pos, name) in enumerate(files):
    if 'mama' in name.lower() or 'tu_map' in name.lower() or 'rina' in name.lower():
        fid = base_fid + idx
        data = rom.read_file(fid)
        print(f"{name}: size={len(data)} b0={data[0]:02x} b1={data[1]:02x}")
