#!/usr/bin/env python3
"""B1: 在 arm9.bin.asm 中搜索 file_94 加载/教程相关代码"""
import re, os

p = "d:/studio/github/monkeycode/src/nds/Picross/_tmp_disasm_out/arm9.bin.asm"
print("size:", os.path.getsize(p))

with open(p, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()
print("lines:", len(lines))

# 1) 搜索 0x5e (94) 相关的 mov/ldr 立即数
pats = {
    "mov r.+#0x5e": r"\bmov\s+r\d+,\s*#0x5e\b",
    "mov r.+#0x5f": r"\bmov\s+r\d+,\s*#0x5f\b",
    "0x1924800": r"0x1924800",
    "1924800": r"1924800",
    "ada000": r"ada000",
    "0xada000": r"0xada000",
    "232000": r"232000",
    "0x232000": r"0x232000",
    "puzzle": r"puzzle|Puzzle|PICROSS|picross",
}
for name, pat in pats.items():
    hits = []
    for i, ln in enumerate(lines):
        if re.search(pat, ln, re.IGNORECASE):
            hits.append(i)
    print(f"\n=== {name}: {len(hits)} hits ===")
    for i in hits[:15]:
        lo = max(0, i - 2)
        hi = min(len(lines), i + 3)
        for j in range(lo, hi):
            print(f"  {j}: {lines[j].rstrip()}")
        print("  ---")
