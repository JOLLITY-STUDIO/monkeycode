# -*- coding: utf-8 -*-
"""Probe 7b: 确认 0x34CF0 的 6 个调用点 mode 参数 + 0x20226B4 文件加载 + 0x204C680 解压"""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SRC = r"d:\studio\github\monkeycode\src\nds\picpic\tools\arm9-full.dis.txt"
OUT = r"d:\studio\github\monkeycode\src\nds\picpic\tools\_mode_report7.txt"
lines = open(SRC, encoding='utf-8', errors='replace').read().splitlines()
out = []

def find_addr(addr):
    # addr 如 0x020226B4
    s = '0x0%07X' % addr
    for i, l in enumerate(lines):
        if l.startswith(s + ' ') or l.startswith(s + '\t'):
            return i, l
    return None, None

# 1) 6 个调用点上下文
out.append('=== 1. 0x34CF0 六个调用点（前后 14 行，重点看 r0= mode）===')
for a in (0x02035DA4, 0x02035DD8, 0x02035DF4, 0x02036DD4, 0x02036E08, 0x02036E24):
    i, l = find_addr(a)
    if i is None:
        out.append(f'-- {a:08X} NOT FOUND --')
        continue
    out.append(f'--- around {a:08X} (line {i}) ---')
    for j in range(max(0, i-14), min(len(lines), i+4)):
        out.append(f'[{j}] {lines[j]}')

# 2) 0x20226B4 函数体
out.append('\n=== 2. 0x20226B4（文件加载?）===')
i, l = find_addr(0x020226B4)
if i:
    for j in range(i, min(len(lines), i+90)):
        out.append(f'[{j}] {lines[j]}')

# 3) 0x204C680 函数体
out.append('\n=== 3. 0x204C680（解码器）===')
i, l = find_addr(0x0204C680)
if i:
    for j in range(i, min(len(lines), i+120)):
        out.append(f'[{j}] {lines[j]}')

# 4) 0x205C5F4
out.append('\n=== 4. 0x205C5F4 ===')
i, l = find_addr(0x0205C5F4)
if i:
    for j in range(i, min(len(lines), i+60)):
        out.append(f'[{j}] {lines[j]}')

open(OUT, 'w', encoding='utf-8').write('\n'.join(out))
print(f'written {OUT}, {len(out)} lines')
