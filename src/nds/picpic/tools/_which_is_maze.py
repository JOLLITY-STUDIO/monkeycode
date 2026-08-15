# -*- coding: utf-8 -*-
"""Determine which of fap/lap is the maze mode"""
from collections import Counter

print("=== FAP: house.fap full structure ===")
d = open('roms/extracted/fap_d/3100310_house.fap', 'rb').read()
print('size', len(d), 'h,w =', d[0], d[1])
h, w = d[0], d[1]

# Hypothesis 1: bit-packed walls (1 bit per cell)
body = d[2:]
need_bits = (h * w + 7) // 8
print('bit-pack: need %d bytes, have %d (after h,w)' % (need_bits, len(body)))

# Hypothesis 2: nibble per cell from offset 6
nib_expect = (h * w + 1) // 2
print('nibble: need %d bytes, have %d (after 6)' % (nib_expect, len(d) - 6))

# Hypothesis 3: 1 byte per cell from offset 6
print('byte: need %d, have %d' % (h * w, len(d) - 6))

# Try to find the grid body: search all offsets for a valid grid
for off in range(0, min(32, len(d))):
    rem = len(d) - off
    for mode in ['bit', 'nib', 'byte']:
        if mode == 'bit':
            need = (h * w + 7) // 8
        elif mode == 'nib':
            need = (h * w + 1) // 2
        else:
            need = h * w
        if rem == need:
            print('FOUND: offset=%d mode=%s' % (off, mode))

print()
print('=== FAP value structure (bytes) ===')
print('first 64 bytes:', list(d[:64]))

print()
print('=== LAP: value distribution (maze vs link-a-pix) ===')
# Link-a-pix: sparse numbers (2,3,4,5) + path
# Maze: walls are 0x00 or solid path
for fn in ['roms/extracted/lap_d/tutorial/tu_lap_00.lap',
           'roms/extracted/lap_d/1_dat/2000203_Coffee maker.lap',
           'roms/extracted/lap_d/3_dat/2104220_Lighthouse of Pharos.lap']:
    d = open(fn, 'rb').read()
    h, w = d[0], d[1]
    body = d[26:26 + h * w]
    c = Counter(body)
    print(fn.split('/')[-1], 'h,w =', h, ',', w)
    print('  value counts:', sorted(c.items())[:40])
