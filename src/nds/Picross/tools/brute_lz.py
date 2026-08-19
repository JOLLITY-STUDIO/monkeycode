#!/usr/bin/env python3
"""暴力搜索 LZ 解码参数，目标：0x020db040 处出现合法描述符 (dest,len,fill)。
参数空间：header 字段序 x2, 反引用计数 x2, hi/lo 顺序 x2, offset 掩码 x2"""
import os, itertools

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
comp_end = R0 - VA0
v8 = int.from_bytes(CODE[comp_end-8:comp_end-4], "little")   # [r0-8]
v4 = int.from_bytes(CODE[comp_end-4:comp_end], "little")     # [r0-4]

def decompress(packed_val, dec_val, hi_lo_swap, count_ge0, mask_0xfff):
    dest_off = packed_val >> 24
    comp_size = packed_val & 0xFFFFFF
    decomp_size = dec_val
    src_start = comp_end - comp_size
    src = comp_end - dest_off - 1
    dst_end_va = VA0 + comp_end + decomp_size
    buf = bytearray(dst_end_va - VA0 + 0x20000)
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
            a = CODE[src]; src -= 1
            b = CODE[src]; src -= 1
            hi, lo = (b, a) if hi_lo_swap else (a, b)
            off = ((hi << 8) | lo) & (0xFFF if mask_0xfff else 0xFFFF)
            off += 2
            ln = hi + 0x20
            while (ln >= 0) if count_ge0 else (ln > 0):
                src_idx = dst + off - VA0
                if 0 <= src_idx < len(buf):
                    buf[dst - VA0] = buf[src_idx]
                dst -= 1
                ln -= 0x10
    return buf, dst + 1, dst_end_va

def is_ram(a):
    return 0x02000000 <= a < 0x02400000

def score(buf, start, end):
    """统计 0x020db040 附近连续合法描述符"""
    best = 0; best_va = 0; best_descs = []
    for va in range(0x020db000, 0x020db058, 4):
        cnt = 0; descs = []
        for i in range(0, 0x18, 4):
            d = int.from_bytes(bytes(buf[va+i-VA0:va+i+4-VA0]), "little")
            l = int.from_bytes(bytes(buf[va+i+4-VA0:va+i+8-VA0]), "little")
            f = int.from_bytes(bytes(buf[va+i+8-VA0:va+i+12-VA0]), "little")
            if is_ram(d) and 0 < l < 0x200000 and f < 0x20000:
                cnt += 1; descs.append((d, l, f))
        if cnt > best:
            best = cnt; best_va = va; best_descs = descs
    return best, (best_va, best_descs)

configs = [
    ("A:r1=[r0-8]packed,r2=[r0-4]dec", v8, v4),
    ("B:r1=[r0-4]packed,r2=[r0-8]dec", v4, v8),
]
best_overall = (0, None, None)
for name, packed_val, dec_val in configs:
    if dec_val > 0x8000000:
        print(f"[{name}] decomp_size={dec_val:#x} 超界跳过")
        continue
    for hl in (False, True):
        for ge0 in (True, False):
            for m in (True, False):
                buf, st, en = decompress(packed_val, dec_val, hl, ge0, m)
                sc, (va, descs) = score(buf, st, en)
                if sc > 0:
                    print(f"[{name}] hi_lo_swap={hl} count_ge0={ge0} mask={m}: "
                          f"score={sc} @{va:#x} descs={[f'({d:#x},{l:#x},{f:#x})' for d,l,f in descs[:4]]}")
                if sc > best_overall[0]:
                    best_overall = (sc, (name, hl, ge0, m), (va, descs))
print(f"\n最佳: score={best_overall[0]}")
