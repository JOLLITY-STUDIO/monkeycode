#!/usr/bin/env python3
"""B1: 搜索提示记录偏移的索引表（u32 LE 0x00B2FD00 等）"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_d8.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()

# 目标偏移集合
targets = {0xb2fd00, 0xb31d00, 0xb4fd00, 0xb5fd00, 0xb6fd00, 0xbe3d00}
pats = {t: int(t).to_bytes(4, "little") for t in targets}

hits = {}
for t, pat in pats.items():
    start = 0
    found = []
    while True:
        i = data.find(pat, start)
        if i < 0:
            break
        found.append(i)
        start = i + 1
    hits[t] = found
    log(f"offset {t:#x}: {len(found)} hits -> {[hex(x) for x in found[:12]]}")

# 分析是否构成连续表（8字节步进的表）
# 取第一个命中 0xb2fd00 的位置，检查其前后 u32 是否也是递增偏移
for loc in hits[0xb2fd00][:3]:
    log(f"\n== 表候选 @ {loc:#x} 上下文 u32 ==")
    for i in range(loc-0x40, loc+0x80, 4):
        v = int.from_bytes(data[i:i+4], "little")
        log(f"  {i:#x}: {v:#010x}")
    log("")

out.close()
print("done")
