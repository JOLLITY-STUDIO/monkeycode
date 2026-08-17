#!/usr/bin/env python3
"""B1: 教程记录精确解码 + 0x136d40f 簇对比"""
import struct

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

def dump_records(start, count, label):
    print(f"\n=== {label}: 64-byte records from {start:#x} ===")
    for j in range(count):
        s = start + j * 0x40
        rec = d[s:s + 0x40]
        u16s = struct.unpack_from("<32H", rec)
        # 分析：前 4 u16 是否零，数据区，尾部
        prefix = u16s[:4]
        data = u16s[4:31]
        tail = u16s[31]
        nonzero = [i for i in range(4, 32) if u16s[i] != 0]
        print(f"rec[{j}] {s:#x} prefix={' '.join(f'{v:04x}' for v in prefix)} tail={tail:04x} nz={nonzero[:8]}... data={' '.join(f'{v:04x}' for v in data[:12])}")

# 教程区 rec[0..16] (0x232660 起)
dump_records(0x232660, 17, "tutorial")

# 0x136d40f 簇
for start in (0x136d400,):
    print(f"\n=== dump {start:#x}..{start + 0x200:#x} ===")
    for off in range(start, start + 0x200, 16):
        print(f"{off:08X} " + d[off:off+16].hex(" "))
