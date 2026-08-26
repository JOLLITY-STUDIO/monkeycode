#!/usr/bin/env python
import os, re
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = r'docs/roms/openging-skip-to-title/press-start-to-title.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Just grep-ish for specific tokens, with broader regex
def hits(pat):
    for i, ln in enumerate(lines):
        if re.search(pat, ln):
            m = re.match(r'^f(\d+)\s', ln)
            fr = int(m.group(1)) if m else -1
            s = ln.rstrip()[:180]
            print(f'  L{i} F{fr}: {s}')

print('=== 4016 / 4017 any access ===')
hits(r'401[67]')
print('\n=== $8464 calls ===')
hits(r'8464')
print('\n=== $8000/$8001 (PRG bank switch) ===')
hits(r':800[01]:')
print('\n=== $0026 sceneId any access ===')
hits(r'0026')
print('\n=== $0027 mode any access ===')
hits(r'0027')
print('\n=== $2000/$2001 PPU ctrl/mask ===')
hits(r':200[01]:')
print('\n=== $2006/$2007 PPU VRAM addr/data ===')
hits(r':200[67]:')
