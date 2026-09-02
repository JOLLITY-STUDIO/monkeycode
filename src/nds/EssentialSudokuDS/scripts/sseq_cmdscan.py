#!/usr/bin/env python3
"""Scan SSEQ tracks for all command bytes (>=0x80) with context.

Assumes: notes are KEY VEL DUR (3 bytes), 0x80 = rest+1. Unknown commands get
their bytes skipped conservatively: we resync after each command by scanning
for the next note/rest. We print every byte >= 0x80 found, with surrounding
context, so we can infer the command table by eye.
"""
import os
import sys
from collections import Counter

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


def scan(fname):
    d = open(os.path.join(SDAT_DIR, fname), 'rb').read()
    start, entries, t0 = parse_tracks(d)
    offs = {0: t0}
    for t, o in entries:
        offs[t] = o
    print(f'===== {fname} tracks={sorted(offs)}')
    counter = Counter()
    for t in sorted(offs):
        off = offs[t]
        end = len(d)
        i = off
        cmds = []
        while i < end:
            b = d[i]
            if b < 0x80:
                # note: KEY VEL DUR
                i += 3
                continue
            if b == 0x80:
                counter[b] += 1
                cmds.append(f'@{i:x} 80 d={d[i+1]:02x}')
                i += 2
                continue
            # other command - try to infer arg count from next byte
            counter[b] += 1
            nxt = d[i + 1] if i + 1 < end else 0
            cmds.append(f'@{i:x} {b:02x} nxt={nxt:02x}')
            i += 1
        print(f'  track {t}:')
        for c in cmds:
            print('    ' + c)
    print()


if __name__ == '__main__':
    for f in sys.argv[1:]:
        scan(f)
