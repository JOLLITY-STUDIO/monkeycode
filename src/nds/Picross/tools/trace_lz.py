#!/usr/bin/env python3
"""手动追踪 LZ 压缩流的前若干 token，验证解码逻辑。"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def main():
    r0 = 0x02080da8
    comp_end = r0 - VA0
    hdr = CODE[comp_end-8:comp_end]
    r1 = int.from_bytes(hdr[0:4], "little")
    r2 = int.from_bytes(hdr[4:8], "little")
    dest_off = r1 >> 24
    comp_size = r1 & 0xFFFFFF
    decomp_size = r2
    src_start = comp_end - comp_size
    src = comp_end - dest_off - 1
    dst_end = comp_end + decomp_size
    dst = dst_end - 1
    print(f"r0={r0:#x} comp_end={comp_end:#x} dest_off={dest_off} comp_size={comp_size:#x} "
          f"decomp_size={decomp_size:#x}")
    print(f"src_start={src_start:#x} src_first={src:#x} dst_end={dst_end:#x} dst_first={dst:#x}")

    # 打印压缩流尾部（= 最先读取的部分）前 24 字节
    print("压缩流末尾 32 字节（读取顺序从后往前）:")
    for i in range(comp_end - dest_off - 32, comp_end - dest_off):
        print(f"  [{i:#x}] = {CODE[i]:02x}")

    # 手动解码前 10 个 token
    bits = 0
    ctrl = 0
    print("\n== 前 12 个 token ==")
    for t in range(12):
        if bits == 0:
            ctrl = CODE[src]; src -= 1
            bits = 8
            print(f"  ctrl byte={ctrl:02x} @ next_src={src+1:#x}")
        bits -= 1
        if (ctrl >> bits) & 1 == 0:
            b = CODE[src]; src -= 1
            print(f"  token{t}: LIT  b={b:02x} -> dst={dst:#x} (out_val={b:02x})")
            dst -= 1
        else:
            hi = CODE[src]; src -= 1
            lo = CODE[src]; src -= 1
            off = ((hi << 8) | lo) & 0xFFF
            off += 2
            ln = hi + 0x20
            cnt = 0
            while ln > 0:
                cnt += 1
                ln -= 0x10
            print(f"  token{t}: REF  hi={hi:02x} lo={lo:02x} off={off} count={cnt} -> dst={dst:#x}")
            for _ in range(cnt):
                dst -= 1

if __name__ == "__main__":
    main()
