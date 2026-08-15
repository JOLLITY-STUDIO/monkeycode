#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""在指定 bank asm 中查找 CPU 地址 addr 的原始字节 (D 标记数据)"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ASM_DIR = os.path.join(ROOT, '_tmp_bzk_out')


def find_data(bank, addr, count):
    path = os.path.join(ASM_DIR, 'bank_%02d.asm' % bank)
    with open(path, 'r', encoding='utf-8', errors='replace', newline='') as f:
        raw = f.read()
    lines = [l.replace('\n', ' ').strip() for l in raw.split('\r')]
    # 收集所有行 (含 C/D/- 标记), 建立 addr -> bytes 映射
    for i, line in enumerate(lines):
        m = re.match(r'^[CD\-] .* 0x[0-9A-F]{6} ([0-9A-F]{2}):([0-9A-F]{4}): (.*)$', line)
        if not m:
            continue
        a = int(m.group(2), 16)
        if a != addr:
            continue
        rest = m.group(3)
        byts = []
        for tok in re.split(r'\s+', rest.strip()):
            if re.fullmatch(r'[0-9A-F]{2}', tok):
                byts.append(int(tok, 16))
            else:
                break
        # 从 addr 开始连读 count 字节 (跨行)
        out = list(byts)
        cur = a + len(byts)
        while len(out) < count and cur <= addr + 0x2000:
            found = None
            for l2 in lines:
                m2 = re.match(r'^[CD\-] .* 0x[0-9A-F]{6} ([0-9A-F]{2}):([0-9A-F]{4}): (.*)$', l2)
                if m2 and int(m2.group(2), 16) == cur:
                    found = l2
                    break
            if found is None:
                break
            rest2 = re.match(r'^[CD\-] .* 0x[0-9A-F]{6} [0-9A-F]{2}:[0-9A-F]{4}: (.*)$', found).group(1)
            for tok in re.split(r'\s+', rest2.strip()):
                if re.fullmatch(r'[0-9A-F]{2}', tok):
                    out.append(int(tok, 16))
                else:
                    break
            cur += len([t for t in re.split(r'\s+', rest2.strip())
                        if re.fullmatch(r'[0-9A-F]{2}', t)])
        print('bank_%02d $%04X (%d bytes): %s' % (bank, addr, len(out),
              ' '.join('%02X' % b for b in out[:count])))
        return


if __name__ == '__main__':
    bank = int(sys.argv[1])
    for a in [int(x, 16) for x in sys.argv[2:]]:
        find_data(bank, a, 48)
