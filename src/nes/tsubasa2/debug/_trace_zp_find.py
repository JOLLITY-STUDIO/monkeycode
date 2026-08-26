#!/usr/bin/env python
"""Find $26 accesses."""
import re
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()
# Sample: any " LDA $26" or " STA $26" etc.
hits = re.findall(r'^(.*\$(0026|26)\b.*)$', data, re.MULTILINE)
print(f'$0026 or $26 refs: {len(hits)}')
for s in hits[:30]:
    if len(s[0]) > 180: print(f'  {s[0][:180]}')
    else: print(f'  {s[0]}')

# Also LDA $0028 etc (other addresses from asm code)
print('\n=== $0027/$0028/$0029 LDA/STA ===')
for addr in ['0027','0028','0029','002B','002C','002D','002E','002F','0030','0031','0038','003A','003C','0044','004A','004C','005B']:
    cnt = len(re.findall(r'\$' + addr, data))
    if cnt > 0: print(f'  ${addr}: {cnt}')

# Pattern: STA $XX where XX is upper z-page
print('\n=== STA $00XX where 00XX in range $0020..$0080 (count top 10) ===')
import collections
c = collections.Counter()
for m in re.finditer(r'STA\s+\$([0-9A-F]+)\b', data):
    addr = m.group(1)
    if len(addr) == 4 and addr[:2] == '00':
        b = int(addr[2:], 16)
        if 0x10 <= b <= 0x80:
            c[addr] += 1
for k, v in c.most_common(15):
    print(f'  ${k}: {v}')

# Same for LDA
print('\n=== LDA $00XX where 00XX in $0010-$0080 ===')
c.clear()
for m in re.finditer(r'LDA\s+\$([0-9A-F]+)\b', data):
    addr = m.group(1)
    if len(addr) == 4 and addr[:2] == '00':
        b = int(addr[2:], 16)
        if 0x10 <= b <= 0x80:
            c[addr] += 1
for k, v in c.most_common(15):
    print(f'  ${k}: {v}')
