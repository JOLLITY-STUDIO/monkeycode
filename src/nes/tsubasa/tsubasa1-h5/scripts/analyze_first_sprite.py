#!/usr/bin/env python3
"""
分析第一个精灵图的 tiles 和渲染结构
从 CHR ROM 中解码前几个 tile 的像素数据
"""
import os, sys

GRAY_CHARS = [' ', '.', 'o', '#']  # 0=black, 1=dark, 2=light, 3=white

chr_path = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'banks', 'CHR_ROM.chr')
if not os.path.exists(chr_path):
    print(f"ERROR: CHR ROM not found at {chr_path}")
    sys.exit(1)

with open(chr_path, 'rb') as f:
    chr_data = f.read()

print('=== CHR ROM Total Size:', len(chr_data), 'bytes ===')
print('Total tiles:', len(chr_data) // 16, '(256 tiles per bank ×', len(chr_data)//16//256, 'banks)')
print()

# 每个 CHR bank = $2000 bytes = 256 tiles
# 第一个 bank (bank 0) 用于菜单/文字等
# 分析 bank 0 的前 16 个 tile
print('=== Bank 0: First 16 Tiles ===')
print()

for tile_n in range(16):
    offset = tile_n * 16
    tile_bytes = chr_data[offset:offset+16]
    plane0 = tile_bytes[0:8]
    plane1 = tile_bytes[8:16]
    
    # 只打印非空 tile
    is_empty = all(b == 0 for b in tile_bytes)
    if is_empty:
        empty_tiles = 0
        for tn in range(tile_n, 256):
            if all(b == 0 for b in chr_data[tn*16:tn*16+16]):
                empty_tiles += 1
            else:
                break
        if empty_tiles > 1:
            print(f'Tiles #{tile_n}-#{tile_n+empty_tiles-1}: (empty)')
        break
    
    print(f'Tile #{tile_n} (${tile_n:02X}):')
    for row in range(8):
        line = ''
        for col in range(8):
            bit0 = (plane0[row] >> (7-col)) & 1
            bit1 = (plane1[row] >> (7-col)) & 1
            idx = bit0 | (bit1 << 1)
            line += GRAY_CHARS[idx]
        print(f'  {line}')
    print()

# 也分析一些高编号的 tile (通常用于人物/精灵)
print()
print('=== Bank 1 (offset $2000): First 8 Non-empty Tiles ===')
bank1_start = 0x2000
count = 0
for tile_n in range(256):
    offset = bank1_start + tile_n * 16
    if offset + 16 > len(chr_data):
        break
    tile_bytes = chr_data[offset:offset+16]
    if all(b == 0 for b in tile_bytes):
        continue
    plane0 = tile_bytes[0:8]
    plane1 = tile_bytes[8:16]
    print(f'Tile #$2000+{tile_n} (${tile_n:02X} in bank 1):')
    for row in range(8):
        line = ''
        for col in range(8):
            bit0 = (plane0[row] >> (7-col)) & 1
            bit1 = (plane1[row] >> (7-col)) & 1
            idx = bit0 | (bit1 << 1)
            line += GRAY_CHARS[idx]
        print(f'  {line}')
    print()
    count += 1
    if count >= 8:
        break
