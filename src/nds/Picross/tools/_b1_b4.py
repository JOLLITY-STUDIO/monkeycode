#!/usr/bin/env python3
"""B1: 分块扫描 0xb00000-0xc00000，标记各块类型"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

A, B = 0x0B00000, 0x0C00000
BS = 256  # 块大小

def classify(chunk):
    n = len(chunk)
    digits = sum(1 for b in chunk if 0x30 <= b <= 0x3f)  # 数字提示字符
    zeros = sum(1 for b in chunk if b == 0)
    sol = sum(1 for b in chunk if 2 <= b <= 9)  # 解法位图值
    img_pat = sum(1 for i in range(0, n - 3, 4) if chunk[i] == 0 and chunk[i+1] in (0x10, 0x70, 0x30, 0x60))
    if digits > n * 0.25:
        return "DIGIT"
    if sol > n * 0.75:
        return "SOL"
    if img_pat > n * 0.5:
        return "IMG"
    if zeros > n * 0.7:
        return "ZERO"
    return "OTHER"

last = None
runs = []
for off in range(A, B, BS):
    c = classify(data[off:off+BS])
    if c != last:
        runs.append([off, off + BS, c])
        last = c
    else:
        runs[-1][1] = off + BS

print("区域 0xb00000-0xc00000 类型分布:")
for s, e, c in runs:
    print(f"  {s:#x} - {e:#x}  len={e-s:7d}  {c}")
