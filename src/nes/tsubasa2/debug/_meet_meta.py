#!/usr/bin/env python
import os, re
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = r'docs/roms/openging-skip-to-title/title-kick-off-to-meeting.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()
print('TOTAL:', len(lines))

frames = []
seen = set()
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in seen:
            seen.add(fr); frames.append(fr)
print(f'range: {min(frames)} .. {max(frames)}')
print(f'count: {len(frames)}')

banks = set()
for ln in lines:
    m = re.search(r'\$(\d{2}):[0-9A-F]+:', ln)
    if m:
        banks.add(m.group(1))
print(f'banks: {sorted(banks)}')

# PPU control writes
ppu_ctrl = 0
ppu_mask = 0
for ln in lines:
    if re.search(r':2000:', ln): ppu_ctrl += 1
    if re.search(r':2001:', ln): ppu_mask += 1
print(f'PPU $2000 writes: {ppu_ctrl}')
print(f'PPU $2001 writes: {ppu_mask}')

# Print first line of each unique frame
print('\n=== first 30 frames first line ===')
last = -1
n = 0
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr != last:
            print(f'F{fr}: {ln.rstrip()[:160]}')
            last = fr
            n += 1
            if n >= 30: break

# last frames
print('\n=== last 10 frames last line ===')
fseen = []
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if not fseen or fseen[-1] != fr:
            fseen.append(fr)
for fr in fseen[-10:]:
    print(f'  F{fr} present')
