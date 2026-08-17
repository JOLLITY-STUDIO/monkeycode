#!/usr/bin/env python3
"""B1: 搜索文件加载相关函数与 file id 使用"""
import re, os

p = "d:/studio/github/monkeycode/src/nds/Picross/_tmp_disasm_out/arm9.bin.asm"
with open(p, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

# 搜索关键字符串
str_pats = ["file", "File", "FAT", "open", "Open", "read", "Read"]
for name in str_pats:
    hits = [i for i, ln in enumerate(lines) if name in ln]
    print(f"=== {name}: {len(hits)} hits, first: {hits[:5]} ===")

# 看文件头格式
print("\n=== first 30 lines ===")
for i in range(min(30, len(lines))):
    print(lines[i].rstrip())

# 找函数定义行格式
print("\n=== lines with 'proc' or 'function' ===")
for i, ln in enumerate(lines[:500]):
    if re.search(r"\b(proc|function|sub_|loc_|arm_func|thumb_func)\b", ln, re.I):
        print(f"  {i}: {ln.rstrip()}")
