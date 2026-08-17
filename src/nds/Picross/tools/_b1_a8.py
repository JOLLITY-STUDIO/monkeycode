#!/usr/bin/env python3
"""B1: 在 ARM9 反汇编中搜索拼图记录解析代码特征"""
import re

lines = open("d:/studio/github/monkeycode/src/nds/Picross/_tmp_disasm_out/arm9.bin.asm", "r", errors="replace").read().splitlines()
print("total lines:", len(lines))

# 候选常量：27(0x1B), 62, 0x1C03/0x0C03(3075), 26(0x1A), 64
pats = {
    "0x1b (27)": re.compile(r"#0x1b\b|#0x1B\b|#27\b"),
    "0x1a (26)": re.compile(r"#0x1a\b|#0x1A\b|#26\b"),
    "0xc03": re.compile(r"#0x0?c03\b|#0x0?C03\b|#3075\b"),
    "0x30c": re.compile(r"#0x30c\b|#0x30C\b|#780\b"),
}
for name, pat in pats.items():
    hits = [l for l in lines if pat.search(l)]
    print(f"\n--- {name}: {len(hits)} hits")
    for l in hits[:15]:
        print("   ", l[:130])

# 搜索 movw/movt 立即数载入附近带 ldr/str 的“读 u16 循环”
print("\n=== movw #0x3c / #0x5f (记录大小相关) ===")
for pat_name, pat in {"0x3c": re.compile(r"#0x3c\b|#0x3C\b|#60\b"), "0x5f": re.compile(r"#0x5f\b|#0x5F\b|#95\b")}.items():
    hits = [l for l in lines if pat.search(l)]
    print(f"  {pat_name}: {len(hits)} hits")
    for l in hits[:8]:
        print("   ", l[:130])
