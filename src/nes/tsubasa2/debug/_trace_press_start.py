#!/usr/bin/env python
import re, os
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = r'docs/roms/openging-skip-to-title/press-start-to-title.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Find joypad reads ($4016/$4017)
print('=== $4016/$4017 reads (joypad polling) ===')
hits = []
for i, ln in enumerate(lines):
    if 'LDA $4016' in ln or 'LDA $4017' in ln or 'LDA ($' in ln:
        hits.append((i, ln.rstrip()[:220]))
print(f'count={len(hits)}')
for i, ln in hits[:30]:
    print(f'L{i}: {ln}')

print('\n=== first $8464 calls (CFG load) ===')
for i, ln in enumerate(lines):
    if 'JSR $8464' in ln:
        print(f'L{i}: {ln.rstrip()[:220]}')
print()

print('\n=== distinct banks present ===')
banks = set()
for ln in lines:
    m = re.search(r'\$(\d\d):[0-9A-F]+:', ln)
    if m: banks.add(m.group(1))
print(sorted(banks))

print('\n=== distinct PCs per bank (top 30 frequent) ===')
from collections import Counter
pc_counter = Counter()
for ln in lines:
    m = re.search(r'\$(\d\d):([0-9A-F]+):', ln)
    if m:
        b, pc = m.group(1), m.group(2)
        pc_counter[(b, pc)] += 1
for (b, pc), n in pc_counter.most_common(30):
    print(f'  bank{b}:${pc}  {n}')
