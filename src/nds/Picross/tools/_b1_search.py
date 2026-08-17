#!/usr/bin/env python3
"""B1 分析：在 ARM9 反汇编中定位拼图数据解析代码"""
import re, sys

lines = open("_tmp_disasm_out/arm9.bin.asm", "r", errors="replace").read().splitlines()
print("total lines:", len(lines))

# 1) file_94 大小 24845044 = 0x17B1E34；file_95 1100768 = 0x10CCE0
for name, val in [("file_94=0x17B1E34", 0x17B1E34), ("file_95=0x10CCE0", 0x10CCE0), ("24.8MB", 0x17B0000)]:
    hits = [l for l in lines if (f"#{val:#x}" in l or f"#{val}" in l)]
    print(f"--- {name}: {len(hits)} hits")
    for l in hits[:6]:
        print("   ", l[:130])

# 2) 搜索 movw/movt 组合接近 0x17Bxxxx
print("--- movw/movt near 0x17B:")
cnt = 0
for l in lines:
    if re.search(r"movw\s+\w+,\s*#0x17b", l, re.I) or re.search(r"movt\s+\w+,\s*#0x17b", l, re.I):
        print("   ", l[:130])
        cnt += 1
        if cnt > 8:
            break

# 3) 搜索 0x3C 或 60 相关：记录头大小
print("--- '0x3c' immediate hits (top 20):")
cnt = 0
for l in lines:
    if re.search(r"#0x3[cC]\b", l):
        print("   ", l[:130])
        cnt += 1
        if cnt > 20:
            break

# 4) 搜索 0x5e 作为文件 ID（纯 movw #0x5e）
print("--- movw rX, #0x5e:")
cnt = 0
for l in lines:
    if re.search(r"movw\s+r\d+,\s*#0x5[eE]", l):
        print("   ", l[:130])
        cnt += 1
        if cnt > 10:
            break
