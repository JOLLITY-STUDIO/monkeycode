#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87m: 确认 SDAT(0x1924800, 5.95MB) 在 FAT 文件系统中的归属 + SSEQ 轨道表试解"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROM = 'd:/studio/github/monkeycode/src/nds/Picross/_rom_raw/Picross DS (USA) (En,Fr,Es).nds'
BASE = 26363904  # 0x1924800
SZ = 5952032

f = open(ROM, 'rb')
# NTR 头 FAT 在 0x171C00
f.seek(0x171C00)
fat_cnt = struct.unpack('<I', f.read(4))[0]
print(f'FAT count={fat_cnt}')
found = None
for i in range(fat_cnt):
    start, end = struct.unpack('<II', f.read(8))
    if start <= BASE < end:
        found = (i, start, end)
        print(f'SDAT 位于 FAT 文件 [{i}]: 0x{start:x} - 0x{end:x} (size=0x{end-start:x})')
if not found:
    print('SDAT 不在 FAT 文件内 -> 裸数据区 (独立镜像)')
f.close()

# ---- SSEQ 轨道表试解: file_000 ----
D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
d = open(f'{D}/file_000.bin', 'rb').read()
ev = d[0x18:]  # DATA 块数据 (0x10 头 + 8 DATA 头)
print(f'\nfile_000 DATA (0x18 起) 前 96B:')
for i in range(0, 96, 16):
    chunk = ev[i:i + 16]
    print(f'  +0x{i:03X}: {chunk.hex(" ")}')

# 标准 NDS SSEQ 结构: 事件流以轨道指针表开始
# 轨道指针格式: FF 0E + u32 (偏移) 或本 ROM 自定义
# 观察 +0x02: FE BF 02 ... 之后 93 xx xx xx 00 模式
# 尝试: 轨道表 = [93][轨道号][u16 偏移][00] 7 项?
print('\n=== 尝试轨道表解析 (93 xx u16 00) ===')
for i in range(0, 0x60):
    if ev[i] == 0x93 and i + 5 <= len(ev):
        trk = ev[i + 1]
        off = struct.unpack_from('<H', ev, i + 2)[0]
        term = ev[i + 4]
        if term == 0x00:
            print(f'  @+0x{i:03X}: track#{trk} -> 0x{off:04X}')
