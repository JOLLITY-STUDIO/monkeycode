#!/usr/bin/env python
import re
fns = [6, 30, 100, 300, 500, 1000, 1500, 2000, 2510, 3000, 3300, 3500, 3644, 4000, 4355]
seen = set()
samples = {}
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    for ln in f:
        m = re.match(r'^f(\d+)\s', ln)
        if m:
            fr = int(m.group(1))
            if fr in fns and fr not in seen:
                seen.add(fr)
                samples[fr] = ln.rstrip()
for fn in fns:
    if fn in samples:
        print(f'F{fn}:', samples[fn][:200])
    else:
        print(f'F{fn}: (no match)')
