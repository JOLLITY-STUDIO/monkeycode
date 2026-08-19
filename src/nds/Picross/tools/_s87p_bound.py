#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87p: 确认 SDAT 边界 (file_94 end -> SDAT -> file_95 start) + SSEQ 事件流试解"""
import struct, sys, io, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

m = json.load(open('d:/studio/github/monkeycode/src/nds/Picross/extracted/manifest.json', encoding='utf-8'))
f94 = m['unnamed/file_94.bin']
f95 = m['unnamed/file_95.bin']
print(f'file_94: start=0x{f94["start"]:x} end=0x{f94["end"]:x} size={f94["size"]}')
print(f'file_95: start=0x{f95["start"]:x} end=0x{f95["end"]:x} size={f95["size"]}')
BASE = 26363904  # 0x1924800
SZ = 5952032
gap = BASE - f94['end']
after = f95['start'] - (BASE + SZ)
print(f'SDAT BASE=0x{BASE:x} size=0x{SZ:x} (end=0x{BASE+SZ:x})')
print(f'  与 file_94 间隙: {gap} 字节; 与 file_95 间隙: {after} 字节')
print(f'  -> SDAT 是否 = file_94 尾部延伸: {"是(紧邻)" if gap < 0x200 else "否"}; 是否被 file_95 紧接: {"是" if after < 0x200 else "否"}')

# SSEQ 事件流格式: 标准 NDS SSEQ 的轨道指针是 FF 0E + u32
# 但此处数据从 0x1C 起, 前 0x1C 字节可能是轨道表
d = open('d:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files/file_000.bin', 'rb').read()
ev = d[0x18:]
print('\n=== SSEQ 轨道事件流试解 (前 0x1C 字节 = 轨道表?) ===')
print(f'  事件流前 0x40B: {ev[:0x40].hex(" ")}')
# 标准 NDS SSEQ: 轨道表每个轨道 = FF 0E + u32 offset (相对 DATA 块起始)
# 观察: 0x07 起是 93 01 29 02 00 93 02 3c 05 00... 每 5 字节: [93][轨道号][u16 偏移][00]
print('\n  轨道表条目 (93 xx u16 00):')
tr = []
for i in range(2, 0x1C, 5):
    if ev[i] == 0x93:
        tno = ev[i+1]
        off = struct.unpack_from('<H', ev, i+2)[0]
        tr.append((tno, off))
        print(f'    track#{tno} @ 0x{off:04X}')
# 轨道1 事件流
print('\n=== track#1 事件流 @0x0229 ===')
o = 0x0229
for i in range(0, 0x40, 16):
    print(f'  +0x{i:02X}: {ev[o+i:o+i+16].hex(" ")}')
