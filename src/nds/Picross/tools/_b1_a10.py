#!/usr/bin/env python3
"""B1: 扫描 file_94 中维度 u16 对 (5,5)(10,10)(15,15)(20,15) 等分布，定位拼图记录区"""
import struct

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()
sz = len(d)

dims = [(5,5),(10,10),(15,15),(20,15),(15,10),(10,15),(5,10),(10,5),(16,16),(12,12)]
print(f"file_94 size: {sz} ({sz:#x})")
for w, h in dims:
    pat = struct.pack("<HH", w, h)
    hits = []
    start = 0
    while True:
        i = d.find(pat, start)
        if i < 0:
            break
        hits.append(i)
        start = i + 1
    if hits:
        # 聚类：相邻间隔 < 32 的算一组
        groups = []
        cur = [hits[0]]
        for i in hits[1:]:
            if i - cur[-1] < 64:
                cur.append(i)
            else:
                groups.append(cur)
                cur = [i]
        groups.append(cur)
        print(f"dim {w}x{h}: {len(hits)} hits, {len(groups)} clusters")
        for g in groups[:6]:
            print(f"   first={g[0]:#x} last={g[-1]:#x} n={len(g)}")
    else:
        print(f"dim {w}x{h}: 0 hits")
