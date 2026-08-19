#!/usr/bin/env python3
"""验证 arm9.bin 提取偏移 + 检查 0x20116bc 是否真的是代码。"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
CODE = open(os.path.join(ROOT, "extracted", "arm9.bin"), "rb").read()

# 找 ROM 文件
import glob
roms = glob.glob(os.path.join(ROOT, "_rom_raw", "*.nds")) + glob.glob(os.path.join(ROOT, "*.nds"))
print("ROM candidates:", roms)
ROM = None
for r in roms:
    if os.path.getsize(r) > 1000000:
        ROM = r
        break
if ROM:
    rom = open(ROM, "rb").read()
    print("ROM size:", len(rom))
    # arm9 在 ROM offset 0x4000，长度 0x80DA8
    seg = rom[0x4000:0x4000+len(CODE)]
    print("arm9.bin 与 ROM[0x4000:0x4000+len] 一致:", seg == CODE)
    # 检查 arm9 之后的压缩数据区
    pos = 0x4000 + len(CODE)
    print("压缩数据头 8 字节:", rom[pos-8:pos].hex())
    print("  [r0-8] LE =", int.from_bytes(rom[pos-8:pos-4], "little"))
    print("  [r0-4] LE =", int.from_bytes(rom[pos-4:pos], "little"))
    # 0x20116bc 在 ROM 中的字节
    off = 0x4000 + 0x116bc
    print("ROM 0x20116bc 处字节:", rom[off:off+32].hex())
    # 直接检查 BL 指令字节
    b = int.from_bytes(CODE[0x8f8:0x8fc], "little")
    print("0x20008F8 原始字:", hex(b))
