# -*- coding: utf-8 -*-
"""扫描 ARM9 中的可打印字符串，定位场景/数据加载逻辑"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']

# 扫描 ASCII 字符串
strings = []
cur = None
for i, b in enumerate(arm9):
    if 32 <= b < 127:
        if cur is None:
            cur = i
    else:
        if cur is not None:
            ln = i - cur
            if 4 <= ln <= 60:
                s = arm9[cur:i].decode('ascii')
                strings.append((cur, ln, s))
            cur = None
if cur is not None:
    ln = len(arm9) - cur
    if 4 <= ln <= 60:
        strings.append((cur, ln, arm9[cur:].decode('ascii')))

print('共 %d 个字符串' % len(strings))
# 过滤有趣的：路径、扩展名、场景关键词
pats = re.compile(r'(\.map|\.fap|\.lap|\.dat|\.bin|map_d|fap_d|lap_d|_comp|title|select|option|tutorial|file|save|\.ncgr|\.nclr|\.nscr|\.ncer|\.nanr|\.nmar|LZ|Game|game|puzzle|Pic|pic)', re.I)
hits = [(o, ln, s) for o, ln, s in strings if pats.search(s)]
print('=== 命中 %d 个 ===' % len(hits))
for o, ln, s in hits[:200]:
    print('0x%06X (%4d)  %s' % (o, ln, s))
