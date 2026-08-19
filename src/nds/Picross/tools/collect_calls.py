#!/usr/bin/env python3
"""反汇编明文状态机 [0x2001400,0x2004000)，收集所有 BL 调用目标。"""
import os, re
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
calls = {}
data = CODE[0x1400:0x4000]
for insn in md.disasm(data, VA0 + 0x1400):
    if insn.mnemonic == "bl":
        tgt = int(insn.op_str.lstrip("#"), 16)
        calls.setdefault(tgt, []).append(insn.address)
    if insn.mnemonic in ("blx",):
        print(f"  {insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")

print("=== BL 目标统计 (0x2001400-0x2004000) ===")
for tgt, srcs in sorted(calls.items()):
    region = "明文" if 0x2001400 <= tgt < 0x2004000 else ("解压" if 0x2011B27 <= tgt < 0x20DB058 else "外部")
    print(f"  BL {tgt:#10x} [{region}]  <- {len(srcs)} 次 ({', '.join(f'{s:#x}' for s in srcs[:4])})")
