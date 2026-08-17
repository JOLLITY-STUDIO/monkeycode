#!/usr/bin/env python3
"""G4: BUG-008 定案 —— 记录区(90条)↔解法区(256块) 全量映射匹配

方法: 对每条解法计算 16 行+16 列提示（值>=3=填充），
      若全部 32 个提示均出现在某条记录的 hint lists 中 → 该记录为候选。
"""
import os

P94 = r"d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin"
REC_START = 0x0B2FD00
REC_STEP = 0x2000
REC_COUNT = 90
SOL_START = 0x10C0000
SOL_BLOCK = 256
SOL_COUNT = 256


def line_hints(vals, n):
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
    return tuple(out or [0])


def sol_hints(sol):
    rows, cols = [], []
    for r in range(16):
        rows.append(line_hints(sol[r * 16:(r + 1) * 16], 16))
    for c in range(16):
        col = [sol[r * 16 + c] for r in range(16)]
        cols.append(line_hints(col, 16))
    return rows + cols


def parse_rec_lists(rec):
    lists, cur = [], []
    for b in rec[0x34:0x1A34]:
        if 0x30 <= b <= 0x3F:
            cur.append(b - 0x30)
        else:
            if cur:
                lists.append(tuple(cur))
                cur = []
    if cur:
        lists.append(tuple(cur))
    return lists


data = open(P94, "rb").read()
print(f"file_94 size={len(data)}")

# 1) 提取 90 条记录 hint lists 集合
rec_sets = []
for j in range(REC_COUNT):
    rec = data[REC_START + j * REC_STEP: REC_START + (j + 1) * REC_STEP]
    if len(rec) < REC_STEP:
        break
    rec_sets.append(set(parse_rec_lists(rec)))
print(f"记录数: {len(rec_sets)}")

# 2) 每个解法匹配记录
match_counts = {}
no_match, multi = [], []
matched_one = []
for i in range(SOL_COUNT):
    sol = data[SOL_START + i * SOL_BLOCK: SOL_START + (i + 1) * SOL_BLOCK]
    if len(sol) < SOL_BLOCK:
        break
    hints = sol_hints(sol)
    cands = [j for j, s in enumerate(rec_sets) if all(h in s for h in hints)]
    if len(cands) == 1:
        matched_one.append((i, cands[0]))
    elif not cands:
        no_match.append(i)
    else:
        multi.append((i, cands))
    match_counts[len(cands)] = match_counts.get(len(cands), 0) + 1

print(f"匹配分布: {dict(sorted(match_counts.items()))}")
print(f"唯一匹配: {len(matched_one)}  无匹配: {len(no_match)}  多匹配: {len(multi)}")
if no_match:
    print(f"无匹配解法: {no_match[:20]}")
if multi:
    print(f"多匹配示例: {multi[:5]}")
if matched_one:
    print(f"唯一匹配示例: {matched_one[:10]}")
    # 映射覆盖
    from collections import Counter
    c = Counter(j for _, j in matched_one)
    print(f"被引用记录数: {len(c)} / {len(rec_sets)}  记录被引用最多: {c.most_common(5)}")
