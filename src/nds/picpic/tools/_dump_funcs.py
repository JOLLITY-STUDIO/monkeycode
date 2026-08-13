# -*- coding: utf-8 -*-
"""从 arm9-full.dis.txt 提取指定函数/地址区间的反汇编到 _dump_funcs_out.txt"""
import os, re

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'arm9-full.dis.txt')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_dump_funcs_out.txt')

# 关注的函数地址（十六进制，不带 0x）
funcs = [
    '02055BC8', '02055D9C', '020527C0', '02054238', '02053E3C', '02051D20',
    '0205418C', '020558F0', '02053BD4', '02051BE8', '02051D5C', '02053BF4',
    '02054348', '02051B50', '02051B84', '02051B2C', '02053CB4', '02053E3C',
    '02054070', '02052A00', '02052A64', '02057BC8', '02027C0',
]

lines = open(SRC, encoding='utf-8', errors='replace').read().splitlines()
# 建立行号索引：每行以 "0x........" 开头
addr_line = {}
for i, ln in enumerate(lines):
    m = re.match(r'^0x([0-9A-Fa-f]{8})', ln)
    if m:
        addr_line[int(m.group(1), 16)] = i

out = []
for fs in funcs:
    fa = int(fs, 16)
    if fa not in addr_line:
        out.append('\n=== FUNC 0x%08X NOT FOUND ===' % fa)
        continue
    i = addr_line[fa]
    # 找函数头（可能前面有注释行）
    start = i
    while start > 0 and (lines[start-1].startswith(';') or lines[start-1].strip() == ''):
        start -= 1
    # 找函数尾：下一个地址不在本函数内且低于当前（或下一个注释块）
    end = i + 1
    while end < len(lines):
        m = re.match(r'^0x([0-9A-Fa-f]{8})', lines[end])
        if m:
            nxt = int(m.group(1), 16)
            if nxt < fa or nxt > fa + 0x1000:
                break
        if lines[end].startswith('; ===') and end > i:
            break
        end += 1
    out.append('\n\n' + '='*70)
    out.append('=== FUNC 0x%08X (lines %d..%d) ===' % (fa, start, end))
    out.append('='*70)
    out.extend(lines[start:min(end, start + 260)])

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))
