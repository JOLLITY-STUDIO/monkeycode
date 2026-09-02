#!/usr/bin/env python3
"""Disassemble MaxMod SSEQ tracks using a candidate command table.

Notes: KEY VEL DUR (3 bytes). Commands take fixed arg counts. We parse each
track from its start and report alignment errors (dead bytes) at the end.
"""
import os
import sys

SDAT_DIR = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')

# command -> (arg_count, name). args follow the command byte.
CMD = {
    0x80: (1, 'rest'),
    0x81: (1, 'instrument'),
    0x82: (1, 'pan'),
    0x83: (1, 'volume'),
    0x84: (1, 'mainvol'),
    0x85: (1, 'transpose'),
    0x86: (2, 'pitchbend'),
    0x87: (1, 'pitchrange'),
    0x88: (1, 'priority'),
    0x89: (1, 'mono'),
    0x8a: (1, 'tie'),
    0x8b: (1, 'tempo'),
    0x8c: (2, 'sweep'),
    0x8d: (1, 'loopstart'),
    0x8e: (0, 'loopend'),
    0x8f: (3, 'jump'),
    0x90: (3, 'call'),
    0x91: (0, 'ret'),
    0x92: (0, 'end'),
    0x93: (4, 'track'),
    0x94: (1, 'tuning'),
    0x95: (3, 'call24'),
    0xc0: (1, 'c0'),
    0xc1: (1, 'c1'),
    0xc2: (1, 'c2'),
    0xc3: (1, 'c3'),
    0xc4: (1, 'c4'),
    0xc5: (1, 'c5'),
    0xc6: (1, 'c6'),
    0xc7: (1, 'c7'),
    0xc8: (1, 'c8'),
    0xc9: (1, 'c9'),
    0xca: (1, 'ca'),
    0xcb: (1, 'cb'),
    0xcc: (1, 'cc'),
    0xcd: (1, 'cd'),
    0xd5: (1, 'd5'),
    0xe1: (2, 'e1'),
    0xe6: (2, 'e6'),
    0xfd: (0, 'fd'),
    0xff: (0, 'ff'),
}


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


def disasm(fname, verbose=False):
    d = open(os.path.join(SDAT_DIR, fname), 'rb').read()
    start, entries, t0 = parse_tracks(d)
    offs = {0: t0}
    for t, o in entries:
        offs[t] = o
    ok = True
    for t in sorted(offs):
        off = offs[t]
        i = off
        n = 0
        while i < len(d):
            b = d[i]
            if b < 0x80:
                if i + 3 > len(d):
                    print(f'  {fname} track {t}: NOTE truncated @ {i:x}')
                    ok = False
                    break
                if verbose:
                    print(f'    {i:04x}: NOTE k={d[i]:02x} v={d[i+1]:02x} d={d[i+2]:02x}')
                i += 3
            else:
                info = CMD.get(b)
                if info is None:
                    print(f'  {fname} track {t}: UNKNOWN cmd {b:02x} @ {i:x} (prev ctx ok)')
                    ok = False
                    break
                argc, name = info
                if i + 1 + argc > len(d):
                    print(f'  {fname} track {t}: {name} truncated @ {i:x}')
                    ok = False
                    break
                args = d[i + 1:i + 1 + argc]
                if verbose:
                    print(f'    {i:04x}: {name:10s} ' + ' '.join(f'{a:02x}' for a in args))
                i += 1 + argc
            n += 1
            if n > 50000:
                print(f'  {fname} track {t}: runaway @ {i:x}')
                ok = False
                break
        if i != len(d) and i < len(d):
            print(f'  {fname} track {t}: leftover bytes @ {i:x} (parsed to end={len(d):x})')
            ok = False
    return ok


def main():
    files = sys.argv[1:] or sorted(f for f in os.listdir(SDAT_DIR) if f.endswith('.sseq'))
    for f in files:
        print(f'== {f}')
        disasm(f, verbose=('-v' in sys.argv))


if __name__ == '__main__':
    main()
