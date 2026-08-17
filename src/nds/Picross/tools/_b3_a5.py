#!/usr/bin/env python3
"""B3: 列出 unnamed 目录文件"""
import os
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted", "unnamed")
for n in sorted(os.listdir(EX)):
    p = os.path.join(EX, n)
    print(f"{os.path.getsize(p):>10}  {n}")
