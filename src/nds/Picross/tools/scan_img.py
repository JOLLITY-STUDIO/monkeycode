#!/usr/bin/env python3
"""扫描解压镜像：找 ASCII 字符串、统计字节分布、找可能的代码/数据分界。"""
import os, sys, re

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = open(os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin"), "rb").read()
IMG_BASE = 0x2011B27

def scan_strings(min_len=5):
    print("== ASCII strings ==")
    pat = re.compile(rb"[\x20-\x7e]{%d,}" % min_len)
    count = 0
    for m in pat.finditer(IMG):
        s = m.group().decode("ascii", "replace")
        va = IMG_BASE + m.start()
        if any(c.isalpha() for c in s):
            print(f"{va:#10x}  {s[:80]}")
            count += 1
            if count > 200:
                print("... (truncated)")
                break

def byte_profile():
    print("== byte frequency (top) ==")
    from collections import Counter
    c = Counter(IMG)
    for b, n in c.most_common(16):
        print(f"  {b:02x}: {n}")

if __name__ == "__main__":
    scan_strings()
    byte_profile()
