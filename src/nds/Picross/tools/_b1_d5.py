#!/usr/bin/env python3
"""B1: dump 0x232600 教程区结构"""
import os, struct

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_d5.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()

# 教程区候选：0x232600-0x232b00 (5块) 与 0x232A00 附近结构
for start, end, name in [(0x231800, 0x234000, "0x232600区域"),
                          (0x232a00 - 0x200, 0x232a00 + 0x400, "0x232A00附近")]:
    log(f"===== {name} {start:#x}-{end:#x} =====")
    for off in range(start, end, 0x20):
        chunk = data[off:off+0x20]
        hexs = " ".join(f"{b:02X}" for b in chunk)
        asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
        log(f"  {off:#08x}: {hexs}  |{asci}|")
    log("")

out.close()
print("done")
