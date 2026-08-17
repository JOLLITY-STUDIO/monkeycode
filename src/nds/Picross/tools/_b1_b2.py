#!/usr/bin/env python3
"""B1: 定位 ASCII 数字/字母字符在 0xb30000-0xbe0000 的分布区间"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

A, B = 0x0B30000, 0x0BE0000
chunk = data[A:B]

def runs_of(pred):
    runs = []
    i = 0
    n = len(chunk)
    while i < n:
        if pred(chunk[i]):
            j = i
            while j < n and pred(chunk[j]):
                j += 1
            runs.append((i, j))
            i = j
        else:
            i += 1
    return runs

# 数字字符 0x30-0x3f
digits = runs_of(lambda b: 0x30 <= b <= 0x3f)
# 字母 0x41-0x5a
letters = runs_of(lambda b: 0x41 <= b <= 0x5a)
# 两者都在的混合区: 数字或字母连续段
both = runs_of(lambda b: (0x30 <= b <= 0x3f) or (0x41 <= b <= 0x5a))

def summarize(runs, name, limit=40):
    print(f"\n=== {name}: {len(runs)} 段 ===")
    for s, e in runs[:limit]:
        print(f"  {s:#08x} - {e:#08x}  len={e-s}")

summarize(digits, "数字字符段", 30)
summarize(letters, "字母字符段", 30)

# 混合区总覆盖
print(f"\n混合区总长度: {sum(e-s for s,e in both)} / {len(chunk)}")

# 检查大段字母区的样例
print("\n=== 字母区样例（前3段各 64B）===")
cnt = 0
for s, e in letters:
    if e - s > 200:
        for off in range(s, min(s+64, e)):
            b = chunk[off]
            print(chr(b) if 0x20 <= b < 0x7f else '.', end='')
        print(f"   @{A+s:#x}")
        cnt += 1
        if cnt >= 5:
            break
