#!/usr/bin/env python
import re
import sys

LOG = r'docs/roms/opening-all/opening-all.log'

def first_with_pc(lines, fr_start, fr_end, bank_hex, pc_hex):
    for i, ln in enumerate(lines):
        m = re.match(r'^f(\d+)\s', ln)
        if not m: continue
        fr = int(m.group(1))
        if fr < fr_start: continue
        if fr > fr_end: break
        if '$' + bank_hex + ':' + pc_hex + ':' in ln:
            return i
    return -1

def dump(lines, idx, n=60):
    if idx < 0:
        print('  (not found)')
        return
    for j in range(idx, min(idx+n, len(lines))):
        s = lines[j].rstrip()
        if len(s) > 200: s = s[:200]
        print(f'{j}: {s}')

def main():
    with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    if len(sys.argv) > 1 and sys.argv[1] == 'f380':
        print('=== F380 -> bank00 $91A1 region ===')
        idx = first_with_pc(lines, 380, 480, '00', '91A1')
        dump(lines, idx, 60)
        return
    # default: f13
    print('=== F13 -> bank00 $9AA3 region ===')
    idx = first_with_pc(lines, 13, 30, '00', '9AA3')
    dump(lines, idx, 60)

main()
