#!/usr/bin/env python3
"""B1: 在 arm9.bin.asm 搜索 0x5e/0x5f/94 相关与 0x27/0x40 记录处理模式"""
import re, os

p = "d:/studio/github/monkeycode/src/nds/Picross/_tmp_disasm_out/arm9.bin.asm"
with open(p, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

pats = {
    "#0x5e": r"#0x5e\b",
    "#0x5E": r"#0x5E\b",
    "#94": r"#94\b",
    "cmp r0, #0x5": r"cmp\s+r0,\s*#0x5\b",
    "#0x27": r"#0x27\b",
    "#0x40": r"#0x40\b",
    "#0x3c": r"#0x3c\b",
}
for name, pat in pats.items():
    hits = [i for i, ln in enumerate(lines) if re.search(pat, ln)]
    print(f"=== {name}: {len(hits)} hits ===")
    for i in hits[:10]:
        lo, hi = max(0, i-3), min(len(lines), i+4)
        for j in range(lo, hi):
            print(f"  {j}: {lines[j].rstrip()}")
        print("  ---")
