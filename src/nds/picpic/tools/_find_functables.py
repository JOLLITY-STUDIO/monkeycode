# -*- coding: utf-8 -*-
"""
_find_functables.py — 扫描 ARM9 全部指向代码段的指针（函数指针表）
输出: tools/func-tables.txt
这些表是场景状态机的调度核心（间接调用）。
"""
import sys, os, struct
from pathlib import Path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']
SIZE = len(arm9)
OUT = Path(__file__).resolve().parent / 'func-tables.txt'

# 1. 扫描所有指向代码段的 u32 指针
ptrs = []  # (ptr_pos, value)
for off in range(0, SIZE - 3, 4):
    v = struct.unpack_from('<I', arm9, off)[0]
    if RAM + 0x800 <= v < RAM + SIZE:
        ptrs.append((off, v))

print('指向代码段的指针总数:', len(ptrs))

# 2. 聚合出"指针表"：连续 >= 3 个指针指向代码段
lines = []
lines.append('; Pic Pic ARM9 函数指针表 (addr: 值)')
tables = []
i = 0
while i < len(ptrs):
    j = i
    while j + 1 < len(ptrs) and ptrs[j + 1][0] == ptrs[j][0] + 4:
        j += 1
    run = ptrs[i:j + 1]
    if len(run) >= 3:
        tables.append(run)
        lines.append('')
        lines.append('; TABLE @ 0x%08X (rel 0x%X), %d 项' % (RAM + run[0][0], run[0][0], len(run)))
        for off, v in run:
            lines.append('  0x%08X -> 0x%08X' % (RAM + off, v))
    i = j + 1

OUT.write_text('\n'.join(lines), encoding='utf-8')
print('指针表数量(>=3项):', len(tables))
print('written', OUT)
