#!/usr/bin/env python
"""Scan opening-all.log for any $00XX RAM access (zero page + page 0)."""
import re
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()

# Look for any $00XX pattern in zero-page (~256 addresses) and 0x100-0x800 range
# Pattern: $00 followed by 2 hex digits
matches = re.findall(r'\$00([0-9A-F]{2})\b', data)
from collections import Counter
c = Counter(matches)
print('Top RAM addresses touched (by $00XX count):')
for addr, n in sorted(c.items(), key=lambda x: -x[1])[:50]:
    if int(addr, 16) >= 0x40 and int(addr, 16) <= 0xFF:
        print(f'  ${addr}: {n}')
