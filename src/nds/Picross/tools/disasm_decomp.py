#!/usr/bin/env python3
"""对 extracted/arm9_decomp.bin 全量反汇编 + 收集 BL 调用图。
文件偏移 = VA - 0x02000000；有效区间 [0x02004000, 0x020db058)。"""
import os, sys, collections
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
BIN = open(os.path.join(ROOT, "extracted", "arm9_decomp.bin"), "rb").read()
VA0 = 0x2000000
LO = 0x2004000
HI = 0x20db058

md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
md.skipdata = True

OUT = os.path.join(ROOT, "_tmp_disasm_out", "arm9_decomp.asm")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

calls = collections.defaultdict(list)   # target -> [src]
blx = []

with open(OUT, "w", encoding="utf-8") as f:
    f.write(f"; arm9_decomp.bin 全量反汇编 [{LO:#x},{HI:#x})  len={len(BIN):#x}\n")
    f.write(f"; 文件偏移 = VA - 0x02000000\n\n")
    data = BIN[LO - VA0: HI - VA0]
    prev = LO
    for insn in md.disasm(data, LO):
        # 跳空标记
        gap = insn.address - prev
        if gap > 0:
            f.write(f"\n; ---- gap {gap:#x}B [{prev:#x},{insn.address:#x}) 数据区 ----\n")
        f.write(f"{insn.address:#10x}  {insn.mnemonic:8s} {insn.op_str}\n")
        prev = insn.address + insn.size
        if insn.mnemonic == "bl":
            try:
                tgt = int(insn.op_str.lstrip("#"), 16)
                calls[tgt].append(insn.address)
            except ValueError:
                pass
        if insn.mnemonic == "blx":
            blx.append((insn.address, insn.op_str))

print(f"asm -> {OUT}")
print(f"BL 目标数: {len(calls)}")

# 汇总写入
SUM = os.path.join(ROOT, "_tmp_disasm_out", "arm9_decomp_calls.txt")
with open(SUM, "w", encoding="utf-8") as f:
    f.write(f"{'target':>10}  {'count':>4}  region      srcs\n")
    for tgt, srcs in sorted(calls.items()):
        if LO <= tgt < HI:
            region = "decomp"
        elif 0x2000800 <= tgt < 0x2004000:
            region = "plain"
        elif 0x1ff8000 <= tgt < 0x1ff9000:
            region = "pool0x1ff8"
        elif 0x27e0000 <= tgt < 0x27e4000:
            region = "ram27e"
        else:
            region = "other"
        f.write(f"{tgt:#10x}  {len(srcs):4d}  {region:10s}  {', '.join(f'{s:#x}' for s in srcs[:6])}\n")
    f.write(f"\nBLX 数: {len(blx)}\n")
    for a, op in blx[:60]:
        f.write(f"  {a:#10x}  blx {op}\n")
print(f"call summary -> {SUM}")

# 打印 top 调用最频繁的目标
print("\n== 调用最频繁的 30 个目标 ==")
for tgt, srcs in sorted(calls.items(), key=lambda kv: -len(kv[1]))[:30]:
    print(f"  BL {tgt:#10x}  x{len(srcs)}  <- {', '.join(f'{s:#x}' for s in srcs[:5])}")
