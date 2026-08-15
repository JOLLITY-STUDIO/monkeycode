# -*- coding: utf-8 -*-
"""Probe 9b: 对比 map/lap/fap 数据文件结构 (hex dump 前 96 字节)"""
import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

R = r"d:\studio\github\monkeycode\src\nds\picpic\roms\extracted"
files = [
    (os.path.join(R, "map_comp", "M001_LZ.bin"), "map_comp/M001_LZ.bin"),
    (os.path.join(R, "map_comp", "M001.NSCR"), "map_comp/M001.NSCR"),
    (os.path.join(R, "lap_comp", "l001_LZ.bin"), "lap_comp/l001_LZ.bin"),
    (os.path.join(R, "fap_comp", "f001_LZ.bin"), "fap_comp/f001_LZ.bin"),
    (os.path.join(R, "fap_comp", "f001.NSCR"), "fap_comp/f001.NSCR"),
    (os.path.join(R, "fap_comp", "f001_pc.NCLR"), "fap_comp/f001_pc.NCLR"),
]

def dump(path, label, n=96):
    print(f"=== {label} ({os.path.getsize(path)} B) ===")
    with open(path, "rb") as f:
        d = f.read(n)
    for off in range(0, len(d), 16):
        chunk = d[off:off+16]
        hexs = ' '.join('%02X' % b for b in chunk)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print(f'{off:04X}  {hexs:<47}  {asc}')

for p, lbl in files:
    if os.path.exists(p):
        dump(p, lbl)
    else:
        print(f"=== {lbl} MISSING ===")

# 统计 map_comp / lap_comp / fap_comp 文件数
for d in ("map_comp", "lap_comp", "fap_comp"):
    p = os.path.join(R, d)
    n = len(os.listdir(p)) if os.path.isdir(p) else -1
    print(f"--- {d}: {n} files")
