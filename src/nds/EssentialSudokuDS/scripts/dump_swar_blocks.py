#!/usr/bin/env python3
"""Analyze SWAR sample block headers by dumping block boundaries."""
import os
import struct

BASE = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')


def blocks(fname):
    d = open(os.path.join(BASE, fname), 'rb').read()
    n = struct.unpack_from('<I', d, 0x38)[0]
    offs = [struct.unpack_from('<I', d, 0x3C + i * 4)[0] for i in range(n)]
    print(f'== {fname} n={n}')
    for i, o in enumerate(offs):
        end = offs[i + 1] if i + 1 < n else len(d)
        hdr = d[o:o + 0x20]
        print(f'  block {i}: off={o:#x} end={end:#x} size={end - o} hdr={hdr.hex(" ")}')
        # try standard SWAV interpretation
        if o + 0x10 <= len(d):
            typ, rate, loop, size = struct.unpack_from('<IIII', d, o)
            print(f'    swav-interp: type={typ} rate={rate} loop={loop} size={size}')


if __name__ == '__main__':
    for f in ('12_swar.swar', '13_swar.swar'):
        blocks(f)
