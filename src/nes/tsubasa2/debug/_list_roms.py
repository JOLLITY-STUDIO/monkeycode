#!/usr/bin/env python
import os
ROOT = r'docs/roms'
for sub in sorted(os.listdir(ROOT)):
    full = os.path.join(ROOT, sub)
    if os.path.isdir(full):
        print('\n=== ' + sub + ' ===')
        for f in sorted(os.listdir(full)):
            sz = os.path.getsize(os.path.join(full, f))
            print(f'  {sz:>10}  {f}')
    else:
        sz = os.path.getsize(full)
        print(f'{sz:>10}  {sub}')
