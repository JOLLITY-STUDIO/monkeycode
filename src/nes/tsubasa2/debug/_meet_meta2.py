#!/usr/bin/env python
import re
LOG = r'docs/roms/openging-skip-to-title/title-kick-off-to-meeting.log'
with open(LOG, 'r') as f:
    lines = f.readlines()

# Frame range
frames = []
seen = set()
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in seen:
            seen.add(fr); frames.append(fr)
print(f'range: {min(frames)} .. {max(frames)}  count: {len(frames)}')

# Banks present - use simpler match
banks = set()
for ln in lines:
    m = re.match(r'^\S+\s+\S+\s+\S+\s+\S+\s+\S+\s+\S+\s+\S+\s+\$(\d{2}):', ln)
    if m:
        banks.add(m.group(1))
print(f'banks: {sorted(banks)}')

# PPU register hits
ppu = {'2000':0, '2001':0, '2006':0, '2007':0}
for ln in lines:
    for k in ppu:
        if re.search(r':'+k+r'(?=[^0-9A-F])', ln):
            ppu[k] += 1
print(f'PPU registers: {ppu}')

# PRG bank switching
for k in ('8000','8001','C4B9'):
    cnt = sum(1 for ln in lines if re.search(r'\$' + k, ln))
    print(f'${k} refs: {cnt}')

# Print first lines of unique frames
print('\n=== first 30 distinct frames (first line) ===')
last = -1; n = 0
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr != last:
            print(f'F{fr}: {ln.rstrip()[:160]}')
            last = fr; n += 1
            if n >= 30: break
