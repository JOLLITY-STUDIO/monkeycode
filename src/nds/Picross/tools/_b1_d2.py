#!/usr/bin/env python3
"""B1: 反汇编中搜索 #0x30 / #0x39 立即数用法"""
import os, re

BASE = os.path.dirname(os.path.abspath(__file__))
ASM = os.path.join(BASE, "..", "_tmp_disasm_out", "arm9.bin.asm")
LOG = os.path.join(BASE, "_b1_d2.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

lines = open(ASM, "r", errors="replace").read().splitlines()

# 查找所有含 ", #0x30" 或 " #0x30" 且与 sub 相关的行
pats = [r"\bsub\w*\s+[^,]+,[^,]+,\s*#0x30\b", r"cmp\w*\s+[^,]+,\s*#0x39\b"]
for p in pats:
    rx = re.compile(p, re.I)
    hits = [i for i, ln in enumerate(lines) if rx.search(ln)]
    log(f"pattern {p}: {len(hits)} hits")
    for i in hits[:5]:
        log(f"  line{i}: {lines[i]}")

# 更宽：所有包含 sub 且包含 0x30 的行
log("\n== 所有含 'sub' 且含 '#0x30' 的行 ==")
cnt = 0
for i, ln in enumerate(lines):
    if "sub" in ln.lower() and "#0x30" in ln:
        log(f"  {i}: {ln}")
        cnt += 1
        if cnt > 30:
            break
log(f"count>={cnt}")

# 含 cmp 且含 #0x39
log("\n== 所有含 'cmp' 且含 '#0x39' 的行 ==")
cnt = 0
for i, ln in enumerate(lines):
    if "cmp" in ln.lower() and "#0x39" in ln:
        log(f"  {i}: {ln}")
        cnt += 1
        if cnt > 30:
            break
log(f"count>={cnt}")
out.close()
print("done")
