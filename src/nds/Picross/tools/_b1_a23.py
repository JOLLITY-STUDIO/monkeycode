#!/usr/bin/env python3
"""B1: 扫描 file_95 后半 + 候选小文件的拼图记录"""
import struct, os

BASE = "d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed"

def scan(path, label, patterns=None):
    d = open(path, "rb").read()
    print(f"\n=== {label} size={len(d)} ===")
    if patterns is None:
        patterns = [(5,5),(10,10),(15,15),(5,10),(10,5),(20,15),(15,20)]
    for w,h in patterns:
        pat = struct.pack("<HH", w, h)
        hits = []
        start = 0
        while True:
            i = d.find(pat, start)
            if i < 0: break
            hits.append(i)
            start = i + 1
        if hits:
            print(f"  dim {w}x{h}: {len(hits)} hits, first: {[f'{x:#x}' for x in hits[:10]]}")

# file_95 分区扫描
f95 = open(os.path.join(BASE, "file_95.bin"), "rb").read()
print(f"file_95 size: {len(f95)}")
# 统计哪些区域是文本（UTF-16LE: 偶数字节 0x00）
text_ratio = []
for base in range(0, len(f95), 0x10000):
    chunk = f95[base:base+0x10000]
    z = sum(1 for i in range(1, len(chunk), 2) if chunk[i] == 0)
    r = z / (len(chunk)//2)
    text_ratio.append((base, r))
print("text-ratio by 64KB block:", " ".join(f"{b//0x10000}:{r:.0%}" for b,r in text_ratio))

# file_95 后半扫描维度 + 03 0c 记录
scan(os.path.join(BASE, "file_95.bin"), "file_95 full")

# 候选小文件
for fn in ["file_24.bin","file_30.bin","file_34.bin","file_40.bin","file_42.bin","file_90.bin","file_93.bin","file_88.bin"]:
    p = os.path.join(BASE, fn)
    if os.path.exists(p):
        scan(p, fn)
