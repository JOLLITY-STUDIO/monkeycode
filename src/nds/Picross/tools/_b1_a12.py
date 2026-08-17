#!/usr/bin/env python3
"""B1: 扫描所有候选文件的维度标记与结构特征"""
import os, struct, re

BASE = "d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed"
cands = [95, 24, 30, 88, 90, 40, 42, 26, 34, 48, 50, 68, 84, 74]
pats = [(5,5),(10,10),(15,15),(20,15),(10,5),(5,10),(16,16)]

for fid in cands:
    p = os.path.join(BASE, f"file_{fid}.bin")
    if not os.path.exists(p):
        continue
    d = open(p, "rb").read()
    print(f"\n=== file_{fid} size={len(d)} ===")
    for w, h in pats:
        pat = struct.pack("<HH", w, h)
        hits = [m.start() for m in re.finditer(re.escape(pat), d)]
        if hits:
            # 聚类
            groups = []
            cur = [hits[0]]
            for i in hits[1:]:
                if i - cur[-1] < 64:
                    cur.append(i)
                else:
                    groups.append(cur); cur = [i]
            groups.append(cur)
            print(f"  dim {w}x{h}: {len(hits)} hits, {len(groups)} clusters, first: {[hex(g[0]) for g in groups[:5]]}")
