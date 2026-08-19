#!/usr/bin/env python3
"""暴力枚举 BLZ 解码变体，寻找能产出合法描述符表/正确大小的组合。
- 增量写日志 tools/brute_lz2.log
- 每个变体带步数上限防挂起
"""
import os
import sys
import time
import itertools

BASE = os.path.dirname(os.path.abspath(__file__))
LOG = os.path.join(BASE, "brute_lz2.log")
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
packed = int.from_bytes(CODE[R0 - 8 - VA0:R0 - 4 - VA0], "little")
decomp_size = int.from_bytes(CODE[R0 - 4 - VA0:R0 - VA0], "little")
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF

SRC_LO = R0 - comp_size          # 输入下限 (VA)
SRC_HI = R0                      # 输入上限 (VA)
DST_END = R0 + decomp_size       # 输出终点 (VA)
BUF_BASE = 0x02000000
BUF = bytearray(DST_END - BUF_BASE + 0x8000)

# 用与 VA 对齐的数组，避免每次 -BUF_BASE
OUT0 = DST_END - BUF_BASE  # 输出终点在 buf 中的下标
MAXSTEPS = 8_000_000


def log(msg):
    with open(LOG, "a") as f:
        f.write(msg + "\n")
    print(msg, flush=True)


def is_ok_dst(w):
    return (0x02000000 <= w < 0x02400000) or (0x027e0000 <= w < 0x02800000) or (0x01ff8000 <= w < 0x02000000)


def check_desc(buf):
    """0x020db040 处 2 组描述符 (dst,copy,zero) 是否合法"""
    def u32(idx):
        return int.from_bytes(bytes(buf[idx:idx + 4]), "little")
    try:
        for i in (0, 12):
            base = 0x020db040 - BUF_BASE + i
            d = u32(base)
            c = u32(base + 4)
            z = u32(base + 8)
            if not is_ok_dst(d) or not (0 < c < 0x100000) or not (z < 0x100000):
                return False
        return True
    except Exception:
        return False


def decompress(bl, pol, lg, oa, sr, sd):
    buf = BUF
    buf[:] = bytes(len(buf))
    src = SRC_HI - (dest_off if sd else 0)
    dst = OUT0 - 1
    bits = 0
    ctrl = 0
    steps = 0
    n_lit = 0
    n_ref = 0
    n_cpy = 0
    try:
        while src > SRC_LO:
            if bits == 0:
                ctrl = CODE[src - 1 - VA0]; src -= 1
                bits = 8
            bits -= 1
            bit = (ctrl >> bits) & 1 if not bl else (ctrl >> (7 - bits)) & 1
            is_ref = bit == 1 if pol else bit == 0
            if not is_ref:
                buf[dst] = CODE[src - 1 - VA0]; src -= 1
                dst -= 1
                n_lit += 1
            else:
                a = CODE[src - 1 - VA0]; src -= 1
                b = CODE[src - 1 - VA0]; src -= 1
                hi, lo = (b, a) if sr else (a, b)
                off = ((hi << 8) | lo) & 0xFFF
                if oa:
                    off += 2
                ln = hi + 0x20
                if lg:
                    while ln >= 0:
                        buf[dst] = buf[dst + off]
                        dst -= 1
                        ln -= 0x10
                        n_cpy += 1
                else:
                    while ln > 0:
                        buf[dst] = buf[dst + off]
                        dst -= 1
                        ln -= 0x10
                        n_cpy += 1
                n_ref += 1
            steps += 1
            if steps > MAXSTEPS:
                return ("LOOP", dst, n_lit, n_ref)
    except IndexError:
        return ("IDX", dst, n_lit, n_ref)
    out_start = dst + 1
    out_size = OUT0 - out_start
    ok_size = (out_size == decomp_size)
    ok_desc = check_desc(buf)
    return ("DONE", out_start, out_size, ok_size, ok_desc, n_lit, n_ref, n_cpy)


def main():
    if os.path.exists(LOG):
        os.remove(LOG)
    variants = list(itertools.product([False, True], repeat=6))
    log(f"== brute_lz2 start {time.strftime('%H:%M:%S')} ==")
    log(f"comp_size={comp_size:#x} dest_off={dest_off:#x} decomp_size={decomp_size:#x} "
        f"src=[{SRC_LO:#x},{SRC_HI:#x}) dst_end={DST_END:#x}")
    hits = []
    t0 = time.time()
    for i, (bl, pol, lg, oa, sr, sd) in enumerate(variants):
        res = decompress(bl, pol, lg, oa, sr, sd)
        tag = res[0]
        if tag == "DONE":
            _, out_start, out_size, ok_size, ok_desc, n_lit, n_ref, n_cpy = res
            if ok_size or ok_desc:
                hits.append((bl, pol, lg, oa, sr, sd, out_size, ok_size, ok_desc, out_start))
                log(f"HIT[{i}] bl={bl} pol={pol} lg={lg} oa={oa} sr={sr} sd={sd} "
                    f"size={out_size:#x} ok_size={ok_size} ok_desc={ok_desc} start={out_start:#x}")
        elif tag == "LOOP":
            log(f"loop[{i}] bl={bl} pol={pol} lg={lg} oa={oa} sr={sr} sd={sd} res={res}")
        if (i + 1) % 8 == 0:
            log(f"... {i + 1}/64 done ({time.time() - t0:.1f}s)")
    log(f"== 共 {len(hits)} 个命中 ==")
    if not hits:
        log("无命中；输出大小分布：")
        sizes = {}
        for (bl, pol, lg, oa, sr, sd) in variants:
            res = decompress(bl, pol, lg, oa, sr, sd)
            if res and res[0] == "DONE":
                sizes.setdefault(res[2], []).append((bl, pol, lg, oa, sr, sd))
        for s, vs in sorted(sizes.items())[:12]:
            log(f"  size={s:#x} n={len(vs)} 例={vs[0]}")


if __name__ == "__main__":
    main()
