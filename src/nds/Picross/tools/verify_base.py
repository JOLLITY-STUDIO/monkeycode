#!/usr/bin/env python3
"""核验解压镜像基址：dump 目标 VA 附近的原始字节 + 引导区解压后流程。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = open(os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin"), "rb").read()
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
IMG_BASE = 0x2011B27
IMG_END = 0x20DB058

def show_bytes(va, n=64):
    off = va - IMG_BASE
    if off < 0 or off + n > len(IMG):
        print(f"  VA {va:#x} 超出镜像 [0x2011B27, 0x20DB058)")
        return
    chunk = IMG[off:off+n]
    print(f"== [0x{va:x}] 原始字节 (thumb/arm) ==")
    print("  ", " ".join(f"{b:02x}" for b in chunk[:32]))
    print("  ", " ".join(f"{b:02x}" for b in chunk[32:64]))
    for mode, name in ((CS_MODE_THUMB, "thumb"), (CS_MODE_ARM, "arm")):
        md = Cs(CS_ARCH_ARM, mode)
        insns = list(md.disasm(chunk, va))
        if insns:
            print(f"-- {name} ({len(insns)} insn) --")
            for i in insns[:12]:
                print(f"  {i.address:#10x}  {i.mnemonic:8s} {i.op_str}")

def boot_tail():
    # 反汇编 0x2000a00 - 0x2000c00 明文引导代码尾部，找解压后的跳转目标
    md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
    data = CODE[0xA00:0xC00]
    print(f"\n== 明文引导代码尾部 [0x2000a00,0x2000c00) ==")
    for insn in md.disasm(data, VA0 + 0xA00):
        print(f"  {insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

def loadinfo():
    print(f"\n== load info @ 0x2000b68 ==")
    for off in range(0xb68, 0xb98, 4):
        w = int.from_bytes(CODE[off:off+4], "little")
        print(f"  [0x2000b68+{off-0xb68:#x}] = {w:#010x}")

if __name__ == "__main__":
    for va in (0x2024240, 0x20241f0, 0x2026b24, 0x201f974, 0x2026884, 0x200180c, 0x200177c):
        show_bytes(va)
    boot_tail()
    loadinfo()
