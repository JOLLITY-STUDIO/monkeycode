#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""提取指定 bank 的 code 段完整指令流 (含 RAM 键名), 供翻译参考"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ASM_DIR = os.path.join(ROOT, '_tmp_bzk_out')


def dump(bank, start=None, end=None):
    path = os.path.join(ASM_DIR, 'bank_%02d.asm' % bank)
    with open(path, 'r', encoding='utf-8', errors='replace', newline='') as f:
        raw = f.read()
    lines = [l.replace('\n', ' ').strip() for l in raw.split('\r')]
    out = []
    for line in lines:
        if not line.startswith('C - - - - - '):
            continue
        m = re.match(r'^C - - - - - 0x([0-9A-F]{6}) ([0-9A-F]{2}):([0-9A-F]{4}): (.*)$', line)
        if not m:
            continue
        addr = int(m.group(3), 16)
        if start is not None and addr < start:
            continue
        if end is not None and addr > end:
            continue
        rest = m.group(4)
        parts = re.split(r'\s{2,}', rest)
        if len(parts) >= 2:
            mne = parts[1].strip()
            mp = mne.split(None, 1)
            op = mp[0]
            operand = mp[1] if len(mp) > 1 else ''
        else:
            op = parts[0].strip() if parts[0] else ''
            operand = ''
        if op == 'UNDEFINED':
            continue
        out.append('%04X: %-8s %s' % (addr, op, operand))
    return out


if __name__ == '__main__':
    bank = int(sys.argv[1])
    start = int(sys.argv[2], 16) if len(sys.argv) > 2 else None
    end = int(sys.argv[3], 16) if len(sys.argv) > 3 else None
    for l in dump(bank, start, end):
        print(l)
