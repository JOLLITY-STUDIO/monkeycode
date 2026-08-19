#!/usr/bin/env python3
"""验证解压输出中的 ARM 序言是否连贯，找 BL 目标附近最近的合法代码。"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0
v8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")
v4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")

def decompress():
    dest_off = v8 >> 24
    comp_size = v8 & 0xFFFFFF
    src_start = comp_end - comp_size
    src = comp_end - dest_off - 1
    dst_end_va = VA0 + comp_end + v4
    buf = bytearray(dst_end_va - VA0 + 0x10000)
    dst = dst_end_va - 1
    bits = 0; ctrl = 0
    while src >= src_start:
        if bits == 0:
            ctrl = CODE[src]; src -= 1
            bits = 8
        bits -= 1
        if (ctrl >> bits) & 1 == 0:
            buf[dst - VA0] = CODE[src]; src -= 1
            dst -= 1
        else:
            hi = CODE[src]; src -= 1
            lo = CODE[src]; src -= 1
            off = ((hi << 8) | lo) & 0xFFF
            off += 2
            ln = hi + 0x20
            while ln >= 0:
                buf[dst - VA0] = buf[dst + off - VA0]
                dst -= 1
                ln -= 0x10
    return buf, dst + 1

buf, start = decompress()
out = bytes(buf[start-VA0:0x20db058-VA0])
BASEVA = start

def score_arm(va, nins=6):
    """返回该地址起 nins 条 ARM 指令的连贯性分数。"""
    md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
    data = bytes(buf[va-VA0:va-VA0+nins*4])
    insns = list(md.disasm(data, va))
    if len(insns) < nins:
        return 0
    score = 0
    for i in insns:
        if i.mnemonic in ("push", "mov", "add", "sub", "ldr", "str", "ldrb", "strb",
                          "ldrh", "strh", "cmp", "b", "bl", "bx", "tst", "and", "orr",
                          "eor", "mul", "mla", "rsb", "adc", "sbc", "mvn", "bic", "orr",
                          "pop", "nop", "ldmia", "stmia", "ldmfd", "stmfd"):
            score += 2
        elif i.mnemonic.startswith("ldr") or i.mnemonic.startswith("str"):
            score += 1
        elif "undefined" in i.mnemonic or i.mnemonic.startswith("mcr") or i.mnemonic.startswith("mrc"):
            score -= 2
    return score

# 1. 扫描所有 ARM 序言候选并按连贯性排序
cands = []
for o in range(0, len(out)-24, 4):
    w = int.from_bytes(out[o:o+4], "little")
    if (w & 0xFFFF0000) == 0xE92D0000:
        va = BASEVA + o
        s = score_arm(va)
        cands.append((s, va, w))
cands.sort(reverse=True)
print("== ARM 序言候选 (分数>=8) ==")
for s, va, w in cands[:50]:
    print(f"  score={s:2d}  {va:#x}  ({w:08x})")

# 2. BL 目标附近 ±0x400 内的合法代码
BLT = [0x2024240, 0x2026884, 0x2026b24, 0x201f974, 0x2024c04, 0x20116bc, 0x2011800]
print("\n== BL 目标附近候选 ==")
for tgt in BLT:
    best = None
    for s, va, w in cands:
        if abs(va - tgt) < 0x400 and s >= 6:
            if best is None or s > best[0]:
                best = (s, va)
    if best:
        print(f"  {tgt:#x} → 最近合法序言 {best[1]:#x} (score {best[0]}, delta {best[1]-tgt:#x})")
    else:
        print(f"  {tgt:#x} → 0x400 内无合法序言")
