#!/usr/bin/env python3
"""按汇编精确镜像 BLZ 解压器（修复 ldmdb 写回 r0-=8 的问题）。

关键修正：
1. ldmdb r0,{r1,r2} 带写回 → 后续所有计算基址为 r0-8 = 0x02080da0
   - 输出终点 r2 = 0x02080da0 + decomp_size = 0x020db050（而非 0x020db058）
   - 输入读起点 r3 = 0x02080da0 - dest_off = 0x02080d96（首次读 0x02080d95）
   - 输入下限   r1 = 0x02080da0 - comp_size = 0x02003ff8（而非 0x02004000）
2. 长度循环 subs ip,#0x10; bge → while ln >= 0（不是 > 0）
"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8          # bl 0x2000950 时 r0 = LZ 头指针（原始）
R0B = R0 - 8             # ldmdb 写回后的 r0

# ---- 头部 ----
packed = int.from_bytes(CODE[R0B - VA0:R0B + 4 - VA0], "little")       # [r0-8] = 0x0a07cda8
decomp_size = int.from_bytes(CODE[R0B + 4 - VA0:R0B + 8 - VA0], "little")  # [r0-4] = 0x5a2b0
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
print(f"packed={packed:#010x} dest_off={dest_off:#x} comp_size={comp_size:#x} decomp_size={decomp_size:#x}")
print(f"r0_base={R0B:#x} 输入=[{R0B-comp_size:#x},{R0B-dest_off:#x}) 输出终点={R0B+decomp_size:#x}")

src_start = R0B - comp_size        # 0x02003ff8 (VA)
src = R0B - dest_off               # 0x02080d96 (VA, 预减读 → 先读 0x02080d95)
dst_end = R0B + decomp_size        # 0x020db050

# 大缓冲区覆盖可能写到的范围
buf_base = VA0
buf = bytearray(dst_end - buf_base + 0x4000)
dst = dst_end - 1

bits = 0
ctrl = 0
n_tok = 0
n_lit = 0
n_ref = 0
reads = 0
while src > src_start:
    if bits == 0:
        ctrl = CODE[src - 1 - VA0]; src -= 1; reads += 1
        bits = 8
    bits -= 1
    if ((ctrl >> bits) & 1) == 0:
        buf[dst - buf_base] = CODE[src - 1 - VA0]; src -= 1; reads += 1
        dst -= 1; n_lit += 1
    else:
        hi = CODE[src - 1 - VA0]; src -= 1; reads += 1
        lo = CODE[src - 1 - VA0]; src -= 1; reads += 1
        off = (((hi << 8) | lo) & 0xFFF) + 2
        ln = hi + 0x20
        while ln >= 0:
            buf[dst - buf_base] = buf[dst + off - buf_base]
            dst -= 1
            ln -= 0x10
        n_ref += 1
    n_tok += 1

out_start = dst + 1
out_size = dst_end - out_start
print(f"\ntokens={n_tok} lit={n_lit} ref={n_ref} reads={reads} (应={comp_size-dest_off:#x})")
print(f"输出=[{out_start:#x},{dst_end:#x}) size={out_size:#x} (decomp_size={decomp_size:#x})")
print(f"out==decomp_size: {out_size == decomp_size}")

def hexdump(va, n):
    print(f"\n== 0x{va:x} ==")
    for o in range(0, n, 16):
        chunk = bytes(buf[va + o - buf_base:va + o + 16 - buf_base])
        print(f"  [{va+o:#x}] " + " ".join(f"{b:02x}" for b in chunk))

def dis(va, n, mode):
    md = Cs(CS_ARCH_ARM, mode)
    data = bytes(buf[va - buf_base:va - buf_base + n])
    insns = list(md.disasm(data, va))
    print(f"\n-- 0x{va:x} {n:#x}B {('THUMB' if mode==CS_MODE_THUMB else 'ARM ')} ({len(insns)} insn) --")
    for i in insns[:12]:
        print(f"  {i.address:#10x}  {i.mnemonic:8s} {i.op_str}")

# 尾部：描述符表区域
hexdump(0x020db000, 0x58)
# 描述符解析 (dst, copy_words, zero_words)
print("\n== 描述符表 @ 0x020db040 解析 ==")
for i in range(0, 0x18, 4):
    w = int.from_bytes(bytes(buf[0x020db040 + i - buf_base:0x020db040 + i + 4 - buf_base]), "little")
    print(f"  [{0x020db040+i:#x}] = {w:#010x}")

# 拷贝源
hexdump(0x020da9c0, 0x40)

# BL 目标检查
print("\n== BL 目标检查 ==")
for tgt in (0x20116bc, 0x2011800, 0x201f974, 0x2024240, 0x2024c04, 0x2025374,
            0x2026844, 0x2026884, 0x2026b24, 0x2026b60):
    if out_start <= tgt < dst_end:
        print(f"\n### 0x{tgt:x} 在输出区")
        dis(tgt, 0x10, CS_MODE_THUMB)
        dis(tgt, 0x10, CS_MODE_ARM)
    else:
        print(f"0x{tgt:x} 不在输出区 [{out_start:#x},{dst_end:#x})")

# 保存
out = bytes(buf[out_start - buf_base:dst_end - buf_base])
outpath = os.path.join(BASE, "..", "extracted", "arm9_decompressed_correct.bin")
open(outpath, "wb").write(out)
print(f"\nsaved {outpath} size={len(out):#x} base_va={out_start:#x}")
