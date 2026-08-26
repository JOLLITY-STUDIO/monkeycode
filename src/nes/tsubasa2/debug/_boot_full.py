#!/usr/bin/env python
"""Complete boot analysis: F6-F4355 (no START pressed)."""
import re
from collections import Counter
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

print(f'TOTAL lines: {len(lines)}')
print(f'frame range: {min(fidx)}..{max(fidx)}')

# PC histogram for ENTIRE F6-F4355 boot
pc_hist = Counter()
samples = {}  # first frame each PC seen
for fr in sorted(fidx.keys()):
    if fr < 6 or fr > 4355: continue
    idx = fidx[fr]
    ln = lines[idx]
    m = re.search(r'\$(\d{2}):([0-9A-F]+):', ln)
    if m:
        b, pc = m.group(1), m.group(2)
        key = f'{b}:{pc[:4]}'
        pc_hist[key] += 1
        if key not in samples:
            samples[key] = (fr, ln.rstrip()[:140])

print('\n=== F6-F4355 PC histogram (top 50) ===')
for k, v in pc_hist.most_common(50):
    fr, s = samples[k]
    print(f'  {k}: {v}x (first F{fr})')

# Key transitions per frame range
print('\n=== F6-F30 first 25 lines (raw trace head) ===')
for j in range(0, 25):
    print(f'  L{j}: {lines[j].rstrip()[:160]}')

print('\n=== F30-F380 distinct PC sequence (every 30 frames, first line) ===')
last_pc = None
sampled = []
for fr in range(30, 381):
    if fr not in fidx: continue
    idx = fidx[fr]
    ln = lines[idx]
    m = re.search(r'\$(\d{2}):([0-9A-F]+):', ln)
    if m:
        b, pc = m.group(1), m.group(2)
        key = f'{b}:{pc[:4]}'
        if key != last_pc or fr in (30, 60, 90, 120, 180, 240, 300, 360):
            sampled.append((fr, key, ln.rstrip()[:160]))
            last_pc = key
for fr, key, s in sampled:
    print(f'  F{fr} {key}: {s[:120]}')

# F2510-F4355 distinct PC (already analyzed but check)
print('\n=== F2510-F4355 PC histogram (top 30) ===')
pc_hist2 = Counter()
for fr in sorted(fidx.keys()):
    if fr < 2510 or fr > 4355: continue
    idx = fidx[fr]
    ln = lines[idx]
    m = re.search(r'\$(\d{2}):([0-9A-F]+):', ln)
    if m:
        b, pc = m.group(1), m.group(2)
        key = f'{b}:{pc[:4]}'
        pc_hist2[key] += 1
for k, v in pc_hist2.most_common(30):
    fr = samples.get(k, (None,))[0] if k in samples else 0
    print(f'  {k}: {v}x')
