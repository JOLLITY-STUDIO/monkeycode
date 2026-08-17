#!/usr/bin/env python3
"""B1: 定位 file_94 各数据区域边界 + 结构确认"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()
print(f"file_94 size: {len(data)} ({len(data)/1024/1024:.1f} MB)")

def is_sol_byte(b):
    """解法位图: 值 2-9"""
    return 2 <= b <= 9

def is_ascii_digit(b):
    """提示: '0'-'9' ':' '<' '>' '=' ';' 等"""
    return 0x30 <= b <= 0x3f or 0x3a <= b <= 0x3e

# 1. 扫描解法位图区（连续长段，每16B至少13个值2-9）
print("\n=== 解法位图区（值2-9密集段）===")
runs = []
i = 0
n = len(data)
while i < n:
    if is_sol_byte(data[i]):
        j = i
        while j < n and is_sol_byte(data[j]):
            j += 1
        if j - i >= 1024:
            runs.append((i, j))
        i = j
    else:
        i += 1
# 合并相邻
merged = []
for s, e in runs:
    if merged and s - merged[-1][1] < 16:
        merged[-1] = (merged[-1][0], e)
    else:
        merged.append((s, e))
print(f"找到 {len(merged)} 个密集段:")
for s, e in merged[:30]:
    print(f"  {s:#x} - {e:#x}  len={e-s} ({e-s} 字节)")

# 2. 扫描 ASCII 数字区
print("\n=== ASCII 数字区（'0'-'?' 密集段）===")
runs2 = []
i = 0
while i < n:
    if is_ascii_digit(data[i]) or data[i] == 0:
        j = i
        while j < n and (is_ascii_digit(data[j]) or data[j] == 0):
            j += 1
        if j - i >= 512:
            runs2.append((i, j))
        i = j
    else:
        i += 1
merged2 = []
for s, e in runs2:
    if merged2 and s - merged2[-1][1] < 16:
        merged2[-1] = (merged2[-1][0], e)
    else:
        merged2.append((s, e))
print(f"找到 {len(merged2)} 个密集段:")
for s, e in merged2[:30]:
    print(f"  {s:#x} - {e:#x}  len={e-s}")

# 3. 确认 0x10c0000 解法区大小（统计值2-9比例）
print("\n=== 0x10c0000 起 1MB 值分布 ===")
c = Counter(data[0x10C0000:0x10C0000+0x100000])
print(f"  值集: {sorted(c.items())[:20]}")

# 4. ASCII 区字符集
print("\n=== 0xb30000-0xbe0000 字符集 ===")
c2 = Counter(data[0x0B30000:0x0BE0000])
print(f"  {sorted(c2.items())}")
