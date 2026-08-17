#!/usr/bin/env python3
"""B1: 全面扫描所有候选文件，寻找拼图记录库"""
import struct, os

BASE = "d:/studio/github/monkeycode/src/nds/Picross/extracted"
ROOT = "d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed"

def stats(path):
    d = open(path, "rb").read()
    n = len(d)
    # 小数字比例 (u16 1..15)
    small = sum(1 for i in range(0, n-1, 2) if 1 <= struct.unpack_from("<H", d, i)[0] <= 15)
    return n, small/(n//2) if n >= 2 else 0

# 检查 default_data pmd
for fn in ["default_data_00.pmd","default_data_01.pmd","default_data_02.pmd","default_data_03.pmd"]:
    for base in ["backup", "PackData"]:
        p = os.path.join(BASE, base, fn)
        if os.path.exists(p):
            n, s = stats(p)
            print(f"{base}/{fn}: size={n} small%={s:.0%}")
            # dump 头
            d = open(p, "rb").read()
            print("  head:", d[:64].hex(" "))
            break

print()
# 所有 unnamed 文件按大小排序，检查小数字比例
files = []
for fn in os.listdir(ROOT):
    if not fn.endswith(".bin"): continue
    p = os.path.join(ROOT, fn)
    n, s = stats(p)
    files.append((n, s, fn))
files.sort(reverse=True)
print("unnamed files (size, small%, name):")
for n, s, fn in files[:25]:
    print(f"  {n:>10} {s:5.0%}  {fn}")
