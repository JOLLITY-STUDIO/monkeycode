#!/usr/bin/env python3
"""验证反向假设：REV[i]=IMG[len-1-i] 作为基址 0x2011B27 的镜像，检查目标函数。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = open(os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin"), "rb").read()
IMG_BASE = 0x2011B27
IMG_END = 0x20DB058
LEN = len(IMG)
print(f"IMG len={LEN:#x}")

def probe(va, mode):
    """按 REV 映射读 VA，尝试 thumb/arm 反汇编"""
    # REV[i] = IMG[LEN-1-i], i = va - IMG_BASE
    i = va - IMG_BASE
    if i < 0 or i >= LEN:
        print(f"  VA {va:#x} 越界")
        return
    chunk = bytes(IMG[LEN-1-(i+63):LEN-1-(i-1)])  # 64 bytes reversed
    # 实际：REV[i+k] = IMG[LEN-1-(i+k)] = IMG[LEN-1-i-k]
    chunk = bytes(IMG[LEN-1-i-63:LEN-1-i+1][::-1]) if i >= 63 else None
    md = Cs(CS_ARCH_ARM, mode)
    print(f"== VA {va:#x} REV映射 原始字节 ==")
    if chunk is None:
        print("  太靠前")
        return
    print("  ", " ".join(f"{b:02x}" for b in chunk[:32]))
    insns = list(md.disasm(chunk, va))
    for insn in insns[:16]:
        print(f"  {insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

for va in (0x2024240, 0x2026b24, 0x201f974, 0x2026884):
    probe(va, CS_MODE_THUMB)
    probe(va, CS_MODE_ARM)

# 检查解压区末尾的描述符表 (0x020db040 在文件中的位置)
print("\n== 解压文件尾部 0x40 字节 (对应 VA 0x020db018..0x020db058) ==")
print("  ", " ".join(f"{b:02x}" for b in IMG[LEN-0x40:]))
# 作为 u32 解析
for off in range(LEN-0x20, LEN, 4):
    w = int.from_bytes(IMG[off:off+4], "little")
    print(f"  VA {0x20DB058-(LEN-off):#x}  u32={w:#010x}")
