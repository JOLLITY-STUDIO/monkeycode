#!/usr/bin/env python
"""Search opening-all.log for specific zero-page addresses."""
import re
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()

# Maybe zero-page addresses are displayed without leading zero in trace
# Let me also check all distinct $00XX patterns
patterns = {
    'ZP_2digit': re.findall(r'\$([0-9A-F]{2})\b', data),
    'Full_4digit': re.findall(r'\$([0-9A-F]{4})\b', data),
    'ZP_with_LDA_STA': re.findall(r'(LDA|STA|EOR|ORA|AND)\s+\$([0-9A-F]{2})\b', data),
    'Page0_LDA_STA': re.findall(r'(LDA|STA)\s+\$00([0-9A-F]{2})\b', data),
}
from collections import Counter
c4 = Counter(patterns['Full_4digit'])
print('Top 30 most-frequent full $XXXX addresses:')
for addr, n in sorted(c4.items(), key=lambda x: -x[1])[:30]:
    print(f'  ${addr}: {n}')

# Specific: $0026, $0044, $004C, $005B
print('\n=== specific addresses ===')
import re as r2
print(f'$0026 hits: {len(r2.findall(r"\$0026", data))}')
print(f'$0044 hits: {len(r2.findall(r"\$0044", data))}')
print(f'$004C hits: {len(r2.findall(r"\$004C", data))}')
print(f'$005B hits: {len(r2.findall(r"\$005B", data))}')

# check $046x (the OAM area we saw)
print(f'$0468 hits: {len(r2.findall(r"\$0468", data))}')
print(f'$046B hits: {len(r2.findall(r"\$046B", data))}')
