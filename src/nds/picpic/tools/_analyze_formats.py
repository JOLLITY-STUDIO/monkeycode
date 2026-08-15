# -*- coding: utf-8 -*-
"""Analyze fap/lap formats to determine gameplay"""

def analyze_fap():
    print("=== FAP format analysis ===")
    # house.fap 20x20
    d = open('roms/extracted/fap_d/3100310_house.fap', 'rb').read()
    print('house.fap size', len(d), 'h,w =', d[0], d[1])
    h, w = d[0], d[1]
    # Try nibble format: body = data[6:], each cell = 4bit
    body = d[6:]
    expect_nibble = (h * w + 1) // 2
    print('body len', len(body), 'nibble expect', expect_nibble, 'match:', len(body) == expect_nibble)
    if len(body) == expect_nibble:
        vals = []
        for i in range(h * w):
            b = body[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            vals.append(n)
        print('unique nibble values:', sorted(set(vals)))
        for y in range(h):
            print(''.join('%x' % vals[y * w + x] for x in range(w)))
    else:
        # Try 1 byte per cell (like lap)
        body2 = d[6:6 + h * w]
        if len(body2) == h * w:
            print('1-byte per cell unique:', sorted(set(body2)))
        # Show value distribution
        from collections import Counter
        c = Counter(d[6:])
        print('byte value counts (top 20):', c.most_common(20))

def analyze_lap_numbers():
    print("\n=== LAP: check for paired numbers (Link-a-Pix feature) ===")
    import os, collections
    # Check a tutorial and a real lap file for number pairs
    for fn in ['roms/extracted/lap_d/tutorial/tu_lap_00.lap',
               'roms/extracted/lap_d/1_dat/2000203_Coffee maker.lap']:
        d = open(fn, 'rb').read()
        h, w = d[0], d[1]
        body = d[26:26 + h * w]
        c = collections.Counter(body)
        print(fn.split('/')[-1], 'h,w =', h, w)
        print('  value counts:', sorted(c.items())[:30])

def analyze_map_values():
    print("\n=== MAP nibble grid value distribution ===")
    import collections, glob
    c = collections.Counter()
    for fn in glob.glob('roms/extracted/map_d/*.map')[:10]:
        d = open(fn, 'rb').read()
        h, w = d[0], d[1]
        body = d[6:6 + (h * w + 1) // 2]
        for i in range(h * w):
            b = body[i >> 1]
            n = (b >> 4) if (i & 1) else (b & 0x0F)
            c[n] += 1
    print('  value distribution:', sorted(c.items()))

analyze_fap()
analyze_lap_numbers()
analyze_map_values()
