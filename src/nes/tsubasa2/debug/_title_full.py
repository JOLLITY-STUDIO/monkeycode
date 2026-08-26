#!/usr/bin/env python
import re
LOG = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\openging-skip-to-title\title-kick-off-to-meeting.log'
with open(LOG, 'r') as f:
    lines = f.readlines()

# Get line indices per frame
fidx = {}
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in fidx:
            fidx[fr] = i

# Helper: get all lines for a frame range
def get_frame_lines(fr_start, fr_end, max_lines=200):
    out = []
    for fr in range(fr_start, fr_end+1):
        idx = fidx.get(fr)
        if idx is None: continue
        for j in range(idx, min(idx+30, len(lines))):
            m2 = re.match(r'^f(\d+)\s', lines[j])
            if m2:
                f2 = int(m2.group(1))
                if f2 != fr: break
            out.append((fr, j, lines[j].rstrip()[:200]))
            if len(out) >= max_lines: return out
    return out

# 1. F51316-F51327 — Capcom logo OAM replay
print('=== F51316-F51327 (Capcom logo OAM replay, bank00 $9AA3) ===')
for fr, j, s in get_frame_lines(51316, 51327, 40):
    if '9AA3' in s or '9AA6' in s or '9AA8' in s or '9AAB' in s or '9AB1' in s or '9AB7' in s:
        print(f'  L{j} F{fr}: {s}')

# 2. F51334-F51341 — title tile bulk write ($2007)
print('\n=== F51334-F51341 (title tile bulk write, bank02 $A039 STA $2007) ===')
n2007 = 0
for fr, j, s in get_frame_lines(51334, 51341, 80):
    if '$2007' in s:
        n2007 += 1
        if n2007 <= 15:
            print(f'  L{j} F{fr}: {s}')
print(f'  ... total $2007 writes in this window: {n2007}')

# 2.5. F51342-F51365 - idling + audio
print('\n=== F51342-F51365 frames first lines ===')
for fr in range(51342, 51370):
    idx = fidx.get(fr)
    if idx: print(f'  F{fr}: {lines[idx].rstrip()[:160]}')

# 3. F52410-F52430 — scheduler tick + meeting
print('\n=== F52410-F52430 detail ===')
for fr, j, s in get_frame_lines(52410, 52430, 80):
    if '$9F' in s or '$C4B9' in s or '$9FA8' in s or '$9F51' in s or '8241' in s or '06' in s[:30]:
        print(f'  L{j} F{fr}: {s}')

# 4. F53500-F53600 - meeting audio setup
print('\n=== F53500-F53600 first lines (mid-game audio) ===')
for fr in range(53500, 53600, 5):
    idx = fidx.get(fr)
    if idx: print(f'  F{fr}: {lines[idx].rstrip()[:160]}')
