#!/usr/bin/env python3
"""B3: 扫描所有小文件识别 UTF-16LE 文本 / ASCII 文本 / 头部"""
import os
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted", "unnamed")
for n in sorted(os.listdir(EX)):
    if not n.endswith(".bin"):
        continue
    p = os.path.join(EX, n)
    data = open(p, "rb").read()
    # UTF-16LE: 偶数字节位置 ASCII 密集
    ascii_even = sum(1 for i in range(0, len(data)-1, 2) if 0x20 <= data[i] < 0x7F)
    ascii_odd = sum(1 for i in range(1, len(data)-1, 2) if 0x20 <= data[i] < 0x7F)
    ascii_all = sum(1 for b in data if 0x20 <= b < 0x7F)
    score = "U16" if ascii_even > 20 and ascii_even > ascii_odd * 3 else ("ASC" if ascii_all > len(data)*0.6 else "-")
    head = data[:8].hex()
    print(f"{n:>12} {len(data):>9}  {score}  even={ascii_even} odd={ascii_odd}  head={head}")
