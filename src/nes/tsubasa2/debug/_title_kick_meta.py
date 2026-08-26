#!/usr/bin/env python
import re
LOG = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\openging-skip-to-title\title-kick-off.log'
with open(LOG, 'r') as f:
    lines = f.readlines()
print('TOTAL:', len(lines))

frames = {}
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr not in frames:
            frames[fr] = ln.rstrip()
print(f'range: {min(frames)} .. {max(frames)}, count: {len(frames)}')

print('\n=== first 30 distinct frames first line ===')
last = -1; n = 0
for ln in lines:
    m = re.match(r'^f(\d+)\s', ln)
    if m:
        fr = int(m.group(1))
        if fr != last:
            print(f'F{fr}: {ln.rstrip()[:160]}')
            last = fr; n += 1
            if n >= 30: break

banks = set()
for ln in lines:
    m = re.search(r'\$(\d{2}):[0-9A-F]+:', ln)
    if m: banks.add(m.group(1))
print(f'banks: {sorted(banks)}')

for k in ['2000','2001','2006','2007','0026','0027','0028','9FA8','C4B9','8000','8001','9F3C','8241']:
    cnt = sum(1 for ln in lines if re.search(r'\$' + k, ln))
    if cnt > 0: print(f'${k}: {cnt}')
