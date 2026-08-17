#!/usr/bin/env python3
"""B1: 全文件定位 0x2000 提示记录块 + 检查记录尾部结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

N = len(data)
recs = []
# 扫描所有 0x2000 对齐位置
for off in range(0, N - 0x2000, 0x2000):
    blk = data[off:off+0x2000]
    # 头部 0x34 全零
    if not all(b == 0 for b in blk[:0x34]):
        continue
    # 0x34 处开始是数字
    if not (0x30 <= blk[0x34] <= 0x39):
        continue
    # 数字占比检查（提示区特征）
    digit = sum(1 for b in blk[0x34:0x1A00] if 0x30 <= b <= 0x39)
    if digit < 500:
        continue
    recs.append(off)

print(f"找到 {len(recs)} 条提示记录块:")
# 分组连续
groups = []
for off in recs:
    if groups and off == groups[-1][-1] + 0x2000:
        groups[-1].append(off)
    else:
        groups.append([off])
for g in groups:
    print(f"  {g[0]:#x}-{g[-1]:#x}: {len(g)} 条")

# 对每组第一条记录分析结构
print("\n=== 每组首条记录结构分析 ===")
for g in groups:
    off = g[0]
    seg = data[off:off+0x2000]
    # 最后非零
    last = 0
    for i in range(len(seg)-1, -1, -1):
        if seg[i] != 0:
            last = i
            break
    # 提示数字串段数（00 分隔）
    i = 0x34
    segs = 0
    cur = 0
    while i < 0x2000:
        b = seg[i]
        if 0x30 <= b <= 0x39:
            cur += 1
        else:
            if cur > 0:
                segs += 1
                cur = 0
            if b != 0:
                break  # 遇到非零非数字即停止（提示区结束）
        i += 1
    print(f"  {off:#x}: 最后非零=rel {last:#x}, 数字段={segs}")
