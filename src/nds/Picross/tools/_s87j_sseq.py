#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87j: 解析 SSEQ 头 + DATA 块 + 事件流轨道指针 (标准 NDS SSEQ)"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'
fn = f'{D}/file_000.bin'
data = open(fn, 'rb').read()
print(f'=== {fn} size={len(data)} ===')

magic = data[0:4]
bs = data[4:8].hex(' ')
size = struct.unpack_from('<I', data, 8)[0]
hsize = struct.unpack_from('<H', data, 0x0C)[0]
bcnt = struct.unpack_from('<H', data, 0x0E)[0]
print(f'  magic={magic} byteswap={bs} size=0x{size:x} headerSize={hsize} blockCount={bcnt}')

# DATA 块
doff = hsize
dmagic = data[doff:doff + 4]
dsize = struct.unpack_from('<I', data, doff + 4)[0]
print(f'  block@0x{doff:x}: magic={dmagic} size=0x{dsize:x}')
ev = data[doff + 8: doff + 8 + dsize]

# 标准 SSEQ 事件流: 开头是控制流 (FF xx), 轨道指针 FF 0E xx xx xx xx
print(f'\n=== 事件流头 64B ===')
for i in range(0, 64, 16):
    chunk = ev[i:i + 16]
    hx = ' '.join(f'{b:02X}' for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print(f'  +0x{i:03X}: {hx:<48} {asc}')

# 找轨道指针 (FF 0E)
print('\n=== 轨道指针 (FF 0E xx xx xx xx) ===')
i = 0
tracks = []
while i < len(ev) - 5:
    if ev[i] == 0xFF and ev[i + 1] == 0x0E:
        p = struct.unpack_from('<I', ev, i + 2)[0]
        tracks.append((i, p))
        print(f'  命令@0x{i:03X}: track ptr -> 0x{p:04X} (abs 0x{p:04X})')
        i += 6
        # 若后面紧跟 FF xx 控制则继续
        continue
    i += 1
print(f'共 {len(tracks)} 轨')

# 解每条轨道前 32B 事件
for ti, (ci, tp) in enumerate(tracks):
    print(f'\n=== Track {ti} @ 0x{tp:04X} (前 48B) ===')
    for i in range(0, 48, 16):
        chunk = ev[tp + i: tp + i + 16]
        hx = ' '.join(f'{b:02X}' for b in chunk)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print(f'  +0x{i:03X}: {hx:<48} {asc}')
