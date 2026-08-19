#!/usr/bin/env python3
"""实现 ARM9 引导区的 LZ 解压器，解出真实游戏代码/数据镜像。

算法（逆向自 0x2000950）：
- 输入：r0 指向压缩块末尾；[r0-8] = (dest_off<<24)|comp_size, [r0-4] = decomp_size
- 压缩块位于 [r0 - comp_size, r0)，从后往前读（读指针 r3 递减，直到 r3 <= src_start）
- 输出从 [r0 + decomp_size) 从后往前写（写指针 r2 递减，无固定下界）
- 控制字节从高位(bit7)到低位(bit0)：0=字面字节，1=反向引用
  - 反向引用：读 2 字节 [hi:lo]，offset = ((hi<<8)|lo) & 0xFFF + 2，长度循环 hi+0x20 步进 -0x10
"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def lz_decompress(r0):
    comp_end = r0 - VA0
    hdr = CODE[comp_end-8:comp_end]
    r1 = int.from_bytes(hdr[0:4], "little")
    r2 = int.from_bytes(hdr[4:8], "little")
    dest_off = r1 >> 24
    comp_size = r1 & 0xFFFFFF
    decomp_size = r2
    src_start = comp_end - comp_size             # 输入下限（文件偏移）= r0-comp_size
    src = comp_end - dest_off - 1                # 输入读指针起始（文件偏移）= r0-dest_off-1
    dst_end_va = VA0 + comp_end + decomp_size  # 输出写指针起始（VA）
    dst = dst_end_va - 1               # 输出写指针（VA）

    # 固定基址大缓冲区：覆盖 [0x2000000, dst_end_va)
    buf_base = VA0
    buf = bytearray(dst_end_va - buf_base + 0x1000)

    bits = 0
    ctrl = 0
    n_ins = 0
    while src >= src_start:
        if bits == 0:
            ctrl = CODE[src]; src -= 1
            bits = 8
        bits -= 1
        if (ctrl >> bits) & 1 == 0:
            buf[dst - buf_base] = CODE[src]
            src -= 1
            dst -= 1
        else:
            hi = CODE[src]; src -= 1
            lo = CODE[src]; src -= 1
            offset = ((hi << 8) | lo) & 0xFFF
            offset += 2
            length = hi + 0x20
            while length > 0:
                buf[dst - buf_base] = buf[dst + offset - buf_base]
                dst -= 1
                length -= 0x10
        n_ins += 1
    out_start = dst + 1
    out_size = dst_end_va - out_start
    out = bytes(buf[out_start - buf_base: dst_end_va - buf_base])
    print(f"comp_size={comp_size:#x} decomp_size={decomp_size:#x} "
          f"out=[{out_start:#x},{dst_end_va:#x}) out_size={out_size:#x} tokens={n_ins}")
    return out, out_start, dst_end_va

if __name__ == "__main__":
    data, base, end = lz_decompress(0x02080da8)
    outpath = os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin")
    open(outpath, "wb").write(data)
    print("saved", outpath, "size", hex(len(data)), "base_va", hex(base))
