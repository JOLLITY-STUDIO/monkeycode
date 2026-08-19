#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87n: 仅解析 SSEQ 轨道表 + manifest 查找 file_123"""
import struct, sys, io, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# ---- manifest 查找 SDAT 归属 ----
try:
    m = json.load(open('d:/studio/github/monkeycode/src/nds/Picross/extracted/manifest.json', encoding='utf-8'))
    print('=== manifest 摘要 ===')
    if isinstance(m, dict):
        print(f'  keys: {list(m.keys())[:10]}')
        files = m.get('files') or m.get('fileList') or []
        if isinstance(files, list):
            print(f'  files count={len(files)}')
            # 找 size 大的文件
            for i, e in enumerate(files[:5]):
                print(f'    [{i}] {e}')
except Exception as ex:
    print(f'manifest 读取失败: {ex}')

# ---- SSEQ 轨道表 ----
D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
d = open(f'{D}/file_000.bin', 'rb').read()
ev = d[0x18:]
print('\n=== file_000 SSEQ DATA 前 32B ===')
for i in range(0, 32, 16):
    print(f'  +0x{i:03X}: {ev[i:i+16].hex(" ")}')
# 轨道表: 观察 +0x02 起 93 xx u16 00 模式
print('\n=== 轨道表 (0x93 xx u16 00) ===')
tracks = []
for i in range(0, len(ev) - 5):
    if ev[i] == 0x93 and ev[i + 4] == 0x00:
        trk = ev[i + 1]
        off = struct.unpack_from('<H', ev, i + 2)[0]
        tracks.append((i, trk, off))
for t in tracks:
    print(f'  @+0x{t[0]:04X}: track#{t[1]} -> 0x{t[2]:04X}')
print(f'  共 {len(tracks)} 个轨道指针')

# 解轨道 1 前 32 事件字节
if tracks:
    off = tracks[0][2]
    print(f'\n=== track#{tracks[0][1]} 事件流 @0x{off:04X} 前 64B ===')
    for i in range(0, 64, 16):
        chunk = ev[off + i: off + i + 16]
        print(f'  +0x{i:03X}: {chunk.hex(" ")}')
