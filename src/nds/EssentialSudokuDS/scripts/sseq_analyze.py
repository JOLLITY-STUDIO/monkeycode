#!/usr/bin/env python3
"""Analyze MaxMod SSEQ files: dump track layout + command byte statistics."""
import os
import sys
import struct
from collections import Counter

SDAT_DIR = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')


def parse_tracks(d):
    """Find the track pointer table. It is a sequence of '93 <t> <off24le>' entries
    located right after the header. Track 0 = first byte after the table."""
    # scan for a run of 93 entries
    for start in range(0x1A, 0x30):
        i = start
        entries = []
        while i + 5 <= len(d) and d[i] == 0x93:
            t = d[i + 1]
            rel = int.from_bytes(d[i + 2:i + 5], 'little')
            entries.append((t, 0x1C + rel))
            i += 5
        if len(entries) >= 2:
            # validate: track numbers ascending consecutive
            ts = [e[0] for e in entries]
            if ts == list(range(ts[0], ts[0] + len(ts))):
                t0 = i  # track 0 starts right after table
                return start, entries, t0
    return None, [], None


def main():
    files = sorted(f for f in os.listdir(SDAT_DIR) if f.endswith('.sseq'))
    for f in files:
        path = os.path.join(SDAT_DIR, f)
        d = open(path, 'rb').read()
        fsize = struct.unpack_from('<I', d, 8)[0]
        hsize = struct.unpack_from('<H', d, 12)[0]
        nblocks = struct.unpack_from('<H', d, 14)[0]
        bsize = struct.unpack_from('<I', d, 20)[0]
        numtracks_field = struct.unpack_from('<H', d, 24)[0]
        start, entries, t0 = parse_tracks(d)
        print(f'== {f} size={fsize} hdr={hsize} blocks={nblocks} datasize={bsize} numTracksField={numtracks_field}')
        if entries:
            print(f'   table@{start:#x} tracks={entries} track0@{t0:#x}')
            for t, off in entries:
                tail = d[off:off + 24]
                print(f'     track {t} @ {off:#x}: {tail.hex(" ")}')
            print(f'     track 0 @ {t0:#x}: {d[t0:t0+32].hex(" ")}')
        # byte histogram in DATA area (after track0)
        cnt = Counter(d[0x30:])
        top = [f'{b:02x}:{n}' for b, n in cnt.most_common(20)]
        print('   top bytes:', ' '.join(top))
        print()


if __name__ == '__main__':
    main()
