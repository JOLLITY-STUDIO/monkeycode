#!/usr/bin/env python3
"""Count all command-byte candidates (>=0x80) and their contexts in SSEQ files."""
import os
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


def main():
    files = sorted(f for f in os.listdir(SDAT_DIR) if f.endswith('.sseq'))
    allcnt = Counter()
    per = {}
    for fname in files:
        d = open(os.path.join(SDAT_DIR, fname), 'rb').read()
        start, entries, t0 = parse_tracks(d)
        offs = {0: t0}
        for t, o in entries:
            offs[t] = o
        cnt = Counter()
        for t, off in offs.items():
            for i in range(off, len(d)):
                b = d[i]
                if b >= 0x80:
                    cnt[b] += 1
        per[fname] = cnt
        allcnt.update(cnt)
        top = ' '.join(f'{b:02x}:{n}' for b, n in cnt.most_common())
        print(f'{fname}: {top}')
    print()
    print('ALL:')
    for b, n in allcnt.most_common():
        print(f'  {b:02x}: {n}')


if __name__ == '__main__':
    main()
