#!/usr/bin/env python
"""opening-all F380-F2510 detailed analysis."""
import re
LOG = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\opening-all\opening-all.log'

with open(LOG, 'r') as f:
    lines = f.readlines()

fidx = {}
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in fidx:
            fidx[fr] = i

# Sample every 50 frames F380-F2510, find distinct banks/PCs
print('=== F380-F2510 PC sequence (every 30 frames, first frame line) ===')
last_pc = None
samples = []
for fr in sorted(fidx.keys()):
    if fr < 380 or fr > 2510: continue
    idx = fidx[fr]
    ln = lines[idx]
    m = re.search(r'\$(\d{2}):([0-9A-F]+):', ln)
    if m:
        b, pc = m.group(1), m.group(2)
        key = f'{b}:{pc[:4]}'
        # only print if changed
        if key != last_pc:
            samples.append((fr, key, ln.rstrip()[:160]))
            last_pc = key

# Limit output
prev_fr = 0
for fr, key, s in samples:
    if fr - prev_fr >= 5 or prev_fr == 0:  # every 5 frames
        print(f'  F{fr}: {key}: {s[:140]}')
        prev_fr = fr

# Count distinct PC ranges
print('\n=== PC distribution histogram F380-F2510 ===')
from collections import Counter
pc_hist = Counter()
for fr, key, s in samples:
    pc_hist[key] += 1
for k, v in pc_hist.most_common(30):
    print(f'  {k}: {v}x')

# Detail specific transition frames
print('\n=== detail F380 (second picture OAM) ===')
idx = fidx.get(380)
if idx:
    for j in range(idx, idx+15):
        if j < len(lines):
            s = lines[j].rstrip()
            print(f'  L{j}: {s[:160]}')

print('\n=== detail F800 (midway) ===')
idx = fidx.get(800)
if idx:
    for j in range(idx, idx+8):
        if j < len(lines):
            s = lines[j].rstrip()
            print(f'  L{j}: {s[:160]}')

print('\n=== detail F1500 (midway) ===')
idx = fidx.get(1500)
if idx:
    for j in range(idx, idx+8):
        if j < len(lines):
            s = lines[j].rstrip()
            print(f'  L{j}: {s[:160]}')

print('\n=== detail F2000 ===')
idx = fidx.get(2000)
if idx:
    for j in range(idx, idx+8):
        if j < len(lines):
            s = lines[j].rstrip()
            print(f'  L{j}: {s[:160]}')
