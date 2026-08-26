#!/usr/bin/env python
import os, re
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = r'docs/roms/opening-all/opening-all.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Find frame range
print('Computing frame index...')
frame_idx = {}  # frame -> first line index
last = -1
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr != last:
            if fr not in frame_idx:
                frame_idx[fr] = i
            last = fr

print(f'max frame: {max(frame_idx.keys())}')
print(f'total frames: {len(frame_idx)}')

# Search for $0026 access across all (broader opening-all.log)
print('\n=== $0026 access in opening-all.log ===')
hits_0026 = []
for i, ln in enumerate(lines):
    if re.search(r'\$\d\d:0026', ln) or re.search(r'0026\s*=', ln):
        m = re.match(r'^f(\d+)\s', ln)
        fr = int(m.group(1)) if m else -1
        hits_0026.append((i, fr, ln.rstrip()[:200]))
print(f'total: {len(hits_0026)}')
print('first 30:')
for i, fr, s in hits_0026[:30]:
    print(f'  L{i} F{fr}: {s}')
print('last 30:')
for i, fr, s in hits_0026[-30:]:
    print(f'  L{i} F{fr}: {s}')

# Search for STA $4016 in opening-all.log
print('\n=== STA $4016 (joypad strobe) in opening-all.log ===')
for i, ln in enumerate(lines):
    if re.search(r'STA \$4016', ln):
        m = re.match(r'^f(\d+)\s', ln)
        fr = int(m.group(1)) if m else -1
        s = ln.rstrip()[:180]
        print(f'  L{i} F{fr}: {s}')
