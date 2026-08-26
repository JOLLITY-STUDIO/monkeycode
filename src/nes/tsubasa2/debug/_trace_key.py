#!/usr/bin/env python
"""Fast line-by-line grep, write all matches."""
import re, sys
LOG = r'docs/roms/opening-all/opening-all.log'
KEY = sys.argv[1] if len(sys.argv) > 1 else 'all'
LOG_OUT = sys.argv[2] if len(sys.argv) > 2 else None

patterns = {
    '0026': [r'\$0026'],
    '4016': [r'\$4016'],
    '4017': [r'\$4017'],
    '8464': [r'\$8464'],
    '2000': [r'\$2000'],
    '2001': [r'\$2001'],
    '2006': [r'\$2006'],
    '2007': [r'\$2007'],
    '8000': [r'\$8000'],
    '8001': [r'\$8001'],
}

if KEY == 'all':
    keys = list(patterns.keys())
else:
    keys = [KEY]

fh = open(LOG_OUT, 'w', encoding='utf-8') if LOG_OUT else None
totals = {k: 0 for k in keys}
pr_remain = {k: 8 for k in keys}
samples = {k: [] for k in keys}
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    for i, ln in enumerate(f):
        for k in keys:
            for pat in patterns[k]:
                if re.search(pat, ln):
                    totals[k] += 1
                    if pr_remain[k] > 0:
                        m = re.match(r'^f(\d+)\s', ln)
                        fr = int(m.group(1)) if m else -1
                        s = ln.rstrip()[:180]
                        out = f'  [{k}] L{i} F{fr}: {s}'
                        if fh:
                            fh.write(out + '\n')
                        else:
                            print(out)
                        pr_remain[k] -= 1
                    break

if fh:
    fh.write('\n=== totals ===\n')
    for k, v in totals.items():
        fh.write(f'  {k}: {v}\n')
    fh.close()
else:
    print('\n=== totals ===')
    for k, v in totals.items():
        print(f'  {k}: {v}')
