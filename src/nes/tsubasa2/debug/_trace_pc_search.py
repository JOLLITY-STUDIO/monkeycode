#!/usr/bin/env python
import os, re, sys

ROOT = r'src/asm/bank00'
PCS = ['9A7E', '9A8B', '91A1', '9AA2', '9F04', '9F06', '9958', '9EEF']
files = ['code_main.s','code_render.s','code_sub.s','code_util.s','code_scene.s']

for pc in PCS:
    print(f'\n=== Looking for PC references to ${pc} ===')
    for fn in files:
        path = os.path.join(ROOT, fn)
        if not os.path.exists(path): continue
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            for i, ln in enumerate(f, 1):
                if pc in ln and (re.search(r'\b' + pc + r'\b', ln) or ln.strip().startswith(pc)):
                    s = ln.rstrip()
                    if len(s) > 180: s = s[:180]
                    print(f'{fn}:{i}: {s}')

# Also look at code_main.s entry point
print('\n=== code_main.s top 60 lines ===')
path = os.path.join(ROOT, 'code_main.s')
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for i, ln in enumerate(f, 1):
            if i > 60: break
            s = ln.rstrip()
            if len(s) > 180: s = s[:180]
            print(f'{i}: {s}')
