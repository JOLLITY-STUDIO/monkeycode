"""
V0.17.0 — 把 decode_nbm.py 输出的 32bpp BMP 转成 miniprogram 可用的 PNG.

输入:  rom-data/extracted/nbm/*.nbm.bmp
输出:  miniprogram/assets/nbm/*.nbm.png
产物:  rom-data/extracted/nbm-png-manifest.json

透明色: BMP 已由 decode_nbm.py 写入 BGRA, color 0 → alpha=0.
本脚本直接读取并保存为 PNG, 保持尺寸和透明.
"""
import os
import json
import glob
from PIL import Image

WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
SRC_DIR = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'nbm')
OUT_DIR = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm')
MANIFEST_PATH = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'nbm-png-manifest.json')


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    entries: list = []

    for src_path in sorted(glob.glob(os.path.join(SRC_DIR, '*.bmp'))):
        base = os.path.basename(src_path)                # e.g. numclo_waku.nbm.bmp
        name = base[:-4] if base.endswith('.bmp') else base  # strip '.bmp'
        out_name = name + '.png'                           # e.g. numclo_waku.nbm.png
        out_path = os.path.join(OUT_DIR, out_name)

        with Image.open(src_path) as im:
            # decode_nbm.py writes 32bpp BGRA; Pillow reads as RGBA
            im_rgba = im.convert('RGBA')
            im_rgba.save(out_path, 'PNG', optimize=True)

        entries.append({
            'name': name,
            'srcBmp': base,
            'png': out_name,
            'path': out_path,
            'size': os.path.getsize(out_path),
        })
        print(f'Converted {base} -> {out_name}')

    total = sum(e['size'] for e in entries)
    manifest = {
        'total': len(entries),
        'totalBytes': total,
        'totalKb': round(total / 1024, 2),
        'entries': entries,
    }
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f'\nDone: {len(entries)} PNG files, {manifest["totalKb"]} KB')
    print(f'Manifest: {MANIFEST_PATH}')


if __name__ == '__main__':
    main()
