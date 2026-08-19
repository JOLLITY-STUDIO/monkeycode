#!/usr/bin/env python3
"""扫描解压镜像：
1. dump 拷贝源 0x020da9c0 区域并反汇编
2. 全镜像搜索合法描述符表模式 (dst, copy, zero) 连续≥2组
3. 检查状态机 BL 目标
"""
import os
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8

packed = int.from_bytes(CODE[R0 - 8 - VA0:R0 - 4 - VA0], "little")
decomp_size = int.from_bytes(CODE[R0 - 4 - VA0:R0 - VA0], "little")
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
src_start = R0 - comp_size
src = R0 - dest_off
dst_end = R0 + decomp_size

buf_base = VA0
buf = bytearray(dst_end - buf_base + 0x4000)
dst = dst_end - 1
bits = 0
ctrl = 0
while src > src_start:
    if bits == 0:
        ctrl = CODE[src - 1 - VA0]; src -= 1
        bits = 8
    bits -= 1
    if ((ctrl >> bits) & 1) == 0:
        buf[dst - buf_base] = CODE[src - 1 - VA0]; src -= 1
        dst -= 1
    else:
        hi = CODE[src - 1 - VA0]; src -= 1
        lo = CODE[src - 1 - VA0]; src -= 1
        off = (((hi << 8) | lo) & 0xFFF) + 2
        ln = hi + 0x20
        while ln >= 0:
            buf[dst - buf_base] = buf[dst + off - buf_base]
            dst -= 1
            ln -= 0x10

out_start = dst + 1
print(f"输出=[{out_start:#x},{dst_end:#x}) size={dst_end-out_start:#x}")

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
    for i in insns[:16]:
        print(f"  {i.address:#10x}  {i.mnemonic:8s} {i.op_str}")

# 1. 拷贝源区域
hexdump(0x020da9c0, 0x60)
hexdump(0x020db000, 0x60)
dis(0x020da9c0, 0x40, CS_MODE_THUMB)
dis(0x020da9c0, 0x40, CS_MODE_ARM)

# 2. 描述符表模式扫描
def u32(va):
    return int.from_bytes(bytes(buf[va - buf_base:va + 4 - buf_base]), "little")

def is_dst(w):
    return (0x02000000 <= w < 0x02400000) or (0x027e0000 <= w < 0x027f0000) or (0x01ff8000 <= w < 0x02000000)

print("\n== 描述符表候选 (连续≥2组 (dst,copy,zero)) ==")
cands = []
for va in range(out_start, dst_end - 24, 4):
    n = 0
    v = va
    while v + 12 <= dst_end:
        d = u32(v); c = u32(v + 4); z = u32(v + 8)
        if is_dst(d) and 0 < c < 0x80000 and z < 0x80000:
            n += 1
            v += 12
        else:
            break
    if n >= 2:
        cands.append(va)
for va in cands[:20]:
    parts = []
    v = va
    while v + 12 <= dst_end:
        d = u32(v); c = u32(v + 4); z = u32(v + 8)
        if is_dst(d) and 0 < c < 0x80000 and z < 0x80000:
            parts.append(f"({d:#x},{c:#x},{z:#x})")
            v += 12
        else:
            break
    print(f"  @ {va:#x}: " + " ".join(parts))
print(f"共 {len(cands)} 个候选起点")

# 3. BL 目标
print("\n== BL 目标反汇编 ==")
for tgt in (0x20116bc, 0x2011800, 0x201f974, 0x2024240, 0x2024c04, 0x2025374,
            0x2026844, 0x2026884, 0x2026b24, 0x2026b60):
    if out_start <= tgt < dst_end:
        w = u32(tgt)
        print(f"\n### 0x{tgt:x}  [0]=0x{w:08x}")
        dis(tgt, 0x14, CS_MODE_THUMB)
