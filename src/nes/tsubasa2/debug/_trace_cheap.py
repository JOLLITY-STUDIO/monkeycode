#!/usr/bin/env python
"""Search for key addresses/PCs in opening-all.log."""
import re
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()

# Key addresses from asm analysis
for k in ['9FA8','9EEF','9F04','9F06','802F','8027','$9BA0','$8464','$9B11','$A036','$A0ED','9FC6']:
    cnt = len(re.findall(r'\$' + k, data))
    print(f'${k}: {cnt}')

# Also: total instructions vs lines ratio
print(f'\ntotal lines: {len(data.splitlines())}')

# Trace $9F04 vsync wait: should be 5000+ matches
# $9BA0 = NMI sync, should be many hits per frame
# $8464 = CFG loader
# $A036 = bank02 audio stream (read 8 bytes)

# Maybe some addrs are in $0000 (4 hex digits with leading zeros stripped)
# Try $0026 vs $26 patterns as addresses (not values)
print('\n=== STA/LDA target $00XX ===')
for op in ['STA', 'LDA']:
    pat = op + r'\s+\$(00[0-9A-F]{2})\b'
    matches = re.findall(pat, data)
    from collections import Counter
    c = Counter(matches)
    print(f'\n[{op} $00xx] top 30:')
    for k, v in c.most_common(30):
        print(f'  ${k}: {v}')
