#!/usr/bin/env python
import re, os
LOG = r'docs/roms/openging-skip-to-title/press-start-to-title.log'
WD = r'd:\studio\github\monkeycode\src\nes\tsubasa2'
os.chdir(WD)
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()
print('total lines:', len(lines))
frames = []
seen = set()
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in seen:
            seen.add(fr); frames.append(fr)
print('frame range:', min(frames), '..', max(frames))
print('frame count:', len(frames))
# sample: first frame and last frame
print('\n=== first frame first 5 lines ===')
for ln in lines[:5]:
    s = ln.rstrip()[:200]
    print(s)
print('\n=== last frame lines (last 40) ===')
for ln in lines[-40:]:
    s = ln.rstrip()[:200]
    print(s)
