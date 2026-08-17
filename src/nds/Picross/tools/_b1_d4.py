#!/usr/bin/env python3
"""B1: 完整dump提示记录0的段序列，分析行/列边界与颜色结构"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
LOG = os.path.join(BASE, "_b1_d4.log")

out = open(LOG, "w")
def log(msg=""):
    out.write(msg + "\n")
    out.flush()

data = open(P94, "rb").read()

for rec in (0, 1):
    base = 0xb2fd00 + rec * 0x2000
    recdata = data[base:base+0x2000]
    log(f"===== 记录{rec} @ {base:#x} =====")
    # 段解析：00 分隔，非00字节为 ASCII 数字
    segs = []
    cur = bytearray()
    for i, b in enumerate(recdata):
        if b == 0:
            if cur:
                segs.append(bytes(cur))
                cur = bytearray()
        else:
            cur.append(b)
    if cur:
        segs.append(bytes(cur))
    log(f"段数: {len(segs)}")
    # 打印每段: 索引 + ASCII + 值
    for idx, s in enumerate(segs):
        vals = "".join(chr(b) for b in s)
        log(f"  [{idx:3d}] {vals}")
    log("")

out.close()
print("done")
