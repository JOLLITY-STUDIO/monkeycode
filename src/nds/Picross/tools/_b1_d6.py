#!/usr/bin/env python3
"""B1: 精确定位记录0的数据区边界与结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_d6.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()
base = 0xb2fd00
rec = data[base:base+0x2000]

# 最后非零字节
last_nz = 0
for i in range(len(rec)-1, -1, -1):
    if rec[i] != 0:
        last_nz = i
        break
log(f"记录0 最后非零字节偏移: {last_nz:#x} ({last_nz})")
log(f"头部零长度: {next(i for i,b in enumerate(rec) if b != 0):#x}")

# 找 0x20-0x7F 字符（非0x30-0x39数字）的位置
log("\n== 非ASCII数字但可打印的字节（0x20-0x2F, 0x3A-0x7F）==")
prev = -10
cnt = 0
for i, b in enumerate(rec):
    if (0x20 <= b <= 0x2f) or (0x3a <= b <= 0x7f):
        if i - prev > 1:
            log(f"  新段 @ {i:#x}")
            cnt += 1
        prev = i
log(f"段数: {cnt}")

# 详细 dump 0x1A00-0x1D00
log("\n== 0x1A00-0x1D00 hex ==")
for off in range(0x1A00, 0x1D00, 0x20):
    chunk = rec[off:off+0x20]
    hexs = " ".join(f"{b:02X}" for b in chunk)
    asci = "".join(chr(b) if 0x20 <= b < 0x7f else "." for b in chunk)
    log(f"  {off:#06x}: {hexs}  |{asci}|")

out.close()
print("done")
