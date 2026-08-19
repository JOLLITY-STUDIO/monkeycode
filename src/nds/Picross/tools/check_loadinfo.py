#!/usr/bin/env python3
"""验证 load info 原始字节 + 检查 0x2000C00-0x2004000 间隙区域内容。"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

print("== load info @ 0x2000b68 ==")
for off in range(0xb68, 0xb88, 4):
    w = int.from_bytes(CODE[off:off+4], "little")
    print(f"  [0x2000b68+{off-0xb68:#x}] = {w:#010x}")

print("\n== 0x2000c00-0x2004000 间隙区域 (前 0x200 字节) ==")
for off in range(0xc00, 0xc00+0x100, 16):
    chunk = CODE[off:off+16]
    hexs = " ".join(f"{b:02x}" for b in chunk)
    print(f"  [{off:#x}] {hexs}")

# 检查间隙区域是否像代码（ARM/Thumb 密度）
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB
md_t = Cs(CS_ARCH_ARM, CS_MODE_THUMB)
md_a = Cs(CS_ARCH_ARM, CS_MODE_ARM)
for base in range(0xc00, 0x4000, 0x800):
    data = CODE[base:base+0x800]
    nt = sum(1 for _ in md_t.disasm(data, VA0+base))
    na = sum(1 for _ in md_a.disasm(data, VA0+base))
    print(f"  [{VA0+base:#x}]: thumb={nt:4d} arm={na:4d}")

# 0x2001ff80 处内容
print("\n== [0x2001ff80] 处内容 ==")
print("  ", CODE[0x1ff80:0x1ff80+64].hex())
