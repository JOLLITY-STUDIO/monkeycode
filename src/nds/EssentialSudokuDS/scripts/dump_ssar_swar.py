#!/usr/bin/env python3
"""Dump SSAR + SWAR raw bytes to figure out their real layouts."""
import os

BASE = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')


def dump(fname, limit=0x200, off=0):
    p = os.path.join(BASE, fname)
    d = open(p, 'rb').read()
    print(f'===== {fname} size={len(d)}')
    for i in range(off, min(len(d), off + limit), 16):
        chunk = d[i:i + 16]
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print(f'{i:04x}: {chunk.hex(" "):<47} {asc}')
    print()


if __name__ == '__main__':
    dump('09_ssar.bin', 0x300)
    dump('12_swar.swar', 0x400)
    dump('13_swar.swar', 0x400)
