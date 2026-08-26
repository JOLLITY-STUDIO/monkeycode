#!/usr/bin/env python
"""Find $0026 access and $4016 in opening-all.log via fast streaming grep."""
import re, sys
LOG = r'docs/roms/opening-all/opening-all.log'
# pattern: instruction line that touches $0026 or $4016
RE_0026 = re.compile(r'\$\d{2}:0026|\$0026\s|0026\s*=')
RE_4016 = re.compile(r'(LDA|STA)\s\$4016')
RE_4017 = re.compile(r'(LDA|STA)\s\$4017')
RE_8464 = re.compile(r'8464')
RE_2000 = re.compile(r':2000')
RE_2001 = re.compile(r':2001')
RE_2006 = re.compile(r':2006')
RE_2007 = re.compile(r':2007')
RE_8000 = re.compile(r':8000:')
RE_8001 = re.compile(r':8001:')

mode = sys.argv[1] if len(sys.argv) > 1 else 'all'

count = 0
matched = {'0026':0, '4016':0, '4017':0, '8464':0, '2000':0, '2001':0, '2006':0, '2007':0, '8000':0, '8001':0}
last_print = {}
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    for i, ln in enumerate(f):
        # quick win for all categories
        if mode == 'all':
            for k, pat in (('0026',RE_0026),('4016',RE_4016),('4017',RE_4017),('8464',RE_8464),
                           ('2000',RE_2000),('2001',RE_2001),('2006',RE_2006),('2007',RE_2007),
                           ('8000',RE_8000),('8001',RE_8001)):
                # cheap contains check first
                if ':' + k in ln if False else (k in ln and ('$' + k) in ln):
                    m = re.match(r'^f(\d+)\s', ln)
                    fr = int(m.group(1)) if m else -1
                    # only print first 5 per category to avoid overflow
                    if matched[k] < 5 or (k in ('2006','2007') and matched[k] < 8):
                        print(f'  [{k}] L{i} F{fr}: {ln.rstrip()[:180]}')
                    matched[k] += 1
        elif mode in matched:
            matched_local = False
            for k in (mode,):
                if '$' + k in ln:
                    m = re.match(r'^f(\d+)\s', ln)
                    fr = int(m.group(1)) if m else -1
                    print(f'  [{k}] L{i} F{fr}: {ln.rstrip()[:180]}')
                    matched_local = True
            if matched_local:
                matched[mode] += 1
        count += 1
        if count % 20000 == 0:
            print(f'  ... scanned {count} lines ...')

print('\n=== totals ===')
for k, v in matched.items():
    print(f'  {k}: {v}')
