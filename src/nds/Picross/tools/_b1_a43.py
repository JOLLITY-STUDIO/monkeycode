#!/usr/bin/env python3
"""B1: 分析 17x'2' 运行位置间距 + 0x10c0000 解法位图结构"""
import os
from collections import Counter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

print("=== A) ASCII 区 17x'2' 运行位置 ===")
A, B = 0x0B30000, 0x0BE0000
chunk = data[A:B]
run = b'2' * 17
pos = []
i = 0
while True:
    i = chunk.find(run, i)
    if i < 0:
        break
    pos.append(i)
    i += 1

print(f"17x'2' 出现次数: {len(pos)}")
if pos:
    # 检查间距
    gaps = [pos[k+1] - pos[k] for k in range(min(len(pos)-1, 40))]
    print(f"前 40 个间距: {gaps}")
    # 间距直方图(全部)
    gapc = Counter(pos[k+1] - pos[k] for k in range(len(pos)-1))
    print(f"间距种类: {sorted(gapc.items())[:10]}")
    print(f"前 30 个位置(相对区首): {pos[:30]}")

print()
print("=== B) 0x10c0000 解法位图区结构 ===")
C, D = 0x10C0000, 0x10D0000
sol = data[C:D]
print(f"区域大小: 0x{D-C:X} = {D-C} 字节")
# 检查 16x16=256B 还是 64B(2bit/cell) 分块
for bs, name in [(256, "256B=16x16x1B"), (128, "128B=16x16x4bit"), (64, "64B=16x16x2bit")]:
    n = len(sol) // bs
    print(f"  {name}: {n} 块, 余 {len(sol) % bs} 字节")
# 前 64 字节
print(f"\n前 64 字节: {sol[:64].hex(' ')}")
print(f"前 256 字节值集: {sorted(set(sol[:256]))}")
