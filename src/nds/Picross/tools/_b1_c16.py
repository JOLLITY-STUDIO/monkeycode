#!/usr/bin/env python3
"""B1: dump 0x10c0000 区域块0-12 渲染 + 0xb2fd00 记录尾部 hex"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_c16.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()

# --- 0x10c0000 区域块渲染 ---
def render(off, label, w=16):
    blk = data[off:off+256]
    log(f"== {label} @ {off:#x} vals={sorted(set(blk))}")
    for y in range(w):
        row = ""
        for x in range(w):
            b = blk[y*w+x]
            if b == 0:
                row += "."
            else:
                row += chr(0x30 + (b % 36))
        log("  " + row)

for i in range(12):
    render(0x10c0000 + i*256, f"0x10c0000 blk{i}")

# --- 0xb2fd00 记录尾部 hex ---
log("")
log("== 0xb2fd00 记录尾部 0x19c0-0x2000 hex ==")
for off in range(0xb2fd00 + 0x19c0, 0xb2fd00 + 0x2000, 0x20):
    chunk = data[off:off+0x20]
    hexs = " ".join(f"{b:02X}" for b in chunk)
    asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
    log(f"  {off:#08x}: {hexs}  |{asci}|")

out.close()
print("done")
