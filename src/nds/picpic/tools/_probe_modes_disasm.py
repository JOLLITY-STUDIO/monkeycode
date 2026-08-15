# -*- coding: utf-8 -*-
"""Probe: search disasm + ARM9 binary for map/lap/fap mode evidence."""
import os, re, sys

BASE = os.path.dirname(os.path.abspath(__file__))
DIS = os.path.join(BASE, 'arm9-full.dis.txt')
OUT = os.path.join(BASE, '_mode_report.txt')

lines = open(DIS, encoding='utf-8', errors='replace').read().splitlines()
print('disasm lines:', len(lines))

hits = []

# 1) key routines addresses (case-insensitive)
addr_keys = ['2055bc8', '2053bf4', '205418c', '205113c', '200ba4']
for i, ln in enumerate(lines):
    low = ln.lower()
    for k in addr_keys:
        if k in low:
            hits.append((i, k, ln[:200]))
            break

# 2) mode strings
str_keys = ['map_comp', 'lap_comp', 'fap_comp', 'map_d', 'lap_d', 'fap_d',
            'map', 'lap', 'fap', 'MAP', 'LAP', 'FAP']
for i, ln in enumerate(lines):
    if re.search(r'\b(map|lap|fap)\b', ln, re.IGNORECASE) and ';' in ln:
        hits.append((i, 'STR', ln[:200]))

with open(OUT, 'w', encoding='utf-8') as f:
    for i, tag, txt in hits:
        f.write(f'{i+1}\t{tag}\t{txt}\n')

print('hits:', len(hits))
print('written ->', OUT)
