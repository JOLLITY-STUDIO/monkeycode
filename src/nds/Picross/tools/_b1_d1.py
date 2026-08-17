#!/usr/bin/env python3
"""B1 收尾: 验证 记录i ↔ 解法块i 映射 —— 解法块提示是否出现在记录 hint lists 中"""
import os
BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
REC_START = 0x0B2FD00
REC_STEP = 0x2000
SOL_START = 0x10C0000
SOL_BLOCK = 256


def line_hints(vals, n):
    """从 16 个格值序列计算行提示（值>=3 为填充）"""
    out, run = [], 0
    for v in vals[:n]:
        if v >= 3:
            run += 1
        else:
            if run:
                out.append(run)
                run = 0
    if run:
        out.append(run)
    return out or [0]


def sol_hints(sol):
    rows, cols = [], []
    for r in range(16):
        rows.append(tuple(line_hints(sol[r*16:(r+1)*16], 16)))
    for c in range(16):
        col = [sol[r*16+c] for r in range(16)]
        cols.append(tuple(line_hints(col, 16)))
    return rows, cols


def parse_rec_lists(rec):
    lists, cur = [], []
    for b in rec[0x34:0x1A34]:
        if 0x30 <= b <= 0x3F:
            cur.append(b - 0x30)
        else:
            if cur:
                lists.append(cur)
                cur = []
    if cur:
        lists.append(cur)
    return lists


data = open(P94, "rb").read()
for i in range(4):
    sol = data[SOL_START + i*SOL_BLOCK: SOL_START + (i+1)*SOL_BLOCK]
    rows, cols = sol_hints(sol)
    need = [tuple(r) for r in rows] + [tuple(c) for c in cols]
    rec = data[REC_START + i*REC_STEP: REC_START + (i+1)*REC_STEP]
    lists = parse_rec_lists(rec)
    seq = [tuple(l) for l in lists]
    found = sum(1 for n in need if n in seq)
    print(f"sol{i}: need={len(need)} matched={found}  total_lists={len(seq)}")
    if found < len(need):
        print(f"  miss: {[n for n in need if n not in seq][:6]}")
        print(f"  first_lists: {seq[:10]}")
