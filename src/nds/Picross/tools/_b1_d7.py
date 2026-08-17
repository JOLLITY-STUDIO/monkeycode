#!/usr/bin/env python3
"""B1: dump 记录0 尾部 0x1800-0x1B40 精确结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_d7.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()
base = 0xb2fd00
rec = data[base:base+0x2000]

for off in range(0x1800, 0x1B40, 0x10):
    chunk = rec[off:off+0x10]
    hexs = " ".join(f"{b:02X}" for b in chunk)
    asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
    log(f"  {off:#06x}: {hexs}  |{asci}|")

# 缩略图 0x1A34-0x1B34 渲染为 16x16
log("\n== 0x1A34-0x1B34 渲染 (值=byte-0x20) ==")
thumb = rec[0x1A34:0x1B34]
for y in range(16):
    row = ""
    for x in range(16):
        v = thumb[y*16+x] - 0x20
        row += "." if v <= 0 else chr(0x30 + min(v, 36))
    log("  " + row)

out.close()
print("done")
