"""
V0.19.8 — 从 ROM NBM 像素直出 RGBA PNG (不再经 BMP 中转).

背景:
  旧版读取 decode_nbm.py 的 32bpp BMP 再转 PNG, 但 Pillow 对 BI_RGB 32bpp
  BMP 的 alpha 通道读回不可靠 (全部变 255), 导致 42 张 PNG 全部不透明:
  - staff 系列黑底不透明 (此前误判 ok, 因只查绿色没查黑色)
  - title/select*/setu03 等绿底不透明
  本脚本直接复用 decode_nbm.palette_to_rgba (已含 chroma key 0x03E0 透明规则)
  从 ROM 渲染像素 → PNG, alpha 通道 100% 保留.

输入:  work/Essential Sudoku DS (Europe).nds + rom-data/fnt-mapping.json
输出:  miniprogram/assets/nbm/*.nbm.png
产物:  rom-data/extracted/nbm-png-manifest.json
"""
import os
import json
import glob
import struct
from PIL import Image

import sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
import decode_nbm  # reuse palette_to_rgba

WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
ROM = os.path.join(WORKSPACE, 'work', 'Essential Sudoku DS (Europe).nds')
FNT_MAPPING = os.path.join(WORKSPACE, 'rom-data', 'fnt-mapping.json')
OUT_DIR = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm')
MANIFEST_PATH = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'nbm-png-manifest.json')


def render_pixels(data: bytes, width: int, height: int):
    """4bpp tile 数据 → RGBA 像素行 (row-major). 与 decode_nbm.decode_nbm_to_png 同构."""
    tile_data = data[40:]
    colors = decode_nbm.palette_to_rgba(data[8:40])
    pixels = []
    for y in range(height):
        row = []
        for x in range(width):
            idx = (y * width + x) // 2
            if idx >= len(tile_data):
                row.append((0, 0, 0, 0))
                continue
            byte = tile_data[idx]
            nibble = byte & 0x0F if (x % 2 == 0) else (byte >> 4) & 0x0F
            row.append(colors[nibble])
        pixels.append(row)
    return pixels


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    files = json.load(open(FNT_MAPPING))['files']
    nbms = [f for f in files if isinstance(f, dict) and 'nbm' in f.get('name', '').lower()]
    entries = []
    with open(ROM, 'rb') as rom:
        rom_bytes = rom.read()
        for f in sorted(nbms, key=lambda x: x.get('file_id', 0) or 0):
            name = f['name']                       # e.g. title.nbm
            out_name = name + '.png'               # title.nbm.png
            out_path = os.path.join(OUT_DIR, out_name)
            off = int(f['offset'], 16) if isinstance(f['offset'], str) else f['offset']
            data = rom_bytes[off:off + f['size']]
            if len(data) < 40:
                entries.append({'name': name, 'ok': False, 'reason': 'too small'})
                continue
            width = struct.unpack('<I', data[4:8])[0]
            if width == 0 or width > 4096:
                entries.append({'name': name, 'ok': False, 'reason': f'invalid width {width}'})
                continue
            height = (len(data) - 40) * 2 // width
            pixels = render_pixels(data, width, height)
            flat = [px for row in pixels for px in row]
            im = Image.new('RGBA', (width, height))
            im.putdata(flat)
            im.save(out_path, 'PNG', optimize=True)
            entries.append({
                'name': name,
                'png': out_name,
                'path': out_path,
                'size': os.path.getsize(out_path),
                'ok': True,
            })
            print(f'PNG {out_name} {width}x{height}')

    manifest = {
        'total': len(entries),
        'totalBytes': sum(e.get('size', 0) for e in entries),
        'totalKb': round(sum(e.get('size', 0) for e in entries) / 1024, 2),
        'entries': entries,
    }
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as g:
        json.dump(manifest, g, indent=2, ensure_ascii=False)
    print(f'\nDone: {len(entries)} PNG files, {manifest["totalKb"]} KB')
    print(f'Manifest: {MANIFEST_PATH}')


if __name__ == '__main__':
    main()
