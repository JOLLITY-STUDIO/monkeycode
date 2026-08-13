# -*- coding: utf-8 -*-
"""
extract_rom.py — 一键把 Pic Pic NDS ROM 全部资源按目录结构提取到磁盘
=====================================================================
输出到 roms/extracted/，保留 FNT 目录层级，以后可直接查看，不用再开 ROM。

用法:
    python extract_rom.py            # 全部提取
    python extract_rom.py --gfx      # 只提取图像类资源
    python extract_rom.py --list     # 只列出文件清单不落盘
"""
import sys, os, re, argparse
from pathlib import Path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

TOOLS = Path(__file__).resolve().parent
ROM_DIR = TOOLS.parent / 'roms'
OUT_DIR = ROM_DIR / 'extracted'

# 图像类扩展名（NCGR/NCER/NCLR/NSCR 是 Nitro 图形格式）
GFX_EXTS = {'.ncgr', '.ncer', '.nclr', '.nscr', '.nbfp', '.bin',
            '.png', '.bmp', '.gif', '.ncg', '.nsc', '.ncl', '.ncc', '.pal'}


def build_paths():
    """返回 {fid: 相对路径}（带目录名拼接）"""
    rom = NdsRom()
    dirs, tables, names = rom.fnt_parse()
    fat = rom.fat(rom.header(0)['fat_off'], rom.header(0)['fat_size'])
    # 计算每个目录的路径
    dpath = {0: ''}
    # 用父目录关系构建路径（names 表从子目录记录收集）
    for i, dd in enumerate(dirs):
        pid = dd['parent']
        if pid in dpath and i != 0:
            dpath[i] = os.path.join(dpath[pid], names.get(i, 'dir%d' % i)).replace('\\', '/')
        else:
            dpath.setdefault(i, names.get(i, 'dir%d' % i))
    rel = {}
    for i, dd in enumerate(dirs):
        files, _ = tables[i]
        for idx, (pos, name) in enumerate(files):
            fid = dd['first_file'] + idx
            rel[fid] = os.path.join(dpath.get(i, ''), name).replace('\\', '/')
    return rom, dirs, tables, names, fat, rel


def extract_all():
    rom, dirs, tables, names, fat, rel = build_paths()
    n = 0
    total_bytes = 0
    gfx = 0
    for fid, path in sorted(rel.items()):
        data = rom.read_file(fid, dirs, tables)
        out = OUT_DIR / path
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(data)
        n += 1
        total_bytes += len(data)
        if Path(path).suffix.lower() in GFX_EXTS:
            gfx += 1
    # 提取 ARM9 / ARM7
    h = rom.header(0)
    (OUT_DIR / '_system').mkdir(parents=True, exist_ok=True)
    (OUT_DIR / '_system' / 'arm9.bin').write_bytes(rom.arm9(h))
    (OUT_DIR / '_system' / 'arm7.bin').write_bytes(rom.arm7(h))
    (OUT_DIR / '_system' / 'header.bin').write_bytes(rom.data[:0x200])
    print('extracted %d files (%d gfx) -> %s  total=%.2f MB' % (
        n, gfx, OUT_DIR, total_bytes / 1048576.0))
    # 写文件清单
    lines = []
    for fid, path in sorted(rel.items()):
        s, e = fat[fid]
        lines.append('%06d\t%d\t%s\t%s' % (fid, e - s, path, Path(path).suffix.lower()))
    idx = TOOLS / 'extracted-index.tsv'
    idx.write_text('\n'.join(lines), encoding='utf-8')
    print('index -> %s (%d entries)' % (idx, len(lines)))


def extract_gfx():
    rom, dirs, tables, names, fat, rel = build_paths()
    n = 0
    for fid, path in sorted(rel.items()):
        if Path(path).suffix.lower() not in GFX_EXTS:
            continue
        data = rom.read_file(fid, dirs, tables)
        out = OUT_DIR / path
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(data)
        n += 1
    print('extracted %d gfx files -> %s' % (n, OUT_DIR))


def list_only():
    rom, dirs, tables, names, fat, rel = build_paths()
    from collections import Counter
    exts = Counter(Path(p).suffix.lower() for p in rel.values())
    print('total files: %d' % len(rel))
    for ext, c in exts.most_common():
        print('  %-8s %5d' % (ext or '(none)', c))


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--gfx', action='store_true', help='只提取图像资源')
    ap.add_argument('--list', action='store_true', help='只列清单')
    a = ap.parse_args()
    if a.list:
        list_only()
    elif a.gfx:
        extract_gfx()
    else:
        extract_all()
