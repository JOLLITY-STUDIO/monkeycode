#!/usr/bin/env python3
"""B1: 全文件扫描解法位图区（值0与0x02-0x09混合，无0x30+值）"""
import os, traceback

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_c13.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

try:
    data = open(P94, "rb").read()
    N = len(data)
    BS = 256
    log(f"size={N}")

    # C级速度：translate 将整文件映射为类别(0/1/2/3)，再按块 count
    cat = bytes(
        0 if b == 0 else 1 if 2 <= b <= 9 else 2 if b >= 0x10 else 3
        for b in range(256)
    )
    catdata = data.translate(cat)

    n_blocks = N // BS
    results = []  # (off, v2_9, v0, vhigh)
    for i in range(n_blocks):
        off = i * BS
        blk = catdata[off:off+BS]
        v0 = blk.count(0)
        if v0 < 30:
            continue
        v2_9 = blk.count(1)
        if v2_9 < 30:
            continue
        vhigh = blk.count(2)
        if vhigh <= 5:
            results.append((off, v2_9, v0))

    log(f"解法候选块: {len(results)}")
    # 聚类
    groups = []
    for off, v2, v0 in results:
        if groups and off == groups[-1][-1][0] + BS:
            groups[-1].append((off, v2, v0))
        else:
            groups.append([(off, v2, v0)])
    log(f"连续组: {len(groups)}")
    for g in groups:
        s = g[0][0]
        e = g[-1][0] + BS
        log(f"  {s:#x}-{e:#x} ({len(g)}块) 首块v2-9={g[0][1]} v0={g[0][2]}")
    log("OK")
except Exception:
    log("EXCEPTION:")
    log(traceback.format_exc())

out.close()
print("done")
