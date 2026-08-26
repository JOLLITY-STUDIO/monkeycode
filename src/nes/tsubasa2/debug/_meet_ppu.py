#!/usr/bin/env python
import re, sys
LOG = r'docs/roms/openging-skip-to-title/title-kick-off-to-meeting.log'
with open(LOG, 'r') as f:
    lines = f.readlines()

# Find distinct PC accesses by frame cluster
# Track when routines get invoked
# 1) Look at $2000/$2001 (PPU control/mask switches)
# 2) Look at $9FA8 (scheduler tick)
# 3) Look at $C500 etc.

def first_n(pat, n=10):
    hits = []
    for i, ln in enumerate(lines):
        if re.search(pat, ln):
            m = re.match(r'^f(\d+)\s', ln)
            fr = int(m.group(1)) if m else -1
            hits.append((fr, ln.rstrip()[:180]))
        if len(hits) >= n:
            return hits
    return hits

# Find PPU $2000 / $2001 writes
print('=== PPU $2000 writes (first 20) ===')
for fr, s in first_n(r'(\b| )(\$|)\$?(00|01):2000', n=20):
    print(f'  F{fr}: {s}')

print('\n=== PPU $2001 writes (first 10) ===')
for fr, s in first_n(r':2001', n=10):
    print(f'  F{fr}: {s}')

# 9FA8 scheduler tick
print('\n=== $9FA8 scheduler tick (first 5) ===')
for fr, s in first_n(r'9FA8', n=5):
    print(f'  F{fr}: {s}')

# Scene-id-like writes (any $0027 / $0026 etc.)
print('\n=== $0026 any access (first 5) ===')
for fr, s in first_n(r':0026', n=5):
    print(f'  F{fr}: {s}')

print('\n=== $0027 any access (first 5) ===')
for fr, s in first_n(r':0027', n=5):
    print(f'  F{fr}: {s}')

# Look at common SCENE-related routines: bank02 A215 (sprite setup), $A8A0
print('\n=== $A215 sprite setup (first 3) ===')
for fr, s in first_n(r':A215', n=3):
    print(f'  F{fr}: {s}')

print('\n=== $A8A0 OAM setup (first 3) ===')
for fr, s in first_n(r':A8A0', n=3):
    print(f'  F{fr}: {s}')
