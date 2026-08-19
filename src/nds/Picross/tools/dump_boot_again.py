#!/usr/bin/env python3
"""dump arm9.bin 明文引导区字面量 [0x2000900,0x2000b70)。"""
import struct

BIN = open(r"extracted/arm9.bin", "rb").read()
VA0 = 0x2000000

def u32(va):
    return struct.unpack_from("<I", BIN, va - VA0)[0]

for va in range(0x2000918, 0x2000950, 4):
    print(f"  {va:#x}: {u32(va):#10x}")

# 0x2000b64 引用的 load-info 表
print("\n== 0x2000b64 区域反汇编 ==")
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
data = BIN[0x2000b40 - VA0: 0x2000bb0 - VA0]
for insn in md.disasm(data, 0x2000b40):
    print(f"  {insn.address:#x}  {insn.mnemonic:8s} {insn.op_str}")
