#!/usr/bin/env python3
"""Dump full byte streams of each track in a SSEQ file for manual analysis."""
import os
import sys

SDAT_DIR = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')


def parse_tracks(d):
    for start in range(0x1A, 0x30):
        i = start
        entries = []
        while i + 5 <= len(d) and d[i] == 0x93:
            t = d[i + 1]
            rel = int.from_bytes(d[i + 2:i + 5], 'little')
            entries.append((t, 0x1C + rel))
            i += 5
        if len(entries) >= 2:
            ts = [e[0] for e in entries]
            if ts == list(range(ts[0], ts[0] + len(ts))):
                return start, entries, i
    return None, [], None


def dump(fname, maxlen=0x100000):
    d = open(os.path.join(SDAT_DIR, fname), 'rb').read()
    start, entries, t0 = parse_tracks(d)
    print(f'===== {fname} size={len(d)} tracks={[(t, hex(o)) for t, o in entries]} t0@{hex(t0)}')
    offs = {0: t0}
    for t, o in entries:
        offs[t] = o
    for t in sorted(offs):
        off = offs[t]
        end = min(len(d), off + maxlen)
        body = d[off:end]
        print(f'--- track {t} @ {off:#x} len={len(body)}')
        for i in range(0, len(body), 16):
            chunk = body[i:i + 16]
            ascii_ = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
            print(f'  {off+i:04x}: {chunk.hex(" "):<47} {ascii_}')
        print()


if __name__ == '__main__':
    for f in sys.argv[1:]:
        dump(f)
