#!/usr/bin/env python
"""Deep dive: opening-all.log frames 2510-4355 (opening animation full)."""
import re
LOG = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\opening-all\opening-all.log'

with open(LOG, 'r') as f:
    lines = f.readlines()

print('TOTAL:', len(lines))

# Frame index
fidx = {}
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in fidx:
            fidx[fr] = i

frames = sorted(fidx.keys())
print(f'frame range: {frames[0]}..{frames[-1]}, count: {len(frames)}')

# Banks per frame summary at key transitions
print('\n=== key transitions ===')

# 1. F2510 — First PPU enable (bank02 $A17F STA $2000 = #$89)
print('\n# F2510 first PPU enable')
for fr in [2506, 2508, 2510, 2512, 2515]:
    idx = fidx.get(fr)
    if idx: print(f'  F{fr}: {lines[idx].rstrip()[:160]}')

# Find what executes just after PPU enable
print('\n# F2510-F2520 detail (just after PPU enable)')
import re as r2
seen_pcs = {}
for i in range(fidx[2510], min(fidx[2530], len(lines)) if 2530 in fidx else len(lines)):
    ln = lines[i]
    m = r2.match(r'^f(\d+)\s', ln)
    if not m: continue
    fr = int(m.group(1))
    if fr > 2525: break
    m2 = r2.search(r'\$(\d{2}):([0-9A-F]+):', ln)
    if m2:
        b, pc = m2.group(1), m2.group(2)
        key = f'{b}:{pc}'
        if key not in seen_pcs:
            seen_pcs[key] = (fr, i)
            print(f'  F{fr} L{i} {b}:{pc}: {ln.rstrip()[:160]}')

# 2. F3644 - first Drift
print('\n# F3644 first Drift (Y-scroll)')
for fr in [3640, 3642, 3644, 3646, 3650, 3660]:
    idx = fidx.get(fr)
    if idx: print(f'  F{fr}: {lines[idx].rstrip()[:160]}')

# Look at F3644 frame detail
print('\n# F3644 frame detail (5 lines)')
idx = fidx.get(3644)
if idx:
    for j in range(idx, idx+5):
        if j < len(lines): print(f'  L{j}: {lines[j].rstrip()[:160]}')

# 3. Frames 30-2509 — what's running during silent period?
print('\n# Frame 2000 (silent period) first 3 lines')
idx = fidx.get(2000)
if idx:
    for j in range(idx, min(idx+3, len(lines))):
        print(f'  L{j}: {lines[j].rstrip()[:160]}')

print('\n# Frame 4000 (deeper into opening) first 3 lines')
idx = fidx.get(4000)
if idx:
    for j in range(idx, min(idx+3, len(lines))):
        print(f'  L{j}: {lines[j].rstrip()[:160]}')

print('\n# Frame 4355 (end of trace) first 3 lines')
idx = fidx.get(4355)
if idx:
    for j in range(idx, min(idx+3, len(lines))):
        print(f'  L{j}: {lines[j].rstrip()[:160]}')

# 4. What runs between transitions? Find distinct PC neighborhoods
print('\n# Distinct PC sequences F2510-F4355 (sample of bank changes)')
bank_seq = []
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if not m: continue
    fr = int(m.group(1))
    if fr < 2510 or fr > 4355: continue
    m2 = re.search(r'\$(\d{2}):([0-9A-F]+):', ln)
    if m2:
        b, pc = m2.group(1), m2.group(2)
        key = f'{b}:{pc[:4]}'
        if not bank_seq or bank_seq[-1][0] != key:
            if len(bank_seq) > 0 and fr - bank_seq[-1][1] > 30:
                bank_seq.append((key, fr))
            elif not bank_seq:
                bank_seq.append((key, fr))
print('Bank/PC transitions in F2510-F4355 (with >30 frame gap):')
for k, fr in bank_seq[:80]:
    print(f'  F{fr}: {k}')
