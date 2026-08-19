#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""s87k: 解析 SBNK (file_081 bank_stay 大型) + SWAR (file_106 PLAYER_BGM) 结构"""
import struct, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

D = 'd:/studio/github/monkeycode/src/nds/Picross/extracted/SDAT/files'

def hdr(data, label):
    print(f'=== {label} size={len(data)} ===')
    print(f'  magic={data[0:4]} bs={data[4:8].hex(" ")} size=0x{struct.unpack_from("<I",data,8)[0]:x}')
    print(f'  +0x00: {data[:32].hex(" ")}')

# ---- SBNK: file_081 (bank_stay 对应, 1952B 大型) ----
bnk = open(f'{D}/file_081.bin', 'rb').read()
hdr(bnk, 'SBNK file_081')
# 标准 SBNK: 'SBNK' ff fe 00 01 size u32 headerSize u16 blockCount u16
hsize = struct.unpack_from('<H', bnk, 0x0C)[0]
bcnt = struct.unpack_from('<H', bnk, 0x0E)[0]
print(f'  headerSize={hsize} blockCount={bcnt}')
# DATA 块
doff = hsize
dmg = bnk[doff:doff + 4]
dsz = struct.unpack_from('<I', bnk, doff + 4)[0]
print(f'  DATA @0x{doff:x}: magic={dmg} size=0x{dsz:x}')
d = bnk[doff + 8: doff + 8 + dsz]
print(f'  DATA 前64B:')
for i in range(0, 64, 16):
    chunk = d[i:i + 16]
    print(f'    +0x{i:03X}: {chunk.hex(" ")}')
# 标准 SBNK DATA: [u16 乐器数][u16 padding][u32 乐器偏移表]
inst_cnt = struct.unpack_from('<H', d, 0)[0]
print(f'  乐器数 inst_cnt={inst_cnt}')
if inst_cnt < 300:
    offs = [struct.unpack_from('<I', d, 4 + i * 4)[0] for i in range(min(inst_cnt, 40))]
    print(f'  前 {min(inst_cnt,40)} 个乐器偏移: {[hex(x) for x in offs]}')
    # 解析第一个乐器 (标准格式: u32 区域偏移表)
    if offs:
        a = offs[0]
        print(f'  乐器[0] @0x{a:x}: {d[a:a+16].hex(" ")}')

# ---- SWAR: file_106 (PLAYER_BGM, 125400B) ----
war = open(f'{D}/file_106.bin', 'rb').read()
hdr(war, 'SWAR file_106 PLAYER_BGM')
hsize = struct.unpack_from('<H', war, 0x0C)[0]
doff = hsize
dmg = war[doff:doff + 4]
dsz = struct.unpack_from('<I', war, doff + 4)[0]
print(f'  DATA @0x{doff:x}: magic={dmg} size=0x{dsz:x}')
d = war[doff + 8: doff + 8 + dsz]
print(f'  DATA 前48B:')
for i in range(0, 48, 16):
    chunk = d[i:i + 16]
    print(f'    +0x{i:03X}: {chunk.hex(" ")}')
# 标准 SWAR DATA: [u32 波形数][u32 波形偏移表...]
wcnt = struct.unpack_from('<I', d, 0)[0]
print(f'  波形数 wcnt={wcnt}')
if wcnt < 300:
    offs = [struct.unpack_from('<I', d, 4 + i * 4)[0] for i in range(min(wcnt, 10))]
    print(f'  前 {min(wcnt,10)} 个波形偏移: {[hex(x) for x in offs]}')
    if offs:
        a = offs[0]
        print(f'  波形[0] @0x{a:x}: {d[a:a+20].hex(" ")}')
        # 标准 SWAV 头: 'SWAV'(4) bs(4) size(4) hsize(2) bcnt(2) 然后 DATA
        print(f'  波形[0] magic={d[a:a+4]} bs={d[a+4:a+8].hex(" ")} size=0x{struct.unpack_from("<I",d,a+8)[0]:x}')
