#!/usr/bin/env python
"""Test all ZP addresses $00xx."""
import re
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()

# Test: search $0026 specifically, then $26 to compare
# Note: pattern $0026 must have preceding context to avoid $A026 etc.

# Use word boundary: preceded by space, followed by space/punct/[]
hits_0026_strict = len(re.findall(r'(?<![\w\$])\$0026\b', data))
print(f'$0026 strict (preceded by space, not $XX26): {hits_0026_strict}')
hits_26_loose = len(re.findall(r'\$0026\b', data))
print(f'$0026 loose: {hits_26_loose}')
hits_26_anywhere = data.count('$0026')
print(f'$0026 anywhere: {hits_26_anywhere}')

# print all distinct 4-digit zero-page-ish values
zp_pattern = re.findall(r'\$00([0-9A-F]{2})\b', data)
from collections import Counter
c = Counter(zp_pattern)
print(f'\nAll $00xx counts (only counts where count >= 1):')
for k, v in sorted(c.items(), key=lambda x: int(x[0], 16)):
    print(f'  $00{k}: {v}')

# Also check 2-digit addresses $XX (zero page trunc to 2 digits?)
zp2 = re.findall(r'\b\$([0-9A-F]{2})\b', data)
c2 = Counter(zp2)
print(f'\nTop 2-digit $XX (zero page) hits:')
for k, v in c2.most_common(40):
    b = int(k, 16)
    if b >= 0x10: print(f'  ${k}: {v}')
