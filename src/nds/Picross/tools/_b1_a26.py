#!/usr/bin/env python3
"""B1: 搜索 ARM9 反汇编中教程/拼图加载相关模式"""
import re, os

p = "d:/studio/github/monkeycode/src/nds/Picross/_tmp_disasm_out/arm9.bin.asm"
with open(p, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

# file_94 size = 24845044 = 0x17B2FF4
pats = {
    "17b2ff4": r"17b2ff4",
    "0x17b2ff4": r"0x17b2ff4",
    "0x5e0000": r"0x5e0000",
    "232660": r"232660",
    "0x232660": r"0x232660",
    "232a20": r"232a20",
    "5x5": r"\b5x5\b",
    "#0x1f": r"#0x1f\b",
    "#0x50": r"#0x50\b",
}
for name, pat in pats.items():
    hits = [i for i, ln in enumerate(lines) if re.search(pat, ln, re.I)]
    print(f"=== {name}: {len(hits)} ===")
    for i in hits[:8]:
        for j in range(max(0, i-2), min(len(lines), i+3)):
            print(f"  {j}: {lines[j].rstrip()}")
        print("  ---")

# 搜索字符数组 'pzl' 'PZL' 'stg' 'STAGE' 等
for s in ["PZL", "pzl", "STAGE", "stage", "lesson", "Lesson", "tuto"]:
    hits = [i for i, ln in enumerate(lines) if s in ln]
    print(f"=== str {s}: {len(hits)} ===")
    for i in hits[:5]:
        print(f"  {i}: {lines[i].rstrip()}")
