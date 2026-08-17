#!/usr/bin/env python3
"""B1: 提取 3 处关键指令上下文"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ASM = os.path.join(BASE, "..", "_tmp_disasm_out", "arm9.bin.asm")
LOG = os.path.join(BASE, "_b1_d3.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

lines = open(ASM, "r", errors="replace").read().splitlines()
targets = {0x200a27c, 0x203cab0, 0x202c784}
addr_lines = {}
for i, ln in enumerate(lines):
    m = ln.split()
    if m and len(m) > 1 and m[0].startswith("0x"):
        try:
            a = int(m[0], 16)
        except ValueError:
            continue
        if a in targets:
            addr_lines[a] = i

for a in sorted(targets):
    i = addr_lines.get(a)
    if i is None:
        log(f"=== {a:#x} 未找到 ===")
        continue
    log(f"===== {a:#x} (line {i}) =====")
    for j in range(max(0, i-60), min(len(lines), i+60)):
        log(f"  {j}: {lines[j]}")
    log("")
out.close()
print("done")
