#!/usr/bin/env python
import re
LOG = r'docs/roms/openging-skip-to-title/title-kick-off-to-meeting.log'
with open(LOG, 'r') as f:
    lines = f.readlines()

# Build frame index
fidx = {}
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in fidx:
            fidx[fr] = i

# What's happening in 51316-51400 (very first frames of trace)
print('=== F51316-F51320 first-line each ===')
for fr in range(51316, 51340):
    idx = fidx.get(fr)
    if idx is not None:
        print(f'F{fr}: {lines[idx].rstrip()[:180]}')

# What does F52419 region look like (transition point)
print('\n=== F52415-F52425 first-line each ===')
for fr in range(52415, 52426):
    idx = fidx.get(fr)
    if idx is not None:
        print(f'F{fr}: {lines[idx].rstrip()[:180]}')

# What's happening F52450-F52470 (after first scheduler tick)
print('\n=== F52450-F52470 first-line each ===')
for fr in range(52450, 52470):
    idx = fidx.get(fr)
    if idx is not None:
        print(f'F{fr}: {lines[idx].rstrip()[:180]}')

# Count $2007 PPU writes
print('\n=== $2007 writes (PPU VRAM bulk write) count per bank ===')
from collections import Counter
bank2007 = Counter()
for ln in lines:
    m = re.search(r'\$(\d{2}):[0-9A-F]+:[^$]+\b(?:8D 07 20|STA \$2007)', ln)
    if m:
        bank2007[m.group(1)] += 1
print(f'$2007 writes per bank: {dict(bank2007)}')

# show $2007 first 5 with context
print('\n=== $2007 first 5 with frame context ===')
n = 0
for i, ln in enumerate(lines):
    if 'STA $2007' in ln:
        m = re.match(r'^f(\d+)\s', ln)
        fr = int(m.group(1)) if m else -1
        print(f'F{fr}: {ln.rstrip()[:180]}')
        n += 1
        if n >= 5: break

# what's in frame 51330-51336 (we saw $A039 bulk write there)
print('\n=== F51330-F51336 each line (PPU bulk write region) ===')
for fr in [51330, 51331, 51332, 51333, 51334, 51335, 51336]:
    idx = fidx.get(fr)
    if idx is not None:
        # print all lines for this frame
        for j in range(idx, min(idx+10, len(lines))):
            m2 = re.match(r'^f(\d+)\s', lines[j])
            if m2:
                f2 = int(m2.group(1))
                if f2 != fr: break
            print(f'  L{j} F{fr}: {lines[j].rstrip()[:160]}')
        print()
