#!/usr/bin/env python3
"""Verify SSAR record layout + embedded SSEQ data (Essential Sudoku DS)."""
import os
import struct

BASE = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')


def main():
    d = open(os.path.join(BASE, '09_ssar.bin'), 'rb').read()
    print(f'SSAR total {len(d)} bytes')
    print('hdr:', d[0:0x40].hex(' '))
    nDataOff = struct.unpack_from('<I', d, 0x18)[0]
    nRec = struct.unpack_from('<I', d, 0x1C)[0]
    print(f'nDataOffset={nDataOff:#x} nRecords={nRec}')
    print()
    for i in range(min(nRec, 30)):
        base = 0x20 + i * 12
        noff, bnk, vol, cpr, ppr, ply, rsv = struct.unpack_from('<IHBBBBH', d, base)
        abs_off = noff + nDataOff
        print(f'  rec[{i:2d}]: nOffset={noff:#6x} abs={abs_off:#6x} bnk={bnk} '
              f'vol={vol} cpr={cpr} ppr={ppr} ply={ply} rsv={rsv}')
        # peek first bytes of embedded sequence
        seg = d[abs_off:abs_off + 24]
        print(f'          data: {seg.hex(" ")}')


if __name__ == '__main__':
    main()
