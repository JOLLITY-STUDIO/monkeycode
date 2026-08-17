#!/usr/bin/env python3
"""B1: 提取 ARM9 字符串，搜索拼图/picross 相关关键词"""
import re, os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
ARM9 = os.path.join(ROOT, "extracted", "arm9.bin")
d = open(ARM9, "rb").read()
print(f"arm9 size: {len(d)}")

# 提取 ASCII 字符串 (>=5)
strs = []
cur = bytearray()
cur_off = 0
for i, b in enumerate(d):
    if 0x20 <= b < 0x7f:
        if not cur:
            cur_off = i
        cur.append(b)
    else:
        if len(cur) >= 5:
            strs.append((cur_off, bytes(cur).decode("ascii")))
        cur = bytearray()
if len(cur) >= 5:
    strs.append((cur_off, bytes(cur).decode("ascii")))
print(f"total strings: {len(strs)}")

# 关键词搜索
kw = re.compile(r"(pzl|picross|tuto|lesson|stage|puzz|stg|pzl[0-9]|eve|dun|wario|mario|mypic|draw|ques)", re.I)
hits = [(o, s) for o, s in strs if kw.search(s)]
print(f"\n=== 关键词命中: {len(hits)} ===")
for o, s in hits[:80]:
    print(f"  {o:08x}: {s!r}")
