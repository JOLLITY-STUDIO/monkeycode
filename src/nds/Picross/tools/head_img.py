#!/usr/bin/env python3
"""查看解压镜像头部字节与统计，判断是否是二次压缩/数据包。"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = open(os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin"), "rb").read()
IMG_BASE = 0x2011B27

print("== 前 64 字节 ==")
for i in range(0, 64, 16):
    chunk = IMG[i:i+16]
    hexs = " ".join(f"{b:02x}" for b in chunk)
    print(f"  +0x{i:03x}: {hexs}")

print("\n== 后 64 字节（镜像末尾） ==")
tail = len(IMG) - 64
for i in range(tail, len(IMG), 16):
    chunk = IMG[i:i+16]
    hexs = " ".join(f"{b:02x}" for b in chunk)
    print(f"  +0x{i:04x}: {hexs}")

# 检查是否像 LZ77/BLZ 格式（前 4 字节 magic）
print("\n== 前 4 字节可能含义 ==")
w = int.from_bytes(IMG[0:4], "little")
print(f"  LE u32: {w:#x}")
print(f"  BE u32: {int.from_bytes(IMG[0:4], 'big'):#x}")

# 统计 0xE1 0xE0 开头指令密度（Thumb 特征）
print("\n== Thumb 特征扫描：每 0x1000 块中可解码指令数 ==")
from capstone import Cs, CS_ARCH_ARM, CS_MODE_THUMB
md = Cs(CS_ARCH_ARM, CS_MODE_THUMB)
for base in range(0, len(IMG), 0x4000):
    data = IMG[base:base+0x4000]
    n = sum(1 for _ in md.disasm(data, IMG_BASE + base))
    print(f"  +0x{base:05x} (VA {IMG_BASE+base:#x}): {n} insn / {len(data)} bytes")
