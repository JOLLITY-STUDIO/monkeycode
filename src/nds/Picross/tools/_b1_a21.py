#!/usr/bin/env python3
"""B1: 检查 0x230000-0x232660 结构，找教程拼图索引表"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

# 1) 0x230000-0x232660 中找非图形区域（统计每 16 字节是否有规律）
print("=== 0x230000..0x232660 采样（每 0x200 一行） ===")
for off in range(0x230000, 0x232660, 0x200):
    print(f"{off:08X} " + d[off:off+16].hex(" "))

# 2) 教程区前后搜索可能的索引表（u16 序列 0..N）
print("\n=== 0x232660 之前 0x100 字节 ===")
for off in range(0x232560, 0x232660, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))
