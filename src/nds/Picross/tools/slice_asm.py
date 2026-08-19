#!/usr/bin/env python3
"""提取 arm9_decomp.asm 指定区间，便于阅读。用法: python tools/slice_asm.py 0x2011600 0x2013000"""
import sys, re

LO = int(sys.argv[1], 16) if len(sys.argv) > 1 else 0x2011600
HI = int(sys.argv[2], 16) if len(sys.argv) > 2 else 0x2013000

lines = open(r"_tmp_disasm_out/arm9_decomp.asm", encoding="utf-8").read().splitlines()
m_re = re.compile(r"^\s*0x([0-9a-f]+)\s")
for l in lines:
    m = m_re.match(l)
    if m and LO <= int(m.group(1), 16) < HI:
        print(l)
