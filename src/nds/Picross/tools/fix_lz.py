#!/usr/bin/env python3
"""严格镜像汇编的 LZ 解压器（带诊断），验证输出字节数是否等于 decomp_size。"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0

# ---- 头部：ldmdb r0, {r1, r2} 的两种解读 ----
print("== 头部解读验证 ==")
v_8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")
v_4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")
print(f"  [r0-8]={v_8:#010x}  [r0-4]={v_4:#010x}")

# 解读 A: r1=[r0-8] packed, r2=[r0-4] decomp_size   (当前 Python)
# 解读 B: r1=[r0-4], r2=[r0-8]                        (ldmdb 教科书语义)
for name, r1, r2 in (("A(r1=[r0-8])", v_8, v_4), ("B(r1=[r0-4])", v_4, v_8)):
    dest_off = r1 >> 24
    comp_size = r1 & 0xFFFFFF
    decomp_size = r2
    print(f"  {name}: dest_off={dest_off:#x} comp_size={comp_size:#x} decomp_size={decomp_size:#x} "
          f"input=[{R0-comp_size:#x},{R0:#x}) output_end={R0+decomp_size:#x}")

# ---- 用解读 A 跑一次（带计数）----
def decompress(r1val, r2val, label):
    dest_off = r1val >> 24
    comp_size = r1val & 0xFFFFFF
    decomp_size = r2val
    src_start = comp_end - comp_size          # 文件偏移
    src = comp_end - dest_off - 1
    dst_end_va = VA0 + comp_end + decomp_size
    buf = bytearray(dst_end_va - VA0 + 0x1000)
    buf_base = VA0
    dst = dst_end_va - 1
    bits = 0; ctrl = 0
    n_tok = 0; n_lit = 0; n_ref = 0; out = 0
    reads = 0
    while src >= src_start:
        if bits == 0:
            ctrl = CODE[src]; src -= 1; reads += 1
            bits = 8
        bits -= 1
        if (ctrl >> bits) & 1 == 0:
            buf[dst - buf_base] = CODE[src]; src -= 1; reads += 1
            dst -= 1; out += 1; n_lit += 1
        else:
            hi = CODE[src]; src -= 1; reads += 1
            lo = CODE[src]; src -= 1; reads += 1
            offset = ((hi << 8) | lo) & 0xFFF
            offset += 2
            ln = hi + 0x20
            # 汇编: subs ip,#0x10; bge → 循环条件 ip>=0
            while ln >= 0:
                buf[dst - buf_base] = buf[dst + offset - buf_base]
                dst -= 1; out += 1
                ln -= 0x10
            n_ref += 1
        n_tok += 1
    out_start = dst + 1
    print(f"\n[{label}] tokens={n_tok} lit={n_lit} ref={n_ref} reads={reads} "
          f"expected_reads={comp_size-dest_off}")
    print(f"  out=[{out_start:#x},{dst_end_va:#x}) out_size={out:#x}  (decomp_size={decomp_size:#x})")
    ok = (out == decomp_size)
    print(f"  out==decomp_size: {ok}")
    return buf, out_start, dst_end_va, ok

bufA, stA, enA, okA = decompress(v_8, v_4, "A")
# 若 A 不匹配，试 B
if not okA:
    bufB, stB, enB, okB = decompress(v_4, v_8, "B")
    if okB:
        print("\n>>> 解读 B 正确！", end=" ")
        buf, st, en = bufB, stB, enB
    else:
        print("\n>>> 两种解读都不匹配，需要进一步分析")
        buf, st, en = bufA, stA, enA
else:
    buf, st, en = bufA, stA, enA

# 检查描述符表（在输出区域内 0x020db040）
desc_va = 0x020db040
if st <= desc_va < en:
    print(f"\n== 描述符表 @ 0x020db040 (解读={'A' if okA else 'B'}) ==")
    for i in range(0, 0x18, 4):
        w = int.from_bytes(bytes(buf[desc_va+i-VA0:desc_va+i+4-VA0]), "little")
        print(f"  [0x{desc_va+i:#x}] = {w:#010x}")
