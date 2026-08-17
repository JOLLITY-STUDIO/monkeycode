#!/usr/bin/env python3
"""B3: 检查 file_86 消息索引表结构与可解码文本"""
import os, struct
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted")
# 找 file_86
p86 = None
for root, dirs, names in os.walk(EX):
    for n in names:
        if n.startswith("file_86"):
            p86 = os.path.join(root, n)
            break
print("file_86:", p86, os.path.getsize(p86) if p86 else "")
data = open(p86, "rb").read()
print("--- head 64B ---")
for off in range(0, 64, 16):
    row = data[off:off+16]
    print(f"{off:04X}: {row.hex(' ')}")
# 尝试: 头 6B + u32 偏移表
print("\n--- 前 40 个 u32 ---")
for i in range(40):
    off = 6 + i*4
    print(f"[{i:3d}] 0x{struct.unpack_from('<I', data, off)[0]:08X}")
