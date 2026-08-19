#!/usr/bin/env python3
"""ARM9 启动引导区深度反汇编：解析 literal pool、找到主程序真实入口。"""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB, arm

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def va_to_off(va):
    return va - VA0

def main():
    md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
    md.detail = True
    insns = list(md.disasm(CODE[va_to_off(0x2000800):va_to_off(0x2000a80)], 0x2000800))

    # 解析 literal pool：找出所有 [pc, #imm] 字加载目标
    literals = {}
    for insn in insns:
        if insn.mnemonic == "ldr" or insn.mnemonic == "ldrb":
            for op in insn.operands:
                if op.type == arm.ARM_OP_MEM:
                    if op.mem.base == arm.ARM_REG_PC:
                        tgt = (insn.address + 8 + op.mem.disp) & ~3
                        if 0 <= tgt - VA0 < len(CODE):
                            val = int.from_bytes(CODE[va_to_off(tgt):va_to_off(tgt)+4], "little")
                            literals[insn.address] = (tgt, val)

    def fmt(insn):
        if insn.address in literals:
            tgt, val = literals[insn.address]
            s = ""
            b = val.to_bytes(4, "little")
            if all(32 <= c < 127 for c in b):
                s = f"  '{b.decode('ascii')}'"
            return f"  <- [{tgt:#x}] = {val:#010x}{s}"
        return ""

    for insn in insns:
        print(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}{fmt(insn)}")

if __name__ == "__main__":
    main()
