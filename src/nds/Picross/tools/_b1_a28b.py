#!/usr/bin/env python3
"""B1: 保存完整结构地图 + dump 候选拼图数据区"""
import struct, os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()
N = len(data)

OUT = os.path.join(BASE, "_b1_a28_map.txt")
lines = []
STEP = 0x10000
for off in range(0, N, STEP):
    chunk = data[off : off + STEP]
    z = chunk.count(0)
    zero_pct = z * 100 // len(chunk)
    small = sum(1 for b in chunk[::2] if 1 <= b <= 15)
    small_pct = small * 100 // (len(chunk) // 2)
    head = " ".join(f"{b:02X}" for b in chunk[:8])
    lines.append(f"{off:#09x} zero={zero_pct:3d}% small_u16={small_pct:3d}% head={head}")
open(OUT, "w", encoding="utf-8").write("\n".join(lines))
print(f"map -> {OUT} ({len(lines)} lines)")

# dump 候选区：0x1340000-0x1350000（步进 0x40）
for name, a, b in [
    ("0x1340000-0x1350000", 0x1340000, 0x1350000),
    ("0x13b0000-0x13e0000", 0x13B0000, 0x13E0000),
]:
    print(f"\n=== {name} ===")
    for off in range(a, b, 0x40):
        chunk = data[off : off + 0x40]
        hexs = " ".join(f"{b:02X}" for b in chunk[:16])
        print(f"  {off:#08x}: {hexs}")
