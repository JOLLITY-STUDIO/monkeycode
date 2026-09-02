#!/usr/bin/env python3
"""Extract SSEQ / SSAR / SBNK / SWAR sections from GBATEK via anchor names."""
import os
import re

BASE = os.path.join(os.path.dirname(__file__), '..', 'work')
SRC = os.path.join(BASE, 'gbatek.htm')

# anchor -> output file (section start anchors)
ANCHORS = {
    'dssoundfilessseqsoundsequence': 'gbatek_SSEQ.txt',
    'dssoundfilesssarsoundsequencearchive': 'gbatek_SSAR.txt',
    'dssoundfilessbnksoundbank': 'gbatek_SBNK.txt',
    'dssoundfilesswarsoundwavearchive': 'gbatek_SWAR.txt',
}


def clean(seg):
    seg = re.sub(r'<[^>]+>', ' ', seg)
    for a, b in [('&nbsp;', ' '), ('&lt;', '<'), ('&gt;', '>'), ('&amp;', '&'),
                 ('&#x00C1;', ' '), ('&#x00E9;', 'e')]:
        seg = seg.replace(a, b)
    seg = re.sub(r'[ \t]+', ' ', seg)
    return '\n'.join(l.strip() for l in seg.split('\n') if l.strip())


def main():
    d = open(SRC, 'rb').read().decode('latin-1')
    # list all section anchors in order
    anchors = sorted(
        ((m.start(), m.group(1)) for m in re.finditer(r'NAME="(dssoundfiles[^"]+)"', d)))
    for pos, name in anchors:
        print(f'{pos}: {name}')
    print('---')
    for anchor, out in ANCHORS.items():
        start = d.find(f'NAME="{anchor}"')
        if start < 0:
            print(f'anchor {anchor} not found')
            continue
        # next section anchor after this one
        nxt = len(d)
        for pos, name in anchors:
            if pos > start and pos < nxt:
                nxt = pos
        seg = d[start:nxt]
        with open(os.path.join(BASE, out), 'w', encoding='utf-8') as f:
            f.write(clean(seg))
        print(f'{out}: {nxt - start} bytes')


if __name__ == '__main__':
    main()
