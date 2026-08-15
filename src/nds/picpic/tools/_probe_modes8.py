# -*- coding: utf-8 -*-
"""Probe 8: 0x203772C(关卡索引→puzzle), 0x204D18C(mode 1/2 gate), 0x2055D9C(完成检查), 0x31884所在函数"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SRC = r"d:\studio\github\monkeycode\src\nds\picpic\tools\arm9-full.dis.txt"
OUT = r"d:\studio\github\monkeycode\src\nds\picpic\tools\_mode_report8.txt"
lines = open(SRC, encoding='utf-8', errors='replace').read().splitlines()
out = []

def find_addr(addr):
    s = '0x0%07X' % addr
    for i, l in enumerate(lines):
        if l.startswith(s + ' ') or l.startswith(s + '\t'):
            return i, l
    return None, None

for addr, name, n in (
    (0x0203772C, '0x203772C (选关索引→puzzle#)', 90),
    (0x0204D18C, '0x204D18C (mode1/2 门槛检查)', 70),
    (0x02055D9C, '0x2055D9C (完成检查)', 130),
):
    out.append(f'=== {name} ===')
    i, l = find_addr(addr)
    if i is None:
        out.append('NOT FOUND')
        continue
    for j in range(i, min(len(lines), i + n)):
        out.append(f'[{j}] {lines[j]}')

# 0x31884 所在函数的开头: 找 0x3172C 与 0x34BAC 之间的 FUNC 声明
out.append('\n=== 0x3172C 附近 FUNC 声明 ===')
for j in range(37030, 37040):
    out.append(f'[{j}] {lines[j]}')

open(OUT, 'w', encoding='utf-8').write('\n'.join(out))
print(f'written {OUT}, {len(out)} lines')
