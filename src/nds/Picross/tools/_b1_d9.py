#!/usr/bin/env python3
"""B1: 分析 file_95.bin 结构（疑似拼图索引/解法）"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
F95 = os.path.join(ROOT, "extracted", "unnamed", "file_95.bin")
LOG = os.path.join(BASE, "_b1_d9.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(F95, "rb").read()
N = len(data)
log(f"file_95 size={N:#x} ({N})")

# 前 512 字节 hex
log("== 前 0x200 ==")
for off in range(0, 0x200, 0x20):
    chunk = data[off:off+0x20]
    hexs = " ".join(f"{b:02X}" for b in chunk)
    asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
    log(f"  {off:#06x}: {hexs}  |{asci}|")

# 统计整个文件的值分布（字节直方图）
from collections import Counter
cnt = Counter(data)
log("\n== 值分布 top20 ==")
for v, c in cnt.most_common(20):
    log(f"  0x{v:02x}: {c}")

out.close()
print("done")
