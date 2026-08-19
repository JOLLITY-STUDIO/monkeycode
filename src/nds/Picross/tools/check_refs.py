#!/usr/bin/env python3
"""搜索 ROM 中 0x027e0020 / 0x01ff8020 等地址的字面量引用，检查池内容"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def find_bytes(pat, label):
    idx = 0
    hits = []
    while True:
        i = CODE.find(pat, idx)
        if i < 0:
            break
        hits.append(i + VA0)
        idx = i + 1
    print(f"{label} ({pat.hex()}): {[hex(h) for h in hits[:20]]}" + (f" ...共{len(hits)}" if len(hits) > 20 else ""))
    return hits

print("=== 地址字面量搜索（小端） ===")
find_bytes(bytes([0x20, 0x00, 0x7e, 0x02]), "0x027e0020")
find_bytes(bytes([0x20, 0x80, 0xff, 0x01]), "0x01ff8020")
find_bytes(bytes([0x00, 0x00, 0x7e, 0x02]), "0x027e0000")
find_bytes(bytes([0x00, 0x80, 0xff, 0x01]), "0x01ff8000")
find_bytes(bytes([0x40, 0xb0, 0x0d, 0x02]), "0x020db040")
find_bytes(bytes([0x58, 0xb0, 0x0d, 0x02]), "0x020db058")
find_bytes(bytes([0xc0, 0xa9, 0x0d, 0x02]), "0x020da9c0")
print()

print("=== 引导区附近（0x20008xx-0x2000bxx）字面量池反汇编 ===")
for va in range(0x2000918, 0x2000a78, 4):
    w = int.from_bytes(CODE[va - VA0:va + 4 - VA0], "little")
    print(f"  {va:#010x}: {w:#010x}")
