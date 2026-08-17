#!/usr/bin/env python3
"""B3: 递归查找 messageList 文件"""
import os
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted")
for root, dirs, names in os.walk(EX):
    for n in sorted(names):
        if "message" in n.lower():
            p = os.path.join(root, n)
            print(f"{os.path.getsize(p):>10}  {os.path.relpath(p, os.path.join(BASE,'..'))}")
