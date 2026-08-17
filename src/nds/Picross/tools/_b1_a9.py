#!/usr/bin/env python3
"""B1: 查看教程记录之后 0x232A60..0x240000 的结构"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

print("=== 0x232A60..0x233000 (记录15 及后续) ===")
for off in range(0x232A60, 0x233000, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 扫描后续 64 字节槽位是否还有记录结构（8零+27值）
print("\n=== 0x233000..0x240000 中 8零前缀 + 27值 + 03 0c 的记录 ===")
pos = 0x233000
count = 0
while pos < 0x240000 and count < 20:
    i = d.find(b"\x03\x0c", pos)
    if i < 0:
        break
    # 检查前面是否有 8 个零
    pre = d[i-64:i]
    if pre[:8] == b"\x00"*8:
        print(f"  record-like @ {i:#x}")
        count += 1
    pos = i + 1

# 非零行概览
print("\n=== 0x233000..0x240000 非零行开头 40 行 ===")
nz = 0
for off in range(0x233000, 0x240000, 16):
    chunk = d[off:off+16]
    if chunk != b"\x00"*16:
        print(f"{off:08X} " + chunk.hex(" "))
        nz += 1
        if nz >= 40:
            break
