#!/usr/bin/env python3
"""扫描 ARM9 二进制：寻找高密度可解码的 Thumb 代码区，对比 ARM 模式。"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

md_arm = Cs(CS_ARCH_ARM, CS_MODE_ARM)
md_thumb = Cs(CS_ARCH_ARM, CS_MODE_THUMB)

def density(start, size, thumb):
    md = md_thumb if thumb else md_arm
    data = CODE[start:start+size]
    insns = list(md.disasm(data, VA0 + start))
    return len(insns), insns

# 0x2011000-0x2020000 区域：按 0x100 块统计可解码指令数（8 字节对齐采样）
print("region scan (Thumb decode success / 0x100 block)")
for base in range(0x11000, 0x24000, 0x400):
    n_thumb, _ = density(base, 0x400, True)
    n_arm, _ = density(base, 0x400, False)
    flag = ""
    if n_thumb > n_arm and n_thumb > 200:
        flag = " <== THUMB-LIKE"
    elif n_arm >= n_thumb and n_arm > 200:
        flag = " <== ARM-LIKE"
    print(f"{VA0+base:#10x}: thumb={n_thumb:4d} arm={n_arm:4d}{flag}")
