#!/usr/bin/env python
import os, re
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = r'docs/roms/openging-skip-to-title/press-start-to-title.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Look for STA $4016 (joypad strobe write)
print('=== STA $4016 (joypad strobe) ===')
for i, ln in enumerate(lines):
    if re.search(r'STA \$4016', ln):
        m = re.match(r'^f(\d+)\s', ln)
        fr = int(m.group(1)) if m else -1
        s = ln.rstrip()[:180]
        print(f'  L{i} F{fr}: {s}')

# Look at lines around frame 3341-3342 which seem to be transition
print('\n=== F3341+F3342 first 30 lines (transition region) ===')
last = -1
out = 0
for i, ln in enumerate(lines):
    m = re.match(r'^f(\d+)\s', ln)
    if not m: continue
    fr = int(m.group(1))
    if fr == 3341 and last != 3341:
        print(f'\n--- F3341 start ---')
        last = 3341; out = 0
    if fr == 3342 and last != 3342:
        print(f'\n--- F3342 start ---')
        last = 3342; out = 0
    if last in (3341, 3342):
        s = ln.rstrip()[:200]
        print(f'  L{i} F{fr}: {s}')
        out += 1
        if out > 60: break

# Look for any access to $0026 via the various forms
print('\n=== $0026 access (any) ===')
for i, ln in enumerate(lines):
    if re.search(r'\$\d\d:0026', ln) or re.search(r'\$\d\d.\d?\d?\d?0026', ln):
        s = ln.rstrip()[:200]
        m = re.match(r'^f(\d+)\s', ln)
        fr = int(m.group(1)) if m else -1
        print(f'  L{i} F{fr}: {s}')
