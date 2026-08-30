#!/usr/bin/env python3
"""把 bgm JSON 转成 TS 模块"""
import json, sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
BASE = 'd:/studio/github/monkeycode/src/nds/Picross/src/data/bgm'

# songs.json
with open(f'{BASE}/songs.json', encoding='utf-8') as f:
    s = f.read()
# 把对象/数组缩成单行（不影响含义，但输出更整齐）
out = '/* AUTO-GENERATED from songs.json — do not edit */\n'
out += 'export const songsData = ' + s + ' as any;\n'
out += 'export default songsData;\n'
with open(f'{BASE}/songs.ts', 'w', encoding='utf-8') as f:
    f.write(out)
print('songs.ts', os.path.getsize(f'{BASE}/songs.ts'))

# waves.json
with open(f'{BASE}/waves.json', encoding='utf-8') as f:
    w = f.read()
out = '/* AUTO-GENERATED from waves.json — do not edit */\n'
out += 'export const wavesIndexData = ' + w + ' as any;\n'
out += 'export default wavesIndexData;\n'
with open(f'{BASE}/waves.ts', 'w', encoding='utf-8') as f:
    f.write(out)
print('waves.ts', os.path.getsize(f'{BASE}/waves.ts'))
