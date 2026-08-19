#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s88c: 枚举 file_000 全轨道 0x80+ 命令字节 + 跟随字节，构建参数长度表"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
d = open(f'{D}/file_000.bin', 'rb').read()
ev = d[0x18:]

# 轨道表
# 轨道表: 从 DATA 头向后扫 93 xx u16 00（前 0x40 内）
tracks = []
for i in range(0, 0x40):
    if ev[i] == 0x93 and ev[i + 4] == 0x00:
        tracks.append((ev[i + 1], struct.unpack_from('<H', ev, i + 2)[0]))
# 轨道表前: 1C 00 00 00 FE BF 02 (7B) → 轨道表从第一个 93 起，main 在其后
first93 = next(i for i in range(0x40) if ev[i] == 0x93 and ev[i + 4] == 0x00)
main_off = first93 + len(tracks) * 5
regions = [('main', main_off, tracks[0][1])] + [(f't{t[0]}', t[1], tracks[i + 1][1] if i + 1 < len(tracks) else len(ev)) for i, t in enumerate(tracks)]

print('regions:', [(r[0], hex(r[1]), hex(r[2])) for r in regions])

# 统计命令字节（>=0x80）及其后 4 字节
from collections import Counter, defaultdict
cmd_next = defaultdict(list)
for name, a, b in regions:
    seg = ev[a:b]
    i = 0
    while i < len(seg):
        c = seg[i]
        if c >= 0x80:
            cmd_next[c].append((name, i, [seg[j] for j in range(i + 1, min(i + 5, len(seg)))]))
        i += 1

print('\n=== 命令字节统计（出现数 + 前 5 例后随字节） ===')
for c in sorted(cmd_next):
    xs = cmd_next[c]
    print(f'0x{c:02X}: {len(xs):4d} 次  示例: ' + ' | '.join(f'{x[0]}@{x[1]:04X} [' + ' '.join(f'{v:02X}' for v in x[2]) + ']' for x in xs[:3]))

# 检查 delta 是否可能多字节: 音符三元组里 delta 是否有 >=0x80
print('\n=== 音符三元组 delta 检查（key vel delta 中 delta>=0x80 的例外） ===')
count = 0
for name, a, b in regions:
    seg = ev[a:b]
    i = 0
    while i < len(seg) - 2:
        if seg[i] < 0x80:
            # 可能是音符 key: 后面 vel 也 <0x80
            if seg[i + 1] < 0x80 and seg[i + 2] < 0x80:
                count += 1
            i += 3
        else:
            i += 1
print(f'  (近似三元组计数 {count})')
