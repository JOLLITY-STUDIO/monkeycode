#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""在所有 bank asm 中查找 CPU 地址 (D 标记行), 定位数据表所在 bank"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
ASM_DIR = os.path.join(ROOT, '_tmp_bzk_out')
TARGETS = [0xA1DC, 0xA6AD, 0xAB66, 0xA292, 0xA42A]

for bank in range(32):
    path = os.path.join(ASM_DIR, 'bank_%02d.asm' % bank)
    with open(path, 'r', encoding='utf-8', errors='replace', newline='') as f:
        raw = f.read()
    lines = [l.replace('\n', ' ').strip() for l in raw.split('\r')]
    hits = {}
    for line in lines:
        m = re.match(r'^[CD\-] .* 0x[0-9A-F]{6} ([0-9A-F]{2}):([0-9A-F]{4}): (.*)$', line)
        if not m:
            continue
        a = int(m.group(2), 16)
        if a in TARGETS:
            hits[a] = line
    if hits:
        for a in sorted(hits):
            print('bank_%02d $%04X: %s' % (bank, a, hits[a][:110]))
