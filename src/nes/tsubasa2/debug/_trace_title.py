#!/usr/bin/env python
"""Read title-kick-off.log for first 30 and last 30 lines."""
import os, sys
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = sys.argv[1] if len(sys.argv) > 1 else r'docs/roms/openging-skip-to-title/title-kick-off.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()
print(f'TOTAL: {len(lines)}')

# Sample by frame
frames = {}
for ln in lines:
    import re
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in frames:
            frames[fr] = ln.rstrip()

print(f'\nFrame range: {min(frames)} .. {max(frames)}')
print(f'Frame count: {len(frames)}')

# Show first 5 lines
print('\n=== first 5 lines ===')
for ln in lines[:5]:
    print(ln.rstrip()[:200])

# Show last 5
print('\n=== last 5 lines ===')
for ln in lines[-5:]:
    print(ln.rstrip()[:200])

# Show sample lines from each frame
print('\n=== first line of each frame ===')
last = -1
out = 0
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr != last:
            print(ln.rstrip()[:200])
            last = fr
            out += 1
            if out > 30: break
