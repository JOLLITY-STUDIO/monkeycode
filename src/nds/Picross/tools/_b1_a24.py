#!/usr/bin/env python3
"""B1: dump file_95 0x30000+ 非文本区 + 0x5f011 维度标记区"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_95.bin", "rb").read()

# 1) 0x5f011 附近 (20x15 标记)
print("=== file_95 0x5f000..0x5f200 ===")
for off in range(0x5f000, 0x5f200, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 2) 0x30000 开头看非文本区结构
print("\n=== file_95 0x30000..0x30100 ===")
for off in range(0x30000, 0x30100, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 3) 扫描 0x30000+ 的 03 0c 记录模式
print("\n=== 03 0c markers in 0x30000..0x110000 ===")
pos = 0x30000
hits = []
while pos < 0x110000:
    i = d.find(b"\x03\x0c", pos)
    if i < 0: break
    hits.append(i)
    pos = i + 1
print(f"total: {len(hits)}, first 30: {[f'{x:#x}' for x in hits[:30]]}")
