#!/usr/bin/env python3
"""B1: 全文件扫描 DIGIT 区，统计记录总数与分布"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

def classify(blk):
    """256B 块分类"""
    digit = sum(1 for b in blk if 0x30 <= b <= 0x39)
    zero = sum(1 for b in blk if b == 0)
    sol = sum(1 for b in blk if 2 <= b <= 9)
    if digit > 200:
        return "DIGIT"
    if zero > 240:
        return "ZERO"
    if sol > 200:
        return "SOL"
    return "OTHER"

BS = 256
runs = []  # (start, end, type)
cur_start, cur_type = None, None
for off in range(0, len(data) - BS, BS):
    t = classify(data[off:off+BS])
    if t != cur_type:
        if cur_type is not None:
            runs.append((cur_start, off, cur_type))
        cur_start, cur_type = off, t
if cur_type is not None:
    runs.append((cur_start, len(data), cur_type))

# 汇总 DIGIT 运行段
digit_runs = [r for r in runs if r[2] == "DIGIT"]
print(f"DIGIT 运行段: {len(digit_runs)}")
tot_digit = 0
for s, e, t in digit_runs:
    n = (e - s) // BS
    tot_digit += e - s
    print(f"  {s:#x}-{e:#x}: {e-s} 字节 ({n} 块)")

print(f"\nDIGIT 总量: {tot_digit} 字节 = {tot_digit//0x2000} 条记录(0x2000)")
print(f"文件大小: {len(data)}")

# 每条记录内检查是否以 0x34 全零开头（提示区偏移）
# 对每个 DIGIT 运行段，按 0x2000 对齐扫描
print("\n=== DIGIT 运行段内 0x2000 对齐检查 ===")
for s, e, t in digit_runs:
    # 从 s 向后找对齐点
    off = s
    # 向上对齐 0x2000
    aligned = (off // 0x2000) * 0x2000
    if aligned < off:
        aligned += 0x2000
    n = 0
    while aligned + 0x2000 <= e + 0x2000:
        blk = data[aligned:aligned+0x2000]
        # 头部 0x34 全零？
        hdr_zero = all(b == 0 for b in blk[:0x34])
        first_digit = blk[0x34] if 0x30 <= blk[0x34] <= 0x39 else -1
        if hdr_zero and 0x30 <= first_digit <= 0x39:
            n += 1
        aligned += 0x2000
    print(f"  {s:#x}-{e:#x}: 满足[0x34全零+数字开头]的记录数 = {n}")
