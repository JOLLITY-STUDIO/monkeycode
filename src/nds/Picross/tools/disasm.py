#!/usr/bin/env python3
"""Disassemble ARM9/ARM7 code segments with capstone (ARM + Thumb heuristics)."""
import os, sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted")
OUT = os.path.join(BASE, "..", "_tmp_disasm_out")
os.makedirs(OUT, exist_ok=True)

def disasm_range(code, base_va, start_off, end_off, thumb=False, max_insn=200000):
    mode = CS_MODE_THUMB if thumb else CS_MODE_ARM
    md = Cs(CS_ARCH_ARM, mode)
    md.detail = False
    md.skipdata = True  # continue through data bytes (emit .byte)
    lines = []
    data = code[start_off:end_off]
    for insn in md.disasm(data, base_va + start_off):
        lines.append(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}")
        if len(lines) >= max_insn:
            break
    return lines

def main():
    targets = [
        ("arm9.bin", 0x2000000, 0x800),   # ARM9 entry offset in file
        ("arm7.bin", 0x2380000, 0),       # ARM7 entry offset in file
    ]
    for fname, base_va, entry_off in targets:
        code = open(os.path.join(EX, fname), "rb").read()
        lines = disasm_range(code, base_va, 0, len(code))
        outfile = os.path.join(OUT, fname + ".asm")
        with open(outfile, "w") as f:
            f.write(f"; {fname} base_va={base_va:#x} entry_va={base_va+entry_off:#x}\n")
            f.write("; linear ARM disassembly (first pass)\n")
            for l in lines:
                f.write(l + "\n")
        print(f"{fname}: {len(lines)} instructions -> {outfile}")

if __name__ == "__main__":
    main()
